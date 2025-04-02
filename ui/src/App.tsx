import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import { Home } from "./pages/Home";
import { AllCars } from "./pages/AllCars";
import { Search } from "./pages/Search";
import { NotFound } from "./pages/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<AllCars />} />
        <Route path="/all" element={<AllCars />} />

        <Route path="/search" element={<Search />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
