// get the session cookie for authenticated requests

import fetch from "node-fetch";

const getSessionCookie = async (site, login, password) => {
  let sessionCookie = "";

  let loginCredentials = {
    login: login,
    password: password
  };
  try {
    const response = await fetch(site, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(loginCredentials)
    });
    sessionCookie = response.headers.get("set-cookie").split(";")[0];
  } catch (e) {
    throw `Error getting authentication cookie from server: ${e}`;
  }
  return sessionCookie;
};

export default getSessionCookie;
