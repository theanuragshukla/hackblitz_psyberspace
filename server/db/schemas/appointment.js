// craeate a schema for appointment including the fields: date, time, patient, doctor, and reason
const mongoose = require('mongoose');

const appointmentSchema = mongoose.Schema({
    date: {
        type: Date,
        default: Date.now,
    } ,
    time: {
        type: String,
    },
    patient: {
        type:String,
        ref: 'User',
    },
    doctor: {
        type:String,
        ref: 'User',
    } ,
    reason: String, 
    duration: {
        type: Number,
        default: 120,
    },
    status : {
        type: Boolean,
        default: false,
    }
});
    
module.exports = mongoose.model('Appointment', appointmentSchema);
