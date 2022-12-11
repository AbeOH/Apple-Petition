require("dotenv").config();
const { SQL_USER, SQL_PASSWORD } = process.env;
const spicedPg = require("spiced-pg");
const db = spicedPg(
    `postgres:${SQL_USER}:${SQL_PASSWORD}@localhost:5432/petiton`
);

//---------------------------------------------------------------------
// Create the following functions;
// ----- getAllSignatures - use db.query to get all signatures from table signatures
// ----- addSignature - use db.query to insert a signature to table signatures
// Don't forget to export the functions with module.exports
