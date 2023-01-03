import Request from '@/service';
import { IDataModel } from '@/service/types/axios';
import { ITableList } from '@/service/types/table';
import { useMessage, useConfirm } from '@/hooks';

/**
 *
 * @param url 请求地址
 * @param formState 接口所需参数
 *
 */
export default function usePageContent(
  url: string,
  formState: Record<string, any>,
  showFooter = true
) {
  const confirm = useConfirm();
  const { success, error } = useMessage();
  const pageInfo = reactive<{ currentPage: number; pageSize: number }>({
    currentPage: 1,
    pageSize: 10
  });
  const total = ref(0);
  const loading = ref(false);
  const dataSource = ref<any[]>([]);
  watch(
    () => pageInfo,
    () => getPageData(),
    { deep: true }
  );
  // 改变页码
  const currentChange = (val: number) => {
    pageInfo.currentPage = val;
  };
  // 改变展示条数
  const sizeChange = (val: number) => {
    pageInfo.pageSize = val;
  };
  // 获取表格数据
  const getPageData = async () => {
    let params: Record<string, any> = {
      ...formState.value,
      pageNo: pageInfo.currentPage,
      pageSize: pageInfo.pageSize
    };
    if (!showFooter) {
      params = {
        ...formState.value
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
        params: { ...params }
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
        error(message || '获取数据失败，请刷新重试');
      }
      loading.value = false;
    } catch (err) {
      loading.value = false;
      error('获取数据失败，请刷新重试');
    }
  };
  // 编辑
  const handleEdit = async (params: {
    id?: string | number;
    url?: string;
    data: Record<string, any>;
  }) => {
    try {
      const { code, message } = await Request.put<IDataModel>({
        url: params.url ? params.url : `${url}/${params.id}`,
        data: params.data
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
  const handleCreate = async (params: { data: any; url?: string }) => {
    try {
      const { code, message } = await Request.post<IDataModel>({
        url: params.url ? params.url : url,
        data: params.data
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
  const handleDelete = (params: { id?: string; contentTip?: string; url?: string }) => {
    confirm({
      title: '删除',
      content: params.contentTip || '删除之后无法恢复哦，确定删除吗?',
      type: 'warning'
    })
      .then(async () => {
        try {
          const { code, message } = await Request.delete({
            url: params.url ? params.url : `${url}/${params.id}`,
            params: { id: params.id }
          });
          if (code === 0) {
            success('删除成功');
            refresh();
          } else {
            error(message || '添加失败，请稍后再试');
          }
        } catch (err) {
          error('删除失败，请稍后再试');
        }
      })
      .catch(() => {});
  };
  // 刷新数据
  const refresh = () => {
    if (pageInfo.currentPage === 1) {
      getPageData();
    } else {
      pageInfo.currentPage = 1;
    }
  };
  return {
    pageInfo,
    dataSource,
    total,
    loading,
    getPageData,
    refresh,
    currentChange,
    sizeChange,
    handleCreate,
    handleDelete,
    handleEdit
  };
}
