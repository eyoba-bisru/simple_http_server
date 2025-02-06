import fs from 'node:fs'
import http from 'node:http'
import path from 'node:path'
import logger, { dateFormat } from './logger.js'
import { api } from './api/index.js'

const PORT = 4000

const server = http.createServer()

server.on('request', (req, res) => {

    const logPath = './logs/log-' + dateFormat((new Date())).toString().split(',')[0].split('/').join('-') + '.txt'

    try {

        const url = req.url

        const urlSplit = url.split('/')

        const loggerValue = logger(url)
        fs.appendFile(logPath, (loggerValue + "\n"), (err) => {
            if (err) console.log(err)
        })

        console.log(loggerValue)

        if (urlSplit[1] === 'api') {
            return api(url, req, res)
        }

        if (url === '/') {
            return res.end(fs.readFileSync(path.join(process.cwd(), 'static', 'index.html')))
        }

        const static_path = path.join(process.cwd(), 'static', url)

        if (!fs.existsSync(static_path) || !fs.statSync(static_path).isFile()) {
            res.writeHead(404, { 'Content-Type': 'text/html' })
            return res.end(fs.readFileSync(path.join(process.cwd(), 'static', 'not-found.html')))
        }

        try {
            res.writeHead(200, { 'Content-Type': 'text/html' })
            return res.end(fs.readFileSync(static_path))
        } catch (err) {
            console.log(err)
        }

    } catch (err) {
        fs.appendFile(logPath, err.toString(), (err) => {
            if (err) console.log(err)
        })
    }

})

server.listen(PORT)
console.log("Server listening on port", PORT)