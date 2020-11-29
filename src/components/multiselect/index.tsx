import * as React from "react";
import styled from "styled-components";

const Wrapper = styled("div")`
  display: flex;
`;

const Button = styled("button")<{ active: boolean }>`
  border: none;
  border-radius: 0;
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  padding: 6px 12px;
  line-height: 1;

  &:first-child {
    border-top-left-radius: 2px;
    border-bottom-left-radius: 2px;
  }
  &:last-child {
    border-top-right-radius: 2px;
    border-bottom-right-radius: 2px;
    border-right: none;
  }
  ${({ active, theme }) =>
    active &&
    `
        background: ${theme.colors.primary};
        color: ${theme.colors.white}

    `};
`;

interface IProps {
  options: string[];
  selected: number | null;
  onSelect: (selected: number) => void;
}

const MultiSelect = (props: IProps) => {
  return (
    <Wrapper>
      {props.options.map((option, index) => (
        <Button
          type="button"
          key={index}
          onClick={() => {
            props.onSelect(index);
          }}
          active={index === props.selected}
        >
          {option}
        </Button>
      ))}
    </Wrapper>
  );
};

export default MultiSelect;
