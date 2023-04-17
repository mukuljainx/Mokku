import { IMethod } from "../interface/network";

export const getNetworkMethodList = (): IMethod[] => [
  "GET",
  "POST",
  "PATCH",
  "PUT",
  "DELETE",
];

export const getNetworkMethodMap = () => ({
  GET: null,
  POST: null,
  PATCH: null,
  PUT: null,
  DELETE: null,
});
