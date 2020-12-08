import * as React from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

const Wrapper = styled("div")`
  width: 160px;
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  a {
    padding: 12px 20px;
    color: black;
    text-decoration: none;
    &:visited {
      color: black;
    }
    &:hover {
      background: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.white};
    }
  }
`;

const Item = styled("span")`
  font-size: 16px;
  line-height: 24px;
`;

interface IProps {
  className?: string;
}

const SideNav = ({ className = " " }: IProps) => {
  return (
    <Wrapper className={`${className} flex flex-column`}>
      <Link to="/mocks/list">
        <Item>Mocks</Item>
      </Link>
      <Link to="/logs">
        <Item>Logs</Item>
      </Link>
    </Wrapper>
  );
};

export default SideNav;
