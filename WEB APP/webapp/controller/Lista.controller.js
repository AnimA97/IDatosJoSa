sap.ui.define(
  [
    "./BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
    "../model/formatter",
    "../utils/API_BILLBOARD",
  ],
  function (BaseController, JSONModel, Fragment, formatter, Camunda) {
    "use strict";
    var that;
    return BaseController.extend("sap.ui.billboarding.controller.Lista", {
      formatter: formatter,

      /* =========================================================== */
      /* lifecycle methods                                           */
      /* =========================================================== */

      /**
       * Called when the master list controller is instantiated. It sets up the event handling for the master/detail communication and other lifecycle tasks.
       * @public
       */
      onInit: function () {
        that = this;

        this.establishModel();

        this.oModel = this.getModel();
        this.getRouter()
          .getRoute("lista")
          .attachPatternMatched(this._onMasterMatched, this);
      },
      _onMasterMatched: function (oEvent) {
        Camunda.getUserLastInstanciatedProcess()
          .done(
            function (response) {
              this.oModel.setProperty("/Proceso", response[0]);

              Camunda.getIDUltimaTarea(response[0].id)
                .done(
                  function (responseTask) {
                    this.oModel.setProperty("/Busy", false);
                    this.oModel.setProperty("/Actividad", responseTask[0]);
                  }.bind(this)
                )
                .fail(
                  function (error) {
                    console.log(error);
                    this.oModel.setProperty("/Busy", false);
                  }.bind(this)
                );
            }.bind(this)
          )
          .fail(
            function (error) {
              console.log(error);
              this.oModel.setProperty("/Busy", false);
            }.bind(this)
          );
      },
      nuevaSolicitud: function () {
        this.oModel.setProperty("/Busy", true);

        Camunda.nuevaSolicitud()
          .done(function (response) {
            that.getModel().setProperty("/Busy", false);
            that.getRouter().navTo("clausula", {
              idFlujo: response.id,
            });
          })
          .fail(function (error) {
            console.log(error);
            that.busyOff();
          });
      },

      onRowSelected: function (oEvent) {
        /*var selectedRow = oEvent.getParameter("rowContext");
			
			this.getRouter().navTo("Clausula", {
				numeroSolicitud: selectedRow.nroSolicitud
			});*/
      },

      continuarActividad: function () {
        let idFlujo = this.oModel.getProperty("/Actividad/processInstanceId");

        switch (this.oModel.getProperty("/Actividad/name")) {
          case "Aceptar clausula de consentimiento":
            this.getRouter().navTo("clausula", {
              idFlujo: idFlujo,
            });
            break;
          case "Completar formulario":
            that.getRouter().navTo("solicitud", {
              idFlujo: idFlujo,
            });
            break;
          case "Seleccionar cita":
            that.getRouter().navTo("cita", {
              idFlujo: idFlujo,
            });
            break;
          case "Seleccionar tipo de pago":
            that.getRouter().navTo("tipoPago", {
              idFlujo: idFlujo,
            });
          case "Pagar online":
            that.getRouter().navTo("lista");
            break;
        }
      },
    });
  }
);
