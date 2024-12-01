const dotenv = require('dotenv');
dotenv.config();

const admin = require('firebase-admin');

const serviceAccount = JSON.parse(process.env.FIREBASE_PRIVATE_KEY);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL
})

const db = admin.database();

module.exports = { db };