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
    return BaseController.extend(
      "sap.ui.billboarding.controller.ListaFuncionario",
      {
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
            .getRoute("listaFuncionario")
            .attachPatternMatched(this._onMasterMatched, this);
        },
        _onMasterMatched: function (oEvent) {
          Camunda.getInstanciatedProcessEsperandoAudiencia().done(
            function (response) {
              this.oModel.setProperty("/ProcesosEsperando", response);
            }.bind(this)
          );
        },

        refreshSolicitudes: function () {
          Camunda.getInstanciatedProcessEsperandoAudiencia().done(
            function (response) {
              this.oModel.setProperty("/ProcesosEsperando", response);
            }.bind(this)
          );
        },

        _getName: function () {
          var sName = this.getOwnerComponent().getMetadata().getComponentName();
          return sName;
        },

        onRowSelected: function (oEvent) {
          debugger;
          var oSelectedItem = oEvent.getSource();
          var oContext = oSelectedItem.getBindingContext();
          var oModel = oContext.getModel();
          var oData = oModel.getProperty(oContext.getPath());
          var oView = this.getView();
          var processId = oData.processInstanceId;

          Camunda.getDatosSolicitud(processId)
            .done(
              function (response) {
                this.oModel.setProperty("/SolicitudMostrar", {
                  documento:
                    response[response.findIndex((x) => x.name === "documento")]
                      .value,
                  dia: response[response.findIndex((x) => x.name === "dia")]
                    .value,
                  mes: response[response.findIndex((x) => x.name === "mes")]
                    .value,
                  anio: response[response.findIndex((x) => x.name === "anio")]
                    .value,
                  telefono:
                    response[response.findIndex((x) => x.name === "telefono")]
                      .value,
                  destino_certificado:
                    response[
                      response.findIndex(
                        (x) => x.name === "destino_certificado"
                      )
                    ].value,
                  oficina_certificado:
                    response[
                      response.findIndex(
                        (x) => x.name === "oficina_certificado"
                      )
                    ].value,
                  documento_gestor:
                    response[
                      response.findIndex((x) => x.name === "documento_gestor")
                    ] ? response[
                      response.findIndex((x) => x.name === "documento_gestor")
                    ].value : "",
                  email:
                    response[response.findIndex((x) => x.name === "email")]
                      .value,
                  fecha:
                    response[response.findIndex((x) => x.name === "fecha")]
                      .value,
                  hora: response[response.findIndex((x) => x.name === "hora")]
                    .value,
                  tipo_tramite_label:
                    response[
                      response.findIndex((x) => x.name === "tipo_tramite_label")
                    ].value,
                  tipo_solicitud_label:
                    response[
                      response.findIndex(
                        (x) => x.name === "tipo_solicitud_label"
                      )
                    ].value,
                });
              }.bind(this)
            )
            .fail(function (response) {
              console.log(response);
            });

          if (!this._pSolicitudDatosDialog) {
            this._pSolicitudDatosDialog = Fragment.load({
              id: oView.getId(),
              name: this._getName() + ".view.Dialogs.DetailDialogSolicitud",
              controller: this,
            }).then(
              function (oDialog) {
                oView.addDependent(oDialog);
                oDialog.setModel(this.getModel());
                return oDialog;
              }.bind(this)
            );
          }

          this._pSolicitudDatosDialog.then(
            function (oDialog) {
              oDialog.open();
            }.bind(this)
          );

          // this.getRouter().navTo("detalleFuncionario", {
          //   id: oData.id,
          // });
        },

        onCloseDialog: function () {
          this._pSolicitudDatosDialog.then(
            function (oDialog) {
              oDialog.close();
            }.bind(this)
          );
        },
      }
    );
  }
);
