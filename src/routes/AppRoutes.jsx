import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Home from "../pages/Home";

import Dashboard from "../components/dashboard/Dashboard";
import DashboardLayout from "../components/dashboard/DashboardLayout";

import ProtectedRoute from "./ProtectedRoute";

import PublicProfile from "../pages/PublicProfile";

import EditProfile from "../components/profile/EditProfile";

import Leads from "../components/leads/Leads";

import ProductAndServices
  from "../components/products-services/ProductAndServices";

import ProductDetails
  from "../pages/ProductDetails";

import Analytics
  from "../components/analytics/Analytics";

const AppRoutes = () => {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/u/:uniqueId"
          element={<PublicProfile />}
        />

        {/* DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* PROFILE */}
        <Route
          path="/dashboard/profile"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <EditProfile />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/leads"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Leads />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/products-services"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <ProductAndServices />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/analytics"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Analytics />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />
      </Routes>

    </BrowserRouter>
  );
};

export default AppRoutes;