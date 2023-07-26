<template>
	<view class="content">
		<view style="height: 88px;">
			<view class="top">
				<view class="status_bar"></view>
				<view class="title clear">
					<view class="back float_left" @click="back">
						<image
							src="https://mang-gou.tos-cn-beijing.volces.com/address%2F%E8%BF%94%E5%9B%9E%403x%402x.png"
							mode=""></image>
					</view>
					<view class="title_text float_left">
						修改订单
					</view>
				</view>
			</view>
		</view>
		<form class="form">
			<view class="title" v-if="type != 'user'">
				<input type="text" v-model="title" placeholder-class="" placeholder="请输入商品名称" maxlength="25">
			</view>
			<view class="describe">
				<textarea :maxlength="-1" :placeholder="type != 'user' ? '描述一下宝贝的品牌型号、货品来源' : '想说点什么？'"
					v-model="intr"></textarea>
			</view>
		</form>
		<view class="upload_image flex">
			<view class="pre_image_item" v-for="(item,index) in uploadPreviewImage" :key="item">
				<image :src="item" mode="aspectFill" @click="del(index)"></image>
			</view>
			<view class="upload_btn" @click="uploadImage">
				<image
					src="https://mang-gou.tos-cn-beijing.volces.com/release%2F%E7%BB%84%E4%BB%B6%2016%20%E2%80%93%202%402x.png"
					mode=""></image>
				添加更多<br>细节图卖的更快~
			</view>
		</view>
		<!-- <view class="position flex" v-if="type != 'user'">
			<view class="icon">
				<image src="https://mang-gou.tos-cn-beijing.volces.com/release%2F%E5%9C%B0%E5%9D%80%20(1)%402x.png" mode=""></image>
			</view>
			<view class="text">
				{{position}}
			</view>
			<view class="arrow">
				▶
			</view>
		</view> -->
		<view class="choose" v-if="type != 'user'">
			<view class="price choose_item clear">
				<view class="icon float_left">
					<image src="https://mang-gou.tos-cn-beijing.volces.com/release%2F%E4%BB%B7%E6%A0%BC%402x.png"
						mode="aspectFill"></image>
				</view>
				<view class="text float_left">
					价格
				</view>
				<view class="arrow float_right">
					<image src="https://mang-gou.tos-cn-beijing.volces.com/release%2F%E5%90%91%E5%8F%B31%402x(1).png"
						mode="aspectFill"></image>
				</view>
				<view class="price_num text_right float_right">
					<view class="float_left" style="margin-right: 10rpx;">¥</view>
					<input type="number" class="price float_left" v-model="price">
				</view>

			</view>
			<view class="delivery choose_item clear" @click="coding">
				<view class="icon float_left">
					<image src="https://mang-gou.tos-cn-beijing.volces.com/release%2F%E5%8F%91%E8%B4%A7%402x.png"
						mode=""></image>
				</view>
				<view class="text float_left">
					发货方式
				</view>
				<view class="arrow float_right">
					<image src="https://mang-gou.tos-cn-beijing.volces.com/release%2F%E5%90%91%E5%8F%B31%402x(1).png"
						mode="aspectFill"></image>
				</view>
				<view class="postage text_right float_right">
					邮费(运费未填)
				</view>
			</view>
		</view>
		<view class="btn flex">
			<view class="draft" @click="back">
				取消
			</view>
			<view class="release" @click="submit">
				提交
			</view>
		</view>
	</view>
</template>

<script>
	const app = getApp()
	export default {
		data() {
			return {
				type: "admin",
				position: "xx街道",
				uploadPreviewImage: [],
				intr: "",
				title: "",
				price: "0.00",
				id: 0
			}
		},
		onLoad(options) {
			this.id = options.id
			app.globalData.getGoodInfo({
				id: options.id
			}).then(res => {
				console.log(res);
				this.uploadPreviewImage = JSON.parse(res.data.imgUrl)
				this.title = res.data.goodsName
				this.intr = res.data.introduction
				this.price = res.data.price / 100
			}).catch(err => {
				console.log(err);
			})
		},
		methods: {
			// 返回
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			coding() {
				uni.showToast({
					title: '奋力开发中~',
					icon: 'error'
				})
			},
			// 删除图片
			del(index) {
				uni.showModal({
					title: '提示',
					content: '确定删除吗？',
					success: function(res) {
						if (res.confirm) {
							this.uploadPreviewImage = this.uploadPreviewImage.filter((item, index1) => {
								return index1 !== index
							})
						}
					}.bind(this) //可处理uni.shuowModal的异步（即拿不到data里面数据的解决办法）
				});
			},
			// 上传图片
			uploadImage() {
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
								token: uni.getStorageSync("token"),
							},
							success: (res) => {
								console.log(res);
								this.uploadPreviewImage.push(JSON.parse(res.data).url);
							},
							fail: (err) => {
								uni.showToast({
									title: err.message,
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
			// 提交修改
			submit() {
				if(this.uploadPreviewImage.length === 0) {
					uni.showToast({
						title:'请上传图片',
						icon:'error'
					})
					return
				}else if(this.title === '') {
					uni.showToast({
						title:'请填写商品名称',
						icon:'error'
					})
					return
					
				}else if(this.intr === '') {
					uni.showToast({
						title:'请填写商品简介',
						icon:'error'
					})
					return
				}else if (this.price === '0.00' || this.price === '') {
					uni.showToast({
						title:'请填写商品价格',
						icon:'error'
					})
					return
				}
				
				app.globalData.modifyGoodInfo({
					id: this.id,
					goodsName: this.title,
					introduction: this.intr,
					price:+this.price * 100,
					imgUrl:JSON.stringify(this.uploadPreviewImage)
				}).then(res => {
					if(res.status === 0) {
						uni.navigateBack({
							delta:1
						})
					}
				}).catch(err => {
					console.log(err);
				})
			}
		}
	}
</script>

<style scoped lang="less">
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
		width: 100%;
		height: 88rpx;
	}

	.fill {
		height: 176rpx;
	}

	.content {

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

		form {
			display: block;
			padding-left: 32rpx;
			padding-right: 24rpx;

			.title_place {
				color: #D0CDCD;
			}

			.title {
				border-bottom: 2rpx solid #F4F4F4;

				input {
					padding-top: 42rpx;
					padding-bottom: 40rpx;
					font-size: 40rpx;
				}
			}

			.describe {
				textarea {
					width: 100%;
					height: 242rpx;
					padding-top: 40rpx;
					padding-bottom: 40rpx;
				}
			}
		}

		.upload_image {
			// justify-items: center;
			flex-wrap: wrap;
			// padding: 0 32rpx;
			padding-left: 32rpx;
			margin-bottom: 36rpx;
			font-size: 0;

			view {
				width: 216rpx;
				height: 216rpx;
				margin-right: 16rpx;
				margin-bottom: 16rpx;

				image {
					width: 100%;
					height: 100%;
					border-radius: 12rpx;
				}
			}

			.upload_btn {
				text-align: center;
				font-family: PingFang HK-Regular, PingFang HK;
				font-size: 24rpx;
				color: #BDBFC1;
				padding-top: 74rpx;
				box-sizing: border-box;
				background-color: #F6F6F6;

				image {
					width: 18rpx;
					height: 18rpx;
				}

				._br {
					height: 0;
					margin: 0;
				}
			}
		}

		.position {
			width: 208rpx;
			height: 56rpx;
			box-sizing: border-box;
			// display: flex;
			// justify-content: space-around;
			padding: 10rpx 0;
			margin-left: 32rpx;
			font-size: 0;
			border-radius: 28rpx;

			.icon {
				margin-right: 8rpx;

				image {
					width: 36rpx;
					height: 36rpx;
				}
			}

			.text {
				line-height: 36rpx;
				font-size: 26rpx;
				color: #999999;
				margin-right: 14rpx;
			}

			.arrow {
				font-size: 25rpx;
				line-height: 36rpx;
				color: #999999;
			}
		}

		.choose {
			margin-top: 30rpx;
			margin-bottom: 58rpx;
			font-size: 0;

			.choose_item {
				padding: 38rpx 36rpx 38rpx 32rpx;

				.icon {
					margin-right: 16rpx;

					image {
						width: 42rpx;
						height: 42rpx;
					}
				}

				.text {
					font-size: 30rpx;
					color: #333333;
					font-family: PingFang HK-Semibold, PingFang HK;
					font-weight: 600;
				}

				.arrow {
					margin-top: 8rpx;

					image {
						width: 28rpx;
						height: 28rpx;
					}
				}

				.text_right {
					margin-right: 16rpx;
				}
			}

			.price {
				border-bottom: 2rpx solid #F8F8F8;

				.price_num {
					font-size: 32rpx;
					color: #EA402B;
					font-family: PingFang HK-Semibold, PingFang HK;
					font-weight: 600;

					input {
						width: 100rpx;
					}
				}
			}

			.postage {
				font-family: PingFang HK-Regular, PingFang HK;
				font-size: 30rpx;
				color: #999999;
			}

		}

		.flex {
			display: flex;
		}

		.btn {
			// padding-left: 40rpx;
			justify-content: center;
			font-size: 0;

			view {
				width: 324rpx;
				height: 100rpx;
				border-radius: 50rpx;
				text-align: center;
				line-height: 100rpx;
				color: #333333;
				font-size: 32rpx;
				font-family: PingFang HK-Regular, PingFang HK;
				font-weight: 400;
			}

			.draft {
				background-color: #fff;
				border: 2rpx solid #E0E0E0;
				margin-right: 24rpx;
			}

			.release {
				background-color: #f2d86d;
				box-shadow: 0rpx 16rpx 55rpx -20rpx #f2d86d;
			}
		}
	}
</style>