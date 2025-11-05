import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

/**
 * Express middleware for request validation using Joi
 * Follows validation patterns from course materials
 * 
 * @param schema - Joi validation schema to apply to request body
 * @returns Express middleware function for route validation
 * 
 * @example
 * // Usage in route definitions following course patterns
 * router.post('/employees', validate(employeeSchema), createEmployee);
 * 
 * @throws {400} When validation fails, returns error with first validation message
 */
export function validate(schema: Joi.ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };
}
