import { LayoutType } from "sap/f/library";
import Event from "sap/ui/base/Event";
import { Order, OrderItem as OrderItemType } from "../../../typedef/ODataModelTypes";
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
		this._loadOrderItems(mArgs.OrderID);
	}

	private _bindView(iOrderId: number) {
		const sPath = this.getModel("ODataModel")?.createKey("/Orders", { OrderID: iOrderId });
		if (sPath) {
			this.getView()?.bindElement(`ODataModel>${sPath}`);
		}
	}

	private _loadOrderItems(iOrderId: number) {
		const oODataModel = this.getModel("ODataModel");

		this.getView()?.setBusy(true);
		const sPath = oODataModel?.createKey("/Orders", { OrderID: iOrderId });

		if (!sPath) {
			return;
		}
		oODataModel?.read(`${sPath}/OrderItems`, {
			success: (mResponse: { results: OrderItemType[] }) => {
				this.getModel("OrderItemModel")?.setProperty("/OrderItems", mResponse.results);
				this.getView()?.setBusy(false);
			},
			error: () => {
				// do something
				this.getView()?.setBusy(false);
			},
			urlParameters: {
				$expand: "Product"
			}
		});
	}

	onButtonApprovePress() {
		const mOrder = this.getView()?.getBindingContext("ODataModel")?.getObject() as Order;

		this._approveOrder(mOrder);
	}

	private _approveOrder(mOrder: Order) {
		const oODataModel = this.getModel("ODataModel");

		this.getView()?.setBusy(true);

		oODataModel?.callFunction("/ApproveOrder", {
			method: "POST",
			success: () => {
				this._refreshOrderBinding();
				this.getView()?.setBusy(false);
				sap.ui.getCore().getEventBus().publish("OrderApp", "ActionFinished", { OrderID: mOrder.OrderID });
			},
			error: () => {
				// do something
				this.getView()?.setBusy(false);
			},
			urlParameters: {
				OrderID: mOrder.OrderID
			}
		});
	}

	private _refreshOrderBinding() {
		this.getView()?.getElementBinding("ODataModel")?.refresh(true);
	}

	onButtonRejectPress() {
		const mOrder = this.getView()?.getBindingContext("ODataModel")?.getObject() as Order;
		this._rejectOrder(mOrder);
	}

	private _rejectOrder(mOrder: Order) {
		const oODataModel = this.getModel("ODataModel");

		this.getView()?.setBusy(true);

		oODataModel?.callFunction("/RejectOrder", {
			method: "POST",
			success: () => {
				this._refreshOrderBinding();
				this.getView()?.setBusy(false);
				sap.ui.getCore().getEventBus().publish("OrderApp", "ActionFinished", { OrderID: mOrder.OrderID });
			},
			error: () => {
				// do something
				this.getView()?.setBusy(false);
			},
			urlParameters: {
				OrderID: mOrder.OrderID
			}
		});
	}

	onButtonPostPress() {
		const mOrder = this.getView()?.getBindingContext("ODataModel")?.getObject() as Order;
		this._postOrder(mOrder);
	}

	private _postOrder(mOrder: Order) {
		const oODataModel = this.getModel("ODataModel");

		this.getView()?.setBusy(true);

		oODataModel?.callFunction("/PostOrder", {
			method: "POST",
			success: () => {
				this._refreshOrderBinding();
				this.getView()?.setBusy(false);
				sap.ui.getCore().getEventBus().publish("OrderApp", "ActionFinished", { OrderID: mOrder.OrderID });
			},
			error: () => {
				// do something
				this.getView()?.setBusy(false);
			},
			urlParameters: {
				OrderID: mOrder.OrderID
			}
		});
	}
}
