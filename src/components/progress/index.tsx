import * as React from "react";
import styled, { keyframes } from "styled-components";

const indeterminate = keyframes`
  0% {
    left: -35%;
    right: 100%;
  }
  60% {
    left: 100%;
    right: -90%;
  }
  100% {
    left: 100%;
    right: -90%;
  }
`;

const indeterminateShort = keyframes`
  0% {
    left: -200%;
    right: 100%;
  }
  60% {
    left: 107%;
    right: -8%;
  }
  100% {
    left: 107%;
    right: -8%;
  }
`;

const Wrapper = styled.div`
  margin: 0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  display: block;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primaryLight};
  border-radius: 2px;
  background-clip: padding-box;
  overflow: hidden;
`;

const ProgressIndicator = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  &:before {
    content: "";
    position: absolute;
    background-color: inherit;
    top: 0;
    left: 0;
    bottom: 0;
    will-change: left, right;
    -webkit-animation: ${indeterminate} 2.1s
      cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
    animation: ${indeterminate} 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395)
      infinite;
  }
  &:after {
    content: "";
    position: absolute;
    background-color: inherit;
    top: 0;
    left: 0;
    bottom: 0;
    will-change: left, right;
    -webkit-animation: ${indeterminateShort} 2.1s
      cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
    animation: ${indeterminateShort} 2.1s cubic-bezier(0.165, 0.84, 0.44, 1)
      infinite;
    -webkit-animation-delay: 1.15s;
    animation-delay: 1.15s;
  }
`;

const ProgressBar = () => (
  <Wrapper>
    <ProgressIndicator></ProgressIndicator>
  </Wrapper>
);

export default ProgressBar;
