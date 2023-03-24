'use strict';
module.exports = {
	/**
	 * 此函数名称
	 * @url client/bwin/pub/init 前端调用的url参数地址
	 * data 请求参数
	 */
	main: async (event) => {
		let {
			data = {}, userInfo, util, originalParam
		} = event;
		let {
			customUtil,
			config,
			pubFun,
			vk,
			db,
			_
		} = util;
		let {
			uid
		} = data;
		let res = {
			code: 0,
			msg: '',
			data: {}
		};
		// 业务逻辑开始-----------------------------------------------------------
		// 可写与数据库的交互逻辑等等
		
		// 初始化时查询可通用的各页面数据并根据websiteConfig的设置写入vuex
		// 查询站点设置
		let websiteConfig = await vk.baseDao.select({
			dbName: "bwin-website",
			pageIndex: 1,
			pageSize: 1,
			sortArr: [{
				"name": "_id",
				"type": "desc"
			}]
		});

		res['data']['websiteConfig'] = websiteConfig['rows'][0];

		// 查询企业基础资料
		let companyInfo = await vk.baseDao.select({
			dbName: "bwin-company",
			pageIndex: 1,
			pageSize: 1,
			sortArr: [{
				"name": "_id",
				"type": "desc"
			}]
		});
		res['data']['companyInfo'] = companyInfo['rows'][0];

		// 查询、构建顶部菜单栏数据
		let menuList = [{
			title: '首页',
			path: '/pages/index/index'
		}, {
			title: '产品中心',
			path: '/pages/product/list',
			subMenuList: []
		}, {
			title: '新闻中心',
			path: '/pages/news/list',
			subMenuList: []
		}, {
			title: '关于我们',
			path: '/pages/about/index',
			subMenuList: [{
				title: '公司概况',
				path: '/pages/about/index'
			}, {
				title: '荣誉资质',
				path: '/pages/about/honor'
			}]
		}]

		// 产品中心二级菜单
		let productCategoryList = await vk.baseDao.select({
			dbName: "bwin-category",
			pageIndex: 1,
			whereJson: {
				is_menu: true,
				page: 'product'
			},
			sortArr: [{
				"name": "sort",
				"type": "desc"
			}]
		});
		if (productCategoryList['rows'].length > 0) {
			let rows = productCategoryList['rows'];
			menuList[1]['subMenuList'] = rows.map(function(item, index, rows){
				let subMenuList = {};
				subMenuList['title'] = item.name;
				subMenuList['path'] = '/pages/product/list?category=' + item._id;
				return subMenuList;
			});
		}
		
		// 新闻中心二级菜单
		let newsCategoryList = await vk.baseDao.select({
			dbName: "bwin-category",
			pageIndex: 1,
			whereJson: {
				is_menu: true,
				page: 'news'
			},
			sortArr: [{
				"name": "sort",
				"type": "desc"
			}]
		});
		if (newsCategoryList['rows'].length > 0) {
			let rows = newsCategoryList['rows'];
			menuList[2]['subMenuList'] = rows.map(function(item, index, rows){
				let subMenuList = {};
				subMenuList['title'] = item.name;
				subMenuList['path'] = '/pages/news/list?category=' + item._id;
				return subMenuList;
			});
		}

		res['data']['menuList'] = menuList;
		
		
		// 各页面头部
		let headers = await vk.baseDao.select({
			dbName: "bwin-page-header",
			pageIndex: 1
		});
		
		let headerConfig = [];
		if (headers['rows'].length > 0) {
			let rows = headers['rows'];
			headerConfig = rows.map(function(item, index, rows){
				let config = {};
				config['page'] = item.page;
				config['main_title'] = item.main_title;
				config['sub_title'] = item.sub_title;
				config['image_url'] = item.image_url;
				config['is_immersive'] = item.is_immersive;
				return config;
			});
		}
		res['data']['headerConfig'] = headerConfig;
		
		res['msg'] = 'success';
		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}
}
