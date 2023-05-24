import { LayoutType } from "sap/f/library";
import Dialog from "sap/m/Dialog";
import ObjectListItem from "sap/m/ObjectListItem";
import Event from "sap/ui/base/Event";
import Filter from "sap/ui/model/Filter";
import FilterOperator from "sap/ui/model/FilterOperator";
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
		this._loadOrders();

		sap.ui.getCore().getEventBus().subscribe("OrderApp", "ActionFinished", this._onActionFinished, this);
	}

	private _onActionFinished(sApp: string, sChannel: string, mData: { OrderID: number }) {
		this._rereadOrder(mData.OrderID);
	}

	private _rereadOrder(iOrderId: number) {
		const oODataModel = this.getModel("ODataModel");

		this.getView()?.setBusy(true);
		const sPath = oODataModel?.createKey("/Orders", { OrderID: iOrderId });
		if (!sPath) {
			return;
		}
		oODataModel?.read(sPath, {
			success: (mRefreshedOrder: OrderType) => {
				const aOrders = this.getModel("OrderModel")?.getProperty<OrderType[]>("/Orders");
				const mOldOrder = aOrders?.find(mOrder => mOrder.OrderID === iOrderId);
				const iIndexOfOldOrder = mOldOrder && aOrders?.indexOf(mOldOrder);
				if (iIndexOfOldOrder !== undefined) {
					aOrders?.splice(iIndexOfOldOrder, 1, mRefreshedOrder);
					this.getModel("OrderModel")?.setProperty("/Orders", aOrders);
				}
				this.getView()?.setBusy(false);
			},
			error: () => {
				// do something
				this.getView()?.setBusy(false);
			}
		});
	}

	private _loadOrders() {
		const oODataModel = this.getModel("ODataModel");

		this.getView()?.setBusy(true);
		oODataModel?.read("/Orders", {
			success: (mResponse: { results: OrderType[] }) => {
				mResponse.results.forEach(mOrder => {
					if (typeof mOrder.CreatedAt === "string") {
						mOrder.CreatedAt = new Date(mOrder.CreatedAt);
					}
				});
				this.getModel("OrderModel")?.setProperty("/Orders", mResponse.results);
				this.getView()?.setBusy(false);
			},
			error: () => {
				// do something
				this.getView()?.setBusy(false);
			}
		});
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

		const mOrderData: OrderType = {
			Description: this.byId("idInputDescription").getValue(),
			CreatedAt: new Date(),
			Vendor: this.byId("idInputVendor").getValue(),
			OrderID: 0,
			State: "1"
		};

		this._createOrder(mOrderData);
	}

	protected _onDialogButtonClosePress() {
		this._oOrderDataDialog?.close();
	}

	private _createOrder(mOrder: OrderType) {
		const oODataModel = this.getModel("ODataModel");

		this.getView()?.setBusy(true);
		oODataModel?.create("/Orders", mOrder as object, {
			success: (mCreatedOrder: OrderType) => {
				if (typeof mCreatedOrder.CreatedAt === "string") {
					mCreatedOrder.CreatedAt = new Date(mCreatedOrder.CreatedAt);
				}
				const aOrders = this.getModel("OrderModel")?.getProperty<OrderType[]>("/Orders");
				aOrders?.push(mCreatedOrder);
				this.getModel("OrderModel")?.setProperty("/Orders", aOrders);
				this.getView()?.setBusy(false);
			},
			error: () => {
				// do something
				this.getView()?.setBusy(false);
			}
		});
	}

	onDatePickerChange() {
		this._filterOrderList();
	}

	onSearchFieldSearch() {
		this._filterOrderList();
	}

	private _filterOrderList() {
		const oSearchField = this.byId("idSearchField");
		const oDatePicker = this.byId("idDatePicker");

		const sSearchValue = oSearchField.getValue();
		const dDate = oDatePicker.getDateValue() as Date;

		const aFilters: Filter[] = [];
		if (sSearchValue) {
			aFilters.push(
				new Filter(
					[
						new Filter("OrderID", FilterOperator.EQ, sSearchValue),
						new Filter({
							path: "Description",
							operator: FilterOperator.Contains,
							value1: sSearchValue,
							caseSensitive: false
						})
					],
					false
				)
			);
		}
		if (dDate) {
			// const dUTCDate = this._toUTC(dDate);
			const dNextDay = new Date(new Date(dDate.getTime()).setDate(dDate.getDate() + 1));
			aFilters.push(new Filter("CreatedAt", FilterOperator.BT, this._toUTC(dDate), this._toUTC(dNextDay)));
		}

		this.byId("idListOrders").getBinding<JSONListBinding>("items")?.filter(aFilters);
	}

	private _toUTC(dDate: Date) {
		const iDateUTC = Date.UTC(
			dDate.getFullYear(),
			dDate.getMonth(),
			dDate.getDate(),
			dDate.getHours(),
			dDate.getMinutes(),
			dDate.getSeconds(),
			dDate.getMilliseconds()
		);
		return new Date(iDateUTC);
	}
}
