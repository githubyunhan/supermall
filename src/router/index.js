import Vue from 'vue'
import VueRouter from 'vue-router'

/*路由组件的懒加载*/
/*import Home from '../views/home/Home'*/
const Home=()=>import('../views/home/Home')
const Cart=()=>import( '../views/cart/Cart')
const Category=()=>import('../views/category/Category')
const Profile=()=>import('../views/profile/Profile')

/*1.导入路由对*/
Vue.use(VueRouter)

/*路由映射关系：组件于路径之间的关系*/
const routes= [
  {/*重定向*/
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta:{//元数据
      title:'首页'
    }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
    meta:{//元数据
      title:'分类'
    }
  },
  {
    path: '/category',
    component: Category,
    meta:{//元数据
      title:'购物车'
    }
  },
  {
    path: '/profile',
    component: Profile,
    meta:{//元数据
      title:'档案'
    }
  }
]

/*2.创建路由实例*/
const router = new VueRouter({
  routes,
  mode: 'history',
  linkActiveClass: 'active'
})

/*router.beforeEach((to,from,next)=> {
  //to指的是route
  //从from跳转到to;
  document.title=to.meta.title
  next()//调用该方法才能进行下一步，才能正常跳转
})*/

/*3.导出路由实例，并挂载到vue对象上*/
export default router
