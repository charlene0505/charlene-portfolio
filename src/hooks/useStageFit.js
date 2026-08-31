import { useLayoutEffect, useRef, useState } from 'react'

// Breathing room between the stage and the parent's edges, as a share of the
// parent's available height — a flat px value looks fine on a laptop screen
// but reads as touching the edges once the stage scales up on something like
// a 27" 2560x1440 display, so it scales with the space itself instead.
const EDGE_GAP_RATIO = 0.04
const EDGE_GAP_MIN = 16
// Not a design cap — just a divide-by-zero/CSS-scale(0) guard for absurd inputs.
const SAFETY_FLOOR = 0.05

// Scales a fixed-size "stage" (naturalWidth x its own natural content height)
// to fill whatever room is available in its parent — shrinking so it's never
// clipped, growing past its natural size on bigger screens — while keeping a
// gap from the parent's edges. The parent is expected to be a flex-grow
// region (e.g. `flex-1` between fixed siblings) so its own size doesn't
// depend on the stage's current scale — that would make the budget circular.
export default function useStageFit(naturalWidth) {
  const shellRef = useRef(null)
  const stageRef = useRef(null)
  const [scale, setScale] = useState(1)
  const [height, setHeight] = useState(0)

  useLayoutEffect(() => {
    const shell = shellRef.current
    const stage = stageRef.current
    if (!shell || !stage) return

    const measure = () => {
      const naturalHeight = stage.offsetHeight
      const parent = shell.parentElement
      const parentStyle = window.getComputedStyle(parent)
      const paddingX = parseFloat(parentStyle.paddingLeft) + parseFloat(parentStyle.paddingRight)
      const paddingY = parseFloat(parentStyle.paddingTop) + parseFloat(parentStyle.paddingBottom)
      const availableWidth = parent.clientWidth - paddingX
      const edgeGap = Math.max(EDGE_GAP_MIN, parent.clientHeight * EDGE_GAP_RATIO)
      const heightBudget = parent.clientHeight - paddingY - 2 * edgeGap

      const nextScale = Math.min(availableWidth / naturalWidth, heightBudget / naturalHeight)
      const clampedScale = Math.max(SAFETY_FLOOR, Number.isFinite(nextScale) ? nextScale : 1)
      setScale(clampedScale)
      setHeight(naturalHeight * clampedScale)
    }

    measure()
    window.addEventListener('resize', measure)

    // Web fonts swapping in reflows the intro text (the stage's natural
    // height), which a cold load never fires a `resize` for — re-measure
    // once fonts settle so that isn't locked in stale.
    let cancelled = false
    document.fonts?.ready?.then(() => {
      if (cancelled) return
      measure()
    })

    return () => {
      cancelled = true
      window.removeEventListener('resize', measure)
    }
  }, [naturalWidth])

  return { shellRef, stageRef, scale, height }
}
