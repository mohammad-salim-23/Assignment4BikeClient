import { useCurrenttoken } from "../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { verifyToken } from "../utils/verifyToken";

const Dashboard = () => {
    const token = useAppSelector(useCurrenttoken);
    const user = token ? verifyToken(token) : null;
    const dispatch = useAppDispatch();
    const Role = user?.role;

    return (
        <div>
            {Role === "admin" ? (
                <h2>Admin Dashboard</h2>
            ) : Role === "user" ? (
                <h2>User Dashboard</h2>
            ) : (
                <h2>Unauthorized Access</h2>
            )}
        </div>
    );
};

export default Dashboard;
