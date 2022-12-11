require("dotenv").config();
const { SQL_USER, SQL_PASSWORD } = process.env;
const spicedPg = require("spiced-pg");
const db = spicedPg(
    `postgres:${SQL_USER}:${SQL_PASSWORD}@localhost:5432/petiton`
);

//---------------------------------------------------------------------
// Create the following functions;
// ----- getAllSignatures - use db.query to get all signatures from table signatures

module.exports.getAllSignatures = () => {
    return db.query("SELECT signature FROM signatures").then((results) => {
     return results;
    });
    .catch(err => {
        console.log("Error appeared in query", err);
    });
};

module.exports.getAllSignatures = () => {
  // Execute the query and return the results as a promise
  return db.query("SELECT signature FROM signatures").then((results) => {
    // Return the query results
    return results;
  })
  // Handle any errors that occur during the query
  .catch(err => {
    console.log("Error appeared in query", err);
  });
};
// console.log(getAllSignatures());

// ----- addSignature - use db.query to insert a signature to table signatures
module.exports.addSignature = (signature) => {
    db.query("INSERT INTO signatures(signature) VALUES($1)", [signature]).then;
};

.catch(err => {
    console.log("Error appeared in query", err);
});
// Don't forget to export the functions with module.exports

// module.exports.getAllSignatures = getAllSignatures;
// module.exports.addSignature = addSignature;
