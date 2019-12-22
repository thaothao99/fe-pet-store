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
    path: '/',
    component: 'home'
  },
  {
    exact: true,
    path: '/account',
    component: 'account'
  },
  {
    exact: true,
    path: '/account/security',
    component: 'security'
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
  },
  {
    exact: true,
    path: '/product/:ID',
    component: 'detailProduct'
  },
  {
    exact: true,
    path: '/customer',
    component: 'customer'
  },
  {
    exact: true,
    path: '/employee',
    component: 'employee'
  },
  {
    exact: true,
    path: '/cart',
    component: 'cart'
  },
  {
    exact: true,
    path: '/bill',
    component: 'bill'
  },
  {
    exact: true,
    path: '/bill/:ID',
    component: 'detailBillPro'
  },
  {
    exact: true,
    path: '/manageBill',
    component: 'manageBill'
  },
  {
    exact: true,
    path: '/service',
    component: 'service'
  },
  {
    exact: true,
    path: '/cartservice/:name/:IDPet',
    component: 'cartService'
  },
  {
    exact: true,
    path: '/billservice/:name',
    component: 'cartService'
  },
  {
    exact: true,
    path: '/manageservice',
    component: 'mangeService'
  },
]
