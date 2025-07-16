sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller, JSONModel) => {
    "use strict";

    return Controller.extend("project1.controller.SalesView10", {
        onInit() {
        },

        onSalesComplete: function (oEvent) {
            // Get the selected sales item context
            var oSalesContext = oEvent.getSource().getBindingContext();
            var sSaleAmount = oSalesContext.getProperty("SaleAmount");

            console.log("Completed sales cycle with amount:", sSaleAmount);

            // Navigate back to Categories (View 1) to complete the cycle
            this.getOwnerComponent().getRouter().navTo("Categories");
        }
    });
});
