const express = require("express");
const messageController = require("../controllers/messageController");
const auths = require("../middleware/auths")
const router = express.Router();

router.get('/hello', messageController.hello);

//This is called chaining. Only passing checkJWET, not calling it.
router.get('/privatehello', auths.checkJWT, messageController.privateHello);


module.exports = router;