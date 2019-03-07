import * as React from 'react';
import DropDownFilter from './DropDwonFilter';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { searchText } from '../actions/filter.actions';
import { IFilterReducer } from '../reducers/filter.reducer';
import { IFilterConfig } from '../reducers/IFilterConfig';
import StarRatingComponent from 'react-star-rating-component';
import './styles/filter.scss';

interface IMapStateToProps extends IFilterReducer { }
interface IMapStateToDispatch {
  searchText: (search: string, id: string) => void;
}
type IReviewFilterProps = IMapStateToProps & IMapStateToDispatch;
class ReviewFilter extends React.Component<IReviewFilterProps, any>{

  state = {
    hoverRating: 0,
    clickedRating: 0,
  }

  onChangeHandle = (searchValue: string, id: string) => {
    this.props.searchText(searchValue, id);
  }

  search = (e: any, id: string) => {
    const searchValue = e.currentTarget.value;
    this.props.searchText(searchValue, id);
  }

  renderSearchInput(config: IFilterConfig) {
    return (
      <div className="col-12 text-left">
        <input
          type="text"
          value={config.appliedFilters}
          placeholder="Search here..."
          onChange={(e) => { this.search(e, config.id) }}
        />
      </div>
    )
  }

  renderSearchDropDown(config: IFilterConfig) {
    return (
      <div className="col-md-12">
        <DropDownFilter
          id={config.id}
          data={config.filterValue}
          filterName={config.filterName}
          onValueSet={this.onChangeHandle}
        />
      </div>
    )
  }

  onStarClick = (nextValue: number, prevValue: number, name: string) => {
    this.props.searchText(String(nextValue), 'ratings');
  }

  onStarHover = (nextValue: number, prevValue: number, name: string) => {
    this.setState({
      hoverRating: nextValue
    });
  }

  onStarHoverOut = (nextValue: number, prevValue: number, name: string) => {
    this.setState({
      hoverRating: 0
    });
  }



  renderRatings(config: IFilterConfig) {
    const { appliedFilters } = config;
    const { clickedRating, hoverRating } = this.state;
    return (
      <div className="col-md-12 ratings text-left p-0">
        <StarRatingComponent
          name="ratings1"
          starCount={5}
          value={hoverRating || Number(appliedFilters)}
          onStarClick={this.onStarClick}
          onStarHover={this.onStarHover}
          onStarHoverOut={this.onStarHoverOut}
        />
      </div>
    )
  }

  renderFilters() {
    const { filterConfig } = this.props;
    return filterConfig.filter(v => v.enabled).map(v => {
      if (v.filterType === 'dropdown') {
        return (
          <div key={v.id} className="col-6 float-left p-1">{this.renderSearchDropDown(v)}</div>
        )
      }
      if (v.filterType === 'text') {
        return (
          <div key={v.id} className="col-4 m-1 p-0">{this.renderSearchInput(v)}</div>
        )
      }
      if (v.filterType === 'ratings') {
        return (
          <div key={v.id} className="col-12 m-1">{this.renderRatings(v)}</div>
        )
      }
    })
  }

  render() {
    return (
      <React.Fragment>
        <div className="col-12 filter-option">
          {this.renderFilters()}
        </div>
        <div className="col-12">
          <div className="col-3 float-right">
            <button className="text-uppercase btn btn-primary border rounded">Refresh</button>
          </div>
        </div>
      </React.Fragment>
    );
  }

}

const mapStateToProps = (state: { filterReducer: IFilterReducer }, props: any): IMapStateToProps => {
  return {
    filterConfig: state.filterReducer.filterConfig,
  }
}

const mapStateToDispatch = (dispatch: Dispatch): IMapStateToDispatch => {
  return {
    searchText: (search: string, id: string) => { dispatch(searchText(search, id)); }
  }
}


export default connect(mapStateToProps, mapStateToDispatch)(ReviewFilter);