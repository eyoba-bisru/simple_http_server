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
        return res.end("Hello")
    }

    const static_path = path.join(process.cwd(), 'static', url)

    try {
        const readStream = fs.createReadStream(static_path)
        readStream.pipe(res)
        return
    } catch (err) {
        console.log(err)
    }

})

server.listen(PORT)
console.log("Server listening on port", PORT)