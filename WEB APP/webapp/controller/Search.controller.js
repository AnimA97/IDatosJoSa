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
    "../utils/API_BILLBOARD",
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
    API,
    MessageBox
  ) {
    "use strict";

    formatter: formatter;

    return BaseController.extend("sap.ui.billboarding.controller.search", {
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

      handleSearch: function () {
        var oModel = this.getModel();

        var sTitle = oModel.getProperty("/Filter/Title");
        var sArtist = oModel.getProperty("/Filter/Artist");

        API.getSongs(sTitle, sArtist)
          .done(
            function (data) {
              debugger
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
                "Ha ocurrido un error. Por favor, inténtelo de nuevo."
              );
            }.bind(this)
          );
        // this.getRouter().navTo("lista");
      },

      initModel: function () {
        var oModel = this.getModel();
        this.oModel.setProperty("/Filter", {
          Title: "",
          Artist: "",
        });
      },
    });
  }
);
