import { tlbs } from '../index';
const lbs = tlbs('es', ['es', 'en'], '/Users/developer/Downloads/py/labels/');

test('ceate a label', async () => {
  await lbs.insertOrEdit([
    {
      name: 'label_1',
      values: {
        es: 'verdadero',
        en: 'true',
      },
    },
  ]);

  return lbs.get('label_1').then((data) => {
    expect(data).toBe('verdadero');
  });
});
