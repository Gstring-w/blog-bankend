const fs = require("fs");
var config = fs
  .readFileSync("/Users/navy/Desktop/demo/my-demo-server/globalConfig/.config")
  .toString();
let configArr = config.split("\n");
let globalConfig = {};
for (var i = 0; i < configArr.length; i++) {
  globalConfig[configArr[i].split("=")[0]] = configArr[i].split("=")[1];
}
console.log(globalConfig);
module.exports = globalConfig;
