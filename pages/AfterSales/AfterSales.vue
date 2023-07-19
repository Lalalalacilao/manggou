<template>
	<view class="mg-AfterSales">
		<!-- 头部 -->
		<view class="mg-AfterSales-top">
			<!-- 我的订单标题 -->
			<view class="mg-top">
				<image src="../../static/allOrder/返回@2x.jpg" @click="toBack"></image>
				<view class="">售后/退款</view>
				<image></image>
			</view>
			<!-- tab -->
			<view class="mg-AfterSales-tab">
				<!-- 选择 -->
				<view class="nav_item mg-taberOfservice-select" :class="curr===index?'select':''" 
					v-for="(item,index) in taber" :key="index" @tap="setCurr" :data-index="index">
					<view>{{item}}</view>
					<view class="mt-Community-label-bottom"></view>
				</view>
			</view>
		</view>
		
		<!-- 内容 -->
		<view class="mg-AfterSales-content">
			<swiper style="height: 1342rpx;width: 100%;" class="mg-AfterSales-buttom" :current="curr" @change="setCurr">
				<!-- 全部 -->
				<swiper-item>
					<scroll-view scroll-with-animation="true" scroll-y="true" style="height:1342rpx;">
						<view class="mg-goodsCard-box">
							<!-- 卡片循环 -->
							<view class="mg-goodsCard" v-for="(item,index) in 10" :key="index">
								<!-- 商铺logo和标题订单状态 -->
								<view class="mg-shop">
									<view class="mg-shop-img">
										<image src="../../static/allOrder/341686733007_.pic@2x.png" mode="aspectFill"></image>
										<view class="mg-shop-img-view">桑桑适宜</view>
									</view>
									<view class="mg-dealState-pay">退款成功</view>
								</view>
								<!-- 订单详情 -->
								<view class="mg-goodsIntroduction">
									<image src="../../static/allOrder/41686710147_.pic@2x.png" mode="aspectFill"></image>
									<view class="mg-PurchasedGoods">
										<view class="mg-GoodsTitle">急出！欧式桌子9成新，因搬家出售，无套路，需要的尽快拿走</view>
										<view class="mg-goodsPriceAndSum">
											<text class="price">
												<text>¥</text>
												200.00</text>
										</view>
									</view>
								</view>
								<view class="mg-more">
									<view class="used"></view> 
									<view class="used1">
										<view class="used-3">退款金额：</view>
										<view class="used-4">￥200.00</view>
									</view>
								</view>
								<!-- 更多和支付 -->
								<view class="mg-more">
									<text>更多</text>
									<!-- <view class="deleteDeal" v-if="flag == index" @click="deleteOrder(item.orders.id)">删除订单</view> -->
									<view class="used">
										<view class="used-1">删除售后单</view>
										<view class="used-1">售后详情</view>
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
				
				<!-- 待处理 -->
				<swiper-item>
					<scroll-view scroll-with-animation="true" scroll-y="true" style="height:1342rpx;">
						<view class="mg-goodsCard-box">
							<!-- 卡片循环 -->
							<view class="mg-goodsCard-box-none" style="text-align: center;">
								<image src="../../static/allOrder/没有订单.png"></image>
								<view>暂无待处理的售后/退款订单</view>
							</view>
							
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				curr: 0,
				active:0,
				taber:['全部','待处理'],
				myDeal:[]
			}
		},
		onLoad(option) {
			if(this.curr = ''){
				this.curr = 0
			}else{
				this.curr = option.curr
			}
			
			console.log(this.curr,'000');
		},
		methods: {
			//swiper-item
			setCurr(e) {
				this.curr = e.detail.current || e.currentTarget.dataset.index || 0;
				console.log("@@@",this.curr);
			},
			// 返回
			toBack(){
				uni.navigateBack()
			}
		},
	}
</script>

<style lang="scss">
	@import 'AfterSales.scss';
</style>
