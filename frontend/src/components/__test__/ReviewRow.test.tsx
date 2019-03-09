import * as React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReviewRow, { IReviewRowProps } from '../ReviewRow';
import { reviewsMock } from '../../reducers/mocks/reviews.mock';
import moment from 'moment';

Enzyme.configure({ adapter: new Adapter() });

describe('Review Row test suits', () => {

  let wrapper: any, props: IReviewRowProps;
  beforeEach(() => {
    props = {
      review: reviewsMock[0],
    };
    wrapper = shallow(<ReviewRow  {...props} />)
  });

  it('should render date as title', () => {
    const expectedDatetitle = moment(new Date(props.review.created)).format('MMM-YYYY');
    expect(wrapper.find('.rdate span').text()).toBe(expectedDatetitle);
  });

  it('should render formated date', () => {
    const expectedDatetitle = moment(new Date(props.review.created)).format('MM/DD/YYYY');
    expect(wrapper.find('.created-date').text()).toBe(expectedDatetitle);
  });

});