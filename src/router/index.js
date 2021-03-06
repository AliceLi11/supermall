import Vue from "vue"
import VueRouter from "vue-router"

//定义：懒加载也叫延迟加载，即在需要的时候进行加载，随用随载。
const Home = () => import("views/home/Home.vue") 
const Category = () => import("views/category/Category.vue") 
const Cart = () => import("views/cart/Cart.vue") 
const Profile = () => import("views/profile/Profile.vue")
const Detail = () => import("views/detail/Detail.vue")

//1.通过Vue.use(插件)，安装插件(只要是vue的插件，都要使用这个安装功能。内部是实行VueRouter.install这个方法)
Vue.use(VueRouter)

const routes = [
    {
        path:"",
        redirect:"/home"
    },
    {
        path:"/home",
        component:Home
    },
    {
        path:"/category",
        component:Category
    },
    {
        path:"/cart",
        component:Cart
    },
    {
        path:"/profile",
        component:Profile
    },
    {
      path:"/detail/:id",
      component:Detail
    }
]
const router = new VueRouter({
    //配置路由和组件之间的应用关系
    routes,
    mode:"history"
})
  
//3.导出router
export  default router