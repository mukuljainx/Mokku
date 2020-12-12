import * as React from "react";
import { NavLink } from "react-router-dom";

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
      color: ${({ theme }) => theme.colors.white} !important;
    }
  }

  .active-link {
    color: ${({ theme }) => theme.colors.primary} !important;
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
      <NavLink activeClassName="active-link" to="/mocks/list">
        <Item>Mocks</Item>
      </NavLink>
      <NavLink activeClassName="active-link" to="/logs">
        <Item>Logs</Item>
      </NavLink>
    </Wrapper>
  );
};

export default SideNav;
