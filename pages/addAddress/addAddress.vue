<template>
	<view class="content">
		<view class="top">
			<view class="status_bar"></view>
			<view class="title clear">
				<view class="back float_left" @click="back">
					<image src="https://mang-gou.tos-cn-beijing.volces.com/address%2F%E8%BF%94%E5%9B%9E%403x%402x.png" mode=""></image>
				</view>
				<view class="title_text float_left">
					添加地址
				</view>
			</view>
		</view>
		<view class="fill">
			
		</view>
		<form class="from clear">
			<view class="name from_item">
				<text>收货人</text>
				<input type="text" placeholder="请填写收货人姓名" :maxlength="10" v-model="userName">
			</view>
			<view class="phoneNum from_item">
				<text>联系电话</text>
				<input type="number" placeholder="请填写收货人手机号码" v-model="userPhone">
			</view>
			<view class="area from_item">
				<text>所在地区</text>
				<input type="text" placeholder="请省市区、乡镇等" v-model="address.addCity">
			</view>
			<view class="street from_item">
				<text>所在街道</text>
				<input type="text" placeholder="请填写街道" v-model="address.addStreet">
			</view>
			<view class="detail from_item">
				<text>详细地址</text>
				<input type="text" placeholder="请填写详细地址" v-model="address.addDetail">
			</view>
			<view class="default from_item clear" v-if="addressindex == '' ">
				<view class="text float_left">
					设为默认地址
				</view>
				<view class="switch float_right" :class="isDefault ? 'open_switch_bacc' : 'close_switch_bacc' " @click="switchBtn">
					<view class="view" :class="isDefault ? 'open_btn' : 'close_btn'">
					</view>
				</view>
			</view>
		</form>
		<view class="btn from_item" @click="submit">
			<text v-if="addressindex == ''">提交</text>
			<text v-else>确认修改</text>
		</view>
	</view>
</template>

<script>
	const app = getApp();
	export default {
		data() {
			return {
				userName: "",
				userPhone: "",
				address: {
					addCity: "",
					addStreet: "",
					addDetail: ""
				},
				// 设为默认
				isDefault: false,
				// 用户信息
				userInfo: {},
				addressindex:''
			};
		},
		methods: {
			switchBtn() {
				this.isDefault = !this.isDefault;
			},
			// 地址请求
			getAddress(id) {
				app.globalData.getUserAddress({
					userId: this.userInfo.id
				}).then(res => {
					if(res.data !== undefined) {
						this.myAddress = res.data[this.addressindex]
						this.userName = res.data[this.addressindex].name
						this.userPhone = res.data[this.addressindex].phone
						const [province, district, street] = res.data[this.addressindex].addressDetail.trim().split(/\s+/);
						this.address.addCity = province
						this.address.addStreet = district
						this.address.addDetail = street
						this.id = res.data[this.addressindex].id
					} else {
						uni.showToast({
							title: "您还没有地址，快添加吧！",
							icon: "none"
						})
					}
				}).catch(err => {
					uni.showToast({
						title: err.message,
						icon: "error"
					})
				})
			},
			
			// 添加地址
			submit() {
				this.addressString = this.address.addCity.trim()+ ' ' + this.address.addStreet.trim()+ ' ' + this.address.addDetail.trim();
				// 为空校验
				if(this.userName.trim() === "") {
					uni.showToast({
						title: "收货人不能为空",
						icon: "error"
					})
					return
				} else if(this.userPhone.trim() === "" || !(/^1[3456789]\d{9}$/.test(this.userPhone))) {
					console.log("11111");
					uni.showToast({
						title: "手机号错误",
						icon: "error"
					})
					return
				} else if(this.addressString.trim() === "") {
					uni.showToast({
						title: "地址不能为空",
						icon: "error"
					})
					return
				}
				if(this.addressindex == undefined){
					// 提交新增
					app.globalData.addUserAddress({
						address: this.addressString,
						name: this.userName,
						phone: this.userPhone,
						userId: this.userInfo.id,
						isDefault: +(this.isDefault ? 1 : 0)
						
					}).then(res => {
						console.log(this.addressString,this.userName);
						uni.showToast({
							title: "添加成功",
							icon: "none"
						})
						uni.navigateBack({
							delta: 1
						})
					}).catch(err => {
						uni.showToast({
							title: "添加失败",
							icon: "error"
						})
					})
				}else{
					//修改
					app.globalData.updateAddress({
						address: this.addressString,
						name: this.userName,
						phone: this.userPhone,
						userId: this.userInfo.id,
						locId: this.id
						
					}).then(res => {
						console.log(res);
						uni.showToast({
							title: "添加成功",
							icon: "none"
						})
						uni.navigateBack({
							delta: 1
						})
					}).catch(err => {
						uni.showToast({
							title: "添加失败",
							icon: "error"
						})
					})
				}
				
				
			},
			// 返回
			back() {
				uni.navigateBack({
					delta: 1
				})
			}
		},
		onLoad(options) {
			this.userInfo = uni.getStorageSync("userInfo");
			this.addressindex = options.index
			console.log(this.addressindex);
			if(this.addressindex != undefined){
				this.getAddress()
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
	background-color: #F9F9F9;
}
.status_bar {
	width: 100%;
	height: 88rpx;
}
.top {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	// background-color: red;
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
.fill {
	height: 176rpx;
}

// 输入框
.from {
	display: block;
	padding: 32rpx;
	.from_item {
		display: flex;
		justify-content: space-between;
		background-color: #fff;
		padding: 20rpx 0;
		text {
			font-size: 32rpx;
			font-weight: 800;
			letter-spacing: 3rpx;
		}
		input {
			width: 520rpx;
			height: 50rpx;
		}

	}
	.default {
		margin-top: 10rpx;
		.text {
			font-size: 32rpx;
			font-weight: 800;
		}
		// 开关按钮
		.switch {
			width: 76rpx;
			height: 40rpx;
			border-radius: 20rpx;
			box-sizing: border-box;
			padding: 4rpx;
			.view {
				width: 32rpx;
				height: 32rpx;
				border-radius: 50%;
				background-color: #FFFFFF;
			}
		}
		.open_switch_bacc {
			background-color: #F2D86D !important;
			transition: all 0.4s !important;
		}
		.open_btn {
			transform: translateX(36rpx) !important;
			transition: all 0.4s !important;
		}
		
		.close_switch_bacc {
			background-color: #EAEAEA !important;
			transition: all 0.4s !important;
		}
		.close_btn {
			transform: translateX(0rpx) !important;
			transition: all 0.4s !important;
		}
	}
	.from_item:nth-child(1) {
		text {
			letter-spacing: 19rpx;
		}
	}
}
.btn {
	margin: 0 32rpx;
	margin-top: 40rpx;
	display: block;
	width: 686rpx;
	height: 80rpx;
	line-height: 80rpx;
	text-align: center;
	border: 1rpx solid #F2D86D;
	background-color: #F2D86D;
	border-radius: 50rpx;
	font-size: 32rpx;
	color: #0D0D26;
	font-family: PingFang HK-Medium, PingFang HK;
	font-weight: 500;
	box-shadow: 0rpx 16rpx 55rpx -20rpx #f2d86d;
}




</style>
