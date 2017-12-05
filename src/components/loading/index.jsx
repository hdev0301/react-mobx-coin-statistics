import React from 'react'
import loadingImg from './loading.gif'
import './style.scss'

export default class Loading extends React.PureComponent {
  render() {
    return (
      <div className="Loading">
        <div className="Container">
          <img
            src={loadingImg}
            height={120}
            alt="loading-img"
          />
        </div>
      </div>
    )
  }
}

