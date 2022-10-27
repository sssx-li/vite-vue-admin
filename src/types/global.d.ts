import { Component } from 'vue';

declare module 'vue' {
  interface ComponentCustomProperties extends Component {
    $filters: any;
  }
}

declare global {
  const useConfirm: typeof import('../hooks')['useConfirm'];
  const useMessage: typeof import('../hooks')['useMessage'];
}
