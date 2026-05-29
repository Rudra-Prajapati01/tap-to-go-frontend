import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Home from "../pages/Home";

// ─── HOME COMPONENTS IMPORTS ─────────────────────────────────────────────────
import Features from "../components/home/Features";
import About from "../components/home/About";
import Products from "../components/home/Products"; // <-- DEDICATED PRODUCTS COMPONENT IMPORT ADDED HERE
// ─────────────────────────────────────────────────────────────────────────────

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

import Contact from "../components/home/Contact";

const AppRoutes = () => {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        {/* ─── DEDICATED FEATURES PAGE ROUTE ─── */}
        <Route
          path="/features"
          element={<Features />}
        />

        {/* ─── DEDICATED ABOUT PAGE ROUTE ─── */}
        <Route
          path="/about"
          element={<About />}
        />
        <Route path="/contact" element={<Contact />} />

        {/* ─── DEDICATED PRODUCTS PUBLIC ROUTE ADDED HERE ─── */}
        <Route
          path="/products"
          element={<Products />}
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

        {/* DYNAMIC BACKEND/EXTERNAL PRODUCT IDENTIFICATION */}
        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />
      </Routes>

    </BrowserRouter>
  );
};

export default AppRoutes;