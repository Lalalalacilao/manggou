(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/productDetalisMine/productDetalisMine"],{298:function(e,t,n){"use strict";(function(e,t){var o=n(4);n(26);o(n(25));var r=o(n(299));e.__webpack_require_UNI_MP_PLUGIN__=n,t(r.default)}).call(this,n(1)["default"],n(2)["createPage"])},299:function(e,t,n){"use strict";n.r(t);var o=n(300),r=n(302);for(var i in r)["default"].indexOf(i)<0&&function(e){n.d(t,e,(function(){return r[e]}))}(i);n(304);var c,s=n(34),a=Object(s["default"])(r["default"],o["render"],o["staticRenderFns"],!1,null,null,null,!1,o["components"],c);a.options.__file="pages/productDetalisMine/productDetalisMine.vue",t["default"]=a.exports},300:function(e,t,n){"use strict";n.r(t);var o=n(301);n.d(t,"render",(function(){return o["render"]})),n.d(t,"staticRenderFns",(function(){return o["staticRenderFns"]})),n.d(t,"recyclableRender",(function(){return o["recyclableRender"]})),n.d(t,"components",(function(){return o["components"]}))},301:function(e,t,n){"use strict";var o;n.r(t),n.d(t,"render",(function(){return r})),n.d(t,"staticRenderFns",(function(){return c})),n.d(t,"recyclableRender",(function(){return i})),n.d(t,"components",(function(){return o}));try{o={uniSwiperDot:function(){return n.e("uni_modules/uni-swiper-dot/components/uni-swiper-dot/uni-swiper-dot").then(n.bind(null,357))}}}catch(s){if(-1===s.message.indexOf("Cannot find module")||-1===s.message.indexOf(".vue"))throw s;console.error(s.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var r=function(){var e=this,t=e.$createElement,n=(e._self._c,(e.productDetali.price/100).toFixed(2));e.$mp.data=Object.assign({},{$root:{g0:n}})},i=!1,c=[];r._withStripped=!0},302:function(e,t,n){"use strict";n.r(t);var o=n(303),r=n.n(o);for(var i in o)["default"].indexOf(i)<0&&function(e){n.d(t,e,(function(){return o[e]}))}(i);t["default"]=r.a},303:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=getApp(),o={data:function(){return{productDetali:{},currentUser:{},comment:[],recommendPro:[],current:0,mode:"round",dotsStyles:{bottom:90,border:"",selectedBorder:"",selectedBackgroundColor:"rgba(255, 255, 255, 1)",backgroundColor:"rgba(255, 255, 255, 0.6)"},isLimit:!1,pageNum_:1,loading:"",inputComment:"",isFocus:!1,inputReplyComment:"",commented:{},subComment:{},scrollTop:0,nextScrollTop:0}},methods:{goBack:function(){e.navigateBack({delta:1})},onShareAppMessage:function(){var e="/pages/productDetalis/productDetalis?id="+this.productDetali.id;return{title:this.productDetali.title,path:e}},personalIntr:function(e){console.log("查看个人信息")},contactMe:function(){console.log("联系我")},change:function(e){this.current=e.detail.current},getCommentList:function(){var e=this;n.globalData.specialColumnGoosComment({commentId:this.productDetali.id}).then((function(t){e.comment=t.data,e.reply()})).catch((function(e){console.log(e)}))},reply:function(){if(this.comment!==[])for(var e=0;e<this.comment.length;e++)if(this.comment[e].createTime=this.comment[e].createTime.slice(0,16),this.comment[e].subComment!==[])for(var t=0;t<this.comment[e].subComment.length;t++)this.comment[e].subComment[t].createTime=this.comment[e].subComment[t].createTime.slice(0,16)},releaseComment:function(){var t=this,o=this.inputComment.trim();if(""!==o){var r=e.getStorageSync("userInfo");n.globalData.specialColumnAddParentComment({detail:o,userAvatar:r.userAvatar,userId:r.id,userName:r.userName,backendGoodsId:this.productDetali.id}).then((function(n){e.showToast({title:"评论成功",icon:"none"}),t.getCommentList(),t.inputComment=""})).catch((function(t){e.showToast({title:t.message,icon:"error"})}))}else e.showToast({title:"评论不能为空",icon:"error"})},replyComment:function(t){var n=this,o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";this.isFocus=!0,this.nextScrollTop=this.scrollTop,e.createSelectorQuery().select("#commit"+t.id).boundingClientRect((function(t){e.createSelectorQuery().select(".swiper-box").boundingClientRect((function(e){n.scrollTop=-(e.top-t.top+100)})).exec()})).exec(),this.commented=t,this.subComment=o},releaseReply:function(){var t=this,o=this.inputReplyComment.trim();this.inputReplyComment="",this.isFocus=!1,""!==o?""!=this.commented?n.globalData.specialColumnAddReply({detail:o,parentId:this.commented.id,replyUserName:""===this.subComment?"":this.subComment.userName,userAvatar:this.currentUser.userAvatar,backendGoodsId:this.productDetali.id,userId:this.currentUser.id,userName:this.currentUser.userName}).then((function(n){e.showToast({title:"评论成功",icon:"none"}),t.getCommentList()})).catch((function(t){e.showToast({title:t.message,icon:"error"})})):e.showToast({title:"请选择要回复的评论",icon:"error"}):e.showToast({title:"评论不能为空",icon:"error"})},recommend:function(t){var n=getCurrentPages(),o=n[n.length-1];e.redirectTo({url:"../../"+o.__route__+"?id="+t})},selectOneGoods:function(t){var o=this;n.globalData.getSpecialColumnGoosDetailById({id:t}).then((function(e){o.productDetali=e.data,o.dataHandle(),o.getCommentList()})).catch((function(t){e.showToast({title:t.message,icon:"error"})}))},dataHandle:function(){this.$set(this.productDetali,"release",this.productDetali.createTime.substr(0,16)),this.productDetali.goodsName.length>25&&(this.isLimit=!0,this.productDetali.goodsName=this.productDetali.goodsName.slice(0,24)),null!==this.productDetali.imgUrl&&(this.productDetali.imgUrl=JSON.parse(this.productDetali.imgUrl))},consult:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:10;this.loading="正在加载中哦~",n.globalData.getSpecialColumnGoods({pageNum:t,pageSize:o}).then((function(t){var n=e.recommendPro.length;e.recommendPro=e.recommendPro.concat(t.data.records);var o=t.data.records.length;e.pageNum_++,e.recommendPro.length===n&&(e.loading="没有了~"),0!==o&&e.dataHandleAboutRecommendPro(o)})).catch((function(t){e.loading=t.message}))},dataHandleAboutRecommendPro:function(e){for(var t=0+this.recommendPro.length-e;t<this.recommendPro.length;t++)null!==this.recommendPro[t].imgUrl&&(this.recommendPro[t].imgUrl=JSON.parse(this.recommendPro[t].imgUrl)[0])},purchase:function(){console.log("111"),e.navigateTo({url:"/pages/purchase/purchase?proId=".concat(this.productDetali.id)})},bottomLoading:function(){"没有了~"!==this.loading&&this.consult(this.pageNum_,10)}},onLoad:function(t){this.selectOneGoods(t.id),this.consult(),this.currentUser=e.getStorageSync("userInfo")}};t.default=o}).call(this,n(2)["default"])},304:function(e,t,n){"use strict";n.r(t);var o=n(305),r=n.n(o);for(var i in o)["default"].indexOf(i)<0&&function(e){n.d(t,e,(function(){return o[e]}))}(i);t["default"]=r.a},305:function(e,t,n){}},[[298,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/productDetalisMine/productDetalisMine.js.map