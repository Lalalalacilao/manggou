(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/productDetalis/productDetalis"],{333:function(t,e,o){"use strict";(function(t,e){var n=o(4);o(26);n(o(25));var i=n(o(334));t.__webpack_require_UNI_MP_PLUGIN__=o,e(i.default)}).call(this,o(1)["default"],o(2)["createPage"])},334:function(t,e,o){"use strict";o.r(e);var n=o(335),i=o(337);for(var r in i)["default"].indexOf(r)<0&&function(t){o.d(e,t,(function(){return i[t]}))}(r);o(339);var c,s=o(35),a=Object(s["default"])(i["default"],n["render"],n["staticRenderFns"],!1,null,null,null,!1,n["components"],c);a.options.__file="pages/productDetalis/productDetalis.vue",e["default"]=a.exports},335:function(t,e,o){"use strict";o.r(e);var n=o(336);o.d(e,"render",(function(){return n["render"]})),o.d(e,"staticRenderFns",(function(){return n["staticRenderFns"]})),o.d(e,"recyclableRender",(function(){return n["recyclableRender"]})),o.d(e,"components",(function(){return n["components"]}))},336:function(t,e,o){"use strict";var n;o.r(e),o.d(e,"render",(function(){return i})),o.d(e,"staticRenderFns",(function(){return c})),o.d(e,"recyclableRender",(function(){return r})),o.d(e,"components",(function(){return n}));try{n={uniSwiperDot:function(){return o.e("uni_modules/uni-swiper-dot/components/uni-swiper-dot/uni-swiper-dot").then(o.bind(null,488))}}}catch(s){if(-1===s.message.indexOf("Cannot find module")||-1===s.message.indexOf(".vue"))throw s;console.error(s.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var i=function(){var t=this,e=t.$createElement,o=(t._self._c,(t.productDetali.price/100).toFixed(2));t.$mp.data=Object.assign({},{$root:{g0:o}})},r=!1,c=[];i._withStripped=!0},337:function(t,e,o){"use strict";o.r(e);var n=o(338),i=o.n(n);for(var r in n)["default"].indexOf(r)<0&&function(t){o.d(e,t,(function(){return n[t]}))}(r);e["default"]=i.a},338:function(t,e,o){"use strict";(function(t,o){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=getApp(),i={data:function(){return{productDetali:{},currentUser:{},comment:[],recommendPro:[],current:0,mode:"round",dotsStyles:{bottom:90,border:"",selectedBorder:"",selectedBackgroundColor:"rgba(255, 255, 255, 1)",backgroundColor:"rgba(255, 255, 255, 0.6)"},isLimit:!1,pageNum_:1,loading:"",inputComment:"",isFocus:!1,inputReplyComment:"",commented:{},subComment:{},scrollTop:0,nextScrollTop:0}},methods:{goBack:function(){var e=getCurrentPages();0===e.length?t.switchTab({url:"/pages/index/index"}):t.navigateBack({delta:1})},onShareAppMessage:function(){var t="/pages/productDetalis/productDetalis?id="+this.productDetali.id;return{title:this.productDetali.title,path:t}},personalIntr:function(t){console.log("查看个人信息")},contactMe:function(){t.showToast({title:"加载中",icon:"loading"}),n.globalData.getUserPhoneById({userId:this.productDetali.userId}).then((function(e){t.showModal({title:"联系方式：电话",content:e.data,confirmText:"复制文本",success:function(n){n.confirm&&o.setClipboardData({data:e.data,success:function(e){t.showToast({title:"内容已复制"})}})}})})).catch((function(e){t.showToast({title:e.message,icon:"error"})}))},change:function(t){this.current=t.detail.current},viewImg:function(t,e){o.previewImage({urls:t,current:t[e],success:function(t){},fail:function(t){},complete:function(t){}})},getCommentList:function(){var t=this;n.globalData.getCommentList({commentId:this.productDetali.id}).then((function(e){t.comment=e.data,t.reply()})).catch((function(t){console.log(t)}))},reply:function(){if(this.comment!==[])for(var t=0;t<this.comment.length;t++)if(this.comment[t].createTime=this.comment[t].createTime.slice(0,16),this.comment[t].subComment!==[])for(var e=0;e<this.comment[t].subComment.length;e++)this.comment[t].subComment[e].createTime=this.comment[t].subComment[e].createTime.slice(0,16)},releaseComment:function(){var e=this,o=this.inputComment.trim();if(""!==o){var i=t.getStorageSync("userInfo");n.globalData.userGoodsAddParentComment({detail:o,userId:i.id,userGoodsId:this.productDetali.id}).then((function(o){t.showToast({title:"评论成功",icon:"none"}),e.getCommentList(),e.inputComment=""})).catch((function(e){t.showToast({title:e.message,icon:"error"})}))}else t.showToast({title:"评论不能为空",icon:"error"})},replyComment:function(e){var o=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";this.isFocus=!0,this.nextScrollTop=this.scrollTop,t.createSelectorQuery().select("#commit"+e.id).boundingClientRect((function(e){t.createSelectorQuery().select(".swiper-box").boundingClientRect((function(t){o.scrollTop=-(t.top-e.top+100)})).exec()})).exec(),this.commented=e,this.subComment=n},releaseReply:function(){var e=this,o=this.inputReplyComment.trim();this.inputReplyComment="",this.isFocus=!1,""!==o?""!=this.commented?n.globalData.userGoodsAddSubComment({detail:o,parentId:this.commented.id,replyUserId:this.subComment?this.subComment.userId:-1,userGoodsId:this.productDetali.id,userId:this.currentUser.id}).then((function(o){t.showToast({title:"评论成功",icon:"none"}),e.getCommentList()})).catch((function(e){t.showToast({title:e.message,icon:"error"})})):t.showToast({title:"请选择要回复的评论",icon:"error"}):t.showToast({title:"评论不能为空",icon:"error"})},recommend:function(e){var o=getCurrentPages(),n=o[o.length-1];t.redirectTo({url:"../../"+n.__route__+"?id="+e})},selectOneGoods:function(e){var o=this;n.globalData.selectOneGoods({id:e}).then((function(e){e.data?(o.productDetali=e.data,o.dataHandle(),o.getCommentList()):t.showToast({title:"数据错误",icon:"error"})})).catch((function(e){t.showToast({title:e.message,icon:"error"})}))},dataHandle:function(){this.$set(this.productDetali,"release","".concat(this.productDetali.createTime)),this.productDetali.goodsName.length>25&&(this.isLimit=!0,this.productDetali.goodsName=this.productDetali.goodsName.slice(0,24)),null!==this.productDetali.imgUrl&&(this.productDetali.imgUrl=JSON.parse(this.productDetali.imgUrl))},consult:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:10;this.loading="正在加载中哦~",n.globalData.goods({pageNum:e,pageSize:o}).then((function(e){var o=t.recommendPro.length;t.recommendPro=t.recommendPro.concat(e.data.records);var n=e.data.records.length;t.pageNum_++,t.recommendPro.length===o&&(t.loading="没有了~"),0!==n&&t.dataHandleAboutRecommendPro(n)})).catch((function(e){t.loading=e.message}))},dataHandleAboutRecommendPro:function(t){for(var e=0+this.recommendPro.length-t;e<this.recommendPro.length;e++)null!==this.recommendPro[e].imgUrl&&(this.recommendPro[e].imgUrl=JSON.parse(this.recommendPro[e].imgUrl)[0])},bottomLoading:function(){"没有了~"!==this.loading&&this.consult(this.pageNum_,10)},goGuidance:function(){}},onLoad:function(e){console.log(e.id),this.selectOneGoods(e.id),this.consult(),this.currentUser=t.getStorageSync("userInfo")}};e.default=i}).call(this,o(2)["default"],o(1)["default"])},339:function(t,e,o){"use strict";o.r(e);var n=o(340),i=o.n(n);for(var r in n)["default"].indexOf(r)<0&&function(t){o.d(e,t,(function(){return n[t]}))}(r);e["default"]=i.a},340:function(t,e,o){}},[[333,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/productDetalis/productDetalis.js.map