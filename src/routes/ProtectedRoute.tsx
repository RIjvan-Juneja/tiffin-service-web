import { AccessAttributes, useAccess } from "@features/access";
import { useUserStore } from "@features/user";
import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  attribute?: keyof AccessAttributes;
  level?: "project" | "organization" | "customer";
  feature?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  attribute,
  level,
  feature,
}) => {
  const { checkAccess } = useAccess();
  const features = useUserStore((state) => state.features);

  if (attribute && !checkAccess({ attribute, level })) {
    return <Navigate to="/no-access" replace />;
  }

  if (feature && !features[feature]) {
    return <Navigate to="/no-access" replace />;
  }

  return <Outlet />;
};
