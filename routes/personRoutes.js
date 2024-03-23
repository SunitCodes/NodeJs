const express = require('express');

const router = express.Router();

const personRoutes = require('./../models/details');


// Post method
router.post('/', async function (req, res) {
    try {
        const data = req.body; //whatever data user is sending it is collected in req block


        //Create a new Person document using mongoose model
        const newPerson = new personRoutes(data);

        //Save the new Person to database
        const savedData = await newPerson.save();
        console.log("Data Saved");

    } catch (err) {
        console.log("Error occured");
        res.status(500).json({ error: "Internal Error Occured", err });
    }
})

// Fetching Stuednt's data
router.get('/', async (req, res) => {
    try {
        const response = await personRoutes.find();
        console.log("Data Fetched");
        res.status(200).json(response);
    } catch (err) {
        console.log("Error occured");
        res.status(500).json({ error: "Internal Error Occured" });
    }
})


//Route to find only those person's data who is a student
router.get('/:workType', async (req,res) => {
    try {
        const workType = req.params.workType; // Extracting work type from URL
        if (workType == "student" || workType == "teacher" || workType == "staff") {
            const response = await personRoutes.find({work : workType});
            console.log("Data Fetched");
            res.status(200).json(response);
        }
        else{
            res.status(404).json("Invalid work TYPE");
        }
    } catch (err) {
        console.log("Error occured");
        res.status(500).json({ error: "Internal Error Occured" });
    }
})


//Route for Updating Data
//In update first data is fetched(GET) then write(POST)

router.put('/:id', async(req,res)=>{
    try{
        const personID = req.params.id;
        const data = req.body; //data that is to be updated

        const updatedData = await personRoutes.findByIdAndUpdate(personID,data,{
            new: true ,//it ensures that the data updated is stored in updatedData
            runValidators: true //Run mongoose validation
        });

        if(!updatedData){
            console.log("Couldn't Update");
            return res.status(404).json({error: "Invalid person ID"});
        }
        console.log("Data Updated Successfully");
        res.status(200).json({message: "Updated successfully"});

    }catch{
        console.log("Error occured");
        res.status(500).json({ error: "Internal Server Error" });
    }
})


// Route for deleting data
router.delete('/:id', async(req,res)=>{
    try{
        const personID = req.params.id;

        const deletedData = await personRoutes.findByIdAndDelete(personID);

        if(!deletedData){
            console.log("Deletion Failed");
            return res.status(404).json({error: "Invalid person ID"});
        }
        console.log("Data Deleted");
        res.status(200).json({message: "Person deleted successfully"});

    }catch{
        console.log("Error occured");
        res.status(500).json({ error: "Internal Server Error" });
    }
})

module.exports = router;
