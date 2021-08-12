import { tlbs } from '../index';

test('ceate a label', () => {
    const lbs = tlbs('es', ['es', 'en']);
    lbs.insertOrEdit([
        { 
            name: 'label_1', 
            values: { 
                es: 'verdadero', 
                en: 'true' 
            } 
        }
    ]);

    expect(lbs.get('label_1')).toBe('verdadero');
});