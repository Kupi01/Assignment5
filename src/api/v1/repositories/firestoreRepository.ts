import { db } from "../../../config/firebaseConfig";
import {
  DocumentSnapshot,
  QuerySnapshot
} from "firebase-admin/firestore";

/**
 * Firestore repository functions following course patterns
 * Provides basic CRUD operations for Firestore collections
 */

/**
 * Create a new document in specified collection
 * Follows Firebase patterns shown in course materials
 * @param collectionName - Name of the Firestore collection
 * @param data - Document data to create
 * @param id - Optional custom document ID, if not provided auto-generates
 * @returns Promise resolving to created document ID
 */
export const createDocument = async <T>(
  collectionName: string,
  data: Partial<T>,
  id?: string
): Promise<string> => {
  let docRef;
  if (id) {
    docRef = db.collection(collectionName).doc(id);
    await docRef.set(data);
  } else {
    docRef = await db.collection(collectionName).add(data);
  }
  return docRef.id;
};

/**
 * Retrieve all documents from specified collection
 * Uses standard Firestore query patterns
 * @param collectionName - Name of the Firestore collection
 * @returns Promise resolving to QuerySnapshot of all documents
 */
export const getDocuments = async (
  collectionName: string
): Promise<QuerySnapshot> => {
  return await db.collection(collectionName).get();
};

/**
 * Get single document by ID from collection
 * Standard document retrieval pattern
 * @param collectionName - Name of the Firestore collection
 * @param id - Document ID to retrieve
 * @returns Promise resolving to DocumentSnapshot or null if not found
 */
export const getDocumentById = async (
  collectionName: string,
  id: string
): Promise<DocumentSnapshot | null> => {
  const doc = await db.collection(collectionName).doc(id).get();
  return doc.exists ? doc : null;
};

/**
 * Update existing document with partial data
 * Uses Firestore update operation for efficiency
 * @param collectionName - Name of the Firestore collection
 * @param id - Document ID to update
 * @param data - Partial data to update in document
 * @returns Promise that resolves when update is complete
 */
export const updateDocument = async <T>(
  collectionName: string,
  id: string,
  data: Partial<T>
): Promise<void> => {
  await db.collection(collectionName).doc(id).update(data);
};

/**
 * Delete document by ID from collection
 * Standard Firestore document deletion
 * @param collectionName - Name of the Firestore collection
 * @param id - Document ID to delete
 * @returns Promise that resolves when deletion is complete
 */
export const deleteDocument = async (
  collectionName: string,
  id: string
): Promise<void> => {
  await db.collection(collectionName).doc(id).delete();
};