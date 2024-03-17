const router = require("express").Router();
const ApiError = require("../../utils/ApiError.js");
const ApiResponse = require("../../utils/ApiResponse.js");
const User = require("../../db/schemas/users.js");
const Appointment = require("../../db/schemas/appointment.js");

// therapist list
router.get("/", async (req, res, next) => {
    try {
        const users = await User.find({ role: true })
            .select("-password")
            .lean();
        res.json({ status: true, message: "Successful", data: users });
    } catch (err) {
        next(new ApiError(500, err.message));
    }
});

// crate appointment
router.post("/appointment", async (req, res, next) => {
    try {
        const appointment = await Appointment.create(req.body);
        res.json({
            status: true,
            message: "Appointment created successfully",
            data: appointment,
        });
    } catch (err) {
        next(new ApiError(500, err.message));
    }
});

// read appointment
router.get("/appointment/:id", async (req, res, next) => {
    try {
        const appointments = await Appointment.find({
            _id: req.params.id,
        }).lean();
        res.json(
            new ApiResponse(
                true,
                "Appointment fetched successfully",
                appointments
            )
        );
    } catch (err) {
        next(new ApiError(200, err.message));
    }
});

// appointment list doctors
router.get("/appointment/doctors/:id", async (req, res, next) => {
    const doctorId = req.params.id;
    try {
        const appointments = await Appointment.find({doctor : doctorId}).lean();
        res.json(
            new ApiResponse(
                true,
                "Appointments fetched successfully",
                appointments
            )
        );
    }catch(err){
        next(new ApiError(200, err.message));
    }
})

// apointments of users
router.get("/appointment/patients/:id", async (req, res, next) => {
    const patientId = req.params.id;
    try {
        const appointments = await Appointment.find({patient : patientId}).lean();
        res.json(
            new ApiResponse(
                true,
                "Appointments fetched successfully",
                appointments
            )
        );
    }catch(err){
        next(new ApiError(200, err.message));
    }
})

module.exports = router;
