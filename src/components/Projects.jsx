import { Suspense, lazy } from 'react'
import OverlayShell from './OverlayShell'

const ThreeShowcase = lazy(() => import('./ThreeShowcase'))
const ColoringBook = lazy(() => import("./ColoringBook"));

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
        className={` h-full grid grid-rows-[280px_1fr] md:grid-rows-none md:grid-cols-[280px_1fr] items-stretch ${isMobile ? "gap-6" : "gap-14"}`}
      >
        <div className="flex flex-col md:border-r h-full min-w-55 justify-between ">
          <div className="flex flex-col">
            <h2
              className="md:rounded-tl-xl pt-3 pb-10 md:pb-30 font-news text-6xl text-white font-semibold leading-[.96] tracking-[-1.5px]"
              style={{ backgroundColor: item.nameColor || "#000000" }}
            >
              {item.name}
            </h2>
            <h6
              className="font-news text-2xl text-white/50 font-light leading-[.96] tracking-[-1.5px]"
              style={{ backgroundColor: item.nameColor || "#000000" }}
            >
              built by
            </h6>
            <div className="flex w-full flex-wrap">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className=" flex flex-1 bg-neutral-200 px-4 py-2 font-news text-sm font-bold text-[#0f0f0f]"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex flex-col gap-4 px-5 py-5">
              {(Array.isArray(item.desc) ? item.desc : [item.desc]).map(
                (paragraph, i) => (
                  <p
                    key={i}
                    className="whitespace-pre-line font-news text-base font-normal leading-[1.7] text-neutral-700"
                  >
                    {paragraph}
                  </p>
                ),
              )}
            </div>
          </div>

          <div className="flex flex-wrap justify-end pr-5 items-center gap-x-4 gap-y-2">
            <span className="font-news text-lg font-medium text-[#0f0f0f]">
              {item.timeline}
            </span>
            {item.githubLink && (
              <a
                className="font-news text-lg font-semibold text-[#0f0f0f] underline"
                href={item.githubLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Github ↗
              </a>
            )}
            {item.demoLink && (
              <a
                className="font-news text-lg font-semibold text-[#0f0f0f] underline"
                href={item.demoLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Live demo ↗
              </a>
            )}
          </div>
        </div>

        <div className="flex flex-col pt-60 md:py-20">
          {item.embed === "color-book" ? (
            <div className="flex-[1_1_200px]">
              <Suspense
                fallback={
                  <div className="flex aspect-[16/11] items-center justify-center rounded-2xl bg-[#d8d8d8] font-sans text-[15px] text-[#7a7a7a]">
                    Loading scene…
                  </div>
                }
              >
                <ColoringBook isMobile={isMobile} />
              </Suspense>
            </div>
          ) : (
            <div
              className={`grid flex-[1_1_400px] gap-[18px] ${isMobile ? "grid-cols-2" : "grid-cols-3"}`}
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
        </div>
      </div>
    </OverlayShell>
  );
}
