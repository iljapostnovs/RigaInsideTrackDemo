import Manifest from "../manifest.json";

const aRoutes = Manifest["sap.ui5"].routing.routes.map(route => route.name);
const aTargets = Manifest["sap.ui5"].routing.routes.map(test => test.name);
export type Routes = (typeof aRoutes)[number];
export type Targets = (typeof aTargets)[number];
export type Models = keyof Manifest["sap.ui5"]["models"];

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type RouterArgs = {
	Master: {
		args: {};
	};
	Detail: {
		args: {
			pageId: string;
		};
	};
	Error: {
		args: {};
	};
};
