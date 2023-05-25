import JSONModel from "sap/ui/model/json/JSONModel";
import { OrderKeys } from "../../../typedef/ODataModelTypes";
import Approve from "./action/Approve";
import Post from "./action/Post";
import ReadOrderItems from "./action/ReadOrderItems";
import Reject from "./action/Reject";
import IAction from "./action/abstract/IAction";

/**
 * @namespace com.insidettrack.demo.mvc.detail.model
 */
export default class OrderItemModel extends JSONModel {
	async rejectOrder(mOrder: OrderKeys) {
		await this._executeAction(new Reject(mOrder));
	}

	async postOrder(mOrder: OrderKeys) {
		await this._executeAction(new Post(mOrder));
	}

	async approveOrder(mOrder: OrderKeys) {
		await this._executeAction(new Approve(mOrder));
	}

	async loadOrderItems(mOrderKeys: OrderKeys) {
		const aOrderItems = await this._executeAction(new ReadOrderItems(mOrderKeys));

		this.setProperty("/OrderItems", aOrderItems);
	}

	private _executeAction<T = void>(oAction: IAction<T>) {
		return oAction.execute();
	}
}
