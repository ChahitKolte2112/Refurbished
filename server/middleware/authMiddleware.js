const jwt = require("jsonwebtoken");

const authMiddle = async (req, res, next) => {
    try {
        const token = await req.headers.authorization.split(" ")[1];

        const decryptedUserId = jwt.verify(
            JSON.parse(token),
            process.env.jwt_secret
        );
        req.body.userId = decryptedUserId.userId;

        next();
    } catch (error) {
        console.log(error.message);
        console.log("in the authmiddleware");
        res.send({ success: false, message: error.message });
    }
};
module.exports = { authMiddle };
