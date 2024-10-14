sap.ui.define(
  [
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
    "../utils/API_CAMUNDA",
    "sap/m/MessageBox",
  ],
  function (
    BaseController,
    JSONModel,
    Filter,
    FilterOperator,
    Sorter,
    GroupHeaderListItem,
    Device,
    Fragment,
    formatter,
    DateFormat,
    Camunda,
    MessageBox
  ) {
    "use strict";

    formatter: formatter;

    return BaseController.extend("sap.ui.procesosDNPC.controller.Login", {
      formatter: formatter,

      /* =========================================================== */
      /* lifecycle methods                                           */
      /* =========================================================== */

      /**
       * Called when the master list controller is instantiated. It sets up the event handling for the master/detail communication and other lifecycle tasks.
       * @public
       */
      onInit: function () {
        //this.getRouter().getRoute("master").attachPatternMatched(this._onMasterMatched, this);
        //this.getRouter().attachBypassed(this.onBypassed, this);
        this.establishModel();
        this.oModel = this.getView().getModel();
        this.initModel();
      },

      handleLogin: function () {
        var oModel = this.getModel();

        var sUsuario = oModel.getProperty("/Usuario/Nombre");
        var sPass = oModel.getProperty("/Usuario/Pass");

        Camunda.getUserGroups(sUsuario, sPass)
          .done(
            function (data) {
              if (data.findIndex((elem) => elem.id === "ciudadano") > -1) {
                this.getRouter().navTo("lista");
              } else {
                this.getRouter().navTo("listaFuncionario");
                //navegar a lista funcionario
              }
            }.bind(this)
          )
          .fail(
            function () {
              MessageBox.error(
                "Usuario o contraseña incorrectos. Por favor, inténtelo de nuevo."
              );
            }.bind(this)
          );
        // this.getRouter().navTo("lista");
      },

      initModel: function () {
        var oModel = this.getModel();
        this.oModel.setProperty("/Usuario", {
          Nombre: "",
          Pass: "",
        });
      },
    });
  }
);
