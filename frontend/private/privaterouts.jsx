// // // src/components/PrivateRoute.jsx
// // import { Navigate } from "react-router-dom";

// // const PrivateRoute = ({ children, allowedRoles }) => {
// //   const token = localStorage.getItem("token");
// //   const role = localStorage.getItem("role");

// //   if (!token) {
// //     return <Navigate to="/" />;
// //   }

// //   if (!allowedRoles.includes(role)) {
// //     return <Navigate to="/unauthorized" />;  // Show an Unauthorized page
// //   }

// //   return children;
// // };

// // export default PrivateRoute;


// // src/components/PrivateRoute.jsx
// import { Navigate } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";

// const PrivateRoute = ({ children, allowedRoles }) => {
//   const token = localStorage.getItem("token");

//   if (!token) return <Navigate to="/" />;

//   try {
//     const decoded = jwtDecode(token);
//     const userRole = decoded.role;

//     return allowedRoles.includes(userRole) ? children : <Navigate to="/unauthorized" />;
//   } catch (error) {
//     return <Navigate to="/" />;
//   }
// };

// export default PrivateRoute;


import { useEffect, useState } from "react";
import axios from "../api/axios";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, allowedRoles = [] }) => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/auth/me")
      .then(res => {
        setRole(res.data.role);
      })
      .catch(() => {
        setRole(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  if (!role) return <Navigate to="/unauthorized" replace />;

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default PrivateRoute;
