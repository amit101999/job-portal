const jwt = require("jsonwebtoken")

exports.isAuthenticated = (req, res, next) => {

    try {
        const token = req.cookies.token
        if (!token) {
            return res.status(401)
                .json({
                    message: 'Unauthorized',
                    success: false
                })
        }

        const decode = jwt.verify(token, process.env.SECRET_KEY);

        if (!decode) {
            return res.status(403)
                .json({
                    message: 'Invalid token',
                    success: false
                })
        }
        req.user = decode.userId
        next();
    } catch (err) {
        console.log("error in isAuthenticated", err)
    }
}