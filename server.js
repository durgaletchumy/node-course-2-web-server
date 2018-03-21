const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");


app.use((req, res, next) => {
    //keeping track on our server.
    var now = new Date().toString();
    var log = `${now}; ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile("server.log", log + "\n");
    next();
});

// app.use((req, res, next) => {
//     res.render("maintenance.hbs", {
//         pageTitle: "MAINTENANCE PAGE",
//         details: "The page is under maintenance"
//     });
// });

//__dirname will set the dirname which is the node-web-server
app.use(express.static(__dirname + "/public"));


/**if it is in curly braces it will look for partials or helper**/
hbs.registerHelper("getCurrentYear", () => {
    return new Date().getFullYear()
});

hbs.registerHelper("screamIt", (text) => {
    return text.toUpperCase();
});

//.get function will get the route for the page from localhost
//get takes 2 variable which is request and response
//to send response use .send method
app.get('/', (req, res) => {
    res.render("home.hbs", {
        pageTitle: "Home Page",
        para: "Welcome to my site"
    })
    // res.send("<h1>Hello express</h1>");
    // res.send({
    // 	name: "Andrew",
    // 	likes: [
    // 		"Hiking",
    // 		"Cities"
    // 	]
    // });
});

app.get('/about', (req, res) => {
    // res.send("About Page")
    res.render("about.hbs", {
        pageTitle: "About page"
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: "Error Handling Request"
    });
});

//Listen to start the app for start listening to req n res 
app.listen(3000, () => {
    console.log("Server is up on port 3000");
});