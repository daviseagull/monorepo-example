export const StringUtils = {
  capitalize(value: string): string {
    value = value.toLocaleLowerCase()
    return value.replace(/^\w/, (c) => c.toUpperCase())
  },
}
