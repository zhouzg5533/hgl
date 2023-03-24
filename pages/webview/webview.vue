<template>
	<view class="content"><web-view v-if="url !== ''" :webview-styles="webviewStyles" :src="url"></web-view></view>
</template>

<script>
var that;
var vk;
export default {
	data() {
		return {
			url: '',
			webviewStyles: {
				progress: {
					color: '#ea6101'
				}
			},
			data: {}
		};
	},
	onLoad(options = {}) {
		that = this;
		vk = that.vk;
		const eventChannel = that.getOpenerEventChannel(); // that 需指向 this
		// 监听data事件，获取上一页面通过eventChannel.emit传送到当前页面的数据
		if (eventChannel.on) {
			eventChannel.on('data', data => {
				that.url = data.url;
				console.log(that.url);
			});
		}
	}
};
</script>

<style lang="scss">
	.content {
		width: 100vw;
		height: 100vh;
		position: relative;
	}
</style>
