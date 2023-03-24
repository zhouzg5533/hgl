'use strict';
var vkmail;
try {
	vkmail = require('vk-mail');
} catch (err) {
	console.error("请先添加公共模块：vk-mail");
}
module.exports = {
	/**
	 * 发送邮件
	 * @url client/bwin/pub/postEmail 前端调用的url参数地址
	 * data 请求参数
	 * @param {String} email  接收邮件
	 * @param {String} content  发送内容
	 */
	main: async (event, context) => {
		// 业务逻辑开始-----------------------------------------------------------
		let res = { code: 0, msg: "" };
		let {
			data = {},
			email, // 前端接收邮箱
			content, // 接受邮箱
		} = event;

		// 支持QQ 163 等主流邮箱
		let emailConfig = {
			"host": "", // 邮件服务商域名地址,如smtp.163.com
			"port": "465", // 端口
			"secure": true, // use SSL
			"auth": {
				"user": "", // 发件人邮箱账号，你的邮箱
				"pass": "", // 账号授权码，请看使用手册中的说明
			}
		};

		if (!data.email) return { code: -1, msg: "email不能为空" };
		if (!data.content) return { code: -1, msg: "邮件内容不能为空" };

		// 创建邮箱服务实例
		let emailService = vkmail.createTransport({
			"host": emailConfig.host,
			"port": emailConfig.port,
			"secure": emailConfig.secure, // use SSL
			"auth": emailConfig.auth
		});

		try {
			// 发送邮件
			res.sendMailRes = await emailService.sendMail({
				"from": emailConfig.auth.user, // 邮件的发送者
				"to": data.email, // 邮件的接收者
				"cc": emailConfig.auth.user, // 由于邮件可能会被当成垃圾邮件，但只要把右键抄送给自己一份，就不会被当成垃圾邮件。
				"subject": '测试发送邮件', // 邮件的标题
				"text": data.content, // 邮件的内容
			});
			
			// 标记发送成功
			res.code = 0;
			res.msg = "ok";

		} catch (err) {
			res.code = -1;
			res.msg = "邮件发送失败";
			res.err = err;
		}

		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}
}
