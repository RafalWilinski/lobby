import React from "react";
import withRedux from "next-redux-wrapper";
import DashboardWrapper from "../../components/DashboardWrapper";
import Head from "../../components/Head.js";
import { initStore } from "../../store";
import Dashboard from "../../components/dashboard/index";
import { getTheses, getApplications } from "../../actions/api";

const mapStateToProps = state => ({
  isLoading: state.theses.isLoading || state.applications.isLoading,
  error: state.theses.error ? state.theses.error : state.applications.error,
  theses: state.theses.data,
  applications: state.applications.data
});

const mapDispatchToProps = dispatch => ({
  getTheses: (...args) => dispatch(getTheses(...args)),
  getApplications: (...args) => dispatch(getApplications(...args))
});

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(
  props => (
    <Head>
      <DashboardWrapper {...props}>
        <Dashboard {...props} />
      </DashboardWrapper>
    </Head>
  )
);
