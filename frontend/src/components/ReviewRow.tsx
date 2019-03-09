import * as React from 'react';
import moment from 'moment';
import StarRatingComponent from 'react-star-rating-component';
import { IReview } from '../reducers/review.reducer';

export interface IReviewRowProps {
  review: IReview;
}

export default class ReviewRow extends React.Component<IReviewRowProps, any>{

  renderReview() {
    const { review } = this.props;
    const { title, created, stars, reviewId,
      content, productTitle }: IReview = { ...review };
    return (
      <div className="row">
        <div className="row text-left rdate">
          <span>{moment(new Date(created)).format('MMM-YYYY')}</span>
        </div>
        <div className='row border rounded m-2 p-2'>
          <div className="col-12 d-flex h-100">
            <div className="row">
              <div className="col-md-3 col-6 float-left">
                <img src="http://sercons.ch/wp-content/uploads/2016/01/no-person.jpg" height={100} alt="No Image" title="No Image" />
              </div>
              <div className="col-md-3 col-6 align-self-center justify-content-center d-md-block d-none">
                <div className="col-12">Date</div>
                <div className="col-12 created-date">
                  {moment(new Date(created)).format('MM/DD/YYYY')}
                </div>
              </div>
              <div className="col-md-3 align-self-center justify-content-center d-none d-md-block">
                <div className="col-12">
                  <StarRatingComponent
                    name="rate1"
                    starCount={5}
                    value={stars}
                  />
                </div>
              </div>
              <div className="col-md-3 align-self-center justify-content-center d-none d-md-block">
                <div className='col-12'>{reviewId}</div>
                <div className='col-12'>{productTitle}</div>
              </div>
              <div className="col-6 d-md-none d-sm-block align-self-center text-left">
                <div className="col-xs-12 review-create">
                  {moment(new Date(created)).format('MM/DD/YYYY')}
                </div>
                <div className="col-xs-12">
                  <StarRatingComponent
                    name="rate1"
                    starCount={5}
                    value={stars}
                  />
                </div>
                <div className='col-xs-12'>{reviewId}</div>
                <div className='col-xs-12'>{productTitle}</div>
              </div>
              <div className="col-12 text-left">
                <span className="col-xs-12 my-2"><h4>{title}</h4></span>
                <div className="col-xs-12">{content}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <React.Fragment>
        {this.renderReview()}
      </React.Fragment>
    )
  }
}
