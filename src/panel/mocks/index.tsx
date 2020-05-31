import * as React from "react";
import styled from "styled-components";

import Create from "./create";

const Wrapper = styled("div")`
  display: flex;
  height: 100%;
`;

const ListWrapper = styled("div")`
  min-width: 400px;
`;
const CreateWrapper = styled("div")`
  flex-grow: 2;
`;

interface IProps {
  route: string;
}

class Mocks extends React.Component<IProps> {
  render() {
    const { route } = this.props;
    return (
      <Wrapper>
        <ListWrapper>
          {route.indexOf("mock") === 0 && <div>list</div>}
        </ListWrapper>
        <CreateWrapper>{route === "mock.create" && <Create />}</CreateWrapper>
      </Wrapper>
    );
  }
}

export default Mocks;
