import BindingMode from "sap/ui/model/BindingMode";
import JSONModel from "sap/ui/model/json/JSONModel";

/**
 * @namespace com.insidettrack.demo.mvc.base.model
 */
export default class ConstantsModel extends JSONModel {
	static readonly mConstants = {
		OrderState: {
			InProgress: "1",
			Approved: "2",
			Rejected: "3",
			Posted: "4"
		}
	};

	constructor(oData?: string | object, bObserve?: boolean) {
		super(ConstantsModel.mConstants, bObserve);

		this.setDefaultBindingMode(BindingMode.OneWay);

		return this;
	}
}
