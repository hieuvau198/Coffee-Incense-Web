import { Layout } from "antd";
import { Outlet } from "react-router";
import Sidebar from "./partials/Sidebar";
import AdminHeader from "./partials/AdminHeader";

const AdminLayout = () => {
  return (
    <Layout className="h-screen">
      <Sidebar />
      <Layout className="overflow-y-scroll small-scrollbar border-l border-zinc-400 bg-secondary/30">
        <Layout.Header className="p-4 bg-white flex justify-between items-center border-b border-zinc-300">
          <AdminHeader />
        </Layout.Header>
        <div className="mx-14 my-10">
          <Outlet />
        </div>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
