sap.ui.define([], function () {
  "use strict";

  // Utility functions
  var Utils = {
    usuario: "demo",
    contrasena: "demo",
    apiURL: "http://localhost:4004/odata/v4/billboard",
    getSongs: function (sTitle, sArtist) {
      // this.title = sTitle;
      // this.artist = sArtist;
      return $.ajax({
        url: this.apiURL + "/SongName?$filter=contains(track,'"+ sTitle +"') and contains(artist,'"+ sArtist +"')",
        type: "GET",
        contentType: "application/json",
        dataType: "json",
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    getSongData: function (sTitle, sArtist) {
      // this.title = sTitle;
      // this.artist = sArtist;
      return $.ajax({
        url: this.apiURL + "/Song?$filter=track eq '"+ sTitle +"' and artist eq '"+ sArtist + "'",
        type: "GET",
        contentType: "application/json",
        dataType: "json",
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
  };

  return Utils;
});
