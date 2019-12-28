import Msite from "pages/Msite/Msite.vue"
import Order from "pages/Order/Order.vue"
import Profile from "pages/Profile/Profile.vue"
import Search from "pages/Search/Search.vue"
import Login from 'pages/Login/Login.vue'
import UserDetail from 'pages/userDetail/userDetail.vue'
import Shop from 'pages/Shop/Shop.vue'
import store from '@/store'
/*import goods from "pages/ele-goods/ele-goods.vue"
import ratings from "pages/ele-ratings/ele-ratings.vue"
import sellers from "pages/ele-sellers/ele-sellers.vue"*/
const goods = () => import(/* webpackChunkName: "goods" */ "pages/ele-goods/ele-goods.vue")
const ratings = () => import(/* webpackChunkName: "ratings" */ "pages/ele-ratings/ele-ratings.vue")
const sellers = () => import(/* webpackChunkName: "sellers" */ "pages/ele-sellers/ele-sellers.vue")
export default [
    {path:"/Msite",component:Msite,meta:{showFooter:true}},
    {path:"/Order",component: Order,meta:{showFooter:true}},
    {path:"/Profile",component:Profile,meta:{showFooter:true}},
    {path:'/Search',component:Search,meta:{showFooter:true}},
    { 
        path:'/Login',component:Login,
      beforeEnter:((to,from,next)=>{
    if(store.state.Login.user._id){
        next('/Msite')//如果有id能再访问登录页直接到主页
    }else{
        next()
    }
      })
   },
    {path:'/UserDetail',component:UserDetail },
    // {
    //     path: '/Defined',
    //     component:Defined,
    //     //路由独享
    //     beforeEnter: (to, from, next) => {
    //       next() 
    //     }
    //   },
    {
        path:'/Shop/:id',component:Shop,props:true,  //动态路由配置
        children:[
            {path:"goods",component:goods},
            {path:"ratings",component:ratings},
            {path:"sellers",component:sellers}, 
            {path:"",redirect:"goods"}//默认跳转在goods组件,子路由，不可以有根路径/
        ]
    },
    {path:"/",redirect:"/Msite"},//默认跳转在Msite组件
    
]