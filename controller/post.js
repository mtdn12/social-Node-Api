const getPosts = (req, res) => {
    let template = "<html><body><h1>Hello from node JS</h1> <h3>Welcome you goes here</h3></body></html>"
    res.send(template)
}

module.exports = {
    getPosts
}