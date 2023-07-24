<template>
	<view class="content">
		
		<view class="top">
			<view class="status_bar"></view>
			<view class="title clear">
				<view class="back float_left" @click="back">
					<image src="../../static/address/返回@3x@2x.png" mode=""></image>
				</view>
				<view class="title_text float_left">
					确认订单
				</view>
			</view>
		</view>
		
		<view class="fill">
			
		</view>
		
		<view class="address">
			<view class="title clear">
				<view class="title_text float_left">
					服务地址
				</view>
				<view class="title_icon float_right">
					<image src="../../static/release/向右1@2x.png" mode=""></image>
				</view>
			</view>
			<view class="address_info">
				<view class="detail">
					河北省按随便打把手里的布拉暗杀部队拉
				</view>
				<view class="personal_info clear">
					<view class="name float_left">
						老刘吃牛
					</view>
					<view class="phone float_left">
						12345678911
					</view>
				</view>
			</view>
		</view>
		
		<view class="order clear">
			<view class="preview float_left">
				<image src="../../static/searchResult/1.png" mode="widthFix"></image>
			</view>
			<view class="order_info float_left">
				<view class="pro_title">
					我是产品标题我是产品标题我是产品标题我是产品标题我是产品标题
				</view>
				<view class="price">
					商品单价：￥599.00
				</view>
				<view class="pro_info clear">
					<view class="order_num float_left">
						数量：1
					</view>
					<view class="num_adjust float_right">
						<button>-</button>
						<input type="text" v-model="number">
						<button>+</button>
					</view>
				</view>
			</view>
		</view>
		
		<view class="notes">
			<view class="title">
				备注
			</view>
			<textarea maxlength="-1" rows="3" placeholder="请输入备注"></textarea>
		</view>
		
		<view class="price clear">
			<view class="title float_left">
				合计
			</view>
			<view class="num float_right">
				<text>￥0.00</text>
			</view>
		</view>
		
		
		<view class="bottom_funciton clear">
			<view class="money float_left">
				应付金额：￥599.00
			</view>
			<view class="btn float_right">
				<button>确认购买</button>
			</view>
		</view>
	</view>
</template>

<script>
	// 引入时间选择器
	export default {
		data() {
			return {
				number: 1,
				text: ""
			}
		},
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

.fill {
	height: 176rpx;
}

.content {
	// background-color: red;
	background-color: #f7f7f7;
	padding: 20rpx 32rpx 0 32rpx;
	height: 95vh;
}

.top {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	background-color: #fff;
	.status_bar {
		width: 100%;
		height: 88rpx;
	}
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
			.num_adjust {
				display: flex;
				button {
					width: 40rpx;
					height: 40rpx;
					text-align: center;
					line-height: 40rpx;
					padding: 0;
					// border: none;
					padding-top: -3rpx;
				}
				button:last-child {
					background-color: #F2D86D;
				}
				input {
					text-align: center;
					width: 60rpx;
					height: 40rpx;
				}
			}
		}
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
		// background-color: blue;
	}
}

.price {
	margin-bottom: 20rpx;
	background-color: #fff;
	border-radius: 20rpx;
	padding: 20rpx 10rpx 20rpx 10rpx;
	font-size: 28rpx;
	text {
		color: red;
		font-weight: bold;
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
		margin-top: 10rpx;
		button {
			font-weight: bold;
			width: 300rpx;
			background-color: #F2D86D;
			color: #f0f0f0;
			border: 2rpx solid #F2D86D;
			// border: none;
		}
	}
}

</style>
