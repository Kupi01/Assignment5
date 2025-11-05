import Joi from 'joi';

/**
 * @openapi
 * components:
 *   schemas:
 *     Branch:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - address
 *         - phone
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the branch
 *           example: "branch_123abc"
 *         name:
 *           type: string
 *           minLength: 2
 *           maxLength: 50
 *           description: Name of the branch
 *           example: "Downtown Branch"
 *         address:
 *           type: string
 *           minLength: 5
 *           maxLength: 100
 *           description: Physical address of the branch
 *           example: "123 Main Street, Winnipeg, MB"
 *         phone:
 *           type: string
 *           pattern: "^[0-9]{10}$"
 *           description: Phone number of the branch (10 digits)
 *           example: "2045551234"
 *     Error:
 *       type: object
 *       required:
 *         - error
 *         - message
 *       properties:
 *         error:
 *           type: string
 *           description: Error type or code
 *           example: "VALIDATION_ERROR"
 *         message:
 *           type: string
 *           description: Human-readable error message
 *           example: "The name field is required"
 *         details:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               field:
 *                 type: string
 *                 example: "phone"
 *               issue:
 *                 type: string
 *                 example: "must be a valid phone number"
 *           description: Detailed validation errors (optional)
 */

/**
 * Joi validation schema for branch data
 * Validates branch input according to business rules
 */
export const branchSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  address: Joi.string().min(5).max(100).required(),
  phone: Joi.string().pattern(/^[0-9]{10}$/).required(),
});
