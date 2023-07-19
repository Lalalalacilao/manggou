<template>
	<view class="content">
		<!-- 置顶区 -->
		<view class="topping">
			<view class="status_bar"></view>
			<view class="function_area">
				<view class="back" @click="goBack">
					<image src="../../static/productDetails/向左1@2x.png" mode=""></image>
					<text>返回</text>
				</view>
			</view>
		</view>
		<scroll-view scroll-y="true" style="height: 1600rpx;" @scrolltolower="bottomLoading()">
			<!-- 轮播图 -->
			<uni-swiper-dot :dots-styles="dotsStyles" :info="productDetali.imgUrl" :current="current" :mode="mode">
				<swiper class="swiper-box" @change="change">
					<swiper-item v-for="(item ,index) in productDetali.imgUrl" :key="index">
						<image :src="item" mode=""></image>
					</swiper-item>
				</swiper>
			</uni-swiper-dot>

			<view class="product_intr">
				<view class="title">
					{{productDetali.goodsName }}{{isLimit ? "..." : ""}}
				</view>
				<view class="releateIntr clear">
					<view class="price float_left">
						￥<text>
							{{productDetali.price}}
						</text>
					</view>
					<view class="way float_left">
						自提
					</view>
					<view class="share float_right" @click="share">
						<image src="../../static/productDetails/分享 2.png" mode=""></image>
					</view>
				</view>
				<view class="intr">
					{{productDetali.introduction}}
				</view>
				<view class="date">
					<image src="../../static/productDetails/分享 2.png" mode=""></image>{{productDetali.date}}发布
				</view>
			</view>
			
			<view class="releaseUser clear">
				<view class="head float_left" @click="personalIntr(productDetali.userId)">
					<image :src="productDetali.userAvatar" mode=""></image>
				</view>
				<view class="middle float_left">
					<view class="nickname" @click="personalIntr(productDetali.userId)">
						{{productDetali.userName}}
					</view>
					<view class="releaseDate">
						{{productDetali.release}}&nbsp;发布
					</view>
				</view>
				<view class="consult float_right" @click="consult">
					咨询
				</view>
			</view>
			
			<view class="comment_box clear">
				<view class="comment_box_head float_left">
					<image :src="currentUser.userAvatar" mode=""></image>
				</view>
				<input class="float_left" type="text" placeholder="说点什么吧~">
			</view>
			
			<!-- 评论 -->
			<view class="comment">
				<view class="comment_item" v-for="(item,index) in comment" :key="item.id" v-if="item.isFirst">
					<!-- 首条评论 -->
					<view class="first clear">
						<view class="head float_left" @click="personalIntr(item.user.userId)">
							<image :src="item.user.head" mode=""></image>
						</view>
						<view class="relate float_left">
							<view class="nickname clear" @click="personalIntr(item.user.userId)">
								<view class="first_text float_left">
									{{item.user.nickname}}
								</view>
								<view class="mark float_left" v-if="item.user.userId === productDetali.releaseUser.id">
									作者
								</view>
							</view>
							<view class="remark">
								{{item.remark}}
							</view>
							<view class="record clear">
								<view class="date float_left">
									{{item.sendTime}}
								</view>
								<view class="position float_left">
									{{item.user.position}}
								</view>
							</view>
						</view>
					</view>
					<!-- 回复信息 -->
					<view class="reply">
						<view class="reply_item clear" v-for="(replyItem,index) in item.reply" :key="replyItem.id">
							<view class="head float_left" @click="personalIntr(replyItem.user.userId)">
								<image :src="replyItem.user.head" mode=""></image>
							</view>
							<view class="relate float_left">
								<view class="nickname clear" @click="personalIntr(replyItem.user.userId)">
									<view class="first_text float_left">
										{{replyItem.user.nickname}}
									</view>
									<view class="mark float_left" v-if="replyItem.user.userId == productDetali.releaseUser.id">
										作者
									</view>
								</view>
								<view class="remark">
									{{replyItem.remark}}
								</view>
								<view class="record clear">
									<view class="date float_left">
										{{replyItem.sendTime}}
									</view>
									<view class="position float_left">
										{{replyItem.user.position}}
									</view>
								</view>
							</view>
						</view>
					</view>
					
					
					
				</view>
			</view>
			
			<!-- 推荐 -->
			<view class="recommend">
				<view class="title">
					你可能感兴趣的
				</view>
				<view class="recommend_show clear">
					<view class="recommend_item float_left" v-for="(item,index) in recommendPro" :key="item.id" @click="recommend(item.id)">
						<view class="preview">
							<image :src="item.imgUrl" mode="widthFix"></image>
						</view>
						<view class="recommend_intr">
							{{item.introduction}}
						</view>
						<view class="recommend_user clear">
							<view class="recommend_head float_left">
								<image :src="item.releaseUser.head" mode=""></image>
							</view>
							<view class="recommend_nickname float_left">
								{{item.releaseUser.nickname}}
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="null">
				{{loading}}
			</view>
			<view class="fill">
				
			</view>
			
		</scroll-view>
		<!-- 底部功能区 -->
		<view class="bottom_funciton" @click="contactMe">
			联系我
		</view>
		
		
		
		
		
		
		
		
		
	</view>
</template>

<script>
const app = getApp();
export default {
	data() {
		return {
			// 产品信息
			productDetali:{
				// id: 1001,
				// image: ["../../static/productDetails/341003d19f8862a8adb8bbd0b709df3@2x.png","../../static/productDetails/341003d19f8862a8adb8bbd0b709df3@2x.png"],
				// title: "欧式餐桌啊欧式餐桌啊欧式餐桌啊欧式餐桌啊欧式餐桌啊欧式餐桌啊欧式餐桌啊欧式餐桌啊欧式餐桌啊欧式餐桌啊",
				// price: 1200,
				// way: "自提",
				// intr: "古典欧式餐桌基本功能超过大值就是地位的象征。奢华欧式餐桌的靡靡之味，可让人深刻感受到古典主义家饰中实用与美观的完美结合，绝妙的家饰搭配，超越动能之外的视觉盛宴，同样让享受不断升级。每一个细节都无时不强调着尊贵。色彩绚丽图案精美，材料认真挑选，工序精心打磨，而且这份尊贵是无可复制的，现在细节处理的手法是经过历史锤炼的经典，所以有一种浓郁的气息。",
				// date: "3小时前",
				// releaseUser: {
				// 	id: 1002,
				// 	head: "../../static/productDetails/3bfdaebea5552b22dec7377488f3941@2x(1).png",
				// 	nickname: "Light Breeze",
				// 	releaseDate: "2023-06-08 12:00:00",
				// }
			},
			// 当前登录用户信息
			currentUser: {
				id: 1003,
				head: "../../static/productDetails/3bfdaebea5552b22dec7377488f3941@2x.png"
			},
			// 评论
			comment: [
				// {
				// 	id: 1001,
				// 	parentId: "",
				// 	remark:"我想要，可以支持线下交易吗？",
				// 	sendTime: "昨天 11:12",
				// 	user: {
				// 		userId: 1005,
				// 		head: "../../static/productDetails/56e99a5a4bfd64eb3f2394b607ca579@2x.png",
				// 		nickname: "香蕉于大菠萝",
				// 		position: "陕西"
				// 	},
				// },
				// {
				// 	id: 1002,
				// 	parentId: 1001,// 回复信息的父id
				// 	remark:"可以的，联系我就好。",
				// 	sendTime: "昨天 17:23",
				// 	user: {
				// 		userId: 1002,
				// 		nickname: "Light Breeze",
				// 		head: "../../static/productDetails/56e99a5a4bfd64eb3f2394b607ca579@2x.png",
				// 		position: "陕西"
				// 	},
				// },
				// {
				// 	id: 1003,
				// 	parentId: "",
				// 	remark:"这个怎么看看是不是正品？",
				// 	sendTime: "2023-01-23 11:12",
				// 	user: {
				// 		userId: 1005,
				// 		head: "../../static/productDetails/56e99a5a4bfd64eb3f2394b607ca579@2x.png",
				// 		nickname: "翠鸟先猪猪",
				// 		position: "陕西"
				// 	},
				// },
				// {
				// 	id: 1004,
				// 	parentId: 1001,
				// 	remark:"这个怎么看看是不是正品？",
				// 	sendTime: "2023-01-23 11:12",
				// 	user: {
				// 		userId: 1005,
				// 		head: "../../static/productDetails/56e99a5a4bfd64eb3f2394b607ca579@2x.png",
				// 		nickname: "翠鸟先猪猪",
				// 		position: "陕西"
				// 	},
				// },
				// {
				// 	id: 1005,
				// 	parentId: 1001,
				// 	remark:"这个怎么看看是不是正品？",
				// 	sendTime: "2023-01-23 11:12",
				// 	user: {
				// 		userId: 1005,
				// 		head: "../../static/productDetails/56e99a5a4bfd64eb3f2394b607ca579@2x.png",
				// 		nickname: "翠鸟先猪猪",
				// 		position: "陕西"
				// 	},
				// },
				// {
				// 	id: 1006,
				// 	parentId: 1001,
				// 	remark:"这个怎么看看是不是正品？",
				// 	sendTime: "2023-01-23 11:12",
				// 	user: {
				// 		userId: 1005,
				// 		head: "../../static/productDetails/56e99a5a4bfd64eb3f2394b607ca579@2x.png",
				// 		nickname: "翠鸟先猪猪",
				// 		position: "陕西"
				// 	},
				// }
			],
			// 推荐商品
			recommendPro: [],
			// 轮播图配置
			current: 0,
			mode: 'round',
			dotsStyles: {
				bottom: 90,
				border: "",
				selectedBorder: "",
				selectedBackgroundColor:"rgba(255, 255, 255, 1)",
				backgroundColor: "rgba(255, 255, 255, 0.6)"
			},
			// 标题字数控制
			isLimit: false,
			// 猜你喜欢分页变量
			pageNum_: 1,
			loading: ""
			
		};
	},
	methods: {
		// 返回
		goBack() {
			uni.navigateBack({
				delta: 1
			});
		},
		// 分享
		share() {
			
		},
		// 个人信息
		personalIntr(id) {
			console.log("查看个人信息");
		},
		contactMe() {
			console.log("联系我");
		},
		// 评论回复处理方法
		reply(comment) {
			for(let i = 0; i < comment.length; i++) {
				if(comment[i].parentId != "") {
					this.$set(comment[i],"isFirst",false);
				} 
				else {
					this.$set(comment[i],"isFirst", true);
					this.$set(comment[i],"reply",[]);
					comment[i].reply = comment.filter(item => item.parentId === comment[i].id);
				}
				
			}
			return comment;
		},
		// 轮播图设置
		change(e) {
			this.current = e.detail.current;
		},
		// 推荐
		recommend(id) {
			// this.selectOneGoods(id);
			var pages = getCurrentPages(); //获取所有页面的数组对象
			var currPage = pages[pages.length - 1]; //当前页面
			uni.redirectTo({
				url: "../../" + currPage.__route__ + "?id=" + id
			})
		},
		// 请求数据
		selectOneGoods(id) {
			app.globalData.selectOneGoods({
				id,
			}).then(res => {
				this.productDetali = res.data;
				this.dataHandle();
			}).catch(err => {
				uni.showToast({
					title: err.message,
					icon: "error"
				})
			})
		},
		// 数据处理逻辑
		dataHandle() {
			// 时间处理
			this.$set(this.productDetali,"release",`${this.productDetali.createTime}`);
			// 标题字数处理
			if(this.productDetali.introduction.length > 25) {
				this.isLimit = true;
				this.productDetali.introduction = this.productDetali.introduction.slice(0,24);
			}
			// 图片url处理
			if(this.productDetali.imgUrl !== null) {
				this.productDetali.imgUrl = JSON.parse(this.productDetali.imgUrl);
			}
		},
		dataHandleAboutRecommendPro(obtain) {
			// 时间处理
			for(let i =  0 + this.recommendPro.length - obtain; i < this.recommendPro.length; i++) {
				// 图片处理
				if(this.recommendPro[i].imgUrl !== null) {
					this.recommendPro[i].imgUrl = JSON.parse(this.recommendPro[i].imgUrl)[0];
				}
			}
		},
		// 请求商品
		consult(pageNum = 1, pageSize = 10) {
			this.loading = "正在加载中哦~";
			app.globalData.goods({
				pageNum,
				pageSize
			}).then(res => {
				const nextLenght = this.recommendPro.length;
				this.recommendPro = this.recommendPro.concat(res.data.records);
				const obtain = res.data.records.length;
				this.pageNum_++;
				if(this.recommendPro.length === nextLenght) {
					this.loading = "没有了~";
				}
				// 数据处理逻辑
				if(obtain !== 0) {
					this.dataHandleAboutRecommendPro(obtain);
				}
			}).catch(err => {
				this.loading = err.message;
			});
		},
		// 触底加载事件
		bottomLoading() {
			if(this.loading !== "没有了~") {
				this.consult(this.pageNum_, 10)
			}
		},
	},
	onLoad(option) {
		this.selectOneGoods(option.id);
		this.consult();
		this.currentUser = uni.getStorageSync("userInfo");
		// 评论处理逻辑
		if(this.comment != null) {
			this.comment = this.reply(this.comment);
			for(let i = 0; i < this.comment.length; i++) {
				if(this.comment[i].isFirst === false) {
					this.comment.splice(i,1);
					i = 0;
				}
			}
		}
	},
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
.content {
	background-color: #F9F9F9;
}
// 顶部
.topping {
	position: fixed;
	top: 0;
	z-index: 99;
	.status_bar {
		width: 100%;
		height: 88rpx;
	}
	.function_area {
		padding: 14rpx 0 0 32rpx;
		font-size: 0;
		.back {
			width: 156rpx;
			height: 64rpx;
			background-color: rgba(255, 255, 255, 0.6);
			padding: 8rpx 28rpx  8rpx 22rpx;
			box-sizing: border-box;
			display: flex;
			border-radius: 32rpx;
			image {
				width: 32rpx;
				height: 32rpx;
				margin-right: 10rpx;
				margin-top: 8rpx;
			}
			text {
				font-family: PingFang SC-Regular, PingFang SC;
				font-size: 32rpx;
				color: #333333;
				font-weight: 400;
			}
		}
	}
}
// 轮播图
.swiper-box {
	position: relative;
	z-index: 0;
	width: 750rpx;
	height: 690rpx;
	image {
		width: 750rpx;
		height: 690rpx;
	}
}

.product_intr {
	position: relative;
	z-index: 1;
	padding: 42rpx 32rpx 26rpx 32rpx;
	background-color: #fff;
	margin-top: -150rpx;
	border-radius: 36rpx;
	font-size: 0;
	margin-bottom: 20rpx;
	.title {
		font-size: 44rpx;
		// font-weight: bold;
		color: #191D26;
		font-family: PingFang SC-Bold, PingFang SC;
		margin-bottom: 36rpx;
		// background-color: blue;
	}
	.releateIntr {
		margin-bottom: 58rpx;
		.price {
			padding-top: 4rpx;
			color: #191D26;
			font-weight: bold;
			font-family: DIN-Bold, DIN;
			font-size: 32rpx;
			margin-right: 44rpx;
			text {
				font-size: 52rpx;
			}
		}
		.way {
			font-size: 32rpx;
			color: #191D26;
			font-family: PingFang SC-Bold, PingFang SC;
			padding-top: 14rpx;
			position: relative;
			z-index: 1;
		}
		.way::after {
			content: "";
			background-color: #F2D86D;
			width: 64rpx;
			height: 12rpx;
			position: absolute;
			bottom: 0;
			left: 0;
			z-index: -1;
		}
		.share {
			padding: 18rpx;
			border-radius: 50%;
			background-color: #F1F1F1;
			image {
				width: 36rpx;
				height: 36rpx;
			}
		}
	}
	.intr {
		font-size: 32rpx;
		color: #333333;
		font-family: PingFang SC-Regular, PingFang SC;
		line-height: 60rpx;
		font-weight: 400;
	}
	.date {
		margin-top: 30rpx;
		font-size: 26rpx;
		color: #999999;
		font-family: PingFang SC-Regular, PingFang SC;
		line-height: 32rpx;
		vertical-align: middle;
		image {
			vertical-align: middle;
			width: 32rpx;
			height: 32rpx;
			margin-right: 12rpx;
		}
	}
}
// 发布者
.releaseUser {
	padding: 40rpx 32rpx;
	.head {
		margin-right: 24rpx;
		image {
			width: 96rpx;
			height: 96rpx;
		}
	}
	.middle {
		padding-top: 2rpx;
		font-size: 0;
		font-family: PingFang SC-Bold, PingFang SC;
		.nickname {
			font-size: 36rpx;
			color: #191D26;
			margin-bottom: 4rpx;
		}
		.releaseDate {
			font-size: 24rpx;
			color: #ACAEBA;
			font-weight: 500;
		}
	}
	.consult {
		width: 144rpx;
		height: 72rpx;
		font-size: 26rpx;
		background-color: #F2D86D;
		border-radius: 36rpx;
		text-align: center;
		line-height: 72rpx;
		margin-top: 12rpx;
	}
}
// 评论发布框
.comment_box {
	padding:40rpx 32rpx;
	font-size: 0;
	.comment_box_head {
		margin-right: 24rpx;
		image {
			width: 68rpx;
			height: 68rpx;
		}
	}
	input {
		width: 594rpx;
		height: 68rpx;
		box-sizing: border-box;
		padding-left: 24rpx;
		padding-right: 24rpx;
		font-size: 28rpx;
		color: #999999;
		font-family: PingFang SC-Regular, PingFang SC;
		font-weight: 400;
		background-color: #F6F6F6;
		border-radius: 36rpx;
	}
}

// 评论
.comment {
	padding: 0 32rpx;
	.comment_item {
		padding-bottom: 58rpx;
		font-size: 0;
		font-family: PingFang SC-Regular, PingFang SC;
		.first {
			margin-bottom: 22rpx;
		}
		.reply {
			margin-left: 92rpx;
			.reply_item {
				margin-bottom: 16rpx;
			}
		}
		.head {
			margin-top: 4rpx;
			margin-right: 24rpx;
			image {
				width: 68rpx;
				height: 68rpx;
			}
		}
		.reply {
			.head {
				image {
					width: 44rpx;
					height: 44rpx;
				}
			}
		}
		.relate {
			.first_text {
				font-size: 28rpx;
				color: #999999;
				font-weight: 400;
				margin-bottom: 4rpx;
				margin-right: 28rpx;
			}
			.mark {
				margin-top: 6rpx;
				font-size: 20rpx;
				color: #999999;
				font-weight: 400;
			}
		}
		.remark {
			font-size: 28rpx;
			color: #333333;
			font-weight: 400;
			margin-bottom: 6rpx;
		}
		.record {
			font-size: 24rpx;
			color: #999999;
			font-weight: 400;
		}
	}
}

// 推荐
.recommend {
	padding: 68rpx 10rpx 0 30rpx;
	font-size: 0;
	font-family: PingFang SC-Heavy, PingFang SC;
	.title {
		font-size: 36rpx;
		color: #0D0D26;
		margin-bottom: 32rpx;
	}
	.recommend_show {
		.recommend_item {
			width: 332rpx;
			// height: 480rpx;
			box-sizing: border-box;
			padding: 18rpx 18rpx 20rpx 18rpx;
			margin-bottom: 24rpx;
			margin-right: 22rpx;
			border-radius: 24rpx;
			.preview {
				margin-bottom: 22rpx;
				image {
					border-radius: 24rpx;
					width: 296rpx;
					// height: 296rpx;
				}
			}
			.recommend_intr {
				color: #333333;
				font-weight: 400;
				font-size: 24rpx;
				margin-left: 2rpx;
				margin-right: 6rpx;
				margin-bottom: 20rpx;
				background-color: #FFFFFF;
				
				overflow:hidden;
				text-overflow: ellipsis;
				-webkit-line-clamp: 2;
				display: -webkit-box;
				-webkit-box-orient: vertical;
			}
			.recommend_user {
				margin-left: 2rpx;
				.recommend_head {
					margin-right: 12rpx;
					image {
						width: 36rpx;
						height: 36rpx;
						border-radius: 18rpx;
					}
				}
				.recommend_nickname {
					margin-top: 2rpx;
					font-size: 24rpx;
					color: #666666;
					
					overflow:hidden;
					text-overflow: ellipsis;
					-webkit-line-clamp: 1;
					display: -webkit-box;
					-webkit-box-orient: vertical;
				}
			}
		}
	}
}

.null {
	height: 120rpx;
	line-height: 120rpx;
	text-align: center;
}
// 填充底部
.fill {
	height: 120rpx;
}


// 联系我
.bottom_funciton {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: #F2D86D;
	height: 120rpx;
	text-align: center;
	line-height: 120rpx;
	font-size: 32rpx;
	color: #0D0D26;
	font-family: PingFang SC-Bold, PingFang SC;
	font-weight: bold;
	
}
</style>
