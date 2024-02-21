const admin = require("firebase-admin");
const {sendResponse} = require("../../utils/responseHandler");

 async function genrateTitles(req, res) {

     const {subject, audience, description, duration} = req.body;

     if (subject && audience && description) {

         const ref = await admin
             .firestore()
             .collection("generateTitles")
             .add({
                 subject: subject,
                 audience: audience,
                 description: description,
             }) // Include values for subject,audience,description fields

            ref.onSnapshot(snap => {
             if (snap.get('output')) {
                 try {
                     let titles = snap.get('output');
                     const titlesArray = titles.split('\n');
                     const modifiedTitles = titlesArray.map(title => {
                         // Apply modifications to each title here
                         // For example, removing the number and any asterisks
                         return title.replace(/^\d+\.\s\*\*(.+?)\*\*/, "$1").replace(/^\d+\.\s/, "");
                     });
                     res.send({
                         status : 200,
                         message :"Titles Generated Successful",
                         data : modifiedTitles,
                     })
                 } catch (error) {
                     console.error('Error generating titles:', error);
                     res.json(error)

                 }

             }

         })
     }

 }

 async function genrateCouseOutline(req, res) {
     const {title, duration} = req.body;

     const ref = await admin
         .firestore()
         .collection("generateCourseOutline")
         .add({
             title: title,
             timeline : duration
         }) // Include values for subject,audience,description fields

     ref.onSnapshot(snap => {
         if (snap.get('output')) {
                let input = snap.get('output');
             function parseStringToJson(input) {
                 // Define the regex pattern
                 const regex = /```(?:json\s+)?([\s\S]*?)```/i;

                 // Match the pattern
                 const match = input.match(regex);

                 if (match && match[1]) {
                     // Extract the JSON string
                     const jsonString = match[1];

                     try {
                         // Parse the JSON string
                         return JSON.parse(jsonString);
                     } catch (error) {
                         console.error('Error parsing JSON:', error);
                         return null;
                     }
                 } else {
                     console.error('No valid JSON string found.');
                     return null;
                 }
             }

             let result = parseStringToJson(input)
             if (result === null) {
                 console.error('Error parsing JSON:', error);
                 res.send({
                     status : 400,
                     message :"Error parsing JSON",
                     data : null
                 })
             }else {
                 res.send({
                     status: 200,
                     message: "Course Outline Generated Successful",
                     data: result
                 })
             }
         }

     })
 }




 module.exports = {
    genrateTitles, genrateCouseOutline
}
