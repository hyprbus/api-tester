import { ENV, USERS } from "../constants";
import fetch from "node-fetch";

const loginPath = "/login";
let loginCredentials = {
  email: USERS[ENV].normal.login,
  password: USERS[ENV].normal.password
};

const loginOptions = {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(loginCredentials)
};

const getOptions = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Cookie: ""
  },
  credentials: "include"
};

let cookie;

describe(`Login tests: ${loginPath}`, () => {
  it("Correct login with fetch gives status 200", async () => {
    const response = await fetch(
      "http://localhost:3000/login",
      loginOptions
    );
    cookie = response.headers.get("set-cookie");
    expect(response.status).toBe(200);
  });

  it("Getting authorised data gives status 200", async () => {
    getOptions.headers["Cookie"] = cookie;
    const response = await fetch(
      "http://localhost:3000/api/tasks",
      getOptions
    );
    // const res = await response.json();
    expect(response.status).toBe(200);
  });
});
