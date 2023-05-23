/* eslint-disable space-before-function-paren */
import BaseObject from "sap/ui/base/Object";
import StandardMockServer from "sap/ui/core/util/MockServer";

let oMockServer: StandardMockServer;
const sAppModulePath = "com/insidettrack/demo/mvc/base/model/mock/";
const sJsonFilesModulePath = sAppModulePath + "data";
const sMetadataUrlModulePath = sAppModulePath + "metadata";
const sMainDataSourceUrl = "/sap/opu/odata/sap/ORDERING_SRV/";

/**
 * @namespace com.insidettrack.demo.mvc.base.model.mock
 */
export default class MockServer extends BaseObject {
	init() {
		const sJsonFilesUrl = sap.ui.require.toUrl(sJsonFilesModulePath);
		const sMetadataUrl = sap.ui.require.toUrl(sMetadataUrlModulePath) + ".xml";

		oMockServer = new StandardMockServer({
			rootUri: sMainDataSourceUrl
		});

		StandardMockServer.config({
			autoRespond: true
		});

		oMockServer.simulate(sMetadataUrl, {
			sMockdataBaseUrl: sJsonFilesUrl,
			bGenerateMissingMockData: true
		});

		let aRequests = oMockServer.getRequests();
		const aCustomRequests = this.getRequests();
		aRequests = aRequests.concat(aCustomRequests);

		oMockServer.setRequests(aRequests);
		oMockServer.start();
	}

	getMockServer() {
		return oMockServer;
	}

	getRequests() {
		return [];
	}
}
