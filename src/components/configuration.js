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
  const [isValidAppName, setIsValidAppName] = useState(true);
  const [workerScript, setWorkerScript] = useState("");

  const [isCopied, setCopied] = useClipboard(workerScript, {
    successDuration: 1000,
  });

  // Update worker script
  useEffect(() => {
    updateWorkerScript(appNameInput);
  }, [appNameInput]);

  const updateWorkerScript = async (appName) => {
    await axios
      .post("http://localhost:3001/api/worker", {
        appName: appName,
      })
      .then((response) => {
        console.log(response);
        if (response.data.type === "error") {
          if (response.data.value === "invalidAppName") {
            setIsValidAppName(false);
          }
        } else if (response.data.type === "workerScript") {
          setIsValidAppName(true);
          setWorkerScript(response.data.value);
        }
      })
      .catch((err) => {
        console.log("Error: ");
        console.log(err);
      });
  };

  const handleAppNameInput = (e) => {
    e.preventDefault();
    setAppNameInput(e.target.value);
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
              {isValidAppName ? (
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
                disabled={!isValidAppName}
              >
                {!isCopied ? "COPY CODE" : "COPIED"}
              </Button>
            </Segment>
            <Transition
              visible={isValidAppName}
              animation="scale"
              duration={500}
            >
              <Segment
                basic
                style={{
                  textAlign: "center",
                }}
              >
                <TextArea
                  placeholder="Cloudflare Worker code..."
                  value={isValidAppName ? workerScript : ""}
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
