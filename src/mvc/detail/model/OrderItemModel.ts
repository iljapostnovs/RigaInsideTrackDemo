import JSONModel from "sap/ui/model/json/JSONModel";
import { Order, OrderItem, OrderKeys } from "../../../typedef/ODataModelTypes";
import ODataModel from "../../base/model/ODataModel";

/**
 * @namespace com.insidettrack.demo.mvc.detail.model
 */
export default class OrderItemModel extends JSONModel {
	rejectOrder(mOrder: Order) {
		const oODataModel = ODataModel.getInstance();

		return oODataModel.callFunctionAsync("/RejectOrder", {
			method: "POST",
			urlParameters: {
				OrderID: mOrder.OrderID
			}
		});
	}

	postOrder(mOrder: Order) {
		const oODataModel = ODataModel.getInstance();

		return oODataModel.callFunctionAsync("/PostOrder", {
			method: "POST",
			urlParameters: {
				OrderID: mOrder.OrderID
			}
		});
	}

	approveOrder(mOrder: Order) {
		const oODataModel = ODataModel.getInstance();

		return oODataModel.callFunctionAsync("/ApproveOrder", {
			method: "POST",
			urlParameters: {
				OrderID: mOrder.OrderID
			}
		});
	}

	async loadOrderItems(mOrderKeys: OrderKeys) {
		const oODataModel = ODataModel.getInstance();
		const sPath = oODataModel.createKey("/Orders", mOrderKeys);

		const aOrderItems = await oODataModel.readAsync<OrderItem[]>(`${sPath}/OrderItems`, {
			urlParameters: {
				$expand: "Product"
			}
		});

		this.setProperty("/OrderItems", aOrderItems);
	}
}
