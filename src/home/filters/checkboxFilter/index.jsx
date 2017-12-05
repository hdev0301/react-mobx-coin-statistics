import React from 'react'
import './style.scss'

export default class CheckboxFilter extends React.PureComponent {
  constructor() {
    super()
    this.onChange = this.onChange.bind(this)
  }

  onChange() {
    this.props.onChange(this.props.id, !this.props.checked)
  }

  render() {
    const { id, label, checked } = this.props

    return (
      <div className="Checkbox-Filter">
        <label
          htmlFor={`interval-${id}`}
        >
          <div className="Checkbox-Filter-Label">
            {label}
          </div>

          <div className={`Checkbox-Filter-Element ${checked ? 'checked' : ''}`} />
        </label>

        <input
          id={`interval-${id}`}
          name={`interval-${id}`}
          type="checkbox"
          checked={checked}
          onChange={this.onChange}
        />
      </div>
    )
  }
}

