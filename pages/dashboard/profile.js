import React from "react";
import withRedux from "next-redux-wrapper";
import DashboardWrapper from "../../components/DashboardWrapper";
import Head from "../../components/Head.js";
import HWCenterWrapper from "../../components/HVCenterWrapper";
import Profile from "../../components/dashboard/profile";
import { initStore } from "../../store";
import { updateUser, getBranches, getSkills } from "../../actions/api";

const mapStateToProps = state => ({
  isLoading: state.user.isLoading || state.branches.isLoading || state.skills.isLoading,
  error: state.user.error && state.branches.error && state.skills.error,
  success: state.user.data && !state.user.error && !state.branches.error && !state.skills.error,
  myBranches: state.branches.data,
  mySkills: state.skills.data
});

const mapDispatchToProps = dispatch => ({
  updateUser: (...args) => dispatch(updateUser(...args)),
  getMyBranches: (...args) => dispatch(getBranches(...args)),
  getMySkills: (...args) => dispatch(getSkills(...args))
});

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(props => (
  <Head>
    <HWCenterWrapper>
      <DashboardWrapper {...props}>
        <Profile {...props}/>
      </DashboardWrapper>
    </HWCenterWrapper>
  </Head>
));