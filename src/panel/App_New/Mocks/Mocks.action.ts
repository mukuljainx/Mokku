import { notifications } from "@mantine/notifications";
import { useCallback } from "react";
import { shallow } from "zustand/shallow";
import * as storeService from "../service/store";
import { useChromeStore, useChromeStoreState } from "../store/useMockStore";
import { IMockResponse } from "../types/mock";

const useMockStoreSelector = (state: useChromeStoreState) => ({
  store: state.store,
  setStoreProperties: state.setStoreProperties,
  setSelectedMock: state.setSelectedMock,
});

export const useMockActions = () => {
  const { store, setSelectedMock, setStoreProperties } = useChromeStore(
    useMockStoreSelector,
    shallow,
  );

  const toggleMock = useCallback(
    (mockToBeUpdated: IMockResponse) => {
      const updatedStore = storeService.updateMocks(store, mockToBeUpdated);
      const mockStatus = mockToBeUpdated.active ? "is enabled" : "is disabled";
      storeService
        .updateStoreInDB(updatedStore)
        .then(setStoreProperties)
        .then(() => {
          notifications.show({
            title: `"${mockToBeUpdated.name}" is ${mockStatus}`,
            message: `Mock ${mockStatus}`,
          });
        })
        .catch(() => {
          notifications.show({
            title: "Cannot updated mock.",
            message: "Something went wrong, unable to update mock.",
            color: "red",
          });
        });
    },
    [store, setStoreProperties],
  );
  const deleteMock = useCallback(
    (mockToBeDeleted: IMockResponse) => {
      const updatedStore = storeService.deleteMocks(store, mockToBeDeleted.id);

      storeService
        .updateStoreInDB(updatedStore)
        .then(setStoreProperties)
        .then(() => {
          notifications.show({
            title: `"${mockToBeDeleted.name}" mock deleted`,
            message: `Mock "${mockToBeDeleted.name}" is deleted successfully.`,
          });
        })
        .catch((error) => {
          console.log(error);
          notifications.show({
            title: "Cannot delete mock.",
            message:
              "Something went wrong, unable to delete mock. Check console for error.",
            color: "red",
          });
        });
    },
    [store, setStoreProperties],
  );
  const duplicateMock = useCallback(
    (mock: IMockResponse) => {
      setSelectedMock({ ...mock, id: undefined });
    },
    [setSelectedMock],
  );

  const editMock = useCallback(
    (mock: IMockResponse) => {
      setSelectedMock(mock);
    },
    [setSelectedMock],
  );

  return { toggleMock, deleteMock, duplicateMock, editMock };
};
