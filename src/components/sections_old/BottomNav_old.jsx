import { useState, useEffect } from 'react'

const NAV_ITEMS = [
  { label: 'projects',   section: 'projects' },
  { label: 'designs',    section: 'designs' },
  { label: 'experience', section: 'experience' },
  { label: 'education',  section: 'education' },
]

export default function BottomNav() {
  const [active, setActive] = useState('projects')

  useEffect(() => {
    const sections = document.querySelectorAll('[data-section-content][id]')
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { threshold: 0.45 },
    )
    sections.forEach(s => io.observe(s))
    return () => io.disconnect()
  }, [])

  return (
    <nav className="absolute bottom-9 left-1/2 z-10 flex -translate-x-1/2 gap-1.5 max-[780px]:static max-[780px]:mt-6 max-[780px]:flex-wrap max-[780px]:justify-center max-[780px]:gap-1.5 max-[780px]:translate-x-0">
      {NAV_ITEMS.map(({ label, section }) => (
        <a
          key={section}
          className={[
            'whitespace-nowrap rounded-[7px] border-[1.5px] border-white px-[22px] pb-[7px] pt-1.5 font-sans text-base font-normal text-white transition-colors duration-150 hover:bg-[#1e1e1e]',
            active === section ? 'bg-[#1e1e1e]' : 'bg-[#5a5a5a]',
          ].join(' ')}
          href={`#${section}`}
          data-section={section}
          onClick={() => setActive(section)}
        >
          {label}
        </a>
      ))}
    </nav>
  )
}
