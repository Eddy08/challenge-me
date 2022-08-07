import { useEffect, useState } from "react";
import "./Search.css";
function Search() {
  const [companyDetails, setCompanyDetails] = useState({});
  const [errorValue, setErrorMessage] = useState("");
  const [isSearching, setIsSearchingValue] = useState(false);
  const [input, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([
    { company_name: "", company_id: "" },
  ]);
  const onChangeHandler = (event) => {
    setInputValue(event.target.value);
    setIsSearchingValue(true);
  };
  const addCompanyHandler = (event) => {
    console.log("Inside addCompanyHandler");
    let company = {};
    company["name"] = event.target.value;
    company["id"] = event.target.key;
    setCompanyDetails(company);
  };
  let headers = new Headers();
  headers.append("Content-Type", "application/json");
  useEffect(() => {
    let raw = JSON.stringify({
      search: input,
      filter: "company",
    });
    let requestOptions = {
      method: "POST",
      headers: headers,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:4000/getCompaniesByName", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        // console.log("Data type of result",typeof(result))
        // console.log(result);
        let resultValue = JSON.parse(result);
        if (resultValue.length === 0) {
          setSuggestions([]);
          setErrorMessage("Company Not Present on Record 🧾");
        } else {
          setSuggestions(resultValue);
          setErrorMessage("");
        }
        setIsSearchingValue(false);
      })
      .catch((error) => {
        setErrorMessage("Some Error Occured ❌");
        setIsSearchingValue(false);
        setSuggestions([]);
        console.log("error", error);
      });
  }, [input, errorValue, isSearching]);
  return (
    <>
      <h1>Search for the Company</h1>
      <h4>{errorValue}</h4>
      <input
        type="text"
        name="company"
        list="companies"
        value={input}
        onChange={onChangeHandler}
      />
      {companyDetails["company_name"] !== "" ? (
        <button type="submit">➕Add Company</button>
      ) : (
        "Some ERror"
      )}
      {/* {isSearching  ? (<h4>Searching</h4>):""} */}
      {suggestions.length && !isSearching !== 0 ? (
        <datalist id="companies" onChange={addCompanyHandler}>
          {suggestions.map((sug) => (
            <option
              key={sug["company_id"]}
              value={sug["company_name"]}
              
            >
              {sug["company_name"]}
            </option>
          ))}
        </datalist>
      ) : isSearching ? (
        <h4>Searching</h4>
      ) : (
        <>
          <datalist></datalist>
          <h4>No Data Found 😢</h4>
        </>
      )}
    </>
  );
}
export default Search;
