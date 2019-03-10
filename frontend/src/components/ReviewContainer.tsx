import * as React from 'react';
import moment from 'moment';
import ReviewFilter from './ReviewFilter';
import ReviewRow from './ReviewRow';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { fetchReviews, fetchStart } from '../actions/reviews.action';
import { IReviewReducer, IReview } from '../reducers/review.reducer';
import { IFilterReducer } from '../reducers/filter.reducer';
import { IFilterConfig } from '../reducers/IFilterConfig';
import ErrorPage from '../containers/ErrorPage';
import '../components/styles/layout.scss';
import { groupByWeeks, groupByDays, groupByMonths } from '../utils/common';
interface IMapStateToDispatchReview {
  fetchReviews: (pageCount: number) => void;
};
interface IMapStateToPropsReview extends IReviewReducer {
  filterConfig: IFilterConfig[];
};

type IReviewContainerProps = IMapStateToPropsReview & IMapStateToDispatchReview;
export class ReviewContainer extends React.Component<IReviewContainerProps, any>{

  componentDidMount() {
    const { pageCount } = this.props;
    this.props.fetchReviews(pageCount);
    window.addEventListener('scroll', this.onScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  onScroll = () => {
    const { hasMore, pageCount, loading } = this.props;
    if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 500) && hasMore && !loading) {
      this.props.fetchReviews(pageCount);
    }
  }

  searchInputText(review: IReview, config: IFilterConfig) {
    const appliedFilterExp = new RegExp(config.appliedFilters, 'gi');
    return appliedFilterExp.test(`${review.title} ${review.content}`);
  }

  searchGroupBy(searchReview: IReview[]) {
    const { filterConfig } = this.props;
    const config: any = filterConfig.find(v => v.id === 'group' && v.enabled) || {};
    if (config.appliedFilters === 'day' || config.appliedFilters === 'group') {
      return groupByDays(searchReview);
    }
    if (config.appliedFilters === 'week') {
      return groupByWeeks(searchReview);
    }
    if (config.appliedFilters === 'month') {
      return groupByMonths(searchReview);
    }
    return searchReview;
  }

  reviewsSortBy(reviews: string[]) {
    const { filterConfig } = this.props;
    const config: any = filterConfig.find(v => v.id === 'sort' && v.enabled) || {};
    if (config.appliedFilters === 'desc') {
      return reviews.sort((a, b) => {
        return a < b ? 1 : -1;
      });
    }
    if (config.appliedFilters === 'asc' || config.appliedFilters === 'sort') {
      return reviews.sort((a, b) => {
        return b < a ? 1 : -1;
      });
    }
    return reviews;
  }

  searchRatings(review: IReview, ratingsConfig: IFilterConfig) {
    if (((ratingsConfig || {}).appliedFilters || '') === '') {
      return true;
    }
    return review.stars === Number(ratingsConfig.appliedFilters || 0);
  }

  renderReviewRow() {
    const { reviews, loading } = this.props;
    const { filterConfig } = this.props;
    let allReviews: any[] = [];
    let totalReviews = 0;
    if ((reviews || []).length === 0 && !loading) {
      return (
        <p className="no-review">No Review Available</p>
      );
    }
    const searchConfig: any = filterConfig.find(v => v.id === 'search' && v.enabled) || {};
    const searchReview = (reviews || []).filter(review => this.searchInputText(review, searchConfig));
    const ratingsConfig: any = filterConfig.find(v => v.id === 'ratings' && v.enabled) || {};
    const ratingsReview = (searchReview || []).filter(review => this.searchRatings(review, ratingsConfig));
    const groupbyConfig: any = filterConfig.find(v => v.id === 'group' && v.enabled) || {};
    const groupBy = this.searchGroupBy(ratingsReview);
    const allReviewsCount = Object.keys(groupBy || {}).length;

    if (allReviewsCount === 0 && !loading) {
      return (
        <p className="no-review">No Review Available</p>
      );
    }

    const sortedReviews: string[] = this.reviewsSortBy(Object.keys(groupBy));

    for (let time of sortedReviews) {
      if (groupbyConfig.appliedFilters === 'month' || groupbyConfig.appliedFilters === 'week') {
        allReviews.push(<h5 className='text-left rdate' key={time}>{time}</h5>);
      }
      totalReviews = totalReviews + groupBy[time].length;
      (groupBy[time] || {}).map((review: IReview) => {
        allReviews.push(<ReviewRow key={review.reviewId} review={review} />);
      });
    }

    return [
      <span className="row text-right" key={'reviewcount'}>Total Reviews : [ {totalReviews} ]</span>
      , allReviews
    ];
  }

  render() {
    const { error, loading } = this.props;
    if (error) {
      return (
        <ErrorPage />
      )
    }

    return (
      <React.Fragment>
        <div className="row">
          <ReviewFilter />
        </div>
        {this.renderReviewRow()}
        {loading ? <div className="loading col-md-offset-4 col-4"><div className="spinner"></div></div> : false}
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state: {
  reviewReducer: IReviewReducer;
  filterReducer: IFilterReducer;
}, props: any): IMapStateToPropsReview => {
  return {
    loading: state.reviewReducer.loading,
    error: state.reviewReducer.error,
    reviews: state.reviewReducer.reviews,
    hasMore: state.reviewReducer.hasMore,
    pageCount: state.reviewReducer.pageCount,
    filterConfig: state.filterReducer.filterConfig,
  };
};

const mapStateToDispatch = (dispatch: Dispatch): IMapStateToDispatchReview => {
  return {
    fetchReviews: (pageCount: number) => {
      dispatch(fetchStart());
      fetchReviews(pageCount).then(action => dispatch(action));
    },
  };
};

export default connect(mapStateToProps, mapStateToDispatch)(ReviewContainer)