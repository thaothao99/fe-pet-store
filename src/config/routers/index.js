export const routersNotAuth = [
  {
    exact: true,
    path: '/register',
    component: 'register'
  },
  {
    exact: true,
    path: '/login',
    component: 'login'
  }

]
export const routersAuth = [
  {
    exact: true,
    path: '/home',
    component: 'home'
  }
  // {
  //   exact: true,
  //   path: '/login',
  //   component: 'login'
  // }

]