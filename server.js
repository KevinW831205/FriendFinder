var express = require('express')

// Sets up the Express App
// =============================================================
var app = express()
var PORT = process.env.PORT || 3000


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.listen(PORT, function () {
    console.log("APP listening on PORT: " + PORT)
})

// linking routing js files
var apiRoutes = require("./app/routing/apiRoutes.js");
var htmlRoutes = require("./app/routing/htmlRoutes.js");

apiRoutes.routes(app);
htmlRoutes.routes(app);