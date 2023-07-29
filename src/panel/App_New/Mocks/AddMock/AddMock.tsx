import React from "react";
import { SideDrawer, SideDrawerHeader } from "../../Blocks/SideDrawer";
import { useMockStore, useMockStoreState } from "../../store/useMockStore";
import { AddMockForm } from "./AddMock.Form";

const useMockStoreSelector = (state: useMockStoreState) => ({
  store: state.store,
  selectedMock: state.selectedMock,
  setSearch: state.setSearch,
  setSelectedMock: state.setSelectedMock,
  setStoreProperties: state.setStoreProperties,
});

export const AddMock = () => {
  const {
    store,
    selectedMock,
    setSelectedMock,
    setStoreProperties,
  } = useMockStore(useMockStoreSelector);

  return (
    <SideDrawer>
      <AddMockForm
        key={`${selectedMock.id}-${selectedMock.url}`}
        store={store}
        selectedMock={selectedMock}
        setSelectedMock={setSelectedMock}
        setStoreProperties={setStoreProperties}
      />
    </SideDrawer>
  );
};
