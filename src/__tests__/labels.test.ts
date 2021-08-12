// import { tlbs } from '../index';
// const lbs = tlbs('es', ['es', 'en']);

test('sum 1 + 1 shuld equals to 2', () => {
    const sum = 1 + 1;
    expect(sum).toBe(2);
});

// test('ceate a label', async () => {
//     await lbs.insertOrEdit([
//         { 
//             name: 'label_1', 
//             values: { 
//                 es: 'verdadero', 
//                 en: 'true' 
//             } 
//         }
//     ]);

//     return lbs.get('label_1').then((data) => {
//         expect(data).toBe('verdadero');
//     });
// });