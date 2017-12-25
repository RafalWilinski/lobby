import React from "react";
import withRedux from "next-redux-wrapper";

import DashboardWrapper from "../../components/DashboardWrapper";
import Head from "../../components/Head.js";
import HWCenterWrapper from "../../components/HVCenterWrapper";
import Topic from "../../components/dashboard/topic";
import { initStore } from "../../store";
import { createThesis } from "../../actions/api";

const mapStateToProps = state => ({
  isLoading: state.createThesis.isLoading,
  error: state.createThesis.error
});

const mapDispatchToProps = dispatch => ({
  create: (...args) => dispatch(createThesis(...args))
});

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(
  props => (
    <Head>
      <HWCenterWrapper>
        <DashboardWrapper {...props}>
          <Topic {...props} />
        </DashboardWrapper>
      </HWCenterWrapper>
    </Head>
  )
);
