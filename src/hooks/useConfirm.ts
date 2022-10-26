import { ElMessageBox, messageType } from 'element-plus';
import 'element-plus/es/components/message-box/style/index';

interface IConfirm {
  title?: string; // MessageBox 的标题
  content?: string; // MessageBox 的正文内容
  type?: messageType; // 消息类型，用于图标显示
  confirmButtonText?: string; // 确定按钮的文本内容
  cancelButtonText?: string; // 取消按钮的文本内容
  center?: boolean;
  showClose?: boolean; // MessageBox 是否显示右上角关闭按钮
  showCancelButton?: boolean; // 是否显示取消按钮
  showConfirmButton?: boolean; // 是否显示确定按钮
  closeOnHashChange?: boolean; // 是否在 hash 改变时关闭 MessageBox
  draggable?: boolean; // MessageBox 是否可拖放
}

export default function useConfirm(): (options: IConfirm) => any {
  return (params = {}) => {
    const {
      title = '提示',
      content = '这是一条消息提示',
      type = 'info',
      confirmButtonText = '确定',
      cancelButtonText = '取消',
      center = false,
      showClose = false,
      showCancelButton = true,
      showConfirmButton = true,
      closeOnHashChange = true,
      draggable = false
    } = params as IConfirm;
    return new Promise((resolve) => {
      ElMessageBox.confirm(content, title, {
        confirmButtonText,
        cancelButtonText,
        type,
        center,
        showClose,
        showCancelButton,
        showConfirmButton,
        closeOnHashChange,
        draggable
      }).then(() => {
        resolve(true);
      });
    });
  };
}
