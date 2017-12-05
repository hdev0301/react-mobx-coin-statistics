import { observable, computed, action } from 'mobx'
import sortBy from 'lodash.sortby'
import UserStore from './user'
import config from '../../config'


class StatStore {
  @observable stats = {}
  @observable latestUpdate = ''
  @observable resolved = false

  @observable filters = {}
  @observable filtersChanged = false
  @observable filterIntervals = {}

  @observable nameFilter = ''
  @observable btcPrice = 0

  @computed get filteredStats() {
    const { filters: { price, volume, marketCap } } = this
    const nameFilter = this.nameFilter.toLowerCase()

    let result = this.stats.filter((stat) => {
      const p = (stat.currentPrice >= price.min) && (stat.currentPrice <= price.max)
      const v = (stat.currentVolume >= volume.min) && (stat.currentVolume <= volume.max)
      const m = (stat.currentMarketCap >= marketCap.min) && (stat.currentMarketCap <= marketCap.max)

      let name = stat.marketName.toLowerCase().includes(nameFilter)

      if (stat.marketCurrency) {
        name = name || stat.marketCurrency.long.toLowerCase().includes(nameFilter)
        name = name || stat.marketCurrency.short.toLowerCase().includes(nameFilter)
      }

      return p && v && m && name
    })

    if (UserStore.preferences.showFavs) {
      // eslint-disable-next-line no-underscore-dangle
      result = result.filter(stat => UserStore.favs.includes(stat._id))
    }

    if (UserStore.preferences.showCurrentPriceAsUSD) {
      result = result.map(item => ({
        ...item,
        currentPrice: Number((item.currentPrice * this.btcPrice).toFixed(4)),
      }))
    }

    result = sortBy(result, (item) => {
      let value = item
      UserStore.preferences.sortBy.split('.').forEach(key => value = value[key] || 0)
      return value
    })

    if (UserStore.preferences.sortDirection === 'DESC') {
      result.reverse()
    }

    return result
  }

  @action fetchStats() {
    fetch(`${config.apiURL}/markets/stats`)
      .then(res => res.json())
      .then((res) => {
        this.stats = res.stats
        this.initFilters(res.stats)
        this.latestUpdate = res.latestUpdate
        this.btcPrice = res.btcPrice
        this.resolved = true

        return setTimeout(() => this.fetchStats(), 5 * 1000)
      })
      .catch(console.log)
  }

  @action initFilters(stats) {
    const sortedByPrice = data => sortBy(data, 'currentPrice')
    const sortedByVolume = data => sortBy(data, 'currentVolume')
    const sortedByMarketCap = data => sortBy(data, 'currentMarketCap')

    const filters = {
      price: {
        min: sortedByPrice(stats)[0].currentPrice,
        max: sortedByPrice(stats)[stats.length - 1].currentPrice,
      },
      volume: {
        min: sortedByVolume(stats)[0].currentVolume,
        max: sortedByVolume(stats)[stats.length - 1].currentVolume,
      },
      marketCap: {
        min: sortedByMarketCap(stats)[0].currentMarketCap,
        max: sortedByMarketCap(stats)[stats.length - 1].currentMarketCap,
      },
    }

    this.filterIntervals = filters

    if (!this.filtersChanged) {
      this.filters = filters
    }
  }

  @action.bound setFilters(key, min, max) {
    this.filters = Object.assign(this.filters, {
      [key]: {
        min,
        max,
      }
    })

    this.filtersChanged = true
  }

  @action.bound resetFilters() {
    this.filters = Object.assign({}, this.filterIntervals)
    this.filtersChanged = false
  }

  @action.bound setNameFilter(value) {
    this.nameFilter = value
  }
}

export default new StatStore()

