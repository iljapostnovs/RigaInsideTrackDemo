import ConstantsModel from "../mvc/base/model/ConstantsModel";
import ODataModel from "../mvc/base/model/ODataModel";
import MasterModel from "../mvc/master/model/MasterModel";
import DetailModel from "../mvc/detail/model/DetailModel";
import ResourceModel from "sap/ui/model/resource/ResourceModel";

export type ManifestModels = {
	ODataModel: ODataModel;
	MasterModel: MasterModel;
	DetailModel: DetailModel;
	ConstantsModel: ConstantsModel;
	i18n: ResourceModel;
}