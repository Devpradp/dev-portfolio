import { useEffect, useState, useRef, RefObject } from 'react'

export function useInView(ref: RefObject<HTMLElement>, options?: IntersectionObserverInit) {
  const [isInView, setIsInView] = useState(false)
  const hasInitialized = useRef(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Add a small delay to ensure the page has fully rendered
    // This prevents elements below the fold from being visible on initial load
    const timeoutId = setTimeout(() => {
      hasInitialized.current = true
    }, 150)

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Only check after initial delay to prevent immediate visibility on page load
        if (!hasInitialized.current) return
        
        // Only set to true if the intersection ratio meets the threshold
        const threshold = options?.threshold ?? 1
        if (entry.intersectionRatio >= threshold) {
          setIsInView(true)
        } else {
          setIsInView(false)
        }
      },
      {
        threshold: options?.threshold ?? 1,
        ...options,
      }
    )

    observer.observe(element)

    return () => {
      clearTimeout(timeoutId)
      observer.disconnect()
    }
  }, [ref, options])

  return isInView
}

