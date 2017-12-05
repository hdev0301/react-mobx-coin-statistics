import React from 'react'
import { observer, inject } from 'mobx-react'

import envelopeImg from './envelope.png'
import './style.scss'

@inject('contactStore')
@observer
export default class Contact extends React.PureComponent {
  constructor() {
    super()
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.state = {
      name: '',
      email: '',
      message: '',
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault()
    this.props.contactStore.send(this.state)
  }

  render() {
    const { name, email, message } = this.state
    const { busy, submitted, error } = this.props.contactStore

    let infobox = null

    if (submitted) {
      infobox = (
        <div className={`Infobox ${error ? 'error' : 'success'}`}>
          {error ? 'An error occured, please try again' : 'We\'ve received your message!'}
        </div>
      )
    }

    return (
      <div className="Contact">
        <div className="Container">
          <img src={envelopeImg} alt="Envelope" />

          <h1>
            Contact Us
          </h1>
          <h2>
            Lorem ipsum dolor si amet
          </h2>

          <div>
            {infobox}

            <form onSubmit={this.onSubmit}>
              <input
                type="text"
                name="name"
                value={name}
                onChange={this.onChange}
                placeholder="Name"
                required={true}
              />

              <input
                type="email"
                name="email"
                value={email}
                onChange={this.onChange}
                placeholder="E-mail Address"
                required={true}
              />

              <textarea
                name="message"
                value={message}
                onChange={this.onChange}
                placeholder="Message"
                required={true}
              />

              <input
                className="btn-submit"
                type="submit"
                value={busy ? 'Sending...' : 'Send Form'}
                disabled={!name || !email || !message}
              />
            </form>
          </div>
        </div>
      </div>
    )
  }
}
