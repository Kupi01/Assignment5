import { createDocument, getDocuments, getDocumentById, updateDocument, deleteDocument } from "../repositories/firestoreRepository";
import { Employee } from "../../../models/employee";

const COLLECTION = "employees";

export async function getAllEmployees() {
  const snapshot = await getDocuments(COLLECTION);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Employee));
}

export async function getEmployeeById(id: string) {
  const doc = await getDocumentById(COLLECTION, id);
  return doc ? ({ id: doc.id, ...doc.data() } as Employee) : null;
}

export async function createEmployee(data: Partial<Employee>) {
  const id = await createDocument(COLLECTION, data);
  return getEmployeeById(id);
}

export async function updateEmployee(id: string, data: Partial<Employee>) {
  await updateDocument(COLLECTION, id, data);
  return getEmployeeById(id);
}

export async function deleteEmployee(id: string) {
  await deleteDocument(COLLECTION, id);
  return true;
}

export async function getEmployeesByBranch(branchId: string) {
  const all = await getAllEmployees();
  return all.filter(e => e.branchId === branchId);
}

export async function getEmployeesByDepartment(department: string) {
  const all = await getAllEmployees();
  return all.filter(e => e.department.toLowerCase() === department.toLowerCase());
}