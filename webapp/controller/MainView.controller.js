sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "acc/employees/utils/Services",
    "acc/employees/utils/Formatter"
],
    function (Controller, JSONModel, MessageToast, Services, Formatter) {
        "use strict";

        return Controller.extend("acc.employees.controller.MainView", {
            formatter: Formatter,

            onInit: async function () {
                await this.loadModel("Employees.json", "EmployeesModel");
            },

            onPressBtn1: function (oEvent) {
                MessageToast.show("Has presionado el botón verde");
            },

            loadModel: async function (json, path) {
                const oResponse = await Services.getLocalJSON(
                    json
                );
                const oDataOrders = oResponse[0];
                let oModel = new JSONModel();
                oModel.setData(oDataOrders);
                this.getView().setModel(oModel, path);
            }

        });
    });
