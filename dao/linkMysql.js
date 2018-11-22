const mysql = require("mysql");
const configMysql = require("./configMysql");
const pool = mysql.createPool(configMysql);
const writeLog = require("../log/index");
function responseDoReturn(res, result, resultJSON) {
  if (typeof result === "undefined") {
    writeLog("数据库error");
    res.json({
      code: "201",
      msg: "failed to do"
    });
  } else {
    writeLog("数据库数据返回成功");
    res.json(result);
  }
}

function query(sql, callback) {
  pool.getConnection((err, connection) => {
    if (err) {
      console.log(err);
    }
    connection.query(sql, (err, rows) => {
      if (!err) {
        writeLog("操作数据库成功");
      }
      callback(err, rows);

      connection.release();
    });
  });
}
function queryArgs(sql, args, callback) {
  pool.getConnection(function(err, connection) {
    if (err) {
      console.log(err);
    }
    connection.query(sql, args, function(err, rows) {
      if (!err) {
        writeLog("操作数据库成功");
      }
      callback(err, rows);
      //释放链接
      connection.release();
    });
  });
}
module.exports = {
  query: query,
  queryArgs: queryArgs,
  doReturn: responseDoReturn
};
