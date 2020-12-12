import { FormikHandlers } from "formik";
import * as React from "react";
import styled from "styled-components";
import { isValidJSON } from "../../services/helper";

const Wrapper = styled.div`
  margin-left: -16px;
`;

const Textarea = styled("textarea")<{ error?: boolean; resize?: boolean }>`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  border-style: solid;
  font-size: 16px;
  line-height: 18px;
  ${({ error, theme }) => error && `border: 1px solid ${theme.colors.alert};`};
  ${({ resize }) => (resize ? "resize: block" : "resize: none")};
`;

const TextareaHighLight = styled.div<{ position?: number | void }>`
  position: absolute;
  height: 18px;
  background: red;
  width: 100%;
  display: none;
  ${({ position }) =>
    position &&
    `
    display: initial;
    top: calc(20px - 18px + ${position - 1} * 18px);
  `}
  opacity: 0.2;
`;

const LineNumberWrapper = styled.div`
  overflow: hidden;
`;

const LineNumber = styled.div`
  padding-top: 2px;
  padding-bottom: 2px;
  font-size: 12px;
  line-height: 18px;
  p {
    text-align: center;
    margin: 0;
  }
`;

const getLineWidth = (line) => {
  if (line < 999) {
    return 25;
  } else {
    return 34;
  }
};

const getLineLength = (height) => Math.ceil((height + 800) / 18);

interface IProps {
  error?: boolean;
  value?: string;
  name?: string;
  onChange: (v: string) => void;
  onBlur?: FormikHandlers["handleBlur"];
  height?: number;
  onError?: (e?: string) => void;
  resize?: boolean;
}

const JSONEditor = ({
  name,
  error,
  value,
  onChange,
  onBlur,
  height = 320,
  resize = false,
}: IProps) => {
  const textareaRef = React.useRef(null);
  const lineNumberRef = React.useRef(null);
  const lineNumberRefWrapper = React.useRef(null);
  const heightRef = React.useRef(height);

  const [totalLines, setTotalLines] = React.useState(getLineLength(height));
  const [errorPosition, setErrorPosition] = React.useState<number | void>();

  const handleScroll = (event: React.SyntheticEvent<HTMLTextAreaElement>) => {
    if (resize) {
      return;
    }
    const target = event.target as HTMLTextAreaElement;
    const newHeight = target.scrollHeight;
    const scrollTop = target.scrollTop;

    if (newHeight > heightRef.current + 500) {
      heightRef.current = newHeight;
      setTotalLines(getLineLength(newHeight));
    }
    if (lineNumberRef.current) {
      lineNumberRef.current.style.height = newHeight + "px";
    }
    if (lineNumberRefWrapper.current) {
      lineNumberRefWrapper.current.scrollTop = scrollTop;
    }
  };

  return (
    <Wrapper
      className={`flex${resize ? " px-16" : ""}`}
      style={{ height: resize ? "auto" : height }}
    >
      {!resize && (
        <LineNumberWrapper ref={lineNumberRefWrapper} className="h-100">
          <LineNumber
            className="p-relative"
            ref={lineNumberRef}
            style={{ width: getLineWidth(totalLines) }}
          >
            <TextareaHighLight position={errorPosition} />
            {new Array(totalLines).fill(0).map((__, i) => (
              <p>{i + 1}</p>
            ))}
          </LineNumber>
        </LineNumberWrapper>
      )}
      <Textarea
        onScroll={handleScroll}
        ref={textareaRef}
        name={name}
        className="mock-create-body w-100"
        error={error}
        rows={6}
        onChange={(e) => {
          const v = e.target.value;
          onChange(v);
          if (resize) {
            return;
          }
          setErrorPosition();
          if (v) {
            const validate = isValidJSON(v);
            console.log(validate);
            if (validate.error) {
              setErrorPosition(validate.lineNumber);
            }
          }
        }}
        onBlur={onBlur}
      >
        {value}
      </Textarea>
    </Wrapper>
  );
};

export default JSONEditor;
