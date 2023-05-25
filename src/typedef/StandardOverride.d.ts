import Context from "sap/ui/model/Context";
import { ManifestModels } from "./ManifestModels";

declare module "sap/ui/base/ManagedObject" {
	import { ManifestModels } from "./ManifestModels";
	export default interface ManagedObject {
		getModel<T extends keyof ManifestModels>(sModelName?: T): ManifestModels[T];
		getBinding<T extends Binding = Binding>(sName: string): T;
	}
}

declare module "com/insidettrack/demo/Component" {
	export default interface Component {
		getModel<T extends keyof ManifestModels>(sName?: T): ManifestModels[T];
	}
}

declare module "sap/ui/model/json/JSONModel" {
	export default interface JSONModel {
		getProperty<T>(sPath: string, oContext?: Context): T;
	}
}

