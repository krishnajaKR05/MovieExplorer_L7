import React, { useEffect, useState } from "react";
import WelcomePage from "./Components/Welcome";
import MovieList from "./Components/MovieList";
import "./App.css";

function App() {
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="main">{showWelcome ? <WelcomePage /> : <MovieList />}</div>
  );
}

export default App;
