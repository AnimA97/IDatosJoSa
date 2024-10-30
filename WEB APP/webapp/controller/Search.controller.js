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
        
        //ordenar tabla de búsqueda por canciones que más semanas estuvieron
        let oTable = this.getView().byId('searchTable')
        let oBinding = oTable.getBinding('items')
        let aSorter = [new sap.ui.model.Sorter("weeks_on_board", true)]
        oBinding.sort(aSorter)

        this.handleSearch()
      },

      handleSearch: function () {
        var oModel = this.getModel();

        var sTitle = oModel.getProperty("/Filter/Title");
        var sArtist = oModel.getProperty("/Filter/Artist");

        API.getSongs(sTitle, sArtist)
          .done(
            function (oData) {
              // let sContext = oData["@odata.context"]
              // let sNextLink = oData["@odata.nextLink"]
              let aSongs = oData.value
              this.oModel.setProperty("/SongSearch", aSongs);
              //Nice to have: Añadir capacidad de recibir +1000 resultados con sNextLink
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

      onSongPress: function (oSongListItem) {
        let sSongPath = oSongListItem.getSource().getBindingContextPath()
        let oSong = this.oModel.getProperty(sSongPath);
        this.oModel.setProperty("/SelectedSong", oSong);
        this.getRouter().navTo("song", {
          track: oSong.track,
          artist: oSong.artist,
        });
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
