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
			data: {}, // 返回的数据
		};
		// 业务逻辑开始-----------------------------------------------------------
		// 可写与数据库的交互逻辑等等

		// 查询首页数据
		// 轮播图
		let swiperList = await vk.baseDao.select({
			dbName: "bwin-swiper",
			pageIndex: 1,
			pageSize: 5,
			whereJson: {
				status: true
			},
			sortArr: [{
				"name": "sort",
				"type": "desc"
			}]
		});
		res['data']['swiperList'] = swiperList['rows'];
		
		// 5条产品列表
		let productList = await vk.baseDao.select({
			dbName: "bwin-product",
			pageIndex: 1,
			pageSize: 5,
			whereJson: {
				status: true
			},
			sortArr: [{
				"name": "is_top",
				"type": "desc"
			},{
				"name": "sort",
				"type": "desc"
			}]
		});
		res['data']['productList'] = productList['rows'];
		
		// 首页展示的数据项
		let indexData = await vk.baseDao.select({
			dbName: "bwin-index-data",
			pageIndex: 1,
			pageSize: 5,
			sortArr: [{
				"name": "sort",
				"type": "desc"
			}]
		});
		res['data']['indexData'] = indexData['rows'];
		
		// 6条资讯列表
		let newsList = await vk.baseDao.select({
			dbName: "bwin-news",
			pageIndex: 1,
			pageSize: 5,
			sortArr: [{
				"name": "is_top",
				"type": "desc"
			},{
				"name": "sort",
				"type": "desc"
			}]
		});
		res['data']['newsList'] = newsList['rows'];
		
		// 合作伙伴列表
		let partnerList = await vk.baseDao.select({
			dbName: "bwin-index-partner",
			pageIndex: 1,
			pageSize: 10,
			sortArr: [{
				"name": "sort",
				"type": "desc"
			}]
		});
		res['data']['partnerList'] = partnerList['rows'];
		
		res['msg'] = 'success';

		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}
}
