import React, { useEffect, useState } from "react";
import { useLogStore, useMockStore } from "./store";
import { AddMock } from "./Mocks/AddMock/AddMock";
import { LogDetails } from "./Logs/LogDetails/LogDetails";
import { Flex } from "@mantine/core";

export const Modal = () => {
  const selectedMock = useMockStore((state) => state.selectedMock);
  const selectedLog = useLogStore((state) => state.selectedLog);
  const setSelectedLog = useLogStore((state) => state.setSelectedLog);
  const [order, setOrder] = useState([]);
  useEffect(() => {
    if (selectedMock) {
      setOrder((order) => [...order, "MOCK"]);
    } else {
      setOrder((order) => order.filter((o) => o !== "MOCK"));
    }
  }, [selectedMock]);

  useEffect(() => {
    if (selectedLog) {
      setOrder((order) => [...order, "LOG"]);
    } else {
      setOrder((order) => order.filter((o) => o !== "LOG"));
    }
  }, [selectedLog]);

  const Mock = selectedMock ? <AddMock /> : null;
  const Log = selectedLog ? (
    <LogDetails log={selectedLog} onClose={() => setSelectedLog()} />
  ) : null;

  const componentOrderMap = {
    MOCK: Mock,
    LOG: Log,
  };

  return (
    <div
      style={{
        display: "flex",
        position: "fixed",
        top: 0,
        right: 0,
        height: "100vh",
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        zIndex: 1000,
        background: "white",
      }}
    >
      {order.reverse().map((o) => (
        <Flex key={o}>{componentOrderMap[o]}</Flex>
      ))}
    </div>
  );
};
