const admin = require('firebase-admin');
const db = admin.firestore();

exports.getUserById = async (req, res) => {
    try {
        const {userId} = req.params;
        const userSnapshot = await db.collection('users').doc(userId).get();
        if (!userSnapshot.exists) {
            return res.status(404).send('User not found');
        }
        const userData = userSnapshot.data();
        res.status(200).send(userData);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).send('Error fetching user');
    }

}
