import React from 'react'
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import carga from "../../img/carga.gif"

export function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <img src={carga} alt="Loading" />;

  if (!user) return <Navigate to="/login" />;

  return <>{children}</>;
}