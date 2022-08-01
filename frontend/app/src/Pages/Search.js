import { useEffect, useState } from "react";

function Search() {
  const [input, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState(["Please Enter Some Value"]);
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
        console.log(result);
        setSuggestions(result);
      })
      .catch((error) => console.log("error", error));
  },[input]);
  return (
    <>
      <h1>Search for the Company</h1>
      <input
        type="text"
        name="company"
        list="companies"
        value={input}
        onChange={onChangeHandler}
      />
      {/* <datalist id="companies"> */}
     {suggestions}
        {/* {suggestions.map((company, index) => (
          <option key={index} value={company}></option>
        ))} */}
      {/* </datalist> */}
    </>
  );
}
export default Search;
