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
	"sap/ui/core/format/DateFormat",
    "../utils/API_BILLBOARD"
], function (BaseController, JSONModel, Filter, FilterOperator, Sorter, GroupHeaderListItem, Device, Fragment, formatter, DateFormat, API) {
	"use strict";
	var that;
	return BaseController.extend("sap.ui.billboarding.controller.Song", {

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
			this.oModel = this.getView().getModel();		
			// this.initModel();
			
			// this.getRouter().getRoute("song").attachPatternMatched(this.setIDFlujo, this);
			this.getRouter().getRoute("song").attachPatternMatched(this._onSongMatched, this);
		},

		_onSongMatched: function(oEvent) {
			let oNavArguments = oEvent.getParameter("arguments")
			API.getSongData(oNavArguments.track, oNavArguments.artist)
			.done(
			  function (oData) {
				debugger
				// let sContext = oData["@odata.context"]
				// let sNextLink = oData["@odata.nextLink"]
				let oSongData = oData.value[0]
				let aSongChartHistory = oData.value
				this.oModel.setProperty("/SelectedSong", oSongData);
				this.oModel.setProperty("/SongChartHistory", aSongChartHistory);
			  }.bind(this)
			)
			.fail(
			  function () {
				MessageBox.error(
				  "Ha ocurrido un error. Por favor, inténtelo de nuevo."
				);
			  }.bind(this)
			);
		},
		
		// enviarSolicitud: function(){
		// 	let song = this.getModel().getProperty("/Song")
		// 	let bodyRequest = {
		// 		"variables":{
		// 			"tiposolicitud" : {
		// 				"value" : song.tipoSolicitud,
		// 				"type" : "String"
		// 			},
		// 			"documento" : {
		// 				"value" : song.nroDoc,
		// 				"type" : "String"
		// 			},
		// 			"dia" : {
		// 				"value" : song.fechaNacimiento.getDate(),
		// 				"type" : "Integer"
		// 			},
		// 			"mes" : {
		// 				"value" : song.fechaNacimiento.getMonth() + 1,
		// 				"type" : "Integer"
		// 			},
		// 			"anio" : {
		// 				"value" : song.fechaNacimiento.getFullYear(),
		// 				"type" : "Integer"
		// 			},
		// 			"telefono" : {
		// 				"value" : song.tel,
		// 				"type" : "String"
		// 			},
		// 			"destino" : {
		// 				"value" : song.destino,
		// 				"type" : "String"
		// 			},
		// 			"oficina" : {
		// 				"value" : song.oficina,
		// 				"type" : "String"
		// 			},
		// 			"titular" : {
		// 				"value" : song.titular ? song.titular : "X",
		// 				"type" : "String"
		// 			},
		// 			"documento_gestor": {
		// 				"value": song.nroDocGestor,
		// 				"type": "String"
		// 			},
		// 			"email": {
		// 				"value": song.email,
		// 				"type": "String"
		// 			}
		// 		},
		// 		"withVariablesInReturn": true
		// 	};

		// 	this.completarTarea(bodyRequest,function(response){
		// 		let idFlujo = that.getModel().getProperty("/IDFlujo");
        //         that.getRouter().navTo("cita", {
        //             idFlujo: idFlujo
        //         });
        //     });
		// },

		initModel: function(){
			this.getModel().setProperty("/Song", {
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