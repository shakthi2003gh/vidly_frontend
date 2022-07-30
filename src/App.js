import React, { Component } from "react";
import "./App.css";
import MoviesSection from "./components/movies";

class App extends Component {
  render() {
    return (
      <main className="container ">
        <MoviesSection />
      </main>
    );
  }
}

export default App;
