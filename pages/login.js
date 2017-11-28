import React from "react";
import withRedux from "next-redux-wrapper";
import LoginForm from "../components/LoginForm";
import Head from "../components/Head.js";
import HWCenterWrapper from "../components/HVCenterWrapper";
import { initStore } from "../store";
import { login } from "../actions/user";

const mapDispatchToProps = dispatch => ({
  login: (...args) => login(...args)
});

export default withRedux(initStore, null, mapDispatchToProps)(props => (
  <Head>
    <HWCenterWrapper>
      <LoginForm {...props} />
    </HWCenterWrapper>
  </Head>
));
