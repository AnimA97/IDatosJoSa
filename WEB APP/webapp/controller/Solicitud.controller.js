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
	return BaseController.extend("sap.ui.procesosDNPC.controller.Solicitud", {

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
			
			this.getRouter().getRoute("solicitud").attachPatternMatched(this.setIDFlujo, this);
			this.getRouter().getRoute("solicitud").attachPatternMatched(this._onMasterMatched, this);
		},

		_onMasterMatched: function(oEvent) {
			this.getIDUltimaTarea().done(function(response){
				let idTarea = response[0].id;

				that.getModel().setProperty("/IDTarea", idTarea);
				that.getVariables(idTarea).done(function(response){
					let instituciones = JSON.parse(response.instituciones.value);
					that.getModel().setProperty("/Instituciones", instituciones);
					
					let oficinas = JSON.parse(response.oficinas.value);
					that.getModel().setProperty("/Oficinas", oficinas);
				});
			});
		},
		
		enviarSolicitud: function(){
			let solicitud = this.getModel().getProperty("/Solicitud")
			let bodyRequest = {
				"variables":{
					"tiposolicitud" : {
						"value" : solicitud.tipoSolicitud,
						"type" : "String"
					},
					"documento" : {
						"value" : solicitud.nroDoc,
						"type" : "String"
					},
					"dia" : {
						"value" : solicitud.fechaNacimiento.getDate(),
						"type" : "Integer"
					},
					"mes" : {
						"value" : solicitud.fechaNacimiento.getMonth() + 1,
						"type" : "Integer"
					},
					"anio" : {
						"value" : solicitud.fechaNacimiento.getFullYear(),
						"type" : "Integer"
					},
					"telefono" : {
						"value" : solicitud.tel,
						"type" : "String"
					},
					"destino" : {
						"value" : solicitud.destino,
						"type" : "String"
					},
					"oficina" : {
						"value" : solicitud.oficina,
						"type" : "String"
					},
					"titular" : {
						"value" : solicitud.titular ? solicitud.titular : "X",
						"type" : "String"
					},
					"documento_gestor": {
						"value": solicitud.nroDocGestor,
						"type": "String"
					},
					"email": {
						"value": solicitud.email,
						"type": "String"
					}
				},
				"withVariablesInReturn": true
			};

			this.completarTarea(bodyRequest,function(response){
				let idFlujo = that.getModel().getProperty("/IDFlujo");
                that.getRouter().navTo("cita", {
                    idFlujo: idFlujo
                });
            });
		},

		initModel: function(){
			this.getModel().setProperty("/Solicitud", {
				tipoSolicitud: "",
				nroDoc: "",
				fechaNacimiento: new Date(),
				tel: "",
				email: "",
				destino: "",
				oficina: "",
				tipoTramite: "",
				nroDocGestor: ""
			});
		}
	});
});