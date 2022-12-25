import React, {useState} from 'react';
import './App.css';
import BoardList from "./view/view/BoardList";
import BoardItem from "./view/view/BoardItem";
import BoardContainer from "./view/BoardContainer";

function App() {

  return (
    <div className="App">
      <BoardContainer/>
    </div>
  );
}

export default App;
