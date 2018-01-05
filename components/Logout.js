import React from "react";
import { BarLoader } from "react-spinners";
import HVCenterWrapper from "./HVCenterWrapper";

class Logout extends React.PureComponent {
  componentDidMount() {
    if (window.localStorage) {
      localStorage.removeItem("user");
      this.props.logout();
    }
  }

  render() {
    if (!this.props.isLoggedIn && this.props.url) {
      this.props.url.push({
        pathname: "/login"
      });
    }

    return (
      <HVCenterWrapper>
        <BarLoader loading color={"#108ee9"} />
      </HVCenterWrapper>
    );
  }
}

export default Logout;
