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
import LoginError from './containers/LoginError';
import RateMovies from './containers/RateMovies';
import RateShows from './containers/RateShows';

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
          <Route path="/rate-movies" element={<RateMovies />} />
          <Route path="/rate-shows" element={<RateShows />} />
          <Route
            path="/login"
            exact
            element={<LoginPage />}
          />
          <Route path="/login/error" element={<LoginError />} />
        </Routes>
      </Container>
    </ErrorHandler>
  );
}

export default App;
