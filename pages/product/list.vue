<template>
	<view class="container b-skeleton">
		<b-navigator page="product"></b-navigator>
		<!-- 头图 -->
		<b-header page="product"></b-header>

		<view class="main">
			<view class="product-list-wrap">
				<view v-for="(item, index) in productList" class="product-card b-skeleton-fillet" @click="vk.navigateTo('/pages/product/detail?id=' + item._id)" :key="index">
					<view class="image-wrap b-skeleton-fillet"><image :src="item.cover_image" mode="aspectFill"></image></view>
					<view class="product-des-wrap">
						<view class="product-title b-line-1 b-skeleton-fillet">{{ item.name }}</view>
						<view class="product-des b-line-2">{{ item.content }}</view>
					</view>
				</view>
				<view style="width: 31%;height: 0;overflow: visible;margin-right: 20px;"></view>
			</view>
			<page-pagination
				v-if="pagination.total > pagination.pageSize"
				size="normal"
				class="b-m-b-10"
				color="#262626"
				:total="pagination.total"
				:pageSize="pagination.pageSize"
				:currentPage="pagination.currentPage"
				@change="changePagination"
			></page-pagination>
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
			pagination: {
				total: 0,
				pageSize: 6,
				currentPage: 1
			},
			productList: [
				{
					_id: '62487650eb124700015bb176',
					category_id: '62480ca9eb9d4c0001383909',
					cover_image: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-613ff9e2-568b-4845-987f-93626e21bcde/edbcb4bb-5015-494e-b49b-2072803cf792.png',
					content:
						'骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符',
					name: '骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符'
				},
				{
					_id: '62487650eb124700015bb176',
					category_id: '62480ca9eb9d4c0001383909',
					cover_image: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-613ff9e2-568b-4845-987f-93626e21bcde/edbcb4bb-5015-494e-b49b-2072803cf792.png',
					content:
						'骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符',
					name: '骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符'
				},
				{
					_id: '62487650eb124700015bb176',
					category_id: '62480ca9eb9d4c0001383909',
					cover_image: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-613ff9e2-568b-4845-987f-93626e21bcde/edbcb4bb-5015-494e-b49b-2072803cf792.png',
					content:
						'骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符',
					name: '骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符'
				}
			],
			currentCategoryId: null
		};
	},
	onLoad(params) {
		that = this;
		vk = that.vk;

		if (params.category !== undefined) {
			that.currentCategoryId = params.category;
		}

		that.getProductList();
		
		let pages = getCurrentPages(); //页面示例
		let page = pages[pages.length - 1]; //当前页面实例
		let currentPageTitle = page.$holder.navigationBarTitleText; //当前页面标题
		
		uni.setNavigationBarTitle({
			title: currentPageTitle + '-' + this.vk.vuex.get('$app.companyInfo.name')
		})
	},
	methods: {
		getProductList() {
			that.skeletonLoading = true;
			uni.vk
				.callFunction({
					url: 'client/bwin/pub/getProductList',
					needAlert: false, // 报错也不弹窗
					data: {
						currentPage: that.pagination.currentPage,
						pageSize: that.pagination.pageSize,
						categoryId: that.currentCategoryId
					}
				})
				.then(res => {
					that.pagination.total = res.data.total;
					that.productList = res.data.productList;
					that.skeletonLoading = false;
				})
				.catch(err => {
					console.log(err);
				});
		},
		changePagination(currentPage, type) {
			this.pagination.currentPage = currentPage;
			that.getProductList();
		}
	}
};
</script>
<style lang="scss">
.main {
	flex-direction: column;
}
// 产品列表
.product-list-wrap {
	width: 100%;
	height: 100%;
	display: flex;
	flex-flow: row wrap;
	justify-content: space-between;
	box-sizing: border-box;

	.product-card {
		width: calc((100% - 60px) / 3);
		height: 350px;
		// margin-right: 20px;
		border-radius: 4px;
		background-color: #ffffff;
		box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
		margin-bottom: 20px;

		// margin-right: -10px;
		// margin-left: -15px;
		// margin-top: 5px;
		// padding: 10px;

		&:nth-child(n + 5) {
			margin-bottom: 0;
		}

		.image-wrap {
			height: 250px;
			overflow: hidden;

			image {
				border-top-left-radius: 4px;
				border-top-right-radius: 4px;
				transition: all 0.3s linear;
				width: 100%;
				height: 250px;
			}
		}

		.product-des-wrap {
			display: flex;
			flex-direction: column;
			padding: 10px;

			.product-title {
				font-size: 20px;
				font-weight: bold;
				margin-bottom: 5px;
			}

			.product-des {
				color: #888888;
				font-size: 16px;
			}
		}

		&:hover {
			background-color: #ea6101;

			image {
				transform: scale(1.1);
			}

			.product-des-wrap {
				color: #ffffff;

				.product-des {
					color: #ffffff;
				}
			}
		}
	}
}

@media screen and (max-width: 960px) {
	.main {
		display: block;
		margin-top: -240rpx;
	}

	.product-list-wrap {
		flex-direction: column;

		.product-card {
			margin-right: 0px;
			margin-bottom: 20rpx;
			width: 100%;
			height: 330rpx;

			.image-wrap {
				height: 250rpx;

				image {
					height: 250rpx;
				}
			}

			.product-des-wrap {
				padding: 10rpx;

				.product-title {
					font-size: 16px;
				}

				.product-des {
					display: none !important;
				}
			}
		}
	}
}
</style>
