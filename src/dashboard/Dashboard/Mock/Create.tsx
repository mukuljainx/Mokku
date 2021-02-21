import * as React from "react";
import styled from "styled-components";

// import MockForm from "../../../components/mockForm";

const Wrapper = styled("div")`
  #mock-create-input,
  #multi-select-wrapper {
    height: 32px;
  }

  .mock-create-group {
    margin-bottom: 24px;
  }

  .mock-create-method,
  .mock-create-status,
  .mock-create-delay {
    flex-grow: 0;
  }

  .mock-create-response {
    .mock-create-group {
      margin-bottom: 8px;
    }
  }
`;

const List = () => {
  return <Wrapper>{/* <MockForm /> */}</Wrapper>;
};

export default List;
