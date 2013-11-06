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

    //Language Class
    var Languages = WinJS.Class.define(
        // Constructor
        function () {
            this.setLanguage(roamingSettings.values['AppLanguage'] || resourceContext.languages[0] || 'en-US');
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

            setLanguage: function (language) {

                Windows.Globalization.ApplicationLanguages.primaryLanguageOverride = language;
                roamingSettings.values['AppLanguage'] = language;
                this.language = language;
            },

            getLanguage: function () {
                return this.language;
            }

        }
    );

    global.languages = new Languages();
    global.translate = languages.translate;

    if(Handlebars) {
        Handlebars.registerHelper('i18n', translate);
    }


})(window);