import { useRef } from 'react'

function LabelStrip() {
  return (
    <>
      <span className="rounded-r-[3px] bg-[#df3128] px-[5px] py-1 text-[6px] font-sans font-bold tracking-[.06em] text-white [writing-mode:vertical-rl]">
        information
      </span>
      <span className="rounded-r-[3px] border border-[#d8d8d8] bg-white px-[5px] py-1 text-[6px] font-sans font-bold tracking-[.06em] text-[#777] [writing-mode:vertical-rl]">
        profile
      </span>
    </>
  )
}

function MobileFolder({ column, index, selected, onTap }) {
  const isSelected = selected === index

  return (
    <div
      className="relative cursor-pointer transition-transform duration-420 ease-[cubic-bezier(.2,.8,.2,1)] shadow shadow-top"
      style={{
        zIndex: 10 + index,
        marginTop: index === 0 ? 0 : -40,
        transform: `translateY(${isSelected ? -34 : 0}px)`,
      }}
      onClick={(event) => {
        event.stopPropagation()
        onTap(index)
      }}
    >
      <div
        className="absolute left-0 top-[-29px] z-[2] rounded-[15px_18px_0_0] bg-[#c3ed1c] px-[26px] pb-[7px] pt-1.5 transition-shadow duration-[420ms]"
        style={{ boxShadow: isSelected ? '0 -4px 10px -4px rgba(0,0,0,0.25)' : 'none' }}
      >
        <span className="whitespace-nowrap font-serif text-[23px] leading-none text-[#111]">
          {column.label}
        </span>
      </div>
      <div
        className="relative min-h-[118px] rounded-[1px_20px_20px_20px] bg-[#c3ed1c] px-[26px] py-10 transition-shadow duration-[420ms]"
        style={{ boxShadow: isSelected ? '0 -4px 10px rgba(0,0,0,0.25)' : 'none' }}
      >
        <div className="font-sans text-[44px] font-extrabold italic leading-none tracking-[-1.8px] text-[#111]">
          {column.name}
        </div>
        <div className="mt-3 max-w-[78%] font-sans text-[13.5px] font-medium italic text-[#3d4a08]">
          {column.subtitle}
        </div>
      </div>
    </div>
  )
}

function DesktopFolder({ column, index, position, hovered, onHover, onOpen, onMove, scale = 1 }) {
  const dragRef = useRef(null)
  const isHovered = hovered === index

  const handlePointerDown = (event) => {
    event.preventDefault()
    dragRef.current = {
      startX: event.clientX,
      startY: event.clientY,
      origX: position.x,
      origY: position.y,
      moved: false,
    }

    const handlePointerMove = (moveEvent) => {
      const drag = dragRef.current
      if (!drag) return

      const dx = (moveEvent.clientX - drag.startX) / scale
      const dy = (moveEvent.clientY - drag.startY) / scale
      if (!drag.moved && Math.abs(dx) + Math.abs(dy) > 5) drag.moved = true
      onMove(index, { x: drag.origX + dx, y: drag.origY + dy })
    }

    const handlePointerUp = () => {
      const wasDrag = dragRef.current?.moved
      dragRef.current = null
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)
      if (!wasDrag) {
        // The browser still fires a native "click" after this pointerup. By the time
        // it arrives, onOpen() below has already swapped the DOM (Home -> the opened
        // view), so that trailing click can land on whatever is now rendered in the
        // same screen position. Swallow it so it can't leak through.
        window.addEventListener(
          'click',
          (event) => {
            event.preventDefault()
            event.stopPropagation()
          },
          { capture: true, once: true },
        )
        onOpen(index)
      }
    }

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', handlePointerUp)
  }

  return (
    <div
      className="absolute w-60 cursor-grab select-none touch-none transition-transform duration-[260ms] ease-[cubic-bezier(.2,.8,.2,1)] active:cursor-grabbing"
      style={{
        left: position.x,
        top: position.y,
        zIndex: dragRef.current ? 60 : 10 + index,
        transform: `translateY(${isHovered ? -12 : 0}px)`,
      }}
      onPointerDown={handlePointerDown}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(-1)}
    >
      <div
        className="absolute left-[18px] right-[18px] top-0 z-0 -rotate-[1.4deg] rounded-[7px] bg-white px-[18px] pb-[22px] pt-4 transition-transform duration-300 ease-[cubic-bezier(.2,.8,.2,1)]"
        style={{ transform: `translateY(${isHovered ? -36 : -16}px) rotate(-1.4deg)` }}
      >
        <div className="font-sans text-[30px] font-extrabold italic leading-none tracking-[-1.2px] text-[#111]">
          {column.name}
        </div>
        <div className="mt-1.5 font-sans text-[9.5px] font-medium italic tracking-[.02em] text-[#666]">
          {column.subtitle}
        </div>
        <div className="absolute right-[-7px] top-4 flex flex-col items-end gap-[5px]">
          <LabelStrip />
        </div>
      </div>

      <div className="relative z-[1] mt-[58px]">
        <div className="absolute left-0 top-[-13px] h-4 w-[100px] rounded-[8px_12px_0_0] bg-[#c3ed1c]" />
        <div className="relative flex h-[122px] items-end rounded-[2px_15px_15px_15px] bg-[#c3ed1c] px-[18px] pb-4">
          <span className="font-serif text-[27px] text-[#111]">{column.label}</span>
        </div>
      </div>
    </div>
  )
}

export default function Folder(props) {
  return props.isMobile ? <MobileFolder {...props} /> : <DesktopFolder {...props} />
}
