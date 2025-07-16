sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller, JSONModel) => {
    "use strict";

    return Controller.extend("project1.controller.ShippersView7", {
        onInit() {
        },

        onShipperSelect: function (oEvent) {
            // Get the selected shipper context
            var oShipperContext = oEvent.getSource().getBindingContext();
            var sShipperId = oShipperContext.getProperty("ShipperID");

            // Navigate to Regions route with ShipperId
            this.getOwnerComponent().getRouter().navTo("Regions", {
                ShipperId: sShipperId
            });
        }
    });
});
