import http from "node:http";
const PORT = 4000;
http.createServer((req, res) => {
  res.writeHead(200, {"Content-Type":"application/json"});
  res.end(JSON.stringify({ok:true, hello:"world"}));
}).listen(PORT, "0.0.0.0", () => {
  console.log("HELLO API listening", PORT);
});
