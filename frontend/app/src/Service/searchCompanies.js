export function searchCompanies(requestOptions) {
  return fetch("/getCompaniesByName", requestOptions).then((response) =>
    response.text()
  );
}
