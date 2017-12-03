import React from "react";
import withRedux from "next-redux-wrapper";
import DashboardWrapper from "../../components/DashboardWrapper";
import Head from "../../components/Head.js";
import Search from "../../components/dashboard/search";
import { initStore } from "../../store";

export default withRedux(initStore, null, null)(props => (
  <Head>
    <DashboardWrapper {...props}>
      <Search {...props} />
    </DashboardWrapper>
  </Head>
));
