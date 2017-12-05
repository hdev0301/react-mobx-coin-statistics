import React from 'react'
import './style.scss'

export default class InputFilter extends React.PureComponent {
  constructor() {
    super()
    this.onChange = this.onChange.bind(this)
  }

  onChange(e) {
    this.props.onChange(e.target.value)
  }

  render() {
    return (
      <input
        className="Filter-Input"
        type="text"
        value={this.props.value}
        onChange={this.onChange}
        placeholder="Search Coin"
      />
    )
  }
}

