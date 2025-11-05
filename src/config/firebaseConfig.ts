import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";

import * as serviceAccount from "../../test-bb941-firebase-adminsdk-fbsvc-99d83178ed.json";

/**
 * Firebase Admin SDK configuration following course patterns
 * Initializes Firebase app with service account credentials for server-side access
 * 
 * Security Notes:
 * - Service account credentials provide full admin access to Firebase project
 * - Credentials file should never be committed to version control in production
 * - Used for server-side operations requiring elevated privileges
 * 
 * @example
 * // Usage in repository functions
 * import { db } from './firebaseConfig';
 * const snapshot = await db.collection('employees').get();
 */

// Initialize the Firebase app with the service account credentials
// This step is necessary before you can use any Firebase services
initializeApp({
    credential: cert(serviceAccount as ServiceAccount),
});

/**
 * Firestore database instance
 * Provides access to Firestore collections and documents
 * Used throughout the application for data persistence operations
 * 
 * @type {Firestore} Firestore database instance for CRUD operations
 */
const db: Firestore = getFirestore();

export { db };