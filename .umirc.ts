import { IConfig } from 'dumi';

const repo = 'blog';

const config: IConfig = {
  mode: 'site',

  outputPath: 'docs-dist',

  // 站点 meta 信息
  title: 'AngelPP Blog',

  // 构建相关配置
  resolve: {
    includes: [
      'docs', // 本地目录下的 md 文件
    ],
    previewLangs: []
  },

  base: `/${repo}/`,
  publicPath: `/${repo}/`,

  dynamicImport: {},
  fastRefresh: {},
  hash: true,

  devServer: {
    port: 3030,
    host: '0.0.0.0',
    https: false,
  },
};

export default config;
