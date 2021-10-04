import { tlbs } from '../index';
const lbs = tlbs('fr', ['es', 'en', 'fr'], 'C:/Users/enmah/Documents/Projects/makuttico/labels/json');

test('ceate and get a label', async () => {
  await lbs.insertOrEdit([
    {
      name: 'hello_world',
      values: {
        es: 'Hola Mundo',
        en: 'Hello World',
        fr: 'Salut Monde',
      },
    },
  ]);

  return lbs.get('hello_world').then((data) => {
    expect(data).toBe('Salut Monde');
  });
});

test('edit a label', async () => {
  await lbs.insertOrEdit([
    {
      name: 'hello_world',
      values: {
        fr: 'Salut Monde 2',
      },
    },
  ]);
  await lbs.get('hello_world').then((data) => {
    expect(data).toBe('Salut Monde 2');
  });
});
