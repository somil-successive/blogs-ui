import React from "react";
import { UploadOutlined, EyeOutlined } from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

const {Content,Sider } = Layout;

const items = [
  {
    id: 1,
    icon: React.createElement(EyeOutlined),
    label: "list",
  },
  {
    id: 2,
    icon: React.createElement(UploadOutlined),
    label: "upload",
  },
];

const Home = ({ children }) => {
  const navigate = useNavigate();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleList = () => {
    navigate("/view");
  };

  return (
    <Layout>
      <Sider>
        <div className="demo-logo-vertical" />

        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item onClick={handleList}>View</Menu.Item>

          <Menu.Item onClick={() => navigate("/upload")}>Bulk Upload</Menu.Item>
          <Menu.Item onClick={() => navigate("/bulk-list")}>
            Bulk Upload Listing
          </Menu.Item>
          <Menu.Item onClick={() => navigate("/")}>logout</Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              margin: 0,
              padding: 24,
              minHeight: 700,
              background: colorBgContainer,
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
// Home.propTypes = {
//   children: PropTypes.node.isRequired,
// };

export default Home;
