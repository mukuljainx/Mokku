import * as React from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import styled from "styled-components";

import { IMockResponse, IMockResponseRaw } from "../../../interface/mock";
import { IMethod } from "../../../interface/network";
import MultiSelect from "../../../components/multiselect";
import { getNetworkMethodList } from "../../../services/collection";
import { isValidJSON, getError } from "../../../services/helper";
import { Button, Icon } from "../../../components/core";
import Tabs from "../../../components/tabs";

const Wrapper = styled("div")`
  height: 100%;
  overflow: auto;
`;

const Label = styled("label")`
  margin-bottom: 4px;
  font-weight: 700;
`;

const StyledTabs = styled(Tabs)`
  margin-left: 4px;
  div {
    padding: 4px 8px;
  }
`;

const Input = styled(Field)<{ small?: boolean }>`
  height: 25px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  border-style: solid;
  ${({ small }) => small && `width: 124px;`};
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
  color: ${({ theme }) => theme.colors.alert} !important;
  height: 16px;
  margin-bottom: 8px;
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
  changeRoute: (route: string) => void;
  onAction: (
    action: "add" | "delete" | "edit" | "clear",
    mock: IMockResponse | void
  ) => void;
}

const Create = (props: IProps) => {
  const methods = getNetworkMethodList();
  const componentProps = props;
  const [tab, setTab] = React.useState(0);

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
          active: componentProps.mock?.active || true,
          headers: componentProps.mock?.headers || [],
        }}
        onSubmit={async (values) => {
          componentProps.onAction(componentProps?.mock?.id ? "edit" : "add", {
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

          if (
            values.headers.length > 0 &&
            (!values.headers[values.headers.length - 1].name ||
              !values.headers[values.headers.length - 1].value)
          ) {
            errors.headers = "Each header pair should have name & value";
          }

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
                <FieldWrapper style={{ flexGrow: 0 }}>
                  <Label>Active:</Label>
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
                  <Input small required name="status" type="number"></Input>
                </FieldWrapper>
                <FieldWrapper>
                  <Label>Delay (in ms):</Label>
                  <Input small required name="delay" type="number"></Input>
                </FieldWrapper>
              </Group>
              <Group>
                <FieldWrapper>
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
                    <Textarea
                      error={!!errors.response}
                      value={values.response}
                      rows={6}
                      name="response"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    ></Textarea>
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
                            {values.headers.length > 0 &&
                              values.headers.map((header, index) => (
                                <HeaderWrapper>
                                  <Input
                                    name={`headers.${index}.name`}
                                    autoFocus
                                  ></Input>
                                  <Input
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
                            <Button
                              style={{ height: 24, fontSize: 12 }}
                              background="primary"
                              color="white"
                              disabled={disabled}
                              onClick={() =>
                                arrayHelpers.push({ name: "", value: "" })
                              }
                            >
                              Add Header
                            </Button>
                          </>
                        );
                      }}
                    />
                  )}
                </FieldWrapper>
              </Group>
              <Group style={{ justifyContent: "space-between" }}>
                {/* TODO */}
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
