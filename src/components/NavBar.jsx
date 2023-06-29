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
  const { setLoggedInUser, isLoggedIn, loggedInUser } = useContext(UserContext);
  const navigate = useNavigate();

  const routeChange = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("isLoggedIn");
    setLoggedInUser({
      username: undefined,
      primaryAccessLevel: undefined,
      secondaryAccessLevel: undefined,
    });
    alert("You are now logged out.");
    routeChange("/");
  };

  const itemsLoggedInAdminOnly = [
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

  const itemsLoggedInApproverOnly = [
    {
      label: <Link to="/guidelines">Home</Link>,
      key: "home",
      icon: <HomeOutlined />,
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

  const itemsLoggedInAuthorEditorOnly = [
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

  if (isLoggedIn === true) {
    if (loggedInUser.primaryAccessLevel.includes("Admin")) {
      return (
        <nav>
          <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={itemsLoggedInAdminOnly}
            theme="dark"
          />
          <br />
        </nav>
      );
    } else if (
      loggedInUser.secondaryAccessLevel.includes("Approver") &&
      loggedInUser.secondaryAccessLevel.length === 1
    ) {
      return (
        <nav>
          <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={itemsLoggedInApproverOnly}
            theme="dark"
          />
          <br />
        </nav>
      );
    } else if (
      loggedInUser.secondaryAccessLevel.includes("Approver") &&
      loggedInUser.secondaryAccessLevel.includes("Editor")
    ) {
      return (
        <nav>
          <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={itemsLoggedInAdminOnly}
            theme="dark"
          />
          <br />
        </nav>
      );
    } else if (
      loggedInUser.secondaryAccessLevel.includes("Author") ||
      loggedInUser.secondaryAccessLevel.includes("Editor") ||
      loggedInUser.secondaryAccessLevel.includes("Q.C")
    ) {
      return (
        <nav>
          <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={itemsLoggedInAuthorEditorOnly}
            theme="dark"
          />
          <br />
        </nav>
      );
    }
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
