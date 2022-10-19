import type { App } from 'vue';
import {
  LoginOutlined,
  UserOutlined,
  HomeFilled,
  SettingOutlined,
  FolderOutlined,
  SnippetsOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons-vue';

const components = [
  LoginOutlined,
  UserOutlined,
  HomeFilled,
  SettingOutlined,
  FolderOutlined,
  SnippetsOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined
];

export default function (app: App): void {
  for (const icon of components) {
    //? 这里使用icon.name会多出一个后缀，猜测是vite的行为引起
    app.component(icon.displayName, icon);
  }
}
