<template>
	<view class="mg-AfterSales">
		<!-- 头部 -->
		<view class="mg-AfterSales-top">
			<view class="mg-top">
				<image src="https://mang-gou.tos-cn-beijing.volces.com/address%2F%E8%BF%94%E5%9B%9E%403x%402x.png" @click="toBack"></image>
				<view class="">售后/退款</view>
				<image></image>
			</view>
			<view class="mg-AfterSales-tab">
				<view class="nav_item mg-taberOfservice-select" :class="curr===index?'select':''" 
					v-for="(item,index) in taber" :key="index" @click="setCurr" :data-index="index">
					<view>{{item}}</view>
					<view class="mt-Community-label-bottom"></view>
				</view>
			</view>
		</view>
		
		<!-- 内容 -->
		<view class="mg-AfterSales-content">
			<swiper style="height: 1342rpx;width: 100%;" class="mg-AfterSales-buttom" :current="curr" @change="setCurr">
				<swiper-item>
					<scroll-view @scrolltolower="allRefundOrder(pageNum_)" scroll-with-animation="true" scroll-y="true" style="height:1342rpx;">
						<view class="mg-goodsCard-box">
							<view class="mg-goodsCard" v-for="(item,index) in myDeal" :key="item.id">
								<view class="mg-shop">
									<view class="mg-shop-img">
										<image :src="item.userAvatar" mode="aspectFill"></image>
										<view class="mg-shop-img-view">{{item.userName}}</view>
									</view>
									<view class="mg-dealState-pay" v-if="item.status === 4">退款中</view>
									<view class="mg-dealState-pay" v-if="item.status === 5">退款成功</view>
								</view>
								<view class="mg-goodsIntroduction">
									<image :src="item.goodsImg" mode="aspectFill"></image>
									<view class="mg-PurchasedGoods">
										<view class="mg-GoodsTitle">{{item.goodsName}}</view>
										<view class="mg-goodsPriceAndSum">
											<text class="price">
												<text>¥</text>
												{{(item.price / 100).toFixed(2)}}</text>
										</view>
									</view>
								</view>
								<view class="mg-more">
									<view class="used"></view> 
									<view class="used1">
										<view class="used-3">退款金额：</view>
										<view class="used-4">￥{{(item.refund / 100).toFixed(2)}}</view>
									</view>
								</view>
								<!-- <view class="mg-more">
									<text>更多</text>
									<view class="used">
										<view class="used-1">删除售后单</view>
										<view class="used-1">售后详情</view>
									</view>
								</view> -->
							</view>
						</view>
						<view class="mg-goodsCard-box">
							<view v-if="!myDeal.length" class="mg-goodsCard-box-none" style="text-align: center;">
								<image src="https://mang-gou.tos-cn-beijing.volces.com/allOrder%2F%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20230724170906.png"></image>
								<view>暂无待处理的售后/退款订单</view>
							</view>
						</view>
						<view class="loading">
							{{loading}}
						</view>
					</scroll-view>
				</swiper-item>
				
				<swiper-item>
					<scroll-view @scrolltolower="pendingRefundOrder(pageNum_)" scroll-with-animation="true" scroll-y="true" style="height:1342rpx;">
						<view class="mg-goodsCard-box">
							<view class="mg-goodsCard" v-for="(item,index) in myDeal" :key="item.id">
								<view class="mg-shop">
									<view class="mg-shop-img">
										<image :src="item.userAvatar" mode="aspectFill"></image>
										<view class="mg-shop-img-view">{{item.userName}}</view>
									</view>
									<view class="mg-dealState-pay">退款中</view>
								</view>
								<view class="mg-goodsIntroduction">
									<image :src="item.goodsImg" mode="aspectFill"></image>
									<view class="mg-PurchasedGoods">
										<view class="mg-GoodsTitle">{{item.goodsName}}</view>
										<view class="mg-goodsPriceAndSum">
											<text class="price">
												<text>¥</text>
												{{(item.price / 100).toFixed(2)}}</text>
										</view>
									</view>
								</view>
								<view class="mg-more">
									<view class="used"></view> 
									<view class="used1">
										<view class="used-3">退款金额：</view>
										<view class="used-4">￥{{(item.refund / 100).toFixed(2)}}</view>
									</view>
								</view>
								<!-- <view class="mg-more">
									<text>更多</text>
									<view class="used">
										<view class="used-1">删除售后单</view>
										<view class="used-1">售后详情</view>
									</view>
								</view> -->
							</view>
							<view v-if="!myDeal.length" class="mg-goodsCard-box-none" style="text-align: center;">
								<image src="https://mang-gou.tos-cn-beijing.volces.com/allOrder%2F%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20230724170906.png"></image>
								<view>暂无待处理的售后/退款订单</view>
							</view>
							<view v-else class="loading">
								{{loading}}
							</view>
						</view>


					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	const app = getApp();
	export default {
		data() {
			return {
				curr: 0,
				active:0,
				taber:['全部','待处理'],
				myDeal:[],
				// 分页控制
				pageNum_: 1,
				loading: "",
				
				userInfo: {},
				
				timer: null
			}
		},
		onLoad(option) {
			this.userInfo = uni.getStorageSync("userInfo");
			if(!this.curr){
				this.curr = 0;
				this.allRefundOrder();
			}else{
				this.curr = option.curr
			}
		},
		methods: {
			//swiper-item
			setCurr(e) {
				this.curr = e.detail.current || e.currentTarget.dataset.index || 0;
				this.myDeal = [];
				this.pageNum_ = 1;
				this.loading = "";
				
				// 获取全部退款订单，节流控制
				if(this.curr === 0 && !this.timer) {
					this.timer = setTimeout(() => {
						this.allRefundOrder();
						// 清除定时器后，以下次可以继续定时
						this.timer = null;
					},50);
				}
				
				
				// 获取待处理订单，节流控制
				if(this.curr === 1 && !this.timer) {
					this.timer = setTimeout(() => {
						this.pendingRefundOrder(this.pageNum_);
						// 清除定时器后，以下次可以继续定时
						this.timer = null;
					},50);
				}
			},
			// 返回
			toBack(){
				uni.switchTab({
					url: "/pages/personal/personal"
				})
			},
			// 全部退款订单
			allRefundOrder(pageNum = 1, pageSize = 5) {
				if(this.loading === "没有了~") {
					return
				}
				this.loading = "正在加载中哦~";
				app.globalData.getAllRefundOredr({
					pageNum,
					pageSize,
					userId: this.userInfo.id,
				}).then(res => {
					const nextLenght = this.myDeal.length;
					this.myDeal = this.myDeal.concat(res.data.records);
					const obtain = res.data.records.length;
					this.pageNum_++;
					if(this.myDeal.length === nextLenght) {
						this.loading = "没有了~";
					}
					// 数据处理
					if(obtain !== 0) {
						this.dataHandle(obtain);
					}
				}).catch(err => {
					uni.showToast({
						title: err.message,
						icon: "error"
					})
				})
			},
			// 待处理订单
			pendingRefundOrder(pageNum = 1, pageSize = 5) {
				this.loading = "正在加载中哦~";
				app.globalData.selectOrderByStatus({
					pageNum,
					pageSize,
					userId: this.userInfo.id,
					status: 4
				}).then(res => {
					const nextLenght = this.myDeal.length;
					this.myDeal = this.myDeal.concat(res.data.records);
					const obtain = res.data.records.length;
					this.pageNum_++;
					if(this.myDeal.length === nextLenght) {
						this.loading = "没有了~";
					}
					// 数据处理
					if(obtain !== 0) {
						this.dataHandle(obtain);
					}
				}).catch(err => {
					uni.showToast({
						title: err.message,
						icon: "error"
					})
				})
			},
			dataHandle(obtain) {
				for(let i = this.myDeal.length - obtain; i < this.myDeal.length; i++) {
					// 图片处理
					if(this.myDeal[i].goodsImg) {
						this.myDeal[i].goodsImg = JSON.parse(this.myDeal[i].goodsImg)[0];
					}
				}
			}
		},
	}
</script>

<style lang="scss">
	@import 'AfterSales.scss';
	.loading {
		height: 156rpx;
		text-align: center;
		line-height: 156rpx;
		font-size: 26rpx;
		color: #333333;
	}
</style>