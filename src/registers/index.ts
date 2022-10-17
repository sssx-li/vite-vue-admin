import type { App } from 'vue';

import icons from './icons';
import properties from './properties';
import directives from './directives';

export function globalRegister(app: App): void {
  app.use(icons);
  app.use(properties);
  app.use(directives);
}
