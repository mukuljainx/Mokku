import styled from "styled-components";
import { ThemeType } from "../theme";

export const Button = styled.button<{
  transparent?: boolean;
  link?: boolean;
  background?: keyof ThemeType["colors"];
  color?: keyof ThemeType["colors"];
  icon?: boolean;
}>`
  border: none;
  border-radius: 4px;
  line-height: 1;
  ${({ icon }) =>
    icon
      ? `padding: 2px 4px;`
      : `height: 32px;
  padding: 0 16px;`};
  ${({ transparent }) =>
    transparent &&
    `
      background: transparent;
      &:hover{
        background: rgba(0,0,0,0.1);
      }
  
  `};
  ${({ link, theme }) =>
    link &&
    `
  color: ${theme.colors.primary};
  padding: 4px;
  margin: -2px 0;
  `};
  ${({ background, theme }) =>
    background && `background: ${theme.colors[background]};`};
  ${({ color, theme }) => color && `color: ${theme.colors[color]};`};

  &:disabled,
  &[disabled] {
    opacity: 0.6;
    pointer-events: none;
  }
`;

export const Icon = styled.i.attrs({ className: "material-icons" })<{
  color?: keyof ThemeType["colors"];
}>`
  font-size: 16px;
  vertical-align: middle;
  ${({ theme, color }) => color && `color: ${theme.colors[color]};`};
`;

export const Text = styled.p<{ color?: keyof ThemeType["colors"] }>`
  margin: 0;
  ${({ color, theme }) => color && `color: ${theme.colors[color]};`};
`;
