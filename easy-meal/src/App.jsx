// import { useState } from "react";
import "./App.css";
import Footer from "./components/Footer/Footer";

import Header from "./components/Header/Header";
import Main from "./components/Main/Main";

function App() {
  console.log("im update");
  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
}

export default App;
