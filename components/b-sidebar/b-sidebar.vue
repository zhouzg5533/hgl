<template>
	<view>
		<view class="sidebar-wrap" :style="{ right: !isHeader ? '64px' : '0!important' }">
			<view class="sidebar-item sidebar-item-tel" @click="vk.myfn.dial(vk.vuex.get('$app.companyInfo.tel'))">
				<view class="sidebar-icon"><uni-icons type="phone" color="#fff" size="22"></uni-icons></view>
				<view class="sidebar-content">{{ vk.vuex.get('$app.companyInfo.tel') }}</view>
			</view>

			<view class="sidebar-item sidebar-item-navigate" @click="vk.myfn.navigateToMap()">
				<view class="sidebar-icon"><uni-icons type="navigate" color="#fff" size="22"></uni-icons></view>
				<view class="sidebar-content">一键导航</view>
			</view>

			<view class="sidebar-item sidebar-item-backtop" @click="backTop">
				<view class="sidebar-icon"><uni-icons type="top" color="#fff" size="22"></uni-icons></view>
			</view>
		</view>
	</view>
</template>

<script>
var that;
var vk = uni.vk;
export default {
	name: 'b-sidebar',
	data() {
		return {
			isHeader: true
		};
	},
	mounted() {
		that = this;
		uni.$on('onPageScroll', function(data) {
			//接收参数
			if (data >= 500) {
				that.isHeader = false;
			} else {
				that.isHeader = true;
			}
		});
	},
	methods: {
		backTop() {
			uni.pageScrollTo({
				scrollTop: 0
			});
		}
	}
};
</script>

<style lang="scss">
.sidebar-wrap {
	z-index: 3;
	position: fixed;
	right: 64px;
	bottom: 30vh;

	transition: right 0.3s ease;

	.sidebar-item {
		display: flex;
		align-items: center;
		background-color: #f5f5f5;
		color: #262626;
		font-size: 16px;
		border-bottom: 1px solid #ffffff;
		width: 60px;
		left: 0;
		position: absolute;
		transition: all 0.3s linear;

		.sidebar-icon {
			padding: 20px;
			background-color: #ea6101;
		}

		.sidebar-content {
			width: 0;
			height: 0;
			overflow: hidden;
			text-align: center;
			font-weight: bold;
		}

		&:last-child {
			border: none;
		}
	}

	.sidebar-item-tel {
		top: 0;

		/* #ifdef H5 */
		&:hover {
			left: -130px;
			width: 200px;

			.sidebar-content {
				width: 100%;
				height: 20px;
			}
		}
		/* #endif */
	}

	.sidebar-item-navigate {
		top: 64px;
		/* #ifdef H5 */
		&:hover {
			left: -130px;
			width: 200px;

			.sidebar-content {
				width: 100%;
				height: 20px;
			}
		}
		/* #endif */
	}

	.sidebar-item-backtop {
		top: 128px;
	}
}

@media screen and (max-width: 768px) {
	.sidebar-wrap {
		right: 44px !important;
		bottom: 20vh;

		.sidebar-item {
			font-size: 24rpx;
			width: 40px;
			left: 0;

			.sidebar-icon {
				padding: 10px;
			}
		}

		.sidebar-item-tel {
			top: 0;
			&:hover {
				left: 0;
				width: 44px;

				.sidebar-content {
					width: 0;
					height: 0;
				}
			}
		}

		.sidebar-item-navigate {
			top: 44px;
			&:hover {
				left: 0;
				width: 44px;

				.sidebar-content {
					width: 0;
					height: 0;
				}
			}
		}

		.sidebar-item-backtop {
			top: 88px;
		}
	}
}
</style>
