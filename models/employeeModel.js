const mongoose = require('mongoose');
const employeeSchema = mongoose.Schema({
    "firstName":String,
    "lastName": String,
    "phoneNumber": Number || String,
    "department": String,
    "salary": Number&& String,
    "address": String
},
{
    timestamps:true
}
)

const employeeDetails = mongoose.model('employeeDetails', employeeSchema) 
module.exports = employeeDetails;
