import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [{ path: '/', component: '@/pages/index' }],
  proxy: {
    '/dzgcommons-rest/*': {
      target: 'http://zx.600jit.com',
      changeOrigin: true,
    },
    '/dzg-mdm/*': {
      target: 'http://zx.600jit.com',
      changeOrigin: true,
    },
    '/gm2-crm-rest/*': {
      target: 'http://zx.600jit.com',
      changeOrigin: true,
    },
    '/gm2-fms-rest/*': {
      target: 'http://sdf.600jit.com',
      changeOrigin: true,
    },
    '/fmsadmin/*': {
      target: 'http://sdf.600jit.com',
      changeOrigin: true,
    },
    '/freight-baseinfo-rest/*': {
      target: 'http://sdf.600jit.com',
      changeOrigin: true,
    },
    '/dzgcommons-rest/*': {
      target: 'http://sdf.600jit.com',
      changeOrigin: true,
    },
  },
  fastRefresh: {},
});
