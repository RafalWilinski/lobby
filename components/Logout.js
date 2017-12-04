import React from "react";
import Router from "next/router";
import { BarLoader } from "react-spinners";
import HVCenterWrapper from "./HVCenterWrapper";

class Logout extends React.PureComponent {
  componentDidMount() {
    localStorage.removeItem("user");
    this.props.logout();
  }

  render() {
    if (!this.props.isLoggedIn) {
      Router.push({
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
