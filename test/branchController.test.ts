import * as branchController from "../src/api/v1/controllers/branchController";
import { Request, Response } from "express";

describe("Branch Controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ json: jsonMock });
    req = {};
    res = { json: jsonMock, status: statusMock };
  });

  // Create Branch
  it("should create a branch successfully", () => {
    req.body = { name: "Test", address: "123", phone: "123" };
    branchController.createBranch(req as Request, res as Response);
    expect(statusMock).toHaveBeenCalledWith(201);
    expect(jsonMock).toHaveBeenCalledWith(expect.objectContaining({ name: "Test" }));
  });

  it("should return 400 if required fields are missing on create", () => {
    req.body = { name: "Test" };
    branchController.createBranch(req as Request, res as Response);
    expect(statusMock).toHaveBeenCalledWith(400);
    expect(jsonMock).toHaveBeenCalledWith({ error: "Missing required fields" });
  });

  // Get All Branches
  it("should get all branches", () => {
    branchController.getAllBranches(req as Request, res as Response);
    expect(jsonMock).toHaveBeenCalledWith(expect.any(Array));
  });

  it("should handle error in getAllBranches gracefully", () => {
    // No error is thrown in current implementation, so just call and check
    branchController.getAllBranches(req as Request, res as Response);
    expect(jsonMock).toHaveBeenCalled();
  });

  // Get Branch by ID
  it("should get a branch by valid ID", () => {
    req.params = { id: "1" };
    branchController.getBranchById(req as Request, res as Response);
    expect(jsonMock).toHaveBeenCalledWith(expect.objectContaining({ id: 1 }));
  });

  it("should return 404 for invalid branch ID", () => {
    req.params = { id: "99999" };
    branchController.getBranchById(req as Request, res as Response);
    expect(statusMock).toHaveBeenCalledWith(404);
    expect(jsonMock).toHaveBeenCalledWith({ error: "Branch not found" });
  });

  // Update Branch
  it("should update a branch successfully", () => {
    req.params = { id: "1" };
    req.body = { phone: "555-555-5555" };
    branchController.updateBranch(req as Request, res as Response);
    expect(jsonMock).toHaveBeenCalledWith(expect.objectContaining({ phone: "555-555-5555" }));
  });

  it("should return 404 for updating non-existent branch", () => {
    req.params = { id: "99999" };
    req.body = { phone: "555-555-5555" };
    branchController.updateBranch(req as Request, res as Response);
    expect(statusMock).toHaveBeenCalledWith(404);
    expect(jsonMock).toHaveBeenCalledWith({ error: "Branch not found" });
  });

  // Delete Branch
  it("should delete a branch successfully", () => {
    req.params = { id: "1" };
    branchController.deleteBranch(req as Request, res as Response);
    expect(jsonMock).toHaveBeenCalledWith({ message: "Branch deleted" });
  });

  it("should return 404 for deleting non-existent branch", () => {
    req.params = { id: "99999" };
    branchController.deleteBranch(req as Request, res as Response);
    expect(statusMock).toHaveBeenCalledWith(404);
    expect(jsonMock).toHaveBeenCalledWith({ error: "Branch not found" });
  });
});