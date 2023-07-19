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
					<scroll-view scroll-with-animation="true" scroll-y="true" style="height:1242rpx;" @scrolltolower="lowerBottomAll">
						<view class="mg-goodsCard-box" v-if="selectAllOrdedel != ''">
							<!-- 卡片循环 -->
							<view class="mg-goodsCard" v-for="(item,index) in selectAllOrdedel" :key="index">
								<!-- 商铺logo和标题订单状态 -->
								<view class="mg-shop">
									<view class="mg-shop-img">
										<image :src="item.userAvatar" mode="aspectFill"></image>
										<view class="mg-shop-img-view">{{item.userName}}</view>
									</view>
									<view class="mg-dealState-pay" v-if="item.status == 0">待支付</view>
									<view class="mg-dealState-pay" v-if="item.status == 1">待收货</view>
									<view class="mg-dealState-pay" v-if="item.status == 2">待评价</view>
									<view class="mg-dealState-pay" v-if="item.status == 3">交易成功</view>
								</view>
								<!-- 订单详情 -->
								<view class="mg-goodsIntroduction" @click="OrderDetails(item.orders.id,item.orders.type,item.orders.state,item.orders.goodsId)">
									<image :src="item.goodsImg" mode="aspectFill"></image>
									<view class="mg-PurchasedGoods">
										<view class="mg-GoodsTitle">{{item.goodsName}}</view>
										<view class="mg-goodsPriceAndSum">
											<text class="price">
												<text>¥</text>
												{{item.price}}.00</text>
										</view>
									</view>
								</view>
								<!-- 更多和支付 -->
								<view class="mg-more">
									<text @click="deletedeal(index)">更多</text>
									<view class="deleteDeal" v-if="flag == index" @click="deleteOrder(item.id)">删除订单</view>
									<view class="used" @click="ComeAgain(item.orders.id)">
										<view class="used-1">联系卖家</view>
										<view class="used-2" v-if="item.status == 0">待付款</view>
										<view class="used-2" v-if="item.status == 1">确认收货</view>
										<view class="used-2" v-if="item.status == 2">去评价</view>
										<view class="used-2" v-if="item.status == 3">待付款</view>
									</view>
								</view>
							</view>
						</view>
						<view class="mg-goodsCard-box" v-else>
							<!-- 卡片循环 -->
							<view class="mg-goodsCard-box-none" style="text-align: center;">
								<image src="../../static/allOrder/没有订单.png"></image>
								<view v-if="curr == 0">还没有相关订单</view>
							</view>
						</view>
						<view class="mg-button">
							{{button}}
						</view>
					</scroll-view>
				</swiper-item>
				
				<!-- 待付款 -->
				<swiper-item>
					<scroll-view scroll-with-animation="true" scroll-y="true" style="height:1242rpx;">
						<view class="mg-goodsCard-box" v-if="selectOrdedel != undefined">
							<!-- 卡片循环 -->
							<!-- <view class="mg-goodsCard" v-for="(item,index) in selectOrdedel" :key="index"> -->
							<view class="mg-goodsCard">
								<!-- 商铺logo和标题订单状态 -->
								<view class="mg-shop">
									<view class="mg-shop-img">
										<image :src="selectOrdedel.userAvatar" mode="aspectFill"></image>
										<view class="mg-shop-img-view">{{selectOrdedel.userName}}</view>
									</view>
									<view class="mg-dealState-pay">待支付</view>
								</view>
								<!-- 订单详情 -->
								<view class="mg-goodsIntroduction">
									<image :src="selectOrdedel.goodsImg" mode="aspectFill"></image>
									<view class="mg-PurchasedGoods">
										<view class="mg-GoodsTitle">{{selectOrdedel.goodsName}}</view>
										<view class="mg-goodsPriceAndSum">
											<text class="price">
												<text>¥</text>
												{{selectOrdedel.price}}.00</text>
										</view>
									</view>
								</view>
								<!-- 更多和支付 -->
								<view class="mg-more">
									<text @click="deletedeal(index)">更多</text>
									<view class="deleteDeal" v-if="flag == index" @click="deleteOrder(selectOrdedel.id)">删除订单</view>
									<view class="used">
										<view class="used-1">联系卖家</view>
										<view class="used-2">待付款</view>
									</view>
								</view>
							</view>
						</view>
						<view class="mg-goodsCard-box" v-else>
							<!-- 卡片循环 -->
							<view class="mg-goodsCard-box-none" style="text-align: center;">
								<image src="../../static/allOrder/没有订单.png"></image>
								<view v-if="currs == 0">还没有相关订单</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
				
				<!-- 待收货 -->
				<swiper-item>
					<scroll-view scroll-with-animation="true" scroll-y="true" style="height:1242rpx;">
						<view class="mg-goodsCard-box" v-if="selectOrdedel != undefined">
							<!-- 卡片循环 -->
							<!-- <view class="mg-goodsCard" v-for="(item,index) in selectOrdedel" :key="index"> -->
								<view class="mg-goodsCard">
								<!-- 商铺logo和标题订单状态 -->
								<view class="mg-shop">
									<view class="mg-shop-img">
										<image :src="selectOrdedel.userAvatar" mode="aspectFill"></image>
										<view class="mg-shop-img-view">{{selectOrdedel.userName}}</view>
									</view>
									<view class="mg-dealState-pay">待收货</view>
								</view>
								<!-- 订单详情 -->
								<view class="mg-goodsIntroduction">
									<image :src="selectOrdedel.goodsImg" mode="aspectFill"></image>
									<view class="mg-PurchasedGoods">
										<view class="mg-GoodsTitle">{{selectOrdedel.goodsName}}</view>
										<view class="mg-goodsPriceAndSum">
											<text class="price">
												<text>¥</text>
												{{selectOrdedel.price}}.00</text>
										</view>
									</view>
								</view>
								<!-- 更多和支付 -->
								<view class="mg-more">
									<text @click="deletedeal(index)">更多</text>
									<view class="deleteDeal" v-if="flag == index" @click="deleteOrder(selectOrdedel.id)">删除订单</view>
									<view class="used">
										<view class="used-1">联系卖家</view>
										<view class="used-2">确认收货</view>
									</view>
								</view>
							</view>
						</view>
						<view class="mg-goodsCard-box" v-else>
							<!-- 卡片循环 -->
							<view class="mg-goodsCard-box-none" style="text-align: center;">
								<image src="../../static/allOrder/没有订单.png"></image>
								<view v-if="currs == 1">还没有相关订单</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
				
				<!-- 待评价 -->
				<swiper-item>
					<scroll-view scroll-with-animation="true" scroll-y="true" style="height:1242rpx;">
						<view class="mg-goodsCard-box" v-if="selectOrdedel != undefined">
							<!-- 卡片循环 -->
							<!-- <view class="mg-goodsCard" v-for="(item,index) in selectOrdedel" :key="index"> -->
								<view class="mg-goodsCard">
								<!-- 商铺logo和标题订单状态 -->
								<view class="mg-shop">
									<view class="mg-shop-img">
										<image :src="selectOrdedel.userAvatar" mode="aspectFill"></image>
										<view class="mg-shop-img-view">{{selectOrdedel.userName}}</view>
									</view>
									<view class="mg-dealState-pay">待评价</view>
								</view>
								<!-- 订单详情 -->
								<view class="mg-goodsIntroduction">
									<image :src="selectOrdedel.goodsImg" mode="aspectFill"></image>
									<view class="mg-PurchasedGoods">
										<view class="mg-GoodsTitle">{{selectOrdedel.goodsName}}</view>
										<view class="mg-goodsPriceAndSum">
											<text class="price">
												<text>¥</text>
												{{selectOrdedel.price}}.00</text>
										</view>
									</view>
								</view>
								<!-- 更多和支付 -->
								<view class="mg-more">
									<text @click="deletedeal(index)">更多</text>
									<view class="deleteDeal" v-if="flag == index" @click="deleteOrder(selectOrdedel.id)">删除订单</view>
									<view class="used">
										<view class="used-1">联系卖家</view>
										<view class="used-2">去评价</view>
									</view>
								</view>
							</view>
						</view>
						<view class="mg-goodsCard-box" v-else>
							<!-- 卡片循环 -->
							<view class="mg-goodsCard-box-none" style="text-align: center;">
								<image src="../../static/allOrder/没有订单.png"></image>
								<view v-if="currs == 2">还没有相关订单</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
				
				<!-- 已完成 -->
				<swiper-item>
					<scroll-view scroll-with-animation="true" scroll-y="true" style="height:1242rpx;">
						<view class="mg-goodsCard-box" v-if="selectOrdedel != undefined">
							<!-- 卡片循环 -->
							<!-- <view class="mg-goodsCard" v-for="(item,index) in selectOrdedel" :key="index"> -->
								<view class="mg-goodsCard">
								<!-- 商铺logo和标题订单状态 -->
								<view class="mg-shop">
									<view class="mg-shop-img">
										<image :src="selectOrdedel.userAvatar" mode="aspectFill"></image>
										<view class="mg-shop-img-view">{{selectOrdedel.userName}}</view>
									</view>
									<view class="mg-dealState-pay">交易完成</view>
								</view>
								<!-- 订单详情 -->
								<view class="mg-goodsIntroduction">
									<image :src="selectOrdedel.goodsImg" mode="aspectFill"></image>
									<view class="mg-PurchasedGoods">
										<view class="mg-GoodsTitle">{{selectOrdedel.goodsName}}</view>
										<view class="mg-goodsPriceAndSum">
											<text class="price">
												<text>¥</text>
												{{selectOrdedel.price}}.00</text>
										</view>
									</view>
								</view>
								<!-- 更多和支付 -->
								<view class="mg-more">
									<text @click="deletedeal(index)">更多</text>
									<view class="deleteDeal" v-if="flag == index" @click="deleteOrder(selectOrdedel.id)">删除订单</view>
									<view class="used">
										<view class="used-1">联系卖家</view>
										<view class="used-1">已评价</view>
									</view>
								</view>
							</view>
						</view>
						<view class="mg-goodsCard-box" v-else>
							<!-- 卡片循环 -->
							<view class="mg-goodsCard-box-none" style="text-align: center;">
								<image src="../../static/allOrder/没有订单.png"></image>
								<view v-if="currs == 3">还没有相关订单</view>
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
				taber:['全部','待付款','待收货','待评价','已完成'],
				myDeal:[],
				userId:null,
				selectOrdedel:null,
				flag:null,
				selectAllOrdedel:[],
				currs:null,
				total:null,
				page:0,
				list:null,
				button:''
			}
		},
		onLoad(option) {
			this.userId = option.userId
			// console.log(this.userId,'用户id');
			this.curr = option.curr
			this.getSelectOrderr()
		},
		methods: {
			// 全部订单触底加载
			lowerBottomAll(){
				console.log("搜索触底加载",this.total);
				if(this.total > this.page*6){
					this.page = this.page + 1
					console.log(this.page,'页数');
					app.globalData.selectAllOrder({
						pageNum: this.page,
						pageSize:4,
						userId:this.userId,
					}).then(res => {
						if(res.data !== undefined) {
							let list = res.data.records
							this.selectAllOrdedel.push(...list)
							console.log('res----',this.selectAllOrdedel);
						} else {
							console.log('没有数据');
						}
					}).catch(err => {
						console.log(err,'err----');
					})
				}else{
					uni.hideLoading()
					console.log('到底了~');
					this.button = '到底了~'
				}
			},
			// 查询全部订单信息
			getAllOrder(){
				app.globalData.selectAllOrder({
					pageNum: 0,
					pageSize:4,
					userId:this.userId,
				}).then(res => {
					if(res.data !== undefined) {
						this.selectAllOrdedel = res.data.records
						this.total = res.data.total
						console.log('res----',this.selectAllOrdedel);
					} else {
						console.log('没有数据');
					}
				}).catch(err => {
					console.log(err,'err----');
				})
			},
			// 点击更多
			deletedeal(e) {
				if (this.flag == e) {
					this.flag = null
					console.log(this.flag,'111');
				} else {
					this.flag = e
					console.log(this.flag,'222');
				}
			},
			// 删除订单
			deleteOrder(id) {
				// console.log(e,'删除订单--------');
				this.flag = null
				let that = this
				uni.showModal({
					title: '删除订单',
					content: '确定删除该订单吗？',
					showCancel: true,
					success: function(res) {
						if (res.confirm) {
							that.flag=!that.flag
							console.log('删除成功');
							// app.globalData.deleteOrder({
							// 	id: id,
							// 	userId:that.userId ,
							// }).then(res => {
							// 	if(res.data !== undefined) {
							// 		console.log(res.data,'res----');
							// 	} else {
							// 		console.log('没有数据');
							// 	}
							// }).catch(err => {
							// 	console.log(err,'err----');
							// })
						} else if (res.cancel) {
							console.log('删除成功');
						}
					}
				});
			},
			//swiper-item
			setCurr(e) {
				this.curr = e.detail.current || e.currentTarget.dataset.index || 0;
				this.getSelectOrderr()
				// console.log("@@@",this.curr);
			},
			// 返回
			toBack(){
				uni.navigateBack()
			},
			//订单
			getSelectOrderr() {
				if(this.curr == 0){
					this.getAllOrder()
					// console.log("@@@00",this.curr);
				}else{
					this.currs = this.curr - 1
					// console.log("@@@11",this.currs,this.curr);
					app.globalData.selectOrderByStatus({
						userId: this.userId,
						status:this.currs,
					}).then(res => {
						if(res.data !== undefined) {
							const selectOrdedel = res.data
							this.selectOrdedel = selectOrdedel
							// const selectOrdedel = res.data
							// this.selectOrdedel.push(selectOrdedel);
							console.log('res----',this.selectOrdedel);
						} else {
							console.log('没有数据');
						}
					}).catch(err => {
						console.log(err,'err----');
					})
				}
			}
		},
	}
</script>

<style lang="scss">
	@import 'allOrder.scss';
</style>
