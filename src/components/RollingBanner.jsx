import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'

function BannerRun({ hidden = false }) {
  return (
    <div
      className="flex shrink-0 items-center"
      aria-hidden={hidden || undefined}
    >
      {Array.from({ length: 10 }).map((_, index) => (
        <span
          key={index}
          className="mx-4 flex items-center whitespace-nowrap font-serif text-[20px] tracking-[.04em] text-[#111]"
        >
          <span className="mx-4 text-[13px]">★</span>
          Charlene Liu
          <span className="mx-4 text-[13px]">★</span>
        </span>
      ))}
    </div>
  );
}

export default function RollingBanner({ reverse = false, duration = 26 }) {
  const trackRef = useRef(null)

  useLayoutEffect(() => {
    const track = trackRef.current
    const tween = gsap.fromTo(
      track,
      { xPercent: reverse ? -50 : 0 },
      { xPercent: reverse ? 0 : -50, duration, ease: 'none', repeat: -1 },
    )
    return () => tween.kill()
  }, [reverse, duration])

  return (
    <div className="overflow-hidden z-99 bg-transparent py-2.5 ">
      <div ref={trackRef} className="flex w-max">
        <BannerRun />
        <BannerRun hidden />
      </div>
    </div>
  )
}
