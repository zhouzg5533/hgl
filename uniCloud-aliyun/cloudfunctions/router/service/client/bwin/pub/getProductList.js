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

		let dbName = "bwin-product";
		let category_id = data.categoryId ? data.categoryId : 0;
		let pageIndex = data.currentPage ? data.currentPage : 1;
		let pageSize = data.pageSize ? data.pageSize : 10;

		let whereJson = {
			status: true,
		};

		// 如果传入分类，则只返回该分类下的列表
		whereJson.category_id = category_id === 0 ? _.neq(0) : _.eq(category_id);

		// 新闻列表
		let productList = await vk.baseDao.select({
			dbName: dbName,
			getCount: true,
			pageIndex: pageIndex,
			pageSize: pageSize,
			whereJson: whereJson,
			sortArr:[{
				"name":"_add_time",
				"type":"desc"
			}]
		});

		res['data']['total'] = productList['total'];
		res['data']['productList'] = productList['rows'];
		res['msg'] = 'success';

		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}
}
