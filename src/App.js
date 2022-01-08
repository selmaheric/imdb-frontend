import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Container } from "reactstrap";
import axios from "axios";

import HomePage from "./containers/HomePage";
import LoginPage from "./containers/LoginPage";

import './App.css';
import { useState, useEffect } from "react";

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const response = await axios.get('http://localhost:3001/users/me', {
        withCredentials: true
      });
      setUser(response.data)
    };
    getUser();
  }, []);

  return (
    <Container className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage user={user} setUser={setUser} />} />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <LoginPage />}
          />
        </Routes>
      </Router>
    </Container>
  );
}

export default App;
