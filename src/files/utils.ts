export function toSnakeCase(text: string): string {
  return text.replace(/([A-Z])/g, (match) => `_${match.toLowerCase()}`).replace(/^_/, '');
}
