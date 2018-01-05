import React from "react";

export default ({ children }) => (
  <div
    style={{
      display: "flex",
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh"
    }}
  >
    {children}
  </div>
);
