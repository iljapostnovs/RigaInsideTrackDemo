import ODataModel from "../../../base/model/ODataModel";
import AOrderAction from "./abstract/AOrderAction";

/**
 * @namespace com.insidettrack.demo.mvc.detail.model.action
 */
export default class Reject extends AOrderAction {
	async execute() {
		const oODataModel = ODataModel.getInstance();

		await oODataModel.callFunctionAsync("/RejectOrder", {
			method: "POST",
			urlParameters: {
				OrderID: this._mOrderKeys.OrderID
			}
		});
	}
}
