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
						我的发布
					</view>
				</view>
			</view>
		</view>
		<scroll-view scroll-with-animation="true" scroll-y="true" style="height:90vh;"
			@scrolltolower="specialColumnBottomLoading()">
			<!-- 展示列表 -->
			<view class="pdt_show">
				<view class="pdt_item" v-for="item in specialColumn" :key="item.id">
					<view class="pdt_top" @click="specialColumnProductDetails(item)">
						<image :src="item.imgUrl" mode="aspectFill"></image>
						<text>{{item.release}}发布</text>
					</view>
					<view class="pdt_middle">
						<text class="intr">{{item.introduction}}</text>
						<text class="price"><text>¥</text?>{{(item.price / 100).toFixed(2)}}</text>
					</view>
					<view class="user">
						<image :src="item.userAvatar"></image>
						<text class="nickname">{{item.userName}}</text>
						
					</view>
					<view class="opration">
						<view class="edit" @click="edit(item)">修改</view>
						<view class="del" @click="del(item)">删除</view>
					</view>
				</view>
			</view>
			<view class="loading">
				{{specialColumnLoading}}
			</view>
		</scroll-view>
	</view>
</template>

<script>
	const app = getApp();
	export default {

		data() {
			return {
				specialColumn: [],
				specialColumnLoading: "",
				userInfo: '',
				specialColumnPageNum_: 1
			}
		},
		methods: {
			// 返回
			back() {
				uni.navigateBack({
					delta:1
				})
			},
			// 触底加载事件
			specialColumnBottomLoading() {
				if (this.specialColumnLoading !== "没有了~") {
					this.specialColumnProConsult(this.specialColumnPageNum_, 10)
				}
			},
			// 专栏商品详情
			specialColumnProductDetails(item) {
				uni.navigateTo({
					url: "/pages/productDetalis/productDetalis?id=" + item.id
				});
			},
			// 请求专栏商品
			specialColumnProConsult(pageNum = 1, pageSize = 10) {
				this.specialColumnLoading = "正在加载中哦~";
				app.globalData.searchUserPublish({
					pageNum,
					pageSize,
					userId:this.userInfo.id
				}).then(res => {
					const nextLenght = this.specialColumn.length;
					this.specialColumn = this.specialColumn.concat(res.data.records);
					const obtain = res.data.records.length;
					this.specialColumnPageNum_++;
					if (this.specialColumn.length === nextLenght) {
						this.specialColumnLoading = "没有了~";
					}
					// 数据处理逻辑
					if (obtain !== 0) {
						this.specialColumnDataHandle(obtain);
					}
				}).catch(err => {
					this.specialColumnLoading = err.message;
				})
			},
			// 专栏商品数据处理逻辑
			specialColumnDataHandle(obtain) {
				// 时间处理
				for (let i = 0 + this.specialColumn.length - obtain; i < this.specialColumn.length; i++) {
					const releaseDate = this.specialColumn[i].createTime.split(" ");
					this.$set(this.specialColumn[i], "release", `${releaseDate[0]}`);
					// 图片处理
					if (this.specialColumn[i].imgUrl !== null) {
						this.specialColumn[i].imgUrl = JSON.parse(this.specialColumn[i].imgUrl)[0];
					}
				}
			},
			edit(item) {
				uni.navigateTo({
					url:'/pages/editMyPublish/editMyPublish?id=' + item.id
				})
			},
			del(item) {
				app.globalData.delGood({id:item.id}).then(res => {
					if(res.status === 0) {
						// 刷新热卖
						this.specialColumn = [];
						this.specialColumnLoading = "";
						this.specialColumnPageNum_ = 1;
						this.specialColumnProConsult();
					}
				}).catch(err => {
					console.log(err);
				})
			}
		},
		onLoad() {
			// 获取用户信息
			const userInfoThis = uni.getStorageSync("userInfo");
			if (userInfoThis !== "") {
				this.userInfo = userInfoThis;
			}
		},
		onShow() {
			// 刷新热卖
			this.specialColumn = [];
			this.specialColumnLoading = "";
			this.specialColumnPageNum_ = 1;
			this.specialColumnProConsult();
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
		background-color: #F9F9F9;

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

		scroll-view {
			.banner {
				margin-top: 32rpx;

				image {
					width: 750rpx;
					// height: 256rpx;
				}
			}

			.pdt_show {
				padding: 0 32rpx;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;

				.pdt_item {
					border-radius: 16rpx;
					box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(153, 153, 153, 0.16);
					width: 336rpx;
					height: 600rpx;
					background-color: #fff;
					padding: 22rpx 20rpx 24rpx 20rpx;
					box-sizing: border-box;
					margin-top: 20rpx;
					// margin-right: 14rpx;
				}

				.pdt_top {
					position: relative;
					margin-bottom: 24rpx;

					image {
						width: 296rpx;
						height: 312rpx;
						border-radius: 12rpx 12rpx 12rpx 12rpx;
					}

					text {
						// width: 248rpx;
						// height: 48rpx;
						background-color: rgba(0, 0, 0, 0.6);
						position: absolute;
						top: 248rpx;
						left: 24rpx;
						padding: 8rpx 16rpx;
						font-size: 22rpx;
						color: #FFFFFF;
						font-family: PingFang SC-Regular, PingFang SC;
						;
						border-radius: 60rpx;
					}
				}

				.pdt_middle {
					font-family: PingFang SC-Medium, PingFang SC;
					margin-bottom: 12rpx;

					.intr {
						width: 298rpx;
						height: 80rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						-webkit-line-clamp: 2;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						color: #666666;
						font-size: 28rpx;
						font-weight: 500;
					}

					.price {
						color: #0D0D26;
						font-size: 32rpx;
						font-weight: 600;

						text {
							font-size: 20rpx;
						}

					}
				}

				.user {
					// height: 40rpx;
					// line-height: 40rpx;
					font-size: 0;
					display: flex;

					image {
						width: 40rpx;
						height: 40rpx;
						border-radius: 50%;
						margin-right: 8rpx;
					}

					.nickname {
						height: 40rpx;
						line-height: 40rpx;
						color: #999999;
						font-size: 24rpx;
					}
					
				}
				.opration{
					width: 100%;
					height: 60rpx;
					line-height: 40rpx;
					margin-top: 10rpx;
					display: flex;
					.edit {
						width: 80rpx;
						height: 60rpx;
						line-height: 60rpx;
						color: #999999;
						font-size: 30rpx;
					}
					.del {
						width: 60rpx;
						height: 60rpx;
						line-height: 60rpx;
						color: #999999;
						font-size: 30rpx;
					}
				}

			}

			.loading {
				height: 156rpx;
				text-align: center;
				line-height: 156rpx;
				font-size: 26rpx;
				color: #333333;
			}



		}





	}
</style>