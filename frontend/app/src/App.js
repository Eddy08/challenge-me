import logo from "./logo.svg";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";
import DataList from "./Pages/DataList";
import Search from "./Pages/Search";

function App() {
  const [show, setShow] = useState(true);

  function changeState() {
    setShow(!show);
  }
  const navigate = useNavigate();

  const navigateToCompanies = () => {
    navigate("/companies");
  };

  const navigateHome = () => {
    navigate("/");
  };
  return (
    <>
      <header>
        <h1>Company 🧵</h1>
      </header>
      <nav>
        <button onClick={()=>{navigateHome();changeState();}} hidden={!window.location.toString().includes("companies")}>Go To Search 🔎</button>
        <button onClick={()=>{navigateToCompanies();changeState();}} hidden={window.location.toString().includes("companies")}>Go To List 📃</button>
      </nav>
      <main>
        <Routes>
          <Route path="/companies" element={<DataList />} />
          <Route path="/" element={<Search />} />
        </Routes>
      </main>
      <footer>Harsh ©{getYear}</footer>
    </>
  );
}
const getYear = new Date().getFullYear();
export default App;
