import { observable, action } from 'mobx'
import config from '../config'

class ContactStore {
  @observable busy = false
  @observable submitted = false
  @observable error = false

  @action send(data) {
    this.busy = true

    fetch(`${config.apiURL}/contact`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        this.busy = false
        this.submitted = true

        if (!res.ok) {
          this.error = true
        }
      })
      .catch((err) => {
        this.busy = false
        this.submitted = true
        this.error = true
      })
  }
}

export default new ContactStore()

