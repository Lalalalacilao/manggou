<template>
	<view class="content">
		<view class="top">
			<view class="status_bar"></view>
			<view class="title clear">
				<view class="back float_left" @click="back">
					<image src="https://mang-gou.tos-cn-beijing.volces.com/address%2F%E8%BF%94%E5%9B%9E%403x%402x.png" mode=""></image>
				</view>
				<view class="title_text float_left">
					我的地址
				</view>
			</view>
		</view>
		<view class="fill">
			
		</view>
		<view class="address">
			<view class="address_item clear" v-for="(item,index) in myAddress" :key="item.id">
				<view class="choose_btn float_left">
					<view class="choose" :class="item.isChoose ? 'chooseThis' : ''" @click="chooseThis(index)"></view>
				</view>
				<view class="right float_left">
					<view class="address_show">
						<view class="address_top clear">
							<view class="name float_left">
								{{item.name}}
							</view>
							<view class="phone_number float_left">
								{{item.phone}}
							</view>
						</view>
						<view class="position">
							{{item.addressDetail}}
						</view>
					</view>
					<view class="function clear">
						<view class="defualt clear float_left">
							<view class="text float_left">
								设置为默认寄件地址
							</view>
							<!-- 开关按钮 -->
							<view class="switch float_left" :class="item.isDefault ? 'open_switch_bacc' : 'close_switch_bacc' " @click="switchBtn(index)">
								<view class="view" :class="item.isDefault ? 'open_btn' : 'close_btn'">
								
								</view>
							</view>
						</view>
						<view class="fun_right">
							<view class="edit fun_btn float_left" @click="editThis(index)">
								<image src="https://mang-gou.tos-cn-beijing.volces.com/address%2F%E7%BC%96%E8%BE%91%402x.png" mode=""></image>
							</view>
							<view class="delete fun_btn float_left" @click="deleteThis(index)">
								<image src="https://mang-gou.tos-cn-beijing.volces.com/address%2F%E5%88%A0%E9%99%A4%402x.png" mode=""></image>
							</view>
						</view>
					</view>
				</view>
				
				
			</view>
			
			
			
			<view class="bottom">
				<view class="delete" @click="deleteAll">
					删除
				</view>
				<view class="add" @click="addAddress">
					新增地址
				</view>
			</view>
			
		</view>
		
		
		
		<view class="fill" style="height: 168rpx;">
			
		</view>
		
		
	</view>
</template>

<script>
	const app = getApp();
	export default {
		data() {
			return {
				myAddress: [],
				userInfo:{},
				select: false,
			};
		},
		methods: {
			// 开关按钮
			switchBtn (index) {
				if(this.myAddress[index].isDefault === true) {
					this.myAddress[index].isDefault = !this.myAddress[index].isDefault;
				} else {
					this.myAddress.forEach(item => {
						item.isDefault = false;
					})
					app.globalData.setDefault({
						userId: "" + this.user.userId,
						locId: "" + this.myAddress[index].id
					}).then(res => {
						this.myAddress[index].isDefault = true;
					}).catch(err => {
						uni.showToast({
							title: "默认地址设置失败",
							icon: "error"
						})
					})
				}
			},
			// 选择按钮
			chooseThis(index) {
				this.myAddress[index].isChoose = !this.myAddress[index].isChoose;
			},
			// item内编辑按钮
			editThis(index) {
				console.log("编辑" + index);
			},
			
			
			back() {
				if(this.select) {
					for(let i = 0; i < this.myAddress.length; i++) {
						if(this.myAddress[i].isChoose) {
							console.log(this.myAddress[i]);
							uni.setStorageSync("newAddress",JSON.stringify(this.myAddress[i]));
							break;
						}
					}
				}
				uni.navigateBack({
					delta: 1
				})
			},
			
			// item内删除按钮
			deleteThis(index,userId = this.user.userId) {
				app.globalData.deleteAddress({
					locId: this.myAddress[index].id,
					userId
				}).then(res => {
					this.myAddress.splice(index,1);
					uni.showToast({
						title: "删除成功",
						icon: "none"
					})
				}).catch(err => {
					uni.showToast({
						title: res.message,
						icon: "error"
					})
				})
				
			},
			// 底部删除按钮
			deleteAll() {
				for(let i = 0; i < this.myAddress.length; i++) {
					if(this.myAddress[i].isChoose) {
						this.deleteThis(i);
						i = 0;
					}
				}
			},
			// 新增地址
			addAddress() {
				uni.navigateTo({
					url: "/pages/addAddress/addAddress"
				})
			},
			
			// 地址请求
			getAddress(id) {
				app.globalData.getUserAddress({
					userId: this.userInfo.id
				}).then(res => {
					if(res.data !== undefined) {
						this.myAddress = res.data;
						this.dataHandle();
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
			// 地址处理
			dataHandle() {
				for(let i = 0; i < this.myAddress.length; i++) {
					if(this.myAddress[i].isDefault === 1) {
						this.myAddress[i].isDefault = true;
					} else {
						this.myAddress[i].isDefault = false;
					}
					this.$set(this.myAddress[i],"isChoose",false);
				}
			},
			
			
 		},
		
		onLoad(option){
			if(option.type === "select") {
				this.select = true;
			}
			this.userInfo = uni.getStorageSync("userInfo");
		},
		onShow() {
			this.getAddress(this.userInfo.id);
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
	padding: 32rpx;
	.address_item {
		background-color: #fff;
		margin-bottom: 24rpx;
		border-radius: 24rpx;
		box-sizing: border-box;
		width: 686rpx;
		.choose_btn {
			width: 80rpx;
			.choose {
				width: 32rpx;
				height: 32rpx;
				box-sizing: border-box;
				border-radius: 50%;
				border: 2rpx solid #999999;
				margin: 0 auto;
				margin-top: 40rpx;
			}
			.chooseThis {
				background: url("https://mang-gou.tos-cn-beijing.volces.com/address%2F%E7%BB%84%E4%BB%B6%20171%20%E2%80%93%201%402x.png");
				background-size: 32rpx,32rpx;
				border: none;
			}
		}
		.right {
			width: 606rpx;
			box-sizing: border-box;
			padding-right: 30rpx;
			font-size: 0;
			.address_show {
				padding: 32rpx 0 38rpx 0;
				border-bottom: 2rpx solid #EFEFEF;
				.address_top {
					font-family: PingFang SC-Bold, PingFang SC;
					margin-bottom: 4rpx;
					font-size: 34rpx;
					color: #333;
					font-weight: bold;
					.name {
						margin-right: 40rpx;
					}
				}
				.position {
					font-size: 26rpx;
					color: #999;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
				}
			}
			.function {
				height: 94rpx;
				box-sizing: border-box;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.defualt {
					.text {
						font-family: PingFang SC-Regular, PingFang SC;
						font-size: 26rpx;
						color: #333333;
						margin-right: 22rpx;
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
				}
				.fun_btn {
					image {
						width: 32rpx;
						height: 32rpx;
					}
				}
				.edit {
					margin-right: 48rpx;
				}
			}
		}
	}
}

.bottom {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: #fff;
	display: flex;
	justify-content: space-around;
	align-items: center;
	padding: 14rpx 32rpx 58rpx 14rpx;
	// padding-top: 14rpx;
	// padding-bottom: 58rpx;
	view {
		width: 336rpx;
		height: 96rpx;
		text-align: center;
		line-height: 96rpx;
		border-radius: 48rpx;
		color: #0D0D26;
		font-weight: bold;
		font-family: PingFang SC-Bold, PingFang SC;
	}
	.delete {
		border: 2rpx solid #E0E0E0;
	}
	.add {
		background-color: #F2D86D;
		box-shadow: 0rpx 16rpx 55rpx -20rpx #f2d86d;
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









</style>
