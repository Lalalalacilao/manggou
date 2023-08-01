<template>
	<view class="content">
		<view class="top">
			<view class="status_bar"></view>
			<view class="title clear">
				<view class="back float_left" @click="back">
					<image src="https://mang-gou.tos-cn-beijing.volces.com/address%2F%E8%BF%94%E5%9B%9E%403x%402x.png" mode="aspectFit"></image>
				</view>
				<view class="title_text float_left">
					退款/退货
				</view>
			</view>
		</view>
		<view class="fill">
			
		</view>
		
		<view class="main_item address">
			<view class="title">
				<view class="title_text">
					服务地址
				</view>
			</view>
			<view class="address_info">
				<view class="detail">
					{{product.orderExpress.address}}
				</view>
				<view class="personal_info clear">
					<view class="name float_left">
						{{product.orderExpress.userName}}
					</view>
					<view class="phone float_left">
						{{product.orderExpress.phone}}
					</view>
				</view>
			</view>
		</view>
		<view class="main_item order clear">
			<view class="preview float_left">
				<image :src="product.goodsImg" mode="widthFix"></image>
			</view>
			<view class="order_info float_left">
				<view class="pro_title">
					{{product.goodsName}}
				</view>
				<view class="price">
					订单价格：￥{{(product.price / 100).toFixed(2)}}
				</view>
				<view class="pro_info clear">
					<view class="order_num float_left">
						购买数量：{{product.num}}
					</view>
				</view>
			</view>
		</view>
		
		<view class="main_item refund_money clear">
			<view class="title float_left">
				退款金额
			</view>
			<view class="num float_right">
				<text>￥{{price}}</text>
			</view>
		</view>
		
		<view class="main_item notes clear">
			<view class="title">
				退款原因
			</view>
			<textarea v-model="remark" maxlength="-1" placeholder="请输入"></textarea>
		</view>
		
		
		<view class="bottom_funciton clear">
			<view class="money float_left">
				退款金额：￥{{price}}
			</view>
			<view class="btn float_right" @click="refound">
				确认退款
			</view>
		</view>
		
	</view>
</template>

<script>
	const app = getApp();
	export default {
		data() {
			return {
				product: {},
				remark: "",
				price: ""
			};
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			getOrderInfoById(id) {
				if(!id) {
					uni.showToast({
						title: "数据错误",
						icon: "error"
					})
				}
				
				app.globalData.getOneOrder({
					id
				}).then(res => {
					this.product = this.dataHandle(res.data);
				}).catch(err => {
					uni.showToast({
						title: err.message,
						icon: "error"
					})
				})
			},
			dataHandle(item) {
				this.price = (item.price / 100).toFixed(2);
				item.goodsImg = JSON.parse(item.goodsImg)[0];
				return item;
			},
			refound() {
				const str = this.remark.trim();
				console.log(str);
				if(!str) {
					uni.showToast({
						title: "请填写退款原因",
						icon: "error"
					})
					return
				}
				
				app.globalData.applyRefund({
					orderId: this.product.orderExpress.adminOrderId,
					refundMoney: this.product.price,
					refundReason : str
				}).then(res => {
					uni.showToast({
						title: "退款申请成功",
					})
					uni.navigateTo({
						url: "/pages/AfterSales/AfterSales"
					})
				}).catch(err => {
					uni.showToast({
						title: err.message,
						icon: "error"
					})
				})
			}
		},
		onLoad(option) {
			if(!option.id) {
				uni.showToast({
					title: "数据错误",
					icon: "error"
				})
			} else {
				this.getOrderInfoById(option.id);
			}
		}
	}
</script>

<style lang="scss">
// 通用样式
.float_left {
	float: left;
}
.float_right {
	float: right;
}
.clear {
	clear: both;
	content: "";
	overflow: hidden;
}

// 顶部
.content {
	background-color: #f9f9f9;
	// background-color: red;
	padding: 20rpx 32rpx 0 32rpx;
	height: 95vh;
}
.status_bar {
	width: 100%;
	height: 88rpx;
}
.fill {
	height: 176rpx;
}
.top {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	background-color: #fff;
	.title {
		height: 88rpx;
		box-sizing: border-box;
		padding: 24rpx 0 20rpx 32rpx;
		font-size: 0;
		.back {
			image {
				width: 44rpx;
				height: 44rpx;
			}
		}
		.title_text {
			font-family: PingFang SC-Heavy, PingFang SC;
			color: #333;
			font-weight: 800;
			font-size: 32rpx;
			margin-left: 234rpx;
		}
	}
}


.address {
	margin-bottom: 20rpx;
	background-color: #fff;
	border-radius: 20rpx;
	padding: 20rpx 10rpx 20rpx 10rpx;
	font-size: 0;
	.title {
		margin-bottom: 20rpx;
		.title_text {
			font-size: 32rpx;
			font-weight: bold;
			color: #333;
		}
		.title_icon {
			image {
				width: 44rpx;
				height: 44rpx;
			}
		}
	}
	.address_info {
		.detail {
			font-size: 28rpx;
			color: #191919;
			margin-bottom: 5rpx;
		}
		.personal_info {
			font-size: 28rpx;
			.name {
				margin-right: 20rpx;
			}
		}
	}
}

.order {
	margin-bottom: 20rpx;
	background-color: #fff;
	border-radius: 20rpx;
	padding: 20rpx 10rpx 20rpx 10rpx;
	font-size: 0;
	.preview {
		margin-right: 30rpx;
		image {
			width: 200rpx;
			height: 200rpx;
		}
	}
	.order_info {
		width: 440rpx;
		.pro_title {
			font-size: 32rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
		}
		.price {
			margin-top: 30rpx;
			font-size: 28rpx;
		}
		.pro_info {
			margin-top: 30rpx;
			font-size: 28rpx;
		}
	}
}

.refund_money {
	border-radius: 20rpx;
	padding: 20rpx 10rpx 20rpx 10rpx;
	margin-bottom: 20rpx;
	background-color: #fff;
	font-size: 28rpx;
	text {
		color: red;
		font-weight: bold;
	}
}
.notes {
	margin-bottom: 20rpx;
	background-color: #fff;
	border-radius: 20rpx;
	padding: 20rpx 10rpx 20rpx 10rpx;
	font-size: 0;
	.title {
		font-size: 32rpx;
		font-weight: bold;
	}
	textarea {
		width: 100%;
		margin-top: 10rpx;
		height: 150rpx;
		font-size: 28rpx;
		line-height: 34rpx;
	}
}

.bottom_funciton {
	background-color: #fff;
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	height: 120rpx;
	padding: 10rpx 32rpx 20rpx 32rpx;
	line-height: 120rpx;
	.money {
		font-size: 28rpx;
	}
	.btn {
		text-align: center;
		margin-top: 10rpx;
		font-weight: bold;
		width: 300rpx;
		height: 100rpx;
		line-height: 100rpx;
		background-color: #F2D86D;
		color: #f0f0f0;
		border: 2rpx solid #F2D86D;
		border-radius: 50rpx;
	}
}













</style>
