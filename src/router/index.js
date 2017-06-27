import Vue from 'vue'
import Router from 'vue-router'
import Cart from '@/components/cart/Cart'
import Favorite from '@/components/favorite/Favorite'
import Order from '@/components/order/Order'
import OrderList from '@/components/order/OrderList'
import Product from '@/components/product/Product'
import ProductList from '@/components/product/ProductList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
    { path: '/', component: ProductList },
    { path: '/orderlist', component: OrderList },
    { path: '/productlist', component: ProductList },
    { path: '/productlist/:id', name: 'productdetail', component: Product },
    { path: '/order', component: Order },
    // { path: 'login/:openid', component: LoginComponent },
    // { path: 'login', component: LoginComponent },
    { path: '/favorite', component: Favorite }
  ],
  mode: 'history'
})
