import * as React from "react";
import { Field, Formik } from "formik";
import styled from "styled-components";

import { Button, Icon } from "../atoms";
import { IMockResponse, IMockResponseRaw } from "../../interface/mock";
import { IMethod } from "../../interface/network";
import MultiSelect from "../../components/multiselect";
import { getError } from "../../services/helper";
import { getNetworkMethodList } from "../../services/constants";
import Response from "./Response";
import Description from "./Description";
import Tabs from "../../components/tabs";

const methods = getNetworkMethodList();

export const Label = styled("label")`
  margin-bottom: 4px;
  font-weight: 700;
`;

export const Input = styled(Field).attrs({ id: "mock-create-input" })<{
  small?: boolean;
  marginRight?: boolean;
}>`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  border-style: solid;
  ${({ small }) => small && `width: 124px;`};
  ${({ marginRight }) => marginRight && `margin-right: 8px;`};
`;

export const FieldWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  flex-grow: 2;
`;

export const Group = styled.div.attrs({ className: "mock-create-group" })<{
  grow?: boolean;
}>`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  ${({ grow }) => (grow ? "flex-grow: 2;" : "")}
  ${FieldWrapper}:not(:last-child) {
    margin-right: 16px;
  }
`;

const Actions = styled.div``;

const StyledForm = styled("form")`
  padding: 8px 16px;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Error = styled("p")`
  color: ${({ theme }) => theme.colors.alert} !important;
  height: 16px;
  margin-bottom: 8px;
`;

const StyledTabs = styled(Tabs)`
  margin-bottom: 2px;
`;

type IFormValues = Omit<IMockResponse, "id" | "createdOn">;

interface IProps {
  mock?: IMockResponseRaw;
  onSubmit: (values: IFormValues) => void;
  onCancel: () => void;
  jsonEditor?: {
    className?: string;
    style?: React.CSSProperties;
  };
}

const MockForm = ({ mock, onSubmit, onCancel, jsonEditor = {} }: IProps) => {
  const initialValues: IFormValues = {
    method: "GET",
    url: "",
    status: 200,
    delay: 500,
    response: "",
    active: true,
    headers: [],
    description: "",
    ...mock,
  };

  // RESPONSE | DESCRIPTION
  const [view, setView] = React.useState(0);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => onSubmit(values)}
      onReset={() => {}}
      validateOnBlur
      validate={(values) => {
        const errors: Record<string, string> = {};

        if (
          values.headers.length > 0 &&
          (!values.headers[values.headers.length - 1].name ||
            !values.headers[values.headers.length - 1].value)
        ) {
          errors.headers = "Each header pair should have name & value";
        }

        return errors;
      }}
    >
      {({
        setFieldValue,
        values,
        errors,
        handleReset,
        handleSubmit,
        isValid,
        setFieldError,
        setFieldTouched,
        handleChange,
        handleBlur,
      }) => {
        return (
          <StyledForm onReset={handleReset} onSubmit={handleSubmit}>
            <Group>
              <FieldWrapper style={{ flexGrow: 0 }}>
                <Label>Status:</Label>
                <MultiSelect
                  onSelect={(index) => {
                    setFieldValue("active", index ? false : true);
                  }}
                  options={["Active", "Inactive"]}
                  selected={values.active ? 0 : 1}
                />
              </FieldWrapper>
              <FieldWrapper style={{ flexGrow: 3 }}>
                <Label>URL:</Label>
                <Input required name="url"></Input>
              </FieldWrapper>
            </Group>
            <Group>
              <FieldWrapper className="mock-create-method">
                <Label>Method:</Label>
                <MultiSelect
                  onSelect={(index) => {
                    setFieldValue("method", methods[index]);
                  }}
                  options={methods}
                  selected={methods.indexOf(values.method as IMethod)}
                />
              </FieldWrapper>
              <FieldWrapper className="mock-create-status">
                <Label>Status:</Label>
                <Input small required name="status" type="number"></Input>
              </FieldWrapper>
              <FieldWrapper className="mock-create-delay">
                <Label>Delay (in ms):</Label>
                <Input small required name="delay" type="number"></Input>
              </FieldWrapper>
            </Group>
            <Group
              grow
              style={{
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                alignItems: "unset",
              }}
            >
              <StyledTabs
                selected={view}
                tabs={["Response", "Description"]}
                onChange={(selected) => {
                  if (
                    selected === 1 &&
                    values.headers.length &&
                    !values.headers[values.headers.length - 1].name &&
                    !values.headers[values.headers.length - 1].value
                  ) {
                    setFieldValue("headers", []);
                  }
                  setView(selected);
                }}
              />
              {view === 0 && (
                <Response
                  mock={mock}
                  values={values}
                  errors={errors}
                  setFieldError={setFieldError}
                  setFieldValue={setFieldValue}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                />
              )}
              {view === 1 && (
                <Description
                  description={values.description}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                />
              )}
            </Group>
            <Group style={{ justifyContent: "space-between" }}>
              <Error>{getError(errors as any) || " "}</Error>
              <Actions>
                <Button
                  style={{ marginRight: 16 }}
                  disabled={!isValid}
                  type="submit"
                  background="primary"
                  color="white"
                >
                  Save
                </Button>
                <Button onClick={() => onCancel()} type="button">
                  Cancel
                </Button>
              </Actions>
            </Group>
          </StyledForm>
        );
      }}
    </Formik>
  );
};

export default MockForm;
