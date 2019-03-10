import moment from "moment";
import { IReview } from "../reducers/review.reducer";

export const groupByWeeks = (searchReview: IReview[]) => {
  return searchReview.reduce(function (acc: any, review: any) {    
    var yearWeek = moment(new Date(review.created)).year() + '-' + moment(new Date(review.created)).week();
    // check if the week number exists
    if (typeof acc[yearWeek] === 'undefined') {
      acc[yearWeek] = [];
    }
    acc[yearWeek].push(review);
    return acc;
  }, {});
}

export const groupByDays = (searchReview: IReview[]) => {
  return searchReview.reduce((rv: any, x) => {
    (rv[x['created']] = rv[x['created']] || []).push(x);
    return rv;
  }, {});
}

export const groupByMonths = (searchReview: IReview[]) => {
  return searchReview.reduce(function (acc: any, review: any) {
    var yearWeek = moment(new Date(review.created)).year() + '-' + moment(new Date(review.created)).format('MMM');
    // check if the week number exists
    if (typeof acc[yearWeek] === 'undefined') {
      acc[yearWeek] = [];
    }
    acc[yearWeek].push(review);
    return acc;
  }, {});
}