const fs = require("fs");
const globalConfig = require("../globalConfig");

function writeLog(data) {
  let _data = "时间：「" + Date() + " 」 事件：" + data + "\n";
  fs.writeFile(
    globalConfig["log_file"],
    _data,
    { encoding: "utf-8", flag: "a" },
    err => {
      if (err) {
        console.log(err);
      }
    }
  );
}
module.exports = writeLog;
