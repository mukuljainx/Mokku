import * as React from "react";
import styled from "styled-components";

import Tabs from "../../components/tabs";
import Tooltip from "../../components/tooltip";
import { Button, Icon } from "../../components/atoms";

const Wrapper = styled("div")`
  display: flex;
  align-items: center;
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.white};
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
  margin-left: 8px;
`;

const Input = styled.input`
  height: 23px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  border-style: solid;
  width: 200px;
`;

const RecordIcon = styled(Icon)<{ border: boolean }>`
  cursor: pointer;
  ${({ border, theme }) =>
    border &&
    `
    border-radius: 100%;
    border: 2px solid ${theme.colors.alert};
    margin-left: -2px;
  `}
`;

interface IProps {
  changeRoute: (route: string) => void;
  route: string;
  onSearchChange: (search: string) => void;
  clearLogs: () => void;
  disableMocking: () => void;
  recording: boolean;
  onRecordingClick: () => void;
  addMock: () => void;
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
        onClick={() => props.addMock()}
        className="button-icon transparent no-hover"
      >
        <Icon>add</Icon> Create Mock
      </AddMockButton>
      <Filters>
        <Input
          title="Clear Logs"
          placeholder="Search logs/mocks"
          value={search}
          onChange={handleSearchChange}
        ></Input>
        {props.route.includes("logs") && (
          <Button
            style={{ marginLeft: 12 }}
            transparent
            icon
            title="Clear Logs"
            onClick={() => props.clearLogs()}
          >
            <Icon>block</Icon>
          </Button>
        )}
      </Filters>
      <Filters style={{ flexGrow: 2 }}>
        <Tooltip
          tooltipStyle={{ left: 32, top: -7, width: 320 }}
          tooltip="Record: Mock Every API call, until Recording is on, Mocks will be created when Recoding stops. Recording might overwrite existing Mock."
        >
          <RecordIcon
            onClick={props.onRecordingClick}
            border={props.recording}
            color={props.recording ? "alert" : undefined}
          >
            fiber_manual_record
          </RecordIcon>
        </Tooltip>
      </Filters>
      <Filters>
        <Button
          icon
          style={{ marginRight: 4 }}
          onClick={() => location.reload()}
        >
          <Icon>refresh</Icon>
        </Button>
        <AddMockButton transparent link onClick={() => props.disableMocking()}>
          Disable Mocking
        </AddMockButton>

        <AddMockButton
          transparent
          link
          onClick={() => {
            chrome.tabs.create({
              url: chrome.runtime.getURL("dashboard.html"),
            });
          }}
        >
          Open Dashboard
        </AddMockButton>
      </Filters>
    </Wrapper>
  );
};

export default Header;
