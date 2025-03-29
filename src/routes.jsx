import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import UsersPage from './pages/UsersPage';
import EditUserPage from './pages/EditUserPage';

const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem('token');
  return token ? element : <Navigate to="/" />;
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/users" element={<ProtectedRoute element={<UsersPage />} />} />
        <Route path="/edit/:id" element={<ProtectedRoute element={<EditUserPage />} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
