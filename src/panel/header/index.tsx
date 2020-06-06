import * as React from "react";
import styled from "styled-components";

import Tabs from "../components/tabs";
import { Button } from "../components/table";

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

const AddMockButton = styled(Button)`
  font-size: 12px;
  font-weight: 600;
  margin-bottom: -3px;
`;

const Filters = styled.div`
  border-left: 1px solid #bcbabe;
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: 12px;
`;

const Input = styled.input`
  height: 23px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  border-style: solid;
  width: 200px;
`;

interface IProps {
  changeRoute: (route: string) => void;
  route: string;
  onSearchChange: (search: string) => void;
}

const getSelected = (route: string) => {
  if (route.indexOf("logs") === 0) {
    return 1;
  }
  if (route.indexOf("mock") === 0) {
    return 0;
  }
};

const Header = (props: IProps) => {
  const [search, setSearch] = React.useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    props.onSearchChange(event.target.value);
  };

  return (
    <Wrapper>
      <StyledTabs
        selected={getSelected(props.route)}
        tabs={["Mocks", "Logs"]}
        onChange={(selected) => {
          if (selected === 1) {
            props.changeRoute("logs");
          } else {
            props.changeRoute("mock");
          }
        }}
      />
      <AddMockButton
        transparent
        link
        onClick={() => props.changeRoute("mock.create")}
        className="button-icon transparent no-hover"
      >
        <i className="material-icons icon">add</i> Create Mock
      </AddMockButton>
      <Filters>
        <Input
          placeholder="Search logs/mocks"
          value={search}
          onChange={handleSearchChange}
        ></Input>
      </Filters>
    </Wrapper>
  );
};

export default Header;
