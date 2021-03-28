import * as React from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import styled from "styled-components";

import { IMockResponse, IMockResponseRaw } from "../../../interface/mock";
import { IMethod } from "../../../interface/network";
import MultiSelect from "../../../components/multiselect";
import { getNetworkMethodList } from "../../../services/constants";
import { isValidJSON, getError } from "../../../services/helper";
import { Button, Icon } from "../../../components/atoms";
import Tabs from "../../../components/tabs";
import JSONEditor from "../../../components/JSONEditor";
import MockForm from "../../../components/mockForm";

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
  const componentProps = props;

  return (
    <Wrapper>
      <MockForm
        jsonEditor={{ className: "flex-grow" }}
        mock={componentProps.mock}
        onSubmit={(values) => {
          componentProps.onAction(componentProps?.mock?.id ? "edit" : "add", {
            id: -1,
            createdOn: new Date().getTime(),
            active: true,
            ...(componentProps.mock ? componentProps.mock : {}),
            ...values,
          });
          componentProps.changeRoute("mock");
        }}
        onCancel={() => componentProps.onAction("clear")}
      />
    </Wrapper>
  );
};

export default Create;
