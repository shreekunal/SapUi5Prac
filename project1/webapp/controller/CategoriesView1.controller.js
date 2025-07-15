sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller, JSONModel) => {
    "use strict";

    return Controller.extend("project1.controller.CategoriesView1", {
        onInit() {
        },
        onItemPress: function (oEvent) {
            this.getOwnerComponent().getRouter().navTo("Products");
        }
    });
});