var path = require("path");

var htmlRoutes = {
    routes: function (app) {


        app.get("/", function (req, res) {
            res.sendFile(path.join(__dirname, "../public/home.html"));
        });

        app.get("/survey", function (req, res) {
            res.sendFile(path.join(__dirname, "../public/survey.html"));
        });

        console.log("htmlroutes connected")
    }
}

module.exports = htmlRoutes