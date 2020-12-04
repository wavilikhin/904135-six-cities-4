import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { ActionCreator } from "../../reducer/state/state";

interface Props {
  sortBy(value: string): void;
}

interface State {
  isSortSecletOpen: boolean;
  sortBy: string;
}
class PlaceSorting extends PureComponent<Props, State> {
  props: Props;
  state: State;

  constructor(props) {
    super(props);

    this._handleSort = this._handleSort.bind(this);
    this._toggleSortSelect = this._toggleSortSelect.bind(this);
    this._updateSortBy = this._updateSortBy.bind(this);

    this.state = {
      isSortSecletOpen: false,
      sortBy: "popular",
    };
  }

  _toggleSortSelect(): void {
    this.setState((state) => {
      return {
        isSortSecletOpen: !state.isSortSecletOpen,
      };
    });
  }

  _updateSortBy(value: string): void {
    this.setState({
      sortBy: value,
    });
  }

  _handleSort(value: string): void {
    this.props.sortBy(value);
  }

  _sortByNewValue(newValue: string): void {
    this._updateSortBy(newValue);
    this._handleSort(newValue);
    this._toggleSortSelect();
  }

  render() {
    return (
      <form className="places__sorting" action="#" method="get">
        <span className="places__sorting-caption">Sort by</span>
        <span
          className="places__sorting-type"
          tabIndex="0"
          onClick={this._toggleSortSelect}
        >
          {this.state.sortBy}
          <svg className="places__sorting-arrow" width="7" height="4">
            <use xlinkHref="#icon-arrow-select"></use>
          </svg>
        </span>
        <ul
          className={`places__options places__options--custom ${
            this.state.isSortSecletOpen ? " places__options--opened" : ""
          }`}
        >
          <li
            className={`places__option ${
              this.state.sortBy === "popular" ? `places__option--active` : ""
            } `}
            tabIndex="0"
            onClick={() => {
              this._sortByNewValue("popular");
            }}
          >
            Popular
          </li>
          <li
            className={`places__option ${
              this.state.sortBy === "lowToHigh" ? `places__option--active` : ""
            } `}
            tabIndex="0"
            onClick={() => {
              this._sortByNewValue("lowToHigh");
            }}
          >
            Price: low to high
          </li>
          <li
            className={`places__option ${
              this.state.sortBy === "highToLow" ? `places__option--active` : ""
            } `}
            tabIndex="0"
            onClick={() => {
              this._sortByNewValue("highToLow");
            }}
          >
            Price: high to low
          </li>
          <li
            className={`places__option ${
              this.state.sortBy === "topRatedFirst"
                ? `places__option--active`
                : ""
            } `}
            tabIndex="0"
            onClick={() => {
              this._sortByNewValue("topRatedFirst");
            }}
          >
            Top rated first
          </li>
        </ul>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sortBy(value) {
    dispatch(ActionCreator.updateSortBy(value));
  },
});

export { PlaceSorting };

export default connect(null, mapDispatchToProps)(PlaceSorting);
