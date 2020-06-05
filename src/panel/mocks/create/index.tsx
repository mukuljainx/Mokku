import * as React from "react";
import { Formik, Form, Field } from "formik";
import styled from "styled-components";

import { IMockResponse, IMockResponseRaw } from "../../../interface/mock";
import { IMethod } from "../../../interface/network";
import MultiSelect from "../../components/multiselect";
import { getNetworkMethodList } from "../../../services/collection";
import { isValidJSON, getError } from "../../../services/helper";
import { Button } from "../../components/table";

const Wrapper = styled("div")`
  border-left: ${({ theme }) => `1px solid ${theme.colors.border}`};
  height: 100%;
  overflow: auto;
`;

const Label = styled("label")`
  margin-bottom: 4px;
  font-weight: 700;
`;

const Input = styled(Field)`
  height: 25px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  border-style: solid;
`;

const Textarea = styled("textarea")<{ error?: boolean }>`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  border-style: solid;
  ${({ error, theme }) => error && `border: 1px solid ${theme.colors.alert};`};
`;

const FieldWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  flex-grow: 2;
`;

const Group = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  ${FieldWrapper}:not(:last-child) {
    margin-right: 16px;
  }
`;

const Actions = styled.div``;

const StyledForm = styled(Form)`
  padding: 8px 16px;
  width: 656px;
`;

const Error = styled("p")`
  color: ${({ theme }) => theme.colors.alert};
  height: 16px;
  margin-bottom: 8px;
`;

interface IProps {
  mock?: IMockResponseRaw;
  changeRoute: (route: string) => void;
  onAction: (
    action: "add" | "delete" | "edit" | "clear",
    mock: IMockResponse | void
  ) => void;
}

const Create = (props: IProps) => {
  const methods = getNetworkMethodList();
  const componentProps = props;
  return (
    <Wrapper>
      <Formik
        enableReinitialize
        initialValues={{
          method: componentProps.mock?.method || "GET",
          url: componentProps.mock?.url || "",
          status: componentProps.mock?.status || 200,
          delay: componentProps.mock?.delay || 500,
          response: componentProps.mock?.response || "",
        }}
        onSubmit={async (values) => {
          componentProps.onAction(componentProps.mock.id ? "edit" : "add", {
            id: -1,
            createdOn: new Date().getTime(),
            active: true,
            ...(componentProps.mock ? componentProps.mock : {}),
            ...values,
          });
          componentProps.changeRoute("mock");
        }}
        validateOnBlur
        validate={(values) => {
          const errors: Record<string, string> = {};

          if (values.response && !isValidJSON(values.response)) {
            errors.response = "Invalid Response JSON";
          }

          return errors;
        }}
      >
        {(props) => {
          const {
            values,
            touched,
            errors,
            dirty,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
            handleReset,
            isValid,
            setFieldValue,
          } = props;
          return (
            <StyledForm>
              <Group>
                <FieldWrapper>
                  <Label>URL:</Label>
                  <Input required name="url"></Input>
                </FieldWrapper>
              </Group>
              <Group>
                <FieldWrapper>
                  <Label>Method:</Label>
                  <MultiSelect
                    onSelect={(index) => {
                      setFieldValue("method", methods[index]);
                    }}
                    options={methods}
                    selected={methods.indexOf(values.method as IMethod)}
                  />
                </FieldWrapper>
                <FieldWrapper>
                  <Label>Status:</Label>
                  <Input required name="status" type="number"></Input>
                </FieldWrapper>
                <FieldWrapper>
                  <Label>Delay (in ms):</Label>
                  <Input required name="delay" type="number"></Input>
                </FieldWrapper>
              </Group>
              <Group>
                <FieldWrapper>
                  <Label>Response:</Label>
                  <Textarea
                    error={!!errors.response}
                    value={values.response}
                    rows={6}
                    name="response"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  ></Textarea>
                </FieldWrapper>
              </Group>
              <Group style={{ justifyContent: "space-between" }}>
                <Error>{getError(errors) || " "}</Error>
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
                  <Button
                    onClick={() => componentProps.onAction("clear")}
                    type="button"
                  >
                    Cancel
                  </Button>
                </Actions>
              </Group>
            </StyledForm>
          );
        }}
      </Formik>
    </Wrapper>
  );
};

export default Create;
