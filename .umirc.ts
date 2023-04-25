import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/xunjian', component: '@/pages/xunjian/index' },
    { path: '/echarts', component: '@/pages/echarts/index' },
  ],
  fastRefresh: {},
});
