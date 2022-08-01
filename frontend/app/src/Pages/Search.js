import { useEffect, useState } from "react";

function Search() {
  const [input, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
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
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  });
  return (
    <>
      <h1>Search for the Company</h1>
      <input
        type="text"
        name="company"
        value={input}
        onChange={onChangeHandler}
      />
    </>
  );
}
export default Search;
