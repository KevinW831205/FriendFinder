var path = require("path");

var htmlRoutes = {
    routes: function (app) {


        app.get("/", function (req, res) {
            res.sendFile(path.join(__dirname, "../public/home.html"));
        });

        app.get("/survey", function (req, res) {
            res.sendFile(path.join(__dirname, "../public/survey.html"));
        });

        app.get("/assets/css", function (req, res) {
            res.sendFile(path.join(__dirname, "../public/assets/css/style.css"));
        });

        app.get("/assets/javascript", function (req, res) {
            res.sendFile(path.join(__dirname, "../public/assets/javascript/app.js"));
        });

        console.log("htmlroutes connected")
    }
}

module.exports = htmlRoutes