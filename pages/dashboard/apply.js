import React from "react";
import withRedux from "next-redux-wrapper";
import DashboardWrapper from "../../components/DashboardWrapper";
import Head from "../../components/Head.js";
import HWCenterWrapper from "../../components/HVCenterWrapper";
import Apply from "../../components/dashboard/apply";
import { initStore } from "../../store";

export default withRedux(initStore, null, null)(props => (
  <Head>
    <HWCenterWrapper>
      <DashboardWrapper {...props}>
        <Apply />
      </DashboardWrapper>
    </HWCenterWrapper>
  </Head>
));
