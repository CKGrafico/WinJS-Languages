// Para obtener una introducción a la plantilla En blanco, consulte la siguiente documentación:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
	"use strict";

	var app = WinJS.Application;
	var activation = Windows.ApplicationModel.Activation;

	app.onactivated = function (args) {
		if (args.detail.kind === activation.ActivationKind.launch) {
		    if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {

		        // Add one
		        languages.add({
		            id: 'es-ES',
		            label: 'Español'
		        });

		        //Add some
		        languages.add([
                    {
                        id: 'ca-ES',
                        label: 'Català'
                    },
                    {
                        id: 'en-US',
                        label: 'English'
                    },
                    {
                        id: 'pt-PT',
                        label: 'Portugués'
                    }
		        ]);


		        $('.lang').text(languages.getCurrent().label);
		        $('button').on('click', function () {
		            languages.show();
		        });
		        $('#winjslanguage').click();
			}
			args.setPromise(WinJS.UI.processAll());
		}
	};

	app.oncheckpoint = function (args) {

	};

	app.start();
})();
