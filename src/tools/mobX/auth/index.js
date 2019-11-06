import { action, observable } from 'mobx'

class Auth {
  @observable isAuth = !!window.localStorage.getItem('token')

  @action
  authenticate = (token) => {
    window.localStorage.setItem('token', token)
    this.isAuth = true
  }

  logout = () => {
    window.localStorage.clear()
    this.isAuth = false
  }
}

export { Auth }
