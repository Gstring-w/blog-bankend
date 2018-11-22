const myMysql = require("../dao/linkMysql");

function Register(data) {
  const { userName, password } = data;
  const sql =
    "INSERT INTO `blog`.`user`( `username`, `password`, `Administrator`) VALUES ( ?, ?, 'false')";
  let args = [userName, password];

  function dealData(err) {
    console.log(err);
  }

  myMysql.queryArgs(sql, args, dealData);
}

module.exports = Register;
