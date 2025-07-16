sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller, JSONModel) => {
    "use strict";

    return Controller.extend("project1.controller.EmployeesView5", {
        onInit() {
        },

        onEmployeeSelect: function (oEvent) {
            // Get the selected employee context
            var oEmployeeContext = oEvent.getSource().getBindingContext();
            var sEmployeeId = oEmployeeContext.getProperty("EmployeeID");

            // Navigate to Suppliers route with EmployeeId
            this.getOwnerComponent().getRouter().navTo("Suppliers", {
                EmployeeId: sEmployeeId
            });
        }
    });
});
