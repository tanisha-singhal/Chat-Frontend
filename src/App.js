import React from "react";
import { Routes,Route } from "react-router";
import Join from "./components/Join/Join";
import Chat from "./components/Chat/Chat";
function App() {
  return (
    <Routes>
      <Route path="/" exact element={<Join/>} />
      <Route path="/chat" element={<Chat/>}/>
    </Routes>
  );
}

export default App;
