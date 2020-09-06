import React from "react";
import { Segment, List } from "semantic-ui-react";

const Navbar = () => {
  return (
    <Segment basic>
      <List reversed horizontal style={{ width: "100%" }}>
        <List.Item style={{ float: "left" }}>AppDragMask</List.Item>
        <List.Item style={{ float: "right" }}>About</List.Item>
      </List>
    </Segment>
  );
};

export default Navbar;
