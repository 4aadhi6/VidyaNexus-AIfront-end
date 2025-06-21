// // src/components/custom/ProtectedRoute.jsx

// import { Navigate } from "react-router-dom";
// import { useAuth } from "@/context/AuthContext";

// const ProtectedRoute = ({ children, allowedRoles = ["admin", "helper"] }) => {
//   const { isAuthenticated, user } = useAuth();

//   // If the user is not logged in at all, redirect to login page.
//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }

//   // =================================================================
//   //  THIS IS THE CRITICAL FIX TO PREVENT THE WHITE PAGE CRASH
//   // =================================================================
//   // If user is authenticated but the user object is somehow missing or their role is not in the allowed list, redirect.
//   // The `user?.role` check safely handles cases where `user` is null or undefined, preventing a crash.
//   if (!user || !allowedRoles.includes(user?.role)) {
//     // Redirect to home page because they are logged in, but not authorized for this route.
//     return <Navigate to="/" replace />;
//   }
//   // =================================================================

//   // If all checks pass, show the protected content.
//   return children;
// };

// export default ProtectedRoute;
// vidyanexus-frontend/src/components/custom/ProtectedRoute.jsx

import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles = ["admin", "helper"] }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Safely checks if user exists and if their role is included in the allowed list
  if (!user || !allowedRoles.includes(user?.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
