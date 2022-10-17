import { ref, reactive, watch } from 'vue';
import Request from '@/service';
import { message } from 'ant-design-vue';

import { IConfirm, useConfirm } from './useConfirm';

import { IDataModel, ITableList } from '@/service/api/types';
import { ITableConfig } from '@/baseUI/syTable/types';

/**
 *
 * @param config 表格配置数据
 *    url: 请求地址
 *    columns: 表格数据
 *    showFooter: 是否分页
 * @param pageQuery 当前页面请求参数
 *
 */
function usePageContent(config: ITableConfig, pageQuery: any = {}) {
  const { url, columns, showFooter } = config;
  const confirm = useConfirm();

  const pageInfo = reactive({ pageNo: 1, pageSize: 10 });
  const dataSource = ref<any[]>([]);
  const total = ref(0);

  const tableState = reactive({
    columns, // 表格字段
    size: 'middle', // 表格大小
    changeSize: (size: string) => {
      // 表格间距
      tableState.size = size;
    },
    changeColumns: (columns: any[]) => {
      tableState.columns = columns;
    }
  });

  watch(pageInfo, () => getPageData());

  // 改变页码
  const handleSizeChange = (page: any) => {
    Object.assign(pageInfo, page);
  };

  /**
   *
   * @param query 用于覆盖原有参数值，通常用于通过ref调用该方法时传入
   */
  const getPageData = async (query?: any) => {
    query = query ?? {};
    let params: any = {
      ...pageQuery,
      ...pageInfo,
      ...query
    };
    if (!showFooter) {
      params = {
        ...pageQuery,
        ...query
      };
    }
    try {
      const res = await Request.get<IDataModel<ITableList>>({
        url,
        params
      });
      const {
        data: { list, page }
      } = res;
      dataSource.value = list;
      total.value = page.count;
    } catch (error) {
      message.error('获取数据失败，请刷新重试');
    }
  };

  // 编辑
  const handleEdit = async (data: any, id: string | number, curUrl?: string) => {
    try {
      await Request.put<IDataModel>({
        url: curUrl || `${url}/${id}`,
        data: {
          ...data
        }
      });
      message.success('操作成功');
      refresh();
    } catch (error) {
      message.error('操作失败，请稍后再试');
    }
  };

  // 新增
  const handleCreate = async (data: any) => {
    try {
      await Request.post<IDataModel>({
        url,
        data
      });
      message.success('添加成功');
      refresh();
    } catch (error) {
      message.error('添加失败，请稍后再试');
    }
  };

  // 删除
  const handleDelete = (row: any, contentTip?: string) => {
    const confirmParams: IConfirm = {
      title: '删除',
      content: contentTip || '删除之后无法恢复哦，确定删除吗?',
      okType: 'danger'
    };
    confirm(confirmParams)
      .then(async () => {
        try {
          await Request.delete({
            url: `${url}/${row.id}`
          });
          message.success('删除成功');
        } catch (error) {
          message.error('删除失败，请稍后再试');
        }
        refresh();
      })
      .catch(() => {});
  };

  // 刷新数据
  const refresh = () => {
    pageInfo.pageNo = 1;
    getPageData();
  };

  return {
    pageInfo,
    dataSource,
    total,
    tableState,
    getPageData,
    refresh,
    handleSizeChange,
    handleCreate,
    handleDelete,
    handleEdit
  };
}

export { usePageContent };
