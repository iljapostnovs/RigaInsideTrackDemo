import V2ODataModel from "sap/ui/model/odata/v2/ODataModel";

/**
 * @namespace com.insidettrack.demo.mvc.base.model
 */
export default class ODataModel extends V2ODataModel {
	private static _oInstance: ODataModel;

	constructor(vServiceUrl: string | object, mParameters?: IConstructorParameters) {
		super(vServiceUrl, mParameters);

		ODataModel._oInstance = this;
	}

	readAsync<T>(sPath: string, mParameters: IReadingParameters = {}): Promise<T> {
		return new Promise((resolve, reject) => {
			mParameters.success = (vData: any) => {
				(this as unknown as { _oLastReading: object | null })._oLastReading = null;
				// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
				resolve(vData.results || vData);
			};
			mParameters.error = reject;
		});
	}

	createAsync<T>(sPath: string, mData: Record<string, any>, mOptions: ICreateParameters = {}): Promise<T> {
		return new Promise((resolve, reject) => {
			mOptions.success = resolve;
			mOptions.error = reject;
			this.create(sPath, mData, mOptions);
		});
	}

	updateAsync(sPath: string, mData: Record<string, any>, mOptions: IUpdateParameters = {}): Promise<any> {
		return new Promise((resolve, reject) => {
			mOptions.success = resolve;
			mOptions.error = reject;
			this.update(sPath, mData, mOptions);
		});
	}

	removeAsync(sPath: string, mOptions: IRemoveParameters = {}): Promise<any> {
		return new Promise((resolve, reject) => {
			mOptions.success = resolve;
			mOptions.error = reject;
			this.remove(sPath, mOptions);
		});
	}

	callFunctionAsync<T>(sPath: string, mOptions: IFunctionCallParameters = {}): Promise<T> {
		return new Promise((resolve, reject) => {
			mOptions.success = resolve;
			mOptions.error = reject;
			this.callFunction(sPath, mOptions);
		});
	}

	static getInstance() {
		return ODataModel._oInstance;
	}
}

export type IReadingParameters = Parameters<typeof V2ODataModel.prototype.read>["1"];
export type ICreateParameters = Parameters<typeof V2ODataModel.prototype.create>["2"];
export type IUpdateParameters = Parameters<typeof V2ODataModel.prototype.update>["2"];
export type IRemoveParameters = Parameters<typeof V2ODataModel.prototype.remove>["1"];
export type IFunctionCallParameters = Parameters<typeof V2ODataModel.prototype.callFunction>["1"];
export type IConstructorParameters = ConstructorParameters<typeof V2ODataModel>["1"];
