let __unconfig_data;
let __unconfig_stub = function (data = {}) {
  __unconfig_data = data;
};
__unconfig_stub.default = (data = {}) => {
  __unconfig_data = data;
};
import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { viteMockServe } from 'vite-plugin-mock';
import vueSetupExtend from 'vite-plugin-vue-setup-extend';

import Components from 'unplugin-vue-components/vite';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import { FileSystemIconLoader } from 'unplugin-icons/loaders';

import AutoImport from 'unplugin-auto-import/vite';

const Unocss = __unconfig_stub;
import { presetAttributify, presetUno, presetIcons } from 'unocss';

// https://vitejs.dev/config/
const __unconfig_default = defineConfig(({ command }) => {
  return {
    plugins: [
      vue(),
      vueSetupExtend(),
      viteMockServe({
        mockPath: 'mock',
        localEnabled: command === 'serve', // 开发环境启用
        watchFiles: true
      }),
      AutoImport({
        dts: false,
        imports: ['vue', 'vue-router'],
        eslintrc: {
          enabled: false,
          filepath: './.eslintrc-auto-import.json'
        }
      }),
      Components({
        dts: false,
        resolvers: [
          IconsResolver({
            customCollections: ['sy']
          })
        ]
      }),
      Icons({
        compiler: 'vue3',
        customCollections: {
          sy: FileSystemIconLoader('src/assets/svgs', (svg) =>
            svg.replace(/^<svg /, '<svg fill="currentColor" ')
          )
        }
      }),
      Unocss({
        presets: [presetUno(), presetAttributify(), presetIcons()],
        rules: [['cursor', { cursor: 'pointer' }]]
      })
    ],
    esbuild: {
      supported: {
        'top-level-await': true
      }
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    }
  };
});

if (typeof __unconfig_default === 'function')
  __unconfig_default(...[{ command: 'serve', mode: 'development' }]);
export default __unconfig_data;
