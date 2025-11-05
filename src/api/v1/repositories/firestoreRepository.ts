import { db } from "../../../config/firebaseConfig";
import {
  DocumentSnapshot,
  QuerySnapshot
} from "firebase-admin/firestore";

// Example: createDocument
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

// Example: getDocuments
export const getDocuments = async (
  collectionName: string
): Promise<QuerySnapshot> => {
  return await db.collection(collectionName).get();
};

// Example: getDocumentById
export const getDocumentById = async (
  collectionName: string,
  id: string
): Promise<DocumentSnapshot | null> => {
  const doc = await db.collection(collectionName).doc(id).get();
  return doc.exists ? doc : null;
};

// Example: updateDocument
export const updateDocument = async <T>(
  collectionName: string,
  id: string,
  data: Partial<T>
): Promise<void> => {
  await db.collection(collectionName).doc(id).update(data);
};

// Example: deleteDocument
export const deleteDocument = async (
  collectionName: string,
  id: string
): Promise<void> => {
  await db.collection(collectionName).doc(id).delete();
};