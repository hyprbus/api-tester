import { getSite } from "../getSite";
import getSessionCookie from "../getSessionCookie";
import authRequest from "../authRequest";
import {
  ENV,
  LOGIN_PATH,
  TASK_PATH,
  USERS,
  TEST_TASK_ID
} from "../constants";

const propertyURL = `${TASK_PATH}${TEST_TASK_ID}`;

const testUser = "normal"; // normal || admin
const siteAddress = getSite(ENV);
let req;

// login and get cookie from server
beforeAll(async () => {
  const sessionCookie = await getSessionCookie(
    `${siteAddress}${LOGIN_PATH}`,
    USERS[ENV][testUser].login,
    USERS[ENV][testUser].password
  );
  // create authenticated http request
  req = (method, path) =>
    authRequest(siteAddress, path, null, method, sessionCookie);
});

describe(`Task tests: ${TASK_PATH}`, () => {
  it("Accessing a task should return status 200 and the task name field", async () => {
    const response = await req("GET", propertyURL);
    const body = await response.json();
    expect(response.status).toEqual(200);
    expect(body).toMatchObject({
      name: expect.any(String)
    });
  });

  it.skip("Accessing the normal user's tasks should return 200 OK and task data", () => { });
});
