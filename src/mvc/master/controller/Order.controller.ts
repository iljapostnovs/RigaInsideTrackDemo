import { LayoutType } from "sap/f/library";
import Dialog from "sap/m/Dialog";
import ObjectListItem from "sap/m/ObjectListItem";
import Event from "sap/ui/base/Event";
import JSONListBinding from "sap/ui/model/json/JSONListBinding";
import { Order as OrderType } from "../../../typedef/ODataModelTypes";
import { OrderDataDialogFragment, OrderView } from "../../../typedef/ViewIds";
import BaseController from "../../base/controller/BaseController";

/**
 * @namespace com.insidettrack.demo.mvc.master.controller
 * @ui5model {com.insidettrack.demo.mvc.master.model.OrderModel}
 */
export default class Order extends BaseController<OrderView & OrderDataDialogFragment> {
	private _oOrderDataDialog?: Dialog;

	override onInit() {
		super.onInit();

		this.getView()?.setModel(this.getModel("OrderModel"));

		this.getRouter().getRoute("Order")?.attachMatched(this._onRouteMatched, this);
		void this.getModel("OrderModel")?.loadOrders();

		sap.ui.getCore().getEventBus().subscribe("OrderApp", "ActionFinished", this._onActionFinished, this);
	}

	private _onActionFinished(sApp: string, sChannel: string, mData: { OrderID: number }) {
		void this.getModel("OrderModel")?.rereadOrder(mData.OrderID);
	}

	private _onRouteMatched() {
		this.getModel("BaseModel")?.setProperty("/Layout", LayoutType.OneColumn);
	}

	onListOrdersSelectionChange(oEvent: Event) {
		const oListItem = oEvent.getParameter("listItem") as ObjectListItem;
		const mOrder = oListItem.getBindingContext()?.getObject() as OrderType;
		this.getRouter().navTo("OrderItem", {
			OrderID: mOrder.OrderID
		});
	}

	async onButtonCreateOrderPress() {
		if (!this._oOrderDataDialog) {
			this._oOrderDataDialog = await (this.loadFragment({
				name: "com.insidettrack.demo.mvc.master.view.fragment.OrderDataDialog",
				addToDependents: true,
				autoPrefixId: true
			}) as Promise<Dialog>);
		}

		this._oOrderDataDialog.open();
	}

	protected _onDialogButtonOkPress() {
		this._oOrderDataDialog?.close();

		void this._applyBusy(async () => {
			const mOrderData = {
				Description: this.byId("idInputDescription").getValue(),
				Vendor: this.byId("idInputVendor").getValue()
			};
			await this.getModel("OrderModel")?.createOrder(mOrderData);
		});
	}

	protected _onDialogButtonClosePress() {
		this._oOrderDataDialog?.close();
	}

	onDatePickerChange() {
		this._filterOrderList();
	}

	onSearchFieldSearch() {
		this._filterOrderList();
	}

	private _filterOrderList() {
		const aOrderListFilters = this.getModel("OrderModel")?.generateOrderListFilters() ?? [];
		this.byId("idListOrders").getBinding<JSONListBinding>("items")?.filter(aOrderListFilters);
	}
}
