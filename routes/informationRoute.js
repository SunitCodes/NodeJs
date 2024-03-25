const express = require('express');

const router = express.Router();

const infoRoute = require('./../models/result');

router.post('/', async function (req, res) {
    try {
        const data = req.body; //whatever data user is sending it is collected in req block

        //Create a new Person document using mongoose model
        const newInfo = new infoRoute(data);

        //Save the new Person to database
        const savedData = await newInfo.save();
        console.log("Data Saved");

    } catch (err) {
        console.log("Error occured");
        res.status(500).json({ error: "Internal Error Occured", err });
    }
})


router.get('/',async (req,res)=> {
    try{
        const response = await infoRoute.find();
        console.log("Data Fetched");
        res.status(200).json(response);
    }catch(err){
        console.log("Error occured");
        res.status(500).json({ error: "Internal Error Occured" });
    }
})


module.exports = router;
