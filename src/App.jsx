import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Brew from "./pages/Brew";
import Learn from "./pages/Learn";
import Map from "./pages/Map";
import Drinks from "./pages/Drinks";

export default function App() {
  return (
    <BrowserRouter basename="/coffee-station">
      <div className="app-shell">
        <Navbar />
        <div className="page-content">
          <Routes>
            <Route path="/" element={<Brew />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/map" element={<Map />} />
            <Route path="/drinks" element={<Drinks />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
