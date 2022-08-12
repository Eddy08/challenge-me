import { useEffect, useLayoutEffect, useState } from "react";
import { addCompanyHandler } from "../Service/addCompanyFormHandler";
import { createCompany } from "../Service/createCompanyHandler";
import { searchCompanies } from "../Service/searchCompanies";
import { useNavigate } from "react-router-dom";
import "./Search.css";
function Search() {
  const [companyDetails, setCompanyDetails] = useState({
    company_name: "",
    company_id: "",
  });
  const [errorValue, setErrorMessage] = useState("");
  const [isSearching, setIsSearchingValue] = useState(false);
  const [input, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([
    { company_name: "", company_id: "" },
  ]);
  const [redirect, setRedirect] = useState({ to: false, msg: "" });

  const onChangeHandler = (event) => {
    setInputValue(event.target.value);
    setIsSearchingValue(true);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    let company = addCompanyHandler(suggestions);
    setCompanyDetails(company);
    createCompany(company).then((response) => {
      if (response.status === 200) {
        setRedirect({ to: true, msg: "" });
        goToList();
      } else {
        console.log("some Error 🧡");
        setRedirect({
          to: false,
          msg: "Some Issue when adding the company 😕\n Check if it is already present🟢 or not 🔴",
        });
      }
    });
  };
  let navigate = useNavigate();

  const goToList = () => {
    navigate("/companies");
  };
  let headers = new Headers();
  headers.append("Content-Type", "application/json");
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
  let getData = searchCompanies(requestOptions);
  useLayoutEffect(() => {
    getData
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
          setRedirect({ to: false, msg: "" });
        }
        setIsSearchingValue(false);
      })
      .catch((error) => {
        setErrorMessage("Some Error Occured ❌");
        setIsSearchingValue(false);
        setSuggestions([]);
        console.log("error", error);
      });
  }, [input]);
  return (
    <div style={{ height: 400, width: "100%",paddingTop:2 }}>
      <h1 id="heading">Search for the Company</h1>
      <h4>{errorValue}</h4>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          name="company"
          list="companies"
          value={input}
          onChange={onChangeHandler}
          id="companyName"
          placeholder="Search by Company Name"
        />

        <button id="submitBtn" type="submit">➕Add Company</button>

        {redirect.msg !== "" ? (
          <>
            <br />
            <span>{redirect.msg}</span>
          </>
        ) : (
          ""
        )}

        {/* {isSearching  ? (<h4>Searching</h4>):""} */}
        {suggestions.length && !isSearching !== 0 ? (
          <datalist id="companies">
            {suggestions.map((sug) => (
              <option
                key={sug["company_id"]}
                value={sug["company_name"]}
                id={sug["company_id"]}
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
      </form>
    </div>
  );
}
export default Search;
