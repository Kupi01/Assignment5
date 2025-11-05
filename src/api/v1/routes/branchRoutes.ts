
import express from "express";
import * as branchController from "../controllers/branchController";
import { validate } from "../middleware/validateRequest";
import { branchSchema } from "../validation/branchValidation";

const router = express.Router();

router.get("/", branchController.getAllBranches);
router.get("/:id", branchController.getBranchById);
router.post("/", validate(branchSchema), branchController.createBranch);
router.put("/:id", validate(branchSchema), branchController.updateBranch);
router.delete("/:id", validate(branchSchema), branchController.deleteBranch);

export default router;