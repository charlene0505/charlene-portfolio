import RollingBanner from './RollingBanner'
import Folder from './Folder'
import useStageFit from '../hooks/useStageFit'
import { columns } from '../data/columns'

const INTRO_TEXT =
  'I’m a designer and developer working where research, systems, and a little bit of play overlap. ' +
  'I build interfaces that stay clear under pressure — and occasionally fold them into folders. ' +
  'Open one to peek inside.'

const STAGE_WIDTH = 1180

function DesktopHome({ positions, hovered, onHover, onMove, onOpen }) {
  const { shellRef, stageRef, scale, height } = useStageFit(STAGE_WIDTH)

  return (
    <div
      ref={shellRef}
      className="mx-auto mt-0"
      style={{ width: STAGE_WIDTH * scale, height: height || undefined }}
    >
      <div
        ref={stageRef}
        className="relative"
        style={{ width: STAGE_WIDTH, transform: `scale(${scale})`, transformOrigin: 'top left' }}
      >
        <div
          className="absolute inset-[-30px] rounded-[52px] bg-[#cdef7e] blur-md"
          aria-hidden="true"
        />
        <div className="relative min-h-185 overflow-hidden rounded-[35px]">
          <div className="relative z-40 max-w-107 py-16 pl-15">
            <div className="flex h-75 w-60 items-start justify-start overflow-hidden rounded-xl bg-[#cdef7e]">
              <img
                src="/assets/charlene-profile-riso.png"
                className="h-full w-full rounded-md object-cover object-top"
                alt="Profile"
              />
            </div>
            <h1 className="mb-5 mt-2 font-serif text-[104px] font-normal leading-[.92] tracking-[-2px]">
              Hello!
            </h1>
            <p className="m-0 max-w-90 font-serif text-[19px] leading-normal text-[#1d1d1d]">
              {INTRO_TEXT}
            </p>
            <div className="mt-5 inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[.12em] text-[#3c4a00]">
              <span className="text-[15px]">✦</span> drag the folders — click one
              to open
            </div>
          </div>

          <div className="pointer-events-none absolute inset-0 z-30">
            {columns.map((column, index) => (
              <div className="pointer-events-auto" key={column.id}>
                <Folder
                  column={column}
                  index={index}
                  position={positions[index]}
                  hovered={hovered}
                  onHover={onHover}
                  onMove={onMove}
                  onOpen={onOpen}
                  scale={scale}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileHome({ selected, onTap, onDeselect }) {
  return (
    <div
      className="relative z-1 mx-auto w-full max-w-105 px-8 pb-8 pt-2"
      onClick={onDeselect}
    >
      <div className="flex aspect-auto max-h-82.5 w-full items-center justify-start overflow-hidden rounded-xl bg-white">
        <img
          src="/assets/charlene-profile-riso.png"
          className="h-full w-full object-cover object-top"
          alt="Profile"
        />
      </div>
      <h1 className="mb-3.5 mt-6.5 font-serif text-[64px] font-normal leading-[.9] tracking-[-1.5px]">
        Hello!
      </h1>
      <p className="mb-9 mt-0 font-serif text-lg leading-normal text-[#1d1d1d]">
        {INTRO_TEXT}
      </p>
      <div className="pt-7.5">
        {columns.map((column, index) => (
          <Folder
            key={column.id}
            column={column}
            index={index}
            isMobile
            selected={selected}
            onTap={onTap}
          />
        ))}
      </div>
    </div>
  );
}

export default function HomeView({
  isMobile,
  positions,
  hovered,
  selected,
  onHover,
  onMove,
  onOpen,
  onMobileTap,
  onDeselect,
}) {
  return (
    <div className="view-in flex flex-col  ">
      <RollingBanner />
      {isMobile ? (
        <MobileHome
          selected={selected}
          onTap={onMobileTap}
          onDeselect={onDeselect}
        />
      ) : (
        <div className="flex min-h-0 flex-1 flex-col justify-center px-20">
          <DesktopHome
            positions={positions}
            hovered={hovered}
            onHover={onHover}
            onMove={onMove}
            onOpen={onOpen}
          />
        </div>
      )}
      <RollingBanner reverse />
      {isMobile && (
        <div className="pointer-events-none fixed inset-[7px] z-[90] rounded-[34px] outline-30 outline-[#a8d91f]" />
      )}
    </div>
  );
}
