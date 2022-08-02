import { useEffect, useState } from "react";
import "./Search.css";
function Search() {
  const [errorValue, setErrorMessage] = useState("No Error ✅");
  const [input, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([
    { company_name: "", company_id: "" },
  ]);
  const onChangeHandler = (event) => {
    setInputValue(event.target.value);
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
        let resultValue=JSON.parse(result);
        if(resultValue.length==0) setSuggestions([])
        else setSuggestions(resultValue);
        setErrorMessage("");
      })
      .catch((error) => {
        setErrorMessage("Some Error Occured ❌");
        console.log("error", error); 
      });
  }, [input,errorValue]);
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
      
        {suggestions.length !== 0 ? (
          <datalist id="companies">
          {suggestions.map((sug) => (
            <option key={sug["company_id"]} value={sug["company_name"]}>{sug["company_name"]}</option>
          ))}
      </datalist>
          
        ) : (<>
          <datalist></datalist>
          <h4>No Data Found 😢</h4>
          </>
        )}

    </>
  );
}
export default Search;
