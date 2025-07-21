sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/viz/ui5/controls/common/feeds/FeedItem"
], (Controller, JSONModel, FeedItem) => {
    "use strict";

    return Controller.extend("project2.controller.View1", {
        onInit() {
            var oModel = new JSONModel({
                data: [{ Category: "A", Revenue: 1200, Profit: 300 },
                { Category: "B", Revenue: 1400, Profit: 400 },
                { Category: "C", Revenue: 1100, Profit: 250 },
                { Category: "D", Revenue: 1750, Profit: 550 },
                { Category: "E", Revenue: 1300, Profit: 330 },
                { Category: "F", Revenue: 1500, Profit: 420 }]
            });
            this.getView().setModel(oModel);
        },
        onSelect(oEvent) {

            var oVizFrame = this.byId("idVizFrame");
            var iIndex = oEvent.getParameter("selectedIndex");
            var aChartTypes = ["column", "bar", "line", "area"];
            var sSelectedType = aChartTypes[iIndex];

            oVizFrame.setVizType(sSelectedType);
            oVizFrame.removeAllFeeds();

            // Common feeds for column, bar, line, area
            oVizFrame.addFeed(new FeedItem({
                uid: "valueAxis",
                type: "Measure",
                values: ["Revenue"]
            }));
            oVizFrame.addFeed(new FeedItem({
                uid: "categoryAxis",
                type: "Dimension",
                values: ["Category"]
            }));
        }
    });
});