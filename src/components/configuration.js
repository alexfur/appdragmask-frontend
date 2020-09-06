import React, { useState, useEffect } from "react";
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
import axios from "axios";

const Configuration = () => {
  const { register, handleSubmit } = useForm();
  const [appNameInput, setAppNameInput] = useState("");
  const [appName, setAppName] = useState("");
  const [workerScript, setWorkerScript] = useState("");

  const [isCopied, setCopied] = useClipboard("Hello", {
    successDuration: 1000,
  });

  // Update worker script
  useEffect(() => {
    updateWorkerScript(appName);
  }, [appName]);

  // Update app name
  useEffect(() => {
    if (isValidAppName(appNameInput)) setAppName(appNameInput);
  }, [appNameInput]);

  const updateWorkerScript = async (appName) => {
    await axios
      .post("http://localhost:3001/api/worker", {
        appName: appName,
      })
      .then((response) => {
        console.log(response.data[0].value);
        setWorkerScript(response.data[0].value);
      });
  };

  const handleAppNameInput = (e) => {
    e.preventDefault();
    setAppNameInput(e.target.value);
  };

  const isValidAppName = (appDragAppName) => {
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
                  onChange={handleAppNameInput}
                />
              </Form.Field>
              {isValidAppName(appNameInput) ? (
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
                disabled={!isValidAppName(appNameInput)}
              >
                {!isCopied ? "COPY CODE" : "COPIED"}
              </Button>
            </Segment>
            <Transition
              visible={isValidAppName(appNameInput)}
              animation="scale"
              duration={500}
            >
              <Segment
                basic
                style={{
                  textAlign: "center",
                  // visibility: isValidAppDragAppName(appNameInput)
                  //   ? "visible"
                  //   : "hidden",
                }}
              >
                <TextArea
                  placeholder="Cloudflare Worker code..."
                  value={isValidAppName(appNameInput) ? workerScript : ""}
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
