<template>
	<view class="content">
		<!-- 置顶区 -->
		<view class="topping">
			<view class="status_bar"></view>
			<view class="function_area">
				<view class="back" @click="goBack">
					<image src="https://mang-gou.tos-cn-beijing.volces.com/address%2F%E8%BF%94%E5%9B%9E%403x%402x.png" mode=""></image>
					<text>返回</text>
				</view>
			</view>
		</view>
		<scroll-view scroll-top="100rpx" scroll-y="true" style="height: 1600rpx;" scroll-with-animation="true" :scroll-top="scrollTop" @scrolltolower="bottomLoading()">
			<!-- 轮播图 -->
			<uni-swiper-dot :dots-styles="dotsStyles" :info="productDetali.imgUrl" :current="current" :mode="mode">
				<swiper class="swiper-box" @change="change">
					<swiper-item v-for="(item ,index) in productDetali.imgUrl" :key="index">
						<image :src="item" @click="viewImg(productDetali.imgUrl,index)" mode="aspectFit"></image>
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
							{{(productDetali.price / 100).toFixed(2)}}
						</text>
					</view>
					<view v-if="!productDetali.transportPrice" class="way float_left">
						自提
					</view>
					<view v-else class="way float_left">
						运费：￥{{productDetali.transportPrice}}
					</view>
					<button open-type="share" class="share float_right">
						<image src="https://mang-gou.tos-cn-beijing.volces.com/productDetail%2F%E5%88%86%E4%BA%AB%202.png" mode=""></image>
					</button>
				</view>
				<view class="intr">
					{{productDetali.introduction}}
				</view>
<!-- 				<view class="date">
					<image src="https://mang-gou.tos-cn-beijing.volces.com/productDetail%2F%E5%88%86%E4%BA%AB%202.png" mode=""></image>{{productDetali.date}}发布
				</view> -->
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
				<view class="consult float_right" @click="contactMe">
					咨询
				</view>
			</view>
			
			<view class="comment_box clear">
				<view class="comment_box_head float_left">
					<image :src="currentUser.userAvatar" mode=""></image>
				</view>
				<input 
					class="float_left" 
					type="text" 
					v-model="inputComment" 
					@confirm="releaseComment" 
					placeholder-class="comment_input" 
					placeholder="说点什么吧~"
				>
			</view>
			
			<!-- 评论 -->
			<view class="comment">
				<view 
					class="comment_item" 
					v-for="(item,index) in comment" 
					:key="item.id"
				>
					<!-- 首条评论 -->
					<view 
						class="first clear" 
						@click.stop="replyComment(item)"
						:id="'commit' + item.id" 
					>
						<view class="head float_left" @click.stop="personalIntr(item.userId)">
							<image :src="item.userAvatar" mode=""></image>
						</view>
						<view class="relate float_left">
							<view class="nickname clear" @click.stop="personalIntr(item.userId)">
								<view class="first_text float_left">
									{{item.userName}}
								</view>
								<view class="mark float_left" v-if="item.userId === productDetali.userId">
									作者
								</view>
							</view>
							<view class="remark">
								{{item.detail}}
							</view>
							<view class="record clear">
								<view class="date float_left">
									{{item.createTime}}
								</view>
							</view>
						</view>
					</view>
					<!-- 回复信息 -->
					<view class="reply">
						<view 
							class="reply_item clear" 
							v-for="(replyItem,index) in item.subComment" 
							:key="replyItem.id"
							@click.stop="replyComment(item,replyItem)"
							:id="'commit' + replyItem.id"
						>
							<view class="head float_left" @click.stop="personalIntr(replyItem.userId)">
								<image :src="replyItem.userAvatar" mode=""></image>
							</view>
							<view class="relate float_left">
								<view class="nickname clear" @click.stop="personalIntr(replyItem.userId)">
									<view class="first_text float_left">
										{{replyItem.userName}}
									</view>
									<view v-if="replyItem.replyUserName !== null" class="reply_reply float_left">
										▶{{replyItem.replyUserName}}
									</view>
									<view class="mark float_left" v-if="replyItem.userId == productDetali.userId">
										作者
									</view>
								</view>
								<view class="remark">
									{{replyItem.detail}}
								</view>
								<view class="record clear">
									<view class="date float_left">
										{{replyItem.createTime}}
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 评论回复文本框 -->
			<view class="reply_input" v-if="isFocus">
				<input 
					type="text" 
					:focus="isFocus" 
					v-model="inputReplyComment" 
					placeholder="想说点什么?" 
					@confirm="releaseReply"
				>
			</view>
			
			
			
			<!-- 推荐 -->
			<view class="recommend">
				<view class="title">
					你可能感兴趣的
				</view>
				<view class="recommend_show clear">
					<view class="recommend_item float_left" v-for="(item,index) in recommendPro" :key="item.id" @click="recommend(item.id)">
						<view class="preview">
							<image :src="item.imgUrl" mode="aspectFill"></image>
						</view>
						<view class="recommend_intr">
							{{item.introduction}}
						</view>
						<view class="recommend_user clear">
							<view class="recommend_head float_left">
								<image :src="item.userAvatar" mode=""></image>
							</view>
							<view class="recommend_nickname float_left">
								{{item.userName}}
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
			productDetali:{},
			// 当前登录用户信息
			currentUser: {},
			// 评论
			comment: [],
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
			loading: "",
			
			// 评论
			inputComment: "",
			
			// 评论回复
			isFocus: false,
			inputReplyComment: "",
			commented: {},
			subComment: {},
			scrollTop: 0,
			nextScrollTop: 0,
		};
	},
	methods: {
		// 返回
		goBack() {
			const pages = getCurrentPages();
			if(pages.length === 0) {
				uni.switchTab({
					url: "/pages/index/index"
				})
			} else {
				uni.navigateBack({
					delta: 1
				});
			}
		},
		// 分享
		onShareAppMessage() {
			const url="/pages/productDetalis/productDetalis?id=" + this.productDetali.id;//你的转发页面路径拼接参数
			return {
				title: this.productDetali.title,
				path: url,
			}
		},
		// 个人信息
		personalIntr(id) {
			console.log("查看个人信息");
		},
		// 联系我
		contactMe() {
			uni.showToast({
				title: "加载中",
				icon: "loading"
			})
			
			app.globalData.getUserPhoneById({
				userId: this.productDetali.userId
			}).then(response => {
				uni.showModal({
					title: '联系方式：电话',
					content: response.data,
					confirmText: '复制文本',
					success: (res) => {
						if (res.confirm) {
							wx.setClipboardData({
								data: response.data,
								success(res) {
									uni.showToast({
										title: "内容已复制",
									})
								}
							})
						}
					}
				});
			}).catch(err => {
				uni.showToast({
					title: err.message,
					icon: "error"
				})
			})
			

		},
		// 轮播图设置
		change(e) {
			this.current = e.detail.current;
		},
		// 点击图片预览
		viewImg(imgs,index) {
			wx.previewImage({
				urls: imgs, //需要预览的图片http链接列表，多张的时候，url直接写在后面就行了
				current: imgs[index], // 当前显示图片的http链接，默认是第一个
				success: function(res) {},
				fail: function(res) {},
				complete: function(res) {},
			})
		},
		// 评论拉取
		getCommentList() {
			app.globalData.getCommentList({
				commentId: this.productDetali.id
			}).then(res => {
				this.comment = res.data;
				this.reply();
			}).catch(err => {
				console.log(err);
			})
		},
		// 评论数据处理方法
		reply() {
			if(this.comment !== []) {
				for(let i = 0; i < this.comment.length; i++) {
					this.comment[i].createTime = this.comment[i].createTime.slice(0,16);
					if(this.comment[i].subComment !== []) {
						for(let j = 0; j < this.comment[i].subComment.length; j++) {
							this.comment[i].subComment[j].createTime = this.comment[i].subComment[j].createTime.slice(0,16);
						}
					}
				}
			}
		},
		// 评论功能
		releaseComment() {
			// 为空校验
			const comment = this.inputComment.trim();
			if(comment === "") {
				uni.showToast({
					title: "评论不能为空",
					icon: "error"
				});
				return
			}
			// 发送请求
			const userInfo = uni.getStorageSync("userInfo");
			app.globalData.userGoodsAddParentComment({
				detail: comment,
				userId: userInfo.id,
				userGoodsId: this.productDetali.id,
			}).then(res => {
				uni.showToast({
					title:"评论成功",
					icon: "none"
				})
				this.getCommentList();
				this.inputComment = "";
			}).catch(err => {
				uni.showToast({
					title: err.message,
					icon: "error"
				})
			})
		},
		// 评论回复调起文本框
		replyComment(commentItem,subCommentThis = "") {
			// 拉起文本框
			this.isFocus = true;
			// 调整该条评论位置
			this.nextScrollTop = this.scrollTop;
			uni.createSelectorQuery().select("#commit" + commentItem.id).boundingClientRect(data => {
				uni.createSelectorQuery().select(".swiper-box").boundingClientRect(res => {
						this.scrollTop = -(res.top - data.top + 100)
				}).exec()
			}).exec()
			
			this.commented = commentItem;
			this.subComment = subCommentThis;
		},
		// 回复
		releaseReply() {
			const inputReplyCommentThis = this.inputReplyComment.trim();
			this.inputReplyComment = "";
			this.isFocus = false;
			if(inputReplyCommentThis === "") {
				uni.showToast({
					title: "评论不能为空",
					icon: "error"
				});
				return
			}
			if(this.commented == "") {
				uni.showToast({
					title: "请选择要回复的评论",
					icon: "error"
				});
				return
			}

			app.globalData.userGoodsAddSubComment({
				detail: inputReplyCommentThis,
				parentId: this.commented.id,
				replyUserId: !this.subComment ? -1 : this.subComment.userId,
				userGoodsId: this.productDetali.id,
				userId: this.currentUser.id,
			}).then(res => {
				uni.showToast({
					title: "评论成功",
					icon: "none"
				});
				this.getCommentList();
			}).catch(err => {
				uni.showToast({
					title: err.message,
					icon: "error"
				})
			})
			
			
			
		},
		// 推荐点击
		recommend(id) {
			var pages = getCurrentPages(); //获取所有页面的数组对象
			var currPage = pages[pages.length - 1]; //当前页面
			uni.redirectTo({
				url: "../../" + currPage.__route__ + "?id=" + id
			})
		},
		
		// 请求商品详情数据
		selectOneGoods(id) {
			app.globalData.selectOneGoods({
				id,
			}).then(res => {
				if(!res.data) {
					uni.showToast({
						title: "数据错误",
						icon: "error"
					})
					return
				}
				this.productDetali = res.data;
				// 数据处理
				this.dataHandle();
				// 拉取商品评论
				this.getCommentList();
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
			if(this.productDetali.goodsName.length > 25) {
				this.isLimit = true;
				this.productDetali.goodsName = this.productDetali.goodsName.slice(0,24);
			}
			// 图片url处理
			if(this.productDetali.imgUrl !== null) {
				this.productDetali.imgUrl = JSON.parse(this.productDetali.imgUrl);
			}
		},
		// 请求推荐商品分页
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
		// 推荐商品数据处理
		dataHandleAboutRecommendPro(obtain) {
			// 时间处理
			for(let i =  0 + this.recommendPro.length - obtain; i < this.recommendPro.length; i++) {
				// 图片处理
				if(this.recommendPro[i].imgUrl !== null) {
					this.recommendPro[i].imgUrl = JSON.parse(this.recommendPro[i].imgUrl)[0];
				}
			}
		},

		// 触底加载事件
		bottomLoading() {
			if(this.loading !== "没有了~") {
				this.consult(this.pageNum_, 10)
			}
		},
		goGuidance() {
			// uni.showModal({
			// 	title: '联系方式',
			// 	content: currentUser.Phone,
			// 	success: function (res) {
			// 		if (res.confirm) {
			// 			console.log('用户点击确定');
			// 		} else if (res.cancel) {
			// 			console.log('用户点击取消');
			// 		}
			// 	}
			// });
		}
	},
	onLoad(option) {
		console.log(option.id);
		// 请求商品详细信息
		this.selectOneGoods(option.id);
		// 请求商品分页
		this.consult();
		// 当前用户
		this.currentUser = uni.getStorageSync("userInfo");
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
	// background-color: red;
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
			padding: 0rpx 28rpx  0rpx 22rpx;
			box-sizing: border-box;
			line-height: 64rpx;
			border-radius: 32rpx;
			display: flex;
			justify-content: space-evenly;
			align-items: center;
			image {
				width: 32rpx;
				height: 32rpx;
				line-height: 64rpx;
				margin-right: 10rpx;
				// margin-top: 8rpx;
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
	word-break: break-all;
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
			display: block;
			position: relative;
			border-radius: 50%;
			background-color: #F1F1F1;
			height: 72rpx;
			width: 72rpx;
			image {
				position: absolute;
				top: 17rpx;
				left: 17rpx;
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
	background-color: #fff;
	margin-bottom: 20rpx;
	padding: 40rpx 32rpx;
	.head {
		margin-right: 24rpx;
		image {
			border-radius: 50%;
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
	background-color: #fff;
	padding:40rpx 32rpx;
	font-size: 0;
	.comment_box_head {
		margin-right: 24rpx;
		image {
			width: 68rpx;
			height: 68rpx;
		}
	}
	.comment_input {
		color: #999999;
	}
	input {
		width: 594rpx;
		height: 68rpx;
		box-sizing: border-box;
		padding-left: 24rpx;
		padding-right: 24rpx;
		font-size: 28rpx;
		font-family: PingFang SC-Regular, PingFang SC;
		font-weight: 400;
		background-color: #F6F6F6;
		border-radius: 36rpx;
	}
}

// 评论
.comment {
	background-color: #fff;
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
			color: #999999;
			font-weight: 400;
			.first_text {
				font-size: 28rpx;
				margin-bottom: 4rpx;
			}
			.reply_reply {
				margin-left: 5rpx;
				font-size: 22rpx;
				margin-top: 5rpx;
			}
			.mark {
				margin-left: 28rpx;
				margin-top: 6rpx;
				font-size: 20rpx;
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
// 评论回复文本框
.reply_input {
	position: fixed;
	bottom: 120rpx;
	padding: 40rpx 32rpx;
	background-color: #eeebea;
	input {
		width: 686rpx;
		height: 68rpx;
		padding-left: 24rpx;
		background-color: #F6F6F6;
		border-radius: 36rpx;
		font-size: 28rpx;
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
			background-color: #fff;
			width: 332rpx;
			height: 480rpx;
			box-sizing: border-box;
			padding: 18rpx 18rpx 20rpx 18rpx;
			margin-bottom: 24rpx;
			margin-right: 20rpx;
			border-radius: 24rpx;
			.preview {
				margin-bottom: 22rpx;
				image {
					border-radius: 24rpx;
					width: 296rpx !important;
					height: 296rpx;
				}
			}
			.recommend_intr {
				// width: 288rpx;
				color: #333333;
				font-weight: 400;
				font-size: 24rpx;
				margin-left: 2rpx;
				// margin-right: 6rpx;
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
	z-index: 1;
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
