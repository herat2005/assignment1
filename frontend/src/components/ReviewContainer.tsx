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
    const today = 1518038627000;// moment(new Date()).valueOf() 
    const createdDate = moment(new Date(searchReview[0].created)).valueOf();
    if (config.appliedFilters === 'day') {
      return searchReview.filter(v => moment(new Date(v.created)).valueOf() === today.valueOf())
    }
    if (config.appliedFilters === 'week') {
      return searchReview.filter(v => moment(new Date(v.created)).valueOf() === today.valueOf())
    }
    if (config.appliedFilters === 'month') {
      return searchReview.filter(v => moment(new Date(v.created)).valueOf() === today.valueOf())
    }
    return searchReview;
  }

  reviewsSortBy(reviews: IReview[]) {
    const { filterConfig } = this.props;
    const config: any = filterConfig.find(v => v.id === 'sort' && v.enabled) || {};
    if (config.appliedFilters === 'desc') {
      return reviews.sort((a, b) => {
        return a.created < b.created ? 1 : -1;
      });
    }
    if (config.appliedFilters === 'asc') {
      return reviews.sort((a, b) => {
        return b.created < a.created ? 1 : -1;
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
    const { reviews } = this.props;
    const { filterConfig } = this.props;
    if ((reviews || []).length === 0) {
      return (
        <p className="no-review">No Review Available</p>
      );
    }

    const searchConfig: any = filterConfig.find(v => v.id === 'search' && v.enabled) || {};
    const searchReview = (reviews || []).filter(review => this.searchInputText(review, searchConfig));

    const groupBy = this.searchGroupBy(searchReview);
    const reviewsSortBy = this.reviewsSortBy(groupBy);

    const ratingsConfig: any = filterConfig.find(v => v.id === 'ratings' && v.enabled) || {};
    const ratingsReview = (reviewsSortBy || []).filter(review => this.searchRatings(review, ratingsConfig));

    if ((ratingsReview || []).length === 0) {
      return (
        <p className="no-review">No Review Available</p>
      );
    }

    return (ratingsReview || []).map((review: IReview) => {
      return <ReviewRow key={review.reviewId} review={review} />;
    });
  }

  render() {
    const { error, loading } = this.props;
    if (error) {
      return (
        <ErrorPage />
      )
    }
    if (loading) {
      return (
        <p className="container loading">Loading...</p>
      )
    }
    return (
      <React.Fragment>
        <div className="row">
          <ReviewFilter />
        </div>
        {this.renderReviewRow()}
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