import useAuthStore from "@/app/stores/authStore";
import { Role } from "@/app/models/role";
import { Breadcrumb } from "antd";
import { Link, useLocation } from "react-router";
import ProfileDropdown from "@/app/components/ProfileDropdown";

const DashboardHeader = () => {
  const location = useLocation();
  const { role } = useAuthStore();
  const isAdmin = role === Role.ADMIN;

  // Set base path based on user role
  const basePath = isAdmin ? "/admin" : "/employee";
  const [path, id] = location.pathname.split("/").slice(2);
  const items = [
    {
      title: <Link to={`${basePath}/${path}`}>{path}</Link>,
    },
    // only return id breadcrumb if currently in the detail page
    ...(id
      ? [{ title: <Link to={`${basePath}/${path}/${id}`}>{id}</Link> }]
      : []),
  ];

  return (
    <div className="flex flex-wrap justify-between items-center w-full">
      <Breadcrumb
        className="my-4 capitalize font-bold text-base"
        items={items}
      />
      <div className="flex gap-4">
        <ProfileDropdown />
      </div>
    </div>
  );
};

export default DashboardHeader;
