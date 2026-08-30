export default function ExperienceEntry({ role, company, timeline, description, tags }) {
  return (
    <div className="border-b border-[#111]/15 pb-8 last:border-b-0 last:pb-0">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="m-0 font-sans text-[26px] font-semibold leading-[1.1] text-[#0c0c0c]">
          {role}
        </h3>
        <span className="whitespace-nowrap font-sans text-[13px] font-medium text-[#0c2a52]">
          {timeline}
        </span>
      </div>

      <div className="mt-1 font-sans text-[15px] font-medium text-[#5b6a86]">
        {company}
      </div>

      <p className="mt-3 w-auto md:max-w-160 font-sans text-[15px] whitespace-pre-wrap font-normal leading-[1.7] text-[#0d0d0d]">
        {description}
      </p>

      {tags?.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5 overflow-x-auto">
          {tags.map((tag) => (
            <span
              key={tag}
              className="whitespace-nowrap rounded-full bg-blue-200 px-2.5 py-1 font-sans text-[11px] font-medium text-[#0f0f0f]"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
