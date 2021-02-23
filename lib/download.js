const ora = require("ora");
const download = require("download-git-repo");

module.exports = (url, pathName) => {
  const spinner = ora(`正在下载项目模板，源地址：${url}`);
  spinner.start();
  return new Promise((res, rej) => {
    download(url, pathName, (err) => {
      if (err) {
        spinner.color = "red";
        spinner.text = "下载失败";
        spinner.fail(err);
        rej(err);
      } else {
        spinner.color = "green";
        spinner.succeed("下载成功");
        res(pathName);
      }
    });
  });
};
