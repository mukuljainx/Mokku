import * as React from "react";
import styled from "styled-components";

const TooltipWrapper = styled.div`
  position: absolute;
  padding: 8px 12px;
  background: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white} !important;
  display: none;
  border-radius: 4px;
`;

const Wrapper = styled.div`
  position: relative;
  &:hover {
    ${TooltipWrapper} {
      display: block;
    }
  }
`;

interface IProps {
  children: React.ReactChild;
  tooltip: string;
  tooltipStyle: React.CSSProperties;
}

const Tooltip = ({ children, tooltip, tooltipStyle }: IProps) => (
  <Wrapper>
    {children}
    <TooltipWrapper
      onClick={(event) => {
        event.stopPropagation();
        event.preventDefault();
      }}
      style={tooltipStyle}
    >
      {tooltip}
    </TooltipWrapper>
  </Wrapper>
);

export default Tooltip;
