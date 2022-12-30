const express = require("express")
const { client } = require("../mongoDBConnection")
const router = express.Router();


// this router will be used to verify the usename if username not exixt, it will insert userame with new id 
router.post("/login", async (req, res) => {

    const userName = req.body.userName, password = req.body.password;

    const findUser = await client.db("Intermediate_Mern_Stack_test").collection("userDetails").findOne({ userName, password })

    if (findUser) {        

        res.send({ message: "User exists", userDetails: findUser })

    } else {

        res.status(401).send({ error: "Invalid credentials" })

    }

})

module.exports = router