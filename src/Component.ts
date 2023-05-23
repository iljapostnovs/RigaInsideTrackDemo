import UIComponent, { $UIComponentSettings } from "sap/ui/core/UIComponent";
import MockServer from "./mvc/base/model/mock/MockServer";

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
		this.getRouter().initialize();
	}
}
