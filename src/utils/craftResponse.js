/*
  This module provides functions to help craft an ExpressJS Response object
  into the forms we expect. Mainly utilizing OAS Response Objects.
*/

module.exports = {
  combineResponses: (prov, spec) => {
    // Takes user provided partial responses, and combines it with any data that
    // may be available in the OAS specification.
    // The "prov" may be just an HTTP Status Code, or an object where the status
    // code is it's key where the rest of the object follows the format of an OAS
    // specification.
    // The "spec" is expected to be an OAS "Responses Object"
    // This function will return an OAS spec-like object

    let oasResp = {}; // OAS Specification Response Object (Combined)

    let httpCode; // String HTTP Status Code
    let httpRange; // String HTTP Range based off above code
    let baseSpec = {}; // Base specification derived from "prov"
    let extendedSpec = {}; // Specification derived from "prov";

    if (typeof prov !== "object") {
      // We've just been provided an HTTP Status Code
      if (typeof prov === "number") {
        httpCode = prov.toString();
      } else {
        httpCode = prov;
      }
    } else {
      let rawCode = Object.keys(prov)[0];
      if (typeof rawCode === "number") {
        httpCode = rawCode.toString();
      } else {
        httpCode = rawCode;
      }

      baseSpec = prov[httpCode];
    }

    httpRange = `${httpCode.charAt(0)}XX`;
    oasResp[httpCode] = {};

    // With the HTTP status we can now attempt to find further details to combine
    // Following OAS spec lets check for exact matches first
    if (spec[httpCode]) {
      // We've found an exact HTTP code match. Which according to OAS spec takes precedence
      extendedSpec = spec[httpCode];
    } else if (spec[httpRange]) {
      // We've found a ranged definition
      extendedSpec = spec[httpRange];
    }

    oasResp[httpCode] = {
      ...extendedSpec,
      ...baseSpec
    };

    return oasResp;
  },
  applySpec: (spec, res) => {
    // Applies an OAS specification "Response Object" and applies it's details to
    // an ExpressJS Response object.
    // Does not apply or touch actual response data, just handles setting the other
    // aspects of a response.
    const httpCode = Object.keys(spec)[0];
    res.status(httpCode);

    if (spec[httpCode].content) {
      // Since the majority of the content specification handles format of the actual
      // data, which we won't modify, lets just take heed of the content type of the
      // data specification.
      const contentType = Object.keys(spec[httpCode].content);
      if (contentType.length > 1) {
        // TODO what should we do here? Probably nothing right, since we have no way
        // of knowing which is the right content type of the response data.
      } else {
        res.type(contentType[0]);
      }
    }
    if (spec[httpCode].headers) {

    }
    if (spec[httpCode].links) {

    }

    return;
  }
};
