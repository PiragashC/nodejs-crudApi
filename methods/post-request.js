const crypto = require("crypto");
const requestBodyparser = require("../util/body-parser");
const writetoFile = require("../util/write-to-file");

module.exports = async(req, res) => {
    if (req.url === "/api/movies") {
        try{
            let body = await requestBodyparser(req);
            body.Id = crypto.randomUUID();
            req.movies.push(body);
            writetoFile(req.movies);
            res.statusCode = 201;
            res.setHeader("Content-Type", "application/json");
            res.end();
        }catch (err) {
            console.log(err);
            res.statusCode = 404;
            res.setHeader("Content-Type", "application/json");
            res.write(
                JSON.stringify({title: "Validation Failed", message: "Request body is not valid"})
            );
            res.end();
        }
    } else{
        res.statusCode = 404;
        res.setHeader("Content-Type", "application/json");
        res.write(
            JSON.stringify({title: "Not Found", message: "Route not found"})
        );
        res.end();
    }
}