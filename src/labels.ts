import * as fs from 'fs';
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
interface Label {
  name: string;
  values: any;
}
const getLanguageJsonFiles = async (language: string, filesPath: string): Promise<any> => {
  const request = new XMLHttpRequest();
  let json = {};
  request.open('GET', (filesPath[filesPath.length - 1] === '/' ? filesPath : filesPath + "/") + language + '.json');
  request.responseType = 'json';
  request.send();
  request.onload = () => {
    json = request.response;
  }
  return new Promise<any>(() => json as any);
};
const getTranslatios = async (languages: string[], filesPath: string): Promise<any> => {
  return new Promise<any>((resolve) => {
    const translations = Object.fromEntries(languages.map((language) => [language, '']));
    languages.forEach(async (language: string) => {
      await getLanguageJsonFiles(language, filesPath).then((labels: any) => {
        translations[language] = labels;
      });
    });
    resolve(translations);
  });
};
const generateOrEditLanguagesJsonFiles = (translations: any, languages: string[]): void => {
  languages.forEach((language: string) => {
    fs.writeFile(language + '.json', JSON.stringify(translations[language]), (err) => {
      if (err) throw err;
    });
  });
};
const insertOrEditLabels = async (labels: Label[], languages: string[], filesPath: string): Promise<void> => {
  return await getTranslatios(languages, filesPath).then((translations) => {
    labels.forEach(({ name: label, values }) => {
      languages.forEach((language) => {
        translations[language] = translations[language] || {};
        translations[language][label] = values[language];
      });
    });
    return translations;
  }).then((translations) => {
    generateOrEditLanguagesJsonFiles(translations, languages);
  });
};
const getAllLabels = async (language: string, languages: string[], filesPath: string): Promise<any> => {
  return await getTranslatios(languages, filesPath).then((translations) => translations[language]);
};
const getLabel = async (name: string, language: string, languages: string[], filesPath: string): Promise<string> => {
  return await getTranslatios(languages, filesPath).then((translations) => translations[language][name] as string);
};
const deleteLabel = async (name: string, languages: string[], filesPath: string): Promise<void> => {
  new Promise<any>(async (resolve) => {
    const translations = await getTranslatios(languages, filesPath);
    languages.forEach((language) => {
      delete translations[language][name];
    });
    resolve(translations);
  }).then((translations) => {
    generateOrEditLanguagesJsonFiles(translations, languages);
  });
};

class Methods {
  insertOrEdit: (labels: Label[]) => Promise<void>;
  getAll: () => Promise<any>;
  get: (name: string) => Promise<string>;
  delete: (name: string) => Promise<void>;
  private languages: string[];
  private filesPath: string;
  private useLanguage: string;

  constructor(useLanguage: string, languages: string[], filesPath: string) {
    this.languages = languages;
    this.filesPath = filesPath;
    this.useLanguage = useLanguage;

    this.insertOrEdit = async (labels: Label[]): Promise<void> =>
      await insertOrEditLabels(labels, this.languages, this.filesPath);
    this.getAll = async (): Promise<any> => await getAllLabels(this.useLanguage, this.languages, this.filesPath);
    this.get = async (name: string): Promise<string> => await getLabel(name, this.useLanguage, this.languages, this.filesPath);
    this.delete = async (name: string): Promise<void> => await deleteLabel(name, this.languages, this.filesPath);
  }
}

export default (useLanguage: string, languages: string[], filesPath: string) => new Methods(useLanguage, languages, filesPath);
