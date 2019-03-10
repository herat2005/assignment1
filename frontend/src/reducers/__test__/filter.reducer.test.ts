import filterReducer, { initialState, IFilterReducer } from "../filter.reducer";
import { SEARCH_INPUT, REFRESH_FILTERS } from "../../utils/constants";


describe('filter reducer test case', () => {
  let stateValue: IFilterReducer;
  beforeEach(() => {
    stateValue = { ...initialState };
  });
  it('check for no action', () => {
    expect(filterReducer(initialState, { type: '', payload: '' })).toEqual(initialState);
  });
  it('wrong id should not impact state', () => {
    const action = { type: SEARCH_INPUT, payload: { value: 'test', id: 'IdNotExist' } };
    expect(filterReducer(stateValue, action)).toEqual(stateValue);
  });
  it('should set proper filter on change of filter', () => {
    const action = { type: SEARCH_INPUT, payload: { value: 'test', id: 'group' } };
    const modifiedFilter = initialState.filterConfig.map(v => {
      if (v.id === action.payload.id) {
        return Object.assign({}, v, { appliedFilters: action.payload.value });
      }
      return v;
    });
    expect(filterReducer(stateValue, action)).toEqual({ filterConfig: modifiedFilter });
  });
  it('reset filters', () => {
    const action = { type: REFRESH_FILTERS };
    expect(filterReducer(stateValue, action)).toEqual({ filterConfig: initialState.filterConfig });
  });
});