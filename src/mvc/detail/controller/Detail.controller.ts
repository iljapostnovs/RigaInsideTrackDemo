import BaseController from "../../../mvc/base/controller/BaseController";
import { DetailView } from "../../../typedef/ViewIds";

/**
 * @namespace com.insidettrack.demo.mvc.detail.controller
 * @ui5model {com.insidettrack.demo.mvc.detail.model.DetailModel}
 */
export default class Detail extends BaseController<DetailView> {
	override onInit() {
		super.onInit();

		this.getView()?.setModel(this.getModel("DetailModel"));
	}
}
