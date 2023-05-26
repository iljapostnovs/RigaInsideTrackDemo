import ResourceBundle from "sap/base/i18n/ResourceBundle";
import UI5Element from "sap/ui/core/Element";
import UIComponent from "sap/ui/core/UIComponent";
import Controller from "sap/ui/core/mvc/Controller";
import Model from "sap/ui/model/Model";
import { ManifestModels } from "../../../typedef/ManifestModels";
import Formatter from "./util/Formatter";

/**
 * @namespace com.insidettrack.demo.mvc.base.controller
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-unsafe-declaration-merging
export default abstract class BaseController<
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	ViewFragmentIds extends Record<string, UI5Element>,
	DefaultModel extends Model = Model
> extends Controller {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	protected formatter = new Formatter();

	override onInit(): void {
		//
	}

	getModel<T extends keyof ManifestModels>(sName: T): ManifestModels[T];
	getModel(): DefaultModel;

	getModel<T extends keyof ManifestModels>(sName?: T) {
		return this.getOwnerComponent()?.getModel(sName) ?? super.getView()?.getModel(sName);
	}

	getBundle() {
		return this.getModel("i18n")?.getResourceBundle() as ResourceBundle;
	}

	getRouter() {
		return UIComponent.getRouterFor(this);
	}

	// // eslint-disable-next-line @typescript-eslint/naming-convention
	// protected busify<T1, T2>(fnAnything: (...args: T2[]) => Promise<T1>, context?: any): (...args: T2[]) => Promise<T1>;
	// // eslint-disable-next-line @typescript-eslint/naming-convention
	// protected busify<T1, T2>(
	// 	fnAnything?: (...args: T2[]) => Promise<T1>,
	// 	context?: any
	// ): (...args: T2[]) => Promise<T1 | undefined>;
	// // eslint-disable-next-line @typescript-eslint/naming-convention
	// protected busify<T1>(pPromise: Promise<T1>): Promise<T1>;
	// // eslint-disable-next-line @typescript-eslint/naming-convention
	// protected busify<T1>(pPromise?: Promise<T1>): Promise<T1 | undefined>;
	// // eslint-disable-next-line @typescript-eslint/naming-convention
	// protected busify<T1, T2>(
	// 	vParameter?: ((...args: T2[]) => Promise<T1>) | Promise<T1>,
	// 	context: any = window
	// ): (() => Promise<T1>) | Promise<T1> | (() => Promise<T1 | undefined>) | Promise<T1 | undefined> {
	// 	if (typeof vParameter === "function") {
	// 		return async (...args: T2[]) => {
	// 			this.getView()?.setBusy(true);
	// 			try {
	// 				return await vParameter.call(context, ...args);
	// 			} finally {
	// 				this.getView()?.setBusy(false);
	// 			}
	// 		};
	// 	} else if (vParameter) {
	// 		return new Promise<T1>((resolve, reject) => {
	// 			this.getView()?.setBusy(true);
	// 			vParameter
	// 				.then(resolve)
	// 				.catch(reject)
	// 				.finally(() => {
	// 					this.getView()?.setBusy(false);
	// 				});
	// 		});
	// 	} else {
	// 		return new Promise<T1 | undefined>(resolve => {
	// 			resolve(undefined);
	// 		});
	// 	}
	// }
	// eslint-disable-next-line @typescript-eslint/naming-convention
	protected async busify<T>(pPromise: Promise<T>): Promise<T> {
		this.getView()?.setBusy(true);
		try {
			return await pPromise;
		} finally {
			this.getView()?.setBusy(false);
		}
	}
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default interface BaseController<ViewFragmentIds extends Record<string, UI5Element>, DefaultModel extends Model>
	extends Controller {
	byId<T extends keyof ViewFragmentIds>(sId: T): ViewFragmentIds[T];
}
