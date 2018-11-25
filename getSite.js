// define site information for localhost, dev and test

export const getSite = environment => {
  if (
    environment === "localhost" ||
    environment === "test" ||
    environment === "production"
  ) {
    const envs = {
      localhost: {
        httpPrefix: "http://",
        server: "localhost",
        port: ":3001"
      },
      test: {
        httpPrefix: "https://",
        server: "testsite.com",
        port: ""
      },
      production: {
        httpPrefix: "https://",
        server: "productionsite.com",
        port: ""
      }
    };
    const httpPrefix = envs[environment].httpPrefix;
    const server = envs[environment].server;
    const port = envs[environment].port;
    const siteAddress = `${httpPrefix}${server}${port}`;
    return siteAddress;
  } else {
    throw "Invalid environment ID specified.";
  }
};
