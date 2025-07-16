sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller, JSONModel) => {
    "use strict";

    return Controller.extend("project1.controller.CustomersView3", {
        onInit() {
        },

        onCustomerSelect: function (oEvent) {
            // Get the selected customer context
            var oCustomerContext = oEvent.getSource().getBindingContext();
            var sCustomerId = oCustomerContext.getProperty("CustomerID");

            // Navigate to Orders route with CustomerId
            this.getOwnerComponent().getRouter().navTo("Orders", {
                CustomerId: sCustomerId
            });
        }
    });
});
