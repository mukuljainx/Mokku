import { IStore } from "../interface/mock";

export const getDefultStore = (): IStore => ({
  active: false,
  mocks: {},
  collections: {},
});
