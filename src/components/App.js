import React from "react";
import Piano from "./Piano";
import Footer from "./Footer";
import "../scss/App.scss";

const App = () => {
  return (
    <div>
      <div className="app-body">
        <h1 className="main-title">Fork</h1>
        <Piano />
      </div>
      <Footer />
    </div>
  );
};

export default App;
