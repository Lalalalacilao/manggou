<template>
	<view class="tab-bar" >
		<view class="nav">
			<view
				class="tab-bar-item" 
				v-for="(item,index) in list" 
				:key="item.id" 
				@click="switchTab(item,index)"
			>
				<image class="tab_img" v-if="routePath === item.pagePath" :src="item.selectedIconPath"></image>
				<image class="tab_img" v-else :src="item.iconPath"></image>
			</view>
			<view class="releaseIcon" @click="isRelease = true">
				<image src="https://mang-gou.tos-cn-beijing.volces.com/release%2F%E7%BB%84%E4%BB%B6%2020%20%E2%80%93%207%402x.png" mode=""></image>
			</view>
		</view>
		
		
		<!-- 遮罩层 -->
		<view class="mask" :class="isRelease ? 'mask_appear' : 'mask_vanish'" @click.stop="this.isRelease = false">
			<view class="release" :class="isRelease ? 'release_appear' : 'release_vanish'" @click.stop="this.isRelease = true">
				<view class="top_btn clear">
					<view class="release_item float">
						<image src="https://mang-gou.tos-cn-beijing.volces.com/release%2F%E7%BB%84%E4%BB%B6%2068%20%E2%80%93%201%402x.png" mode="" @click.stop="shineUpOn"></image>
						<view class="text">
							晒好物
						</view>
						<view class="tips">
							(只晒不卖)
						</view>
					</view>
					<view class="release_item float">
						<image src="https://mang-gou.tos-cn-beijing.volces.com/release%2F%E7%BB%84%E4%BB%B6%2069%20%E2%80%93%201%402x.png" mode="" @click.stop="sendIdle"></image>
						<view class="text">
							发闲置
						</view>
						<view class="tips">
							(30s发布宝贝)
						</view>
					</view>
				</view>
				
				<view class="close">
					<image src="https://mang-gou.tos-cn-beijing.volces.com/release%2F%E7%BB%84%E4%BB%B6%2067%20%E2%80%93%201%402x.png" mode=""  @click.stop="this.isRelease = false"></image>
				</view>
				
			</view>
			
		</view>
		
		
	</view>
</template>

<script>
	export default {
		name:"tabBar",
		props: {
			// 当前页面路径
			routePath: {
				type: String,
				required: true
			}
		},
		data() {
			return {
				list: [
					{	//首页
						"id": "001",
						"pagePath": "/pages/index/index",
						"iconPath": "https://mang-gou.tos-cn-beijing.volces.com/release%2F1%402x.png",
						"selectedIconPath": "https://mang-gou.tos-cn-beijing.volces.com/release%2F1%3D3%403x.png"
					},
					{	// 论坛
						"id": "002",
						"pagePath": "/pages/forum/forum",
						"iconPath": "https://mang-gou.tos-cn-beijing.volces.com/release%2F2%402x.png",
						"selectedIconPath": "https://mang-gou.tos-cn-beijing.volces.com/release%2F%E8%AE%BA%E5%9D%9B%402x.png"
					},
					{	// 消息列表
						"id": "003",
						"pagePath": "/pages/message/message",
						"iconPath": "https://mang-gou.tos-cn-beijing.volces.com/release%2F3%402x.png",
						"selectedIconPath": "https://mang-gou.tos-cn-beijing.volces.com/release%2F%E6%B6%88%E6%81%AF%402x.png"
					},
					{	// 个人中心
						"id": "004",
						"pagePath": "/pages/personal/personal",
						"iconPath": "https://mang-gou.tos-cn-beijing.volces.com/release%2F4%402x.png",
						"selectedIconPath": "https://mang-gou.tos-cn-beijing.volces.com/release%2F4-2%402x.png"
					}
				],
				isRelease: false,
				imgWidth: 0,
				imgHeight: 0,
				
			};
		},

		methods: {
			switchTab(item, index) {
				// console.log(' _this.list', this.list)
				let url = item.pagePath;
				// console.log(url);
				uni.switchTab({
					url: url
				})
			},
			// px转rpx
			pxToRpx(px) {
				//计算比例
				let scale = uni.upx2px(100)/100;
				return px/scale
			},
			// 晒好物
			shineUpOn() {
				this.isRelease = false;
				uni.navigateTo({
					url: "/pages/release/release?type=user"
				})
			},
			// 发闲置
			sendIdle() {
				this.isRelease = false;
				uni.navigateTo({
					url: "/pages/release/release"
				});
			},
		},
		mounted() {
			
		}
	}
</script>

<style lang="scss">
.clear {
	content: '';
	overflow: hidden;
	clear: both;
}
.float {
	float: left;
}
.tab-bar {
	position: relative;
}
.nav {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	
	width: 100%;
	height: 216rpx;

	background-image: url("https://mang-gou.tos-cn-beijing.volces.com/release%2F%E8%81%94%E5%90%88%202%402x.png");
	background-size: 100%,196rpx;
	background-repeat: no-repeat;
	
	display: flex;
	align-items: center;
	box-sizing: border-box;
	
	padding-left: 82rpx;
	
	border-radius: 50rpx 50rpx 0 0 ;
	
	// padding-bottom: env(safe-area-inset-bottom); // 适配iphoneX的底部
	.tab-bar-item {
		image {
			width: 48rpx;
			height: 48rpx;
		}
	}
	.tab-bar-item:nth-child(1) {
		margin-right: 112rpx;
	}
	.tab-bar-item:nth-child(2) {
		margin-right: 172rpx;
	}
	.tab-bar-item:nth-child(3) {
		margin-right: 112rpx;
	}
	.releaseIcon {
		position: absolute;
		top: -36rpx;
		left: 318rpx;
		image {
			width: 116rpx;
			height: 116rpx;
		}
	}
}

    .release:after {
        /* 这个伪类的作用就是一个圆弧的背景色 */
        width: 2548rpx;
        height: 2552rpx;
        position: absolute;
        left: -118%;
        /* 之所以left:20%,是因为width:140%，宝贝可以是是别的值，例如width:160%，那么left:30%才能水平居中，可以发现规律的 */
        top: 0;
        z-index: -1;
        /*层叠顺序，最底层显示*/
        content: '';
        border-radius:50% 50% 0 0;
        /*分别对应 左上 右上 右下 左下*/
        background-color: #fff;
        /* 将这个伪类水平居中 */
    }
.mask {
	position: fixed;
	top: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(51, 51, 51, 0.6);
	.release {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 650rpx;
		.top_btn {
			padding-top: 118rpx;
			padding-left: 148rpx;
			.release_item {
				text-align: center;
				image {
					width: 128rpx;
					height: 128rpx;
					// margin-bottom: 24rpx;
				}
				.text {
					font-family: PingFang HK-Regular, PingFang HK;
					font-size: 32rpx;
					color: #333;
				}
				.tips {
					font-family: PingFang HK-Regular, PingFang HK;
					font-size: 24rpx;
					color: #999999;
				}
			}
			.release_item:nth-child(1) {
				padding-right: 192rpx;
			}
		}
		.close {
			margin-top: 116rpx;
			text-align: center;
			image {
				width: 62rpx;
				height: 62rpx;
			}
		}
	}
}

.release_vanish {
	margin-bottom: -650rpx;
	transition: all 0.4s;
}
.mask_vanish {
	top: -100%;
	transition: all 0.4s;
}

.release_appear {
	margin-bottom: 0rpx;
	transition: all 0.4s;
}
.mask_appear {
	top: 0%;
	transition: all 0.4s;
}


</style>