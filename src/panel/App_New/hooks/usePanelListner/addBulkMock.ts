import { addMocks, getStore, updateStoreInDB } from "../../service/store";
import { useMockStore } from "../../store/useMockStore";
import { IMockResponse, IStore } from "@mokku/types";
import { notifications } from "@mantine/notifications";

export const useAddBulkMock = () => {
  const setStoreProperties = useMockStore((state) => state.setStoreProperties);

  const addBulkMock = async (mocks: IMockResponse[]) => {
    const { store } = await getStore();
    const updatedStore = addMocks(store, mocks);

    updateStoreInDB(updatedStore)
      .then(setStoreProperties)
      .then(() => {
        notifications.show({
          title: "Network calls mocked successfully.",
          message:
            "Current recording of network calls has been mock successfully.",
        });
      })
      .catch((e) => {
        console.log(e);
        notifications.show({
          title: "Cannot mock network calls.",
          message: "Something went wrong, check console for more.",
        });
      });
  };

  return addBulkMock;
};
