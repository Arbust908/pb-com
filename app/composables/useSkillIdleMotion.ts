import type { Ref } from 'vue'
import { computed, onBeforeUnmount, onMounted, shallowRef, watch } from 'vue'

export function useSkillIdleMotion(element: Ref<HTMLElement | null>) {
  const isAnimating = shallowRef(false)
  const isVisible = shallowRef(false)
  const prefersReducedMotion = shallowRef(false)
  const isDocumentVisible = shallowRef(true)
  let timer: ReturnType<typeof setTimeout> | undefined
  let animationTimer: ReturnType<typeof setTimeout> | undefined
  let observer: IntersectionObserver | undefined
  let mediaQuery: MediaQueryList | undefined

  const canAnimate = computed(() =>
    isVisible.value && isDocumentVisible.value && !prefersReducedMotion.value,
  )

  function clearTimers() {
    if (timer)
      clearTimeout(timer)
    if (animationTimer)
      clearTimeout(animationTimer)
    timer = undefined
    animationTimer = undefined
  }

  function schedule() {
    clearTimers()
    isAnimating.value = false

    if (!canAnimate.value)
      return

    const delay = 20_000 + Math.random() * 25_000
    timer = setTimeout(() => {
      if (!canAnimate.value)
        return

      isAnimating.value = true
      animationTimer = setTimeout(() => {
        isAnimating.value = false
        schedule()
      }, 700)
    }, delay)
  }

  function updateDocumentVisibility() {
    isDocumentVisible.value = !document.hidden
  }

  function updateReducedMotion(event: MediaQueryListEvent) {
    prefersReducedMotion.value = event.matches
  }

  onMounted(() => {
    mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    prefersReducedMotion.value = mediaQuery.matches
    isDocumentVisible.value = !document.hidden

    observer = new IntersectionObserver(([entry]) => {
      isVisible.value = entry?.isIntersecting ?? false
    }, { threshold: 0.01 })

    if (element.value)
      observer.observe(element.value)

    document.addEventListener('visibilitychange', updateDocumentVisibility)
    mediaQuery.addEventListener('change', updateReducedMotion)
  })

  watch(element, (current, previous) => {
    if (previous)
      observer?.unobserve(previous)
    if (current)
      observer?.observe(current)
  })

  watch(canAnimate, schedule)

  onBeforeUnmount(() => {
    clearTimers()
    observer?.disconnect()
    document.removeEventListener('visibilitychange', updateDocumentVisibility)
    mediaQuery?.removeEventListener('change', updateReducedMotion)
  })

  return { isAnimating }
}
