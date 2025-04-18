// format a raw file size to a human readable format
export function formatFileSize(size: number): string {
  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  let index = 0
  while (size >= 1024 && index < units.length - 1) {
    size /= 1024
    index++
  }
  return `${size.toFixed(2)} ${units[index]}`
}

export function formatCurrency(amount: number, currency: string = 'USD', locale: string = 'en-US'): string {
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  })
  return formatter.format(amount)
}
