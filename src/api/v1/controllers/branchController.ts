import { Request, Response } from "express";
import * as branchService from "../services/branchService";
import { ApiResponse } from "../../../models/response";

export async function getAllBranches(_req: Request, res: Response) {
  const branches = await branchService.getAllBranches();
  const response: ApiResponse<typeof branches> = {
    success: true,
    data: branches,
  };
  res.json(response);
}

export async function getBranchById(req: Request, res: Response) {
  const id = req.params.id;
  const branch = await branchService.getBranchById(id);
  if (!branch) {
    const response: ApiResponse<null> = {
      success: false,
      error: "Branch not found",
    };
    return res.status(404).json(response);
  }
  const response: ApiResponse<typeof branch> = {
    success: true,
    data: branch,
  };
  res.json(response);
}

export async function createBranch(req: Request, res: Response) {
  const { name, address, phone } = req.body;
  if (!name || !address || !phone) {
    const response: ApiResponse<null> = {
      success: false,
      error: "Missing required fields",
    };
    return res.status(400).json(response);
  }
  const newBranch = await branchService.createBranch({ name, address, phone });
  const response: ApiResponse<typeof newBranch> = {
    success: true,
    data: newBranch,
  };
  res.status(201).json(response);
}

export async function updateBranch(req: Request, res: Response) {
  const id = req.params.id;
  const updates = req.body;
  const updated = await branchService.updateBranch(id, updates);
  if (!updated) {
    const response: ApiResponse<null> = {
      success: false,
      error: "Branch not found",
    };
    return res.status(404).json(response);
  }
  const response: ApiResponse<typeof updated> = {
    success: true,
    data: updated,
  };
  res.json(response);
}

export async function deleteBranch(req: Request, res: Response) {
  const id = req.params.id;
  const deleted = await branchService.deleteBranch(id);
  if (!deleted) {
    const response: ApiResponse<null> = {
      success: false,
      error: "Branch not found",
    };
    return res.status(404).json(response);
  }
  const response: ApiResponse<{ message: string }> = {
    success: true,
    data: { message: "Branch deleted" },
  };
  res.json(response);
}