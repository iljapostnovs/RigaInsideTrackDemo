import ResourceBundle from "sap/base/i18n/ResourceBundle";
import UI5Element from "sap/ui/core/Element";
import UIComponent from "sap/ui/core/UIComponent";
import Controller from "sap/ui/core/mvc/Controller";
import { ManifestModels } from "../../../typedef/ManifestModels";
import Formatter from "./util/Formatter";

/**
 * @namespace com.insidettrack.demo.mvc.base.controller
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-unsafe-declaration-merging
export default abstract class BaseController<ViewFragmentIds extends Record<string, UI5Element>> extends Controller {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	protected formatter = new Formatter();

	override onInit(): void {
		//
	}

	getModel<T extends keyof ManifestModels>(sName?: T) {
		return this.getOwnerComponent()?.getModel(sName) ?? super.getView()?.getModel(sName);
	}

	getBundle() {
		return this.getModel("i18n")?.getResourceBundle() as ResourceBundle;
	}

	getRouter() {
		return UIComponent.getRouterFor(this);
	}

	protected async _applyBusy<T>(fnAnything: () => Promise<T>) {
		this.getView()?.setBusy(true);
		try {
			return await fnAnything();
		} finally {
			this.getView()?.setBusy(false);
		}
	}
}

export default interface BaseController<ViewFragmentIds extends Record<string, UI5Element>> extends Controller {
	byId<T extends keyof ViewFragmentIds>(sId: T): ViewFragmentIds[T];
}
