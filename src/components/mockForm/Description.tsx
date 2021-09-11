import * as React from "react";

import { Input } from "./index";

interface IProps {
  description: string;
  handleChange: any;
  handleBlur: any;
}

const Description = ({ description, handleChange, handleBlur }: IProps) => {
  return (
    <div style={{ marginTop: 8 }}>
      <Input
        style={{ height: "100%", width: "100%" }}
        as="textarea"
        name="description"
        value={description}
        onChange={handleChange}
        onBlur={handleBlur}
        rows={5}
      />
    </div>
  );
};

export default Description;
