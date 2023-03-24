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
		let productId = data.productId ? data.productId : 0;
		if (productId == 0) {
			res['code'] = 1;
			res['msg'] = '缺少必要参数';
			return res;
		}

		let detail = await vk.baseDao.selects({
			dbName: dbName, // 主表名
			getCount: false, // 是否需要同时查询满足条件的记录总数量，默认false
			getMain: true, // 是否只返回rows数据，默认false
			pageIndex: 1, // 查询第几页
			pageSize: 1, // 每页多少条数据
			// 主表where条件
			whereJson: {
				_id: productId
			},
			// 副表列表
			foreignDB: [{
					dbName: "bwin-category", // 副表名
					localKey: "category_id", // 主表外键字段名
					foreignKey: "_id", // 副表外键字段名
					as: "categoryInfo",
					limit: 1, // 当limit = 1时，以对象形式返回，否则以数组形式返回
				}
			]
		});

		if (vk.pubfn.isNull(detail)) {
			res['code'] = 404;
			res['msg'] = '产品不存在';
			return res;
		}
		
		// 内容存在，增加一次阅读量
		await vk.baseDao.update({
			dbName: dbName, // 表名
			whereJson: { // 条件
				_id: productId
			},
			dataJson: { // 需要修改的数据
				read_num: _.inc(1)
			}
		});

		res['data']['detail'] = detail[0];
		res['msg'] = 'success';

		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}
}
