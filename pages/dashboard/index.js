import React from "react";
import withRedux from "next-redux-wrapper";
import DashboardWrapper from "../../components/DashboardWrapper";
import Head from "../../components/Head.js";
import { initStore } from "../../store";
import Dashboard from "../../components/dashboard/index";
import { getTheses } from "../../actions/api";

const mapStateToProps = state => ({
  isLoading: state.theses.isLoading,
  error: state.theses.error,
  theses: state.theses.data
});

const mapDispatchToProps = dispatch => ({
  get: (...args) => dispatch(getTheses(...args))
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
