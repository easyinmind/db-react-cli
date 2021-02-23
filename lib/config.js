const promptList = [
  {
    type: "input",
    message: "项目描述",
    name: "description",
  },
  {
    type: "input",
    message: "版本",
    name: "version",
    default: "1.0.0",
  },
  {
    type: "input",
    message: "author",
    name: "author",
  },
  {
    type: "confirm",
    message: "是否需要Lint校验工具",
    name: "lint",
    default: true,
  },
  {
    type: "confirm",
    message: "是否需要git校验工具",
    name: "git",
    default: true,
  },
  {
    type: "confirm",
    message: "是否设置taobao registry",
    name: "tbRegistry",
    default: true,
  },
  {
    type: "list",
    message: "选择包管理工具",
    name: "package",
    choices: [
      {
        name: "NPM",
        value: "npm",
      },
      {
        name: "YARN",
        value: "yarn",
      },
    ],
  },
  {
    type: "list",
    message: "选择开发语言",
    name: "language",
    suffix: "暂不支持TypeScript",
    choices: [
      {
        name: "JavaScript",
        value: "js",
      },
      // {
      //   name: "TypeScript",
      //   value: "ts",
      // },
    ],
  },
  {
    type: "list",
    message: "选择状态管理",
    name: "store",
    choices: [
      {
        name: "Redux",
        value: "redux",
      },
      {
        name: "Mobx",
        value: "mobx",
      },
      {
        name: "Recoil",
        value: "recoil",
      },
      {
        name: "unstated-next",
        value: "unstatedNext",
      },
    ],
  },
  {
    type: "list",
    message: "选择UI框架",
    name: "ui",
    choices: [
      {
        name: "Antd",
        value: "antd",
      },
      {
        name: "自定义",
        value: "customUI",
      },
    ],
  },
  {
    type: "list",
    message: "选择样式",
    name: "style",
    choices: [
      {
        name: "css",
        value: "css",
      },
      {
        name: "less",
        value: "less",
      },
      {
        name: "scss",
        value: "scss",
      },
      {
        name: "styled-components",
        value: "styledComponents",
      },
    ],
  },
  {
    type: "list",
    message: "选择适配方式",
    name: "layout",
    choices: [
      {
        name: "PC",
        value: "pc",
      },
      {
        name: "移动端",
        value: "mobile",
      },
    ],
  },
  {
    type: "list",
    message: "选择应用类型",
    name: "appType",
    choices: [
      {
        name: "SPA",
        value: "spa",
      },
      {
        name: "SSR",
        value: "ssr",
      },
      {
        name: "MPA",
        value: "mpa",
      },
    ],
  },
  {
    type: "list",
    message: "选择路由类型",
    name: "router",
    choices: [
      {
        name: "react-router",
        value: "reactRouter",
      },
      {
        name: "约定式路由",
        value: "customRouter",
      },
    ],
    when(aw) {
      return aw.appType !== "mpa";
    },
  },
];
const packageDataMap = {
  lint: {
    devDependencies: {
      eslint: "^7.17.0",
      "eslint-config-prettier": "^7.1.0",
      "eslint-plugin-prettier": "^3.3.1",
      "eslint-plugin-react": "^7.22.0",
      prettier: "^2.2.1",
      "lint-staged": "^10.5.3",
      "hahaha": "1.1.1"
    },
    scripts: {
      eslint: "eslint ./src/ --ext .js",
      "eslint:fix": "eslint ./src/ --ext .js --fix",
      fix: "prettier --write  ./src",
    },
    "lint-staged": {
      "src/**/*.{js,jsx,ts,tsx}": ["prettier --write", "eslint --fix"],
    },
  },
  git: {
    devDependencies: {
      commitizen: "^4.2.2",
      "cz-conventional-changelog": "^3.3.0",
      husky: "^4.3.7",
      "@commitlint/cli": "^11.0.0",
      "@commitlint/config-conventional": "^11.0.0",
    },
    scripts: {
      commit: "git cz",
    },
  },
  redux: {
    dependencies: {
      "@reduxjs/toolkit": "^1.5.0",
      "react-redux": "^7.2.2",
    },
  },
  mobx: {
    dependencies: {
      mobx: "^6.1.7",
      "mobx-react": "^7.1.0",
    },
  },

  unstatedNext: {
    dependencies: {
      "unstated-next": "^1.1.0",
    },
  },
  recoil: {
    dependencies: {
      recoil: "^0.1.2",
    },
  },
  less: {
    devDependencies: {
      less: "^4.1.0",
      "less-loader": "^7.2.1",
    },
  },
  sass: {
    devDependencies: {
      sass: "^1.32.8",
      "sass-loader": "^11.0.1",
    },
  },
  styledComponents: {
    devDependencies: {
      "styled-components": "^5.2.1",
    },
  },
  antd: {
    dependencies: { antd: "^4.12.3", less: "^4.1.0", "less-loader": "^7.2.1" }, // 默认按需加载 需要less
  },
  reactRouter: {
    dependencies: {
      "react-router-dom": "^5.2.0",
    },
  },
  customRouter: {
    dependencies: {
      "react-router-dom": "^5.2.0",
    },
  },
};
const filterFiles = {
  lint: {
    removeFile: [".eslintignore", ".eslintrc.js", ".prettierrc.js"],
    checkoutCb(value) {
      return !value;
    },
  },
  git: {
    removeFile: [
      "husky.config.js",
      "commitlint.config.js",
      ".cz.json",
      "scripts/cz-conventional-changelog",
    ],
    checkoutCb(value) {
      return !value;
    },
  },
};
module.exports = {
  promptList,
  packageDataMap,
  filterFiles,
};
