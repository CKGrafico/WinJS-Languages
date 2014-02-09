/*
    This is a simple library to help you managing languages on Windows 8.1 with WinJS
    author: @CKGrafico
    version: 0.1
*/


(function (global) {

    'use strict';
    var applicationData = Windows.Storage.ApplicationData.current;
    var roamingSettings = applicationData.roamingSettings;
    var resourceContext = Windows.ApplicationModel.Resources.Core.ResourceContext.getForCurrentView();

    var strings = {
        'Choose Language': 'Choose Language'
    };

    var menu = new Windows.UI.Popups.PopupMenu();
  
    //Language Class
    var Languages = WinJS.Class.define(
        // Constructor
        function () {
            this.setCurrent(
                (roamingSettings.values['WinjsLanguages']) ? JSON.parse(roamingSettings.values['WinjsLanguages']) : null ||
                { label: resourceContext.languages[0], id: resourceContext.languages[0] } ||
                { label: 'English', id: 'en-US' }
            );
        },

        // Instance Members
        {
            translate: function (string) {
                var translated = WinJS.Resources.getString(string);
                if (!translated.empty) {
                    return translated.value;
                }

                return '*' + string;
            },

            setCurrent: function (language) {
                Windows.Globalization.ApplicationLanguages.primaryLanguageOverride = language.id;
                roamingSettings.values['WinjsLanguages'] = JSON.stringify({ id: language.id, label: language.label });
                this.language = language;
            },

            getCurrent: function () {
                return this.language;
            },

            list: {},

            add: function (language) {
                if (!Array.isArray(language)) {
                    language = [language];
                }
                for (var i = 0; i < language.length; i++) {
                    this.list[language[i].id] = language[i].label || language[i].id;
                    menu.commands.append(new Windows.UI.Popups.UICommand(language[i].label, null, language[i].id));
                }  
            },

            show: function (point) {
                var point = point || this.point || { x: window.innerWidth - 100, y: window.innerHeight - 100 };
                menu.showAsync(point).then(function (invoked) {
                    if (invoked) {
                        global.languages.setCurrent(invoked);
                    }
                });
            }

        }
    );

    global.languages = new Languages();
    global.translate = languages.translate;

    if (global.Handlebars) {
        Handlebars.registerHelper('i18n', translate);
    }


})(window);