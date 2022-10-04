import { readFile, writeFile } from './files';

import { getLabel, setLabel } from './methods';

class Labels {
  private filePath: string;
  private currentLanguage: string;

  async insertOrEdit(value: string, label: string, language: string): Promise<any> {
    await setLabel(value, label, language, this.filePath);
    return await getLabel(label, language, this.filePath);
  }

  async itExists(name: string): Promise<boolean> {
    const label = await getLabel(name, this.currentLanguage, this.filePath);
    return label !== `[${name}]`;
  }

  async get(name: string, language: string = this.currentLanguage): Promise<string> {
    return await getLabel(name, language, this.filePath);
  }

  async delete(name: string): Promise<void> {
    const labels = await readFile(this.filePath);

    if (!!labels) {
      delete labels[this.currentLanguage][name];
      await writeFile(this.filePath, labels);
    }
  }

  setLanguage(language: string): void {
    this.currentLanguage = language;
  }

  getCurrentLanguage(): string {
    return this.currentLanguage;
  }

  constructor(currentLanguage: string, filePath: string) {
    this.filePath = filePath;
    this.currentLanguage = currentLanguage;
  }
}
export default function (currentLanguage: string, filePath: string) {
  return new Labels(currentLanguage, filePath);
}
