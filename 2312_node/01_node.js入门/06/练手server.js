const fs = require("fs");
const path = require("path");
const http = require("http");
const server = http.createServer((req, res) => {
  if (req.url === "/index") {
    fs.readFile(path.join(__dirname, "dist/index.txt"), (err, data) => {
      res.setHeader("Content-Type", "text/html;charset=utf-8");
      res.end(data.toString());
    });
  } else {
    res.setHeader("Content-Type", "text/html;charset=utf-8");
    res.end("您访问的资源不存在");
  }
});
server.listen(8080);
