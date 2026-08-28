import { Suspense, lazy } from 'react'
import OverlayShell from './OverlayShell'

const ThreeShowcase = lazy(() => import('./ThreeShowcase'))

export default function Projects({ isMobile, column, activeItem, onSetActiveItem, onBack }) {
  const item = column.items[activeItem]

  return (
    <OverlayShell
      isMobile={isMobile}
      column={column}
      activeItem={activeItem}
      onSetActiveItem={onSetActiveItem}
      onBack={onBack}
    >
      <div
        className={`grid grid-cols-[280px_1fr] items-start ${isMobile ? 'gap-[26px]' : 'gap-[54px]'}`}
      >
        <div className="flex flex-col  min-w-[220px] ">
          <h2 className="mb-4 mt-0 font-sans text-[52px] font-semibold leading-[.96] tracking-[-1.5px] text-[#0c0c0c]">
            {item.name}
          </h2>
          <div className="mb-6 font-sans text-[19px] font-medium text-[#0c2a52]">
            {item.timeline}
          </div>
          <div className="flex max-w-[230px] flex-wrap gap-[9px]">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-blue-200 px-4 py-[7px] font-sans text-[13.5px] font-medium text-[#0f0f0f]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-col">
          {item.embed === 'three-demo' ? (
            <div className="flex-[1_1_400px]">
              <Suspense
                fallback={
                  <div className="flex aspect-[16/11] items-center justify-center rounded-2xl bg-[#d8d8d8] font-sans text-[15px] text-[#7a7a7a]">
                    Loading scene…
                  </div>
                }
              >
                <ThreeShowcase />
              </Suspense>
            </div>
          ) : (
            <div
              className={`grid flex-[1_1_400px] gap-[18px] ${isMobile ? 'grid-cols-2' : 'grid-cols-3'}`}
            >
              {item.images.length > 0
                ? item.images.map((src, i) => (
                    <div
                      key={i}
                      className="aspect-[9/13] overflow-hidden rounded bg-[#d8d8d8]"
                    >
                      <img
                        src={src}
                        alt={`${item.name} ${i + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))
                : Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex aspect-[9/13] items-center justify-center rounded bg-[#d8d8d8]"
                    >
                      <span className="font-sans text-[13px] text-[#7a7a7a]">
                        Screenshot
                      </span>
                    </div>
                  ))}
            </div>
          )}
          <p className="mt-10 max-w-[760px] font-sans text-base font-normal leading-[1.7] text-[#0d0d0d]">
            {item.desc}
          </p>

          <div className="mt-[26px] flex justify-end">
            <a
              className="rounded-full bg-white px-[30px] py-3.5 font-sans text-[15px] font-semibold text-[#0f0f0f] no-underline"
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              Github ↗ / Live demo ↗
            </a>
          </div>
        </div>
      </div>
    </OverlayShell>
  )
}
