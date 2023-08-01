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
				<input type="text" placeholder-class="place" placeholder="请填写收货人姓名" :maxlength="10" v-model="userName">
			</view>
			<view class="phoneNum from_item">
				<text>联系电话</text>
				<input type="number" placeholder-class="place" placeholder="请填写收货人手机号码" v-model="userPhone">
			</view>
			
			<u-form :labelStyle="labelStyle">
				<u-form-item label="地址" prop="address" @click="addressShow = true;">
					<u--input placeholderStyle="color: #ccc" fontSize="32rpx" v-model="address" disabled disabledColor="#ffffff" border="none"
						placeholder='请输入家庭地址'></u--input>
				</u-form-item>
			</u-form>
			<address-picker :show="addressShow" closeOnClickOverlay @confirm='confirmAddress' @cancel='addressShow=false'
				@close='addressShow = false' :address-data="addressData" :indexs="indexs" :areaId="areaId" :type="type"></address-picker>
			
			<view class="notes">
				<view class="title">
					详细地址
				</view>
				<textarea v-model="detailAddress" maxlength="-1" placeholder="请输入详细地址" placeholder-class="place"></textarea>
			</view>
			
			<view class="default from_item clear">
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
			<text v-if="!editOrSubmit">提交</text>
			<text v-else>确认修改</text>
		</view>
	</view>
</template>

<script>
	// import addressPicker from "../../uni_modules/address-picker/components/address-picker/address-picker.vue"
	const app = getApp();
	export default {
		// components: {
		// 	"address-picker":addressPicker,
		// },
		data() {
			return {
				userName: "",
				userPhone: "",
				province: "",
				city: "",
				zone: "",
				addressDetail: "",
				// 设为默认
				isDefault: false,
				
				
				
				// 用户信息
				userInfo: {},
				
				id: 0,
				editOrSubmit: false,
				
				
				address: '',
				addressShow: false,
				title: 'Hello',
				indexs: [0, 0, 0],
				areaId: [1, 110000, 110101],
				addressData: ['北京市', '北京市', '东城区'],
				type: 3, //1-省，2-省市，3-省市区
				detailAddress: "",
				
				
				labelStyle: {
					"font-size": "32rpx",
					"font-weight": 800,
					"padding": "20rpx 0",
					"background-color": "#fff"
				},
			};
		},
		methods: {
			// 省市区选择确认
			confirmAddress(val) {
				console.log(val);
				
				this.address = val.value.join('');
				this.province = val.value[0];
				this.city = val.value[1];
				this.zone = val.value[2];
				
				this.addressShow = false
			},
			
			switchBtn() {
				this.isDefault = !this.isDefault;
			},
			
			// 地址请求
			getAddress(id) {
				app.globalData.getOneAddressInfo({
					id,
				}).then(res => {
					this.userName = res.data.name;
					this.userPhone = res.data.phone;
					
					this.province = this.addressData[0] = res.data.province;
					this.city = this.addressData[1] = res.data.city;
					this.zone = this.addressData[2] = res.data.zone;
					this.address = this.province + this.city + this.zone;
					this.detailAddress = res.data.addressDetail;
					
					this.isDefault = res.data.isDefault === 0 ? false : true;
					this.id = id;
					
				}).catch(err => {
					console.log(err);
				})
			},
			
			// 添加地址
			submit() {
				const userNameThis = this.userName.trim();
				const userPhoneThis = this.userPhone.trim();
				const detailAddressThis = this.detailAddress.trim();
				
				// 为空校验
				if(userNameThis === "") {
					uni.showToast({
						title: "收货人不能为空",
						icon: "error"
					})
					return
				} else if(userPhoneThis === "" || !(/^1[3456789]\d{9}$/.test(userPhoneThis))) {
					uni.showToast({
						title: "手机号错误",
						icon: "error"
					})
					return
				} else if(this.address === "") {
					uni.showToast({
						title: "请选择地区",
						icon: "error"
					})
				} else if(detailAddressThis === "") {
					uni.showToast({
						title: "请填写详细地址",
						icon: "error"
					})
					return
				}
				
				if(!this.editOrSubmit){
					// 提交新增
					app.globalData.addUserAddress({
						userId: this.userInfo.id,
						name: userNameThis,
						phone: userPhoneThis,
						province: this.province,
						city: this.city,
						zone: this.zone,
						addressDetail: detailAddressThis,
						isDefault: +(this.isDefault ? 1 : 0)
					}).then(res => {
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
						province: this.province,
						city: this.city,
						zone: this.zone,
						address: detailAddressThis,
						name: userNameThis,
						phone: userPhoneThis,
						userId: this.userInfo.id,
						locId: this.id
					}).then(res => {
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
			if(options.index != undefined){
				this.editOrSubmit = true;
				this.getAddress(options.index);
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
	.notes {
		margin-bottom: 20rpx;
		background-color: #fff;
		border-radius: 20rpx;
		// padding: 20rpx 10rpx 20rpx 10rpx;
		font-size: 0;
		.title {
			font-size: 32rpx;
			font-weight: 800;
		}
		textarea {
			width: 100%;
			margin-top: 10rpx;
			height: 150rpx;
			font-size: 32rpx;
			line-height: 34rpx;
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

.place {
	color: #ccc
}


</style>
