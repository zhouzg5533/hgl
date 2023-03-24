<template>
	<view class="container b-skeleton">
		<b-navigator page="about"></b-navigator>

		<!-- 头图 -->
		<b-header page="about"></b-header>
		<!-- 主体部分 -->
		<view class="main">
			<!-- 企业简介 -->
			<view class="company-card-wrap">
				<view class="company-title b-skeleton-fillet">{{ vk.vuex.get('$app.companyInfo.name') }}</view>
				<view class="company-des-wrap">
					<text class="company-des b-skeleton-fillet">{{ vk.vuex.get('$app.companyInfo.description') }}</text>
					<image class="company-image b-skeleton-fillet" :src="vk.vuex.get('$app.companyInfo.cover_image')" mode=""></image>
				</view>
			</view>

			<!-- 联系方式 -->
			<view class="contact-card-wrap">
				<view class="contact-method-list">
					<view class="contact-method-item b-skeleton-fillet">
						<view class="contact-icons-wrap b-skeleton-fillet">
							<uni-icons type="phone-filled" size="48" color="#888888"></uni-icons>
							<text class="sub-content">联系电话</text>
						</view>
						<view class="contact-content b-skeleton-fillet">{{ vk.vuex.get('$app.companyInfo.tel') }}</view>
					</view>
					<view class="contact-method-item b-skeleton-fillet">
						<view class="contact-icons-wrap b-skeleton-fillet">
							<uni-icons type="email-filled" size="48" color="#888888"></uni-icons>
							<text class="sub-content">邮箱</text>
						</view>
						<view class="contact-content b-skeleton-fillet">{{ vk.vuex.get('$app.companyInfo.email') }}</view>
					</view>
					<view class="contact-method-item b-skeleton-fillet">
						<view class="contact-icons-wrap b-skeleton-fillet">
							<uni-icons type="shop-filled" size="48" color="#888888"></uni-icons>
							<text class="sub-content">工作时间</text>
						</view>
						<view class="contact-content b-skeleton-fillet">{{ vk.vuex.get('$app.companyInfo.work_time') }}</view>
					</view>

					<view class="contact-method-item b-skeleton-fillet">
						<view class="contact-icons-wrap b-skeleton-fillet">
							<uni-icons type="map-filled" size="48" color="#888888"></uni-icons>
							<text class="sub-content">地址</text>
						</view>
						<view class="contact-content b-skeleton-fillet">{{ vk.vuex.get('$app.companyInfo.address') }}</view>
					</view>
				</view>

				<view class="map-wrap b-skeleton-fillet">
					<map
						style="width: 100%; height: 400px;"
						:latitude="vk.vuex.get('$app.companyInfo.latitude')"
						:longitude="vk.vuex.get('$app.companyInfo.longitude')"
						:markers="[
							{
								latitude: vk.vuex.get('$app.companyInfo.latitude'),
								longitude: vk.vuex.get('$app.companyInfo.longitude'),
								iconPath: '/static/location.png',
								width: '40'
							}
						]"
						@tap="vk.myfn.navigateToMap()"
					></map>
				</view>
			</view>

			<!-- 小屏时显示在线留言框 -->
			<view class="guest-book-wrap">
				<view class="input-group-wrap">
					<view class="left-inputs">
						<input
							class="guest-input b-m-b-10 b-skeleton-fillet"
							placeholder="请输入姓名"
							placeholder-class="guest-placeholder"
							type="text"
							v-model="guestbookData.relname"
							@input="relnameChange"
						/>
						<input
							class="guest-input b-skeleton-fillet"
							placeholder="请输入联系电话"
							placeholder-class="guest-placeholder"
							type="text"
							v-model="guestbookData.mobile"
							@input="mobileChange"
						/>
					</view>
					<textarea class="guest-textarea b-skeleton-fillet" placeholder="请输入留言内容" v-model="guestbookData.content" @input="contentChange" />
				</view>
				<button class="b-button-mini b-skeleton-fillet" type="warn" size="mini" @click="submitGuestbook">提交</button>
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
			guestbookSubmitDisabled: false,
			guestbookData: {
				relname: null,
				content: null,
				mobile: null
			}
		};
	},
	onLoad() {
		// console.log(this.vk.vuex.get('$app.companyInfo'));
		let pages = getCurrentPages(); //页面示例
		let page = pages[pages.length - 1]; //当前页面实例
		let currentPageTitle = page.$holder.navigationBarTitleText; //当前页面标题
		
		uni.setNavigationBarTitle({
			title: currentPageTitle + '-' + this.vk.vuex.get('$app.companyInfo.name')
		})
	},
	onReady() {
		setTimeout(() => {
			this.skeletonLoading = false;
		}, 1500);
	},
	methods: {
		relnameChange() {
			// console.log(this.guestbookData.relname);
		},
		mobileChange() {
			// console.log(this.guestbookData.mobile);
		},
		contentChange() {
			// console.log(this.guestbookData.content);
		},
		submitGuestbook() {
			if (!this.vk.pubfn.test(this.guestbookData.mobile, 'mobile') || !this.vk.pubfn.test(this.guestbookData.relname, 'chinese')) {
				this.vk.toast('请检查姓名是否为纯汉字、手机号格式是否正确');
			} else {
				if (this.guestbookData.content.length <= 5) {
					this.vk.toast('请至少输入5个字符');
					return;
				}
				uni.vk
					.callFunction({
						url: 'client/bwin/pub/postComment',
						needAlert: false, // 报错也不弹窗,
						title: '提交中...',
						data: {
							relname: this.guestbookData.relname,
							mobile: this.guestbookData.mobile,
							content: this.guestbookData.content
						}
					})
					.then(res => {
						this.vk.toast('留言成功');
					})
					.catch(err => {
						this.vk.toast(err.msg);
					});
				this.guestbookData = {};
			}
		}
	}
};
</script>

<style lang="scss">
.main {
	flex-direction: column;
}

.company-card-wrap {
	width: 100%;
	max-width: 1440px;
	margin: 0 auto 30px;
	padding: 30px;
	display: flex;
	flex-direction: column;
	background-color: #ffffff;
	box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
	border-radius: 4px;

	.company-title {
		width: 100%;
		font-size: 24px;
		font-weight: bold;
		padding: 10px 0 30px;
		margin-bottom: 20px;
		border-bottom: 1px solid $uni-border-color;
	}

	.company-des-wrap {
		width: 100%;
		height: 300px;
		font-size: 16px;
		color: #262626;
		display: flex;
		justify-content: space-between;

		.company-des {
			width: 40%;
			margin-right: 30px;
			// text-indent: 2em;
			max-height: 450rpx;
			overflow-y: scroll;
		}

		.company-image {
			width: 100%;
			height: 300px;
		}
	}
}

.contact-card-wrap {
	width: 100%;
	max-width: 1440px;
	margin: 0 auto;
	padding: 30px;
	display: flex;
	flex-direction: column;
	background-color: #ffffff;
	box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
	border-radius: 4px;

	.contact-method-list {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		padding-bottom: 40px;
		margin-bottom: 30px;
		border-bottom: 1px solid $uni-border-color;

		.contact-method-item {
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 25%;
			border-right: 1px solid $uni-border-color;

			&:last-child {
				border: none;
			}

			.contact-icons-wrap {
				display: flex;
				flex-direction: column;
				align-items: center;

				.sub-content {
					margin: 10px 0;
					color: #888888;
					font-size: 14px;
				}
			}

			.contact-content {
				text-align: center;
			}
		}
	}
}

.guest-book-wrap {
	width: 100%;
	max-width: 1440px;
	margin: 0 auto;
	padding: 20rpx;
	background-color: #ffffff;
	box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
	border-radius: 4px;
	margin-top: 20rpx;
	display: none;
	flex-direction: column;
	align-items: flex-end;

	.input-group-wrap {
		display: flex;
		flex-direction: column;
		margin-bottom: 20rpx;
		width: 100%;
		.left-inputs {
			// margin-right: 10px;

			.guest-input {
				height: 30px;

				text-align: center;
				border-radius: 2px;
				background-color: #f7f7f7;
				color: #262626;
				font-size: 14px;
				margin-bottom: 20rpx;
			}

			.guest-placeholder {
				font-size: 12px;
			}
		}

		.guest-textarea {
			height: 70px;
			width: 100%;
			border-radius: 2px;
			background-color: #f7f7f7;
			color: #262626;
			font-size: 14px;
			padding: 10px;
		}
	}
}

@media screen and (max-width: 960px) {
	.company-card-wrap {
		margin-top: -140rpx;
		margin-bottom: 20rpx;
		padding: 32rpx;
		.company-title {
			font-size: 36rpx;
		}

		.company-des-wrap {
			height: 700rpx;
			flex-direction: column;

			.company-des {
				width: 100%;
				margin-right: 0;
				margin-bottom: 20rpx;
				height: 750rpx;
			}
		}
	}

	.contact-card-wrap {
		padding: 32rpx;
		.contact-method-list {
			flex-direction: column;
			border: none;
			margin-bottom: 0;

			.contact-method-item {
				width: 100%;
				padding: 30rpx 0;
				border-right: none;
				border-bottom: 1px solid $uni-border-color;
				&:first-child {
					padding-top: 0;
				}
				&:last-child {
					padding-bottom: 0;
				}
			}
		}
	}

	.guest-book-wrap {
		display: flex;
	}
}
</style>
