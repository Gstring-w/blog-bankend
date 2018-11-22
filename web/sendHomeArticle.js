const myMysql = require("../dao/linkMysql");

function sendHomeArticle(data, res) {
  const { userName, password } = data;
  //此处可以添加一个totol字段 和筛选一些文章
  let sql = "SELECT * from article";
  function dealData(err, req) {
    if (!err) {
      res.send(req);
    } else {
      console.log(err);
    }
  }

  myMysql.query(sql, dealData);
}

module.exports = sendHomeArticle;
