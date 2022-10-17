import { ExclamationCircleOutlined } from '@ant-design/icons-vue';

import { Modal } from 'ant-design-vue';
import { createVNode } from 'vue';

type ButtonType = 'link' | 'default' | 'primary' | 'ghost' | 'dashed' | 'text' | 'danger';

export interface IConfirm {
  title?: string;
  content?: string;
  okText?: string;
  cancelText?: string;
  okType?: ButtonType;
}

const useConfirm = function (): (obj?: IConfirm) => Promise<any> {
  return (params = {}) => {
    const {
      title = '提示',
      content = '这是一个提示信息',
      cancelText = '取消',
      okText = '确认',
      okType = 'default'
    } = params;
    return new Promise((resolve) => {
      Modal.confirm({
        title,
        icon: createVNode(ExclamationCircleOutlined),
        content,
        okText,
        cancelText,
        okType,
        onOk: () => {
          resolve(true);
        },
        onCancel: () => {}
      });
    });
  };
};

export { useConfirm };
