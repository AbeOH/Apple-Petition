const express = require("express");
const app = express();
const path = require("path");

// Handlebars Setup
const { engine } = require("express-handlebars");
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
// End Set up

// Middleware
// Check if ueser-id is set & pages that not log in or register; redirect to register
// second middleware; if go on register or sign up
// Destructing functions for signatures
const {
    allInfos,
    cityQuery,
    profileJoin,
    addInfo,
    registration,
    getUserByEmail,
    getAllSignatures,
    addSignature,
} = require("./db.js");
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
const { get } = require("https");
const { runInNewContext } = require("vm");

app.use(
    cookieSession({
        secret: "Everyone loves Bananas",
        maxAge: 1000 * 60 * 60 * 24 * 14,
    })
);

//---------------------------------------------------------------------------------------------

// Create multplie routes for your express app;
// Set up handlebars for redirecting to registration page
app.get("/", (req, res) => {
    res.redirect("landing");
});

//---------------------------------------------------------------------------------------------
app.get("/landing", (req, res) => {
    res.render("landing", {
        layout: "main",
        petitionName,
    });
});

//---------------------------------------------------------------------------------------------

// // Later implement the redirect to log in while checking for cooky
// app.get("/", (req, res) => {
//     res.redirect("/login");
// });

///-------------------------------------------------------------------------------------------------------
/// 1_0. Get and Post request for registration
app.get("/registration", (req, res) => {
    res.render("registration", {
        layout: "main",
        petitionName,
    });
    // res.redirect("/petition");
});

////// !!!!! Add if statment to check if user is logged in !!!!!!! \\\\\\

app.post("/registration", (req, res) => {
    const firstName = req.body.firstname;
    const lastName = req.body.lastname;
    const email = req.body.email;
    const password = req.body.password; /// hashing password
    hash(password)
        .then((hash) => {
            return registration(firstName, lastName, email, hash);
        })
        .then((result) => {
            // console.log(result);
            // const signatureId = result.rows[0].id;
            /////////////////// req.session.signaturesId = result.rows[0].id; //// Wrong Cookie set!!!
            // console.log("Body", req.body);
            req.session.userId = result.rows[0].id;
            console.log(req.session.userId);
            res.redirect("/petition");
        });
});

///-------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------
/// 1_1. Get and Post request for login
app.get("/login", (req, res) => {
    res.render("login", {
        layout: "main",
        petitionName,
    });
});

/// Change quers
app.post("/login", (req, res) => {
    // console.log(req.body);
    getUserByEmail(req.body.email).then((data) => {
        // console.log("Data1", data.rows[0].password);
        // console.log("Data2", req.body.password);
        compare(req.body.password, data.rows[0].password).then((isMatch) => {
            console.log("Table Password: ", data.rows[0].password);
            // console.log("Typed Password: ", req.body.password);
            console.log("Check", isMatch);
            if (isMatch === true) {
                req.session.userId = data.rows[0].id;
                console.log(req.session.userId);

                // console.log("id", data.rows[0].id);
                // console.log("Req", req.session.signaturesId);
                console.log("Pass");
                if (data.rows[0].signature) {
                    req.session.signed = true;
                    // req.session.signaturesId = data.rows[0].id;
                    res.redirect("/thanks");
                } else {
                    res.redirect("/petition");
                }
            } else {
                res.render("login", {
                    layout: "main",
                });
            }
        }); /// catch error for password
    }); // catch error for email
});

///-------------------------------------------------------------------------------------------------------

// ---- One route for rendering the petition page wind handlebars
//2_0.Set up handlebars for app PETITION
app.get("/petition", (req, res) => {
    res.render("petition", {
        layout: "main",
        petitionName,
    });
});

////// !!!!! Add if statment to check if user is logged in !!!!!!! \\\\\\

// Post request for Signing
app.post("/petition", (req, res) => {
    // const user_id = req.session.signaturesId;
    const user_id = req.session.userId;
    const signatures = req.body.signatures;
    console.log("Siganture", req.body);
    addSignature(signatures, user_id).then((result) => {
        // console.log("Row", result.rows[0].id);
        // const signatureId = result.rows[0].id;
        req.session.signaturesId = result.rows[0].id;
        // console.log("Cookies", result);
        res.redirect("/thanks");
    });
});

///-------------------------------------------------------------------------------------------------------

///-------------------------------------------------------------------------------------------------------
// ---- One route for rendering the thanks page with handlebars
// -------- Make sure to get information about the number of signers
// 3_0. Set up handlebars for app THANKS
app.get("/thanks", (req, res) => {
    // console.log(req.session);
    const user_id = req.body.userId;
    profileJoin(user_id).then((result) => {
        res.render("thanks", {
            layout: "main",
            petitionName,
            // Number of use who signed
        });
    });
});

// Post request for displat
// app.post()
///-------------------------------------------------------------------------------------------------------

///-------------------------------------------------------------------------------------------------------
// ---- One route for rendering the signers page with handlebars;
// -------- Make sure to get all the signature data fromn the db before
// 4_0. Set up handlebars for app SIGNERS
app.get("/signers", (req, res) => {
    getAllSignatures().then((result) => {
        // console.log("ALL", result);
        console.log("Signes", result.rows);
        res.render("signers", {
            layout: "main",
            signers: result.rows,
            petitionName,
        });
    });
});

///-------------------------------------------------------------------------------------------------------

///-------------------------------------------------------------------------------------------------------
//2_1.Set up handlebars for app adding additioal profile information

app.get("/addInfo", (req, res) => {
    res.render("addInfo", {
        layout: "main",
        petitionName,
    });
});

app.post("/addInfo", (req, res) => {
    const city = req.body.city;
    const age = req.body.age;
    const linkedIn = req.body.linkedIn;
    // const userId =  result.rows[0].id;
    // req.session.signaturesId = true;
    const userId = req.session.userId;
    addInfo(city, age, linkedIn, userId).then((result) => {
        res.redirect("/petition");
    });
});

// ---- One route for POSTing petition data -> Update DB accordingly
///-------------------------------------------------------------------------------------------------------
//5_0.Set up handlebars for app city info display

app.get("/cityInfo", (req, res) => {
    cityQuery().then((result) => {
        res.render("cityInfo", {
            layout: "main",
            cityInfo: result,
            petitionName,
        });
    });
});

// app.post("/cityInfo", (req, res) => {

// });
///-------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------
// 6.0 Edit profil

app.get("/editPage", (req, res) => {
    allInfos(req.session.userId).then((data) => {
        console.log(req.session);
        res.render("editPage", {
            layout: "main",
            user: data.rows[0],
            // Adding prefedined values
        });
    });
});

//   req.session.currentUser = {
//       id: req.body.id,
//       firstname: req.body.firstName,
//       lastname: req.body.lastName,
//       email: req.body.email,
//       password: req.body.password,
//       city: req.body.city,
//       age: req.body.age,
//       linkedIn: req.body.linkedIn,
//   };

app.post("editPage", (req, res) => {});

//---------------------------------------------------------------------------------------------

// Server Listening
app.listen(8089, () => {
    console.log("Express server is running on localhost:8089");
});
