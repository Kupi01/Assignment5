// Always mock firebase in every test
jest.mock("../src/config/firebaseConfig", () => ({
  firestore: jest.fn(),
  auth: jest.fn(),
  app: jest.fn(),
}));

// Reset all mocks after each test
afterEach(() => {
  jest.clearAllMocks();
});

// Cleanup after all tests in a file
afterAll(() => {
  jest.resetModules();
});
