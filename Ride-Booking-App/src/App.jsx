
import Profile from "./Screen/Profile";
import { Routes, Route } from "react-router-dom";
import Home from "./Screen/Home";
import Book from "./Screen/Book";
import History from "./Screen/History";
import Active from "./Screen/Active";
import { ControlledInput, PartialControlledDisplayInput, PartialControlledInput, UncontrolledInput } from "./Component/TestInput";

function App() {
  return (
    <>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/book" element={<Book />} />
        <Route path="/history " element={<History />} />
        <Route path="/active" element={<Active />} />
      </Routes>
    </>
  );
}


export default App;
