// 全局请求封装

export default (url, method, params) => {
	let token = uni.getStorageSync('token');
	// 提示框
	uni.showLoading({
		title: "加载中"
	});

	return new Promise((resolve, reject) => {
		uni.request({
				url: "https://www.ydtloan.com" + url,
				method: method,
				header: {
					token:token,
					"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
				},
				data: {
					...params
				},
				success(res) {
					if(res.statusCode === 200) {
						// 成功
						resolve(res.data)
					} else if(res.statusCode != 200) {
						const err = res;
						console.log('返回进入拦截成功')
						if (err && err.statusCode) {
							switch (err.statusCode) {
								case 301:
									err.message = '请求的数据具有新的位置且更改是永久的'
									break
								case 302:
									err.message = '请求的数据临时具有不同 URI'
									break
								case 304:
									err.message = '未按预期修改文档'
									break
								case 305:
									err.message = '必须通过代理来访问请求的资源'
									break
								case 400:
									err.message = '请求中有语法问题，或不能满足请求'
									break
								case 402:
									err.message = '所使用的模块需要付费使用'
									break
								case 403:
									err.message = '当前操作没有权限,请先登录'
									break
								case 404:
									err.message = '服务器找不到给定的资源'
									break
								case 407:
									err.message = '客户机首先必须使用代理认证自身'
									break
								case 415:
									err.message = '请求类型不支持，服务器拒绝服务'
									break
								case 417:
									err.message = '未绑定登录账号，请使用密码登录后绑定'
									break
								case 426:
									err.message = '用户名不存在或密码错误'
									break
								case 429:
									err.message = '请求过于频繁'
									break
								case 500:
									err.message = '服务器内部错误，无法完成请求'
									break
								case 501:
									err.message = '服务不支持请求'
									break
								case 502:
									err.message = '网络错误，服务器接收到上上游服务器无效响应'
									break
								case 503:
									err.message = '服务器无法处理请求'
									break
								case 504:
									err.message = '网络请求超时'
									break
								case 999:
									err.message = '系统未知错误，请反馈给管理员'
									break
							}
							reject(err);
						}
					}
				},
				fail(err) {
					err.message = '连接服务器失败!'
					reject(err)
				},
				complete() {
					// 关闭提示框
					uni.hideLoading();
				}
		});
	});
};