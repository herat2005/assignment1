import * as React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DropDownFilter, { IDropDownFilterProps } from '../DropDwonFilter';

Enzyme.configure({ adapter: new Adapter() });

describe('Test Render for DropDown Component', () => {
  let wrapper: any;

  const mockOnChange = jest.fn();
  const event = {
    preventDefault() { },
    target: { value: 'the-value' }
  };
  let props: IDropDownFilterProps = {
    id: 'test',
    data: ['1', '2', '3', '4'],
    filterName: 'demo',
    appliedFilters: '',
    onValueSet: mockOnChange,
  };
  beforeEach(() => {
    wrapper = shallow(<DropDownFilter {...props} />);
  });
  it('should render with provided data', () => {
    expect(wrapper.find('option').length).toBe(props.data.length + 1);
  });
  it('should call function on change of option', () => {
    wrapper.find('select').at(0).simulate('change', event)
    expect(mockOnChange.mock.calls.length).toBe(1);
  });
})