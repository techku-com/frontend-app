import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Space } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  LoginOutlined,
  UserAddOutlined,
  PlusOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { ModalContext } from "../../context/provider/modal.provider";

export default function Navbar() {
  const { setModalState } = useContext(ModalContext);

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
    width: 250,
    height: "10vh",
    display: "flex",
    justifyContent: "end",
    alignItems: "center",
    backgroundColor: "whitesmoke",
  };

  const techMenuItem = [
    {
      label: "Order List",
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

  return (
    <>
      <Space style={{ height: "100%" }}>
        <h3 style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
          Brand Here
        </h3>
        {currentUser && (
          <Menu
            style={menuStyling}
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
