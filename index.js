import fs from 'node:fs'
import http from 'node:http'
import path from 'node:path'

const PORT = 3000

const server = http.createServer()

server.on('request', (req, res) => {
    const url = req.url
    if (url === '/') {


        return res.end("Hello")
    }

    const static_path = path.join(process.cwd(), 'static', url)

    fs.readFile(static_path, { encoding: 'utf-8' }, (err, data) => {
        res.write(data)
    })


})

server.listen(PORT)
console.log("Server listening on port", PORT)