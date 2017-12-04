import React from "react";
import withRedux from "next-redux-wrapper";

import { initStore } from "../../store";
import Logout from "../../components/Logout";

const mapStateToProps = state => ({
  isLoggedIn: state.user.userId !== -1
});

const mapDispatchToProps = dispatch => ({
  logout: () =>
    dispatch({
      type: "LOGOUT"
    })
});

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(
  props => <Logout {...props} />
);
