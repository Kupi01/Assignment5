import * as employeeService from "../src/api/v1/services/employeeService";
import { Employee } from "../src/models/employee";

describe("employeeService Firestore integration", () => {
  let createdId: string;

  it("should create an employee", async () => {
    const data: Partial<Employee> = {
      name: "Test Employee",
      department: "IT",
      branchId: "test-branch-id",
      phone: "1234567890"
    };
  const id = await employeeService.createEmployee(data);
  expect(typeof id).toBe("string");
  createdId = id;
  });

  it("should get employee by id", async () => {
    const employee = await employeeService.getEmployeeById(createdId);
    expect(employee).not.toBeNull();
    expect(employee?.id).toBe(createdId);
  });

  it("should update employee", async () => {
    const updates = { department: "HR" };
    const updated = await employeeService.updateEmployee(createdId, updates);
    expect(updated?.department).toBe("HR");
  });

  it("should get all employees", async () => {
    const employees = await employeeService.getAllEmployees();
    expect(Array.isArray(employees)).toBe(true);
  });

  it("should delete employee", async () => {
    const deleted = await employeeService.deleteEmployee(createdId);
    expect(deleted).toBe(true);
    const employee = await employeeService.getEmployeeById(createdId);
    expect(employee).toBeNull();
  });

  it("should filter employees by branch", async () => {
    const employees = await employeeService.getEmployeesByBranch("test-branch-id");
    expect(Array.isArray(employees)).toBe(true);
  });

  it("should filter employees by department", async () => {
    const employees = await employeeService.getEmployeesByDepartment("HR");
    expect(Array.isArray(employees)).toBe(true);
  });
});