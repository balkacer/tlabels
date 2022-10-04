import { readFile, writeFile } from './files';
import { getLabel, setLabel } from './methods';

class Labels {
  private filePath: string;
  private currentLanguage: string;

  async setLabel(value: string, label: string, language: string = this.currentLanguage): Promise<any> {
    await setLabel(value, label, language, this.filePath);
    return await getLabel(label, language, this.filePath);
  }

  async exist(name: string): Promise<boolean> {
    const label = await getLabel(name, this.currentLanguage, this.filePath);
    return label !== `[${name}]`;
  }

  async getLabel(name: string, language: string = this.currentLanguage): Promise<string> {
    return await getLabel(name, language, this.filePath);
  }

  async deleteLabel(name: string): Promise<void> {
    const labels = await readFile(this.filePath);

    if (!!labels) {
      delete labels[this.currentLanguage][name];
      await writeFile(this.filePath, labels);
    }
  }

  setCurrentLanguage(language: string): void {
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
