import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'mobx-react'

import App from './app'
import statStore from './app/stores/stat'
import userStore from './app/stores/user'
import intervalStore from './app/stores/interval'
import contactStore from './contact/store'

const stores = {
  userStore,
  statStore,
  intervalStore,
  contactStore,
}

render(
  <AppContainer>
    <Provider {...stores}>
      <App />
    </Provider>
  </AppContainer>,
  document.getElementById('app')
)

if (module.hot) {
  module.hot.accept('./app', () => {
    const NextApp = require('./app').default

    render(
      <AppContainer>
        <Provider {...stores}>
          <NextApp />
        </Provider>
      </AppContainer>,
      document.getElementById('app')
    )
  })
}
