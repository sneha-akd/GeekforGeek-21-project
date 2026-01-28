import Shows from "./routes/Shows";
import Login from "./routes/Login";
import NavBar from "./components/NavBar";
import { useEffect, useState } from "react";

const getUserfromLocalStorage = () => {
  let user = localStorage.getItem("user")
  if (user) return JSON.parse(user)
  else return undefined;
}

export default function App() {
  const [user, setUser] = useState(getUserfromLocalStorage());
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (user && showModal) {
      setShowModal(false);
    }

    if (user) {
      localStorage.setItem("user", JSON.stringify(user))
    }
    else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <>
      <div className="app">
        <NavBar user={user} showLogin={(state) => {
          setShowModal(state);
        }} onLogout={() => {
          setUser(undefined);
        }} />
        {showModal && !user && <Login setUser={setUser} hideLogin={() => setShowModal(false)} />}
        <Shows />
      </div>
    </>
  );
}