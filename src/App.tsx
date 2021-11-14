import React, { useState } from 'react';

import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import { Login } from './pages/login'
import { Home } from './pages/home'
import { Browser } from './pages/browser'

const App = () => {
  const navigate = useNavigate();

  const [isLogged, setIsLogged] = useState(true);

  const setLogged = (status: any) => {
    setIsLogged(status)
  }

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={<Login navigate={navigate} />}
        />
        <Route
          path="/browse"
          element={<Browser isLogged={isLogged} navigate={navigate} />}
        />
        <Route
          path="/home"
          element={<Home isLogged={isLogged} navigate={navigate} />}
        />
        <Route
          path="*"
          element={<Navigate to="/login" />}
        />
      </Routes>
    </div>
  );
}

export default App;
