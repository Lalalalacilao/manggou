(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/forum/forum"],{191:function(t,e,n){"use strict";(function(t,e){var i=n(4);n(26);i(n(25));var s=i(n(192));t.__webpack_require_UNI_MP_PLUGIN__=n,e(s.default)}).call(this,n(1)["default"],n(2)["createPage"])},192:function(t,e,n){"use strict";n.r(e);var i=n(193),s=n(195);for(var o in s)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return s[t]}))}(o);n(197);var c,r=n(34),u=Object(r["default"])(s["default"],i["render"],i["staticRenderFns"],!1,null,null,null,!1,i["components"],c);u.options.__file="pages/forum/forum.vue",e["default"]=u.exports},193:function(t,e,n){"use strict";n.r(e);var i=n(194);n.d(e,"render",(function(){return i["render"]})),n.d(e,"staticRenderFns",(function(){return i["staticRenderFns"]})),n.d(e,"recyclableRender",(function(){return i["recyclableRender"]})),n.d(e,"components",(function(){return i["components"]}))},194:function(t,e,n){"use strict";var i;n.r(e),n.d(e,"render",(function(){return s})),n.d(e,"staticRenderFns",(function(){return c})),n.d(e,"recyclableRender",(function(){return o})),n.d(e,"components",(function(){return i}));var s=function(){var t=this,e=t.$createElement,n=(t._self._c,t.__map(t.prcductList,(function(e,n){var i=t.__get_orig(e),s=e.moreImg?e.imgs.length:null;return{$orig:i,g0:s}})));t.$mp.data=Object.assign({},{$root:{l0:n}})},o=!1,c=[];s._withStripped=!0},195:function(t,e,n){"use strict";n.r(e);var i=n(196),s=n.n(i);for(var o in i)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(o);e["default"]=s.a},196:function(t,e,n){"use strict";(function(t,i){var s=n(4);Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=s(n(43)),c=getApp(),r={data:function(){return{prcductList:[],isIphoneX:!1,pageNum_:1,loading:"",likenow:!0,id:null,msg:null,userId:24,isLike:null}},methods:{toggleLike:function(t,e,n,i){t.isLike=!t.isLike,console.log(t.isLike,e,n),1==t.isLike?(t.likeCount++,c.globalData.add({likedId:e,userId:this.userId,likedUserId:n}).then((function(t){console.log(t,"点赞成功")})).catch((function(t){console.log(t,"err----")}))):(t.likeCount--,c.globalData.cancel({likedId:e,userId:this.userId}).then((function(t){console.log(t,"取消点赞")})).catch((function(t){console.log(t,"err----")})))},topRelease:function(){console.log("顶部发布按钮"),t.navigateTo({url:"/pages/release/release"})},moreImg:function(t){console.log("显示更多图片"),t.previewImg="block",t.moreImg=!1},isShowMoreFn:function(t){t.showHide=!t.showHide,t.switch=!t.switch},clickImg:function(t){i.previewImage({urls:t.imgs,current:"",success:function(t){},fail:function(t){},complete:function(t){}})},bottomLoading:function(){"没有了~"!==this.loading&&this.consult(this.pageNum_,10)},consult:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:10,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:this.userId;this.loading="正在加载中哦~",c.globalData.getCommunity({pageNum:e,pageSize:n,userId:i}).then((function(e){console.log(e,"-----");var n=t.prcductList.length;t.prcductList=t.prcductList.concat(e.data.records),t.pageNum_++,t.prcductList.length!=n?t.showHide():t.loading="没有了~"})).catch((function(e){t.loading=e.message}))},showHide:function(){for(var t=this.prcductList.length-10||0;t<this.prcductList.length;t++)null!=this.prcductList[t].introduction&&(/[\u4e00-\u9fa5]/.test(this.prcductList[t].introduction)&&this.prcductList[t].introduction.length>85||this.prcductList[t].introduction.length>170)?this.$set(this.prcductList[t],"showHide",!0):this.$set(this.prcductList[t],"showHide",!1),void 0!=this.prcductList[t].imgs&&(this.prcductList[t].imgs=JSON.parse(this.prcductList[t].imgs)),void 0!==this.prcductList[t].imgs&&this.prcductList[t].imgs.length>5?this.$set(this.prcductList[t],"moreImg",!0):this.$set(this.prcductList[t],"moreImg",!1),this.$set(this.prcductList[t],"previewImg","none"),null!=this.prcductList[t].createTime&&this.$set(this.prcductList[t],"release",(0,o.default)(this.prcductList[t].createTime).format("YYYY-MM-DD"))},sideRelease:function(){t.navigateTo({url:"/pages/release/release?type=user"})}},onReady:function(){var e=this;t.getSystemInfo({success:function(t){e.systemInfo=t,e.phoneSystem=t.platform,"iPhone X"===e.systemInfo.model&&(e.isIphoneX=!0)}})},onShow:function(){this.prcductList=[],this.loading="",this.pageNum_=1,this.consult()},onLoad:function(){this.userInfo=t.getStorageSync("userInfo"),this.userId=this.userInfo.id}};e.default=r}).call(this,n(2)["default"],n(1)["default"])},197:function(t,e,n){"use strict";n.r(e);var i=n(198),s=n.n(i);for(var o in i)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(o);e["default"]=s.a},198:function(t,e,n){}},[[191,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/forum/forum.js.map