<template>
	<view class="content">
		<!-- userinfo -->
		<view class="top" style="background-image: url('../../static/personal center/组件 22 – 1@2x.png');">
			<view class="status_bar"></view>
			<view class="personal_info clear">
				<view class="head float_left" @click="head(userInfo.userId)">
					<image :src="userInfo.userAvatar === null ? '' : userInfo.userAvatar" mode=""></image>
				</view>
				<view class="info float_left">
					<view class="nickname">
						{{userInfo.userName}}
					</view>
					<view class="user_id">
						ID:{{userInfo.id}}
					</view>
				</view>
				<view class="edit float_left" @click="edit(userInfo.userId)">
					编辑
				</view>
			</view>
		</view>
		
		
		
		<view class="menu">
			<!-- 标题部分 -->
			<view class="mentu_title clear">
				<view class="title float_left">
					我的订单
				</view>
				<view class="all_order float_right" @click="allOrder(userInfo.userId)">
					<navigator url="">全部订单</navigator>
				</view>
			</view>
			<!-- 物流状态 -->
			<view class="middle clear">
				<view class="order_relete obligation  float_left" @click="obligation(userInfo.userId)">
					<image src="../../static/personal center/1@2x(1).png" mode=""></image>
					<view class="mid_tips_text">
						待付款
					</view>
				</view>
				<view class="order_relete Goods_to_be_received float_left" @click="goodsToBeRecceived(userInfo.userId)">
					<image src="../../static/personal center/3@2x(1).png" mode=""></image>
					<view class="mid_tips_text">
						待收货
					</view>
				</view>
				<view class="order_relete to_be_evaluated float_left" @click="toBeEvaluated(userInfo.userId)">
					<image src="../../static/personal center/2@2x(1).png" mode=""></image>
					<view class="mid_tips_text">
						待评价
					</view>
				</view>
				<view class="order_relete complete float_left" @click="complete(userInfo.userId)">
					<image src="../../static/personal center/4@2x.png" mode=""></image>
					<view class="mid_tips_text">
						已完成
					</view>
				</view>
			</view>
			
			<!-- 菜单 -->
			<view class="bottom">
				<view class="bottom_item clear" @click="myAddress(userInfo.userId)">
					<view class="left_icon float_left"></view>
					<view class="text float_left">
						我的地址
					</view>
					<view class="right_icon float_right">
						<image src="../../static/personal center/向右1@2x.png" mode=""></image>
					</view>
				</view>
				<view class="bottom_item clear" @click="help(userInfo.userId)">
					<view class="left_icon float_left"></view>
					<view class="text float_left">
						帮助与反馈
					</view>
					<view class="right_icon float_right">
						<image src="../../static/personal center/向右1@2x.png" mode=""></image>
					</view>
				</view>
				<view class="bottom_item clear" @click="callCenter(userInfo.userId)">
					<view class="left_icon float_left"></view>
					<view class="text float_left">
						客服中心
					</view>
					<view class="right_icon float_right">
						<image src="../../static/personal center/向右1@2x.png" mode=""></image>
					</view>
				</view>
				<view class="bottom_item clear" @click="afterSales(userInfo.userId)">
					<view class="left_icon float_left"></view>
					<view class="text float_left">
						售后/退款
					</view>
					<view class="right_icon float_right">
						<image src="../../static/personal center/向右1@2x.png" mode=""></image>
					</view>
				</view>
			</view>
		</view>
		
		
		<tabBar routePath = '/pages/personal/personal'></tabBar>
	</view>
</template>


<script>
	const app = getApp();
	export default {
		data() {
			return {
				userInfo: {
					userName: "请先登录",
					userAvatar: "../../static/personal center/southeast.jpg",
				},
			};
		},
		methods: {
			// 头像
			head(id) {
				console.log("头像");
			},
			// 编辑
			edit(id) {
				console.log("编辑");
			},
			// 全部订单
			allOrder(id) {
				console.log("全部订单");
			},
			// 待付款
			obligation(id) {
				console.log("待付款");
				
			},
			// 待收货
			goodsToBeRecceived(id) {
				console.log("待收货");
				
			},
			// 待评价
			toBeEvaluated(id) {
				console.log("待评价");
				
			},
			// 已完成
			complete(id) {
				console.log("已完成");
				
			},
			// 我的地址
			myAddress(id) {
				uni.navigateTo({
					url: "/pages/address/address?id=" + id 
				})
				
			},
			// 帮助与反馈
			help(id) {
				uni.navigateTo({
					url: "/pages/problemFeedback/problemFeedback"
				})
				
			},
			// 客服中心
			callCenter(id) {
				console.log("客服中心");
				
			},
			// 售后
			afterSales(id) {
				console.log("售后");
				
			},
			// 获取用户信息
			getUserInfo() {
				const token = uni.getStorageSync("token");
				if(token != null) {
					app.globalData.getUserInfo().then(res => {
						uni.setStorageSync("userInfo",res.data);
						this.userInfo = res.data;
						this.dataHandle();
					}).catch(err => {
						uni.showToast({
							title: err.message,
							icon: "none"
						})
					})
				} else {
					uni.showToast({
						title: "请先登录",
						icon: "none"
					})
				}
			},
			dataHandle() {
				if(this.userInfo.userAvatar === null) {
					this.userInfo.userAvatar = "../../static/personal center/southeast.jpg";
				}
				if(this.userInfo.userName === null) {
					this.userInfo.userName = "暂无姓名";
				}
			}
		},
		onLoad() {
			const userInfoThis = uni.getStorageSync("userInfo");
			if(userInfoThis !== "") {
				this.userInfo = userInfoThis;
				console.log(this.userInfo);
				this.dataHandle();
			} else {
				this.getUserInfo();
			}
		},
		onShow() {
			
		}
	}
</script>

<style lang="scss">
// 通用设置
.float_left {
	float: left;
}
.float_right {
	float: right;
}
.clear {
	overflow: hidden;
	content: "";
	clear: both;
}
.status_bar {
	height: 88rpx;
	margin-bottom: 104rpx;
}
// userinfo
.top {
	// position: relative;
	// z-index: 0;
	background-size: 750rpx,490rpx;
	height: 490rpx;
	.personal_info {
		// margin-bottom: 72rpx;
		padding: 0 32rpx 72rpx 32rpx;
		.head {
			margin-right: 36rpx;
			image {
				width: 136rpx;
				height: 136rpx;
				border-radius: 50%;
			}
			
		}
		.info {
			margin-right: 63rpx;
			font-size: 0;
			font-family: PingFang SC-Semibold, PingFang SC;
			color: #0D0D26;
			.nickname {
				width: 288rpx;
				height: 66rpx;
				font-size: 48rpx;
				font-weight: 600;
				margin-bottom: 8rpx;
			}
			.user_id {
				font-size: 28rpx;
			}
		}
		.edit {
			margin-top: 32rpx;
			width: 152rpx;
			height: 72rpx;
			border-radius: 38rpx;
			background: linear-gradient(#F56961,#E83C33);
			text-align: center;
			line-height: 72rpx;
			font-size: 28rpx;
			color: #FFFFFF;
			font-family: PingFang SC-Regular, PingFang SC;
		}
	}
}

.menu {
	border-radius: 50rpx;
	background-color: #FFFFFF;
	margin-top: -90rpx;
	padding: 48rpx 32rpx 0 32rpx;
	.mentu_title {
		font-size: 0;
		font-family: PingFang SC-Semibold, PingFang SC;
		margin-bottom: 48rpx;
		.title {
			font-size: 36rpx;
			font-weight: 600;
			color: #0D0D26;
		}
		.all_order {
			margin-top: 6rpx;
			font-size: 28rpx;
			color: #999999;
			margin-right: 14rpx;
		}
	}
	.middle {
		margin-bottom: 108rpx;
		.order_relete {
			margin: 0 49rpx;
			text-align: center;
			image {
				width: 50rpx;
				height: 50rpx;
				margin-bottom: 16rpx;
			}
			.mid_tips_text {
				font-family: PingFang SC-Regular, PingFang SC;
				font-size: 28rpx;
				color: #333333;
			}
		}
		.order_relete:nth-child(1) {
			margin-left: 30rpx;
		}
		.order_relete:nth-child(4) {
			margin-right: 32rpx;
		}
	}
	.bottom {
		.bottom_item {
			padding: 32rpx 0;
			image {
				width: 28rpx;
				height: 28rpx;
			}
			.left_icon {
				width: 8rpx;
				height: 24rpx;
				margin-top: 10rpx;
				background-color: #F2D86D;
				border-radius: 4rpx;
				margin-right: 20rpx;
			}
			.text {
				font-size: 32rpx;
				color: #333333;
				font-weight: 400;
				font-family: PingFang SC-Regular, PingFang SC;
			}
			.right_icon {
				margin-top: 8rpx;
			}
		}
	}
}
















</style>
