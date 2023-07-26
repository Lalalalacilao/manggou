<template>
	<view class="content">
		
		<view class="top">
			<view class="status_bar"></view>
			<view class="title clear">
				<view class="back float_left" @click="back">
					<image src="https://mang-gou.tos-cn-beijing.volces.com/current%2F%E8%BF%94%E5%9B%9E%403x%402x.png" mode=""></image>
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
				<view class="title_icon float_right" @click="goAddAddress">
					<image src="https://mang-gou.tos-cn-beijing.volces.com/current%2F%E5%90%91%E5%8F%B31%402x(1).png" mode=""></image>
				</view>
			</view>
			<view class="address_info">
				<view class="detail">
					{{address.addressDetail}}
				</view>
				<view class="personal_info clear">
					<view class="name float_left">
						{{address.name}}
					</view>
					<view class="phone float_left">
						{{address.phone}}
					</view>
				</view>
			</view>
		</view>
		
		<view class="order clear">
			<view class="preview float_left">
				<image :src="productiDetail.imgUrl" mode="widthFix"></image>
			</view>
			<view class="order_info float_left">
				<view class="pro_title">
					{{productiDetail.goodsName}}
				</view>
				<view class="price">
					商品单价：￥{{(productiDetail.price / 100).toFixed(2)}}
				</view>
				<view class="pro_info clear">
					<view class="order_num float_left">
						数量：{{number}}
					</view>
					<view class="num_adjust float_right">
						<button @click="this.number--">-</button>
						<input type="text" v-model="number">
						<button @click="this.number++">+</button>
					</view>
				</view>
			</view>
		</view>
		
		<view class="notes">
			<view class="title">
				备注
			</view>
			<textarea v-module="remark" maxlength="-1" placeholder="请输入备注"></textarea>
		</view>
		
		<view class="price clear">
			<view class="title float_left">
				合计
			</view>
			<view class="num float_right">
				<text>￥{{(sumPrice / 100).toFixed(2)}}</text>
			</view>
		</view>
		
		
		<view class="bottom_funciton clear">
			<view class="money float_left">
				应付金额：￥{{(sumPrice / 100).toFixed(2)}}
			</view>
			<view class="btn float_right" @click="buy">
				确认购买
			</view>
		</view>
	</view>
</template>

<script>
	const app = getApp()
	// 引入时间选择器
	export default {
		data() {
			return {
				// 产品信息
				productiDetail: {},
				// 用户地址
				address:{
					addressDetail: "您还没有地址，快去添加吧",
					name: "",
					phone: ""
				},
				// 用户信息
				userInfo: {},
				// 购买数量，默认1
				number: 1,
				// 备注
				remark: "",
				// 
				timer: null
			}
		},
		watch: {
			number: {
				immediate:true,
				handler(newValue,oldValue) {
					if(newValue <= 0) {
						this.number = 1;
					} else {
						this.number = newValue;
					}
				}
			},
		},
		computed: {
			// 总金额
			sumPrice: {
				get() {
					return this.productiDetail.price * this.number;
				},
				set(value) {}
			}
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			// 去添加地址
			goAddAddress() {
				uni.navigateTo({
					url: "/pages/address/address?type=select",
				})
			},
			// 获取产品信息
			getProductDetail(id) {
				uni.showToast({
					title: "加载中",
					icon: "loading"
				})
				if(id === null) {
					uni.showToast({
						title: "错误",
						icon: "none"
					})
					return
				}
				
				app.globalData.getSpecialColumnGoosDetailById({
					id
				}).then(res => {
					this.productiDetail = res.data;
					this.dataHandle();
				}).catch(err => {
					uni.showToast({
						title: err.message,
						icon: "error"
					})
				})
			},
			// 产品信息图片处理
			dataHandle() {
				if(this.productiDetail.imgUrl != null) {
					this.productiDetail.imgUrl = JSON.parse(this.productiDetail.imgUrl)[0];
				}
				this.sumPrice = this.productiDetail.price;
			},
			// 获取用户默认地址
			getDefaltAddress() {
				app.globalData.getUserAddress({
					userId: this.userInfo.id
				}).then(res => {
					if(res.data !== undefined) {
						this.address = res.data.filter(item => {
							return item.isDefault == 1 ? item : "";
						})[0];
					}
				}).catch(err => {
					uni.showToast({
						title: err.message,
						icon: "error"
					})
				})
			},
			// 节流函数
			throttle(fun,t) {
			    let timer = null;
			    return function() {
			        if(!timer){
			            timer = setTimeout(function() {
			                fun();
			                // 清除定时器后，以下次可以继续定时
			                timer = null;
			            },t);
			        }
			    }
			},
			// 订单生成封装
			orderGenerated() {
				app.globalData.orderForGoods({
					goodsId: this.productiDetail.id,
					num: this.number,
					userId: this.userInfo.id,
					addressId: this.address.id
				}).then(res => {
					console.log(res);
					this.wxPayment(res.data)
				}).catch(err => {
					uni.showToast({
						title: "订单创建失败",
						icon: "error"
					})
				})
			},
			// 购买按钮
			buy() {
				uni.showToast({
					title: "加载中",
					icon: "loading"
				})
				// 节流处理
				if(!this.timer){
					this.timer = setTimeout(() => {
						this.orderGenerated();
						// 清除定时器后，以下次可以继续定时
						this.timer = null;
					},1000);
				}
			},
			// 支付
			wxPayment(data) {
				uni.requestPayment({
					provider:'wxpay',
					timeStamp: data.timeStamp,
					nonceStr: data.nonceStr,
					package: data.packageStr,
					signType: data.signType,
					paySign: data.paySign,
					success: (res) => {
						console.log(res);
						uni.showToast({
							title:'支付成功',
							icon:'success'
						})
						uni.navigateTo({
							url:'/pages/allOrder/allOrder?curr=' + 2 + '&userId=' + this.userInfo.id
						})
					},
					fail: (err) => {
						uni.showToast({
							title:'支付失败',
							icon:'error'
						})
						uni.navigateTo({
							url:'/pages/allOrder/allOrder?curr=' + 1 + '&userId=' + this.userInfo.id
						})
					}
				})
			}
		},
		onLoad(option) {
			this.userInfo = uni.getStorageSync("userInfo");
			this.getProductDetail(option.proId);
		},
		onShow() {
			// let newAddress = uni.getStorageSync("newAddress");
			// if(newAddress) {
			// 	newAddress = JSON.parse(newAddress);
			// 	this.myAddress = newAddress;
			// 	this.$set(this.myAddress,"null",null);
			// 	console.log(this.myAddress);
			// 	uni.removeStorageSync("newAddress");
			// }
			this.getDefaltAddress();
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
	background-color: #f9f9f9;
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
		font-size: 28rpx;
		line-height: 34rpx;
	}
}

.price {
	border-radius: 20rpx;
	padding: 20rpx 10rpx 20rpx 10rpx;
	
	background-color: #fff;
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