import PillTab from './Tab'

export default function OverlayShell({
  isMobile,
  column,
  activeItem,
  onSetActiveItem,
  onBack,
  showTabs = true,
  children,
}) {
  return (
    <div className="view-in px-6 pb-10 pt-5 bg-white">
      <button
        className="flex cursor-pointer items-center gap-2.5 bg-transparent px-1.5 pb-3.5 pt-[30px] font-sans text-[15px] text-[#0f0f0f]"
        onClick={onBack}
      >
        <span className="inline-block text-[30px] leading-none">←</span>
      </button>

      <div className="relative mx-auto min-h-[80vh] max-w-295">
        {!isMobile && (
          <div
            className="absolute -inset-8 rounded-[40px] bg-[#6db2f2] opacity-70 blur-2xl"
            aria-hidden="true"
          />
        )}

        <div
          className={`relative min-h-[80vh] w-auto rounded-[10px] ${
            isMobile
              ? 'bg-transparent px-1.5 pb-[30px] pt-1.5'
              : 'border border-[#111] bg-white px-15 pb-10 pt-10'
          }`}
        >
          {showTabs && column.items.length > 1 && (
            <div className="mb-8 inline-flex w-fit gap-2 border">
              {column.items.map((tab, index) => (
                <PillTab
                  key={tab.name}
                  label={tab.name}
                  active={index === activeItem}
                  onClick={() => onSetActiveItem(index)}
                />
              ))}
            </div>
          )}

          {children}
        </div>
      </div>

      {isMobile && (
        <div className="pointer-events-none fixed inset-[7px] z-[90] rounded-[34px] border-[3px] border-[#7fb3ef]" />
      )}
    </div>
  )
}
