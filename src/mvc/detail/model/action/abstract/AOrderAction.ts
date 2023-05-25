import BaseObject from "sap/ui/base/Object";
import { OrderKeys } from "../../../../../typedef/ODataModelTypes";
import IAction from "./IAction";

/**
 * @namespace com.insidettrack.demo.mvc.detail.model.action.abstract
 */
export default abstract class AOrderAction<T = void> extends BaseObject implements IAction<T> {
	protected readonly _mOrderKeys: OrderKeys;

	constructor(mOrderKeys: OrderKeys) {
		super();
		this._mOrderKeys = mOrderKeys;
	}

	abstract execute(): Promise<T>;
}
