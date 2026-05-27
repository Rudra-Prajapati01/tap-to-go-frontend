import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {

  // NORMAL LOGIN TOKEN
  const token =
    localStorage.getItem("token");

  // GOOGLE LOGIN USER
  const googleUser =
    localStorage.getItem("googleUser");

  // CHECK AUTH
  if (!token && !googleUser) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;