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

const Header = () => {
  return (
    <Wrapper>
      <button className="button-icon transparent no-hover">
        <i className="material-icons icon">add</i>
      </button>
      <StyledTabs selected={0} tabs={["Logs", "Mocks"]} />
    </Wrapper>
  );
};

export default Header;
