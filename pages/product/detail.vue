<template>
	<view class="container b-skeleton">
		<b-navigator page="product"></b-navigator>
		<!-- 头图 -->
		<b-header page="product"></b-header>
		<!-- 主体部分 -->
		<view class="main">
			<view class="product-detail-wrap">
				<view class="product-detail">
					<swiper class="product-swiper b-skeleton-fillet" indicator-active-color="#ffffff" indicator-color="#888888" indicator-dots autoplay interval="5000">
						<swiper-item v-for="(item, index) in detail.swiper_list" :key="index"><image :src="item" mode="aspectFit"></image></swiper-item>
					</swiper>
					<view class="product-detail-info">
						<view class="product-title-wrap">
							<view class="main-title b-skeleton-fillet">{{ detail.name }}</view>
							<view class="sub-title b-skeleton-fillet">{{ detail.keywords }}</view>
						</view>
						<view class="product-des b-skeleton-fillet">{{ detail.content }}</view>
					</view>
				</view>
				<view class="product-tab-wrap b-skeleton-fillet">
					<custom-tabs
						:value="currentTab"
						@change="changeIndex"
						:defaultTextStyle="{ color: '#262626' }"
						:activeTextStyle="{ color: '#ea6101', fontWeight: 'bold' }"
						:activeLineStyle="{ background: '#ea6061', height: '4rpx' }"
					>
						<custom-tab-pane label="功能特点" name="1"></custom-tab-pane>
						<custom-tab-pane label="技术细节" name="2"></custom-tab-pane>
						<custom-tab-pane label="其他介绍" name="3"></custom-tab-pane>
					</custom-tabs>
					<view v-if="currentTab == 0" class="tab-content">
						<!-- 这里实际上也是富文本 -->
						<rich-text :nodes="detail.function_des"></rich-text>
					</view>
					<view v-if="currentTab == 1" class="tab-content"><rich-text :nodes="detail.tech_des"></rich-text></view>
					<view v-if="currentTab == 2" class="tab-content"><rich-text :nodes="detail.other_des"></rich-text></view>
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
			currentTab: 1,
			detail: {
				name: '骨架屏内容占位符骨架屏内容占位符',
				keywords: '骨架屏内容占位符',
				content:
					'骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符骨架屏内容占位符'
			}
		};
	},
	onLoad(params) {
		that = this;
		vk = that.vk;

		if (params.id == undefined) {
			vk.toast('缺少必要参数', 'none', 1500, true, function() {
				vk.navigateToHome();
			});
		}

		vk.callFunction({
			url: 'client/bwin/pub/getProductDetail',
			needAlert: false, // 报错也不弹窗
			data: {
				productId: params.id
			}
		})
			.then(res => {
				that.detail = res.data.detail;
				that.detail.function_des = res.data.detail.function_des
					.replace(/<p([\s\w"=\/\.:;]+)((?:(style="[^"]+")))/gi, '<p')
					.replace(/<p>/gi, '<p style="font-size: 15px; line-height: 25px;">')
					.replace(/<img([\s\w"-=\/\.:;]+)((?:(height="[^"]+")))/gi, '<img$1')
					.replace(/<img([\s\w"-=\/\.:;]+)((?:(width="[^"]+")))/gi, '<img$1')
					.replace(/<img([\s\w"-=\/\.:;]+)((?:(style="[^"]+")))/gi, '<img$1')
					.replace(/<img([\s\w"-=\/\.:;]+)((?:(alt="[^"]+")))/gi, '<img$1')
					.replace(/<img([\s\w"-=\/\.:;]+)/gi, '<img style="max-width: 100%;" $1');
				that.detail.tech_des = res.data.detail.tech_des
					.replace(/<p([\s\w"=\/\.:;]+)((?:(style="[^"]+")))/gi, '<p')
					.replace(/<p>/gi, '<p style="font-size: 15px; line-height: 25px;">')
					.replace(/<img([\s\w"-=\/\.:;]+)((?:(height="[^"]+")))/gi, '<img$1')
					.replace(/<img([\s\w"-=\/\.:;]+)((?:(width="[^"]+")))/gi, '<img$1')
					.replace(/<img([\s\w"-=\/\.:;]+)((?:(style="[^"]+")))/gi, '<img$1')
					.replace(/<img([\s\w"-=\/\.:;]+)((?:(alt="[^"]+")))/gi, '<img$1')
					.replace(/<img([\s\w"-=\/\.:;]+)/gi, '<img style="max-width: 100%;" $1');
				that.detail.other_des = res.data.detail.other_des
					.replace(/<p([\s\w"=\/\.:;]+)((?:(style="[^"]+")))/gi, '<p')
					.replace(/<p>/gi, '<p style="font-size: 15px; line-height: 25px;">')
					.replace(/<img([\s\w"-=\/\.:;]+)((?:(height="[^"]+")))/gi, '<img$1')
					.replace(/<img([\s\w"-=\/\.:;]+)((?:(width="[^"]+")))/gi, '<img$1')
					.replace(/<img([\s\w"-=\/\.:;]+)((?:(style="[^"]+")))/gi, '<img$1')
					.replace(/<img([\s\w"-=\/\.:;]+)((?:(alt="[^"]+")))/gi, '<img$1')
					.replace(/<img([\s\w"-=\/\.:;]+)/gi, '<img style="max-width: 100%;" $1');
				that.skeletonLoading = false;
				
				uni.setNavigationBarTitle({
					title: this.detail.name + '-' + this.vk.vuex.get('$app.companyInfo.name')
				})
			})
			.catch(err => {
				vk.toast(err.msg, 'none', 1500, true, function() {
					vk.navigateToHome();
				});
			});
	},
	methods: {
		changeIndex(e) {
			this.currentTab = e.value;
		}
	}
};
</script>
<style lang="scss">
.product-detail-wrap {
	font-size: 16px;
	border-radius: 4px;
	padding: 15px;
	width: 100%;
	color: #262626;
	background-color: #ffffff;
	box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);

	.product-detail {
		width: 100%;
		display: flex;
		align-items: flex-start;
		margin-bottom: 20px;

		.product-swiper {
			width: 700px;
			margin-right: 20px;
			height: 250px;

			swiper-item {
				position: relative;

				image {
					border-radius: 4px;
					height: 250px;
					width: 100%;
				}
			}
		}

		.product-detail-info {
			min-width: 30%;
			.product-title-wrap {
				color: #333;
				padding-bottom: 10px;
				margin-bottom: 20px;
				border-bottom: 1px solid $uni-border-color;

				.main-title {
					color: #262626;
					font-size: 24px;
					font-weight: bold;
					margin-bottom: 10px;
				}

				.sub-title {
					font-size: 18px;
				}
			}
		}
	}

	.product-tab-wrap {
		.tab-content {
			width: 100%;
		}
	}
}

@media screen and (max-width: 960px) {
	.main {
		margin-top: -240rpx;
	}

	.product-detail-wrap {
		.product-detail {
			flex-direction: column;

			.product-swiper {
				width: 100%;
				height: 300rpx;
				margin-bottom: 20rpx;

				swiper-item {
					image {
						height: 300rpx;
					}
				}
			}

			.product-detail-info {
				.product-title-wrap {
					.main-title {
						font-size: 36rpx;
					}
					.sub-title {
						font-size: 28rpx;
					}
				}

				.product-des {
					font-size: 28rpx;
				}
			}
		}

		.product-tab-wrap {
			font-size: 28rpx;
		}
	}
}
</style>
