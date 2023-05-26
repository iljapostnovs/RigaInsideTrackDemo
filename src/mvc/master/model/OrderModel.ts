import Filter from "sap/ui/model/Filter";
import FilterOperator from "sap/ui/model/FilterOperator";
import JSONModel from "sap/ui/model/json/JSONModel";
import { Order } from "../../../typedef/ODataModelTypes";
import ODataModel from "../../base/model/ODataModel";
/**
 * @namespace com.insidettrack.demo.mvc.master.model
 */
export default class OrderModel extends JSONModel {
	constructor() {
		super({
			Orders: [],
			Filters: {
				SearchValue: "",
				Date: null
			}
		});
	}

	async rereadOrder(iOrderId: number) {
		const oODataModel = ODataModel.getInstance();

		const sPath = oODataModel.createKey("/Orders", { OrderID: iOrderId });
		const mRefreshedOrder = await ODataModel.getInstance().readAsync<Order>(sPath);
		this._adjustDate(mRefreshedOrder);

		const aOrders = this.getProperty<Order[]>("/Orders");
		const mOldOrder = aOrders?.find(mOrder => mOrder.OrderID === iOrderId);
		const iIndexOfOldOrder = mOldOrder && aOrders?.indexOf(mOldOrder);
		if (iIndexOfOldOrder !== undefined) {
			aOrders.splice(iIndexOfOldOrder, 1, mRefreshedOrder);
			this.setProperty("/Orders", aOrders);
		}
	}

	async loadOrders() {
		const oODataModel = ODataModel.getInstance();

		const aOrders = await oODataModel.readAsync<Order[]>("/Orders");
		aOrders.forEach(this._adjustDate);

		this.setProperty("/Orders", aOrders);
	}

	async createOrder(mOrderData: Pick<Order, "Description" | "Vendor">) {
		const oODataModel = ODataModel.getInstance();

		const mOrder: Order = {
			...mOrderData,
			CreatedAt: new Date(),
			OrderID: 0,
			State: "1"
		};
		const mCreatedOrder = await oODataModel.createAsync<Order>("/Orders", mOrder);
		this._adjustDate(mCreatedOrder);

		const aOrders = this.getProperty<Order[]>("/Orders");
		aOrders?.push(mCreatedOrder);
		this.setProperty("/Orders", aOrders);
	}

	private _adjustDate(mOrder: Order) {
		if (typeof mOrder.CreatedAt === "string") {
			mOrder.CreatedAt = new Date(mOrder.CreatedAt);
		}
	}

	generateOrderListFilters() {
		const aFilters: Filter[] = [];
		const sSearchValue = this.getProperty<string>("/Filters/SearchValue");
		const dDate = this.getProperty<Date>("/Filters/Date");
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

		return aFilters;
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
