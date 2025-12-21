import { db } from '../firebase/config.js';
import { collection, addDoc } from "firebase/firestore";

/**
 * Logs user login details to Firestore for security monitoring.
 * This function captures IP, User Agent, and Time.
 * @param {object} user - The firebase user object
 */
export const logUserLogin = async (user) => {
  try {
    // 1. Get IP Address
    let ipAddress = 'Unknown';
    try {
      const ipResponse = await fetch('https://api.ipify.org?format=json');
      if (ipResponse.ok) {
        const ipData = await ipResponse.json();
        ipAddress = ipData.ip;
      }
    } catch (ipError) {
      console.warn('Could not fetch IP address:', ipError);
    }

    // 2. Get Device Info (User Agent)
    const userAgent = navigator.userAgent;

    // 3. Get Current Time
    const loginTime = new Date().toISOString();

    // 4. Save to Firestore
    // This collection 'loginLogs' will trigger the Cloud Function
    await addDoc(collection(db, 'loginLogs'), {
      uid: user.uid,
      email: user.email,
      ip: ipAddress,
      userAgent: userAgent,
      timestamp: loginTime,
      createdAt: new Date() // Server timestamp helper can also be used
    });

    console.log('Security log created successfully.');

  } catch (error) {
    // We log the error but do not stop the app flow
    console.error('Failed to create security log:', error);
  }
};
