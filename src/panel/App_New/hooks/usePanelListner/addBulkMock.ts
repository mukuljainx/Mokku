import { storeActions } from "../../service/storeActions";
import { useChromeStore } from "../../store/useMockStore";
import { IMockResponse, IStore } from "@mokku/types";
import { notifications } from "@mantine/notifications";
import { useGlobalStore } from "../../store/useGlobalStore";

export const useAddBulkMock = () => {
  const setStoreProperties = useChromeStore(
    (state) => state.setStoreProperties,
  );
  const tab = useGlobalStore((state) => state.meta.tab);

  const addBulkMock = async (mocks: IMockResponse[]) => {
    const { store } = await storeActions.getStore();
    const updatedStore = storeActions.addMocks(store, mocks);

    storeActions
      .updateStoreInDB(updatedStore)
      .then(setStoreProperties)
      .then(() => {
        storeActions.refreshContentStore(tab.id);
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
