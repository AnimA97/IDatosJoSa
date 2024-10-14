/* global QUnit */

QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function() {
	"use strict";

	/*
	 * NavigationJourney is separated so that each test page runs fast enough (<30s)
	 */
	sap.ui.require([
		"sap/ui/test/Opa5",
		"sap/ui/procesosDNPC/test/integration/arrangements/Startup",
		"sap/ui/procesosDNPC/test/integration/NavigationJourney"
	], function (Opa5, Startup) {

		Opa5.extendConfig({
			arrangements: new Startup(),
			viewNamespace: "sap.ui.procesosDNPC.view.",
			autoWait: true
		});

		QUnit.start();
	});
});