import * as React from 'react';

export interface IDropDownFilterProps {
  id: string;
  data: Array<string>;
  filterName: string;
  appliedFilters: string;
  onValueSet: (value: string, id: string) => void;
}

export default class DropDownFilter extends React.Component<IDropDownFilterProps, any> {

  generateFilter() {
    const { data } = this.props;
    return (data || []).map(v => this.renderOptions(v))
  }

  renderOptions(v: string) {
    return <option key={v} value={v}>{v}</option>
  }

  handleChange = (e: any) => {
    const { id } = this.props;
    this.props.onValueSet(e.target.value, id);
    e.preventDefault();
  }

  render() {
    const { filterName, id, appliedFilters } = this.props;
    return (
      <select
        key={filterName}
        onChange={(e) => this.handleChange(e)}
        value={appliedFilters}
        className="form-control col-12 round border"
      >
        <option value={id} key={id}>{id}</option>
        {this.generateFilter()}
      </select>
    )
  }

}