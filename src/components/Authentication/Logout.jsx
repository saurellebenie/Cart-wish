import React, { useEffect } from "react";
import { logout } from "../../services/userService";

const Logout = () => {
  useEffect(() => {
    logout();
    window.location = "/";
  }, []);
  return null;
};

export default Logout;
