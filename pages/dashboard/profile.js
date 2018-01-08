import React from "react";
import withRedux from "next-redux-wrapper";
import DashboardWrapper from "../../components/DashboardWrapper";
import Head from "../../components/Head.js";
import HWCenterWrapper from "../../components/HVCenterWrapper";
import Profile from "../../components/dashboard/profile";
import { initStore } from "../../store";
import { updateUser, getBranches } from "../../actions/api";

const mapDispatchToProps = dispatch => ({
  updateUser: (...args) => dispatch(updateUser(...args)),
  getBranches: (...args) => dispatch(getBranches(...args))
});

const mapStateToProps = state => ({
  isLoading: state.user.isLoading,
  error: state.user.error,
  success: state.user.userId !== -1
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