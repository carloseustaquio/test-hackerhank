import React from "react";
import "./App.css";
import ResidentsList from "./Components/ResidentsList";
import Search from "./Components/Search";
import Error from "./Components/Error";
import "h8k-components";
import ResidentsProvider from "./providers/ResidentsProvider";

const title = "Hacker Dormitory";
function App() {
  return (
    <div className="App">
      <h8k-navbar header={title}></h8k-navbar>
      <div className="layout-column justify-content-center align-items-center w-50 mx-auto">
        <ResidentsProvider>
          <Search />
          <Error />
          <ResidentsList />
        </ResidentsProvider>
      </div>
    </div>
  );
}

export default App;
