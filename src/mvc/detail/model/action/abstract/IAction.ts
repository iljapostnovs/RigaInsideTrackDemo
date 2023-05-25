export default interface IAction<T = void> {
	execute(): Promise<T>;
}
