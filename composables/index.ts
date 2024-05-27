import { acceptHMRUpdate, defineStore } from 'pinia'

export const useGeneralStore = defineStore('general', () => {
  const print_mode = ref(false)
  const togglePrintMode = useToggle(print_mode)

  const layout_start = ref(false)
  const toggleLayoutStart = useToggle(layout_start)

  return {
    print_mode,
    togglePrintMode,
    layout_start,
    toggleLayoutStart,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useGeneralStore, import.meta.hot))
