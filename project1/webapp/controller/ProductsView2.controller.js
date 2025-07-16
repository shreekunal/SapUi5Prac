sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter"
], function (Controller, Filter) {
    "use strict";

    return Controller.extend("project1.controller.ProductsView2", {

        onInit: function () {
            // Attach route pattern match handler
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("Products").attachPatternMatched(this._onPatternMatched, this);
        },

        _onPatternMatched: function (oEvent) {
            // Get CategoryId from the route arguments
            var sCategoryId = oEvent.getParameter("arguments").CategoryId;

            if (sCategoryId) {
                var oView = this.getView();
                var oSelect = this.byId("categorySelect");
                var oTable = this.byId("productTable");

                // Set selected key in the Select dropdown
                if (oSelect) {
                    // Use setTimeout to ensure the view is fully rendered
                    setTimeout(function () {
                        oSelect.setSelectedKey(sCategoryId);
                    }, 0);
                }

                // Filter the product list by CategoryID
                if (oTable) {
                    var oBinding = oTable.getBinding("items");
                    if (oBinding) {
                        oBinding.filter([
                            new Filter("CategoryID", "EQ", sCategoryId)
                        ]);
                    }
                }
            }
        },

        onCategoryChange: function (oEvent) {
            // Filter based on dropdown selection (Select control)
            var sCategoryId = oEvent.getSource().getSelectedKey();
            var oTable = this.byId("productTable");

            if (oTable) {
                var oBinding = oTable.getBinding("items");
                if (oBinding) {
                    if (sCategoryId) {
                        oBinding.filter([
                            new Filter("CategoryID", "EQ", sCategoryId)
                        ]);
                    } else {
                        oBinding.filter([]); // Remove filter if nothing selected
                    }
                }
            }
        },

        onProductSelect: function (oEvent) {
            console.log("Product press event triggered");

            // Get the selected product context from the pressed item
            var oItem = oEvent.getSource();
            var oProductContext = oItem.getBindingContext();
            console.log("Product context:", oProductContext);

            if (!oProductContext) {
                console.error("No binding context found");
                return;
            }

            var sProductId = oProductContext.getProperty("ProductID");
            console.log("Product ID:", sProductId);

            if (!sProductId) {
                console.error("No ProductID found in context");
                return;
            }

            // Navigate to Customers route with ProductId
            this.getOwnerComponent().getRouter().navTo("Customers", {
                ProductId: sProductId
            });
        }
    });
});
