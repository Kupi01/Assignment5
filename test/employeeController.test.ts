import * as employeeController from "../src/api/v1/controllers/employeeController";
//import * as employeeService from "../src/api/v1/services/employeeService";
import { Request, Response } from "express";

describe("Employee Controller Logical Operations", () => {
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

  describe("getEmployeesByBranch", () => {
    it("should return employees for a valid branch ID", async () => {
      req.params = { branchId: "1" };
      await employeeController.getEmployeesByBranch(req as Request, res as Response);
      expect(jsonMock).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({ branchId: "1" })
        ])
      );
    });

    it("should return 400 for invalid branch ID", async () => {
      req.params = { branchId: "abc" };
      await employeeController.getEmployeesByBranch(req as Request, res as Response);
      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({ error: "Invalid branch ID" });
    });
  });

  describe("getEmployeesByDepartment", () => {
    it("should return employees for a valid department", async () => {
      req.params = { department: "IT" };
      await employeeController.getEmployeesByDepartment(req as Request, res as Response);
      expect(jsonMock).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({ department: "IT" })
        ])
      );
    });

    it("should return 400 for missing department parameter", async () => {
      req.params = {};
      await employeeController.getEmployeesByDepartment(req as Request, res as Response);
      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({ error: "Department parameter is required" });
    });
  });
});