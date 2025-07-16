sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller, JSONModel) => {
    "use strict";

    return Controller.extend("project1.controller.OrdersView4", {
        onInit() {
        },

        onOrderSelect: function (oEvent) {
            // Get the selected order context
            var oOrderContext = oEvent.getSource().getBindingContext();
            var sOrderId = oOrderContext.getProperty("OrderID");

            // Navigate to Employees route with OrderId
            this.getOwnerComponent().getRouter().navTo("Employees", {
                OrderId: sOrderId
            });
        }
    });
});
