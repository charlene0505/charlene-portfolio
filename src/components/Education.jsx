import OverlayShell from './OverlayShell'
import EducationEntry from './EducationEntry'

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

export default function Education({ isMobile, column, onBack }) {
  return (
    <OverlayShell
      isMobile={isMobile}
      column={column}
      onBack={onBack}
      showTabs={false}
    >
      <div className="flex flex-col gap-8 px-8 py-4">
        <Summary column={column} />
        <div className="flex flex-col gap-8">
          {column.items.map((item) => (
            <EducationEntry key={item.name} {...item} />
          ))}
        </div>
      </div>
    </OverlayShell>
  );
}
