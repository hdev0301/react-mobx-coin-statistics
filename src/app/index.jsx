import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Favicon from 'react-favicon'

import Home from '../home'
import Donate from '../donate'
import Contact from '../contact'

import Header from '../components/header'
import Footer from '../components/footer'

import './style.scss'

export default () => (
  <Router>
    <div>
      <Favicon url={require('./favicon.png')} />

      <Header />

      <Route
        exact={true}
        path="/"
        component={Home}
      />

      <Route
        exact={true}
        path="/donate"
        component={Donate}
      />

      <Route
        exact={true}
        path="/contact"
        component={Contact}
      />

      <Footer />
    </div>
  </Router>
)

