# Translated Labels (TLBS)
Get custom translations to your app easily!

## Installation and Initialization
Use ``` npm i tlabels ``` to install.

Then, in your code, import the module.
```javascript
import tLabels from 'tlabels';
```
Next, initialize the instance with the default language and the path to the labels file (If not exist, it will be created).
``` javascript
const labels = tLabels('en', 'path/to/save/files/json');
```
Now you can use the instance to get the labels.
## Usage guide
- To **CREATE** or **EDIT** a label, use the method ``` setLabel ``` passing the label name, the label value and the language to use (optional, default is the default language that you set in the initialization).
``` javascript
// Create a label in the default language
await labels.setLabel('hello_world', 'hello world');

// Create a label in a specific language
await labels.setLabel('hello_world', 'hello world', 'en');
```
- To **GET** a specific label value, use the method ``` getLabel ``` passing the label name and the language to use (optional).
 ```javascript
// Get the label value in the default language
let label = await labels.getLabel('hello_world');

// Get the label value in a specific language
let label = await labels.getLabel('hello_world', 'pt');
```
- To **DELETE** one label use the method ``` deleteLabel ``` passing just the label name.
```javascript
await labels.deleteLabel('hello_world');
```
- To check if a label **EXIST**, use the method ``` exist ``` passing the label name.
```javascript
let labelExist = await labels.exist('hello_world');
```
- To get **CURRENT LANGUAGE** use the method ``` getCurrentLanguage ``` without parameters (is not async).
```javascript
let language = labels.getCurrentLanguage();
```
- To **CHANGE LANGUAGE** use the method ``` setCurrentLanguage ``` passing the language to use (is not async).
```javascript
labels.setCurrentLanguage('es');
```
## Notes
- The name of the labels must be unique, if you try to create a label with the same name in the same language, the value will be updated.

- The labels key must be in the format **snake case**. Ex: ``` label_name ```. If you try to create a label with a key in another format, the key will be converted to snake case.
- If you try to get a label that does not exist, the method ``` getLabel ``` will return the label name.
- If you remoove a label, the label will be removed from all languages.
