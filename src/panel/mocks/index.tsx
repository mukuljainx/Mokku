import * as React from "react";

import List from "./list";
import { IStore, IMockResponse, IMockResponseRaw } from "../../interface/mock";

interface IProps {
  route: string;
  store: IStore;
  changeRoute: (route: string) => void;
  onAction: (action: "add" | "delete" | "edit", mock: IMockResponse) => void;
  editMock: (mock: IMockResponseRaw) => void;
}

class Mocks extends React.Component<IProps> {
  toggleMock = (mock: IMockResponse) => {
    const newMock: IMockResponse = { ...mock, active: !mock.active };
    this.props.onAction("edit", newMock);
  };

  render() {
    const { store, changeRoute, onAction, editMock } = this.props;

    return (
      <List
        onAction={onAction}
        editMock={editMock}
        changeRoute={changeRoute}
        store={store}
        toggleMock={this.toggleMock}
      />
    );
  }
}

export default Mocks;
