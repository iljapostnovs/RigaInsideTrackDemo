import { LayoutType } from "sap/f/library";
import Event from "sap/ui/base/Event";
import { Order } from "../../../typedef/ODataModelTypes";
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
		this.getRouter().getRoute("OrderItem")?.attachMatched(this._onRouteMatched, this);
	}

	private _onRouteMatched(oEvent: Event) {
		this.getModel("BaseModel")?.setProperty("/Layout", LayoutType.TwoColumnsMidExpanded);
		const mArgs = oEvent.getParameter("arguments") as { OrderID: number };

		this._bindView(mArgs.OrderID);
		void this.getModel("OrderItemModel")?.loadOrderItems(mArgs);
	}

	private _bindView(iOrderId: number) {
		const sPath = this.getModel("ODataModel")?.createKey("/Orders", { OrderID: iOrderId });
		if (sPath) {
			this.getView()?.bindElement(`ODataModel>${sPath}`);
		}
	}

	onButtonApprovePress() {
		void this._applyAction(async mOrder => {
			await this.getModel("OrderItemModel")?.approveOrder(mOrder);
		});
	}

	onButtonPostPress() {
		void this._applyAction(async mOrder => {
			await this.getModel("OrderItemModel")?.postOrder(mOrder);
		});
	}

	onButtonRejectPress() {
		void this._applyAction(async mOrder => {
			await this.getModel("OrderItemModel")?.rejectOrder(mOrder);
		});
	}

	private _applyAction(fnAction: (mOrder: Order) => Promise<any>) {
		const mOrder = this.getView()?.getBindingContext("ODataModel")?.getObject() as Order;
		return this._applyBusy(async () => {
			await fnAction(mOrder);
			sap.ui.getCore().getEventBus().publish("OrderApp", "ActionFinished", mOrder);
			this._refreshOrderBinding();
		});
	}

	private _refreshOrderBinding() {
		this.getView()?.getElementBinding("ODataModel")?.refresh(true);
	}
}
