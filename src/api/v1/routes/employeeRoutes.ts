
import express from "express";
import * as employeeController from "../controllers/employeeController";
import { validate } from "../middleware/validateRequest";
import { employeeSchema } from "../validation/employeeValidation";

const router = express.Router();

router.get("/", employeeController.getAllEmployees);
router.get("/:id", employeeController.getEmployeeById);
router.post("/", validate(employeeSchema), employeeController.createEmployee);
router.put("/:id", validate(employeeSchema), employeeController.updateEmployee);
router.delete("/:id", validate(employeeSchema), employeeController.deleteEmployee);
router.get("/branch/:branchId", employeeController.getEmployeesByBranch);
router.get("/department/:department", employeeController.getEmployeesByDepartment);

export default router;