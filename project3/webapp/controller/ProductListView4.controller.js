sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/ui/core/Fragment",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Sorter"
], (Controller, JSONModel, MessageToast, Fragment, Filter, FilterOperator, Sorter) => {
    "use strict";

    return Controller.extend("project3.controller.ProductListView4", {
        onInit() {
            // Initialize view model for UI states
            const oViewModel = new JSONModel({
                busy: false,
                delay: 0,
                totalProducts: 0
            });
            this.getView().setModel(oViewModel, "viewModel");

            // Initialize filter model
            const oFilterModel = new JSONModel({
                searchQuery: "",
                selectedCategory: "",
                minPrice: 0,
                maxPrice: 1000,
                lowStockOnly: false
            });
            this.getView().setModel(oFilterModel, "filter");
        },

        onProductPress: function (oEvent) {
            const oBindingContext = oEvent.getSource().getBindingContext();
            const oProductData = oBindingContext.getObject();

            this._showProductDetailDialog(oProductData);
        },

        _showProductDetailDialog: function (oProductData) {
            if (!this._oProductDialog) {
                Fragment.load({
                    id: this.getView().getId(),
                    name: "project3.fragments.ProductDetailDialog",
                    controller: this
                }).then((oDialog) => {
                    this._oProductDialog = oDialog;
                    this.getView().addDependent(this._oProductDialog);
                    this._openProductDialog(oProductData);
                });
            } else {
                this._openProductDialog(oProductData);
            }
        },

        _openProductDialog: function (oProductData) {
            // Create a model with product data and additional info
            const oDialogModel = new JSONModel({
                ...oProductData,
                ProductImage: this._getProductImage(oProductData.ProductName),
                FormattedPrice: this._formatCurrency(oProductData.UnitPrice),
                StockStatus: this._getStockStatus(oProductData.UnitsInStock),
                StockStatusState: this._getStockStatusState(oProductData.UnitsInStock),
                DiscontinuedText: oProductData.Discontinued ? "Yes" : "No"
            });

            this._oProductDialog.setModel(oDialogModel, "product");
            this._oProductDialog.open();
        },

        onCloseProductDialog: function () {
            this._oProductDialog.close();
        },

        _getProductImage: function (sProductName) {
            // Map product names to sample images from internet
            const imageMap = {
                "Chai": "https://images.unsplash.com/photo-1587080266227-677cc2a4e3e2?w=300&h=300&fit=crop",
                "Chang": "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=300&h=300&fit=crop",
                "Aniseed Syrup": "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=300&h=300&fit=crop",
                "Chef Anton's Cajun Seasoning": "https://images.unsplash.com/photo-1506806732259-39c2d0268443?w=300&h=300&fit=crop",
                "Chef Anton's Gumbo Mix": "https://images.unsplash.com/photo-1506806732259-39c2d0268443?w=300&h=300&fit=crop",
                "Grandma's Boysenberry Spread": "https://images.unsplash.com/photo-1557142046-c704a3adf364?w=300&h=300&fit=crop",
                "Uncle Bob's Organic Dried Pears": "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=300&h=300&fit=crop",
                "Northwoods Cranberry Sauce": "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300&h=300&fit=crop",
                "Mishi Kobe Niku": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300&h=300&fit=crop",
                "Ikura": "https://images.unsplash.com/photo-1563379091339-03246963d51a?w=300&h=300&fit=crop"
            };

            return imageMap[sProductName] || "https://images.unsplash.com/photo-1506617420156-8e4536971650?w=300&h=300&fit=crop";
        },

        _formatCurrency: function (fPrice) {
            if (fPrice) {
                return "$" + parseFloat(fPrice).toFixed(2);
            }
            return "$0.00";
        },

        _getStockStatus: function (iStock) {
            if (iStock === 0) return "Out of Stock";
            if (iStock < 10) return "Low Stock";
            if (iStock < 50) return "In Stock";
            return "Well Stocked";
        },

        _getStockStatusState: function (iStock) {
            if (iStock === 0) return "Error";
            if (iStock < 10) return "Warning";
            return "Success";
        },

        onSearch: function (oEvent) {
            const sQuery = oEvent.getParameter("newValue");
            this._applyFilters(sQuery);
        },

        onFilterPress: function () {
            if (!this._oFilterDialog) {
                Fragment.load({
                    id: this.getView().getId(),
                    name: "project3.fragments.ProductFilterDialog",
                    controller: this
                }).then((oDialog) => {
                    this._oFilterDialog = oDialog;
                    this.getView().addDependent(this._oFilterDialog);
                    this._oFilterDialog.open();
                });
            } else {
                this._oFilterDialog.open();
            }
        },

        onFilterDialogConfirm: function () {
            this._applyAdvancedFilters();
            this._oFilterDialog.close();
        },

        onFilterDialogCancel: function () {
            this._oFilterDialog.close();
        },

        _applyFilters: function (sQuery) {
            const oTable = this.byId("productsTable");
            const oBinding = oTable.getBinding("items");
            const aFilters = [];

            if (sQuery) {
                const oFilter = new Filter({
                    filters: [
                        new Filter("ProductName", FilterOperator.Contains, sQuery),
                        new Filter("Category/CategoryName", FilterOperator.Contains, sQuery),
                        new Filter("Supplier/CompanyName", FilterOperator.Contains, sQuery)
                    ],
                    and: false
                });
                aFilters.push(oFilter);
            }

            oBinding.filter(aFilters);
        },

        _applyAdvancedFilters: function () {
            const oFilterModel = this.getView().getModel("filter");
            const oFilterData = oFilterModel.getData();
            const oTable = this.byId("productsTable");
            const oBinding = oTable.getBinding("items");
            const aFilters = [];

            // Search query filter
            if (oFilterData.searchQuery) {
                const oSearchFilter = new Filter({
                    filters: [
                        new Filter("ProductName", FilterOperator.Contains, oFilterData.searchQuery),
                        new Filter("Category/CategoryName", FilterOperator.Contains, oFilterData.searchQuery)
                    ],
                    and: false
                });
                aFilters.push(oSearchFilter);
            }

            // Category filter
            if (oFilterData.selectedCategory) {
                aFilters.push(new Filter("Category/CategoryName", FilterOperator.EQ, oFilterData.selectedCategory));
            }

            // Price range filter
            if (oFilterData.minPrice > 0) {
                aFilters.push(new Filter("UnitPrice", FilterOperator.GE, oFilterData.minPrice));
            }
            if (oFilterData.maxPrice < 1000) {
                aFilters.push(new Filter("UnitPrice", FilterOperator.LE, oFilterData.maxPrice));
            }

            // Low stock filter
            if (oFilterData.lowStockOnly) {
                aFilters.push(new Filter("UnitsInStock", FilterOperator.LT, 10));
            }

            oBinding.filter(aFilters);
        },

        onSort: function (oEvent) {
            const oTable = this.byId("productsTable");
            const oBinding = oTable.getBinding("items");
            const sSelectedKey = oEvent.getParameter("selectedItem").getKey();

            let oSorter;
            switch (sSelectedKey) {
                case "name":
                    oSorter = new Sorter("ProductName", false);
                    break;
                case "nameDesc":
                    oSorter = new Sorter("ProductName", true);
                    break;
                case "price":
                    oSorter = new Sorter("UnitPrice", false);
                    break;
                case "priceDesc":
                    oSorter = new Sorter("UnitPrice", true);
                    break;
                case "stock":
                    oSorter = new Sorter("UnitsInStock", false);
                    break;
                case "stockDesc":
                    oSorter = new Sorter("UnitsInStock", true);
                    break;
                default:
                    oSorter = new Sorter("ProductName", false);
            }

            oBinding.sort(oSorter);
        },

        onGroup: function (oEvent) {
            const oTable = this.byId("productsTable");
            const oBinding = oTable.getBinding("items");
            const sSelectedKey = oEvent.getParameter("selectedItem").getKey();

            let oSorter;
            switch (sSelectedKey) {
                case "category":
                    oSorter = new Sorter("Category/CategoryName", false, (oContext) => {
                        const sCategoryName = oContext.getProperty("Category/CategoryName");
                        return {
                            key: sCategoryName,
                            text: "Category: " + sCategoryName
                        };
                    });
                    break;
                case "supplier":
                    oSorter = new Sorter("Supplier/CompanyName", false, (oContext) => {
                        const sSupplierName = oContext.getProperty("Supplier/CompanyName");
                        return {
                            key: sSupplierName,
                            text: "Supplier: " + sSupplierName
                        };
                    });
                    break;
                case "stock":
                    oSorter = new Sorter("UnitsInStock", false, (oContext) => {
                        const iStock = oContext.getProperty("UnitsInStock");
                        let sGroup;
                        if (iStock === 0) sGroup = "Out of Stock";
                        else if (iStock < 10) sGroup = "Low Stock (< 10)";
                        else if (iStock < 50) sGroup = "Medium Stock (10-49)";
                        else sGroup = "High Stock (50+)";

                        return {
                            key: sGroup,
                            text: sGroup
                        };
                    });
                    break;
                default:
                    oSorter = null;
            }

            if (oSorter) {
                oBinding.sort(oSorter);
            } else {
                oBinding.sort([]);
            }
        },

        onUpdateFinished: function (oEvent) {
            const oTable = oEvent.getSource();
            const iTotalItems = oEvent.getParameter("total");
            const oViewModel = this.getView().getModel("viewModel");

            oViewModel.setProperty("/totalProducts", iTotalItems);

            if (iTotalItems === 0) {
                oViewModel.setProperty("/noDataText", "No products found");
            }
        },

        // Formatter functions
        formatCurrency: function (fPrice) {
            if (fPrice) {
                return parseFloat(fPrice).toFixed(2);
            }
            return "0.00";
        },

        formatStockState: function (iStock) {
            if (iStock === 0) return "Error";
            if (iStock < 10) return "Warning";
            return "Success";
        },

        formatStockIcon: function (iStock) {
            if (iStock === 0) return "sap-icon://error";
            if (iStock < 10) return "sap-icon://warning";
            return "sap-icon://accept";
        }
    });
});
