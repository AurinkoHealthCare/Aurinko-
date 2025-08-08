import { useEffect, useState } from "react";
import axios from "../api/axios";
import { Navigate } from "react-router-dom";
import HorizontalBounceLoader from "./loader";

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

  if (loading) {
  return (
    <>
    <HorizontalBounceLoader />
    </>
  );
}


  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default PrivateRoute;
