import { education } from '../../data/education'
import Timeline from '../Timeline'

export default function EducationSection() {
  return (
    <section className="mx-auto max-w-[1160px] px-9 py-[88px] max-[780px]:px-4 max-[780px]:py-16" id="education" data-section-content>
      <div className="flex flex-col gap-12">
        <h2 className="font-serif text-[clamp(2rem,3.5vw,2.75rem)] font-normal">(Education)</h2>
        <Timeline items={education} />
      </div>
    </section>
  )
}
