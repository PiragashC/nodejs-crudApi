const http = require("http");
const getReq = require("./methods/get-request");
const postReq = require("./methods/post-request");
const putReq = require("./methods/put-request");
const deleteReq = require("./methods/delete-request");
let movies = require("./data/movies.json");
// require("dotenv").config();

// const PORT =  process.env.PORTNUM || 5001;
const PORT = 5000;

const server = http.createServer((req, res) => {
    req.movies = movies;
    switch (req.method) {
        case "GET":
            getReq(req, res);
            break;
        case "POST":
            postReq(req, res);
            break;
        case "PUT":
            putReq(req, res);
            break;
        case "DELETE":
            deleteReq(req, res);
            break;
        default:
            res.statusCode = 404;
            res.setHeader("Content-Type", "application/json");
            res.write(
                JSON.stringify({title: "Not Found", message: "Route not found"})
            );
            res.end();
            break;
    }
})

server.listen(PORT, () => {
    console.log(`server started on port : ${PORT}`)
})