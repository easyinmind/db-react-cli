const promptList = [
  {
    type: "input",
    message: "项目描述",
    name: "desc",
  },
  {
    type: "input",
    message: "版本",
    name: "version",
    default: "1.0.0",
  },
  {
    type: "input",
    message: "authName",
    name: "auth",
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
    choices: [
      {
        name: "JavaScript",
        value: "js",
      },
      {
        name: "TypeScript",
        value: "ts",
      },
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
        value: "custom",
      },
    ],
  },
  {
    type: "confirm",
    message: "是否需要antd按需加载",
    name: "antdSplit",
    when(aw) {
      return aw.ui === "antd";
    },
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
    type: "confirm",
    message: "是否支持SSR",
    name: "ssr",
    default: false,
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
        name: "MPA",
        value: "mpa",
      },
    ],
    when(aw) {
      return !aw.ssr
    }
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
      return aw.appType === "spa"
    }
  },
];

module.exports = {
  promptList,
};
