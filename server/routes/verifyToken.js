const jwt = require("jsonwebtoken");
// const verifyToken = (req, res, next) => {
//     const authHeader = req.headers.token;
//     if (authHeader) {
//         jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, user) => {
//             if (err) res.status(401).json("Token is not valid");
//             req.user = user;
//             next();
//         });
//     } else {
//         res.status(401).json("Your are not authenticated");
//     }
// };

// const verifyAuthToken = (req, res, next) => {
//     if (req.user.id === req.params.id || req.user.isAdmin) {
//         next();
//     } else {
//         res.status(403).json("Your aren't authorized..");
//     }
// }

const authToken = async(req, res, next) => {
    try {
        cookieToken = req.cookies.verifyToken;

        verifyTkn = jwt.verify(cookieToken, process.env.TOKEN_SECRET_KEY);
        if (verifyTkn) {
            next();
        } else {
            res.status(401).json("Token is not valid");
        }

    } catch (error) {
        res.status(403).json("Your aren't authorized..");
    }

}
module.exports = { authToken };