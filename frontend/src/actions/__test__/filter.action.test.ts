import { searchText, refreshFilters } from "../filter.actions";
import { SEARCH_INPUT, REFRESH_FILTERS } from "../../utils/constants";

describe('filter action test suits', () => {
  it('to set filter value', () => {
    const value = 'test';
    const id = 'filterId';
    const action = {
      type: SEARCH_INPUT,
      payload: { value, id },
    }
    expect(searchText(value, id)).toEqual(action)
  });

  it('reset Filter', () => {
    const action = {
      type: REFRESH_FILTERS,
    }
    expect(refreshFilters()).toEqual(action)
  });
});