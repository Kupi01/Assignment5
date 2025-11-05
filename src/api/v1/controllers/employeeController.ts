import { Request, Response } from "express";
import * as employeeService from "../services/employeeService";
import { ApiResponse } from "../../../models/response";

export async function getAllEmployees(_req: Request, res: Response) {
  const employees = await employeeService.getAllEmployees();
  const response: ApiResponse<typeof employees> = {
    success: true,
    data: employees,
  };
  res.json(response);
}

export async function getEmployeeById(req: Request, res: Response) {
  const id = req.params.id;
  const employee = await employeeService.getEmployeeById(id);
  if (!employee) {
    const response: ApiResponse<null> = {
      success: false,
      error: "Employee not found",
    };
    return res.status(404).json(response);
  }
  const response: ApiResponse<typeof employee> = {
    success: true,
    data: employee,
  };
  res.json(response);
}

export async function createEmployee(req: Request, res: Response) {
  const { name, position, department, email, phone, branchId } = req.body;
  if (!name || !position || !department || !email || !phone || !branchId) {
    const response: ApiResponse<null> = {
      success: false,
      error: "Missing required fields",
    };
    return res.status(400).json(response);
  }
  const newEmployee = await employeeService.createEmployee({ name, position, department, email, phone, branchId });
  const response: ApiResponse<typeof newEmployee> = {
    success: true,
    data: newEmployee,
  };
  res.status(201).json(response);
}

export async function updateEmployee(req: Request, res: Response) {
  const id = req.params.id;
  const updates = req.body;
  const updated = await employeeService.updateEmployee(id, updates);
  if (!updated) {
    const response: ApiResponse<null> = {
      success: false,
      error: "Employee not found",
    };
    return res.status(404).json(response);
  }
  const response: ApiResponse<typeof updated> = {
    success: true,
    data: updated,
  };
  res.json(response);
}

export async function deleteEmployee(req: Request, res: Response) {
  const id = req.params.id;
  const deleted = await employeeService.deleteEmployee(id);
  if (!deleted) {
    const response: ApiResponse<null> = {
      success: false,
      error: "Employee not found",
    };
    return res.status(404).json(response);
  }
  const response: ApiResponse<{ message: string }> = {
    success: true,
    data: { message: "Employee deleted" },
  };
  res.json(response);
}

export async function getEmployeesByBranch(req: Request, res: Response) {
  const branchId = req.params.branchId;
  if (!branchId) {
    const response: ApiResponse<null> = {
      success: false,
      error: "Invalid branch ID",
    };
    return res.status(400).json(response);
  }
  const employees = await employeeService.getEmployeesByBranch(branchId);
  const response: ApiResponse<typeof employees> = {
    success: true,
    data: employees,
  };
  res.json(response);
}

export async function getEmployeesByDepartment(req: Request, res: Response) {
  const department = req.params.department;
  if (!department) {
    const response: ApiResponse<null> = {
      success: false,
      error: "Department parameter is required",
    };
    return res.status(400).json(response);
  }
  const employees = await employeeService.getEmployeesByDepartment(department);
  const response: ApiResponse<typeof employees> = {
    success: true,
    data: employees,
  };
  res.json(response);
}