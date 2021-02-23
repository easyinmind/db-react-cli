#!/usr/bin/env node

const { execSync, exec } = require("child_process");
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
const {
  checkoutDir,
  getGitInfo,
  copyFiles,
  getRewritePackage,
  rewriteJson,
} = require("../lib/tools.js");
const download = require("../lib/download.js");
const TEMP_DIR = "_db-react-cli-temp_template";
program.version(version);

program
  .command("create [name] [other...]")
  .description("创建项目")
  .action(async (name, other) => {
    let list = [];

    // 因需要外部变量name，单独处理
    list.push({
      type: "input",
      message: "项目名称",
      name: "projectName",
      default: name || "",
      validate: async (value) => {
        const isHasDirName = await checkoutDir(
          path.resolve(process.cwd(), value)
        );
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
      },
    });
    list = list.concat(
      promptList.filter((v) => v.name === "lint" || v.name === "git")
    );

    try {
      const answers = await inquirer.prompt(list);
      const { gitUrl } = getGitInfo(answers);
      const pathName = await download(gitUrl, TEMP_DIR);
      await copyFiles(pathName, answers);

      const { packageObj, packagePath } = await getRewritePackage(answers);
      await rewriteJson(packagePath, packageObj);

    } catch (err) {
      console.log(err);
      process.exit(1);
    }
  });

program.parse(process.argv);
