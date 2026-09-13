export function getTranslation<T extends object>(
  item: { translations: Record<string, T> },
  field: keyof T & string,
  locale: string,
): string {
  const value = item.translations[locale]?.[field] ?? item.translations.en?.[field]
  return typeof value === 'string' ? value : ''
}

export function formatDate(
  date: string,
  locale: string,
  options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: '2-digit' },
): string {
  return new Date(date).toLocaleDateString(locale, { ...options, timeZone: 'UTC' })
}

export function useCvTranslation() {
  const { locale } = useI18n()
  return {
    getTranslation: <T extends object>(item: { translations: Record<string, T> }, field: keyof T & string): string =>
      getTranslation(item, field, locale.value),
  }
}
