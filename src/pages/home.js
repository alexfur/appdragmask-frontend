import React from "react";
import { Segment, Header } from "semantic-ui-react";
import Configuration from "../components/configuration";

const Home = () => {
  return (
    <Segment basic>
      <Header as="h1">AppDragMask</Header>
      <div>
        <Header color="grey" as="h4">
          Put your AppDrag site at a custom domain
        </Header>
      </div>
      <Configuration />
    </Segment>
  );
};

export default Home;
