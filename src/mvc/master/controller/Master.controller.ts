import Event from "sap/ui/base/Event";
import BaseController from "../../../mvc/base/controller/BaseController";
import { MasterView } from "../../../typedef/ViewIds";

/**
 * @namespace com.insidettrack.demo.mvc.master.controller
 * @ui5model {com.insidettrack.demo.mvc.master.model.MasterModel}
 */
export default class Master extends BaseController<MasterView> {
	override onInit() {
		super.onInit();

		this.getView()?.setModel(this.getModel("MasterModel"));
	}

	onListOrdersSelectionChange(oEvent: Event) {}

	onButtonCreateOrderPress() {}
}
