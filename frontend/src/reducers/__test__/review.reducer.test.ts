import reviewReducer, { initiakState } from '../review.reducer';
import { REVIEWS_FETCH_START, REVIEWS_FETCH_SUCCESS, REVIEWS_FETCH_FAIL } from '../../utils/constants';
import { reviewsMock } from '../mocks/reviews.mock'

describe('check for review reducer', () => {
  it('check for no action', () => {
    expect(reviewReducer(initiakState, { type: '', payload: '' })).toEqual(initiakState);
  });
  it('should return loading state on fetch start', () => {
    expect(reviewReducer(initiakState, { type: REVIEWS_FETCH_START }).loading).toBeTruthy();
  });
  it('should return proper state on fetch success', () => {
    expect(reviewReducer(initiakState, { type: REVIEWS_FETCH_SUCCESS, payload: { reviews: reviewsMock } }).reviews).toEqual(reviewsMock);
    expect(reviewReducer(initiakState, { type: REVIEWS_FETCH_SUCCESS, payload: { reviews: reviewsMock } }).loading).toBeFalsy();
    expect(reviewReducer(initiakState, { type: REVIEWS_FETCH_SUCCESS, payload: { reviews: reviewsMock } }).error).toBeFalsy();
  });
  it('should return fail state on fetch fail', () => {
    expect(reviewReducer(initiakState, { type: REVIEWS_FETCH_FAIL }).error).toBeTruthy();
  });
});