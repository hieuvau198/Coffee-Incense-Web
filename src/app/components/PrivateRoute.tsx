import { Navigate } from "react-router";
import useAuthStore from "../stores/authStore";
import { Role } from "../models/role";

export default function PrivateRoute({
  children,
  redirectUrl,
  allowedroles,
}: {
  children: any;
  redirectUrl: string;
  allowedroles: Role[];
}) {
  const auth = useAuthStore((state: any) => state);

  // Check if the user is authenticated and has allowed role to access the route
  return auth?.isAuthenticated && allowedroles.includes(auth.role) ? (
    <>{children}</>
  ) : (
    <Navigate to={redirectUrl} />
  );
}
