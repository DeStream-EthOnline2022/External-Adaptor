import { StoreData } from "../types/Store";

export interface ChainLinkAdapterResult {
  jobRunID: string;
  data?: Record<string, string> | APIResult;
  error?: any;
}

export type APIResult = StoreData | StoreData[];
