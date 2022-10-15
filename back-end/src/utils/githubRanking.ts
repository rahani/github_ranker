import fetch from "node-fetch";
import { parse } from "@fast-csv/parse";

type CSVKeys =
  | "rank"
  | "item"
  | "repo_name"
  | "stars"
  | "forks"
  | "language"
  | "repo_url"
  | "username"
  | "issues"
  | "last_commit"
  | "description";

type CSVRow = {
  [key in CSVKeys]: string;
};

/**
 * retun short date from a Date object with splitter
 * @param date Date object
 * @param splitter such as "-"
 * @returns
 */
const getShortDate = (date: Date, splitter: string) => {
  return (
    String(date.getUTCFullYear()) +
    splitter +
    String(date.getUTCMonth() + 1).padStart(2, "0") +
    splitter +
    String(date.getUTCDay()).padStart(2, "0")
  );
};

/**
 * download file from remote url
 * @param url string
 * @returns content data of a file
 */
export const fileCrawler = async (url: string) => {
  return fetch(url)
    .then((res) => res.text())
    .catch((err) => {
      throw err; // throw error to the next catch;
    });
};

/**
 *
 * @param date Date object
 * @returns records of the csv file
 */
export const getGithubRankingRecords = async (date: Date) => {
  /**
   * define url of csv file
   * get the data from the url
   */
  const shortDate = getShortDate(date, "-");
  const url = `https://raw.githubusercontent.com/EvanLi/Github-Ranking/master/Data/github-ranking-${shortDate}.csv`;
  const CSV_STRING = await fileCrawler(url);

  /**
   * parse the csv file content
   * return promises records or reject if empty
   * wrapped by a Promise, we can await for it
   *
   */
  return new Promise<CSVRow[]>((resolve, reject) => {
    const records: CSVRow[] = [];
    const stream = parse({ headers: true })
      .on("error", (error) => reject(error))
      .on("data", (row: CSVRow) => records.push(row))
      .on("end", (rowCount: number) => {
        rowCount > 0 ? resolve(records) : reject("No data in the file");
      });
    stream.write(CSV_STRING);
    stream.end();
  });
};
