import * as React from "react";
import {
  ActionIcon,
  Button,
  Card,
  Center,
  createStyles,
  Flex,
  Text,
  Title,
} from "@mantine/core";
import { MdClose } from "react-icons/md";
import { BsPaypal } from "react-icons/bs";
import { AiFillGithub } from "react-icons/ai";
import { SiBuymeacoffee } from "react-icons/si";
import { RiChromeFill } from "react-icons/ri";

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: "fixed",
    left: 0,
    top: 0,
    height: "100%",
    width: "100%",
    zIndex: 99999,
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
  },
}));

export const SupportUs = ({ onClose }: { onClose: () => void }) => {
  const { classes } = useStyles();
  return (
    <Card className={classes.wrapper}>
      <Flex direction="row-reverse">
        <ActionIcon
          variant="outline"
          color={"blue"}
          onClick={() => onClose()}
          title="Toggle Theme"
        >
          <MdClose />
        </ActionIcon>
      </Flex>
      <Flex direction="column" align="center" gap="16px">
        <Title order={4}>Support the Mokku's Development</Title>
        <Text style={{ maxWidth: 480 }} fz="sm">
          Hi there 👋, I am an Indie developer, who works in his spare time to
          develop Mokku and help other developers around the world, your support
          is highly appreciated to keep the project alive.
        </Text>
        <Flex direction="column" align="center">
          <Flex gap="8px">
            <Button
              size="xs"
              leftIcon={<BsPaypal />}
              variant="outline"
              style={{ width: 240, marginBottom: 12 }}
              onClick={() =>
                chrome.tabs.create({
                  url:
                    "https://paypal.me/mukuljainx?country.x=IN&locale.x=en_GB",
                })
              }
            >
              Paypal Me
            </Button>
            <Button
              size="xs"
              color="orange"
              leftIcon={<SiBuymeacoffee />}
              variant="outline"
              style={{ width: 240, marginBottom: 12 }}
              onClick={() =>
                chrome.tabs.create({
                  url: "https://www.buymeacoffee.com/mukuljainx",
                })
              }
            >
              Buy me a Coffee
            </Button>
          </Flex>
          <Flex gap="8px">
            <Button
              size="xs"
              color="dark"
              leftIcon={<AiFillGithub />}
              variant="outline"
              style={{ width: 240, marginBottom: 12 }}
              onClick={() =>
                chrome.tabs.create({
                  url: "https://github.com/mukuljainx/mokku-bug-trakcer/issues",
                })
              }
            >
              Raise Issue on Github
            </Button>
            <Button
              size="xs"
              color="indigo"
              leftIcon={<RiChromeFill />}
              variant="outline"
              style={{ width: 240, marginBottom: 12 }}
              onClick={() =>
                chrome.tabs.create({
                  url:
                    "https://chrome.google.com/webstore/detail/mokku/llflfcikklhgamfmnjkgpdadpmdplmji",
                })
              }
            >
              Review on Chrome Store
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
};
