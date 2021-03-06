import React from "react";
import { Card, Tooltip, Tag } from "antd";
import Avatar from "./avatar";
import Router from "next/router";

const SearchResult = ({ id, title, description, roles, branches, url }) => (
  <a href={`/dashboard/topic/${id}`} style={{color: 'black'}}>
    <Card
      title={title}
      style={{ width: "100%", margin: "10px 0", cursor: "pointer" }}
    >
      <div style={{ display: "flex" }}>
        <img style={{ height: "100px" }} />
        <div style={{ marginLeft: "20px" }}>
          <p style={{ marginBottom: "10px" }}>{description}</p>
          {branches.map(branch => (
            <Tag key={`${branch.id}_${id}_${branch.branchName}`}>
              {branch.branchName}
            </Tag>
          ))}
          <h3 style={{ margin: "10px 0 5px" }}>Zespół</h3>
          {roles.map(role => (
            <Avatar
              avatar="http://s3.amazonaws.com/37assets/svn/765-default-avatar.png"
              name={role.userLogin ? role.userLogin : "Pozycja Wolna!"}
              position={role.name}
              key={`${role.name}_${role.id}`}
            />
          ))}
          {/* </div> */}
        </div>
      </div>
    </Card>
  </a>
);

export default SearchResult;
