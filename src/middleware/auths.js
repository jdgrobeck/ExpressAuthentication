let jwt = require("jsonwebtoken");



let checkJWT = (req, res, next) => {
    let headerValue = req.get("Authorization")
    let signedToken;

    if(headerValue){
        // Authorization header reads "Bearer asjsdlksajdlk"
        let parts = headerValue.split(" ");
        //"Bearer" is index[0]
        signedToken = parts[1];
    }

    if(!signedToken){
        console.log("Missing signed token.");
        res.sendStatus(403);
        return;
    }

    // If I get to this line, verify the secret
    try {
        let unsigned = jwt.verify(signedToken, process.env.JWT_SECRET)
        req.userInfo = unsigned;
    }  catch (err){
        console.log("Failed to verify token ", err)
        res.sendStatus(403);
        return;
    }

    //if we get here, we know there is a signedToken or else it would have failed on line 16
    //Token is valid, so go to bext task in the chain

    next();
}

module.exports = {checkJWT}