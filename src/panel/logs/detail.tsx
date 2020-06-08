import * as React from "react";
import styled from "styled-components";

import { ILog } from "../../interface/mock";
import Tab from "../components/tabs";

interface IProps {
  log: ILog;
  onClose: () => void;
}

const Wrapper = styled("div")`
  position: fixed;
  border-left: 1px solid ${({ theme }) => theme.colors.border};
  bottom: 0;
  top: 0;
  right: 0;
  max-width: 40%;
  width: 600px;
  background: white;
  display: flex;
  flex-direction: column;
`;

const Header = styled("div")`
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const StyledTab = styled(Tab)`
  border-bottom: none;
`;

const Content = styled("div")<{ center?: boolean }>`
  padding: 8px;
  overflow: auto;
  flex-grow: 2;
  ${({ center }) =>
    center &&
    `
    display: flex;
    justify-content: center;
    align-items: center;
  `}
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.black};
`;

const getResponse = (response) => {
  let data = "";
  try {
    data = JSON.stringify(JSON.parse(response), undefined, 2);
  } catch {
    data = response;
  }
  return data;
};

const getResponseContent = (log: IProps["log"]) => {
  if (!log.response) {
    return (
      <Content center>
        <Label>Request pending</Label>
      </Content>
    );
  }

  const response = getResponse(log.response?.response || "");
  if (!response) {
    return (
      <Content center>
        <Label>Nothing to preview</Label>
      </Content>
    );
  } else {
    return (
      <Content>
        <pre>{response}</pre>
      </Content>
    );
  }
};

const Detail = ({ log, onClose }: IProps) => {
  return (
    <Wrapper>
      <Header>
        <button
          className="button-icon button transparent no-hover"
          onClick={onClose}
        >
          <i className="material-icons">close</i>
        </button>
        <StyledTab
          onChange={(selected) => {
            selected;
          }}
          selected={0}
          tabs={["Response"]}
        />
      </Header>
      {getResponseContent(log)}
    </Wrapper>
  );
};

export default Detail;
