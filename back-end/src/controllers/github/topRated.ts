import { NextFunction, Request, Response } from "express";
import {
  filterGithubRankingRecords,
  getGithubRankingRecords,
} from "../../utils/githubRanking";

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

  let { Date: date, Limit }: topRatedRequest = req.body;
  const { Language }: topRatedRequest = req.body;
  date = new Date(date); // must be converted to date object validated by validator
  Limit = Number(Limit); // must be integer between [1,100] validated by validator

  getGithubRankingRecords(date)
    .then((result) => {
      const filteredResult = filterGithubRankingRecords(
        result,
        Language,
        Limit
      );
      return res.status(200).json({ records: filteredResult });
    })
    .catch((err) => {
      console.log(err);
      if (err instanceof Error) {
        return next(err);
      }
      return res.status(400).json({ error: "Bad Request" });
    });
};
