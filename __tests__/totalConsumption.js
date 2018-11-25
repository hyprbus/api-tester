import { matchers } from "jest-json-schema";
import { sumBy } from "lodash";
import { getSite } from "../getSite";
import getSessionCookie from "../getSessionCookie";
import authRequest from "../authRequest";
import {
  ENV,
  LOGIN_PATH,
  CONSUMPTION_TOTALS_PATH,
  USERS,
  TEST_PROPERTY_ID,
  CONSUMPTION_SCHEMA
} from "../constants";

expect.extend(matchers);

const URL = `${CONSUMPTION_TOTALS_PATH}`;
const params = {
  property: TEST_PROPERTY_ID,
  granularity: 12
};

const testUser = "admin"; // normal || admin
const siteAddress = getSite(ENV);
let req;

// login and get cookie from server
beforeAll(async () => {
  const sessionCookie = await getSessionCookie(
    `${siteAddress}${LOGIN_PATH}`,
    USERS[ENV][testUser].login,
    USERS[ENV][testUser].password
  );
  // create a request helper with authentication
  req = (method, path) =>
    authRequest(siteAddress, path, params, method, sessionCookie);
});

describe(`Total consumption tests: ${CONSUMPTION_TOTALS_PATH}`, () => {
  it("Getting total consumption for property should return status 200 and the data adhere to valid schema", async () => {
    const response = await req("GET", URL);
    const data = await response.json();

    expect(response.status).toEqual(200);

    // example of matching response json schema manually
    expect(data).toMatchObject({
      types: expect.any(Array),
      totals: expect.any(Array),
      prices: expect.any(Array),
      values: expect.any(Array),
      from: expect.any(Number),
      to: expect.any(Number),
      length: expect.any(Number)
    });

    // match response json schema with jest-json-schema matcher
    expect(data).toMatchSchema(CONSUMPTION_SCHEMA);
  });

  // example of calculating a value from the response and expecting it to be something
  it("Sum of total consumption in € should be greater than 0", async () => {
    const response = await req("GET", URL);
    const data = await response.json();
    expect(sumBy(data.totals, "price")).toBeGreaterThan(0);
  });
});
