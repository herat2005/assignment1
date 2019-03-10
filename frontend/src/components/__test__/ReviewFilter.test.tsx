import * as React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReviewFilter from '../ReviewFilter';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { getInitialConfig } from '../../reducers/filter.reducer';
import { IFilterConfig } from '../../reducers/IFilterConfig';


Enzyme.configure({ adapter: new Adapter() });

describe('review filter test suit', () => {
  const mockFunction = jest.fn();
  let wrapper: any, store: any, state: any;
  const middlewares = [thunk]; // add your middlewares like `redux-thunk`
  const mockStore = configureStore(middlewares);
  beforeEach(() => {
    state = {
      filterReducer: {
        filterConfig: getInitialConfig(),
      }
    };
    store = mockStore(state);
    wrapper = mount(
      <Provider store={store}>
        <ReviewFilter />
      </Provider>
    );
  });

  it('should render as per filter enabled', () => {
    expect(wrapper.find('input[type="text"]').length).toBe(state.filterReducer.filterConfig
      .filter((v: IFilterConfig) => v.filterType == 'text').length);
    expect(wrapper.find('select').length).toBe(state.filterReducer.filterConfig
      .filter((v: IFilterConfig) => v.filterType == 'dropdown').length);
    expect(wrapper.find('StarRatingComponent').length).toBe(state.filterReducer.filterConfig
      .filter((v: IFilterConfig) => v.filterType == 'ratings').length);
  });  
});