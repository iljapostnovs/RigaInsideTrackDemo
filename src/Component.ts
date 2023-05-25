import UIComponent, { $UIComponentSettings } from "sap/ui/core/UIComponent";
import MockServer from "./mvc/base/model/mock/MockServer";
import CreateOrderDialog from "./mvc/master/view/control/dialog/order/CreateOrderDialog";

/**
 * @namespace com.insidettrack.demo
 */
export default class Component extends UIComponent {
	static readonly metadata: object = {
		manifest: "json"
	};

	constructor(mSettings?: $UIComponentSettings | undefined) {
		const oMockServer = new MockServer();
		oMockServer.init();

		super(mSettings);
	}

	override init() {
		super.init();

		void this.getModel("ODataModel")
			.metadataLoaded(true)
			.then(() => {
				this.getRouter().initialize();
			});
	}

	override destroy(bSuppressInvalidate?: boolean) {
		CreateOrderDialog.destroyInstance();

		super.destroy(bSuppressInvalidate);
	}
}
