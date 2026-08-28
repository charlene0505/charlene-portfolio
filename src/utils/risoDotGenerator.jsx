import { useRef, useEffect } from "react";
import gsap from 'gsap'

const DOT_COUNT = 100000

export default function RisoDots({width,height}){
    const canvasRef = useRef(null)

    useEffect(()=>{
        const canvas = canvasRef.current; 
        const dpr = window.devicePixelRatio || 1
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`
        canvas.style.height = `${height}px`;
        const ctx = canvas.getContext('2d')
        ctx.scale(dpr,dpr)

        const dots = Array.from({ length: DOT_COUNT }, () => ({
          x: Math.random() * width,
          y: Math.random() * height,
          r: Math.random() * 0.2 + 0.2,
          baseAlpha: Math.random() * 0.2 + 0.1,
        }));

        function draw(alphaMultiplier) {
          ctx.clearRect(0, 0, width, height);
          for (const dot of dots) {
            ctx.beginPath();
            ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255,255,255,${dot.baseAlpha * alphaMultiplier})`;
            ctx.fill();
          }
        }
        draw(0);

        const tween = gsap.to(
          { t: 0 },
          {
            t: 1,
            duration: 1.6,
            ease: "power2.out",
            onUpdate: function () {
              draw(this.targets()[0].t);
            },
          },
        );

        return () => tween.kill();

    }, [width, height])

    return (
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 mix-blend-mode: soft-light"
      />
    );
}