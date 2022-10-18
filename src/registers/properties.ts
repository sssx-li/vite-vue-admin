import type { App } from 'vue';
import { formatDate } from '@/utils/formatDate';

export default function registerProperties(app: App) {
  app.config.globalProperties.$filters = {
    formatTime(value: string) {
      return formatDate(value);
    }
  };
}
