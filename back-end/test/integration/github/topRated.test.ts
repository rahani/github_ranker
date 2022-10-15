import request from "supertest";
import app from "../../../src/app";
import { describe, expect, it } from "@jest/globals";

import { topRatedController } from "../../../src/controllers/github/topRated";
const CONTENT_TYPE_JSON = "application/json; charset=utf-8";

describe("POST /github/topRated", () => {
  const validRequest = {
    Language: "JavaScript",
    Limit: 10,
    Date: "2021-01-01",
  };

  const UnExistLanguageRequest = {
    Language: "J",
    Limit: 10,
    Date: "2021-01-01",
  };

  const unvalidRequest = {
    Language: "JavaScript",
    Limit: 0,
    Date: "wrong Date",
  };

  it("should return 400 BAD REQ for Unvalid request params", () => {
    return request(app)
      .post("/github/topRated/")
      .send(unvalidRequest)
      .expect(400)
      .expect("Content-Type", CONTENT_TYPE_JSON);
  });

  it("should return 200 OK for valid params", () => {
    // send a valid POST request to the endpoint
    return request(app)
      .post("/github/topRated/")
      .send(validRequest)
      .expect(200)
      .expect("Content-Type", CONTENT_TYPE_JSON);
  });

  it("should return valid response for valid requests", async () => {
    // send a valid POST request to the endpoint
    const response = await request(app)
      .post("/github/topRated/")
      .send(validRequest);

    expect(response.status).toBe(200);

    /** records */
    expect(response.body).toHaveProperty("records");
    expect(Array.isArray(response.body.records)).toBe(true);
    expect(response.body.records.length).toBe(validRequest.Limit);
  });

  it("should return empty array response for un exist Language", async () => {
    // send a valid POST request to the endpoint
    const response = await request(app)
      .post("/github/topRated/")
      .send(UnExistLanguageRequest);

    expect(response.status).toBe(200);

    /** records */
    expect(response.body).toHaveProperty("records");
    expect(Array.isArray(response.body.records)).toBe(true);
    expect(response.body.records.length).toBe(0);
  });
});
