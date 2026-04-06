(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function e(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(s){if(s.ep)return;s.ep=!0;const o=e(s);fetch(s.href,o)}})();const Nu=()=>{};var Qo={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fl=function(n){const t=[];let e=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?t[e++]=s:s<2048?(t[e++]=s>>6|192,t[e++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),t[e++]=s>>18|240,t[e++]=s>>12&63|128,t[e++]=s>>6&63|128,t[e++]=s&63|128):(t[e++]=s>>12|224,t[e++]=s>>6&63|128,t[e++]=s&63|128)}return t},Lu=function(n){const t=[];let e=0,r=0;for(;e<n.length;){const s=n[e++];if(s<128)t[r++]=String.fromCharCode(s);else if(s>191&&s<224){const o=n[e++];t[r++]=String.fromCharCode((s&31)<<6|o&63)}else if(s>239&&s<365){const o=n[e++],a=n[e++],c=n[e++],h=((s&7)<<18|(o&63)<<12|(a&63)<<6|c&63)-65536;t[r++]=String.fromCharCode(55296+(h>>10)),t[r++]=String.fromCharCode(56320+(h&1023))}else{const o=n[e++],a=n[e++];t[r++]=String.fromCharCode((s&15)<<12|(o&63)<<6|a&63)}}return t.join("")},ml={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,t){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const e=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const o=n[s],a=s+1<n.length,c=a?n[s+1]:0,h=s+2<n.length,d=h?n[s+2]:0,m=o>>2,y=(o&3)<<4|c>>4;let p=(c&15)<<2|d>>6,S=d&63;h||(S=64,a||(p=64)),r.push(e[m],e[y],e[p],e[S])}return r.join("")},encodeString(n,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(n):this.encodeByteArray(fl(n),t)},decodeString(n,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(n):Lu(this.decodeStringToByteArray(n,t))},decodeStringToByteArray(n,t){this.init_();const e=t?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const o=e[n.charAt(s++)],c=s<n.length?e[n.charAt(s)]:0;++s;const d=s<n.length?e[n.charAt(s)]:64;++s;const y=s<n.length?e[n.charAt(s)]:64;if(++s,o==null||c==null||d==null||y==null)throw new Ou;const p=o<<2|c>>4;if(r.push(p),d!==64){const S=c<<4&240|d>>2;if(r.push(S),y!==64){const C=d<<6&192|y;r.push(C)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class Ou extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Mu=function(n){const t=fl(n);return ml.encodeByteArray(t,!0)},jr=function(n){return Mu(n).replace(/\./g,"")},Fu=function(n){try{return ml.decodeString(n,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bu(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Uu=()=>Bu().__FIREBASE_DEFAULTS__,zu=()=>{if(typeof process>"u"||typeof Qo>"u")return;const n=Qo.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},ju=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const t=n&&Fu(n[1]);return t&&JSON.parse(t)},gi=()=>{try{return Nu()||Uu()||zu()||ju()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},$u=n=>{var t,e;return(e=(t=gi())===null||t===void 0?void 0:t.emulatorHosts)===null||e===void 0?void 0:e[n]},qu=n=>{const t=$u(n);if(!t)return;const e=t.lastIndexOf(":");if(e<=0||e+1===t.length)throw new Error(`Invalid host ${t} with no separate hostname and port!`);const r=parseInt(t.substring(e+1),10);return t[0]==="["?[t.substring(1,e-1),r]:[t.substring(0,e),r]},pl=()=>{var n;return(n=gi())===null||n===void 0?void 0:n.config};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gu{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}wrapCallback(t){return(e,r)=>{e?this.reject(e):this.resolve(r),typeof t=="function"&&(this.promise.catch(()=>{}),t.length===1?t(e):t(e,r))}}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yi(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Hu(n){return(await fetch(n,{credentials:"include"})).ok}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ku(n,t){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const e={alg:"none",type:"JWT"},r=t||"demo-project",s=n.iat||0,o=n.sub||n.user_id;if(!o)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:o,user_id:o,firebase:{sign_in_provider:"custom",identities:{}}},n);return[jr(JSON.stringify(e)),jr(JSON.stringify(a)),""].join(".")}const jn={};function Wu(){const n={prod:[],emulator:[]};for(const t of Object.keys(jn))jn[t]?n.emulator.push(t):n.prod.push(t);return n}function Qu(n){let t=document.getElementById(n),e=!1;return t||(t=document.createElement("div"),t.setAttribute("id",n),e=!0),{created:e,element:t}}let Yo=!1;function Yu(n,t){if(typeof window>"u"||typeof document>"u"||!yi(window.location.host)||jn[n]===t||jn[n]||Yo)return;jn[n]=t;function e(p){return`__firebase__banner__${p}`}const r="__firebase__banner",o=Wu().prod.length>0;function a(){const p=document.getElementById(r);p&&p.remove()}function c(p){p.style.display="flex",p.style.background="#7faaf0",p.style.position="fixed",p.style.bottom="5px",p.style.left="5px",p.style.padding=".5em",p.style.borderRadius="5px",p.style.alignItems="center"}function h(p,S){p.setAttribute("width","24"),p.setAttribute("id",S),p.setAttribute("height","24"),p.setAttribute("viewBox","0 0 24 24"),p.setAttribute("fill","none"),p.style.marginLeft="-6px"}function d(){const p=document.createElement("span");return p.style.cursor="pointer",p.style.marginLeft="16px",p.style.fontSize="24px",p.innerHTML=" &times;",p.onclick=()=>{Yo=!0,a()},p}function m(p,S){p.setAttribute("id",S),p.innerText="Learn more",p.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",p.setAttribute("target","__blank"),p.style.paddingLeft="5px",p.style.textDecoration="underline"}function y(){const p=Qu(r),S=e("text"),C=document.getElementById(S)||document.createElement("span"),N=e("learnmore"),x=document.getElementById(N)||document.createElement("a"),K=e("preprendIcon"),z=document.getElementById(K)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(p.created){const B=p.element;c(B),m(x,N);const W=d();h(z,K),B.append(z,C,x,W),document.body.appendChild(B)}o?(C.innerText="Preview backend disconnected.",z.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(z.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,C.innerText="Preview backend running in this workspace."),C.setAttribute("id",S)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",y):y()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ju(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Xu(){var n;const t=(n=gi())===null||n===void 0?void 0:n.forceEnvironment;if(t==="node")return!0;if(t==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Zu(){return!Xu()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function th(){try{return typeof indexedDB=="object"}catch{return!1}}function eh(){return new Promise((n,t)=>{try{let e=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),e||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{e=!1},s.onerror=()=>{var o;t(((o=s.error)===null||o===void 0?void 0:o.message)||"")}}catch(e){t(e)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nh="FirebaseError";class gn extends Error{constructor(t,e,r){super(e),this.code=t,this.customData=r,this.name=nh,Object.setPrototypeOf(this,gn.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,gl.prototype.create)}}class gl{constructor(t,e,r){this.service=t,this.serviceName=e,this.errors=r}create(t,...e){const r=e[0]||{},s=`${this.service}/${t}`,o=this.errors[t],a=o?rh(o,r):"Error",c=`${this.serviceName}: ${a} (${s}).`;return new gn(s,c,r)}}function rh(n,t){return n.replace(sh,(e,r)=>{const s=t[r];return s!=null?String(s):`<${r}?>`})}const sh=/\{\$([^}]+)}/g;function $r(n,t){if(n===t)return!0;const e=Object.keys(n),r=Object.keys(t);for(const s of e){if(!r.includes(s))return!1;const o=n[s],a=t[s];if(Jo(o)&&Jo(a)){if(!$r(o,a))return!1}else if(o!==a)return!1}for(const s of r)if(!e.includes(s))return!1;return!0}function Jo(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ue(n){return n&&n._delegate?n._delegate:n}class Kn{constructor(t,e,r){this.name=t,this.instanceFactory=e,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const je="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ih{constructor(t,e){this.name=t,this.container=e,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(t){const e=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(e)){const r=new Gu;if(this.instancesDeferred.set(e,r),this.isInitialized(e)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:e});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(e).promise}getImmediate(t){var e;const r=this.normalizeInstanceIdentifier(t==null?void 0:t.identifier),s=(e=t==null?void 0:t.optional)!==null&&e!==void 0?e:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(o){if(s)return null;throw o}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(t){if(t.name!==this.name)throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=t,!!this.shouldAutoInitialize()){if(ah(t))try{this.getOrInitializeService({instanceIdentifier:je})}catch{}for(const[e,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(e);try{const o=this.getOrInitializeService({instanceIdentifier:s});r.resolve(o)}catch{}}}}clearInstance(t=je){this.instancesDeferred.delete(t),this.instancesOptions.delete(t),this.instances.delete(t)}async delete(){const t=Array.from(this.instances.values());await Promise.all([...t.filter(e=>"INTERNAL"in e).map(e=>e.INTERNAL.delete()),...t.filter(e=>"_delete"in e).map(e=>e._delete())])}isComponentSet(){return this.component!=null}isInitialized(t=je){return this.instances.has(t)}getOptions(t=je){return this.instancesOptions.get(t)||{}}initialize(t={}){const{options:e={}}=t,r=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:e});for(const[o,a]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(o);r===c&&a.resolve(s)}return s}onInit(t,e){var r;const s=this.normalizeInstanceIdentifier(e),o=(r=this.onInitCallbacks.get(s))!==null&&r!==void 0?r:new Set;o.add(t),this.onInitCallbacks.set(s,o);const a=this.instances.get(s);return a&&t(a,s),()=>{o.delete(t)}}invokeOnInitCallbacks(t,e){const r=this.onInitCallbacks.get(e);if(r)for(const s of r)try{s(t,e)}catch{}}getOrInitializeService({instanceIdentifier:t,options:e={}}){let r=this.instances.get(t);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:oh(t),options:e}),this.instances.set(t,r),this.instancesOptions.set(t,e),this.invokeOnInitCallbacks(r,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,r)}catch{}return r||null}normalizeInstanceIdentifier(t=je){return this.component?this.component.multipleInstances?t:je:t}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function oh(n){return n===je?void 0:n}function ah(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lh{constructor(t){this.name=t,this.providers=new Map}addComponent(t){const e=this.getProvider(t.name);if(e.isComponentSet())throw new Error(`Component ${t.name} has already been registered with ${this.name}`);e.setComponent(t)}addOrOverwriteComponent(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)}getProvider(t){if(this.providers.has(t))return this.providers.get(t);const e=new ih(t,this);return this.providers.set(t,e),e}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var X;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(X||(X={}));const ch={debug:X.DEBUG,verbose:X.VERBOSE,info:X.INFO,warn:X.WARN,error:X.ERROR,silent:X.SILENT},uh=X.INFO,hh={[X.DEBUG]:"log",[X.VERBOSE]:"log",[X.INFO]:"info",[X.WARN]:"warn",[X.ERROR]:"error"},dh=(n,t,...e)=>{if(t<n.logLevel)return;const r=new Date().toISOString(),s=hh[t];if(s)console[s](`[${r}]  ${n.name}:`,...e);else throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`)};class yl{constructor(t){this.name=t,this._logLevel=uh,this._logHandler=dh,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in X))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel=typeof t=="string"?ch[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if(typeof t!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,X.DEBUG,...t),this._logHandler(this,X.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,X.VERBOSE,...t),this._logHandler(this,X.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,X.INFO,...t),this._logHandler(this,X.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,X.WARN,...t),this._logHandler(this,X.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,X.ERROR,...t),this._logHandler(this,X.ERROR,...t)}}const fh=(n,t)=>t.some(e=>n instanceof e);let Xo,Zo;function mh(){return Xo||(Xo=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function ph(){return Zo||(Zo=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const vl=new WeakMap,Ks=new WeakMap,_l=new WeakMap,Bs=new WeakMap,vi=new WeakMap;function gh(n){const t=new Promise((e,r)=>{const s=()=>{n.removeEventListener("success",o),n.removeEventListener("error",a)},o=()=>{e(Ie(n.result)),s()},a=()=>{r(n.error),s()};n.addEventListener("success",o),n.addEventListener("error",a)});return t.then(e=>{e instanceof IDBCursor&&vl.set(e,n)}).catch(()=>{}),vi.set(t,n),t}function yh(n){if(Ks.has(n))return;const t=new Promise((e,r)=>{const s=()=>{n.removeEventListener("complete",o),n.removeEventListener("error",a),n.removeEventListener("abort",a)},o=()=>{e(),s()},a=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",o),n.addEventListener("error",a),n.addEventListener("abort",a)});Ks.set(n,t)}let Ws={get(n,t,e){if(n instanceof IDBTransaction){if(t==="done")return Ks.get(n);if(t==="objectStoreNames")return n.objectStoreNames||_l.get(n);if(t==="store")return e.objectStoreNames[1]?void 0:e.objectStore(e.objectStoreNames[0])}return Ie(n[t])},set(n,t,e){return n[t]=e,!0},has(n,t){return n instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in n}};function vh(n){Ws=n(Ws)}function _h(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(t,...e){const r=n.call(Us(this),t,...e);return _l.set(r,t.sort?t.sort():[t]),Ie(r)}:ph().includes(n)?function(...t){return n.apply(Us(this),t),Ie(vl.get(this))}:function(...t){return Ie(n.apply(Us(this),t))}}function Eh(n){return typeof n=="function"?_h(n):(n instanceof IDBTransaction&&yh(n),fh(n,mh())?new Proxy(n,Ws):n)}function Ie(n){if(n instanceof IDBRequest)return gh(n);if(Bs.has(n))return Bs.get(n);const t=Eh(n);return t!==n&&(Bs.set(n,t),vi.set(t,n)),t}const Us=n=>vi.get(n);function bh(n,t,{blocked:e,upgrade:r,blocking:s,terminated:o}={}){const a=indexedDB.open(n,t),c=Ie(a);return r&&a.addEventListener("upgradeneeded",h=>{r(Ie(a.result),h.oldVersion,h.newVersion,Ie(a.transaction),h)}),e&&a.addEventListener("blocked",h=>e(h.oldVersion,h.newVersion,h)),c.then(h=>{o&&h.addEventListener("close",()=>o()),s&&h.addEventListener("versionchange",d=>s(d.oldVersion,d.newVersion,d))}).catch(()=>{}),c}const wh=["get","getKey","getAll","getAllKeys","count"],Th=["put","add","delete","clear"],zs=new Map;function ta(n,t){if(!(n instanceof IDBDatabase&&!(t in n)&&typeof t=="string"))return;if(zs.get(t))return zs.get(t);const e=t.replace(/FromIndex$/,""),r=t!==e,s=Th.includes(e);if(!(e in(r?IDBIndex:IDBObjectStore).prototype)||!(s||wh.includes(e)))return;const o=async function(a,...c){const h=this.transaction(a,s?"readwrite":"readonly");let d=h.store;return r&&(d=d.index(c.shift())),(await Promise.all([d[e](...c),s&&h.done]))[0]};return zs.set(t,o),o}vh(n=>({...n,get:(t,e,r)=>ta(t,e)||n.get(t,e,r),has:(t,e)=>!!ta(t,e)||n.has(t,e)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ih{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map(e=>{if(Ah(e)){const r=e.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(e=>e).join(" ")}}function Ah(n){const t=n.getComponent();return(t==null?void 0:t.type)==="VERSION"}const Qs="@firebase/app",ea="0.13.2";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const he=new yl("@firebase/app"),Sh="@firebase/app-compat",Rh="@firebase/analytics-compat",Ph="@firebase/analytics",Ch="@firebase/app-check-compat",xh="@firebase/app-check",Vh="@firebase/auth",kh="@firebase/auth-compat",Dh="@firebase/database",Nh="@firebase/data-connect",Lh="@firebase/database-compat",Oh="@firebase/functions",Mh="@firebase/functions-compat",Fh="@firebase/installations",Bh="@firebase/installations-compat",Uh="@firebase/messaging",zh="@firebase/messaging-compat",jh="@firebase/performance",$h="@firebase/performance-compat",qh="@firebase/remote-config",Gh="@firebase/remote-config-compat",Hh="@firebase/storage",Kh="@firebase/storage-compat",Wh="@firebase/firestore",Qh="@firebase/ai",Yh="@firebase/firestore-compat",Jh="firebase",Xh="11.10.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ys="[DEFAULT]",Zh={[Qs]:"fire-core",[Sh]:"fire-core-compat",[Ph]:"fire-analytics",[Rh]:"fire-analytics-compat",[xh]:"fire-app-check",[Ch]:"fire-app-check-compat",[Vh]:"fire-auth",[kh]:"fire-auth-compat",[Dh]:"fire-rtdb",[Nh]:"fire-data-connect",[Lh]:"fire-rtdb-compat",[Oh]:"fire-fn",[Mh]:"fire-fn-compat",[Fh]:"fire-iid",[Bh]:"fire-iid-compat",[Uh]:"fire-fcm",[zh]:"fire-fcm-compat",[jh]:"fire-perf",[$h]:"fire-perf-compat",[qh]:"fire-rc",[Gh]:"fire-rc-compat",[Hh]:"fire-gcs",[Kh]:"fire-gcs-compat",[Wh]:"fire-fst",[Yh]:"fire-fst-compat",[Qh]:"fire-vertex","fire-js":"fire-js",[Jh]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qr=new Map,td=new Map,Js=new Map;function na(n,t){try{n.container.addComponent(t)}catch(e){he.debug(`Component ${t.name} failed to register with FirebaseApp ${n.name}`,e)}}function Gr(n){const t=n.name;if(Js.has(t))return he.debug(`There were multiple attempts to register component ${t}.`),!1;Js.set(t,n);for(const e of qr.values())na(e,n);for(const e of td.values())na(e,n);return!0}function ed(n,t){const e=n.container.getProvider("heartbeat").getImmediate({optional:!0});return e&&e.triggerHeartbeat(),n.container.getProvider(t)}function nd(n){return n==null?!1:n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rd={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Ae=new gl("app","Firebase",rd);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sd{constructor(t,e,r){this._isDeleted=!1,this._options=Object.assign({},t),this._config=Object.assign({},e),this._name=e.name,this._automaticDataCollectionEnabled=e.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Kn("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw Ae.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const id=Xh;function El(n,t={}){let e=n;typeof t!="object"&&(t={name:t});const r=Object.assign({name:Ys,automaticDataCollectionEnabled:!0},t),s=r.name;if(typeof s!="string"||!s)throw Ae.create("bad-app-name",{appName:String(s)});if(e||(e=pl()),!e)throw Ae.create("no-options");const o=qr.get(s);if(o){if($r(e,o.options)&&$r(r,o.config))return o;throw Ae.create("duplicate-app",{appName:s})}const a=new lh(s);for(const h of Js.values())a.addComponent(h);const c=new sd(e,r,a);return qr.set(s,c),c}function od(n=Ys){const t=qr.get(n);if(!t&&n===Ys&&pl())return El();if(!t)throw Ae.create("no-app",{appName:n});return t}function an(n,t,e){var r;let s=(r=Zh[n])!==null&&r!==void 0?r:n;e&&(s+=`-${e}`);const o=s.match(/\s|\//),a=t.match(/\s|\//);if(o||a){const c=[`Unable to register library "${s}" with version "${t}":`];o&&c.push(`library name "${s}" contains illegal characters (whitespace or "/")`),o&&a&&c.push("and"),a&&c.push(`version name "${t}" contains illegal characters (whitespace or "/")`),he.warn(c.join(" "));return}Gr(new Kn(`${s}-version`,()=>({library:s,version:t}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ad="firebase-heartbeat-database",ld=1,Wn="firebase-heartbeat-store";let js=null;function bl(){return js||(js=bh(ad,ld,{upgrade:(n,t)=>{switch(t){case 0:try{n.createObjectStore(Wn)}catch(e){console.warn(e)}}}}).catch(n=>{throw Ae.create("idb-open",{originalErrorMessage:n.message})})),js}async function cd(n){try{const e=(await bl()).transaction(Wn),r=await e.objectStore(Wn).get(wl(n));return await e.done,r}catch(t){if(t instanceof gn)he.warn(t.message);else{const e=Ae.create("idb-get",{originalErrorMessage:t==null?void 0:t.message});he.warn(e.message)}}}async function ra(n,t){try{const r=(await bl()).transaction(Wn,"readwrite");await r.objectStore(Wn).put(t,wl(n)),await r.done}catch(e){if(e instanceof gn)he.warn(e.message);else{const r=Ae.create("idb-set",{originalErrorMessage:e==null?void 0:e.message});he.warn(r.message)}}}function wl(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ud=1024,hd=30;class dd{constructor(t){this.container=t,this._heartbeatsCache=null;const e=this.container.getProvider("app").getImmediate();this._storage=new md(e),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var t,e;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),o=sa();if(((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===o||this._heartbeatsCache.heartbeats.some(a=>a.date===o))return;if(this._heartbeatsCache.heartbeats.push({date:o,agent:s}),this._heartbeatsCache.heartbeats.length>hd){const a=pd(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(a,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){he.warn(r)}}async getHeartbeatsHeader(){var t;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=sa(),{heartbeatsToSend:r,unsentEntries:s}=fd(this._heartbeatsCache.heartbeats),o=jr(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=e,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),o}catch(e){return he.warn(e),""}}}function sa(){return new Date().toISOString().substring(0,10)}function fd(n,t=ud){const e=[];let r=n.slice();for(const s of n){const o=e.find(a=>a.agent===s.agent);if(o){if(o.dates.push(s.date),ia(e)>t){o.dates.pop();break}}else if(e.push({agent:s.agent,dates:[s.date]}),ia(e)>t){e.pop();break}r=r.slice(1)}return{heartbeatsToSend:e,unsentEntries:r}}class md{constructor(t){this.app=t,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return th()?eh().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const e=await cd(this.app);return e!=null&&e.heartbeats?e:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(t){var e;if(await this._canUseIndexedDBPromise){const s=await this.read();return ra(this.app,{lastSentHeartbeatDate:(e=t.lastSentHeartbeatDate)!==null&&e!==void 0?e:s.lastSentHeartbeatDate,heartbeats:t.heartbeats})}else return}async add(t){var e;if(await this._canUseIndexedDBPromise){const s=await this.read();return ra(this.app,{lastSentHeartbeatDate:(e=t.lastSentHeartbeatDate)!==null&&e!==void 0?e:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...t.heartbeats]})}else return}}function ia(n){return jr(JSON.stringify({version:2,heartbeats:n})).length}function pd(n){if(n.length===0)return-1;let t=0,e=n[0].date;for(let r=1;r<n.length;r++)n[r].date<e&&(e=n[r].date,t=r);return t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gd(n){Gr(new Kn("platform-logger",t=>new Ih(t),"PRIVATE")),Gr(new Kn("heartbeat",t=>new dd(t),"PRIVATE")),an(Qs,ea,n),an(Qs,ea,"esm2017"),an("fire-js","")}gd("");var yd="firebase",vd="11.10.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */an(yd,vd,"app");var oa=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Se,Tl;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function t(w,g){function v(){}v.prototype=g.prototype,w.D=g.prototype,w.prototype=new v,w.prototype.constructor=w,w.C=function(E,b,I){for(var _=Array(arguments.length-2),zt=2;zt<arguments.length;zt++)_[zt-2]=arguments[zt];return g.prototype[b].apply(E,_)}}function e(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}t(r,e),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(w,g,v){v||(v=0);var E=Array(16);if(typeof g=="string")for(var b=0;16>b;++b)E[b]=g.charCodeAt(v++)|g.charCodeAt(v++)<<8|g.charCodeAt(v++)<<16|g.charCodeAt(v++)<<24;else for(b=0;16>b;++b)E[b]=g[v++]|g[v++]<<8|g[v++]<<16|g[v++]<<24;g=w.g[0],v=w.g[1],b=w.g[2];var I=w.g[3],_=g+(I^v&(b^I))+E[0]+3614090360&4294967295;g=v+(_<<7&4294967295|_>>>25),_=I+(b^g&(v^b))+E[1]+3905402710&4294967295,I=g+(_<<12&4294967295|_>>>20),_=b+(v^I&(g^v))+E[2]+606105819&4294967295,b=I+(_<<17&4294967295|_>>>15),_=v+(g^b&(I^g))+E[3]+3250441966&4294967295,v=b+(_<<22&4294967295|_>>>10),_=g+(I^v&(b^I))+E[4]+4118548399&4294967295,g=v+(_<<7&4294967295|_>>>25),_=I+(b^g&(v^b))+E[5]+1200080426&4294967295,I=g+(_<<12&4294967295|_>>>20),_=b+(v^I&(g^v))+E[6]+2821735955&4294967295,b=I+(_<<17&4294967295|_>>>15),_=v+(g^b&(I^g))+E[7]+4249261313&4294967295,v=b+(_<<22&4294967295|_>>>10),_=g+(I^v&(b^I))+E[8]+1770035416&4294967295,g=v+(_<<7&4294967295|_>>>25),_=I+(b^g&(v^b))+E[9]+2336552879&4294967295,I=g+(_<<12&4294967295|_>>>20),_=b+(v^I&(g^v))+E[10]+4294925233&4294967295,b=I+(_<<17&4294967295|_>>>15),_=v+(g^b&(I^g))+E[11]+2304563134&4294967295,v=b+(_<<22&4294967295|_>>>10),_=g+(I^v&(b^I))+E[12]+1804603682&4294967295,g=v+(_<<7&4294967295|_>>>25),_=I+(b^g&(v^b))+E[13]+4254626195&4294967295,I=g+(_<<12&4294967295|_>>>20),_=b+(v^I&(g^v))+E[14]+2792965006&4294967295,b=I+(_<<17&4294967295|_>>>15),_=v+(g^b&(I^g))+E[15]+1236535329&4294967295,v=b+(_<<22&4294967295|_>>>10),_=g+(b^I&(v^b))+E[1]+4129170786&4294967295,g=v+(_<<5&4294967295|_>>>27),_=I+(v^b&(g^v))+E[6]+3225465664&4294967295,I=g+(_<<9&4294967295|_>>>23),_=b+(g^v&(I^g))+E[11]+643717713&4294967295,b=I+(_<<14&4294967295|_>>>18),_=v+(I^g&(b^I))+E[0]+3921069994&4294967295,v=b+(_<<20&4294967295|_>>>12),_=g+(b^I&(v^b))+E[5]+3593408605&4294967295,g=v+(_<<5&4294967295|_>>>27),_=I+(v^b&(g^v))+E[10]+38016083&4294967295,I=g+(_<<9&4294967295|_>>>23),_=b+(g^v&(I^g))+E[15]+3634488961&4294967295,b=I+(_<<14&4294967295|_>>>18),_=v+(I^g&(b^I))+E[4]+3889429448&4294967295,v=b+(_<<20&4294967295|_>>>12),_=g+(b^I&(v^b))+E[9]+568446438&4294967295,g=v+(_<<5&4294967295|_>>>27),_=I+(v^b&(g^v))+E[14]+3275163606&4294967295,I=g+(_<<9&4294967295|_>>>23),_=b+(g^v&(I^g))+E[3]+4107603335&4294967295,b=I+(_<<14&4294967295|_>>>18),_=v+(I^g&(b^I))+E[8]+1163531501&4294967295,v=b+(_<<20&4294967295|_>>>12),_=g+(b^I&(v^b))+E[13]+2850285829&4294967295,g=v+(_<<5&4294967295|_>>>27),_=I+(v^b&(g^v))+E[2]+4243563512&4294967295,I=g+(_<<9&4294967295|_>>>23),_=b+(g^v&(I^g))+E[7]+1735328473&4294967295,b=I+(_<<14&4294967295|_>>>18),_=v+(I^g&(b^I))+E[12]+2368359562&4294967295,v=b+(_<<20&4294967295|_>>>12),_=g+(v^b^I)+E[5]+4294588738&4294967295,g=v+(_<<4&4294967295|_>>>28),_=I+(g^v^b)+E[8]+2272392833&4294967295,I=g+(_<<11&4294967295|_>>>21),_=b+(I^g^v)+E[11]+1839030562&4294967295,b=I+(_<<16&4294967295|_>>>16),_=v+(b^I^g)+E[14]+4259657740&4294967295,v=b+(_<<23&4294967295|_>>>9),_=g+(v^b^I)+E[1]+2763975236&4294967295,g=v+(_<<4&4294967295|_>>>28),_=I+(g^v^b)+E[4]+1272893353&4294967295,I=g+(_<<11&4294967295|_>>>21),_=b+(I^g^v)+E[7]+4139469664&4294967295,b=I+(_<<16&4294967295|_>>>16),_=v+(b^I^g)+E[10]+3200236656&4294967295,v=b+(_<<23&4294967295|_>>>9),_=g+(v^b^I)+E[13]+681279174&4294967295,g=v+(_<<4&4294967295|_>>>28),_=I+(g^v^b)+E[0]+3936430074&4294967295,I=g+(_<<11&4294967295|_>>>21),_=b+(I^g^v)+E[3]+3572445317&4294967295,b=I+(_<<16&4294967295|_>>>16),_=v+(b^I^g)+E[6]+76029189&4294967295,v=b+(_<<23&4294967295|_>>>9),_=g+(v^b^I)+E[9]+3654602809&4294967295,g=v+(_<<4&4294967295|_>>>28),_=I+(g^v^b)+E[12]+3873151461&4294967295,I=g+(_<<11&4294967295|_>>>21),_=b+(I^g^v)+E[15]+530742520&4294967295,b=I+(_<<16&4294967295|_>>>16),_=v+(b^I^g)+E[2]+3299628645&4294967295,v=b+(_<<23&4294967295|_>>>9),_=g+(b^(v|~I))+E[0]+4096336452&4294967295,g=v+(_<<6&4294967295|_>>>26),_=I+(v^(g|~b))+E[7]+1126891415&4294967295,I=g+(_<<10&4294967295|_>>>22),_=b+(g^(I|~v))+E[14]+2878612391&4294967295,b=I+(_<<15&4294967295|_>>>17),_=v+(I^(b|~g))+E[5]+4237533241&4294967295,v=b+(_<<21&4294967295|_>>>11),_=g+(b^(v|~I))+E[12]+1700485571&4294967295,g=v+(_<<6&4294967295|_>>>26),_=I+(v^(g|~b))+E[3]+2399980690&4294967295,I=g+(_<<10&4294967295|_>>>22),_=b+(g^(I|~v))+E[10]+4293915773&4294967295,b=I+(_<<15&4294967295|_>>>17),_=v+(I^(b|~g))+E[1]+2240044497&4294967295,v=b+(_<<21&4294967295|_>>>11),_=g+(b^(v|~I))+E[8]+1873313359&4294967295,g=v+(_<<6&4294967295|_>>>26),_=I+(v^(g|~b))+E[15]+4264355552&4294967295,I=g+(_<<10&4294967295|_>>>22),_=b+(g^(I|~v))+E[6]+2734768916&4294967295,b=I+(_<<15&4294967295|_>>>17),_=v+(I^(b|~g))+E[13]+1309151649&4294967295,v=b+(_<<21&4294967295|_>>>11),_=g+(b^(v|~I))+E[4]+4149444226&4294967295,g=v+(_<<6&4294967295|_>>>26),_=I+(v^(g|~b))+E[11]+3174756917&4294967295,I=g+(_<<10&4294967295|_>>>22),_=b+(g^(I|~v))+E[2]+718787259&4294967295,b=I+(_<<15&4294967295|_>>>17),_=v+(I^(b|~g))+E[9]+3951481745&4294967295,w.g[0]=w.g[0]+g&4294967295,w.g[1]=w.g[1]+(b+(_<<21&4294967295|_>>>11))&4294967295,w.g[2]=w.g[2]+b&4294967295,w.g[3]=w.g[3]+I&4294967295}r.prototype.u=function(w,g){g===void 0&&(g=w.length);for(var v=g-this.blockSize,E=this.B,b=this.h,I=0;I<g;){if(b==0)for(;I<=v;)s(this,w,I),I+=this.blockSize;if(typeof w=="string"){for(;I<g;)if(E[b++]=w.charCodeAt(I++),b==this.blockSize){s(this,E),b=0;break}}else for(;I<g;)if(E[b++]=w[I++],b==this.blockSize){s(this,E),b=0;break}}this.h=b,this.o+=g},r.prototype.v=function(){var w=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);w[0]=128;for(var g=1;g<w.length-8;++g)w[g]=0;var v=8*this.o;for(g=w.length-8;g<w.length;++g)w[g]=v&255,v/=256;for(this.u(w),w=Array(16),g=v=0;4>g;++g)for(var E=0;32>E;E+=8)w[v++]=this.g[g]>>>E&255;return w};function o(w,g){var v=c;return Object.prototype.hasOwnProperty.call(v,w)?v[w]:v[w]=g(w)}function a(w,g){this.h=g;for(var v=[],E=!0,b=w.length-1;0<=b;b--){var I=w[b]|0;E&&I==g||(v[b]=I,E=!1)}this.g=v}var c={};function h(w){return-128<=w&&128>w?o(w,function(g){return new a([g|0],0>g?-1:0)}):new a([w|0],0>w?-1:0)}function d(w){if(isNaN(w)||!isFinite(w))return y;if(0>w)return x(d(-w));for(var g=[],v=1,E=0;w>=v;E++)g[E]=w/v|0,v*=4294967296;return new a(g,0)}function m(w,g){if(w.length==0)throw Error("number format error: empty string");if(g=g||10,2>g||36<g)throw Error("radix out of range: "+g);if(w.charAt(0)=="-")return x(m(w.substring(1),g));if(0<=w.indexOf("-"))throw Error('number format error: interior "-" character');for(var v=d(Math.pow(g,8)),E=y,b=0;b<w.length;b+=8){var I=Math.min(8,w.length-b),_=parseInt(w.substring(b,b+I),g);8>I?(I=d(Math.pow(g,I)),E=E.j(I).add(d(_))):(E=E.j(v),E=E.add(d(_)))}return E}var y=h(0),p=h(1),S=h(16777216);n=a.prototype,n.m=function(){if(N(this))return-x(this).m();for(var w=0,g=1,v=0;v<this.g.length;v++){var E=this.i(v);w+=(0<=E?E:4294967296+E)*g,g*=4294967296}return w},n.toString=function(w){if(w=w||10,2>w||36<w)throw Error("radix out of range: "+w);if(C(this))return"0";if(N(this))return"-"+x(this).toString(w);for(var g=d(Math.pow(w,6)),v=this,E="";;){var b=W(v,g).g;v=K(v,b.j(g));var I=((0<v.g.length?v.g[0]:v.h)>>>0).toString(w);if(v=b,C(v))return I+E;for(;6>I.length;)I="0"+I;E=I+E}},n.i=function(w){return 0>w?0:w<this.g.length?this.g[w]:this.h};function C(w){if(w.h!=0)return!1;for(var g=0;g<w.g.length;g++)if(w.g[g]!=0)return!1;return!0}function N(w){return w.h==-1}n.l=function(w){return w=K(this,w),N(w)?-1:C(w)?0:1};function x(w){for(var g=w.g.length,v=[],E=0;E<g;E++)v[E]=~w.g[E];return new a(v,~w.h).add(p)}n.abs=function(){return N(this)?x(this):this},n.add=function(w){for(var g=Math.max(this.g.length,w.g.length),v=[],E=0,b=0;b<=g;b++){var I=E+(this.i(b)&65535)+(w.i(b)&65535),_=(I>>>16)+(this.i(b)>>>16)+(w.i(b)>>>16);E=_>>>16,I&=65535,_&=65535,v[b]=_<<16|I}return new a(v,v[v.length-1]&-2147483648?-1:0)};function K(w,g){return w.add(x(g))}n.j=function(w){if(C(this)||C(w))return y;if(N(this))return N(w)?x(this).j(x(w)):x(x(this).j(w));if(N(w))return x(this.j(x(w)));if(0>this.l(S)&&0>w.l(S))return d(this.m()*w.m());for(var g=this.g.length+w.g.length,v=[],E=0;E<2*g;E++)v[E]=0;for(E=0;E<this.g.length;E++)for(var b=0;b<w.g.length;b++){var I=this.i(E)>>>16,_=this.i(E)&65535,zt=w.i(b)>>>16,pe=w.i(b)&65535;v[2*E+2*b]+=_*pe,z(v,2*E+2*b),v[2*E+2*b+1]+=I*pe,z(v,2*E+2*b+1),v[2*E+2*b+1]+=_*zt,z(v,2*E+2*b+1),v[2*E+2*b+2]+=I*zt,z(v,2*E+2*b+2)}for(E=0;E<g;E++)v[E]=v[2*E+1]<<16|v[2*E];for(E=g;E<2*g;E++)v[E]=0;return new a(v,0)};function z(w,g){for(;(w[g]&65535)!=w[g];)w[g+1]+=w[g]>>>16,w[g]&=65535,g++}function B(w,g){this.g=w,this.h=g}function W(w,g){if(C(g))throw Error("division by zero");if(C(w))return new B(y,y);if(N(w))return g=W(x(w),g),new B(x(g.g),x(g.h));if(N(g))return g=W(w,x(g)),new B(x(g.g),g.h);if(30<w.g.length){if(N(w)||N(g))throw Error("slowDivide_ only works with positive integers.");for(var v=p,E=g;0>=E.l(w);)v=Q(v),E=Q(E);var b=ht(v,1),I=ht(E,1);for(E=ht(E,2),v=ht(v,2);!C(E);){var _=I.add(E);0>=_.l(w)&&(b=b.add(v),I=_),E=ht(E,1),v=ht(v,1)}return g=K(w,b.j(g)),new B(b,g)}for(b=y;0<=w.l(g);){for(v=Math.max(1,Math.floor(w.m()/g.m())),E=Math.ceil(Math.log(v)/Math.LN2),E=48>=E?1:Math.pow(2,E-48),I=d(v),_=I.j(g);N(_)||0<_.l(w);)v-=E,I=d(v),_=I.j(g);C(I)&&(I=p),b=b.add(I),w=K(w,_)}return new B(b,w)}n.A=function(w){return W(this,w).h},n.and=function(w){for(var g=Math.max(this.g.length,w.g.length),v=[],E=0;E<g;E++)v[E]=this.i(E)&w.i(E);return new a(v,this.h&w.h)},n.or=function(w){for(var g=Math.max(this.g.length,w.g.length),v=[],E=0;E<g;E++)v[E]=this.i(E)|w.i(E);return new a(v,this.h|w.h)},n.xor=function(w){for(var g=Math.max(this.g.length,w.g.length),v=[],E=0;E<g;E++)v[E]=this.i(E)^w.i(E);return new a(v,this.h^w.h)};function Q(w){for(var g=w.g.length+1,v=[],E=0;E<g;E++)v[E]=w.i(E)<<1|w.i(E-1)>>>31;return new a(v,w.h)}function ht(w,g){var v=g>>5;g%=32;for(var E=w.g.length-v,b=[],I=0;I<E;I++)b[I]=0<g?w.i(I+v)>>>g|w.i(I+v+1)<<32-g:w.i(I+v);return new a(b,w.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,Tl=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.A,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=d,a.fromString=m,Se=a}).apply(typeof oa<"u"?oa:typeof self<"u"?self:typeof window<"u"?window:{});var Pr=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Il,Fn,Al,Or,Xs,Sl,Rl,Pl;(function(){var n,t=typeof Object.defineProperties=="function"?Object.defineProperty:function(i,l,u){return i==Array.prototype||i==Object.prototype||(i[l]=u.value),i};function e(i){i=[typeof globalThis=="object"&&globalThis,i,typeof window=="object"&&window,typeof self=="object"&&self,typeof Pr=="object"&&Pr];for(var l=0;l<i.length;++l){var u=i[l];if(u&&u.Math==Math)return u}throw Error("Cannot find global object")}var r=e(this);function s(i,l){if(l)t:{var u=r;i=i.split(".");for(var f=0;f<i.length-1;f++){var T=i[f];if(!(T in u))break t;u=u[T]}i=i[i.length-1],f=u[i],l=l(f),l!=f&&l!=null&&t(u,i,{configurable:!0,writable:!0,value:l})}}function o(i,l){i instanceof String&&(i+="");var u=0,f=!1,T={next:function(){if(!f&&u<i.length){var A=u++;return{value:l(A,i[A]),done:!1}}return f=!0,{done:!0,value:void 0}}};return T[Symbol.iterator]=function(){return T},T}s("Array.prototype.values",function(i){return i||function(){return o(this,function(l,u){return u})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var a=a||{},c=this||self;function h(i){var l=typeof i;return l=l!="object"?l:i?Array.isArray(i)?"array":l:"null",l=="array"||l=="object"&&typeof i.length=="number"}function d(i){var l=typeof i;return l=="object"&&i!=null||l=="function"}function m(i,l,u){return i.call.apply(i.bind,arguments)}function y(i,l,u){if(!i)throw Error();if(2<arguments.length){var f=Array.prototype.slice.call(arguments,2);return function(){var T=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(T,f),i.apply(l,T)}}return function(){return i.apply(l,arguments)}}function p(i,l,u){return p=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?m:y,p.apply(null,arguments)}function S(i,l){var u=Array.prototype.slice.call(arguments,1);return function(){var f=u.slice();return f.push.apply(f,arguments),i.apply(this,f)}}function C(i,l){function u(){}u.prototype=l.prototype,i.aa=l.prototype,i.prototype=new u,i.prototype.constructor=i,i.Qb=function(f,T,A){for(var V=Array(arguments.length-2),st=2;st<arguments.length;st++)V[st-2]=arguments[st];return l.prototype[T].apply(f,V)}}function N(i){const l=i.length;if(0<l){const u=Array(l);for(let f=0;f<l;f++)u[f]=i[f];return u}return[]}function x(i,l){for(let u=1;u<arguments.length;u++){const f=arguments[u];if(h(f)){const T=i.length||0,A=f.length||0;i.length=T+A;for(let V=0;V<A;V++)i[T+V]=f[V]}else i.push(f)}}class K{constructor(l,u){this.i=l,this.j=u,this.h=0,this.g=null}get(){let l;return 0<this.h?(this.h--,l=this.g,this.g=l.next,l.next=null):l=this.i(),l}}function z(i){return/^[\s\xa0]*$/.test(i)}function B(){var i=c.navigator;return i&&(i=i.userAgent)?i:""}function W(i){return W[" "](i),i}W[" "]=function(){};var Q=B().indexOf("Gecko")!=-1&&!(B().toLowerCase().indexOf("webkit")!=-1&&B().indexOf("Edge")==-1)&&!(B().indexOf("Trident")!=-1||B().indexOf("MSIE")!=-1)&&B().indexOf("Edge")==-1;function ht(i,l,u){for(const f in i)l.call(u,i[f],f,i)}function w(i,l){for(const u in i)l.call(void 0,i[u],u,i)}function g(i){const l={};for(const u in i)l[u]=i[u];return l}const v="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function E(i,l){let u,f;for(let T=1;T<arguments.length;T++){f=arguments[T];for(u in f)i[u]=f[u];for(let A=0;A<v.length;A++)u=v[A],Object.prototype.hasOwnProperty.call(f,u)&&(i[u]=f[u])}}function b(i){var l=1;i=i.split(":");const u=[];for(;0<l&&i.length;)u.push(i.shift()),l--;return i.length&&u.push(i.join(":")),u}function I(i){c.setTimeout(()=>{throw i},0)}function _(){var i=Qe;let l=null;return i.g&&(l=i.g,i.g=i.g.next,i.g||(i.h=null),l.next=null),l}class zt{constructor(){this.h=this.g=null}add(l,u){const f=pe.get();f.set(l,u),this.h?this.h.next=f:this.g=f,this.h=f}}var pe=new K(()=>new cr,i=>i.reset());class cr{constructor(){this.next=this.g=this.h=null}set(l,u){this.h=l,this.g=u,this.next=null}reset(){this.next=this.g=this.h=null}}let ge,ye=!1,Qe=new zt,In=()=>{const i=c.Promise.resolve(void 0);ge=()=>{i.then(ur)}};var ur=()=>{for(var i;i=_();){try{i.h.call(i.g)}catch(u){I(u)}var l=pe;l.j(i),100>l.h&&(l.h++,i.next=l.g,l.g=i)}ye=!1};function Gt(){this.s=this.s,this.C=this.C}Gt.prototype.s=!1,Gt.prototype.ma=function(){this.s||(this.s=!0,this.N())},Gt.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function _t(i,l){this.type=i,this.g=this.target=l,this.defaultPrevented=!1}_t.prototype.h=function(){this.defaultPrevented=!0};var hr=(function(){if(!c.addEventListener||!Object.defineProperty)return!1;var i=!1,l=Object.defineProperty({},"passive",{get:function(){i=!0}});try{const u=()=>{};c.addEventListener("test",u,l),c.removeEventListener("test",u,l)}catch{}return i})();function ve(i,l){if(_t.call(this,i?i.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,i){var u=this.type=i.type,f=i.changedTouches&&i.changedTouches.length?i.changedTouches[0]:null;if(this.target=i.target||i.srcElement,this.g=l,l=i.relatedTarget){if(Q){t:{try{W(l.nodeName);var T=!0;break t}catch{}T=!1}T||(l=null)}}else u=="mouseover"?l=i.fromElement:u=="mouseout"&&(l=i.toElement);this.relatedTarget=l,f?(this.clientX=f.clientX!==void 0?f.clientX:f.pageX,this.clientY=f.clientY!==void 0?f.clientY:f.pageY,this.screenX=f.screenX||0,this.screenY=f.screenY||0):(this.clientX=i.clientX!==void 0?i.clientX:i.pageX,this.clientY=i.clientY!==void 0?i.clientY:i.pageY,this.screenX=i.screenX||0,this.screenY=i.screenY||0),this.button=i.button,this.key=i.key||"",this.ctrlKey=i.ctrlKey,this.altKey=i.altKey,this.shiftKey=i.shiftKey,this.metaKey=i.metaKey,this.pointerId=i.pointerId||0,this.pointerType=typeof i.pointerType=="string"?i.pointerType:D[i.pointerType]||"",this.state=i.state,this.i=i,i.defaultPrevented&&ve.aa.h.call(this)}}C(ve,_t);var D={2:"touch",3:"pen",4:"mouse"};ve.prototype.h=function(){ve.aa.h.call(this);var i=this.i;i.preventDefault?i.preventDefault():i.returnValue=!1};var F="closure_listenable_"+(1e6*Math.random()|0),k=0;function q(i,l,u,f,T){this.listener=i,this.proxy=null,this.src=l,this.type=u,this.capture=!!f,this.ha=T,this.key=++k,this.da=this.fa=!1}function Y(i){i.da=!0,i.listener=null,i.proxy=null,i.src=null,i.ha=null}function Z(i){this.src=i,this.g={},this.h=0}Z.prototype.add=function(i,l,u,f,T){var A=i.toString();i=this.g[A],i||(i=this.g[A]=[],this.h++);var V=Rt(i,l,f,T);return-1<V?(l=i[V],u||(l.fa=!1)):(l=new q(l,this.src,A,!!f,T),l.fa=u,i.push(l)),l};function nt(i,l){var u=l.type;if(u in i.g){var f=i.g[u],T=Array.prototype.indexOf.call(f,l,void 0),A;(A=0<=T)&&Array.prototype.splice.call(f,T,1),A&&(Y(l),i.g[u].length==0&&(delete i.g[u],i.h--))}}function Rt(i,l,u,f){for(var T=0;T<i.length;++T){var A=i[T];if(!A.da&&A.listener==l&&A.capture==!!u&&A.ha==f)return T}return-1}var rt="closure_lm_"+(1e6*Math.random()|0),Yt={};function lt(i,l,u,f,T){if(Array.isArray(l)){for(var A=0;A<l.length;A++)lt(i,l[A],u,f,T);return null}return u=Kt(u),i&&i[F]?i.K(l,u,d(f)?!!f.capture:!1,T):dt(i,l,u,!1,f,T)}function dt(i,l,u,f,T,A){if(!l)throw Error("Invalid event type");var V=d(T)?!!T.capture:!!T,st=jt(i);if(st||(i[rt]=st=new Z(i)),u=st.add(l,u,f,V,A),u.proxy)return u;if(f=Jt(),u.proxy=f,f.src=i,f.listener=u,i.addEventListener)hr||(T=V),T===void 0&&(T=!1),i.addEventListener(l.toString(),f,T);else if(i.attachEvent)i.attachEvent(_e(l.toString()),f);else if(i.addListener&&i.removeListener)i.addListener(f);else throw Error("addEventListener and attachEvent are unavailable.");return u}function Jt(){function i(u){return l.call(i.src,i.listener,u)}const l=Ht;return i}function Xt(i,l,u,f,T){if(Array.isArray(l))for(var A=0;A<l.length;A++)Xt(i,l[A],u,f,T);else f=d(f)?!!f.capture:!!f,u=Kt(u),i&&i[F]?(i=i.i,l=String(l).toString(),l in i.g&&(A=i.g[l],u=Rt(A,u,f,T),-1<u&&(Y(A[u]),Array.prototype.splice.call(A,u,1),A.length==0&&(delete i.g[l],i.h--)))):i&&(i=jt(i))&&(l=i.g[l.toString()],i=-1,l&&(i=Rt(l,u,f,T)),(u=-1<i?l[i]:null)&&ae(u))}function ae(i){if(typeof i!="number"&&i&&!i.da){var l=i.src;if(l&&l[F])nt(l.i,i);else{var u=i.type,f=i.proxy;l.removeEventListener?l.removeEventListener(u,f,i.capture):l.detachEvent?l.detachEvent(_e(u),f):l.addListener&&l.removeListener&&l.removeListener(f),(u=jt(l))?(nt(u,i),u.h==0&&(u.src=null,l[rt]=null)):Y(i)}}}function _e(i){return i in Yt?Yt[i]:Yt[i]="on"+i}function Ht(i,l){if(i.da)i=!0;else{l=new ve(l,this);var u=i.listener,f=i.ha||i.src;i.fa&&ae(i),i=u.call(f,l)}return i}function jt(i){return i=i[rt],i instanceof Z?i:null}var Zt="__closure_events_fn_"+(1e9*Math.random()>>>0);function Kt(i){return typeof i=="function"?i:(i[Zt]||(i[Zt]=function(l){return i.handleEvent(l)}),i[Zt])}function ct(){Gt.call(this),this.i=new Z(this),this.M=this,this.F=null}C(ct,Gt),ct.prototype[F]=!0,ct.prototype.removeEventListener=function(i,l,u,f){Xt(this,i,l,u,f)};function wt(i,l){var u,f=i.F;if(f)for(u=[];f;f=f.F)u.push(f);if(i=i.M,f=l.type||l,typeof l=="string")l=new _t(l,i);else if(l instanceof _t)l.target=l.target||i;else{var T=l;l=new _t(f,i),E(l,T)}if(T=!0,u)for(var A=u.length-1;0<=A;A--){var V=l.g=u[A];T=dr(V,f,!0,l)&&T}if(V=l.g=i,T=dr(V,f,!0,l)&&T,T=dr(V,f,!1,l)&&T,u)for(A=0;A<u.length;A++)V=l.g=u[A],T=dr(V,f,!1,l)&&T}ct.prototype.N=function(){if(ct.aa.N.call(this),this.i){var i=this.i,l;for(l in i.g){for(var u=i.g[l],f=0;f<u.length;f++)Y(u[f]);delete i.g[l],i.h--}}this.F=null},ct.prototype.K=function(i,l,u,f){return this.i.add(String(i),l,!1,u,f)},ct.prototype.L=function(i,l,u,f){return this.i.add(String(i),l,!0,u,f)};function dr(i,l,u,f){if(l=i.i.g[String(l)],!l)return!0;l=l.concat();for(var T=!0,A=0;A<l.length;++A){var V=l[A];if(V&&!V.da&&V.capture==u){var st=V.listener,Tt=V.ha||V.src;V.fa&&nt(i.i,V),T=st.call(Tt,f)!==!1&&T}}return T&&!f.defaultPrevented}function Zi(i,l,u){if(typeof i=="function")u&&(i=p(i,u));else if(i&&typeof i.handleEvent=="function")i=p(i.handleEvent,i);else throw Error("Invalid listener argument");return 2147483647<Number(l)?-1:c.setTimeout(i,l||0)}function to(i){i.g=Zi(()=>{i.g=null,i.i&&(i.i=!1,to(i))},i.l);const l=i.h;i.h=null,i.m.apply(null,l)}class lu extends Gt{constructor(l,u){super(),this.m=l,this.l=u,this.h=null,this.i=!1,this.g=null}j(l){this.h=arguments,this.g?this.i=!0:to(this)}N(){super.N(),this.g&&(c.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function An(i){Gt.call(this),this.h=i,this.g={}}C(An,Gt);var eo=[];function no(i){ht(i.g,function(l,u){this.g.hasOwnProperty(u)&&ae(l)},i),i.g={}}An.prototype.N=function(){An.aa.N.call(this),no(this)},An.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Ts=c.JSON.stringify,cu=c.JSON.parse,uu=class{stringify(i){return c.JSON.stringify(i,void 0)}parse(i){return c.JSON.parse(i,void 0)}};function Is(){}Is.prototype.h=null;function ro(i){return i.h||(i.h=i.i())}function so(){}var Sn={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function As(){_t.call(this,"d")}C(As,_t);function Ss(){_t.call(this,"c")}C(Ss,_t);var Fe={},io=null;function fr(){return io=io||new ct}Fe.La="serverreachability";function oo(i){_t.call(this,Fe.La,i)}C(oo,_t);function Rn(i){const l=fr();wt(l,new oo(l))}Fe.STAT_EVENT="statevent";function ao(i,l){_t.call(this,Fe.STAT_EVENT,i),this.stat=l}C(ao,_t);function Nt(i){const l=fr();wt(l,new ao(l,i))}Fe.Ma="timingevent";function lo(i,l){_t.call(this,Fe.Ma,i),this.size=l}C(lo,_t);function Pn(i,l){if(typeof i!="function")throw Error("Fn must not be null and must be a function");return c.setTimeout(function(){i()},l)}function Cn(){this.g=!0}Cn.prototype.xa=function(){this.g=!1};function hu(i,l,u,f,T,A){i.info(function(){if(i.g)if(A)for(var V="",st=A.split("&"),Tt=0;Tt<st.length;Tt++){var tt=st[Tt].split("=");if(1<tt.length){var Pt=tt[0];tt=tt[1];var Ct=Pt.split("_");V=2<=Ct.length&&Ct[1]=="type"?V+(Pt+"="+tt+"&"):V+(Pt+"=redacted&")}}else V=null;else V=A;return"XMLHTTP REQ ("+f+") [attempt "+T+"]: "+l+`
`+u+`
`+V})}function du(i,l,u,f,T,A,V){i.info(function(){return"XMLHTTP RESP ("+f+") [ attempt "+T+"]: "+l+`
`+u+`
`+A+" "+V})}function Ye(i,l,u,f){i.info(function(){return"XMLHTTP TEXT ("+l+"): "+mu(i,u)+(f?" "+f:"")})}function fu(i,l){i.info(function(){return"TIMEOUT: "+l})}Cn.prototype.info=function(){};function mu(i,l){if(!i.g)return l;if(!l)return null;try{var u=JSON.parse(l);if(u){for(i=0;i<u.length;i++)if(Array.isArray(u[i])){var f=u[i];if(!(2>f.length)){var T=f[1];if(Array.isArray(T)&&!(1>T.length)){var A=T[0];if(A!="noop"&&A!="stop"&&A!="close")for(var V=1;V<T.length;V++)T[V]=""}}}}return Ts(u)}catch{return l}}var mr={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},co={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},Rs;function pr(){}C(pr,Is),pr.prototype.g=function(){return new XMLHttpRequest},pr.prototype.i=function(){return{}},Rs=new pr;function Ee(i,l,u,f){this.j=i,this.i=l,this.l=u,this.R=f||1,this.U=new An(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new uo}function uo(){this.i=null,this.g="",this.h=!1}var ho={},Ps={};function Cs(i,l,u){i.L=1,i.v=_r(le(l)),i.m=u,i.P=!0,fo(i,null)}function fo(i,l){i.F=Date.now(),gr(i),i.A=le(i.v);var u=i.A,f=i.R;Array.isArray(f)||(f=[String(f)]),Ro(u.i,"t",f),i.C=0,u=i.j.J,i.h=new uo,i.g=Go(i.j,u?l:null,!i.m),0<i.O&&(i.M=new lu(p(i.Y,i,i.g),i.O)),l=i.U,u=i.g,f=i.ca;var T="readystatechange";Array.isArray(T)||(T&&(eo[0]=T.toString()),T=eo);for(var A=0;A<T.length;A++){var V=lt(u,T[A],f||l.handleEvent,!1,l.h||l);if(!V)break;l.g[V.key]=V}l=i.H?g(i.H):{},i.m?(i.u||(i.u="POST"),l["Content-Type"]="application/x-www-form-urlencoded",i.g.ea(i.A,i.u,i.m,l)):(i.u="GET",i.g.ea(i.A,i.u,null,l)),Rn(),hu(i.i,i.u,i.A,i.l,i.R,i.m)}Ee.prototype.ca=function(i){i=i.target;const l=this.M;l&&ce(i)==3?l.j():this.Y(i)},Ee.prototype.Y=function(i){try{if(i==this.g)t:{const Ct=ce(this.g);var l=this.g.Ba();const Ze=this.g.Z();if(!(3>Ct)&&(Ct!=3||this.g&&(this.h.h||this.g.oa()||No(this.g)))){this.J||Ct!=4||l==7||(l==8||0>=Ze?Rn(3):Rn(2)),xs(this);var u=this.g.Z();this.X=u;e:if(mo(this)){var f=No(this.g);i="";var T=f.length,A=ce(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Be(this),xn(this);var V="";break e}this.h.i=new c.TextDecoder}for(l=0;l<T;l++)this.h.h=!0,i+=this.h.i.decode(f[l],{stream:!(A&&l==T-1)});f.length=0,this.h.g+=i,this.C=0,V=this.h.g}else V=this.g.oa();if(this.o=u==200,du(this.i,this.u,this.A,this.l,this.R,Ct,u),this.o){if(this.T&&!this.K){e:{if(this.g){var st,Tt=this.g;if((st=Tt.g?Tt.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!z(st)){var tt=st;break e}}tt=null}if(u=tt)Ye(this.i,this.l,u,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Vs(this,u);else{this.o=!1,this.s=3,Nt(12),Be(this),xn(this);break t}}if(this.P){u=!0;let Wt;for(;!this.J&&this.C<V.length;)if(Wt=pu(this,V),Wt==Ps){Ct==4&&(this.s=4,Nt(14),u=!1),Ye(this.i,this.l,null,"[Incomplete Response]");break}else if(Wt==ho){this.s=4,Nt(15),Ye(this.i,this.l,V,"[Invalid Chunk]"),u=!1;break}else Ye(this.i,this.l,Wt,null),Vs(this,Wt);if(mo(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Ct!=4||V.length!=0||this.h.h||(this.s=1,Nt(16),u=!1),this.o=this.o&&u,!u)Ye(this.i,this.l,V,"[Invalid Chunked Response]"),Be(this),xn(this);else if(0<V.length&&!this.W){this.W=!0;var Pt=this.j;Pt.g==this&&Pt.ba&&!Pt.M&&(Pt.j.info("Great, no buffering proxy detected. Bytes received: "+V.length),Ms(Pt),Pt.M=!0,Nt(11))}}else Ye(this.i,this.l,V,null),Vs(this,V);Ct==4&&Be(this),this.o&&!this.J&&(Ct==4?zo(this.j,this):(this.o=!1,gr(this)))}else ku(this.g),u==400&&0<V.indexOf("Unknown SID")?(this.s=3,Nt(12)):(this.s=0,Nt(13)),Be(this),xn(this)}}}catch{}finally{}};function mo(i){return i.g?i.u=="GET"&&i.L!=2&&i.j.Ca:!1}function pu(i,l){var u=i.C,f=l.indexOf(`
`,u);return f==-1?Ps:(u=Number(l.substring(u,f)),isNaN(u)?ho:(f+=1,f+u>l.length?Ps:(l=l.slice(f,f+u),i.C=f+u,l)))}Ee.prototype.cancel=function(){this.J=!0,Be(this)};function gr(i){i.S=Date.now()+i.I,po(i,i.I)}function po(i,l){if(i.B!=null)throw Error("WatchDog timer not null");i.B=Pn(p(i.ba,i),l)}function xs(i){i.B&&(c.clearTimeout(i.B),i.B=null)}Ee.prototype.ba=function(){this.B=null;const i=Date.now();0<=i-this.S?(fu(this.i,this.A),this.L!=2&&(Rn(),Nt(17)),Be(this),this.s=2,xn(this)):po(this,this.S-i)};function xn(i){i.j.G==0||i.J||zo(i.j,i)}function Be(i){xs(i);var l=i.M;l&&typeof l.ma=="function"&&l.ma(),i.M=null,no(i.U),i.g&&(l=i.g,i.g=null,l.abort(),l.ma())}function Vs(i,l){try{var u=i.j;if(u.G!=0&&(u.g==i||ks(u.h,i))){if(!i.K&&ks(u.h,i)&&u.G==3){try{var f=u.Da.g.parse(l)}catch{f=null}if(Array.isArray(f)&&f.length==3){var T=f;if(T[0]==0){t:if(!u.u){if(u.g)if(u.g.F+3e3<i.F)Ar(u),Tr(u);else break t;Os(u),Nt(18)}}else u.za=T[1],0<u.za-u.T&&37500>T[2]&&u.F&&u.v==0&&!u.C&&(u.C=Pn(p(u.Za,u),6e3));if(1>=vo(u.h)&&u.ca){try{u.ca()}catch{}u.ca=void 0}}else ze(u,11)}else if((i.K||u.g==i)&&Ar(u),!z(l))for(T=u.Da.g.parse(l),l=0;l<T.length;l++){let tt=T[l];if(u.T=tt[0],tt=tt[1],u.G==2)if(tt[0]=="c"){u.K=tt[1],u.ia=tt[2];const Pt=tt[3];Pt!=null&&(u.la=Pt,u.j.info("VER="+u.la));const Ct=tt[4];Ct!=null&&(u.Aa=Ct,u.j.info("SVER="+u.Aa));const Ze=tt[5];Ze!=null&&typeof Ze=="number"&&0<Ze&&(f=1.5*Ze,u.L=f,u.j.info("backChannelRequestTimeoutMs_="+f)),f=u;const Wt=i.g;if(Wt){const Rr=Wt.g?Wt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Rr){var A=f.h;A.g||Rr.indexOf("spdy")==-1&&Rr.indexOf("quic")==-1&&Rr.indexOf("h2")==-1||(A.j=A.l,A.g=new Set,A.h&&(Ds(A,A.h),A.h=null))}if(f.D){const Fs=Wt.g?Wt.g.getResponseHeader("X-HTTP-Session-Id"):null;Fs&&(f.ya=Fs,ot(f.I,f.D,Fs))}}u.G=3,u.l&&u.l.ua(),u.ba&&(u.R=Date.now()-i.F,u.j.info("Handshake RTT: "+u.R+"ms")),f=u;var V=i;if(f.qa=qo(f,f.J?f.ia:null,f.W),V.K){_o(f.h,V);var st=V,Tt=f.L;Tt&&(st.I=Tt),st.B&&(xs(st),gr(st)),f.g=V}else Bo(f);0<u.i.length&&Ir(u)}else tt[0]!="stop"&&tt[0]!="close"||ze(u,7);else u.G==3&&(tt[0]=="stop"||tt[0]=="close"?tt[0]=="stop"?ze(u,7):Ls(u):tt[0]!="noop"&&u.l&&u.l.ta(tt),u.v=0)}}Rn(4)}catch{}}var gu=class{constructor(i,l){this.g=i,this.map=l}};function go(i){this.l=i||10,c.PerformanceNavigationTiming?(i=c.performance.getEntriesByType("navigation"),i=0<i.length&&(i[0].nextHopProtocol=="hq"||i[0].nextHopProtocol=="h2")):i=!!(c.chrome&&c.chrome.loadTimes&&c.chrome.loadTimes()&&c.chrome.loadTimes().wasFetchedViaSpdy),this.j=i?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function yo(i){return i.h?!0:i.g?i.g.size>=i.j:!1}function vo(i){return i.h?1:i.g?i.g.size:0}function ks(i,l){return i.h?i.h==l:i.g?i.g.has(l):!1}function Ds(i,l){i.g?i.g.add(l):i.h=l}function _o(i,l){i.h&&i.h==l?i.h=null:i.g&&i.g.has(l)&&i.g.delete(l)}go.prototype.cancel=function(){if(this.i=Eo(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const i of this.g.values())i.cancel();this.g.clear()}};function Eo(i){if(i.h!=null)return i.i.concat(i.h.D);if(i.g!=null&&i.g.size!==0){let l=i.i;for(const u of i.g.values())l=l.concat(u.D);return l}return N(i.i)}function yu(i){if(i.V&&typeof i.V=="function")return i.V();if(typeof Map<"u"&&i instanceof Map||typeof Set<"u"&&i instanceof Set)return Array.from(i.values());if(typeof i=="string")return i.split("");if(h(i)){for(var l=[],u=i.length,f=0;f<u;f++)l.push(i[f]);return l}l=[],u=0;for(f in i)l[u++]=i[f];return l}function vu(i){if(i.na&&typeof i.na=="function")return i.na();if(!i.V||typeof i.V!="function"){if(typeof Map<"u"&&i instanceof Map)return Array.from(i.keys());if(!(typeof Set<"u"&&i instanceof Set)){if(h(i)||typeof i=="string"){var l=[];i=i.length;for(var u=0;u<i;u++)l.push(u);return l}l=[],u=0;for(const f in i)l[u++]=f;return l}}}function bo(i,l){if(i.forEach&&typeof i.forEach=="function")i.forEach(l,void 0);else if(h(i)||typeof i=="string")Array.prototype.forEach.call(i,l,void 0);else for(var u=vu(i),f=yu(i),T=f.length,A=0;A<T;A++)l.call(void 0,f[A],u&&u[A],i)}var wo=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function _u(i,l){if(i){i=i.split("&");for(var u=0;u<i.length;u++){var f=i[u].indexOf("="),T=null;if(0<=f){var A=i[u].substring(0,f);T=i[u].substring(f+1)}else A=i[u];l(A,T?decodeURIComponent(T.replace(/\+/g," ")):"")}}}function Ue(i){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,i instanceof Ue){this.h=i.h,yr(this,i.j),this.o=i.o,this.g=i.g,vr(this,i.s),this.l=i.l;var l=i.i,u=new Dn;u.i=l.i,l.g&&(u.g=new Map(l.g),u.h=l.h),To(this,u),this.m=i.m}else i&&(l=String(i).match(wo))?(this.h=!1,yr(this,l[1]||"",!0),this.o=Vn(l[2]||""),this.g=Vn(l[3]||"",!0),vr(this,l[4]),this.l=Vn(l[5]||"",!0),To(this,l[6]||"",!0),this.m=Vn(l[7]||"")):(this.h=!1,this.i=new Dn(null,this.h))}Ue.prototype.toString=function(){var i=[],l=this.j;l&&i.push(kn(l,Io,!0),":");var u=this.g;return(u||l=="file")&&(i.push("//"),(l=this.o)&&i.push(kn(l,Io,!0),"@"),i.push(encodeURIComponent(String(u)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),u=this.s,u!=null&&i.push(":",String(u))),(u=this.l)&&(this.g&&u.charAt(0)!="/"&&i.push("/"),i.push(kn(u,u.charAt(0)=="/"?wu:bu,!0))),(u=this.i.toString())&&i.push("?",u),(u=this.m)&&i.push("#",kn(u,Iu)),i.join("")};function le(i){return new Ue(i)}function yr(i,l,u){i.j=u?Vn(l,!0):l,i.j&&(i.j=i.j.replace(/:$/,""))}function vr(i,l){if(l){if(l=Number(l),isNaN(l)||0>l)throw Error("Bad port number "+l);i.s=l}else i.s=null}function To(i,l,u){l instanceof Dn?(i.i=l,Au(i.i,i.h)):(u||(l=kn(l,Tu)),i.i=new Dn(l,i.h))}function ot(i,l,u){i.i.set(l,u)}function _r(i){return ot(i,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),i}function Vn(i,l){return i?l?decodeURI(i.replace(/%25/g,"%2525")):decodeURIComponent(i):""}function kn(i,l,u){return typeof i=="string"?(i=encodeURI(i).replace(l,Eu),u&&(i=i.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),i):null}function Eu(i){return i=i.charCodeAt(0),"%"+(i>>4&15).toString(16)+(i&15).toString(16)}var Io=/[#\/\?@]/g,bu=/[#\?:]/g,wu=/[#\?]/g,Tu=/[#\?@]/g,Iu=/#/g;function Dn(i,l){this.h=this.g=null,this.i=i||null,this.j=!!l}function be(i){i.g||(i.g=new Map,i.h=0,i.i&&_u(i.i,function(l,u){i.add(decodeURIComponent(l.replace(/\+/g," ")),u)}))}n=Dn.prototype,n.add=function(i,l){be(this),this.i=null,i=Je(this,i);var u=this.g.get(i);return u||this.g.set(i,u=[]),u.push(l),this.h+=1,this};function Ao(i,l){be(i),l=Je(i,l),i.g.has(l)&&(i.i=null,i.h-=i.g.get(l).length,i.g.delete(l))}function So(i,l){return be(i),l=Je(i,l),i.g.has(l)}n.forEach=function(i,l){be(this),this.g.forEach(function(u,f){u.forEach(function(T){i.call(l,T,f,this)},this)},this)},n.na=function(){be(this);const i=Array.from(this.g.values()),l=Array.from(this.g.keys()),u=[];for(let f=0;f<l.length;f++){const T=i[f];for(let A=0;A<T.length;A++)u.push(l[f])}return u},n.V=function(i){be(this);let l=[];if(typeof i=="string")So(this,i)&&(l=l.concat(this.g.get(Je(this,i))));else{i=Array.from(this.g.values());for(let u=0;u<i.length;u++)l=l.concat(i[u])}return l},n.set=function(i,l){return be(this),this.i=null,i=Je(this,i),So(this,i)&&(this.h-=this.g.get(i).length),this.g.set(i,[l]),this.h+=1,this},n.get=function(i,l){return i?(i=this.V(i),0<i.length?String(i[0]):l):l};function Ro(i,l,u){Ao(i,l),0<u.length&&(i.i=null,i.g.set(Je(i,l),N(u)),i.h+=u.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const i=[],l=Array.from(this.g.keys());for(var u=0;u<l.length;u++){var f=l[u];const A=encodeURIComponent(String(f)),V=this.V(f);for(f=0;f<V.length;f++){var T=A;V[f]!==""&&(T+="="+encodeURIComponent(String(V[f]))),i.push(T)}}return this.i=i.join("&")};function Je(i,l){return l=String(l),i.j&&(l=l.toLowerCase()),l}function Au(i,l){l&&!i.j&&(be(i),i.i=null,i.g.forEach(function(u,f){var T=f.toLowerCase();f!=T&&(Ao(this,f),Ro(this,T,u))},i)),i.j=l}function Su(i,l){const u=new Cn;if(c.Image){const f=new Image;f.onload=S(we,u,"TestLoadImage: loaded",!0,l,f),f.onerror=S(we,u,"TestLoadImage: error",!1,l,f),f.onabort=S(we,u,"TestLoadImage: abort",!1,l,f),f.ontimeout=S(we,u,"TestLoadImage: timeout",!1,l,f),c.setTimeout(function(){f.ontimeout&&f.ontimeout()},1e4),f.src=i}else l(!1)}function Ru(i,l){const u=new Cn,f=new AbortController,T=setTimeout(()=>{f.abort(),we(u,"TestPingServer: timeout",!1,l)},1e4);fetch(i,{signal:f.signal}).then(A=>{clearTimeout(T),A.ok?we(u,"TestPingServer: ok",!0,l):we(u,"TestPingServer: server error",!1,l)}).catch(()=>{clearTimeout(T),we(u,"TestPingServer: error",!1,l)})}function we(i,l,u,f,T){try{T&&(T.onload=null,T.onerror=null,T.onabort=null,T.ontimeout=null),f(u)}catch{}}function Pu(){this.g=new uu}function Cu(i,l,u){const f=u||"";try{bo(i,function(T,A){let V=T;d(T)&&(V=Ts(T)),l.push(f+A+"="+encodeURIComponent(V))})}catch(T){throw l.push(f+"type="+encodeURIComponent("_badmap")),T}}function Er(i){this.l=i.Ub||null,this.j=i.eb||!1}C(Er,Is),Er.prototype.g=function(){return new br(this.l,this.j)},Er.prototype.i=(function(i){return function(){return i}})({});function br(i,l){ct.call(this),this.D=i,this.o=l,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}C(br,ct),n=br.prototype,n.open=function(i,l){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=i,this.A=l,this.readyState=1,Ln(this)},n.send=function(i){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const l={headers:this.u,method:this.B,credentials:this.m,cache:void 0};i&&(l.body=i),(this.D||c).fetch(new Request(this.A,l)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Nn(this)),this.readyState=0},n.Sa=function(i){if(this.g&&(this.l=i,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=i.headers,this.readyState=2,Ln(this)),this.g&&(this.readyState=3,Ln(this),this.g)))if(this.responseType==="arraybuffer")i.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof c.ReadableStream<"u"&&"body"in i){if(this.j=i.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Po(this)}else i.text().then(this.Ra.bind(this),this.ga.bind(this))};function Po(i){i.j.read().then(i.Pa.bind(i)).catch(i.ga.bind(i))}n.Pa=function(i){if(this.g){if(this.o&&i.value)this.response.push(i.value);else if(!this.o){var l=i.value?i.value:new Uint8Array(0);(l=this.v.decode(l,{stream:!i.done}))&&(this.response=this.responseText+=l)}i.done?Nn(this):Ln(this),this.readyState==3&&Po(this)}},n.Ra=function(i){this.g&&(this.response=this.responseText=i,Nn(this))},n.Qa=function(i){this.g&&(this.response=i,Nn(this))},n.ga=function(){this.g&&Nn(this)};function Nn(i){i.readyState=4,i.l=null,i.j=null,i.v=null,Ln(i)}n.setRequestHeader=function(i,l){this.u.append(i,l)},n.getResponseHeader=function(i){return this.h&&this.h.get(i.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const i=[],l=this.h.entries();for(var u=l.next();!u.done;)u=u.value,i.push(u[0]+": "+u[1]),u=l.next();return i.join(`\r
`)};function Ln(i){i.onreadystatechange&&i.onreadystatechange.call(i)}Object.defineProperty(br.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(i){this.m=i?"include":"same-origin"}});function Co(i){let l="";return ht(i,function(u,f){l+=f,l+=":",l+=u,l+=`\r
`}),l}function Ns(i,l,u){t:{for(f in u){var f=!1;break t}f=!0}f||(u=Co(u),typeof i=="string"?u!=null&&encodeURIComponent(String(u)):ot(i,l,u))}function ft(i){ct.call(this),this.headers=new Map,this.o=i||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}C(ft,ct);var xu=/^https?$/i,Vu=["POST","PUT"];n=ft.prototype,n.Ha=function(i){this.J=i},n.ea=function(i,l,u,f){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+i);l=l?l.toUpperCase():"GET",this.D=i,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Rs.g(),this.v=this.o?ro(this.o):ro(Rs),this.g.onreadystatechange=p(this.Ea,this);try{this.B=!0,this.g.open(l,String(i),!0),this.B=!1}catch(A){xo(this,A);return}if(i=u||"",u=new Map(this.headers),f)if(Object.getPrototypeOf(f)===Object.prototype)for(var T in f)u.set(T,f[T]);else if(typeof f.keys=="function"&&typeof f.get=="function")for(const A of f.keys())u.set(A,f.get(A));else throw Error("Unknown input type for opt_headers: "+String(f));f=Array.from(u.keys()).find(A=>A.toLowerCase()=="content-type"),T=c.FormData&&i instanceof c.FormData,!(0<=Array.prototype.indexOf.call(Vu,l,void 0))||f||T||u.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[A,V]of u)this.g.setRequestHeader(A,V);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Do(this),this.u=!0,this.g.send(i),this.u=!1}catch(A){xo(this,A)}};function xo(i,l){i.h=!1,i.g&&(i.j=!0,i.g.abort(),i.j=!1),i.l=l,i.m=5,Vo(i),wr(i)}function Vo(i){i.A||(i.A=!0,wt(i,"complete"),wt(i,"error"))}n.abort=function(i){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=i||7,wt(this,"complete"),wt(this,"abort"),wr(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),wr(this,!0)),ft.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?ko(this):this.bb())},n.bb=function(){ko(this)};function ko(i){if(i.h&&typeof a<"u"&&(!i.v[1]||ce(i)!=4||i.Z()!=2)){if(i.u&&ce(i)==4)Zi(i.Ea,0,i);else if(wt(i,"readystatechange"),ce(i)==4){i.h=!1;try{const V=i.Z();t:switch(V){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var l=!0;break t;default:l=!1}var u;if(!(u=l)){var f;if(f=V===0){var T=String(i.D).match(wo)[1]||null;!T&&c.self&&c.self.location&&(T=c.self.location.protocol.slice(0,-1)),f=!xu.test(T?T.toLowerCase():"")}u=f}if(u)wt(i,"complete"),wt(i,"success");else{i.m=6;try{var A=2<ce(i)?i.g.statusText:""}catch{A=""}i.l=A+" ["+i.Z()+"]",Vo(i)}}finally{wr(i)}}}}function wr(i,l){if(i.g){Do(i);const u=i.g,f=i.v[0]?()=>{}:null;i.g=null,i.v=null,l||wt(i,"ready");try{u.onreadystatechange=f}catch{}}}function Do(i){i.I&&(c.clearTimeout(i.I),i.I=null)}n.isActive=function(){return!!this.g};function ce(i){return i.g?i.g.readyState:0}n.Z=function(){try{return 2<ce(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(i){if(this.g){var l=this.g.responseText;return i&&l.indexOf(i)==0&&(l=l.substring(i.length)),cu(l)}};function No(i){try{if(!i.g)return null;if("response"in i.g)return i.g.response;switch(i.H){case"":case"text":return i.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in i.g)return i.g.mozResponseArrayBuffer}return null}catch{return null}}function ku(i){const l={};i=(i.g&&2<=ce(i)&&i.g.getAllResponseHeaders()||"").split(`\r
`);for(let f=0;f<i.length;f++){if(z(i[f]))continue;var u=b(i[f]);const T=u[0];if(u=u[1],typeof u!="string")continue;u=u.trim();const A=l[T]||[];l[T]=A,A.push(u)}w(l,function(f){return f.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function On(i,l,u){return u&&u.internalChannelParams&&u.internalChannelParams[i]||l}function Lo(i){this.Aa=0,this.i=[],this.j=new Cn,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=On("failFast",!1,i),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=On("baseRetryDelayMs",5e3,i),this.cb=On("retryDelaySeedMs",1e4,i),this.Wa=On("forwardChannelMaxRetries",2,i),this.wa=On("forwardChannelRequestTimeoutMs",2e4,i),this.pa=i&&i.xmlHttpFactory||void 0,this.Xa=i&&i.Tb||void 0,this.Ca=i&&i.useFetchStreams||!1,this.L=void 0,this.J=i&&i.supportsCrossDomainXhr||!1,this.K="",this.h=new go(i&&i.concurrentRequestLimit),this.Da=new Pu,this.P=i&&i.fastHandshake||!1,this.O=i&&i.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=i&&i.Rb||!1,i&&i.xa&&this.j.xa(),i&&i.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&i&&i.detectBufferingProxy||!1,this.ja=void 0,i&&i.longPollingTimeout&&0<i.longPollingTimeout&&(this.ja=i.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=Lo.prototype,n.la=8,n.G=1,n.connect=function(i,l,u,f){Nt(0),this.W=i,this.H=l||{},u&&f!==void 0&&(this.H.OSID=u,this.H.OAID=f),this.F=this.X,this.I=qo(this,null,this.W),Ir(this)};function Ls(i){if(Oo(i),i.G==3){var l=i.U++,u=le(i.I);if(ot(u,"SID",i.K),ot(u,"RID",l),ot(u,"TYPE","terminate"),Mn(i,u),l=new Ee(i,i.j,l),l.L=2,l.v=_r(le(u)),u=!1,c.navigator&&c.navigator.sendBeacon)try{u=c.navigator.sendBeacon(l.v.toString(),"")}catch{}!u&&c.Image&&(new Image().src=l.v,u=!0),u||(l.g=Go(l.j,null),l.g.ea(l.v)),l.F=Date.now(),gr(l)}$o(i)}function Tr(i){i.g&&(Ms(i),i.g.cancel(),i.g=null)}function Oo(i){Tr(i),i.u&&(c.clearTimeout(i.u),i.u=null),Ar(i),i.h.cancel(),i.s&&(typeof i.s=="number"&&c.clearTimeout(i.s),i.s=null)}function Ir(i){if(!yo(i.h)&&!i.s){i.s=!0;var l=i.Ga;ge||In(),ye||(ge(),ye=!0),Qe.add(l,i),i.B=0}}function Du(i,l){return vo(i.h)>=i.h.j-(i.s?1:0)?!1:i.s?(i.i=l.D.concat(i.i),!0):i.G==1||i.G==2||i.B>=(i.Va?0:i.Wa)?!1:(i.s=Pn(p(i.Ga,i,l),jo(i,i.B)),i.B++,!0)}n.Ga=function(i){if(this.s)if(this.s=null,this.G==1){if(!i){this.U=Math.floor(1e5*Math.random()),i=this.U++;const T=new Ee(this,this.j,i);let A=this.o;if(this.S&&(A?(A=g(A),E(A,this.S)):A=this.S),this.m!==null||this.O||(T.H=A,A=null),this.P)t:{for(var l=0,u=0;u<this.i.length;u++){e:{var f=this.i[u];if("__data__"in f.map&&(f=f.map.__data__,typeof f=="string")){f=f.length;break e}f=void 0}if(f===void 0)break;if(l+=f,4096<l){l=u;break t}if(l===4096||u===this.i.length-1){l=u+1;break t}}l=1e3}else l=1e3;l=Fo(this,T,l),u=le(this.I),ot(u,"RID",i),ot(u,"CVER",22),this.D&&ot(u,"X-HTTP-Session-Id",this.D),Mn(this,u),A&&(this.O?l="headers="+encodeURIComponent(String(Co(A)))+"&"+l:this.m&&Ns(u,this.m,A)),Ds(this.h,T),this.Ua&&ot(u,"TYPE","init"),this.P?(ot(u,"$req",l),ot(u,"SID","null"),T.T=!0,Cs(T,u,null)):Cs(T,u,l),this.G=2}}else this.G==3&&(i?Mo(this,i):this.i.length==0||yo(this.h)||Mo(this))};function Mo(i,l){var u;l?u=l.l:u=i.U++;const f=le(i.I);ot(f,"SID",i.K),ot(f,"RID",u),ot(f,"AID",i.T),Mn(i,f),i.m&&i.o&&Ns(f,i.m,i.o),u=new Ee(i,i.j,u,i.B+1),i.m===null&&(u.H=i.o),l&&(i.i=l.D.concat(i.i)),l=Fo(i,u,1e3),u.I=Math.round(.5*i.wa)+Math.round(.5*i.wa*Math.random()),Ds(i.h,u),Cs(u,f,l)}function Mn(i,l){i.H&&ht(i.H,function(u,f){ot(l,f,u)}),i.l&&bo({},function(u,f){ot(l,f,u)})}function Fo(i,l,u){u=Math.min(i.i.length,u);var f=i.l?p(i.l.Na,i.l,i):null;t:{var T=i.i;let A=-1;for(;;){const V=["count="+u];A==-1?0<u?(A=T[0].g,V.push("ofs="+A)):A=0:V.push("ofs="+A);let st=!0;for(let Tt=0;Tt<u;Tt++){let tt=T[Tt].g;const Pt=T[Tt].map;if(tt-=A,0>tt)A=Math.max(0,T[Tt].g-100),st=!1;else try{Cu(Pt,V,"req"+tt+"_")}catch{f&&f(Pt)}}if(st){f=V.join("&");break t}}}return i=i.i.splice(0,u),l.D=i,f}function Bo(i){if(!i.g&&!i.u){i.Y=1;var l=i.Fa;ge||In(),ye||(ge(),ye=!0),Qe.add(l,i),i.v=0}}function Os(i){return i.g||i.u||3<=i.v?!1:(i.Y++,i.u=Pn(p(i.Fa,i),jo(i,i.v)),i.v++,!0)}n.Fa=function(){if(this.u=null,Uo(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var i=2*this.R;this.j.info("BP detection timer enabled: "+i),this.A=Pn(p(this.ab,this),i)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,Nt(10),Tr(this),Uo(this))};function Ms(i){i.A!=null&&(c.clearTimeout(i.A),i.A=null)}function Uo(i){i.g=new Ee(i,i.j,"rpc",i.Y),i.m===null&&(i.g.H=i.o),i.g.O=0;var l=le(i.qa);ot(l,"RID","rpc"),ot(l,"SID",i.K),ot(l,"AID",i.T),ot(l,"CI",i.F?"0":"1"),!i.F&&i.ja&&ot(l,"TO",i.ja),ot(l,"TYPE","xmlhttp"),Mn(i,l),i.m&&i.o&&Ns(l,i.m,i.o),i.L&&(i.g.I=i.L);var u=i.g;i=i.ia,u.L=1,u.v=_r(le(l)),u.m=null,u.P=!0,fo(u,i)}n.Za=function(){this.C!=null&&(this.C=null,Tr(this),Os(this),Nt(19))};function Ar(i){i.C!=null&&(c.clearTimeout(i.C),i.C=null)}function zo(i,l){var u=null;if(i.g==l){Ar(i),Ms(i),i.g=null;var f=2}else if(ks(i.h,l))u=l.D,_o(i.h,l),f=1;else return;if(i.G!=0){if(l.o)if(f==1){u=l.m?l.m.length:0,l=Date.now()-l.F;var T=i.B;f=fr(),wt(f,new lo(f,u)),Ir(i)}else Bo(i);else if(T=l.s,T==3||T==0&&0<l.X||!(f==1&&Du(i,l)||f==2&&Os(i)))switch(u&&0<u.length&&(l=i.h,l.i=l.i.concat(u)),T){case 1:ze(i,5);break;case 4:ze(i,10);break;case 3:ze(i,6);break;default:ze(i,2)}}}function jo(i,l){let u=i.Ta+Math.floor(Math.random()*i.cb);return i.isActive()||(u*=2),u*l}function ze(i,l){if(i.j.info("Error code "+l),l==2){var u=p(i.fb,i),f=i.Xa;const T=!f;f=new Ue(f||"//www.google.com/images/cleardot.gif"),c.location&&c.location.protocol=="http"||yr(f,"https"),_r(f),T?Su(f.toString(),u):Ru(f.toString(),u)}else Nt(2);i.G=0,i.l&&i.l.sa(l),$o(i),Oo(i)}n.fb=function(i){i?(this.j.info("Successfully pinged google.com"),Nt(2)):(this.j.info("Failed to ping google.com"),Nt(1))};function $o(i){if(i.G=0,i.ka=[],i.l){const l=Eo(i.h);(l.length!=0||i.i.length!=0)&&(x(i.ka,l),x(i.ka,i.i),i.h.i.length=0,N(i.i),i.i.length=0),i.l.ra()}}function qo(i,l,u){var f=u instanceof Ue?le(u):new Ue(u);if(f.g!="")l&&(f.g=l+"."+f.g),vr(f,f.s);else{var T=c.location;f=T.protocol,l=l?l+"."+T.hostname:T.hostname,T=+T.port;var A=new Ue(null);f&&yr(A,f),l&&(A.g=l),T&&vr(A,T),u&&(A.l=u),f=A}return u=i.D,l=i.ya,u&&l&&ot(f,u,l),ot(f,"VER",i.la),Mn(i,f),f}function Go(i,l,u){if(l&&!i.J)throw Error("Can't create secondary domain capable XhrIo object.");return l=i.Ca&&!i.pa?new ft(new Er({eb:u})):new ft(i.pa),l.Ha(i.J),l}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function Ho(){}n=Ho.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function Sr(){}Sr.prototype.g=function(i,l){return new Ft(i,l)};function Ft(i,l){ct.call(this),this.g=new Lo(l),this.l=i,this.h=l&&l.messageUrlParams||null,i=l&&l.messageHeaders||null,l&&l.clientProtocolHeaderRequired&&(i?i["X-Client-Protocol"]="webchannel":i={"X-Client-Protocol":"webchannel"}),this.g.o=i,i=l&&l.initMessageHeaders||null,l&&l.messageContentType&&(i?i["X-WebChannel-Content-Type"]=l.messageContentType:i={"X-WebChannel-Content-Type":l.messageContentType}),l&&l.va&&(i?i["X-WebChannel-Client-Profile"]=l.va:i={"X-WebChannel-Client-Profile":l.va}),this.g.S=i,(i=l&&l.Sb)&&!z(i)&&(this.g.m=i),this.v=l&&l.supportsCrossDomainXhr||!1,this.u=l&&l.sendRawJson||!1,(l=l&&l.httpSessionIdParam)&&!z(l)&&(this.g.D=l,i=this.h,i!==null&&l in i&&(i=this.h,l in i&&delete i[l])),this.j=new Xe(this)}C(Ft,ct),Ft.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},Ft.prototype.close=function(){Ls(this.g)},Ft.prototype.o=function(i){var l=this.g;if(typeof i=="string"){var u={};u.__data__=i,i=u}else this.u&&(u={},u.__data__=Ts(i),i=u);l.i.push(new gu(l.Ya++,i)),l.G==3&&Ir(l)},Ft.prototype.N=function(){this.g.l=null,delete this.j,Ls(this.g),delete this.g,Ft.aa.N.call(this)};function Ko(i){As.call(this),i.__headers__&&(this.headers=i.__headers__,this.statusCode=i.__status__,delete i.__headers__,delete i.__status__);var l=i.__sm__;if(l){t:{for(const u in l){i=u;break t}i=void 0}(this.i=i)&&(i=this.i,l=l!==null&&i in l?l[i]:void 0),this.data=l}else this.data=i}C(Ko,As);function Wo(){Ss.call(this),this.status=1}C(Wo,Ss);function Xe(i){this.g=i}C(Xe,Ho),Xe.prototype.ua=function(){wt(this.g,"a")},Xe.prototype.ta=function(i){wt(this.g,new Ko(i))},Xe.prototype.sa=function(i){wt(this.g,new Wo)},Xe.prototype.ra=function(){wt(this.g,"b")},Sr.prototype.createWebChannel=Sr.prototype.g,Ft.prototype.send=Ft.prototype.o,Ft.prototype.open=Ft.prototype.m,Ft.prototype.close=Ft.prototype.close,Pl=function(){return new Sr},Rl=function(){return fr()},Sl=Fe,Xs={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},mr.NO_ERROR=0,mr.TIMEOUT=8,mr.HTTP_ERROR=6,Or=mr,co.COMPLETE="complete",Al=co,so.EventType=Sn,Sn.OPEN="a",Sn.CLOSE="b",Sn.ERROR="c",Sn.MESSAGE="d",ct.prototype.listen=ct.prototype.K,Fn=so,ft.prototype.listenOnce=ft.prototype.L,ft.prototype.getLastError=ft.prototype.Ka,ft.prototype.getLastErrorCode=ft.prototype.Ba,ft.prototype.getStatus=ft.prototype.Z,ft.prototype.getResponseJson=ft.prototype.Oa,ft.prototype.getResponseText=ft.prototype.oa,ft.prototype.send=ft.prototype.ea,ft.prototype.setWithCredentials=ft.prototype.Ha,Il=ft}).apply(typeof Pr<"u"?Pr:typeof self<"u"?self:typeof window<"u"?window:{});const aa="@firebase/firestore",la="4.8.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vt{constructor(t){this.uid=t}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(t){return t.uid===this.uid}}Vt.UNAUTHENTICATED=new Vt(null),Vt.GOOGLE_CREDENTIALS=new Vt("google-credentials-uid"),Vt.FIRST_PARTY=new Vt("first-party-uid"),Vt.MOCK_USER=new Vt("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let yn="11.10.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qe=new yl("@firebase/firestore");function tn(){return qe.logLevel}function L(n,...t){if(qe.logLevel<=X.DEBUG){const e=t.map(_i);qe.debug(`Firestore (${yn}): ${n}`,...e)}}function de(n,...t){if(qe.logLevel<=X.ERROR){const e=t.map(_i);qe.error(`Firestore (${yn}): ${n}`,...e)}}function Ce(n,...t){if(qe.logLevel<=X.WARN){const e=t.map(_i);qe.warn(`Firestore (${yn}): ${n}`,...e)}}function _i(n){if(typeof n=="string")return n;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return(function(e){return JSON.stringify(e)})(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function U(n,t,e){let r="Unexpected state";typeof t=="string"?r=t:e=t,Cl(n,r,e)}function Cl(n,t,e){let r=`FIRESTORE (${yn}) INTERNAL ASSERTION FAILED: ${t} (ID: ${n.toString(16)})`;if(e!==void 0)try{r+=" CONTEXT: "+JSON.stringify(e)}catch{r+=" CONTEXT: "+e}throw de(r),new Error(r)}function et(n,t,e,r){let s="Unexpected state";typeof e=="string"?s=e:r=e,n||Cl(t,s,r)}function $(n,t){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const R={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class O extends gn{constructor(t,e){super(t,e),this.code=t,this.message=e,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Re{constructor(){this.promise=new Promise(((t,e)=>{this.resolve=t,this.reject=e}))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xl{constructor(t,e){this.user=e,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${t}`)}}class _d{getToken(){return Promise.resolve(null)}invalidateToken(){}start(t,e){t.enqueueRetryable((()=>e(Vt.UNAUTHENTICATED)))}shutdown(){}}class Ed{constructor(t){this.token=t,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(t,e){this.changeListener=e,t.enqueueRetryable((()=>e(this.token.user)))}shutdown(){this.changeListener=null}}class bd{constructor(t){this.t=t,this.currentUser=Vt.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(t,e){et(this.o===void 0,42304);let r=this.i;const s=h=>this.i!==r?(r=this.i,e(h)):Promise.resolve();let o=new Re;this.o=()=>{this.i++,this.currentUser=this.u(),o.resolve(),o=new Re,t.enqueueRetryable((()=>s(this.currentUser)))};const a=()=>{const h=o;t.enqueueRetryable((async()=>{await h.promise,await s(this.currentUser)}))},c=h=>{L("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=h,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit((h=>c(h))),setTimeout((()=>{if(!this.auth){const h=this.t.getImmediate({optional:!0});h?c(h):(L("FirebaseAuthCredentialsProvider","Auth not yet detected"),o.resolve(),o=new Re)}}),0),a()}getToken(){const t=this.i,e=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(e).then((r=>this.i!==t?(L("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(et(typeof r.accessToken=="string",31837,{l:r}),new xl(r.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const t=this.auth&&this.auth.getUid();return et(t===null||typeof t=="string",2055,{h:t}),new Vt(t)}}class wd{constructor(t,e,r){this.P=t,this.T=e,this.I=r,this.type="FirstParty",this.user=Vt.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const t=this.R();return t&&this.A.set("Authorization",t),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class Td{constructor(t,e,r){this.P=t,this.T=e,this.I=r}getToken(){return Promise.resolve(new wd(this.P,this.T,this.I))}start(t,e){t.enqueueRetryable((()=>e(Vt.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class ca{constructor(t){this.value=t,this.type="AppCheck",this.headers=new Map,t&&t.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Id{constructor(t,e){this.V=e,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,nd(t)&&t.settings.appCheckToken&&(this.p=t.settings.appCheckToken)}start(t,e){et(this.o===void 0,3512);const r=o=>{o.error!=null&&L("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${o.error.message}`);const a=o.token!==this.m;return this.m=o.token,L("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?e(o.token):Promise.resolve()};this.o=o=>{t.enqueueRetryable((()=>r(o)))};const s=o=>{L("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=o,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit((o=>s(o))),setTimeout((()=>{if(!this.appCheck){const o=this.V.getImmediate({optional:!0});o?s(o):L("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){if(this.p)return Promise.resolve(new ca(this.p));const t=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(t).then((e=>e?(et(typeof e.token=="string",44558,{tokenResult:e}),this.m=e.token,new ca(e.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ad(n){const t=typeof self<"u"&&(self.crypto||self.msCrypto),e=new Uint8Array(n);if(t&&typeof t.getRandomValues=="function")t.getRandomValues(e);else for(let r=0;r<n;r++)e[r]=Math.floor(256*Math.random());return e}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vl(){return new TextEncoder}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ei{static newId(){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",e=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const s=Ad(40);for(let o=0;o<s.length;++o)r.length<20&&s[o]<e&&(r+=t.charAt(s[o]%62))}return r}}function G(n,t){return n<t?-1:n>t?1:0}function Zs(n,t){let e=0;for(;e<n.length&&e<t.length;){const r=n.codePointAt(e),s=t.codePointAt(e);if(r!==s){if(r<128&&s<128)return G(r,s);{const o=Vl(),a=Sd(o.encode(ua(n,e)),o.encode(ua(t,e)));return a!==0?a:G(r,s)}}e+=r>65535?2:1}return G(n.length,t.length)}function ua(n,t){return n.codePointAt(t)>65535?n.substring(t,t+2):n.substring(t,t+1)}function Sd(n,t){for(let e=0;e<n.length&&e<t.length;++e)if(n[e]!==t[e])return G(n[e],t[e]);return G(n.length,t.length)}function hn(n,t,e){return n.length===t.length&&n.every(((r,s)=>e(r,t[s])))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ha="__name__";class te{constructor(t,e,r){e===void 0?e=0:e>t.length&&U(637,{offset:e,range:t.length}),r===void 0?r=t.length-e:r>t.length-e&&U(1746,{length:r,range:t.length-e}),this.segments=t,this.offset=e,this.len=r}get length(){return this.len}isEqual(t){return te.comparator(this,t)===0}child(t){const e=this.segments.slice(this.offset,this.limit());return t instanceof te?t.forEach((r=>{e.push(r)})):e.push(t),this.construct(e)}limit(){return this.offset+this.length}popFirst(t){return t=t===void 0?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return this.length===0}isPrefixOf(t){if(t.length<this.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}forEach(t){for(let e=this.offset,r=this.limit();e<r;e++)t(this.segments[e])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,e){const r=Math.min(t.length,e.length);for(let s=0;s<r;s++){const o=te.compareSegments(t.get(s),e.get(s));if(o!==0)return o}return G(t.length,e.length)}static compareSegments(t,e){const r=te.isNumericId(t),s=te.isNumericId(e);return r&&!s?-1:!r&&s?1:r&&s?te.extractNumericId(t).compare(te.extractNumericId(e)):Zs(t,e)}static isNumericId(t){return t.startsWith("__id")&&t.endsWith("__")}static extractNumericId(t){return Se.fromString(t.substring(4,t.length-2))}}class it extends te{construct(t,e,r){return new it(t,e,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...t){const e=[];for(const r of t){if(r.indexOf("//")>=0)throw new O(R.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);e.push(...r.split("/").filter((s=>s.length>0)))}return new it(e)}static emptyPath(){return new it([])}}const Rd=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class At extends te{construct(t,e,r){return new At(t,e,r)}static isValidIdentifier(t){return Rd.test(t)}canonicalString(){return this.toArray().map((t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),At.isValidIdentifier(t)||(t="`"+t+"`"),t))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===ha}static keyField(){return new At([ha])}static fromServerFormat(t){const e=[];let r="",s=0;const o=()=>{if(r.length===0)throw new O(R.INVALID_ARGUMENT,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);e.push(r),r=""};let a=!1;for(;s<t.length;){const c=t[s];if(c==="\\"){if(s+1===t.length)throw new O(R.INVALID_ARGUMENT,"Path has trailing escape character: "+t);const h=t[s+1];if(h!=="\\"&&h!=="."&&h!=="`")throw new O(R.INVALID_ARGUMENT,"Path has invalid escape sequence: "+t);r+=h,s+=2}else c==="`"?(a=!a,s++):c!=="."||a?(r+=c,s++):(o(),s++)}if(o(),a)throw new O(R.INVALID_ARGUMENT,"Unterminated ` in path: "+t);return new At(e)}static emptyPath(){return new At([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class M{constructor(t){this.path=t}static fromPath(t){return new M(it.fromString(t))}static fromName(t){return new M(it.fromString(t).popFirst(5))}static empty(){return new M(it.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(t){return t!==null&&it.comparator(this.path,t.path)===0}toString(){return this.path.toString()}static comparator(t,e){return it.comparator(t.path,e.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new M(new it(t.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kl(n,t,e){if(!e)throw new O(R.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${t}.`)}function Pd(n,t,e,r){if(t===!0&&r===!0)throw new O(R.INVALID_ARGUMENT,`${n} and ${e} cannot be used together.`)}function da(n){if(!M.isDocumentKey(n))throw new O(R.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function fa(n){if(M.isDocumentKey(n))throw new O(R.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function Dl(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function ss(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const t=(function(r){return r.constructor?r.constructor.name:null})(n);return t?`a custom ${t} object`:"an object"}}return typeof n=="function"?"a function":U(12329,{type:typeof n})}function fe(n,t){if("_delegate"in n&&(n=n._delegate),!(n instanceof t)){if(t.name===n.constructor.name)throw new O(R.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const e=ss(n);throw new O(R.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${e}`)}}return n}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yt(n,t){const e={typeString:n};return t&&(e.value=t),e}function nr(n,t){if(!Dl(n))throw new O(R.INVALID_ARGUMENT,"JSON must be an object");let e;for(const r in t)if(t[r]){const s=t[r].typeString,o="value"in t[r]?{value:t[r].value}:void 0;if(!(r in n)){e=`JSON missing required field: '${r}'`;break}const a=n[r];if(s&&typeof a!==s){e=`JSON field '${r}' must be a ${s}.`;break}if(o!==void 0&&a!==o.value){e=`Expected '${r}' field to equal '${o.value}'`;break}}if(e)throw new O(R.INVALID_ARGUMENT,e);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ma=-62135596800,pa=1e6;class at{static now(){return at.fromMillis(Date.now())}static fromDate(t){return at.fromMillis(t.getTime())}static fromMillis(t){const e=Math.floor(t/1e3),r=Math.floor((t-1e3*e)*pa);return new at(e,r)}constructor(t,e){if(this.seconds=t,this.nanoseconds=e,e<0)throw new O(R.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(e>=1e9)throw new O(R.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(t<ma)throw new O(R.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t);if(t>=253402300800)throw new O(R.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/pa}_compareTo(t){return this.seconds===t.seconds?G(this.nanoseconds,t.nanoseconds):G(this.seconds,t.seconds)}isEqual(t){return t.seconds===this.seconds&&t.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:at._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(t){if(nr(t,at._jsonSchema))return new at(t.seconds,t.nanoseconds)}valueOf(){const t=this.seconds-ma;return String(t).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}at._jsonSchemaVersion="firestore/timestamp/1.0",at._jsonSchema={type:yt("string",at._jsonSchemaVersion),seconds:yt("number"),nanoseconds:yt("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class j{static fromTimestamp(t){return new j(t)}static min(){return new j(new at(0,0))}static max(){return new j(new at(253402300799,999999999))}constructor(t){this.timestamp=t}compareTo(t){return this.timestamp._compareTo(t.timestamp)}isEqual(t){return this.timestamp.isEqual(t.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qn=-1;function Cd(n,t){const e=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=j.fromTimestamp(r===1e9?new at(e+1,0):new at(e,r));return new xe(s,M.empty(),t)}function xd(n){return new xe(n.readTime,n.key,Qn)}class xe{constructor(t,e,r){this.readTime=t,this.documentKey=e,this.largestBatchId=r}static min(){return new xe(j.min(),M.empty(),Qn)}static max(){return new xe(j.max(),M.empty(),Qn)}}function Vd(n,t){let e=n.readTime.compareTo(t.readTime);return e!==0?e:(e=M.comparator(n.documentKey,t.documentKey),e!==0?e:G(n.largestBatchId,t.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kd="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Dd{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(t){this.onCommittedListeners.push(t)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((t=>t()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function vn(n){if(n.code!==R.FAILED_PRECONDITION||n.message!==kd)throw n;L("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class P{constructor(t){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,t((e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)}),(e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)}))}catch(t){return this.next(void 0,t)}next(t,e){return this.callbackAttached&&U(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(e,this.error):this.wrapSuccess(t,this.result):new P(((r,s)=>{this.nextCallback=o=>{this.wrapSuccess(t,o).next(r,s)},this.catchCallback=o=>{this.wrapFailure(e,o).next(r,s)}}))}toPromise(){return new Promise(((t,e)=>{this.next(t,e)}))}wrapUserFunction(t){try{const e=t();return e instanceof P?e:P.resolve(e)}catch(e){return P.reject(e)}}wrapSuccess(t,e){return t?this.wrapUserFunction((()=>t(e))):P.resolve(e)}wrapFailure(t,e){return t?this.wrapUserFunction((()=>t(e))):P.reject(e)}static resolve(t){return new P(((e,r)=>{e(t)}))}static reject(t){return new P(((e,r)=>{r(t)}))}static waitFor(t){return new P(((e,r)=>{let s=0,o=0,a=!1;t.forEach((c=>{++s,c.next((()=>{++o,a&&o===s&&e()}),(h=>r(h)))})),a=!0,o===s&&e()}))}static or(t){let e=P.resolve(!1);for(const r of t)e=e.next((s=>s?P.resolve(s):r()));return e}static forEach(t,e){const r=[];return t.forEach(((s,o)=>{r.push(e.call(this,s,o))})),this.waitFor(r)}static mapArray(t,e){return new P(((r,s)=>{const o=t.length,a=new Array(o);let c=0;for(let h=0;h<o;h++){const d=h;e(t[d]).next((m=>{a[d]=m,++c,c===o&&r(a)}),(m=>s(m)))}}))}static doWhile(t,e){return new P(((r,s)=>{const o=()=>{t()===!0?e().next((()=>{o()}),s):r()};o()}))}}function Nd(n){const t=n.match(/Android ([\d.]+)/i),e=t?t[1].split(".").slice(0,2).join("."):"-1";return Number(e)}function _n(n){return n.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class is{constructor(t,e){this.previousValue=t,e&&(e.sequenceNumberHandler=r=>this._e(r),this.ae=r=>e.writeSequenceNumber(r))}_e(t){return this.previousValue=Math.max(t,this.previousValue),this.previousValue}next(){const t=++this.previousValue;return this.ae&&this.ae(t),t}}is.ue=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bi=-1;function os(n){return n==null}function Hr(n){return n===0&&1/n==-1/0}function Ld(n){return typeof n=="number"&&Number.isInteger(n)&&!Hr(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nl="";function Od(n){let t="";for(let e=0;e<n.length;e++)t.length>0&&(t=ga(t)),t=Md(n.get(e),t);return ga(t)}function Md(n,t){let e=t;const r=n.length;for(let s=0;s<r;s++){const o=n.charAt(s);switch(o){case"\0":e+="";break;case Nl:e+="";break;default:e+=o}}return e}function ga(n){return n+Nl+""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ya(n){let t=0;for(const e in n)Object.prototype.hasOwnProperty.call(n,e)&&t++;return t}function Oe(n,t){for(const e in n)Object.prototype.hasOwnProperty.call(n,e)&&t(e,n[e])}function Ll(n){for(const t in n)if(Object.prototype.hasOwnProperty.call(n,t))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ut{constructor(t,e){this.comparator=t,this.root=e||It.EMPTY}insert(t,e){return new ut(this.comparator,this.root.insert(t,e,this.comparator).copy(null,null,It.BLACK,null,null))}remove(t){return new ut(this.comparator,this.root.remove(t,this.comparator).copy(null,null,It.BLACK,null,null))}get(t){let e=this.root;for(;!e.isEmpty();){const r=this.comparator(t,e.key);if(r===0)return e.value;r<0?e=e.left:r>0&&(e=e.right)}return null}indexOf(t){let e=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(t,r.key);if(s===0)return e+r.left.size;s<0?r=r.left:(e+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(t){return this.root.inorderTraversal(t)}forEach(t){this.inorderTraversal(((e,r)=>(t(e,r),!1)))}toString(){const t=[];return this.inorderTraversal(((e,r)=>(t.push(`${e}:${r}`),!1))),`{${t.join(", ")}}`}reverseTraversal(t){return this.root.reverseTraversal(t)}getIterator(){return new Cr(this.root,null,this.comparator,!1)}getIteratorFrom(t){return new Cr(this.root,t,this.comparator,!1)}getReverseIterator(){return new Cr(this.root,null,this.comparator,!0)}getReverseIteratorFrom(t){return new Cr(this.root,t,this.comparator,!0)}}class Cr{constructor(t,e,r,s){this.isReverse=s,this.nodeStack=[];let o=1;for(;!t.isEmpty();)if(o=e?r(t.key,e):1,e&&s&&(o*=-1),o<0)t=this.isReverse?t.left:t.right;else{if(o===0){this.nodeStack.push(t);break}this.nodeStack.push(t),t=this.isReverse?t.right:t.left}}getNext(){let t=this.nodeStack.pop();const e={key:t.key,value:t.value};if(this.isReverse)for(t=t.left;!t.isEmpty();)this.nodeStack.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack.push(t),t=t.left;return e}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const t=this.nodeStack[this.nodeStack.length-1];return{key:t.key,value:t.value}}}class It{constructor(t,e,r,s,o){this.key=t,this.value=e,this.color=r??It.RED,this.left=s??It.EMPTY,this.right=o??It.EMPTY,this.size=this.left.size+1+this.right.size}copy(t,e,r,s,o){return new It(t??this.key,e??this.value,r??this.color,s??this.left,o??this.right)}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,e,r){let s=this;const o=r(t,s.key);return s=o<0?s.copy(null,null,null,s.left.insert(t,e,r),null):o===0?s.copy(null,e,null,null,null):s.copy(null,null,null,null,s.right.insert(t,e,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return It.EMPTY;let t=this;return t.left.isRed()||t.left.left.isRed()||(t=t.moveRedLeft()),t=t.copy(null,null,null,t.left.removeMin(),null),t.fixUp()}remove(t,e){let r,s=this;if(e(t,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(t,e),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),e(t,s.key)===0){if(s.right.isEmpty())return It.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(t,e))}return s.fixUp()}isRed(){return this.color}fixUp(){let t=this;return t.right.isRed()&&!t.left.isRed()&&(t=t.rotateLeft()),t.left.isRed()&&t.left.left.isRed()&&(t=t.rotateRight()),t.left.isRed()&&t.right.isRed()&&(t=t.colorFlip()),t}moveRedLeft(){let t=this.colorFlip();return t.right.left.isRed()&&(t=t.copy(null,null,null,null,t.right.rotateRight()),t=t.rotateLeft(),t=t.colorFlip()),t}moveRedRight(){let t=this.colorFlip();return t.left.left.isRed()&&(t=t.rotateRight(),t=t.colorFlip()),t}rotateLeft(){const t=this.copy(null,null,It.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight(){const t=this.copy(null,null,It.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip(){const t=this.left.copy(null,null,!this.left.color,null,null),e=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,e)}checkMaxDepth(){const t=this.check();return Math.pow(2,t)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw U(43730,{key:this.key,value:this.value});if(this.right.isRed())throw U(14113,{key:this.key,value:this.value});const t=this.left.check();if(t!==this.right.check())throw U(27949);return t+(this.isRed()?0:1)}}It.EMPTY=null,It.RED=!0,It.BLACK=!1;It.EMPTY=new class{constructor(){this.size=0}get key(){throw U(57766)}get value(){throw U(16141)}get color(){throw U(16727)}get left(){throw U(29726)}get right(){throw U(36894)}copy(t,e,r,s,o){return this}insert(t,e,r){return new It(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Et{constructor(t){this.comparator=t,this.data=new ut(this.comparator)}has(t){return this.data.get(t)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(t){return this.data.indexOf(t)}forEach(t){this.data.inorderTraversal(((e,r)=>(t(e),!1)))}forEachInRange(t,e){const r=this.data.getIteratorFrom(t[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,t[1])>=0)return;e(s.key)}}forEachWhile(t,e){let r;for(r=e!==void 0?this.data.getIteratorFrom(e):this.data.getIterator();r.hasNext();)if(!t(r.getNext().key))return}firstAfterOrEqual(t){const e=this.data.getIteratorFrom(t);return e.hasNext()?e.getNext().key:null}getIterator(){return new va(this.data.getIterator())}getIteratorFrom(t){return new va(this.data.getIteratorFrom(t))}add(t){return this.copy(this.data.remove(t).insert(t,!0))}delete(t){return this.has(t)?this.copy(this.data.remove(t)):this}isEmpty(){return this.data.isEmpty()}unionWith(t){let e=this;return e.size<t.size&&(e=t,t=this),t.forEach((r=>{e=e.add(r)})),e}isEqual(t){if(!(t instanceof Et)||this.size!==t.size)return!1;const e=this.data.getIterator(),r=t.data.getIterator();for(;e.hasNext();){const s=e.getNext().key,o=r.getNext().key;if(this.comparator(s,o)!==0)return!1}return!0}toArray(){const t=[];return this.forEach((e=>{t.push(e)})),t}toString(){const t=[];return this.forEach((e=>t.push(e))),"SortedSet("+t.toString()+")"}copy(t){const e=new Et(this.comparator);return e.data=t,e}}class va{constructor(t){this.iter=t}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bt{constructor(t){this.fields=t,t.sort(At.comparator)}static empty(){return new Bt([])}unionWith(t){let e=new Et(At.comparator);for(const r of this.fields)e=e.add(r);for(const r of t)e=e.add(r);return new Bt(e.toArray())}covers(t){for(const e of this.fields)if(e.isPrefixOf(t))return!0;return!1}isEqual(t){return hn(this.fields,t.fields,((e,r)=>e.isEqual(r)))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ol extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class St{constructor(t){this.binaryString=t}static fromBase64String(t){const e=(function(s){try{return atob(s)}catch(o){throw typeof DOMException<"u"&&o instanceof DOMException?new Ol("Invalid base64 string: "+o):o}})(t);return new St(e)}static fromUint8Array(t){const e=(function(s){let o="";for(let a=0;a<s.length;++a)o+=String.fromCharCode(s[a]);return o})(t);return new St(e)}[Symbol.iterator](){let t=0;return{next:()=>t<this.binaryString.length?{value:this.binaryString.charCodeAt(t++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(e){return btoa(e)})(this.binaryString)}toUint8Array(){return(function(e){const r=new Uint8Array(e.length);for(let s=0;s<e.length;s++)r[s]=e.charCodeAt(s);return r})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(t){return G(this.binaryString,t.binaryString)}isEqual(t){return this.binaryString===t.binaryString}}St.EMPTY_BYTE_STRING=new St("");const Fd=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Ve(n){if(et(!!n,39018),typeof n=="string"){let t=0;const e=Fd.exec(n);if(et(!!e,46558,{timestamp:n}),e[1]){let s=e[1];s=(s+"000000000").substr(0,9),t=Number(s)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:t}}return{seconds:mt(n.seconds),nanos:mt(n.nanos)}}function mt(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function ke(n){return typeof n=="string"?St.fromBase64String(n):St.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ml="server_timestamp",Fl="__type__",Bl="__previous_value__",Ul="__local_write_time__";function wi(n){var t,e;return((e=(((t=n==null?void 0:n.mapValue)===null||t===void 0?void 0:t.fields)||{})[Fl])===null||e===void 0?void 0:e.stringValue)===Ml}function as(n){const t=n.mapValue.fields[Bl];return wi(t)?as(t):t}function Yn(n){const t=Ve(n.mapValue.fields[Ul].timestampValue);return new at(t.seconds,t.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bd{constructor(t,e,r,s,o,a,c,h,d,m){this.databaseId=t,this.appId=e,this.persistenceKey=r,this.host=s,this.ssl=o,this.forceLongPolling=a,this.autoDetectLongPolling=c,this.longPollingOptions=h,this.useFetchStreams=d,this.isUsingEmulator=m}}const Kr="(default)";class Jn{constructor(t,e){this.projectId=t,this.database=e||Kr}static empty(){return new Jn("","")}get isDefaultDatabase(){return this.database===Kr}isEqual(t){return t instanceof Jn&&t.projectId===this.projectId&&t.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zl="__type__",Ud="__max__",xr={mapValue:{}},jl="__vector__",Wr="value";function De(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?wi(n)?4:jd(n)?9007199254740991:zd(n)?10:11:U(28295,{value:n})}function oe(n,t){if(n===t)return!0;const e=De(n);if(e!==De(t))return!1;switch(e){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===t.booleanValue;case 4:return Yn(n).isEqual(Yn(t));case 3:return(function(s,o){if(typeof s.timestampValue=="string"&&typeof o.timestampValue=="string"&&s.timestampValue.length===o.timestampValue.length)return s.timestampValue===o.timestampValue;const a=Ve(s.timestampValue),c=Ve(o.timestampValue);return a.seconds===c.seconds&&a.nanos===c.nanos})(n,t);case 5:return n.stringValue===t.stringValue;case 6:return(function(s,o){return ke(s.bytesValue).isEqual(ke(o.bytesValue))})(n,t);case 7:return n.referenceValue===t.referenceValue;case 8:return(function(s,o){return mt(s.geoPointValue.latitude)===mt(o.geoPointValue.latitude)&&mt(s.geoPointValue.longitude)===mt(o.geoPointValue.longitude)})(n,t);case 2:return(function(s,o){if("integerValue"in s&&"integerValue"in o)return mt(s.integerValue)===mt(o.integerValue);if("doubleValue"in s&&"doubleValue"in o){const a=mt(s.doubleValue),c=mt(o.doubleValue);return a===c?Hr(a)===Hr(c):isNaN(a)&&isNaN(c)}return!1})(n,t);case 9:return hn(n.arrayValue.values||[],t.arrayValue.values||[],oe);case 10:case 11:return(function(s,o){const a=s.mapValue.fields||{},c=o.mapValue.fields||{};if(ya(a)!==ya(c))return!1;for(const h in a)if(a.hasOwnProperty(h)&&(c[h]===void 0||!oe(a[h],c[h])))return!1;return!0})(n,t);default:return U(52216,{left:n})}}function Xn(n,t){return(n.values||[]).find((e=>oe(e,t)))!==void 0}function dn(n,t){if(n===t)return 0;const e=De(n),r=De(t);if(e!==r)return G(e,r);switch(e){case 0:case 9007199254740991:return 0;case 1:return G(n.booleanValue,t.booleanValue);case 2:return(function(o,a){const c=mt(o.integerValue||o.doubleValue),h=mt(a.integerValue||a.doubleValue);return c<h?-1:c>h?1:c===h?0:isNaN(c)?isNaN(h)?0:-1:1})(n,t);case 3:return _a(n.timestampValue,t.timestampValue);case 4:return _a(Yn(n),Yn(t));case 5:return Zs(n.stringValue,t.stringValue);case 6:return(function(o,a){const c=ke(o),h=ke(a);return c.compareTo(h)})(n.bytesValue,t.bytesValue);case 7:return(function(o,a){const c=o.split("/"),h=a.split("/");for(let d=0;d<c.length&&d<h.length;d++){const m=G(c[d],h[d]);if(m!==0)return m}return G(c.length,h.length)})(n.referenceValue,t.referenceValue);case 8:return(function(o,a){const c=G(mt(o.latitude),mt(a.latitude));return c!==0?c:G(mt(o.longitude),mt(a.longitude))})(n.geoPointValue,t.geoPointValue);case 9:return Ea(n.arrayValue,t.arrayValue);case 10:return(function(o,a){var c,h,d,m;const y=o.fields||{},p=a.fields||{},S=(c=y[Wr])===null||c===void 0?void 0:c.arrayValue,C=(h=p[Wr])===null||h===void 0?void 0:h.arrayValue,N=G(((d=S==null?void 0:S.values)===null||d===void 0?void 0:d.length)||0,((m=C==null?void 0:C.values)===null||m===void 0?void 0:m.length)||0);return N!==0?N:Ea(S,C)})(n.mapValue,t.mapValue);case 11:return(function(o,a){if(o===xr.mapValue&&a===xr.mapValue)return 0;if(o===xr.mapValue)return 1;if(a===xr.mapValue)return-1;const c=o.fields||{},h=Object.keys(c),d=a.fields||{},m=Object.keys(d);h.sort(),m.sort();for(let y=0;y<h.length&&y<m.length;++y){const p=Zs(h[y],m[y]);if(p!==0)return p;const S=dn(c[h[y]],d[m[y]]);if(S!==0)return S}return G(h.length,m.length)})(n.mapValue,t.mapValue);default:throw U(23264,{le:e})}}function _a(n,t){if(typeof n=="string"&&typeof t=="string"&&n.length===t.length)return G(n,t);const e=Ve(n),r=Ve(t),s=G(e.seconds,r.seconds);return s!==0?s:G(e.nanos,r.nanos)}function Ea(n,t){const e=n.values||[],r=t.values||[];for(let s=0;s<e.length&&s<r.length;++s){const o=dn(e[s],r[s]);if(o)return o}return G(e.length,r.length)}function fn(n){return ti(n)}function ti(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?(function(e){const r=Ve(e);return`time(${r.seconds},${r.nanos})`})(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?(function(e){return ke(e).toBase64()})(n.bytesValue):"referenceValue"in n?(function(e){return M.fromName(e).toString()})(n.referenceValue):"geoPointValue"in n?(function(e){return`geo(${e.latitude},${e.longitude})`})(n.geoPointValue):"arrayValue"in n?(function(e){let r="[",s=!0;for(const o of e.values||[])s?s=!1:r+=",",r+=ti(o);return r+"]"})(n.arrayValue):"mapValue"in n?(function(e){const r=Object.keys(e.fields||{}).sort();let s="{",o=!0;for(const a of r)o?o=!1:s+=",",s+=`${a}:${ti(e.fields[a])}`;return s+"}"})(n.mapValue):U(61005,{value:n})}function Mr(n){switch(De(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const t=as(n);return t?16+Mr(t):16;case 5:return 2*n.stringValue.length;case 6:return ke(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return(function(r){return(r.values||[]).reduce(((s,o)=>s+Mr(o)),0)})(n.arrayValue);case 10:case 11:return(function(r){let s=0;return Oe(r.fields,((o,a)=>{s+=o.length+Mr(a)})),s})(n.mapValue);default:throw U(13486,{value:n})}}function ba(n,t){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${t.path.canonicalString()}`}}function ei(n){return!!n&&"integerValue"in n}function Ti(n){return!!n&&"arrayValue"in n}function wa(n){return!!n&&"nullValue"in n}function Ta(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function Fr(n){return!!n&&"mapValue"in n}function zd(n){var t,e;return((e=(((t=n==null?void 0:n.mapValue)===null||t===void 0?void 0:t.fields)||{})[zl])===null||e===void 0?void 0:e.stringValue)===jl}function $n(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){const t={mapValue:{fields:{}}};return Oe(n.mapValue.fields,((e,r)=>t.mapValue.fields[e]=$n(r))),t}if(n.arrayValue){const t={arrayValue:{values:[]}};for(let e=0;e<(n.arrayValue.values||[]).length;++e)t.arrayValue.values[e]=$n(n.arrayValue.values[e]);return t}return Object.assign({},n)}function jd(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===Ud}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mt{constructor(t){this.value=t}static empty(){return new Mt({mapValue:{}})}field(t){if(t.isEmpty())return this.value;{let e=this.value;for(let r=0;r<t.length-1;++r)if(e=(e.mapValue.fields||{})[t.get(r)],!Fr(e))return null;return e=(e.mapValue.fields||{})[t.lastSegment()],e||null}}set(t,e){this.getFieldsMap(t.popLast())[t.lastSegment()]=$n(e)}setAll(t){let e=At.emptyPath(),r={},s=[];t.forEach(((a,c)=>{if(!e.isImmediateParentOf(c)){const h=this.getFieldsMap(e);this.applyChanges(h,r,s),r={},s=[],e=c.popLast()}a?r[c.lastSegment()]=$n(a):s.push(c.lastSegment())}));const o=this.getFieldsMap(e);this.applyChanges(o,r,s)}delete(t){const e=this.field(t.popLast());Fr(e)&&e.mapValue.fields&&delete e.mapValue.fields[t.lastSegment()]}isEqual(t){return oe(this.value,t.value)}getFieldsMap(t){let e=this.value;e.mapValue.fields||(e.mapValue={fields:{}});for(let r=0;r<t.length;++r){let s=e.mapValue.fields[t.get(r)];Fr(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},e.mapValue.fields[t.get(r)]=s),e=s}return e.mapValue.fields}applyChanges(t,e,r){Oe(e,((s,o)=>t[s]=o));for(const s of r)delete t[s]}clone(){return new Mt($n(this.value))}}function $l(n){const t=[];return Oe(n.fields,((e,r)=>{const s=new At([e]);if(Fr(r)){const o=$l(r.mapValue).fields;if(o.length===0)t.push(s);else for(const a of o)t.push(s.child(a))}else t.push(s)})),new Bt(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kt{constructor(t,e,r,s,o,a,c){this.key=t,this.documentType=e,this.version=r,this.readTime=s,this.createTime=o,this.data=a,this.documentState=c}static newInvalidDocument(t){return new kt(t,0,j.min(),j.min(),j.min(),Mt.empty(),0)}static newFoundDocument(t,e,r,s){return new kt(t,1,e,j.min(),r,s,0)}static newNoDocument(t,e){return new kt(t,2,e,j.min(),j.min(),Mt.empty(),0)}static newUnknownDocument(t,e){return new kt(t,3,e,j.min(),j.min(),Mt.empty(),2)}convertToFoundDocument(t,e){return!this.createTime.isEqual(j.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=t),this.version=t,this.documentType=1,this.data=e,this.documentState=0,this}convertToNoDocument(t){return this.version=t,this.documentType=2,this.data=Mt.empty(),this.documentState=0,this}convertToUnknownDocument(t){return this.version=t,this.documentType=3,this.data=Mt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=j.min(),this}setReadTime(t){return this.readTime=t,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(t){return t instanceof kt&&this.key.isEqual(t.key)&&this.version.isEqual(t.version)&&this.documentType===t.documentType&&this.documentState===t.documentState&&this.data.isEqual(t.data)}mutableCopy(){return new kt(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qr{constructor(t,e){this.position=t,this.inclusive=e}}function Ia(n,t,e){let r=0;for(let s=0;s<n.position.length;s++){const o=t[s],a=n.position[s];if(o.field.isKeyField()?r=M.comparator(M.fromName(a.referenceValue),e.key):r=dn(a,e.data.field(o.field)),o.dir==="desc"&&(r*=-1),r!==0)break}return r}function Aa(n,t){if(n===null)return t===null;if(t===null||n.inclusive!==t.inclusive||n.position.length!==t.position.length)return!1;for(let e=0;e<n.position.length;e++)if(!oe(n.position[e],t.position[e]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yr{constructor(t,e="asc"){this.field=t,this.dir=e}}function $d(n,t){return n.dir===t.dir&&n.field.isEqual(t.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ql{}class gt extends ql{constructor(t,e,r){super(),this.field=t,this.op=e,this.value=r}static create(t,e,r){return t.isKeyField()?e==="in"||e==="not-in"?this.createKeyFieldInFilter(t,e,r):new Gd(t,e,r):e==="array-contains"?new Wd(t,r):e==="in"?new Qd(t,r):e==="not-in"?new Yd(t,r):e==="array-contains-any"?new Jd(t,r):new gt(t,e,r)}static createKeyFieldInFilter(t,e,r){return e==="in"?new Hd(t,r):new Kd(t,r)}matches(t){const e=t.data.field(this.field);return this.op==="!="?e!==null&&e.nullValue===void 0&&this.matchesComparison(dn(e,this.value)):e!==null&&De(this.value)===De(e)&&this.matchesComparison(dn(e,this.value))}matchesComparison(t){switch(this.op){case"<":return t<0;case"<=":return t<=0;case"==":return t===0;case"!=":return t!==0;case">":return t>0;case">=":return t>=0;default:return U(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Qt extends ql{constructor(t,e){super(),this.filters=t,this.op=e,this.he=null}static create(t,e){return new Qt(t,e)}matches(t){return Gl(this)?this.filters.find((e=>!e.matches(t)))===void 0:this.filters.find((e=>e.matches(t)))!==void 0}getFlattenedFilters(){return this.he!==null||(this.he=this.filters.reduce(((t,e)=>t.concat(e.getFlattenedFilters())),[])),this.he}getFilters(){return Object.assign([],this.filters)}}function Gl(n){return n.op==="and"}function Hl(n){return qd(n)&&Gl(n)}function qd(n){for(const t of n.filters)if(t instanceof Qt)return!1;return!0}function ni(n){if(n instanceof gt)return n.field.canonicalString()+n.op.toString()+fn(n.value);if(Hl(n))return n.filters.map((t=>ni(t))).join(",");{const t=n.filters.map((e=>ni(e))).join(",");return`${n.op}(${t})`}}function Kl(n,t){return n instanceof gt?(function(r,s){return s instanceof gt&&r.op===s.op&&r.field.isEqual(s.field)&&oe(r.value,s.value)})(n,t):n instanceof Qt?(function(r,s){return s instanceof Qt&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce(((o,a,c)=>o&&Kl(a,s.filters[c])),!0):!1})(n,t):void U(19439)}function Wl(n){return n instanceof gt?(function(e){return`${e.field.canonicalString()} ${e.op} ${fn(e.value)}`})(n):n instanceof Qt?(function(e){return e.op.toString()+" {"+e.getFilters().map(Wl).join(" ,")+"}"})(n):"Filter"}class Gd extends gt{constructor(t,e,r){super(t,e,r),this.key=M.fromName(r.referenceValue)}matches(t){const e=M.comparator(t.key,this.key);return this.matchesComparison(e)}}class Hd extends gt{constructor(t,e){super(t,"in",e),this.keys=Ql("in",e)}matches(t){return this.keys.some((e=>e.isEqual(t.key)))}}class Kd extends gt{constructor(t,e){super(t,"not-in",e),this.keys=Ql("not-in",e)}matches(t){return!this.keys.some((e=>e.isEqual(t.key)))}}function Ql(n,t){var e;return(((e=t.arrayValue)===null||e===void 0?void 0:e.values)||[]).map((r=>M.fromName(r.referenceValue)))}class Wd extends gt{constructor(t,e){super(t,"array-contains",e)}matches(t){const e=t.data.field(this.field);return Ti(e)&&Xn(e.arrayValue,this.value)}}class Qd extends gt{constructor(t,e){super(t,"in",e)}matches(t){const e=t.data.field(this.field);return e!==null&&Xn(this.value.arrayValue,e)}}class Yd extends gt{constructor(t,e){super(t,"not-in",e)}matches(t){if(Xn(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const e=t.data.field(this.field);return e!==null&&e.nullValue===void 0&&!Xn(this.value.arrayValue,e)}}class Jd extends gt{constructor(t,e){super(t,"array-contains-any",e)}matches(t){const e=t.data.field(this.field);return!(!Ti(e)||!e.arrayValue.values)&&e.arrayValue.values.some((r=>Xn(this.value.arrayValue,r)))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xd{constructor(t,e=null,r=[],s=[],o=null,a=null,c=null){this.path=t,this.collectionGroup=e,this.orderBy=r,this.filters=s,this.limit=o,this.startAt=a,this.endAt=c,this.Pe=null}}function Sa(n,t=null,e=[],r=[],s=null,o=null,a=null){return new Xd(n,t,e,r,s,o,a)}function Ii(n){const t=$(n);if(t.Pe===null){let e=t.path.canonicalString();t.collectionGroup!==null&&(e+="|cg:"+t.collectionGroup),e+="|f:",e+=t.filters.map((r=>ni(r))).join(","),e+="|ob:",e+=t.orderBy.map((r=>(function(o){return o.field.canonicalString()+o.dir})(r))).join(","),os(t.limit)||(e+="|l:",e+=t.limit),t.startAt&&(e+="|lb:",e+=t.startAt.inclusive?"b:":"a:",e+=t.startAt.position.map((r=>fn(r))).join(",")),t.endAt&&(e+="|ub:",e+=t.endAt.inclusive?"a:":"b:",e+=t.endAt.position.map((r=>fn(r))).join(",")),t.Pe=e}return t.Pe}function Ai(n,t){if(n.limit!==t.limit||n.orderBy.length!==t.orderBy.length)return!1;for(let e=0;e<n.orderBy.length;e++)if(!$d(n.orderBy[e],t.orderBy[e]))return!1;if(n.filters.length!==t.filters.length)return!1;for(let e=0;e<n.filters.length;e++)if(!Kl(n.filters[e],t.filters[e]))return!1;return n.collectionGroup===t.collectionGroup&&!!n.path.isEqual(t.path)&&!!Aa(n.startAt,t.startAt)&&Aa(n.endAt,t.endAt)}function ri(n){return M.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rr{constructor(t,e=null,r=[],s=[],o=null,a="F",c=null,h=null){this.path=t,this.collectionGroup=e,this.explicitOrderBy=r,this.filters=s,this.limit=o,this.limitType=a,this.startAt=c,this.endAt=h,this.Te=null,this.Ie=null,this.de=null,this.startAt,this.endAt}}function Zd(n,t,e,r,s,o,a,c){return new rr(n,t,e,r,s,o,a,c)}function Yl(n){return new rr(n)}function Ra(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function Jl(n){return n.collectionGroup!==null}function qn(n){const t=$(n);if(t.Te===null){t.Te=[];const e=new Set;for(const o of t.explicitOrderBy)t.Te.push(o),e.add(o.field.canonicalString());const r=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc";(function(a){let c=new Et(At.comparator);return a.filters.forEach((h=>{h.getFlattenedFilters().forEach((d=>{d.isInequality()&&(c=c.add(d.field))}))})),c})(t).forEach((o=>{e.has(o.canonicalString())||o.isKeyField()||t.Te.push(new Yr(o,r))})),e.has(At.keyField().canonicalString())||t.Te.push(new Yr(At.keyField(),r))}return t.Te}function ne(n){const t=$(n);return t.Ie||(t.Ie=tf(t,qn(n))),t.Ie}function tf(n,t){if(n.limitType==="F")return Sa(n.path,n.collectionGroup,t,n.filters,n.limit,n.startAt,n.endAt);{t=t.map((s=>{const o=s.dir==="desc"?"asc":"desc";return new Yr(s.field,o)}));const e=n.endAt?new Qr(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new Qr(n.startAt.position,n.startAt.inclusive):null;return Sa(n.path,n.collectionGroup,t,n.filters,n.limit,e,r)}}function si(n,t){const e=n.filters.concat([t]);return new rr(n.path,n.collectionGroup,n.explicitOrderBy.slice(),e,n.limit,n.limitType,n.startAt,n.endAt)}function ii(n,t,e){return new rr(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),t,e,n.startAt,n.endAt)}function ls(n,t){return Ai(ne(n),ne(t))&&n.limitType===t.limitType}function Xl(n){return`${Ii(ne(n))}|lt:${n.limitType}`}function en(n){return`Query(target=${(function(e){let r=e.path.canonicalString();return e.collectionGroup!==null&&(r+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(r+=`, filters: [${e.filters.map((s=>Wl(s))).join(", ")}]`),os(e.limit)||(r+=", limit: "+e.limit),e.orderBy.length>0&&(r+=`, orderBy: [${e.orderBy.map((s=>(function(a){return`${a.field.canonicalString()} (${a.dir})`})(s))).join(", ")}]`),e.startAt&&(r+=", startAt: ",r+=e.startAt.inclusive?"b:":"a:",r+=e.startAt.position.map((s=>fn(s))).join(",")),e.endAt&&(r+=", endAt: ",r+=e.endAt.inclusive?"a:":"b:",r+=e.endAt.position.map((s=>fn(s))).join(",")),`Target(${r})`})(ne(n))}; limitType=${n.limitType})`}function cs(n,t){return t.isFoundDocument()&&(function(r,s){const o=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(o):M.isDocumentKey(r.path)?r.path.isEqual(o):r.path.isImmediateParentOf(o)})(n,t)&&(function(r,s){for(const o of qn(r))if(!o.field.isKeyField()&&s.data.field(o.field)===null)return!1;return!0})(n,t)&&(function(r,s){for(const o of r.filters)if(!o.matches(s))return!1;return!0})(n,t)&&(function(r,s){return!(r.startAt&&!(function(a,c,h){const d=Ia(a,c,h);return a.inclusive?d<=0:d<0})(r.startAt,qn(r),s)||r.endAt&&!(function(a,c,h){const d=Ia(a,c,h);return a.inclusive?d>=0:d>0})(r.endAt,qn(r),s))})(n,t)}function ef(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function Zl(n){return(t,e)=>{let r=!1;for(const s of qn(n)){const o=nf(s,t,e);if(o!==0)return o;r=r||s.field.isKeyField()}return 0}}function nf(n,t,e){const r=n.field.isKeyField()?M.comparator(t.key,e.key):(function(o,a,c){const h=a.data.field(o),d=c.data.field(o);return h!==null&&d!==null?dn(h,d):U(42886)})(n.field,t,e);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return U(19790,{direction:n.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ke{constructor(t,e){this.mapKeyFn=t,this.equalsFn=e,this.inner={},this.innerSize=0}get(t){const e=this.mapKeyFn(t),r=this.inner[e];if(r!==void 0){for(const[s,o]of r)if(this.equalsFn(s,t))return o}}has(t){return this.get(t)!==void 0}set(t,e){const r=this.mapKeyFn(t),s=this.inner[r];if(s===void 0)return this.inner[r]=[[t,e]],void this.innerSize++;for(let o=0;o<s.length;o++)if(this.equalsFn(s[o][0],t))return void(s[o]=[t,e]);s.push([t,e]),this.innerSize++}delete(t){const e=this.mapKeyFn(t),r=this.inner[e];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],t))return r.length===1?delete this.inner[e]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(t){Oe(this.inner,((e,r)=>{for(const[s,o]of r)t(s,o)}))}isEmpty(){return Ll(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rf=new ut(M.comparator);function me(){return rf}const tc=new ut(M.comparator);function Bn(...n){let t=tc;for(const e of n)t=t.insert(e.key,e);return t}function ec(n){let t=tc;return n.forEach(((e,r)=>t=t.insert(e,r.overlayedDocument))),t}function $e(){return Gn()}function nc(){return Gn()}function Gn(){return new Ke((n=>n.toString()),((n,t)=>n.isEqual(t)))}const sf=new ut(M.comparator),of=new Et(M.comparator);function H(...n){let t=of;for(const e of n)t=t.add(e);return t}const af=new Et(G);function lf(){return af}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Si(n,t){if(n.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Hr(t)?"-0":t}}function rc(n){return{integerValue:""+n}}function cf(n,t){return Ld(t)?rc(t):Si(n,t)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class us{constructor(){this._=void 0}}function uf(n,t,e){return n instanceof Zn?(function(s,o){const a={fields:{[Fl]:{stringValue:Ml},[Ul]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return o&&wi(o)&&(o=as(o)),o&&(a.fields[Bl]=o),{mapValue:a}})(e,t):n instanceof tr?ic(n,t):n instanceof er?oc(n,t):(function(s,o){const a=sc(s,o),c=Pa(a)+Pa(s.Ee);return ei(a)&&ei(s.Ee)?rc(c):Si(s.serializer,c)})(n,t)}function hf(n,t,e){return n instanceof tr?ic(n,t):n instanceof er?oc(n,t):e}function sc(n,t){return n instanceof Jr?(function(r){return ei(r)||(function(o){return!!o&&"doubleValue"in o})(r)})(t)?t:{integerValue:0}:null}class Zn extends us{}class tr extends us{constructor(t){super(),this.elements=t}}function ic(n,t){const e=ac(t);for(const r of n.elements)e.some((s=>oe(s,r)))||e.push(r);return{arrayValue:{values:e}}}class er extends us{constructor(t){super(),this.elements=t}}function oc(n,t){let e=ac(t);for(const r of n.elements)e=e.filter((s=>!oe(s,r)));return{arrayValue:{values:e}}}class Jr extends us{constructor(t,e){super(),this.serializer=t,this.Ee=e}}function Pa(n){return mt(n.integerValue||n.doubleValue)}function ac(n){return Ti(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class df{constructor(t,e){this.field=t,this.transform=e}}function ff(n,t){return n.field.isEqual(t.field)&&(function(r,s){return r instanceof tr&&s instanceof tr||r instanceof er&&s instanceof er?hn(r.elements,s.elements,oe):r instanceof Jr&&s instanceof Jr?oe(r.Ee,s.Ee):r instanceof Zn&&s instanceof Zn})(n.transform,t.transform)}class mf{constructor(t,e){this.version=t,this.transformResults=e}}class qt{constructor(t,e){this.updateTime=t,this.exists=e}static none(){return new qt}static exists(t){return new qt(void 0,t)}static updateTime(t){return new qt(t)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(t){return this.exists===t.exists&&(this.updateTime?!!t.updateTime&&this.updateTime.isEqual(t.updateTime):!t.updateTime)}}function Br(n,t){return n.updateTime!==void 0?t.isFoundDocument()&&t.version.isEqual(n.updateTime):n.exists===void 0||n.exists===t.isFoundDocument()}class hs{}function lc(n,t){if(!n.hasLocalMutations||t&&t.fields.length===0)return null;if(t===null)return n.isNoDocument()?new Ri(n.key,qt.none()):new sr(n.key,n.data,qt.none());{const e=n.data,r=Mt.empty();let s=new Et(At.comparator);for(let o of t.fields)if(!s.has(o)){let a=e.field(o);a===null&&o.length>1&&(o=o.popLast(),a=e.field(o)),a===null?r.delete(o):r.set(o,a),s=s.add(o)}return new Me(n.key,r,new Bt(s.toArray()),qt.none())}}function pf(n,t,e){n instanceof sr?(function(s,o,a){const c=s.value.clone(),h=xa(s.fieldTransforms,o,a.transformResults);c.setAll(h),o.convertToFoundDocument(a.version,c).setHasCommittedMutations()})(n,t,e):n instanceof Me?(function(s,o,a){if(!Br(s.precondition,o))return void o.convertToUnknownDocument(a.version);const c=xa(s.fieldTransforms,o,a.transformResults),h=o.data;h.setAll(cc(s)),h.setAll(c),o.convertToFoundDocument(a.version,h).setHasCommittedMutations()})(n,t,e):(function(s,o,a){o.convertToNoDocument(a.version).setHasCommittedMutations()})(0,t,e)}function Hn(n,t,e,r){return n instanceof sr?(function(o,a,c,h){if(!Br(o.precondition,a))return c;const d=o.value.clone(),m=Va(o.fieldTransforms,h,a);return d.setAll(m),a.convertToFoundDocument(a.version,d).setHasLocalMutations(),null})(n,t,e,r):n instanceof Me?(function(o,a,c,h){if(!Br(o.precondition,a))return c;const d=Va(o.fieldTransforms,h,a),m=a.data;return m.setAll(cc(o)),m.setAll(d),a.convertToFoundDocument(a.version,m).setHasLocalMutations(),c===null?null:c.unionWith(o.fieldMask.fields).unionWith(o.fieldTransforms.map((y=>y.field)))})(n,t,e,r):(function(o,a,c){return Br(o.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):c})(n,t,e)}function gf(n,t){let e=null;for(const r of n.fieldTransforms){const s=t.data.field(r.field),o=sc(r.transform,s||null);o!=null&&(e===null&&(e=Mt.empty()),e.set(r.field,o))}return e||null}function Ca(n,t){return n.type===t.type&&!!n.key.isEqual(t.key)&&!!n.precondition.isEqual(t.precondition)&&!!(function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&hn(r,s,((o,a)=>ff(o,a)))})(n.fieldTransforms,t.fieldTransforms)&&(n.type===0?n.value.isEqual(t.value):n.type!==1||n.data.isEqual(t.data)&&n.fieldMask.isEqual(t.fieldMask))}class sr extends hs{constructor(t,e,r,s=[]){super(),this.key=t,this.value=e,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class Me extends hs{constructor(t,e,r,s,o=[]){super(),this.key=t,this.data=e,this.fieldMask=r,this.precondition=s,this.fieldTransforms=o,this.type=1}getFieldMask(){return this.fieldMask}}function cc(n){const t=new Map;return n.fieldMask.fields.forEach((e=>{if(!e.isEmpty()){const r=n.data.field(e);t.set(e,r)}})),t}function xa(n,t,e){const r=new Map;et(n.length===e.length,32656,{Ae:e.length,Re:n.length});for(let s=0;s<e.length;s++){const o=n[s],a=o.transform,c=t.data.field(o.field);r.set(o.field,hf(a,c,e[s]))}return r}function Va(n,t,e){const r=new Map;for(const s of n){const o=s.transform,a=e.data.field(s.field);r.set(s.field,uf(o,a,t))}return r}class Ri extends hs{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class yf extends hs{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vf{constructor(t,e,r,s){this.batchId=t,this.localWriteTime=e,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(t,e){const r=e.mutationResults;for(let s=0;s<this.mutations.length;s++){const o=this.mutations[s];o.key.isEqual(t.key)&&pf(o,t,r[s])}}applyToLocalView(t,e){for(const r of this.baseMutations)r.key.isEqual(t.key)&&(e=Hn(r,t,e,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(t.key)&&(e=Hn(r,t,e,this.localWriteTime));return e}applyToLocalDocumentSet(t,e){const r=nc();return this.mutations.forEach((s=>{const o=t.get(s.key),a=o.overlayedDocument;let c=this.applyToLocalView(a,o.mutatedFields);c=e.has(s.key)?null:c;const h=lc(a,c);h!==null&&r.set(s.key,h),a.isValidDocument()||a.convertToNoDocument(j.min())})),r}keys(){return this.mutations.reduce(((t,e)=>t.add(e.key)),H())}isEqual(t){return this.batchId===t.batchId&&hn(this.mutations,t.mutations,((e,r)=>Ca(e,r)))&&hn(this.baseMutations,t.baseMutations,((e,r)=>Ca(e,r)))}}class Pi{constructor(t,e,r,s){this.batch=t,this.commitVersion=e,this.mutationResults=r,this.docVersions=s}static from(t,e,r){et(t.mutations.length===r.length,58842,{Ve:t.mutations.length,me:r.length});let s=(function(){return sf})();const o=t.mutations;for(let a=0;a<o.length;a++)s=s.insert(o[a].key,r[a].version);return new Pi(t,e,r,s)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _f{constructor(t,e){this.largestBatchId=t,this.mutation=e}getKey(){return this.mutation.key}isEqual(t){return t!==null&&this.mutation===t.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ef{constructor(t,e){this.count=t,this.unchangedNames=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var pt,J;function bf(n){switch(n){case R.OK:return U(64938);case R.CANCELLED:case R.UNKNOWN:case R.DEADLINE_EXCEEDED:case R.RESOURCE_EXHAUSTED:case R.INTERNAL:case R.UNAVAILABLE:case R.UNAUTHENTICATED:return!1;case R.INVALID_ARGUMENT:case R.NOT_FOUND:case R.ALREADY_EXISTS:case R.PERMISSION_DENIED:case R.FAILED_PRECONDITION:case R.ABORTED:case R.OUT_OF_RANGE:case R.UNIMPLEMENTED:case R.DATA_LOSS:return!0;default:return U(15467,{code:n})}}function uc(n){if(n===void 0)return de("GRPC error has no .code"),R.UNKNOWN;switch(n){case pt.OK:return R.OK;case pt.CANCELLED:return R.CANCELLED;case pt.UNKNOWN:return R.UNKNOWN;case pt.DEADLINE_EXCEEDED:return R.DEADLINE_EXCEEDED;case pt.RESOURCE_EXHAUSTED:return R.RESOURCE_EXHAUSTED;case pt.INTERNAL:return R.INTERNAL;case pt.UNAVAILABLE:return R.UNAVAILABLE;case pt.UNAUTHENTICATED:return R.UNAUTHENTICATED;case pt.INVALID_ARGUMENT:return R.INVALID_ARGUMENT;case pt.NOT_FOUND:return R.NOT_FOUND;case pt.ALREADY_EXISTS:return R.ALREADY_EXISTS;case pt.PERMISSION_DENIED:return R.PERMISSION_DENIED;case pt.FAILED_PRECONDITION:return R.FAILED_PRECONDITION;case pt.ABORTED:return R.ABORTED;case pt.OUT_OF_RANGE:return R.OUT_OF_RANGE;case pt.UNIMPLEMENTED:return R.UNIMPLEMENTED;case pt.DATA_LOSS:return R.DATA_LOSS;default:return U(39323,{code:n})}}(J=pt||(pt={}))[J.OK=0]="OK",J[J.CANCELLED=1]="CANCELLED",J[J.UNKNOWN=2]="UNKNOWN",J[J.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",J[J.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",J[J.NOT_FOUND=5]="NOT_FOUND",J[J.ALREADY_EXISTS=6]="ALREADY_EXISTS",J[J.PERMISSION_DENIED=7]="PERMISSION_DENIED",J[J.UNAUTHENTICATED=16]="UNAUTHENTICATED",J[J.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",J[J.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",J[J.ABORTED=10]="ABORTED",J[J.OUT_OF_RANGE=11]="OUT_OF_RANGE",J[J.UNIMPLEMENTED=12]="UNIMPLEMENTED",J[J.INTERNAL=13]="INTERNAL",J[J.UNAVAILABLE=14]="UNAVAILABLE",J[J.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wf=new Se([4294967295,4294967295],0);function ka(n){const t=Vl().encode(n),e=new Tl;return e.update(t),new Uint8Array(e.digest())}function Da(n){const t=new DataView(n.buffer),e=t.getUint32(0,!0),r=t.getUint32(4,!0),s=t.getUint32(8,!0),o=t.getUint32(12,!0);return[new Se([e,r],0),new Se([s,o],0)]}class Ci{constructor(t,e,r){if(this.bitmap=t,this.padding=e,this.hashCount=r,e<0||e>=8)throw new Un(`Invalid padding: ${e}`);if(r<0)throw new Un(`Invalid hash count: ${r}`);if(t.length>0&&this.hashCount===0)throw new Un(`Invalid hash count: ${r}`);if(t.length===0&&e!==0)throw new Un(`Invalid padding when bitmap length is 0: ${e}`);this.fe=8*t.length-e,this.ge=Se.fromNumber(this.fe)}pe(t,e,r){let s=t.add(e.multiply(Se.fromNumber(r)));return s.compare(wf)===1&&(s=new Se([s.getBits(0),s.getBits(1)],0)),s.modulo(this.ge).toNumber()}ye(t){return!!(this.bitmap[Math.floor(t/8)]&1<<t%8)}mightContain(t){if(this.fe===0)return!1;const e=ka(t),[r,s]=Da(e);for(let o=0;o<this.hashCount;o++){const a=this.pe(r,s,o);if(!this.ye(a))return!1}return!0}static create(t,e,r){const s=t%8==0?0:8-t%8,o=new Uint8Array(Math.ceil(t/8)),a=new Ci(o,s,e);return r.forEach((c=>a.insert(c))),a}insert(t){if(this.fe===0)return;const e=ka(t),[r,s]=Da(e);for(let o=0;o<this.hashCount;o++){const a=this.pe(r,s,o);this.we(a)}}we(t){const e=Math.floor(t/8),r=t%8;this.bitmap[e]|=1<<r}}class Un extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ds{constructor(t,e,r,s,o){this.snapshotVersion=t,this.targetChanges=e,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=o}static createSynthesizedRemoteEventForCurrentChange(t,e,r){const s=new Map;return s.set(t,ir.createSynthesizedTargetChangeForCurrentChange(t,e,r)),new ds(j.min(),s,new ut(G),me(),H())}}class ir{constructor(t,e,r,s,o){this.resumeToken=t,this.current=e,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=o}static createSynthesizedTargetChangeForCurrentChange(t,e,r){return new ir(r,e,H(),H(),H())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ur{constructor(t,e,r,s){this.Se=t,this.removedTargetIds=e,this.key=r,this.be=s}}class hc{constructor(t,e){this.targetId=t,this.De=e}}class dc{constructor(t,e,r=St.EMPTY_BYTE_STRING,s=null){this.state=t,this.targetIds=e,this.resumeToken=r,this.cause=s}}class Na{constructor(){this.ve=0,this.Ce=La(),this.Fe=St.EMPTY_BYTE_STRING,this.Me=!1,this.xe=!0}get current(){return this.Me}get resumeToken(){return this.Fe}get Oe(){return this.ve!==0}get Ne(){return this.xe}Be(t){t.approximateByteSize()>0&&(this.xe=!0,this.Fe=t)}Le(){let t=H(),e=H(),r=H();return this.Ce.forEach(((s,o)=>{switch(o){case 0:t=t.add(s);break;case 2:e=e.add(s);break;case 1:r=r.add(s);break;default:U(38017,{changeType:o})}})),new ir(this.Fe,this.Me,t,e,r)}ke(){this.xe=!1,this.Ce=La()}qe(t,e){this.xe=!0,this.Ce=this.Ce.insert(t,e)}Qe(t){this.xe=!0,this.Ce=this.Ce.remove(t)}$e(){this.ve+=1}Ue(){this.ve-=1,et(this.ve>=0,3241,{ve:this.ve})}Ke(){this.xe=!0,this.Me=!0}}class Tf{constructor(t){this.We=t,this.Ge=new Map,this.ze=me(),this.je=Vr(),this.Je=Vr(),this.He=new ut(G)}Ye(t){for(const e of t.Se)t.be&&t.be.isFoundDocument()?this.Ze(e,t.be):this.Xe(e,t.key,t.be);for(const e of t.removedTargetIds)this.Xe(e,t.key,t.be)}et(t){this.forEachTarget(t,(e=>{const r=this.tt(e);switch(t.state){case 0:this.nt(e)&&r.Be(t.resumeToken);break;case 1:r.Ue(),r.Oe||r.ke(),r.Be(t.resumeToken);break;case 2:r.Ue(),r.Oe||this.removeTarget(e);break;case 3:this.nt(e)&&(r.Ke(),r.Be(t.resumeToken));break;case 4:this.nt(e)&&(this.rt(e),r.Be(t.resumeToken));break;default:U(56790,{state:t.state})}}))}forEachTarget(t,e){t.targetIds.length>0?t.targetIds.forEach(e):this.Ge.forEach(((r,s)=>{this.nt(s)&&e(s)}))}it(t){const e=t.targetId,r=t.De.count,s=this.st(e);if(s){const o=s.target;if(ri(o))if(r===0){const a=new M(o.path);this.Xe(e,a,kt.newNoDocument(a,j.min()))}else et(r===1,20013,{expectedCount:r});else{const a=this.ot(e);if(a!==r){const c=this._t(t),h=c?this.ut(c,t,a):1;if(h!==0){this.rt(e);const d=h===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.He=this.He.insert(e,d)}}}}}_t(t){const e=t.De.unchangedNames;if(!e||!e.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:o=0}=e;let a,c;try{a=ke(r).toUint8Array()}catch(h){if(h instanceof Ol)return Ce("Decoding the base64 bloom filter in existence filter failed ("+h.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw h}try{c=new Ci(a,s,o)}catch(h){return Ce(h instanceof Un?"BloomFilter error: ":"Applying bloom filter failed: ",h),null}return c.fe===0?null:c}ut(t,e,r){return e.De.count===r-this.ht(t,e.targetId)?0:2}ht(t,e){const r=this.We.getRemoteKeysForTarget(e);let s=0;return r.forEach((o=>{const a=this.We.lt(),c=`projects/${a.projectId}/databases/${a.database}/documents/${o.path.canonicalString()}`;t.mightContain(c)||(this.Xe(e,o,null),s++)})),s}Pt(t){const e=new Map;this.Ge.forEach(((o,a)=>{const c=this.st(a);if(c){if(o.current&&ri(c.target)){const h=new M(c.target.path);this.Tt(h).has(a)||this.It(a,h)||this.Xe(a,h,kt.newNoDocument(h,t))}o.Ne&&(e.set(a,o.Le()),o.ke())}}));let r=H();this.Je.forEach(((o,a)=>{let c=!0;a.forEachWhile((h=>{const d=this.st(h);return!d||d.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)})),c&&(r=r.add(o))})),this.ze.forEach(((o,a)=>a.setReadTime(t)));const s=new ds(t,e,this.He,this.ze,r);return this.ze=me(),this.je=Vr(),this.Je=Vr(),this.He=new ut(G),s}Ze(t,e){if(!this.nt(t))return;const r=this.It(t,e.key)?2:0;this.tt(t).qe(e.key,r),this.ze=this.ze.insert(e.key,e),this.je=this.je.insert(e.key,this.Tt(e.key).add(t)),this.Je=this.Je.insert(e.key,this.dt(e.key).add(t))}Xe(t,e,r){if(!this.nt(t))return;const s=this.tt(t);this.It(t,e)?s.qe(e,1):s.Qe(e),this.Je=this.Je.insert(e,this.dt(e).delete(t)),this.Je=this.Je.insert(e,this.dt(e).add(t)),r&&(this.ze=this.ze.insert(e,r))}removeTarget(t){this.Ge.delete(t)}ot(t){const e=this.tt(t).Le();return this.We.getRemoteKeysForTarget(t).size+e.addedDocuments.size-e.removedDocuments.size}$e(t){this.tt(t).$e()}tt(t){let e=this.Ge.get(t);return e||(e=new Na,this.Ge.set(t,e)),e}dt(t){let e=this.Je.get(t);return e||(e=new Et(G),this.Je=this.Je.insert(t,e)),e}Tt(t){let e=this.je.get(t);return e||(e=new Et(G),this.je=this.je.insert(t,e)),e}nt(t){const e=this.st(t)!==null;return e||L("WatchChangeAggregator","Detected inactive target",t),e}st(t){const e=this.Ge.get(t);return e&&e.Oe?null:this.We.Et(t)}rt(t){this.Ge.set(t,new Na),this.We.getRemoteKeysForTarget(t).forEach((e=>{this.Xe(t,e,null)}))}It(t,e){return this.We.getRemoteKeysForTarget(t).has(e)}}function Vr(){return new ut(M.comparator)}function La(){return new ut(M.comparator)}const If={asc:"ASCENDING",desc:"DESCENDING"},Af={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},Sf={and:"AND",or:"OR"};class Rf{constructor(t,e){this.databaseId=t,this.useProto3Json=e}}function oi(n,t){return n.useProto3Json||os(t)?t:{value:t}}function Xr(n,t){return n.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function fc(n,t){return n.useProto3Json?t.toBase64():t.toUint8Array()}function Pf(n,t){return Xr(n,t.toTimestamp())}function re(n){return et(!!n,49232),j.fromTimestamp((function(e){const r=Ve(e);return new at(r.seconds,r.nanos)})(n))}function xi(n,t){return ai(n,t).canonicalString()}function ai(n,t){const e=(function(s){return new it(["projects",s.projectId,"databases",s.database])})(n).child("documents");return t===void 0?e:e.child(t)}function mc(n){const t=it.fromString(n);return et(_c(t),10190,{key:t.toString()}),t}function li(n,t){return xi(n.databaseId,t.path)}function $s(n,t){const e=mc(t);if(e.get(1)!==n.databaseId.projectId)throw new O(R.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+e.get(1)+" vs "+n.databaseId.projectId);if(e.get(3)!==n.databaseId.database)throw new O(R.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+e.get(3)+" vs "+n.databaseId.database);return new M(gc(e))}function pc(n,t){return xi(n.databaseId,t)}function Cf(n){const t=mc(n);return t.length===4?it.emptyPath():gc(t)}function ci(n){return new it(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function gc(n){return et(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function Oa(n,t,e){return{name:li(n,t),fields:e.value.mapValue.fields}}function xf(n,t){let e;if("targetChange"in t){t.targetChange;const r=(function(d){return d==="NO_CHANGE"?0:d==="ADD"?1:d==="REMOVE"?2:d==="CURRENT"?3:d==="RESET"?4:U(39313,{state:d})})(t.targetChange.targetChangeType||"NO_CHANGE"),s=t.targetChange.targetIds||[],o=(function(d,m){return d.useProto3Json?(et(m===void 0||typeof m=="string",58123),St.fromBase64String(m||"")):(et(m===void 0||m instanceof Buffer||m instanceof Uint8Array,16193),St.fromUint8Array(m||new Uint8Array))})(n,t.targetChange.resumeToken),a=t.targetChange.cause,c=a&&(function(d){const m=d.code===void 0?R.UNKNOWN:uc(d.code);return new O(m,d.message||"")})(a);e=new dc(r,s,o,c||null)}else if("documentChange"in t){t.documentChange;const r=t.documentChange;r.document,r.document.name,r.document.updateTime;const s=$s(n,r.document.name),o=re(r.document.updateTime),a=r.document.createTime?re(r.document.createTime):j.min(),c=new Mt({mapValue:{fields:r.document.fields}}),h=kt.newFoundDocument(s,o,a,c),d=r.targetIds||[],m=r.removedTargetIds||[];e=new Ur(d,m,h.key,h)}else if("documentDelete"in t){t.documentDelete;const r=t.documentDelete;r.document;const s=$s(n,r.document),o=r.readTime?re(r.readTime):j.min(),a=kt.newNoDocument(s,o),c=r.removedTargetIds||[];e=new Ur([],c,a.key,a)}else if("documentRemove"in t){t.documentRemove;const r=t.documentRemove;r.document;const s=$s(n,r.document),o=r.removedTargetIds||[];e=new Ur([],o,s,null)}else{if(!("filter"in t))return U(11601,{At:t});{t.filter;const r=t.filter;r.targetId;const{count:s=0,unchangedNames:o}=r,a=new Ef(s,o),c=r.targetId;e=new hc(c,a)}}return e}function Vf(n,t){let e;if(t instanceof sr)e={update:Oa(n,t.key,t.value)};else if(t instanceof Ri)e={delete:li(n,t.key)};else if(t instanceof Me)e={update:Oa(n,t.key,t.data),updateMask:Uf(t.fieldMask)};else{if(!(t instanceof yf))return U(16599,{Rt:t.type});e={verify:li(n,t.key)}}return t.fieldTransforms.length>0&&(e.updateTransforms=t.fieldTransforms.map((r=>(function(o,a){const c=a.transform;if(c instanceof Zn)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof tr)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof er)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof Jr)return{fieldPath:a.field.canonicalString(),increment:c.Ee};throw U(20930,{transform:a.transform})})(0,r)))),t.precondition.isNone||(e.currentDocument=(function(s,o){return o.updateTime!==void 0?{updateTime:Pf(s,o.updateTime)}:o.exists!==void 0?{exists:o.exists}:U(27497)})(n,t.precondition)),e}function kf(n,t){return n&&n.length>0?(et(t!==void 0,14353),n.map((e=>(function(s,o){let a=s.updateTime?re(s.updateTime):re(o);return a.isEqual(j.min())&&(a=re(o)),new mf(a,s.transformResults||[])})(e,t)))):[]}function Df(n,t){return{documents:[pc(n,t.path)]}}function Nf(n,t){const e={structuredQuery:{}},r=t.path;let s;t.collectionGroup!==null?(s=r,e.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(s=r.popLast(),e.structuredQuery.from=[{collectionId:r.lastSegment()}]),e.parent=pc(n,s);const o=(function(d){if(d.length!==0)return vc(Qt.create(d,"and"))})(t.filters);o&&(e.structuredQuery.where=o);const a=(function(d){if(d.length!==0)return d.map((m=>(function(p){return{field:nn(p.field),direction:Mf(p.dir)}})(m)))})(t.orderBy);a&&(e.structuredQuery.orderBy=a);const c=oi(n,t.limit);return c!==null&&(e.structuredQuery.limit=c),t.startAt&&(e.structuredQuery.startAt=(function(d){return{before:d.inclusive,values:d.position}})(t.startAt)),t.endAt&&(e.structuredQuery.endAt=(function(d){return{before:!d.inclusive,values:d.position}})(t.endAt)),{Vt:e,parent:s}}function Lf(n){let t=Cf(n.parent);const e=n.structuredQuery,r=e.from?e.from.length:0;let s=null;if(r>0){et(r===1,65062);const m=e.from[0];m.allDescendants?s=m.collectionId:t=t.child(m.collectionId)}let o=[];e.where&&(o=(function(y){const p=yc(y);return p instanceof Qt&&Hl(p)?p.getFilters():[p]})(e.where));let a=[];e.orderBy&&(a=(function(y){return y.map((p=>(function(C){return new Yr(rn(C.field),(function(x){switch(x){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}})(C.direction))})(p)))})(e.orderBy));let c=null;e.limit&&(c=(function(y){let p;return p=typeof y=="object"?y.value:y,os(p)?null:p})(e.limit));let h=null;e.startAt&&(h=(function(y){const p=!!y.before,S=y.values||[];return new Qr(S,p)})(e.startAt));let d=null;return e.endAt&&(d=(function(y){const p=!y.before,S=y.values||[];return new Qr(S,p)})(e.endAt)),Zd(t,s,a,o,c,"F",h,d)}function Of(n,t){const e=(function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return U(28987,{purpose:s})}})(t.purpose);return e==null?null:{"goog-listen-tags":e}}function yc(n){return n.unaryFilter!==void 0?(function(e){switch(e.unaryFilter.op){case"IS_NAN":const r=rn(e.unaryFilter.field);return gt.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=rn(e.unaryFilter.field);return gt.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const o=rn(e.unaryFilter.field);return gt.create(o,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=rn(e.unaryFilter.field);return gt.create(a,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return U(61313);default:return U(60726)}})(n):n.fieldFilter!==void 0?(function(e){return gt.create(rn(e.fieldFilter.field),(function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return U(58110);default:return U(50506)}})(e.fieldFilter.op),e.fieldFilter.value)})(n):n.compositeFilter!==void 0?(function(e){return Qt.create(e.compositeFilter.filters.map((r=>yc(r))),(function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return U(1026)}})(e.compositeFilter.op))})(n):U(30097,{filter:n})}function Mf(n){return If[n]}function Ff(n){return Af[n]}function Bf(n){return Sf[n]}function nn(n){return{fieldPath:n.canonicalString()}}function rn(n){return At.fromServerFormat(n.fieldPath)}function vc(n){return n instanceof gt?(function(e){if(e.op==="=="){if(Ta(e.value))return{unaryFilter:{field:nn(e.field),op:"IS_NAN"}};if(wa(e.value))return{unaryFilter:{field:nn(e.field),op:"IS_NULL"}}}else if(e.op==="!="){if(Ta(e.value))return{unaryFilter:{field:nn(e.field),op:"IS_NOT_NAN"}};if(wa(e.value))return{unaryFilter:{field:nn(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:nn(e.field),op:Ff(e.op),value:e.value}}})(n):n instanceof Qt?(function(e){const r=e.getFilters().map((s=>vc(s)));return r.length===1?r[0]:{compositeFilter:{op:Bf(e.op),filters:r}}})(n):U(54877,{filter:n})}function Uf(n){const t=[];return n.fields.forEach((e=>t.push(e.canonicalString()))),{fieldPaths:t}}function _c(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Te{constructor(t,e,r,s,o=j.min(),a=j.min(),c=St.EMPTY_BYTE_STRING,h=null){this.target=t,this.targetId=e,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=o,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=c,this.expectedCount=h}withSequenceNumber(t){return new Te(this.target,this.targetId,this.purpose,t,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(t,e){return new Te(this.target,this.targetId,this.purpose,this.sequenceNumber,e,this.lastLimboFreeSnapshotVersion,t,null)}withExpectedCount(t){return new Te(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,t)}withLastLimboFreeSnapshotVersion(t){return new Te(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,t,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zf{constructor(t){this.gt=t}}function jf(n){const t=Lf({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?ii(t,t.limit,"L"):t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $f{constructor(){this.Dn=new qf}addToCollectionParentIndex(t,e){return this.Dn.add(e),P.resolve()}getCollectionParents(t,e){return P.resolve(this.Dn.getEntries(e))}addFieldIndex(t,e){return P.resolve()}deleteFieldIndex(t,e){return P.resolve()}deleteAllFieldIndexes(t){return P.resolve()}createTargetIndexes(t,e){return P.resolve()}getDocumentsMatchingTarget(t,e){return P.resolve(null)}getIndexType(t,e){return P.resolve(0)}getFieldIndexes(t,e){return P.resolve([])}getNextCollectionGroupToUpdate(t){return P.resolve(null)}getMinOffset(t,e){return P.resolve(xe.min())}getMinOffsetFromCollectionGroup(t,e){return P.resolve(xe.min())}updateCollectionGroup(t,e,r){return P.resolve()}updateIndexEntries(t,e){return P.resolve()}}class qf{constructor(){this.index={}}add(t){const e=t.lastSegment(),r=t.popLast(),s=this.index[e]||new Et(it.comparator),o=!s.has(r);return this.index[e]=s.add(r),o}has(t){const e=t.lastSegment(),r=t.popLast(),s=this.index[e];return s&&s.has(r)}getEntries(t){return(this.index[t]||new Et(it.comparator)).toArray()}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ma={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},Ec=41943040;class Lt{static withCacheSize(t){return new Lt(t,Lt.DEFAULT_COLLECTION_PERCENTILE,Lt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(t,e,r){this.cacheSizeCollectionThreshold=t,this.percentileToCollect=e,this.maximumSequenceNumbersToCollect=r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Lt.DEFAULT_COLLECTION_PERCENTILE=10,Lt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Lt.DEFAULT=new Lt(Ec,Lt.DEFAULT_COLLECTION_PERCENTILE,Lt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Lt.DISABLED=new Lt(-1,0,0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mn{constructor(t){this._r=t}next(){return this._r+=2,this._r}static ar(){return new mn(0)}static ur(){return new mn(-1)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fa="LruGarbageCollector",Gf=1048576;function Ba([n,t],[e,r]){const s=G(n,e);return s===0?G(t,r):s}class Hf{constructor(t){this.Tr=t,this.buffer=new Et(Ba),this.Ir=0}dr(){return++this.Ir}Er(t){const e=[t,this.dr()];if(this.buffer.size<this.Tr)this.buffer=this.buffer.add(e);else{const r=this.buffer.last();Ba(e,r)<0&&(this.buffer=this.buffer.delete(r).add(e))}}get maxValue(){return this.buffer.last()[0]}}class Kf{constructor(t,e,r){this.garbageCollector=t,this.asyncQueue=e,this.localStore=r,this.Ar=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Rr(6e4)}stop(){this.Ar&&(this.Ar.cancel(),this.Ar=null)}get started(){return this.Ar!==null}Rr(t){L(Fa,`Garbage collection scheduled in ${t}ms`),this.Ar=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",t,(async()=>{this.Ar=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(e){_n(e)?L(Fa,"Ignoring IndexedDB error during garbage collection: ",e):await vn(e)}await this.Rr(3e5)}))}}class Wf{constructor(t,e){this.Vr=t,this.params=e}calculateTargetCount(t,e){return this.Vr.mr(t).next((r=>Math.floor(e/100*r)))}nthSequenceNumber(t,e){if(e===0)return P.resolve(is.ue);const r=new Hf(e);return this.Vr.forEachTarget(t,(s=>r.Er(s.sequenceNumber))).next((()=>this.Vr.gr(t,(s=>r.Er(s))))).next((()=>r.maxValue))}removeTargets(t,e,r){return this.Vr.removeTargets(t,e,r)}removeOrphanedDocuments(t,e){return this.Vr.removeOrphanedDocuments(t,e)}collect(t,e){return this.params.cacheSizeCollectionThreshold===-1?(L("LruGarbageCollector","Garbage collection skipped; disabled"),P.resolve(Ma)):this.getCacheSize(t).next((r=>r<this.params.cacheSizeCollectionThreshold?(L("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Ma):this.pr(t,e)))}getCacheSize(t){return this.Vr.getCacheSize(t)}pr(t,e){let r,s,o,a,c,h,d;const m=Date.now();return this.calculateTargetCount(t,this.params.percentileToCollect).next((y=>(y>this.params.maximumSequenceNumbersToCollect?(L("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${y}`),s=this.params.maximumSequenceNumbersToCollect):s=y,a=Date.now(),this.nthSequenceNumber(t,s)))).next((y=>(r=y,c=Date.now(),this.removeTargets(t,r,e)))).next((y=>(o=y,h=Date.now(),this.removeOrphanedDocuments(t,r)))).next((y=>(d=Date.now(),tn()<=X.DEBUG&&L("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-m}ms
	Determined least recently used ${s} in `+(c-a)+`ms
	Removed ${o} targets in `+(h-c)+`ms
	Removed ${y} documents in `+(d-h)+`ms
Total Duration: ${d-m}ms`),P.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:o,documentsRemoved:y}))))}}function Qf(n,t){return new Wf(n,t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yf{constructor(){this.changes=new Ke((t=>t.toString()),((t,e)=>t.isEqual(e))),this.changesApplied=!1}addEntry(t){this.assertNotApplied(),this.changes.set(t.key,t)}removeEntry(t,e){this.assertNotApplied(),this.changes.set(t,kt.newInvalidDocument(t).setReadTime(e))}getEntry(t,e){this.assertNotApplied();const r=this.changes.get(e);return r!==void 0?P.resolve(r):this.getFromCache(t,e)}getEntries(t,e){return this.getAllFromCache(t,e)}apply(t){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(t)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jf{constructor(t,e){this.overlayedDocument=t,this.mutatedFields=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xf{constructor(t,e,r,s){this.remoteDocumentCache=t,this.mutationQueue=e,this.documentOverlayCache=r,this.indexManager=s}getDocument(t,e){let r=null;return this.documentOverlayCache.getOverlay(t,e).next((s=>(r=s,this.remoteDocumentCache.getEntry(t,e)))).next((s=>(r!==null&&Hn(r.mutation,s,Bt.empty(),at.now()),s)))}getDocuments(t,e){return this.remoteDocumentCache.getEntries(t,e).next((r=>this.getLocalViewOfDocuments(t,r,H()).next((()=>r))))}getLocalViewOfDocuments(t,e,r=H()){const s=$e();return this.populateOverlays(t,s,e).next((()=>this.computeViews(t,e,s,r).next((o=>{let a=Bn();return o.forEach(((c,h)=>{a=a.insert(c,h.overlayedDocument)})),a}))))}getOverlayedDocuments(t,e){const r=$e();return this.populateOverlays(t,r,e).next((()=>this.computeViews(t,e,r,H())))}populateOverlays(t,e,r){const s=[];return r.forEach((o=>{e.has(o)||s.push(o)})),this.documentOverlayCache.getOverlays(t,s).next((o=>{o.forEach(((a,c)=>{e.set(a,c)}))}))}computeViews(t,e,r,s){let o=me();const a=Gn(),c=(function(){return Gn()})();return e.forEach(((h,d)=>{const m=r.get(d.key);s.has(d.key)&&(m===void 0||m.mutation instanceof Me)?o=o.insert(d.key,d):m!==void 0?(a.set(d.key,m.mutation.getFieldMask()),Hn(m.mutation,d,m.mutation.getFieldMask(),at.now())):a.set(d.key,Bt.empty())})),this.recalculateAndSaveOverlays(t,o).next((h=>(h.forEach(((d,m)=>a.set(d,m))),e.forEach(((d,m)=>{var y;return c.set(d,new Jf(m,(y=a.get(d))!==null&&y!==void 0?y:null))})),c)))}recalculateAndSaveOverlays(t,e){const r=Gn();let s=new ut(((a,c)=>a-c)),o=H();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(t,e).next((a=>{for(const c of a)c.keys().forEach((h=>{const d=e.get(h);if(d===null)return;let m=r.get(h)||Bt.empty();m=c.applyToLocalView(d,m),r.set(h,m);const y=(s.get(c.batchId)||H()).add(h);s=s.insert(c.batchId,y)}))})).next((()=>{const a=[],c=s.getReverseIterator();for(;c.hasNext();){const h=c.getNext(),d=h.key,m=h.value,y=nc();m.forEach((p=>{if(!o.has(p)){const S=lc(e.get(p),r.get(p));S!==null&&y.set(p,S),o=o.add(p)}})),a.push(this.documentOverlayCache.saveOverlays(t,d,y))}return P.waitFor(a)})).next((()=>r))}recalculateAndSaveOverlaysForDocumentKeys(t,e){return this.remoteDocumentCache.getEntries(t,e).next((r=>this.recalculateAndSaveOverlays(t,r)))}getDocumentsMatchingQuery(t,e,r,s){return(function(a){return M.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0})(e)?this.getDocumentsMatchingDocumentQuery(t,e.path):Jl(e)?this.getDocumentsMatchingCollectionGroupQuery(t,e,r,s):this.getDocumentsMatchingCollectionQuery(t,e,r,s)}getNextDocuments(t,e,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(t,e,r,s).next((o=>{const a=s-o.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(t,e,r.largestBatchId,s-o.size):P.resolve($e());let c=Qn,h=o;return a.next((d=>P.forEach(d,((m,y)=>(c<y.largestBatchId&&(c=y.largestBatchId),o.get(m)?P.resolve():this.remoteDocumentCache.getEntry(t,m).next((p=>{h=h.insert(m,p)}))))).next((()=>this.populateOverlays(t,d,o))).next((()=>this.computeViews(t,h,d,H()))).next((m=>({batchId:c,changes:ec(m)})))))}))}getDocumentsMatchingDocumentQuery(t,e){return this.getDocument(t,new M(e)).next((r=>{let s=Bn();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s}))}getDocumentsMatchingCollectionGroupQuery(t,e,r,s){const o=e.collectionGroup;let a=Bn();return this.indexManager.getCollectionParents(t,o).next((c=>P.forEach(c,(h=>{const d=(function(y,p){return new rr(p,null,y.explicitOrderBy.slice(),y.filters.slice(),y.limit,y.limitType,y.startAt,y.endAt)})(e,h.child(o));return this.getDocumentsMatchingCollectionQuery(t,d,r,s).next((m=>{m.forEach(((y,p)=>{a=a.insert(y,p)}))}))})).next((()=>a))))}getDocumentsMatchingCollectionQuery(t,e,r,s){let o;return this.documentOverlayCache.getOverlaysForCollection(t,e.path,r.largestBatchId).next((a=>(o=a,this.remoteDocumentCache.getDocumentsMatchingQuery(t,e,r,o,s)))).next((a=>{o.forEach(((h,d)=>{const m=d.getKey();a.get(m)===null&&(a=a.insert(m,kt.newInvalidDocument(m)))}));let c=Bn();return a.forEach(((h,d)=>{const m=o.get(h);m!==void 0&&Hn(m.mutation,d,Bt.empty(),at.now()),cs(e,d)&&(c=c.insert(h,d))})),c}))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zf{constructor(t){this.serializer=t,this.Br=new Map,this.Lr=new Map}getBundleMetadata(t,e){return P.resolve(this.Br.get(e))}saveBundleMetadata(t,e){return this.Br.set(e.id,(function(s){return{id:s.id,version:s.version,createTime:re(s.createTime)}})(e)),P.resolve()}getNamedQuery(t,e){return P.resolve(this.Lr.get(e))}saveNamedQuery(t,e){return this.Lr.set(e.name,(function(s){return{name:s.name,query:jf(s.bundledQuery),readTime:re(s.readTime)}})(e)),P.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tm{constructor(){this.overlays=new ut(M.comparator),this.kr=new Map}getOverlay(t,e){return P.resolve(this.overlays.get(e))}getOverlays(t,e){const r=$e();return P.forEach(e,(s=>this.getOverlay(t,s).next((o=>{o!==null&&r.set(s,o)})))).next((()=>r))}saveOverlays(t,e,r){return r.forEach(((s,o)=>{this.wt(t,e,o)})),P.resolve()}removeOverlaysForBatchId(t,e,r){const s=this.kr.get(r);return s!==void 0&&(s.forEach((o=>this.overlays=this.overlays.remove(o))),this.kr.delete(r)),P.resolve()}getOverlaysForCollection(t,e,r){const s=$e(),o=e.length+1,a=new M(e.child("")),c=this.overlays.getIteratorFrom(a);for(;c.hasNext();){const h=c.getNext().value,d=h.getKey();if(!e.isPrefixOf(d.path))break;d.path.length===o&&h.largestBatchId>r&&s.set(h.getKey(),h)}return P.resolve(s)}getOverlaysForCollectionGroup(t,e,r,s){let o=new ut(((d,m)=>d-m));const a=this.overlays.getIterator();for(;a.hasNext();){const d=a.getNext().value;if(d.getKey().getCollectionGroup()===e&&d.largestBatchId>r){let m=o.get(d.largestBatchId);m===null&&(m=$e(),o=o.insert(d.largestBatchId,m)),m.set(d.getKey(),d)}}const c=$e(),h=o.getIterator();for(;h.hasNext()&&(h.getNext().value.forEach(((d,m)=>c.set(d,m))),!(c.size()>=s)););return P.resolve(c)}wt(t,e,r){const s=this.overlays.get(r.key);if(s!==null){const a=this.kr.get(s.largestBatchId).delete(r.key);this.kr.set(s.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new _f(e,r));let o=this.kr.get(e);o===void 0&&(o=H(),this.kr.set(e,o)),this.kr.set(e,o.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class em{constructor(){this.sessionToken=St.EMPTY_BYTE_STRING}getSessionToken(t){return P.resolve(this.sessionToken)}setSessionToken(t,e){return this.sessionToken=e,P.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vi{constructor(){this.qr=new Et(bt.Qr),this.$r=new Et(bt.Ur)}isEmpty(){return this.qr.isEmpty()}addReference(t,e){const r=new bt(t,e);this.qr=this.qr.add(r),this.$r=this.$r.add(r)}Kr(t,e){t.forEach((r=>this.addReference(r,e)))}removeReference(t,e){this.Wr(new bt(t,e))}Gr(t,e){t.forEach((r=>this.removeReference(r,e)))}zr(t){const e=new M(new it([])),r=new bt(e,t),s=new bt(e,t+1),o=[];return this.$r.forEachInRange([r,s],(a=>{this.Wr(a),o.push(a.key)})),o}jr(){this.qr.forEach((t=>this.Wr(t)))}Wr(t){this.qr=this.qr.delete(t),this.$r=this.$r.delete(t)}Jr(t){const e=new M(new it([])),r=new bt(e,t),s=new bt(e,t+1);let o=H();return this.$r.forEachInRange([r,s],(a=>{o=o.add(a.key)})),o}containsKey(t){const e=new bt(t,0),r=this.qr.firstAfterOrEqual(e);return r!==null&&t.isEqual(r.key)}}class bt{constructor(t,e){this.key=t,this.Hr=e}static Qr(t,e){return M.comparator(t.key,e.key)||G(t.Hr,e.Hr)}static Ur(t,e){return G(t.Hr,e.Hr)||M.comparator(t.key,e.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nm{constructor(t,e){this.indexManager=t,this.referenceDelegate=e,this.mutationQueue=[],this.er=1,this.Yr=new Et(bt.Qr)}checkEmpty(t){return P.resolve(this.mutationQueue.length===0)}addMutationBatch(t,e,r,s){const o=this.er;this.er++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new vf(o,e,r,s);this.mutationQueue.push(a);for(const c of s)this.Yr=this.Yr.add(new bt(c.key,o)),this.indexManager.addToCollectionParentIndex(t,c.key.path.popLast());return P.resolve(a)}lookupMutationBatch(t,e){return P.resolve(this.Zr(e))}getNextMutationBatchAfterBatchId(t,e){const r=e+1,s=this.Xr(r),o=s<0?0:s;return P.resolve(this.mutationQueue.length>o?this.mutationQueue[o]:null)}getHighestUnacknowledgedBatchId(){return P.resolve(this.mutationQueue.length===0?bi:this.er-1)}getAllMutationBatches(t){return P.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(t,e){const r=new bt(e,0),s=new bt(e,Number.POSITIVE_INFINITY),o=[];return this.Yr.forEachInRange([r,s],(a=>{const c=this.Zr(a.Hr);o.push(c)})),P.resolve(o)}getAllMutationBatchesAffectingDocumentKeys(t,e){let r=new Et(G);return e.forEach((s=>{const o=new bt(s,0),a=new bt(s,Number.POSITIVE_INFINITY);this.Yr.forEachInRange([o,a],(c=>{r=r.add(c.Hr)}))})),P.resolve(this.ei(r))}getAllMutationBatchesAffectingQuery(t,e){const r=e.path,s=r.length+1;let o=r;M.isDocumentKey(o)||(o=o.child(""));const a=new bt(new M(o),0);let c=new Et(G);return this.Yr.forEachWhile((h=>{const d=h.key.path;return!!r.isPrefixOf(d)&&(d.length===s&&(c=c.add(h.Hr)),!0)}),a),P.resolve(this.ei(c))}ei(t){const e=[];return t.forEach((r=>{const s=this.Zr(r);s!==null&&e.push(s)})),e}removeMutationBatch(t,e){et(this.ti(e.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Yr;return P.forEach(e.mutations,(s=>{const o=new bt(s.key,e.batchId);return r=r.delete(o),this.referenceDelegate.markPotentiallyOrphaned(t,s.key)})).next((()=>{this.Yr=r}))}rr(t){}containsKey(t,e){const r=new bt(e,0),s=this.Yr.firstAfterOrEqual(r);return P.resolve(e.isEqual(s&&s.key))}performConsistencyCheck(t){return this.mutationQueue.length,P.resolve()}ti(t,e){return this.Xr(t)}Xr(t){return this.mutationQueue.length===0?0:t-this.mutationQueue[0].batchId}Zr(t){const e=this.Xr(t);return e<0||e>=this.mutationQueue.length?null:this.mutationQueue[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rm{constructor(t){this.ni=t,this.docs=(function(){return new ut(M.comparator)})(),this.size=0}setIndexManager(t){this.indexManager=t}addEntry(t,e){const r=e.key,s=this.docs.get(r),o=s?s.size:0,a=this.ni(e);return this.docs=this.docs.insert(r,{document:e.mutableCopy(),size:a}),this.size+=a-o,this.indexManager.addToCollectionParentIndex(t,r.path.popLast())}removeEntry(t){const e=this.docs.get(t);e&&(this.docs=this.docs.remove(t),this.size-=e.size)}getEntry(t,e){const r=this.docs.get(e);return P.resolve(r?r.document.mutableCopy():kt.newInvalidDocument(e))}getEntries(t,e){let r=me();return e.forEach((s=>{const o=this.docs.get(s);r=r.insert(s,o?o.document.mutableCopy():kt.newInvalidDocument(s))})),P.resolve(r)}getDocumentsMatchingQuery(t,e,r,s){let o=me();const a=e.path,c=new M(a.child("__id-9223372036854775808__")),h=this.docs.getIteratorFrom(c);for(;h.hasNext();){const{key:d,value:{document:m}}=h.getNext();if(!a.isPrefixOf(d.path))break;d.path.length>a.length+1||Vd(xd(m),r)<=0||(s.has(m.key)||cs(e,m))&&(o=o.insert(m.key,m.mutableCopy()))}return P.resolve(o)}getAllFromCollectionGroup(t,e,r,s){U(9500)}ri(t,e){return P.forEach(this.docs,(r=>e(r)))}newChangeBuffer(t){return new sm(this)}getSize(t){return P.resolve(this.size)}}class sm extends Yf{constructor(t){super(),this.Or=t}applyChanges(t){const e=[];return this.changes.forEach(((r,s)=>{s.isValidDocument()?e.push(this.Or.addEntry(t,s)):this.Or.removeEntry(r)})),P.waitFor(e)}getFromCache(t,e){return this.Or.getEntry(t,e)}getAllFromCache(t,e){return this.Or.getEntries(t,e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class im{constructor(t){this.persistence=t,this.ii=new Ke((e=>Ii(e)),Ai),this.lastRemoteSnapshotVersion=j.min(),this.highestTargetId=0,this.si=0,this.oi=new Vi,this.targetCount=0,this._i=mn.ar()}forEachTarget(t,e){return this.ii.forEach(((r,s)=>e(s))),P.resolve()}getLastRemoteSnapshotVersion(t){return P.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(t){return P.resolve(this.si)}allocateTargetId(t){return this.highestTargetId=this._i.next(),P.resolve(this.highestTargetId)}setTargetsMetadata(t,e,r){return r&&(this.lastRemoteSnapshotVersion=r),e>this.si&&(this.si=e),P.resolve()}hr(t){this.ii.set(t.target,t);const e=t.targetId;e>this.highestTargetId&&(this._i=new mn(e),this.highestTargetId=e),t.sequenceNumber>this.si&&(this.si=t.sequenceNumber)}addTargetData(t,e){return this.hr(e),this.targetCount+=1,P.resolve()}updateTargetData(t,e){return this.hr(e),P.resolve()}removeTargetData(t,e){return this.ii.delete(e.target),this.oi.zr(e.targetId),this.targetCount-=1,P.resolve()}removeTargets(t,e,r){let s=0;const o=[];return this.ii.forEach(((a,c)=>{c.sequenceNumber<=e&&r.get(c.targetId)===null&&(this.ii.delete(a),o.push(this.removeMatchingKeysForTargetId(t,c.targetId)),s++)})),P.waitFor(o).next((()=>s))}getTargetCount(t){return P.resolve(this.targetCount)}getTargetData(t,e){const r=this.ii.get(e)||null;return P.resolve(r)}addMatchingKeys(t,e,r){return this.oi.Kr(e,r),P.resolve()}removeMatchingKeys(t,e,r){this.oi.Gr(e,r);const s=this.persistence.referenceDelegate,o=[];return s&&e.forEach((a=>{o.push(s.markPotentiallyOrphaned(t,a))})),P.waitFor(o)}removeMatchingKeysForTargetId(t,e){return this.oi.zr(e),P.resolve()}getMatchingKeysForTargetId(t,e){const r=this.oi.Jr(e);return P.resolve(r)}containsKey(t,e){return P.resolve(this.oi.containsKey(e))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bc{constructor(t,e){this.ai={},this.overlays={},this.ui=new is(0),this.ci=!1,this.ci=!0,this.li=new em,this.referenceDelegate=t(this),this.hi=new im(this),this.indexManager=new $f,this.remoteDocumentCache=(function(s){return new rm(s)})((r=>this.referenceDelegate.Pi(r))),this.serializer=new zf(e),this.Ti=new Zf(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ci=!1,Promise.resolve()}get started(){return this.ci}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(t){return this.indexManager}getDocumentOverlayCache(t){let e=this.overlays[t.toKey()];return e||(e=new tm,this.overlays[t.toKey()]=e),e}getMutationQueue(t,e){let r=this.ai[t.toKey()];return r||(r=new nm(e,this.referenceDelegate),this.ai[t.toKey()]=r),r}getGlobalsCache(){return this.li}getTargetCache(){return this.hi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ti}runTransaction(t,e,r){L("MemoryPersistence","Starting transaction:",t);const s=new om(this.ui.next());return this.referenceDelegate.Ii(),r(s).next((o=>this.referenceDelegate.di(s).next((()=>o)))).toPromise().then((o=>(s.raiseOnCommittedEvent(),o)))}Ei(t,e){return P.or(Object.values(this.ai).map((r=>()=>r.containsKey(t,e))))}}class om extends Dd{constructor(t){super(),this.currentSequenceNumber=t}}class ki{constructor(t){this.persistence=t,this.Ai=new Vi,this.Ri=null}static Vi(t){return new ki(t)}get mi(){if(this.Ri)return this.Ri;throw U(60996)}addReference(t,e,r){return this.Ai.addReference(r,e),this.mi.delete(r.toString()),P.resolve()}removeReference(t,e,r){return this.Ai.removeReference(r,e),this.mi.add(r.toString()),P.resolve()}markPotentiallyOrphaned(t,e){return this.mi.add(e.toString()),P.resolve()}removeTarget(t,e){this.Ai.zr(e.targetId).forEach((s=>this.mi.add(s.toString())));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(t,e.targetId).next((s=>{s.forEach((o=>this.mi.add(o.toString())))})).next((()=>r.removeTargetData(t,e)))}Ii(){this.Ri=new Set}di(t){const e=this.persistence.getRemoteDocumentCache().newChangeBuffer();return P.forEach(this.mi,(r=>{const s=M.fromPath(r);return this.fi(t,s).next((o=>{o||e.removeEntry(s,j.min())}))})).next((()=>(this.Ri=null,e.apply(t))))}updateLimboDocument(t,e){return this.fi(t,e).next((r=>{r?this.mi.delete(e.toString()):this.mi.add(e.toString())}))}Pi(t){return 0}fi(t,e){return P.or([()=>P.resolve(this.Ai.containsKey(e)),()=>this.persistence.getTargetCache().containsKey(t,e),()=>this.persistence.Ei(t,e)])}}class Zr{constructor(t,e){this.persistence=t,this.gi=new Ke((r=>Od(r.path)),((r,s)=>r.isEqual(s))),this.garbageCollector=Qf(this,e)}static Vi(t,e){return new Zr(t,e)}Ii(){}di(t){return P.resolve()}forEachTarget(t,e){return this.persistence.getTargetCache().forEachTarget(t,e)}mr(t){const e=this.yr(t);return this.persistence.getTargetCache().getTargetCount(t).next((r=>e.next((s=>r+s))))}yr(t){let e=0;return this.gr(t,(r=>{e++})).next((()=>e))}gr(t,e){return P.forEach(this.gi,((r,s)=>this.Sr(t,r,s).next((o=>o?P.resolve():e(s)))))}removeTargets(t,e,r){return this.persistence.getTargetCache().removeTargets(t,e,r)}removeOrphanedDocuments(t,e){let r=0;const s=this.persistence.getRemoteDocumentCache(),o=s.newChangeBuffer();return s.ri(t,(a=>this.Sr(t,a,e).next((c=>{c||(r++,o.removeEntry(a,j.min()))})))).next((()=>o.apply(t))).next((()=>r))}markPotentiallyOrphaned(t,e){return this.gi.set(e,t.currentSequenceNumber),P.resolve()}removeTarget(t,e){const r=e.withSequenceNumber(t.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(t,r)}addReference(t,e,r){return this.gi.set(r,t.currentSequenceNumber),P.resolve()}removeReference(t,e,r){return this.gi.set(r,t.currentSequenceNumber),P.resolve()}updateLimboDocument(t,e){return this.gi.set(e,t.currentSequenceNumber),P.resolve()}Pi(t){let e=t.key.toString().length;return t.isFoundDocument()&&(e+=Mr(t.data.value)),e}Sr(t,e,r){return P.or([()=>this.persistence.Ei(t,e),()=>this.persistence.getTargetCache().containsKey(t,e),()=>{const s=this.gi.get(e);return P.resolve(s!==void 0&&s>r)}])}getCacheSize(t){return this.persistence.getRemoteDocumentCache().getSize(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Di{constructor(t,e,r,s){this.targetId=t,this.fromCache=e,this.Is=r,this.ds=s}static Es(t,e){let r=H(),s=H();for(const o of e.docChanges)switch(o.type){case 0:r=r.add(o.doc.key);break;case 1:s=s.add(o.doc.key)}return new Di(t,e.fromCache,r,s)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class am{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(t){this._documentReadCount+=t}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lm{constructor(){this.As=!1,this.Rs=!1,this.Vs=100,this.fs=(function(){return Zu()?8:Nd(Ju())>0?6:4})()}initialize(t,e){this.gs=t,this.indexManager=e,this.As=!0}getDocumentsMatchingQuery(t,e,r,s){const o={result:null};return this.ps(t,e).next((a=>{o.result=a})).next((()=>{if(!o.result)return this.ys(t,e,s,r).next((a=>{o.result=a}))})).next((()=>{if(o.result)return;const a=new am;return this.ws(t,e,a).next((c=>{if(o.result=c,this.Rs)return this.Ss(t,e,a,c.size)}))})).next((()=>o.result))}Ss(t,e,r,s){return r.documentReadCount<this.Vs?(tn()<=X.DEBUG&&L("QueryEngine","SDK will not create cache indexes for query:",en(e),"since it only creates cache indexes for collection contains","more than or equal to",this.Vs,"documents"),P.resolve()):(tn()<=X.DEBUG&&L("QueryEngine","Query:",en(e),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.fs*s?(tn()<=X.DEBUG&&L("QueryEngine","The SDK decides to create cache indexes for query:",en(e),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(t,ne(e))):P.resolve())}ps(t,e){if(Ra(e))return P.resolve(null);let r=ne(e);return this.indexManager.getIndexType(t,r).next((s=>s===0?null:(e.limit!==null&&s===1&&(e=ii(e,null,"F"),r=ne(e)),this.indexManager.getDocumentsMatchingTarget(t,r).next((o=>{const a=H(...o);return this.gs.getDocuments(t,a).next((c=>this.indexManager.getMinOffset(t,r).next((h=>{const d=this.bs(e,c);return this.Ds(e,d,a,h.readTime)?this.ps(t,ii(e,null,"F")):this.vs(t,d,e,h)}))))})))))}ys(t,e,r,s){return Ra(e)||s.isEqual(j.min())?P.resolve(null):this.gs.getDocuments(t,r).next((o=>{const a=this.bs(e,o);return this.Ds(e,a,r,s)?P.resolve(null):(tn()<=X.DEBUG&&L("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),en(e)),this.vs(t,a,e,Cd(s,Qn)).next((c=>c)))}))}bs(t,e){let r=new Et(Zl(t));return e.forEach(((s,o)=>{cs(t,o)&&(r=r.add(o))})),r}Ds(t,e,r,s){if(t.limit===null)return!1;if(r.size!==e.size)return!0;const o=t.limitType==="F"?e.last():e.first();return!!o&&(o.hasPendingWrites||o.version.compareTo(s)>0)}ws(t,e,r){return tn()<=X.DEBUG&&L("QueryEngine","Using full collection scan to execute query:",en(e)),this.gs.getDocumentsMatchingQuery(t,e,xe.min(),r)}vs(t,e,r,s){return this.gs.getDocumentsMatchingQuery(t,r,s).next((o=>(e.forEach((a=>{o=o.insert(a.key,a)})),o)))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ni="LocalStore",cm=3e8;class um{constructor(t,e,r,s){this.persistence=t,this.Cs=e,this.serializer=s,this.Fs=new ut(G),this.Ms=new Ke((o=>Ii(o)),Ai),this.xs=new Map,this.Os=t.getRemoteDocumentCache(),this.hi=t.getTargetCache(),this.Ti=t.getBundleCache(),this.Ns(r)}Ns(t){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(t),this.indexManager=this.persistence.getIndexManager(t),this.mutationQueue=this.persistence.getMutationQueue(t,this.indexManager),this.localDocuments=new Xf(this.Os,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Os.setIndexManager(this.indexManager),this.Cs.initialize(this.localDocuments,this.indexManager)}collectGarbage(t){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(e=>t.collect(e,this.Fs)))}}function hm(n,t,e,r){return new um(n,t,e,r)}async function wc(n,t){const e=$(n);return await e.persistence.runTransaction("Handle user change","readonly",(r=>{let s;return e.mutationQueue.getAllMutationBatches(r).next((o=>(s=o,e.Ns(t),e.mutationQueue.getAllMutationBatches(r)))).next((o=>{const a=[],c=[];let h=H();for(const d of s){a.push(d.batchId);for(const m of d.mutations)h=h.add(m.key)}for(const d of o){c.push(d.batchId);for(const m of d.mutations)h=h.add(m.key)}return e.localDocuments.getDocuments(r,h).next((d=>({Bs:d,removedBatchIds:a,addedBatchIds:c})))}))}))}function dm(n,t){const e=$(n);return e.persistence.runTransaction("Acknowledge batch","readwrite-primary",(r=>{const s=t.batch.keys(),o=e.Os.newChangeBuffer({trackRemovals:!0});return(function(c,h,d,m){const y=d.batch,p=y.keys();let S=P.resolve();return p.forEach((C=>{S=S.next((()=>m.getEntry(h,C))).next((N=>{const x=d.docVersions.get(C);et(x!==null,48541),N.version.compareTo(x)<0&&(y.applyToRemoteDocument(N,d),N.isValidDocument()&&(N.setReadTime(d.commitVersion),m.addEntry(N)))}))})),S.next((()=>c.mutationQueue.removeMutationBatch(h,y)))})(e,r,t,o).next((()=>o.apply(r))).next((()=>e.mutationQueue.performConsistencyCheck(r))).next((()=>e.documentOverlayCache.removeOverlaysForBatchId(r,s,t.batch.batchId))).next((()=>e.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,(function(c){let h=H();for(let d=0;d<c.mutationResults.length;++d)c.mutationResults[d].transformResults.length>0&&(h=h.add(c.batch.mutations[d].key));return h})(t)))).next((()=>e.localDocuments.getDocuments(r,s)))}))}function Tc(n){const t=$(n);return t.persistence.runTransaction("Get last remote snapshot version","readonly",(e=>t.hi.getLastRemoteSnapshotVersion(e)))}function fm(n,t){const e=$(n),r=t.snapshotVersion;let s=e.Fs;return e.persistence.runTransaction("Apply remote event","readwrite-primary",(o=>{const a=e.Os.newChangeBuffer({trackRemovals:!0});s=e.Fs;const c=[];t.targetChanges.forEach(((m,y)=>{const p=s.get(y);if(!p)return;c.push(e.hi.removeMatchingKeys(o,m.removedDocuments,y).next((()=>e.hi.addMatchingKeys(o,m.addedDocuments,y))));let S=p.withSequenceNumber(o.currentSequenceNumber);t.targetMismatches.get(y)!==null?S=S.withResumeToken(St.EMPTY_BYTE_STRING,j.min()).withLastLimboFreeSnapshotVersion(j.min()):m.resumeToken.approximateByteSize()>0&&(S=S.withResumeToken(m.resumeToken,r)),s=s.insert(y,S),(function(N,x,K){return N.resumeToken.approximateByteSize()===0||x.snapshotVersion.toMicroseconds()-N.snapshotVersion.toMicroseconds()>=cm?!0:K.addedDocuments.size+K.modifiedDocuments.size+K.removedDocuments.size>0})(p,S,m)&&c.push(e.hi.updateTargetData(o,S))}));let h=me(),d=H();if(t.documentUpdates.forEach((m=>{t.resolvedLimboDocuments.has(m)&&c.push(e.persistence.referenceDelegate.updateLimboDocument(o,m))})),c.push(mm(o,a,t.documentUpdates).next((m=>{h=m.Ls,d=m.ks}))),!r.isEqual(j.min())){const m=e.hi.getLastRemoteSnapshotVersion(o).next((y=>e.hi.setTargetsMetadata(o,o.currentSequenceNumber,r)));c.push(m)}return P.waitFor(c).next((()=>a.apply(o))).next((()=>e.localDocuments.getLocalViewOfDocuments(o,h,d))).next((()=>h))})).then((o=>(e.Fs=s,o)))}function mm(n,t,e){let r=H(),s=H();return e.forEach((o=>r=r.add(o))),t.getEntries(n,r).next((o=>{let a=me();return e.forEach(((c,h)=>{const d=o.get(c);h.isFoundDocument()!==d.isFoundDocument()&&(s=s.add(c)),h.isNoDocument()&&h.version.isEqual(j.min())?(t.removeEntry(c,h.readTime),a=a.insert(c,h)):!d.isValidDocument()||h.version.compareTo(d.version)>0||h.version.compareTo(d.version)===0&&d.hasPendingWrites?(t.addEntry(h),a=a.insert(c,h)):L(Ni,"Ignoring outdated watch update for ",c,". Current version:",d.version," Watch version:",h.version)})),{Ls:a,ks:s}}))}function pm(n,t){const e=$(n);return e.persistence.runTransaction("Get next mutation batch","readonly",(r=>(t===void 0&&(t=bi),e.mutationQueue.getNextMutationBatchAfterBatchId(r,t))))}function gm(n,t){const e=$(n);return e.persistence.runTransaction("Allocate target","readwrite",(r=>{let s;return e.hi.getTargetData(r,t).next((o=>o?(s=o,P.resolve(s)):e.hi.allocateTargetId(r).next((a=>(s=new Te(t,a,"TargetPurposeListen",r.currentSequenceNumber),e.hi.addTargetData(r,s).next((()=>s)))))))})).then((r=>{const s=e.Fs.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(e.Fs=e.Fs.insert(r.targetId,r),e.Ms.set(t,r.targetId)),r}))}async function ui(n,t,e){const r=$(n),s=r.Fs.get(t),o=e?"readwrite":"readwrite-primary";try{e||await r.persistence.runTransaction("Release target",o,(a=>r.persistence.referenceDelegate.removeTarget(a,s)))}catch(a){if(!_n(a))throw a;L(Ni,`Failed to update sequence numbers for target ${t}: ${a}`)}r.Fs=r.Fs.remove(t),r.Ms.delete(s.target)}function Ua(n,t,e){const r=$(n);let s=j.min(),o=H();return r.persistence.runTransaction("Execute query","readwrite",(a=>(function(h,d,m){const y=$(h),p=y.Ms.get(m);return p!==void 0?P.resolve(y.Fs.get(p)):y.hi.getTargetData(d,m)})(r,a,ne(t)).next((c=>{if(c)return s=c.lastLimboFreeSnapshotVersion,r.hi.getMatchingKeysForTargetId(a,c.targetId).next((h=>{o=h}))})).next((()=>r.Cs.getDocumentsMatchingQuery(a,t,e?s:j.min(),e?o:H()))).next((c=>(ym(r,ef(t),c),{documents:c,qs:o})))))}function ym(n,t,e){let r=n.xs.get(t)||j.min();e.forEach(((s,o)=>{o.readTime.compareTo(r)>0&&(r=o.readTime)})),n.xs.set(t,r)}class za{constructor(){this.activeTargetIds=lf()}Gs(t){this.activeTargetIds=this.activeTargetIds.add(t)}zs(t){this.activeTargetIds=this.activeTargetIds.delete(t)}Ws(){const t={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(t)}}class vm{constructor(){this.Fo=new za,this.Mo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(t){}updateMutationState(t,e,r){}addLocalQueryTarget(t,e=!0){return e&&this.Fo.Gs(t),this.Mo[t]||"not-current"}updateQueryState(t,e,r){this.Mo[t]=e}removeLocalQueryTarget(t){this.Fo.zs(t)}isLocalQueryTarget(t){return this.Fo.activeTargetIds.has(t)}clearQueryState(t){delete this.Mo[t]}getAllActiveQueryTargets(){return this.Fo.activeTargetIds}isActiveQueryTarget(t){return this.Fo.activeTargetIds.has(t)}start(){return this.Fo=new za,Promise.resolve()}handleUserChange(t,e,r){}setOnlineState(t){}shutdown(){}writeSequenceNumber(t){}notifyBundleLoaded(t){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _m{xo(t){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ja="ConnectivityMonitor";class $a{constructor(){this.Oo=()=>this.No(),this.Bo=()=>this.Lo(),this.ko=[],this.qo()}xo(t){this.ko.push(t)}shutdown(){window.removeEventListener("online",this.Oo),window.removeEventListener("offline",this.Bo)}qo(){window.addEventListener("online",this.Oo),window.addEventListener("offline",this.Bo)}No(){L(ja,"Network connectivity changed: AVAILABLE");for(const t of this.ko)t(0)}Lo(){L(ja,"Network connectivity changed: UNAVAILABLE");for(const t of this.ko)t(1)}static C(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let kr=null;function hi(){return kr===null?kr=(function(){return 268435456+Math.round(2147483648*Math.random())})():kr++,"0x"+kr.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qs="RestConnection",Em={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class bm{get Qo(){return!1}constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const e=t.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.$o=e+"://"+t.host,this.Uo=`projects/${r}/databases/${s}`,this.Ko=this.databaseId.database===Kr?`project_id=${r}`:`project_id=${r}&database_id=${s}`}Wo(t,e,r,s,o){const a=hi(),c=this.Go(t,e.toUriEncodedString());L(qs,`Sending RPC '${t}' ${a}:`,c,r);const h={"google-cloud-resource-prefix":this.Uo,"x-goog-request-params":this.Ko};this.zo(h,s,o);const{host:d}=new URL(c),m=yi(d);return this.jo(t,c,h,r,m).then((y=>(L(qs,`Received RPC '${t}' ${a}: `,y),y)),(y=>{throw Ce(qs,`RPC '${t}' ${a} failed with error: `,y,"url: ",c,"request:",r),y}))}Jo(t,e,r,s,o,a){return this.Wo(t,e,r,s,o)}zo(t,e,r){t["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+yn})(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),e&&e.headers.forEach(((s,o)=>t[o]=s)),r&&r.headers.forEach(((s,o)=>t[o]=s))}Go(t,e){const r=Em[t];return`${this.$o}/v1/${e}:${r}`}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wm{constructor(t){this.Ho=t.Ho,this.Yo=t.Yo}Zo(t){this.Xo=t}e_(t){this.t_=t}n_(t){this.r_=t}onMessage(t){this.i_=t}close(){this.Yo()}send(t){this.Ho(t)}s_(){this.Xo()}o_(){this.t_()}__(t){this.r_(t)}a_(t){this.i_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xt="WebChannelConnection";class Tm extends bm{constructor(t){super(t),this.u_=[],this.forceLongPolling=t.forceLongPolling,this.autoDetectLongPolling=t.autoDetectLongPolling,this.useFetchStreams=t.useFetchStreams,this.longPollingOptions=t.longPollingOptions}jo(t,e,r,s,o){const a=hi();return new Promise(((c,h)=>{const d=new Il;d.setWithCredentials(!0),d.listenOnce(Al.COMPLETE,(()=>{try{switch(d.getLastErrorCode()){case Or.NO_ERROR:const y=d.getResponseJson();L(xt,`XHR for RPC '${t}' ${a} received:`,JSON.stringify(y)),c(y);break;case Or.TIMEOUT:L(xt,`RPC '${t}' ${a} timed out`),h(new O(R.DEADLINE_EXCEEDED,"Request time out"));break;case Or.HTTP_ERROR:const p=d.getStatus();if(L(xt,`RPC '${t}' ${a} failed with status:`,p,"response text:",d.getResponseText()),p>0){let S=d.getResponseJson();Array.isArray(S)&&(S=S[0]);const C=S==null?void 0:S.error;if(C&&C.status&&C.message){const N=(function(K){const z=K.toLowerCase().replace(/_/g,"-");return Object.values(R).indexOf(z)>=0?z:R.UNKNOWN})(C.status);h(new O(N,C.message))}else h(new O(R.UNKNOWN,"Server responded with status "+d.getStatus()))}else h(new O(R.UNAVAILABLE,"Connection failed."));break;default:U(9055,{c_:t,streamId:a,l_:d.getLastErrorCode(),h_:d.getLastError()})}}finally{L(xt,`RPC '${t}' ${a} completed.`)}}));const m=JSON.stringify(s);L(xt,`RPC '${t}' ${a} sending request:`,s),d.send(e,"POST",m,r,15)}))}P_(t,e,r){const s=hi(),o=[this.$o,"/","google.firestore.v1.Firestore","/",t,"/channel"],a=Pl(),c=Rl(),h={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},d=this.longPollingOptions.timeoutSeconds;d!==void 0&&(h.longPollingTimeout=Math.round(1e3*d)),this.useFetchStreams&&(h.useFetchStreams=!0),this.zo(h.initMessageHeaders,e,r),h.encodeInitMessageHeaders=!0;const m=o.join("");L(xt,`Creating RPC '${t}' stream ${s}: ${m}`,h);const y=a.createWebChannel(m,h);this.T_(y);let p=!1,S=!1;const C=new wm({Ho:x=>{S?L(xt,`Not sending because RPC '${t}' stream ${s} is closed:`,x):(p||(L(xt,`Opening RPC '${t}' stream ${s} transport.`),y.open(),p=!0),L(xt,`RPC '${t}' stream ${s} sending:`,x),y.send(x))},Yo:()=>y.close()}),N=(x,K,z)=>{x.listen(K,(B=>{try{z(B)}catch(W){setTimeout((()=>{throw W}),0)}}))};return N(y,Fn.EventType.OPEN,(()=>{S||(L(xt,`RPC '${t}' stream ${s} transport opened.`),C.s_())})),N(y,Fn.EventType.CLOSE,(()=>{S||(S=!0,L(xt,`RPC '${t}' stream ${s} transport closed`),C.__(),this.I_(y))})),N(y,Fn.EventType.ERROR,(x=>{S||(S=!0,Ce(xt,`RPC '${t}' stream ${s} transport errored. Name:`,x.name,"Message:",x.message),C.__(new O(R.UNAVAILABLE,"The operation could not be completed")))})),N(y,Fn.EventType.MESSAGE,(x=>{var K;if(!S){const z=x.data[0];et(!!z,16349);const B=z,W=(B==null?void 0:B.error)||((K=B[0])===null||K===void 0?void 0:K.error);if(W){L(xt,`RPC '${t}' stream ${s} received error:`,W);const Q=W.status;let ht=(function(v){const E=pt[v];if(E!==void 0)return uc(E)})(Q),w=W.message;ht===void 0&&(ht=R.INTERNAL,w="Unknown error status: "+Q+" with message "+W.message),S=!0,C.__(new O(ht,w)),y.close()}else L(xt,`RPC '${t}' stream ${s} received:`,z),C.a_(z)}})),N(c,Sl.STAT_EVENT,(x=>{x.stat===Xs.PROXY?L(xt,`RPC '${t}' stream ${s} detected buffering proxy`):x.stat===Xs.NOPROXY&&L(xt,`RPC '${t}' stream ${s} detected no buffering proxy`)})),setTimeout((()=>{C.o_()}),0),C}terminate(){this.u_.forEach((t=>t.close())),this.u_=[]}T_(t){this.u_.push(t)}I_(t){this.u_=this.u_.filter((e=>e===t))}}function Gs(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fs(n){return new Rf(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ic{constructor(t,e,r=1e3,s=1.5,o=6e4){this.Fi=t,this.timerId=e,this.d_=r,this.E_=s,this.A_=o,this.R_=0,this.V_=null,this.m_=Date.now(),this.reset()}reset(){this.R_=0}f_(){this.R_=this.A_}g_(t){this.cancel();const e=Math.floor(this.R_+this.p_()),r=Math.max(0,Date.now()-this.m_),s=Math.max(0,e-r);s>0&&L("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.R_} ms, delay with jitter: ${e} ms, last attempt: ${r} ms ago)`),this.V_=this.Fi.enqueueAfterDelay(this.timerId,s,(()=>(this.m_=Date.now(),t()))),this.R_*=this.E_,this.R_<this.d_&&(this.R_=this.d_),this.R_>this.A_&&(this.R_=this.A_)}y_(){this.V_!==null&&(this.V_.skipDelay(),this.V_=null)}cancel(){this.V_!==null&&(this.V_.cancel(),this.V_=null)}p_(){return(Math.random()-.5)*this.R_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qa="PersistentStream";class Ac{constructor(t,e,r,s,o,a,c,h){this.Fi=t,this.w_=r,this.S_=s,this.connection=o,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=c,this.listener=h,this.state=0,this.b_=0,this.D_=null,this.v_=null,this.stream=null,this.C_=0,this.F_=new Ic(t,e)}M_(){return this.state===1||this.state===5||this.x_()}x_(){return this.state===2||this.state===3}start(){this.C_=0,this.state!==4?this.auth():this.O_()}async stop(){this.M_()&&await this.close(0)}N_(){this.state=0,this.F_.reset()}B_(){this.x_()&&this.D_===null&&(this.D_=this.Fi.enqueueAfterDelay(this.w_,6e4,(()=>this.L_())))}k_(t){this.q_(),this.stream.send(t)}async L_(){if(this.x_())return this.close(0)}q_(){this.D_&&(this.D_.cancel(),this.D_=null)}Q_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(t,e){this.q_(),this.Q_(),this.F_.cancel(),this.b_++,t!==4?this.F_.reset():e&&e.code===R.RESOURCE_EXHAUSTED?(de(e.toString()),de("Using maximum backoff delay to prevent overloading the backend."),this.F_.f_()):e&&e.code===R.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.U_(),this.stream.close(),this.stream=null),this.state=t,await this.listener.n_(e)}U_(){}auth(){this.state=1;const t=this.K_(this.b_),e=this.b_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([r,s])=>{this.b_===e&&this.W_(r,s)}),(r=>{t((()=>{const s=new O(R.UNKNOWN,"Fetching auth token failed: "+r.message);return this.G_(s)}))}))}W_(t,e){const r=this.K_(this.b_);this.stream=this.z_(t,e),this.stream.Zo((()=>{r((()=>this.listener.Zo()))})),this.stream.e_((()=>{r((()=>(this.state=2,this.v_=this.Fi.enqueueAfterDelay(this.S_,1e4,(()=>(this.x_()&&(this.state=3),Promise.resolve()))),this.listener.e_())))})),this.stream.n_((s=>{r((()=>this.G_(s)))})),this.stream.onMessage((s=>{r((()=>++this.C_==1?this.j_(s):this.onNext(s)))}))}O_(){this.state=5,this.F_.g_((async()=>{this.state=0,this.start()}))}G_(t){return L(qa,`close with error: ${t}`),this.stream=null,this.close(4,t)}K_(t){return e=>{this.Fi.enqueueAndForget((()=>this.b_===t?e():(L(qa,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class Im extends Ac{constructor(t,e,r,s,o,a){super(t,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",e,r,s,a),this.serializer=o}z_(t,e){return this.connection.P_("Listen",t,e)}j_(t){return this.onNext(t)}onNext(t){this.F_.reset();const e=xf(this.serializer,t),r=(function(o){if(!("targetChange"in o))return j.min();const a=o.targetChange;return a.targetIds&&a.targetIds.length?j.min():a.readTime?re(a.readTime):j.min()})(t);return this.listener.J_(e,r)}H_(t){const e={};e.database=ci(this.serializer),e.addTarget=(function(o,a){let c;const h=a.target;if(c=ri(h)?{documents:Df(o,h)}:{query:Nf(o,h).Vt},c.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){c.resumeToken=fc(o,a.resumeToken);const d=oi(o,a.expectedCount);d!==null&&(c.expectedCount=d)}else if(a.snapshotVersion.compareTo(j.min())>0){c.readTime=Xr(o,a.snapshotVersion.toTimestamp());const d=oi(o,a.expectedCount);d!==null&&(c.expectedCount=d)}return c})(this.serializer,t);const r=Of(this.serializer,t);r&&(e.labels=r),this.k_(e)}Y_(t){const e={};e.database=ci(this.serializer),e.removeTarget=t,this.k_(e)}}class Am extends Ac{constructor(t,e,r,s,o,a){super(t,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",e,r,s,a),this.serializer=o}get Z_(){return this.C_>0}start(){this.lastStreamToken=void 0,super.start()}U_(){this.Z_&&this.X_([])}z_(t,e){return this.connection.P_("Write",t,e)}j_(t){return et(!!t.streamToken,31322),this.lastStreamToken=t.streamToken,et(!t.writeResults||t.writeResults.length===0,55816),this.listener.ea()}onNext(t){et(!!t.streamToken,12678),this.lastStreamToken=t.streamToken,this.F_.reset();const e=kf(t.writeResults,t.commitTime),r=re(t.commitTime);return this.listener.ta(r,e)}na(){const t={};t.database=ci(this.serializer),this.k_(t)}X_(t){const e={streamToken:this.lastStreamToken,writes:t.map((r=>Vf(this.serializer,r)))};this.k_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sm{}class Rm extends Sm{constructor(t,e,r,s){super(),this.authCredentials=t,this.appCheckCredentials=e,this.connection=r,this.serializer=s,this.ra=!1}ia(){if(this.ra)throw new O(R.FAILED_PRECONDITION,"The client has already been terminated.")}Wo(t,e,r,s){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([o,a])=>this.connection.Wo(t,ai(e,r),s,o,a))).catch((o=>{throw o.name==="FirebaseError"?(o.code===R.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new O(R.UNKNOWN,o.toString())}))}Jo(t,e,r,s,o){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([a,c])=>this.connection.Jo(t,ai(e,r),s,a,c,o))).catch((a=>{throw a.name==="FirebaseError"?(a.code===R.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new O(R.UNKNOWN,a.toString())}))}terminate(){this.ra=!0,this.connection.terminate()}}class Pm{constructor(t,e){this.asyncQueue=t,this.onlineStateHandler=e,this.state="Unknown",this.sa=0,this.oa=null,this._a=!0}aa(){this.sa===0&&(this.ua("Unknown"),this.oa=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this.oa=null,this.ca("Backend didn't respond within 10 seconds."),this.ua("Offline"),Promise.resolve()))))}la(t){this.state==="Online"?this.ua("Unknown"):(this.sa++,this.sa>=1&&(this.ha(),this.ca(`Connection failed 1 times. Most recent error: ${t.toString()}`),this.ua("Offline")))}set(t){this.ha(),this.sa=0,t==="Online"&&(this._a=!1),this.ua(t)}ua(t){t!==this.state&&(this.state=t,this.onlineStateHandler(t))}ca(t){const e=`Could not reach Cloud Firestore backend. ${t}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this._a?(de(e),this._a=!1):L("OnlineStateTracker",e)}ha(){this.oa!==null&&(this.oa.cancel(),this.oa=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ge="RemoteStore";class Cm{constructor(t,e,r,s,o){this.localStore=t,this.datastore=e,this.asyncQueue=r,this.remoteSyncer={},this.Pa=[],this.Ta=new Map,this.Ia=new Set,this.da=[],this.Ea=o,this.Ea.xo((a=>{r.enqueueAndForget((async()=>{We(this)&&(L(Ge,"Restarting streams for network reachability change."),await(async function(h){const d=$(h);d.Ia.add(4),await or(d),d.Aa.set("Unknown"),d.Ia.delete(4),await ms(d)})(this))}))})),this.Aa=new Pm(r,s)}}async function ms(n){if(We(n))for(const t of n.da)await t(!0)}async function or(n){for(const t of n.da)await t(!1)}function Sc(n,t){const e=$(n);e.Ta.has(t.targetId)||(e.Ta.set(t.targetId,t),Fi(e)?Mi(e):En(e).x_()&&Oi(e,t))}function Li(n,t){const e=$(n),r=En(e);e.Ta.delete(t),r.x_()&&Rc(e,t),e.Ta.size===0&&(r.x_()?r.B_():We(e)&&e.Aa.set("Unknown"))}function Oi(n,t){if(n.Ra.$e(t.targetId),t.resumeToken.approximateByteSize()>0||t.snapshotVersion.compareTo(j.min())>0){const e=n.remoteSyncer.getRemoteKeysForTarget(t.targetId).size;t=t.withExpectedCount(e)}En(n).H_(t)}function Rc(n,t){n.Ra.$e(t),En(n).Y_(t)}function Mi(n){n.Ra=new Tf({getRemoteKeysForTarget:t=>n.remoteSyncer.getRemoteKeysForTarget(t),Et:t=>n.Ta.get(t)||null,lt:()=>n.datastore.serializer.databaseId}),En(n).start(),n.Aa.aa()}function Fi(n){return We(n)&&!En(n).M_()&&n.Ta.size>0}function We(n){return $(n).Ia.size===0}function Pc(n){n.Ra=void 0}async function xm(n){n.Aa.set("Online")}async function Vm(n){n.Ta.forEach(((t,e)=>{Oi(n,t)}))}async function km(n,t){Pc(n),Fi(n)?(n.Aa.la(t),Mi(n)):n.Aa.set("Unknown")}async function Dm(n,t,e){if(n.Aa.set("Online"),t instanceof dc&&t.state===2&&t.cause)try{await(async function(s,o){const a=o.cause;for(const c of o.targetIds)s.Ta.has(c)&&(await s.remoteSyncer.rejectListen(c,a),s.Ta.delete(c),s.Ra.removeTarget(c))})(n,t)}catch(r){L(Ge,"Failed to remove targets %s: %s ",t.targetIds.join(","),r),await ts(n,r)}else if(t instanceof Ur?n.Ra.Ye(t):t instanceof hc?n.Ra.it(t):n.Ra.et(t),!e.isEqual(j.min()))try{const r=await Tc(n.localStore);e.compareTo(r)>=0&&await(function(o,a){const c=o.Ra.Pt(a);return c.targetChanges.forEach(((h,d)=>{if(h.resumeToken.approximateByteSize()>0){const m=o.Ta.get(d);m&&o.Ta.set(d,m.withResumeToken(h.resumeToken,a))}})),c.targetMismatches.forEach(((h,d)=>{const m=o.Ta.get(h);if(!m)return;o.Ta.set(h,m.withResumeToken(St.EMPTY_BYTE_STRING,m.snapshotVersion)),Rc(o,h);const y=new Te(m.target,h,d,m.sequenceNumber);Oi(o,y)})),o.remoteSyncer.applyRemoteEvent(c)})(n,e)}catch(r){L(Ge,"Failed to raise snapshot:",r),await ts(n,r)}}async function ts(n,t,e){if(!_n(t))throw t;n.Ia.add(1),await or(n),n.Aa.set("Offline"),e||(e=()=>Tc(n.localStore)),n.asyncQueue.enqueueRetryable((async()=>{L(Ge,"Retrying IndexedDB access"),await e(),n.Ia.delete(1),await ms(n)}))}function Cc(n,t){return t().catch((e=>ts(n,e,t)))}async function ps(n){const t=$(n),e=Ne(t);let r=t.Pa.length>0?t.Pa[t.Pa.length-1].batchId:bi;for(;Nm(t);)try{const s=await pm(t.localStore,r);if(s===null){t.Pa.length===0&&e.B_();break}r=s.batchId,Lm(t,s)}catch(s){await ts(t,s)}xc(t)&&Vc(t)}function Nm(n){return We(n)&&n.Pa.length<10}function Lm(n,t){n.Pa.push(t);const e=Ne(n);e.x_()&&e.Z_&&e.X_(t.mutations)}function xc(n){return We(n)&&!Ne(n).M_()&&n.Pa.length>0}function Vc(n){Ne(n).start()}async function Om(n){Ne(n).na()}async function Mm(n){const t=Ne(n);for(const e of n.Pa)t.X_(e.mutations)}async function Fm(n,t,e){const r=n.Pa.shift(),s=Pi.from(r,t,e);await Cc(n,(()=>n.remoteSyncer.applySuccessfulWrite(s))),await ps(n)}async function Bm(n,t){t&&Ne(n).Z_&&await(async function(r,s){if((function(a){return bf(a)&&a!==R.ABORTED})(s.code)){const o=r.Pa.shift();Ne(r).N_(),await Cc(r,(()=>r.remoteSyncer.rejectFailedWrite(o.batchId,s))),await ps(r)}})(n,t),xc(n)&&Vc(n)}async function Ga(n,t){const e=$(n);e.asyncQueue.verifyOperationInProgress(),L(Ge,"RemoteStore received new credentials");const r=We(e);e.Ia.add(3),await or(e),r&&e.Aa.set("Unknown"),await e.remoteSyncer.handleCredentialChange(t),e.Ia.delete(3),await ms(e)}async function Um(n,t){const e=$(n);t?(e.Ia.delete(2),await ms(e)):t||(e.Ia.add(2),await or(e),e.Aa.set("Unknown"))}function En(n){return n.Va||(n.Va=(function(e,r,s){const o=$(e);return o.ia(),new Im(r,o.connection,o.authCredentials,o.appCheckCredentials,o.serializer,s)})(n.datastore,n.asyncQueue,{Zo:xm.bind(null,n),e_:Vm.bind(null,n),n_:km.bind(null,n),J_:Dm.bind(null,n)}),n.da.push((async t=>{t?(n.Va.N_(),Fi(n)?Mi(n):n.Aa.set("Unknown")):(await n.Va.stop(),Pc(n))}))),n.Va}function Ne(n){return n.ma||(n.ma=(function(e,r,s){const o=$(e);return o.ia(),new Am(r,o.connection,o.authCredentials,o.appCheckCredentials,o.serializer,s)})(n.datastore,n.asyncQueue,{Zo:()=>Promise.resolve(),e_:Om.bind(null,n),n_:Bm.bind(null,n),ea:Mm.bind(null,n),ta:Fm.bind(null,n)}),n.da.push((async t=>{t?(n.ma.N_(),await ps(n)):(await n.ma.stop(),n.Pa.length>0&&(L(Ge,`Stopping write stream with ${n.Pa.length} pending writes`),n.Pa=[]))}))),n.ma}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bi{constructor(t,e,r,s,o){this.asyncQueue=t,this.timerId=e,this.targetTimeMs=r,this.op=s,this.removalCallback=o,this.deferred=new Re,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((a=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(t,e,r,s,o){const a=Date.now()+r,c=new Bi(t,e,a,s,o);return c.start(r),c}start(t){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),t)}skipDelay(){return this.handleDelayElapsed()}cancel(t){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new O(R.CANCELLED,"Operation cancelled"+(t?": "+t:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((t=>this.deferred.resolve(t)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Ui(n,t){if(de("AsyncQueue",`${t}: ${n}`),_n(n))return new O(R.UNAVAILABLE,`${t}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ln{static emptySet(t){return new ln(t.comparator)}constructor(t){this.comparator=t?(e,r)=>t(e,r)||M.comparator(e.key,r.key):(e,r)=>M.comparator(e.key,r.key),this.keyedMap=Bn(),this.sortedSet=new ut(this.comparator)}has(t){return this.keyedMap.get(t)!=null}get(t){return this.keyedMap.get(t)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(t){const e=this.keyedMap.get(t);return e?this.sortedSet.indexOf(e):-1}get size(){return this.sortedSet.size}forEach(t){this.sortedSet.inorderTraversal(((e,r)=>(t(e),!1)))}add(t){const e=this.delete(t.key);return e.copy(e.keyedMap.insert(t.key,t),e.sortedSet.insert(t,null))}delete(t){const e=this.get(t);return e?this.copy(this.keyedMap.remove(t),this.sortedSet.remove(e)):this}isEqual(t){if(!(t instanceof ln)||this.size!==t.size)return!1;const e=this.sortedSet.getIterator(),r=t.sortedSet.getIterator();for(;e.hasNext();){const s=e.getNext().key,o=r.getNext().key;if(!s.isEqual(o))return!1}return!0}toString(){const t=[];return this.forEach((e=>{t.push(e.toString())})),t.length===0?"DocumentSet ()":`DocumentSet (
  `+t.join(`  
`)+`
)`}copy(t,e){const r=new ln;return r.comparator=this.comparator,r.keyedMap=t,r.sortedSet=e,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ha{constructor(){this.fa=new ut(M.comparator)}track(t){const e=t.doc.key,r=this.fa.get(e);r?t.type!==0&&r.type===3?this.fa=this.fa.insert(e,t):t.type===3&&r.type!==1?this.fa=this.fa.insert(e,{type:r.type,doc:t.doc}):t.type===2&&r.type===2?this.fa=this.fa.insert(e,{type:2,doc:t.doc}):t.type===2&&r.type===0?this.fa=this.fa.insert(e,{type:0,doc:t.doc}):t.type===1&&r.type===0?this.fa=this.fa.remove(e):t.type===1&&r.type===2?this.fa=this.fa.insert(e,{type:1,doc:r.doc}):t.type===0&&r.type===1?this.fa=this.fa.insert(e,{type:2,doc:t.doc}):U(63341,{At:t,ga:r}):this.fa=this.fa.insert(e,t)}pa(){const t=[];return this.fa.inorderTraversal(((e,r)=>{t.push(r)})),t}}class pn{constructor(t,e,r,s,o,a,c,h,d){this.query=t,this.docs=e,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=o,this.fromCache=a,this.syncStateChanged=c,this.excludesMetadataChanges=h,this.hasCachedResults=d}static fromInitialDocuments(t,e,r,s,o){const a=[];return e.forEach((c=>{a.push({type:0,doc:c})})),new pn(t,e,ln.emptySet(e),a,r,s,!0,!1,o)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(t){if(!(this.fromCache===t.fromCache&&this.hasCachedResults===t.hasCachedResults&&this.syncStateChanged===t.syncStateChanged&&this.mutatedKeys.isEqual(t.mutatedKeys)&&ls(this.query,t.query)&&this.docs.isEqual(t.docs)&&this.oldDocs.isEqual(t.oldDocs)))return!1;const e=this.docChanges,r=t.docChanges;if(e.length!==r.length)return!1;for(let s=0;s<e.length;s++)if(e[s].type!==r[s].type||!e[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zm{constructor(){this.ya=void 0,this.wa=[]}Sa(){return this.wa.some((t=>t.ba()))}}class jm{constructor(){this.queries=Ka(),this.onlineState="Unknown",this.Da=new Set}terminate(){(function(e,r){const s=$(e),o=s.queries;s.queries=Ka(),o.forEach(((a,c)=>{for(const h of c.wa)h.onError(r)}))})(this,new O(R.ABORTED,"Firestore shutting down"))}}function Ka(){return new Ke((n=>Xl(n)),ls)}async function $m(n,t){const e=$(n);let r=3;const s=t.query;let o=e.queries.get(s);o?!o.Sa()&&t.ba()&&(r=2):(o=new zm,r=t.ba()?0:1);try{switch(r){case 0:o.ya=await e.onListen(s,!0);break;case 1:o.ya=await e.onListen(s,!1);break;case 2:await e.onFirstRemoteStoreListen(s)}}catch(a){const c=Ui(a,`Initialization of query '${en(t.query)}' failed`);return void t.onError(c)}e.queries.set(s,o),o.wa.push(t),t.va(e.onlineState),o.ya&&t.Ca(o.ya)&&zi(e)}async function qm(n,t){const e=$(n),r=t.query;let s=3;const o=e.queries.get(r);if(o){const a=o.wa.indexOf(t);a>=0&&(o.wa.splice(a,1),o.wa.length===0?s=t.ba()?0:1:!o.Sa()&&t.ba()&&(s=2))}switch(s){case 0:return e.queries.delete(r),e.onUnlisten(r,!0);case 1:return e.queries.delete(r),e.onUnlisten(r,!1);case 2:return e.onLastRemoteStoreUnlisten(r);default:return}}function Gm(n,t){const e=$(n);let r=!1;for(const s of t){const o=s.query,a=e.queries.get(o);if(a){for(const c of a.wa)c.Ca(s)&&(r=!0);a.ya=s}}r&&zi(e)}function Hm(n,t,e){const r=$(n),s=r.queries.get(t);if(s)for(const o of s.wa)o.onError(e);r.queries.delete(t)}function zi(n){n.Da.forEach((t=>{t.next()}))}var di,Wa;(Wa=di||(di={})).Fa="default",Wa.Cache="cache";class Km{constructor(t,e,r){this.query=t,this.Ma=e,this.xa=!1,this.Oa=null,this.onlineState="Unknown",this.options=r||{}}Ca(t){if(!this.options.includeMetadataChanges){const r=[];for(const s of t.docChanges)s.type!==3&&r.push(s);t=new pn(t.query,t.docs,t.oldDocs,r,t.mutatedKeys,t.fromCache,t.syncStateChanged,!0,t.hasCachedResults)}let e=!1;return this.xa?this.Na(t)&&(this.Ma.next(t),e=!0):this.Ba(t,this.onlineState)&&(this.La(t),e=!0),this.Oa=t,e}onError(t){this.Ma.error(t)}va(t){this.onlineState=t;let e=!1;return this.Oa&&!this.xa&&this.Ba(this.Oa,t)&&(this.La(this.Oa),e=!0),e}Ba(t,e){if(!t.fromCache||!this.ba())return!0;const r=e!=="Offline";return(!this.options.ka||!r)&&(!t.docs.isEmpty()||t.hasCachedResults||e==="Offline")}Na(t){if(t.docChanges.length>0)return!0;const e=this.Oa&&this.Oa.hasPendingWrites!==t.hasPendingWrites;return!(!t.syncStateChanged&&!e)&&this.options.includeMetadataChanges===!0}La(t){t=pn.fromInitialDocuments(t.query,t.docs,t.mutatedKeys,t.fromCache,t.hasCachedResults),this.xa=!0,this.Ma.next(t)}ba(){return this.options.source!==di.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kc{constructor(t){this.key=t}}class Dc{constructor(t){this.key=t}}class Wm{constructor(t,e){this.query=t,this.Ha=e,this.Ya=null,this.hasCachedResults=!1,this.current=!1,this.Za=H(),this.mutatedKeys=H(),this.Xa=Zl(t),this.eu=new ln(this.Xa)}get tu(){return this.Ha}nu(t,e){const r=e?e.ru:new Ha,s=e?e.eu:this.eu;let o=e?e.mutatedKeys:this.mutatedKeys,a=s,c=!1;const h=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,d=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(t.inorderTraversal(((m,y)=>{const p=s.get(m),S=cs(this.query,y)?y:null,C=!!p&&this.mutatedKeys.has(p.key),N=!!S&&(S.hasLocalMutations||this.mutatedKeys.has(S.key)&&S.hasCommittedMutations);let x=!1;p&&S?p.data.isEqual(S.data)?C!==N&&(r.track({type:3,doc:S}),x=!0):this.iu(p,S)||(r.track({type:2,doc:S}),x=!0,(h&&this.Xa(S,h)>0||d&&this.Xa(S,d)<0)&&(c=!0)):!p&&S?(r.track({type:0,doc:S}),x=!0):p&&!S&&(r.track({type:1,doc:p}),x=!0,(h||d)&&(c=!0)),x&&(S?(a=a.add(S),o=N?o.add(m):o.delete(m)):(a=a.delete(m),o=o.delete(m)))})),this.query.limit!==null)for(;a.size>this.query.limit;){const m=this.query.limitType==="F"?a.last():a.first();a=a.delete(m.key),o=o.delete(m.key),r.track({type:1,doc:m})}return{eu:a,ru:r,Ds:c,mutatedKeys:o}}iu(t,e){return t.hasLocalMutations&&e.hasCommittedMutations&&!e.hasLocalMutations}applyChanges(t,e,r,s){const o=this.eu;this.eu=t.eu,this.mutatedKeys=t.mutatedKeys;const a=t.ru.pa();a.sort(((m,y)=>(function(S,C){const N=x=>{switch(x){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return U(20277,{At:x})}};return N(S)-N(C)})(m.type,y.type)||this.Xa(m.doc,y.doc))),this.su(r),s=s!=null&&s;const c=e&&!s?this.ou():[],h=this.Za.size===0&&this.current&&!s?1:0,d=h!==this.Ya;return this.Ya=h,a.length!==0||d?{snapshot:new pn(this.query,t.eu,o,a,t.mutatedKeys,h===0,d,!1,!!r&&r.resumeToken.approximateByteSize()>0),_u:c}:{_u:c}}va(t){return this.current&&t==="Offline"?(this.current=!1,this.applyChanges({eu:this.eu,ru:new Ha,mutatedKeys:this.mutatedKeys,Ds:!1},!1)):{_u:[]}}au(t){return!this.Ha.has(t)&&!!this.eu.has(t)&&!this.eu.get(t).hasLocalMutations}su(t){t&&(t.addedDocuments.forEach((e=>this.Ha=this.Ha.add(e))),t.modifiedDocuments.forEach((e=>{})),t.removedDocuments.forEach((e=>this.Ha=this.Ha.delete(e))),this.current=t.current)}ou(){if(!this.current)return[];const t=this.Za;this.Za=H(),this.eu.forEach((r=>{this.au(r.key)&&(this.Za=this.Za.add(r.key))}));const e=[];return t.forEach((r=>{this.Za.has(r)||e.push(new Dc(r))})),this.Za.forEach((r=>{t.has(r)||e.push(new kc(r))})),e}uu(t){this.Ha=t.qs,this.Za=H();const e=this.nu(t.documents);return this.applyChanges(e,!0)}cu(){return pn.fromInitialDocuments(this.query,this.eu,this.mutatedKeys,this.Ya===0,this.hasCachedResults)}}const ji="SyncEngine";class Qm{constructor(t,e,r){this.query=t,this.targetId=e,this.view=r}}class Ym{constructor(t){this.key=t,this.lu=!1}}class Jm{constructor(t,e,r,s,o,a){this.localStore=t,this.remoteStore=e,this.eventManager=r,this.sharedClientState=s,this.currentUser=o,this.maxConcurrentLimboResolutions=a,this.hu={},this.Pu=new Ke((c=>Xl(c)),ls),this.Tu=new Map,this.Iu=new Set,this.du=new ut(M.comparator),this.Eu=new Map,this.Au=new Vi,this.Ru={},this.Vu=new Map,this.mu=mn.ur(),this.onlineState="Unknown",this.fu=void 0}get isPrimaryClient(){return this.fu===!0}}async function Xm(n,t,e=!0){const r=Bc(n);let s;const o=r.Pu.get(t);return o?(r.sharedClientState.addLocalQueryTarget(o.targetId),s=o.view.cu()):s=await Nc(r,t,e,!0),s}async function Zm(n,t){const e=Bc(n);await Nc(e,t,!0,!1)}async function Nc(n,t,e,r){const s=await gm(n.localStore,ne(t)),o=s.targetId,a=n.sharedClientState.addLocalQueryTarget(o,e);let c;return r&&(c=await tp(n,t,o,a==="current",s.resumeToken)),n.isPrimaryClient&&e&&Sc(n.remoteStore,s),c}async function tp(n,t,e,r,s){n.gu=(y,p,S)=>(async function(N,x,K,z){let B=x.view.nu(K);B.Ds&&(B=await Ua(N.localStore,x.query,!1).then((({documents:w})=>x.view.nu(w,B))));const W=z&&z.targetChanges.get(x.targetId),Q=z&&z.targetMismatches.get(x.targetId)!=null,ht=x.view.applyChanges(B,N.isPrimaryClient,W,Q);return Ya(N,x.targetId,ht._u),ht.snapshot})(n,y,p,S);const o=await Ua(n.localStore,t,!0),a=new Wm(t,o.qs),c=a.nu(o.documents),h=ir.createSynthesizedTargetChangeForCurrentChange(e,r&&n.onlineState!=="Offline",s),d=a.applyChanges(c,n.isPrimaryClient,h);Ya(n,e,d._u);const m=new Qm(t,e,a);return n.Pu.set(t,m),n.Tu.has(e)?n.Tu.get(e).push(t):n.Tu.set(e,[t]),d.snapshot}async function ep(n,t,e){const r=$(n),s=r.Pu.get(t),o=r.Tu.get(s.targetId);if(o.length>1)return r.Tu.set(s.targetId,o.filter((a=>!ls(a,t)))),void r.Pu.delete(t);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await ui(r.localStore,s.targetId,!1).then((()=>{r.sharedClientState.clearQueryState(s.targetId),e&&Li(r.remoteStore,s.targetId),fi(r,s.targetId)})).catch(vn)):(fi(r,s.targetId),await ui(r.localStore,s.targetId,!0))}async function np(n,t){const e=$(n),r=e.Pu.get(t),s=e.Tu.get(r.targetId);e.isPrimaryClient&&s.length===1&&(e.sharedClientState.removeLocalQueryTarget(r.targetId),Li(e.remoteStore,r.targetId))}async function rp(n,t,e){const r=up(n);try{const s=await(function(a,c){const h=$(a),d=at.now(),m=c.reduce(((S,C)=>S.add(C.key)),H());let y,p;return h.persistence.runTransaction("Locally write mutations","readwrite",(S=>{let C=me(),N=H();return h.Os.getEntries(S,m).next((x=>{C=x,C.forEach(((K,z)=>{z.isValidDocument()||(N=N.add(K))}))})).next((()=>h.localDocuments.getOverlayedDocuments(S,C))).next((x=>{y=x;const K=[];for(const z of c){const B=gf(z,y.get(z.key).overlayedDocument);B!=null&&K.push(new Me(z.key,B,$l(B.value.mapValue),qt.exists(!0)))}return h.mutationQueue.addMutationBatch(S,d,K,c)})).next((x=>{p=x;const K=x.applyToLocalDocumentSet(y,N);return h.documentOverlayCache.saveOverlays(S,x.batchId,K)}))})).then((()=>({batchId:p.batchId,changes:ec(y)})))})(r.localStore,t);r.sharedClientState.addPendingMutation(s.batchId),(function(a,c,h){let d=a.Ru[a.currentUser.toKey()];d||(d=new ut(G)),d=d.insert(c,h),a.Ru[a.currentUser.toKey()]=d})(r,s.batchId,e),await ar(r,s.changes),await ps(r.remoteStore)}catch(s){const o=Ui(s,"Failed to persist write");e.reject(o)}}async function Lc(n,t){const e=$(n);try{const r=await fm(e.localStore,t);t.targetChanges.forEach(((s,o)=>{const a=e.Eu.get(o);a&&(et(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?a.lu=!0:s.modifiedDocuments.size>0?et(a.lu,14607):s.removedDocuments.size>0&&(et(a.lu,42227),a.lu=!1))})),await ar(e,r,t)}catch(r){await vn(r)}}function Qa(n,t,e){const r=$(n);if(r.isPrimaryClient&&e===0||!r.isPrimaryClient&&e===1){const s=[];r.Pu.forEach(((o,a)=>{const c=a.view.va(t);c.snapshot&&s.push(c.snapshot)})),(function(a,c){const h=$(a);h.onlineState=c;let d=!1;h.queries.forEach(((m,y)=>{for(const p of y.wa)p.va(c)&&(d=!0)})),d&&zi(h)})(r.eventManager,t),s.length&&r.hu.J_(s),r.onlineState=t,r.isPrimaryClient&&r.sharedClientState.setOnlineState(t)}}async function sp(n,t,e){const r=$(n);r.sharedClientState.updateQueryState(t,"rejected",e);const s=r.Eu.get(t),o=s&&s.key;if(o){let a=new ut(M.comparator);a=a.insert(o,kt.newNoDocument(o,j.min()));const c=H().add(o),h=new ds(j.min(),new Map,new ut(G),a,c);await Lc(r,h),r.du=r.du.remove(o),r.Eu.delete(t),$i(r)}else await ui(r.localStore,t,!1).then((()=>fi(r,t,e))).catch(vn)}async function ip(n,t){const e=$(n),r=t.batch.batchId;try{const s=await dm(e.localStore,t);Mc(e,r,null),Oc(e,r),e.sharedClientState.updateMutationState(r,"acknowledged"),await ar(e,s)}catch(s){await vn(s)}}async function op(n,t,e){const r=$(n);try{const s=await(function(a,c){const h=$(a);return h.persistence.runTransaction("Reject batch","readwrite-primary",(d=>{let m;return h.mutationQueue.lookupMutationBatch(d,c).next((y=>(et(y!==null,37113),m=y.keys(),h.mutationQueue.removeMutationBatch(d,y)))).next((()=>h.mutationQueue.performConsistencyCheck(d))).next((()=>h.documentOverlayCache.removeOverlaysForBatchId(d,m,c))).next((()=>h.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(d,m))).next((()=>h.localDocuments.getDocuments(d,m)))}))})(r.localStore,t);Mc(r,t,e),Oc(r,t),r.sharedClientState.updateMutationState(t,"rejected",e),await ar(r,s)}catch(s){await vn(s)}}function Oc(n,t){(n.Vu.get(t)||[]).forEach((e=>{e.resolve()})),n.Vu.delete(t)}function Mc(n,t,e){const r=$(n);let s=r.Ru[r.currentUser.toKey()];if(s){const o=s.get(t);o&&(e?o.reject(e):o.resolve(),s=s.remove(t)),r.Ru[r.currentUser.toKey()]=s}}function fi(n,t,e=null){n.sharedClientState.removeLocalQueryTarget(t);for(const r of n.Tu.get(t))n.Pu.delete(r),e&&n.hu.pu(r,e);n.Tu.delete(t),n.isPrimaryClient&&n.Au.zr(t).forEach((r=>{n.Au.containsKey(r)||Fc(n,r)}))}function Fc(n,t){n.Iu.delete(t.path.canonicalString());const e=n.du.get(t);e!==null&&(Li(n.remoteStore,e),n.du=n.du.remove(t),n.Eu.delete(e),$i(n))}function Ya(n,t,e){for(const r of e)r instanceof kc?(n.Au.addReference(r.key,t),ap(n,r)):r instanceof Dc?(L(ji,"Document no longer in limbo: "+r.key),n.Au.removeReference(r.key,t),n.Au.containsKey(r.key)||Fc(n,r.key)):U(19791,{yu:r})}function ap(n,t){const e=t.key,r=e.path.canonicalString();n.du.get(e)||n.Iu.has(r)||(L(ji,"New document in limbo: "+e),n.Iu.add(r),$i(n))}function $i(n){for(;n.Iu.size>0&&n.du.size<n.maxConcurrentLimboResolutions;){const t=n.Iu.values().next().value;n.Iu.delete(t);const e=new M(it.fromString(t)),r=n.mu.next();n.Eu.set(r,new Ym(e)),n.du=n.du.insert(e,r),Sc(n.remoteStore,new Te(ne(Yl(e.path)),r,"TargetPurposeLimboResolution",is.ue))}}async function ar(n,t,e){const r=$(n),s=[],o=[],a=[];r.Pu.isEmpty()||(r.Pu.forEach(((c,h)=>{a.push(r.gu(h,t,e).then((d=>{var m;if((d||e)&&r.isPrimaryClient){const y=d?!d.fromCache:(m=e==null?void 0:e.targetChanges.get(h.targetId))===null||m===void 0?void 0:m.current;r.sharedClientState.updateQueryState(h.targetId,y?"current":"not-current")}if(d){s.push(d);const y=Di.Es(h.targetId,d);o.push(y)}})))})),await Promise.all(a),r.hu.J_(s),await(async function(h,d){const m=$(h);try{await m.persistence.runTransaction("notifyLocalViewChanges","readwrite",(y=>P.forEach(d,(p=>P.forEach(p.Is,(S=>m.persistence.referenceDelegate.addReference(y,p.targetId,S))).next((()=>P.forEach(p.ds,(S=>m.persistence.referenceDelegate.removeReference(y,p.targetId,S)))))))))}catch(y){if(!_n(y))throw y;L(Ni,"Failed to update sequence numbers: "+y)}for(const y of d){const p=y.targetId;if(!y.fromCache){const S=m.Fs.get(p),C=S.snapshotVersion,N=S.withLastLimboFreeSnapshotVersion(C);m.Fs=m.Fs.insert(p,N)}}})(r.localStore,o))}async function lp(n,t){const e=$(n);if(!e.currentUser.isEqual(t)){L(ji,"User change. New user:",t.toKey());const r=await wc(e.localStore,t);e.currentUser=t,(function(o,a){o.Vu.forEach((c=>{c.forEach((h=>{h.reject(new O(R.CANCELLED,a))}))})),o.Vu.clear()})(e,"'waitForPendingWrites' promise is rejected due to a user change."),e.sharedClientState.handleUserChange(t,r.removedBatchIds,r.addedBatchIds),await ar(e,r.Bs)}}function cp(n,t){const e=$(n),r=e.Eu.get(t);if(r&&r.lu)return H().add(r.key);{let s=H();const o=e.Tu.get(t);if(!o)return s;for(const a of o){const c=e.Pu.get(a);s=s.unionWith(c.view.tu)}return s}}function Bc(n){const t=$(n);return t.remoteStore.remoteSyncer.applyRemoteEvent=Lc.bind(null,t),t.remoteStore.remoteSyncer.getRemoteKeysForTarget=cp.bind(null,t),t.remoteStore.remoteSyncer.rejectListen=sp.bind(null,t),t.hu.J_=Gm.bind(null,t.eventManager),t.hu.pu=Hm.bind(null,t.eventManager),t}function up(n){const t=$(n);return t.remoteStore.remoteSyncer.applySuccessfulWrite=ip.bind(null,t),t.remoteStore.remoteSyncer.rejectFailedWrite=op.bind(null,t),t}class es{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(t){this.serializer=fs(t.databaseInfo.databaseId),this.sharedClientState=this.bu(t),this.persistence=this.Du(t),await this.persistence.start(),this.localStore=this.vu(t),this.gcScheduler=this.Cu(t,this.localStore),this.indexBackfillerScheduler=this.Fu(t,this.localStore)}Cu(t,e){return null}Fu(t,e){return null}vu(t){return hm(this.persistence,new lm,t.initialUser,this.serializer)}Du(t){return new bc(ki.Vi,this.serializer)}bu(t){return new vm}async terminate(){var t,e;(t=this.gcScheduler)===null||t===void 0||t.stop(),(e=this.indexBackfillerScheduler)===null||e===void 0||e.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}es.provider={build:()=>new es};class hp extends es{constructor(t){super(),this.cacheSizeBytes=t}Cu(t,e){et(this.persistence.referenceDelegate instanceof Zr,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new Kf(r,t.asyncQueue,e)}Du(t){const e=this.cacheSizeBytes!==void 0?Lt.withCacheSize(this.cacheSizeBytes):Lt.DEFAULT;return new bc((r=>Zr.Vi(r,e)),this.serializer)}}class mi{async initialize(t,e){this.localStore||(this.localStore=t.localStore,this.sharedClientState=t.sharedClientState,this.datastore=this.createDatastore(e),this.remoteStore=this.createRemoteStore(e),this.eventManager=this.createEventManager(e),this.syncEngine=this.createSyncEngine(e,!t.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Qa(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=lp.bind(null,this.syncEngine),await Um(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(t){return(function(){return new jm})()}createDatastore(t){const e=fs(t.databaseInfo.databaseId),r=(function(o){return new Tm(o)})(t.databaseInfo);return(function(o,a,c,h){return new Rm(o,a,c,h)})(t.authCredentials,t.appCheckCredentials,r,e)}createRemoteStore(t){return(function(r,s,o,a,c){return new Cm(r,s,o,a,c)})(this.localStore,this.datastore,t.asyncQueue,(e=>Qa(this.syncEngine,e,0)),(function(){return $a.C()?new $a:new _m})())}createSyncEngine(t,e){return(function(s,o,a,c,h,d,m){const y=new Jm(s,o,a,c,h,d);return m&&(y.fu=!0),y})(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,t.initialUser,t.maxConcurrentLimboResolutions,e)}async terminate(){var t,e;await(async function(s){const o=$(s);L(Ge,"RemoteStore shutting down."),o.Ia.add(5),await or(o),o.Ea.shutdown(),o.Aa.set("Unknown")})(this.remoteStore),(t=this.datastore)===null||t===void 0||t.terminate(),(e=this.eventManager)===null||e===void 0||e.terminate()}}mi.provider={build:()=>new mi};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dp{constructor(t){this.observer=t,this.muted=!1}next(t){this.muted||this.observer.next&&this.xu(this.observer.next,t)}error(t){this.muted||(this.observer.error?this.xu(this.observer.error,t):de("Uncaught Error in snapshot listener:",t.toString()))}Ou(){this.muted=!0}xu(t,e){setTimeout((()=>{this.muted||t(e)}),0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Le="FirestoreClient";class fp{constructor(t,e,r,s,o){this.authCredentials=t,this.appCheckCredentials=e,this.asyncQueue=r,this.databaseInfo=s,this.user=Vt.UNAUTHENTICATED,this.clientId=Ei.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=o,this.authCredentials.start(r,(async a=>{L(Le,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a})),this.appCheckCredentials.start(r,(a=>(L(Le,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(t){this.authCredentialListener=t}setAppCheckTokenChangeListener(t){this.appCheckCredentialListener=t}terminate(){this.asyncQueue.enterRestrictedMode();const t=new Re;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),t.resolve()}catch(e){const r=Ui(e,"Failed to shutdown persistence");t.reject(r)}})),t.promise}}async function Hs(n,t){n.asyncQueue.verifyOperationInProgress(),L(Le,"Initializing OfflineComponentProvider");const e=n.configuration;await t.initialize(e);let r=e.initialUser;n.setCredentialChangeListener((async s=>{r.isEqual(s)||(await wc(t.localStore,s),r=s)})),t.persistence.setDatabaseDeletedListener((()=>{Ce("Terminating Firestore due to IndexedDb database deletion"),n.terminate().then((()=>{L("Terminating Firestore due to IndexedDb database deletion completed successfully")})).catch((s=>{Ce("Terminating Firestore due to IndexedDb database deletion failed",s)}))})),n._offlineComponents=t}async function Ja(n,t){n.asyncQueue.verifyOperationInProgress();const e=await mp(n);L(Le,"Initializing OnlineComponentProvider"),await t.initialize(e,n.configuration),n.setCredentialChangeListener((r=>Ga(t.remoteStore,r))),n.setAppCheckTokenChangeListener(((r,s)=>Ga(t.remoteStore,s))),n._onlineComponents=t}async function mp(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){L(Le,"Using user provided OfflineComponentProvider");try{await Hs(n,n._uninitializedComponentsProvider._offline)}catch(t){const e=t;if(!(function(s){return s.name==="FirebaseError"?s.code===R.FAILED_PRECONDITION||s.code===R.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11})(e))throw e;Ce("Error using user provided cache. Falling back to memory cache: "+e),await Hs(n,new es)}}else L(Le,"Using default OfflineComponentProvider"),await Hs(n,new hp(void 0));return n._offlineComponents}async function Uc(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(L(Le,"Using user provided OnlineComponentProvider"),await Ja(n,n._uninitializedComponentsProvider._online)):(L(Le,"Using default OnlineComponentProvider"),await Ja(n,new mi))),n._onlineComponents}function pp(n){return Uc(n).then((t=>t.syncEngine))}async function gp(n){const t=await Uc(n),e=t.eventManager;return e.onListen=Xm.bind(null,t.syncEngine),e.onUnlisten=ep.bind(null,t.syncEngine),e.onFirstRemoteStoreListen=Zm.bind(null,t.syncEngine),e.onLastRemoteStoreUnlisten=np.bind(null,t.syncEngine),e}function yp(n,t,e={}){const r=new Re;return n.asyncQueue.enqueueAndForget((async()=>(function(o,a,c,h,d){const m=new dp({next:p=>{m.Ou(),a.enqueueAndForget((()=>qm(o,y))),p.fromCache&&h.source==="server"?d.reject(new O(R.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):d.resolve(p)},error:p=>d.reject(p)}),y=new Km(c,m,{includeMetadataChanges:!0,ka:!0});return $m(o,y)})(await gp(n),n.asyncQueue,t,e,r))),r.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zc(n){const t={};return n.timeoutSeconds!==void 0&&(t.timeoutSeconds=n.timeoutSeconds),t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xa=new Map;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jc="firestore.googleapis.com",Za=!0;class tl{constructor(t){var e,r;if(t.host===void 0){if(t.ssl!==void 0)throw new O(R.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=jc,this.ssl=Za}else this.host=t.host,this.ssl=(e=t.ssl)!==null&&e!==void 0?e:Za;if(this.isUsingEmulator=t.emulatorOptions!==void 0,this.credentials=t.credentials,this.ignoreUndefinedProperties=!!t.ignoreUndefinedProperties,this.localCache=t.localCache,t.cacheSizeBytes===void 0)this.cacheSizeBytes=Ec;else{if(t.cacheSizeBytes!==-1&&t.cacheSizeBytes<Gf)throw new O(R.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=t.cacheSizeBytes}Pd("experimentalForceLongPolling",t.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",t.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!t.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:t.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!t.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=zc((r=t.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),(function(o){if(o.timeoutSeconds!==void 0){if(isNaN(o.timeoutSeconds))throw new O(R.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (must not be NaN)`);if(o.timeoutSeconds<5)throw new O(R.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (minimum allowed value is 5)`);if(o.timeoutSeconds>30)throw new O(R.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!t.useFetchStreams}isEqual(t){return this.host===t.host&&this.ssl===t.ssl&&this.credentials===t.credentials&&this.cacheSizeBytes===t.cacheSizeBytes&&this.experimentalForceLongPolling===t.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===t.experimentalAutoDetectLongPolling&&(function(r,s){return r.timeoutSeconds===s.timeoutSeconds})(this.experimentalLongPollingOptions,t.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===t.ignoreUndefinedProperties&&this.useFetchStreams===t.useFetchStreams}}class gs{constructor(t,e,r,s){this._authCredentials=t,this._appCheckCredentials=e,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new tl({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new O(R.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(t){if(this._settingsFrozen)throw new O(R.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new tl(t),this._emulatorOptions=t.emulatorOptions||{},t.credentials!==void 0&&(this._authCredentials=(function(r){if(!r)return new _d;switch(r.type){case"firstParty":return new Td(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new O(R.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(t.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(e){const r=Xa.get(e);r&&(L("ComponentProvider","Removing Datastore"),Xa.delete(e),r.terminate())})(this),Promise.resolve()}}function vp(n,t,e,r={}){var s;n=fe(n,gs);const o=yi(t),a=n._getSettings(),c=Object.assign(Object.assign({},a),{emulatorOptions:n._getEmulatorOptions()}),h=`${t}:${e}`;o&&(Hu(`https://${h}`),Yu("Firestore",!0)),a.host!==jc&&a.host!==h&&Ce("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const d=Object.assign(Object.assign({},a),{host:h,ssl:o,emulatorOptions:r});if(!$r(d,c)&&(n._setSettings(d),r.mockUserToken)){let m,y;if(typeof r.mockUserToken=="string")m=r.mockUserToken,y=Vt.MOCK_USER;else{m=Ku(r.mockUserToken,(s=n._app)===null||s===void 0?void 0:s.options.projectId);const p=r.mockUserToken.sub||r.mockUserToken.user_id;if(!p)throw new O(R.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");y=new Vt(p)}n._authCredentials=new Ed(new xl(m,y))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bn{constructor(t,e,r){this.converter=e,this._query=r,this.type="query",this.firestore=t}withConverter(t){return new bn(this.firestore,t,this._query)}}class vt{constructor(t,e,r){this.converter=e,this._key=r,this.type="document",this.firestore=t}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Pe(this.firestore,this.converter,this._key.path.popLast())}withConverter(t){return new vt(this.firestore,t,this._key)}toJSON(){return{type:vt._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(t,e,r){if(nr(e,vt._jsonSchema))return new vt(t,r||null,new M(it.fromString(e.referencePath)))}}vt._jsonSchemaVersion="firestore/documentReference/1.0",vt._jsonSchema={type:yt("string",vt._jsonSchemaVersion),referencePath:yt("string")};class Pe extends bn{constructor(t,e,r){super(t,e,Yl(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const t=this._path.popLast();return t.isEmpty()?null:new vt(this.firestore,null,new M(t))}withConverter(t){return new Pe(this.firestore,t,this._path)}}function Ut(n,t,...e){if(n=ue(n),kl("collection","path",t),n instanceof gs){const r=it.fromString(t,...e);return fa(r),new Pe(n,null,r)}{if(!(n instanceof vt||n instanceof Pe))throw new O(R.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(it.fromString(t,...e));return fa(r),new Pe(n.firestore,null,r)}}function ns(n,t,...e){if(n=ue(n),arguments.length===1&&(t=Ei.newId()),kl("doc","path",t),n instanceof gs){const r=it.fromString(t,...e);return da(r),new vt(n,null,new M(r))}{if(!(n instanceof vt||n instanceof Pe))throw new O(R.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(it.fromString(t,...e));return da(r),new vt(n.firestore,n instanceof Pe?n.converter:null,new M(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const el="AsyncQueue";class nl{constructor(t=Promise.resolve()){this.Zu=[],this.Xu=!1,this.ec=[],this.tc=null,this.nc=!1,this.rc=!1,this.sc=[],this.F_=new Ic(this,"async_queue_retry"),this.oc=()=>{const r=Gs();r&&L(el,"Visibility state changed to "+r.visibilityState),this.F_.y_()},this._c=t;const e=Gs();e&&typeof e.addEventListener=="function"&&e.addEventListener("visibilitychange",this.oc)}get isShuttingDown(){return this.Xu}enqueueAndForget(t){this.enqueue(t)}enqueueAndForgetEvenWhileRestricted(t){this.ac(),this.uc(t)}enterRestrictedMode(t){if(!this.Xu){this.Xu=!0,this.rc=t||!1;const e=Gs();e&&typeof e.removeEventListener=="function"&&e.removeEventListener("visibilitychange",this.oc)}}enqueue(t){if(this.ac(),this.Xu)return new Promise((()=>{}));const e=new Re;return this.uc((()=>this.Xu&&this.rc?Promise.resolve():(t().then(e.resolve,e.reject),e.promise))).then((()=>e.promise))}enqueueRetryable(t){this.enqueueAndForget((()=>(this.Zu.push(t),this.cc())))}async cc(){if(this.Zu.length!==0){try{await this.Zu[0](),this.Zu.shift(),this.F_.reset()}catch(t){if(!_n(t))throw t;L(el,"Operation failed with retryable error: "+t)}this.Zu.length>0&&this.F_.g_((()=>this.cc()))}}uc(t){const e=this._c.then((()=>(this.nc=!0,t().catch((r=>{throw this.tc=r,this.nc=!1,de("INTERNAL UNHANDLED ERROR: ",rl(r)),r})).then((r=>(this.nc=!1,r))))));return this._c=e,e}enqueueAfterDelay(t,e,r){this.ac(),this.sc.indexOf(t)>-1&&(e=0);const s=Bi.createAndSchedule(this,t,e,r,(o=>this.lc(o)));return this.ec.push(s),s}ac(){this.tc&&U(47125,{hc:rl(this.tc)})}verifyOperationInProgress(){}async Pc(){let t;do t=this._c,await t;while(t!==this._c)}Tc(t){for(const e of this.ec)if(e.timerId===t)return!0;return!1}Ic(t){return this.Pc().then((()=>{this.ec.sort(((e,r)=>e.targetTimeMs-r.targetTimeMs));for(const e of this.ec)if(e.skipDelay(),t!=="all"&&e.timerId===t)break;return this.Pc()}))}dc(t){this.sc.push(t)}lc(t){const e=this.ec.indexOf(t);this.ec.splice(e,1)}}function rl(n){let t=n.message||"";return n.stack&&(t=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),t}class wn extends gs{constructor(t,e,r,s){super(t,e,r,s),this.type="firestore",this._queue=new nl,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const t=this._firestoreClient.terminate();this._queue=new nl(t),this._firestoreClient=void 0,await t}}}function _p(n,t){const e=typeof n=="object"?n:od(),r=typeof n=="string"?n:Kr,s=ed(e,"firestore").getImmediate({identifier:r});if(!s._initialized){const o=qu("firestore");o&&vp(s,...o)}return s}function $c(n){if(n._terminated)throw new O(R.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||Ep(n),n._firestoreClient}function Ep(n){var t,e,r;const s=n._freezeSettings(),o=(function(c,h,d,m){return new Bd(c,h,d,m.host,m.ssl,m.experimentalForceLongPolling,m.experimentalAutoDetectLongPolling,zc(m.experimentalLongPollingOptions),m.useFetchStreams,m.isUsingEmulator)})(n._databaseId,((t=n._app)===null||t===void 0?void 0:t.options.appId)||"",n._persistenceKey,s);n._componentsProvider||!((e=s.localCache)===null||e===void 0)&&e._offlineComponentProvider&&(!((r=s.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(n._componentsProvider={_offline:s.localCache._offlineComponentProvider,_online:s.localCache._onlineComponentProvider}),n._firestoreClient=new fp(n._authCredentials,n._appCheckCredentials,n._queue,o,n._componentsProvider&&(function(c){const h=c==null?void 0:c._online.build();return{_offline:c==null?void 0:c._offline.build(h),_online:h}})(n._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $t{constructor(t){this._byteString=t}static fromBase64String(t){try{return new $t(St.fromBase64String(t))}catch(e){throw new O(R.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(t){return new $t(St.fromUint8Array(t))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(t){return this._byteString.isEqual(t._byteString)}toJSON(){return{type:$t._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(t){if(nr(t,$t._jsonSchema))return $t.fromBase64String(t.bytes)}}$t._jsonSchemaVersion="firestore/bytes/1.0",$t._jsonSchema={type:yt("string",$t._jsonSchemaVersion),bytes:yt("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ys{constructor(...t){for(let e=0;e<t.length;++e)if(t[e].length===0)throw new O(R.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new At(t)}isEqual(t){return this._internalPath.isEqual(t._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vs{constructor(t){this._methodName=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class se{constructor(t,e){if(!isFinite(t)||t<-90||t>90)throw new O(R.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+t);if(!isFinite(e)||e<-180||e>180)throw new O(R.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+e);this._lat=t,this._long=e}get latitude(){return this._lat}get longitude(){return this._long}isEqual(t){return this._lat===t._lat&&this._long===t._long}_compareTo(t){return G(this._lat,t._lat)||G(this._long,t._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:se._jsonSchemaVersion}}static fromJSON(t){if(nr(t,se._jsonSchema))return new se(t.latitude,t.longitude)}}se._jsonSchemaVersion="firestore/geoPoint/1.0",se._jsonSchema={type:yt("string",se._jsonSchemaVersion),latitude:yt("number"),longitude:yt("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ie{constructor(t){this._values=(t||[]).map((e=>e))}toArray(){return this._values.map((t=>t))}isEqual(t){return(function(r,s){if(r.length!==s.length)return!1;for(let o=0;o<r.length;++o)if(r[o]!==s[o])return!1;return!0})(this._values,t._values)}toJSON(){return{type:ie._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(t){if(nr(t,ie._jsonSchema)){if(Array.isArray(t.vectorValues)&&t.vectorValues.every((e=>typeof e=="number")))return new ie(t.vectorValues);throw new O(R.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}ie._jsonSchemaVersion="firestore/vectorValue/1.0",ie._jsonSchema={type:yt("string",ie._jsonSchemaVersion),vectorValues:yt("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bp=/^__.*__$/;class wp{constructor(t,e,r){this.data=t,this.fieldMask=e,this.fieldTransforms=r}toMutation(t,e){return this.fieldMask!==null?new Me(t,this.data,this.fieldMask,e,this.fieldTransforms):new sr(t,this.data,e,this.fieldTransforms)}}class qc{constructor(t,e,r){this.data=t,this.fieldMask=e,this.fieldTransforms=r}toMutation(t,e){return new Me(t,this.data,this.fieldMask,e,this.fieldTransforms)}}function Gc(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw U(40011,{Ec:n})}}class qi{constructor(t,e,r,s,o,a){this.settings=t,this.databaseId=e,this.serializer=r,this.ignoreUndefinedProperties=s,o===void 0&&this.Ac(),this.fieldTransforms=o||[],this.fieldMask=a||[]}get path(){return this.settings.path}get Ec(){return this.settings.Ec}Rc(t){return new qi(Object.assign(Object.assign({},this.settings),t),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Vc(t){var e;const r=(e=this.path)===null||e===void 0?void 0:e.child(t),s=this.Rc({path:r,mc:!1});return s.fc(t),s}gc(t){var e;const r=(e=this.path)===null||e===void 0?void 0:e.child(t),s=this.Rc({path:r,mc:!1});return s.Ac(),s}yc(t){return this.Rc({path:void 0,mc:!0})}wc(t){return rs(t,this.settings.methodName,this.settings.Sc||!1,this.path,this.settings.bc)}contains(t){return this.fieldMask.find((e=>t.isPrefixOf(e)))!==void 0||this.fieldTransforms.find((e=>t.isPrefixOf(e.field)))!==void 0}Ac(){if(this.path)for(let t=0;t<this.path.length;t++)this.fc(this.path.get(t))}fc(t){if(t.length===0)throw this.wc("Document fields must not be empty");if(Gc(this.Ec)&&bp.test(t))throw this.wc('Document fields cannot begin and end with "__"')}}class Tp{constructor(t,e,r){this.databaseId=t,this.ignoreUndefinedProperties=e,this.serializer=r||fs(t)}Dc(t,e,r,s=!1){return new qi({Ec:t,methodName:e,bc:r,path:At.emptyPath(),mc:!1,Sc:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function _s(n){const t=n._freezeSettings(),e=fs(n._databaseId);return new Tp(n._databaseId,!!t.ignoreUndefinedProperties,e)}function Hc(n,t,e,r,s,o={}){const a=n.Dc(o.merge||o.mergeFields?2:0,t,e,s);Hi("Data must be an object, but it was:",a,r);const c=Kc(r,a);let h,d;if(o.merge)h=new Bt(a.fieldMask),d=a.fieldTransforms;else if(o.mergeFields){const m=[];for(const y of o.mergeFields){const p=pi(t,y,e);if(!a.contains(p))throw new O(R.INVALID_ARGUMENT,`Field '${p}' is specified in your field mask but missing from your input data.`);Qc(m,p)||m.push(p)}h=new Bt(m),d=a.fieldTransforms.filter((y=>h.covers(y.field)))}else h=null,d=a.fieldTransforms;return new wp(new Mt(c),h,d)}class Es extends vs{_toFieldTransform(t){if(t.Ec!==2)throw t.Ec===1?t.wc(`${this._methodName}() can only appear at the top level of your update data`):t.wc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return t.fieldMask.push(t.path),null}isEqual(t){return t instanceof Es}}class Gi extends vs{_toFieldTransform(t){return new df(t.path,new Zn)}isEqual(t){return t instanceof Gi}}function Ip(n,t,e,r){const s=n.Dc(1,t,e);Hi("Data must be an object, but it was:",s,r);const o=[],a=Mt.empty();Oe(r,((h,d)=>{const m=Ki(t,h,e);d=ue(d);const y=s.gc(m);if(d instanceof Es)o.push(m);else{const p=lr(d,y);p!=null&&(o.push(m),a.set(m,p))}}));const c=new Bt(o);return new qc(a,c,s.fieldTransforms)}function Ap(n,t,e,r,s,o){const a=n.Dc(1,t,e),c=[pi(t,r,e)],h=[s];if(o.length%2!=0)throw new O(R.INVALID_ARGUMENT,`Function ${t}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let p=0;p<o.length;p+=2)c.push(pi(t,o[p])),h.push(o[p+1]);const d=[],m=Mt.empty();for(let p=c.length-1;p>=0;--p)if(!Qc(d,c[p])){const S=c[p];let C=h[p];C=ue(C);const N=a.gc(S);if(C instanceof Es)d.push(S);else{const x=lr(C,N);x!=null&&(d.push(S),m.set(S,x))}}const y=new Bt(d);return new qc(m,y,a.fieldTransforms)}function Sp(n,t,e,r=!1){return lr(e,n.Dc(r?4:3,t))}function lr(n,t){if(Wc(n=ue(n)))return Hi("Unsupported field value:",t,n),Kc(n,t);if(n instanceof vs)return(function(r,s){if(!Gc(s.Ec))throw s.wc(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.wc(`${r._methodName}() is not currently supported inside arrays`);const o=r._toFieldTransform(s);o&&s.fieldTransforms.push(o)})(n,t),null;if(n===void 0&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),n instanceof Array){if(t.settings.mc&&t.Ec!==4)throw t.wc("Nested arrays are not supported");return(function(r,s){const o=[];let a=0;for(const c of r){let h=lr(c,s.yc(a));h==null&&(h={nullValue:"NULL_VALUE"}),o.push(h),a++}return{arrayValue:{values:o}}})(n,t)}return(function(r,s){if((r=ue(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return cf(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const o=at.fromDate(r);return{timestampValue:Xr(s.serializer,o)}}if(r instanceof at){const o=new at(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:Xr(s.serializer,o)}}if(r instanceof se)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof $t)return{bytesValue:fc(s.serializer,r._byteString)};if(r instanceof vt){const o=s.databaseId,a=r.firestore._databaseId;if(!a.isEqual(o))throw s.wc(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${o.projectId}/${o.database}`);return{referenceValue:xi(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof ie)return(function(a,c){return{mapValue:{fields:{[zl]:{stringValue:jl},[Wr]:{arrayValue:{values:a.toArray().map((d=>{if(typeof d!="number")throw c.wc("VectorValues must only contain numeric values.");return Si(c.serializer,d)}))}}}}}})(r,s);throw s.wc(`Unsupported field value: ${ss(r)}`)})(n,t)}function Kc(n,t){const e={};return Ll(n)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):Oe(n,((r,s)=>{const o=lr(s,t.Vc(r));o!=null&&(e[r]=o)})),{mapValue:{fields:e}}}function Wc(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof at||n instanceof se||n instanceof $t||n instanceof vt||n instanceof vs||n instanceof ie)}function Hi(n,t,e){if(!Wc(e)||!Dl(e)){const r=ss(e);throw r==="an object"?t.wc(n+" a custom object"):t.wc(n+" "+r)}}function pi(n,t,e){if((t=ue(t))instanceof ys)return t._internalPath;if(typeof t=="string")return Ki(n,t);throw rs("Field path arguments must be of type string or ",n,!1,void 0,e)}const Rp=new RegExp("[~\\*/\\[\\]]");function Ki(n,t,e){if(t.search(Rp)>=0)throw rs(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,e);try{return new ys(...t.split("."))._internalPath}catch{throw rs(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,e)}}function rs(n,t,e,r,s){const o=r&&!r.isEmpty(),a=s!==void 0;let c=`Function ${t}() called with invalid data`;e&&(c+=" (via `toFirestore()`)"),c+=". ";let h="";return(o||a)&&(h+=" (found",o&&(h+=` in field ${r}`),a&&(h+=` in document ${s}`),h+=")"),new O(R.INVALID_ARGUMENT,c+n+h)}function Qc(n,t){return n.some((e=>e.isEqual(t)))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yc{constructor(t,e,r,s,o){this._firestore=t,this._userDataWriter=e,this._key=r,this._document=s,this._converter=o}get id(){return this._key.path.lastSegment()}get ref(){return new vt(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const t=new Pp(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(t)}return this._userDataWriter.convertValue(this._document.data.value)}}get(t){if(this._document){const e=this._document.data.field(Wi("DocumentSnapshot.get",t));if(e!==null)return this._userDataWriter.convertValue(e)}}}class Pp extends Yc{data(){return super.data()}}function Wi(n,t){return typeof t=="string"?Ki(n,t):t instanceof ys?t._internalPath:t._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cp(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new O(R.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Qi{}class xp extends Qi{}function Vp(n,t,...e){let r=[];t instanceof Qi&&r.push(t),r=r.concat(e),(function(o){const a=o.filter((h=>h instanceof Yi)).length,c=o.filter((h=>h instanceof bs)).length;if(a>1||a>0&&c>0)throw new O(R.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")})(r);for(const s of r)n=s._apply(n);return n}class bs extends xp{constructor(t,e,r){super(),this._field=t,this._op=e,this._value=r,this.type="where"}static _create(t,e,r){return new bs(t,e,r)}_apply(t){const e=this._parse(t);return Jc(t._query,e),new bn(t.firestore,t.converter,si(t._query,e))}_parse(t){const e=_s(t.firestore);return(function(o,a,c,h,d,m,y){let p;if(d.isKeyField()){if(m==="array-contains"||m==="array-contains-any")throw new O(R.INVALID_ARGUMENT,`Invalid Query. You can't perform '${m}' queries on documentId().`);if(m==="in"||m==="not-in"){ol(y,m);const C=[];for(const N of y)C.push(il(h,o,N));p={arrayValue:{values:C}}}else p=il(h,o,y)}else m!=="in"&&m!=="not-in"&&m!=="array-contains-any"||ol(y,m),p=Sp(c,a,y,m==="in"||m==="not-in");return gt.create(d,m,p)})(t._query,"where",e,t.firestore._databaseId,this._field,this._op,this._value)}}function sl(n,t,e){const r=t,s=Wi("where",n);return bs._create(s,r,e)}class Yi extends Qi{constructor(t,e){super(),this.type=t,this._queryConstraints=e}static _create(t,e){return new Yi(t,e)}_parse(t){const e=this._queryConstraints.map((r=>r._parse(t))).filter((r=>r.getFilters().length>0));return e.length===1?e[0]:Qt.create(e,this._getOperator())}_apply(t){const e=this._parse(t);return e.getFilters().length===0?t:((function(s,o){let a=s;const c=o.getFlattenedFilters();for(const h of c)Jc(a,h),a=si(a,h)})(t._query,e),new bn(t.firestore,t.converter,si(t._query,e)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}function il(n,t,e){if(typeof(e=ue(e))=="string"){if(e==="")throw new O(R.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Jl(t)&&e.indexOf("/")!==-1)throw new O(R.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${e}' contains a '/' character.`);const r=t.path.child(it.fromString(e));if(!M.isDocumentKey(r))throw new O(R.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return ba(n,new M(r))}if(e instanceof vt)return ba(n,e._key);throw new O(R.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${ss(e)}.`)}function ol(n,t){if(!Array.isArray(n)||n.length===0)throw new O(R.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${t.toString()}' filters.`)}function Jc(n,t){const e=(function(s,o){for(const a of s)for(const c of a.getFlattenedFilters())if(o.indexOf(c.op)>=0)return c.op;return null})(n.filters,(function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}})(t.op));if(e!==null)throw e===t.op?new O(R.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${t.op.toString()}' filter.`):new O(R.INVALID_ARGUMENT,`Invalid query. You cannot use '${t.op.toString()}' filters with '${e.toString()}' filters.`)}class kp{convertValue(t,e="none"){switch(De(t)){case 0:return null;case 1:return t.booleanValue;case 2:return mt(t.integerValue||t.doubleValue);case 3:return this.convertTimestamp(t.timestampValue);case 4:return this.convertServerTimestamp(t,e);case 5:return t.stringValue;case 6:return this.convertBytes(ke(t.bytesValue));case 7:return this.convertReference(t.referenceValue);case 8:return this.convertGeoPoint(t.geoPointValue);case 9:return this.convertArray(t.arrayValue,e);case 11:return this.convertObject(t.mapValue,e);case 10:return this.convertVectorValue(t.mapValue);default:throw U(62114,{value:t})}}convertObject(t,e){return this.convertObjectMap(t.fields,e)}convertObjectMap(t,e="none"){const r={};return Oe(t,((s,o)=>{r[s]=this.convertValue(o,e)})),r}convertVectorValue(t){var e,r,s;const o=(s=(r=(e=t.fields)===null||e===void 0?void 0:e[Wr].arrayValue)===null||r===void 0?void 0:r.values)===null||s===void 0?void 0:s.map((a=>mt(a.doubleValue)));return new ie(o)}convertGeoPoint(t){return new se(mt(t.latitude),mt(t.longitude))}convertArray(t,e){return(t.values||[]).map((r=>this.convertValue(r,e)))}convertServerTimestamp(t,e){switch(e){case"previous":const r=as(t);return r==null?null:this.convertValue(r,e);case"estimate":return this.convertTimestamp(Yn(t));default:return null}}convertTimestamp(t){const e=Ve(t);return new at(e.seconds,e.nanos)}convertDocumentKey(t,e){const r=it.fromString(t);et(_c(r),9688,{name:t});const s=new Jn(r.get(1),r.get(3)),o=new M(r.popFirst(5));return s.isEqual(e)||de(`Document ${o} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${e.projectId}/${e.database}) instead.`),o}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xc(n,t,e){let r;return r=n?n.toFirestore(t):t,r}class Dr{constructor(t,e){this.hasPendingWrites=t,this.fromCache=e}isEqual(t){return this.hasPendingWrites===t.hasPendingWrites&&this.fromCache===t.fromCache}}class cn extends Yc{constructor(t,e,r,s,o,a){super(t,e,r,s,a),this._firestore=t,this._firestoreImpl=t,this.metadata=o}exists(){return super.exists()}data(t={}){if(this._document){if(this._converter){const e=new zr(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(e,t)}return this._userDataWriter.convertValue(this._document.data.value,t.serverTimestamps)}}get(t,e={}){if(this._document){const r=this._document.data.field(Wi("DocumentSnapshot.get",t));if(r!==null)return this._userDataWriter.convertValue(r,e.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new O(R.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const t=this._document,e={};return e.type=cn._jsonSchemaVersion,e.bundle="",e.bundleSource="DocumentSnapshot",e.bundleName=this._key.toString(),!t||!t.isValidDocument()||!t.isFoundDocument()?e:(this._userDataWriter.convertObjectMap(t.data.value.mapValue.fields,"previous"),e.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),e)}}cn._jsonSchemaVersion="firestore/documentSnapshot/1.0",cn._jsonSchema={type:yt("string",cn._jsonSchemaVersion),bundleSource:yt("string","DocumentSnapshot"),bundleName:yt("string"),bundle:yt("string")};class zr extends cn{data(t={}){return super.data(t)}}class un{constructor(t,e,r,s){this._firestore=t,this._userDataWriter=e,this._snapshot=s,this.metadata=new Dr(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const t=[];return this.forEach((e=>t.push(e))),t}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(t,e){this._snapshot.docs.forEach((r=>{t.call(e,new zr(this._firestore,this._userDataWriter,r.key,r,new Dr(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(t={}){const e=!!t.includeMetadataChanges;if(e&&this._snapshot.excludesMetadataChanges)throw new O(R.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===e||(this._cachedChanges=(function(s,o){if(s._snapshot.oldDocs.isEmpty()){let a=0;return s._snapshot.docChanges.map((c=>{const h=new zr(s._firestore,s._userDataWriter,c.doc.key,c.doc,new Dr(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);return c.doc,{type:"added",doc:h,oldIndex:-1,newIndex:a++}}))}{let a=s._snapshot.oldDocs;return s._snapshot.docChanges.filter((c=>o||c.type!==3)).map((c=>{const h=new zr(s._firestore,s._userDataWriter,c.doc.key,c.doc,new Dr(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);let d=-1,m=-1;return c.type!==0&&(d=a.indexOf(c.doc.key),a=a.delete(c.doc.key)),c.type!==1&&(a=a.add(c.doc),m=a.indexOf(c.doc.key)),{type:Dp(c.type),doc:h,oldIndex:d,newIndex:m}}))}})(this,e),this._cachedChangesIncludeMetadataChanges=e),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new O(R.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const t={};t.type=un._jsonSchemaVersion,t.bundleSource="QuerySnapshot",t.bundleName=Ei.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const e=[],r=[],s=[];return this.docs.forEach((o=>{o._document!==null&&(e.push(o._document),r.push(this._userDataWriter.convertObjectMap(o._document.data.value.mapValue.fields,"previous")),s.push(o.ref.path))})),t.bundle=(this._firestore,this.query._query,t.bundleName,"NOT SUPPORTED"),t}}function Dp(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return U(61501,{type:n})}}un._jsonSchemaVersion="firestore/querySnapshot/1.0",un._jsonSchema={type:yt("string",un._jsonSchemaVersion),bundleSource:yt("string","QuerySnapshot"),bundleName:yt("string"),bundle:yt("string")};class Np extends kp{constructor(t){super(),this.firestore=t}convertBytes(t){return new $t(t)}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return new vt(this.firestore,null,e)}}function He(n){n=fe(n,bn);const t=fe(n.firestore,wn),e=$c(t),r=new Np(t);return Cp(n._query),yp(e,n._query).then((s=>new un(t,r,n,s)))}function Lp(n,t,e){n=fe(n,vt);const r=fe(n.firestore,wn),s=Xc(n.converter,t);return ws(r,[Hc(_s(r),"setDoc",n._key,s,n.converter!==null,e).toMutation(n._key,qt.none())])}function Op(n,t,e,...r){n=fe(n,vt);const s=fe(n.firestore,wn),o=_s(s);let a;return a=typeof(t=ue(t))=="string"||t instanceof ys?Ap(o,"updateDoc",n._key,t,e,r):Ip(o,"updateDoc",n._key,t),ws(s,[a.toMutation(n._key,qt.exists(!0))])}function Mp(n){return ws(fe(n.firestore,wn),[new Ri(n._key,qt.none())])}function sn(n,t){const e=fe(n.firestore,wn),r=ns(n),s=Xc(n.converter,t);return ws(e,[Hc(_s(n.firestore),"addDoc",r._key,s,n.converter!==null,{}).toMutation(r._key,qt.exists(!1))]).then((()=>r))}function ws(n,t){return(function(r,s){const o=new Re;return r.asyncQueue.enqueueAndForget((async()=>rp(await pp(r),s,o))),o.promise})($c(n),t)}function on(){return new Gi("serverTimestamp")}(function(t,e=!0){(function(s){yn=s})(id),Gr(new Kn("firestore",((r,{instanceIdentifier:s,options:o})=>{const a=r.getProvider("app").getImmediate(),c=new wn(new bd(r.getProvider("auth-internal")),new Id(a,r.getProvider("app-check-internal")),(function(d,m){if(!Object.prototype.hasOwnProperty.apply(d.options,["projectId"]))throw new O(R.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Jn(d.options.projectId,m)})(a,s),a);return o=Object.assign({useFetchStreams:e},o),c._setSettings(o),c}),"PUBLIC").setMultipleInstances(!0)),an(aa,la,t),an(aa,la,"esm2017")})();const Fp={apiKey:"AIzaSyCyFbsc2l3Osrac4zRbo_hZfvjvjEqmEDM",authDomain:"citraeloapp.firebaseapp.com",projectId:"citraeloapp",storageBucket:"citraeloapp.firebasestorage.app",messagingSenderId:"993130577551",appId:"1:993130577551:web:d285c1a403277ae75c7afa"},Bp=El(Fp),Dt=_p(Bp),Ji="citraelo_session",Zc="users";async function tu(n,t,e="user"){try{const r=Ut(Dt,Zc),s=Vp(r,sl("username","==",n),sl("role","==",e)),o=await He(s);if(o.empty)throw new Error("Username tidak ditemukan atau role tidak sesuai");const a=o.docs[0],c=a.data();if(c.password!==t)throw new Error("Password salah");const h={uid:a.id,username:c.username,displayName:c.displayName||c.username,role:c.role,avatarUrl:c.avatarUrl||"",sector:c.sector||"",loggedInAt:new Date().toISOString()};return localStorage.setItem(Ji,JSON.stringify(h)),h}catch(r){throw console.error("Login error:",r),r}}function eu(){localStorage.removeItem(Ji)}function Tn(){const n=localStorage.getItem(Ji);if(!n)return null;try{return JSON.parse(n)}catch{return null}}function Up(){return Tn()!==null}function zp(){const n=Tn();return(n==null?void 0:n.role)==="admin"}async function nu(){const n=[{id:"admin001",username:"admin",password:"admin123",displayName:"Expedition Lead",role:"admin",avatarUrl:"",sector:"River Sector Alpha"},{id:"user001",username:"user",password:"user123",displayName:"Rafting Explorer",role:"user",avatarUrl:"",sector:"Snake River"}];for(const t of n){const{id:e,...r}=t;await Lp(ns(Dt,Zc,e),{...r,createdAt:on()})}return console.log("✅ Users seeded successfully!"),n}const jp=Object.freeze(Object.defineProperty({__proto__:null,getCurrentUser:Tn,isAdmin:zp,isLoggedIn:Up,loginUser:tu,logoutUser:eu,seedUsers:nu},Symbol.toStringTag,{value:"Module"}));function $p(n){const t=(n==null?void 0:n.avatarUrl)||"",e=((n==null?void 0:n.displayName)||"U").charAt(0).toUpperCase();return`
    <header class="top-bar" id="top-bar">
      <div class="top-bar__brand">
        <span class="material-symbols-outlined top-bar__brand-icon">waves</span>
        <h1 class="top-bar__brand-name">CitraElo Rafting</h1>
      </div>
      <div class="top-bar__actions">
        <button class="material-symbols-outlined" style="background:none;border:none;cursor:pointer;color:var(--primary);font-size:1.5rem;" id="btn-notifications">
          notifications
        </button>
        <div class="top-bar__avatar" onclick="window.location.hash='/profile'" style="cursor:pointer">
          ${t?`<img src="${t}" alt="Profile">`:`<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:var(--primary-container);color:white;font-weight:700;font-family:'Space Grotesk',sans-serif;">${e}</div>`}
        </div>
      </div>
    </header>
  `}const qp="modulepreload",Gp=function(n){return"/"+n},al={},Hp=function(t,e,r){let s=Promise.resolve();if(e&&e.length>0){let a=function(d){return Promise.all(d.map(m=>Promise.resolve(m).then(y=>({status:"fulfilled",value:y}),y=>({status:"rejected",reason:y}))))};document.getElementsByTagName("link");const c=document.querySelector("meta[property=csp-nonce]"),h=(c==null?void 0:c.nonce)||(c==null?void 0:c.getAttribute("nonce"));s=a(e.map(d=>{if(d=Gp(d),d in al)return;al[d]=!0;const m=d.endsWith(".css"),y=m?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${y}`))return;const p=document.createElement("link");if(p.rel=m?"stylesheet":qp,m||(p.as="script"),p.crossOrigin="",p.href=d,h&&p.setAttribute("nonce",h),document.head.appendChild(p),m)return new Promise((S,C)=>{p.addEventListener("load",S),p.addEventListener("error",()=>C(new Error(`Unable to preload CSS for ${d}`)))})}))}function o(a){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=a,window.dispatchEvent(c),!c.defaultPrevented)throw a}return s.then(a=>{for(const c of a||[])c.status==="rejected"&&o(c.reason);return t().catch(o)})};function Kp(){const n=Tn();return`
    <nav class="bottom-nav" id="bottom-nav">
      <button class="bottom-nav__item" data-route="/dashboard" type="button">
        <span class="material-symbols-outlined bottom-nav__item-icon">dashboard</span>
        <span class="bottom-nav__item-label">DASHBOARD</span>
      </button>
      <button class="bottom-nav__item" data-route="/calendar" type="button">
        <span class="material-symbols-outlined bottom-nav__item-icon">calendar_today</span>
        <span class="bottom-nav__item-label">JADWAL</span>
      </button>

      ${(n==null?void 0:n.role)==="admin"?`
      <!-- Center FAB (Admin only) -->
      <button class="bottom-nav__fab" type="button" id="btn-tambah-tamu">
        <span class="material-symbols-outlined" style="font-size:2rem;font-weight:600;">add</span>
      </button>

      <button class="bottom-nav__item" data-route="/reports" type="button">
        <span class="material-symbols-outlined bottom-nav__item-icon">insert_chart</span>
        <span class="bottom-nav__item-label">REPORTS</span>
      </button>
      <button class="bottom-nav__item" data-route="/profile" type="button">
        <span class="material-symbols-outlined bottom-nav__item-icon">person</span>
        <span class="bottom-nav__item-label">PROFILE</span>
      </button>
      `:`
      <!-- User: Logout button instead -->
      <button class="bottom-nav__item" id="btn-user-logout" type="button">
        <span class="material-symbols-outlined bottom-nav__item-icon">logout</span>
        <span class="bottom-nav__item-label">LOGOUT</span>
      </button>
      `}
    </nav>
  `}function Wp(){var t;const n=document.getElementById("bottom-nav");n&&(n.addEventListener("click",e=>{if(e.target.closest(".bottom-nav__fab"))return;const s=e.target.closest(".bottom-nav__item");if(!s)return;const o=s.dataset.route;o&&(window.location.hash=o)}),(t=document.getElementById("btn-user-logout"))==null||t.addEventListener("click",()=>{Hp(()=>Promise.resolve().then(()=>jp),void 0).then(e=>{e.logoutUser(),window.location.hash="/login"})}))}async function Qp(){const n=[{name:"Gorge Canyon Run",tripId:"#TC-9921",classLevel:"Class IV+",date:"2024-08-06",departureTime:"09:00",leadGuide:'Sarah "Riptide" Miller',maxCapacity:8,currentManifest:8,status:"active",guests:["John Doe","Elena R.","Marcus V."]},{name:"Misty Valley Float",tripId:"#SD-4412",classLevel:"Class II",date:"2024-08-06",departureTime:"13:30",leadGuide:"Alex Chen",maxCapacity:12,currentManifest:4,status:"active",guests:["The Thompson Family (4)","Bill & Jen (2)"]},{name:"CitraElo Rapids Express",tripId:"#GG-2281",classLevel:"Class III",date:"2024-08-06",departureTime:"15:00",leadGuide:'Tom "Beard" Vance',maxCapacity:12,currentManifest:12,status:"active",guests:["University Kayak Club","Private Group B"]},{name:"Thunder Canyon Run",tripId:"#TC-9921",classLevel:"Class IV",date:"2024-07-14",departureTime:"09:00",leadGuide:"Marcus S.",maxCapacity:12,currentManifest:12,status:"completed",guests:[]},{name:"Morning Mist Float",tripId:"#MM-3301",classLevel:"Class II",date:"2024-08-02",departureTime:"07:30",leadGuide:"Elena L.",maxCapacity:8,currentManifest:6,status:"active",guests:[]}];for(const s of n)await sn(Ut(Dt,"expeditions"),{...s,createdAt:on()});const t=[{expeditionName:"Thunder Canyon Run",tripId:"#TC-9921",guestName:"Group Alpha",numberOfPersons:12,status:"paid",date:"2024-07-14"},{expeditionName:"Sunset Drift Expedition",tripId:"#SD-4412",guestName:"Team Beta",numberOfPersons:6,status:"pending",date:"2024-07-20"},{expeditionName:"Granite Gorge Sprint",tripId:"#GG-2281",guestName:"Solo Explorer",numberOfPersons:4,status:"cancelled",date:"2024-07-22"}];for(const s of t)await sn(Ut(Dt,"bookings"),{...s,createdAt:on()});const e=[{name:"Sarah Miller",nickname:"Riptide",specialty:"Class V Expert",isAvailable:!0,sector:"Alpha"},{name:"Alex Chen",nickname:"",specialty:"Scenic Float",isAvailable:!0,sector:"Alpha"},{name:"Tom Vance",nickname:"Beard",specialty:"Speed Runs",isAvailable:!0,sector:"Alpha"},{name:"Marcus Santos",nickname:"",specialty:"Lead Guide",isAvailable:!0,sector:"Alpha"},{name:"Elena Lopez",nickname:"",specialty:"Nature Specialist",isAvailable:!0,sector:"Alpha"},{name:"Jake Rivers",nickname:"",specialty:"Safety Lead",isAvailable:!0,sector:"Alpha"},{name:"Nadia Patel",nickname:"",specialty:"Kayak Instructor",isAvailable:!0,sector:"Beta"},{name:"Oscar Wu",nickname:"",specialty:"Equipment Lead",isAvailable:!0,sector:"Beta"}];for(const s of e)await sn(Ut(Dt,"guides"),{...s,createdAt:on()});const r=[{month:"March",revenue:28500,bookings:310},{month:"April",revenue:35200,bookings:380},{month:"May",revenue:31e3,bookings:340},{month:"June",revenue:52e3,bookings:420},{month:"July",revenue:68e3,bookings:482},{month:"August",revenue:78500,bookings:510},{month:"September",revenue:45300,bookings:390}];for(const s of r)await sn(Ut(Dt,"reports"),{...s,createdAt:on()});console.log("Demo data seeded successfully!")}function Yp(){return`
    <div class="page page--login" style="min-height:100dvh;position:relative;display:flex;align-items:center;justify-content:center;padding:1.5rem;overflow:hidden;">
      <!-- Background Image -->
      <div style="position:absolute;inset:0;z-index:0;">
        <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDcT6rDNPQoFrkM-NoOWlFTdZReGFfOqiTLY-ACh7JX4U4aKGK9uvuv2NRPcFJyCkWZ5HvUdKR-7EhdfEqG0LZtvnDiCYEVWdFJ8BQymeetGebC_7UOegoHRMaF2vk8NPvDc2nrI1lrLCijshQYKUj6Ks8WVacjU0iJRNCg2Bs09lzFENOXtkxC-EfV3yawBvTupXM0KvvZ6aWLOd-qBLLWtiUOdKKqlqcWJCn4gVPbfd9prVosX3sWEZnTDEvSIj9BSKE5M20NL7E" 
             alt="whitewater rapids" 
             style="width:100%;height:100%;object-fit:cover;transform:scale(1.05);">
        <div style="position:absolute;inset:0;background:rgba(0,52,97,0.4);backdrop-filter:blur(2px);"></div>
      </div>

      <!-- Login Card -->
      <main style="position:relative;z-index:10;width:100%;max-width:440px;background:rgba(255,255,255,0.9);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-radius:1.5rem;padding:2rem;overflow:hidden;">
        
        <!-- Header -->
        <div style="margin-bottom:2.5rem;">
          <h2 class="font-headline" style="font-size:1.875rem;font-weight:700;letter-spacing:-0.02em;color:var(--on-surface);margin-bottom:0.5rem;">Login ke CitraElo</h2>
          <p style="color:var(--on-surface-variant);font-weight:500;">Pilih pengguna untuk melanjutkan</p>
        </div>

        <!-- Login Form -->
        <form id="login-form" style="display:flex;flex-direction:column;gap:2rem;">
          
          <!-- Role Toggle -->
          <div class="role-toggle">
            <button type="button" class="role-toggle__btn active" data-role="user" id="role-user">
              <span class="material-symbols-outlined" style="font-size:1.125rem;">person</span>
              USER
            </button>
            <button type="button" class="role-toggle__btn" data-role="admin" id="role-admin">
              <span class="material-symbols-outlined" style="font-size:1.125rem;">admin_panel_settings</span>
              ADMIN
            </button>
          </div>

          <!-- Fields -->
          <div style="display:flex;flex-direction:column;gap:1.25rem;">
            <!-- Username -->
            <div>
              <label class="label-xs" style="display:block;color:var(--on-surface-variant);margin-bottom:0.5rem;margin-left:1rem;">USERNAME</label>
              <div style="position:relative;">
                <span class="material-symbols-outlined" style="position:absolute;left:1rem;top:50%;transform:translateY(-50%);color:var(--outline);">alternate_email</span>
                <input type="text" id="login-username" class="input-field" placeholder="Masukkan username" autocomplete="username" required>
              </div>
            </div>

            <!-- Password -->
            <div>
              <label class="label-xs" style="display:block;color:var(--on-surface-variant);margin-bottom:0.5rem;margin-left:1rem;">PASSWORD</label>
              <div style="position:relative;">
                <span class="material-symbols-outlined" style="position:absolute;left:1rem;top:50%;transform:translateY(-50%);color:var(--outline);">lock</span>
                <input type="password" id="login-password" class="input-field" placeholder="••••••••" autocomplete="current-password" style="padding-right:3rem;" required>
                <button type="button" id="toggle-password" style="position:absolute;right:1rem;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;color:var(--outline);">
                  <span class="material-symbols-outlined">visibility</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Error Message -->
          <div id="login-error" style="display:none;padding:0.75rem 1rem;background:var(--error-container);color:var(--on-error-container);border-radius:var(--radius-md);font-size:0.875rem;font-weight:600;text-align:center;"></div>

          <!-- Submit -->
          <div style="padding-top:0.5rem;">
            <button type="submit" id="login-btn" class="btn btn--gradient" style="width:100%;height:3.5rem;text-transform:uppercase;font-size:1.125rem;letter-spacing:0.02em;">
              LOG IN
            </button>
          </div>
        </form>

        <!-- Seed Database Button -->
        <div style="margin-top:1.5rem;text-align:center;">
          <button type="button" id="btn-seed" style="background:none;border:1px solid var(--outline-variant);border-radius:var(--radius-full);padding:0.5rem 1.25rem;font-size:0.75rem;font-weight:700;color:var(--outline);cursor:pointer;font-family:'Manrope',sans-serif;letter-spacing:0.05em;transition:all 0.2s;">
            ⚡ Setup Database
          </button>
          <div id="seed-status" style="margin-top:0.5rem;font-size:0.75rem;font-weight:600;display:none;"></div>
        </div>

        <!-- Footer -->
        <div style="margin-top:2rem;display:flex;align-items:center;justify-content:space-between;opacity:0.5;">
          <span class="label-xs">By : Dadang M&nbsp; v 1.0</span>
          <div style="display:flex;gap:1rem;">
            <span class="material-symbols-outlined" style="font-size:1.125rem;">shield</span>
            <span class="material-symbols-outlined" style="font-size:1.125rem;">public</span>
          </div>
        </div>
      </main>
    </div>
  `}function Jp(){let n="user";const t=document.getElementById("role-user"),e=document.getElementById("role-admin");t&&e&&(t.addEventListener("click",()=>{n="user",t.classList.add("active"),e.classList.remove("active")}),e.addEventListener("click",()=>{n="admin",e.classList.add("active"),t.classList.remove("active")}));const r=document.getElementById("toggle-password"),s=document.getElementById("login-password");r&&s&&r.addEventListener("click",()=>{const p=s.type==="password";s.type=p?"text":"password",r.querySelector(".material-symbols-outlined").textContent=p?"visibility_off":"visibility"});const o=document.getElementById("login-form"),a=document.getElementById("login-error"),c=document.getElementById("login-btn");o&&o.addEventListener("submit",async p=>{p.preventDefault();const S=document.getElementById("login-username").value.trim(),C=document.getElementById("login-password").value;if(!S||!C){h("Masukkan username dan password");return}c.innerHTML='<div class="spinner" style="width:1.5rem;height:1.5rem;border-width:2px;"></div>',c.disabled=!0,d();try{await tu(S,C,n),window.location.hash="/dashboard"}catch(N){h(N.message||"Login gagal. Periksa username dan password."),c.innerHTML="LOG IN",c.disabled=!1}});function h(p){a&&(a.textContent=p,a.style.display="block")}function d(){a&&(a.style.display="none")}const m=document.getElementById("btn-seed"),y=document.getElementById("seed-status");m&&m.addEventListener("click",async()=>{m.disabled=!0,m.textContent="⏳ Menyiapkan database...",y&&(y.style.display="block",y.style.color="var(--outline)",y.textContent="Membuat tabel users...");try{await nu(),y&&(y.textContent="Membuat data demo..."),await Qp(),y&&(y.style.color="#16a34a",y.textContent="✅ Database siap! Login: admin/admin123 atau user/user123"),m.textContent="✅ Database Siap",m.style.borderColor="#16a34a",m.style.color="#16a34a"}catch(p){console.error("Seed error:",p),y&&(y.style.color="var(--error)",y.textContent="❌ Error: "+p.message),m.textContent="⚡ Setup Database",m.disabled=!1}})}function Xp(n){const t=(n==null?void 0:n.displayName)||"User",r=new Date().toLocaleDateString("id-ID",{weekday:"long",day:"numeric",month:"long",year:"numeric"});return`
    <div class="page" style="display:flex;flex-direction:column;gap:1.5rem;">
      <!-- Greeting -->
      <section>
        <p style="font-size:0.8125rem;color:var(--outline);font-weight:500;">Selamat datang,</p>
        <h2 class="font-headline" style="font-size:1.75rem;font-weight:800;color:var(--primary);letter-spacing:-0.03em;margin-top:0.125rem;">${t}</h2>
        <div style="display:flex;align-items:center;gap:0.5rem;margin-top:0.5rem;flex-wrap:wrap;">
          <span style="display:flex;align-items:center;gap:0.25rem;font-size:0.75rem;color:var(--outline);background:var(--surface-container-low);padding:0.25rem 0.75rem;border-radius:var(--radius-full);">
            <span class="material-symbols-outlined" style="font-size:0.875rem;">calendar_today</span> ${r}
          </span>
          <span style="display:flex;align-items:center;gap:0.25rem;font-size:0.75rem;color:white;background:var(--tertiary-container);padding:0.25rem 0.75rem;border-radius:var(--radius-full);">
            <span class="material-symbols-outlined" style="font-size:0.875rem;">badge</span> USER
          </span>
        </div>
      </section>

      <!-- Today Stats -->
      <section style="display:grid;grid-template-columns:1fr 1fr;gap:0.5rem;">
        <div class="card" style="min-height:90px;display:flex;flex-direction:column;justify-content:space-between;position:relative;overflow:hidden;">
          <div style="position:absolute;right:-0.25rem;top:-0.25rem;opacity:0.05;"><span class="material-symbols-outlined" style="font-size:3.5rem;">wb_sunny</span></div>
          <span class="label-xs" style="color:var(--outline);font-size:8px;">KAPAL TRIP PAGI</span>
          <div class="metric-value" style="font-size:2rem;color:var(--primary);" id="user-stat-pagi">—</div>
          <span style="font-size:0.625rem;color:var(--outline);font-weight:700;">KAPAL</span>
        </div>
        <div class="card" style="min-height:90px;display:flex;flex-direction:column;justify-content:space-between;position:relative;overflow:hidden;">
          <div style="position:absolute;right:-0.25rem;top:-0.25rem;opacity:0.05;"><span class="material-symbols-outlined" style="font-size:3.5rem;">wb_twilight</span></div>
          <span class="label-xs" style="color:var(--outline);font-size:8px;">KAPAL TRIP SIANG</span>
          <div class="metric-value" style="font-size:2rem;color:var(--secondary);" id="user-stat-siang">—</div>
          <span style="font-size:0.625rem;color:var(--outline);font-weight:700;">KAPAL</span>
        </div>
        <div class="card card--primary" style="min-height:90px;display:flex;flex-direction:column;justify-content:space-between;position:relative;overflow:hidden;">
          <div style="position:absolute;right:-0.25rem;top:-0.25rem;opacity:0.08;"><span class="material-symbols-outlined" style="font-size:3.5rem;">kayaking</span></div>
          <span class="label-xs" style="opacity:0.8;font-size:8px;">TOTAL KAPAL</span>
          <div class="metric-value" style="font-size:2rem;" id="user-stat-total">—</div>
          <span style="font-size:0.625rem;opacity:0.7;font-weight:700;">KAPAL</span>
        </div>
        <div class="card" style="min-height:90px;display:flex;flex-direction:column;justify-content:space-between;position:relative;overflow:hidden;background:var(--tertiary-container);">
          <div style="position:absolute;right:-0.25rem;top:-0.25rem;opacity:0.08;"><span class="material-symbols-outlined" style="font-size:3.5rem;">group</span></div>
          <span class="label-xs" style="color:var(--on-tertiary-container);font-size:8px;">TOTAL PEMESAN</span>
          <div class="metric-value" style="font-size:2rem;color:var(--on-tertiary-container);" id="user-stat-orders">—</div>
          <span style="font-size:0.625rem;color:var(--on-tertiary-container);font-weight:700;">PESANAN</span>
        </div>
      </section>

      <!-- Info -->
      <section style="background:var(--surface-container-low);border-radius:var(--radius-xl);padding:1.5rem;text-align:center;">
        <span class="material-symbols-outlined" style="font-size:3rem;color:var(--outline);opacity:0.3;display:block;margin-bottom:0.5rem;">info</span>
        <p style="color:var(--outline);font-size:0.8125rem;">Anda login sebagai <strong>User</strong>.<br>Untuk menambah pesanan, silakan hubungi Admin.</p>
      </section>
    </div>
  `}function Zp(){async function n(){try{const t=new Date().toISOString().split("T")[0],e=await He(Ut(Dt,"bookings"));let r=0,s=0,o=0;e.docs.forEach(m=>{const y=m.data();if(y.tanggal===t){o++;const p=y.jumlahPerahu||0;y.sesiTrip==="Siang"?s+=p:r+=p}});const a=document.getElementById("user-stat-pagi"),c=document.getElementById("user-stat-siang"),h=document.getElementById("user-stat-total"),d=document.getElementById("user-stat-orders");a&&(a.textContent=r),c&&(c.textContent=s),h&&(h.textContent=r+s),d&&(d.textContent=o)}catch(t){console.error(t)}}n()}const ru="rafting_types",su="tambahan_types";async function iu(){try{return(await He(Ut(Dt,ru))).docs.map(t=>({id:t.id,...t.data()}))}catch(n){return console.error(n),[]}}async function ou(){try{return(await He(Ut(Dt,su))).docs.map(t=>({id:t.id,...t.data()}))}catch(n){return console.error(n),[]}}function tg(n){return"Rp "+Number(n||0).toLocaleString("id-ID")}function ll(n,t,e,r,s,o,a,c,h,d){return`
    <section>
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1rem;">
        <h3 class="label-sm" style="color:var(--outline);letter-spacing:0.2em;">${n}</h3>
        <button id="${e}" style="display:flex;align-items:center;gap:0.375rem;padding:0.5rem 1rem;background:var(--primary);color:white;border:none;border-radius:var(--radius-full);cursor:pointer;font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:0.75rem;">
          <span class="material-symbols-outlined" style="font-size:1rem;">add</span> Tambah
        </button>
      </div>
      <div id="${r}" style="display:none;background:var(--surface-container-low);border-radius:var(--radius-xl);padding:1.25rem;margin-bottom:1rem;">
        <div style="display:flex;flex-direction:column;gap:0.75rem;">
          <div>
            <label class="label-xs" style="display:block;color:var(--on-surface-variant);margin-bottom:0.25rem;">NAMA</label>
            <input type="text" id="${s}" class="input-field" placeholder="Masukkan nama" style="padding-left:1rem;height:2.75rem;">
          </div>
          <div>
            <label class="label-xs" style="display:block;color:var(--on-surface-variant);margin-bottom:0.25rem;">${d}</label>
            <input type="number" id="${o}" class="input-field" placeholder="0" min="0" style="padding-left:1rem;height:2.75rem;">
          </div>
          <div style="display:flex;gap:0.5rem;">
            <button id="${a}" class="btn btn--primary" style="flex:1;font-size:0.8125rem;padding:0.625rem;">
              <span class="material-symbols-outlined" style="font-size:1rem;">save</span> Simpan
            </button>
            <button id="${c}" style="flex:1;padding:0.625rem;border:1px solid var(--outline-variant);background:none;border-radius:var(--radius-full);font-family:'Space Grotesk',sans-serif;font-weight:700;color:var(--outline);cursor:pointer;font-size:0.8125rem;">Batal</button>
          </div>
        </div>
      </div>
      <div id="${h}" style="display:flex;flex-direction:column;gap:0.5rem;">
        <div style="text-align:center;padding:2rem;color:var(--outline);"><div class="spinner" style="margin:0 auto 1rem;"></div>Memuat...</div>
      </div>
    </section>`}function eg(n){return`
    <div class="page" style="display:flex;flex-direction:column;gap:2rem;">
      <section style="display:flex;align-items:center;gap:0.75rem;">
        <button id="btn-back-settings" style="width:2.5rem;height:2.5rem;border-radius:50%;background:var(--surface-container-high);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--on-surface);">
          <span class="material-symbols-outlined">arrow_back</span>
        </button>
        <div>
          <h2 class="font-headline" style="font-size:1.75rem;font-weight:700;color:var(--primary);line-height:1;">Settings</h2>
          <p style="color:var(--outline);font-size:0.75rem;margin-top:0.25rem;">Kelola tipe rafting & tambahan</p>
        </div>
      </section>
      ${ll("TIPE RAFTING","kayaking","btn-add-type","type-form","type-name","type-price","btn-save-type","btn-cancel-type","types-list","HARGA PER KAPAL (Rp)")}
      ${ll("JENIS TAMBAHAN","add_shopping_cart","btn-add-extra","extra-form","extra-name","extra-price","btn-save-extra","btn-cancel-extra","extras-list","HARGA SATUAN (Rp)")}
    </div>
  `}function cl({col:n,addBtn:t,formId:e,nameId:r,priceId:s,saveBtn:o,cancelBtn:a,listId:c,icon:h,emptyText:d,loadFn:m}){var x,K,z;let y=null;const p=document.getElementById(e),S=document.getElementById(r),C=document.getElementById(s);async function N(){const B=document.getElementById(c),W=await m();if(W.length===0){B.innerHTML=`<div style="text-align:center;padding:1.5rem;color:var(--outline);font-size:0.875rem;">
        <span class="material-symbols-outlined" style="font-size:2rem;display:block;margin-bottom:0.5rem;opacity:0.3;">${h}</span>${d}</div>`;return}B.innerHTML=W.map(Q=>`
      <div style="display:flex;align-items:center;gap:1rem;padding:0.875rem 1.25rem;background:var(--surface-container-low);border-radius:var(--radius-xl);">
        <span class="material-symbols-outlined" style="color:var(--primary);font-size:1.25rem;">${h}</span>
        <div style="flex:1;">
          <p style="font-weight:700;font-size:0.8125rem;">${Q.name}</p>
          <p style="font-size:0.75rem;color:var(--secondary);font-weight:700;font-family:'Space Grotesk',sans-serif;">${tg(Q.price)}</p>
        </div>
        <button class="crud-edit" data-id="${Q.id}" data-name="${Q.name}" data-price="${Q.price}" style="width:2rem;height:2rem;border-radius:50%;background:var(--surface-container-high);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--primary);">
          <span class="material-symbols-outlined" style="font-size:1rem;">edit</span>
        </button>
        <button class="crud-del" data-id="${Q.id}" style="width:2rem;height:2rem;border-radius:50%;background:var(--error-container);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--error);">
          <span class="material-symbols-outlined" style="font-size:1rem;">delete</span>
        </button>
      </div>`).join(""),B.querySelectorAll(".crud-edit").forEach(Q=>{Q.addEventListener("click",()=>{y=Q.dataset.id,S.value=Q.dataset.name,C.value=Q.dataset.price,p.style.display="block"})}),B.querySelectorAll(".crud-del").forEach(Q=>{Q.addEventListener("click",async()=>{if(confirm("Hapus item ini?"))try{await Mp(ns(Dt,n,Q.dataset.id)),N()}catch(ht){alert("Gagal: "+ht.message)}})})}(x=document.getElementById(t))==null||x.addEventListener("click",()=>{y=null,S.value="",C.value="",p.style.display="block"}),(K=document.getElementById(a))==null||K.addEventListener("click",()=>{p.style.display="none",y=null}),(z=document.getElementById(o))==null||z.addEventListener("click",async()=>{const B=S.value.trim(),W=parseInt(C.value)||0;if(!B||!W){alert("Nama dan harga wajib diisi");return}try{y?await Op(ns(Dt,n,y),{name:B,price:W}):await sn(Ut(Dt,n),{name:B,price:W}),p.style.display="none",y=null,N()}catch(Q){alert("Gagal: "+Q.message)}}),N()}function ng(){var n;(n=document.getElementById("btn-back-settings"))==null||n.addEventListener("click",()=>{window.location.hash="/profile"}),cl({col:ru,addBtn:"btn-add-type",formId:"type-form",nameId:"type-name",priceId:"type-price",saveBtn:"btn-save-type",cancelBtn:"btn-cancel-type",listId:"types-list",icon:"kayaking",emptyText:"Belum ada tipe rafting.",loadFn:iu}),cl({col:su,addBtn:"btn-add-extra",formId:"extra-form",nameId:"extra-name",priceId:"extra-price",saveBtn:"btn-save-extra",cancelBtn:"btn-cancel-extra",listId:"extras-list",icon:"add_shopping_cart",emptyText:"Belum ada jenis tambahan.",loadFn:ou})}function rg(n){const t=(n==null?void 0:n.displayName)||"Admin",e=new Date,r=e.toLocaleDateString("id-ID",{weekday:"long",day:"numeric",month:"long",year:"numeric"}),s=e.toISOString().split("T")[0],o=new Date(e);o.setDate(o.getDate()-6);const a=o.toISOString().split("T")[0];return`
    <div class="page" style="display:flex;flex-direction:column;gap:1.5rem;">
      <!-- Greeting -->
      <section>
        <p style="font-size:0.8125rem;color:var(--outline);font-weight:500;">Selamat datang,</p>
        <h2 class="font-headline" style="font-size:1.75rem;font-weight:800;color:var(--primary);letter-spacing:-0.03em;margin-top:0.125rem;">${t}</h2>
        <div style="display:flex;align-items:center;gap:0.5rem;margin-top:0.5rem;flex-wrap:wrap;">
          <span style="display:flex;align-items:center;gap:0.25rem;font-size:0.75rem;color:var(--outline);background:var(--surface-container-low);padding:0.25rem 0.75rem;border-radius:var(--radius-full);">
            <span class="material-symbols-outlined" style="font-size:0.875rem;">calendar_today</span> ${r}
          </span>
          <span style="display:flex;align-items:center;gap:0.25rem;font-size:0.75rem;color:var(--secondary);background:var(--surface-container-low);padding:0.25rem 0.75rem;border-radius:var(--radius-full);">
            <span class="material-symbols-outlined" style="font-size:0.875rem;">timer</span> <span id="session-timer">00:00:00</span>
          </span>
        </div>
      </section>

      <!-- Today Stats -->
      <section style="display:grid;grid-template-columns:1fr 1fr;gap:0.5rem;">
        <div class="card" style="min-height:90px;display:flex;flex-direction:column;justify-content:space-between;position:relative;overflow:hidden;">
          <div style="position:absolute;right:-0.25rem;top:-0.25rem;opacity:0.05;"><span class="material-symbols-outlined" style="font-size:3.5rem;">wb_sunny</span></div>
          <span class="label-xs" style="color:var(--outline);font-size:8px;">KAPAL TRIP PAGI</span>
          <div class="metric-value" style="font-size:2rem;color:var(--primary);" id="stat-pagi">—</div>
          <span style="font-size:0.625rem;color:var(--outline);font-weight:700;">KAPAL</span>
        </div>
        <div class="card" style="min-height:90px;display:flex;flex-direction:column;justify-content:space-between;position:relative;overflow:hidden;">
          <div style="position:absolute;right:-0.25rem;top:-0.25rem;opacity:0.05;"><span class="material-symbols-outlined" style="font-size:3.5rem;">wb_twilight</span></div>
          <span class="label-xs" style="color:var(--outline);font-size:8px;">KAPAL TRIP SIANG</span>
          <div class="metric-value" style="font-size:2rem;color:var(--secondary);" id="stat-siang">—</div>
          <span style="font-size:0.625rem;color:var(--outline);font-weight:700;">KAPAL</span>
        </div>
        <div class="card card--primary" style="min-height:90px;display:flex;flex-direction:column;justify-content:space-between;position:relative;overflow:hidden;">
          <div style="position:absolute;right:-0.25rem;top:-0.25rem;opacity:0.08;"><span class="material-symbols-outlined" style="font-size:3.5rem;">kayaking</span></div>
          <span class="label-xs" style="opacity:0.8;font-size:8px;">TOTAL KAPAL</span>
          <div class="metric-value" style="font-size:2rem;" id="stat-total">—</div>
          <span style="font-size:0.625rem;opacity:0.7;font-weight:700;">KAPAL</span>
        </div>
        <div class="card" style="min-height:90px;display:flex;flex-direction:column;justify-content:space-between;position:relative;overflow:hidden;background:var(--tertiary-container);">
          <div style="position:absolute;right:-0.25rem;top:-0.25rem;opacity:0.08;"><span class="material-symbols-outlined" style="font-size:3.5rem;">group</span></div>
          <span class="label-xs" style="color:var(--on-tertiary-container);font-size:8px;">TOTAL PEMESAN</span>
          <div class="metric-value" style="font-size:2rem;color:var(--on-tertiary-container);" id="stat-orders">—</div>
          <span style="font-size:0.625rem;color:var(--on-tertiary-container);font-weight:700;">PESANAN</span>
        </div>
      </section>

      <!-- Chart Section -->
      <section>
        <h3 class="font-headline" style="font-size:1.125rem;font-weight:700;letter-spacing:-0.02em;margin-bottom:0.75rem;">Statistik Pesanan</h3>
        <div style="display:flex;gap:0.5rem;margin-bottom:1rem;flex-wrap:wrap;">
          <div style="flex:1;min-width:110px;">
            <label class="label-xs" style="display:block;color:var(--outline);margin-bottom:0.25rem;">DARI</label>
            <input type="date" id="chart-from" class="input-field" value="${a}" style="padding-left:0.75rem;height:2.25rem;font-size:0.75rem;">
          </div>
          <div style="flex:1;min-width:110px;">
            <label class="label-xs" style="display:block;color:var(--outline);margin-bottom:0.25rem;">SAMPAI</label>
            <input type="date" id="chart-to" class="input-field" value="${s}" style="padding-left:0.75rem;height:2.25rem;font-size:0.75rem;">
          </div>
          <div style="display:flex;align-items:flex-end;">
            <button id="btn-chart-filter" style="height:2.25rem;padding:0 1rem;background:var(--primary);color:white;border:none;border-radius:var(--radius-full);cursor:pointer;font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:0.75rem;display:flex;align-items:center;gap:0.25rem;">
              <span class="material-symbols-outlined" style="font-size:0.875rem;">filter_alt</span> Filter
            </button>
          </div>
        </div>
        <div style="display:flex;gap:1rem;margin-bottom:0.5rem;">
          <span style="display:flex;align-items:center;gap:0.25rem;font-size:0.6875rem;font-weight:700;color:var(--outline);"><span style="width:10px;height:10px;border-radius:2px;background:var(--primary);"></span> Pesanan</span>
          <span style="display:flex;align-items:center;gap:0.25rem;font-size:0.6875rem;font-weight:700;color:var(--outline);"><span style="width:10px;height:10px;border-radius:2px;background:var(--secondary);"></span> Kapal</span>
        </div>
        <div style="background:var(--surface-container-low);border-radius:var(--radius-xl);padding:1rem;min-height:220px;">
          <canvas id="chart-orders" style="width:100%;height:200px;"></canvas>
        </div>
      </section>
    </div>
  `}function sg(){return`
    <div class="modal-overlay" id="modal-booking" style="display:none;">
      <div class="modal-content" id="modal-booking-content">
        <div id="booking-form-view">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem;">
            <div>
              <h2 class="font-headline" style="font-size:1.5rem;font-weight:700;color:var(--primary);">Tambah Tamu</h2>
              <p style="font-size:0.75rem;color:var(--outline);margin-top:0.25rem;">Isi data pesanan pelanggan</p>
            </div>
            <button id="btn-modal-close" style="width:2.5rem;height:2.5rem;border-radius:50%;background:var(--surface-container-high);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--outline);">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>
          <form id="form-booking" style="display:flex;flex-direction:column;gap:1.25rem;">
            <div>
              <label class="label-xs" style="display:block;color:var(--on-surface-variant);margin-bottom:0.375rem;margin-left:0.25rem;">ID PESANAN</label>
              <input type="text" id="field-id-pesanan" class="input-field" readonly style="background:var(--surface-container-low);color:var(--outline);font-weight:700;letter-spacing:0.05em;">
            </div>
            <div>
              <label class="label-xs" style="display:block;color:var(--on-surface-variant);margin-bottom:0.375rem;margin-left:0.25rem;">NAMA PEMESAN <span style="color:var(--error);">*</span></label>
              <input type="text" id="field-nama" class="input-field" placeholder="Masukkan nama pemesan" required>
            </div>
            <div>
              <label class="label-xs" style="display:block;color:var(--on-surface-variant);margin-bottom:0.375rem;margin-left:0.25rem;">NO. TELP PEMESAN <span style="color:var(--error);">*</span></label>
              <input type="tel" id="field-telp" class="input-field" placeholder="08xxxxxxxxxx" required>
            </div>
            <div>
              <label class="label-xs" style="display:block;color:var(--on-surface-variant);margin-bottom:0.375rem;margin-left:0.25rem;">TANGGAL PEMESANAN <span style="color:var(--error);">*</span></label>
              <input type="date" id="field-tanggal" class="input-field" required>
            </div>
            <div>
              <label class="label-xs" style="display:block;color:var(--on-surface-variant);margin-bottom:0.375rem;margin-left:0.25rem;">RAFTING TYPE <span style="color:var(--error);">*</span></label>
              <select id="field-rafting-type" class="input-field" required style="padding-left:1rem;appearance:auto;cursor:pointer;">
                <option value="">-- Pilih Tipe Rafting --</option>
              </select>
            </div>
            <div>
              <label class="label-xs" style="display:block;color:var(--on-surface-variant);margin-bottom:0.375rem;margin-left:0.25rem;">JUMLAH PERAHU <span style="color:var(--error);">*</span></label>
              <input type="number" id="field-jumlah-perahu" class="input-field" placeholder="0" min="1" required>
            </div>
            <div>
              <label class="label-xs" style="display:block;color:var(--on-surface-variant);margin-bottom:0.375rem;margin-left:0.25rem;">SESI TRIP <span style="color:var(--error);">*</span></label>
              <div class="role-toggle" style="margin-top:0.25rem;">
                <button type="button" class="role-toggle__btn active" data-sesi="Pagi" id="sesi-pagi">
                  <span class="material-symbols-outlined" style="font-size:1rem;">wb_sunny</span> Pagi
                </button>
                <button type="button" class="role-toggle__btn" data-sesi="Siang" id="sesi-siang">
                  <span class="material-symbols-outlined" style="font-size:1rem;">wb_twilight</span> Siang
                </button>
              </div>
            </div>
            <div>
              <label class="label-xs" style="display:block;color:var(--on-surface-variant);margin-bottom:0.375rem;margin-left:0.25rem;">HARGA PER KAPAL (Rp)</label>
              <input type="number" id="field-harga" class="input-field" placeholder="Otomatis dari tipe" min="0" readonly style="background:var(--surface-container-low);color:var(--outline);font-weight:700;">
            </div>
            <!-- Tambahan Section -->
            <div>
              <button type="button" id="btn-tambahan" style="display:flex;align-items:center;gap:0.5rem;padding:0.625rem 1rem;background:var(--tertiary-container);color:var(--on-tertiary);border:none;border-radius:var(--radius-full);cursor:pointer;font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:0.8125rem;">
                <span class="material-symbols-outlined" style="font-size:1rem;">add_circle</span> Tambahan
              </button>
              <div id="tambahan-container" style="display:none;margin-top:0.75rem;display:flex;flex-direction:column;gap:0.75rem;">
              </div>
              <div id="tambahan-total-row" style="display:none;margin-top:0.5rem;background:var(--tertiary-fixed);border-radius:var(--radius-xl);padding:0.625rem 1rem;display:flex;justify-content:space-between;align-items:center;">
                <span class="label-xs" style="color:var(--tertiary);">TOTAL TAMBAHAN</span>
                <span id="field-tambahan-total" style="font-family:'Space Grotesk',sans-serif;font-size:1rem;font-weight:700;color:var(--tertiary);">Rp 0</span>
              </div>
            </div>
            <div>
              <label class="label-xs" style="display:block;color:var(--on-surface-variant);margin-bottom:0.375rem;margin-left:0.25rem;">TOTAL PESANAN</label>
              <div id="field-total" style="background:var(--surface-container-low);border-radius:var(--radius-xl);padding:0.875rem 1rem;font-family:'Space Grotesk',sans-serif;font-size:1.25rem;font-weight:700;color:var(--primary);">Rp 0</div>
            </div>
            <div>
              <label class="label-xs" style="display:block;color:var(--on-surface-variant);margin-bottom:0.375rem;margin-left:0.25rem;">DP (Rp) <span style="color:var(--error);">*</span></label>
              <input type="number" id="field-dp" class="input-field" placeholder="0" min="0" required>
            </div>
            <div>
              <label class="label-xs" style="display:block;color:var(--on-surface-variant);margin-bottom:0.375rem;margin-left:0.25rem;">KURANG BAYAR</label>
              <div id="field-kurang-bayar" style="background:var(--error-container);border-radius:var(--radius-xl);padding:0.875rem 1rem;font-family:'Space Grotesk',sans-serif;font-size:1.25rem;font-weight:700;color:var(--on-error-container);">Rp 0</div>
            </div>
            <div>
              <label class="label-xs" style="display:block;color:var(--on-surface-variant);margin-bottom:0.375rem;margin-left:0.25rem;">METODE BAYAR <span style="color:var(--error);">*</span></label>
              <div class="role-toggle" style="margin-top:0.25rem;">
                <button type="button" class="role-toggle__btn active" data-metode="Cash" id="metode-cash">
                  <span class="material-symbols-outlined" style="font-size:1rem;">payments</span> Cash
                </button>
                <button type="button" class="role-toggle__btn" data-metode="Transfer" id="metode-transfer">
                  <span class="material-symbols-outlined" style="font-size:1rem;">account_balance</span> Transfer
                </button>
              </div>
            </div>
            <div style="display:flex;gap:0.75rem;padding-top:0.5rem;">
              <button type="button" id="btn-batal" style="flex:1;padding:0.875rem;border:1px solid var(--outline-variant);background:none;border-radius:var(--radius-full);font-family:'Space Grotesk',sans-serif;font-weight:700;color:var(--outline);cursor:pointer;font-size:0.875rem;">Batal</button>
              <button type="submit" id="btn-simpan" class="btn btn--gradient" style="flex:2;height:auto;padding:0.875rem;font-size:0.875rem;">
                <span class="material-symbols-outlined" style="font-size:1.125rem;">save</span> Simpan Pesanan
              </button>
            </div>
          </form>
        </div>
        <div id="booking-receipt-view" style="display:none;">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem;">
            <div style="display:flex;align-items:center;gap:0.5rem;">
              <span class="material-symbols-outlined" style="color:#16a34a;font-size:1.75rem;">check_circle</span>
              <h2 class="font-headline" style="font-size:1.25rem;font-weight:700;color:#16a34a;">Pesanan Tersimpan!</h2>
            </div>
            <button id="btn-receipt-close" style="width:2.5rem;height:2.5rem;border-radius:50%;background:var(--surface-container-high);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--outline);">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>
          <div id="receipt-content" style="background:white;border:2px dashed var(--outline-variant);border-radius:var(--radius-xl);padding:1.5rem;">
            <div style="text-align:center;margin-bottom:1.25rem;padding-bottom:1rem;border-bottom:1px dashed var(--outline-variant);">
              <h3 class="font-headline" style="font-size:1.25rem;font-weight:800;color:var(--primary);letter-spacing:-0.02em;">CITRAELO RAFTING</h3>
              <p style="font-size:0.7rem;color:var(--outline);margin-top:0.25rem;">Struk Pemesanan</p>
              <p style="font-size:0.7rem;color:var(--outline);" id="receipt-date"></p>
            </div>
            <div style="display:flex;flex-direction:column;gap:0.75rem;font-size:0.8125rem;">
              <div style="display:flex;justify-content:space-between;"><span style="color:var(--outline);">ID Pesanan</span><span style="font-weight:700;" id="receipt-id"></span></div>
              <div style="display:flex;justify-content:space-between;"><span style="color:var(--outline);">Nama</span><span style="font-weight:700;" id="receipt-nama"></span></div>
              <div style="display:flex;justify-content:space-between;"><span style="color:var(--outline);">No. Telp</span><span style="font-weight:700;" id="receipt-telp"></span></div>
              <div style="display:flex;justify-content:space-between;"><span style="color:var(--outline);">Tanggal</span><span style="font-weight:700;" id="receipt-tanggal"></span></div>
              <div style="display:flex;justify-content:space-between;"><span style="color:var(--outline);">Jumlah Perahu</span><span style="font-weight:700;" id="receipt-perahu"></span></div>
              <div style="display:flex;justify-content:space-between;"><span style="color:var(--outline);">Sesi Trip</span><span style="font-weight:700;" id="receipt-sesi"></span></div>
              <div style="display:flex;justify-content:space-between;"><span style="color:var(--outline);">Harga/Kapal</span><span style="font-weight:700;" id="receipt-harga"></span></div>
              <div id="receipt-tambahan-section"></div>
              <div style="border-top:1px dashed var(--outline-variant);padding-top:0.75rem;margin-top:0.25rem;">
                <div style="display:flex;justify-content:space-between;"><span style="font-weight:700;">Total</span><span style="font-weight:800;color:var(--primary);font-size:1rem;" id="receipt-total"></span></div>
              </div>
              <div style="display:flex;justify-content:space-between;"><span style="color:var(--outline);">DP</span><span style="font-weight:700;color:#16a34a;" id="receipt-dp"></span></div>
              <div style="display:flex;justify-content:space-between;"><span style="color:var(--outline);">Kurang Bayar</span><span style="font-weight:800;color:var(--error);" id="receipt-kurang"></span></div>
              <div style="display:flex;justify-content:space-between;"><span style="color:var(--outline);">Metode Bayar</span><span style="font-weight:700;" id="receipt-metode"></span></div>
            </div>
            <div style="text-align:center;margin-top:1.25rem;padding-top:1rem;border-top:1px dashed var(--outline-variant);">
              <p style="font-size:0.7rem;color:var(--outline);">Terima kasih telah memilih CitraElo Rafting!</p>
              <p style="font-size:0.65rem;color:var(--outline);margin-top:0.25rem;">— Safe Rivers, Great Adventures —</p>
            </div>
          </div>
          <div style="display:flex;gap:0.75rem;margin-top:1.5rem;">
            <button type="button" id="btn-cetak" class="btn btn--gradient" style="flex:2;height:auto;padding:0.875rem;font-size:0.875rem;">
              <span class="material-symbols-outlined" style="font-size:1.125rem;">print</span> Cetak Struk
            </button>
            <button type="button" id="btn-tutup" style="flex:1;padding:0.875rem;border:1px solid var(--outline-variant);background:none;border-radius:var(--radius-full);font-family:'Space Grotesk',sans-serif;font-weight:700;color:var(--outline);cursor:pointer;font-size:0.875rem;">Tutup</button>
          </div>
        </div>
      </div>
    </div>
  `}function ig(){var I,_,zt,pe,cr,ge,ye,Qe,In,ur,Gt,_t,hr,ve;(I=document.getElementById("modal-booking"))==null||I.remove(),document.body.insertAdjacentHTML("beforeend",sg());const n=document.getElementById("modal-booking"),t=document.getElementById("booking-form-view"),e=document.getElementById("booking-receipt-view");if(!n)return;const r=Date.now(),s=document.getElementById("session-timer");s&&setInterval(()=>{const D=Math.floor((Date.now()-r)/1e3),F=String(Math.floor(D/3600)).padStart(2,"0"),k=String(Math.floor(D%3600/60)).padStart(2,"0"),q=String(D%60).padStart(2,"0");s.textContent=`${F}:${k}:${q}`},1e3);async function o(){try{const D=new Date().toISOString().split("T")[0],F=await He(Ut(Dt,"bookings"));let k=0,q=0,Y=0;F.docs.forEach(Yt=>{const lt=Yt.data();if(lt.tanggal===D){Y++;const dt=lt.jumlahPerahu||0;lt.sesiTrip==="Siang"?q+=dt:k+=dt}});const Z=document.getElementById("stat-pagi"),nt=document.getElementById("stat-siang"),Rt=document.getElementById("stat-total"),rt=document.getElementById("stat-orders");Z&&(Z.textContent=k),nt&&(nt.textContent=q),Rt&&(Rt.textContent=k+q),rt&&(rt.textContent=Y)}catch(D){console.error("Stats error:",D)}}o();async function a(D,F){try{const k=await He(Ut(Dt,"bookings")),q={},Y=new Date(D),Z=new Date(F);for(let nt=new Date(Y);nt<=Z;nt.setDate(nt.getDate()+1)){const Rt=nt.toISOString().split("T")[0];q[Rt]={orders:0,boats:0}}k.docs.forEach(nt=>{const Rt=nt.data(),rt=Rt.tanggal;rt&&q[rt]!==void 0&&(q[rt].orders++,q[rt].boats+=Rt.jumlahPerahu||0)}),c(q)}catch(k){console.error("Chart error:",k)}}function c(D){const F=document.getElementById("chart-orders");if(!F)return;const k=F.getContext("2d"),q=window.devicePixelRatio||1;F.width=F.offsetWidth*q,F.height=200*q,k.scale(q,q);const Y=F.offsetWidth,Z=200;k.clearRect(0,0,Y,Z);const nt=Object.keys(D).sort();if(nt.length===0)return;const Rt=Math.max(1,...nt.map(dt=>Math.max(D[dt].orders,D[dt].boats))),rt=Math.min(20,(Y-40)/nt.length/2.5),Yt=(Y-40)/nt.length,lt=Z-40;k.strokeStyle="#e0e0e0",k.lineWidth=.5;for(let dt=0;dt<=4;dt++){const Jt=10+lt/4*dt;k.beginPath(),k.moveTo(30,Jt),k.lineTo(Y,Jt),k.stroke()}nt.forEach((dt,Jt)=>{const Xt=35+Jt*Yt,ae=D[dt].orders/Rt*lt,_e=D[dt].boats/Rt*lt;k.fillStyle="#003461",k.beginPath();const Ht=Math.min(3,rt/2),jt=Xt,Zt=10+lt-ae;k.moveTo(jt,Zt+Ht),k.arcTo(jt,Zt,jt+rt,Zt,Ht),k.arcTo(jt+rt,Zt,jt+rt,Zt+ae,Ht),k.lineTo(jt+rt,10+lt),k.lineTo(jt,10+lt),k.closePath(),k.fill(),k.fillStyle="#ab3600";const Kt=Xt+rt+2,ct=10+lt-_e;k.beginPath(),k.moveTo(Kt,ct+Ht),k.arcTo(Kt,ct,Kt+rt,ct,Ht),k.arcTo(Kt+rt,ct,Kt+rt,ct+_e,Ht),k.lineTo(Kt+rt,10+lt),k.lineTo(Kt,10+lt),k.closePath(),k.fill(),k.fillStyle="#666",k.font="9px sans-serif",k.textAlign="center";const wt=dt.slice(5);k.fillText(wt,Xt+rt,Z-5),k.fillStyle="#003461",k.font="bold 8px sans-serif",D[dt].orders>0&&k.fillText(D[dt].orders,jt+rt/2,Zt-3),k.fillStyle="#ab3600",D[dt].boats>0&&k.fillText(D[dt].boats,Kt+rt/2,ct-3)})}const h=document.getElementById("chart-from"),d=document.getElementById("chart-to");h&&d&&(a(h.value,d.value),(_=document.getElementById("btn-chart-filter"))==null||_.addEventListener("click",()=>{a(h.value,d.value)}));let m="Pagi",y="Cash",p=null;function S(){const D=new Date,F=String(D.getFullYear()).slice(-2),k=String(D.getMonth()+1).padStart(2,"0"),q=String(D.getDate()).padStart(2,"0"),Y=String(Math.floor(Math.random()*9e3)+1e3);return`CE-${F}${k}${q}-${Y}`}function C(D){return"Rp "+Number(D||0).toLocaleString("id-ID")}let N=[];const x=document.getElementById("field-rafting-type");async function K(){N=await iu(),x&&(x.innerHTML='<option value="">-- Pilih Tipe Rafting --</option>'+N.map(D=>`<option value="${D.id}" data-price="${D.price}">${D.name} — ${C(D.price)}</option>`).join(""))}K(),x==null||x.addEventListener("change",()=>{var q;const D=x.options[x.selectedIndex],F=((q=D==null?void 0:D.dataset)==null?void 0:q.price)||0,k=document.getElementById("field-harga");k&&(k.value=F,k.dispatchEvent(new Event("input")))}),(zt=document.getElementById("btn-tambah-tamu"))==null||zt.addEventListener("click",()=>{var k,q,Y,Z;t.style.display="block",e.style.display="none",document.getElementById("form-booking").reset(),document.getElementById("field-id-pesanan").value=S();const D=new Date().toISOString().split("T")[0];document.getElementById("field-tanggal").value=D,document.getElementById("field-total").textContent="Rp 0",document.getElementById("field-kurang-bayar").textContent="Rp 0",m="Pagi",y="Cash",(k=document.getElementById("sesi-pagi"))==null||k.classList.add("active"),(q=document.getElementById("sesi-siang"))==null||q.classList.remove("active"),(Y=document.getElementById("metode-cash"))==null||Y.classList.add("active"),(Z=document.getElementById("metode-transfer"))==null||Z.classList.remove("active");const F=document.getElementById("tambahan-container");F.innerHTML="",F.style.display="none",document.getElementById("tambahan-total-row").style.display="none",document.getElementById("field-tambahan-total").textContent="Rp 0",n.style.display="flex",document.body.style.overflow="hidden"});function z(){n.style.display="none",document.body.style.overflow=""}(pe=document.getElementById("btn-modal-close"))==null||pe.addEventListener("click",z),(cr=document.getElementById("btn-batal"))==null||cr.addEventListener("click",z),(ge=document.getElementById("btn-receipt-close"))==null||ge.addEventListener("click",z),(ye=document.getElementById("btn-tutup"))==null||ye.addEventListener("click",z),n.addEventListener("click",D=>{D.target===n&&z()}),(Qe=document.getElementById("sesi-pagi"))==null||Qe.addEventListener("click",()=>{m="Pagi",document.getElementById("sesi-pagi").classList.add("active"),document.getElementById("sesi-siang").classList.remove("active")}),(In=document.getElementById("sesi-siang"))==null||In.addEventListener("click",()=>{m="Siang",document.getElementById("sesi-siang").classList.add("active"),document.getElementById("sesi-pagi").classList.remove("active")}),(ur=document.getElementById("metode-cash"))==null||ur.addEventListener("click",()=>{y="Cash",document.getElementById("metode-cash").classList.add("active"),document.getElementById("metode-transfer").classList.remove("active")}),(Gt=document.getElementById("metode-transfer"))==null||Gt.addEventListener("click",()=>{y="Transfer",document.getElementById("metode-transfer").classList.add("active"),document.getElementById("metode-cash").classList.remove("active")});const B=document.getElementById("field-jumlah-perahu"),W=document.getElementById("field-harga"),Q=document.getElementById("field-dp"),ht=document.getElementById("field-total"),w=document.getElementById("field-kurang-bayar");function g(){let D=0;document.querySelectorAll(".tambahan-row").forEach(k=>{var Z,nt;const q=parseInt((Z=k.querySelector(".tambahan-qty"))==null?void 0:Z.value)||0,Y=parseInt((nt=k.querySelector(".tambahan-price"))==null?void 0:nt.value)||0;D+=q*Y});const F=document.getElementById("field-tambahan-total");return F&&(F.textContent=C(D)),D}function v(){const D=parseInt(B==null?void 0:B.value)||0,F=parseInt(W==null?void 0:W.value)||0,k=parseInt(Q==null?void 0:Q.value)||0,q=g(),Y=D*F+q,Z=Math.max(0,Y-k);ht&&(ht.textContent=C(Y)),w&&(w.textContent=C(Z))}B==null||B.addEventListener("input",v),W==null||W.addEventListener("input",v),Q==null||Q.addEventListener("input",v);let E=[];ou().then(D=>{E=D}),(_t=document.getElementById("btn-tambahan"))==null||_t.addEventListener("click",()=>{const D=document.getElementById("tambahan-container");D.style.display="flex",document.getElementById("tambahan-total-row").style.display="flex";const F=document.createElement("div");F.className="tambahan-row",F.style.cssText="display:flex;gap:0.5rem;align-items:flex-end;";const k=E.map(Z=>`<option value="${Z.name}" data-price="${Z.price}">${Z.name} — ${C(Z.price)}</option>`).join("");F.innerHTML=`
      <div style="flex:3;">
        <label class="label-xs" style="display:block;color:var(--on-surface-variant);margin-bottom:0.25rem;font-size:9px;">JENIS</label>
        <select class="input-field tambahan-jenis" style="padding-left:0.5rem;height:2.5rem;font-size:0.75rem;appearance:auto;cursor:pointer;">
          <option value="">-- Pilih --</option>
          ${k}
        </select>
      </div>
      <div style="flex:1;">
        <label class="label-xs" style="display:block;color:var(--on-surface-variant);margin-bottom:0.25rem;font-size:9px;">JML</label>
        <input type="number" class="input-field tambahan-qty" placeholder="0" min="1" value="1" style="padding-left:0.5rem;height:2.5rem;font-size:0.8125rem;">
      </div>
      <div style="flex:1.5;">
        <label class="label-xs" style="display:block;color:var(--on-surface-variant);margin-bottom:0.25rem;font-size:9px;">HARGA</label>
        <input type="number" class="input-field tambahan-price" placeholder="0" min="0" readonly style="padding-left:0.5rem;height:2.5rem;font-size:0.8125rem;background:var(--surface-container-low);color:var(--outline);font-weight:700;">
      </div>
      <button type="button" class="tambahan-remove" style="width:2.5rem;height:2.5rem;border-radius:50%;background:var(--error-container);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--error);flex-shrink:0;">
        <span class="material-symbols-outlined" style="font-size:1.125rem;">close</span>
      </button>
    `,D.appendChild(F);const q=F.querySelector(".tambahan-jenis"),Y=F.querySelector(".tambahan-price");q.addEventListener("change",()=>{var nt;const Z=q.options[q.selectedIndex];Y.value=((nt=Z==null?void 0:Z.dataset)==null?void 0:nt.price)||0,v()}),F.querySelector(".tambahan-qty").addEventListener("input",v),F.querySelector(".tambahan-remove").addEventListener("click",()=>{F.remove(),v(),document.querySelectorAll(".tambahan-row").length||(D.style.display="none",document.getElementById("tambahan-total-row").style.display="none")}),v()}),(hr=document.getElementById("form-booking"))==null||hr.addEventListener("submit",async D=>{var Yt;D.preventDefault();const F=document.getElementById("btn-simpan");F.innerHTML='<div class="spinner" style="width:1.25rem;height:1.25rem;border-width:2px;"></div> Menyimpan...',F.disabled=!0;const k=parseInt(B.value)||0,q=parseInt(W.value)||0,Y=parseInt(Q.value)||0,Z=g(),nt=k*q+Z,Rt=Math.max(0,nt-Y),rt=[];document.querySelectorAll(".tambahan-row").forEach(lt=>{var ae,_e,Ht;const dt=((ae=lt.querySelector(".tambahan-jenis"))==null?void 0:ae.value)||"",Jt=parseInt((_e=lt.querySelector(".tambahan-qty"))==null?void 0:_e.value)||0,Xt=parseInt((Ht=lt.querySelector(".tambahan-price"))==null?void 0:Ht.value)||0;dt&&Jt&&Xt&&rt.push({jenis:dt,qty:Jt,harga:Xt,subtotal:Jt*Xt})}),p={idPesanan:document.getElementById("field-id-pesanan").value,nama:document.getElementById("field-nama").value,telp:document.getElementById("field-telp").value,tanggal:document.getElementById("field-tanggal").value,raftingType:((Yt=x==null?void 0:x.options[x.selectedIndex])==null?void 0:Yt.text)||"",jumlahPerahu:k,sesiTrip:m,hargaPerKapal:q,tambahan:rt,tambahanTotal:Z,totalPesanan:nt,dp:Y,kurangBayar:Rt,metodeBayar:y};try{await sn(Ut(Dt,"bookings"),{...p,createdAt:on(),status:Y>=nt?"paid":"pending"}),b(p)}catch(lt){console.error("Save error:",lt),alert("Gagal menyimpan: "+lt.message),F.innerHTML='<span class="material-symbols-outlined" style="font-size:1.125rem;">save</span> Simpan Pesanan',F.disabled=!1}});function b(D){t.style.display="none",e.style.display="block";const F=new Date;document.getElementById("receipt-date").textContent=F.toLocaleDateString("id-ID",{weekday:"long",year:"numeric",month:"long",day:"numeric"})+" "+F.toLocaleTimeString("id-ID",{hour:"2-digit",minute:"2-digit"}),document.getElementById("receipt-id").textContent=D.idPesanan,document.getElementById("receipt-nama").textContent=D.nama,document.getElementById("receipt-telp").textContent=D.telp,document.getElementById("receipt-tanggal").textContent=new Date(D.tanggal).toLocaleDateString("id-ID",{day:"numeric",month:"long",year:"numeric"}),document.getElementById("receipt-perahu").textContent=D.jumlahPerahu+" kapal",document.getElementById("receipt-sesi").textContent=D.sesiTrip,document.getElementById("receipt-harga").textContent=C(D.hargaPerKapal),document.getElementById("receipt-total").textContent=C(D.totalPesanan),document.getElementById("receipt-dp").textContent=C(D.dp),document.getElementById("receipt-kurang").textContent=C(D.kurangBayar),document.getElementById("receipt-metode").textContent=D.metodeBayar;const k=document.getElementById("receipt-tambahan-section");if(D.tambahan&&D.tambahan.length>0){let q='<div style="border-top:1px dashed var(--outline-variant);padding-top:0.5rem;margin-top:0.25rem;">';q+='<div style="font-weight:700;font-size:0.75rem;color:var(--tertiary);margin-bottom:0.375rem;">TAMBAHAN</div>',D.tambahan.forEach(Y=>{q+=`<div style="display:flex;justify-content:space-between;padding:2px 0;"><span style="color:var(--outline);">${Y.jenis} (${Y.qty}x)</span><span style="font-weight:700;">${C(Y.subtotal)}</span></div>`}),q+="</div>",k.innerHTML=q}else k.innerHTML=""}(ve=document.getElementById("btn-cetak"))==null||ve.addEventListener("click",()=>{if(!document.getElementById("receipt-content"))return;const F=window.open("","_blank","width=380,height=600");F.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <title>Struk - ${(p==null?void 0:p.idPesanan)||""}</title>
        <style>
          * { margin:0; padding:0; box-sizing:border-box; }
          body {
            font-family: 'Courier New', monospace;
            padding: 12px;
            max-width: 380px;
            margin: 0 auto;
            font-size: 13px;
            color: #1a1a1a;
          }
          .center { text-align:center; }
          .bold { font-weight:bold; }
          .divider { border-top:1px dashed #999; margin:10px 0; }
          .row { display:flex; justify-content:space-between; padding:3px 0; }
          .title { font-size:18px; font-weight:900; letter-spacing:1px; }
          .total-row { font-size:15px; font-weight:900; }
          .footer { font-size:10px; color:#666; margin-top:12px; }
          @media print {
            body { padding: 0; }
            .no-print { display:none; }
          }
        </style>
      </head>
      <body>
        <div class="center">
          <div class="title">CITRAELO RAFTING</div>
          <div style="font-size:11px;color:#666;margin-top:4px;">Struk Pemesanan</div>
          <div style="font-size:11px;color:#666;">${new Date().toLocaleDateString("id-ID",{weekday:"long",year:"numeric",month:"long",day:"numeric"})} ${new Date().toLocaleTimeString("id-ID",{hour:"2-digit",minute:"2-digit"})}</div>
        </div>
        <div class="divider"></div>
        <div class="row"><span>ID Pesanan</span><span class="bold">${(p==null?void 0:p.idPesanan)||""}</span></div>
        <div class="row"><span>Nama</span><span class="bold">${(p==null?void 0:p.nama)||""}</span></div>
        <div class="row"><span>No. Telp</span><span class="bold">${(p==null?void 0:p.telp)||""}</span></div>
        <div class="row"><span>Tanggal</span><span class="bold">${p!=null&&p.tanggal?new Date(p.tanggal).toLocaleDateString("id-ID",{day:"numeric",month:"long",year:"numeric"}):""}</span></div>
        <div class="row"><span>Jml Perahu</span><span class="bold">${(p==null?void 0:p.jumlahPerahu)||0} kapal</span></div>
        <div class="row"><span>Sesi Trip</span><span class="bold">${(p==null?void 0:p.sesiTrip)||""}</span></div>
        <div class="row"><span>Harga/Kapal</span><span class="bold">${C(p==null?void 0:p.hargaPerKapal)}</span></div>
        ${p!=null&&p.tambahan&&p.tambahan.length>0?`
        <div class="divider"></div>
        <div style="font-weight:bold;font-size:12px;">TAMBAHAN</div>
        ${p.tambahan.map(k=>`<div class="row"><span>${k.jenis} (${k.qty}x)</span><span class="bold">${C(k.subtotal)}</span></div>`).join("")}
        `:""}
        <div class="divider"></div>
        <div class="row total-row"><span>TOTAL</span><span>${C(p==null?void 0:p.totalPesanan)}</span></div>
        <div class="row"><span>DP</span><span class="bold" style="color:green;">${C(p==null?void 0:p.dp)}</span></div>
        <div class="row"><span>Kurang Bayar</span><span class="bold" style="color:red;">${C(p==null?void 0:p.kurangBayar)}</span></div>
        <div class="row"><span>Metode</span><span class="bold">${(p==null?void 0:p.metodeBayar)||""}</span></div>
        <div class="divider"></div>
        <div class="center footer">
          <div>Terima kasih telah memilih CitraElo Rafting!</div>
          <div>— Safe Rivers, Great Adventures —</div>
        </div>
        <div class="center no-print" style="margin-top:20px;">
          <button onclick="window.print()" style="padding:10px 32px;font-size:14px;font-weight:bold;background:#003461;color:white;border:none;border-radius:999px;cursor:pointer;">
            🖨️ Print
          </button>
        </div>
      </body>
      </html>
    `),F.document.close(),F.onload=()=>{setTimeout(()=>F.print(),300)}})}const au=["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"],og=["Min","Sen","Sel","Rab","Kam","Jum","Sab"];let ee,Ot,Xi=[];function ag(n){const t=new Date;return ee=t.getFullYear(),Ot=t.getMonth(),`
    <div class="page" style="display:flex;flex-direction:column;gap:1.5rem;">
      <section style="display:flex;flex-direction:column;gap:1rem;">
        <div style="display:flex;align-items:flex-end;justify-content:space-between;">
          <div>
            <span class="label-sm" style="color:var(--secondary);letter-spacing:0.05em;">JADWAL PESANAN</span>
            <h1 class="font-headline" style="font-size:1.75rem;font-weight:700;color:var(--primary);letter-spacing:-0.03em;margin-top:0.25rem;" id="cal-title"></h1>
          </div>
          <div style="display:flex;gap:0.5rem;">
            <button style="width:2.5rem;height:2.5rem;border-radius:var(--radius-md);background:var(--surface-container-low);color:var(--primary);display:flex;align-items:center;justify-content:center;border:none;cursor:pointer;" id="cal-prev">
              <span class="material-symbols-outlined">chevron_left</span>
            </button>
            <button style="width:2.5rem;height:2.5rem;border-radius:var(--radius-md);background:var(--surface-container-low);color:var(--primary);display:flex;align-items:center;justify-content:center;border:none;cursor:pointer;" id="cal-next">
              <span class="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
        <div style="background:var(--surface-container-lowest);border-radius:var(--radius-xl);padding:1rem;box-shadow:var(--shadow-card);">
          <div class="calendar-grid" style="margin-bottom:0.5rem;">
            ${og.map(e=>`<div style="text-align:center;font-size:0.6875rem;font-weight:700;color:var(--outline);padding:0.375rem 0;text-transform:uppercase;letter-spacing:0.1em;">${e}</div>`).join("")}
          </div>
          <div class="calendar-grid" id="cal-days"></div>
        </div>
      </section>
      <!-- Booking popup (hidden) -->
      <div id="cal-popup" style="display:none;position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,0.5);display:none;align-items:flex-end;justify-content:center;">
        <div style="width:100%;max-width:420px;max-height:80vh;overflow-y:auto;background:var(--surface);border-radius:var(--radius-xl) var(--radius-xl) 0 0;padding:1.5rem;animation:slideUp 0.3s ease;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">
            <h3 class="font-headline" style="font-size:1.25rem;font-weight:700;color:var(--primary);" id="popup-title"></h3>
            <button id="popup-close" style="width:2rem;height:2rem;border-radius:50%;background:var(--surface-container-high);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;">
              <span class="material-symbols-outlined" style="font-size:1.125rem;">close</span>
            </button>
          </div>
          <div id="popup-stats" style="display:grid;grid-template-columns:1fr 1fr;gap:0.5rem;margin-bottom:1rem;"></div>
          <div id="popup-content"></div>
        </div>
      </div>
    </div>
  `}function Nr(){const n=document.getElementById("cal-days"),t=document.getElementById("cal-title");if(!n||!t)return;t.textContent=`${au[Ot]} ${ee}`;const e=new Date(ee,Ot,1).getDay(),r=new Date(ee,Ot+1,0).getDate(),s=new Date,o=s.getDate(),a=s.getMonth(),c=s.getFullYear(),h={};Xi.forEach(m=>{if(!m.tanggal)return;const y=new Date(m.tanggal);if(y.getFullYear()===ee&&y.getMonth()===Ot){const p=y.getDate();h[p]=(h[p]||0)+1}});let d="";for(let m=0;m<e;m++)d+='<div class="calendar-day calendar-day--inactive"></div>';for(let m=1;m<=r;m++){const y=m===o&&Ot===a&&ee===c,S=(h[m]||0)>0;d+=`<div class="calendar-day ${y?"calendar-day--active":""} ${S&&!y?"calendar-day--has-event":""}" data-day="${m}" style="cursor:pointer;position:relative;">
      ${m}
      ${S?`<span style="position:absolute;bottom:2px;left:50%;transform:translateX(-50%);width:5px;height:5px;border-radius:50%;background:${y?"white":"var(--secondary)"};"></span>`:""}
    </div>`}n.innerHTML=d,n.querySelectorAll(".calendar-day[data-day]").forEach(m=>{m.addEventListener("click",()=>{const y=parseInt(m.dataset.day);lg(y)})})}function lg(n){const t=`${ee}-${String(Ot+1).padStart(2,"0")}-${String(n).padStart(2,"0")}`,e=Xi.filter(m=>m.tanggal===t),r=document.getElementById("cal-popup"),s=document.getElementById("popup-title"),o=document.getElementById("popup-stats"),a=document.getElementById("popup-content");s.textContent=`${n} ${au[Ot]} ${ee}`;const c=e.filter(m=>m.sesiTrip!=="Siang"),h=e.filter(m=>m.sesiTrip==="Siang"),d=e.reduce((m,y)=>m+(y.jumlahPerahu||0),0);if(o.innerHTML=`
    <div style="background:var(--surface-container-low);border-radius:var(--radius-xl);padding:0.75rem;text-align:center;">
      <div style="font-size:1.5rem;font-weight:800;color:var(--primary);font-family:'Space Grotesk',sans-serif;">${e.length}</div>
      <div class="label-xs" style="color:var(--outline);">PEMESAN</div>
    </div>
    <div style="background:var(--surface-container-low);border-radius:var(--radius-xl);padding:0.75rem;text-align:center;">
      <div style="font-size:1.5rem;font-weight:800;color:var(--secondary);font-family:'Space Grotesk',sans-serif;">${d}</div>
      <div class="label-xs" style="color:var(--outline);">TOTAL KAPAL</div>
    </div>
  `,e.length===0)a.innerHTML=`<div style="text-align:center;padding:2rem;color:var(--outline);">
      <span class="material-symbols-outlined" style="font-size:2.5rem;opacity:0.3;display:block;margin-bottom:0.5rem;">event_busy</span>
      Tidak ada pesanan pada tanggal ini.
    </div>`;else{let m="";c.length>0&&(m+=ul("Pagi",c)),h.length>0&&(m+=ul("Siang",h)),a.innerHTML=m}r.style.display="flex",document.body.style.overflow="hidden"}function ul(n,t){const e=n==="Pagi"?"wb_sunny":"wb_twilight",r=n==="Pagi"?"var(--primary)":"var(--secondary)",s=t.reduce((a,c)=>a+(c.jumlahPerahu||0),0);let o=`
    <div style="margin-bottom:1rem;">
      <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.75rem;padding:0.5rem 0.75rem;background:${n==="Pagi"?"var(--primary-fixed)":"var(--secondary-fixed)"};border-radius:var(--radius-full);">
        <span class="material-symbols-outlined" style="font-size:1rem;color:${r};">${e}</span>
        <span style="font-weight:700;font-size:0.8125rem;color:${r};">Trip ${n}</span>
        <span style="margin-left:auto;font-size:0.75rem;font-weight:700;color:${r};">${s} kapal</span>
      </div>`;return t.forEach(a=>{o+=`
      <div style="display:flex;align-items:center;gap:0.75rem;padding:0.625rem 0.75rem;background:var(--surface-container-low);border-radius:var(--radius-xl);margin-bottom:0.375rem;">
        <div style="width:2rem;height:2rem;border-radius:50%;background:${r};color:white;display:flex;align-items:center;justify-content:center;font-size:0.6875rem;font-weight:700;flex-shrink:0;">
          ${(a.nama||"?").charAt(0).toUpperCase()}
        </div>
        <div style="flex:1;min-width:0;">
          <p style="font-weight:700;font-size:0.8125rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${a.nama||"-"}</p>
          <p style="font-size:0.6875rem;color:var(--outline);">${a.raftingType||""}</p>
        </div>
        <div style="text-align:right;flex-shrink:0;">
          <p style="font-weight:800;font-size:0.875rem;color:${r};font-family:'Space Grotesk',sans-serif;">${a.jumlahPerahu||0}</p>
          <p style="font-size:0.5625rem;color:var(--outline);font-weight:700;">KAPAL</p>
        </div>
      </div>`}),o+="</div>",o}function cg(){var n,t,e;He(Ut(Dt,"bookings")).then(r=>{Xi=r.docs.map(s=>s.data()),Nr()}).catch(r=>{console.error(r),Nr()}),(n=document.getElementById("cal-prev"))==null||n.addEventListener("click",()=>{Ot--,Ot<0&&(Ot=11,ee--),Nr()}),(t=document.getElementById("cal-next"))==null||t.addEventListener("click",()=>{Ot++,Ot>11&&(Ot=0,ee++),Nr()}),(e=document.getElementById("cal-popup"))==null||e.addEventListener("click",r=>{(r.target.id==="cal-popup"||r.target.closest("#popup-close"))&&(document.getElementById("cal-popup").style.display="none",document.body.style.overflow="")})}function ug(n){const t=[{month:"Mar",height:40},{month:"Apr",height:55},{month:"May",height:45},{month:"Jun",height:70},{month:"Jul",height:85},{month:"Aug",height:95},{month:"Sep",height:60}];return`
    <div class="page" style="display:flex;flex-direction:column;gap:2rem;">
      
      <!-- Header -->
      <section style="display:flex;flex-direction:column;gap:1rem;">
        <div>
          <h2 class="font-headline" style="font-size:2rem;font-weight:800;letter-spacing:-0.02em;color:var(--primary);">Expedition Intelligence</h2>
          <p style="color:var(--on-surface-variant);font-weight:500;margin-top:0.25rem;">Performance analytics and operational insights for the current season.</p>
        </div>
        <div class="period-filter">
          <button class="period-filter__btn">WEEKLY</button>
          <button class="period-filter__btn active">MONTHLY</button>
          <button class="period-filter__btn">YEARLY</button>
        </div>
      </section>

      <!-- Revenue by Month -->
      <section class="card" style="padding:1.5rem;">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:2rem;">
          <div>
            <p class="label-xs" style="color:var(--secondary);margin-bottom:0.25rem;">Financial Velocity</p>
            <h3 class="font-headline" style="font-size:1.125rem;font-weight:700;color:var(--primary);">REVENUE BY MONTH</h3>
          </div>
          <div style="text-align:right;">
            <span style="font-size:1.5rem;font-weight:900;color:var(--primary);">$412.5k</span>
            <p style="font-size:0.75rem;color:#16a34a;font-weight:700;display:flex;align-items:center;justify-content:flex-end;gap:0.25rem;">
              <span class="material-symbols-outlined" style="font-size:0.875rem;">trending_up</span>
              +12.4%
            </p>
          </div>
        </div>
        <!-- Bar Chart -->
        <div style="display:flex;align-items:flex-end;justify-content:space-between;gap:0.5rem;height:180px;margin-bottom:1rem;">
          ${t.map((e,r)=>`
            <div style="flex:1;height:${e.height}%;background:${r===5?"var(--primary-container)":"rgba(0,52,97,0.1)"};border-radius:0.5rem 0.5rem 0 0;transition:all 0.5s ease;"></div>
          `).join("")}
        </div>
        <div style="display:flex;justify-content:space-between;">
          ${t.map(e=>`<span class="label-xs" style="color:var(--outline);flex:1;text-align:center;">${e.month}</span>`).join("")}
        </div>
      </section>

      <!-- Trip Type Popularity -->
      <section class="card" style="padding:1.5rem;">
        <div style="margin-bottom:1.5rem;">
          <p class="label-xs" style="color:var(--secondary);margin-bottom:0.25rem;">Market Segment</p>
          <h3 class="font-headline" style="font-size:1.125rem;font-weight:700;color:var(--primary);">TRIP TYPE POPULARITY</h3>
        </div>
        <!-- Donut Chart (CSS) -->
        <div style="display:flex;justify-content:center;padding:1.5rem 0;">
          <div style="width:10rem;height:10rem;border-radius:50%;border:1rem solid var(--primary-container);display:flex;align-items:center;justify-content:center;position:relative;background:conic-gradient(var(--primary-container) 0deg 187deg, var(--secondary) 187deg 288deg, var(--tertiary) 288deg 360deg);">
            <div style="width:7rem;height:7rem;border-radius:50%;background:var(--surface-container-low);display:flex;flex-direction:column;align-items:center;justify-content:center;">
              <span style="font-size:1.25rem;font-weight:900;color:var(--primary);">842</span>
              <p class="label-xs" style="color:var(--outline);">TOTAL TRIPS</p>
            </div>
          </div>
        </div>
        <!-- Legend -->
        <div style="display:flex;flex-direction:column;gap:0.75rem;">
          <div style="display:flex;align-items:center;justify-content:space-between;">
            <div style="display:flex;align-items:center;gap:0.5rem;">
              <div style="width:0.75rem;height:0.75rem;border-radius:50%;background:var(--primary-container);"></div>
              <span style="font-size:0.875rem;font-weight:700;">Whitewater Pro</span>
            </div>
            <span style="font-size:0.875rem;font-weight:700;color:var(--primary);">52%</span>
          </div>
          <div style="display:flex;align-items:center;justify-content:space-between;">
            <div style="display:flex;align-items:center;gap:0.5rem;">
              <div style="width:0.75rem;height:0.75rem;border-radius:50%;background:var(--secondary);"></div>
              <span style="font-size:0.875rem;font-weight:700;">Family Float</span>
            </div>
            <span style="font-size:0.875rem;font-weight:700;color:var(--primary);">28%</span>
          </div>
          <div style="display:flex;align-items:center;justify-content:space-between;">
            <div style="display:flex;align-items:center;gap:0.5rem;">
              <div style="width:0.75rem;height:0.75rem;border-radius:50%;background:var(--tertiary);"></div>
              <span style="font-size:0.875rem;font-weight:700;">Private Charter</span>
            </div>
            <span style="font-size:0.875rem;font-weight:700;color:var(--primary);">20%</span>
          </div>
        </div>
      </section>

      <!-- Monthly Bookings -->
      <section class="card" style="padding:1.5rem;">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:1.5rem;">
          <div>
            <p class="label-xs" style="color:var(--secondary);margin-bottom:0.25rem;">Flow Rate</p>
            <h3 class="font-headline" style="font-size:1.125rem;font-weight:700;color:var(--primary);">MONTHLY BOOKINGS</h3>
          </div>
          <div style="display:flex;gap:2rem;">
            <div>
              <p class="label-xs" style="color:var(--outline);margin-bottom:0.25rem;">This Season</p>
              <span style="font-size:1.125rem;font-weight:900;color:var(--primary);">2,481</span>
            </div>
            <div>
              <p class="label-xs" style="color:var(--outline);margin-bottom:0.25rem;">Last Season</p>
              <span style="font-size:1.125rem;font-weight:900;color:var(--outline);">1,924</span>
            </div>
          </div>
        </div>
        <!-- Line Chart SVG -->
        <div style="position:relative;height:160px;">
          <svg width="100%" height="100%" viewBox="0 0 1000 200" preserveAspectRatio="none" style="overflow:visible;">
            <path d="M0,160 L100,150 L200,170 L300,140 L400,155 L500,120 L600,130 L700,90 L800,100 L900,110 L1000,80" 
                  fill="none" stroke="#727781" stroke-width="2" stroke-dasharray="8 4" stroke-opacity="0.4"/>
            <path d="M0,180 L100,140 L200,150 L300,110 L400,130 L500,70 L600,90 L700,40 L800,50 L900,30 L1000,10" 
                  fill="none" stroke="#ab3600" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M0,180 L100,140 L200,150 L300,110 L400,130 L500,70 L600,90 L700,40 L800,50 L900,30 L1000,10 L1000,200 L0,200 Z" 
                  fill="url(#reportGrad)" opacity="0.1"/>
            <defs>
              <linearGradient id="reportGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color:#ab3600;stop-opacity:1"/>
                <stop offset="100%" style="stop-color:#ab3600;stop-opacity:0"/>
              </linearGradient>
            </defs>
            <circle cx="700" cy="40" r="6" fill="#ab3600"/>
          </svg>
          <div style="position:absolute;left:70%;top:10px;transform:translateX(-50%);background:var(--primary);color:white;padding:0.375rem 0.75rem;border-radius:var(--radius-lg);font-size:0.75rem;font-weight:700;box-shadow:0 4px 12px rgba(0,52,97,0.2);">
            JULY: 482
            <div style="position:absolute;bottom:-4px;left:50%;transform:translateX(-50%) rotate(45deg);width:0.5rem;height:0.5rem;background:var(--primary);"></div>
          </div>
        </div>
      </section>

      <!-- Quick Stats Row -->
      <section style="display:flex;flex-direction:column;gap:1rem;">
        <!-- Crew Capacity -->
        <div style="background:var(--primary);color:white;border-radius:var(--radius-xl);padding:1.5rem;position:relative;overflow:hidden;">
          <span class="material-symbols-outlined" style="position:absolute;right:-1rem;bottom:-1rem;font-size:6rem;opacity:0.1;transform:rotate(12deg);">kayaking</span>
          <div>
            <h4 class="label-xs" style="opacity:0.6;margin-bottom:1rem;letter-spacing:0.2em;">Crew Capacity</h4>
            <span class="font-headline" style="font-size:2.5rem;font-weight:900;">94%</span>
          </div>
          <div style="margin-top:1.5rem;">
            <div style="width:100%;background:rgba(255,255,255,0.2);height:0.375rem;border-radius:var(--radius-full);overflow:hidden;margin-bottom:0.5rem;">
              <div style="width:94%;height:100%;background:var(--secondary);border-radius:var(--radius-full);"></div>
            </div>
            <p style="font-size:0.75rem;font-weight:500;opacity:0.8;">All Alpha sector guides currently active</p>
          </div>
        </div>

        <!-- Safety Rating -->
        <div style="background:var(--surface-container-high);border-radius:var(--radius-xl);padding:1.5rem;display:flex;flex-direction:column;justify-content:space-between;min-height:140px;">
          <div>
            <h4 class="label-xs" style="color:var(--outline);margin-bottom:1rem;letter-spacing:0.2em;">Safety Rating</h4>
            <span class="font-headline" style="font-size:2.5rem;font-weight:900;color:var(--primary);">4.98</span>
          </div>
          <div style="display:flex;align-items:center;gap:0.25rem;color:var(--secondary);margin-top:1rem;">
            <span class="material-symbols-outlined filled">star</span>
            <span class="material-symbols-outlined filled">star</span>
            <span class="material-symbols-outlined filled">star</span>
            <span class="material-symbols-outlined filled">star</span>
            <span class="material-symbols-outlined filled">star</span>
          </div>
        </div>

        <!-- River Status -->
        <div style="background:var(--secondary-container);color:var(--on-secondary-container);border-radius:var(--radius-xl);padding:1.5rem;display:flex;flex-direction:column;justify-content:space-between;min-height:140px;">
          <div>
            <h4 class="label-xs" style="opacity:0.8;margin-bottom:1rem;letter-spacing:0.2em;">River Status</h4>
            <span class="font-headline" style="font-size:2.5rem;font-weight:900;">CLASS IV</span>
          </div>
          <div style="display:flex;align-items:center;gap:0.5rem;margin-top:1rem;">
            <span class="material-symbols-outlined" style="font-size:0.875rem;">warning</span>
            <p style="font-size:0.75rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;">HIGH FLOW ADVISORY</p>
          </div>
        </div>
      </section>
    </div>
  `}function hg(n){const t=(n==null?void 0:n.displayName)||"User",e=(n==null?void 0:n.role)||"user",r=(n==null?void 0:n.sector)||"Sector Alpha",s=(n==null?void 0:n.username)||"";return`
    <div class="page" style="display:flex;flex-direction:column;gap:2rem;">
      
      <!-- Profile Header -->
      <section style="display:flex;flex-direction:column;align-items:center;text-align:center;gap:1rem;padding:1.5rem 0;">
        <div style="width:5rem;height:5rem;border-radius:50%;background:linear-gradient(135deg,var(--primary) 0%,var(--primary-container) 100%);display:flex;align-items:center;justify-content:center;color:white;font-family:'Space Grotesk',sans-serif;font-size:1.75rem;font-weight:700;box-shadow:0 8px 24px rgba(0,52,97,0.25);">
          ${t.split(" ").map(a=>a[0]).join("").toUpperCase().slice(0,2)}
        </div>
        <div>
          <h2 class="font-headline" style="font-size:1.5rem;font-weight:700;color:var(--primary);">${t}</h2>
          <p style="color:var(--on-surface-variant);font-size:0.875rem;font-weight:500;">@${s}</p>
        </div>
        <div style="display:flex;gap:0.5rem;">
          <span style="background:${e==="admin"?"var(--primary)":"var(--tertiary-container)"};color:white;padding:0.25rem 1rem;border-radius:var(--radius-full);font-size:10px;font-weight:800;letter-spacing:0.15em;text-transform:uppercase;">
            ${e==="admin"?"ADMIN":"USER"}
          </span>
          <span style="background:var(--surface-container-high);color:var(--on-surface-variant);padding:0.25rem 1rem;border-radius:var(--radius-full);font-size:10px;font-weight:800;letter-spacing:0.15em;text-transform:uppercase;">
            ${r}
          </span>
        </div>
      </section>

      <!-- Stats -->
      <section style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:0.75rem;">
        <div style="background:var(--surface-container-low);border-radius:var(--radius-xl);padding:1.25rem;text-align:center;">
          <p class="font-headline" style="font-size:1.5rem;font-weight:700;color:var(--primary);">24</p>
          <p class="label-xs" style="color:var(--outline);margin-top:0.25rem;">Trips</p>
        </div>
        <div style="background:var(--surface-container-low);border-radius:var(--radius-xl);padding:1.25rem;text-align:center;">
          <p class="font-headline" style="font-size:1.5rem;font-weight:700;color:var(--secondary);">4.9</p>
          <p class="label-xs" style="color:var(--outline);margin-top:0.25rem;">Rating</p>
        </div>
        <div style="background:var(--surface-container-low);border-radius:var(--radius-xl);padding:1.25rem;text-align:center;">
          <p class="font-headline" style="font-size:1.5rem;font-weight:700;color:var(--tertiary);">12</p>
          <p class="label-xs" style="color:var(--outline);margin-top:0.25rem;">Months</p>
        </div>
      </section>

      <!-- Menu Items -->
      <section style="display:flex;flex-direction:column;gap:0.25rem;">
        <h3 class="label-sm" style="color:var(--outline);margin-bottom:0.5rem;letter-spacing:0.2em;">SETTINGS</h3>
        
        <button id="btn-goto-settings" class="profile-menu-item" style="display:flex;align-items:center;gap:1rem;padding:1rem 1.25rem;background:var(--primary-container);border:none;border-radius:var(--radius-xl);width:100%;cursor:pointer;text-align:left;">
          <span class="material-symbols-outlined" style="color:white;">settings</span>
          <div style="flex:1;">
            <p style="font-weight:700;font-size:0.875rem;color:white;">Pengaturan Aplikasi</p>
            <p style="font-size:0.75rem;color:var(--on-primary-container);">Kelola tipe rafting & harga</p>
          </div>
          <span class="material-symbols-outlined" style="color:var(--on-primary-container);font-size:1.125rem;">chevron_right</span>
        </button>

        <button class="profile-menu-item" style="display:flex;align-items:center;gap:1rem;padding:1rem 1.25rem;background:var(--surface-container-low);border:none;border-radius:var(--radius-xl);width:100%;cursor:pointer;text-align:left;">
          <span class="material-symbols-outlined" style="color:var(--primary);">person</span>
          <div style="flex:1;">
            <p style="font-weight:700;font-size:0.875rem;">Edit Profile</p>
            <p style="font-size:0.75rem;color:var(--outline);">Update your personal information</p>
          </div>
          <span class="material-symbols-outlined" style="color:var(--outline);font-size:1.125rem;">chevron_right</span>
        </button>

        <button class="profile-menu-item" style="display:flex;align-items:center;gap:1rem;padding:1rem 1.25rem;background:var(--surface-container-low);border:none;border-radius:var(--radius-xl);width:100%;cursor:pointer;text-align:left;">
          <span class="material-symbols-outlined" style="color:var(--primary);">notifications</span>
          <div style="flex:1;">
            <p style="font-weight:700;font-size:0.875rem;">Notifications</p>
            <p style="font-size:0.75rem;color:var(--outline);">Configure notification preferences</p>
          </div>
          <span class="material-symbols-outlined" style="color:var(--outline);font-size:1.125rem;">chevron_right</span>
        </button>

        <button class="profile-menu-item" style="display:flex;align-items:center;gap:1rem;padding:1rem 1.25rem;background:var(--surface-container-low);border:none;border-radius:var(--radius-xl);width:100%;cursor:pointer;text-align:left;">
          <span class="material-symbols-outlined" style="color:var(--primary);">security</span>
          <div style="flex:1;">
            <p style="font-weight:700;font-size:0.875rem;">Security</p>
            <p style="font-size:0.75rem;color:var(--outline);">Password and authentication</p>
          </div>
          <span class="material-symbols-outlined" style="color:var(--outline);font-size:1.125rem;">chevron_right</span>
        </button>

        <button class="profile-menu-item" style="display:flex;align-items:center;gap:1rem;padding:1rem 1.25rem;background:var(--surface-container-low);border:none;border-radius:var(--radius-xl);width:100%;cursor:pointer;text-align:left;">
          <span class="material-symbols-outlined" style="color:var(--primary);">help</span>
          <div style="flex:1;">
            <p style="font-weight:700;font-size:0.875rem;">Help & Support</p>
            <p style="font-size:0.75rem;color:var(--outline);">Get assistance and FAQs</p>
          </div>
          <span class="material-symbols-outlined" style="color:var(--outline);font-size:1.125rem;">chevron_right</span>
        </button>
      </section>

      <!-- Logout -->
      <section style="padding:1rem 0 2rem;">
        <button id="btn-logout" style="width:100%;padding:1rem;background:var(--error-container);color:var(--on-error-container);border:none;border-radius:var(--radius-xl);font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:1rem;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:0.5rem;transition:opacity 0.2s;">
          <span class="material-symbols-outlined">logout</span>
          LOG OUT
        </button>
      </section>

      <!-- App Info -->
      <section style="text-align:center;padding-bottom:1rem;opacity:0.4;">
        <p class="label-xs">CitraElo Rafting v1.0</p>
        <p class="label-xs" style="margin-top:0.25rem;">By : Dadang M</p>
      </section>
    </div>
  `}function dg(){var t;const n=document.getElementById("btn-logout");n&&n.addEventListener("click",()=>{eu(),window.location.hash="/login"}),(t=document.getElementById("btn-goto-settings"))==null||t.addEventListener("click",()=>{window.location.hash="/settings"})}let Lr=null;function zn(n){window.location.hash=n}function hl(){const n=window.location.hash.slice(1)||"",t=Tn(),e=document.getElementById("app");if(!t&&n!=="/login"){zn("/login");return}if(t&&(n==="/login"||n===""||n==="/")){zn("/dashboard");return}if(n==="/login"){e.innerHTML=Yp(),setTimeout(()=>Jp(),50),Lr="/login";return}(Lr==="/login"||!document.getElementById("page-content"))&&(e.innerHTML=`
      ${$p(t)}
      <div id="page-content" style="transition:opacity 0.25s ease,transform 0.25s ease;"></div>
      ${Kp()}
    `,Wp());const r=document.getElementById("page-content");r&&(r.style.opacity="0",r.style.transform="translateY(8px)",setTimeout(()=>{let s="",o=null;const a=(t==null?void 0:t.role)==="admin";if(!a&&!["/dashboard","/calendar"].includes(n)){zn("/dashboard");return}switch(n){case"/dashboard":s=a?rg(t):Xp(t),o=a?()=>ig():()=>Zp();break;case"/calendar":s=ag(),o=()=>cg();break;case"/reports":s=ug();break;case"/profile":s=hg(t),o=()=>dg();break;case"/settings":s=eg(),o=()=>ng();break;default:zn("/dashboard");return}r.innerHTML=s,requestAnimationFrame(()=>{r.style.opacity="1",r.style.transform="translateY(0)"}),document.querySelectorAll(".bottom-nav__item").forEach(c=>{c.classList.toggle("active",c.dataset.route===n)}),o&&o(),Lr=n},Lr==="/login"?0:100))}function dl(){if(window.addEventListener("hashchange",hl),!window.location.hash){const n=Tn();window.location.hash=n?"/dashboard":"/login"}hl()}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",dl):dl();window.citraNavigate=zn;
