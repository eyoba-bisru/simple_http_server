import fs from 'node:fs'
import http from 'node:http'
import path from 'node:path'
import logger from './logger.js'

const PORT = 8000

const server = http.createServer()

server.on('request', (req, res) => {
    const url = req.url

    const loggerValue = logger(url)
    console.log(loggerValue)

    if (url === '/') {
        return res.end(fs.readFileSync(path.join(process.cwd(), 'static', 'index.html')))
    }

    const static_path = path.join(process.cwd(), 'static', url)

    if (!fs.existsSync(static_path) || !fs.statSync(static_path).isFile()) {
        res.writeHead(404, { 'Content-Type': 'text/html' })
        return res.end(fs.readFileSync(path.join(process.cwd(), 'static', 'not-found.html')))
    }

    try {
        // const readStream = fs.createReadStream(static_path)
        // readStream.pipe(res)
        res.writeHead(200, { 'Content-Type': 'text/html' })
        return res.end(fs.readFileSync(static_path))
    } catch (err) {
        console.log(err)
    }

})

server.listen(PORT)
console.log("Server listening on port", PORT)