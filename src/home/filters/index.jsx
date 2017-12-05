import React from 'react'

import Collapse from 'react-smooth-collapse'
import InputFilter from './inputFilter'
import RangeFilter from './rangeFilter'
import CheckboxFilter from './checkboxFilter'

import filterIcon from './icon-open.png'

import './style.scss'

export default class Filters extends React.Component {
  constructor() {
    super()
    this.onClickFilterIcon = this.onClickFilterIcon.bind(this)
    this.state = {
      showContent: false,
    }
  }

  onClickFilterIcon() {
    this.setState(prevState => ({
      showContent: !prevState.showContent,
    }))
  }

  render() {
    return (
      <div className="Filters Container">
        <div className="Filters-Header">
          <div className="Filter-Time-Intervals">
            {this.props.intervals.map((interval, index) => (
              <CheckboxFilter
                key={interval.label}
                id={index}
                label={`${interval.qty}${interval.type}`}
                checked={!interval.hide}
                onChange={this.props.onToggleInterval}
              />
            ))}
          </div>

          <button
            className="Filters-Toggle-Button"
            onClick={this.onClickFilterIcon}
          >
            <img
              src={filterIcon}
              alt="filter-toggle-icon"
            />
          </button>

          <InputFilter
            value={this.props.nameFilter}
            onChange={this.props.onNameFilterChange}
          />
        </div>

        <Collapse
          expanded={this.state.showContent}
          heightTransition=".50s ease"
        >
          <div className="Filters-Content">
            <div className="Filter-Ranges">
              <h2>Filters</h2>

              <div className="Filters-Reset">
                <button onClick={this.props.onResetFilters}>
                  Reset Filters
                </button>
              </div>

              <div className="Filter-Ranges-Content">
                {Object.keys(this.props.filterIntervals).map((key) => {
                  const interval = this.props.filterIntervals[key]
                  const values = this.props.filters[key]

                  return (
                    <RangeFilter
                      key={key}
                      type={key}
                      min={interval.min}
                      max={interval.max}
                      values={values}
                      onChange={this.props.onChangeFilters}
                      showCurrentPriceAsUSD={this.props.showCurrentPriceAsUSD}
                      btcPrice={this.props.btcPrice}
                    />
                  )
                })}
              </div>
            </div>
          </div>
        </Collapse>
      </div>
    )
  }
}

