const myMysql = require("../dao/linkMysql");

function postArticle(data, res) {
  const { post_article_data, text } = data;
  let sql;
  let date = Date();
  let args = [post_article_data, text, date];
  sql =
    "INSERT INTO `blog`.`postarticle`( `user`, `content`, `title`, `time`) VALUES ('root',?,?,?)";
  function dealData(err, req) {
    if (!err) {
      result = req;

      res.end();
    } else {
      console.log(err);
    }
  }

  myMysql.queryArgs(sql, args, dealData);
}

module.exports = postArticle;
