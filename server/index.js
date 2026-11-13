import http from "node:http";
import fs from "node:fs";

const server = http.createServer((req, res) => {
     const log = `${Date.now()} ${req.ip} ${req.url} \n`;

     fs.appendFile('log.txt', log, (err, data) => {
          if (err) {
               console.log("Something went wrong")
          } else {
               res.end("✅ log created");
          }
     })
});

server.listen(2500, () => console.log("✅"));
