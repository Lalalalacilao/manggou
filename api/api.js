import request from "./request.js";

// 接口封装
export default {
	// 用户登录
	login(params) {
		return request("/user/login","POST",params);
	},
	// 请求商品分页
	goods(params) {
		return request("/goods","GET",params);
	},
	// 请求论坛分页
	getCommunity(params) {
		return request("/community/getCommunity","GET",params);
	},
	// 发布帖子
	addCommunity(params) {
		return request("/community/addCommunity","POST",params);
	},
	// 发布商品
	addGoods(params) {
		return request("/goods/addGoods","POST",params);
	},
	// 获取地址
	getUserAddress(params) {
		return request("/user_address/getUserAddress","GET",params);
	},
	// 删除指定地址
	deleteAddress(params) {
		return request("/user_address/deleteAddress","POST",params);
	},
	// 设置默认地址
	setDefault(params) {
		return request("/user_address/setDefault","POST",params);
	},
	// 添加地址
	addUserAddress(params) {
		return request("/user_address/addUserAddress","POST",params);
	},
	// 问题反馈
	addProblemFeedback(params) {
		return request("/problemFeedback/addProblemFeedback", "POST", params);
	},
	// 获取用户信息
	getUserInfo(params) {
		return request("/user/getUserInfo","GET",params);
	},
	// 根据id查询商品信息
	selectOneGoods(params) {
		return request("/goods/selectOneGoods","GET",params);
	},
	// 根据订单状态查询订单信息
	selectOrderByStatus(params) {
		return request("/order/selectOrderByStatus","GET",params);
	},
	// 删除订单信息
	deleteOrder(params) {
		return request("/order/deleteOrder","GET",params);
	},
	//根据用户id查询订单数据
	selectAllOrder(params) {
		return request("/order/selectAllOrder","GET",params);
	}
}