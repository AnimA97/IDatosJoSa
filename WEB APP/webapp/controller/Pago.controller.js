sap.ui.define([
	"./BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/Sorter",
	"sap/m/GroupHeaderListItem",
	"sap/ui/Device",
	"sap/ui/core/Fragment",
	"../model/formatter",
	"sap/ui/core/format/DateFormat"
], function (BaseController, JSONModel, Filter, FilterOperator, Sorter, GroupHeaderListItem, Device, Fragment, formatter, DateFormat) {
	"use strict";
	let that;
	return BaseController.extend("sap.ui.procesosDNPC.controller.TipoPago", {

		formatter: formatter,

		/* =========================================================== */
		/* lifecycle methods                                           */
		/* =========================================================== */

		/**
		 * Called when the master list controller is instantiated. It sets up the event handling for the master/detail communication and other lifecycle tasks.
		 * @public
		 */
		onInit : function () {
			that = this;
			this.establishModel();	
			
			this.getRouter().getRoute("pago").attachPatternMatched(this.setIDFlujo, this);
			this.getRouter().getRoute("pago").attachPatternMatched(this._onMasterMatched, this);
		},

		_onMasterMatched: function(oEvent) {
			this.getIDUltimaTarea().done(function(response){
				let idTarea = response[0].id;
				that.getModel().setProperty("/IDTarea", idTarea);				
			});
		},
		enviarPago: function(){
			let bodyRequest = {
				"withVariablesInReturn": true
			};

			this.completarTarea(bodyRequest,function(response){
				let idFlujo = that.getModel().getProperty("/IDFlujo");
                that.getRouter().navTo("lista");
            });
		}
	});
});