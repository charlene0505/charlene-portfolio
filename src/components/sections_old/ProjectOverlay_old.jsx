import { useEffect } from 'react'

export default function ProjectOverlay({ project, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const handleKey = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
    }
  }, [onClose])

  return (
    <div className="pointer-events-auto fixed inset-0 z-[200] flex items-center justify-center p-6 opacity-100 transition-opacity duration-250" aria-hidden="false">
      <div className="absolute inset-0 bg-[#ebebeb]/55 backdrop-blur-lg" onClick={onClose} />
      <div className="relative flex w-full max-w-[1120px] translate-y-0 animate-view-in flex-col gap-4 transition-transform duration-[280ms] ease-[cubic-bezier(.34,1.3,.64,1)]">
        <button
          className="self-start px-0.5 py-1 font-sans text-[1.9rem] leading-none opacity-75 transition-[opacity,transform] duration-150 hover:-translate-x-[3px] hover:opacity-100"
          onClick={onClose}
        >
          ←
        </button>
        <div className="flex max-h-[82vh] flex-col gap-8 overflow-y-auto rounded-[32px] bg-[#86b5ef] px-12 pb-10 pt-11 [scrollbar-color:rgba(0,0,0,0.2)_transparent] [scrollbar-width:thin] max-[780px]:px-5 max-[780px]:pb-6 max-[780px]:pt-7">
          <div className="flex items-start gap-11 max-[780px]:flex-col">
            <div className="flex basis-[220px] flex-col gap-2 max-[780px]:basis-auto">
              <h2 className="mb-2 font-sans text-[2.75rem] font-medium leading-[1.05] max-[780px]:text-[2rem]">{project.title}</h2>
              <p className="text-[0.85rem] tracking-[0.02em] text-black/55">Time line</p>
              <p className="mb-2 text-[0.9rem] text-[#0f0f0f]">{project.timeline}</p>
              <div className="flex min-h-1 flex-wrap gap-1.5">
                {project.techStack?.map(t => (
                  <span key={t} className="whitespace-nowrap rounded-full bg-white/72 px-3 pb-1 pt-[3px] font-sans text-xs">
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex min-h-1 flex-wrap gap-1.5">
                {project.skills?.map(s => (
                  <span key={s} className="whitespace-nowrap rounded-full bg-white/72 px-3 pb-1 pt-[3px] font-sans text-xs">
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-1 gap-3 max-[780px]:overflow-x-auto max-[780px]:pb-1">
              {project.images?.length
                ? project.images.map((src, i) => (
                    <div key={i} className="flex aspect-[9/16] flex-1 items-center justify-center overflow-hidden rounded-[14px] bg-[#d9d9d9]/75 max-[780px]:min-w-[120px]">
                      <img className="h-full w-full object-cover" src={src} alt="screenshot" />
                    </div>
                  ))
                : Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex aspect-[9/16] flex-1 items-center justify-center overflow-hidden rounded-[14px] bg-[#d9d9d9]/75 max-[780px]:min-w-[120px]">
                      <span className="font-sans text-[0.85rem] text-black/40">Screenshots</span>
                    </div>
                  ))
              }
            </div>
          </div>
          <p className="max-w-[820px] font-sans text-[0.95rem] leading-[1.75] text-black/75">{project.description}</p>
          <div className="flex justify-end max-[780px]:justify-stretch">
            <a
              className="rounded-full bg-white/85 px-[22px] py-2 font-sans text-[0.95rem] transition-colors duration-150 hover:bg-white max-[780px]:w-full max-[780px]:text-center"
              href={project.github || '#'}
            >
              Github Link / Deployed Link
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
