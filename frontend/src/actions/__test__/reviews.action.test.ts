import { fetchStart, fetchFail, fetchReviews } from '../reviews.action';
import { REVIEWS_FETCH_START, REVIEWS_FETCH_FAIL, REVIEWS_FETCH_SUCCESS } from '../../utils/constants';
import * as fetchHelper from '../../utils/fetchWrapper';
import { reviewsMock } from '../../reducers/mocks/reviews.mock'

describe('reviews action testing', () => {
  it('fetch review action', () => {
    const url = 'mock url';
    const spy = jest.spyOn(fetchHelper, 'fetchWrapper')
      .mockImplementationOnce((url) => {
        return new Promise(resolve => resolve(reviewsMock));
      }).mockImplementationOnce((url) => {
        return Promise.reject('no data Or API issue');
      })
    expect(fetchReviews(1)).resolves.toEqual({
      type: REVIEWS_FETCH_SUCCESS,
      payload: reviewsMock,
    });
    expect(fetchReviews(2)).resolves.toEqual({
      type: REVIEWS_FETCH_FAIL,
      payload: 'no data Or API issue',
    });
    fetchReviews(1);
    expect(spy).toHaveBeenCalled();
    spy.mockClear();
  });
  it('start review action', () => {
    expect(fetchStart()).toEqual({ type: REVIEWS_FETCH_START });
  });
  it('fail review action', () => {
    expect(fetchFail('error')).toEqual({ type: REVIEWS_FETCH_FAIL, payload: 'error' });
  });
});