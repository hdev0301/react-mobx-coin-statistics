import React from 'react'
import Range from 'rc-slider/lib/Range'
import RangeLabel from './label'
import 'rc-slider/assets/index.css'
import './style.scss'

export default class RangeFilter extends React.PureComponent {
  static extendSmallNumber(value) {
    return Number((value * (10 ** 7)).toFixed())
  }

  static shrinkBigNumber(value) {
    return value / (10 ** 7)
  }

  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
    this.isMarketCap = props.type === 'marketCap'
    this.isPrice = props.type === 'price'
  }

  onChange([min, max]) {
    if (this.isPrice) {
      min = RangeFilter.shrinkBigNumber(min)
      max = RangeFilter.shrinkBigNumber(max)
    }

    this.props.onChange(this.props.type, min, max)
  }

  render() {
    let min = Number(this.props.min.toFixed())
    let max = Number(this.props.max.toFixed())

    let minValue = Number(this.props.values.min.toFixed())
    let maxValue = Number(this.props.values.max.toFixed())

    let minValueLabel = minValue
    let maxValueLabel = maxValue

    const title = this.props.type.toUpperCase()

    if (this.isPrice) {
      min = RangeFilter.extendSmallNumber(this.props.min)
      max = RangeFilter.extendSmallNumber(this.props.max)

      minValue = RangeFilter.extendSmallNumber(this.props.values.min)
      maxValue = RangeFilter.extendSmallNumber(this.props.values.max)

      minValueLabel = this.props.values.min
      maxValueLabel = this.props.values.max

      if (this.props.showCurrentPriceAsUSD) {
        minValueLabel *= this.props.btcPrice
        maxValueLabel *= this.props.btcPrice
      }
    }

    return (
      <div className="Filter-Range-Item">
        <div className="Filter-Range-Item-Header">
          {this.isMarketCap ? `${title} (USD)` : title}
        </div>

        <div className="Filter-Range-Item-Content">
          <span className="Filter-Range-Item-Values">
            <RangeLabel
              value={minValueLabel}
              onSave={value => this.onChange([value, maxValue])}
            />
            -
            <RangeLabel
              value={maxValueLabel}
              onSave={value => this.onChange([minValue, value])}
            />
          </span>

          <Range
            step={1}
            min={min}
            max={max}
            value={[minValue, maxValue]}
            onChange={this.onChange}
          />
        </div>
      </div>
    )
  }
}

