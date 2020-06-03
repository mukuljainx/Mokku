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
  max-width: 80%;
  width: 1200px;
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

const Content = styled("div")`
  padding: 8px;
  overflow: auto;
  flex-grow: 2;
`;

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
      <Content>
        <pre>
          {log.response?.response
            ? JSON.stringify(JSON.parse(log.response?.response), undefined, 2)
            : "Pending"}
        </pre>
      </Content>
    </Wrapper>
  );
};

export default Detail;
