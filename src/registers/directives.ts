import type { App } from 'vue';
import { focus } from '@/directives';

const directiveList = [
  {
    name: 'focus',
    directive: focus
  }
];

export default function directives(app: App): void {
  for (const direct of directiveList) {
    app.directive(direct.name, direct.directive);
  }
}
