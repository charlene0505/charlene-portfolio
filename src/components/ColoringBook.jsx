import { useRef, useEffect, useCallback, useState } from 'react'
import { PALETTE } from '../data/palette';
import gsap from 'gsap';
import RisoDots from '../utils/risoDotGenerator';

const IMAGE_REF = "/assets/Frame_5px.svg";
const DISPLAY_SIZE = 420;
const DISPLAY_MOBILE_SIZE = 320
const LUMINANCE = 100;
const COLOR = [239, 68, 68, 255];

function getBrightness(data,idx){
    return 0.299 * data[idx] + 0.587 * data[idx + 1] + 0.114 * data[idx + 2]
}

function hexToRgba(hex){
    const clean = hex.replace("#",'')
    const r = parseInt(clean.substring(0,2),16)
    const g = parseInt(clean.substring(2, 4), 16);
    const b = parseInt(clean.substring(4, 6), 16);
    return [r, g, b, 255]
}

function floodFill(imageData, startX, startY, fillColor) {
  const { width, height, data } = imageData;
  if (startX < 0 || startX >= width || startY < 0 || startY >= height)
    return false;

  const startIdx = (startY * width + startX) * 4;
  if (getBrightness(data, startIdx) < LUMINANCE) return false;

  if (
    data[startIdx] === fillColor[0] &&
    data[startIdx + 1] === fillColor[1] &&
    data[startIdx + 2] === fillColor[2]
  )
    return false;

  const visited = new Uint8Array(width * height);
  const stack = [[startX, startY]];

  while (stack.length) {
    const [x, y] = stack.pop();
    if (x < 0 || x >= width || y < 0 || y >= height) continue;

    const pos = y * width + x;

    if (visited[pos]) continue;

    const idx = pos * 4;
    if (getBrightness(data, idx) < LUMINANCE) continue;

    visited[pos] = 1;
    data[idx] = fillColor[0];
    data[idx + 1] = fillColor[1];
    data[idx + 2] = fillColor[2];
    data[idx + 3] = fillColor[3];

    stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
  }
  return true;
}

function useCursorGlow(
  targetRef,
  glowRef,
  { size = 100, duration = 0.5, ease = "power3" } = {},
) {
  const quickX = useRef(null);
  const quickY = useRef(null);

  useEffect(() => {
    if (!glowRef.current) return;
    quickX.current = gsap.quickTo(glowRef.current, "x", { duration, ease });
    quickY.current = gsap.quickTo(glowRef.current, "y", { duration, ease });
  }, []);

  const onMouseMove = useCallback(
    (e) => {
      if (!targetRef.current || !quickX.current) return;
      const rect = targetRef.current.getBoundingClientRect();
      quickX.current(e.clientX - rect.left - size / 2);
      quickY.current(e.clientY - rect.top - size / 2);
    },
    [size],
  );

  const onMouseEnter = useCallback(
    () => gsap.to(glowRef.current, { opacity: 1, duration: 0.2 }),
    [],
  );
  const onMouseLeave = useCallback(
    () => gsap.to(glowRef.current, { opacity: 0, duration: 0.35 }),
    [],
  );

  return { onMouseMove, onMouseEnter, onMouseLeave };
}

function ColorChange({color, isActive, onSelect, registerRef}){
    const btnRef = useRef(null)
    const glowRef = useRef(null)
    const wasActiveRef = useRef(isActive);

    const { onMouseMove, onMouseEnter,onMouseLeave} = useCursorGlow(btnRef, glowRef, {size:48})

    const handleMouseLeave = useCallback(() => {
      if (isActive) return; // selected swatch keeps its glow frozen right where it was
      onMouseLeave();
    }, [isActive, onMouseLeave]);

    const handleMouseMove = useCallback((e) => {
      if (isActive) return; // selected swatch keeps its glow frozen right where it was
      onMouseMove(e);
    }, [isActive, onMouseMove]);


    useEffect(() => {
      // this swatch just lost its selected status to another one — let its glow fade out
      if (wasActiveRef.current && !isActive) {
        gsap.to(glowRef.current, { opacity: 0, duration: 0.35 });
      }
      wasActiveRef.current = isActive;
    }, [isActive]);

    return (
      <button
        type="button"
        ref={(el) => {
          btnRef.current = el;
          registerRef(color.hex, el);
        }}
        onClick={() => onSelect(color.hex)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={onMouseEnter}
        className={`relative h-10 w-10 overflow-hidden rounded-full ${
          isActive ? "blur-xs" : "border-transparent"
        }`}
        style={{
          backgroundColor: color.hex,
          transform: isActive ? "scale(1.15)" : "scale(1)",
          boxShadow: isActive ? `0 0 14px 4px ${color.hex}80` : "none",
        }}
      >
        <span
          ref={glowRef}
          className="pointer-events-none absolute left-0 top-0 h-12 w-12 rounded-full opacity-0"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0) 70%)",
            mixBlendMode: "overlay",
          }}
        />
      </button>
    );
}

export default function ColoringBook({ isMobile }){
    const canvasRef = useRef(null)
    const [activeColor, setActiveColor] = useState(PALETTE[0].hex)
    const swatchRefs = useRef({})
    const prevActiveRef = useRef(PALETTE[0].hex)
    const displaySize = isMobile ? DISPLAY_MOBILE_SIZE : DISPLAY_SIZE;

    useEffect(()=>{
        const canvas = canvasRef.current
        const dpr = window.devicePixelRatio || 1
        const displaySize = isMobile ? DISPLAY_MOBILE_SIZE : DISPLAY_SIZE;

        canvas.width = displaySize * dpr
        canvas.height = displaySize * dpr;
        canvas.style.width = `${displaySize}px`
        canvas.style.height = `${displaySize}px`;
        const ctx = canvas.getContext('2d')
        ctx.scale(dpr,dpr)
        console.log({
          dpr,
          canvasWidth: canvas.width,
          rectWidth: canvas.getBoundingClientRect().width,
        });
        const img = new Image
        img.onload = () => ctx.drawImage(img,0,0,displaySize,displaySize)
        img.src = IMAGE_REF
    }, [])

    const handleClick = useCallback((event)=>{
        const canvas = canvasRef.current
        const ctx =  canvas.getContext('2d')
        const rect = canvas.getBoundingClientRect()
        const scaleX =canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        const startY = Math.floor((event.clientY - rect.top) * scaleY);
        const startX = Math.floor((event.clientX - rect.left) * scaleX);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const didFill = floodFill(imageData, startX, startY, hexToRgba(activeColor));
        if (didFill) ctx.putImageData(imageData, 0, 0);
    }, [activeColor])

    const handleSwatchClick = useCallback(
      (hex) => {
        if (hex === activeColor) return;
        setActiveColor(hex);

        const prevEl = swatchRefs.current[prevActiveRef.current];
        const nextEl = swatchRefs.current[hex];

        if (prevEl)
          gsap.to(prevEl, { scale: 1, duration: 0.25, ease: "power2.out" });

        gsap
          .timeline()
          .to(nextEl, { scale: 1.4, duration: 0.15, ease: "back.out(4)" })
          .to(nextEl, {
            scale: 1.15,
            duration: 0.25,
            ease: "elastic.out(1, 0.4)",
          });

        prevActiveRef.current = hex;
      },
      [activeColor],
    );

    return (
      <div className="flex flex-col items-center justify-items-center gap-10">
        <div
          className="relative"
          style={{ width: displaySize, height: displaySize }}
        >
            <canvas ref={canvasRef} onClick={handleClick} />
            <RisoDots width={displaySize} height={displaySize} />
          </div>
        <div className="flex flex-wrap max-w-80 md:max-w-105  gap-8 justify-between">
          {PALETTE.map((color) => (
            <ColorChange
              key={color.hex}
              color={color}
              isActive={activeColor === color.hex}
              onSelect={handleSwatchClick}
              registerRef={(hex, el) => {
                swatchRefs.current[hex] = el;
              }}
            />
          ))}
        </div>
      </div>
    );
}

