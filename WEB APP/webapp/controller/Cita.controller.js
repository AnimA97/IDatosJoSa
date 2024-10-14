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
	var that;
	return BaseController.extend("sap.ui.procesosDNPC.controller.Cita", {

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
			this.initModel();
			
			this.getRouter().getRoute("cita").attachPatternMatched(this.setIDFlujo, this);
			this.getRouter().getRoute("cita").attachPatternMatched(this._onMasterMatched, this);
		},
		
		initModel: function(){
			this.getModel().setProperty("/Cita", {
				fechas: "",
				horarios: "",
			});
		},

		_onMasterMatched: function(oEvent) {
			this.getIDUltimaTarea().done(function(response){
				let idTarea = response[0].id;

				that.getModel().setProperty("/IDTarea", idTarea);
				that.getVariables(idTarea).done(function(response){
					let fechas = JSON.parse(response.fechas.value);
					fechas = fechas.map(function(x){
						return {value: x, label:x};
					})
					that.getModel().setProperty("/Fechas", fechas);

					that.getModel().setProperty("/Variables", response)
				});
			});
		},

		actualizarHorariosDisponibles: function(oControlEvent){
			debugger;
			let fecha = oControlEvent.getParameter("value");
			let horariosDisponibles = this.getModel().getProperty("/Variables/" + fecha);
			horariosDisponibles = JSON.parse(horariosDisponibles.value);
			horariosDisponibles = horariosDisponibles.map(function(x){
				return {value: x, label:x};
			});

			this.getModel().setProperty("/Horarios", horariosDisponibles)
		},

		enviarCita: function(){
			let solicitud = this.getModel().getProperty("/Cita")
			let bodyRequest = {
				"variables":{
					"fecha" : {
						"value" : solicitud.dia,
						"type" : "String"
					},
					"hora" : {
						"value" : solicitud.hora,
						"type" : "String"
					}
				},
				"withVariablesInReturn": true
			};

			this.completarTarea(bodyRequest,function(response){
				let idFlujo = that.getModel().getProperty("/IDFlujo");
                that.getRouter().navTo("tipoPago", {
                    idFlujo: idFlujo
                });
            });
		}

	});
});