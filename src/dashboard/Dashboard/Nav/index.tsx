import * as React from "react";
import styled from "styled-components";

import { Button } from "../../../components/core";

const Wrapper = styled("div")`
  height: 48px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

interface IProps {
  signOut: () => void;
}

const Nav = ({ signOut }: IProps) => {
  return (
    <Wrapper className="flex justify-content-between pt-4 pb-4 pl-16 pr-16 align-items-center">
      <div>Mokku</div>
      <div>
        <Button transparent onClick={signOut}>
          Sign out
        </Button>
      </div>
    </Wrapper>
  );
};

export default Nav;
