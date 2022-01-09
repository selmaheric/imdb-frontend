import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { Container } from 'reactstrap';

import HomePage from './containers/HomePage';
import LoginPage from './containers/LoginPage';

import Navbar from './components/Navbar';
import Spinner from './components/Spinner';

import './App.css';

import { getMe } from './reduxStore/auth/actions';
import ErrorHandler from './containers/ErrorHandler';

function App() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, []);

  if (loading) {
    return (
      <Container className="App bg-light">
        <Spinner />
      </Container>
    );
  }

  return (
    <ErrorHandler>
      <Container className="App bg-light">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/login"
            element={<LoginPage />}
          />
        </Routes>
      </Container>
    </ErrorHandler>
  );
}

export default App;
