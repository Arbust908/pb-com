export function joinArrayWithDifferentLastElement(arr: any[], separator: string = ', ', lastSeparator?: string): string {
  if (arr.length === 0) {
    return ''
  }
  else if (arr.length === 1) {
    return arr[0].toString()
  }
  else if (lastSeparator) {
    const lastElement = arr.pop()
    const joinedArray = arr.join(separator)
    return `${joinedArray}${lastSeparator}${lastElement}`
  }
  else {
    const joinedArray = arr.join(separator)
    return joinedArray
  }
}
