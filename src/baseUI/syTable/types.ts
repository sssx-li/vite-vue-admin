export type fixedType = 'right' | 'left' | boolean;
export type TTableSize = 'default' | 'middle' | 'small';

interface IScroll {
  x?: number;
  y?: number;
}
export interface IColumns {
  title?: string; // 列头显示文字
  dataIndex?: string; // 列数据在数据项中对应的 key，支持 a.b.c 的嵌套写法
  key?: string; // Vue 需要的 key，如果已经设置了唯一的 dataIndex，可以忽略这个属性
  align?: string; // 设置列内容的对齐方式
  slotName?: string; // 自定义slot name
  ellipsis?: boolean; // 超过宽度将自动省略
  fixed?: fixedType; // 列是否固定
  width?: string | number;
  slots?: object; // antd cloumns属性;具体请查看api文档
}
export interface IHandlerOption {
  showSizeIcon?: boolean; // 表格密度
  showCulomnIcon?: boolean; // 表格列展示
  showRefreshIcon?: boolean; // 是否展示刷新按钮
}
export interface ITableState {
  size: TTableSize;
  columns: IColumns[];
  changeSize: (size: TTableSize) => void;
  changeColumns: (columns: IColumns[]) => void;
}
export interface IOptions {
  bordered?: boolean;
  size?: TTableSize;
  rowClassName?: any;
  scroll?: IScroll;
}
export interface ITableConfig {
  columns: IColumns[]; // 表格列配置
  title?: string; // 表格标题
  options?: IOptions; // 表格配置项
  showFooter?: boolean; // 是否显示底部分页组件
  handlerOption?: IHandlerOption; // 表格右上角图标显示
}
