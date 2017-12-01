import React from "react";
import withRedux from "next-redux-wrapper";
import LoginForm from "../components/LoginForm";
import Head from "../components/Head.js";
import HWCenterWrapper from "../components/HVCenterWrapper";
import { initStore } from "../store";
import { login } from "../actions/api";

const mapStateToProps = state => ({
  error: state.user.error,
  isLoading: state.user.isLoading,
  success: state.user.userId !== -1
});

const mapDispatchToProps = dispatch => ({
  login: (...args) => dispatch(login(...args))
});

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(
  props => (
    <Head>
      <HWCenterWrapper>
        <LoginForm {...props} />
      </HWCenterWrapper>
    </Head>
  )
);
