sap.ui.define([], function () {
  "use strict";

  // Utility functions
  var Utils = {
    usuario: "demo",
    contrasena: "demo",
    apiURL: "http://localhost:4004/engine-rest",
    // getIDUltimaTarea: function (idFlujo) {
    //   return $.ajax({
    //     url: this.apiURL + "/task/?processInstanceId=" + idFlujo,
    //     type: "GET",
    //     dataType: "json",
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //       Authorization: "Basic " + btoa(this.usuario + ":" + this.contrasena),
    //     },
    //   });
    // },
    // nuevaSolicitud: function () {
    //   return $.ajax({
    //     url: this.apiURL + "/process-definition/key/CAJ/start",
    //     type: "POST",
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //       Authorization: "Basic " + btoa(this.usuario + ":" + this.contrasena),
    //     },
    //   });
    // },
    // completarTarea: function (idTarea, data) {
    //   return $.ajax({
    //     url: this.apiURL + "/task/" + idTarea + "/complete",
    //     type: "POST",
    //     contentType: "application/json",
    //     data: JSON.stringify(data),
    //     dataType: "json",
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //       Authorization: "Basic " + btoa(this.usuario + ":" + this.contrasena),
    //     },
    //   });
    // },
    getSongs: function (sTitle, sArtist) {
      this.title = sTitle;
      this.artist = sArtist;
      return $.ajax({
        url: this.apiURL + "/songs?title=" + sTitle + "&artist=" + sArtist,
        type: "GET",
        contentType: "application/json",
        dataType: "json",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Basic " + btoa(sTitle + ":" + sArtist),
        },
      });
    },
    // getUserLastInstanciatedProcess: function () {
    //   return $.ajax({
    //     url: this.apiURL + "/history/process-instance?processDefinitionKey=CAJ&finished=false&sortOrder=desc&sortBy=startTime&maxResults=1&startedBy=" + this.usuario,
    //     type: "GET",
    //     contentType: "application/json",
    //     dataType: "json",
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //       Authorization: "Basic " + btoa(this.usuario + ":" + this.contrasena),
    //     },
    //   });
    // },
    // getVariables: function(idTarea){
    //   return $.ajax({
    //     url: this.apiURL + "/task/" + idTarea + "/variables?deserializeValues=false",
    //     type: "GET",
    //     contentType: "application/json",
    //     dataType: "json",
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //       Authorization: "Basic " + btoa(this.usuario + ":" + this.contrasena),
    //     },
    //   });
    // },
    // getInstanciatedProcessEsperandoAudiencia(){
    //   return $.ajax({
    //     url: this.apiURL + "/job?processDefinitionKey=CAJ&timers=true&activityId=esperaraudiencia",
    //     type: "GET",
    //     contentType: "application/json",
    //     dataType: "json",
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //       Authorization: "Basic " + btoa(this.usuario + ":" + this.contrasena),
    //     },
    //   });
    // },

    // getDatosSolicitud(processId){
    //   return $.ajax({
    //     url: this.apiURL + "/history/variable-instance?processInstanceId=" + processId + "&variableNameIn=tipo_solicitud_label,documento,dia,mes,anio,telefono,destino_certificado,oficina_certificado,documento_gestor,email,fecha,hora,tipo_tramite_label",
    //     type: "GET",
    //     contentType: "application/json",
    //     dataType: "json",
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //       Authorization: "Basic " + btoa(this.usuario + ":" + this.contrasena),
    //     },
    //   });
    // }
    // Add more utility functions as needed
  };

  return Utils;
});
