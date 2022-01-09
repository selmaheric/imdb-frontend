import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  BrowserRouter as Router, Routes, Route, Navigate,
} from 'react-router-dom';
import { Container } from 'reactstrap';

import HomePage from './containers/HomePage';
import LoginPage from './containers/LoginPage';

import './App.css';

import { loginUser } from './reduxStore/auth/actions';

function App() {
  const dispatch = useDispatch();

  const [user, setUser] = useState(null);

  useEffect(() => {
    dispatch(loginUser());
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
