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
			<view class="mt-EditInformation-head-img" >
				<!-- <image src="https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0"></image> -->
				<image :src="avater" mode="aspectFill" @tap="avatarChoose"></image>
			</view>
			<!-- 添加图片 -->
			<view class="mt-EditInformation-head-addimg">
				<view>
					<image src="https://maotaiwx.tos-cn-beijing.volces.com/EditInformation%2Fphoto.png" @tap="avatarChoose"></image>
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
					<input type="text" placeholder="填写昵称" :value="nickName" @input="bindnickName" placeholder-class="place" :maxlength="maxLen"/>
				</view>
				<view class="mt-EditInformation-input">
					<view class="">电话</view>
					<input :placeholder="phone" type="number" disabled="false">
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
	export default {
		data() {
			return {
				avater:'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
				nickName: '',
				maxLen: 10,
				headimg: '',
				phone:"",
				images:'',
				Url: '',
			}
		},
		onLoad() {
		},
		methods: {
			// 添加头像
			avatarChoose(){
				console.log('添加头像');
			},
			// 保存
			save(){
				console.log('保存');
			},
			// 返回
			toback(){
				uni.navigateBack()
			},
			// 取消保存
			back(){
				console.log('取消');
			}
		}
	}
</script>

<style lang="scss">
	@import 'EditInformation.scss';
</style>
