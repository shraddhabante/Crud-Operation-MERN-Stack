
let jwt = require("jsonwebtoken");

const verifyUserToken = async(request, response, next) => {
    try {
        let token = request.headers.authorization;
        if (token == undefined) {
            response.json({
                "msg": "Unauthorized request or user"
            })
        } else {
            let verifyToken = jwt.verify(token, "secretKey");
            request.user=verifyToken;
            next();
        }
    } catch (err) {
        response.json({
            "msg": "Invalid Token" + err
        })
    }
}
module.exports=verifyUserToken