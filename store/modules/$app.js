/**
 * vuex 系统状态管理模块
 */
import config from '@/app.config.js'

let lifeData = uni.getStorageSync('lifeData') || {};

let $app = lifeData.$app || {};

export default {
	// 通过添加 namespaced: true 的方式使其成为带命名空间的模块
	namespaced: true,
	/**
	 * vuex的基本数据，用来存储变量
	 */
	state: {
		/**
		 * 是否已经初始化
		 * js调用示例
		 * vk.getVuex('$app.inited');
		 * 页面上直接使用示例
		 * {{ vk.getVuex('$app.inited') }}
		 * js更新示例
		 * vk.setVuex('$app.inited', true);
		 */
		inited: $app.inited || false,
		config: {
			...config
		},
		/**
		 * website站点设置缓存
		 */
		websiteConfig: $app.websiteConfig || {
			// "logo1": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-613ff9e2-568b-4845-987f-93626e21bcde/e60d20ac-bb1b-46cc-be01-9bddbb775c87.png",
			// "logo2": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-613ff9e2-568b-4845-987f-93626e21bcde/1f05ca7e-a916-4875-aa10-51cff2e499a4.png",
			// "icp_code": "冀ICP备16021668号-3",
			// "copyright": "© 2018-2022 必闻品牌官网 版权所有",
			// "cache_time": "24",
		},
		/**
		 * company企业资料缓存
		 */
		companyInfo: $app.companyInfo || {
			// "name": "石家庄四季兴欣文化传媒有限公司",
			// "description": "公司成立于2018年，主要从事计算机软件外包服务，业务遍及房地产、机械、能源、畜牧、生物、医药、化工等。\n公司成立以来，一直本着开放包容、客户至上的原则，此前服务过的数十家企业，完成的百余个项目均得到了甲方的一致好评。\n公司未来将继续秉承企业宗旨，为甲方客户提供完善的一站式服务，为传统企业插上互联网的翅膀。",
			// "address": "河北省石家庄市长安区万达广场A座1101",
			// "longitude": "114.564094",
			// "latitude": "38.044413",
			// "tel": "18000611133",
			// "email": "me@imboya.com",
			// "work_time": "11:00~21:00",
			// "partner_description": "业务遍及房地产、机械、能源、畜牧、生物、医药、化工等"
		},
		/**
		 * 导航栏菜单缓存
		 */
		menuList: $app.menuList || [{
				"title": "首页",
				"path": "/pages/index/index"
			},
			{
				"title": "产品中心",
				"path": "/pages/product/list",
				"subMenuList": [{
						"title": "产品分类2",
						"path": "/pages/product/list?category=624915770a84cf0001932e53"
					},
					{
						"title": "产品分类一",
						"path": "/pages/product/list?category=62480ca9eb9d4c0001383909"
					}
				]
			},
			{
				"title": "新闻中心",
				"path": "/pages/news/list",
				"subMenuList": [{
					"title": "新闻分类一",
					"path": "/pages/news/list?category=624819b40a84cf00017b8611"
				}]
			},
			{
				"title": "关于我们",
				"path": "/pages/about/index",
				"subMenuList": [{
						"title": "公司概况",
						"path": "/pages/about/index"
					},
					{
						"title": "荣誉资质",
						"path": "/pages/about/honor"
					}
				]
			}
		],
		/**
		 * 页面顶部菜单设置缓存
		 */
		headerConfig: $app.headerConfig || [
			// {
			// 	"page": "product",
			// 	"main_title": "Product",
			// 	"sub_title": "创新研发 品质至上",
			// 	"image_url": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-613ff9e2-568b-4845-987f-93626e21bcde/a12e7310-b4c5-4c28-8557-c6a68623703e.jpg"
			// },
			// {
			// 	"page": "news",
			// 	"main_title": "News",
			// 	"sub_title": "洞悉行业潮流 分享企业动态",
			// 	"image_url": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-613ff9e2-568b-4845-987f-93626e21bcde/a3b76d10-8d5e-440d-b194-3c5e09623316.jpg"
			// },
			// {
			// 	"page": "about",
			// 	"main_title": "About",
			// 	"sub_title": "专注计算机软件外包开发服务",
			// 	"image_url": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-613ff9e2-568b-4845-987f-93626e21bcde/25596ed4-cf17-4c14-90b5-c3f4b311aeab.jpg"
			// }
		],
		/**
		 * history历史操作
		 */
		lastInitedTime: $app.lastInitedTime || null,
	},
	/**
	 * 从基本数据(state)派生的数据，相当于state的计算属性
	 */
	getters: {

	},
	/**
	 * 提交更新数据的方法，必须是同步的(如果需要异步使用action)。
	 * 每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。
	 * 回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数，提交载荷作为第二个参数。
	 */
	mutations: {

	},
	/**
	 * 和mutation的功能大致相同，不同之处在于 ==》
	 * 1. Action 提交的是 mutation，而不是直接变更状态。
	 * 2. Action 可以包含任意异步操作。
	 */
	actions: {

	}
}
