// { foo: 100, bar: "hello" } ==> "?foo=100?bar=hello"

export const paramsToString = params => {
  if (
    params != null &&
    typeof params === "object" &&
    Object.keys(params).length > 0
  ) {
    const paramString = `?${Object.keys(params)
      .map(key => key + "=" + params[key])
      .join("&")}`;
    return paramString;
  } else {
    return "";
  }
};
