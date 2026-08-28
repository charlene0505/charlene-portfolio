import { useState, useRef } from 'react'

export default function Folder({ href, label, name, subtitle, initX = 0, initY = 0 }) {
  const [pos, setPos] = useState({ x: initX, y: initY })
  const [hovered, setHovered] = useState(false)
  const dragging = useRef(false)
  const wasDragged = useRef(false)

  const handlePointerDown = (e) => {
    if (e.pointerType === 'touch') return
    e.preventDefault()
    e.currentTarget.setPointerCapture(e.pointerId)
    dragging.current = true
    wasDragged.current = false
    setHovered(false)
    document.body.style.cursor = 'grabbing'
  }

  const handlePointerMove = (e) => {
    if (!dragging.current) return
    wasDragged.current = true
    setPos(prev => ({ x: prev.x + e.movementX, y: prev.y + e.movementY }))
  }

  const handlePointerUp = () => {
    dragging.current = false
    document.body.style.cursor = ''
  }

  const handleClick = () => {
    if (wasDragged.current) { wasDragged.current = false; return }
    window.location.href = href
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); window.location.href = href }
  }

  const active = hovered && !dragging.current
  const folderClass = [
    'absolute left-[var(--fx)] top-[var(--fy)] w-60 translate-y-[var(--lift)] cursor-grab select-none transition-transform duration-[260ms] ease-[cubic-bezier(.2,.8,.2,1)]',
    'max-[780px]:static max-[780px]:mt-[-40px] max-[780px]:!w-full max-[780px]:!translate-y-0 max-[780px]:cursor-pointer max-[780px]:transition-none first:max-[780px]:mt-0',
  ].join(' ')

  return (
    <div
      className={folderClass}
      style={{
        '--fx': `${pos.x}px`,
        '--fy': `${pos.y}px`,
        '--lift': active ? '-12px' : '0px',
        '--cover-shift': active ? '-36px' : '-16px',
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      role="link"
      tabIndex={0}
      aria-label={`Go to ${label} section`}
    >
      {/* White cover card that peeks from behind */}
      <div className="absolute left-[18px] right-[18px] top-0 z-0 translate-y-[var(--cover-shift)] -rotate-[1.4deg] rounded-[7px] bg-white px-[18px] pb-[22px] pt-4 transition-transform duration-300 ease-[cubic-bezier(.2,.8,.2,1)] max-[780px]:hidden">
        <div className="font-sans text-[30px] font-extrabold italic leading-none tracking-[-1.2px] text-[#111]">
          {name}
        </div>
        <div className="mt-1.5 font-sans text-[9.5px] font-medium italic tracking-[.02em] text-[#666]">
          {subtitle}
        </div>
        <div className="absolute right-[-7px] top-4 flex flex-col items-end gap-[5px]">
          <span className="[writing-mode:vertical-rl] rounded-r-[3px] bg-[#df3128] px-[5px] py-1 font-sans text-[6px] font-bold tracking-[.06em] text-white">
            information
          </span>
          <span className="[writing-mode:vertical-rl] rounded-r-[3px] border border-[#d8d8d8] bg-white px-[5px] py-1 font-sans text-[6px] font-bold tracking-[.06em] text-[#777]">
            profile
          </span>
        </div>
      </div>

      {/* Lime folder front */}
      <div className="relative z-[1] mt-[58px] max-[780px]:mt-0">
        <div
          className="absolute left-0 top-[-13px] h-4 w-[100px] rounded-tl-lg rounded-tr-xl bg-[#c3ed1c] max-[780px]:top-[-29px] max-[780px]:h-auto max-[780px]:w-auto max-[780px]:rounded-tl-[15px] max-[780px]:rounded-tr-[18px] max-[780px]:px-[26px] max-[780px]:py-[6px_7px] max-[780px]:after:font-serif max-[780px]:after:text-[23px] max-[780px]:after:leading-none max-[780px]:after:text-[#111] max-[780px]:after:content-[attr(data-label)]"
          data-label={label}
        />
        <div className="relative flex h-[122px] items-end rounded-[2px_15px_15px_15px] bg-[#c3ed1c] px-[18px] pb-4 max-[780px]:h-auto max-[780px]:min-h-[100px] max-[780px]:w-full max-[780px]:flex-col max-[780px]:items-start max-[780px]:rounded-[1px_20px_20px_20px] max-[780px]:px-[26px] max-[780px]:pb-[22px] max-[780px]:pt-[18px]">
          <span className="font-serif text-[27px] text-[#111] max-[780px]:font-sans max-[780px]:text-[44px] max-[780px]:font-extrabold max-[780px]:italic max-[780px]:leading-none max-[780px]:tracking-[-1.8px]">
            {label}
          </span>
        </div>
      </div>
    </div>
  )
}
