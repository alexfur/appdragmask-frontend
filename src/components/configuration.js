import React, { useState } from "react";
import {
  Grid,
  Segment,
  Form,
  TextArea,
  Button,
  Input,
  Label,
  Transition,
} from "semantic-ui-react";
import { useForm } from "react-hook-form";
import useClipboard from "react-use-clipboard";

const Configuration = () => {
  const { register, handleSubmit } = useForm();
  const [appDragAppName, setAppDragAppName] = useState("");

  const [isCopied, setCopied] = useClipboard("Hello", {
    successDuration: 1000,
  });

  const handleappDragAppName = (e) => {
    setAppDragAppName(e.target.value);
  };

  const isValidAppDragAppName = (appDragAppName) => {
    if (appDragAppName === "") return true;
    var validSubdomainMatches = appDragAppName.match(
      /[A-Za-z0-9](?:[A-Za-z0-9\-]{0,61}[A-Za-z0-9])?/g
    );
    if (validSubdomainMatches === null) return false;
    return (
      validSubdomainMatches.length === 1 &&
      validSubdomainMatches[0].length === appDragAppName.length
    );
  };

  const onSubmit = (data) => {
    setCopied();
  };

  return (
    <Grid centered={true}>
      <Grid.Row>
        <Segment basic>
          <Form onSubmit={handleSubmit(onSubmit)} style={{ width: "40vw" }}>
            <Segment basic>
              <Form.Field>
                <Input
                  name="appDragAppName"
                  label={{ basic: true, content: ".appdrag.site" }}
                  labelPosition="right"
                  placeholder={"yourappname"}
                  ref={register({ required: true })}
                  onChange={handleappDragAppName}
                />
              </Form.Field>
              {isValidAppDragAppName(appDragAppName) ? (
                ""
              ) : (
                <Label basic color="red" pointing>
                  Enter a valid subdomain name. Valid characters are lowercase
                  alphanumerals (0-9, a-z), and dashes (-).
                </Label>
              )}
            </Segment>
            <Segment basic style={{ textAlign: "center" }}>
              <Button
                color="teal"
                size="large"
                type="submit"
                disabled={!isValidAppDragAppName(appDragAppName)}
              >
                {!isCopied ? "COPY CODE" : "COPIED"}
              </Button>
            </Segment>
            <Transition
              visible={isValidAppDragAppName(appDragAppName)}
              animation="scale"
              duration={500}
            >
              <Segment
                basic
                style={{
                  textAlign: "center",
                  // visibility: isValidAppDragAppName(appDragAppName)
                  //   ? "visible"
                  //   : "hidden",
                }}
              >
                <TextArea
                  placeholder="Cloudflare Worker code..."
                  value={isValidAppDragAppName(appDragAppName) ? "Hello" : ""}
                  rows={10}
                />
              </Segment>
            </Transition>
          </Form>
        </Segment>
      </Grid.Row>
    </Grid>
  );
};

export default Configuration;
