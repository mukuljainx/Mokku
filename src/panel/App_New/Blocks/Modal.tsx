import React, { useEffect, useState } from "react";
import { useLogStore, useChromeStore } from "../store";
import { AddMock } from "../Mocks/AddMock/AddMock";
import { LogDetails } from "../Logs/LogDetails/LogDetails";
import { Flex } from "@mantine/core";

enum ModalType {
  Mock = "MOCK",
  Log = "LOG",
}

export const Modal = () => {
  const selectedMock = useChromeStore((state) => state.selectedMock);
  const selectedLog = useLogStore((state) => state.selectedLog);
  const setSelectedLog = useLogStore((state) => state.setSelectedLog);
  const [order, setOrder] = useState<ModalType[]>([]);

  const handleModalInstance = (modalType: ModalType, condition: boolean) => {
    setOrder((order) => {
      if (condition) {
        if (order.includes(modalType)) {
          return [...order];
        } else {
          return [modalType, ...order];
        }
      } else {
        return order.filter((o) => o !== modalType);
      }
    });
  };

  useEffect(() => {
    handleModalInstance(ModalType.Mock, !!selectedMock);
  }, [selectedMock]);

  useEffect(() => {
    handleModalInstance(ModalType.Log, !!selectedLog);
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
      {order.map((o) => (
        <Flex key={o}>{componentOrderMap[o]}</Flex>
      ))}
    </div>
  );
};
