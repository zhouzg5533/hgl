<template>
	<view class="container b-skeleton">
		<b-navigator page="news"></b-navigator>
		<b-header page="news"></b-header>
		<view class="main">
			<view v-if="newsList.length == 0" class="empty-wrap">
				<svg t="1648639385845" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3398" width="150" height="150">
					<path
						d="M1003.44 769.616h-113.28c7.248-12.592 10.88-26.8 10.88-41.024V130.048c0-21.92-8.864-42.64-24.192-58.064A81.76 81.76 0 0 0 818.8 48h-491.04c-45.168 0.032-81.792 36.912-81.84 82.448V150.72h-61.28c-21.76 0-42.336 8.528-58.048 23.952A83.344 83.344 0 0 0 102.4 233.184v598.144c0 14.624 3.616 28.832 10.88 41.024H20.56a20.72 20.72 0 0 0 0 41.408h515.632l49.984 50.368c16.144 15.84 41.936 15.84 57.664 0 13.184-13.392 15.84-34.032 6.448-50.368h107.632a20.72 20.72 0 0 0 14.528-35.328 19.728 19.728 0 0 0-14.528-6.08h-10.88c7.264-12.592 10.88-26.8 10.88-41.024v-20.704h245.52c5.248 0 10.496-2.032 14.512-6.08 4.032-4.08 6.048-8.96 6.048-14.64 0-5.28-2.016-10.56-6.048-14.624a20.336 20.336 0 0 0-14.512-5.664zM716.8 831.36c0 10.96-4.016 21.52-11.68 29.232a41.072 41.072 0 0 1-29.04 12.192h-64.912l-68.528-69.04c-10.48-10.56-25.408-14.624-39.52-10.56l-19.344-19.488c44.352-59.296 36.704-143.36-18.144-193.296a142.64 142.64 0 0 0-192.688-0.4c-54.848 49.936-62.912 133.6-18.96 193.28a142.688 142.688 0 0 0 94.336 56.848 141.296 141.296 0 0 0 106.432-27.2l19.36 19.488c-3.632 14.224 0.4 29.648 10.496 39.808l10.464 10.56H184.24c-22.56 0-40.72-18.688-40.72-41.424V232.384c0-22.336 17.744-40.208 39.52-40.208h494.24c21.76 0 39.52 17.872 39.52 40.208v598.96z m-275.76-71.056a102.416 102.416 0 0 1-98.752 26.784c-35.488-9.328-62.896-37.36-72.592-73.088a103.968 103.968 0 0 1 26.624-99.488 101.92 101.92 0 0 1 144.72 0c40.32 40.208 40.32 105.168 0 145.792z m419.28-31.68a41.36 41.36 0 0 1-40.704 41.408H757.92V233.184c0-21.92-8.864-42.64-24.192-58.064a81.728 81.728 0 0 0-58.048-23.952H287.04V130.448a41.344 41.344 0 0 1 40.72-41.424h491.84c22.576 0 40.72 18.272 40.72 41.424v598.16z m-614.4-433.296a20.72 20.72 0 0 1-20.56-20.704c0-5.68 2.016-10.56 6.048-14.624 3.84-3.888 9.072-6.08 14.512-6.08h225.36c11.28 0 20.56 9.328 20.56 20.704 0 11.36-9.28 20.704-20.56 20.704H245.92z m143.52 164.88c5.264 0 10.496 2.432 14.512 6.08 4.032 4.064 6.064 9.344 6.064 14.624 0 5.68-2.032 10.56-6.064 14.624-3.84 3.888-9.056 6.08-14.512 6.08h-143.52c-5.648 0-10.48-2.432-14.512-6.08a20.672 20.672 0 0 1-6.048-14.624c0-5.68 2.016-10.56 6.048-14.608 3.84-3.904 9.056-6.112 14.512-6.112h143.52v0.016z m184.24-103.152c5.248 0 10.496 2.448 14.112 6.08 4.032 4.064 6.048 9.36 6.048 14.624a20.112 20.112 0 0 1-20.16 20.72H245.92c-10.88 0-20.16-9.344-20.16-20.72a20.128 20.128 0 0 1 20.16-20.704h327.76z"
						p-id="3399"
						fill="#707070"
					></path>
				</svg>
				<text>暂无内容</text>
			</view>
			<view v-if="newsList.length > 0" class="news-list-wrap">
				<view v-for="(item, index) in newsList" class="news-list-item" @click="vk.navigateTo('/pages/news/read?id=' + item._id)" :key="index">
					<view class="news-image-wrap"><image class="news-image b-skeleton-fillet" :src="item.cover_image" mode="aspectFill"></image></view>
					<view class="news-content">
						<view class="news-title b-line-2 b-skeleton-fillet">{{ item.title }}</view>
						<view class="news-des b-line-3 b-skeleton-fillet">{{ item.des }}</view>
						<!-- <button type="default" size="mini" class="read-more-btn" @click="vk.navigateTo('/pages/news/read?id='+item._id)">查看详情</button> -->
					</view>
				</view>
				<page-pagination
					v-if="pagination.total > pagination.pageSize"
					class="b-m-b-10"
					color="#262626"
					:total="pagination.total"
					:pageSize="pagination.pageSize"
					:currentPage="pagination.currentPage"
					@change="changePagination"
				></page-pagination>
			</view>
			<view v-if="hotList.length > 0" class="hot-news">
				<view class="hot-news-title b-skeleton-fillet">热门资讯</view>
				<view class="hot-news-list">
					<view v-for="(item, index) in hotList" class="hot-news-item b-skeleton-fillet" @click="vk.navigateTo('/pages/news/read?id=' + item._id)" :key="index">
						<view class="news-title b-line-1">{{ item.title }}</view>
						<view class="news-date">{{ vk.pubfn.timeFormat(item._add_time, 'MM-dd') }}</view>
					</view>
				</view>
			</view>
		</view>

		<!--骨架屏-->
		<b-skeleton v-if="vk.vuex.get('$app.websiteConfig.use_skeleton')" :loading="skeletonLoading" :animation="true" elColor="#d1d1d1" bgColor="#ffffff"></b-skeleton>
		<b-footer></b-footer>
	</view>
</template>
<script>
var that;
var vk;
export default {
	data() {
		return {
			skeletonLoading: true,
			currentCategoryId: null,
			pagination: {
				total: 0,
				pageSize: 5,
				currentPage: 1
			},
			newsList: [
				{
					title: '骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符',
					des:
						'骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符',
					cover_image: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-613ff9e2-568b-4845-987f-93626e21bcde/14dc6219-b37f-4674-bd82-741d97dbb79d.png',
					_add_time: 1648894929816
				},
				{
					title: '骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符',
					des:
						'骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符',
					cover_image: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-613ff9e2-568b-4845-987f-93626e21bcde/14dc6219-b37f-4674-bd82-741d97dbb79d.png',
					_add_time: 1648894929816
				},
				{
					title: '骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符',
					des:
						'骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符',
					cover_image: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-613ff9e2-568b-4845-987f-93626e21bcde/14dc6219-b37f-4674-bd82-741d97dbb79d.png',
					_add_time: 1648894929816
				}
			],
			hotList: [
				{
					title: '骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符',
					_add_time: 1648894929816
				},
				{
					title: '骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符',
					_add_time: 1648894929816
				},
				{
					title: '骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符',
					_add_time: 1648894929816
				},
				{
					title: '骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符',
					_add_time: 1648894929816
				},
				{
					title: '骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符',
					_add_time: 1648894929816
				},
				{
					title: '骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符',
					_add_time: 1648894929816
				},
				{
					title: '骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符',
					_add_time: 1648894929816
				}
			]
		};
	},
	onLoad(params) {
		that = this;
		vk = that.vk;

		if (params.category !== undefined) {
			that.currentCategoryId = params.category;
		}

		that.getNewsList();
		
		let pages = getCurrentPages(); //页面示例
		let page = pages[pages.length - 1]; //当前页面实例
		let currentPageTitle = page.$holder.navigationBarTitleText; //当前页面标题
		
		uni.setNavigationBarTitle({
			title: currentPageTitle + '-' + this.vk.vuex.get('$app.companyInfo.name')
		})
	},
	methods: {
		getNewsList() {
			that.skeletonLoading = true;
			uni.vk
				.callFunction({
					url: 'client/bwin/pub/getNewsList',
					needAlert: false, // 报错也不弹窗
					data: {
						currentPage: that.pagination.currentPage,
						pageSize: that.pagination.pageSize,
						categoryId: that.currentCategoryId
					}
				})
				.then(res => {
					that.pagination.total = res.data.total;
					that.newsList = res.data.newsList;
					that.hotList = res.data.hotList;
					that.skeletonLoading = false;
				})
				.catch(err => {
					console.log(err);
				});
		},
		changePagination(currentPage, type) {
			this.pagination.currentPage = currentPage;
			that.getNewsList();
		}
	}
};
</script>
<style lang="scss">
.empty-wrap {
	width: 100%;
	height: 30vh;
	text-align: center;
}

// 新闻列表
.news-list-wrap {
	width: 70%;

	.news-list-item {
		padding: 20px;
		width: 100%;
		background-color: #ffffff;
		box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
		margin-bottom: 20px;
		border-radius: 4px;
		display: flex;
		align-items: flex-start;
		position: relative;

		.news-image-wrap {
			width: 300px;
			margin-right: 20px;
			overflow: hidden;

			.news-image {
				width: 300px;
				height: 200px;
				transition: all 0.3s linear;
			}

			&:hover {
				image {
					transform: scale(1.1);
				}
			}
		}

		.news-content {
			width: 60%;
			position: relative;
			// height: 200px;

			.news-date {
				color: #ea6101;
				margin-bottom: 5px;
			}

			.news-date,
			.news-title {
				font-weight: bold;
				margin-bottom: 15px;
			}

			.news-title {
				font-size: 20px;

				&:hover {
					color: #ea6101;
				}
			}

			.news-des {
				font-size: 16px;
				color: #888888;
				margin-bottom: 15px;
			}

			.read-more-btn {
				position: absolute;
				right: 0px;
				bottom: 0px;
			}
		}

		&:after {
			content: '';
			width: 0;
			height: 4px;
			background-color: #ea6101;
			position: absolute;
			left: 0;
			bottom: 0;
			transition: all 0.2s linear;
			border-bottom-right-radius: 4px;
			border-bottom-left-radius: 4px;
		}

		&:hover::after {
			width: 100%;
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
		font-size: 22px;
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
			font-size: 16px;

			.news-title {
				width: 80%;
				max-width: 240px;
			}

			&:last-child {
				padding-bottom: 0;
			}

			&:hover {
				font-weight: bold;
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

	.news-list-wrap {
		width: 100%;

		.news-list-item {
			flex-direction: column;
			padding: 20rpx;

			.news-image-wrap {
				width: 100%;
				height: 250rpx;
				margin-bottom: 20rpx;

				.news-image {
					width: 100%;
					height: 250rpx;
				}
			}

			.news-content {
				width: 100%;
				// height: 200rpx;

				.read-more-btn {
					display: none;
				}
			}
		}
	}

	.hot-news {
		width: 100%;
	}
}
</style>
