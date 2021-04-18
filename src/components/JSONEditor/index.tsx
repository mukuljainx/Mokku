import { FormikHandlers } from "formik";
import * as React from "react";
import styled from "styled-components";
import AceEditor from "react-ace";
import "brace/mode/json";
import "brace/theme/github";

const Wrapper = styled.div`
  height: 100%;
`;

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
  const ref = React.useRef();

  React.useEffect(() => {
    if (!ref.current) {
      return;
    }

    const editor = (ref.current as any)!.editor;

    editor.onPaste = (event, x, y) => {
      // debugger;
      console.log(event);
      editor.session.insert(editor.getCursorPosition(), event);
      debugger;
      const v = editor.getValue();
      let formatted = v;
      try {
        formatted = JSON.stringify(JSON.parse(v), null, "\t");
      } catch (e) {
        formatted = v;
      }
      var pos = editor.session.selection.toJSON();

      editor.setValue(formatted);
      editor.session.selection.fromJSON(pos);

      return false;
    };
  }, []);

  return (
    <Wrapper className={className} style={style}>
      <AceEditor
        ref={ref}
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
