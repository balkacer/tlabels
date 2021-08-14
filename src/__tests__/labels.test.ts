import { tlbs } from '../index';
const lbs = tlbs('es', ['es', 'en'], 'C:/Users/enmah/Documents/Pojects/makuttico/labels/json');

test('ceate and get a label', async () => {
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

test('ceate and edit a label', async () => {
    let first = null;
    let second = null;

    await lbs.insertOrEdit([
        {
            name: 'label_2',
            values: {
                es: '¡todo estu bien!',
                en: 'all right!',
            },
        },
    ]);
    await lbs.get('label_2').then((data) => {
        first = data;
    });
    await lbs.insertOrEdit([
        {
            name: 'label_2',
            values: {
                es: '¡nada estu bien!',
                en: 'nothing be right!',
            },
        },
    ]);
    await lbs.get('label_2').then((data) => {
        second = data
    });

    expect(first).toBe('¡todo estu bien!');
    expect(second).toBe('¡nada estu bien!');
});