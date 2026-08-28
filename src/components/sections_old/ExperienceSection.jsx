import { experience } from '../../data/experience'
import Timeline from '../Timeline'

export default function ExperienceSection() {
  return (
    <section className="mx-auto max-w-[1160px] px-9 py-[88px] max-[780px]:px-4 max-[780px]:py-16" id="experience" data-section-content>
      <div className="flex flex-col gap-12">
        <h2 className="font-serif text-[clamp(2rem,3.5vw,2.75rem)] font-normal">(Work)</h2>
        <Timeline items={experience} />
      </div>
    </section>
  )
}
