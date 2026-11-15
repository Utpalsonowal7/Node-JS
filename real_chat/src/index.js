import express from "express";
import http from "http";

const app = express();

app.use(express.static('./public'))
const server = http.createServer(app)

app.get('/', (req, res) => {
     res.sendFile('/public/index.html')
})

server.listen(8000, () => console.log("✅ server is running at port 8000"));