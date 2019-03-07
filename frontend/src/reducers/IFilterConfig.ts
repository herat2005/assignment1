export interface IFilterConfig {
  id: string;
  enabled:boolean;
  filterName: string;
  filterValue: Array<string>;
  filterType: 'text' | 'dropdown' | 'ratings';
  appliedFilters: string;
}
