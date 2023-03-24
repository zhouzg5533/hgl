<script>
	import config from '@/app.config.js';
	export default {
		onLaunch: function() {
			console.log('App Launch');
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		onPageNotFound() {
			uni.redirectTo({
				url: config.error.url
			});
		}
	}
</script>
<style lang="scss">
	/*每个页面公共css */
	@import './static/css/common.scss';
</style>
