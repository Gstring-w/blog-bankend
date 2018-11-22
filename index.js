const express = require("express");
const globalConfig = require("./globalConfig");
const writeLog = require("./log/index");
const bodyParser = require("body-parser");
const Login = require("./web/login");
const postArticle = require("./web/postArticle");
const Register = require("./web/register");
const app = express();
const http = require("http").Server(app);
const cookieParser = require("cookie-parser");
const io = require("socket.io")(http);
const sendPostArticle = require("./web/sendPostArticle");
const sendHomeArticle = require("./web/sendHomeArticle");
const sendArticleComment = require("./web/sendArticleComment");
//webSocket
const Server = require("ws").Server;
const ws = new Server({ port: 9999 });

app.use(cookieParser());
app.use(bodyParser.json({ limit: "50mb" }));

app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
//使用静态资源
app.use(express.static("public"));

//处理跨域
var allowCrossDomain = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
};
app.use(allowCrossDomain);

// 处理登录
app.post("/login", (req, res) => {
  writeLog("登录请求");
  Login(req.body, res);
});

// 处理注册
app.post("/register", (req, res) => {
  writeLog("注册请求");
  Register(req.body);
});

app.post("/post", (req, res) => {
  writeLog("发文请求");
  postArticle(req.body, res, ws);
});

// 获取首页文章信息
app.get("/home", (req, res) => {
  writeLog("获取首页文章");
  sendHomeArticle(req, res);
});
//获取文章的评论
app.get("/home/comment", (req, res) => {
  writeLog("获取文章评论");
  sendArticleComment(req, res);
});
// 获取将要发布的文章
app.get("/management/post", (req, res) => {
  writeLog("获取将要发布的文章");
  sendPostArticle(req, res);
});

// ws.on("connection", socket => {
//   socket.on("message", msg => {
//     socket.send(`用户root发布了名为${11}的文章`);
//   });
// });
http.listen(globalConfig.sever_port, () =>
  console.log("Example app listening on port 4000!")
);
