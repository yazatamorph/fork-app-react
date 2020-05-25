import React from "react";
import Header from "./Header";
import Piano from "./Piano";
import Footer from "./Footer";
import "../scss/App.scss";

const App = () => {
  return (
    <div>
      <Header />
      <div className="app-body-wrapper">
        <div className="app-body">
          <div className="head-spacer" />
          <Piano />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default App;
