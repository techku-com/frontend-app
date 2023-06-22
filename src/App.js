import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { App, ConfigProvider, Layout } from "antd";
import React from "react";
import ModalProvider from "./context/provider/modal.provider";
import ActionModal from "./components/modal/action-modal";
import Navbar from "./components/navbar/navbar";
import BottomNavbar from "./components/footer/footer";
import Home from "./pages/home/Home";
import AddPage from "./pages/add/Add";
import ListPage from "./pages/list/list";
import TechListPage from "./pages/list/tech-list";

export default function ClientApp() {
  const PageLayout = () => {
    const { Header, Content, Footer } = Layout;
    return (
      <ConfigProvider>
        <ModalProvider>
          <App>
            <GoogleOAuthProvider clientId="908448360716-fk3f0spgnst2slj70lehjfmpacncvltd.apps.googleusercontent.com">
              <Layout>
                <Header
                  style={{
                    position: "sticky",
                    top: 0,
                    left: 0,
                    zIndex: 1,
                    height: "10vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: "whitesmoke",
                  }}
                >
                  <Navbar />
                </Header>
                <Content
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "77vh",
                    backgroundColor: "#eeeeee",
                  }}
                >
                  <Outlet />
                </Content>
                <Footer
                  style={{
                    padding: "0 50px",
                    height: "10vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "whitesmoke",
                  }}
                >
                  <BottomNavbar />
                </Footer>
              </Layout>
            </GoogleOAuthProvider>
            <ActionModal />
          </App>
        </ModalProvider>
      </ConfigProvider>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <PageLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/add",
          element: <AddPage />,
        },
        {
          path: "/list",
          element: <ListPage />,
        },
        {
          path: "/tech-list",
          element: <TechListPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
