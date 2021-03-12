import * as React from "react";
import styled from "styled-components";
import { Button } from "../../components/atoms";

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 99999;
  background: white;
  padding: 16px;

  a {
    color: ${({ theme }) => theme.colors.primary};
    cursor: pointer;
  }
`;

const twitterUrl =
  "https://twitter.com/intent/tweet?url=https%3A%2F%2Fchrome.google.com%2Fwebstore%2Fdetail%2Fmokku-mock-api-calls-seam%2Fllflfcikklhgamfmnjkgpdadpmdplmji%3Fhl%3Den%26authuser%3D0&via=ion_reactor&text=Mokku%3A%20Mock%20API%20calls%20seamlessly";

const githubIssue = "https://github.com/mukuljainx/Mokku/issues/new";
const chromeStore =
  "https://chrome.google.com/webstore/detail/mokku-mock-api-calls-seam/llflfcikklhgamfmnjkgpdadpmdplmji?hl=en&authuser=0";

interface IProps {
  onClose: () => void;
}

const Promotion = ({ onClose }: IProps) => {
  const handleClick = (url: string) => {
    chrome.tabs.create({ url });
  };
  return (
    <Wrapper>
      <div style={{ textAlign: "center" }}>
        <h3>Enjoying Mokku? </h3>
        <p>
          <a onClick={() => handleClick(twitterUrl)}>Share on Twitter 💪</a>
        </p>
        <p>
          <a onClick={() => handleClick(chromeStore)}>
            Rate us on Chrome Store 🙏
          </a>
        </p>
        <h3>Missing Something?</h3>
        <p>
          <a onClick={() => handleClick(githubIssue)}>
            Raise feature request on Github 🪄
          </a>
        </p>

        <Button onClick={onClose} style={{ marginTop: 32 }}>
          Go Back
        </Button>
      </div>
    </Wrapper>
  );
};

export default Promotion;
