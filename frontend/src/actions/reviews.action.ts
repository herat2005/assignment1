import { REVIEWS_FETCH_START, REVIEWS_FETCH_FAIL, REVIEWS_FETCH_SUCCESS } from "../utils/constants";
import { fetchWrapper } from "../utils/fetchWrapper";
import { IReview, IAction } from "../reducers/review.reducer";

export const fetchStart = () => {
  return {
    type: REVIEWS_FETCH_START,
  };
};

export const fetchFail = (error: any) => {
  return {
    type: REVIEWS_FETCH_FAIL,
    payload: error,
  };
};

export const fetchSuccess = (reviews: IReview) => {
  return {
    type: REVIEWS_FETCH_SUCCESS,
    payload: reviews,
  };
};

export const fetchReviews = (page: number): Promise<IAction> => {
  const fetchReviewsURL = `http://localhost:8080?page=${page}`;
  return fetchWrapper(fetchReviewsURL)
    .then(res => fetchSuccess(res))
    .catch(error => fetchFail(error));
}