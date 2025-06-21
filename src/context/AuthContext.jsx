// // src/context/AuthContext.jsx

// import { createContext, useContext, useState } from "react";
// import api from "../lib/api";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   // =================================================================
//   //  THIS IS THE CRITICAL FIX FOR THE "JSON.parse(undefined)" CRASH
//   // =================================================================
//   const getInitialUser = () => {
//     try {
//       const storedUser = localStorage.getItem("user");
//       // If there's a stored user, parse it. Otherwise, return null.
//       // This prevents JSON.parse(null) or JSON.parse(undefined).
//       return storedUser ? JSON.parse(storedUser) : null;
//     } catch (error) {
//       // If the stored data is corrupted JSON, remove it and return null.
//       console.error("Failed to parse user from localStorage", error);
//       localStorage.removeItem("user");
//       return null;
//     }
//   };

//   const [user, setUser] = useState(getInitialUser());
//   // =================================================================

//   const [loading, setLoading] = useState(false);

//   const login = async (email, password) => {
//     setLoading(true);
//     try {
//       const { data } = await api.post("/auth/login", { email, password });
//       if (data.success) {
//         // Make sure data.data is an object before setting it.
//         if (typeof data.data === "object" && data.data !== null) {
//           localStorage.setItem("user", JSON.stringify(data.data));
//           setUser(data.data);
//         } else {
//           // This is a safety net in case the backend API has a bug.
//           throw new Error("Received invalid user data from server.");
//         }
//       }
//       return data;
//     } catch (error) {
//       if (error.response) {
//         console.error("Server Error:", error.response.data);
//         return error.response.data;
//       } else if (error.request) {
//         console.error("Network Error:", error.request);
//         return {
//           success: false,
//           message: "Cannot connect to the server. It seems to be offline.",
//         };
//       } else {
//         console.error("Unexpected Error:", error.message);
//         return {
//           success: false,
//           message: `An unexpected application error occurred: ${error.message}`,
//         };
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const logout = () => {
//     // This part is fine, but the startup logic was the problem.
//     localStorage.removeItem("user");
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider
//       value={{ user, login, logout, loading, isAuthenticated: !!user }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
// src/context/AuthContext.jsx

import { createContext, useContext, useState } from "react";
import api from "../lib/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const getInitialUser = () => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem("user");
      return null;
    }
  };

  const [user, setUser] = useState(getInitialUser());
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const { data } = await api.post("/auth/login", { email, password });
      if (data.success && typeof data.data === "object" && data.data !== null) {
        localStorage.setItem("user", JSON.stringify(data.data));
        setUser(data.data);
      } else {
        throw new Error("Received invalid user data from server.");
      }
      return data;
    } catch (error) {
      if (error.response) {
        return error.response.data;
      } else if (error.request) {
        return {
          success: false,
          message: "Cannot connect to the server. It seems to be offline.",
        };
      } else {
        return {
          success: false,
          message: `An unexpected application error occurred: ${error.message}`,
        };
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, loading, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Consistent export for Vite HMR
function useAuth() {
  return useContext(AuthContext);
}

export { useAuth };
