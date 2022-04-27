sap.ui.define(
    [],
    function () {
        "use strict";
        return {
            formatActivityText: function (iNumber) {
                let sResult;
                switch (iNumber) {
                    case 1:
                        sResult = "Active";
                        break;
                    case 2:
                        sResult = "Paused";
                        break;
                    case 3:
                        sResult = "Inactive";
                        break;
                    default:
                        sResult = "Unknown";
                        break;
                }
                return sResult;
            },

            formatActivityState: function (iNumber) {
                let sState;
                switch (iNumber) {
                    case 1:
                        sState = "Success";
                        break;
                    case 2:
                        sState = "Warning";
                        break;
                    case 3:
                        sState = "Error";
                        break;
                    default:
                        sState = "None";
                        break;
                }
                return sState;
            }
        };
    },
    true
);