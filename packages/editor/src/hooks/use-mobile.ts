import * as React from 'react'

const MOBILE_BREAKPOINT = 768
const MOBILE_LANDSCAPE_MAX_HEIGHT = 500

function getIsMobileViewport() {
  if (typeof window === 'undefined') {
    return false
  }

  const isNarrowViewport = window.innerWidth < MOBILE_BREAKPOINT
  const isCompactTouchLandscape = window.matchMedia(
    `(pointer: coarse) and (max-height: ${MOBILE_LANDSCAPE_MAX_HEIGHT}px)`,
  ).matches

  return isNarrowViewport || isCompactTouchLandscape
}

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const widthMql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const landscapeMql = window.matchMedia(
      `(pointer: coarse) and (max-height: ${MOBILE_LANDSCAPE_MAX_HEIGHT}px)`,
    )
    const onChange = () => {
      setIsMobile(getIsMobileViewport())
    }

    widthMql.addEventListener('change', onChange)
    landscapeMql.addEventListener('change', onChange)
    window.addEventListener('resize', onChange)
    onChange()

    return () => {
      widthMql.removeEventListener('change', onChange)
      landscapeMql.removeEventListener('change', onChange)
      window.removeEventListener('resize', onChange)
    }
  }, [])

  return !!isMobile
}
