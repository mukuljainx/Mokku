import * as React from "react";
import styled from "styled-components";

interface IProps {
  selected: number;
  tabs: string[];
  tabWidth?: number;
  className?: string;
}

const Wrapper = styled("div")`
  display: flex;
  background: ${({ theme }) => theme.colors.light};
`;

const TabWrapper = styled("div")<{ active?: boolean }>`
  padding: 8px;
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
  ${({ theme, active }) =>
    active &&
    `
      border-bottom: 2px solid ${theme.colors.primaryDark};
      background: white;
    
    `};
`;

const Tabs = ({ selected, tabs, tabWidth, className }: IProps) => (
  <Wrapper className={`tabs ${className ? className : ""}`}>
    {tabs.map((tab, index) => (
      <TabWrapper
        key={index}
        style={{ width: tabWidth }}
        active={selected === index}
      >
        {tab}
      </TabWrapper>
    ))}
  </Wrapper>
);

export default Tabs;
