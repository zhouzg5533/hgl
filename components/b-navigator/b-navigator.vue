<template>
	<view class="container b-skeleton">
		<!-- 占位 -->
		<view class="status_bar"><!-- 这里是状态栏 --></view>
		<!-- 导航栏 -->
		<view class="nav-wrap b-skeleton-fillet" :class="transparent ? 'nav-wrap-transparent' : ''">
			<!-- logo -->
			<view class="nav-left-wrap b-skeleton-fillet">
				<view class="logo-wrap" @click="vk.navigateToHome">
					<match-media :max-width="1200"><image class="logo" :src="vk.vuex.get('$app.websiteConfig.logo1')" mode="aspectFit"></image></match-media>
					<match-media :min-width="1201"><image class="logo-w" :src="vk.vuex.get('$app.websiteConfig.logo2')" mode="aspectFit"></image></match-media>
				</view>
				<match-media :min-width="768">
					<view class="search-wrap">
						<input class="search-input" v-model="searchValue" type="text" placeholder="搜索新闻" placeholder-style="color:#cecece" @confirm="search" />
						<uni-icons type="search" color="#ffffff" size="18"></uni-icons>
					</view>
				</match-media>
			</view>
			<view class="nav-right-wrap b-skeleton-fillet">
				<match-media :min-width="768">
					<!-- 完整菜单 -->
					<view class="menu-list-wrap">
						<view v-for="(item, index) in menuList" class="menu-item b-skeleton-fillet" :key="index">
							<view class="title" :class="currentPage == item.path ? 'title-active' : ''" @click="vk.reLaunch(item.path)">{{ item.title }}</view>
							<view v-if="item.subMenuList !== undefined && item.subMenuList.length > 0" class="sub-menu">
								<view class="sub-menu-item b-line-1" v-for="(subMenu, subMenuIndex) in item.subMenuList" :key="subMenuIndex">
									<view class="sub-title" @click="vk.reLaunch(subMenu.path)">{{ subMenu.title }}</view>
								</view>
							</view>
						</view>
					</view>
				</match-media>
				<!-- 抽屉菜单 -->
				<match-media :max-width="768">
					<view class="mini-right-wrap">
						<uni-icons
							class="b-m-r-10"
							type="search"
							size="22"
							color="#ffffff"
							@click="
								miniSearchBarShow = !miniSearchBarShow;
								miniMenuShow = false;
							"
						></uni-icons>
						<uni-icons
							:type="miniMenuShow ? 'closeempty' : 'bars'"
							size="22"
							color="#ffffff"
							@click="
								miniMenuShow = !miniMenuShow;
								miniSearchBarShow = false;
							"
						></uni-icons>
					</view>
					<view class="mini-menu-list" :class="miniMenuShow ? 'mini-menu-list-show' : ''">
						<view v-for="(item, index) in menuList" class="mini-menu-item" :key="index" @click="vk.reLaunch(item.path)">
							<view class="mini-menu-title">{{ item.title }}</view>
							<uni-icons type="forward"></uni-icons>
						</view>
						<view class="mini-menu-bottom-bar" @click="miniMenuShow = false"><uni-icons type="top" size="22" color="#888888"></uni-icons></view>
					</view>
					<view class="mini-search-bar" :class="miniSearchBarShow ? 'mini-search-bar-show' : ''">
						<input v-model="searchValue" placeholder="搜索新闻" type="text" value="" @confirm="search" />
					</view>
				</match-media>
				<!-- tel -->
				<match-media :min-width="1200">
					<view class="tel b-skeleton-fillet">
						<uni-icons class="b-m-r-10" type="phone" color="#ffffff" size="22"></uni-icons>
						<text>{{ vk.vuex.get('$app.companyInfo.tel') }}</text>
					</view>
				</match-media>
			</view>
		</view>
		<!-- 占位 -->
		<view v-if="!transparent" class="nav-gap-bar"></view>
		<!-- 遮罩 -->
		<view v-if="miniMenuShow || miniSearchBarShow" class="menu-mask" @click="miniMenuShow = miniSearchBarShow = false"></view>
	</view>
</template>
<script>
var that;
export default {
	name: 'b-navigator',
	data() {
		return {
			transparent: true, // 默认沉浸式
			menuList: [
				{
					title: '首页',
					path: '/pages/index/index'
				},
				{
					title: '产品中心',
					path: '/pages/product/list'
				},
				{
					title: '新闻中心',
					path: '/pages/news/list'
				},
				{
					title: '关于我们',
					path: '/pages/about/index'
				}
			], // 菜单
			searchValue: null, // 输入框内容
			currentPage: '/pages/index/index',
			miniMenuShow: false, // 小导航栏
			miniSearchBarShow: false // 小搜索栏
		};
	},
	props: {
		page: {
			type: String,
			default: ''
		}
	},
	created() {
		that = this;

		// 当前导航高亮
		this.currentPage = '/' + getCurrentPages()[0]['route'];

		// 初始化
		let currentTime = Date.parse(new Date()) / 1000; // 当前时间戳，秒
		if (uni.vk.vuex.get('$app.inited')) {
			let lastInitedTime = uni.vk.vuex.get('$app.lastInitedTime');
			let cacheTime = uni.vk.vuex.get('$app.websiteConfig.cache_time') * 3600; // h*3600=s
			if (currentTime - lastInitedTime > cacheTime) {
				// 进入系统init
				uni.vk
					.callFunction({
						url: 'client/bwin/pub/init',
						needAlert: false // 报错也不弹窗
					})
					.then(res => {
						uni.vk.vuex.set('$app.websiteConfig', res.data.websiteConfig);
						uni.vk.vuex.set('$app.companyInfo', res.data.companyInfo);
						uni.vk.vuex.set('$app.menuList', res.data.menuList);
						uni.vk.vuex.set('$app.headerConfig', res.data.headerConfig);
						uni.vk.vuex.set('$app.lastInitedTime', currentTime); // 写入本次初始化的时间戳
						uni.vk.vuex.set('$app.inited', true);
						that.skeletonLoading = false;
					})
					.catch(err => {
						console.log(err);
					});
			} else {
				console.log('缓存将于:' + ((cacheTime - (currentTime - lastInitedTime)) / 3600).toFixed(2) + '小时后过期');
			}
		} else {
			// 进入系统init
			that.skeletonLoading = true;
			uni.vk
				.callFunction({
					url: 'client/bwin/pub/init',
					needAlert: false // 报错也不弹窗
				})
				.then(res => {
					uni.vk.vuex.set('$app.websiteConfig', res.data.websiteConfig);
					uni.vk.vuex.set('$app.companyInfo', res.data.companyInfo);
					uni.vk.vuex.set('$app.menuList', res.data.menuList);
					uni.vk.vuex.set('$app.headerConfig', res.data.headerConfig);
					uni.vk.vuex.set('$app.lastInitedTime', currentTime); // 写入本次初始化的时间戳
					uni.vk.vuex.set('$app.inited', true);
					that.skeletonLoading = false;
				})
				.catch(err => {
					console.log(err);
				});
		}

		// 查询赋值menuList
		this.menuList = this.vk.pubfn.deepClone(this.vk.vuex.get('$app.menuList'));

		// 菜单栏是否沉浸式
		let headerConfig = this.vk.pubfn.getListItem(this.vk.vuex.get('$app.headerConfig'), 'page', this.page);
		if (headerConfig) {
			this.transparent = headerConfig['is_immersive'];
		}
	},
	methods: {
		search() {
			that = this;
			that.miniMenuShow = false;
			uni.vk.navigateTo({
				url: '/pages/news/search',
				success: function(res) {
					// 通过eventChannel向被打开页面传送数据
					res.eventChannel.emit('data', {
						kw: that.searchValue
					});
				}
			});
		}
	}
};
</script>
<style lang="scss">
// 移动端菜单遮罩
.menu-mask {
	z-index: 4;
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background-color: rgba($color: #000000, $alpha: 0.5);
}

.loading-wrap-show {
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: center;
}

// 占位
.status_bar {
	position: fixed;
	top: 0;
	left: 0;
	background-color: #050505;
	height: var(--status-bar-height);
	width: 100%;
	z-index: 9;
}

// 正文
.nav-gap-bar {
	position: relative;
	top: var(--status-bar-height);
	left: 0;
	width: 100%;
	height: 70px;
	background-color: #ffffff;
}

.nav-wrap {
	z-index: 9;
	position: fixed;
	top: var(--status-bar-height);
	left: 0;
	width: 100%;
	height: 70px;
	background-color: #262626;
	display: flex;
	align-items: center;
	justify-content: space-between;

	.nav-left-wrap {
		display: flex;
		align-items: center;

		.logo-wrap {
			display: flex;
			align-items: center;
			background-color: #4d4948;
			height: 70px;
			padding: 0 20px;

			.logo {
				width: 50px;
				height: 50px;
				font-size: 0px;
			}

			.logo-w {
				width: 200px;
				margin-top: 5px;
				height: 50px;
				font-size: 0px;
			}

			.logo-title {
				white-space: nowrap;
				color: #ffffff;
				font-weight: bold;
				font-size: 22px;
				transition: all 0.2s linear;
				margin-left: 10px;

				&:hover {
					color: #ea6101;
				}
			}
		}

		.search-wrap {
			background-color: #ea6101;
			height: 70px;
			width: 40px;
			display: flex;
			align-items: center;
			justify-content: center;
			transition: all 0.3s linear;

			.search-input {
				display: none;
				color: #ffffff;
			}

			&:hover {
				width: 240px;
			}

			&:hover .search-input {
				display: block;
			}
		}
	}

	.nav-right-wrap {
		// width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-left: 10vw;

		.menu-list-wrap {
			display: flex;
			margin-right: 5vw;

			.menu-item {
				color: #ffffff;
				font-size: 16px;
				padding: 0 20px;
				position: relative;

				.title {
					display: flex;
					align-items: center;
					justify-content: center;
					height: 70px;
					line-height: 70px;
					transition: all 0.1s linear;
					position: relative;

					&:hover:after {
						content: '';
						width: 100%;
						height: 4px;
						background-color: #ea6101;
						position: absolute;
						left: 0;
						bottom: 0;
					}
				}

				.title-active:after {
					content: '';
					width: 100%;
					height: 4px;
					background-color: #ea6101;
					position: absolute;
					left: 0;
					bottom: 0;
				}

				&:hover .sub-menu {
					display: block;
					animation: showSubMenu 0.3s;
				}

				.sub-menu {
					display: none;
					position: absolute;
					top: 70px;
					left: 0px;
					font-size: 14px;
					padding: 10px 20px;
					white-space: nowrap;
					background-color: #262626;
					transition: all 0.2s linear;

					.sub-menu-item {
						margin-bottom: 15px;
						max-width: 100px;

						&:last-child {
							margin-bottom: 0;
						}

						.sub-title {
							display: flex;
							align-items: center;
							justify-content: center;
							padding: 5px 0;
							position: relative;

							&:after {
								content: '';
								width: 0;
								height: 2px;
								background-color: #ea6101;
								position: absolute;
								left: 0;
								bottom: 0;
								transition: all 0.2s linear;
							}

							&:hover:after {
								width: 100%;
							}
						}
					}
				}
			}
		}

		.mini-right-wrap {
			display: flex;
			align-items: center;
			height: 50px;
			padding: 0 20px;
			/* 避开小程序胶囊 */
			/* #ifdef MP */
			position: absolute;
			right: 200rpx;
			top: 0;
			/* #endif */
		}

		.mini-menu-list {
			width: 100%;
			height: 0rpx;
			overflow-y: scroll;
			position: absolute;
			top: 50px;
			left: 0;
			background-color: #ffffff;
			transition: height 0.1s linear;
			color: #262626;
			box-shadow: 0 0 10rpx rgba($color: #000000, $alpha: 0.2);

			.mini-menu-item {
				padding: 20rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-bottom: 1rpx solid $uni-border-color;
				font-size: 28rpx;

				&:last-child {
					border: none;
				}

				.mini-menu-title {
					font-weight: bold;
				}
			}

			.mini-menu-bottom-bar {
				margin-top: 10rpx;
				width: 100%;
				text-align: center;
				position: absolute;
				bottom: 10rpx;
			}
		}

		.mini-menu-list-show {
			height: 400rpx;
		}

		.mini-search-bar {
			width: 100%;
			height: 0px;
			overflow-y: scroll;
			position: absolute;
			top: 50px;
			left: 0;
			background-color: #ffffff;
			transition: height 0.1s linear;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 0 20rpx;
			box-shadow: 0 0 10rpx rgba($color: #000000, $alpha: 0.2);

			input {
				width: 100%;
			}
		}

		.mini-search-bar-show {
			height: 50px;
		}

		.tel {
			width: 200px;
			height: 70px;
			color: #ffffff;
			font-size: 18px;
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: #ea6101;
		}
	}
}

.nav-wrap-transparent {
	background-color: rgba($color: #262626, $alpha: 0.3);
	border-bottom: 1px solid rgba($color: #ffffff, $alpha: 0.3);
}

@keyframes showSubMenu {
	from {
		transform: translateY(-5px);
	}

	to {
		transform: translateY(0);
	}
}

/* 小屏幕下导航栏缩小 */
@media screen and (max-width: 768px) {
	.nav-wrap {
		height: 50px;

		.nav-left-wrap {
			.logo-wrap {
				height: 50px;
				background-color: rgba($color: #000000, $alpha: 0);

				.logo {
					width: 30px;
					height: 30px;
				}
			}
		}
	}

	.nav-gap-bar {
		height: 50px;
	}
}
</style>
