import ConstantsModel from "../mvc/base/model/ConstantsModel";
import ODataModel from "../mvc/base/model/ODataModel";
import OrderModel from "../mvc/master/model/OrderModel";
import OrderItemModel from "../mvc/detail/model/OrderItemModel";
import ResourceModel from "sap/ui/model/resource/ResourceModel";
import BaseModel from "../mvc/base/model/BaseModel";

export type ManifestModels = {
	ODataModel: ODataModel;
	OrderModel: OrderModel;
	OrderItemModel: OrderItemModel;
	ConstantsModel: ConstantsModel;
	i18n: ResourceModel;
	BaseModel: BaseModel;
}