sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller, JSONModel) => {
    "use strict";

    return Controller.extend("project1.controller.SuppliersView6", {
        onInit() {
        },

        onSupplierSelect: function (oEvent) {
            // Get the selected supplier context
            var oSupplierContext = oEvent.getSource().getBindingContext();
            var sSupplierId = oSupplierContext.getProperty("SupplierID");

            // Navigate to Shippers route with SupplierId
            this.getOwnerComponent().getRouter().navTo("Shippers", {
                SupplierId: sSupplierId
            });
        }
    });
});
