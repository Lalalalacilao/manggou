<template>
	<view class="content">
		<view class="top">
			<view class="status_bar"></view>
			<view class="title clear">
				<view class="back float_left" @click="back">
					<image src="https://mang-gou.tos-cn-beijing.volces.com/address%2F%E8%BF%94%E5%9B%9E%403x%402x.png" mode=""></image>
				</view>
				<view class="title_text float_left">
					问题反馈
				</view>
			</view>
		</view>
		
		<view class="feedback">
			<view class="function_choose clear">
				<view class="function_item flashback float_left" :class="{'functionBacc' : functionBacc[0]}" @click="choose(0)">
					<view class="icon">
						<image src="https://mang-gou.tos-cn-beijing.volces.com/problemFeeback%2F1%402x.png" mode=""></image>
					</view>
					<view class="text">
						页面闪退
					</view>
				</view>
				<view class="function_item transmission float_left" :class="{'functionBacc' : functionBacc[1]}"  @click="choose(1)">
					<view class="icon">
						<image src="https://mang-gou.tos-cn-beijing.volces.com/problemFeeback%2F2%402x.png" mode=""></image>
					</view>
					<view class="text">
						传输问题
					</view>
				</view>
				<view class="function_item operate float_left" :class="{'functionBacc' : functionBacc[2]}"  @click="choose(2)">
					<view class="icon">
						<image src="https://mang-gou.tos-cn-beijing.volces.com/problemFeeback%2F3%402x.png" mode=""></image>
					</view>
					<view class="text">
						操作体验
					</view>
				</view>
				<view class="function_item interface float_left"  :class="{'functionBacc' : functionBacc[3]}" @click="choose(3)">
					<view class="icon">
						<image src="https://mang-gou.tos-cn-beijing.volces.com/problemFeeback%2F4%402x.png" mode=""></image>
					</view>
					<view class="text">
						界面审美
					</view>
				</view>
				<view class="function_item function_recommendation float_left"  :class="{'functionBacc' : functionBacc[4]}" @click="choose(4)">
					<view class="icon">
						<image src="https://mang-gou.tos-cn-beijing.volces.com/problemFeeback%2F5%402x.png" mode=""></image>
					</view>
					<view class="text">
						功能建议
					</view>
				</view>
				<view class="function_item other float_left"  :class="{'functionBacc' : functionBacc[5]}" @click="choose(5)">
					<view class="icon">
						<image src="https://mang-gou.tos-cn-beijing.volces.com/problemFeeback%2F6%402x.png" mode=""></image>
					</view>
					<view class="text">
						其他反馈
					</view>
				</view>
			</view>
			
			<view class="feedback_content">
				<view class="title">
					我要反馈
				</view>
				<view class="feedbak_input">
					<!-- <input type="text" placeholder-class="tips" placeholder="你想说点什么？"> -->
					<textarea cols="30" rows="1" placeholder="你想说点什么？" placeholder-class="tips" v-model="detail"></textarea>
					<view class="upload clear">
						<view class="upload_pre upload_item float_left" v-for="(item,index) in uploadPre" :key="index">
							<image :src="item" mode=""></image>
						</view>
						<view class="upload_btn upload_item float_left" @click="upload">
							<image src="https://mang-gou.tos-cn-beijing.volces.com/problemFeeback%2F%E7%BB%84%E4%BB%B6%2071%20%E2%80%93%201%402x.png" mode=""></image>
						</view>
					</view>
				</view>
			</view>
			
			<view class="contact">
				<view class="top clear">
					<view class="title float_left">
						联系方式
					</view>
					<view class="tips float_left">
						注：手机号/微信/QQ
					</view>
				</view>
				<view class="contact_input">
					<input type="text" placeholder-class="tips" placeholder="请留下任意一个联系方式" v-model="phone">
				</view>
			</view>
			
			<!-- <input class="submit" type="" > -->
			<button class="submit" @click="submit">提交</button>
			
			
			
			
			
			
			
		</view>
	</view>
</template>

<script>
	const app = getApp();
	export default {
		data() {
			return {
				// 问题反馈
				functionBacc: [true,false,false,false,false,false,],
				// 上传图片预览
				uploadPre: [],
				detail: "",
				phone: "",
				user: {
					userId: 111
				}
			};
		},
		computed: {
			problemType() {
				let i = 0;
				for(i = 0; i < this.functionBacc; i++) {
					if(this.functionBacc[i] === true) {
						break;
					}
				}
				switch(i) {
					case 0: 
						return "页面闪退";
					case 1:
						return "传输问题";
					case 2:
						return "操作体验";
					case 3:
						return "界面审美";
					case 4:
						return "功能建议";
					case 5:
						return "其他反馈";
					default:
						return "页面闪退";
				}
			}
		},
		methods: {
			choose(index) {
				for(let i = 0; i < this.functionBacc.length; i++) {
					this.functionBacc.splice(i,1,false);
				}
				this.functionBacc.splice(index,1,true);
			},
			back() {
				uni.navigateBack({
					delta: 1
				}).catch(err => {
					console.log("@@");
				})
			},
			upload() {
				uni.chooseImage({
					count: 6, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						console.log(res);
						uni.uploadFile({
							url: 'https://www.ydtloan.com/tos/uploadFile',
							files: res.tempFiles,
							filePath: res.tempFilePaths[0],
							name: 'file',
							header: {
								token: uni.getStorageSync("token")
							},
							success: (res) => {
								console.log(res);							
								this.uploadPre.push(JSON.parse(res.data).url);
							},
							fail: (err) => {
								uni.showToast({
									title: "图片上传失败",
									icon: "error"
								})
							}
						})
					},
					fail: (err) => {
						console.log(err);
					}
				});
			},
			submit() {
				app.globalData.addProblemFeedback({
					detail: this.detail,
					imgUrl: JSON.stringify(this.uploadPre),
					phone: this.phone,
					problemType: this.problemType,
					userId: this.user.userId
				}).then(res => {
					this.detail = "",
					this.phone = "",
					this.uploadPre = [],
					uni.showToast({
						title: "上传成功",
						icon: "none"
					})
				}).catch(err => {
					uni.showToast({
						title: "问题反馈失败",
						icon: "error"
					})
				})
				
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
	clear: both;
	content: "";
	overflow: hidden;
}
.status_bar {
	height: 88rpx;
}
// 顶部
.content>.top {
	background-color: #fff;
	border-bottom: 1rpx solid #E6E6E6;
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

.feedback {
	.function_choose {
		padding: 64rpx 0rpx 26rpx 32rpx;
		.function_item {
			margin-bottom: 32rpx;
			margin-right: 30rpx;
			width: 208rpx;
			height: 142rpx;
			background-color: #F6F6F6;
			border-radius: 12rpx;
			padding-top: 32rpx;
			padding-bottom: 20rpx;
			box-sizing: border-box;
			.icon {
				text-align: center;
				margin-bottom: 10rpx;
				image {
					width: 44rpx;
					height: 44rpx;
				}
			}
			.text {
				font-family: PingFang HK-Regular, PingFang HK;
				font-size: 26rpx;
				color: #333333;
				text-align: center;
			}
		}
	}
}

.feedback_content {
	margin-top: 32rpx;
	padding: 0 32rpx;
	font-size: 0;
	.title {
		margin-bottom: 24rpx;
		font-size: 32rpx;
		color: #333333;
		font-family: PingFang HK-Semibold, PingFang HK;
		font-weight: 600;
	}
	.feedbak_input {
		background-color: #F6F6F6;
		border-radius: 12rpx;
		padding: 26rpx 32rpx 28rpx 32rpx;
		textarea {
			font-size: 28rpx;
			font-family: PingFang HK-Regular, PingFang HK;
			height: 132rpx;
			// padding-top: 26rpx;
			box-sizing: border-box;
		}

		.upload {
			padding-top: 26rpx;
			.upload_item {
				margin-right: 26rpx;
				margin-top: 26rpx;
				width: 128rpx;
				height: 128rpx;
				image {
					width: 100%;
					height: 100%;
				}
			}
			.upload_btn {
				border: 2rpx dashed #BDBFC1;
				text-align: center;
				border-radius: 8rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				image {
					width: 35rpx;
					height: 35rpx;
				}
			}
		}
	}
}

.contact {
	padding: 0 32rpx;
	margin-top: 60rpx;
	margin-bottom: 82rpx;
	font-size: 0;
	.top {
		margin-bottom: 20rpx;
		font-family: PingFang HK-Semibold, PingFang HK;
		.title {
			font-size: 32rpx;
			color: #333;
			font-weight: 600;
			margin-right: 18rpx; 
		}
		.tips {
			font-size: 24rpx;
			color: #999999;
			margin-top: 4rpx;
		}
	}
	.contact_input {
		width: 686rpx;
		height: 108rpx;
		border-radius: 12rpx;
		box-sizing: border-box;
		padding: 32rpx 34rpx;
		background-color: #F6F6F6;
		font-size: 28rpx;
	}
}

.submit {
	margin: 0 auto;
	border-radius: 50rpx;
	background-color: #F2D86D;
	width: 686rpx;
	height: 100rpx;
	text-align: center;
	line-height: 100rpx;
	font-size: 32rpx;
	font-weight: 500;
	color: #0D0D26;
	box-shadow: 0rpx 16rpx 55rpx -20rpx #f2d86d;
	
}


.tips {
	color: #D0CDCD;
}
.functionBacc {
	background-color: #F2D86D !important;
	box-shadow: 0rpx 16rpx 55rpx -20rpx #f2d86d;
}
</style>
