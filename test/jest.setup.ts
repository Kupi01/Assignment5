// Always mock firebase in every test
// The firebase config is located under src/config in this project
// Provide an in-memory mock for Firestore used by repository functions
const collections = new Map<string, Map<string, any>>();

const createCollectionMock = (name: string) => {
  if (!collections.has(name)) collections.set(name, new Map());
  const coll = collections.get(name)!;

  return {
    add: jest.fn(async (data: any) => {
      const id = Math.floor(Math.random() * 1e9).toString();
      coll.set(id, { ...data, id });
      return { id };
    }),
    doc: jest.fn((id: string) => ({
      get: jest.fn(async () => {
        const data = coll.get(id);
        return { exists: data !== undefined, id, data: () => data };
      }),
      set: jest.fn(async (data: any) => {
        coll.set(id, { ...data, id });
      }),
      update: jest.fn(async (data: any) => {
        const existing = coll.get(id) || {};
        coll.set(id, { ...existing, ...data, id });
      }),
      delete: jest.fn(async () => {
        coll.delete(id);
      }),
    })),
    get: jest.fn(async () => {
      const docs = Array.from(coll.entries()).map(([id, data]) => ({ id, data: () => data }));
      return { docs };
    }),
  };
};

const dbMock = {
  collection: jest.fn((name: string) => createCollectionMock(name)),
};

jest.mock("../src/config/firebaseConfig", () => ({ db: dbMock }));

// Some compiled files may import from '../config/firebaseConfig' (without src/)
// Mock that path as well to ensure coverage for both import styles
jest.mock("../config/firebaseConfig", () => ({ db: dbMock }));

// Seed the in-memory collections with sample data used by tests
// Import sample data from src/data and populate the mock collections
const { branches } = require("../src/data/branch");
const { employees } = require("../src/data/employee");

const seedCollections = () => {
  // branches
  const branchColl = new Map();
  branches.forEach((b: any) => branchColl.set(b.id, { ...b }));
  collections.set("branches", branchColl);

  // employees
  const empColl = new Map();
  employees.forEach((e: any) => empColl.set(e.id, { ...e }));
  collections.set("employees", empColl);
};

// Seed once before each test to ensure tests have predictable data
beforeEach(() => {
  collections.clear();
  seedCollections();
  jest.clearAllMocks();
});

// Cleanup after all tests in a file
afterAll(() => {
  jest.resetModules();
});
