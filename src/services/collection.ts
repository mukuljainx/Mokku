import { IStore } from "../interface/mock";
import { IMethod } from "../interface/network";

export const getDefultStore = (): IStore => ({
  active: false,
  mocks: {},
  collections: {},
});

export const getNetworkMethodList = (): IMethod[] => [
  "GET",
  "POST",
  "PATCH",
  "PUT",
  "DELETE",
];
