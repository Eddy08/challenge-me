export function createCompany(company) {
  let headers = new Headers();
  headers.append("Content-Type", "application/json");
  let raw = JSON.stringify(company);
  let requestOptions = {
    method: "POST",
    headers: headers,
    body: raw,
    redirect: "follow",
  };
  return fetch("http://localhost:4000/createCompany", requestOptions);
}
