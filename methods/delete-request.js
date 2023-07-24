const writeToFile = require("../util/write-to-file");

module.exports = (req, res) => {
    let baseUrl = req.url.substring(0, req.url.lastIndexOf("/")+1);
    Id = req.url.split("/")[3];
    const v4 = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);

    if (!v4.test(Id)){
        res.statusCode = 404;
        res.setHeader("Content-Type", "application/json");
        res.write(
            JSON.stringify({title: "Validation Failed", message: "uuid is not valid"})
        );
        res.end();
    } else if (baseUrl === "/api/movies/" && v4.test(Id)) {
        res.setHeader("Content-Type", "application/json");
        let index = req.movies.findIndex((movie) => {
            return movie.Id === Id;
        })
        if (index === -1){
            res.statusCode = 404;
            res.write(
                JSON.stringify({title: "Not Found", message: "Movie not Found"})
            );
            res.end();
        }else{
            req.movies.splice(index, 1);
            writeToFile(req.movies);
            res.statusCode = 204;
            res.write(
                JSON.stringify(req.movies)
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