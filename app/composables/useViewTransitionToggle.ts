export function useViewTransitionToggle(toggleFn: () => unknown) {
  function handleClick() {
    if (
      !document?.startViewTransition
      || window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      void toggleFn()
      return
    }

    document.startViewTransition(async () => {
      await toggleFn()
    })
  }

  return { handleClick }
}
