import React from "react";
import { Card, Tooltip } from "antd";
import Avatar from "./avatar";

const SearchResult = ({ title }) => (
  <Card title={title} style={{ width: "100%" }}>
    <div style={{ display: "flex" }}>
      <img
        src="http://stamfordresearch.com/wp-content/uploads/2016/06/opencv-950x591.jpg"
        style={{ height: "100px" }}
      />
      <div style={{ marginLeft: "20px" }}>
        <p>
          Lorem Ipsum jest tekstem stosowanym jako przykładowy wypełniacz w
          przemyśle poligraficznym. Został po raz pierwszy użyty w XV w. przez
          nieznanego drukarza do wypełnienia tekstem próbnej książki. Pięć
          wieków później zaczął być używany przemyśle elektronicznym, pozostając
          praktycznie niezmienionym.
        </p>
        <h3 style={{ marginTop: "10px" }}>Zespół</h3>
        <div>
          <Avatar
            avatar="http://rwilinski.me/static/profile.67d1d64d.png"
            name="Rafal Wilinski"
            position="Javascript Developer"
          />
          <Avatar
            avatar="https://media-exp2.licdn.com/media/AAEAAQAAAAAAAApoAAAAJDQ1NmYxMjljLWQxNGQtNDI5ZS05NjRlLThjMDg4MDU4YjgzYQ.jpg"
            name="Alek Kubista"
            position="Android Developer"
          />
        </div>
      </div>
    </div>
  </Card>
);

export default SearchResult;
