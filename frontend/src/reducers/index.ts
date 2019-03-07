import { combineReducers, Reducer } from "redux";
import reviewReducer, { IReviewReducer } from "./review.reducer";
import filterReducer, { IFilterReducer } from "./filter.reducer";

export const allReducer = combineReducers({
  reviewReducer: reviewReducer as Reducer<IReviewReducer>,
  filterReducer: filterReducer as Reducer<IFilterReducer>,
});