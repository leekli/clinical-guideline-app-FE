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
import { UserContext } from "../../contexts/User";
import { useNavigate } from "react-router-dom";

export const NavBar = () => {
  const [current, setCurrent] = useState("");
  const { setLoggedInUser, isLoggedIn, loggedInUser } = useContext(UserContext);
  const navigate = useNavigate();

  const routeChange = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    setLoggedInUser({
      username: undefined,
      primaryAccessLevel: undefined,
      secondaryAccessLevel: undefined,
    });
    alert("You are now logged out.");
    routeChange("/");
  };

  const menuItemAllGuidelines = {
    label: <Link to="/guidelines">Home: All Guidelines</Link>,
    key: "home",
    icon: <HomeOutlined />,
  };

  const menuItemMyGuidelinesWorkspace = {
    label: <Link to="/myguidelines">My Guidelines Workspace</Link>,
    key: "myguidelines",
    icon: <ReadOutlined />,
  };

  const menuItemMyApprovalsWorkspace = {
    label: <Link to="/myapprovals">My Approvals Workspace</Link>,
    key: "myapprovals",
    icon: <PlusCircleOutlined />,
  };

  const menuItemLogoutButton = {
    label: `Log out`,
    key: "log-out",
    icon: <LogoutOutlined />,
    onClick: handleLogout,
  };

  const menuItemPleaseLoginButton = {
    label: <Link to="/">Please Login</Link>,
    key: "login",
    icon: <LoginOutlined />,
  };

  const itemsLoggedInAdminOnly = [
    menuItemAllGuidelines,
    menuItemMyGuidelinesWorkspace,
    menuItemMyApprovalsWorkspace,
    menuItemLogoutButton,
  ];

  const itemsLoggedInApproverOnly = [
    menuItemAllGuidelines,
    menuItemMyApprovalsWorkspace,
    menuItemLogoutButton,
  ];

  const itemsLoggedInAuthorEditorOnly = [
    menuItemAllGuidelines,
    menuItemMyGuidelinesWorkspace,
    menuItemLogoutButton,
  ];

  const itemsLoggedInViewerOnly = [menuItemAllGuidelines, menuItemLogoutButton];

  const itemsLoggedOut = [menuItemPleaseLoginButton];

  const onClick = (event) => {
    setCurrent(event.key);
  };

  if (isLoggedIn === true && loggedInUser.username !== undefined) {
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
      loggedInUser.secondaryAccessLevel.includes("Viewer") &&
      loggedInUser.secondaryAccessLevel.length === 1
    ) {
      return (
        <nav>
          <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={itemsLoggedInViewerOnly}
            theme="dark"
          />
          <br />
        </nav>
      );
    } else if (
      loggedInUser.secondaryAccessLevel.includes("Approver") &&
      loggedInUser.secondaryAccessLevel.includes("Q.C")
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
