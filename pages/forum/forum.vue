<template>
	<view class="content">
		<view class="top">
			<view class="status_bar"></view>
			<view class="top_title clear">
				<view class="title float">论坛</view>
				<!-- <view class="top_release float" @click="topRelease">
					<image src="https://mang-gou.tos-cn-beijing.volces.com/forum%2F%E6%B8%85%E9%99%A4%402x.png" mode=""></image>
					<text>发布</text>
				</view> -->
			</view>
		</view>
		<view class="fill">
			
		</view>
		<scroll-view class="show_list" scroll-y="true" @scrolltolower="bottomLoading">
			<!-- 展示列表项 -->
			<view class="list_item" 
				v-for="(item,index) in prcductList" 
				:key="item.id"
			>
				<!-- 上方用户信息 -->
				<view class="info clear">
					<view class="head float">
						<image :src="item.userAvatar" mode="aspectFill"></image>
					</view>
					<view class="date_nick float">
						<view class="nickname">
							{{item.userName}}
						</view>
						<view class="date">
							{{item.release}}
						</view>
					</view>
				</view>
				<!-- 介绍信息 -->
				<view class="intr">
					<view :class="item.showHide? 'partIntr' : ''">
						<text class="showHideBtn" v-if="item.showHide" @click="isShowMoreFn(item)">展开</text>
						{{item.introduction}}
					</view>
				</view>
				<!-- 展示图片 -->
				<view class="preview clear">
					<image v-if="item.imgs != null" class="float" v-for="(img,index) in item.imgs" :key="index"
						:style=" index > 5 ? `display: ${item.previewImg}`  : 'display: block'" :src="img"
						@click="clickImg(item.imgs,index)" :data-img="img" mode="aspectFill">
					</image>
					<view v-if="item.moreImg" class="moreImg" :style="isIphoneX ? 'right: 3rpx;' : ''"
						@click="moreImg(item)">+{{item.imgs.length - 6}}
					</view>
				</view>
				<!-- 下方操作区 -->
				<view class="buttom">
					<!-- <view class="past_time">
						{{item.howLong}}
					</view> -->
					<view class="operate clear">
						<view class="like float">
							<image v-if="item.isLike" src="https://mang-gou.tos-cn-beijing.volces.com/forum%2F%E7%82%B9%E8%B5%9E-2.png" alt="已点赞" @click="toggleLike(item,item.id,item.userId,item.likeCount)"></image>
							<image v-else src="https://mang-gou.tos-cn-beijing.volces.com/forum%2F%E7%BB%84%E4%BB%B6%2053%20%E2%80%93%201%402x.png" alt="未点赞" @click="toggleLike(item,item.id,item.userId,item.likeCount)"></image>
							<text class="operate_num">{{item.likeCount}}</text>
						</view>
						<!-- <view class="comment float">
							<image src="https://mang-gou.tos-cn-beijing.volces.com/forum%2F%E7%BB%84%E4%BB%B6%2055%20%E2%80%93%201%402x.png" mode=""></image>
							<text class="operate_num">42</text>
						</view>
						<view class="forward float">
							<image src="https://mang-gou.tos-cn-beijing.volces.com/forum%2F%E7%BB%84%E4%BB%B6%2054%20%E2%80%93%201%402x.png" mode=""></image>
							<text class="operate_num">42</text>
						</view>
						<view class="more">
							<image src="https://mang-gou.tos-cn-beijing.volces.com/forum%2F%E7%BB%84%E4%BB%B6%2056%20%E2%80%93%201%402x.png" mode=""></image>
						</view> -->
					</view>
				</view>
				
<!-- 				<view class="delete" v-if="item.delete" @click="deleteThis(item.id)">
					删除
				</view> -->
			</view>
			<view class="loading">
				{{loading}}
			</view>
		</scroll-view>

		<!-- 侧边发布按钮 -->
		<view class="side_release" @click="sideRelease">
			<image src="https://mang-gou.tos-cn-beijing.volces.com/forum%2F%E7%BB%84%E4%BB%B6%2077%20%E2%80%93%201%402x.png" mode="aspectFit"></image>
			<view>发动态</view>
		</view>



		<view class="fill_bottom">
			
		</view>

		<tabBar routePath='/pages/forum/forum'></tabBar>
	</view>
</template>

<script>
	import moment from "moment"
	const app = getApp();
	export default {
		data() {
			return {
				prcductList: [],
				// 图片展开按钮适配
				isIphoneX: false,
				pageNum_: 1,
				loading: "",
				likenow:true,
				id:null,
				msg:null,
				userId:24,
				isLike:null
			};
		},
		methods: {
			// 点赞/取消点赞
			toggleLike(item,id,userId,likeCount) {
				item.isLike = !item.isLike;
				console.log( item.isLike,id,userId);
				if(item.isLike == true ){
					item.likeCount++;
					app.globalData.add({
						likedId : id,
						userId :this.userId,
						likedUserId :userId
					}).then(res => {
						console.log(res,'点赞成功');
					}).catch(err => {
						console.log(err,'err----');
					})
				}else{
					item.likeCount--;
					app.globalData.cancel({
						likedId : id,
						userId :this.userId,
					}).then(res => {
						console.log(res,'取消点赞');
					}).catch(err => {
						console.log(err,'err----');
					})
				}
			},
			topRelease() {
				console.log("顶部发布按钮");
				uni.navigateTo({
					url: "/pages/release/release"
				})
			},
			moreImg(item) {
				console.log("显示更多图片");
				// console.log(e);
				item.previewImg = "block";
				item.moreImg = false;
			},
			isShowMoreFn(item) {
				item.showHide = !item.showHide;
				item.switch = !item.switch;
			},
			// 点击图片放大预览
			clickImg(imgs,index) {
				wx.previewImage({
					urls: imgs, //需要预览的图片http链接列表，多张的时候，url直接写在后面就行了
					current: imgs[index], // 当前显示图片的http链接，默认是第一个
					success: function(res) {},
					fail: function(res) {},
					complete: function(res) {},
				})
			},
			// 触底加载事件
			bottomLoading() {
				if(this.loading !== "没有了~") {
					this.consult(this.pageNum_, 10)
				}
			},
			// 查询帖子
			consult(pageNum = 1, pageSize = 10, userId = this.userId) {
				this.loading = "正在加载中哦~";
				app.globalData.getCommunity({pageNum,pageSize,userId}).then(res => {
					console.log(res,'-----');
					const nextLenght = this.prcductList.length;
					const obtain = res.data.records.length;
					this.prcductList = this.prcductList.concat(res.data.records);
					this.pageNum_++;
					if(this.prcductList.length != nextLenght) {
						this.showHide(obtain);
					} else {
						this.loading = "没有了~";
					}
				}).catch(err => {
					this.loading = err.message;
				})
			},
			// 数据处理
			showHide(obtain) {
				console.log(this.prcductList);
				for (let i = this.prcductList.length - obtain; i < this.prcductList.length; i++) {
					// 文字展开配置
					if (this.prcductList[i].introduction != null && (((/[\u4e00-\u9fa5]/.test(this.prcductList[i].introduction) && this.prcductList[i].introduction.length > 85) || this.prcductList[i].introduction.length > 170))) {
						this.$set(this.prcductList[i], "showHide", true);
					} else {
						this.$set(this.prcductList[i], "showHide", false);
					}
					// 图片处理
					if(this.prcductList[i].imgs != undefined) {
						this.prcductList[i].imgs = JSON.parse(this.prcductList[i].imgs);
					}
					// 图片展开配置
					if (this.prcductList[i].imgs !== undefined && this.prcductList[i].imgs.length > 5) {
						this.$set(this.prcductList[i], "moreImg", true);
					} else {
						this.$set(this.prcductList[i], "moreImg", false);
					}
					this.$set(this.prcductList[i], "previewImg", "none");
					// 时间处理
					if(this.prcductList[i].createTime != null) {
						this.$set(this.prcductList[i],"release",moment(this.prcductList[i].createTime).format("YYYY-MM-DD"));
					}
				}
			},
			// 侧边发布按钮
			sideRelease() {
				uni.navigateTo({
					url: "/pages/release/release?type=user",
				})
			},
		},
		onReady() {
			// 数据处理展开
			uni.getSystemInfo({
				success: (res) => {
					this.systemInfo = res
					this.phoneSystem = res.platform //手机型号 Android、ios
					if (this.systemInfo.model === "iPhone X") {
						this.isIphoneX = true;
					}
				}
			})
		},
		onShow() {
			this.prcductList = [];
			this.loading = "";
			this.pageNum_ = 1;
			this.consult();
		},
		onLoad() {
			this.userInfo = uni.getStorageSync("userInfo");
			this.userId = this.userInfo.id
		}
	}
</script>

<style lang="scss">
	// 通用设置
	.float {
		float: left;
	}

	.clear {
		overflow: hidden;
		content: "";
		clear: left;
	}
	
	.fill {
		height: 176rpx;
	}
	// 顶部
	.top {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 1;
		padding-left: 32rpx;
		background: linear-gradient(#F5DF9C, #F2D86D);

		.status_bar {
			height: 88rpx;
		}

		.top_title {
			height: 88rpx;
			display: flex;
			align-items: center;
			box-sizing: border-box;
			padding-bottom: 18rpx;

			.title {
				font-size: 44rpx;
				color: #0D0D26;
				font-family: PingFang HK-Semibold, PingFang HK;
				font-weight: 600;
				margin-right: 24rpx;
			}

			.top_release {
				display: flex;
				justify-content: space-between;
				font-size: 0;
				box-sizing: border-box;
				width: 136rpx;
				height: 60rpx;
				background-color: #FFF3C1;
				border-radius: 30rpx 30rpx 30rpx 30rpx;
				border: 1rpx solid #fff;
				padding: 10rpx 20rpx;

				image {
					width: 32rpx;
					height: 32rpx;
					// margin-right: 8rpx;
					margin-top: 4rpx;
					margin-bottom: 4rpx;
				}

				text {
					color: #785307;
					font-size: 28rpx;
					font-weight: 500rpx;
				}
			}
		}
	}


	.show_list {
		background-color: #f9f9f9;
		height: 1252rpx;
		.list_item {
			padding: 40rpx 30rpx 26rpx 32rpx;
			margin-bottom: 20rpx;
			font-family: PingFang HK-Regular, PingFang HK;
			background-color: #fff;
			font-size: 0;
			position: relative;
			.info {
				margin-bottom: 30rpx;

				image {
					width: 80rpx;
					height: 80rpx;
					border-radius: 50%;
				}

				.date_nick {
					margin-left: 20rpx;

					.nickname {
						font-size: 28rpx;
						color: #484848;
						font-weight: 500;
					}

					.date {
						font-size: 26rpx;
						color: #BFBFBF;
					}
				}

			}

			.intr {
				margin-bottom: 20rpx;
				color: #333333;
				font-weight: 400;
				width: 656rpx;
				// height: 168rpx;
				font-size: 30rpx;
				line-height: 40rpx;

				clear: right;
				overflow: hidden;
				content: "";

				.partIntr {
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 4;
				}

				.partIntr::before {
					content: '';
					float: right;
					width: 1rpx;
					height: 150rpx;
				}

				.showHideBtn {

					float: right;
					clear: both;
					font-family: PingFang SC-Medium, PingFang SC;
					height: 42rpx;
					margin-top: -35rpx;
					margin-right: 23rpx;
					color: #0D0D26;
					font-weight: bold;
					font-size: 30rpx;
					cursor: pointer;
					// white-space: pre-wrap;
					// word-break: break-word;
				}

			}

			.preview {
				margin-bottom: 32rpx;
				position: relative;

				image {
					width: 224rpx;
					height: 224rpx;
					// border-radius: 12rpx  12rpx  12rpx  12rpx;
					margin-right: 8rpx;
					margin-bottom: 8rpx;
				}

				image:nth-child(1) {
					border-radius: 12rpx 0rpx 0rpx 0rpx;
				}

				image:nth-child(2) {
					border-radius: 0rpx 0rpx 0rpx 0rpx;
				}

				image:nth-child(3) {
					border-radius: 0rpx 12rpx 0rpx 0rpx;
					margin-right: 0;
				}

				image:nth-child(4) {
					border-radius: 0rpx 0rpx 0rpx 12rpx;
				}

				image:nth-child(5) {
					border-radius: 0rpx 0rpx 0rpx 0rpx;
				}

				image:nth-child(6) {
					// position: relative;
					border-radius: 0rpx 0rpx 12rpx 0rpx;
					margin-right: 0;
				}
				image:last-child {
					margin-right: 0;
				}
				.moreImg {
					position: absolute;
					bottom: 8rpx;
					right: 8rpx;
					width: 224rpx;
					height: 224rpx;
					border-radius: 0rpx 0rpx 12rpx 0rpx;
					background-color: rgba(51, 51, 51, 0.6);
					font-size: 56rpx;
					font-family: PingFang SC-Medium, PingFang SC;
					font-weight: 500;
					color: #FFFFFF;
					text-align: center;
					line-height: 224rpx;
				}
			}

			.buttom {

				// margin-bottom: 26rpx;
				.past_time {
					color: #BFBFBF;
					font-size: 24rpx;
					margin-bottom: 26rpx;
				}

				.operate {
					view {
						margin-right: 102rpx;
						display: flex;
						align-items: center;

						image {
							width: 44rpx;
							height: 44rpx;
							margin-right: 8rpx;
						}

						.operate_num {
							font-size: 24rpx;
							color: #999999;
						}
					}

					.more {
						float: right;
						margin-right: 0;
						height: 44rpx;
						line-height: 44rpx;
						position: relative;
						image {
							width: 36rpx;
							height: 8rpx;
						}
						
					}
					
					

				}
			}

		}

	}

	// 侧边 发布按钮
	.side_release {
		position: fixed;
		right: 0rpx;
		top: 1224rpx;
		width: 144rpx;
		height: 112rpx;
		border-radius: 56rpx 0rpx 0rpx 56rpx;
		background-color: rgba(51, 51, 51, 0.6);
		box-sizing: border-box;
		padding: 10rpx 32rpx 6rpx 46rpx;
		font-size: 0;
		text-align: center;

		image {
			width: 60rpx;
			height: 60rpx;
		}

		view {
			text-align: center;
			font-family: PingFang HK-Regular, PingFang HK;
			font-size: 22rpx;
			color: #fff;
		}
	}


.delete {
	position: absolute;
	z-index: 99;
	top: 328rpx;
    right: 33rpx;
	height: 50rpx;
	width: 150rpx;
	// color: #999999;
	color: #000000;
	font-size: 24rpx;
	text-align: center;
	line-height: 50rpx;
	border: 2rpx solid #cccccc;
	border-radius: 12rpx;
}


.loading {
	height: 156rpx;
	text-align: center;
	line-height: 156rpx;
	font-size: 26rpx;
	color: #333333;
}
.fill_bottom {
	height: 216rpx;
}
</style>