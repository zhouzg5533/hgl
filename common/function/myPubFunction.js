/**
 * 自定义公共函数
 */
import config from '@/app.config.js';
var myfn = {};
/**
 * 测试函数test1
 * vk.myfn.test1();
 */
myfn.test1 = function(obj = {}) {
	console.log("执行了自定义公共函数test1");
	return obj;
};

/**
 * 以下为后端专用
 */


/**
 * 以下为前端专用
 */


/**
 * 跳转外链
 * vk.myfn.toOutLink(url);
 */
myfn.openUrl = function(url) {
	let str = url.replace(/^\s+|\s+$/g, "");
	if (str.slice(0, 4) === 'http') {
		// 外链
		//#ifdef H5
		uni.vk.toast('即将跳转外部网址', 'none', 1500, true, function() {
			window.location.href = str;
		})
		//#endif
		//#ifdef MP
		uni.vk.navigateTo({
			url: '/pages/webview/webview',
			success: function(res) {
				// 通过eventChannel向被打开页面传送数据
				res.eventChannel.emit('data', {
					url: url
				})
			}
		})
		//#endif
		// #ifdef APP-PLUS
		plus.runtime.openURL(str, function(res) {
			console.log(res);
		});
		//#endif
	} else {
		uni.vk.navigateTo(url);
	}
}

/**
 * 地图导航
 */
myfn.navigateToMap = function(lat, lon, title, address) {
	if (uni.vk.pubfn.isNullOne(lat, lon, title, address)) {
		// 有一个参数为空
		lat = uni.vk.vuex.get('$app.companyInfo.latitude');
		lon = uni.vk.vuex.get('$app.companyInfo.longitude');
		title = uni.vk.vuex.get('$app.companyInfo.name');
		address = uni.vk.vuex.get('$app.companyInfo.address');
	}
	uni.vk.toast('即将打开地图', 'none', true, 1500, function() {
		// #ifndef H5
		uni.openLocation({
			latitude: lat,
			longitude: lon,
			name: title,
			address: address,
			success: function() {
				console.log('success');
			}
		});
		// #endif
		// #ifdef H5
		window.location = 'https://apis.map.qq.com/uri/v1/marker?marker=coord:' + lat + ',' + lon +
			';title:' + title +
			';addr:' + address + '&referer=myapp'
		// #endif
	})

}


/**
 * 拨打电话
 */
myfn.dial = function(tel) {
	// #ifdef H5
	// H5不支持拨号，只提示号码
	uni.vk.toast(tel);
	// #endif
	// #ifndef H5
	uni.makePhoneCall({
		phoneNumber: tel || uni.vk.vuex.get('$app.companyInfo.tel'),
	})
	// #endif

}

export default myfn;
