const express = require('express');

const router = express.Router();

const signUpRoutes = require('./../models/signup');

router.post('/', async function (req, res) {
    try {
        const data = req.body; 

        const newUser = new signUpRoutes(data);

        const savedData = await newUser.save();
        console.log("Data Saved");

    } catch (err) {
        console.log("Error occured");
        res.status(500).json({ error: "Internal Error Occured", err });
    }
})


router.get('/', async (req, res) => {
    try {
        const response = await signUpRoutes.find();
        console.log("Data Fetched");
        res.status(200).json(response);
        
    } catch (err) {
        console.log("Error occured");
        res.status(500).json({ error: "Internal Error Occured" });
    }
})

module.exports = router;