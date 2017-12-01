import React from "react";
import withRedux from "next-redux-wrapper";
import RegisterForm from "../components/RegisterForm";
import Head from "../components/Head.js";
import HWCenterWrapper from "../components/HVCenterWrapper";
import { initStore } from "../store";
import { register } from "../actions/api";

const mapStateToProps = state => ({
  error: state.user.error,
  isLoading: state.user.isLoading,
  success: state.user.userId !== -1,
});

const mapDispatchToProps = dispatch => ({
  register: (...args) => dispatch(register(...args))
});

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(props => (
  <Head>
    <HWCenterWrapper>
      <RegisterForm {...props} />
    </HWCenterWrapper>
  </Head>
));
