import PillTab from "./Tab"

function WritingList({ posts, onOpen }) {
  if (posts.length === 0) {
    return <p className="font-sans text-[15px] text-[#0d0d0d]">More writing coming soon.</p>
  }

  return (
    <div className="flex flex-col gap-4">
      {posts.map((post) => (
        <button
          key={post.slug}
          className="flex cursor-pointer flex-col items-center rounded-[3px] border border-[#111] bg-white px-6 py-5 text-center"
          onClick={() => onOpen(post.slug)}
        >
          <span className="font-serif text-[20px] text-[#0c2a52]">{post.title}</span>
          <span className="mt-3 flex w-full max-w-[380px] items-center gap-2.5">
            <span className="h-px flex-1 bg-[#111]/55" />
            <span className="whitespace-nowrap font-sans text-[11.5px] text-[#5b6a86]">
              {post.date}
            </span>
            <span className="h-px flex-1 bg-[#111]/55" />
          </span>
          {post.excerpt && (
            <span className="mt-3 font-sans text-[13.5px] leading-[1.6] text-[#333]">
              {post.excerpt}
            </span>
          )}
          <span className="mt-4 rounded-[3px] bg-[#111] px-[18px] py-2 font-sans text-[12px] font-semibold text-white">
            Read more
          </span>
        </button>
      ))}
    </div>
  )
}

function WritingReader({ post, onBack }) {
  const Content = post.Content
  return (
    <div className="max-w-[720px]">
      <button
        className="mb-4 cursor-pointer bg-transparent font-sans text-[14px] font-semibold text-[#0c2a52]"
        onClick={onBack}
      >
        ← All writing
      </button>
      <h3 className="mb-1 font-serif text-[34px] text-[#0c0c0c]">{post.title}</h3>
      <div className="mb-6 font-sans text-[13px] text-[#5b6a86]">{post.date}</div>
      <div className="mdx-content font-sans text-[16px] leading-[1.7] text-[#0d0d0d]">
        <Content />
      </div>
    </div>
  )
}

function MediaGrid({ items, label, onOpen }) {
  if (items.length === 0) {
    return (
      <p className="font-sans text-[15px] text-[#0d0d0d]">
        More {label.toLowerCase()} coming soon.
      </p>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-[18px] sm:grid-cols-3">
      {items.map((entry, index) => (
        <button
          key={`${entry.title}-${entry.date}`}
          className="flex cursor-pointer flex-col overflow-hidden rounded-2xl bg-white text-left"
          onClick={() => onOpen(index)}
        >
          <div className="aspect-[4/5] overflow-hidden bg-[#d8d8d8]">
            <img src={entry.image} alt={entry.title} className="h-full w-full object-cover" />
          </div>
          <div className="px-4 py-3">
            <div className="font-serif text-[16px] text-[#0c0c0c]">{entry.title}</div>
            <div className="font-sans text-[12px] text-[#5b6a86]">{entry.date}</div>
          </div>
        </button>
      ))}
    </div>
  )
}

function MediaLightbox({ entry, onClose }) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-6"
      onClick={onClose}
    >
      <div className="max-w-[520px]" onClick={(event) => event.stopPropagation()}>
        <img src={entry.image} alt={entry.title} className="w-full rounded-2xl" />
        <div className="mt-3 flex items-center justify-between font-sans text-white">
          <span className="text-[16px]">{entry.title}</span>
          <span className="text-[13px] opacity-70">{entry.date}</span>
        </div>
      </div>
    </div>
  )
}

export default function CreativeView({ isMobile, column, subKey, itemKey, onNavigate, onBack }) {
  const subcategories = column.subcategories
  const activeIndex = Math.max(
    0,
    subcategories.findIndex((sub) => sub.id === subKey),
  )
  const activeSubcategory = subcategories[activeIndex]
  const isWriting = activeSubcategory.kind === 'writing'

  const activePost =
    isWriting && itemKey ? activeSubcategory.items.find((post) => post.slug === itemKey) : null
  const lightboxIndex = !isWriting && itemKey != null ? Number(itemKey) : null

  return (
    <div className="view-in px-6 pb-10 pt-5 bg-white">
      <button
        className="flex cursor-pointer items-center gap-2.5 bg-transparent px-1.5 pb-3.5 pt-[30px] font-sans text-[15px] text-[#0f0f0f]"
        onClick={onBack}
      >
        <span className="inline-block text-[30px] leading-none">←</span>
      </button>

      <div className="relative mx-auto min-h-[80vh] max-w-[1180px]">
        {!isMobile && (
          <div
            className="absolute -inset-8 rounded-[40px] bg-[#6db2f2] opacity-70 blur-2xl"
            aria-hidden="true"
          />
        )}

        <div
          className={`relative min-h-[80vh] w-auto rounded-[10px] ${
            isMobile
              ? "bg-transparent px-1.5 pb-[30px] pt-1.5"
              : "border border-[#111] bg-white px-15 pb-10 pt-10"
          }`}
        >
          {!activePost && (
            <div className="mb-8 inline-flex w-fit gap-2 border">
              {subcategories.map((sub) => (
                <PillTab
                  key={sub.id}
                  label={sub.label}
                  active={sub.id === activeSubcategory.id}
                  onClick={() => onNavigate(sub.id)}
                />
              ))}
            </div>
          )}

          {isWriting ? (
            activePost ? (
              <WritingReader post={activePost} onBack={() => onNavigate(activeSubcategory.id)} />
            ) : (
              <WritingList
                posts={activeSubcategory.items}
                onOpen={(slug) => onNavigate(activeSubcategory.id, slug)}
              />
            )
          ) : (
            <MediaGrid
              items={activeSubcategory.items}
              label={activeSubcategory.label}
              onOpen={(index) => onNavigate(activeSubcategory.id, index)}
            />
          )}
        </div>
      </div>

      {lightboxIndex !== null && (
        <MediaLightbox
          entry={activeSubcategory.items[lightboxIndex]}
          onClose={() => onNavigate(activeSubcategory.id)}
        />
      )}

      {isMobile && (
        <div className="pointer-events-none fixed inset-[7px] z-[90] rounded-[34px] border-[3px] border-[#7fb3ef]" />
      )}
    </div>
  )
}
