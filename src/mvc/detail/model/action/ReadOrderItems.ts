import ODataModel from "../../../base/model/ODataModel";
import OrderItem from "../../controller/OrderItem.controller";
import AOrderAction from "./abstract/AOrderAction";

/**
 * @namespace com.insidettrack.demo.mvc.detail.model.action
 */
export default class ReadOrderItems extends AOrderAction<OrderItem[]> {
	async execute() {
		const oODataModel = ODataModel.getInstance();
		const sPath = oODataModel.createKey("/Orders", this._mOrderKeys);

		const aOrderItems = await oODataModel.readAsync<OrderItem[]>(`${sPath}/OrderItems`, {
			urlParameters: {
				$expand: "Product"
			}
		});

		return aOrderItems;
	}
}
