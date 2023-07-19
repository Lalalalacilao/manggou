<template>
	<view class="content">
<!-- 		<view class="top">
			<view class="status_bar"></view>
			<view class="function_area clear">
				<view class="back float_left" @click="back">
					<image src="../../static/address/返回@3x.png" mode=""></image>
				</view>
				<view class="title float_left">
					登录
				</view>
			</view>
		</view> -->
		
		<view class="login">
			<view class="btn">
				<button :open-type="isCheck ? 'getPhoneNumber' : ''" @getphonenumber="getPhoneNumber" @click="checkPlease">点击登录</button>
			</view>
			<!-- <button>点击登录</button> -->
			<view class="protocol">
				<checkbox-group @change="check">
					<label>
						<checkbox value="isCheck" /><text>勾选同意巴拉巴拉</text>
					</label>
				</checkbox-group>
				
			</view>
		</view>
		
	</view>
</template>

<script>
	const app = getApp();
	export default {
		data() {
			return {
				isCheck: false,
				openidCode : "",
				userToken: "",
				userInfo: {}
			};
		},
		methods: {
			// 勾选判断
			checkPlease() {
				if(this.isCheck === false) {
					uni.showToast({
						title: '请勾选下方协议',
						icon: 'error',
						mask: true
					})
				} else {
					// 获取用户信息
					// let info = this.wxGetUserProfile();
					// info.then((res) => {
					// 	// 存储用户信息至本地
					// 	uni.setStorageSync('userInfo', res.rawData);
					// }).catch((err) => {
					// 	// uni.showToast({
					// 	// 	title:"信息获取失败",
					// 	// 	icon:'error'
					// 	// })
					// 	console.log("失败");
					// 	console.log(err);
					// });
				}
			},
			// 获取phoneNumber
			getPhoneNumber(e) {
				// 勾选框
				if(this.isCheck !== true) {
					return
				}
				
				if(e.detail.errMsg === "getPhoneNumber:ok") {
					// 获取code
					const code = this.wxSilentLogin();
					// 获取手机号
					const phoneCode = this.wxGetUserPhoneNumber(e);
					code.then((res) => {
						
						this.openidCode = res.code;
						
						console.log("开始登录");
						app.globalData.login({
							phoneCode,
							openidCode: this.openidCode,
						}).then(res => {
							uni.setStorageSync('token', res.data.token);
							uni.showToast({
								title:"登录成功",
								icon:'none'
							});
							this.getUserInfo();
							
							uni.hideLoading();
						}).catch(err => {
							uni.showToast({
								title:err.message,
								icon:'error'
							});
						})
							
					}).catch(err => {
						uni.showToast({
							title: "登录失败",
							icon:'error'
						});
					})
					
					
					
					
					
				} else {
					uni.showToast({
						title: '若要登录,请重新打开小程序',
						icon: 'none'
					})
				}
					
					
					
					
					
					

			},
			
			wxGetUserProfile: function() {
				return new Promise((resolve, reject) => {
				//uniapp4月更新了这个方法getUserProfile，用getUserinfo无法弹出授权窗口
					uni.getUserProfile({
						lang: 'zh_CN',
						desc: '获取你的昵称、头像、地区及性别',
						success: (res) => {
							resolve(res)
						},
						// 失败回调
						fail: (err) => {
							reject(err)
						}
					})
				})
			},
			
			wxSilentLogin: function() {
				return new Promise((resolve, reject) => {
					uni.login({
						success(res) {
						//这里就是code，可以打印看下
							resolve(res)
						},
						fail(err) {
							reject(err)
						}
					})
				})
			},
			// 获取用户手机号的方法
			wxGetUserPhoneNumber(data) {
				return data.detail.code;
			},
			
			// 获取用户信息
			getUserInfo() {
				const token = uni.getStorageSync("token");
				if(token != null) {
					app.globalData.getUserInfo().then(res => {
						this.userInfo = res.data;
						this.dataHandle();
						uni.setStorageSync("userInfo",this.userInfo);
						
						uni.switchTab({
							url:'/pages/index/index'
						});
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
					this.userInfo.userAvatar = "https://mang-gou.tos-cn-beijing.volces.com/oeRlzleK0UwP02c8877eb0979a88ef8c8c8e6c90cfd6_1689664581294.jpg"; // 默认头像
				}
				if(this.userInfo.userName === null) {
					this.userInfo.userName = "暂无姓名";
				}
			},
			
			check() {
				this.isCheck = !this.isCheck;
			}

		}
	}
</script>

<style lang="scss">
// 通用设置
.clear {
	clear: both;
	content: "";
	overflow: hidden;
}
.float_left {
	float: left;
}
.float_right {
	float: right;
}


.content {
	width: 100vh;
	height: 100vh;
	background: linear-gradient(#F5DF9C 0%, #F2D86D 100%);
}

.top {
	background-color: #f9f9f9;
	.status_bar {
		height: 88rpx;
	}
	.function_area {
		height: 88rpx;
		box-sizing: border-box;
		
		padding: 20rpx 32rpx;
		.back {
			image {
				width: 44rpx;
				height: 44rpx;
			}
		}
		.title {
			color: #333333;
			font-size: 32rpx;
			font-weight: 800;
			font-family: PingFang SC-Heavy, PingFang SC;
			margin-left: 254rpx;
		}
	}
}

.login {
	position: absolute;
	bottom: 300rpx;
	padding: 0 32rpx;
	.btn {
		background-color: #f9f9f9;
		text-align: center;
		width: 686rpx;
		height: 80rpx;
		line-height: 80rpx;
		border-radius: 50rpx;
		margin-bottom: 20rpx;
		button {
			border-radius: 50rpx;
		}
	}
	.protocol {
		margin-left: 20rpx;
		text {
			font-size: 30rpx;
		}
	}
}





</style>
