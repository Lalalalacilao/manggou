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
					v-for="(item,index) in taber" :key="index" @tap="setCurr" :data-index="index">
					<view>{{item}}</view>
					<view class="mt-Community-label-bottom"></view>
				</view>
			</view>
		</view>
		
		<!-- 内容 -->
		<view class="mg-AfterSales-content">
			<swiper style="height: 1342rpx;width: 100%;" class="mg-AfterSales-buttom" :current="curr" @change="setCurr">
				<swiper-item>
					<scroll-view scroll-with-animation="true" scroll-y="true" style="height:1342rpx;">
						<view class="mg-goodsCard-box">
							<view class="mg-goodsCard" v-for="(item,index) in 10" :key="index">
								<view class="mg-shop">
									<view class="mg-shop-img">
										<image src="../../static/allOrder/341686733007_.pic@2x.png" mode="aspectFill"></image>
										<view class="mg-shop-img-view">桑桑适宜</view>
									</view>
									<view class="mg-dealState-pay">退款成功</view>
								</view>
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
								<view class="mg-more">
									<text>更多</text>
									<view class="used">
										<view class="used-1">删除售后单</view>
										<view class="used-1">售后详情</view>
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
				
				<swiper-item>
					<scroll-view scroll-with-animation="true" scroll-y="true" style="height:1342rpx;">
						<view class="mg-goodsCard-box">
							<view class="mg-goodsCard-box-none" style="text-align: center;">
								<image src="https://mang-gou.tos-cn-beijing.volces.com/allOrder%2F%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20230724170906.png"></image>
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
