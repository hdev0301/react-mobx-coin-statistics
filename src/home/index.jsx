import React from 'react'
import { observer, inject } from 'mobx-react'
import KeyHandler, { KEYPRESS } from 'react-key-handler'

import Filters from './filters'
import Table from './table'
import Loading from '../components/loading'

import './style.scss'

@inject('statStore', 'userStore', 'intervalStore')
@observer
export default class Home extends React.Component {
  componentDidMount() {
    this.props.statStore.fetchStats()
    this.props.intervalStore.fetchIntervals()
  }

  render() {
    const { statStore, intervalStore, userStore } = this.props

    if (!statStore.resolved || !intervalStore.resolved) {
      return (
        <Loading />
      )
    }

    return (
      <div className="App">
        <Filters
          intervals={intervalStore.intervals}
          onToggleInterval={intervalStore.toggle}
          filters={statStore.filters}
          filterIntervals={statStore.filterIntervals}
          onChangeFilters={statStore.setFilters}
          onResetFilters={statStore.resetFilters}
          nameFilter={statStore.nameFilter}
          onNameFilterChange={statStore.setNameFilter}
          showCurrentPriceAsUSD={userStore.preferences.showCurrentPriceAsUSD}
          btcPrice={statStore.btcPrice}
        />

        <Table
          data={statStore.filteredStats}
          intervals={intervalStore.filteredIntervals}
          sortBy={userStore.preferences.sortBy}
          sortDirection={userStore.preferences.sortDirection}
          onSort={userStore.setSort}
          onChangeViewMode={userStore.setViewMode}
          onSetCurrentPriceView={userStore.setCurrentPriceView}
          showFavs={userStore.preferences.showFavs}
          favs={userStore.favs}
          onToggleFavorite={userStore.setFav}
          colorblind={userStore.preferences.colorblind}
          showCurrentPriceAsUSD={userStore.preferences.showCurrentPriceAsUSD}
        />

        <div style={{ textAlign: 'center', margin: '5px', fontSize: 12 }}>
          Last Update: {new Date(statStore.latestUpdate).toString()}
        </div>

        <KeyHandler
          keyValue="c"
          keyEventName={KEYPRESS}
          onKeyHandle={userStore.setColorblind}
        />
      </div>
    )
  }
}

