<template>
	<view class="content">
		<!-- 上方 -->
		<view class="top">
			<view class="status_bar"></view>
			<view class="title">
				<image src="https://mang-gou.tos-cn-beijing.volces.com/index%2FMangGou%403x.png"></image>
			</view>
			<view class="search">
				<input class="input" type="text" placeholder="搜索你感兴趣的内容" v-model="keyWord">
				<view class="btn" @click="search">
					<image src="https://mang-gou.tos-cn-beijing.volces.com/index%2F%E7%BB%84%E4%BB%B6%2029%20%E2%80%93%206%403x.png" mode="" ></image>
				</view>
			</view>
			<view class="nav">
				<view class="nav_item guess_like" :class="curr == 0 ? 'active' : ''" data-index="0" @click="setCurr">
					<view class="text">热卖商品</view>
					<view class="line"></view>
				</view>
				<view class="nav_item new_release" :class="curr == 1 ? 'active' : ''" data-index="1" @click="setCurr">
					<view class="text">最新发布</view>
					<view class="line"></view>
				</view>
			</view>
		</view>
			
		<!-- 下方 -->
		<swiper  style="height: 1012rpx;" class="buttom" :current="curr" @change="setCurr">
			
			<!-- 热卖商品 -->
			<swiper-item>
				<scroll-view scroll-with-animation="true" scroll-y="true" style="height:1012rpx;" @scrolltolower="specialColumnBottomLoading()">
					<view class="banner">
						<image src="https://mang-gou.tos-cn-beijing.volces.com/index%2F%E7%BB%84%E4%BB%B6%2017%20%E2%80%93%201%403x.png" mode="widthFix"></image>
					</view>
					<!-- 展示列表 -->
					<view class="pdt_show" >
						<view class="pdt_item" v-for="item in specialColumn" :key="item.id" @click="specialColumnProductDetails(item)">
							<view class="pdt_top">
								<image :src="item.imgUrl" mode=""></image>
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
						</view>
					</view>
					<view class="loading">
						{{specialColumnLoading}}
					</view>
				</scroll-view>
			</swiper-item>
			
			
			
			
			
			
			
			<!-- 最新发布 -->
			<swiper-item>
				<scroll-view scroll-with-animation="true" scroll-y="true" style="height:1012rpx;" @scrolltolower="bottomLoading()">
					<view class="banner">
						<image src="https://mang-gou.tos-cn-beijing.volces.com/index%2F%E7%BB%84%E4%BB%B6%2017%20%E2%80%93%201%403x.png" mode="widthFix"></image>
					</view>
					<!-- 展示列表 -->
					<view class="pdt_show" >
						
						<view class="pdt_item" v-for="item in productList" :key="item.id" @click="productDetails(item)">
							<view class="pdt_top">
								<image :src="item.imgUrl" mode=""></image>
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
						</view>
					</view>
					<view class="loading">
						{{loading}}
					</view>
				</scroll-view>
			</swiper-item>
			
			
			
			
			
			
		</swiper>

		<tabBar routePath = '/pages/index/index'></tabBar>
	</view>
</template>

<script>
	import moment from "moment";
	const app = getApp();
	export default {
		data() {
			return {
				// 当前登录用户
				user: {},
				
				// 用户商品
				productList: [],
				// 专栏商品
				specialColumn: [],
				// 菜单控制
				curr: 0,
				stockListHeight: 0,
				// 文本框内容
				keyWord: "",
				
				// 用户商品分页控制
				loading: "",
				pageNum_: 1,
				// 专栏商品分页控制
				specialColumnLoading: "",
				specialColumnPageNum_: 1
			}
		},
		methods: {
			// 联动nav————swiper-item
			setCurr(e) {
				this.curr = e.detail.current || e.currentTarget.dataset.index || 0;
				// console.log("@@@",this.curr);
			},
			// 搜索
			search() {
				uni.showToast({
					title: "暂未开放，敬请期待",
					icon: "none"
				})
				this.keyWord = "";
			},
			
			// 商品详情
			productDetails(item) {
				uni.navigateTo({
					url:"/pages/productDetalis/productDetalis?id=" + item.id
				});
			},
			// 专栏商品详情
			specialColumnProductDetails(item) {
				uni.navigateTo({
					url: "/pages/productDetalisMine/productDetalisMine?id=" + item.id
				});
			},
			// 请求用户商品
			consult(pageNum = 1, pageSize = 10) {
				this.loading = "正在加载中哦~";
				app.globalData.goods({
					pageNum,
					pageSize
				}).then(res => {
					const nextLenght = this.productList.length;
					this.productList = this.productList.concat(res.data.records);
					const obtain = res.data.records.length;
					this.pageNum_++;
					if(this.productList.length === nextLenght) {
						this.loading = "没有了~";
					}
					// 数据处理逻辑
					if(obtain !== 0) {
						this.dataHandle(obtain);
					}
				}).catch(err => {
					this.loading = err.message;
				})
			},
			// 数据处理逻辑
			dataHandle(obtain) {
				// 时间处理
				for(let i = 0 + this.productList.length - obtain; i < this.productList.length; i++) {
					const releaseDate = this.productList[i].createTime.split(" ");
					this.$set(this.productList[i],"release",`${releaseDate[0]}`);
					// 图片处理
					if(this.productList[i].imgUrl !== null) {
						this.productList[i].imgUrl = JSON.parse(this.productList[i].imgUrl)[0];
					}
				}
			},
			// 触底加载事件
			bottomLoading() {
				if(this.loading !== "没有了~") {
					this.consult(this.pageNum_, 10)
				}
			},
			
			
			
			// 请求专栏商品
			specialColumnProConsult(pageNum = 1, pageSize = 10) {
				this.specialColumnLoading = "正在加载中哦~";
				app.globalData.getSpecialColumnGoods({
					pageNum,
					pageSize
				}).then(res => {
					const nextLenght = this.specialColumn.length;
					this.specialColumn = this.specialColumn.concat(res.data.records);
					const obtain = res.data.records.length;
					this.specialColumnPageNum_++;
					if(this.specialColumn.length === nextLenght) {
						this.specialColumnLoading = "没有了~";
					}
					// 数据处理逻辑
					if(obtain !== 0) {
						this.specialColumnDataHandle(obtain);
					}
				}).catch(err => {
					this.specialColumnLoading = err.message;
				})
			},
			// 专栏商品数据处理逻辑
			specialColumnDataHandle(obtain) {
				// 时间处理
				for(let i = 0 + this.specialColumn.length - obtain; i < this.specialColumn.length; i++) {
					const releaseDate = this.specialColumn[i].createTime.split(" ");
					this.$set(this.specialColumn[i],"release",`${releaseDate[0]}`);
					// 图片处理
					if(this.specialColumn[i].imgUrl !== null) {
						this.specialColumn[i].imgUrl = JSON.parse(this.specialColumn[i].imgUrl)[0];
					}
				}
			},
			// 触底加载事件
			specialColumnBottomLoading() {
				if(this.specialColumnLoading !== "没有了~") {
					this.specialColumnProConsult(this.specialColumnPageNum_, 10)
				}
			},
		},
		onShow() {
			// 隐藏掉自带的底部导航栏
			uni.hideTabBar({});
			
			// 刷新最新发布
			this.productList = [];
			this.loading = "";
			this.pageNum_ = 1;
			this.consult();
			
			// 刷新热卖
			this.specialColumn = [];
			this.specialColumnLoading = "";
			this.specialColumnPageNum_ = 1;
			this.specialColumnProConsult();
			
			// 获取用户信息
			const userInfoThis = uni.getStorageSync("userInfo");
			if(userInfoThis !== "") {
				this.userInfo = userInfoThis;
				this.dataHandle();
			}
		}
	}
</script>

<style lang="scss">
	// 全局背景色
	.content {
		background: linear-gradient(#F5DF9C 0%, #F2D86D 100%);
	}
	// 上方功能区
	.top {
		// background: linear-gradient(#F5DF9C , #F2D86D); /* 标准的语法 */
		padding: 0rpx 32rpx;
		padding-bottom: 38rpx;
		.status_bar {
			width: 100%;
			height: 88rpx;
		}
		
		.title {
			image {
				overflow:hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				
				width: 186rpx;
				height: 60rpx;
				margin-top: 8rpx;
				// margin-left: 32rpx;
			}
		}
		.search {
			// overflow: hidden;
			// clear: all;
			// content: "";
			display: flex;
			input {
				width: 622rpx;
				height: 40rpx;
				padding: 22rpx 32rpx;
				background-color: #F5F5F5;
				margin: 36rpx 0rpx;
				border-radius: 16rpx 0 0 16rpx;
			}
			.btn {
				border-radius: 0 16rpx 16rpx 0;
				margin-top: 35rpx;
				background-color: #F5F5F5;;
				width: 93rpx;
				height: 86rpx;
				text-align: center;
				line-height: 100rpx;
				image {
					width: 28.59rpx;
					height: 29.76rpx;
				}
			}
		}
		.nav {
			content: "";
			clear: left;
			overflow: hidden;
			
		}
		.nav_item {
			float: left;

			.line {
				width: 100%;
				height: 3rpx;
				font-weight: bold;
				background-color: rgba(13, 13, 38, 0.6);
			}
			.text {
				margin: 22rpx 115rpx 22rpx 115rpx;
				font-size: 28rpx;
				color: rgba(13, 13, 38, 0.6);
				font-family: PingFang SC-Regular, PingFang SC;;
			}
			
		}
		.active {
			.text {
				margin-bottom: 20rpx;
				color: rgba(13, 13, 38, 1);
				font-weight: bold;
			}
			.line {
				height: 6rpx;
			}
		}
	}
	
	// 下方展示区
	swiper {
		height: 100vh;
		background-color: #F9F9F9;
		border-radius: 50rpx 50rpx 0 0;
		scroll-view {
			padding-bottom: 400rpx;
		}
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
				box-shadow: 0rpx 0rpx 20rpx 2rpx rgba(153,153,153,0.16);
				width: 336rpx;
				height: 566rpx;
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
					border-radius: 12rpx  12rpx  12rpx  12rpx;
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
					font-family:  PingFang SC-Regular, PingFang SC;;
					border-radius: 60rpx;
				}
			}
			.pdt_middle {
				font-family: PingFang SC-Medium, PingFang SC;
				margin-bottom: 12rpx;
				.intr {
					width: 298rpx;
					height: 80rpx;  
					overflow:hidden;
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
			
		}
		
		
		
		
		
	}
	
.loading {
	height: 156rpx;
	text-align: center;
	line-height: 156rpx;
	font-size: 26rpx;
	color: #333333;
}

</style>
