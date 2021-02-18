#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
//命令行输出样式美化
const chalk = require("chalk");
// 命令行工具
const { Command } = require("commander");
// 命令行交互
const inquirer = require("inquirer");
// 获取版本号
const { version } = require("../package.json");

const program = new Command();

const { promptList } = require("../lib/config.js");
const { checkoutDir, removeDir } = require("../lib/tools.js");
const download = require("../lib/download.js");

program.version(version);

program
  .command("create [name] [other...]")
  .description("创建项目")
  .action(async (name, other) => {
    let list = [];

    list.push({
      type: "input",
      message: "项目名称",
      name: "projectName",
      default: name || "",
      validate: (value) => {
        const isHasDirName = checkoutDir(path.resolve(process.cwd(), value));
        if (!value) {
          return "请输入项目名称";
        }
        if (isHasDirName) {
          return "已存在同名目录名称，请检查重试!";
        }
        if (value.includes(".") || value.includes("/")) {
          return "名称不能包含 . /";
        }

        return true;
      }
    });

    list = list.concat(promptList);
    inquirer.prompt(list).then((answers) => {
      console.log(answers);
      download("easyinmind/project-learn#master", name);
    });
  });

program.parse(process.argv);
