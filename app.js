const express = require('express');
const mongoose = require('mongoose');
const employeeDetails = require('./models/employeeModel')
const cors = require('cors')



const app = express();


const PORT = 5000;
app.use(express.json());
app.use(cors())

//getting all employees from database
app.get('/employee',async (req,res) => {
    try {
        const employee = await employeeDetails.find()
     
        res.status(200).json(employee) 
   
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})
//end of getting all employees in database

//post data in database

app.post('/employee', async(req,res) => {
    try {
        const employee = await employeeDetails.create(req.body)
        res.status(200).json(employee)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:error.message})
    }
})
//end of posting data in database

//get employee by  id

app.get('/employee/:id', async(req,res) => {
    try {
        const {id} = req.params;
        const employee = await employeeDetails.findById(id)
        res.status(200).json(employee)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})
//end of get employee by id

//delete employee by id
app.delete('/employee/:id', async(req,res) => {
    try {
        const {id} = req.params;
        const employee = await employeeDetails.findByIdAndDelete(id)
        if(!employee){
            res.status(404).json({message: `can note find employee by id ${id}`})
        }
        res.status(200).json(employee)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})
//end of delete employee code


//update by id

app.put('/employee/:id', async(req,res) => {
    try {
        const {id} = req.params;
        const employee = await employeeDetails.findByIdAndUpdate(id, req.body)
        if(!employee){
            return res.status(404).json({message: `can note find employee by id ${id}`})
        }
        res.status(200).json(employee)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.listen(PORT, () => {
    console.log(`listen on the port ${PORT}`)
})
mongoose.connect('mongodb+srv://UserAPI:12345678Admin@clusterapi.3ljuzpw.mongodb.net/nodeAPI?retryWrites=true&w=majority')
    .then(() => {
        console.log("connected to the database")
    }) 
    .catch ((error) => {
        console.log(error)
    })