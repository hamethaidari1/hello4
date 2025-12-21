import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import { auth } from "./config.js";
import { logUserLogin } from "../modules/security.js";

/**
 * Registers a new user
 * @param {string} email 
 * @param {string} password 
 * @param {string} fullName - Combined First and Last Name
 */
export const registerUser = async (email, password, fullName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Update the user's profile with their name
    await updateProfile(user, {
      displayName: fullName
    });
    
    // Log the initial login (registration counts as login)
    await logUserLogin(user);
    
    return { success: true, user };
  } catch (error) {
    return { success: false, error: error.message, code: error.code };
  }
};

/**
 * Logs in an existing user
 * @param {string} email 
 * @param {string} password 
 */
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    // Trigger the security logger
    // We don't await this so the UI updates immediately while logging happens in bg
    logUserLogin(userCredential.user);

    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, error: error.message, code: error.code };
  }
};

/**
 * Logs in using Google Provider
 */
export const loginWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    
    // Removed custom parameters to ensure standard behavior and reduce friction
    // during the initial setup phase.

    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;

    // Log the login
    await logUserLogin(user);

    return { success: true, user };
  } catch (error) {
    // Return the error code to help the UI decide whether to show an alert
    return { success: false, error: error.message, code: error.code };
  }
};

/**
 * Logs out the current user
 */
export const logoutUser = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * Sets up a listener for authentication state changes
 * @param {Function} callback - Function to call when auth state changes
 */
export const subscribeToAuthChanges = (callback) => {
  return onAuthStateChanged(auth, (user) => {
    callback(user);
  });
};
