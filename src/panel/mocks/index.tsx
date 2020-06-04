import * as React from "react";
import styled from "styled-components";

import Create from "./create";
import List from "./list";
import { IStore, IMockResponse } from "../../interface/mock";

const Wrapper = styled("div")`
  display: flex;
  height: 100%;
`;

const ListWrapper = styled("div")`
  flex-grow: 2;
  height: 100%;
`;
const CreateWrapper = styled("div")`
  width: 50%;
  min-width: 656px;
`;

interface IProps {
  route: string;
  store: IStore;
  changeRoute: (route: string) => void;
  onAction: (action: "add" | "delete" | "edit", mock: IMockResponse) => void;
}

interface IState {
  mock?: IMockResponse;
}

class Mocks extends React.Component<IProps, IState> {
  state: IState = {};

  editMock = (mock: IMockResponse) => {
    this.setState({ mock });
    this.props.changeRoute("mock.create");
  };

  handleAction = (action: "add" | "delete" | "edit", mock: IMockResponse) => {
    this.setState({ mock: undefined }, () => {
      this.props.onAction(action, mock);
    });
  };

  toggleMock = (mock: IMockResponse) => {
    const newMock: IMockResponse = { ...mock, active: !mock.active };
    this.props.onAction("edit", newMock);
  };

  render() {
    const { route, store, changeRoute } = this.props;

    return (
      <Wrapper>
        <ListWrapper>
          {route.indexOf("mock") === 0 && (
            <List
              onAction={this.props.onAction}
              editMock={this.editMock}
              changeRoute={changeRoute}
              store={store}
              toggleMock={this.toggleMock}
            />
          )}
        </ListWrapper>
        {route === "mock.create" && (
          <CreateWrapper>
            <Create
              mock={this.state.mock}
              onAction={this.handleAction}
              changeRoute={changeRoute}
            />
          </CreateWrapper>
        )}
      </Wrapper>
    );
  }
}

export default Mocks;
