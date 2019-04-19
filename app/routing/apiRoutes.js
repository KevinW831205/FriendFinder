var friends = require("../data/friends.js")

var apiRoutes = {
    routes: function (app) {

        app.get('/api/friends', function (req, res) {
            res.json(friends)
        })

        app.post("/api/friends", function (req, res) {
            friends.push(req.body);
        });




        console.log("apiroutes connected")
    }
}

module.exports = apiRoutes