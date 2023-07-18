<template>
	<view class="content">
		<view class="top">
			<view class="status_bar"></view>
			<view class="top_title clear">
				<view class="title float">消息</view>
				<view class="clear_mess float" @click="toClear">
					<image src="../../static/message/清除@2x.png" mode=""></image>
				</view>
			</view>
			<view class="search">
				<view class="search_btn">
					<image src="../../static/message/搜索@2x.png" mode=""></image>
				</view>
				<input type="text" placeholder="搜索聊天记录/联系人">
			</view>
		</view>
		<view class="fill">
			
		</view>
		
		
		<view class="message_list clear">
			<view 
				class="message_item" 
				v-for="item in messageList" 
				:key="item.id" 
				:class="item.isDelete ? 'deleteBtn' : ''" 
				@click="toChat(item)"
				@touchstart="start($event)" 
				@touchend="end($event,item)"
			>
				<view class="mess_left">
					<image :src="item.head" mode=""></image>
					<view class="mess_tips" v-if="item.news">
						{{item.news}}
					</view>
				</view>
				
				<view class="border_set">
					<view class="mess_middle">
						<view class="nikename">
							{{item.nikename}}
						</view>
						<view class="mess_pre">
							{{item.lastMes}}
						</view>
						<view class="date">
							{{item.date}}
						</view>
					</view>
					
					<view class="goods_pre">
						<image :src="item.goodsPreview" mode=""></image>
					</view>
				</view>
				
				<view class="delete float" @click="deleteThis(item)">
					<image src="../../static/message/删除@2x.png" mode="aspectFit"></image>
				</view>
			</view>
			
			
			
			
			
			
			
			
			
			
		</view>
		
		
		
		
		<tabBar routePath = '/pages/message/message'></tabBar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				messageList: [
					{
						id: "001",
						head: "../../static/forum/161686722521_.pic@2x.png",
						nikename: "亚历山大亚",
						lastMes: "你你你你你，你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你",
						date: "06-03",
						goodsPreview: "../../static/index/81686624219_.pic@3x.png", 
						news: "3",
						isDelete: false,
					},
					{
						id: "002",
						head: "../../static/forum/161686722521_.pic@2x.png",
						nikename: "亚历山大亚",
						lastMes: "你你你你你，你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你",
						date: "06-03",
						goodsPreview: "../../static/index/81686624219_.pic@3x.png", 
						news: "3",
						isDelete: false,
					},
					{
						id: "003",
						head: "../../static/forum/161686722521_.pic@2x.png",
						nikename: "亚历山大亚",
						lastMes: "你你你你你，你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你",
						date: "06-03",
						goodsPreview: "../../static/index/81686624219_.pic@3x.png", 
						news: "3",
						isDelete: false,
					},
				],
				isDelete: false,
				
				// 右滑控制变量
				startData:{
					clientX:'',
					clientY:''
				}
			}
		},
		methods: {
			toClear() {
				console.log("清除消息");
			},
			toChat(item) {
				
			},
			deleteThis(item) {
				console.log("删除",item);
			},
			
			// 右滑事件控制
			start(e) {
				this.startData.clientX=e.changedTouches[0].clientX;             
				this.startData.clientY=e.changedTouches[0].clientY;
			},
			end(e,item) {
				   // console.log(e)
				const subX=e.changedTouches[0].clientX-this.startData.clientX;
				const subY=e.changedTouches[0].clientY - this.startData.clientY;
				if(subY>50 || subY<-50){
					console.log('上下滑')
				}else{
					if(subX>50){
						item.isDelete = false;
					}else if(subX<-50){
						item.isDelete = true;
					}else{
						console.log('无效')
					}
				}
			}
		}
	}
</script>

<style lang="scss">
// 通用设置
.float {
	float: left;
}
.clear {
	overflow: hidden;
	content: "";
	clear: left;
}
// 顶部
.top {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	padding-left: 32rpx;
	background: linear-gradient(#F5DF9C , #F2D86D);
	font-family: PingFang HK-Semibold, PingFang HK;
	padding: 0rpx 32rpx 28rpx 32rpx;
	.status_bar {
		height: 88rpx;
	}
	.top_title {
		font-size: 0;
		padding-top: 10rpx;
		padding-bottom: 13rpx;
		vertical-align: baseline;
		.title {
			font-weight: 600;
			color: #0D0D26;
			font-size: 44rpx;
			margin-right: 12rpx;
		}
		.clear_mess {
			margin-top: 6rpx;
			image {
				width: 48rpx;
				height: 48rpx;
			}
		}
	}
	.search {
		position: relative;
		padding-top: 13rpx;
		.search_btn {
			position: absolute;
			left: 0;
			top: 13rpx;
			
			width: 92rpx;
			height: 80rpx;
			// background-color: red;
			display: flex;
			align-items: center;
			border-radius: 16rpx;
			image {
				width: 37.9rpx;
				height: 37.96rpx;
				margin: 0 auto;
				line-height: 80rpx;
			}
			margin-bottom: 28rpx;
		}
		input {
			box-sizing: border-box;
			width: 686rpx;
			height: 80rpx;
			padding: 20rpx 328rpx 20rpx 92rpx;
			background-color: #fff;
			color: #999999;
			font-size: 28rpx;
			font-family: PingFang HK-Regular, PingFang HK;
			font-weight: 400;
			border-radius: 16rpx;
			
		}
	}
}
.fill {
	height: 292rpx;
}


.message_list {
	padding: 10rpx 0rpx;
	.message_item {
		display: flex;
		// justify-content: space-between;
		align-items: center;
		padding-top: 34rpx;
		padding-left: 32rpx;
		height: 184rpx;
		box-sizing: border-box;
		.mess_left {
			// display: none;
			position: relative;
			// background-color: red;
			margin-right: 40rpx;
			margin-top: 2rpx;
			margin-bottom: 32rpx;
			image {
				width: 120rpx;
				height: 120rpx;
			}
			.mess_tips {
				position: absolute;
				right: 2rpx;
				bottom: -2rpx;
				box-sizing: border-box;
				width: 40rpx;
				height: 40rpx;
				background: linear-gradient(#FC6F90,#FC7D75);
				border: 2rpx solid #FFFFFF;
				border-radius: 50%;
				text-align: center;
				line-height: 40rpx;
				font-size: 26rpx;
				color: #fff;
			}
		}
		.border_set {
			// display: none;
			padding: 0rpx 32rpx 28rpx 0;
			// border: 2rpx solid #EFEFEF;
			border-bottom: 2rpx solid #EFEFEF;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.mess_middle {
				font-size: 0;
				font-family: PingFang HK-Semibold, PingFang HK;
				margin-right: 38rpx;
				.nikename {
					font-size: 32rpx;
					color: #484848;
					font-weight: 600;
					margin-bottom: 8rpx;
				}
				.mess_pre {
					width: 364rpx;
					color: #999999;
					font-size: 26rpx;
					margin-bottom: 8rpx;
					overflow:hidden;
					text-overflow: ellipsis;
					-webkit-line-clamp: 1;
					display: -webkit-box;
					-webkit-box-orient: vertical;
				}
				.date {
					font-size: 20rpx;
					color: #999999;
				}
			}
			
			.goods_pre {
				image {
					border-radius: 16rpx;
					width: 124rpx;
					height: 124rpx;
				}
			}
		}

		
	}
	
}




.delete {
	// display: none;
	transition: all 1s;
	width: 96rpx;
	height: 184rpx;
	text-align: center;
	line-height: 184rpx;
	background: linear-gradient(#FB4136,#FC6D5F);
	margin-top: -32rpx;
	margin-left: 8rpx;
	image {
		width: 32rpx;
		height: 32rpx;
	}
}
.deleteBtn {
	transition: all 0.3s;
	margin-left: -96rpx;
}



</style>
