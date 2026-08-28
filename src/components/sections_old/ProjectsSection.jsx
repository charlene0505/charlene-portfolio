import { projects } from '../../data/projects'
import ProjectCard from '../ProjectCard'

const PLACEHOLDER_COUNT = 2

export default function ProjectsSection({ onOpenProject }) {
  return (
    <section className="mx-auto max-w-[1160px] px-9 py-[88px] max-[780px]:px-4 max-[780px]:py-16" id="projects" data-section-content>
      <div className="flex flex-col gap-12">
        <h2 className="font-serif text-[clamp(2rem,3.5vw,2.75rem)] font-normal">(Projects)</h2>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(270px,1fr))] items-start gap-8">
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} onOpen={onOpenProject} />
          ))}
          {Array.from({ length: PLACEHOLDER_COUNT }).map((_, i) => (
            <div key={i} className="pointer-events-none flex flex-col text-left opacity-50">
              <div className="h-[22px] w-[44%] rounded-t-[10px] border-[2.5px] border-b-0 border-[#0f0f0f] bg-[#c3ed1c]" />
              <div className="overflow-hidden rounded-[0_20px_20px_20px] border-[2.5px] border-[#0f0f0f] bg-[#c3ed1c]">
                <div className="aspect-[4/3] w-full overflow-hidden bg-[linear-gradient(135deg,rgba(0,0,0,0.04),rgba(0,0,0,0.10))]" />
                <div className="px-[18px] pb-[18px] pt-3.5">
                  <h3 className="mb-1 font-serif text-[1.4rem] font-normal">Project {projects.length + i + 1}</h3>
                  <p className="text-[0.82rem] text-[#444]">Coming soon</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
