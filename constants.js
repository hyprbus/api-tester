import dotenv from "dotenv";

// define all passwords in a file name .env (make sure that .env is included in .gitignore):
// LOCAL_ADMIN_PWD=abc123
// LOCAL_NORMAL_PWD=abc123
// and so on.

dotenv.config();

// which environment to test: localhost, dev or test
export const ENV = "localhost";

export const LOGIN_PATH = "/login";

export const USERS = {
  localhost: {
    admin: { login: "admin@test.com", password: process.env.LOCAL_ADMIN_PWD },
    normal: { login: "test@test.com", password: process.env.LOCAL_NORMAL_PWD }
  },
  dev: {
    admin: { login: "admin@test.com", password: process.env.DEV_ADMIN_PWD },
    normal: { login: "test@test.com", password: process.env.DEV_NORMAL_PWD }
  }
};

export const TEST_TASK_ID = "someTaskId";

export const TASK_PATH = "/api/tasks/";

export const CONSUMPTION_TOTALS_PATH = "/api/indicators/consumption/totals";

export const CONSUMPTION_SCHEMA = {
  properties: {
    types: { type: "array" },
    totals: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: { type: "string" },
          value: { type: "number" },
          price: { type: "number" },
          change: { type: "number" }
        },
        required: ["name", "value", "price", "change"]
      }
    },
    prices: { type: "array" },
    values: { type: "array" },
    from: { type: "number" },
    to: { type: "number" },
    length: { type: "number" }
  }
};
