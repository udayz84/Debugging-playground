import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Playground from "./pages/Playground";
import Leaderboard from "./pages/Leaderboard";
import "./styles.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/playground" element={<Playground />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
