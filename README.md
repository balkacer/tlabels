# Translated Labels (TLBS)
Get custom translations to your app easily!

## Installation and Initialization
- Use ``` npm i tlabels ``` to install
- First, import the libary...
```javascript
import tLabels from 'tlabels';
```
- Then initialize passing the language to use by default and the path to save the json files.
``` javascript
const labels = tLabels('en', 'path/to/save/files/json');
```
## Usage guide
- To **CREATE** or **EDIT** a label, use the method ``` setLabel ``` passing the label name, the label value and the language to use.
``` javascript
await labels.insertOrEdit('hello_world', 'hello world', 'en');
```
- To **GET** a specific label value, use the method ``` getLabel ``` passing the label name and the language to use (optional).
 ```javascript
let label = await lbs.get('hello_world');
```
- To **DELETE** one label use the method ``` deleteLabel ``` passing just the label name.
```javascript
await lbs.delete('hello_world');
```
- To check **IF EXIST** if exist a label, use the method ``` exist ``` passing the label name.
```javascript
let labelExist = await lbs.itExist('hello_world');
```
- To get **CURRENT LANGUAGE** use the method ``` getLanguage ``` without parameters (is not async).
```javascript
let language = lbs.getLanguage();
```
- To **CHANGE LANGUAGE** use the method ``` setLanguage ``` passing the language to use (is not async).
```javascript
lbs.setLanguage('pt');
```

_**Note:**_ The name of the labels must be as ```another_name``` and not as ```another name``` or ```another-name```. This will turn into a javascript object and json as well, those rules prevent the library from breaking.
