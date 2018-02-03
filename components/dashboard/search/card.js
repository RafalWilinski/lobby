import React from "react";
import { Card, Tooltip } from "antd";
import Avatar from "./avatar";

const SearchResult = ({ id, title, description, roles, url }) => (
  <Card title={title} style={{ width: "100%", margin: '10px 0', cursor: 'pointer' }} onClick={() => {
      url.push({
        pathname: `/dashboard/topic/${id}`
      });
    }}
  >
    <div style={{ display: "flex" }}>
      <img
        style={{ height: "100px" }}
      />
      <div style={{ marginLeft: "20px" }}>
        <p>{description}</p>
        <h3 style={{ marginTop: "10px" }}>Zespół</h3>
        <div>
          {roles.map((role) => 
            <Avatar
              avatar="http://s3.amazonaws.com/37assets/svn/765-default-avatar.png"
              name={role.userLogin ? role.userLogin : 'Pozycja Wolna!'}
              position={role.name}
              key={`${role.name}_${role.id}`}
            />
          )}
        </div>
      </div>
    </div>
  </Card>
);

export default SearchResult;
