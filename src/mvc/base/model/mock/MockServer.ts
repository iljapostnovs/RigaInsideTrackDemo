/* eslint-disable space-before-function-paren */
import BaseObject from "sap/ui/base/Object";
import StandardMockServer, { RequestHandler } from "sap/ui/core/util/MockServer";
import ConstantsModel from "../ConstantsModel";

let oMockServer: StandardMockServer;
const sAppModulePath = "com/insidettrack/demo/mvc/base/model/mock/";
const sJsonFilesModulePath = sAppModulePath + "data";
const sMetadataUrlModulePath = sAppModulePath + "metadata";
const sMainDataSourceUrl = "/sap/opu/odata/sap/ORDERING_SRV/";

/**
 * @namespace com.insidettrack.demo.mvc.base.model.mock
 */
export default class MockServer extends BaseObject {
	private static _iOrderIdCounter = 50;

	private static readonly _aOrders = {
		d: {
			results: [
				{
					OrderID: 1,
					CreatedAt: new Date(2023, 5, 24),
					State: "1",
					Description: "Milks",
					Vendor: "Milk factory",
					__metadata: {
						uri: "https://test/service/Orders(1)"
					}
				},
				{
					OrderID: 2,
					CreatedAt: new Date(2023, 5, 25),
					State: "2",
					Description: "Car",
					Vendor: "Audi",
					__metadata: {
						uri: "https://test/service/Orders(2)"
					}
				},
				{
					OrderID: 43,
					CreatedAt: new Date(2023, 5, 24),
					State: "3",
					Description: "Vegetables",
					Vendor: "Farm",
					__metadata: {
						uri: "https://test/service/Orders(3)"
					}
				}
			]
		}
	};

	init() {
		const sJsonFilesUrl = sap.ui.require.toUrl(sJsonFilesModulePath);
		const sMetadataUrl = sap.ui.require.toUrl(sMetadataUrlModulePath) + ".xml";

		oMockServer = new StandardMockServer({
			rootUri: sMainDataSourceUrl
		});

		StandardMockServer.config({
			autoRespond: true,
			autoRespondAfter: 500
		});

		oMockServer.simulate(sMetadataUrl, {
			sMockdataBaseUrl: sJsonFilesUrl,
			bGenerateMissingMockData: true
		});

		let aRequests = oMockServer.getRequests();
		const aCustomRequests = this._getRequests();
		aRequests = aRequests.concat(aCustomRequests);

		oMockServer.setRequests(aRequests);
		oMockServer.start();
	}

	private _getRequests(): RequestHandler[] {
		return [
			{
				method: "GET",
				path: /.*Orders$/,
				response: oXHR => {
					oXHR.respondJSON(200, undefined, MockServer._aOrders);
					return true;
				}
			},
			{
				method: "GET",
				path: /.*Orders\(.*?\)$/,
				response: oXHR => {
					const oCastedXHR = oXHR as unknown as { url: string };
					const sOrderId = /(?<=.*?Orders\().*?(?=\))/.exec(oCastedXHR.url)?.[0];
					if (!sOrderId) {
						return;
					}
					const iOrderId = parseInt(sOrderId, 10);
					const mOrder = MockServer._aOrders.d.results.find(mOrder => mOrder.OrderID === iOrderId);
					if (!mOrder) {
						return;
					}
					oXHR.respondJSON(200, undefined, { d: mOrder });
					return true;
				}
			},
			{
				method: "POST",
				path: /.*Orders$/,
				response: oXHR => {
					const oCastedXHR = oXHR as unknown as { requestBody: string };
					const mOrder: (typeof MockServer._aOrders.d.results)[0] = JSON.parse(oCastedXHR.requestBody);
					mOrder.CreatedAt = new Date();
					mOrder.OrderID = MockServer._iOrderIdCounter++;
					MockServer._aOrders.d.results.push(mOrder);
					oXHR.respondJSON(202, undefined, { d: mOrder });
					return true;
				}
			},
			{
				method: "POST",
				path: /.*ApproveOrder.*/,
				response: oXHR => {
					const oCastedXHR = oXHR as unknown as { url: string };
					const sOrderId = new URL("https://test" + oCastedXHR.url).searchParams.get("OrderID");
					if (!sOrderId) {
						return;
					}
					const iOrderId = parseInt(sOrderId, 10);
					const mOrder = MockServer._aOrders.d.results.find(mOrder => mOrder.OrderID === iOrderId);
					if (!mOrder) {
						return;
					}
					mOrder.State = ConstantsModel.mConstants.OrderState.Approved;
					oXHR.respondJSON(202, undefined, { d: mOrder });
					return true;
				}
			},
			{
				method: "POST",
				path: /.*RejectOrder.*/,
				response: oXHR => {
					const oCastedXHR = oXHR as unknown as { url: string };
					const sOrderId = new URL("https://test" + oCastedXHR.url).searchParams.get("OrderID");
					if (!sOrderId) {
						return;
					}
					const iOrderId = parseInt(sOrderId, 10);
					const mOrder = MockServer._aOrders.d.results.find(mOrder => mOrder.OrderID === iOrderId);
					if (!mOrder) {
						return;
					}
					mOrder.State = ConstantsModel.mConstants.OrderState.Rejected;
					oXHR.respondJSON(202, undefined, { d: mOrder });
					return true;
				}
			},
			{
				method: "POST",
				path: /.*PostOrder.*/,
				response: oXHR => {
					const oCastedXHR = oXHR as unknown as { url: string };
					const sOrderId = new URL("https://test" + oCastedXHR.url).searchParams.get("OrderID");
					if (!sOrderId) {
						return;
					}
					const iOrderId = parseInt(sOrderId, 10);
					const mOrder = MockServer._aOrders.d.results.find(mOrder => mOrder.OrderID === iOrderId);
					if (!mOrder) {
						return;
					}
					mOrder.State = ConstantsModel.mConstants.OrderState.Posted;
					oXHR.respondJSON(202, undefined, { d: mOrder });
					return true;
				}
			}
		];
	}
}
