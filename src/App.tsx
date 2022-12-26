import React from 'react';
import './App.css';
import BoardContainer from "./comp/view/BoardContainer";
import Header from "./comp/view/view/Header";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import BoardList from "./comp/view/view/pages/BoardList";

function App() {


  return (
    <div className="App">
        <BoardContainer/>
    </div>
  );
}

export default App;
