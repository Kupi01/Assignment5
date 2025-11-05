import request from "supertest";
import app from "../src/app";

describe("Employee Logical Operation Routes", () => {
  it("should return all employees for a given branch", async () => {
    const branchId = "test-branch-id";
    const res = await request(app).get(`/api/v1/employees/branch/${branchId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    res.body.data.forEach((emp: any) => {
      expect(emp.branchId).toBe(branchId);
    });
  });

  it("should return all employees for a given department", async () => {
    const department = "IT";
    const res = await request(app).get(`/api/v1/employees/department/${department}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    res.body.data.forEach((emp: any) => {
      expect(emp.department.toLowerCase()).toBe(department.toLowerCase());
    });
  });
});