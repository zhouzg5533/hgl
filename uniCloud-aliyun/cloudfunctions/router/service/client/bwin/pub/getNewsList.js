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

		let dbName = "bwin-news";
		let title = data.title ? data.title : 0;
		let category_id = data.categoryId ? data.categoryId : 0;
		let sortMethod = data.sortMethod ? data.sortMethod : 'normal';
		let pageIndex = data.currentPage ? data.currentPage : 1;
		let pageSize = data.pageSize ? data.pageSize : 10;

		let whereJson = {};
		let sortArr = [{
			"name": "_add_time",
			"type": "desc"
		}]

		// 如果传入分类，则只返回该分类下的列表
		whereJson.category_id = category_id === 0 ? _.neq(0) : _.eq(category_id);
		whereJson.title = title === 0 ? _.neq(0) : new RegExp(title);

		// 如果传入排序，则按该排序返回
		if (sortMethod == 'hot') {
			sortArr.push({
				"name": "read_num",
				"type": "desc",
			})
		}

		// 新闻列表
		let newsList = await vk.baseDao.select({
			dbName: dbName,
			getCount: true,
			pageIndex: pageIndex,
			pageSize: pageSize,
			whereJson: whereJson,
			sortArr: sortArr
		});



		// 输出热门文章列表
		let hotList = await vk.baseDao.select({
			dbName: dbName, // 表名
			sortArr: [{ // 条件
				"name": "read_num",
				"type": "desc"
			}]
		});

		res['data']['total'] = newsList['total'];
		res['data']['newsList'] = newsList['rows'];
		res['data']['hotList'] = hotList['rows'];
		res['msg'] = 'success';

		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}
}
