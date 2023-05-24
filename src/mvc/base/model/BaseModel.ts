import { LayoutType } from "sap/f/library";
import JSONModel from "sap/ui/model/json/JSONModel";

/**
 * @namespace com.insidettrack.demo.mvc.base.model
 */
export default class BaseModel extends JSONModel {
	constructor(oData?: string | object | undefined, bObserve?: boolean | undefined) {
		super(
			{
				Layout: LayoutType.OneColumn
			},
			bObserve
		);
	}
}
