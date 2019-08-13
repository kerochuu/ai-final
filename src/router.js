import Vue from 'vue'
import Router from 'vue-router'
import HomePage from './views/HomePage.vue'
import PostPage from './views/PostPage.vue'
import PostWriterPage from './views/PostWriterPage.vue'
import PortfolioPage from './views/PortfolioPage.vue'
import PortfolioWriterPage from './views/PortfolioWriterPage.vue'
import PortfolioUpdatePage from './views/PortfolioWriterPage.vue'
import PostUpdatePage from './views/PostWriterPage.vue'
import SignUpPage from './views/SignUpPage.vue'
import PortfolioDetail from './views/PortfolioDetail.vue'
import PostDetail from './views/PostDetail.vue'
import PassPage from './views/PassPage.vue'
import AdminPage from './views/AdminPage.vue'
import UserDetailPage from './views/UserDetailPage.vue'
import UserDetailAdminPage from './views/UserDetailAdminPage.vue'
import UserAdminPage from './views/UserAdminPage.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
		{
			path: '/',
			name: 'home',
			component: HomePage
		},
		{
			path: '/post',
			name: 'post',
			component: PostPage
		},
		{
			path: '/postwrite',
			name: 'postwrite',
			component: PostWriterPage
		},
		{
			path: '/portfolio',
			name: 'portfolio',
			component: PortfolioPage
		},
		{
			path:'/portfoliowrite/',
			name:'portfoliowrite',
			component: PortfolioWriterPage
		},
		{
			path:'/portfolioUpdate/:pid',
			name:'portfolioUpdate',
			component: PortfolioUpdatePage
		},
		{
			path:'/postUpdate/:pid',
			name:'postUpdate',
			component: PostUpdatePage
		},
		
		{
			path:'/portfolioDetail/:pid',
			name: 'portfolioDetail',
			component: PortfolioDetail
		},
		{
			path:'/postDetail/:pid',
			name: 'postDetail',
			component: PostDetail
		},
		{
			path: '/signup',
			name: 'signup',
			component: SignUpPage
		},
		{
			path: '/pass',
			name: 'pass',
			component: PassPage
		},
		{
			path: '/admin',
			name: 'admin',
			component: AdminPage
		},
		{
			path: '/userdetail',
			name: 'userDetail',
			component: UserDetailPage
		},
		{
			path: '/admin/userdetail/:uid',
			name: 'userDetailAdmin',
			component: UserDetailAdminPage
		},
		{
			path: '/admin/user',
			name: 'userAdmin',
			component: UserAdminPage
		}
  ]
})