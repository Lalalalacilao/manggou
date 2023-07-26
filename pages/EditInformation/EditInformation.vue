<template>
	<view class="mt-EditInformation">
		<!-- 头 -->
		<view class="mt-EditInformation-head" style="background-image: url('https://mang-gou.tos-cn-beijing.volces.com/personal%2F%E7%BB%84%E4%BB%B6%2022%20%E2%80%93%201%402x.png');">
			<!-- 文字 -->
			<view class="mt-EditInformation-head-text">
				<image src="https://maotaiwx.tos-cn-beijing.volces.com/EditInformation%2Fback.png"  @click="toback"></image>
				<view>编辑资料</view>
				<image src=""></image>
			</view>
			<!-- 头像 -->
			<view class="mt-EditInformation-head-img" @click="avatarChoose">
				<image :src="avater" mode="aspectFill"></image>
			</view>
			<!-- 添加图片 -->
			<view class="mt-EditInformation-head-addimg" @click="avatarChoose">
				<view>
					<image src="https://maotaiwx.tos-cn-beijing.volces.com/EditInformation%2Fphoto.png"></image>
				</view>
			</view>
		</view>
		<!-- 内容 -->
		<view class="mt-EditInformation-body">
			<view class="mt-EditInformation-con">
				<view class="mt-EditInformation-title">个人信息</view>
				<view class="mt-EditInformation-input">
					<view class="">昵称</view>
					<!-- <input placeholder="默认昵称"> -->
					<input type="text" placeholder="填写昵称" v-model="nickName" placeholder-class="place" :maxlength="maxLen"/>
				</view>
				<view class="mt-EditInformation-input">
					<view class="">电话</view>
					<input type="number" placeholder="请输入电话(选填)" v-model="phone">
				</view>
				<view class="mt-EditInformation-button">
					<!-- <button @click="cancel">取消</button> -->
					<button @click="back">取消</button>
					<button @click="save">保存</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const app = getApp();
	export default {
		data() {
			return {
				avater:'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
				
				nickName: '',
				
				maxLen: 10,
				
				phone: "",
				
				// 用户信息
				userInfo: {},
				
			}
		},
		onLoad() {
			this.userInfo = uni.getStorageSync("userInfo");
			console.log(this.userInfo);
			this.avater = this.userInfo.userAvatar;
		},
		methods: {
			// 添加头像
			avatarChoose(){
				console.log('选择头像');
				this.uploadAvatar();
			},
			// 图片上传
			uploadAvatar() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						console.log(res);
						uni.uploadFile({
							url: 'https://www.ydtloan.com/tos/uploadFile',
							files: res.tempFiles,
							filePath: res.tempFilePaths[0],
							name: 'file',
							header: {
								token: uni.getStorageSync("token"),
							},
							success: (res) => {
								this.avater = JSON.parse(res.data).url;
							},
							fail: (err) => {
								uni.showToast({
									title: err.message,
									icon: "error"
								})
							}
						})
						
					},
					fail: (err) => {
						uni.showToast({
							title: err.message,
							icon: "error"
						})
					}
				});
			},
			// 保存
			save(){
				// 头像不为空
				if(!this.avater) {
					uni.showToast({
						title: "头像不能为空",
						icon: "error"
					})
					return
				}
				// 姓名不为空
				console.log("@@@",this.nickName);
				if(this.nickName === "") {
					uni.showToast({
						title: "昵称不能为空",
						icon: "error"
					})
					return
				}
				// 手机号码正确
				if(this.phone !== "") {
					if(!(/^1[3456789]\d{9}$/.test(this.phone))) {
						uni.showToast({
							title: "手机号码格式错误",
							icon: "error"
						})
					}
				}
				
				app.globalData.editUserInfo({
					userAvatar: this.avater,
					userId: this.userInfo.id,
					userName: this.nickName
				}).then(res => {
					// 更新本地存储
					this.userInfo.userAvatar = this.avater;
					this.userInfo.userName = this.nickName;
					if(this.phone !== "") {
						this.userInfo.userPhone = this.phone;
					}
					uni.setStorageSync("userInfo",this.userInfo);
					
					uni.showToast({
						title: "编辑成功",
					})
					uni.navigateBack({
						delta: 1
					})
				}).catch(err => {
					uni.showToast({
						title: err.message,
						icon: "error"
					})
				})
				
				
			},
			// 返回
			toback(){
				uni.navigateBack({
					delta: 1
				})
			},
			// 取消保存
			back(){
				this.avater = this.userInfo.userAvatar;
				this.nickName = "";
				this.phone = "";
			}
		}
	}
</script>

<style lang="scss">
	@import 'EditInformation.scss';
</style>
