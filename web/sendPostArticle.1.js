const myMysql = require("../dao/linkMysql");

function sendArticleComment(data, res) {
  const { userName, password } = data;
  let sql = "SELECT * from postarticle";
  function dealData(err, req) {
    if (!err) {
      console.log(req);
      res.send(req);
    } else {
      console.log(err);
    }
  }

  myMysql.query(sql, dealData);
}

module.exports = sendArticleComment;
