import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";

import Home from "./home";
import Farm from "./farm";
import Advisory from "./advisory";
import Weather from "./weather";
import Login from "./login";
import Register from "./register";

function App() {
  return (
    <BrowserRouter>

      <nav>

        <Link to="/login">Login</Link>  {" | "}

        <Link to="/">Home</Link> {" | "}

        <Link to="/farms">Farms</Link> {" | "}

        <Link to="/advisory">Crop Advisory</Link> {" | "}

        <Link to="/weather">Weather</Link> {" | "}

        
      </nav>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/farms"
          element={<Farm />}
        />

        <Route
          path="/advisory"
          element={<Advisory />}
        />

        <Route
          path="/weather"
          element={<Weather />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
           path="/register"
          element={<Register />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;