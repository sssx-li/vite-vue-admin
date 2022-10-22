export interface IDefCheckParams {
  expandedKeys: (string | number)[];
  selectedKeys: (string | number)[];
  checkedKeys: (string | number)[];
}
export interface IData {
  id: number | string;
  parentID: number | string;
  name: string;
  [propType: string]: any;
}
export interface ICheckParams extends IDefCheckParams {
  [propType: string]: any;
}
export interface IFieldNames {
  title: string;
  key: string;
}
export interface ITreeData extends IData {
  childern?: ITreeData[];
}
