
import Profile from "./Screen/Profile";
import { Routes, Route } from "react-router-dom";
import Home from "./Screen/Home";
import Book from "./Screen/Book";
import History from "./Screen/History";

function App() {
  return (
    <>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/book" element={<Book />} />
        <Route path="/history " element={<History />} />
      </Routes>
    </>
  );
}


export default App;
