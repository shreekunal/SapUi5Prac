sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller, JSONModel) => {
    "use strict";

    return Controller.extend("project1.controller.InvoicesView9", {
        onInit() {
        },

        onInvoiceSelect: function (oEvent) {
            // Get the selected invoice context  
            var oInvoiceContext = oEvent.getSource().getBindingContext();
            var sInvoiceId = oInvoiceContext.getProperty("OrderID"); // Using OrderID as invoice identifier

            // Navigate to Sales route with InvoiceId
            this.getOwnerComponent().getRouter().navTo("Sales", {
                InvoiceId: sInvoiceId
            });
        }
    });
});
