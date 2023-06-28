import {
  HomeOutlined,
  MailOutlined,
  LoginOutlined,
  LogoutOutlined,
  ReadOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { UserContext } from "../contexts/User";
import { useNavigate } from "react-router-dom";

export const NavBar = () => {
  const [current, setCurrent] = useState("");
  const { setLoggedInUser, isLoggedIn } = useContext(UserContext);
  const LoggedInCheck = JSON.parse(localStorage.getItem("isLoggedIn"));
  const navigate = useNavigate();

  const routeChange = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("isLoggedIn");
    setLoggedInUser({ username: undefined });
    alert("You are now logged out.");
    routeChange("/");
  };

  const itemsLoggedIn = [
    {
      label: <Link to="/guidelines">Home</Link>,
      key: "home",
      icon: <HomeOutlined />,
    },
    {
      label: <Link to="/myguidelines">My Guidelines</Link>,
      key: "myguidelines",
      icon: <ReadOutlined />,
    },
    {
      label: <Link to="/myapprovals">My Approvals</Link>,
      key: "myapprovals",
      icon: <PlusCircleOutlined />,
    },
    {
      label: <Link to="/contact">Contact</Link>,
      key: "contact",
      icon: <MailOutlined />,
    },
    {
      label: `Log out`,
      key: "log-out",
      icon: <LogoutOutlined />,
      onClick: handleLogout,
    },
  ];

  const itemsLoggedOut = [
    {
      label: <Link to="/">Please Login</Link>,
      key: "login",
      icon: <LoginOutlined />,
    },
    {
      label: <Link to="/contact">Contact</Link>,
      key: "contact",
      icon: <MailOutlined />,
    },
  ];

  const onClick = (event) => {
    setCurrent(event.key);
  };

  if (isLoggedIn === true || JSON.parse(LoggedInCheck) === true) {
    return (
      <nav>
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={itemsLoggedIn}
          theme="dark"
        />
        <br />
      </nav>
    );
  } else {
    return (
      <nav>
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={itemsLoggedOut}
          theme="dark"
        />
        <br />
      </nav>
    );
  }
};
