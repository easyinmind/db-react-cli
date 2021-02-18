const promptList = [
  {
    type: "input",
    message: "项目描述",
    name: "desc",
  },
  {
    type: "list",
    message: "请选择要下载的模板",
    name: "template",
    choices: [
      {
        name: "PC",
        value: "PC-master",
      },
      {
        name: "mobile",
        value: "mobile-master",
      },
    ],
  },
];

module.exports = {
  promptList,
};
