import { SEARCH_INPUT } from "../utils/constants";

export const searchText = (value: string, id: string) => {
  return {
    type: SEARCH_INPUT,
    payload: { id, value }
  }
}