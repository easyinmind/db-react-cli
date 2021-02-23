const fs = require("fs-extra");
const path = require("path");

// const rimraf = require("rimraf");
const { packageDataMap, filterFiles } = require("./config");

const getFormatParams = (answers) => {
  const notNeedKeys = ["projectName", "version", "author", "description"];
  const resultTrueParams = [];
  const resultParamsObj = {};

  for (const k in answers) {
    if (!notNeedKeys.includes(k)) {
      if (typeof answers[k] === "boolean") {
        if (answers[k]) {
          resultTrueParams.push(k);
        }
        resultParamsObj[k] = answers[k];
      } else if (typeof answers[k] === "string") {
        resultTrueParams.push(answers[k]);
        resultParamsObj[answers[k]] = true;
      }
    }
  }
  return { resultTrueParams, resultParamsObj };
};

const handlePackageJson = (data, answers) => {
  const packageData = { ...data };
  const { projectName, version, author, description } = answers;

  // 格式化参数
  const { resultTrueParams } = getFormatParams(answers);

  const addPackageParams = {};
  // 遍历需要处理的参数 true
  resultTrueParams.map((v) => {
    // 需要重写的对象
    const needRewrite = packageDataMap[v];
    for (const k in needRewrite) {
      if (!addPackageParams[k]) {
        addPackageParams[k] = {};
      }
      addPackageParams[k] = {
        ...addPackageParams[k],
        ...needRewrite[k],
      };
    }
  });

  // merge package
  const newPackageData = {
    ...packageData,
    ...addPackageParams,
    name: projectName,
    version,
    author,
    description,
  };
  return {
    packageObj: newPackageData,
    packageJson: JSON.stringify(newPackageData),
  };
};

const checkoutDir = async (pathName) => {
  try {
    return fs.pathExists(pathName);
  } catch (error) {
    console.error(err);
  }
};

const removeDir = async (pathName) => {
  try {
    await fs.remove(pathName);
    // rimraf.sync(pathName);
  } catch (err) {
    console.error(err);
  }
};

const getNeedFilterFiles = (srcPath, resultParamsObj) => {
  const files = [];
  // merge 需要删除的所有文件
  for (const k in resultParamsObj) {
    // 如果满足条件，添加进过滤列表
    const { removeFile, checkoutCb } = filterFiles[k];
    const removePath = removeFile.map((v) => path.resolve(srcPath, v));
    if (checkoutCb(resultParamsObj[k])) {
      files.push(...removePath);
    }
  }
  return files;
};

const filterFunc = (src, _, needFilterFiles) => {
  return !needFilterFiles.includes(src);
};

const copyFiles = async (src, answers) => {
  try {
    const { projectName } = answers;
    const { resultParamsObj } = getFormatParams(answers);
    const srcPath = path.resolve(process.cwd(), src);
    const destPath = path.resolve(process.cwd(), projectName);
    const needFilterFiles = getNeedFilterFiles(srcPath, resultParamsObj);

    await fs.copy(srcPath, destPath, {
      filter: (srcPath, destPath) =>
        filterFunc(srcPath, destPath, needFilterFiles),
    });
    // console.log("create success!!!")
    // 删除临时目录
    // removeDir(srcPath);
  } catch (err) {
    console.error(err);
  }
};
const readJson = async (packagePath) => {
  try {
    const packageObj = await fs.readJson(packagePath);
    return packageObj;
  } catch (err) {
    console.error(err);
  }
};
const getRewritePackage = async (answers) => {
  const { projectName } = answers;
  try {
    const packagePath = `${process.cwd()}/${projectName}/package.json`;
    const data = await readJson(packagePath);
    const { packageObj, packageJson } = handlePackageJson(data, answers);
    return {
      packageObj,
      packageJson,
      packagePath,
    };
  } catch (err) {
    console.log(err);
  }
};

const rewriteJson = async (path, data) => {
  try {
    await fs.writeFile(path, JSON.stringify(data, null, "\t"));
    const rewriteData = await fs.readFile(path, "utf8");
    return rewriteData;
  } catch (error) {
    console.log(err);
  }
};

const getGitInfo = (answers) => {
  return {
    gitUrl: "easyinmind/project-learn#master",
  };
};

module.exports = {
  checkoutDir,
  removeDir,
  copyFiles,
  getGitInfo,
  handlePackageJson,
  getRewritePackage,
  rewriteJson,
};
