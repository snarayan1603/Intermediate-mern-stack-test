const express = require("express");
const { ObjectId } = require("mongodb");
const { client } = require("../mongoDBConnection")
const router = express.Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
let path = require('path');



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images');
    },
    filename: function (req, file, cb) {
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

let upload = multer({ storage, fileFilter });




// thi route will save newly created employee data to mongodb 
router.post('/save', upload.single('photo'), async (req, res) => {

    console.log(req.file)

    let body = req.body;
    if (req.file)
        body.photo = req.file.path

    let date = new Date();

    body.createDate = date.toGMTString().substring(5, 16)

    const findEmployee = await client.db("Intermediate_Mern_Stack_test").collection("employee").find({ email: body.email }).toArray()

    if (findEmployee && findEmployee.length === 0) {

        const data = await client.db("Intermediate_Mern_Stack_test").collection("employee").insertOne(body)
        if (data)
            res.send({ message: "Employee Detail saved successfully" })
        else
            res.status(500).send({ error: "Please try after sometime" })

    } else {
        res.status(409).send({ error: "Employee with email already exist" })
    }
})

// // thi route will send all employee data from mongodb to user
// router.post("/photo", async (req, res) => {

//     let photoPath = '/home/narayan/Desktop/Intermediate mern stack test/node_js/' + req.body.path
//     console.log(__dirname)
//     res.sendFile(photoPath)

// })

// thi route will send all employee data from mongodb to user
router.post("/get", async (req, res) => {

    const getEmployee = await client.db("Intermediate_Mern_Stack_test").collection("employee").find().toArray()
    if (getEmployee)
        res.send({ message: "user found", employeeData: getEmployee })
    else
        res.status(500).send({ error: "Please try after sometime" })

})



// thi route will update all employee data from mongodb to user
router.post("/update", upload.single('photo'), async (req, res) => {

    const body = req.body;

    console.log(body, req.file)
    let file = req.file

    if (file) {
        body.photo = file.path
    }

    const findEmployee = await client.db("Intermediate_Mern_Stack_test").collection("employee").find({ email: body.email }).toArray()

    for (let i = 0; i < findEmployee.length; i++) {
        console.log(findEmployee[i]._id.toString(), body._id)
        if (findEmployee[i].email === body.email && findEmployee[i]._id.toString() !== body._id) {
            res.status(409).send({ error: "Another employee with email already exist" })
            return
        }
    }

    const updateEmployee = await client.db("Intermediate_Mern_Stack_test").collection("employee").findOneAndUpdate({ _id: ObjectId(body._id) }, { $set: { email: body.email, phone: body.phone } })
    console.log(updateEmployee)
    if (updateEmployee)
        res.send({ message: "Updated successfully" })
    else
        res.status(500).send({ error: "Please try after sometime" })

})

// thi route will delete all employee data from mongodb to user
router.post("/delete", async (req, res) => {

    const _id = req.body._id;

    const deleteEmployee = await client.db("Intermediate_Mern_Stack_test").collection("employee").deleteOne({ _id: ObjectId(_id) })
    if (deleteEmployee)
        res.send({ message: "Employee deleted successfully" })
    else
        res.status(500).send({ error: "Please try after sometime" })
})


module.exports = router