import { useLayoutEffect, useRef, useState } from 'react'

const EDGE_GAP = 32
// Not a design cap — just a divide-by-zero/CSS-scale(0) guard for absurd inputs.
const SAFETY_FLOOR = 0.05

// Scales a fixed-size "stage" (naturalWidth x its own natural content height)
// down to fit whatever room is actually available in the viewport, so it
// never gets clipped and always keeps a gap from the window edges.
export default function useStageFit(naturalWidth) {
  const shellRef = useRef(null)
  const stageRef = useRef(null)
  const [scale, setScale] = useState(1)
  const [height, setHeight] = useState(0)
  const chromeRef = useRef(null)

  useLayoutEffect(() => {
    const shell = shellRef.current
    const stage = stageRef.current
    if (!shell || !stage) return

    // On mount the shell is still at its default, unscaled size (scale=1,
    // height=auto), so this read gives an exact measurement of the fixed
    // chrome (header + padding) around the stage — captured once and reused.
    // Re-deriving it later from DOM state we've since scaled ourselves is
    // fragile to render/paint timing; a cached constant isn't. It's retaken
    // once web fonts finish swapping in, since that reflows the header/intro
    // text and would otherwise lock in a stale pre-font measurement forever
    // (a cold load never fires a `resize` to correct it).
    // Read `shell.offsetHeight` (whatever height is *currently* applied —
    // natural at mount, already-shrunk on a later recapture), not
    // `stage.offsetHeight` (always the natural size, since transform doesn't
    // affect layout) — the two only coincide when scale is still 1.
    const captureChrome = () => {
      chromeRef.current = shell.parentElement.offsetHeight - shell.offsetHeight
    }
    if (chromeRef.current === null) captureChrome()

    const measure = () => {
      const naturalHeight = stage.offsetHeight
      const availableWidth = shell.parentElement.clientWidth
      const heightBudget = window.innerHeight - chromeRef.current - 2 * EDGE_GAP

      const nextScale = Math.min(1, availableWidth / naturalWidth, heightBudget / naturalHeight)
      const clampedScale = Math.max(SAFETY_FLOOR, Number.isFinite(nextScale) ? nextScale : 1)
      setScale(clampedScale)
      setHeight(naturalHeight * clampedScale)
    }

    measure()
    window.addEventListener('resize', measure)

    let cancelled = false
    document.fonts?.ready?.then(() => {
      if (cancelled) return
      captureChrome()
      measure()
    })

    return () => {
      cancelled = true
      window.removeEventListener('resize', measure)
    }
  }, [naturalWidth])

  return { shellRef, stageRef, scale, height }
}
