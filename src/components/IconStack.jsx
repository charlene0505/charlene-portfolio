import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'

const EDGE_PAD = 6

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

// A rotated square's axis-aligned bounding box is bigger than its side —
// half-extent at 0°/90° is size/2, growing to size/√2 at 45°. Using this
// instead of a flat size/2 keeps the clamp accurate for a tilted icon too.
function rotatedHalfExtent(size, rotateDeg) {
  const rad = (rotateDeg * Math.PI) / 180
  return (size / 2) * (Math.abs(Math.cos(rad)) + Math.abs(Math.sin(rad)))
}

// Offsets from a shared bottom-center anchor (the box's floor), one entry
// per icon — deliberately off-grid, with its own size too, so the pile reads
// like it actually fell together rather than got arranged. x/y get clamped
// against the real box size (using that icon's own radius) at animate time,
// so however these numbers get tuned, nothing can ever land outside the
// folder.
const LAYOUT = [
  {
    size: 34,
    rest: { x: -93, y: 0, rotate: -14 },
    spread: { x: -99, y: -35, rotate: -22, scale: 1 },
  },
  {
    size: 58,
    rest: { x: -49, y: -5, rotate: 9 },
    spread: { x: -25, y: -37, rotate: 35, scale: 1 },
  },
  {
    size: 68,
    rest: { x: 14, y: 0, rotate: -10 },
    spread: { x: 39, y: -45, rotate: 89, scale: 1 },
  },
  {
    size: 50,
    rest: { x: 72, y: -10, rotate: 0 },
    spread: { x: 89, y: -20, rotate: 10, scale: 1 },
  },
  {
    size: 48,
    rest: { x: -99, y: -50, rotate: 17 },
    spread: { x: -79, y: -77, rotate: 0, scale: 1 },
  },
];

export default function IconStack({ icons, active }) {
  const wrapperRef = useRef(null)
  const iconRefs = useRef([])

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    // offsetWidth/Height (not getBoundingClientRect) — this box sits inside
    // the homepage stage's `transform: scale(...)`, and getBoundingClientRect
    // reports the post-scale viewport size while GSAP's x/y operate in the
    // element's own local, pre-transform space. offsetWidth/Height are
    // layout measurements taken before that transform is applied, so they
    // stay correct at any stage scale.
    const width = wrapper.offsetWidth
    const height = wrapper.offsetHeight
    const els = icons.map((_, i) => iconRefs.current[i]).filter(Boolean)
    const key = active ? 'spread' : 'rest'

    gsap.to(els, {
      x: (i) => {
        const entry = LAYOUT[i % LAYOUT.length]
        const halfExtent = rotatedHalfExtent(entry.size, entry[key].rotate)
        const maxAbsX = Math.max(0, width / 2 - halfExtent - EDGE_PAD)
        return clamp(entry[key].x, -maxAbsX, maxAbsX)
      },
      y: (i) => {
        // Resting (y=0) already sits flush with the floor via items-end —
        // its center is size/2 above the bottom edge. Rotating grows the
        // box by halfExtent in every direction from that same center, so
        // even y=0 can push a rotated icon's bottom past the floor. Both
        // bounds have to shift by the same amount rotation adds beyond the
        // icon's own half-size.
        const entry = LAYOUT[i % LAYOUT.length]
        const { size } = entry
        const halfExtent = rotatedHalfExtent(size, entry[key].rotate)
        const maxY = size / 2 - halfExtent
        const minY = -(height - size / 2 - halfExtent - EDGE_PAD)
        return clamp(entry[key].y, minY, maxY)
      },
      rotate: (i) => LAYOUT[i % LAYOUT.length][key].rotate,
      scale: active ? (i) => LAYOUT[i % LAYOUT.length][key].scale : 1,
      duration: active ? 0.5 : 0.4,
      ease: active ? 'back.out(1.7)' : 'power2.inOut',
      stagger: active ? 0.045 : 0.02,
    })
  }, [active, icons])

  return (
    <div ref={wrapperRef} className="pointer-events-none absolute inset-0 flex items-end justify-center">
      {icons.map((src, i) => {
        const size = LAYOUT[i % LAYOUT.length].size
        return (
          <img
            key={src}
            ref={(el) => (iconRefs.current[i] = el)}
            src={src}
            alt=""
            className="absolute "
            style={{ width: size, height: size }}
          />
        )
      })}
    </div>
  )
}
