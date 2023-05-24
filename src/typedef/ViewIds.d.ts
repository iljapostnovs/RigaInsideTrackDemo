import Dialog from "sap/m/Dialog";
import Input from "sap/m/Input";
import Button from "sap/m/Button";
import SearchField from "sap/m/SearchField";
import DatePicker from "sap/m/DatePicker";
import List from "sap/m/List";
import Table from "sap/m/Table";
import MessagePage from "sap/m/MessagePage";
import App from "sap/m/App";
import FlexibleColumnLayout from "sap/f/FlexibleColumnLayout";

export type OrderDataDialogFragment = {
	idDialogOrderData: Dialog;
	idInputDescription: Input;
	idInputVendor: Input;
	idButtonOk: Button;
	idButtonClose: Button;
};

export type OrderView = {
	idSearchField: SearchField;
	idDatePicker: DatePicker;
	idListOrders: List;
};

export type OrderItemView = {
	idTableOrderItems: Table;
};

export type ErrorView = {
	idMessagePage: MessagePage;
};

export type BaseView = {
	idApp: App;
	idFlexibleColumnLayout: FlexibleColumnLayout;
};