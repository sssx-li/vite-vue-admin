import Request from '@/service';
import { IDataModel } from '@/service/types/axios';
import { ITableList } from '@/service/types/table';
import { useMessage, useConfirm } from '@/hooks';

/**
 *
 * @param   url: 请求地址
 * @param   columns: 表格数据
 * @param   showFooter: 是否分页
 *
 */
export default function usePageing(url: string, formState: Record<string, any>, showFooter = true) {
  const confirm = useConfirm();
  const { success, error } = useMessage();

  const pageInfo = ref({ pageNo: 1, pageSize: 10 });
  const dataSource = ref<any[]>([]);
  const total = ref(0);
  const loading = ref(false);

  watch(
    pageInfo,
    () => {
      getPageData();
    },
    { deep: true }
  );

  // 改变页码
  const handleSizeChange = (page: any) => {
    Object.assign(pageInfo, page);
  };

  /**
   *
   * @param query 用于覆盖原有参数值，通常用于通过ref调用该方法时传入
   */
  const getPageData = async () => {
    let params: Record<string, any> = {
      ...formState,
      ...pageInfo.value
    };
    if (!showFooter) {
      params = {
        ...formState
      };
    }
    for (const key in params) {
      if (params[key] !== 0 && params[key] !== false && !params[key]) {
        delete params[key];
      }
    }
    try {
      loading.value = true;
      const res = await Request.get<IDataModel<ITableList>>({
        url,
        params
      });
      const {
        code,
        data: { list, page },
        message
      } = res;
      if (code === 0) {
        dataSource.value = list;
        total.value = page.count;
      } else {
        error(message || '获取数据失败，请稍后再试');
      }
      loading.value = false;
    } catch (err) {
      loading.value = false;
      error('获取数据失败，请刷新重试');
    }
  };
  // 编辑
  const handleEdit = async (_url: string, data: any) => {
    try {
      const { code, message } = await Request.put({
        url: _url,
        data
      });
      if (code === 0) {
        success('操作成功');
        refresh();
      } else {
        error(message || '操作失败，请稍后再试');
      }
    } catch (err) {
      error('操作失败，请稍后再试');
    }
  };
  // 新增
  const handleCreate = async (data: any) => {
    try {
      const { code, message } = await Request.post({
        url,
        data
      });
      if (code === 0) {
        success('添加成功');
        refresh();
      } else {
        error(message || '添加失败，请稍后再试');
      }
    } catch (err) {
      error('添加失败，请稍后再试');
    }
  };
  // 删除
  const handleDelete = (row: any, contentTip?: string) => {
    confirm({
      title: '删除',
      content: contentTip || '删除之后无法恢复哦，确定删除吗?',
      okType: 'danger'
    })
      .then(async () => {
        try {
          const { code, message } = await Request.delete({
            url: `${url}?id=${row.id}`
          });
          if (code === 0) {
            success('删除成功');
            refresh();
          } else {
            error(message || '删除失败，请稍后再试');
          }
        } catch (err) {
          error('删除失败，请稍后再试');
        }
      })
      .catch(() => {});
  };
  // 刷新数据
  const refresh = () => {
    if (pageInfo.value.pageNo === 1) {
      getPageData();
    } else {
      pageInfo.value.pageNo = 1;
    }
  };
  return {
    pageInfo,
    dataSource,
    total,
    loading,
    getPageData,
    refresh,
    handleSizeChange,
    handleCreate,
    handleDelete,
    handleEdit
  };
}
