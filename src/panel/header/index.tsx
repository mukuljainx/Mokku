import * as React from "react";
import styled from "styled-components";

import Tabs from "../components/tabs";

const Wrapper = styled("div")`
  display: flex;
  align-items: center;
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.light};
`;

const StyledTabs = styled(Tabs)`
  background: transparent;
  margin-bottom: -1px;
`;

const AddMockButton = styled("button")`
  font-size: 12px;
  font-weight: 600;
`;

interface IProps {
  changeRoute: (route: string) => void;
  route: string;
}

const getSelected = (route: string) => {
  if (route.indexOf("logs") === 0) {
    return 0;
  }
  if (route.indexOf("mock") === 0) {
    return 1;
  }
};

const Header = (props: IProps) => {
  return (
    <Wrapper>
      <StyledTabs
        selected={getSelected(props.route)}
        tabs={["Logs", "Mocks"]}
      />
      <AddMockButton
        onClick={() => props.changeRoute("mock.create")}
        className="button-icon transparent no-hover"
      >
        <i className="material-icons icon">add</i> Create Mock
      </AddMockButton>
    </Wrapper>
  );
};

export default Header;
