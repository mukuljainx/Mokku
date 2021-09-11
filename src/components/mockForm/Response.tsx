import * as React from "react";
import { FieldArray } from "formik";
import styled from "styled-components";

import { Button, Icon } from "../atoms";
import Tabs from "../../components/tabs";
import JSONEditor from "../JSONEditor";
import { FieldWrapper, Group, Label, Input } from "./index";
import { isValidJSON } from "../../services/helper";
import { IMockResponseRaw } from "../../interface/mock";

const StyledTabs = styled(Tabs)`
  margin-left: 4px;
  div {
    padding: 4px 8px;
  }
`;

const ResponseWrapper = styled.div`
  position: relative;
  height: 100%;
`;

const Select = styled.select`
  position: absolute;
  z-index: 233;
  right: 0;
`;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  ${Input} {
    margin-right: 4px;
    flex-grow: 2;
    &:first-child {
      flex-grow: 1;
    }
  }
  width: 100%;
`;

interface IProps {
  mock?: IMockResponseRaw;
  jsonEditor?: {
    className?: string;
    style?: React.CSSProperties;
  };
  values: any;
  errors: any;
  handleChange: any;
  handleBlur: any;
  setFieldValue: any;
  setFieldError: any;
}

const Response = ({
  mock,
  jsonEditor,
  values,
  errors,
  setFieldValue,
  setFieldError,
  handleChange,
  handleBlur,
}: IProps) => {
  const [tab, setTab] = React.useState(0);

  const [responseType, setResponseType] = React.useState(
    !!mock?.response && isValidJSON(mock.response).error ? "TEXT" : "JSON"
  );

  return (
    <FieldWrapper
      className="mock-create-response h-100"
      style={{ height: "100%" }}
    >
      <Group>
        <Label>Response:</Label>
        <StyledTabs
          selected={tab}
          tabs={["Body", "Headers"]}
          onChange={(selected) => {
            if (selected === 1 && values.headers.length === 0) {
              setFieldValue("headers", [{ name: "", value: "" }]);
            }

            if (
              selected === 0 &&
              values.headers.length === 1 &&
              !values.headers[0].name &&
              !values.headers[0].value
            ) {
              setFieldValue("headers", []);
            }
            setTab(selected);
          }}
        />
      </Group>
      {tab === 0 && (
        <ResponseWrapper>
          <Select
            onChange={(event) => setResponseType(event.target.value)}
            value={responseType}
          >
            <option value="JSON">JSON</option>
            <option value="TEXT">Text</option>
          </Select>
          {responseType === "JSON" ? (
            <JSONEditor
              name="response"
              value={values.response}
              onChange={(v) => setFieldValue("response", v)}
              onError={(v) => setFieldError("response", v)}
              error={!!errors.response}
              {...jsonEditor}
            />
          ) : (
            <Input
              style={{ height: "100%", width: "100%" }}
              as="textarea"
              name="response"
              value={values.response}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          )}
        </ResponseWrapper>
      )}
      {tab === 1 && (
        <FieldArray
          name="headers"
          render={(arrayHelpers) => {
            const disabled = values.headers.some(
              (header) => !header.name || !header.value
            );
            return (
              <>
                {values.headers.length > 0 && (
                  <div style={{ flexGrow: 2, overflow: "scroll" }}>
                    {values.headers.map((header, index) => (
                      <HeaderWrapper className="mock-create-header">
                        <Input
                          marginRight
                          name={`headers.${index}.name`}
                          autoFocus
                        ></Input>
                        <Input
                          marginRight
                          name={`headers.${index}.value`}
                        ></Input>
                        <Icon
                          onClick={() => {
                            arrayHelpers.remove(index);
                          }}
                        >
                          close
                        </Icon>
                      </HeaderWrapper>
                    ))}
                  </div>
                )}
                <Button
                  style={{ height: 24, fontSize: 12 }}
                  transparent
                  color="primary"
                  disabled={disabled}
                  onClick={() => arrayHelpers.push({ name: "", value: "" })}
                >
                  Add Header
                </Button>
              </>
            );
          }}
        />
      )}
    </FieldWrapper>
  );
};

export default Response;
