import React from 'react'

import donateImg from './donate.png'
import './style.scss'

export default () => (
  <div className="Donate">
    <div className="Container">
      <h1>Donate</h1>

      <p>
        <a href="/">
          <img src={donateImg} height={40} alt="btc-donate" />
        </a>

        <span>
          1EjX7LSDdfqEanYQjq2htHDKWWYeGr5LDi
        </span>
      </p>
    </div>
  </div>
)

