/* https://www.aang.dev/playground/view-transition-theme-switcher */
export function useViewTransitionToggle(toggleFn: () => void) {
  function handleClick(e: MouseEvent) {
    const md = window.matchMedia('(max-width: 768px)').matches
    const x = e.clientX
    const y = e.clientY
    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y),
    )

    if (
      !document?.startViewTransition
      || window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      toggleFn()
      return
    }

    const transition = document.startViewTransition(() => {
      toggleFn()
    })

    transition.ready.then(() => {
      const duration = md ? 400 : 600
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
          filter: ['blur(5px)', 'blur(0)'],
        },
        {
          duration,
          easing: 'cubic-bezier(.76,.32,.29,.99)',
          pseudoElement: '::view-transition-new(root)',
        },
      )
    })
  }

  return { handleClick }
}
