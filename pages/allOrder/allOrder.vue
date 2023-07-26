<template>
	<view class="mg-allOrder">
		<!-- 头部 -->
		<view class="mg-allOrder-top">
			<!-- 我的订单标题 -->
			<view class="mg-top">
				<image src="https://mang-gou.tos-cn-beijing.volces.com/address%2F%E8%BF%94%E5%9B%9E%403x%402x.png" @click="toBack"></image>
				<view class="">全部订单</view>
				<image></image>
			</view>
			<!-- 搜索框 -->
			<view class="mg-allOrder-search">
				<view class="mg-search">
					<image src="https://mang-gou.tos-cn-beijing.volces.com/index%2F%E7%BB%84%E4%BB%B6%2029%20%E2%80%93%206%403x.png"></image>
					<input type="text" placeholder="搜索我的订单" v-model="ordercontent" @input="handleInput">
				</view>
			</view>
			<!-- tab -->
			<view class="mg-allOrder-tab">
				<!-- 选择 -->
				<view 
					class="nav_item mg-taberOfservice-select" 
					v-for="(item,index) in taber" 
					:key="index" 
					@tap="setCurr" 
					:data-index="index" 
					:class="curr===index ? 'select' : ''"
				>
					<view>{{item}}</view>
					<view class="mt-Community-label-bottom"></view>
				</view>
			</view>
		</view>
		
		<!-- 内容 -->
		<view class="mg-allOrder-content">
			<swiper 
				style="height: 1242rpx;width: 100%;" 
				class="mg-allOrder-buttom" 
				:current="curr" 
				@change="setCurr"
			>
				<!-- 全部 -->
				<swiper-item>
					<scroll-view 
						scroll-with-animation="true" 
						scroll-y="true" 
						style="height:1242rpx;" 
						@scrolltolower="getAllOrder(pageNumAllOrder)"
					>
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
									<view class="mg-dealState-pay" v-if="item.status == 3">交易完成</view>
								</view>
								<!-- 订单详情 -->
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
								<!-- 更多和支付 -->
								<view class="mg-more">
									<text @click="deletedeal(index)">更多</text>
									<view class="deleteDeal" v-if="flag == index" @click="deleteOrder(item.id)">删除订单</view>
									<view class="used">
										<view class="used-1">联系卖家</view>
										<view class="used-2" v-if="item.status == 0">待付款</view>
										<view class="used-2" v-if="item.status == 1">确认收货</view>
										<view class="used-2" v-if="item.status == 2">去评价</view>
										<view class="used-4" v-if="item.status == 3">已评价</view>
										<view class="used-3" @click="OrderDetails(item.id)" v-if="item.status == 1 || item.status == 2 || item.status == 3">查看物流</view>
									</view>
								</view>
							</view>
						</view>
						<view class="mg-goodsCard-box" v-else>
							<!-- 卡片循环 -->
							<view class="mg-goodsCard-box-none" style="text-align: center;">
								<image src="https://mang-gou.tos-cn-beijing.volces.com/allOrder%2F%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20230724170906.png"></image>
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
					<scroll-view @scrolltolower="getSelectOrderr(pageNum)" scroll-with-animation="true" scroll-y="true" style="height:1242rpx;">
						<view class="mg-goodsCard-box" v-if="selectOrdedel != ''">
							<!-- 卡片循环 -->
							<view class="mg-goodsCard" v-for="(item,index) in selectOrdedel" :key="index">
							<!-- <view class="mg-goodsCard"> -->
								<!-- 商铺logo和标题订单状态 -->
								<view class="mg-shop">
									<view class="mg-shop-img">
										<image :src="item.userAvatar" mode="aspectFill"></image>
										<view class="mg-shop-img-view">{{item.userName}}</view>
									</view>
									<view class="mg-dealState-pay">待支付</view>
								</view>
								<!-- 订单详情 -->
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
								<!-- 更多和支付 -->
								<view class="mg-more">
									<text @click="deletedeal(index)">更多</text>
									<view class="deleteDeal" v-if="flag == index" @click="deleteOrder(item.id)">删除订单</view>
									<view class="used">
										<view class="used-1">联系卖家</view>
										<view class="used-2" @click="buy(item)">待付款</view>
									</view>
								</view>
							</view>
						</view>
						<view class="mg-goodsCard-box" v-else>
							<!-- 卡片循环 -->
							<view class="mg-goodsCard-box-none" style="text-align: center;">
								<image src="https://mang-gou.tos-cn-beijing.volces.com/allOrder%2F%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20230724170906.png"></image>
								<view v-if="currs == 0">还没有相关订单</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
				
				<!-- 待收货 -->
				<swiper-item>
					<scroll-view @scrolltolower="getSelectOrderr(pageNum)" scroll-with-animation="true" scroll-y="true" style="height:1242rpx;">
						<view class="mg-goodsCard-box" v-if="selectOrdedel != ''">
							<!-- 卡片循环 -->
							<view class="mg-goodsCard" v-for="(item,index) in selectOrdedel" :key="index">
								<!-- <view class="mg-goodsCard"> -->
								<!-- 商铺logo和标题订单状态 -->
								<view class="mg-shop">
									<view class="mg-shop-img">
										<image :src="item.userAvatar" mode="aspectFill"></image>
										<view class="mg-shop-img-view">{{item.userName}}</view>
									</view>
									<view class="mg-dealState-pay">待收货</view>
								</view>
								<!-- 订单详情 -->
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
								<!-- 更多和支付 -->
								<view class="mg-more">
									<text @click="deletedeal(index)">更多</text>
									<view class="deleteDeal" v-if="flag == index" @click="deleteOrder(item.id)">删除订单</view>
									<view class="used">
										<view class="used-1">联系卖家</view>
										<view class="used-2" @click="confirmReceipt(item.id)">确认收货</view>
										<view class="used-3" @click="OrderDetails(item.id)">查看物流</view>
									</view>
								</view>
							</view>
						</view>
						<view class="mg-goodsCard-box" v-else>
							<!-- 卡片循环 -->
							<view class="mg-goodsCard-box-none" style="text-align: center;">
								<image src="https://mang-gou.tos-cn-beijing.volces.com/allOrder%2F%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20230724170906.png"></image>
								<view v-if="currs == 1">还没有相关订单</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
				
				<!-- 待评价 -->
				<swiper-item>
					<scroll-view @scrolltolower="getSelectOrderr(pageNum)" scroll-with-animation="true" scroll-y="true" style="height:1242rpx;">
						<view class="mg-goodsCard-box" v-if="selectOrdedel != ''">
							<!-- 卡片循环 -->
							<view class="mg-goodsCard" v-for="(item,index) in selectOrdedel" :key="index">
								<!-- <view class="mg-goodsCard"> -->
								<!-- 商铺logo和标题订单状态 -->
								<view class="mg-shop">
									<view class="mg-shop-img">
										<image :src="item.userAvatar" mode="aspectFill"></image>
										<view class="mg-shop-img-view">{{item.userName}}</view>
									</view>
									<view class="mg-dealState-pay">待评价</view>
								</view>
								<!-- 订单详情 -->
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
								<!-- 更多和支付 -->
								<view class="mg-more">
									<text @click="deletedeal(index)">更多</text>
									<view class="deleteDeal" v-if="flag == index" @click="deleteOrder(item.id)">删除订单</view>
									<view class="used">
										<view class="used-1">联系卖家</view>
										<view class="used-2">去评价</view>
										<view class="used-3" @click="OrderDetails(item.id)">查看物流</view>
									</view>
								</view>
							</view>
						</view>
						<view class="mg-goodsCard-box" v-else>
							<!-- 卡片循环 -->
							<view class="mg-goodsCard-box-none" style="text-align: center;">
								<image src="https://mang-gou.tos-cn-beijing.volces.com/allOrder%2F%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20230724170906.png"></image>
								<view v-if="currs == 2">还没有相关订单</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
				
				<!-- 已完成 -->
				<swiper-item>
					<scroll-view @scrolltolower="getSelectOrderr(pageNum)" scroll-with-animation="true" scroll-y="true" style="height:1242rpx;">
						<view class="mg-goodsCard-box" v-if="selectOrdedel != ''">
							<!-- 卡片循环 -->
							<view class="mg-goodsCard" v-for="(item,index) in selectOrdedel" :key="index">
								<!-- <view class="mg-goodsCard"> -->
								<!-- 商铺logo和标题订单状态 -->
								<view class="mg-shop">
									<view class="mg-shop-img">
										<image :src="item.userAvatar" mode="aspectFill"></image>
										<view class="mg-shop-img-view">{{item.userName}}</view>
									</view>
									<view class="mg-dealState-pay">交易完成</view>
								</view>
								<!-- 订单详情 -->
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
								<!-- 更多和支付 -->
								<view class="mg-more">
									<text @click="deletedeal(index)">更多</text>
									<view class="deleteDeal" v-if="flag == index" @click="deleteOrder(item.id)">删除订单</view>
									<view class="used">
										<view class="used-1">联系卖家</view>
										<view class="used-4">已评价</view>
										<view class="used-3" @click="OrderDetails(item.id)">查看物流</view>
									</view>
								</view>
							</view>
						</view>
						<view class="mg-goodsCard-box" v-else>
							<!-- 卡片循环 -->
							<view class="mg-goodsCard-box-none" style="text-align: center;">
								<image src="https://mang-gou.tos-cn-beijing.volces.com/allOrder%2F%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20230724170906.png"></image>
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
				selectOrdedel:[],
				flag:null,
				selectAllOrdedel:[],
				currs:null,
				total:null,
				page:0,
				list:null,
				button:'',
				userInfo: {},
				pageNum: 1,
				pageNumAllOrder: 1,
				
				timer: null,
				timerAll: null
			}
		},
		watch: {
			curr(newValue,oldValue) {
				this.pageNum = 1;
				this.pageNumAllOrder = 1;
				
				this.selectOrdedel = [];
				this.selectAllOrdedel = [];
			}
		},
		methods: {
			// 查看物流
			OrderDetails(id){
				uni.showToast({
					title: "暂未开放，敬请期待",
					icon: "none"
				})
				// uni.navigateTo({
				// 	url:'/pages/logistics/logistics?id=' + id
				// })
			},
			// 查询全部订单信息
			getAllOrder(pageNum = 1,pageSize = 6){
				if(this.selectAllOrdedel.length !== this.total || this.total === null) {
					app.globalData.selectAllOrder({
						pageNum,
						pageSize,
						userId: this.userInfo.id,
					}).then(res => {
						if(res.data !== undefined) {
							this.pageNumAllOrder++;
							this.total = res.data.total;
							const newLenght = res.data.records.length;
							this.selectAllOrdedel = this.selectAllOrdedel.concat(this.dataHandle(res.data.records,newLenght));
							console.log("^^^^^^^^^^^^^^^^^^^^^^^^^");
							console.log(res.data.records);
							console.log(this.selectAllOrdedel);
						} else if(pageNum === 1) {
							uni.showToast({
								title: "还没有订单哦",
								icon: "none"
							})
						} else {
							uni.showToast({
								title: "没有数据了哦~",
								icon: "none"
							})
						}
					}).catch(err => {
						uni.showToast({
							title: err.message,
							icon: "error"
						})
					})
				} else {
						uni.hideLoading()
						this.button = '到底了~'
				}
			},
			// 点击更多
			deletedeal(e) {
				if (this.flag == e) {
					this.flag = null
					// console.log(this.flag,'111');
				} else {
					this.flag = e
					// console.log(this.flag,'222');
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
							app.globalData.deleteOrder({
								id: id,
								userId:that.userInfo.id,
							}).then(res => {
								console.log(res,'res----');
								// uni.redirectTo({
								// 	url:'/pages/allOrder/allOrder?curr=' + this.curr
								// })
								uni.redirectTo({
									url:'/pages/allOrder/allOrder?userId=' + this.userInfo.id
								})
								console.log('删除成功');
							}).catch(err => {
								console.log(err,'err----');
							})
						} else if (res.cancel) {
							console.log('删除失败');
						}
					}
				});
			},
			// 节流
			// throttle(fun,t) {
			//     let timer = null;
			//     return function() 
			// }, 

			//swiper-item
			setCurr(e) {
				this.curr = e.detail.current || e.currentTarget.dataset.index || 0;
				this.page = 1
				
				// 根据状态获取订单
				// 节流控制
				if(!timer){
					console.log("******************");
					timer = setTimeout(function() {
						this.getSelectOrderr();
						// 清除定时器后，以下次可以继续定时
						timer = null;
					},50);
				}
				
				// 获取所有订单
				if(this.curr === 0) {
					// 节流控制
					if(!timerAll){
						timerAll = setTimeout(function() {
							this.getAllOrder();
							// 清除定时器后，以下次可以继续定时
							timerAll = null;
						},50);
					}
				}
			},
			// 返回
			toBack(){
				uni.navigateBack({
					delta: 1
				})
			},
			//订单
			getSelectOrderr() {
				this.currs = this.curr - 1
				app.globalData.selectOrderByStatus({
					userId: this.userInfo.id,
					status: this.currs,
					pageNum: this.pageNum,
					pageSize: 6
				}).then(res => {
					if(res.data.records != undefined) {
						const newLenght = res.data.records.length;
						this.pageNum++;
						this.selectOrdedel = this.selectOrdedel.concat(this.dataHandle(res.data.records,newLenght));
						console.log("__________________________");
						console.log(res.data.records);
						console.log(this.selectOrdedel);
					}
				}).catch(err => {
					uni.showToast({
						title: err.message,
						icon: "error"
					})
				})
			},
			// 数据处理逻辑
			dataHandle(arr,newLenght) {
 				for(let i = arr.length - newLenght; i < arr.length; i++) {
					arr[i].goodsImg = JSON.parse(arr[i].goodsImg)[0];
					if(arr[i].expireTime) {
						arr[i].expireTime = arr[i].expireTime.split(" ")[1];
					}
				}
				return arr;
			},
			// 待付款按钮
			buy(item) {
				uni.showToast({
					title:"加载中",
					icon:"loading"
				})
				this.getWxPayById(item.adminOrderId);
			},
			// 根据id获取微信支付签名
			getWxPayById(outTradeNo) {
				app.globalData.getWxPaymentSignature({
					outTradeNo,
				}).then (res => {
					this.wxPayment(JSON.parse(res.data));
				}).catch(err => {
					uni.showToast({
						title: err.message,
						icon: "error"
					})
				})
			},
			// 支付
			wxPayment(data) {
				uni.requestPayment({
					provider:'wxpay',
					timeStamp: data.timeStamp,
					nonceStr: data.nonceStr,
					package: data.packageStr,
					signType: data.signType,
					paySign: data.paySign,
					success: (res) => {
						uni.showToast({
							title:'支付成功',
							icon:'success'
						})
						uni.navigateTo({
							url:'/pages/allOrder/allOrder?curr=' + 2 + '&userId=' + this.userInfo.id
						})
					},
					fail: (err) => {
						uni.showToast({
							title:'支付失败',
							icon:'error'
						})
					}
				})
			},
			// 确认收货
			confirmReceipt(orderId) {
				app.globalData.confirmReceipt({
					orderId,
				}).then(res => {
					this.curr = 4; 
				}).catch(err => {
					uni.showToast({
						title: err.message,
						icon: "error"
					})
				})
			}
		},
		onLoad(option) {
			this.userInfo = uni.getStorageSync("userInfo");
			
			if(option.curr) {
				this.curr = option.curr
			} else {
				this.getAllOrder();
			}
		}
	}
</script>

<style lang="scss">
	@import 'allOrder.scss';
</style>
