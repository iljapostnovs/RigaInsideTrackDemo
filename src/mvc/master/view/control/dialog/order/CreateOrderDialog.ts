import Dialog from "sap/m/Dialog";
import ManagedObject from "sap/ui/base/ManagedObject";
import Fragment from "sap/ui/core/Fragment";
import JSONModel from "sap/ui/model/json/JSONModel";
import { Order } from "../../../../../../typedef/ODataModelTypes";

type OrderData = Pick<Order, "Description" | "Vendor">;
/**
 * @namespace com.insidettrack.demo.mvc.master.view.control.dialog.order
 */
export default class CreateOrderDialog extends ManagedObject {
	private static _oInstance?: CreateOrderDialog;

	private readonly _sFragmentName: string;

	private _mPromise?: { resolve: (mOrderData: OrderData) => void; reject: (reason?: any) => void };

	private _pDialogLoaded?: Promise<Dialog>;

	private _oDialog?: Dialog;

	constructor() {
		super();
		this._sFragmentName = "com.insidettrack.demo.mvc.master.view.control.dialog.order.CreateOrderDialog";

		this._initModels();
	}

	private _initModels() {
		this.setModel(new JSONModel());
	}

	askUserToFillOrderData() {
		return new Promise((resolve: (mOrderData: OrderData) => void, reject) => {
			this._mPromise = {
				resolve,
				reject
			};

			void this._loadAndOpenDialog();
		});
	}

	close() {
		this._oDialog?.close();
	}

	private async _loadAndOpenDialog() {
		const oDialog = await this._loadDialog();
		oDialog.open();
	}

	private async _loadDialog() {
		if (!this._pDialogLoaded) {
			this._pDialogLoaded = Fragment.load({
				name: this._sFragmentName,
				id: this.getId(),
				controller: this
			}) as Promise<Dialog>;

			this._oDialog = await this._pDialogLoaded;
			this._initDialog();
		}

		return await this._pDialogLoaded;
	}

	private _initDialog() {
		this._oDialog?.attachBeforeClose(this._onBeforeClose, this);
		this._oDialog?.setModel(this.getModel());
	}

	private _onBeforeClose() {
		this._mPromise?.reject("Dialog closed");
	}

	private _onDialogButtonOkPress() {
		const mOrderData: OrderData = {
			Vendor: this.getModel().getProperty("/Vendor"),
			Description: this.getModel().getProperty("/Description")
		};
		this._mPromise?.resolve(mOrderData);
		this.close();
	}

	private _onDialogButtonClosePress() {
		this.close();
	}

	override destroy(bSuppressInvalidate?: boolean) {
		this._oDialog?.destroy();
		this._oDialog = undefined;
		this._pDialogLoaded = undefined;
		this._mPromise = undefined;

		super.destroy(bSuppressInvalidate);
	}

	static getInstance() {
		if (!CreateOrderDialog._oInstance) {
			CreateOrderDialog._oInstance = new CreateOrderDialog();
		}

		return CreateOrderDialog._oInstance;
	}

	static destroyInstance() {
		CreateOrderDialog._oInstance?.destroy();
		CreateOrderDialog._oInstance = undefined;
	}
}
