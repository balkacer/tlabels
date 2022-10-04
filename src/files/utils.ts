export function toSnakeCase(text: string): string {
  return text
    .replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)
    .replace(/\W+/g, ' ')
    .split(/ |\B(?=[A-Z])/)
    .map((word) => word.toLowerCase())
    .join('_');
}
