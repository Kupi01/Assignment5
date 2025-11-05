import * as branchService from "../src/api/v1/services/branchService";
import { Branch } from "../src/models/branch";

describe("branchService Firestore integration", () => {
  let createdId: string;

  it("should create a branch", async () => {
    const data: Partial<Branch> = {
      name: "Test Branch",
      address: "123 Main St",
      phone: "555-1234"
    };
  const id = await branchService.createBranch(data);
  expect(typeof id).toBe("string");
  createdId = id;
  });

  it("should get branch by id", async () => {
    const branch = await branchService.getBranchById(createdId);
    expect(branch).not.toBeNull();
    expect(branch?.id).toBe(createdId);
  });

  it("should update branch", async () => {
    const updates = { address: "456 Elm St" };
    const updated = await branchService.updateBranch(createdId, updates);
    expect(updated?.address).toBe("456 Elm St");
  });

  it("should get all branches", async () => {
    const branches = await branchService.getAllBranches();
    expect(Array.isArray(branches)).toBe(true);
  });

  it("should delete branch", async () => {
    const deleted = await branchService.deleteBranch(createdId);
    expect(deleted).toBe(true);
    const branch = await branchService.getBranchById(createdId);
    expect(branch).toBeNull();
  });
});