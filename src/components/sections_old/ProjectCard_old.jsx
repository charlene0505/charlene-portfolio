export default function ProjectCard({ project, onOpen }) {
  return (
    <button
      className="group flex cursor-pointer flex-col text-left transition-transform duration-200 ease-[cubic-bezier(.34,1.56,.64,1)] hover:-translate-y-1.5"
      onClick={() => onOpen(project)}
    >
      <div className="h-[22px] w-[44%] rounded-t-[10px] border-[2.5px] border-b-0 border-[#0f0f0f] bg-[#c3ed1c]" />
      <div className="overflow-hidden rounded-[0_20px_20px_20px] border-[2.5px] border-[#0f0f0f] bg-[#c3ed1c]">
        <div className="aspect-[4/3] w-full overflow-hidden bg-black/6">
          {project.thumb && (
            <img
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
              src={project.thumb}
              alt={project.title}
            />
          )}
        </div>
        <div className="px-[18px] pb-[18px] pt-3.5">
          <h3 className="mb-1 font-serif text-[1.4rem] font-normal">{project.title}</h3>
          <p className="text-[0.82rem] text-[#444]">{project.subtitle}</p>
        </div>
      </div>
    </button>
  )
}
