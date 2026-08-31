import PillTab from './Tab'
import Breadcrumb from './Breadcrumb'

export default function OverlayShell({
  isMobile,
  column,
  activeItem,
  onSetActiveItem,
  onBack,
  showTabs = true,
  children,
}) {
  const item = column.items[activeItem]
  const glowColor = item?.nameColor || "#6db2f2"

  return (
    <div className="view-in px-6 pb-10 pt-5 bg-white">
      <Breadcrumb
        items={[{ label: 'Home', onClick: onBack }, { label: column.name }]}
      />

      <div className="relative mx-auto min-h-[80vh] max-w-295">
        {!isMobile && (
          <div
            className="pointer-events-none absolute -inset-8 animate-shimmer rounded-[40px] opacity-70 blur-2xl"
            style={{
              backgroundImage: `linear-gradient(115deg,
                color-mix(in srgb, ${glowColor} 55%, white),
                color-mix(in srgb, ${glowColor} 25%, white),
                ${glowColor},
                color-mix(in srgb, ${glowColor} 70%, black))`,
              backgroundSize: "300% 300%",
            }}
            aria-hidden="true"
          />
        )}

        <div
          className={`relative flex min-h-[80vh] w-auto rounded-xl ${
            isMobile
              ? "bg-transparent px-1.5 pb-[30px] pt-1.5"
              : "border border-[#111] bg-white pb-0 pr-10"
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

          <div className="flex-1">{children}</div>
        </div>
      </div>

      {isMobile && (
        <div className="pointer-events-none fixed inset-1.75 z-90 rounded-[34px]  outline-[#7fb3ef] outline-25" />
      )}
    </div>
  );
}
