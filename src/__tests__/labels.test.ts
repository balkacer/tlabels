import tLabel from '../index';
const path = require('path');
const filePath = path.join(__dirname, '/testLabels.json');
const lbs = tLabel('es', filePath);

test('should create label hello with value Hola in default lang', async () => {
  await lbs.setLabel('Hola', 'hello');

  await lbs.getLabel('hello').then((data) => {
    expect(data).toBe('Hola');
  });
});

test('should create label hello with value Hola in fr', async () => {
  await lbs.setLabel('Bonjour', 'hello', 'fr');

  await lbs.getLabel('hello').then((data) => {
    expect(data).toBe('Hola');
  });
  await lbs.getLabel('hello', 'fr').then((data) => {
    expect(data).toBe('Bonjour');
  });
});

test('should label change in default language', async () => {
  await lbs.getLabel('hello').then((data) => {
    expect(data).toBe('Hola');
  });

  await lbs.setLabel('Hola 2', 'hello', 'es');

  await lbs.getLabel('hello').then((data) => {
    expect(data).toBe('Hola 2');
  });
});

test('should remove label from default language', async () => {
  await lbs.getLabel('hello').then((data) => {
    expect(data).toBe('Hola 2');
  });

  await lbs.deleteLabel('hello');

  await lbs.getLabel('hello').then((data) => {
    expect(data).toBe('[hello]');
  });
});

test('should label not exist in the default language', async () => {
  await lbs.setLabel('Hola', 'hello', 'es');

  await lbs.getLabel('hello').then((data) => {
    expect(data).toBe('Hola');
  });

  await lbs.deleteLabel('hello');

  await lbs.exist('hello').then((data) => {
    expect(data).toBe(false);
  });
});

test('should label exist in the default language', async () => {
  await lbs.setLabel('Hola', 'hello', 'es');

  await lbs.exist('hello').then((data) => {
    expect(data).toBe(true);
  });
});

test('should receive a label name not in snake case format and create it in snake case format', async () => {
  await lbs.setLabel('Hola', 'hello world', 'es');

  await lbs.exist('hello_world').then((data) => {
    expect(data).toBe(true);
  });
});

test('should get and change current language', () => {
  let priorLanguage = lbs.getCurrentLanguage();
  expect(priorLanguage).toBe('es');

  lbs.setCurrentLanguage('en');

  let currentLanguage = lbs.getCurrentLanguage();
  expect(currentLanguage).not.toBe(priorLanguage);
});
