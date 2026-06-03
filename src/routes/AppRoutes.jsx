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
import Products from "../components/home/Products";
import Contact from "../components/home/Contact";
import TeamsBusiness from "../components/home/TeamsBusiness";
// ─────────────────────────────────────────────────────────────────────────────

import Dashboard from "../components/dashboard/Dashboard";
import DashboardLayout from "../components/dashboard/DashboardLayout";

import ProtectedRoute from "./ProtectedRoute";

import PublicProfile from "../pages/PublicProfile";

import EditProfile from "../components/profile/EditProfile";

import Leads from "../components/leads/Leads";

import ProductAndServices from "../components/products-services/ProductAndServices";

import ProductDetails from "../pages/ProductDetails";

import Analytics from "../components/analytics/Analytics";



import AdminLogin from "../admin/pages/AdminLogin";
import AdminDashboard from "../admin/pages/AdminDashboard";
import Users from "../admin/pages/Users";
import AdminLayout from "../admin/layouts/AdminLayout";
import AdminProtectedRoute from "../admin/routes/AdminProtectedRoute";
import ContactRequests
  from "../admin/pages/ContactRequests";

import UserDetails
  from "../admin/pages/UserDetails";
import EditUser from "../admin/pages/EditUser";

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

        <Route
          path="/contact"
          element={<Contact />}
        />

        {/* ─── DEDICATED PRODUCTS PUBLIC ROUTE ─── */}
        <Route
          path="/products"
          element={<Products />}
        />

        {/* ─── DEDICATED TEAMS & BUSINESS ROUTE ADDED HERE ─── */}
        <Route
          path="/teams-business"
          element={<TeamsBusiness />}
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


        {/* ==========================
    ADMIN PANEL
========================== */}

        <Route
          path="/admin"
          element={<AdminLogin />}
        />

        <Route
          path="/admin/dashboard"
          element={
            <AdminProtectedRoute>
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <AdminProtectedRoute>
              <AdminLayout>
                <Users />
              </AdminLayout>
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/users/:id"
          element={
            <AdminProtectedRoute>
              <AdminLayout>
                <UserDetails />
              </AdminLayout>
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/users/edit/:id"
          element={
            <AdminProtectedRoute>
              <AdminLayout>
                <EditUser />
              </AdminLayout>
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/contacts"
          element={
            <AdminProtectedRoute>
              <AdminLayout>
                <ContactRequests />
              </AdminLayout>
            </AdminProtectedRoute>
          }
        />
      </Routes>

    </BrowserRouter>
  );
};

export default AppRoutes;