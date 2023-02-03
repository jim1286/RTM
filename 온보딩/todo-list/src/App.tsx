import React from "react";
import { Route, Routes } from "react-router-dom";
import ListScreen from "./screens/ListScreen";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ListScreen />} />
      <Route path="/focus" />
    </Routes>
  );
}

export default App;
