import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "reactstrap";

import HomePage from "./containers/HomePage";
import LoginPage from "./containers/LoginPage";

import './App.css';

function App() {
  return (
    <Container className="App">
      <Router>
        <Routes>
          <Route path="/login" exact={true} element={<LoginPage />} />
          <Route path="/" exact={true} element={<HomePage />} />
        </Routes>
      </Router>
    </Container>
  );
}

export default App;
