import { useEffect, useRef, useState } from 'react'

const INTRO_TEXT =
  'I’m a product designer working where research, systems, and a little bit of play overlap. ' +
  'I build interfaces that stay clear under pressure — and occasionally fold them into folders. ' +
  'Open one to peek inside.'

const DATA = [
  {
    label: '(Stories)',
    name: 'Japan',
    subtitle: 'TT Localization Visual Guidelines',
    items: [
      {
        name: 'Japan',
        timeline: 'Spring 2024 · 6 weeks',
        tags: ['Field Research', 'Localization', 'Type Systems', 'Figma'],
        shots: ['Cover', 'Grid', 'Specimen'],
        link: 'https://github.com/',
        desc: 'A visual localization guideline built during six weeks of field study across Tokyo and Osaka. The system pairs a flexible bilingual type scale with regional color and iconography rules, so product teams can ship Japanese surfaces that feel native rather than translated. Documentation, tokens, and a Figma library shipped together.',
      },
      {
        name: 'Seoul',
        timeline: 'Autumn 2023 · 4 weeks',
        tags: ['Wayfinding', 'Hangul Type', 'Signage'],
        shots: ['Map', 'Signage', 'Kiosk'],
        link: 'https://github.com/',
        desc: 'A wayfinding and signage study for a Seoul transit interchange, balancing Hangul and Latin type so either reads at a glance from across a platform. The work covered a modular sign grid, a pictogram set, and contrast rules tuned for underground lighting.',
      },
      {
        name: 'Lisbon',
        timeline: '2022 · 3 weeks',
        tags: ['Tile Systems', 'Color', 'Print'],
        shots: ['Tiles', 'Palette', 'Poster'],
        link: 'https://github.com/',
        desc: 'A small print series translating azulejo tile patterns into a modular editorial grid. Each poster samples a single facade, abstracts its geometry, and rebuilds it as a repeatable system — a study in how ornament becomes structure.',
      },
    ],
  },
  {
    label: '(Work)',
    name: 'Atlas',
    subtitle: 'Design System Overhaul',
    items: [
      {
        name: 'Atlas',
        timeline: '2023 — Present',
        tags: ['Design Systems', 'Tokens', 'React', 'Documentation'],
        shots: ['Components', 'Tokens', 'Docs'],
        link: 'https://github.com/',
        desc: 'Led the consolidation of four divergent product surfaces into one coherent system. Atlas covers 90+ components, a three-tier token architecture, and a living documentation site adopted by every product squad. Cut design-to-build handoff time roughly in half and made accessibility a default rather than an afterthought.',
      },
      {
        name: 'Beacon',
        timeline: '2023 · 8 weeks',
        tags: ['Notifications', 'IA', 'Prototyping'],
        shots: ['Inbox', 'Rules', 'Digest'],
        link: 'https://github.com/',
        desc: 'A unified notifications framework that gives every team one consistent, respectful way to reach users. Beacon introduced priority tiers, a digest engine, and a preview tool so designers could see exactly what landed in someone’s inbox before shipping it.',
      },
      {
        name: 'Relay',
        timeline: '2022 · ongoing',
        tags: ['CLI', 'Developer UX', 'Docs'],
        shots: ['Setup', 'Commands', 'Output'],
        link: 'https://github.com/',
        desc: 'Internal CLI tooling that turned a multi-step release ritual into a single command. Relay focuses on developer experience: forgiving defaults, readable output, and error messages that tell you what to do next instead of just what went wrong.',
      },
    ],
  },
  {
    label: '(Education)',
    name: 'Field Notes',
    subtitle: 'Research Methods Archive',
    items: [
      {
        name: 'Field Notes',
        timeline: '2022 · Capstone',
        tags: ['UX Research', 'Synthesis', 'Workshops', 'Notion'],
        shots: ['Archive', 'Method', 'Map'],
        link: 'https://github.com/',
        desc: 'A self-directed archive distilling the research methods I learned across my degree into reusable, plain-language playbooks. Each method includes when to reach for it, how to run it, and the failure modes nobody warns you about — written for designers doing research for the first time.',
      },
      {
        name: 'Syllabus',
        timeline: '2021 · 1 semester',
        tags: ['Curriculum', 'Service Design', 'Facilitation'],
        shots: ['Outline', 'Studio', 'Crit'],
        link: 'https://github.com/',
        desc: 'A ground-up redesign of an intro design course around weekly making instead of lectures. The new structure front-loads critique, builds in reflection, and treats the syllabus itself as a designed artifact students can read in five minutes.',
      },
      {
        name: 'Cohort',
        timeline: '2021 · study',
        tags: ['Peer Learning', 'Research', 'Survey'],
        shots: ['Model', 'Survey', 'Findings'],
        link: 'https://github.com/',
        desc: 'A study of how peer learning groups form and sustain themselves across a two-year program. Combined a longitudinal survey with interviews to map what makes a cohort cohere — and what quietly pulls it apart.',
      },
    ],
  },
  {
    label: '(Projects)',
    name: 'Bloom',
    subtitle: 'Plant Care Companion App',
    items: [
      {
        name: 'Bloom',
        timeline: '2023 · Side project',
        tags: ['Product Design', 'Prototyping', 'SwiftUI', 'Branding'],
        shots: ['Home', 'Detail', 'Reminder'],
        link: 'https://github.com/',
        desc: 'A gentle plant-care companion that turns watering schedules into a calm daily ritual instead of a guilt machine. Designed and prototyped end to end — brand, illustration, motion, and a working SwiftUI build. The challenge was warmth without clutter.',
      },
      {
        name: 'Tide',
        timeline: '2022 · Side project',
        tags: ['Habits', 'Motion', 'iOS'],
        shots: ['Today', 'Streak', 'Stats'],
        link: 'https://github.com/',
        desc: 'A habit tracker built around tides instead of streaks — miss a day and the water simply comes back in, no broken chain to mourn. The motion work makes progress feel like a natural rhythm rather than a scoreboard.',
      },
      {
        name: 'Ember',
        timeline: '2021 · Side project',
        tags: ['Reading', 'Typography', 'Sync'],
        shots: ['Library', 'Reader', 'Notes'],
        link: 'https://github.com/',
        desc: 'A quiet reading companion that keeps your place, your highlights, and your pace across devices. Ember is mostly typography: a reader tuned for long sessions, with notes that stay out of the way until you want them.',
      },
    ],
  },
]

const DEFAULT_POSITIONS = [
  { x: 500, y: 86 },
  { x: 588, y: 252 },
  { x: 428, y: 332 },
  { x: 560, y: 452 },
]

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 900)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 900)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return isMobile
}

function Header() {
  return (
    <header className="flex items-center justify-center gap-4 px-0 pb-[18px] pt-[30px]">
      <span className="text-xl leading-none">★</span>
      <span className="whitespace-nowrap font-serif text-[30px] tracking-[.5px]">
        Charlene Liu
      </span>
      <span className="text-xl leading-none">★</span>
    </header>
  )
}

function LabelStrip({ vertical = true }) {
  const size = vertical ? 'text-[6px]' : 'text-[8px]'
  const padding = vertical ? 'px-[5px] py-1' : 'px-[5px] py-2'
  const radius = vertical ? 'rounded-r-[3px]' : 'rounded-l-[3px]'

  return (
    <>
      <span className={`${radius} ${padding} ${size} [writing-mode:vertical-rl] bg-[#df3128] font-sans font-bold tracking-[.06em] text-white`}>
        information
      </span>
      <span className={`${radius} ${padding} ${size} [writing-mode:vertical-rl] border border-[#d8d8d8] bg-white font-sans font-bold tracking-[.06em] text-[#777]`}>
        profile
      </span>
    </>
  )
}

function DesktopFolder({ folder, index, position, hovered, onHover, onOpen, onMove }) {
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

      const dx = moveEvent.clientX - drag.startX
      const dy = moveEvent.clientY - drag.startY
      if (!drag.moved && Math.abs(dx) + Math.abs(dy) > 5) drag.moved = true
      onMove(index, { x: drag.origX + dx, y: drag.origY + dy })
    }

    const handlePointerUp = () => {
      const wasDrag = dragRef.current?.moved
      dragRef.current = null
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)
      if (!wasDrag) onOpen(index)
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
          {folder.name}
        </div>
        <div className="mt-1.5 font-sans text-[9.5px] font-medium italic tracking-[.02em] text-[#666]">
          {folder.subtitle}
        </div>
        <div className="absolute right-[-7px] top-4 flex flex-col items-end gap-[5px]">
          <LabelStrip />
        </div>
      </div>

      <div className="relative z-[1] mt-[58px]">
        <div className="absolute left-0 top-[-13px] h-4 w-[100px] rounded-[8px_12px_0_0] bg-[#c3ed1c]" />
        <div className="relative flex h-[122px] items-end rounded-[2px_15px_15px_15px] bg-[#c3ed1c] px-[18px] pb-4">
          <span className="font-serif text-[27px] text-[#111]">{folder.label}</span>
        </div>
      </div>
    </div>
  )
}

function DesktopHome({ positions, hovered, onHover, onMove, onOpen }) {
  return (
    <div className="relative mx-auto mt-[22px] max-w-[1180px]">
      <div
        className="absolute inset-[-30px] rounded-[52px] bg-[#cdef7e] blur-md"
        aria-hidden="true"
      />
      <div className="relative min-h-[740px] overflow-hidden rounded-[35px] ">
        <div className="relative z-40 max-w-[430px] py-16 pl-[60px]">
          <div className="flex h-[200px] w-[200px] items-center justify-center rounded bg-white">
            <img src="/assets/profile_pic_blue_yellow.png" className='rounded-md' alt="Profile" />{" "}
          </div>
          <h1 className="mb-[18px] mt-[30px] font-serif text-[104px] font-normal leading-[.92] tracking-[-2px]">
            Hello!
          </h1>
          <p className="m-0 max-w-[360px] font-serif text-[19px] leading-[1.5] text-[#1d1d1d]">
            {INTRO_TEXT}
          </p>
          <div className="mt-[22px] inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[.12em] text-[#3c4a00]">
            <span className="text-[15px]">✦</span> drag the folders — click one
            to open
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 z-30">
          {DATA.map((folder, index) => (
            <div className="pointer-events-auto" key={folder.label}>
              <DesktopFolder
                folder={folder}
                index={index}
                position={positions[index]}
                hovered={hovered}
                onHover={onHover}
                onMove={onMove}
                onOpen={onOpen}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileFolder({ folder, index, selected, onTap }) {
  const isSelected = selected === index
  const selectedLift = 34

  return (
    <div
      className="relative cursor-pointer transition-transform duration-[420ms] ease-[cubic-bezier(.2,.8,.2,1)]"
      style={{
        zIndex: 10 + index,
        marginTop: index === 0 ? 0 : -40,
        transform: `translateY(${isSelected ? -selectedLift : 0}px)`,
      }}
      onClick={(event) => {
        event.stopPropagation();
        onTap(index);
      }}
    >
      <div
        className="absolute left-0 top-[-29px] z-[2] rounded-[15px_18px_0_0] bg-[#c3ed1c] px-[26px] pb-[7px] pt-1.5 transition-shadow duration-[420ms]"
        style={{
          boxShadow: isSelected ? '0 -4px 10px -4px rgba(0,0,0,0.25)' : 'none',
        }}
      >
        <span className="whitespace-nowrap font-serif text-[23px] leading-none text-[#111]">
          {folder.label}
        </span>
      </div>
      <div
        className="relative min-h-[118px] rounded-[1px_20px_20px_20px] bg-[#c3ed1c] px-[26px] py-10 transition-shadow duration-[420ms]"
        style={{
          boxShadow: isSelected ? '0 -4px 10px rgba(0,0,0,0.25)' : 'none',
        }}
      >
        <div className="font-sans text-[44px] font-extrabold italic leading-none tracking-[-1.8px] text-[#111]">
          {folder.name}
        </div>
        <div className="mt-3 max-w-[78%] font-sans text-[13.5px] font-medium italic text-[#3d4a08]">
          {folder.subtitle}
        </div>
      </div>
    </div>
  );
}

function MobileHome({ selected, onTap, onDeselect }) {
  return (
    <div className="relative z-[1] px-1.5 pb-11 pt-2" onClick={onDeselect}>
      <div className="flex aspect-square max-h-[330px] w-full items-center justify-center rounded bg-white">
        <span className="font-serif text-[34px] text-[#2a2a2a]">Portrait</span>
      </div>
      <h1 className="mb-3.5 mt-[26px] font-serif text-[64px] font-normal leading-[.9] tracking-[-1.5px]">
        Hello!
      </h1>
      <p className="mb-9 mt-0 font-serif text-lg leading-[1.5] text-[#1d1d1d]">
        {INTRO_TEXT}
      </p>
      <div className="pt-[30px]">
        {DATA.map((folder, index) => (
          <MobileFolder
            key={folder.label}
            folder={folder}
            index={index}
            selected={selected}
            onTap={onTap}
          />
        ))}
      </div>
    </div>
  )
}

function HomeView({ isMobile, positions, hovered, selected, onHover, onMove, onOpen, onMobileTap, onDeselect }) {
  return (
    <div className="view-in px-[26px] pb-[60px] pt-0">
      <Header />
      {isMobile ? (
        <MobileHome selected={selected} onTap={onMobileTap} onDeselect={onDeselect} />
      ) : (
        <DesktopHome
          positions={positions}
          hovered={hovered}
          onHover={onHover}
          onMove={onMove}
          onOpen={onOpen}
        />
      )}
      {isMobile && (
        <div className="pointer-events-none fixed inset-[7px] z-[90] rounded-[34px] border-[3px] border-[#a8d91f]" />
      )}
    </div>
  )
}

function SubTab({ item, active, vertical, onClick }) {
  if (vertical) {
    return (
      <button
        className={`cursor-pointer whitespace-nowrap rounded-[14px] px-[13px] py-5 font-sans text-sm font-bold tracking-[.03em] [text-orientation:mixed] [writing-mode:vertical-rl] transition-[transform,background,color] duration-[260ms] ease-[cubic-bezier(.2,.8,.2,1)] ${
          active
            ? 'translate-x-1.5 bg-[#0c2a52] text-white'
            : 'translate-x-0 bg-white text-[#0c2a52]'
        }`}
        onClick={onClick}
      >
        {item.name}
      </button>
    )
  }

  return (
    <button
      className={`cursor-pointer rounded-full px-[18px] py-[9px] font-sans text-[13px] font-semibold ${
        active
          ? 'bg-[#0c2a52] text-white'
          : 'bg-white text-[#0c2a52]'
      }`}
      onClick={onClick}
    >
      {item.name}
    </button>
  )
}

function ProjectView({ isMobile, activeIdx, activeItem, onSetActiveItem, onBack }) {
  const folder = DATA[activeIdx]
  const item = folder.items[activeItem]

  return (
    <div className="view-in px-[26px] pb-[60px] pt-0">
      <button
        className="flex cursor-pointer items-center gap-2.5 bg-transparent px-1.5 pb-3.5 pt-[30px] font-sans text-[15px] text-[#0f0f0f]"
        onClick={onBack}
      >
        <span className="inline-block text-[30px] leading-none">←</span>
      </button>

      <div
        className={`relative mx-auto max-w-[1180px] rounded-[35px] ${
          isMobile
            ? 'bg-transparent px-1.5 pb-[30px] pt-1.5'
            : 'bg-[#86b5ef] px-[60px] pb-[60px] pt-14'
        }`}
      >
        {isMobile && (
          <div className="mb-[22px] flex flex-wrap gap-2">
            {folder.items.map((tab, index) => (
              <SubTab
                key={tab.name}
                item={tab}
                active={index === activeItem}
                onClick={() => onSetActiveItem(index)}
              />
            ))}
          </div>
        )}

        <div className={`flex flex-wrap items-start ${isMobile ? 'gap-[26px]' : 'gap-[54px]'}`}>
          <div className="min-w-[220px] flex-[0_0_240px]">
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
                  className="rounded-full bg-white px-4 py-[7px] font-sans text-[13.5px] font-medium text-[#0f0f0f]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className={`grid flex-[1_1_400px] gap-[18px] ${isMobile ? 'grid-cols-2' : 'grid-cols-3'}`}>
            {item.shots.map((shot) => (
              <div
                key={shot}
                className="flex aspect-[9/13] items-center justify-center rounded bg-[#d8d8d8]"
              >
                <span className="font-sans text-[15px] font-medium text-[#7a7a7a]">
                  {shot}
                </span>
              </div>
            ))}
          </div>

          {!isMobile && (
            <div className="flex flex-[0_0_auto] flex-col gap-3 pt-0.5">
              {folder.items.map((tab, index) => (
                <SubTab
                  key={tab.name}
                  item={tab}
                  active={index === activeItem}
                  vertical
                  onClick={() => onSetActiveItem(index)}
                />
              ))}
            </div>
          )}
        </div>

        <p
          className="max-w-[760px] font-sans text-base font-normal leading-[1.7] text-[#0d0d0d]"
          style={{ margin: isMobile ? '30px 0 0 0' : '40px 0 0 304px' }}
        >
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

      {isMobile && (
        <div className="pointer-events-none fixed inset-[7px] z-[90] rounded-[34px] border-[3px] border-[#7fb3ef]" />
      )}
    </div>
  )
}

export default function App() {
  const isMobile = useIsMobile()
  const [view, setView] = useState('home')
  const [positions, setPositions] = useState(DEFAULT_POSITIONS)
  const [hovered, setHovered] = useState(-1)
  const [selected, setSelected] = useState(-1)
  const [activeIdx, setActiveIdx] = useState(0)
  const [activeItem, setActiveItem] = useState(0)

  const openProject = (index) => {
    setView('project')
    setActiveIdx(index)
    setActiveItem(0)
    setHovered(-1)
  }

  const goHome = () => {
    setView('home')
    setSelected(-1)
  }

  const moveFolder = (index, nextPosition) => {
    setPositions((current) =>
      current.map((position, positionIndex) =>
        positionIndex === index ? nextPosition : position,
      ),
    )
  }

  const tapMobile = (index) => {
    if (selected === index) {
      openProject(index)
      return
    }
    setSelected(index)
  }

  useEffect(() => {
    if (view === 'home') setSelected(-1)
  }, [isMobile, view])

  if (view === 'project') {
    return (
      <ProjectView
        isMobile={isMobile}
        activeIdx={activeIdx}
        activeItem={activeItem}
        onSetActiveItem={setActiveItem}
        onBack={goHome}
      />
    )
  }

  return (
    <HomeView
      isMobile={isMobile}
      positions={positions}
      hovered={hovered}
      selected={selected}
      onHover={setHovered}
      onMove={moveFolder}
      onOpen={openProject}
      onMobileTap={tapMobile}
      onDeselect={() => setSelected(-1)}
    />
  )
}
