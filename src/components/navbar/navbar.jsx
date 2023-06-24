import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, Space } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  LoginOutlined,
  UserAddOutlined,
  PlusOutlined,
  UnorderedListOutlined,
  OrderedListOutlined,
  BookOutlined,
} from "@ant-design/icons";
import { ModalContext } from "../../context/provider/modal.provider";

export default function Navbar() {
  const location = useLocation();
  const { setModalState } = useContext(ModalContext);
  const [tabKey, setTabKey] = useState("");

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.setItem("currentUser", null);
    navigate("/");
  };

  const handleClickMenu = (event) => {
    navigate(`/${event.key}`);
  };

  const handleClickUser = (event) => {
    setModalState({ type: event.key, state: true });
  };

  const menuStyling = {
    width: 300,
    display: "flex",
    justifyContent: "end",
    alignItems: "center",
    backgroundColor: "whitesmoke",
  };

  const techMenuItem = [
    {
      label: "Order List",
      key: "tech-list",
      icon: <OrderedListOutlined />,
    },
    {
      label: "My Order",
      key: "list",
      icon: <UnorderedListOutlined />,
    },
  ];

  const customerMenuItem = [
    {
      label: "Add Order",
      key: "add",
      icon: <PlusOutlined />,
    },
    {
      label: "My Order",
      key: "list",
      icon: <UnorderedListOutlined />,
    },
  ];

  const userMenuItem = [
    {
      label: `${currentUser?.username}`,
      key: "User",
      icon: <UserOutlined />,
      children: [
        {
          label: "Log out",
          key: "log-out",
          icon: <LogoutOutlined />,
        },
      ],
    },
  ];

  const menuItem = [
    {
      label: "Login",
      key: "Login",
      icon: <LoginOutlined />,
    },
    {
      label: "Register",
      key: "Register",
      icon: <UserAddOutlined />,
    },
  ];

  useEffect(() => {
    setTabKey(location.pathname.substring(1));
  }, [location, location.pathname]);

  return (
    <>
      <Space style={{ height: "100%" }}>
        <h3
          style={{ cursor: "pointer" }}
          onClick={() => handleClickMenu({ key: "" })}
        >
          TechKu
        </h3>
        <Menu
          style={{
            width: 150,
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
            backgroundColor: "whitesmoke",
          }}
          selectedKeys={[tabKey]}
          mode="horizontal"
          items={[
            {
              label: "Article",
              key: "article",
              icon: <BookOutlined />,
            },
          ]}
          onClick={handleClickMenu}
        />
        {currentUser && (
          <Menu
            style={menuStyling}
            selectedKeys={[tabKey]}
            mode="horizontal"
            items={
              currentUser.role === "CUSTOMER" ? customerMenuItem : techMenuItem
            }
            onClick={handleClickMenu}
          />
        )}
      </Space>
      {currentUser ? (
        <Menu
          style={menuStyling}
          mode="horizontal"
          items={userMenuItem}
          onClick={handleLogout}
        />
      ) : (
        <Menu
          style={menuStyling}
          mode="horizontal"
          items={menuItem}
          onClick={handleClickUser}
        />
      )}
    </>
  );
}
