sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller, JSONModel) => {
    "use strict";

    return Controller.extend("project1.controller.RegionsView8", {
        onInit() {
        },

        onRegionSelect: function (oEvent) {
            // Get the selected region context
            var oRegionContext = oEvent.getSource().getBindingContext();
            var sRegionId = oRegionContext.getProperty("RegionID");

            // Navigate to Invoices route with RegionId
            this.getOwnerComponent().getRouter().navTo("Invoices", {
                RegionId: sRegionId
            });
        }
    });
});
