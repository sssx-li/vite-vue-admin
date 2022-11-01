export type TAlign = 'left' | 'center' | 'right';

export interface IOptions {
  height?: string | number;
  maxHeight?: string | number;
  stripe?: boolean; // 是否为斑马纹 table
  border?: boolean; // 是否带有纵向边框
  size?: 'large' | 'default' | 'small'; // Table 的尺寸
  fit?: boolean; // 列的宽度是否自撑开
  showHeader?: boolean; // 是否显示表头
  highlightCurrentRow?: boolean; // 是否要高亮当前行
  rowKey?: Function | string; // 行数据的 Key，用来优化 Table 的渲染
  emptyText?: string; // 空数据时显示的文本内容
  defaultExpandAll?: boolean; // 是否默认展开所有行
  expandRowKeys?: any[]; // 可以通过该属性设置 Table 目前的展开行，需要设置 row-key 属性才能使用，该属性为展开行的 keys 数组
  defaultSort?: object; // 默认的排序列的 prop 和顺序
  tooltipEffect?: string; // tooltip effect 属性
  indent?: number; // 展示树形数据时，树节点的缩进
  lazy?: boolean;
  treeProps?: object;
  tableLayout?: 'fixed' | 'aut0'; // 设置表格单元、行和列的布局方式
  scrollbarAlwaysOn?: boolean; // 总是显示滚动条
  flexible?: boolean; // 确保主轴的最小尺寸
}

export interface IColumn {
  type?: 'selection' | 'index' | 'expand';
  index?: number | Function; // 如果设置了 type=index，可以通过传递 index 属性来自定义索引
  label?: string; // column 的 key，如果需要使用 filter-change 事件，则需要此属性标识是哪个 column 的筛选条件
  columnKey?: string; // column 的 key， column 的 key， 如果需要使用 filter-change 事件，则需要此属性标识是哪个 column 的筛选条件
  prop?: string; // 字段名称 对应列内容的字段名
  width?: string | number; // 对应列的宽度
  minWidth?: string | number; // 对应列的最小宽度
  fixed?: boolean | 'left' | 'right'; // 列是否固定在左侧或者右侧。 true 表示固定在左侧
  sortable?: boolean | 'custom'; // 对应列是否可以排序
  resizable?: boolean; // 对应列是否可以通过拖动改变宽度
  showOverflowTooltip?: boolean; // 当内容过长被隐藏时显示 tooltip
  align?: TAlign; // 对齐方式
  headerAlign?: TAlign; // 表头对齐方式， 若不设置该项，则使用表格的对齐方式
}

export interface ITableConfig<T = any> {
  url?: string;
  columns: T[]; // 表格配置
  filterSlotNames?: string[]; //  需要过滤的slotName
  showFooter?: boolean; // 是否显示底部分页组件
}
