<template>
	<view class="container b-skeleton">
		<b-navigator page="news"></b-navigator>
		<!-- 头图 -->
		<b-header page="news"></b-header>
		<!-- 主体部分 -->
		<view class="main">
			<!-- 阅读部分 -->
			<view class="news-content-wrap">
				<view class="news-title-wrap">
					<view class="news-title b-skeleton-fillet">{{ detail.title }}</view>
					<view class="news-data">
						<text class="data-item b-skeleton-fillet">{{ vk.pubfn.timeFormat(detail._add_time, 'yyyy-MM-dd') }}</text>
						<text class="data-item b-skeleton-fillet">{{ detail.categoryInfo.name }}</text>
						<text class="data-item b-skeleton-fillet">{{ detail.read_num }}次阅读</text>
					</view>
				</view>
				<view class="news-content b-skeleton-fillet"><rich-text :nodes="content"></rich-text></view>
			</view>
			<view v-if="hotList.length > 0" class="hot-news">
				<view class="hot-news-title b-skeleton-fillet">热门资讯</view>
				<view class="hot-news-list">
					<view v-for="(item, index) in hotList" class="hot-news-item" @click="vk.navigateTo('/pages/news/read?id=' + item._id)" :key="index">
						<view class="news-title b-line-1 b-skeleton-fillet">{{ item.title }}</view>
						<view class="news-date b-skeleton-fillet">{{ vk.pubfn.timeFormat(item._add_time, 'MM-dd') }}</view>
					</view>
				</view>
			</view>
		</view>
		<b-footer></b-footer>
		<!-- 骨架屏 -->
		<b-skeleton v-if="vk.vuex.get('$app.websiteConfig.use_skeleton')" :loading="skeletonLoading" :animation="true" elColor="#d1d1d1" bgColor="#ffffff"></b-skeleton>
	</view>
</template>
<script>
var that;
var vk;
export default {
	data() {
		return {
			skeletonLoading: true,
			detail: {},
			content: '',
			hotList: []
		};
	},
	onLoad(params) {
		that = this;
		vk = that.vk;
		if (params.id == undefined) {
			vk.toast('缺少必要参数');
			setTimeout(() => {
				uni.navigateBack();
			}, 1500);
		}

		vk.callFunction({
			url: 'client/bwin/pub/getNewsDetail',
			needAlert: false, // 报错也不弹窗
			data: {
				newsId: params.id
			}
		})
			.then(res => {
				that.detail = res.data.detail;
				// 为了让超宽图片不溢出屏幕，处理一下内容里的图片
				// 但会牺牲图片的排版
				that.content = res.data.detail.content
					.replace(/<p([\s\w"=\/\.:;]+)((?:(style="[^"]+")))/gi, '<p')
					.replace(/<p>/gi, '<p style="font-size: 15px; line-height: 25px;">')
					.replace(/<img([\s\w"-=\/\.:;]+)((?:(height="[^"]+")))/gi, '<img$1')
					.replace(/<img([\s\w"-=\/\.:;]+)((?:(width="[^"]+")))/gi, '<img$1')
					.replace(/<img([\s\w"-=\/\.:;]+)((?:(style="[^"]+")))/gi, '<img$1')
					.replace(/<img([\s\w"-=\/\.:;]+)((?:(alt="[^"]+")))/gi, '<img$1')
					.replace(/<img([\s\w"-=\/\.:;]+)/gi, '<img style="max-width: 100%;" $1');
				this.hotList = res.data.hotList;
				
				// 设置标题
				uni.setNavigationBarTitle({
					title: this.detail.title + '-' + this.vk.vuex.get('$app.companyInfo.name')
				})
				
				this.skeletonLoading = false;
			})
			.catch(err => {
				vk.toast(err.msg, 'none', 1500, true, function() {
					vk.navigateToHome();
				});
			});
	}
};
</script>
<style lang="scss">
.news-content-wrap {
	font-size: 16px;
	border-radius: 4px;
	padding: 15px;
	width: 70%;
	color: #262626;
	background-color: #ffffff;
	box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);

	.news-title-wrap {
		padding-bottom: 30rpx;
		margin-bottom: 20rpx;
		text-align: center;
		border-bottom: 1px solid $uni-border-color;

		.news-title {
			font-size: 22px;
			font-weight: bold;
			margin-bottom: 10px;
		}

		.news-data {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;

			.data-item {
				font-size: 14px;
				color: #888888;
				margin-right: 20rpx;
			}
		}
	}

	.news-content {
		padding: 0 20px;
		uni-rich-text img {
			max-width: 100% !important;
		}
	}
}

.hot-news {
	font-size: 16px;
	border-radius: 4px;
	padding: 15px;
	width: 28%;
	color: #262626;
	background-color: #ffffff;
	box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);

	.hot-news-title {
		font-weight: bold;
		padding: 10px 0 20px;
		margin-bottom: 10px;
		font-size: 18px;
		border-bottom: 1px solid $uni-border-color;
	}

	.hot-news-list {
		color: #888888;

		.hot-news-item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 5px 0;
			margin-bottom: 10px;
			font-size: 14px;

			.news-title {
				width: 80%;
				max-width: 240px;
			}

			&:last-child {
				padding-bottom: 0;
			}

			&:hover {
				color: #ea6101;
			}
		}
	}
}

@media screen and (max-width: 960px) {
	.main {
		flex-direction: column;
		margin-top: -240rpx;
	}

	.news-content-wrap {
		width: 100%;
		margin-bottom: 20rpx;

		.news-title-wrap {
			.news-title {
				font-size: 36rpx;
			}
		}

		.news-content {
			padding: 0;
		}
	}

	.hot-news {
		width: 100%;
	}
}
</style>
