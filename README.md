# Translated Labels (TLBS)
Get custom translations to your app easily!

## Installation and Initialization
- Use ```npm i tlbs``` to install
- First, import the libary...
```javascript
import { tlbs } from 'tlbs';
```
- Then initialize passing the language to use, an array with all languages to work and the path to save the json files.
``` javascript
const lbs = tlbs('en', ['en', 'es', 'fr'], 'path/to/save/files/json');
```
## Usage guide
- To **CREATE** or **EDIT** a label...
```javascript
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
```
## Usage guide
- To **CREATE** or **EDIT** various labels...
```javascript
await lbs.insertOrEdit([
  {
    name: 'hello_world',
    values: {
      en: 'Hello World',
      es: 'Hola Mundo',
    },
  },
  {
    name: 'hello_world_2',
    values: {
      en: 'Hello World 2',
      fr: 'Salut Monde 2'
    },
  },
]);
```
- To **GET** a specific label use...
 ```javascript
await lbs.get('hello_world').then((label) => {
  // do all you want with label here
  // label is a string
});
```
- To **GET ALL** use:
```javascript
await lbs.getAll().then((labels) => {
  // do all you want with labels
  // labels is an object
});
```
- To **DELETE** one...
```javascript
await lbs.delete('hello_world');
```

_**Note:**_ The name of the labels must be as ```another_name``` and not as ```another name``` or ```another-name```. This will turn into a javascript object and json as well, those rules prevent the library from breaking.
