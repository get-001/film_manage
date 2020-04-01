/**
 * 自定义Action的类型
 * @export
 * @interface IAction
 * @template T
 * @template P
 */
export interface IAction<T extends string, P> {
  type: T;
  payload: P;
}
