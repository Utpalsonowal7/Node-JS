import http from 'node:http'

const server = http.createServer((req, res) => {
     res.end("Hi")
})

server.listen(2500, () => console.log("✅"));