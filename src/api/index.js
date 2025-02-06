
export function api(path, req, res) {

    if (path === '/api' || path === '/api/') {
        if (req.method === 'GET') {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify({ "api": "api get page" }))
        }
        if (req.method === 'POST') {

            let body = [];
            req.on('data', chunk => body.push(chunk));


            req.on('end', () => {
                let parsedBody;
                if (req.headers['content-type'] === 'application/json') {
                    parsedBody = JSON.parse(Buffer.concat(body).toString());
                } else if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
                    parsedBody = new URLSearchParams(Buffer.concat(body).toString());
                } else {
                    res.end("Server Error")
                }

                res.end(JSON.stringify({ "body": parsedBody }))
            });

            return

        }
    }

    if (path === '/api/v1/abouts' || path === '/api/v1/abouts/') {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify({ "about": "about page" }))
    }


    res.writeHead(404, { 'Content-Type': 'application/json' })
    return res.end(JSON.stringify({ "error": "not found" }))
}