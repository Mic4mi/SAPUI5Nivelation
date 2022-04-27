/* eslint-disable no-param-reassign */
/* eslint-disable max-params */
/* eslint-disable valid-jsdoc */
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Sorter",
    "sap/ui/core/Fragment",
    "sap/ui/Device",
    "acc/employees/utils/Services",
    "acc/employees/utils/Formatter"
],
    function (
        Controller,
        JSONModel,
        MessageToast,
        Filter,
        FilterOperator,
        Sorter,
        Fragment,
        Device,
        Services,
        Formatter
    ) {
        "use strict";

        return Controller.extend("acc.employees.controller.MainView", {
            _mViewSettingsDialogs: {},
            formatter: Formatter,

            onInit: async function () {
                await this.loadModel("Employees.json", "EmployeesModel");
            },

            onPressBtn1: function (oEvent) {
                MessageToast.show("Has presionado el botón verde");
            },

            onSearchNames: function (oEvent) {
                let sQuery = oEvent.getSource().getValue(),
                    oTable = this.byId("idEmployeesTable"),
                    oBinding = oTable.getBinding("items"),
                    oSearchFilter;
            
                if (sQuery) {
                    // oSearchFilter = new Filter([
                    //     new Filter("first_name", FilterOperator.Contains, sQuery),
                    //     new Filter("last_name", FilterOperator.Contains, sQuery)
                    // ], false);
                    oSearchFilter =  new Filter("first_name", FilterOperator.Contains, sQuery); 
                } else {
                    oSearchFilter = null;
                }

                oBinding.filter(oSearchFilter, "Application");
            },

            onSortEmployeesConfirm: function (oEvent) {
                let oMParams = oEvent.getParameters(),
                    oTable = this.byId("idEmployeesTable"),
                    oBinding = oTable.getBinding("items"),
                    sPath,
                    oSorter,
                    bDescending;

                sPath = oMParams.sortItem.getKey();
                bDescending = oMParams.sortDescending;
                oSorter = new Sorter(sPath, bDescending);
                oBinding.sort(oSorter);
            },

            onOpenSortPopUp: function (oEvent) {
                this.openSettingDialog(this.byId("sortDialog"), "acc.employees.view.fragments.sorterPopup");
            },

            openSettingDialog: function (oDialog, sFrgamentId) {
                try {
                    if (!oDialog) {
                        this.getViewSettingsDialog(sFrgamentId)
                            .then(function (oViewSettingsDialog) {
                                this.getView().addDependent(oViewSettingsDialog);
                                oViewSettingsDialog.open();
                            }.bind(this));
                    } else {
                        oDialog.open();
                    }
                } catch (oError) {
                    MessageToast.show("Error: ", oError);
                }
            },

            getViewSettingsDialog: function (sDialogFragmentName) {
                let pDialog = this._mViewSettingsDialogs[sDialogFragmentName];

                if (!pDialog) {
                    pDialog = Fragment.load({
                        id: this.getView().getId(),
                        name: sDialogFragmentName,
                        controller: this
                    }).then(function (oDialog) {
                        if (Device.system.desktop) {
                            oDialog.addStyleClass("sapUiSizeCompact");
                        }
                        return oDialog;
                    });
                    this._mViewSettingsDialogs[sDialogFragmentName] = pDialog;
                }
                return pDialog;
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
