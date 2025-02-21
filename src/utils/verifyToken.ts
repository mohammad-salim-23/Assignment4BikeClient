import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  userId: string;
  role: string;
}

export const verifyToken = (token: string): DecodedToken | null => {
  try {
    return jwtDecode<DecodedToken>(token);
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};
