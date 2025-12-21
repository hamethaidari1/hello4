// Firebase Configuration
// This file contains Firebase setup and initialization for the application

const admin = require('firebase-admin');
const path = require('path');

// Initialize Firebase Admin SDK
// Ensure FIREBASE_CREDENTIALS_PATH environment variable is set to your service account key file
const serviceAccountPath = process.env.FIREBASE_CREDENTIALS_PATH || path.join(__dirname, '../../credentials/serviceAccountKey.json');

try {
  const serviceAccount = require(serviceAccountPath);
  
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: serviceAccount.project_id,
  });
} catch (error) {
  console.error('Error initializing Firebase:', error.message);
  console.log('Make sure your Firebase service account key is in the correct location.');
}

// Get Firebase services
const db = admin.firestore();
const auth = admin.auth();
const storage = admin.storage();
const realtimeDb = admin.database();

// Export Firebase services for use throughout the application
module.exports = {
  admin,
  db,
  auth,
  storage,
  realtimeDb,
};
