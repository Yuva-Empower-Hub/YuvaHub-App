// jobController.js
const admin = require('firebase-admin');
const {firestore} = require("firebase-admin");

exports.getAllJobs = async (req, res) => {
    try {
        const jobsSnapshot = await admin.firestore().collection('jobs').get();
        const jobs = [];
        jobsSnapshot.forEach((doc) => {
            jobs.push(doc.data());
        });
        res.status(200).send(jobs);
    } catch (error) {
        console.error('Error fetching jobs:', error);
        res.status(500).send('Error fetching jobs');
    }
};

exports.getJobById = async (req, res) => {
    try {
        const { jobId } = req.params;
        const jobSnapshot = await db.collection('jobs').doc(jobId).get();
        if (!jobSnapshot.exists) {
            return res.status(404).send('Job not found');
        }
        const jobData = jobSnapshot.data();
        res.status(200).send(jobData);
    } catch (error) {
        console.error('Error fetching job:', error);
        res.status(500).send('Error fetching job');
    }
};

exports.createJob = async (req, res) => {
    try {
        const jobData = req.body;
        const newJobRef = await db.collection('jobs').add(jobData);
        res.status(201).send(`Job created with ID: ${newJobRef.id}`);
    } catch (error) {
        console.error('Error creating job:', error);
        res.status(500).send('Error creating job');
    }
};
