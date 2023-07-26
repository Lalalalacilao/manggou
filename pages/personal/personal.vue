<template>
	<view class="content">
		<!-- userinfo -->
		<view class="top" style="background-image: url('https://mang-gou.tos-cn-beijing.volces.com/personal%2F%E7%BB%84%E4%BB%B6%2022%20%E2%80%93%201%402x.png');">
			<view class="status_bar"></view>
			<view class="personal_info clear" @click="login">
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
					{{userInfo.userName === "请先登录" ? "登录" : "编辑"}}
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
					<image src="https://mang-gou.tos-cn-beijing.volces.com/personal%2F1%402x(1).png" mode=""></image>
					<view class="mid_tips_text">
						待付款
					</view>
				</view>
				<view class="order_relete Goods_to_be_received float_left" @click="goodsToBeRecceived(userInfo.userId)">
					<image src="https://mang-gou.tos-cn-beijing.volces.com/personal%2F3%402x(1).png" mode=""></image>
					<view class="mid_tips_text">
						待收货
					</view>
				</view>
				<view class="order_relete to_be_evaluated float_left" @click="toBeEvaluated(userInfo.userId)">
					<image src="https://mang-gou.tos-cn-beijing.volces.com/personal%2F2%402x(1).png" mode=""></image>
					<view class="mid_tips_text">
						待评价
					</view>
				</view>
				<view class="order_relete complete float_left" @click="complete(userInfo.userId)">
					<image src="https://mang-gou.tos-cn-beijing.volces.com/personal%2F4%402x.png" mode=""></image>
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
						<image src="https://mang-gou.tos-cn-beijing.volces.com/personal%2F%E5%90%91%E5%8F%B31%402x.png" mode=""></image>
					</view>
				</view>
				<view class="bottom_item clear" @click="help(userInfo.userId)">
					<view class="left_icon float_left"></view>
					<view class="text float_left">
						帮助与反馈
					</view>
					<view class="right_icon float_right">
						<image src="https://mang-gou.tos-cn-beijing.volces.com/personal%2F%E5%90%91%E5%8F%B31%402x.png" mode=""></image>
					</view>
				</view>
				<view class="bottom_item clear" @click="callCenter(userInfo.userId)">
					<view class="left_icon float_left"></view>
					<view class="text float_left">
						客服中心
					</view>
					<view class="right_icon float_right">
						<image src="https://mang-gou.tos-cn-beijing.volces.com/personal%2F%E5%90%91%E5%8F%B31%402x.png" mode=""></image>
					</view>
				</view>
				<view class="bottom_item clear" @click="afterSales(userInfo.userId)">
					<view class="left_icon float_left"></view>
					<view class="text float_left">
						售后/退款
					</view>
					<view class="right_icon float_right">
						<image src="https://mang-gou.tos-cn-beijing.volces.com/personal%2F%E5%90%91%E5%8F%B31%402x.png" mode=""></image>
					</view>
				</view>
			</view>
			<!-- 登录注册 -->
			<view class="mg-button">
				<button v-if="flag" @click="login">登录</button>
				<button v-else @click="unlogin">退出登录</button>
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
					userAvatar: "https://mang-gou.tos-cn-beijing.volces.com/oeRlzleK0UwP02c8877eb0979a88ef8c8c8e6c90cfd6_1689664581294.jpg",
					id:'******'
				},
				userId:null,
				flag: uni.getStorageSync('token') === '' ? true : false,
			};
		},
		methods: {
			login() {
				if (uni.getStorageSync('token') !== '') {
					uni.showToast({
						title: '请勿重复登录',
						icon: 'error'
					})
					return
					this.flag = false
				}
				uni.navigateTo({
					url: '/pages/index/index'
				})
			},
			unlogin() {
				app.globalData.logout({
				}).then(res => {
					uni.setStorageSync('token', '')
					uni.showToast({
						title: '退出登录成功',
						icon: 'success'
					})
					this.token()
				}).catch(err => {
					console.log(err,'err----');
				})
			},
			token() {
				console.log(uni.getStorageSync('token') === '', 'token');
				this.flag = uni.getStorageSync('token') === '' ? true : false
				// console.log(this.flag, 'flag');
				if (this.flag == true) {
					uni.setStorageSync("userInfo","");
					this.userInfo.userName = "请先登录";
					this.userInfo.userAvatar = "https://mang-gou.tos-cn-beijing.volces.com/oeRlzleK0UwP02c8877eb0979a88ef8c8c8e6c90cfd6_1689664581294.jpg"
					this.userInfo.id = '******'
					// console.log(this.userInfo);
				}
			},
			// 头像
			head(id) {
				console.log("头像");
			},
			// 编辑
			edit(id) {
				console.log("编辑");
				// uni.showToast({
				// 	title: "暂未开放，敬请期待",
				// 	icon: "none"
				// })
				uni.navigateTo({
					url:'/pages/EditInformation/EditInformation'
				})
			},
			// 全部订单
			allOrder(id) {
				console.log("全部订单");
				uni.navigateTo({
					url:'/pages/allOrder/allOrder?userId=' + this.userId
				})
			},
			// 待付款
			obligation(id) {
				console.log("待付款");
				uni.navigateTo({
					url:'/pages/allOrder/allOrder?curr=' + 1 + '&userId=' + this.userId
				})
			},
			// 待收货
			goodsToBeRecceived(id) {
				console.log("待收货");
				uni.navigateTo({
					url:'/pages/allOrder/allOrder?curr=' + 2 + '&userId=' + this.userId
				})
			},
			// 待评价
			toBeEvaluated(id) {
				console.log("待评价");
				uni.navigateTo({
					url:'/pages/allOrder/allOrder?curr=' + 3 + '&userId=' + this.userId
				})
			},
			// 已完成
			complete(id) {
				console.log("已完成");
				uni.navigateTo({
					url:'/pages/allOrder/allOrder?curr=' + 4 + '&userId=' + this.userId
				})
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
				uni.showToast({
					title: "暂未开放，敬请期待",
					icon: "none"
				})
				// uni.navigateTo({
				// 	url:'/pages/Customer/Customer'
				// })
			},
			// 售后
			afterSales(id) {
				console.log("售后");
				uni.showToast({
					title: "暂未开放，敬请期待",
					icon: "none"
				})
				// uni.navigateTo({
				// 	url:'/pages/AfterSales/AfterSales'
				// })
				
			},
			// 点击登录
			login() {
				if(this.userInfo.userName === "请先登录") {
					uni.navigateTo({
						url: "/pages/login/login"
					})
				}
			},
		},
		onLoad() {
			this.phone = uni.getStorageSync('token')
			// console.log(this.phone,'pp');
			// this.token()
		},
		onShow() {
			this.token()
			// console.log(this.flag);
			const userInfoThis = uni.getStorageSync("userInfo");
			// console.log(userInfoThis,'ooo');
			if(userInfoThis !== "") {
				this.userInfo = userInfoThis;
				this.userId = userInfoThis.id
				console.log(this.userInfo,'信息',this.userId);
			}
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
				overflow:hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 1;
				-webkit-box-orient: vertical;
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


.mg-button{
	width: 690rpx;
	height: 100rpx;
	margin-top: 20rpx;
	button {
		background: linear-gradient(90deg, #F5DF9C 0%, #F2D86D 100%);
		border-radius: 64rpx;
		margin-top: 20rpx;
		line-height: 100rpx;
		text-align: center;
		font-size: 32rpx;
		color: #fff;
	}
}













</style>
