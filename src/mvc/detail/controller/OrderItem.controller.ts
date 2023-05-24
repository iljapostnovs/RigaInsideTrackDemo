import { OrderItemView } from "../../../typedef/ViewIds";
import BaseController from "../../base/controller/BaseController";

/**
 * @namespace com.insidettrack.demo.mvc.detail.controller
 * @ui5model {com.insidettrack.demo.mvc.detail.model.OrderItemModel}
 */
export default class OrderItem extends BaseController<OrderItemView> {
	override onInit() {
		super.onInit();

		this.getView()?.setModel(this.getModel("OrderItemModel"));
	}
}
