import { Navigate } from "react-router-dom";

export default function AdminProtectedRoute({
  children,
}) {

  const token =
    localStorage.getItem(
      "adminToken"
    );

  const adminData =
    JSON.parse(
      localStorage.getItem(
        "adminData"
      )
    );

  if (
    !token ||
    !adminData
  ) {

    return (
      <Navigate
        to="/admin"
        replace
      />
    );
  }

  if (
    adminData.role !==
    "admin"
  ) {

    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  return children;
}