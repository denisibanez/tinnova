import axios from 'axios'

export default class ListService {
  getList() {
    const request = axios.get(`${process.env.VUE_APP_BASE_PATH}/users`)
      .then(response => response)
      .catch(e => {
        throw e
      }).finally(() => {

      })
    return request
  }
}