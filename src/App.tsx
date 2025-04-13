import { BrowserRouter } from "react-router";
import { App as AntApp, ConfigProvider } from "antd";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MainRoutes from "./app/routes/MainRoutes";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { refetchOnWindowFocus: false } },
  });

  return (
    <BrowserRouter>
      <AntApp component={false}>
        <ConfigProvider
          tag={{ className: "text-[14px] font-semibold py-1 px-2" }}
          // componentSize="large"
          theme={{
            token: {
              fontFamily: "'Poppins', 'Bai Jamjuree', sans-serif",
              colorPrimary: "#5E4529", // coffee-medium
              colorLink: "#A67C52", // coffee-light
              colorLinkHover: "#3C280D", // coffee-dark
              borderRadius: 6,
              colorBgContainer: "#FFF9F0", // bg-primary
              colorBgBase: "#FFF9F0", // bg-primary
              colorTextBase: "#2B1D0E", // text-dark
              colorBorder: "#E3D0B9", // coffee-cream
              colorError: "#A45C41", // cinnamon
              colorSuccess: "#00b96b",
              colorWarning: "#C68E55", // caramel
            },
          }}
        >
          <QueryClientProvider client={queryClient}>
            <MainRoutes />
          </QueryClientProvider>
        </ConfigProvider>
      </AntApp>
    </BrowserRouter>
  );
}

export default App;
