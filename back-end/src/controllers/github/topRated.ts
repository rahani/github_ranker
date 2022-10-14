import { NextFunction, Request, Response } from "express";

interface topRatedRequest {
  Date: Date;
  Language: string;
  Limit: number;
}

/**
 * Contact form API.
 * @param req Request
 * @param res Response
 * @param next NextFunction
 * @route GET /github/topRated
 */
export const topRatedController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  /**
   * get the data from the request body
   * convert to real type
   */

  let { Date: date, Language, Limit }: topRatedRequest = req.body;
  date = new Date(date); // must be converted to date object validated by validator
  Limit = Number(Limit); // must be integer between [1,100] validated by validator

  return res.status(200).json({ message: "Hello worls!" });
};
