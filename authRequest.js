import fetch from "node-fetch";
import { paramsToString } from "./paramsToString";

const authRequest = (site, path, params, method, sessionCookie) => {
  const options = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Cookie: sessionCookie
    },
    credentials: "include"
  };

  return fetch(`${site}${path}${paramsToString(params)}`, options);
};

export default authRequest;
