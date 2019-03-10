import { SEARCH_INPUT, REFRESH_FILTERS } from "../utils/constants";

export const searchText = (value: string, id: string) => {
  return {
    type: SEARCH_INPUT,
    payload: { id, value }
  }
}

export const refreshFilters = () => {
  return {
    type: REFRESH_FILTERS,
  }
}