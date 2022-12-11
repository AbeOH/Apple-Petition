const express = require("express");
const app = express();

// Handlebars Setup
const { engine } = require("express-handlebars");
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
// End Set up

app.use(express.static("./public"));
// app.use(express.static("./projects"));

const petitionName = "Apple 30% Tax";

//---------------------------------------------------------------------------------------------
// Apply dfferent middlewares;

// -- Express.static for static files
// Do I need middleware to serve static files from a specific folder?
// const staticMiddleware = express.static(path.join(__dirname, "projects"));
// app.use(staticMiddleware);
//---------------------------------------------------------------------------------------------

// -- Express.urleencoded for ready the body of POST request
// const urlEncodedMiddleware = express.urlencoded({ extended: false });
// app.use(urlEncodedMiddleware);
//---------------------------------------------------------------------------------------------

// Create multplie routes for your express app;
// Set up handlebars for app
app.get("/", (req, res) => {
    res.render("main", {
        layout: "main",
        petitionName,
    });
});
// ---- One route for rendering the petition page wind handlebars
//Set up handlebars for app PETITION
app.get("/petition", (req, res) => {
    res.render("petition", {
        layout: "main",
        petitionName,
    });
});
// ---- One route for rendering the signers page with handlebars;
// -------- Make sure to get all the signature data fromn the db before
// Set up handlebars for app SIGNERS
app.get("/signers", (req, res) => {
    res.render("signers", {
        layout: "main",
        petitionName,
    });
});
// ---- One route for rendering the thanks page with handlebars
// -------- Make sure to get information about the number of signers
// Set up handlebars for app THANKS
app.get("/thanks", (req, res) => {
    res.render("thanks", {
        layout: "main",
        petitionName,
    });
});
// ---- One route for POSTing petition data -> Update DB accordingly

// Server Listening
app.listen(8080, () => {
    console.log("Express server is running on localhost:8080");
});
