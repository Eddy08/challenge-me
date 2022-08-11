export function searchCompanies(requestOptions){
    
    return fetch("http://localhost:4000/getCompaniesByName", requestOptions)
      .then((response) => response.text())
     
}