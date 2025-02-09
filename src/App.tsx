import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthProvider } from './context/AuthProvider';
import { useAuth } from './utils/useAuth';
import PublicRoute from './routes/PublicRoute';
import ProtectedRoute from './routes/ProtectedRoute';
import TextEditorPage from './pages/TextEditorPage';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
};

// Separate component for routes
const AppRoutes = () => {
  const { user } = useAuth(); // Now this is safely within AuthProvider

  return (
    <Routes>
      <Route
        path="/"
        element={user ? <Navigate to="/textEditor" /> : <Navigate to="/login" />}
      />
      <Route path="/login"
        element={<PublicRoute>
          <Login />
        </PublicRoute>} />

      <Route path="/register"
        element={<PublicRoute>
          <Register />
        </PublicRoute>} />

      <Route path="/textEditor"
        element={<ProtectedRoute>
          <TextEditorPage />
        </ProtectedRoute>}
      />

    </Routes>
  );
};

export default App;
