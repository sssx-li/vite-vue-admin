import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { viteMockServe } from 'vite-plugin-mock';

import Components from 'unplugin-vue-components/vite';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import { FileSystemIconLoader } from 'unplugin-icons/loaders';

import AutoImport from 'unplugin-auto-import/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';

import VueSetupExtend from 'vite-plugin-vue-setup-extend';

import Unocss from 'unocss/vite';
import { presetAttributify, presetUno } from 'unocss';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  return {
    plugins: [
      vue(),
      VueSetupExtend(),
      viteMockServe({
        mockPath: 'mock',
        localEnabled: command === 'serve', // 开发环境启用
        watchFiles: true
      }),
      AutoImport({
        // dts: './src/types/auto-import.d.ts',
        dts: false,
        imports: [
          'vue',
          'vue-router',
          {
            '/src/hooks': [
              'useMessage',
              'useConfirm',
              'useEcharts',
              'useFormValidate',
              'usePageContent'
            ]
          }
        ],
        resolvers: [AntDesignVueResolver()],
        eslintrc: {
          enabled: false,
          filepath: './.eslintrc-auto-import.json'
        }
      }),
      Components({
        dts: false,
        resolvers: [
          AntDesignVueResolver({
            importStyle: 'less'
          }),
          IconsResolver({
            customCollections: ['sy']
          })
        ]
      }),
      Unocss({
        presets: [presetUno(), presetAttributify()],
        rules: [
          ['fl', { display: 'flex' }],
          ['fl-center', { display: 'flex', 'justify-content': 'center', 'align-items': 'center' }],
          ['fl-column', { display: 'flex', 'flex-direction': 'column' }],
          ['tac', { 'text-align': 'center' }],
          ['tar', { 'text-align': 'right' }],
          ['tal', { 'text-align': 'left' }],
          [/^h-(\d+)$/, ([, d]) => ({ height: `${d}px` })],
          [/^w-(\d+)$/, ([, d]) => ({ width: `${d}px` })],
          [/^mt-(\d+)$/, ([, d]) => ({ 'margin-top': `${d}px` })],
          [/^mr-(\d+)$/, ([, d]) => ({ 'margin-right': `${d}px` })],
          [/^mb-(\d+)$/, ([, d]) => ({ 'margin-bottom': `${d}px` })],
          [/^ml-(\d+)$/, ([, d]) => ({ 'margin-left': `${d}px` })],
          [/^p-(\d+)$/, ([, d]) => ({ padding: `${d}px` })],
          [/^pt-(\d+)$/, ([, d]) => ({ 'padding-top': `${d}px` })],
          [/^pr-(\d+)$/, ([, d]) => ({ 'padding-right': `${d}px` })],
          [/^pb-(\d+)$/, ([, d]) => ({ 'padding-bottom': `${d}px` })],
          [/^pl-(\d+)$/, ([, d]) => ({ 'padding-left': `${d}px` })],
          [/^fz-(\d+)$/, ([, d]) => ({ 'font-size': `${d}px` })]
        ]
      }),
      Icons({
        compiler: 'vue3',
        customCollections: {
          sy: FileSystemIconLoader('src/assets/svgs', (svg) =>
            svg.replace(/^<svg /, '<svg fill="currentColor" ')
          )
        }
      })
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    }
  };
});
