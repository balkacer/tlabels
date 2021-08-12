import { tlbs } from "./";

// set the current language and all languages to use
const lbs = tlbs('es-DO', ['es-DO', 'en-US']);

// edit a label if exist or insert if not exist
lbs.insertOrEdit([
    {
        name: 'label_1',
        values: {
            es: 'Hola mundo',
            en: 'Hello world',
        }
    }
]);

// get all labels from current language
let labels = {};
lbs.getAll().then((data) => {
    labels = data;
});
console.log(labels['label_1']);

// get label called "label_1" from current language
let label = "";
lbs.get('label_1').then((data) => {
    label = data;
});
console.log(label);

// delete a label from all languages
lbs.delete('label_1');
