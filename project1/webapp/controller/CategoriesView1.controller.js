sap.ui.define([
    "sap/ui/core/mvc/Controller",
], (Controller) => {
    "use strict";

    return Controller.extend("project1.controller.CategoriesView1", {
        onInit() {
        },
        onItemPress: function (oEvent) {
            var oCategoryContext = oEvent.getSource().getBindingContext();

            var sCategoryId = oCategoryContext.getProperty("CategoryID");

            this.getOwnerComponent().getRouter().navTo("Products", {
                CategoryId: sCategoryId
            });
        }
    });
});