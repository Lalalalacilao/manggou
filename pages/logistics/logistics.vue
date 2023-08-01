<template>
	<view class="mg-logistics">
		<!-- 头部 -->
		<view class="mg-allOrder-top">
			<!-- 我的订单标题 -->
			<view class="mg-top">
				<image src="https://mang-gou.tos-cn-beijing.volces.com/address%2F%E8%BF%94%E5%9B%9E%403x%402x.png" @click="toBack"></image>
				<view class="">已签收</view>
				<image></image>
			</view>
		</view>
		<view class="mg-logistics-box">
			<view class="mg-logistics-box-del">
				<view class="mg-box-image">
					<image src="../../static/searchResult/1.png"></image>
				</view>
				<view class="mg-box">
					<view>物流公司：极兔快递</view>
					<view>物流单号：JT5203235106664</view>
				</view>
			</view>
		</view>
		<!-- <button class="button" @click="button">查询</button> -->
		<view class="box2">
			<view class="flow flex-y-center">
				<view class="line"></view>
				<view>
					<view class="item flex-y-center" v-for="(item,index) in flow" :key="index">
						<view class="dot flex-grow-0"></view>
						<view class="flex-grow-1">
							<view class="title">{{item.title}}</view>
							<view class="name">{{item.context}}</view>
							<view class="time">{{item.time}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="mg-line"></view>
	</view>
</template>

<script>
	import md5 from 'md5';
	const app = getApp();
	export default {
		data() {
			return {
				key:'vloUeRZk7197',//授权key
				customer:'DFCD2FDE91E2857A061A05D30206722C',//授权
				param: {
					com: "",
					num: "",
					phone: "",
					resultv2: "4",
					show: "0",
					order: "desc"
					
				},
				// param:'{"com":"jtexpress","num":"JT5203235106664","phone":"13821703972","from":"","to":"","resultv2":"0","show":"0","order":"desc"}',//快递信息
				sign:'B4E8AFFA863FCCEA749B982156E576A2',
				num:'',
				flag:false,
				flow:[]
			}
		},
		onLoad(option) {
			console.log(option);
			if(!option.adminOrderId) {
				uni.showToast({
					title: "数据错误",
					icon: "error"
				})
				return
			}
			this.button(option.adminOrderId);
		},
		methods: {
			
			async button(adminOrderId){
				// this.flag = true
				// var param = '{"com":"jtexpress","num":"JT5203235106664","phone":"13821703972","from":"","to":"","resultv2":"0","show":"0","order":"desc"}';
				// var newNum = '"num":"78351848667035'; // 将要替换成的单号
				// var newcom = '"com":"jtexpress'; // 快递
				
				// param = param.replace('"num":"JT5203235106664"', newNum,'"com":"jtexpress',newcom);
				// // 78351848667035
				// console.log(param);

				console.log("***************");
				const res = await this.getLogisticsInfo(adminOrderId);
				console.log(res);




				// app.globalData.getOrderLogisticsInfo({
				// 	adminOrderId,
				// }).then(res => {
				// 	this.param.com = res.data.company;
				// 	this.param.num = res.data.expressCode;
				// 	this.param.phone = res.data.phone;
				// 	this.sign = this.param + this.key + this.customer;
				// }).catch(err => {
				// 	console.log(err);
				// })
				
			
				
			},
			getLogisticsInfo() {
				return new Promise((resolve,reject) => {
					app.globalData.getOrderLogisticsInfo({
						adminOrderId,
					}).then(res => {
						// this.param.com = res.data.company;
						// this.param.num = res.data.expressCode;
						// this.param.phone = res.data.phone;
						// this.sign = this.param + this.key + this.customer;
						resolve(res);
					}).catch(err => {
						reject(err);
						// console.log(err);
					})
				})
				
				
				
				
				
				
			},
			
			kuaidi100() {
				uni.request({
					url:'https://poll.kuaidi100.com/poll/query.do' ,
					header: {
						"Content-Type": "application/x-www-form-urlencoded" //请求头信息
					},
					method: "POST",
					data:{
						customer:this.customer,
						sign:this.sign,
						param:this.param,
					},
					success: res => {
						console.log("$$$$$$$$$$$");
						this.flow = res.data.data
						console.log(this.flow,res);
					}
				})
			},
			
			
			
			toBack(){
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss">
.mg-logistics{
	background-color: #eff0f2;
}
.mg-line{
	padding: 20rpx;
}
.mg-logistics-box{
	padding-top: 200rpx;
	.mg-logistics-box-del{
		background-color: #fff;
		display: flex;
		justify-content: start;
		align-items: center;
		margin: 30rpx;
		border-radius: 20rpx;
		.mg-box-image{
			padding: 25rpx 25rpx 25rpx 25rpx;
			image{
				width:120rpx;
				height: 120rpx;
				border-radius: 20rpx;
			}
		}
		.mg-box{
			// margin-left: 10rpx;
		}
	}
}
.mg-allOrder-top{
	width: 750rpx;
	position: fixed;
	background-color: white;
	z-index: 99;
	// 全部订单
	.mg-top{
		background-color: white;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 110rpx;
		padding-bottom: 35rpx;
		image{
			margin-left:20rpx ;
			width: 44rpx;
			height: 44rpx;
		}
		view{
			font-size: 32rpx;
			font-family: PingFang HK-Semibold, PingFang HK;
			font-weight: 400;
			color: #333333;
			font-weight: 600;
		}
	}
}
	
.box2 {
	background: #fff;
	// margin: 0 20rpx;
	border-radius: 20rpx;
	margin: 30rpx;
	.flow {
		position: relative;
		overflow: hidden;
		margin: 20rpx 30rpx;

		.line {
			height: 65%;
			width: 1px;
			background: #eff0f2;
			position: absolute;
			left: 9rpx;
			z-index: 0;
		}

		.item {
			margin: 38rpx 0;

			.dot {
				width: 20rpx;
				height: 20rpx;
				background: #eff0f2;
				border-radius: 50%;
				position: relative;
				margin-right: 32rpx;

			}
			.flex-grow-1{
				padding-left: 40rpx;
				.title {
					color: #a5a5a5;
				}
				
				.name {
					font-size: 0.75rem;
					margin-top: 5rpx;
					color: #707070;
				}
				
				.time {
					font-size: 0.75rem;
					margin-top: 5rpx;
					color: #707070;
				}
				
			}
			
		}

		.item:nth-child(1) {
			color: #3493ff;

			.title {
				color: #3493ff;
			}

			.name {

				color: #3493ff;
			}

			.time {

				color: #3493ff;
			}

			.dot {
				background: #3493ff;

			}
		}
	}
}
</style>
