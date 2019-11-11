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
  },
  {
    exact: true,
    path: '/account',
    component: 'account'
  },
  {
    exact: true,
    path: '/pet',
    component: 'pet'
  },
  {
    exact: true,
    path: '/product',
    component: 'product'
  }
  // {
  //   exact: true,
  //   path: '/login',
  //   component: 'login'
  // }

]