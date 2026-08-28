import { useState } from 'react'
import OverlayShell from './OverlayShell'
import ExperienceEntry from './ExperienceEntry'
import { experienceEntries } from '../data/experienceEntries'
import { skillGroups } from '../data/skills'

function SkillGroup({ label, items }) {
  if (items.length === 0) return null

  return (
    <div>
      <h4 className="mb-1.5 font-sans text-[11px] font-semibold uppercase tracking-[.08em] bg-blue-200 text-[#1c1c1c] px-1">
        {label}
      </h4>
      <p className="font-sans text-[13.5px] font-medium leading-[1.7] text-[#1c1c1c]">
        {items
          .map((item, index) => (
            <span key={item} className="whitespace-nowrap">
              {item}
              {index < items.length - 1 && (
                <span className="mx-2 text-[#0c2a52]/35">/</span>
              )}
            </span>
          ))
          .reduce(
            (acc, el) =>
              acc.length
                ? [...acc, <wbr key={`wbr-${acc.length}`} />, el]
                : [el],
            [],
          )}
      </p>
    </div>
  );
}

function SkillGroups() {
  return (
    <>
      {skillGroups.map((group) => (
        <SkillGroup key={group.label} label={group.label} items={group.items} />
      ))}
    </>
  )
}

function CollapsibleSkills() {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <button
        className="flex w-full cursor-pointer items-center justify-between border-y border-[#111]/15 py-3 font-sans text-[12px] font-semibold uppercase tracking-[.08em] text-[#0c2a52]"
        onClick={() => setOpen((value) => !value)}
      >
        Skills
        <span className="text-[16px] leading-none">{open ? '−' : '+'}</span>
      </button>
      {open && (
        <div className="flex flex-col gap-5 pt-4">
          <SkillGroups />
        </div>
      )}
    </div>
  )
}

function Summary({ column }) {
  return (
    <div>
      <h2 className="mb-3 mt-0 font-sans text-[32px] font-semibold leading-[1.05] tracking-[-1px] text-[#0c0c0c]">
        {column.name}
      </h2>
      <p className="font-sans text-[14px] leading-[1.6] text-[#333]">{column.subtitle}</p>
    </div>
  )
}

function Roles({ scrollable }) {
  return (
    <div
      className={`flex flex-col gap-8 ${
        scrollable
          ? 'max-h-[75vh] overflow-y-auto pr-3 [scrollbar-color:rgba(0,0,0,0.2)_transparent] [scrollbar-width:thin]'
          : ''
      }`}
    >
      {experienceEntries.map((entry) => (
        <ExperienceEntry key={`${entry.role}-${entry.company}`} {...entry} />
      ))}
    </div>
  )
}

export default function Experience({ isMobile, column, onBack }) {
  return (
    <OverlayShell
      isMobile={isMobile}
      column={column}
      onBack={onBack}
      showTabs={false}
    >
      {isMobile ? (
        <div className="flex flex-col gap-6">
          <Summary column={column} />
          <CollapsibleSkills />
          <Roles scrollable={false} />
        </div>
      ) : (
        <div className="grid grid-cols-[280px_1fr] items-start gap-14">
          <div className="flex min-w-55 flex-col gap-7 white-space: pre-line">
            <Summary column={column} />
            <SkillGroups />
          </div>
          <Roles scrollable />
        </div>
      )}
    </OverlayShell>
  );
}
