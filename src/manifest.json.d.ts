interface Manifest {
	_version: "1.1.0";
	"sap.app": {
		_version: "1.1.0";
		id: "com.insidettrack.demo";
		type: "application";
		i18n: "i18n/i18n.properties";
		applicationVersion: { version: "1.0.0" };
		title: "{{App.Title}}";
		description: "{{App.Description}}";
		dataSources: { ERP: { uri: "/sap/opu/odata/sap/ORDERING_SRV/"; type: "OData" } };
	};
	"sap.ui": {
		_version: "1.1.0";
		technology: "UI5";
		icons: { icon: ""; favIcon: ""; phone: ""; "phone@2": ""; tablet: ""; "tablet@2": "" };
		deviceTypes: { desktop: true; tablet: true; phone: true };
		supportedThemes: ["sap_belize"];
		fullWidth: false;
	};
	"sap.ui5": {
		_version: "1.1.0";
		rootView: {
			viewName: "com.insidettrack.demo.mvc.base.view.Base";
			type: "XML";
			async: true;
			id: "idApp";
		};
		dependencies: { minUI5Version: "1.84.18"; libs: { "sap.ui.core": {}; "sap.m": {}; "sap.f": {} } };
		contentDensities: { compact: true; cozy: true };
		models: {
			i18n: {
				type: "sap.ui.model.resource.ResourceModel";
				settings: { bundleName: "com.insidettrack.demo.i18n.i18n" };
			};
			ODataModel: {
				preload: true;
				dataSource: "ERP";
				type: "com.insidettrack.demo.mvc.base.model.ODataModel";
				settings: { useBatch: true; defaultCountMode: "None"; refreshAfterChange: false };
			};
			MasterModel: { type: "com.insidettrack.demo.mvc.master.model.MasterModel" };
			DetailModel: { type: "com.insidettrack.demo.mvc.detail.model.DetailModel" };
			SupportModel: { type: "sap.ui.model.json.JSONModel" };
			ErrorModel: { type: "sap.ui.model.json.JSONModel" };
			ConstantsModel: { type: "com.insidettrack.demo.mvc.base.model.ConstantsModel" };
		};
		config: { i18nBundle: "com.insidettrack.demo.i18n.i18n" };
		routing: {
			config: {
				routerClass: "sap.f.routing.Router";
				viewType: "XML";
				viewPath: "com.insidettrack.demo.mvc";
				controlId: "idFlexibleColumnLayout";
				controlAggregation: "beginColumnPages";
				async: true;
				bypassed: { target: "Error" };
			};
			routes: [
				{ pattern: ""; name: "Master"; target: ["Master"] },
				{ pattern: "Detail({ID})"; name: "Detail"; target: ["Master", "Detail"] },
				{ pattern: "Error"; name: "Error"; target: "Error" }
			];
			targets: {
				Master: {
					viewName: "master.view.Master";
					viewLevel: 1;
					transition: "show";
					controlAggregation: "beginColumnPages";
				};
				Detail: {
					viewName: "detail.view.Detail";
					viewLevel: 2;
					controlAggregation: "midColumnPages";
				};
				Error: { viewName: "base.view.Error"; viewLevel: 1 };
			};
		};
		resources: { css: [{ uri: "css/style.css" }] };
	};
}

// eslint-disable-next-line @typescript-eslint/no-redeclare, @typescript-eslint/naming-convention
declare const Manifest: Manifest;

export = Manifest;
