module.exports.requireLoggedInUser = (req, res, next) => {
    if (!req.session.userId && req.url != "/register" && req.url != "/login") {
        return res.redirect("/auth/register");
    }
    next();
};

// module.exports.requireLoggedOutUser = (req, res, next) => {
//     if (req.session.userId) {
//         return res.redirect("/petition");
//         //
//     }
//     next();
// };

module.exports.requireLoggedOutUser = (req, res, next) => {
    if (
        (req.session.userId && req.url === "/register") ||
        (req.session.userId && req.url === "/login")
    ) {
        return res.redirect("/petition");
    }
    next();
};

// module.exports.requireNoSignature = (req, res, next) => {
//     if (req.session.signatureId) {
//         return res.redirect("/thanks");
//     }
//     next();
// };

module.exports.requireSignature = (req, res, next) => {
    if (!req.session.signatureId) {
        return res.redirect("/petition");
    }
    next();
};
