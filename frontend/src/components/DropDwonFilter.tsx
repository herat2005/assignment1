import * as React from 'react';

export interface IDropDownFilterProps {
  id: string;
  data: Array<string>;
  filterName: string;
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
    const { filterName } = this.props;
    return (
      <select
        key={filterName}
        onChange={(e) => this.handleChange(e)}
        className="form-control col-12 round border"
      >
        <option key={filterName} value={filterName}>{filterName}</option>
        {this.generateFilter()}
      </select>
    )
  }

}