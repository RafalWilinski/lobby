import React from "react";
import withRedux from "next-redux-wrapper";
import Dashboard from "../components/Dashboard";
import Head from "../components/Head.js";
import HWCenterWrapper from "../components/HVCenterWrapper";
import { initStore } from "../store";
import { login } from "../actions/api";

export default withRedux(initStore, null, null)(props => (
  <Head>
    <HWCenterWrapper>
      <Dashboard {...props} />
    </HWCenterWrapper>
  </Head>
));
