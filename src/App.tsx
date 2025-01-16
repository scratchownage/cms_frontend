import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import { useState } from 'react';
import { AuthProvider } from './context/AuthContext'

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  

  return (
    <AuthProvider>
      <Router>
          <Routes>
            {/* Redirect to /login if not authenticated */}
            <Route
              path="/"
              element={!isLoggedIn ? <Navigate to="/login" /> : <Navigate to="/" />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
