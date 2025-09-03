
export function validateAndRedirect(pathArray: string[]) {
  const domainRegex = /([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}/;
  const numberOnlyRegex = /^\d+$/;
  const symbolOnlyRegex = /^[^a-zA-Z0-9]+$/;
  const startsWithSymbolRegex = /^[^a-zA-Z0-9]/;
  for (const item of pathArray) {
    if (
      domainRegex.test(item) ||
      numberOnlyRegex.test(item) ||
      symbolOnlyRegex.test(item) ||
      startsWithSymbolRegex.test(item)
    ) {
      return true;
    }
  }
}
