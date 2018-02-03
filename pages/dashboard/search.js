import React from "react";
import withRedux from "next-redux-wrapper";
import DashboardWrapper from "../../components/DashboardWrapper";
import Head from "../../components/Head.js";
import Search from "../../components/dashboard/search";
import { initStore } from "../../store";
import { search } from "../../actions/api";

const mapStateToProps = state => ({
  isLoading: state.search.isLoading,
  error: state.search.error,
  results: state.search.results,
});

const mapDispatchToProps = dispatch => ({
  search: (...args) => dispatch(search(...args)),
});

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(props => (
  <Head>
    <DashboardWrapper {...props}>
      <Search {...props} />
    </DashboardWrapper>
  </Head>
));
