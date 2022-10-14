import { check, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

/**
 * error handler for all validators
 * @param req  Request
 * @param res  Response
 * @param next  NextFunction
 * @returns  Response
 */
const errorHandler = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ errors: errors.array({ onlyFirstError: true }) });
  }
  next();
};

/**
 * Date validator
 */
const DateValidator = [
  check("Date").notEmpty().withMessage("Date cannot be blank"),
  check("Date").isDate().withMessage("Date must be a Date"),
];

/**
 * Language validator
 */
const LanguageValidator = [
  check("Language").notEmpty().withMessage("Language cannot be blank"),
  check("Language").isString().withMessage("Language must be a string"),
];

/**
 * Limit validator
 */
const LimitValidator = [
  check("Limit").notEmpty().withMessage("Limit cannot be blank"),
  check("Limit").isInt().withMessage("Limit must be a integer"),
  check("Limit")
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1 and 100"),
];

/**
 * top rated validator
 */
export const topRatedValidator = [
  ...DateValidator,
  ...LanguageValidator,
  ...LimitValidator,
  errorHandler,
];
