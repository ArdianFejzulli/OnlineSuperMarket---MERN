const User = require('../models/user');

const SECRET_KEY = "admin_auth";

let AdminAuth = (req, res, next) => {
    let token = req.headers.authorization.split(" ")[1];

    User.findByToken(token, SECRET_KEY, (err, user) => {
        if (err) {
            console.log(err)
            throw err;
        }
        if (!user)
            return res.json({
                isAuth: false,
                error: err
            });

        req.token = token;
        req.user = user;
        next();
    })
}

module.exports = AdminAuth;