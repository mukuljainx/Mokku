import * as React from "react";
import { Formik, Form, Field } from "formik";
import styled from "styled-components";

import { IMockResponse } from "../../../interface/mock";
import { IMethod } from "../../../interface/network";
import MultiSelect from "../../components/multiselect";
import { getNetworkMethodList } from "../../../services/collection";
import { isValidJSON, getError } from "../../../services/helper";

const Wrapper = styled("div")`
  border-left: ${({ theme }) => `1px solid ${theme.colors.border}`};
  height: 100%;
`;

const Label = styled("label")`
  margin-bottom: 4px;
  font-weight: 700;
`;

const Input = styled(Field)`
  height: 25px;
`;

const Textarea = styled("textarea")<{ error?: boolean }>`
  ${({ error, theme }) => error && `border: 1px solid ${theme.colors.alert};`};
`;

const FieldWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  flex-grow: 2;
`;

const Group = styled.div`
  display: flex;
  margin-bottom: 16px;
  ${FieldWrapper}:not(:last-child) {
    margin-right: 16px;
  }
`;

const StyledForm = styled(Form)`
  padding: 16px;
  width: 656px;
`;

const Button = styled("button")`
  background: ${({ theme }) => theme.colors.primary};
  border: none;
  height: 32px;
  color: white;
  padding: 0 16px;
`;

const Error = styled("p")`
  color: ${({ theme }) => theme.colors.alert};
  height: 16px;
  margin-bottom: 8px;
`;

interface IProps {
  mock?: IMockResponse;
}

const Create = (props: IProps) => {
  const methods = getNetworkMethodList();
  return (
    <Wrapper>
      <Formik
        initialValues={{
          method: "GET",
          url: "",
          status: 200,
          delay: 500,
          response: "",
        }}
        onSubmit={async (values) => {}}
        validateOnBlur
        validate={(values) => {
          const errors: Record<string, string> = {};
          debugger;

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
          console.log(errors);
          console.log(values);
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
                  <Label>Delay:</Label>
                  <Input required name="delay" type="number"></Input>
                </FieldWrapper>
              </Group>
              <Group>
                <FieldWrapper>
                  <Label>Response:</Label>
                  <Textarea
                    error={!!errors.response}
                    rows={6}
                    name="response"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  ></Textarea>
                </FieldWrapper>
              </Group>
              <Error>{getError(errors) || " "}</Error>
              <Button disabled={!isValid}>Save</Button>
            </StyledForm>
          );
        }}
      </Formik>
    </Wrapper>
  );
};

export default Create;
