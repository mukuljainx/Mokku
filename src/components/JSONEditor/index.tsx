import { FormikHandlers } from "formik";
import * as React from "react";
import styled from "styled-components";
import brace from "brace";
import AceEditor from "react-ace";
import "brace/mode/json";
import "brace/theme/github";

import { isValidJSON } from "../../services/helper";

const Wrapper = styled.div``;

interface IProps {
  error?: boolean;
  value?: string;
  name?: string;
  onChange: (v: string) => void;
  onBlur?: FormikHandlers["handleBlur"];
  style?: React.CSSProperties;
  onError?: (e: string) => void;
  className?: string;
}

const JSONEditor = ({
  error,
  value,
  onChange,
  onBlur,
  style,
  className,
  onError,
}: IProps) => {
  return (
    <Wrapper className={className} style={style}>
      <AceEditor
        style={{ height: "100%", width: "calc(100% - 4px)" }}
        mode="json"
        theme="github"
        onValidate={(e) => {
          if (e.length > 0 && onError) {
            onError(e[0].text);
          }
        }}
        onBlur={onBlur}
        value={value}
        onChange={onChange}
        name="response"
        editorProps={{ $blockScrolling: true }}
      />
    </Wrapper>
  );
};

export default JSONEditor;
