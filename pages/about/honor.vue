<template>
	<view class="container b-skeleton">
		<b-navigator page="about"></b-navigator>
		<b-header page="about"></b-header>

		<!-- 主体部分 -->
		<view class="main">
			<view class="honor-list-wrap">
				<view v-for="(item, index) in honorList" class="honor-card b-skeleton-fillet" :key="index">
					<image :src="item.image_url" mode="aspectFill"></image>
					<view class="honor-des">{{ item.name }}</view>
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
			honorList: [
				{
					image_url: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-613ff9e2-568b-4845-987f-93626e21bcde/c2ec1535-3074-4893-baec-14464af67d55.jpg'
				},
				{
					image_url: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-613ff9e2-568b-4845-987f-93626e21bcde/c2ec1535-3074-4893-baec-14464af67d55.jpg'
				},
				{
					image_url: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-613ff9e2-568b-4845-987f-93626e21bcde/c2ec1535-3074-4893-baec-14464af67d55.jpg'
				}
			]
		};
	},
	onLoad(params) {
		that = this;
		vk = that.vk;
		that.getHonorList();
		
		let pages = getCurrentPages(); //页面示例
		let page = pages[pages.length - 1]; //当前页面实例
		let currentPageTitle = page.$holder.navigationBarTitleText; //当前页面标题
		
		uni.setNavigationBarTitle({
			title: currentPageTitle + '-' + this.vk.vuex.get('$app.companyInfo.name')
		})
	},
	methods: {
		getHonorList() {
			this.skeletonLoading = true;
			uni.vk
				.callFunction({
					url: 'client/bwin/pub/getHonorList',
					needAlert: false // 报错也不弹窗
				})
				.then(res => {
					that.pagination.total = res.data.total;
					that.honorList = res.data.honorList;
					that.skeletonLoading = false;
				})
				.catch(err => {
					console.log(err);
				});
		},
		changePagination(currentPage, type) {
			this.pagination.currentPage = currentPage;
			that.getNewsList(that.kw);
		}
	}
};
</script>

<style lang="scss">
.main {
	position: relative;
	z-index: 2;
	margin-top: -70px;
	padding: 15px;
	flex-direction: column;
}

.honor-list-wrap {
	width: 100%;
	max-width: 1440px;
	margin: 0 auto;
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	flex-wrap: wrap;

	.honor-card {
		background-color: #ffffff;
		border-radius: 4px;
		overflow: hidden;
		width: calc((100% - 60px) / 3);
		height: 300px;
		margin-bottom: 20px;
		box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
		position: relative;

		image {
			padding: 10px;
			width: 100%;
			height: 300px;
			transition: all 0.3s linear;
		}

		.honor-des {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: rgba($color: #262626, $alpha: 0);
			font-size: 20px;
			font-weight: bold;
			transition: all 0.2s linear;
			opacity: 0;
			color: #ffffff;

			&:hover {
				background-color: rgba($color: #262626, $alpha: 0.1);
				opacity: 0.9;
			}
		}

		&:hover {
			image {
				transform: scale(1.1);
				filter: blur(5px);
			}
		}
	}
}

@media screen and (max-width: 960px) {
	.honor-list-wrap {
		margin-top: -140rpx;
		.honor-card {
			width: 100%;
			height: 480rpx;
			padding: 10rpx;

			image {
				width: 100%;
				height: 460rpx;
			}
		}
	}
}
</style>
