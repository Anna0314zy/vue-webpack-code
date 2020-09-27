!function(e){var t={};function n(o){if(t[o])return t[o].exports;var i=t[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(o,i,function(t){return e[t]}.bind(null,i));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=7)}([function(e,t,n){"use strict";n.d(t,"c",(function(){return l})),n.d(t,"b",(function(){return s}));let o=0;class i{constructor(){this.id=o++,this.subs=[]}addSub(e){this.subs.push(e)}notify(){this.subs.forEach(e=>e.update())}depend(){i.target&&i.target.addDep(this)}}let r=[];function l(e){i.target=e,r.push(e)}function s(){r.pop(),i.target=r[r.length-1]}t.a=i},function(e,t,n){"use strict";(function(e){var o=n(0),i=n(2);let r=0;let l={},s=[];function c(){s.forEach(e=>e.run()),l={},s=[]}let a=[];t.a=class{constructor(e,t,n=(()=>{}),o={}){this.vm=e,this.exprOrfn=t,this.getter="function"==typeof t?t:function(){return i.a.getValue(e,t)},o.user&&(this.user=!0),this.lazy=o.lazy,this.dirty=this.lazy,this.cb=n,this.opts=o,this.deps=[],this.depsId=new Set,this.id=r++,this.immediate=o.immediate,this.value=this.lazy?void 0:this.get(),this.immediate&&this.cb(this.value)}get(){Object(o.c)(this);let e=this.getter.call(this.vm);return Object(o.b)(),e}evaluate(){this.value=this.get(),this.dirty=!1}addDep(e){let t=e.id;this.depsId.has(t)||(this.depsId.add(t),this.deps.push(e),e.addSub(this))}depend(){let e=this.deps.length;for(;e--;)this.deps[e].depend()}update(){this.lazy?this.dirty=!0:function(t){let n=t.id;null==l[n]&&(l[n]=!0,s.push(t),function(t){a.push(t);let n=()=>{a.forEach(e=>e())};if(Promise)return Promise.resolve().then(n);if(MutationObserver){let e=new MutationObserver(n),t=document.createTextNode(1);return e.observe(t,{characterData:!0}),void(t.textContent=2)}if(e)return e(n);setTimeout(n,0)}(c))}(this)}run(){let e=this.get();this.value!==e&&this.cb(e,this.value)}}}).call(this,n(4).setImmediate)},function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));const o={getValue:(e,t)=>t.split(".").reduce((e,t)=>e=e[t],e),compilerText(e,t){e.expr||(e.expr=e.textContent);e.textContent=e.expr.replace(/\{\{((?:.|\r?\n)+?)\}\}/g,(function(...e){return JSON.stringify(o.getValue(t,e[1]))}))}}},function(e,t){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(e){"object"==typeof window&&(n=window)}e.exports=n},function(e,t,n){(function(e){var o=void 0!==e&&e||"undefined"!=typeof self&&self||window,i=Function.prototype.apply;function r(e,t){this._id=e,this._clearFn=t}t.setTimeout=function(){return new r(i.call(setTimeout,o,arguments),clearTimeout)},t.setInterval=function(){return new r(i.call(setInterval,o,arguments),clearInterval)},t.clearTimeout=t.clearInterval=function(e){e&&e.close()},r.prototype.unref=r.prototype.ref=function(){},r.prototype.close=function(){this._clearFn.call(o,this._id)},t.enroll=function(e,t){clearTimeout(e._idleTimeoutId),e._idleTimeout=t},t.unenroll=function(e){clearTimeout(e._idleTimeoutId),e._idleTimeout=-1},t._unrefActive=t.active=function(e){clearTimeout(e._idleTimeoutId);var t=e._idleTimeout;t>=0&&(e._idleTimeoutId=setTimeout((function(){e._onTimeout&&e._onTimeout()}),t))},n(5),t.setImmediate="undefined"!=typeof self&&self.setImmediate||void 0!==e&&e.setImmediate||this&&this.setImmediate,t.clearImmediate="undefined"!=typeof self&&self.clearImmediate||void 0!==e&&e.clearImmediate||this&&this.clearImmediate}).call(this,n(3))},function(e,t,n){(function(e,t){!function(e,n){"use strict";if(!e.setImmediate){var o,i,r,l,s,c=1,a={},u=!1,f=e.document,d=Object.getPrototypeOf&&Object.getPrototypeOf(e);d=d&&d.setTimeout?d:e,"[object process]"==={}.toString.call(e.process)?o=function(e){t.nextTick((function(){h(e)}))}:!function(){if(e.postMessage&&!e.importScripts){var t=!0,n=e.onmessage;return e.onmessage=function(){t=!1},e.postMessage("","*"),e.onmessage=n,t}}()?e.MessageChannel?((r=new MessageChannel).port1.onmessage=function(e){h(e.data)},o=function(e){r.port2.postMessage(e)}):f&&"onreadystatechange"in f.createElement("script")?(i=f.documentElement,o=function(e){var t=f.createElement("script");t.onreadystatechange=function(){h(e),t.onreadystatechange=null,i.removeChild(t),t=null},i.appendChild(t)}):o=function(e){setTimeout(h,0,e)}:(l="setImmediate$"+Math.random()+"$",s=function(t){t.source===e&&"string"==typeof t.data&&0===t.data.indexOf(l)&&h(+t.data.slice(l.length))},e.addEventListener?e.addEventListener("message",s,!1):e.attachEvent("onmessage",s),o=function(t){e.postMessage(l+t,"*")}),d.setImmediate=function(e){"function"!=typeof e&&(e=new Function(""+e));for(var t=new Array(arguments.length-1),n=0;n<t.length;n++)t[n]=arguments[n+1];var i={callback:e,args:t};return a[c]=i,o(c),c++},d.clearImmediate=p}function p(e){delete a[e]}function h(e){if(u)setTimeout(h,0,e);else{var t=a[e];if(t){u=!0;try{!function(e){var t=e.callback,n=e.args;switch(n.length){case 0:t();break;case 1:t(n[0]);break;case 2:t(n[0],n[1]);break;case 3:t(n[0],n[1],n[2]);break;default:t.apply(void 0,n)}}(t)}finally{p(e),u=!1}}}}}("undefined"==typeof self?void 0===e?this:e:self)}).call(this,n(3),n(6))},function(e,t){var n,o,i=e.exports={};function r(){throw new Error("setTimeout has not been defined")}function l(){throw new Error("clearTimeout has not been defined")}function s(e){if(n===setTimeout)return setTimeout(e,0);if((n===r||!n)&&setTimeout)return n=setTimeout,setTimeout(e,0);try{return n(e,0)}catch(t){try{return n.call(null,e,0)}catch(t){return n.call(this,e,0)}}}!function(){try{n="function"==typeof setTimeout?setTimeout:r}catch(e){n=r}try{o="function"==typeof clearTimeout?clearTimeout:l}catch(e){o=l}}();var c,a=[],u=!1,f=-1;function d(){u&&c&&(u=!1,c.length?a=c.concat(a):f=-1,a.length&&p())}function p(){if(!u){var e=s(d);u=!0;for(var t=a.length;t;){for(c=a,a=[];++f<t;)c&&c[f].run();f=-1,t=a.length}c=null,u=!1,function(e){if(o===clearTimeout)return clearTimeout(e);if((o===l||!o)&&clearTimeout)return o=clearTimeout,clearTimeout(e);try{o(e)}catch(t){try{return o.call(null,e)}catch(t){return o.call(this,e)}}}(e)}}function h(e,t){this.fun=e,this.array=t}function m(){}i.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];a.push(new h(e,t)),1!==a.length||u||s(p)},h.prototype.run=function(){this.fun.apply(null,this.array)},i.title="browser",i.browser=!0,i.env={},i.argv=[],i.version="",i.versions={},i.on=m,i.addListener=m,i.once=m,i.off=m,i.removeListener=m,i.removeAllListeners=m,i.emit=m,i.prependListener=m,i.prependOnceListener=m,i.listeners=function(e){return[]},i.binding=function(e){throw new Error("process.binding is not supported")},i.cwd=function(){return"/"},i.chdir=function(e){throw new Error("process.chdir is not supported")},i.umask=function(){return 0}},function(e,t,n){"use strict";n.r(t);let o=Array.prototype,i=Object.create(o);function r(e){for(let t=0;t<e.length;t++)f(e[t])}["push","shift","unshift","pop","reverse","sort","splice"].forEach(e=>{i[e]=function(...t){let n,i=o[e].apply(this,t);switch(e){case"push":case"unshift":n=t;break;case"splice":n=t.slice(2)}return n&&r(n),this.__ob__.dep.notify(),i}});var l=n(0);function s(e,t,n){let o=f(n),i=new l.a;Object.defineProperty(e,t,{get:()=>(l.a.target&&(i.depend(),o&&(o.dep.depend(),function e(t){for(let n=0;n<t.length;n++){let o=t[n];o.__ob__&&o.__ob__.dep.depend(),Array.isArray(o)&&e(o)}}(n))),n),set(e){e!==n&&(f(e),n=e,i.notify())}})}var c=class{constructor(e){this.dep=new l.a,Object.defineProperty(e,"__ob__",{get:()=>this}),Array.isArray(e)?(e.__proto__=i,r(e)):this.walk(e)}walk(e){let t=Object.keys(e);for(let n=0;n<t.length;n++){s(e,t[n],e[t[n]])}}},a=n(1);function u(e){let t=e.$options;t.data&&function(e){let t=e.$options.data;t=e._data="function"==typeof t?t.call(e):t||{};for(let n in t)d(e,"_data",n);f(e._data)}(e),t.computed&&function(e,t){let n=e._watchersComputed=Object.create(null);for(let o in t){let i=t[o];n[o]=new a.a(e,i,()=>{},{lazy:!0}),Object.defineProperty(e,o,{get:p(e,o)})}}(e,t.computed),t.watch&&function(e){let t=e.$options.watch;for(let n in t){let o=t[n],i=o;o.handler&&(i=o.handler),h(e,n,i,{immediate:o.immediate})}}(e)}function f(e){if("object"==typeof e&&null!=e)return e.__ob__?e.__ob__:new c(e)}function d(e,t,n){Object.defineProperty(e,n,{get:()=>e[t][n],set(o){e[t][n]=o}})}function p(e,t){let n=e._watchersComputed[t];return function(){if(n)return n.dirty&&n.evaluate(),l.a.target&&n.depend(),n.value}}function h(e,t,n,o){return e.$watch(t,n,o)}n(2);function m(e,t,n,o,i){return{tag:e,props:t,key:n,children:o,text:i}}function y(e,t,...n){let o=t.key;return delete t.key,n=n.map(e=>"object"==typeof e?e:m(void 0,void 0,void 0,void 0,e)),m(e,t,o,n)}function g(e,t){let n=v(e);t.appendChild(n)}function v(e){let{tag:t,children:n,key:o,props:i,text:r}=e;return"string"==typeof t?(e.el=document.createElement(t),b(e),n.forEach(t=>g(t,e.el))):e.el=document.createTextNode(r),e.el}function b(e,t={}){console.log(e,t,"oldProps---");let n=e.props||{},o=e.el,i=n.style||{},r=t.style||{};console.log(i,r,"style---");for(let e in r)i[e]||(o.style[e]="");for(let e in t)n[e]||delete o[e];for(let e in n)if("style"===e)for(let e in n.style)console.log(e,"styleName"),o.style[e]=n.style[e];else"class"===e?o.className=n.class:o[e]=n[e]}function _(e,t){e.tag!==t.tag&&e.el.parentNode.replaceChild(v(t),e.el),e.tag||e.text!==t.text&&(console.log(e.el,t.text),e.el.textContent=t.text);let n=t.el=e.el;b(t,e.props);let o=e.children||[],i=t.children||[];if(console.log(o.length,i.length),o.length>0&&i.length>0)!function(e,t,n){let o=0,i=t[0],r=t.length-1,l=t[r],s=0,c=n[0],a=n.length-1,u=n[a];let f=function(e){let t={};return e.forEach((e,n)=>{t[e.key]=n}),t}(t);console.log(f,"map");for(;o<=r&&s<=a;)if(i)if(l)if(w(i,c))_(i,c),i=t[++o],c=n[++s];else if(w(l,u))_(l,u),l=t[--r],u=n[--a];else if(w(i,u))_(i,u),e.insertBefore(i.el,l.el.nextSibling),i=t[++o],u=n[--a];else if(w(l,c))_(l,c),e.insertBefore(l.el,i.el),l=t[--r],c=n[++s];else{let o=f[c.key];if(null==o)e.insertBefore(v(c),i.el);else{let n=t[o];t[o]=void 0,e.insertBefore(n.el,i.el),_(n,c)}c=n[++s]}else l=t[--r];else i=t[++o];if(s<=a)for(let t=s;t<=a;t++){let o=null==n[a+1]?null:n[a+1].el;e.insertBefore(v(n[t]),o)}if(o<=r)for(let n=o;n<=r;n++){let o=t[n];null!=o&&e.removeChild(o.el)}}(n,o,i);else if(o.length>0)n.innerHTML="";else if(i.length>0)for(let e=0;e<i.length;e++){let t=i[e];n.appendChild(v(t))}return n}function w(e,t){return e.tag===t.tag&&e.key===t.key}function T(e){this._init(e)}T.prototype._init=function(e){let t=this;t.$options=e,u(t),t.$options.el&&t.$mount()},T.prototype._update=function(e){console.log("更新操作","替换真实的dom");let t=this,n=t.$el,o=t.preVnode;console.log(o,"preVnode"),o?(console.log(_(o,e),"patch(preVnode, vnode)"),t.$el=_(o,e)):(t.preVnode=e,g(e,n))},T.prototype._render=function(){let e=this.$options.render.call(this,y);return console.log(e,"vnode"),e},T.prototype.$mount=function(){let e=this,t=e.$options.el;t=e.$el=function(e){return"string"==typeof e?document.querySelector(e):e}(t);new a.a(e,()=>{e._update(e._render())})},T.prototype.$watch=function(e,t,n){new a.a(this,e,t,{user:!0,...n})};var k=T;console.log(y,"f");let x=y("div",{id:"container"},y("li",{key:"a",style:{backgroundColor:"red",fontSize:"18px"}},"a"),y("li",{key:"b",style:{background:"yellow"}},"b"),y("li",{key:"c",style:{background:"pink"}},"c"),y("li",{key:"d",style:{background:"orange"}},"d"));console.log(x,"oldVnode");let O=document.getElementById("app");g(x,O);let I=y("div",{id:"aa",style:{background:"pink",fontSize:"18px"}},y("li",{key:"e",style:{background:"red"}},"e"),y("li",{key:"a",style:{background:"yellow"}},"a"),y("li",{key:"f",style:{background:"hotpink"}},"f"),y("li",{key:"c",style:{background:"orange"}},"c"),y("li",{key:"n",style:{background:"orange"}},"n"));setTimeout(()=>{console.log(I,"newVnode"),_(x,I)},1e3);let j=new k({el:"#app",data:()=>({msg:"hello zf"}),render(e){return console.log("执行用户传过来的render",e),e("p",{id:"a"},this.msg)}});setTimeout(()=>{j.msg="zouyu"},1e3)}]);
//# sourceMappingURL=bundle.js.map