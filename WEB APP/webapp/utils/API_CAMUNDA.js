sap.ui.define([], function () {
  "use strict";

  // Utility functions
  var Utils = {
    usuario: "demo",
    contrasena: "demo",
    URLcamunda: "http://localhost:8080/engine-rest",
    getIDUltimaTarea: function (idFlujo) {
      return $.ajax({
        url: this.URLcamunda + "/task/?processInstanceId=" + idFlujo,
        type: "GET",
        dataType: "json",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Basic " + btoa(this.usuario + ":" + this.contrasena),
        },
      });
    },
    nuevaSolicitud: function () {
      return $.ajax({
        url: this.URLcamunda + "/process-definition/key/CAJ/start",
        type: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Basic " + btoa(this.usuario + ":" + this.contrasena),
        },
      });
    },
    completarTarea: function (idTarea, data) {
      return $.ajax({
        url: this.URLcamunda + "/task/" + idTarea + "/complete",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(data),
        dataType: "json",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Basic " + btoa(this.usuario + ":" + this.contrasena),
        },
      });
    },
    getUserGroups: function (userId, password) {
      this.usuario = userId;
      this.contrasena = password;
      return $.ajax({
        url: this.URLcamunda + "/group?member=" + userId,
        type: "GET",
        contentType: "application/json",
        dataType: "json",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Basic " + btoa(userId + ":" + password),
        },
      });
    },

    getUserLastInstanciatedProcess: function () {
      return $.ajax({
        url: this.URLcamunda + "/history/process-instance?processDefinitionKey=CAJ&finished=false&sortOrder=desc&sortBy=startTime&maxResults=1&startedBy=" + this.usuario,
        type: "GET",
        contentType: "application/json",
        dataType: "json",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Basic " + btoa(this.usuario + ":" + this.contrasena),
        },
      });
    },
    getVariables: function(idTarea){
      return $.ajax({
        url: this.URLcamunda + "/task/" + idTarea + "/variables?deserializeValues=false",
        type: "GET",
        contentType: "application/json",
        dataType: "json",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Basic " + btoa(this.usuario + ":" + this.contrasena),
        },
      });
    },
    getInstanciatedProcessEsperandoAudiencia(){
      return $.ajax({
        url: this.URLcamunda + "/job?processDefinitionKey=CAJ&timers=true&activityId=esperaraudiencia",
        type: "GET",
        contentType: "application/json",
        dataType: "json",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Basic " + btoa(this.usuario + ":" + this.contrasena),
        },
      });
    },

    getDatosSolicitud(processId){
      return $.ajax({
        url: this.URLcamunda + "/history/variable-instance?processInstanceId=" + processId + "&variableNameIn=tipo_solicitud_label,documento,dia,mes,anio,telefono,destino_certificado,oficina_certificado,documento_gestor,email,fecha,hora,tipo_tramite_label",
        type: "GET",
        contentType: "application/json",
        dataType: "json",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Basic " + btoa(this.usuario + ":" + this.contrasena),
        },
      });
    }
    // Add more utility functions as needed
  };

  return Utils;
});
