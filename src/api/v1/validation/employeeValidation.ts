import Joi from 'joi';

/**
 * @openapi
 * components:
 *   schemas:
 *     Employee:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - position
 *         - department
 *         - email
 *         - phone
 *         - branchId
 *         - createdAt
 *         - updatedAt
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the employee
 *           example: "emp_123abc"
 *         name:
 *           type: string
 *           minLength: 2
 *           maxLength: 50
 *           description: Full name of the employee
 *           example: "Jane Smith"
 *         position:
 *           type: string
 *           minLength: 2
 *           maxLength: 50
 *           description: Job position/title of the employee
 *           example: "Software Developer"
 *         department:
 *           type: string
 *           minLength: 2
 *           maxLength: 50
 *           description: Department where the employee works
 *           example: "Engineering"
 *         email:
 *           type: string
 *           format: email
 *           description: Employee's email address
 *           example: "jane.smith@company.com"
 *         phone:
 *           type: string
 *           minLength: 7
 *           maxLength: 20
 *           description: Employee's phone number
 *           example: "+1-555-123-4567"
 *         branchId:
 *           type: string
 *           description: ID of the branch where the employee works
 *           example: "branch_456def"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: When the employee record was created
 *           example: "2024-01-15T10:30:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: When the employee record was last updated
 *           example: "2024-01-20T14:45:00Z"
 */

export const employeeSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  position: Joi.string().min(2).max(50).required(),
  department: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(7).max(20).required(),
  branchId: Joi.string().required(),
});
