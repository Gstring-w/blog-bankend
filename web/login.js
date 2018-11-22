const myMysql = require("../dao/linkMysql");

function Login(data, res) {
  const { userName, password } = data;
  let sql;

  let args = [userName, password];
  sql = "SELECT * FROM user WHERE username=? and password=?";
  function dealData(err, req) {
    if (!err) {
      result = req;
      res.header(
        "Set-Cookie",
        "userid=" + req[0].id + ";domain=localhost:3001"
      );
      res.send(req);
    }
  }

  myMysql.queryArgs(sql, args, dealData);
}

module.exports = Login;
