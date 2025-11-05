import { createDocument, getDocuments, getDocumentById, updateDocument, deleteDocument } from "../repositories/firestoreRepository";
import { Branch } from "../../../models/branch";

const COLLECTION = "branches";

export async function getAllBranches() {
  const snapshot = await getDocuments(COLLECTION);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Branch));
}

export async function getBranchById(id: string) {
  const doc = await getDocumentById(COLLECTION, id);
  return doc ? ({ id: doc.id, ...doc.data() } as Branch) : null;
}

export async function createBranch(data: Partial<Branch>) {
  return await createDocument(COLLECTION, data);
}

export async function updateBranch(id: string, data: Partial<Branch>) {
  await updateDocument(COLLECTION, id, data);
  return getBranchById(id);
}

export async function deleteBranch(id: string) {
  await deleteDocument(COLLECTION, id);
  return true;
}