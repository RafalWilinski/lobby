import React from "react";
import withRedux from "next-redux-wrapper";
import DashboardWrapper from "../../components/DashboardWrapper";
import Head from "../../components/Head.js";
import Search from "../../components/dashboard/search";
import { initStore } from "../../store";
import { search, getBranches, getSkills } from "../../actions/api";

const mapStateToProps = state => ({
  isLoading: state.search.isLoading,
  error: state.search.error,
  results: state.search.results,
  myBranches: state.branches.data,
  mySkills: state.skills.data
});

const mapDispatchToProps = dispatch => ({
  search: (...args) => dispatch(search(...args)),
  getMyBranches: (...args) => dispatch(getBranches(...args)),
  getMySkills: (...args) => dispatch(getSkills(...args))
});

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(props => (
  <Head>
    <DashboardWrapper {...props}>
      <Search {...props} />
    </DashboardWrapper>
  </Head>
));
