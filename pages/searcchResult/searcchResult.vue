<template>
	<view class="content">
		<view class="top">
			<view class="status_bar"></view>
			<view class="search clear">
				<view class="back float_left" @click="back">
					<image src="../../static/searchResult/fanhui@2x.png" mode=""></image>
				</view>
				<view class="search_box float_left">
					<view class="btn" @click="search">
						<image src="../../static/searchResult/sousuo-2@2x.png" mode=""></image>
					</view>
					<input type="text" v-model="keyWord">
				</view>
			</view>
		</view>
		
		<view class="product_show">
			暂未开放，敬请期待
			<!-- <view class="function_area clear">
				<view class="comprehensive fun_item float_left" :class="isSeleted[0] ? 'bold' : ''" @click="comprehensive">
					<text>综合</text>
					<image :class="{'rotate' : isRotate}" :src=" isSeleted[0] ? '../../static/searchResult/bolddown.png' : '../../static/searchResult/ruledown (2).png'" mode=""></image>
					<view class="comprehensive_page" :style="{'display' : isRotate ? 'block' : 'none'}">
						<view class="default" :class="{'bold' : comprehensiveShow === 0}" @click="comprehensive">
							<text>综合</text>
						</view>
						<view class="recent" :class="{'bold' : comprehensiveShow === 1}" @click.stop="recentLively">
							<text>最近活跃</text>
							
						</view>
						<view class="near" :class="{'bold' : comprehensiveShow === 2}" @click.stop="nearestToMe">
							<text>离我最近</text>
							
						</view>
					</view>
				</view>
				<view class="price fun_item float_left clear" @click="priceOrder">
					<view class="price_text float_left" :class="isSeleted[1] ? 'bold' : ''">
						<text>价格</text>
					</view>
					<view class="order float_left">
						<view class="ascending_order">
							<image :src="order.ascendingOrder ? '../../static/searchResult/boldUp.png' : '../../static/searchResult/ruleup.png'" mode=""></image>
						</view>
						<view class="descending_order">
							<image :src="order.descendingOrder ? '../../static/searchResult/bolddown.png' : '../../static/searchResult/ruledown.png'" mode=""></image>
						</view>
					</view>
				</view>
				<view class="release_date fun_item float_left" :class="isSeleted[2] ? 'bold' : ''" @click="releaseDate">
					<text>发布时间</text>
				</view>
				<view class="area fun_item float_left" :class="isSeleted[3] ? 'bold' : ''" @click="area">
					<text>区域</text>
					<image :class="{'rotate' : isArea}" :src="isSeleted[3] ? '../../static/searchResult/bolddown.png' : '../../static/searchResult/ruledown.png'" mode=""></image>
				</view>
			</view>
			<view class="product_preview clear">
				<view class="pre_item float_left" v-for="(item,index) in productList" :key="item.id" @click="productDetails(item.id)">
					<view class="image">
						<image :src="item.image" mode="widthFix"></image>
					</view>
					<view class="text">
						<view class="intr">
							{{item.intr}}
						</view>
						<view class="price">
							￥<text>{{item.price}}</text>
						</view>
					</view>
					<view class="user clear">
						<view class="head float_left">
							<image :src="item.user.head" mode=""></image>
						</view>
						<view class="nickname float_left">
							{{item.user.nickname}}
						</view>
					</view>
				</view>
			</view> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyWord: "",
				// 顶部功能区
				//综合
				isSeleted: [true,false,false,false],
				isRotate: false,
				comprehensiveShow: 0,
				// 价格
				order: {
					ascendingOrder: false,
					descendingOrder: false
				},
				// 区域
				isArea: false,
				
				
				// 商品数组
				productList: [
					{
						id: 1001,
						image: "../../static/searchResult/1@2x(1).png",
						intr: "宜家同款的全新升降桌，原价现2200自提。宜家同款的全新升降桌，原价现2200自提。",
						price: 1200,
						user: {
							head: "../../static/searchResult/1@2x(5).png",
							nickname: "月亮慢慢圆"
						}
					},
				],
			};
		},
		onLoad(option) {
			console.log(option);
			console.log(this);
			this.keyWord = option.keyWord;
			
		},
		methods: {
			// 返回上一页
			back() {
				uni.navigateBack({
					delta: 1
				});
				console.log("上一页");
			},
			// 综合
			comprehensive() {
				this.isSeletedEesetting();
				this.isSeleted.splice(0,1,true);
				this.isRotate = !this.isRotate;
			},
			recentLively() {
				this.comprehensiveShow = 1;
				// this.isRotate = false;
				console.log("最近活跃");
			},
			nearestToMe() {
				this.comprehensiveShow = 2;
				// this.isRotate = false;
				console.log("离我最近");
			},
			// 价格
			priceOrder() {
				this.isRotate = false;
				if(this.isSeleted[1] === false) {
					this.isSeletedEesetting();
					this.isSeleted.splice(1,1,true);
					this.order.ascendingOrder = true;
				}
				this.order.ascendingOrder = !this.order.ascendingOrder;
				this.order.descendingOrder = !this.order.descendingOrder;
				console.log(this.order);
			},
			
			// 发布时间
			releaseDate() {
				this.isRotate = false;
				this.isSeletedEesetting();
				this.isSeleted.splice(2,1,true);
			},
			// 区域
			area() {
				this.isRotate = false;
				this.isArea = !this.isArea;
				this.isSeletedEesetting();
				this.isSeleted.splice(3,1,true);
			},
			// 商品详情
			productDetails(id) {
				this.isRotate = false;
				const a = uni.navigateTo({
					url:"/pages/productDetalis/productDetalis?id=" + id,
				});
				console.log(id);
			},
			// 搜索
			search() {
				this.isRotate = false;
				console.log("搜索");
			},
			// 重置功能区控制数组
			isSeletedEesetting() {
				for(let i = 0; i < this.isSeleted.length; i++) {
					if(this.isSeleted[1] === true) {
						this.order.ascendingOrder = false;
						this.order.descendingOrder = false;
						console.log("@@");
					}
					console.log("!!!");
					this.isSeleted[i] = false;
				}

				console.log(this.order);
				console.log(this.isSeleted);
			}
			
		}
	}
</script>

<style lang="scss">
// 通用
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
	background-color: #F9F9F9;
}
.status_bar {
	width: 100%;
	height: 76rpx;
}
.top {
	margin-bottom: 16rpx;
	.search {
		padding: 26rpx 0 10rpx 14rpx;
		font-size: 0;
		.back {
			padding: 18rpx;
			image {
				width: 16rpx;
				height: 28rpx;
			}
		}
		
		.search_box {
			position: relative;
			// height: 64rpx;
			// line-height: 64rpx;
			.btn {
				position: absolute;
				top: 18rpx;
				left: 26rpx;
				image {
					width: 29rpx;
					height: 30rpx;
				}
			}
			input {
				background-color: #F6F6F6;
				box-sizing: border-box;
				// padding: 8rpx 14rpx;
				height: 64rpx;
				// line-height: 64rpx;
				width: 434rpx;
				font-size: 26rpx;
				padding-left: 70rpx;
				// padding-top: 14rpx;
				// padding-bottom: 14rpx;
				border-radius: 40rpx;
			}
		}
	}
}

.product_show {
	// padding: 0 32rpx;
	padding-left: 32rpx;
	padding-right: 10rpx;
	background-color: #fff;
	.function_area {
		display: flex;
		justify-content: space-around;
		padding: 24rpx 0;
		font-size: 0;
		
		.fun_item {
			font-size: 28rpx;
			display: flex;
			align-items: center;
			 image {
				 margin-left: 8rpx;
				 width: 13rpx;
				 height: 8rpx;
			 }
		}
		.comprehensive_page {
			position: absolute;
			top: 265rpx;
			left: 56rpx;
			z-index: 999;
			
			background-color: #fff;
			border-radius: 16rpx;
			padding: 10rpx 10rpx 14rpx 10rpx;
			box-shadow: 0rpx 6rpx 20rpx 2rpx rgba(51,51,51,0.4);
			view {
				width: 236rpx;
				height: 64rpx;
				line-height: 64rpx;
				text-align: center;
			}
		}
		.price_text {
			margin-right: 6rpx;
		}
		.order {
			view {
				font-size: 16rpx;
			}
			image {
				width: 12rpx;
				height: 7rpx;
			}
			.ascending_order {
				margin-top: 4rpx;
				margin-bottom: -10rpx;
			}
			.descending_order {
				margin-top: -10rpx;
			}
		}
	}
	
	.product_preview {
		padding-top: 8rpx;
		position: relative;
		z-index: 0;
		.pre_item {
			margin-bottom: 48rpx;
			margin-right: 22rpx;
			.image {
				position: relative;
				z-index: 0;
				margin-bottom: 20rpx;
				image {
					width: 332rpx;
				}
			}
			.text {
				font-family: PingFang SC-Regular, PingFang SC;
				width: 312rpx;
				margin-bottom: 16rpx;
				.intr {
					font-size: 24rpx;
					color: #333333;
					overflow:hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
					margin-bottom: 4rpx;
				}
				.price {
					font-size: 20rpx;
					text {
						font-size: 32rpx;
						font-weight: 800;
						color: #0D0D26;
					}
				}
			}
			.user {
				font-size: 0;
				.head {
					image {
						width: 40rpx;
						height: 40rpx;
						margin-right: 8rpx;
					}
					
				}
				.nickname {
					line-height: 40rpx;
					font-family: PingFang SC-Regular, PingFang SC;
					color: #999999;
					font-size: 24rpx;
				}
			}
		}
	}
	
}


.bold>text {
	font-weight: 800;
}
.rotate {
	transform: rotateX(180deg) !important;
	transition: all 0.5s;
}











</style>
