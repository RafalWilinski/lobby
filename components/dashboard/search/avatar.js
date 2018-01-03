import React from "react";
import { Tooltip } from "antd";

export default ({ name, position, avatar }) => (
  <Tooltip title={`${name} - ${position}`}>
    <img
      style={{
        height: "40px",
        borderRadius: "50%",
        marginRight: "-8px",
        boxShadow: "1px 2px 2px 1px #aaaaaa"
      }}
      src={avatar}
    />
  </Tooltip>
);
