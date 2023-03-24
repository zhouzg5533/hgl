<template>
	<view class="container b-skeleton">
		<b-navigator page="index"></b-navigator>
		<b-sidebar></b-sidebar>
		<!-- 首页轮播图 -->
		<view class="index-swiper-wrap b-skeleton-fillet">
			<swiper class="swiper" indicator-active-color="#ffffff" indicator-color="#888888" indicator-dots autoplay interval="5000">
				<swiper-item v-for="(item, index) in swiperList" :key="index"><image :src="item.image_url" mode="aspectFill" @click="vk.myfn.openUrl(item.target_url)"></image></swiper-item>
			</swiper>
		</view>
		<view class="main">
			<!-- 产品展示 -->
			<view class="common-list-wrap">
				<view class="header-title b-skeleton-fillet" @click="vk.navigateTo('/pages/product/list')">
					<view class="title">最新产品{{ vk.getVuex('$app.history.lastInitedTime') }}</view>
					<uni-icons type="forward" color="#262626" size="24"></uni-icons>
				</view>
				<!-- 产品列表 -->
				<view class="product-card-list">
					<view class="left-product-card" @click="vk.navigateTo('/pages/product/detail?id=' + productList[0]['_id'])">
						<view class="image-wrap b-skeleton-fillet"><image :src="productList[0]['cover_image']" mode="aspectFill"></image></view>
						<view class="product-des-wrap">
							<view class="product-title b-skeleton-fillet">{{ productList[0]['name'] }}</view>
							<text class="product-des b-line-3">{{ productList[0]['content'] }}</text>
						</view>
					</view>
					<view class="right-cards-wrap">
						<view
							v-for="(item, index) in productList"
							v-if="index > 0 && index <= 4"
							class="right-card"
							@click="vk.navigateTo('/pages/product/detail?id=' + item._id)"
							:key="index"
						>
							<view class="image-wrap b-skeleton-fillet"><image :src="item.cover_image" mode="aspectFill"></image></view>
							<view class="product-des-wrap">
								<view class="product-title b-line-1 b-skeleton-fillet">{{ item.name }}</view>
								<text class="product-des b-line-1">{{ item.content }}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 企业数据介绍 -->
		<!-- 由于移动端不支持bgImage属性，这里通过层级来做 -->
		<view class="company-des-wrap">
			<view class="des-content-wrap">
				<view class="company-data-wrap">
					<view v-for="(item, index) in indexData" v-if="index <= 2" class="data-item-wrap" :key="index">
						<view class="data-num">
							<view class="main-num b-skeleton-fillet">{{item.main_num}}</view>
							<view class="sub-num b-skeleton-fillet">{{ item.unit }}</view>
						</view>
						<view class="data-title b-skeleton-fillet">
							<text>{{ item.description }}</text>
						</view>
					</view>
					<match-media v-for="(item, index) in indexData" v-if="index > 2 && index <= 4" :min-height="960" :key="index">
						<view class="data-item-wrap">
							<view class="data-num">
								<view class="main-num b-skeleton-fillet">{{item.main_num}}</view>
								<view class="sub-num b-skeleton-fillet">{{ item.unit }}</view>
							</view>
							<view class="data-title b-skeleton-fillet">
								<text>{{ item.description }}</text>
							</view>
						</view>
					</match-media>
				</view>
			</view>
			<view class="des-bg-image b-skeleton-fillet">
				<image src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-613ff9e2-568b-4845-987f-93626e21bcde/93968641-c6d5-47a5-8bed-4959d8feb48b.png" mode="aspectFill"></image>
			</view>
		</view>
		<!-- 继续main -->
		<view class="main">
			<!-- 新闻中心 -->
			<view class="common-list-wrap b-skeleton-fillet">
				<view class="header-title b-skeleton-fillet" @click="vk.navigateTo('/pages/news/list')">
					<view class="title">企业资讯</view>
					<uni-icons type="forward" color="#262626" size="24"></uni-icons>
				</view>
				<view class="news-list-wrap">
					<view class="left-news-list">
						<view
							v-for="(item, index) in newsList"
							v-if="index > 0 && index <= 4"
							class="news-list-item"
							@click="vk.navigateTo('/pages/news/read?id=' + item._id)"
							:key="index"
						>
							<view class="news-date b-skeleton-fillet">{{ vk.pubfn.timeFormat(item._add_time, 'MM-dd') }}</view>
							<view class="news-title b-skeleton-fillet">{{ item.title }}</view>
							<view class="news-des b-skeleton-fillet">{{ item.des }}</view>
						</view>
					</view>
					<view class="right-news-card" @click="vk.navigateTo('/pages/news/read?id=' + newsList[0]['_id'])">
						<view class="news-date-tag">
							<view class="main-tag-title b-skeleton-fillet">{{ vk.pubfn.timeFormat(newsList[0]['_add_time'], 'dd') }}</view>
							<view class="sub-tag-title b-skeleton-fillet">{{ vk.pubfn.timeFormat(newsList[0]['_add_time'], 'yyyy-MM') }}</view>
						</view>
						<view class="title-image-wrap"><image :src="newsList[0]['cover_image']" mode="aspectFill"></image></view>
						<view class="news-content">
							<view class="news-title b-skeleton-fillet">{{ newsList[0]['title'] }}</view>
							<view class="news-des b-skeleton-fillet">{{ newsList[0]['des'] }}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 合作客户 -->
		<view class="customer-list-wrap">
			<view class="customer-list-body">
				<view class="customer-list-title b-skeleton-fillet">
					<view class="customer-main-title b-skeleton-fillet">客户信任</view>
					<view class="customer-sub-title b-skeleton-fillet">{{ vk.vuex.get('$app.companyInfo.partner_description') }}</view>
				</view>
				<view class="customer-list">
					<view v-for="(item, index) in partnerList" class="customer-item b-skeleton-fillet" :key="index">
						<image :src="item.image_url" mode="aspectFill" @click="vk.toast(item.partner_name)"></image>
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
export default {
	data() {
		return {
			skeletonLoading: true,
			swiperList: [],
			productList: [
				{
					_id: '62487650eb124700015bb176',
					cover_image: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-613ff9e2-568b-4845-987f-93626e21bcde/edbcb4bb-5015-494e-b49b-2072803cf792.png',
					content:
						'骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符',
					name: '骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符'
				},
				{
					_id: '62487650eb124700015bb176',
					cover_image: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-613ff9e2-568b-4845-987f-93626e21bcde/edbcb4bb-5015-494e-b49b-2072803cf792.png',
					content:
						'骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符',
					name: '骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符'
				},
				{
					_id: '62487650eb124700015bb176',
					cover_image: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-613ff9e2-568b-4845-987f-93626e21bcde/edbcb4bb-5015-494e-b49b-2072803cf792.png',
					content:
						'骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符',
					name: '骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符'
				},
				{
					_id: '62487650eb124700015bb176',
					cover_image: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-613ff9e2-568b-4845-987f-93626e21bcde/edbcb4bb-5015-494e-b49b-2072803cf792.png',
					content:
						'骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符',
					name: '骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符'
				},
				{
					_id: '62487650eb124700015bb176',
					cover_image: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-613ff9e2-568b-4845-987f-93626e21bcde/edbcb4bb-5015-494e-b49b-2072803cf792.png',
					content:
						'骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符',
					name: '骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符'
				}
			],
			newsList: [
				{
					_id: '624823d1186bfc000174d07e',
					title: '骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符',
					des:
						'骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符',
					cover_image: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-613ff9e2-568b-4845-987f-93626e21bcde/14dc6219-b37f-4674-bd82-741d97dbb79d.png',
					_add_time: 1648894929816
				},
				{
					_id: '624823d1186bfc000174d07e',
					title: '骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符',
					des:
						'骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符',
					cover_image: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-613ff9e2-568b-4845-987f-93626e21bcde/14dc6219-b37f-4674-bd82-741d97dbb79d.png',
					_add_time: 1648894929816
				},
				{
					_id: '624823d1186bfc000174d07e',
					title: '骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符',
					des:
						'骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符',
					cover_image: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-613ff9e2-568b-4845-987f-93626e21bcde/14dc6219-b37f-4674-bd82-741d97dbb79d.png',
					_add_time: 1648894929816
				},
				{
					_id: '624823d1186bfc000174d07e',
					title: '骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符',
					des:
						'骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符',
					cover_image: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-613ff9e2-568b-4845-987f-93626e21bcde/14dc6219-b37f-4674-bd82-741d97dbb79d.png',
					_add_time: 1648894929816
				},
				{
					_id: '624823d1186bfc000174d07e',
					title: '骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符',
					des:
						'骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符',
					cover_image: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-613ff9e2-568b-4845-987f-93626e21bcde/14dc6219-b37f-4674-bd82-741d97dbb79d.png',
					_add_time: 1648894929816
				},
				{
					_id: '624823d1186bfc000174d07e',
					title: '骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符',
					des:
						'骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符',
					cover_image: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-613ff9e2-568b-4845-987f-93626e21bcde/14dc6219-b37f-4674-bd82-741d97dbb79d.png',
					_add_time: 1648894929816
				}
			],
			indexData: [],
			partnerList: []
		};
	},
	onLoad() {
		this.init();
		
		console.log(this.vk.vuex.get('$app'))
	},
	methods: {
		// 首页内容初始化
		init() {
			// 进入系统init
			uni.vk
				.callFunction({
					url: 'client/bwin/pub/getIndexData',
					needAlert: false // 报错也不弹窗
				})
				.then(res => {
					this.swiperList = res.data.swiperList;
					this.productList = res.data.productList;
					this.newsList = res.data.newsList;
					this.indexData = res.data.indexData;
					this.partnerList = res.data.partnerList;
					setTimeout(() => {
						this.skeletonLoading = false;
					}, 1500);
				})
				.catch(err => {
					console.log(err);
				});
		}
	},
	onPageScroll(res) {
		uni.$emit('onPageScroll', res.scrollTop); //传递参数
	}
};
</script>
<style lang="scss">
.main {
	margin: 0 auto;
}

.index-swiper-wrap {
	z-index: 1;
	width: 100%;

	.swiper {
		height: 650px;

		swiper-item {
			position: relative;

			.bg-image {
				opacity: 0.2;
				z-index: 1;
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 350px;
			}

			video,
			image {
				height: 650px;
				width: 100%;
			}

			.swiper-title-wrap {
				text-align: left;
				color: #ffffff;
				position: absolute;
				left: 10vw;
				top: 30vh;

				.main-title {
					font-size: 56px;
					font-weight: bold;
					margin-bottom: 20px;
				}

				.sub-title {
					font-size: 28px;
					margin-bottom: 10px;
				}

				.read-more-btn {
					color: #ffffff;
					border-color: #ffffff;
				}
			}
		}
	}
}

.common-list-wrap {
	width: 100%;
	padding: 0 10px;

	.header-title {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 20px;

		.title {
			font-size: 22px;
			font-weight: bold;
			position: relative;
			z-index: 1;
			content: #262626;

			&:after {
				position: absolute;
				left: -5px;
				top: 0;
				z-index: -1;
				color: #ea6101;
				content: '';
				background-color: #ea6101;
				width: 20px;
				height: 20px;
				border-radius: 50%;
			}
		}
	}

	// 产品列表
	.product-card-list {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		font-size: 20px;

		.left-product-card {
			width: 50%;
			height: 400px;
			margin-right: 20px;
			border-radius: 4px;
			background-color: #ffffff;
			box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);

			.image-wrap {
				height: 300px;
				overflow: hidden;

				image {
					border-top-left-radius: 4px;
					border-top-right-radius: 4px;
					transition: all 0.3s linear;
					width: 100%;
					height: 300px;
				}
			}

			.product-des-wrap {
				padding: 10px;

				.product-title {
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

		.right-cards-wrap {
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			justify-content: space-between;
			width: 50%;

			image {
				width: 100%;
				height: 140px;
			}

			.right-card {
				width: 49%;
				height: 195px;
				background-color: #ffffff;
				border-radius: 4px;
				box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
				margin-bottom: 10px;

				.product-des-wrap {
					padding: 5px;

					.product-title {
						font-size: 18px;
						font-weight: bold;
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

			.bottom-card {
				width: 100%;
				height: 190px;
				background-color: #ffffff;
				border-radius: 4px;

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

			.image-wrap {
				height: 140px;
				overflow: hidden;

				image {
					border-top-left-radius: 4px;
					border-top-right-radius: 4px;
					transition: all 0.3s linear;
					width: 100%;
					height: 140px;
				}
			}
		}
	}

	// 新闻列表
	.news-list-wrap {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;

		.left-news-list {
			margin: 0 20px 0 -10px;
			font-size: 20px;
			width: 50%;

			.news-list-item {
				padding: 10px;
				border-radius: 4px;
				background-color: #ffffff;
				box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
				margin-bottom: 10px;
				position: relative;

				&:last-child {
					margin: 0;
				}

				.news-date {
					color: #ea6101;
					margin-bottom: 5px;
				}

				.news-date,
				.news-title {
					font-weight: bold;
					margin-bottom: 5px;
				}

				.news-des {
					font-size: 16px;
					color: #888888;
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
	}

	.right-news-card {
		background-color: #ffffff;
		border-radius: 4px;
		position: relative;
		box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
		width: 50%;

		.news-date-tag {
			width: 60px;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			padding: 20px 5px;
			background-color: #ea6101;
			color: #ffffff;
			position: absolute;
			top: -20px;
			left: 20px;
			z-index: 2;

			.main-tag-title {
				font-size: 18px;
				font-weight: bold;
			}

			.sub-tag-title {
				font-size: 12px;
			}
		}

		.title-image-wrap {
			position: relative;
			overflow: hidden;

			image {
				width: 100%;
				height: 350px;
				border-top-left-radius: 4px;
				border-top-right-radius: 4px;
				transition: all 0.3s linear;
			}
		}

		.news-content {
			padding: 10px;

			.news-title {
				font-weight: bold;
				margin-bottom: 5px;
			}

			.news-des {
				font-size: 16px;
				color: #888888;
			}
		}

		&:hover {
			background-color: #ea6101;

			.title-image-wrap {
				image {
					transform: scale(1.1);
				}
			}

			.news-content {
				color: #ffffff;

				.news-des {
					color: #ffffff;
				}
			}
		}
	}
}

.company-des-wrap {
	width: 100%;
	height: 200px;
	position: relative;
	display: flex;
	align-items: center;

	.des-content-wrap {
		width: 100%;
		max-width: 1440px;
		margin: 0 auto;
		text-align: left;
		z-index: 2;
		color: #ffffff;
		padding: 0 20px;
		display: flex;
		flex-direction: column;

		.company-title {
			font-weight: bold;
			text-shadow: 0 2px 10px rgba($color: #000000, $alpha: 0.3);
			font-size: 32px;
			margin-bottom: 10px;
		}

		.company-des {
			width: 100%;
			max-width: 45vw;
		}

		.divider-line {
			margin: 20px 0;
			width: 100%;
			max-width: 45vw;
			border-bottom: 1px solid rgba(245, 245, 245, 0.2);
		}

		.company-data-wrap {
			display: flex;
			align-items: flex-start;
			justify-content: space-between;
			width: 100%;

			.data-item-wrap {
				font-size: 14px;

				.data-num {
					display: flex;
					align-items: flex-end;
					margin-bottom: 5px;

					.main-num {
						font-size: 44px;
						line-height: 44px;
						font-weight: bold;
						margin-right: 5px;
					}
				}
			}
		}
	}

	.des-bg-image {
		z-index: 1;
		position: absolute;
		width: 100%;
		height: 200px;
		background-color: #ffffff;

		image {
			width: 100%;
			height: 200px;
			// filter: blur(1px);
			opacity: 0.9;
		}
	}
}

// 合作客户列表
.customer-list-wrap {
	background-color: #f3f4f6;
	display: flex;
	flex-direction: column;
	align-items: flex-start;

	.customer-list-body {
		width: 100%;
		max-width: 1440px;
		margin: 0 auto;
		padding: 30px 15px;

		.customer-list-title {
			color: #262626;
			font-size: 15px;
			text-align: left;
			margin-bottom: 15px;

			.customer-main-title {
				font-size: 22px;
				font-weight: bold;
				margin-bottom: 5px;
				position: relative;
				z-index: 1;

				&:after {
					position: absolute;
					left: -5px;
					top: 0;
					z-index: -1;
					color: #ea6101;
					content: '';
					background-color: #ea6101;
					width: 20px;
					height: 20px;
					border-radius: 50%;
				}
			}

			.customer-sub-title {
				color: #888888;
			}
		}

		.customer-list {
			display: flex;
			align-items: center;
			justify-content: space-between;
			flex-wrap: wrap;
			width: 100%;
			max-width: 1440px;
			margin: 0 -20px 0 -10px;

			.customer-item {
				width: 20%;
				height: 100px;
				padding: 0 5px;
				margin-bottom: 10px;
				position: relative;

				image {
					border-radius: 4px;
					width: 100%;
					height: 100px;
				}
				
				.partner-des {
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
			}
		}
	}
}

/* 小屏幕适配 */
@media screen and (max-width: 960px) {
	.index-swiper-wrap {
		.swiper {
			height: 500rpx;
		}

		swiper-item {
			.bg-image {
				display: none;
			}

			video,
			image {
				height: 500rpx !important;
			}

			.swiper-title-wrap {
				left: 20rpx !important;
				top: 100rpx !important;

				.main-title {
					font-size: 56rpx !important;
					margin-bottom: 20rpx !important;
				}

				.sub-title {
					font-size: 28rpx !important;
					margin-bottom: 10rpx !important;
				}
			}
		}
	}

	.common-list-wrap {
		padding: 0;

		.header-title {
			.title {
				font-size: 36rpx;
			}
		}

		.product-card-list {
			flex-direction: column;
			.product-des-wrap {
				.product-title {
					font-size: 32rpx;
				}
			}

			.left-product-card {
				width: 100% !important;
				height: 360rpx;
				margin: 0 auto 20rpx; // 小屏幕后用rpx单位

				.image-wrap {
					height: 150px;

					image {
						height: 150px;
					}
				}
			}

			.right-cards-wrap {
				width: 100% !important;

				.left-card,
				.right-card {
					.product-des-wrap {
						.product-title {
							font-size: 28rpx;
						}
					}
					height: 320rpx;
					margin-bottom: 20rpx;
				}
			}

			.product-des {
				display: none !important;
			}
		}

		.news-list-wrap {
			flex-direction: column;

			.left-news-list {
				width: 100%;
				margin: 0 0 40rpx 0;

				.news-list-item {
					border-radius: 4px;
					background-color: #ffffff;
					border-bottom: 4px solid #ea6101;
					box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
					margin-bottom: 20rpx;

					.news-date {
						font-size: 28rpx;
					}

					.news-title {
						font-size: 34rpx;
					}

					.news-des {
						font-size: 28rpx;
					}

					&:last-child {
						margin-bottom: 0;
					}
				}
			}

			.right-news-card {
				width: 100%;
				display: none;
			}
		}
	}

	.company-des-wrap {
		width: 100%;
		height: 350rpx;
		margin-bottom: 10px;

		.des-content-wrap {
			padding: 0 32rpx;

			.company-data-wrap {
				.data-item-wrap {
					font-size:24rpx;

					.data-num {
						display: flex;
						align-items: flex-end;
						margin-bottom:10rpx;

						.main-num {
							font-size: 64rpx;
							line-height: 64rpx;
							font-weight: bold;
							margin-right: 10rpx;
						}
					}
				}
			}
		}
	}
	
	// 合作客户列表
	.customer-list-wrap {

		.customer-list-body {
			.customer-list-title {

				.customer-main-title {
					font-size: 36rpx;
				}
	
				.customer-sub-title {
					font-size: 28rpx;
				}
			}
	
			.customer-list {
				margin: 0;
	
				.customer-item {
					width: 50%;
					margin-bottom: 20rpx;
	
					image {
						border-radius: 4px;
						width: 100%;
						height: 100px;
					}
				}
			}
		}
	}
}
</style>
