
import Profile from "./Screen/Profile";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import Home from "./Screen/Home";
import Book from "./Screen/Book";
import History from "./Screen/History";
import Active from "./Screen/Active";
import { ControlledInput, PartialControlledDisplayInput, PartialControlledInput, UncontrolledInput } from "./Component/TestInput";
import NavBar from "./Component/NavBar";
import { useEffect } from "react";

const LandingPage = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate("/home");
  }, [navigate]);

  return <></>;
}

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/book" element={<Book />} />
        <Route path="/history" element={<History />} />
        <Route path="/active" element={<Active />} />
      </Routes>

      {/* Nav Bar */}
      <NavBar />
    </>
  );
}


export default App;
