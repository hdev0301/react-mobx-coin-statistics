import { observable, computed, action } from 'mobx'
import store from 'store'
import config from '../../config'

const STORE_KEYS = {
  INTERVALS: 'cs:intervals',
}

const persistedIntervals = store.get(STORE_KEYS.INTERVALS) || []

class IntervalStore {
  @observable intervals = persistedIntervals
  @observable resolved = false

  @computed get filteredIntervals() {
    return this.intervals.filter(interval => !interval.hide)
  }

  @action fetchIntervals() {
    fetch(`${config.apiURL}/intervals`)
      .then(res => res.json())
      .then((intervals) => {
        intervals.forEach((item) => {
          const hasInterval = this.intervals
            .find(interval => interval.label === item.label)

          if (!hasInterval) {
            this.intervals.push(item)
          }
        })

        this.resolved = true
      })
      .catch(console.log)
  }

  @action.bound toggle(index, hide) {
    const item = this.intervals[index]

    this.intervals[index] = {
      ...item,
      hide: !hide,
    }

    store.set(STORE_KEYS.INTERVALS, this.intervals)
  }
}

export default new IntervalStore()

