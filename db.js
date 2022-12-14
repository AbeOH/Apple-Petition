require("dotenv").config();
const { SQL_USER, SQL_PASSWORD } = process.env;
const spicedPg = require("spiced-pg");
const db = spicedPg(
    `postgres:${SQL_USER}:${SQL_PASSWORD}@localhost:5432/petition`
);
//`postgres:${SQL_USER}:${SQL_PASSWORD}@localhost:5432/petiton`
//----------------------------------------------------------------------------------------------------------------------------------
// Create the following functions;
// ----- getAllSignatures - use db.query to get all signatures from table signatures

module.exports.getAllSignatures = () => {
    return db.query("SELECT * FROM signatures");
};

//----------------------------------------------------------------------------------------------------------------------------------

module.exports.registration = (firstname, lastname, email, password) => {
    return db.query(
        "INSERT INTO users (firstname, lastname, email, password) VALUES($1, $2, $3, $4) returning *",
        [firstname, lastname, email, password]
        // RETURNING id
    );
};

//----------------------------------------------------------------------------------------------------------------------------------

// ----- addSignature - use db.query to insert a signature to table signatures
module.exports.addSignature = (signature, user_id) => {
    return db.query(
        "INSERT INTO signatures (signature, user_id) VALUES($1, $2) returning *",
        [signature, user_id]
        // RETURNING id
    );
};

//----------------------------------------------------------------------------------------------------------------------------------

module.exports.getUserByEmail = (email) => {
    return db.query("SELECT password FROM users WHERE email = $1", [email]);
};

//----------------------------------------------------------------------------------------------------------------------------------

module.exports.checkSigned = (signature) => {
    return db.query("SELECT signature FROM signatures WHERE signature = $1", [
        signature,
    ]);
};
