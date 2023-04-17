import * as React from "react";

import styled from "styled-components";
import { Button } from "../atoms";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

interface IProps {}

const ByMeACoffee = ({}: IProps) => {
  return (
    <Wrapper>
      <Button
        style={{ width: 240, marginBottom: 12 }}
        background="primary"
        color="white"
        onClick={() =>
          chrome.tabs.create({
            url: "https://www.buymeacoffee.com/mukuljainx",
          })
        }
      >
        Support Extention
      </Button>
      <p style={{ maxWidth: 540, textAlign: "center" }}>
        Hope you are loving the extension, it takes significant amount of time
        to create and maintain a extension, your support keeps me motivated and
        helps me with coffee to bring out the best of extension.
      </p>
      <Button
        style={{ width: 240, marginBottom: 12, marginTop: 32 }}
        background="primary"
        color="white"
        onClick={() =>
          chrome.tabs.create({
            url: "https://github.com/mukuljainx/mokku",
          })
        }
      >
        Feature request or Report a bug
      </Button>
      <p style={{ maxWidth: 540, textAlign: "center" }}>
        Facing a bug or need a feature? please open an issue on Github will
        resolve it as soon as possible.
      </p>
    </Wrapper>
  );
};

export default React.memo(ByMeACoffee);
