// adminController.js
const admin = require('firebase-admin');

// Sample controller for admin profile verification
exports.adminVerifyProfile = async (req, res) => {
    try {
        const { userId } = req.body;
        // Update user profile to indicate verification completed
        await db.collection('users').doc(userId).update({
            verificationStatus: 'verified'
        });
        res.status(200).send('Profile verified successfully');
    } catch (error) {
        console.error('Error verifying profile:', error);
        res.status(500).send('Error verifying profile');
    }
};
