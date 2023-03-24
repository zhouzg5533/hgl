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

		let clientIP = originalParam.context.CLIENTIP // 客户端ip信息


		if (vk.pubfn.isNullOne(data.relname, data.mobile, data.content)) {
			res['code'] = 1;
			res['msg'] = '缺少必要参数';
			return res;
		}

		if (!vk.pubfn.test(data.mobile, 'mobile') || !vk.pubfn.test(data.relname, 'chinese')) {
			res['code'] = 1;
			res['msg'] = '请检查姓名是否为纯汉字、手机号格式是否正确';
			return res;
		}

		if (data.content.length < 5) {
			res['code'] = 1;
			res['msg'] = '留言内容不得少于5个字';
			return res;
		}

		let dbName = "bwin-guestbook";

		// 根据ip地址查询上次留言时间
		let info = await vk.baseDao.findByWhereJson({
			dbName: dbName,
			whereJson: {
				ip: clientIP,
			}
		});


		if (!vk.pubfn.isNull(info)) {
			let currentTime = Date.parse(new Date()); // 当前时间戳，ms
			if (currentTime - info._add_time <= 3600000) {
				// 1小时内无法再次提交
				res['code'] = 1;
				res['msg'] = '请勿频繁重复提交';
				return res;
			}
		}


		// 创建留言
		let id = await vk.baseDao.add({
			dbName: dbName, // 表名
			dataJson: { // 需要新增的数据 json格式
				relname: data.relname,
				mobile: data.mobile,
				content: data.content,
				ip: clientIP,
			}
		});

		let websiteConfig = await vk.baseDao.findByWhereJson({
			dbName: "bwin-website",
			whereJson: {
				_id: _.neq(1)
			}
		});
		
		if(websiteConfig['use_email']){
			let companyInfo = await vk.baseDao.findByWhereJson({
				dbName: "bwin-company",
				whereJson: {
					_id: _.neq(1)
				}
			});
			
			// 发送留言通知
			let callFunctionResult = await uniCloud.callFunction({
				name: "router",
				data: {
					$url: "client/bwin/pub/postEmail",
					data: {
						email: companyInfo['email'],
						content: data.content
					}
				}
			});
		}

		res['data']['id'] = id;
		res['msg'] = 'success';

		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}
}
