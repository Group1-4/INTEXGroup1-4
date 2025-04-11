import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "./Authorizeview";

export function RequireRole({ role, children }: { role: string; children: React.ReactNode }) {
  const user = useContext(UserContext);

  // 1. Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 2. Logged in but doesn't have required role
  if (!user.roles || !user.roles.includes(role)) {
    return <Navigate to="/403" replace />;
  }

  // 3. Authorized ✅
  return <>{children}</>;
}
