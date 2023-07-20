<template>
	<!-- <view class="pages_height" :style="[{height:stockListHeight + 'px'}]"> -->
	<view class="pages_height">
		<view class="mt-Customer">
			<view style="width: 100%;height: 76rpx;">
				
			</view>
			<view style="width:100%;height: 100rpx; display: flex; justify-content: space-around;align-items: center;">
				<image style="flex: 1;height: 28rpx;margin-left: 28rpx;" src="https://maotaiwx.tos-cn-beijing.volces.com/Customer%2Ffanhui%402x.png" @click="back"></image>
				<view style="flex: 28;box-sizing: border-box; padding-left: 276rpx; font-size: 36rpx;">
					客服中心
				</view>
			</view>
		</view>
		<view class="intelligent_main" :style="[{height:key_height}]">
			<scroll-view :scroll-y="true" :style="[{height:key_height}]"
				:scroll-into-view="controlId ? bottomId : 'msg'+controlId" :scroll-with-animation="true"
				class="intelligent_chat" @click="other_click" @dragging="other_click" :show-scrollbar="false">
				<view v-for="(item, index) in msg_list" :key="index" :class="'intelligent_chat_view'+index">
					<view :class="item.left ? 'robot_word' : 'patient_word'">
						<!-- <image v-if="item.left" style="width: 60rpx;height: 60rpx;margin-right: 32rpx;" src="https://maotaiwx.tos-cn-beijing.volces.com/Customer%2Fmt-robot.png"></image> -->
						<view v-if="item.msg">
							<view>
								{{item.msg}}
							</view>
						</view>
						<view v-else>
							<view>
								{{item.title}}
							</view>
							<view v-if="item.data">
								<view v-for="(data, data_index) in item.data" :key="data.id">
									<view class="keyHighlight" v-html="data.keyHighlight" v-if="data.keyHighlight"
										@click="keyHighlight(data,data_index)"></view>
								</view>
							</view>

						</view>
					</view>
				</view>
				<view :id="'dade'+num" v-if="controlId"></view>
				<view :id="'msg'+controlId" v-else></view>
			</scroll-view>

			<view class="intelligent_input" :style="{ bottom: bottom }">
			<!-- <view class="intelligent_input"> -->
				<input type="text" placeholder-style="font-size: 30rpx;color: #C8C8C8;" placeholder="请输入…"
					:adjust-position="false" v-model="value" @confirm.prevent="input_send" :focus="fouse"
					:hold-keyboard="hold_keyboard" :confirm-hold="hold_keyboard" @focus="i_focus" @blur="blur"
					confirm-type="发送"></input>
				<view class="input_send" @touchend.prevent="input_send">
					<!-- <image src="https://maotaiwx.tos-cn-beijing.volces.com/Customer%2F_fasong%402x.png" mode=""></image> -->
					<image src="../../static/allOrder/发送.png" mode=""></image>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				// 输入框value
				value: '',
				// 输入框距底部高度（键盘显示隐藏高度变化）
				bottom: '0px',
				// 对话框数组
				msg_list: [{
					left: true,
					msg: '嗨~我是小助，您身边的智能助手~',
					data: null
				}, {
					left: true,
					msg: '请问有什么可以帮助您的？',
					data: null
				}],
				// 容器高度
				key_height: '0px',
				// 容器滚动底部定位id
				bottomId: '',
				// 数组长度，用到定位id
				num: 2,
				// 输入框聚焦
				fouse: false,
				// 键盘不收起
				hold_keyboard: true,
				// 防抖
				boolen: true,
				// 定位id
				controlId: false,
				inputHeight: 0,
				stockListHeight: 0,
				i:''
			}
		},
		// onReady() {
		// 	var _self = this;
		// 	uni.getSystemInfo({
		// 		success: (e) => { // resu 可以获取当前屏幕的高度
		// 			_self.stockListHeight = e.windowHeight - uni.upx2px(905);
		// 			console.log(_self.stockListHeight, "00000000000");
		// 		}
		// 	})
		// 	uni.hideLoading();
		// },
		onLoad(options) {
			this.value = options.question
		},
		watch: {
			inputHeight(n, o) {
				console.log(this.inputHeight,'ppp');
				this.inputHeight = n
				const res_s = uni.getSystemInfoSync();
				this.key_height =
					`${res_s.windowHeight -n}px`;
				console.log(this.key_height,'000');
			},
		},
		onShow() {
			this.keyboardHeightChange()
			this.compute_input_height()
			const res_s = uni.getSystemInfoSync();
			this.key_height =
				`${res_s.windowHeight - this.inputHeight}px`;
		},
		onUnload() {
			uni.offKeyboardHeightChange(); //取消监听键盘高度变化事件，避免内存消耗
		},
		methods: {
			compute_input_height() {
				const query = uni.createSelectorQuery().in(this); //这样写就只会选择本页面组件的类名box的
				query.selectAll('.intelligent_input').boundingClientRect(
					data => {
						console.log(data[0].height);
						this.inputHeight = data[0].height+90
					}).exec();
			},
			// 点击键盘以外的地方收起键盘
			other_click() {
				uni.hideKeyboard()
			},
			// 监听键盘高度事件
			keyboardHeightChange() {
				uni.onKeyboardHeightChange((res) => { //监听键盘高度变化
					const res_keyboard = uni.getSystemInfoSync();
					let key_height = res.height - (res_keyboard.screenHeight - res_keyboard.windowHeight +
						res_keyboard.safeAreaInsets.bottom)
					this.bottom = `${res.height ?  key_height : 0 }px`;
			
					this.compute_input_height()
			
					if (res.height) {
						this.key_height =
							`${res_keyboard.windowHeight - this.inputHeight - key_height }px`;
					} else {
						this.key_height =
							`${res_keyboard.windowHeight - this.inputHeight}px`;
					}
			
					console.log(this.key_height);
					this.num = this.msg_list.length;
					this.bottomId = 'dade' + (this.num);
				})
			},
			// 点击回答的高亮，跳转页面
			keyHighlight(data, data_index) {
				// uni.navigateTo({
				// 	url: `./problems?data=${encodeURIComponent(JSON.stringify(data))}`
				// })
			},
			// 输入框聚焦事件
			// 输入框聚焦事件
			i_focus() {
				this.fouse = true;
				this.hold_keyboard = true;
				// 换id
				this.controlId = true
			},
			blur() {
				// 换id
				this.controlId = false
			},
			// input发送事件
			async input_send() {
				if (!this.value.toString()) {
					return
				}
				let timer
				if (timer) clearTimeout(timer)
				if (this.boolen) {
					this.boolen = false
					// 增加回答，自己的话
					this.msg_list = [...this.msg_list, {
						left: false,
						msg: this.value,
						data: null
					}]
					let res = await uni.request({
						url: 'http://180.184.43.238:8082/api/helpFeedback/search',
						method: 'GET',
						header: {
							"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" //请求头信息
						},
						data: {
							question: this.value
						},
						success: (res) => {
							console.log(res.data.list,'0000000',this.value);
							if(res.data.total == 0 || res.data.total != 0 ){
								if (res.data.list !== '') {
									// 增加回答，机器人回答的话
									// this.msg_list = [...this.msg_list, {
									// 	left: true,
									// 	title: `解答：`,
									// 	data: res.data.list
									// }]
									if (res.data.list instanceof Array && res.data.list != '') {
										res.data.list.forEach(item => {
											this.msg_list.push({
												left: true,
												title: "Q："+item.question+"\nA："+item.answer
											})
										})
									}else {
										// this.msg_list.push({
										// 	left: true,
										// 	title: '没有找到该问题答案，请换种问法试一试。'
										// })
										if (this.value.match(/你好|您好/)) {
											this.msg_list = [...this.msg_list, {
												left: true,
												title: '您好，我是小助，您有什么问题可以直接问我哦~',
												data: null
											}]
										} else {
											this.msg_list = [...this.msg_list, {
												left: true,
												title: '没有找到该问题答案，请换种问法试一试。',
												data: null
											}]
										}
									}
									console.log(this.msg_list);
								}
								this.value = '';
								this.num = this.msg_list.length;
								this.bottomId = 'dade' + (this.num);
							}else {
								// 出什么问题,toast出来
							}
							timer = setTimeout(() => {
								this.boolen = true
							}, 300)
						},
						fail: (res) => {
							console.log(res,'00000');
						}
					})
				}
			},
			// 返回
			back() {
				uni.navigateBack()
			},
		}
	}
</script>

<style scoped lang="scss">
	@import "Customer.scss";
</style>