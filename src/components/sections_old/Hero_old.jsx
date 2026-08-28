import Folder from './Folder'

const FOLDERS = [
  { id: 'stories',   href: '#stories',    label: '(Stories)',   name: 'Japan',       subtitle: 'TT Localization Visual Guidelines', initX: 80,  initY: 60  },
  { id: 'work',      href: '#experience', label: '(Work)',       name: 'Atlas',       subtitle: 'Design System Overhaul',            initX: 290, initY: 30  },
  { id: 'education', href: '#education',  label: '(Education)', name: 'Field Notes', subtitle: 'Research Methods Archive',           initX: 40,  initY: 350 },
  { id: 'projects',  href: '#projects',   label: '(Projects)',  name: 'Bloom',       subtitle: 'Plant Care Companion App',           initX: 280, initY: 380 },
]

export default function Hero() {
  return (
    <section
      className="relative flex flex-col items-center px-9 pb-[110px] pt-1 max-[780px]:px-4 max-[780px]:pb-14 max-[780px]:pt-0"
      id="home"
    >
      <div className="relative flex min-h-[700px] w-full max-w-[1086px] items-stretch overflow-hidden rounded-[35px] bg-[#cdef7e] max-[780px]:min-h-0 max-[780px]:flex-col max-[780px]:overflow-visible max-[780px]:rounded-none max-[780px]:bg-transparent">
        <div className="flex basis-[46%] flex-col justify-center gap-7 px-9 py-[52px] pl-[52px] max-[780px]:basis-auto max-[780px]:items-center max-[780px]:gap-5 max-[780px]:px-6 max-[780px]:pb-0 max-[780px]:pt-7 max-[780px]:text-center">
          <div className="h-[200px] w-[200px] overflow-hidden rounded bg-white max-[780px]:h-[330px] max-[780px]:w-full max-[780px]:max-w-[330px]">
            <img
              className="h-full w-full object-cover object-top"
              src="https://i.pinimg.com/736x/40/9e/de/409edec3dc6b7676e4b656a3d8030b4c.jpg"
              alt="Charlene Liu portrait"
            />
          </div>
          <div className="flex flex-col gap-3.5 max-[780px]:items-center">
            <h2 className="font-serif text-[104px] font-normal leading-[.92] tracking-[-2px] max-[780px]:text-[64px] max-[780px]:tracking-[-1.5px]">
              Hello!
            </h2>
            <p className="max-w-[360px] font-serif text-[19px] leading-[1.5] text-[#1d1d1d] max-[780px]:max-w-full max-[780px]:text-center">
              I&apos;m a designer and developer working where research, systems,
              and a little bit of play overlap — building interfaces that stay
              clear under pressure. Open a folder to peek inside.
            </p>
            <div className="mt-[22px] inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[.12em] text-[#3c4a00] max-[780px]:hidden">
              <span>✦</span> drag the folders — click one to open
            </div>
          </div>
        </div>

        <div className="relative flex-1 max-[780px]:static max-[780px]:flex max-[780px]:flex-col max-[780px]:px-4 max-[780px]:pb-11 max-[780px]:pt-9">
          {FOLDERS.map((f) => (
            <Folder key={f.id} {...f} />
          ))}
        </div>
      </div>
    </section>
  );
}
