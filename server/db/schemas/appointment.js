// craeate a schema for appointment including the fields: date, time, patient, doctor, and reason
const mongoose = require('mongoose');

const appointmentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    date: {
        type: Date,
        default: Date.now,
        required : [true, 'Date is required']
    } ,
    time: {
        type: String,
        required : [true, 'Time is required']
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
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
