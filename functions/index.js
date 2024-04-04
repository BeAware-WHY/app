/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({origin: true});
admin.initializeApp();

const express = require('express');
const app = express();

app.use(cors);

app.get('/downloadQR', async (req, res) => {
  const bucket = admin.storage().bucket();
  const fileName = req.query.fileName; // Expect filename in query, e.g., "QR/myFile.png"
  const file = bucket.file(fileName);

  try {
    const [metadata] = await file.getMetadata();
    // Redirect or stream file to client
    res.redirect(metadata.mediaLink);
  } catch (error) {
    console.error('Error downloading file:', error);
    res.status(500).send('Unable to download file.');
  }
});

exports.app = functions.https.onRequest(app);
