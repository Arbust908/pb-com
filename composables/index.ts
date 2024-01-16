import { acceptHMRUpdate, defineStore } from 'pinia'

export const useGeneralStore = defineStore('general', () => {
  const print_mode = ref(false)
  const togglePrintMode = useToggle(print_mode)

  return {
    print_mode,
    togglePrintMode,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useGeneralStore, import.meta.hot))
