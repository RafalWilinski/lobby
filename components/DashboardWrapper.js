import { Layout, Menu, Icon } from "antd";
import Link from "next/link";
import Router from "next/router";
import { BarLoader } from "react-spinners";

import HVCenterWrapper from "./HVCenterWrapper";
import Search from "../pages/dashboard/search";

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class Dashboard extends React.Component {
  state = {
    collapsed: false,
    currentPanel: null,
    selectedKey: "0"
  };

  navItems = [
    {
      name: "Panel Główny",
      href: "/dashboard",
      icon: "pie-chart"
    },
    {
      name: "Wyszukiwarka Tematów",
      href: "/dashboard/search",
      icon: "desktop"
    },
    {
      name: "Zglos temat",
      href: "/dashboard/topic",
      icon: "user"
    },
    {
      name: "Ustawienia",
      href: "/dashboard/profile",
      icon: "setting"
    },
    {
      name: "Wyloguj",
      href: "/dashboard/logout",
      icon: "logout"
    }
  ];

  componentDidMount() {
    Router.onRouteChangeStart = url => {
      this.setState({
        isLoading: true
      });
    };

    Router.onRouteChangeComplete = () => this.setState({ isLoading: false });
    Router.onRouteChangeError = () => this.setState({ isLoading: false });
  }

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  renderNavItem({ name, icon, href, action }, key) {
    return (
      <Menu.Item key={key}>
        <Icon type={icon} />
        <span>
          <a style={{ color: "white" }}>{name}</a>
        </span>
      </Menu.Item>
    );
  }

  getCurrentKey() {
    let key = 0;

    this.navItems.forEach((item, index) => {
      if (
        typeof window === "object" &&
        item.href === window.location.pathname
      ) {
        key = index;
      }
    });

    return String(key);
  }

  render() {
    if (typeof localStorage === "object" && !localStorage.getItem("user")) {
      Router.push({
        pathname: "/login"
      });
    }

    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" />
          <Menu
            theme="dark"
            selectedKeys={[this.getCurrentKey()]}
            mode="inline"
            onSelect={e => {
              Router.push({
                pathname: this.navItems[e.key].href
              });

              this.setState({
                selectedKey: e.key
              });
            }}
          >
            {this.navItems.map(this.renderNavItem)}
          </Menu>
        </Sider>
        {this.state.isLoading ? (
          <HVCenterWrapper>
            <BarLoader loading color={"#108ee9"} />
          </HVCenterWrapper>
        ) : (
          this.props.children
        )}
      </Layout>
    );
  }
}

export default Dashboard;
