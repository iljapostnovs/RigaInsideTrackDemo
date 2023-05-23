import List from "sap/m/List";
import MessagePage from "sap/m/MessagePage";
import App from "sap/m/App";
import FlexibleColumnLayout from "sap/f/FlexibleColumnLayout";

export type MasterView = {
	idListOrders: List;
};

export type DetailView = {
	
};

export type ErrorView = {
	idMessagePage: MessagePage;
};

export type BaseView = {
	idApp: App;
	idFlexibleColumnLayout: FlexibleColumnLayout;
};