import React from "react";
import withRedux from "next-redux-wrapper";
import DashboardWrapper from "../../components/DashboardWrapper";
import Head from "../../components/Head.js";
import HWCenterWrapper from "../../components/HVCenterWrapper";
import { initStore } from "../../store";

export default withRedux(initStore, null, null)(props => (
  <Head>
    <HWCenterWrapper>
      <DashboardWrapper {...props}>
        <h1>Profile</h1>
      </DashboardWrapper>
    </HWCenterWrapper>
  </Head>
));
