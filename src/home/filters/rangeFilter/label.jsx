import React from 'react'
import ClickOutside from 'react-click-outside'

export default class RangeLabel extends React.PureComponent {
  constructor(props) {
    super(props)
    this.onClick = this.onClick.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onKeyPress = this.onKeyPress.bind(this)
    this.onStopEditing = this.onStopEditing.bind(this)
    this.state = {
      value: props.value,
      isEditing: false,
    }
  }

  onClick() {
    this.setState({
      isEditing: true,
    }, () => this.input.focus())
  }

  onChange(e) {
    this.setState({
      value: e.target.value,
    })
  }

  onKeyPress(e) {
    if (e.key === 'Enter') {
      this.setState({
        isEditing: false,
      }, () => this.props.onSave(Number(this.state.value)))
    }
  }

  onStopEditing() {
    this.setState({
      isEditing: false,
    })
  }

  render() {
    const { value, isEditing } = this.state

    const Input = (
      <input
        ref={node => this.input = node}
        type="number"
        value={value}
        onChange={this.onChange}
        onKeyPress={this.onKeyPress}
      />
    )

    const Text = (
      <span onClick={this.onClick}>
        {this.props.value.toLocaleString()}
      </span>
    )

    return (
      <ClickOutside
        style={{ display: 'inline', margin: '0 5px' }}
        onClickOutside={this.onStopEditing}
      >
        {isEditing ? Input : Text}
      </ClickOutside>
    )
  }
}

