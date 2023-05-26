import { LayoutType } from "sap/f/library";
import Event from "sap/ui/base/Event";
import { Order, OrderKeys } from "../../../typedef/ODataModelTypes";
import { OrderItemView } from "../../../typedef/ViewIds";
import BaseController from "../../base/controller/BaseController";
import OrderItemModel from "../model/OrderItemModel";

/**
 * @namespace com.insidettrack.demo.mvc.detail.controller
 * @ui5model {com.insidettrack.demo.mvc.detail.model.OrderItemModel}
 */
export default class OrderItem extends BaseController<OrderItemView, OrderItemModel> {
	override onInit() {
		super.onInit();

		this.getView()?.setModel(this.getModel("OrderItemModel"));
		this.getRouter().getRoute("OrderItem")?.attachMatched(this._onRouteMatched, this);
	}

	private _onRouteMatched(oEvent: Event) {
		this.getModel("BaseModel")?.setProperty("/Layout", LayoutType.TwoColumnsMidExpanded);
		const mArgs = oEvent.getParameter("arguments") as { OrderID: number };

		this._bindView(mArgs.OrderID);

		void this._loadOrderItems(mArgs);
	}

	private _loadOrderItems(mOrderKeys: OrderKeys) {
		return this.busify(this.getModel().loadOrderItems(mOrderKeys));
	}

	private _bindView(iOrderId: number) {
		const sPath = this.getModel("ODataModel")?.createKey("/Orders", { OrderID: iOrderId });
		if (sPath) {
			this.getView()?.bindElement(`ODataModel>${sPath}`);
		}
	}

	onButtonApprovePress() {
		void this._applyAction(async mOrder => {
			await this.getModel().approveOrder(mOrder);
		});
	}

	onButtonPostPress() {
		void this._applyAction(async mOrder => {
			await this.getModel().postOrder(mOrder);
		});
	}

	onButtonRejectPress() {
		void this._applyAction(async mOrder => {
			await this.getModel().rejectOrder(mOrder);
		});
	}

	private async _applyAction(fnAction: (mOrder: Order) => Promise<any>) {
		const mOrder = this.getView()?.getBindingContext("ODataModel")?.getObject() as Order;

		await this.busify(fnAction(mOrder));

		sap.ui.getCore().getEventBus().publish("OrderApp", "ActionFinished", mOrder);
		this._refreshOrderBinding();
	}

	private _refreshOrderBinding() {
		this.getView()?.getElementBinding("ODataModel")?.refresh(true);
	}
}
