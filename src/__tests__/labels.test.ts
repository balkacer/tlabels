import tLabel from '../index';
const path = require('path');
const filePath = path.join(__dirname, '/testLabels.json');
const lbs = tLabel('es', filePath);

test('should create label hello with value Hola in es language', async () => {
  await lbs.insertOrEdit('Hola', 'hello', 'es');

  await lbs.get('hello').then((data) => {
    expect(data).toBe('Hola');
  });
});

test('should label change in default language', async () => {
  await lbs.get('hello').then((data) => {
    expect(data).toBe('Hola');
  });

  await lbs.insertOrEdit('Hola 2', 'hello', 'es');

  await lbs.get('hello').then((data) => {
    expect(data).toBe('Hola 2');
  });
});

test('should remove label from default language', async () => {
  await lbs.get('hello').then((data) => {
    expect(data).toBe('Hola 2');
  });

  await lbs.delete('hello');

  await lbs.get('hello').then((data) => {
    expect(data).toBe('[hello]');
  });
});

test('should label not exist in the default language', async () => {
  await lbs.insertOrEdit('Hola', 'hello', 'es');

  await lbs.get('hello').then((data) => {
    expect(data).toBe('Hola');
  });

  await lbs.delete('hello');

  await lbs.itExists('hello').then((data) => {
    expect(data).toBe(false);
  });
});

test('should label exist in the default language', async () => {
  await lbs.insertOrEdit('Hola', 'hello', 'es');

  await lbs.itExists('hello').then((data) => {
    expect(data).toBe(true);
  });
});

test('should get and change current language', () => {
  let priorLanguage = lbs.getCurrentLanguage();
  expect(priorLanguage).toBe('es');
  lbs.setLanguage('en');
  let currentLanguage = lbs.getCurrentLanguage();
  expect(currentLanguage).not.toBe(priorLanguage);
});
