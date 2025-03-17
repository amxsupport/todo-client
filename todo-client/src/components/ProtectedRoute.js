import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const token = localStorage.getItem('jwtToken');
  
  if (!token || !user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
