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

		let dbName = "bwin-about-honor";
		let pageIndex = data.currentPage ? data.currentPage : 1;
		let pageSize = data.pageSize ? data.currentPage : 10;

		// 新闻列表
		let honorList = await vk.baseDao.select({
			dbName: dbName,
			getCount: true,
			pageIndex: pageIndex,
			pageSize: pageSize,
			sortArr: [{
				"name": "sort",
				"type": "desc"
			}]
		});

		res['data']['total'] = honorList['total'];
		res['data']['honorList'] = honorList['rows'];
		res['msg'] = 'success';

		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}
}
