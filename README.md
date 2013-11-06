
WinJS Languages Helper
=====================


Helper to more easy the languages in WinJS

----------

#### Examples

**Include #default.html**

    ...
    <script src="Scripts/WinjsLanguages.js"></script>
    ...

**Creating strings files**

    | Yourproject
                || strings
                        || es-ES
                                ||resources.resjson
                        || en-US
                                ||resources.resjson
**Example Strings en-US**

    {
        "Hello": "Hello",
        "Day": "Day"
    }

**Example Strings es-ES**

    {
        "Hello": "Hola",
        "Day": "Día"
    }

**Getter and setter**

    (function (g, languages) {
         var currentLang = languages.getLanguage();
         languages.setLanguage('es-ES');
    })(window, window.languages);

**Translating**

    (function (g, t) {
         var hi = t('Hello!')
    })(window, window.translate);

**Optional Handlebars**

    <div>{{i18n 'Hello'}}</div>