(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/login/login"],{373:function(e,n,t){"use strict";(function(e,n){var o=t(4);t(26);o(t(25));var r=o(t(374));e.__webpack_require_UNI_MP_PLUGIN__=t,n(r.default)}).call(this,t(1)["default"],t(2)["createPage"])},374:function(e,n,t){"use strict";t.r(n);var o=t(375),r=t(377);for(var i in r)["default"].indexOf(i)<0&&function(e){t.d(n,e,(function(){return r[e]}))}(i);t(379);var c,s=t(35),u=Object(s["default"])(r["default"],o["render"],o["staticRenderFns"],!1,null,null,null,!1,o["components"],c);u.options.__file="pages/login/login.vue",n["default"]=u.exports},375:function(e,n,t){"use strict";t.r(n);var o=t(376);t.d(n,"render",(function(){return o["render"]})),t.d(n,"staticRenderFns",(function(){return o["staticRenderFns"]})),t.d(n,"recyclableRender",(function(){return o["recyclableRender"]})),t.d(n,"components",(function(){return o["components"]}))},376:function(e,n,t){"use strict";var o;t.r(n),t.d(n,"render",(function(){return r})),t.d(n,"staticRenderFns",(function(){return c})),t.d(n,"recyclableRender",(function(){return i})),t.d(n,"components",(function(){return o}));var r=function(){var e=this,n=e.$createElement;e._self._c},i=!1,c=[];r._withStripped=!0},377:function(e,n,t){"use strict";t.r(n);var o=t(378),r=t.n(o);for(var i in o)["default"].indexOf(i)<0&&function(e){t.d(n,e,(function(){return o[e]}))}(i);n["default"]=r.a},378:function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var t=getApp(),o={data:function(){return{isCheck:!1,openidCode:"",userToken:"",userInfo:{}}},methods:{checkPlease:function(){!1===this.isCheck&&e.showToast({title:"请勾选下方协议",icon:"error",mask:!0})},serve:function(){e.navigateTo({url:"/pages/serveTrem/serveTrem"})},getPhoneNumber:function(n){var o=this;if(!0===this.isCheck)if("getPhoneNumber:ok"===n.detail.errMsg){var r=this.wxSilentLogin(),i=this.wxGetUserPhoneNumber(n);r.then((function(n){o.openidCode=n.code,console.log("开始登录"),t.globalData.login({phoneCode:i,openidCode:o.openidCode}).then((function(n){e.setStorageSync("token",n.data.token),e.showToast({title:"登录成功",icon:"none"}),o.getUserInfo(),e.hideLoading()})).catch((function(n){e.showToast({title:n.message,icon:"error"})}))})).catch((function(n){e.showToast({title:"登录失败",icon:"error"})}))}else e.showToast({title:"若要登录,请重新打开小程序",icon:"none"})},wxGetUserProfile:function(){return new Promise((function(n,t){e.getUserProfile({lang:"zh_CN",desc:"获取你的昵称、头像、地区及性别",success:function(e){n(e)},fail:function(e){t(e)}})}))},wxSilentLogin:function(){return new Promise((function(n,t){e.login({success:function(e){n(e)},fail:function(e){t(e)}})}))},wxGetUserPhoneNumber:function(e){return e.detail.code},getUserInfo:function(){var n=this,o=e.getStorageSync("token");null!=o?t.globalData.getUserInfo().then((function(t){n.userInfo=t.data,n.dataHandle(),e.setStorageSync("userInfo",n.userInfo),e.switchTab({url:"/pages/index/index"})})).catch((function(n){e.showToast({title:n.message,icon:"none"})})):e.showToast({title:"请先登录",icon:"none"})},dataHandle:function(){null===this.userInfo.userAvatar&&(this.userInfo.userAvatar="https://mang-gou.tos-cn-beijing.volces.com/oeRlzleK0UwP02c8877eb0979a88ef8c8c8e6c90cfd6_1689664581294.jpg"),null===this.userInfo.userName&&(this.userInfo.userName="暂无姓名")},check:function(){this.isCheck=!this.isCheck}}};n.default=o}).call(this,t(2)["default"])},379:function(e,n,t){"use strict";t.r(n);var o=t(380),r=t.n(o);for(var i in o)["default"].indexOf(i)<0&&function(e){t.d(n,e,(function(){return o[e]}))}(i);n["default"]=r.a},380:function(e,n,t){}},[[373,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/login/login.js.map