import { Route, Router, Routes } from "react-router-dom";
import "./App.css";
import Changepath from "./layout/pages/changePath/changepath";
import Homepage from "./layout/pages/homepage/homepage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route path="/:path" element={<Changepath />} />
      </Routes>
    </div>
  );
}

export default App;
