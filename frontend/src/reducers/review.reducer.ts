import { REVIEWS_FETCH_START, REVIEWS_FETCH_SUCCESS, REVIEWS_FETCH_FAIL } from "../utils/constants";

export interface IReviewReducer {
  loading: boolean;
  error: boolean;
  reviews: Array<IReview>;
  hasMore: boolean;
  pageCount: number;
}

export interface IReview {
  country: string;
  reviewId: string;
  childAsin: string;
  authorId: string;
  title: string;
  content: string;
  stars: number;
  verified: boolean;
  reviewCreated: number;
  productImg: string;
  productTitle: string;
  watched: boolean;
  created: number;
}

export interface IAction {
  type: string;
  payload?: any;
}

export const initiakState: IReviewReducer = {
  error: false,
  loading: false,
  hasMore: true,
  reviews: [],
  pageCount: 1,
}

export default function (state: IReviewReducer = initiakState, action: IAction): IReviewReducer {
  switch (action.type) {
    case REVIEWS_FETCH_START:
      return Object.assign({}, state, { loading: true });
    case REVIEWS_FETCH_SUCCESS:
      return Object.assign({}, state, {
        reviews: [...state.reviews, ...(action.payload.reviews || [])],
        loading: false,
        error: false,
        hasMore: action.payload.hasMore,
        pageCount: action.payload.hasMore ? state.pageCount + 1 : state.pageCount,
      });
    case REVIEWS_FETCH_FAIL:
      return Object.assign({}, state, { error: true });
    default:
      return state;
  }
}