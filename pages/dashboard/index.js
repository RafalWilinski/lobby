import React from "react";
import withRedux from "next-redux-wrapper";
import DashboardWrapper from "../../components/DashboardWrapper";
import Head from "../../components/Head.js";
import { initStore } from "../../store";
import Dashboard from "../../components/dashboard/index";

export default withRedux(initStore, null, null)(props => (
  <Head>
    <DashboardWrapper {...props}>
      <Dashboard {...props} />
    </DashboardWrapper>
  </Head>
));
