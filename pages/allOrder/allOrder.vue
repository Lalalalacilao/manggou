<template>
	<view class="mg-allOrder">
		<!-- 头部 -->
		<view class="mg-allOrder-top">
			<!-- 我的订单标题 -->
			<view class="mg-top">
				<image src="../../static/allOrder/返回@2x.jpg" @click="toBack"></image>
				<view class="">全部订单</view>
				<image></image>
			</view>
			<!-- 搜索框 -->
			<view class="mg-allOrder-search">
				<view class="mg-search">
					<image src="../../static/allOrder/搜索@2x.png"></image>
					<input type="text" placeholder="搜索我的订单" v-model="ordercontent" @input="handleInput">
				</view>
			</view>
			<!-- tab -->
			<view class="mg-allOrder-tab">
				<!-- 选择 -->
				<view class="nav_item mg-taberOfservice-select" :class="curr===index?'select':''" 
					v-for="(item,index) in taber" :key="index" @tap="setCurr" :data-index="index">
					<view>{{item}}</view>
					<view class="mt-Community-label-bottom"></view>
				</view>
			</view>
		</view>
		
		<!-- 内容 -->
		<view class="mg-allOrder-content">
			<swiper style="height: 1242rpx;width: 100%;" class="mg-allOrder-buttom" :current="curr" @change="setCurr">
				<!-- 全部 -->
				<swiper-item>
					<scroll-view scroll-with-animation="true" scroll-y="true" style="height:1242rpx;" @scrolltolower="bottomLoading()">
						<view class="mg-goodsCard-box">
							<!-- 卡片循环 -->
							<view class="mg-goodsCard" v-for="(item,index) in 10" :key="index">
								<!-- 商铺logo和标题订单状态 -->
								<view class="mg-shop">
									<view class="mg-shop-img">
										<image src="../../static/allOrder/341686733007_.pic@2x.png" mode="aspectFill"></image>
										<view class="mg-shop-img-view">桑桑适宜</view>
									</view>
									<view class="mg-dealState-pay">交易成功</view>
								</view>
								<!-- 订单详情 -->
								<view class="mg-goodsIntroduction" @click="OrderDetails(item.orders.id,item.orders.type,item.orders.state,item.orders.goodsId)">
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
								<!-- 更多和支付 -->
								<view class="mg-more">
									<text @click="deletedeal(index)">更多</text>
									<!-- <view class="deleteDeal" v-if="flag == index" @click="deleteOrder(item.orders.id)">删除订单</view> -->
									<view class="used" @click="ComeAgain(item.orders.id)">
										<view class="used-1">联系卖家</view>
										<view class="used-2">去评价</view>
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
				
				<!-- 待付款 -->
				<swiper-item>
					<scroll-view scroll-with-animation="true" scroll-y="true" style="height:1242rpx;" @scrolltolower="bottomLoading()">
						<view class="mg-goodsCard-box">
							<!-- 卡片循环 -->
							<view class="mg-goodsCard" v-for="(item,index) in 10" :key="index">
								<!-- 商铺logo和标题订单状态 -->
								<view class="mg-shop">
									<view class="mg-shop-img">
										<image src="../../static/allOrder/341686733007_.pic@2x.png" mode="aspectFill"></image>
										<view class="mg-shop-img-view">桑桑适宜</view>
									</view>
									<view class="mg-dealState-pay">交易取消</view>
								</view>
								<!-- 订单详情 -->
								<view class="mg-goodsIntroduction" @click="OrderDetails(item.orders.id,item.orders.type,item.orders.state,item.orders.goodsId)">
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
								<!-- 更多和支付 -->
								<view class="mg-more">
									<text @click="deletedeal(index)">更多</text>
									<!-- <view class="deleteDeal" v-if="flag == index" @click="deleteOrder(item.orders.id)">删除订单</view> -->
									<view class="used" @click="ComeAgain(item.orders.id)">
										<view class="used-1">联系卖家</view>
										<view class="used-2">待付款</view>
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
				
				<!-- 待收货 -->
				<swiper-item>
					<scroll-view scroll-with-animation="true" scroll-y="true" style="height:1242rpx;" @scrolltolower="bottomLoading()">
						<view class="mg-goodsCard-box">
							<!-- 卡片循环 -->
							<view class="mg-goodsCard" v-for="(item,index) in 10" :key="index">
								<!-- 商铺logo和标题订单状态 -->
								<view class="mg-shop">
									<view class="mg-shop-img">
										<image src="../../static/allOrder/341686733007_.pic@2x.png" mode="aspectFill"></image>
										<view class="mg-shop-img-view">桑桑适宜</view>
									</view>
									<view class="mg-dealState-pay">运输中</view>
								</view>
								<!-- 订单详情 -->
								<view class="mg-goodsIntroduction" @click="OrderDetails(item.orders.id,item.orders.type,item.orders.state,item.orders.goodsId)">
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
								<!-- 更多和支付 -->
								<view class="mg-more">
									<text @click="deletedeal(index)">更多</text>
									<!-- <view class="deleteDeal" v-if="flag == index" @click="deleteOrder(item.orders.id)">删除订单</view> -->
									<view class="used" @click="ComeAgain(item.orders.id)">
										<view class="used-1">联系卖家</view>
										<view class="used-2">待收货</view>
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
				
				<!-- 待评价 -->
				<swiper-item>
					<scroll-view scroll-with-animation="true" scroll-y="true" style="height:1242rpx;" @scrolltolower="bottomLoading()">
						<view class="mg-goodsCard-box">
							<!-- 卡片循环 -->
							<view class="mg-goodsCard" v-for="(item,index) in 10" :key="index">
								<!-- 商铺logo和标题订单状态 -->
								<view class="mg-shop">
									<view class="mg-shop-img">
										<image src="../../static/allOrder/341686733007_.pic@2x.png" mode="aspectFill"></image>
										<view class="mg-shop-img-view">桑桑适宜</view>
									</view>
									<view class="mg-dealState-pay">进行评价</view>
								</view>
								<!-- 订单详情 -->
								<view class="mg-goodsIntroduction" @click="OrderDetails(item.orders.id,item.orders.type,item.orders.state,item.orders.goodsId)">
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
								<!-- 更多和支付 -->
								<view class="mg-more">
									<text @click="deletedeal(index)">更多</text>
									<!-- <view class="deleteDeal" v-if="flag == index" @click="deleteOrder(item.orders.id)">删除订单</view> -->
									<view class="used" @click="ComeAgain(item.orders.id)">
										<view class="used-1">联系卖家</view>
										<view class="used-2">去评价</view>
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
				
				<!-- 已完成 -->
				<swiper-item>
					<scroll-view scroll-with-animation="true" scroll-y="true" style="height:1242rpx;" @scrolltolower="bottomLoading()">
						<view class="mg-goodsCard-box">
							<!-- 卡片循环 -->
							<view class="mg-goodsCard" v-for="(item,index) in 10" :key="index">
								<!-- 商铺logo和标题订单状态 -->
								<view class="mg-shop">
									<view class="mg-shop-img">
										<image src="../../static/allOrder/341686733007_.pic@2x.png" mode="aspectFill"></image>
										<view class="mg-shop-img-view">桑桑适宜</view>
									</view>
									<view class="mg-dealState-pay">交易成功</view>
								</view>
								<!-- 订单详情 -->
								<view class="mg-goodsIntroduction" @click="OrderDetails(item.orders.id,item.orders.type,item.orders.state,item.orders.goodsId)">
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
								<!-- 更多和支付 -->
								<view class="mg-more">
									<text @click="deletedeal(index)">更多</text>
									<!-- <view class="deleteDeal" v-if="flag == index" @click="deleteOrder(item.orders.id)">删除订单</view> -->
									<view class="used" @click="ComeAgain(item.orders.id)">
										<view class="used-1">联系卖家</view>
										<view class="used-2">已完成</view>
									</view>
								</view>
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
				taber:['全部','待付款','待收货','待评价','已完成'],
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
	@import 'allOrder.scss';
</style>
