// `items` is the trail from Home to the current page — every item except the
// last should have an `onClick` (the last one is the current page, plain
// text). The arrow steps back one level: to the second-to-last item's
// target, or straight home if there's nowhere shallower to go.
export default function Breadcrumb({ items }) {
  const back = items.length > 1 ? items[items.length - 2].onClick : items[0]?.onClick

  return (
    <nav className="flex flex-wrap items-center gap-1.5 px-1.5 pb-3.5 pt-[30px] font-sans text-[15px] text-[#0f0f0f]">
      <button
        className="mr-1 cursor-pointer bg-transparent"
        onClick={back}
        aria-label="Back"
      >
        <span className="inline-block text-[24px] leading-none">←</span>
      </button>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <span className="text-[#9a9a9a]">/</span>}
          {item.onClick ? (
            <button
              className="cursor-pointer bg-transparent underline-offset-2 hover:underline"
              onClick={item.onClick}
            >
              {item.label}
            </button>
          ) : (
            <span className="text-[#5b6a86]">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
