const express = require("express");
const app = express();
const path = require("path");

// Handlebars Setup
const { engine } = require("express-handlebars");
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
// End Set up

// Destructing functions for signatures
const { getAllSignatures, addSignature } = require("./db.js");
// Importing functions from bcrpy.js
const { hash, compare } = require("./bcrpt.js");

// Access to static pages
app.use(express.static("./public"));
// app.use(express.static("./projects"));

const petitionName = "Apple 30% Death Tax";

//---------------------------------------------------------------------------------------------
// Apply dfferent middlewares;

// -- Express.static for static files
// Do I need middleware to serve static files from a specific folder?
const staticMiddleware = express.static(path.join(__dirname, "projects"));
app.use(staticMiddleware);
//---------------------------------------------------------------------------------------------

// -- Express.urleencoded for ready the body of POST request
const urlEncodedMiddleware = express.urlencoded({ extended: false });
app.use(urlEncodedMiddleware);
//---------------------------------------------------------------------------------------------

// Setting up cookies
const cookieSession = require("cookie-session");

app.use(
    cookieSession({
        secret: "Everyone loves Bananas",
        maxAge: 1000 * 60 * 60 * 24 * 14,
    })
);

//---------------------------------------------------------------------------------------------

// Create multplie routes for your express app;
// Set up handlebars for app
app.get("/", (req, res) => {
    res.redirect("/petition");
});

///-------------------------------------------------------------------------------------------------------
/// Get and Post request for registration
app.get("/registration", (req, res) => {
    res.render("registration", {
        layout: "main",
        petitionName,
    });
    // res.redirect("/petition");
});

app.post("/registration", (req, res) => {
    const firstName = req.body.firstname;
    const lastName = req.body.lastname;
    const email = req.body.email;
    const password = req.body.password.hash();
    /// hashing password
    hash(password)
        .then((hash) => {
            return addSignature(firstName, lastName, email, hash);
        })
        .then((result) => {
            console.log(result);
            // const signatureId = result.rows[0].id;
            req.session.signaturesId = result.rows[0].id;
            // console.log("Cookies", result);
            res.redirect("/signers");
        });
});

///-------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------
/// Get and Post request for login
app.get("/login", (req, res) => {
    res.render("login", {
        layout: "main",
        petitionName,
    });
});

app.post("/login", (req, res) => {
    const userPass = db.query(
        "SELECT password FROM users WHERE email = email",
        [password].then(password) => {
            compare(req.body.password,password); /// Password check
            if(true){
                req.session.signaturesId = result.rows[0].id; // Storing cookies
                db.query("SELECT signature FROM signatures", [user_id].then(id) => // someting cookie)
            // redirect to petition 
    )}
            // If not match return error & rerender log in 
        }  
    );
});

///-------------------------------------------------------------------------------------------------------

// ---- One route for rendering the petition page wind handlebars
//Set up handlebars for app PETITION
app.get("/petition", (req, res) => {
    res.render("petition", {
        layout: "main",
        petitionName,
    });
});

// Post request for Signing
app.post("/petition", (req, res) => {
    const firstName = req.body.firstname;
    const lastName = req.body.lastname;
    const signatures = req.body.signatures;
    addSignature(firstName, lastName, signatures).then((result) => {
        console.log(result);
        // const signatureId = result.rows[0].id;
        req.session.signaturesId = result.rows[0].id;
        // console.log("Cookies", result);
        res.redirect("/thanks");
    });
});

// ---- One route for rendering the signers page with handlebars;
// -------- Make sure to get all the signature data fromn the db before
// Set up handlebars for app SIGNERS
app.get("/signers", (req, res) => {
    res.render("signers", {
        layout: "main",
        petitionName,
        getAllSignatures, // Here or in the post request?
    });
});

// ---- One route for rendering the thanks page with handlebars
// -------- Make sure to get information about the number of signers
// Set up handlebars for app THANKS
app.get("/thanks", (req, res) => {
    // console.log(req.session);
    res.render("thanks", {
        layout: "main",
        petitionName,
        // addSignature, // Here or in the post request?
    });
});

// Post request for displat
// app.post()

// ---- One route for POSTing petition data -> Update DB accordingly

// Server Listening
app.listen(8089, () => {
    console.log("Express server is running on localhost:8089");
});
