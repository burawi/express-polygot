# Install
```
npm i express-polyglot --save
```

# Usage

1. Start by creating a folder in which you write your locales, Eg:
    ```
    App Folder
    |___locales
        |   en.js
        |   ar.js
    ...
    ```
    Every file should have `module.exports`, Eg:

    **en.js**:

    ```javascript
    module.exports = {
        hello: 'Hello World'
    };
    ```
2. Now, in your app:

    ```javascript
    var express = require('express');
    var polyglot = require('express-polyglot');

    var app = express();
    ```
As you can see, we changed nothing yet.
3. **Configure Polyglot**: (This is the default configuration)

    ```javascript
    polyglot.configure({
        defaultLang: 'en', // Default language code
        directory: './locales', // Directory of your files
        aliasLangName: 'langName', // The property that will take language code in req (req.langName = 'en')
        aliasTxt: 'strs', // The property that will take language strings in req (req.strs.hello = 'Hello World')
        cookie: 'lang', // The cookie name in which the language code will be stored
        queryParam: 'lang', // The url parameter when switching
    });
    ```
    *If you have nothing to change to default values just don't use the method.*
4. **Use**:

    ```javascript
    app.use(polyglot.load);
    ```
    *Nothing to explain*
5. **Switching**: Set a route where the language will be switched.

    ```javascript
    app.use('/locale', polyglot.switch);
    ```
    Now to switch you can request *'/locale?lang=ar'*.
    > If you changed the queryParam property, use your value instead of 'lang'

    This will change the language and the cookie.
