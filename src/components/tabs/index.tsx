import * as React from "react";
import styled from "styled-components";

interface IProps {
  selected: number;
  tabs: string[];
  tabWidth?: number;
  className?: string;
  onChange: (selected: number) => void;
}

const Wrapper = styled("div")`
  display: flex;
  background: ${({ theme }) => theme.colors.white};
`;

const TabWrapper = styled("div")<{ active?: boolean }>`
  padding: 8px 16px;
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
  cursor: pointer;
  ${({ theme, active }) =>
    active &&
    `
      border-bottom: 2px solid ${theme.colors.primary};
      background: white;
    
    `};
`;

const Tabs = ({ selected, tabs, tabWidth, className, onChange }: IProps) => (
  <Wrapper id="tab-wrapper" className={`tabs ${className ? className : ""}`}>
    {tabs.map((tab, index) => (
      <TabWrapper
        id="tab"
        data-test={`tab-${index}`}
        key={index}
        style={{ width: tabWidth }}
        active={selected === index}
        onClick={() => onChange(index)}
      >
        {tab}
      </TabWrapper>
    ))}
  </Wrapper>
);

export default Tabs;
