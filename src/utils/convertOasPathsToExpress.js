
module.exports =
function convertOasPathsToExpress(ePath) {
  // Here we take a path like `/api/packages/{packageName}` => `/api/packages/:packageName`
  return ePath.replaceAll(
    new RegExp("{(.+?)}", "g"),
    ":$1"
  );
}
