export function formatDate(date: Date | string, format: string = 'yyyy-MM-dd'): string {
  let dateToFormat = typeof date === 'string' ? new Date(date) : date
  return dateToFormat.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export function formatDateAsCompact(date: Date | string): string {
  let dateToFormat = typeof date === 'string' ? new Date(date) : date
  const day = dateToFormat.getDate()
  const month = dateToFormat.toLocaleString('en-US', { month: 'short' })
  return `${day} ${month}`
}

export function formatToRelativeTime(date: Date | string): string {
  let dateToFormat = typeof date === 'string' ? new Date(date) : date
  return dateToFormat.toLocaleString('en-US', { timeStyle: 'short' })
}