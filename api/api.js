import request from './request.js';

// 接口封装
export default {
	// 用户登录
	login(params) {
		return request('/user/login', 'POST', params);
	},
	// 请求商品分页
	goods(params) {
		return request('/goods', 'GET', params);
	},
	// 请求论坛分页
	getCommunity(params) {
		return request('/community/getCommunity', 'GET', params);
	},
	// 发布帖子
	addCommunity(params) {
		return request('/community/addCommunity', 'POST', params);
	},
	// 发布商品
	addGoods(params) {
		return request('/goods/addGoods', 'POST', params);
	},
	// 获取地址
	getUserAddress(params) {
		return request('/user_address/getUserAddress', 'GET', params);
	},
	// 删除指定地址
	deleteAddress(params) {
		return request('/user_address/deleteAddress', 'POST', params);
	},
	// 设置默认地址
	setDefault(params) {
		return request('/user_address/setDefault', 'POST', params);
	},
	// 添加地址
	addUserAddress(params) {
		return request('/user_address/addUserAddress', 'POST', params);
	},
	// 问题反馈
	addProblemFeedback(params) {
		return request('/problemFeedback/addProblemFeedback', 'POST', params);
	},
	// 获取用户信息
	getUserInfo(params) {
		return request('/user/getUserInfo', 'GET', params);
	},
	// 根据id查询商品信息
	selectOneGoods(params) {
		return request('/goods/selectOneGoods', 'GET', params);
	},
	// 根据订单状态查询订单信息
	selectOrderByStatus(params) {
		return request('/order/selectOrderByStatus', 'GET', params);
	},
	// 删除订单信息
	deleteOrder(params) {
		return request('/order/deleteOrder', 'GET', params);
	},
	// 根据用户id查询订单数据
	selectAllOrder(params) {
		return request('/order/selectAllOrder', 'GET', params);
	},
	// 判断是否点赞
	exist(params) {
		return request('/userLike/exist', 'GET', params);
	},
	// 商品添加评论
	userGoodsAddParentComment(params) {
		return request('/user_goods_comment/addParentComment', 'POST', params);
	},
	// 获取商品评论列表
	getCommentList(params) {
		return request('/user_goods_comment/getCommentList', 'POST', params);
	},
	// 用户商品添加回复
	userGoodsAddSubComment(params) {
		// return request("/user_goods_comment/getCommentList","POST",params);
		return request('/user_goods_comment/addSubComment', 'POST', params);
	},
	// 退出登录
	logout(params) {
		return request('/user/logout', 'POST', params);
	},
	// 专栏商品请求分页
	getSpecialColumnGoods(params) {
		return request('/backendGoods/getBackendGoods', 'GET', params);
	},
	// 根据id查询专栏商品详情
	getSpecialColumnGoosDetailById(params) {
		return request('/backendGoods/getOneBackendGoods', 'GET', params);
	},
	// 专栏商品详情拉取
	specialColumnGoosComment(params) {
		return request('/backend_goods_comment/getCommentList', 'POST', params);
	},
	// 专栏商品添加评论
	specialColumnAddParentComment(params) {
		return request('/backend_goods_comment/addParentComment', 'POST', params);
	},
	// 专栏商品添加回复
	specialColumnAddReply(params) {
		return request('/backend_goods_comment/addSubComment', 'POST', params);
	},
	// 订单生成
	orderForGoods(params) {
		return request('/wechatPay/generateWeixinPaySigner', 'POST', params);
	},
	// 从缓存中获取微信支付签名
	getWxPaymentSignature(params) {
		return request('/wechatPay/getCachePaySign', 'POST', params);
	},
	confirmReceipt(params) {
		return request('/order/receipt', 'POST', params);
	},
	// 取消点赞
	cancel(params) {
		return request('/userLike/cancel', 'POST', params);
	},
	// 点赞
	add(params) {
		return request('/userLike/add', 'POST', params);
	},
	// 编辑资料
	editUserInfo(params) {
		return request("/user/updateUserInfo","POST", params);
	},
	// 根据用户id获取用户手机号
	getUserPhoneById(params) {
		return request("/user/getUserPhone","GET",params);
	},
	// 搜索接口
	search(params) {
		return request("/search/getGoods","GET",params);
	},
	// 查询用户发布
	searchUserPublish(params) {
		return request('/goods/getUserGoods', 'GET', params);
	},
	// 根据商品id查询商品信息
	getGoodInfo(params) {
		return request('/goods/selectOneGoods', 'GET', params);
	},
	// 根据商品id修改商品信息
	modifyGoodInfo(params) {
		return request('/goods/updateGoods', 'POST', params);
	},
	// 根据商品id删除商品信息
	delGood(params) {
		return request('/goods/deleteGoods', 'POST', params);
	},
};
