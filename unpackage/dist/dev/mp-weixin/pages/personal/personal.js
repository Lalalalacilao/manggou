(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/personal/personal"],{199:function(e,n,t){"use strict";(function(e,n){var o=t(4);t(26);o(t(25));var r=o(t(200));e.__webpack_require_UNI_MP_PLUGIN__=t,n(r.default)}).call(this,t(1)["default"],t(2)["createPage"])},200:function(e,n,t){"use strict";t.r(n);var o=t(201),r=t(203);for(var a in r)["default"].indexOf(a)<0&&function(e){t.d(n,e,(function(){return r[e]}))}(a);t(205);var s,u=t(35),c=Object(u["default"])(r["default"],o["render"],o["staticRenderFns"],!1,null,null,null,!1,o["components"],s);c.options.__file="pages/personal/personal.vue",n["default"]=c.exports},201:function(e,n,t){"use strict";t.r(n);var o=t(202);t.d(n,"render",(function(){return o["render"]})),t.d(n,"staticRenderFns",(function(){return o["staticRenderFns"]})),t.d(n,"recyclableRender",(function(){return o["recyclableRender"]})),t.d(n,"components",(function(){return o["components"]}))},202:function(e,n,t){"use strict";var o;t.r(n),t.d(n,"render",(function(){return r})),t.d(n,"staticRenderFns",(function(){return s})),t.d(n,"recyclableRender",(function(){return a})),t.d(n,"components",(function(){return o}));var r=function(){var e=this,n=e.$createElement;e._self._c},a=!1,s=[];r._withStripped=!0},203:function(e,n,t){"use strict";t.r(n);var o=t(204),r=t.n(o);for(var a in o)["default"].indexOf(a)<0&&function(e){t.d(n,e,(function(){return o[e]}))}(a);n["default"]=r.a},204:function(e,n,t){"use strict";(function(e){var o=t(4);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r=o(t(11)),a=getApp(),s={data:function(){return{userInfo:{userName:"请先登录",userAvatar:"https://mang-gou.tos-cn-beijing.volces.com/oeRlzleK0UwP02c8877eb0979a88ef8c8c8e6c90cfd6_1689664581294.jpg",id:"******"},userId:null,flag:""===e.getStorageSync("token")}},methods:(0,r.default)({login:function(){""===e.getStorageSync("token")?e.navigateTo({url:"/pages/index/index"}):e.showToast({title:"请勿重复登录",icon:"error"})},unlogin:function(){var n=this;a.globalData.logout({}).then((function(t){e.setStorageSync("token",""),e.showToast({title:"退出登录成功",icon:"success"}),n.token()})).catch((function(e){console.log(e,"err----")}))},token:function(){console.log(""===e.getStorageSync("token"),"token"),this.flag=""===e.getStorageSync("token"),1==this.flag&&(e.setStorageSync("userInfo",""),this.userInfo.userName="请先登录",this.userInfo.userAvatar="https://mang-gou.tos-cn-beijing.volces.com/oeRlzleK0UwP02c8877eb0979a88ef8c8c8e6c90cfd6_1689664581294.jpg",this.userInfo.id="******")},head:function(e){console.log("头像")},edit:function(n){console.log("编辑"),e.navigateTo({url:"/pages/EditInformation/EditInformation"})},allOrder:function(n){console.log("全部订单"),e.navigateTo({url:"/pages/allOrder/allOrder?userId="+this.userId})},obligation:function(n){console.log("待付款"),e.navigateTo({url:"/pages/allOrder/allOrder?curr=1&userId="+this.userId})},goodsToBeRecceived:function(n){console.log("待收货"),e.navigateTo({url:"/pages/allOrder/allOrder?curr=2&userId="+this.userId})},toBeEvaluated:function(n){console.log("待评价"),e.navigateTo({url:"/pages/allOrder/allOrder?curr=3&userId="+this.userId})},complete:function(n){console.log("已完成"),e.navigateTo({url:"/pages/allOrder/allOrder?curr=4&userId="+this.userId})},myAddress:function(n){e.navigateTo({url:"/pages/address/address?id="+n})},help:function(n){e.navigateTo({url:"/pages/problemFeedback/problemFeedback"})},callCenter:function(n){console.log("客服中心"),e.showToast({title:"暂未开放，敬请期待",icon:"none"})},afterSales:function(n){console.log("售后"),e.showToast({title:"暂未开放，敬请期待",icon:"none"})}},"login",(function(){"请先登录"===this.userInfo.userName&&e.navigateTo({url:"/pages/login/login"})})),onLoad:function(){this.phone=e.getStorageSync("token")},onShow:function(){this.token();var n=e.getStorageSync("userInfo");""!==n&&(this.userInfo=n,this.userId=n.id,console.log(this.userInfo,"信息",this.userId))}};n.default=s}).call(this,t(2)["default"])},205:function(e,n,t){"use strict";t.r(n);var o=t(206),r=t.n(o);for(var a in o)["default"].indexOf(a)<0&&function(e){t.d(n,e,(function(){return o[e]}))}(a);n["default"]=r.a},206:function(e,n,t){}},[[199,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/personal/personal.js.map