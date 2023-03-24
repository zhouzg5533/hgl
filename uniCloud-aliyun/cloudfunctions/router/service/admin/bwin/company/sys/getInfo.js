module.exports = {
  /**
   * 查询最新1条记录
   * @url admin/kong/sys/getInfo 前端调用的url参数地址
   * data 请求参数 说明
   * @param {Array<Object>}  sortRule  排序规则
   * @param {object}         formData  查询条件数据源
   * @param {Array<Object>}  columns   查询条件规则
   * res 返回参数说明
   * @param {Number}         code      错误码，0表示成功
   * @param {String}         msg       详细信息
   */
  main: async (event) => {
		let { data = {}, userInfo, util, filterResponse, originalParam } = event;
		let { customUtil, uniID, config, pubFun, vk , db, _ } = util;
		let { uid } = data;
		let res = { code : 0, msg : '' };
		// 业务逻辑开始-----------------------------------------------------------
		let dbName = "bwin-company";
		res = await vk.baseDao.selects({
			dbName
		});
		return res;
  }

}