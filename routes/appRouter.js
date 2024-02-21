// authRoutes.js
const express = require('express');
const {signup, login} = require("../controller/authController");
const {updateProfile} = require("../controller/profileController");
const {verifyProfile} = require("../controller/verificationController");
const {adminVerifyProfile} = require("../controller/adminContoller");
const {getAllJobs, getJobById, createJob} = require("../controller/jobController");
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/profile', updateProfile);
router.post('/verifyProfile', verifyProfile);
router.post('/admin/verifyProfile', adminVerifyProfile);
router.get('/jobs', getAllJobs);
router.get('/jobs/:jobId', getJobById)
router.post('/jobs/create', createJob);

module.exports = router;
