
export function api(path, req, res) {

    if (path === '/api' || path === '/api/') {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify({ "api": "api page" }))
    }

    if (path === '/api/v1/abouts' || path === '/api/v1/abouts/') {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify({ "about": "about page" }))
    }


    res.writeHead(404, { 'Content-Type': 'application/json' })
    return res.end(JSON.stringify({ "error": "not found" }))
}