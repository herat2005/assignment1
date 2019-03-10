import { IAction } from "./review.reducer";
import { SEARCH_INPUT, REFRESH_FILTERS } from "../utils/constants";
import { IFilterConfig } from "./IFilterConfig";

export interface IFilterReducer {
  filterConfig: Array<IFilterConfig>;
}

export const initialState: IFilterReducer = {
  filterConfig: [...getInitialConfig()],
};

export default function (state: IFilterReducer = initialState, action: IAction): IFilterReducer {
  switch (action.type) {
    case SEARCH_INPUT:
      const filterId = action.payload.id;
      const filterValue = action.payload.value;
      const modifiedFilter = state.filterConfig.map(v => {
        if (v.id === filterId) {
          return Object.assign({}, v, { appliedFilters: filterValue });
        }
        return v;
      });
      return Object.assign({}, state, { filterConfig: modifiedFilter });
    case REFRESH_FILTERS:
      return Object.assign({}, state, { filterConfig: [...getInitialConfig()] });
    default:
      return state;
  }
}

export function getInitialConfig(): Array<IFilterConfig> {
  return [{
    id: 'search',
    filterName: 'Search Review',
    filterValue: [],
    filterType: 'text',
    appliedFilters: '',
    enabled: true,
  },
  {
    id: 'ratings',
    filterName: 'Ratings',
    filterValue: ['1', '2', '3', '4', '5'],
    filterType: 'ratings',
    appliedFilters: '',
    enabled: true,
  },
  {
    id: 'group',
    filterName: 'Group By',
    filterValue: ['day', 'week', 'month'],
    filterType: 'dropdown',
    appliedFilters: 'group',
    enabled: true,
  },
  {
    id: 'sort',
    filterName: 'Sort By',
    filterValue: ['asc', 'desc'],
    filterType: 'dropdown',
    appliedFilters: 'sort',
    enabled: true,
  }];
}