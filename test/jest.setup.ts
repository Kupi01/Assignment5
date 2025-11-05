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

// Clear in-memory collections between tests to ensure isolation
afterEach(() => {
  collections.clear();
  jest.clearAllMocks();
});

// Reset all mocks after each test
afterEach(() => {
  jest.clearAllMocks();
});

// Cleanup after all tests in a file
afterAll(() => {
  jest.resetModules();
});
