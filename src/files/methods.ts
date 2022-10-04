import { readFile, writeFile } from './files';
import { toSnakeCase } from './utils';

export async function getLabel(name: string, language: string, filePath: string): Promise<string> {
  const labels = await readFile(filePath);

  if (!!labels) {
    if (!!labels[language]) {
      return labels[language][name] || `[${name}]`;
    }
  }

  return `[${name}]`;
}

export async function setLabel(value: string, name: string, language: string, filePath: string): Promise<void> {
  const labels = await readFile(filePath);

  if (!!labels) {
    if (!labels[language]) {
      labels[language] = {};
    }

    let labelName = toSnakeCase(name);

    labels[language][labelName] = value;
    await writeFile(filePath, labels);
  }
}
