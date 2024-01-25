import React from "react";
import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const { Content, Sider } = Layout;

const Home = ({ children }) => {
  const navigate = useNavigate();

  const borderRadiusLG = "8px";

  const handleList = () => {
    navigate("/view");
  };

  return (
    <Layout>
      <Sider
        style={{
          backgroundColor: "#222",
          padding: "16px",
          minHeight: "100vh",
        }}
      >
        <div className="demo-logo-vertical" />

        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          style={{ backgroundColor: "#222", color: "white" }}
        >
          <Menu.Item
            id="1"
            onClick={handleList}
            style={{ border: "4px solid black" }}
          >
            View
          </Menu.Item>

          <Menu.Item
            id="2"
            onClick={() => navigate("/upload")}
            style={{ border: "4px solid black" }}
          >
            Bulk Upload
          </Menu.Item>
          <Menu.Item
            id="3"
            onClick={() => navigate("/bulk-list")}
            style={{ border: "4px solid black" }}
          >
            Bulk Upload Listing
          </Menu.Item>
          <Menu.Item
            id="4"
            onClick={() => {
              localStorage.removeItem("authToken");
              navigate("/");
            }}
            style={{ border: "4px solid black" }}
          >
            logout
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout style={{ margin: 0, padding: 0 }}>
        <Content>
          <div
            style={{
              margin: 0,
              padding: 0,
              minHeight: "100vh",
              background: "#ccc",
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
Home.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Home;
