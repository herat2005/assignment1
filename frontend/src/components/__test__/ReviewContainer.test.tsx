import * as React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ConnectedReviewContainer, { ReviewContainer } from '../ReviewContainer';
import { reviewsMock } from '../../reducers/mocks/reviews.mock';
import { getInitialConfig } from '../../reducers/filter.reducer';

Enzyme.configure({ adapter: new Adapter() });

describe('Review Container test suits', () => {

  let wrapper: any, store: any, state: any;
  const middlewares = [thunk]; // add your middlewares like `redux-thunk`
  const mockStore = configureStore(middlewares);
  beforeEach(() => {
    state = {
      reviewReducer: {
        loading: false,
        error: false,
        reviews: [],
        hasMore: false,
        pageCount: 0,
      },
      filterReducer: {
        filterConfig: getInitialConfig(),
      }
    };
  })

  it('should render error page on error', () => {
    state.reviewReducer.error = true;
    store = mockStore(state);
    wrapper = mount(
      <Provider store={store}>
        <ConnectedReviewContainer />
      </Provider>
    );
    expect(wrapper.find('.error-page').length).toBe(1);
    expect(wrapper.find('ReviewFilter').length).toBe(0);
    expect(wrapper.find('loading').length).toBe(0);
  });

  it('should render loading text', () => {
    state.reviewReducer.loading = true;
    store = mockStore(state);
    wrapper = mount(
      <Provider store={store}>
        <ConnectedReviewContainer />
      </Provider>
    );
    expect(wrapper.find('.loading').length).toBe(1);
    expect(wrapper.find('ReviewFilter').length).toBe(0);
    expect(wrapper.find('.error-page').length).toBe(0);
  });

  it('should render correctly and no review messgae in case of no review', () => {
    store = mockStore(state);
    wrapper = mount(
      <Provider store={store}>
        <ConnectedReviewContainer />
      </Provider>
    );
    expect(wrapper.find('.loading').length).toBe(0);
    expect(wrapper.find('.error-page').length).toBe(0);
    expect(wrapper.find('ReviewFilter').length).toBe(1);
    expect(wrapper.find('.no-review').length).toBe(1);
  });

  it('should render correctly and review count should be matched', () => {
    state.reviewReducer.reviews = [...reviewsMock];
    store = mockStore(state);
    wrapper = mount(
      <Provider store={store}>
        <ConnectedReviewContainer />
      </Provider>
    );
    expect(wrapper.find('ReviewRow').length).toBe(reviewsMock.length);
  });

});