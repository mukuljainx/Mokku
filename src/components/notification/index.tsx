import * as React from "react";
import styled from "styled-components";

const Wrapper = styled.div<{ show: boolean }>`
  position: fixed;
  z-index: 99;
  padding: 8px 12px;
  background: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
  border-radius: 4px;
  left: 50%;
  transform: translate(-50%, 0);
  bottom: -40px;
  transition: all 0.5s;
  ${({ show }) => show && `bottom: 20px;`}
`;

const Notification = ({ text, show }: { text?: string; show: boolean }) => (
  <Wrapper show={show}>{text || " "}</Wrapper>
);

export default Notification;
