export default function Timeline({ items }) {
  return (
    <div className="flex flex-col gap-12">
      {items.map(item => (
        <div key={item.id} className="flex flex-col gap-1.5 border-l-2 border-[#0f0f0f] pl-7">
          <span className="text-[0.82rem] tracking-[0.03em] text-[#888]">{item.date}</span>
          <h3 className="mt-0.5 font-serif text-2xl font-normal">{item.role}</h3>
          <p className="text-[0.95rem] text-[#444]">{item.company}</p>
          <p className="mt-1 max-w-[560px] text-[0.92rem] leading-[1.65] text-[#444]">{item.description}</p>
        </div>
      ))}
    </div>
  )
}
