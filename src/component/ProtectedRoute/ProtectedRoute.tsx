import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";


import { ReactNode } from "react";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const currentUser = useSelector(selectCurrentUser);
  const navigate = useNavigate();

  if (!currentUser) {
    navigate("/login");
    return null; 
  }

  return children; 
};

export default ProtectedRoute;
