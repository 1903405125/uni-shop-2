(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/my-userinfo/my-userinfo"],{"0259":function(t,e,n){"use strict";n.r(e);var r=n("833c"),o=n.n(r);for(var u in r)"default"!==u&&function(t){n.d(e,t,(function(){return r[t]}))}(u);e["default"]=o.a},5426:function(t,e,n){},"694d":function(t,e,n){"use strict";var r=n("5426"),o=n.n(r);o.a},"833c":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=u(n("a34a")),o=n("26cb");function u(t){return t&&t.__esModule?t:{default:t}}function i(t,e){return l(t)||s(t,e)||a(t,e)||c()}function c(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function a(t,e){if(t){if("string"===typeof t)return f(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?f(t,e):void 0}}function f(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function s(t,e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t)){var n=[],r=!0,o=!1,u=void 0;try{for(var i,c=t[Symbol.iterator]();!(r=(i=c.next()).done);r=!0)if(n.push(i.value),e&&n.length===e)break}catch(a){o=!0,u=a}finally{try{r||null==c["return"]||c["return"]()}finally{if(o)throw u}}return n}}function l(t){if(Array.isArray(t))return t}function d(t,e,n,r,o,u,i){try{var c=t[u](i),a=c.value}catch(f){return void n(f)}c.done?e(a):Promise.resolve(a).then(r,o)}function p(t){return function(){var e=this,n=arguments;return new Promise((function(r,o){var u=t.apply(e,n);function i(t){d(u,r,o,i,c,"next",t)}function c(t){d(u,r,o,i,c,"throw",t)}i(void 0)}))}}function b(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function v(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?b(Object(n),!0).forEach((function(e){m(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):b(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function m(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var y={name:"my-userinfo",data:function(){return{}},computed:v({},(0,o.mapState)("m_user",["userinfo"])),methods:v(v({},(0,o.mapMutations)("m_user",["updateUserInfo","updateToken","updateAddress"])),{},{logout:function(){var e=this;return p(r.default.mark((function n(){var o,u,c;return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,t.showModal({title:"提示",content:"确认退出登录吗？"}).catch((function(t){return t}));case 2:o=n.sent,u=i(o,2),u[0],c=u[1],c&&c.confirm&&(e.updateUserInfo({}),e.updateToken(""),e.updateAddress({}));case 7:case"end":return n.stop()}}),n)})))()}})};e.default=y}).call(this,n("543d")["default"])},e3e8:function(t,e,n){"use strict";n.r(e);var r=n("e9ef"),o=n("0259");for(var u in o)"default"!==u&&function(t){n.d(e,t,(function(){return o[t]}))}(u);n("694d");var i,c=n("f0c5"),a=Object(c["a"])(o["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],i);e["default"]=a.exports},e9ef:function(t,e,n){"use strict";n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return u})),n.d(e,"a",(function(){return r}));var r={uniIcons:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uni-icons/components/uni-icons/uni-icons")]).then(n.bind(null,"d1e2"))}},o=function(){var t=this,e=t.$createElement;t._self._c},u=[]}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/my-userinfo/my-userinfo-create-component',
    {
        'components/my-userinfo/my-userinfo-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("e3e8"))
        })
    },
    [['components/my-userinfo/my-userinfo-create-component']]
]);