require("dotenv").config();
// const { SQL_USER, SQL_PASSWORD } = process.env;
const spicedPg = require("spiced-pg");
const db = spicedPg(`postgres:postgres:postgres@localhost:5432/signatures`);
//`postgres:${SQL_USER}:${SQL_PASSWORD}@localhost:5432/petiton`
//---------------------------------------------------------------------
// Create the following functions;
// ----- getAllSignatures - use db.query to get all signatures from table signatures

module.exports.getAllSignatures = () => {
    return db.query("SELECT signature FROM signatures");
};

// console.log(getAllSignatures());

// ----- addSignature - use db.query to insert a signature to table signatures
module.exports.addSignature = (firstname, lastname, signature) => {
    return db.query(
        "INSERT INTO signatures (firstname, lastname, signature) VALUES($1, $2, $3) returning *",
        [firstname, lastname, signature]
        // RETURNING id
    );
};
// Maybe cut
// .catch(err => {
// console.log("Error appeared in query", err);
// });

// CUT
// module.exports.getAllSignatures = getAllSignatures;
// module.exports.addSignature = addSignature;
