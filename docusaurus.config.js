// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

//

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '思道阁',
  tagline: '真正高明的人，能够借助别人的智慧，来使自己不受蒙蔽',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  // 在此处设置您网站的生产网址
  url: 'https://www.ycdr.fun',
  // Set the /<baseUrl>/ pathname under which your site is served
  // 设置<baseUrl>为站点提供服务的路径名
  // For GitHub pages deployment, it is often '/<projectName>/'
  // 对于 GitHub 页面部署，它通常是“<projectName>”
  baseUrl: '/',

  // GitHub pages deployment config.
  // GitHub 页面部署配置。
  // If you aren't using GitHub pages, you don't need these.
  // 如果不使用 GitHub 页面，则不需要这些页面。
  organizationName: 'guangyi.ding', // Usually your GitHub org/user name.
  projectName: 'Knowledge', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // 即使不使用国际化，也可以使用此字段设置
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },
  plugins:[
    [
      '@docusaurus/plugin-content-docs',
      {
        id:"shuYuanTang",
        path: '书源堂',
        routeBasePath: '书源堂',
        sidebarPath: './sidebars.js',
      }
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id:"zhiYuanShi",
        path: '知源室',
        routeBasePath: '知源室',
        sidebarPath: './sidebars.js',
      }
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id:"tanXinXuan",
        path: '探新轩',
        routeBasePath: '探新轩',
        sidebarPath: './sidebars.js',
      }
    ]
  ],
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: false,
        debug:false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: '',
        logo: {
          alt: '思道阁',
          src: 'img/logo.svg',
        },
        items: [
          {
            position: 'left',
            label: '书源堂',
            to: '/书源堂/书源堂',
            docId:"shuYuanTang"
          },
          {
            position: 'left',
            label: '知源室',
            to: '/知源室/知源室',
            docId:"zhiYuanShi"
          },
          {
            position: 'left',
            label: '探新轩',
            to: '/探新轩/探新轩',
            docId:"tanXinXuan"
          },
          {
            href: 'https://github.com/dingguangyi0',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: '思道阁',
            items: [
              {
                label: '书源堂',
                to: '/书源堂/书源堂',
                docId:"shuYuanTang"
              },
              {
                label: '知源室',
                to: '/知源室/知源室',
                docId:"zhiYuanShi"
              },
              {
                label: '探新轩',
                to: '/探新轩/探新轩',
                docId:"tanXinXuan"
              }
            ],
          },
          {
            title: '左岸',
            items: [
              {
                label: '博客',
                href: 'https://www.ycdr.fun',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/dingguangyi0',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} 思道阁, <a href="https://www.ycdr.fun">左岸</a>. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;

