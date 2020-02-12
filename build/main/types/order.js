"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OrderBuyOrSell;
(function (OrderBuyOrSell) {
    OrderBuyOrSell["BUY"] = "BUY";
    OrderBuyOrSell["SELL"] = "SELL";
})(OrderBuyOrSell = exports.OrderBuyOrSell || (exports.OrderBuyOrSell = {}));
var OrderCancellationPolicy;
(function (OrderCancellationPolicy) {
    OrderCancellationPolicy["GOOD_TIL_CANCELLED"] = "GOOD_TIL_CANCELLED";
    OrderCancellationPolicy["FILL_OR_KILL"] = "FILL_OR_KILL";
    OrderCancellationPolicy["IMMEDIATE_OR_CANCEL"] = "IMMEDIATE_OR_CANCEL";
    OrderCancellationPolicy["GOOD_TIL_TIME"] = "GOOD_TIL_TIME";
})(OrderCancellationPolicy = exports.OrderCancellationPolicy || (exports.OrderCancellationPolicy = {}));
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["OPEN"] = "OPEN";
    OrderStatus["CANCELLED"] = "CANCELLED";
    OrderStatus["FILLED"] = "FILLED";
    OrderStatus["PENDING"] = "PENDING";
})(OrderStatus = exports.OrderStatus || (exports.OrderStatus = {}));
var OrderType;
(function (OrderType) {
    OrderType["MARKET"] = "MARKET";
    OrderType["LIMIT"] = "LIMIT";
    OrderType["STOP_MARKET"] = "STOP_MARKET";
    OrderType["STOP_LIMIT"] = "STOP_LIMIT";
})(OrderType = exports.OrderType || (exports.OrderType = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdHlwZXMvb3JkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUE0QkEsSUFBWSxjQUdYO0FBSEQsV0FBWSxjQUFjO0lBQ3hCLDZCQUFXLENBQUE7SUFDWCwrQkFBYSxDQUFBO0FBQ2YsQ0FBQyxFQUhXLGNBQWMsR0FBZCxzQkFBYyxLQUFkLHNCQUFjLFFBR3pCO0FBRUQsSUFBWSx1QkFLWDtBQUxELFdBQVksdUJBQXVCO0lBQ2pDLG9FQUF5QyxDQUFBO0lBQ3pDLHdEQUE2QixDQUFBO0lBQzdCLHNFQUEyQyxDQUFBO0lBQzNDLDBEQUErQixDQUFBO0FBQ2pDLENBQUMsRUFMVyx1QkFBdUIsR0FBdkIsK0JBQXVCLEtBQXZCLCtCQUF1QixRQUtsQztBQUVELElBQVksV0FLWDtBQUxELFdBQVksV0FBVztJQUNyQiw0QkFBYSxDQUFBO0lBQ2Isc0NBQXVCLENBQUE7SUFDdkIsZ0NBQWlCLENBQUE7SUFDakIsa0NBQW1CLENBQUE7QUFDckIsQ0FBQyxFQUxXLFdBQVcsR0FBWCxtQkFBVyxLQUFYLG1CQUFXLFFBS3RCO0FBRUQsSUFBWSxTQUtYO0FBTEQsV0FBWSxTQUFTO0lBQ25CLDhCQUFpQixDQUFBO0lBQ2pCLDRCQUFlLENBQUE7SUFDZix3Q0FBMkIsQ0FBQTtJQUMzQixzQ0FBeUIsQ0FBQTtBQUMzQixDQUFDLEVBTFcsU0FBUyxHQUFULGlCQUFTLEtBQVQsaUJBQVMsUUFLcEIifQ==