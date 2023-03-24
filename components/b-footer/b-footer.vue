<template>
	<view class="container b-skeleton">
		<!-- 全局footer -->
		<view class="footer-wrap b-skeleton-fillet">
			<!-- 主体部分 -->
			<view class="footer-body-wrap">
				<view class="contact-info-wrap">
					<view class="contact-item b-m-b-10 b-skeleton-fillet">
						<uni-icons type="phone-filled" color="#ea6101" size="22"></uni-icons>
						<text class="footer-tel b-m-l-10">{{ vk.vuex.get('$app.companyInfo.tel') }}</text>
					</view>
					<view class="contact-item b-m-b-10 b-skeleton-fillet">
						<uni-icons type="location-filled" color="#ea6101" size="22"></uni-icons>
						<text class="b-m-l-10">地址：{{ vk.vuex.get('$app.companyInfo.address') }}</text>
					</view>
					<view class="contact-item b-skeleton-fillet">
						<uni-icons type="email-filled" color="#ea6101" size="22"></uni-icons>
						<text class="b-m-l-10">E-mai: {{ vk.vuex.get('$app.companyInfo.email') }}</text>
					</view>
				</view>

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
			<!-- 最底部 -->
			<view class="footer-bottom-wrap">
				<text>{{ vk.vuex.get('$app.websiteConfig.copyright') }}</text>
				<text v-if="vk.vuex.get('$app.websiteConfig.icp_code')" class="line">|</text>
				<text @click="vk.myfn.openUrl('https://beian.miit.gov.cn/')">{{ vk.vuex.get('$app.websiteConfig.icp_code') }}</text>
				<text v-if="vk.vuex.get('$app.websiteConfig.police_code')" class="line">|</text>
				<text @click="vk.myfn.openUrl('http://www.beian.gov.cn/portal/registerSystemInfo')">{{ vk.vuex.get('$app.websiteConfig.police_code') }}</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'b-footer',
	data() {
		return {
			guestbookSubmitDisabled: false,
			guestbookData: {
				relname: null,
				content: null,
				mobile: null
			}
		};
	},
	created() {},
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
.container {
	background-color: #242424;
}

.footer-wrap {
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
	bottom: 0;
	width: 100%;
	margin: 0 auto;

	.footer-body-wrap {
		width: 100%;
		max-width: 1440px;
		padding: 30px 15px;
		display: flex;
		align-items: flex-start;
		justify-content: space-between;

		.contact-info-wrap {
			font-size: 12px;
			color: #aaaaaa;
			margin-right: 20px;

			.footer-tel {
				font-size: 22px;
				font-weight: bold;
				color: #ffffff;
			}

			.contact-item {
				display: flex;
				align-items: center;
			}
		}

		.guest-book-wrap {
			display: flex;
			flex-direction: column;
			align-items: flex-end;

			.input-group-wrap {
				display: flex;
				margin-bottom: 10px;

				.left-inputs {
					margin-right: 10px;

					.guest-input {
						height: 30px;
						width: 250px;
						text-align: center;
						border-radius: 2px;
						background-color: #2f2f2f;
						color: #ffffff;
						font-size: 14px;
					}

					.guest-placeholder {
						font-size: 12px;
					}
				}

				.guest-textarea {
					height: 70px;
					width: 400px;
					border-radius: 2px;
					background-color: #2f2f2f;
					color: #ffffff;
					font-size: 14px;
					padding: 10px;
				}
			}
		}
	}

	.footer-bottom-wrap {
		width: 100%;
		background-color: #1b1b1b;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 10px 0;
		color: #888888;
		font-size: 12px;

		.line {
			margin: 0 10px;
		}
	}
}

/* 小屏幕适配 */
@media screen and (max-width: 960px) {
	.footer-wrap {
		.footer-body-wrap {
			display: none;
		}
	}

	.footer-bottom-wrap {
		flex-direction: column;

		.line {
			display: none;
		}
	}
}
</style>
