
import express from "express";
import * as employeeController from "../controllers/employeeController";
import { validate } from "../middleware/validateRequest";
import { employeeSchema } from "../validation/employeeValidation";

const router = express.Router();

/**
 * @openapi
 * /employees:
 *   get:
 *     summary: Retrieve a list of all employees
 *     tags: [Employees]
 *     responses:
 *       '200':
 *         description: Successfully retrieved all employees
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Employee'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/", employeeController.getAllEmployees);

/**
 * @openapi
 * /employees/{id}:
 *   get:
 *     summary: Retrieve a specific employee by ID
 *     tags: [Employees]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the employee
 *     responses:
 *       '200':
 *         description: Successfully retrieved employee
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       '404':
 *         description: Employee not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       '500':
 *         description: Internal server error
 */
router.get("/:id", employeeController.getEmployeeById);

/**
 * @openapi
 * /employees:
 *   post:
 *     summary: Create a new employee
 *     tags: [Employees]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - position
 *               - department
 *               - email
 *               - phone
 *               - branchId
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 50
 *                 example: "John Doe"
 *               position:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 50
 *                 example: "Software Developer"
 *               department:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 50
 *                 example: "Engineering"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "john.doe@company.com"
 *               phone:
 *                 type: string
 *                 minLength: 7
 *                 maxLength: 20
 *                 example: "+1-555-123-4567"
 *               branchId:
 *                 type: string
 *                 example: "branch_123"
 *     responses:
 *       '201':
 *         description: Employee created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       '400':
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       '500':
 *         description: Internal server error
 */
router.post("/", validate(employeeSchema), employeeController.createEmployee);

/**
 * @openapi
 * /employees/{id}:
 *   put:
 *     summary: Update an existing employee's information
 *     tags: [Employees]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the employee
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - position
 *               - department
 *               - email
 *               - phone
 *               - branchId
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 50
 *                 example: "John Doe"
 *               position:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 50
 *                 example: "Senior Software Developer"
 *               department:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 50
 *                 example: "Engineering"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "john.doe@company.com"
 *               phone:
 *                 type: string
 *                 minLength: 7
 *                 maxLength: 20
 *                 example: "+1-555-123-4567"
 *               branchId:
 *                 type: string
 *                 example: "branch_123"
 *     responses:
 *       '200':
 *         description: Employee updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       '404':
 *         description: Employee not found
 *       '400':
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       '500':
 *         description: Internal server error
 */
router.put("/:id", validate(employeeSchema), employeeController.updateEmployee);

/**
 * @openapi
 * /employees/{id}:
 *   delete:
 *     summary: Delete an employee by ID
 *     tags: [Employees]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the employee to delete
 *     responses:
 *       '200':
 *         description: Employee deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Employee deleted successfully"
 *       '404':
 *         description: Employee not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       '500':
 *         description: Internal server error
 */
router.delete("/:id", validate(employeeSchema), employeeController.deleteEmployee);

/**
 * @openapi
 * /employees/branch/{branchId}:
 *   get:
 *     summary: Retrieve all employees from a specific branch
 *     tags: [Employees]
 *     parameters:
 *       - name: branchId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the branch
 *     responses:
 *       '200':
 *         description: Successfully retrieved employees from the branch
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Employee'
 *       '404':
 *         description: Branch not found or no employees in this branch
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       '500':
 *         description: Internal server error
 */
router.get("/branch/:branchId", employeeController.getEmployeesByBranch);

/**
 * @openapi
 * /employees/department/{department}:
 *   get:
 *     summary: Retrieve all employees from a specific department
 *     tags: [Employees]
 *     parameters:
 *       - name: department
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The name of the department
 *     responses:
 *       '200':
 *         description: Successfully retrieved employees from the department
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Employee'
 *       '404':
 *         description: Department not found or no employees in this department
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       '500':
 *         description: Internal server error
 */
router.get("/department/:department", employeeController.getEmployeesByDepartment);

export default router;