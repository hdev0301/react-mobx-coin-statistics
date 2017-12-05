import { observable, action } from 'mobx'
import store from 'store'

const STORE_KEYS = {
  PREF: 'cs:preferences',
  FAVS: 'cs:favs',
}

const persistedPreferences = store.get(STORE_KEYS.PREF) || {}
const persistedFavs = store.get(STORE_KEYS.FAVS) || []

class UserStore {
  @observable preferences = {
    colorblind: false,
    showFavs: false,
    sortBy: 'marketName',
    sortDirection: 'ASC',
    showCurrentPriceAsUSD: false,
    ...persistedPreferences,
  }

  @observable favs = persistedFavs

  @action.bound setSort(sortKey) {
    const { sortBy, sortDirection } = this.preferences

    if (sortBy === sortKey) {
      this.preferences.sortDirection = sortDirection === 'ASC' ? 'DESC' : 'ASC'
    }

    this.preferences.sortBy = sortKey
    store.set(STORE_KEYS.PREF, this.preferences)
  }

  @action.bound setViewMode() {
    this.preferences.showFavs = !this.preferences.showFavs
    store.set(STORE_KEYS.PREF, this.preferences)
  }

  @action.bound setFav(id, isFav) {
    this.favs = isFav ? [...this.favs, id] : this.favs.filter(item => item !== id)
    store.set(STORE_KEYS.FAVS, this.favs)
  }

  @action.bound setColorblind() {
    this.preferences.colorblind = !this.preferences.colorblind
    store.set(STORE_KEYS.PREF, this.preferences)
  }

  @action.bound setCurrentPriceView(showAsUSD) {
    this.preferences.showCurrentPriceAsUSD = showAsUSD
    store.set(STORE_KEYS.PREF, this.preferences)
  }
}

export default new UserStore()

