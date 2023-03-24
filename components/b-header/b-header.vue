<template>
	<!-- 头图 -->
	<view class="b-skeleton">
		<view class="header-image b-skeleton-fillet">
			<view class="title-wrap">
				<view class="main-title b-skeleton-fillet">
					{{headerConfig.main_title}}
				</view>
				<view class="sub-title b-skeleton-fillet">
					{{headerConfig.sub_title}}
				</view>
			</view>
			<image :src="headerConfig.image_url" mode="aspectFill"></image>

		</view>
	</view>
	
</template>
<script>
	export default {
		name: "b-header",
		data() {
			return {
				headerConfig: {
					main_title: 'bwinBrand',
					sub_title: '必闻品牌官网 uniCloud云端一体',
					imageUrl: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-613ff9e2-568b-4845-987f-93626e21bcde/e73f29e9-3167-4135-9371-e336925e6693.jpg',
					is_immersive: false,
				},
				common: {
					main_title: 'bwinBrand',
					sub_title: '必闻品牌官网 uniCloud云端一体',
					imageUrl: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-613ff9e2-568b-4845-987f-93626e21bcde/e73f29e9-3167-4135-9371-e336925e6693.jpg',
					is_immersive: false,
				}
			};
		},
		props: {
			page: {
				type: String,
				default: 'common'
			}
		},
		created() {
			// 查询渲染不同页面
			this.headerConfig = this.vk.pubfn.getListItem(this.vk.vuex.get('$app.headerConfig'), 'page', this.page);
			if (!this.headerConfig) {
				let interval = setInterval(() => {
					if (this.headerConfig) {
						clearInterval(interval);
					} else {
						this.headerConfig = this.vk.pubfn.getListItem(this.vk.vuex.get('$app.headerConfig'),
							'page',
							this.page);
					}
				}, 1000);
			}
		}
	}
</script>
<style lang="scss">
	// 内页头图
	.header-image {
		z-index: 1;
		width: 100%;
		position: relative;
		padding-bottom: 315px;
		display: flex;
		align-items: center;
		justify-content: center;

		.title-wrap {
			z-index: 1;
			width: 400px;
			margin: 0 auto;
			color: #FFFFFF;
			position: relative;
			top: 140px;
			text-align: center;

			@media screen and (max-width: 960px) {
				top: 120px;
			}

			.main-title {
				font-size: 64px;
				line-height: 64px;
				font-weight: bold;
				text-shadow: 0 2px 5px rgba($color: #000000, $alpha: 0.3);
			}

			.sub-title {
				font-size: 18px;
				position: relative;
				text-shadow: 0 2px 5px rgba($color: #000000, $alpha: 0.3);

				&:before {
					content: "";
					position: absolute;
					right: 0%;
					top: 50%;
					width: 120px;
					height: 1px;
					margin-right: -70px;
					background: rgba(255, 255, 255, .2);
				}

				&:after {
					content: "";
					position: absolute;
					left: 0%;
					top: 50%;
					width: 120px;
					height: 1px;
					margin-left: -70px;
					background: rgba(255, 255, 255, .2);
				}
			}
		}

		image {
			position: absolute;
			left: 0;
			top: -70px;
			width: 100%;
			height: 450px;
		}
	}
</style>
