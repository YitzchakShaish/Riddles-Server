export function isGet(req) {
    return req.method === "GET";
}

export function isPost(req) {
    return req.method === "POST";
}

export function isPut(req) {
    return req.method === "PUT";
}

export function isDelete(req) {
    return req.method === "DELETE";
}

export function isUrl(req, path) {
    return req.url === path;
}
