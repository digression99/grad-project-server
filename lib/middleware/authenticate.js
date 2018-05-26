const User = require('../../models/User');

const authenticate = async (req, res, next) => {

    const user = await User.findByEmail(req.body.email);

    if (!user) {
        res.status(403).json({
            message : "unauthorized"
        });
    }

    req.user = {
        email : user.email,
        mobile : {
            token : user.mobile.token
        }
    };
    // req.user = user;
    next();
};

module.exports = authenticate;