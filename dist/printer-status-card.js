function e(e,t,i,r){var s,o=arguments.length,n=o<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,r);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(n=(o<3?s(n):o>3?s(t,i,n):s(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,i=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,r=Symbol(),s=new WeakMap;let o=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==r)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(i&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=s.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&s.set(t,e))}return e}toString(){return this.cssText}};const n=(e,...t)=>{const i=1===e.length?e[0]:t.reduce((t,i,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[r+1],e[0]);return new o(i,e,r)},a=i?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new o("string"==typeof e?e:e+"",void 0,r))(t)})(e):e,{is:c,defineProperty:l,getOwnPropertyDescriptor:d,getOwnPropertyNames:m,getOwnPropertySymbols:p,getPrototypeOf:h}=Object,u=globalThis,_=u.trustedTypes,f=_?_.emptyScript:"",g=u.reactiveElementPolyfillSupport,y=(e,t)=>e,v={toAttribute(e,t){switch(t){case Boolean:e=e?f:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},b=(e,t)=>!c(e,t),w={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:b};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let $=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=w){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(e,i,t);void 0!==r&&l(this.prototype,e,r)}}static getPropertyDescriptor(e,t,i){const{get:r,set:s}=d(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:r,set(t){const o=r?.call(this);s?.call(this,t),this.requestUpdate(e,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??w}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const e=h(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const e=this.properties,t=[...m(e),...p(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(a(e))}else void 0!==e&&t.push(a(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,r)=>{if(i)e.adoptedStyleSheets=r.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const i of r){const r=document.createElement("style"),s=t.litNonce;void 0!==s&&r.setAttribute("nonce",s),r.textContent=i.cssText,e.appendChild(r)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,i);if(void 0!==r&&!0===i.reflect){const s=(void 0!==i.converter?.toAttribute?i.converter:v).toAttribute(t,i.type);this._$Em=e,null==s?this.removeAttribute(r):this.setAttribute(r,s),this._$Em=null}}_$AK(e,t){const i=this.constructor,r=i._$Eh.get(e);if(void 0!==r&&this._$Em!==r){const e=i.getPropertyOptions(r),s="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:v;this._$Em=r;const o=s.fromAttribute(t,e.type);this[r]=o??this._$Ej?.get(r)??o,this._$Em=null}}requestUpdate(e,t,i,r=!1,s){if(void 0!==e){const o=this.constructor;if(!1===r&&(s=this[e]),i??=o.getPropertyOptions(e),!((i.hasChanged??b)(s,t)||i.useDefault&&i.reflect&&s===this._$Ej?.get(e)&&!this.hasAttribute(o._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:r,wrapped:s},o){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,o??t??this[e]),!0!==s||void 0!==o)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===r&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,r=this[t];!0!==e||this._$AL.has(t)||void 0===r||this.C(t,void 0,i,r)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[y("elementProperties")]=new Map,$[y("finalized")]=new Map,g?.({ReactiveElement:$}),(u.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const x=globalThis,S=e=>e,E=x.trustedTypes,A=E?E.createPolicy("lit-html",{createHTML:e=>e}):void 0,C="$lit$",M=`lit$${Math.random().toFixed(9).slice(2)}$`,k="?"+M,T=`<${k}>`,P=document,R=()=>P.createComment(""),N=e=>null===e||"object"!=typeof e&&"function"!=typeof e,I=Array.isArray,U="[ \t\n\f\r]",O=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,D=/-->/g,F=/>/g,z=RegExp(`>|${U}(?:([^\\s"'>=/]+)(${U}*=${U}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),L=/'/g,H=/"/g,j=/^(?:script|style|textarea|title)$/i,q=(e=>(t,...i)=>({_$litType$:e,strings:t,values:i}))(1),B=Symbol.for("lit-noChange"),J=Symbol.for("lit-nothing"),K=new WeakMap,W=P.createTreeWalker(P,129);function V(e,t){if(!I(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==A?A.createHTML(t):t}const G=(e,t)=>{const i=e.length-1,r=[];let s,o=2===t?"<svg>":3===t?"<math>":"",n=O;for(let t=0;t<i;t++){const i=e[t];let a,c,l=-1,d=0;for(;d<i.length&&(n.lastIndex=d,c=n.exec(i),null!==c);)d=n.lastIndex,n===O?"!--"===c[1]?n=D:void 0!==c[1]?n=F:void 0!==c[2]?(j.test(c[2])&&(s=RegExp("</"+c[2],"g")),n=z):void 0!==c[3]&&(n=z):n===z?">"===c[0]?(n=s??O,l=-1):void 0===c[1]?l=-2:(l=n.lastIndex-c[2].length,a=c[1],n=void 0===c[3]?z:'"'===c[3]?H:L):n===H||n===L?n=z:n===D||n===F?n=O:(n=z,s=void 0);const m=n===z&&e[t+1].startsWith("/>")?" ":"";o+=n===O?i+T:l>=0?(r.push(a),i.slice(0,l)+C+i.slice(l)+M+m):i+M+(-2===l?t:m)}return[V(e,o+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),r]};class Q{constructor({strings:e,_$litType$:t},i){let r;this.parts=[];let s=0,o=0;const n=e.length-1,a=this.parts,[c,l]=G(e,t);if(this.el=Q.createElement(c,i),W.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(r=W.nextNode())&&a.length<n;){if(1===r.nodeType){if(r.hasAttributes())for(const e of r.getAttributeNames())if(e.endsWith(C)){const t=l[o++],i=r.getAttribute(e).split(M),n=/([.?@])?(.*)/.exec(t);a.push({type:1,index:s,name:n[2],strings:i,ctor:"."===n[1]?te:"?"===n[1]?ie:"@"===n[1]?re:ee}),r.removeAttribute(e)}else e.startsWith(M)&&(a.push({type:6,index:s}),r.removeAttribute(e));if(j.test(r.tagName)){const e=r.textContent.split(M),t=e.length-1;if(t>0){r.textContent=E?E.emptyScript:"";for(let i=0;i<t;i++)r.append(e[i],R()),W.nextNode(),a.push({type:2,index:++s});r.append(e[t],R())}}}else if(8===r.nodeType)if(r.data===k)a.push({type:2,index:s});else{let e=-1;for(;-1!==(e=r.data.indexOf(M,e+1));)a.push({type:7,index:s}),e+=M.length-1}s++}}static createElement(e,t){const i=P.createElement("template");return i.innerHTML=e,i}}function Y(e,t,i=e,r){if(t===B)return t;let s=void 0!==r?i._$Co?.[r]:i._$Cl;const o=N(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),void 0===o?s=void 0:(s=new o(e),s._$AT(e,i,r)),void 0!==r?(i._$Co??=[])[r]=s:i._$Cl=s),void 0!==s&&(t=Y(e,s._$AS(e,t.values),s,r)),t}class Z{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,r=(e?.creationScope??P).importNode(t,!0);W.currentNode=r;let s=W.nextNode(),o=0,n=0,a=i[0];for(;void 0!==a;){if(o===a.index){let t;2===a.type?t=new X(s,s.nextSibling,this,e):1===a.type?t=new a.ctor(s,a.name,a.strings,this,e):6===a.type&&(t=new se(s,this,e)),this._$AV.push(t),a=i[++n]}o!==a?.index&&(s=W.nextNode(),o++)}return W.currentNode=P,r}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class X{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,r){this.type=2,this._$AH=J,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Y(this,e,t),N(e)?e===J||null==e||""===e?(this._$AH!==J&&this._$AR(),this._$AH=J):e!==this._$AH&&e!==B&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>I(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==J&&N(this._$AH)?this._$AA.nextSibling.data=e:this.T(P.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,r="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=Q.createElement(V(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.p(t);else{const e=new Z(r,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=K.get(e.strings);return void 0===t&&K.set(e.strings,t=new Q(e)),t}k(e){I(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,r=0;for(const s of e)r===t.length?t.push(i=new X(this.O(R()),this.O(R()),this,this.options)):i=t[r],i._$AI(s),r++;r<t.length&&(this._$AR(i&&i._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=S(e).nextSibling;S(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class ee{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,r,s){this.type=1,this._$AH=J,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=J}_$AI(e,t=this,i,r){const s=this.strings;let o=!1;if(void 0===s)e=Y(this,e,t,0),o=!N(e)||e!==this._$AH&&e!==B,o&&(this._$AH=e);else{const r=e;let n,a;for(e=s[0],n=0;n<s.length-1;n++)a=Y(this,r[i+n],t,n),a===B&&(a=this._$AH[n]),o||=!N(a)||a!==this._$AH[n],a===J?e=J:e!==J&&(e+=(a??"")+s[n+1]),this._$AH[n]=a}o&&!r&&this.j(e)}j(e){e===J?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class te extends ee{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===J?void 0:e}}class ie extends ee{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==J)}}class re extends ee{constructor(e,t,i,r,s){super(e,t,i,r,s),this.type=5}_$AI(e,t=this){if((e=Y(this,e,t,0)??J)===B)return;const i=this._$AH,r=e===J&&i!==J||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,s=e!==J&&(i===J||r);r&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class se{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){Y(this,e)}}const oe=x.litHtmlPolyfillSupport;oe?.(Q,X),(x.litHtmlVersions??=[]).push("3.3.3");const ne=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let ae=class extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const r=i?.renderBefore??t;let s=r._$litPart$;if(void 0===s){const e=i?.renderBefore??null;r._$litPart$=s=new X(t.insertBefore(R(),e),e,void 0,i??{})}return s._$AI(e),s})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return B}};ae._$litElement$=!0,ae.finalized=!0,ne.litElementHydrateSupport?.({LitElement:ae});const ce=ne.litElementPolyfillSupport;ce?.({LitElement:ae}),(ne.litElementVersions??=[]).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const le={attribute:!0,type:String,converter:v,reflect:!1,hasChanged:b},de=(e=le,t,i)=>{const{kind:r,metadata:s}=i;let o=globalThis.litPropertyMetadata.get(s);if(void 0===o&&globalThis.litPropertyMetadata.set(s,o=new Map),"setter"===r&&((e=Object.create(e)).wrapped=!0),o.set(i.name,e),"accessor"===r){const{name:r}=i;return{set(i){const s=t.get.call(this);t.set.call(this,i),this.requestUpdate(r,s,e,!0,i)},init(t){return void 0!==t&&this.C(r,void 0,e,t),t}}}if("setter"===r){const{name:r}=i;return function(i){const s=this[r];t.call(this,i),this.requestUpdate(r,s,e,!0,i)}}throw Error("Unsupported decorator location: "+r)};function me(e){return(t,i)=>"object"==typeof i?de(e,t,i):((e,t,i)=>{const r=t.hasOwnProperty(i);return t.constructor.createProperty(i,e),r?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function pe(e){return me({...e,state:!0,attribute:!1})}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const he=1,ue=3,_e=4;class fe{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ge={},ye=(e=>(...t)=>({_$litDirective$:e,values:t}))(class extends fe{constructor(e){if(super(e),e.type!==ue&&e.type!==he&&e.type!==_e)throw Error("The `live` directive is not allowed on child or event bindings");if(!(e=>void 0===e.strings)(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===B||t===J)return t;const i=e.element,r=e.name;if(e.type===ue){if(t===i[r])return B}else if(e.type===_e){if(!!t===i.hasAttribute(r))return B}else if(e.type===he&&i.getAttribute(r)===t+"")return B;return((e,t=ge)=>{e._$AH=t;
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */})(e),t}}),ve=Object.freeze({set_active_spool_service:"",get_active_spool_service:"",spool_entity_template:"sensor.spoolman_spool_{id}",filament_name_entity_template:"sensor.spoolman_spool_{id}_filament_name",filament_material_entity_template:"sensor.spoolman_spool_{id}_filament_material",vendor_name_entity_template:"sensor.spoolman_spool_{id}_vendor_name",color_hex_entity_template:"sensor.spoolman_spool_{id}_color_hex",id_entity_template:"sensor.spoolman_spool_{id}_id"}),be=new Set(["en","ru","uk"]);function we(e){return{...e,...e.service_data?{service_data:{...e.service_data}}:{},...e.target?{target:{...e.target}}:{}}}function $e(e){const t=String(e.language??"en"),i=be.has(t)?t:"en",r="auto"===e.camera_view?"auto":"live";return{...e,type:String(e.type??"custom:printer-status-card"),name:String(e.name??"3D Printer"),language:i,show_camera:!1!==e.show_camera,camera_view:r,show_progress:!1!==e.show_progress,show_system_load:!1!==e.show_system_load,show_memory:!1!==e.show_memory,show_thumbnail:!1!==e.show_thumbnail,show_emergency_stop:!1!==e.show_emergency_stop,show_filament_required:!1!==e.show_filament_required,file_metadata_service:String(e.file_metadata_service??"").trim(),filament_present_state:String(e.filament_present_state??"on"),filament_missing_state:String(e.filament_missing_state??"off"),entities:{...e.entities??{}},spoolman:{...ve,...e.spoolman??{}},macros:Array.isArray(e.macros)?e.macros.map(we):[]}}function xe(){return $e({type:"custom:printer-status-card"})}function Se(e){return e&&"object"==typeof e&&!Array.isArray(e)?e:void 0}function Ee(e){const t="string"==typeof e&&""===e.trim()?NaN:Number(e);return Number.isFinite(t)&&t>0?t:void 0}function Ae(e){return`${e>=100?Math.round(e):Math.round(10*e)/10} g`}const Ce={en:"en-GB",ru:"ru-RU",uk:"uk-UA"},Me={en:"Tomorrow, at {time}",ru:"Завтра, в {time}",uk:"Завтра, о {time}"},ke={s:1,sec:1,secs:1,second:1,seconds:1,min:60,mins:60,minute:60,minutes:60,h:3600,hr:3600,hrs:3600,hour:3600,hours:3600};function Te(e){if(!e)return;const t=String(e.state??"").trim();if(!t)return;if(t.includes(":"))return function(e){const t=e.split(":");if(2!==t.length&&3!==t.length)return;if(!t.every(e=>/^\d+$/.test(e)))return;const i=t.map(Number),r=i[i.length-1],s=i[i.length-2];if(r>59||s>59)return;const o=3600*(3===t.length?i[0]:0)+60*s+r;return o>0?o:void 0}(t);const i=Number(t);if(!Number.isFinite(i)||i<=0)return;const r=String(e.attributes?.unit_of_measurement??"").trim().toLowerCase(),s=ke[r];return s?i*s:void 0}function Pe(e){return Date.UTC(e.getFullYear(),e.getMonth(),e.getDate())}const Re={en:{common:{name:"3D printer status card",description:"A configurable Home Assistant status card for 3D printers"},status:{poweredOff:"POWERED OFF",offline:"OFFLINE",ready:"READY",printing:"PRINTING",completed:"COMPLETED",paused:"PAUSED",error:"ERROR",idle:"IDLE"},card:{file:"File",remainingTime:"Time remaining",finishesAt:"Finishes at",elapsedTime:"Print duration",filamentUsed:"Used",bedTemperature:"Bed temperature",extruderTemperature:"Extruder temperature",totalPrintTime:"Total print time",filament:"Filament",powerNow:"Consumption",present:"Present",missing:"Missing",filamentPresent:"Filament present",filamentMissing:"Filament missing",spoolman:"Filament",activeSpool:"Active spool",remaining:"Remaining",spoolSelection:"Choose spool",printer:"Printer",macros:"Macros",progress:"Progress",layer:"Layer",systemLoad:"Load",memory:"RAM",filamentRequired:"Required for print",filamentStillNeeded:"Still needed",onSpool:"On spool",notEnoughFilament:"may run out"},warning:{cameraUnavailable:"Camera card unavailable",missingEntity:"Entity not found"},editor:{general:"General",printerEntities:"Printer entities",power:"Power and availability",powerHelp:"When configured, the card expands only while the switch is on, consumption is above zero, and the printer status is online.",filamentStates:"Filament states",spoolman:"Spoolman",macros:"Macros",macro:"Macro",invalidJson:"Enter a valid JSON object",noMacros:"No macros configured"},fields:{language:"Language",name:"Name",showCamera:"Show camera",cameraView:"Camera view",status:"Printer status / online check",remainingTime:"Remaining time",elapsedTime:"Print duration",filamentUsed:"Filament used",bedTemperature:"Bed temperature",extruderTemperature:"Extruder temperature",totalPrintTime:"Total print time",filamentPresent:"Filament sensor",filename:"Filename",camera:"Camera",powerSwitch:"Plug / breaker switch",powerNow:"Consumption",filamentPresentState:"Present state",filamentMissingState:"Missing state",spoolId:"Active spool ID sensor",setActiveSpoolService:"Set active spool service",getActiveSpoolService:"Verify active spool service",spoolEntityTemplate:"Spool entity template",filamentNameEntityTemplate:"Filament name entity template",filamentMaterialEntityTemplate:"Filament material entity template",vendorNameEntityTemplate:"Vendor name entity template",colorHexEntityTemplate:"Color entity template",idEntityTemplate:"ID entity template",macroName:"Name",macroKind:"Type",macroEntity:"Entity",macroService:"Service (domain.service)",serviceData:"Service data (JSON)",target:"Target (JSON)",showProgress:"Show print progress",showSystemLoad:"Show printer load",showMemory:"Show RAM usage",progress:"Print progress",currentLayer:"Current layer",totalLayer:"Total layers",systemLoad:"Printer load",memoryUsed:"RAM usage",showThumbnail:"Show model thumbnail",showEmergencyStop:"Show emergency stop",bedTarget:"Bed target temperature",extruderTarget:"Extruder target temperature",thumbnail:"Model thumbnail camera",emergencyStop:"Emergency stop button",showFilamentRequired:"Show filament required",fileMetadataService:"File metadata service",filamentRequired:"Filament required sensor (g)"},options:{english:"English",russian:"Русский",ukrainian:"Українська",live:"Live",auto:"Auto",entity:"Entity",service:"Service"},actions:{togglePower:"Toggle power",addMacro:"Add macro",removeMacro:"Remove macro",moveUp:"Move up",moveDown:"Move down",emergencyStop:"Emergency stop",emergencyStopConfirm:"Stop",emergencyStopQuestion:"Stop the printer?",cancel:"Cancel"},fallback:{englishOnly:"English fallback"}},ru:{common:{name:"3D printer status card",description:"Настраиваемая карточка состояния 3D-принтера для Home Assistant"},status:{poweredOff:"ВЫКЛЮЧЕН",offline:"ОФФЛАЙН",ready:"ГОТОВ",printing:"ПЕЧАТЬ",completed:"ЗАВЕРШЕНО",paused:"ПАУЗА",error:"ОШИБКА",idle:"ОЖИДАНИЕ"},card:{file:"Файл",remainingTime:"Осталось до конца",finishesAt:"Завершение",elapsedTime:"Длительность печати",filamentUsed:"Использовано",bedTemperature:"Температура стола",extruderTemperature:"Температура экструдера",totalPrintTime:"Общее время печати",filament:"Филамент",powerNow:"Потребление",present:"Есть",missing:"Нету",filamentPresent:"Филамент есть",filamentMissing:"Филамент отсутствует",spoolman:"Филамент",activeSpool:"Активная катушка",remaining:"Остаток",spoolSelection:"Выбрать катушку",printer:"Принтер",macros:"Макросы",progress:"Прогресс",layer:"Слой",systemLoad:"Нагрузка",memory:"ОЗУ",filamentRequired:"Нужно на печать",filamentStillNeeded:"Осталось допечатать",onSpool:"На катушке",notEnoughFilament:"может не хватить"},warning:{cameraUnavailable:"Карточка камеры недоступна",missingEntity:"Сущность не найдена"},editor:{general:"Основное",printerEntities:"Сущности принтера",power:"Питание и доступность",powerHelp:"Если проверки настроены, карточка разворачивается только при включённой розетке, потреблении выше нуля и доступном статусе принтера.",filamentStates:"Состояния филамента",spoolman:"Spoolman",macros:"Макросы",macro:"Макрос",invalidJson:"Введите корректный JSON-объект",noMacros:"Макросы не настроены"},fields:{language:"Язык",name:"Название",showCamera:"Показывать камеру",cameraView:"Режим камеры",status:"Статус принтера / проверка онлайн",remainingTime:"Оставшееся время",elapsedTime:"Длительность печати",filamentUsed:"Использовано филамента",bedTemperature:"Температура стола",extruderTemperature:"Температура экструдера",totalPrintTime:"Общее время печати",filamentPresent:"Датчик филамента",filename:"Имя файла",camera:"Камера",powerSwitch:"Розетка / автомат",powerNow:"Потребление",filamentPresentState:"Состояние «есть»",filamentMissingState:"Состояние «нет»",spoolId:"Сенсор ID активной катушки",setActiveSpoolService:"Сервис выбора активной катушки",getActiveSpoolService:"Сервис проверки активной катушки",spoolEntityTemplate:"Шаблон сущности катушки",filamentNameEntityTemplate:"Шаблон названия филамента",filamentMaterialEntityTemplate:"Шаблон материала филамента",vendorNameEntityTemplate:"Шаблон производителя",colorHexEntityTemplate:"Шаблон сущности цвета",idEntityTemplate:"Шаблон сущности ID",macroName:"Название",macroKind:"Тип",macroEntity:"Сущность",macroService:"Сервис (domain.service)",serviceData:"Данные сервиса (JSON)",target:"Цель (JSON)",showProgress:"Показывать прогресс печати",showSystemLoad:"Показывать нагрузку принтера",showMemory:"Показывать заполненность ОЗУ",progress:"Прогресс печати",currentLayer:"Текущий слой",totalLayer:"Всего слоёв",systemLoad:"Нагрузка принтера",memoryUsed:"Заполненность ОЗУ",showThumbnail:"Показывать миниатюру модели",showEmergencyStop:"Показывать аварийную остановку",bedTarget:"Целевая температура стола",extruderTarget:"Целевая температура экструдера",thumbnail:"Камера миниатюры модели",emergencyStop:"Кнопка аварийной остановки",showFilamentRequired:"Показывать нужный филамент",fileMetadataService:"Сервис метаданных файла",filamentRequired:"Сенсор нужного филамента (г)"},options:{english:"English",russian:"Русский",ukrainian:"Українська",live:"Вживую",auto:"Авто",entity:"Сущность",service:"Сервис"},actions:{togglePower:"Переключить питание",addMacro:"Добавить макрос",removeMacro:"Удалить макрос",moveUp:"Поднять",moveDown:"Опустить",emergencyStop:"Аварийная остановка",emergencyStopConfirm:"Остановить",emergencyStopQuestion:"Остановить принтер?",cancel:"Отмена"}},uk:{common:{name:"3D printer status card",description:"Налаштовувана картка стану 3D-принтера для Home Assistant"},status:{poweredOff:"ВИМКНЕНО",offline:"ОФЛАЙН",ready:"ГОТОВИЙ",printing:"ДРУК",completed:"ЗАВЕРШЕНО",paused:"ПАУЗА",error:"ПОМИЛКА",idle:"ОЧІКУВАННЯ"},card:{file:"Файл",remainingTime:"Залишилося до завершення",finishesAt:"Завершення",elapsedTime:"Тривалість друку",filamentUsed:"Використано",bedTemperature:"Температура столу",extruderTemperature:"Температура екструдера",totalPrintTime:"Загальний час друку",filament:"Філамент",powerNow:"Споживання",present:"Є",missing:"Немає",filamentPresent:"Філамент є",filamentMissing:"Філамент відсутній",spoolman:"Філамент",activeSpool:"Активна котушка",remaining:"Залишок",spoolSelection:"Вибрати котушку",printer:"Принтер",macros:"Макроси",progress:"Прогрес",layer:"Шар",systemLoad:"Навантаження",memory:"ОЗП",filamentRequired:"Потрібно на друк",filamentStillNeeded:"Залишилось додрукувати",onSpool:"На котушці",notEnoughFilament:"може не вистачити"},warning:{cameraUnavailable:"Картка камери недоступна",missingEntity:"Сутність не знайдено"},editor:{general:"Основне",printerEntities:"Сутності принтера",power:"Живлення та доступність",powerHelp:"Якщо перевірки налаштовані, картка розгортається лише за ввімкненої розетки, споживання вище нуля та доступного статусу принтера.",filamentStates:"Стани філаменту",spoolman:"Spoolman",macros:"Макроси",macro:"Макрос",invalidJson:"Введіть коректний JSON-об’єкт",noMacros:"Макроси не налаштовані"},fields:{language:"Мова",name:"Назва",showCamera:"Показувати камеру",cameraView:"Режим камери",status:"Статус принтера / перевірка онлайн",remainingTime:"Час, що залишився",elapsedTime:"Тривалість друку",filamentUsed:"Використано філаменту",bedTemperature:"Температура столу",extruderTemperature:"Температура екструдера",totalPrintTime:"Загальний час друку",filamentPresent:"Датчик філаменту",filename:"Назва файлу",camera:"Камера",powerSwitch:"Розетка / автомат",powerNow:"Споживання",filamentPresentState:"Стан «є»",filamentMissingState:"Стан «немає»",spoolId:"Сенсор ID активної котушки",setActiveSpoolService:"Сервіс вибору активної котушки",getActiveSpoolService:"Сервіс перевірки активної котушки",spoolEntityTemplate:"Шаблон сутності котушки",filamentNameEntityTemplate:"Шаблон назви філаменту",filamentMaterialEntityTemplate:"Шаблон матеріалу філаменту",vendorNameEntityTemplate:"Шаблон виробника",colorHexEntityTemplate:"Шаблон сутності кольору",idEntityTemplate:"Шаблон сутності ID",macroName:"Назва",macroKind:"Тип",macroEntity:"Сутність",macroService:"Сервіс (domain.service)",serviceData:"Дані сервісу (JSON)",target:"Ціль (JSON)",showProgress:"Показувати прогрес друку",showSystemLoad:"Показувати навантаження принтера",showMemory:"Показувати заповненість ОЗП",progress:"Прогрес друку",currentLayer:"Поточний шар",totalLayer:"Усього шарів",systemLoad:"Навантаження принтера",memoryUsed:"Заповненість ОЗП",showThumbnail:"Показувати мініатюру моделі",showEmergencyStop:"Показувати аварійну зупинку",bedTarget:"Цільова температура столу",extruderTarget:"Цільова температура екструдера",thumbnail:"Камера мініатюри моделі",emergencyStop:"Кнопка аварійної зупинки",showFilamentRequired:"Показувати потрібний філамент",fileMetadataService:"Сервіс метаданих файлу",filamentRequired:"Сенсор потрібного філаменту (г)"},options:{english:"English",russian:"Русский",ukrainian:"Українська",live:"Наживо",auto:"Авто",entity:"Сутність",service:"Сервіс"},actions:{togglePower:"Перемкнути живлення",addMacro:"Додати макрос",removeMacro:"Видалити макрос",moveUp:"Підняти",moveDown:"Опустити",emergencyStop:"Аварійна зупинка",emergencyStopConfirm:"Зупинити",emergencyStopQuestion:"Зупинити принтер?",cancel:"Скасувати"}}};function Ne(e,t){const i=t.split(".").reduce((e,t)=>{if(e&&"object"==typeof e)return e[t]},e);return"string"==typeof i?i:void 0}function Ie(e,t){return Ne(Re["ru"===e||"uk"===e||"en"===e?e:"en"],t)??Ne(Re.en,t)??t}function Ue(e){if(!e)return;const t=String(e.state??"").trim();if(""===t)return;const i=Number(t);return Number.isFinite(i)?i:void 0}function Oe(e){if("%"!==e?.attributes?.unit_of_measurement)return;const t=Ue(e);return void 0===t?void 0:Math.min(100,Math.max(0,t))}function De(e){return`${Math.floor(e)}%`}const Fe=new Set(["","unknown","unavailable","none","null","offline"]);function ze(e){return String(e?.state??"").trim().toLowerCase()}function Le(e){return Fe.has(ze(e))}function He(e,t){const i=e.entities.power_switch;if(i){const e=ze(t[i]);if(Fe.has(e))return"offline";if("on"!==e)return"powered_off"}const r=e.entities.power_now;if(r){const e=ze(t[r]);if(Fe.has(e))return"offline";const i=Number(e);if(!Number.isFinite(i))return"offline";if(i<=0)return"powered_off"}const s=e.entities.status;return s&&Le(t[s])?"offline":"expanded"}const je=new Set(["","unknown","unavailable","none","null","offline"]);function qe(e){if("string"==typeof e||"number"==typeof e)return String(e).trim();if(!e||"object"!=typeof e)return"";const t=e;return qe(t.raw)||qe(t.translated)}function Be(e){return je.has(qe(e?.state).toLowerCase())}function Je(e){return e&&"object"==typeof e&&!Array.isArray(e)?e:void 0}function Ke(e,t,i){const r=e[t.replaceAll("{id}",i)];return r&&!Be(r)?qe(r.state):void 0}function We(e,t){for(const i of t){const t=e[i];if(null==t)continue;const r=String(t).trim();if(r&&!je.has(r.toLowerCase()))return r}}function Ve(e,t){const i=new Set,r=e.filter(e=>Boolean(e)).filter(e=>{const r=e.toLowerCase();return r!==t.toLowerCase()&&!i.has(r)&&(i.add(r),!0)}).join(" · ");if(!r)return t;const s=`${r} · ${t}`;if(s.length<=42)return s;const o=`… · ${t}`,n=Math.max(0,42-o.length);return`${r.slice(0,n).trimEnd()}${o}`}function Ge(e){const t=e.trim().match(/^([a-z0-9_]+)\.([a-z0-9_]+)$/i);return t?{domain:t[1],service:t[2]}:void 0}const Qe=new Set(["printing","busy","paused","pause"]),Ye={printing:{cssClass:"printing",translationKey:"status.printing"},busy:{cssClass:"printing",translationKey:"status.printing"},complete:{cssClass:"complete",translationKey:"status.completed"},completed:{cssClass:"complete",translationKey:"status.completed"},finished:{cssClass:"complete",translationKey:"status.completed"},paused:{cssClass:"paused",translationKey:"status.paused"},pause:{cssClass:"paused",translationKey:"status.paused"},error:{cssClass:"error",translationKey:"status.error"},shutdown:{cssClass:"error",translationKey:"status.error"},idle:{cssClass:"idle",translationKey:"status.idle"}};const Ze=n`
  :host {
    display: block;
  }

  ha-card {
    display: block;
    box-sizing: border-box;
    overflow: hidden;
    border: 1px solid var(--ha-card-border-color, var(--divider-color));
    border-radius: var(--ha-card-border-radius, 12px);
  }

  .card {
    padding: 16px;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 12px;
  }

  .header.compact {
    gap: 6px;
    margin-bottom: 0;
  }

  .header.compact .title {
    font-size: 17px;
  }

  .header.compact .status {
    padding: 4px 8px;
    font-size: 11px;
  }

  .header.compact .filament-indicator {
    width: 24px;
    height: 24px;
    min-width: 24px;
  }

  .header.compact .filament-indicator svg {
    width: 22px;
    height: 22px;
  }

  .title {
    flex: 1;
    min-width: 0;
    color: var(--primary-text-color);
    font-size: 20px;
    font-weight: 600;
    line-height: 1.2;
    overflow-wrap: anywhere;
  }

  .status {
    flex: 0 0 auto;
    border-radius: 999px;
    padding: 4px 10px;
    background: var(--secondary-background-color);
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
  }

  .status.clickable,
  .row.clickable,
  .camera-card,
  .spoolman-block {
    cursor: pointer;
  }

  .status.printing { color: var(--success-color, #4caf50); }
  .status.complete { color: var(--info-color, #03a9f4); }
  .status.paused { color: var(--warning-color, #ff9800); }
  .status.error,
  .status.offline { color: var(--error-color, #db4437); }
  .status.powered-off,
  .status.idle { color: var(--secondary-text-color); }

  .filament-indicator {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    min-width: 28px;
    padding: 2px;
    border: 0;
    color: var(--secondary-text-color);
    background: transparent;
    cursor: pointer;
    transition: transform 120ms ease, color 120ms ease;
  }

  .filament-indicator svg {
    width: 24px;
    height: 24px;
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .filament-indicator.present {
    color: var(--success-color, #4caf50);
    filter: drop-shadow(0 0 4px rgb(76 175 80 / 80%));
  }

  .filament-indicator.missing {
    color: var(--error-color, #db4437);
    filter: drop-shadow(0 0 4px rgb(219 68 55 / 85%));
  }

  .filament-indicator:hover {
    transform: scale(1.08);
  }

  .filament-indicator:focus-visible {
    border-radius: 5px;
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
  }

  .power-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 34px;
    height: 34px;
    min-width: 34px;
    padding: 0;
    border: 0;
    border-radius: 999px;
    color: var(--secondary-text-color);
    background: var(--secondary-background-color);
    cursor: pointer;
    --mdc-icon-size: 19px;
  }

  .power-button.on {
    color: var(--text-primary-color, #fff);
    background: var(--success-color, #4caf50);
  }

  .power-button:hover,
  .macro-button:hover {
    filter: brightness(1.1);
  }

  .file {
    margin-bottom: 14px;
    padding: 10px 12px;
    border-radius: 12px;
    background: var(--secondary-background-color);
    color: var(--primary-text-color);
    font-size: 14px;
    overflow-wrap: anywhere;
  }

  .file.with-thumbnail {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px 12px 8px 8px;
  }

  .file-thumbnail {
    width: 56px;
    height: 56px;
    flex: 0 0 auto;
    border-radius: 8px;
    object-fit: contain;
    background: color-mix(in srgb, var(--primary-text-color) 8%, transparent);
    cursor: zoom-in;
  }

  .file-name {
    min-width: 0;
  }

  .emergency-stop {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    min-height: 40px;
    margin-top: 14px;
    padding: 9px 12px;
    border: 1px solid var(--error-color, #db4437);
    border-radius: 10px;
    color: var(--error-color, #db4437);
    background: transparent;
    font: inherit;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 120ms ease, color 120ms ease;
    --mdc-icon-size: 20px;
  }

  .emergency-stop:hover {
    background: color-mix(in srgb, var(--error-color, #db4437) 12%, transparent);
  }

  .emergency-confirm {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 8px 12px;
    margin-top: 14px;
    padding: 8px 8px 8px 12px;
    border: 1px solid var(--error-color, #db4437);
    border-radius: 10px;
    background: color-mix(in srgb, var(--error-color, #db4437) 12%, transparent);
  }

  .emergency-confirm-text {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
    color: var(--error-color, #db4437);
    font-weight: 600;
    --mdc-icon-size: 20px;
  }

  .emergency-confirm-actions {
    display: flex;
    gap: 8px;
    margin-left: auto;
  }

  .emergency-cancel,
  .emergency-confirm-button {
    min-height: 34px;
    padding: 6px 14px;
    border: 0;
    border-radius: 8px;
    font: inherit;
    font-weight: 600;
    cursor: pointer;
  }

  .emergency-cancel {
    color: var(--primary-text-color);
    background: var(--secondary-background-color);
  }

  .emergency-confirm-button {
    color: var(--text-primary-color, #fff);
    background: var(--error-color, #db4437);
    transition: opacity 150ms ease;
  }

  .emergency-confirm-button:disabled {
    opacity: .4;
    cursor: default;
  }

  .emergency-stop:focus-visible,
  .emergency-cancel:focus-visible,
  .emergency-confirm-button:focus-visible {
    outline: 2px solid var(--error-color, #db4437);
    outline-offset: 2px;
  }

  .camera-card {
    min-height: 120px;
    margin-bottom: 14px;
    overflow: hidden;
    border-radius: 14px;
    background: #111;
  }

  .camera-card > * {
    display: block;
  }

  .camera-warning,
  .spoolman-hint {
    padding: 10px 12px;
    color: var(--warning-color, #ff9800);
    background: var(--secondary-background-color);
    font-size: 12px;
  }

  .progress-block {
    margin-bottom: 10px;
    padding: 10px 12px 12px;
    border-radius: 12px;
    background: var(--secondary-background-color);
    cursor: pointer;
  }

  .progress-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 8px;
  }

  .progress-meta {
    display: flex;
    align-items: baseline;
    gap: 10px;
    min-width: 0;
  }

  .progress-layer {
    color: var(--secondary-text-color);
    font-size: 12px;
    white-space: nowrap;
  }

  .progress-value {
    color: var(--primary-text-color);
    font-size: 16px;
    font-variant-numeric: tabular-nums;
  }

  .bar {
    position: relative;
    overflow: hidden;
    border-radius: 999px;
    background: color-mix(in srgb, var(--primary-text-color) 12%, transparent);
  }

  .bar-fill {
    height: 100%;
    border-radius: inherit;
    background: var(--primary-color, #03a9f4);
    transition: width 400ms ease;
  }

  .progress-bar {
    height: 8px;
  }

  .progress-bar .bar-fill {
    background: var(--success-color, #4caf50);
  }

  .meter {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;
    flex: 1 1 auto;
    min-width: 0;
  }

  .meter-bar {
    flex: 0 1 120px;
    height: 6px;
  }

  .meter-bar.warning .bar-fill { background: var(--warning-color, #ff9800); }
  .meter-bar.critical .bar-fill { background: var(--error-color, #db4437); }

  .meter .value {
    min-width: 3.2em;
    font-variant-numeric: tabular-nums;
  }

  .grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 0;
  }

  .row,
  .spool-block {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    min-height: 36px;
    padding: 6px 0;
    border-bottom: 1px solid var(--divider-color);
  }

  .progress-block:hover {
    filter: brightness(1.05);
  }

  .row.clickable:hover,
  .spoolman-block:hover {
    margin: 0 -4px;
    padding-right: 4px;
    padding-left: 4px;
    border-radius: 8px;
    background: var(--secondary-background-color);
  }

  .label {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
    color: var(--secondary-text-color);
    font-size: 13px;
  }

  .label ha-icon {
    flex: 0 0 auto;
    --mdc-icon-size: 18px;
  }

  .value {
    color: var(--primary-text-color);
    font-size: 14px;
    font-weight: 500;
    text-align: right;
    overflow-wrap: anywhere;
  }

  .row.insufficient .label,
  .row.insufficient .value {
    color: var(--error-color, #db4437);
  }

  .value-note {
    margin-left: 6px;
    font-size: 12px;
    font-weight: 600;
  }

  .spoolman-block {
    display: block;
    padding: 10px 0;
  }

  .spool-block {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    align-items: stretch;
    justify-content: initial;
    gap: 8px;
    padding: 10px 0;
  }

  .spoolman-title,
  .spoolman-remaining {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }

  .spoolman-filament {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 8px 0 6px;
    color: var(--primary-text-color);
    font-size: 14px;
    font-weight: 600;
  }

  .filament-color {
    width: 16px;
    height: 16px;
    flex: 0 0 auto;
    border: 1px solid var(--divider-color);
    border-radius: 999px;
  }

  .spoolman-remaining {
    color: var(--secondary-text-color);
    font-size: 13px;
  }

  .spool-select {
    width: 100%;
    max-width: none;
    min-width: 0;
    box-sizing: border-box;
    padding: 6px 8px;
    border: 1px solid var(--divider-color);
    border-radius: 8px;
    overflow: hidden;
    color: var(--primary-text-color);
    background: var(--card-background-color, var(--ha-card-background));
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .spool-select-shell {
    position: relative;
    min-width: 0;
  }

  .spool-select-shell.busy .spool-select {
    padding-right: 34px;
    cursor: wait;
    opacity: .72;
  }

  .spool-select-spinner {
    position: absolute;
    top: 50%;
    right: 11px;
    width: 14px;
    height: 14px;
    box-sizing: border-box;
    transform: translateY(-50%);
    border: 2px solid color-mix(in srgb, var(--primary-text-color) 24%, transparent);
    border-top-color: var(--primary-text-color);
    border-radius: 999px;
    animation: spool-select-spin .7s linear infinite;
    pointer-events: none;
  }

  @keyframes spool-select-spin {
    to { transform: translateY(-50%) rotate(360deg); }
  }

  .macros {
    margin-top: 14px;
  }

  .section-title {
    margin-bottom: 8px;
    color: var(--secondary-text-color);
    font-size: 13px;
    font-weight: 600;
  }

  .printer-section-title {
    margin: 16px 0 2px;
  }

  .macro-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 8px;
  }

  .macro-button {
    min-height: 38px;
    padding: 9px 10px;
    border: 0;
    border-radius: 10px;
    color: var(--primary-text-color);
    background: var(--secondary-background-color);
    cursor: pointer;
  }

  @media (max-width: 360px) {
    .card { padding: 12px; }
    .macro-grid { grid-template-columns: 1fr; }
  }
`;class Xe extends ae{constructor(){super(...arguments),this._config=xe(),this._cameraError=!1,this._spoolSelectionBusy=!1,this._emergencyStopStage="idle",this._emergencyStopTimers=[],this._togglePower=async()=>{const e=this._config.entities.power_switch;if(e&&this._entity(e))try{await this.hass.callService("homeassistant","toggle",{},{entity_id:e})}catch(e){this._logError(e)}},this._requestEmergencyStop=()=>{this._resetEmergencyStop(),this._emergencyStopStage="confirming",this._emergencyStopTimers=[setTimeout(()=>{"confirming"===this._emergencyStopStage&&(this._emergencyStopStage="ready")},700),setTimeout(this._resetEmergencyStop,6e3)]},this._confirmEmergencyStop=async()=>{if("ready"!==this._emergencyStopStage)return;this._resetEmergencyStop();const e=this._config.entities.emergency_stop;e&&await this._callMacro({entity:e})},this._resetEmergencyStop=()=>{this._emergencyStopTimers.forEach(clearTimeout),this._emergencyStopTimers=[],this._emergencyStopStage="idle"},this._selectSpool=async e=>{const t=e.currentTarget,i=Ge(this._config.spoolman.set_active_spool_service),r=Ge(this._config.spoolman.get_active_spool_service),s=function(e){if(/^\d+$/.test(e))return{spool_id:Number(e),useragent:"3D-printer-status-card"}}(t.value);if(!i||!s)return;const o=t.value;this._selectionBaselineSpoolId=this._activeSpoolId(),this._pendingSpoolId=o,this._spoolSelectionBusy=!0;try{if(await this.hass.callService(i.domain,i.service,s),r){const e=function(e){const t=Je(e);if(!t)return;const i=Je(t.response)??t,r=Number(i.status);if(Number.isFinite(r)&&(r<200||r>=300))return;let s=i.content??i;if("string"==typeof s)try{s=JSON.parse(s)}catch{return}const o=Je(s),n=qe(Je(o?.result)?.spool_id??o?.spool_id);return/^\d+$/.test(n)?n:void 0}(await this.hass.callWS({type:"call_service",domain:r.domain,service:r.service,service_data:{useragent:"3D-printer-status-card"},return_response:!0}));if(!e)throw new Error("Active spool verification returned no valid spool ID");e===this._activeSpoolId()?(this._pendingSpoolId=void 0,this._selectionBaselineSpoolId=void 0):this._pendingSpoolId=e,e!==o&&console.warn("[3D printer status card]",`Moonraker confirmed spool ${e} instead of ${o}`)}}catch(e){this._pendingSpoolId=void 0,this._selectionBaselineSpoolId=void 0,this._logError(e)}finally{this._spoolSelectionBusy=!1}}}disconnectedCallback(){super.disconnectedCallback(),this._resetEmergencyStop()}setConfig(e){this._config=$e(e),this._cameraCard=void 0,this._cameraEntity=void 0,this._cameraFailedEntity=void 0,this._cameraError=!1,this._pendingSpoolId=void 0,this._spoolSelectionBusy=!1,this._selectionBaselineSpoolId=void 0,this._thumbnailFailedUrl=void 0,this._fileMetadata=void 0,this._metadataRequestedFor=void 0,this._resetEmergencyStop()}static getStubConfig(){return xe()}static async getConfigElement(){return await Promise.resolve().then(function(){return nt}),document.createElement("printer-status-card-editor")}getCardSize(){return this.hass?"expanded"===He(this._config,this.hass.states)?this._config.show_camera?9:6:1:3}getGridOptions(){return{columns:12,min_columns:6}}render(){if(!this.hass)return q``;const e=He(this._config,this.hass.states),t="expanded"===e;return q`
      <ha-card>
        <div class="card">
          ${this._renderHeader(e)}
          ${t?this._renderExpanded():J}
        </div>
      </ha-card>
    `}willUpdate(e){if(!e.has("hass")||!this._pendingSpoolId)return;const t=this._activeSpoolId(),i=t===this._pendingSpoolId,r=Boolean(t&&this._selectionBaselineSpoolId&&t!==this._selectionBaselineSpoolId);(i||r)&&(this._pendingSpoolId=void 0,this._selectionBaselineSpoolId=void 0)}updated(){this._syncCameraCard(),this._syncFileMetadata()}_t(e){return Ie(this._config.language,e)}_entity(e){if(e&&this.hass)return this.hass.states[e]}_formatEntity(e){const t=this._entity(e);if(!t)return"—";const i=this.hass.formatEntityState;if(i)try{return i.call(this.hass,t)}catch{}const r=t.attributes?.unit_of_measurement;return`${t.state}${r?` ${r}`:""}`}_renderHeader(e){const t=this._config.entities.power_switch,i=this._entity(t),r=Boolean(t&&i&&!Le(i)),s=this._config.entities.status;let o,n;if("powered_off"===e)o=this._t("status.poweredOff"),n="powered-off";else if("offline"===e)o=this._t("status.offline"),n="offline";else if(s&&this._entity(s)){const e=this._entity(s).state,t=function(e){return Ye[e.trim().toLowerCase()]??{cssClass:"idle"}}(e);o=t.translationKey?this._t(t.translationKey):e,n=t.cssClass}else o=this._t("status.ready"),n="complete";return q`
      <div class="header ${"expanded"===e?"":"compact"}">
        ${r?q`
          <button
            class="power-button ${"on"===i?.state?"on":"off"}"
            title=${this._t("actions.togglePower")}
            aria-label=${this._t("actions.togglePower")}
            @click=${this._togglePower}
          >
            <ha-icon icon="mdi:power"></ha-icon>
          </button>
        `:J}
        <div class="title">${this._config.name}</div>
        ${this._renderFilamentIndicator()}
        <div
          class="status ${n} ${s&&this._entity(s)?"clickable":""}"
          @click=${()=>s&&this._fireMoreInfo(s)}
        >${o}</div>
      </div>
    `}_renderFilamentIndicator(){const e=this._config.entities.filament_present,t=this._entity(e);if(!e||!t||Le(t))return J;const i=function(e,t,i){const r=e.trim().toLowerCase();if(r)return r===t.trim().toLowerCase()?"present":r===i.trim().toLowerCase()?"missing":void 0}(t.state,this._config.filament_present_state,this._config.filament_missing_state);if(!i)return J;const r=this._t("present"===i?"card.filamentPresent":"card.filamentMissing");return q`
      <button
        type="button"
        class="filament-indicator ${i}"
        title=${r}
        aria-label=${r}
        @click=${()=>this._fireMoreInfo(e)}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <circle cx="9" cy="12" r="6"></circle>
          <circle cx="9" cy="12" r="2"></circle>
          <path d="M15 12h2.4a2.6 2.6 0 0 1 2.6 2.6V18"></path>
          <path d="M20 18v2"></path>
        </svg>
      </button>
    `}_renderExpanded(){const e=this._config.entities.filename,t=this._entity(e),i=e&&t&&!Le(t),r=this._isActivePrintJob(),s=i?this._thumbnailUrl():void 0;return q`
      ${i?q`
        <div
          class="file ${s?"with-thumbnail":""}"
          @click=${()=>this._fireMoreInfo(e)}
        >
          ${s?q`
            <img
              class="file-thumbnail"
              src=${s}
              alt=""
              loading="lazy"
              @error=${()=>{this._thumbnailFailedUrl=s}}
              @click=${e=>{e.stopPropagation(),this._fireMoreInfo(this._config.entities.thumbnail)}}
            >
          `:J}
          <div class="file-name"><strong>${this._t("card.file")}:</strong> ${t.state}</div>
        </div>
      `:J}

      ${this._renderCamera()}

      ${r?this._renderProgress():J}

      <div class="grid">
        ${r?this._renderEntityRow("elapsed_time","card.elapsedTime","mdi:timer-outline"):J}
        ${r?this._renderEntityRow("remaining_time","card.remainingTime","mdi:timer-sand"):J}
        ${r?this._renderFinishTime():J}
        ${this._renderSpoolman()}
        ${r?this._renderEntityRow("filament_used","card.filamentUsed","mdi:printer-3d-nozzle"):J}
        ${r?this._renderFilamentRequired():J}
        ${this._renderSpoolSelect()}
        <div class="section-title printer-section-title">${this._t("card.printer")}</div>
        ${this._renderTemperatureRow("bed_temp","bed_target","card.bedTemperature","mdi:radiator")}
        ${this._renderTemperatureRow("extruder_temp","extruder_target","card.extruderTemperature","mdi:thermometer")}
        ${this._config.show_system_load?this._renderMeterRow("system_load","card.systemLoad","mdi:cpu-64-bit"):J}
        ${this._config.show_memory?this._renderMeterRow("memory_used","card.memory","mdi:memory"):J}
        ${this._renderEntityRow("total_print_time","card.totalPrintTime","mdi:clock-outline")}
        ${this._renderEntityRow("power_now","card.powerNow","mdi:flash")}
      </div>

      ${this._renderEmergencyStop()}
      ${this._renderMacros()}
    `}_currentFilename(){const e=this._entity(this._config.entities.filename);return e&&!Le(e)?e.state:void 0}async _syncFileMetadata(){if(!this.hass||!this._config.show_filament_required)return;if(this._config.entities.filament_required)return;const e=Ge(this._config.file_metadata_service),t=this._currentFilename();if(!e||!t||t===this._metadataRequestedFor)return;let i;this._metadataRequestedFor=t,this._fileMetadata=void 0;try{i=function(e){const t=Se(e);if(!t)return;const i=Se(t.response)??t,r=Number(i.status);if(Number.isFinite(r)&&(r<200||r>=300))return;let s=i.content??i;if("string"==typeof s)try{s=JSON.parse(s)}catch{return}const o=Se(s);return Se(o?.result)??o}(await this.hass.callWS({type:"call_service",domain:e.domain,service:e.service,service_data:{filename:t},return_response:!0}))}catch(e){this._logError(e)}this._metadataRequestedFor===t&&(this._fileMetadata={filename:t,metadata:i})}_requiredGrams(){const e=this._config.entities.filament_required;if(e){const t=Ue(this._entity(e));return void 0!==t&&t>0?t:void 0}const t=this._currentFilename();if(!t||this._fileMetadata?.filename!==t)return;const i=this._spoolDetails()?.mainEntity?.attributes??{};return function(e,t=1.24,i=1.75){if(!e)return;const r=Ee(e.filament_weight_total);if(void 0!==r)return Math.round(10*r)/10;const s=Ee(e.filament_total);if(void 0===s)return;const o=Ee(t)??1.24,n=Ee(i)??1.75,a=s*Math.PI*(n/2)**2/1e3;return Math.round(a*o*10)/10}(this._fileMetadata.metadata,i.filament_density,i.filament_diameter)}_renderFilamentRequired(){if(!this._config.show_filament_required)return J;const e=this._requiredGrams();if(void 0===e)return J;const t=this._entity(this._config.entities.progress),i=function(e,t){if(void 0===t)return e;const i=Math.min(100,Math.max(0,t))/100;return Math.round(e*(1-i)*10)/10}(e,t&&!Le(t)?Oe(t)??Ue(t):void 0),r=this._spoolDetails()?.mainEntity,s="g"===r?.attributes?.unit_of_measurement?Ue(r):void 0,o=void 0!==s&&s<i,n=this._config.entities.filament_required??this._config.entities.filename,a=void 0===s?void 0:`${this._t("card.filamentStillNeeded")}: ${Ae(i)} · ${this._t("card.onSpool")}: ${Ae(s)}`;return q`
      <div
        class="row clickable ${o?"insufficient":""}"
        title=${a??J}
        @click=${()=>this._fireMoreInfo(n)}
      >
        <div class="label">
          <ha-icon icon=${o?"mdi:alert":"mdi:weight-gram"}></ha-icon>
          <span>${this._t("card.filamentRequired")}</span>
        </div>
        <div class="value">
          ${Ae(e)}${o?q`<span class="value-note">${this._t("card.notEnoughFilament")}</span>`:J}
        </div>
      </div>
    `}_thumbnailUrl(){if(!this._config.show_thumbnail)return;const e=this._entity(this._config.entities.thumbnail);if(!e||Le(e))return;const t=e.attributes?.entity_picture;if("string"!=typeof t||""===t)return;const i=this.hass.hassUrl?.(t)??t;return i===this._thumbnailFailedUrl?void 0:i}_isActivePrintJob(){const e=this._config.entities.status,t=this._entity(e);return Boolean(e&&t&&!Le(t)&&function(e){return Qe.has(String(e??"").trim().toLowerCase())}(t.state))}_renderEntityRow(e,t,i){const r=this._config.entities[e],s=this._entity(r);return r&&s&&!Le(s)?q`
      <div class="row clickable" @click=${()=>this._fireMoreInfo(r)}>
        <div class="label"><ha-icon icon=${i}></ha-icon><span>${this._t(t)}</span></div>
        <div class="value">${this._formatEntity(r)}</div>
      </div>
    `:J}_renderTemperatureRow(e,t,i,r){const s=this._config.entities[e],o=this._entity(s);if(!s||!o||Le(o))return J;const n=function(e,t){const i=Ue(e),r=Ue(t);if(void 0===i||void 0===r||r<=0)return;const s=e?.attributes?.unit_of_measurement??t?.attributes?.unit_of_measurement,o=`${Number(i.toFixed(1))} / ${Math.round(r)}`;return s?`${o} ${s}`:o}(o,this._entity(this._config.entities[t]));return n?q`
      <div class="row clickable" @click=${()=>this._fireMoreInfo(s)}>
        <div class="label"><ha-icon icon=${r}></ha-icon><span>${this._t(i)}</span></div>
        <div class="value">${n}</div>
      </div>
    `:this._renderEntityRow(e,i,r)}_renderProgress(){const e=this._config.entities.progress,t=this._entity(e);if(!this._config.show_progress||!e||!t||Le(t))return J;const i=Oe(t)??Ue(t);if(void 0===i)return J;const r=Math.min(100,Math.max(0,i)),s=function(e,t){const i=Ue(e);if(void 0===i)return;const r=Ue(t);return r&&r>0?`${Math.round(i)} / ${Math.round(r)}`:String(Math.round(i))}(this._entity(this._config.entities.current_layer),this._entity(this._config.entities.total_layer));return q`
      <div
        class="progress-block clickable"
        role="progressbar"
        aria-label=${this._t("card.progress")}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow=${Math.floor(r)}
        @click=${()=>this._fireMoreInfo(e)}
      >
        <div class="progress-head">
          <div class="label"><ha-icon icon="mdi:progress-clock"></ha-icon><span>${this._t("card.progress")}</span></div>
          <div class="progress-meta">
            ${s?q`<span class="progress-layer">${this._t("card.layer")} ${s}</span>`:J}
            <strong class="progress-value">${De(r)}</strong>
          </div>
        </div>
        <div class="bar progress-bar"><div class="bar-fill" style=${`width:${r}%`}></div></div>
      </div>
    `}_renderMeterRow(e,t,i){const r=this._config.entities[e],s=this._entity(r);if(!r||!s||Le(s))return J;const o=Oe(s);return void 0===o?this._renderEntityRow(e,t,i):q`
      <div class="row meter-row clickable" @click=${()=>this._fireMoreInfo(r)}>
        <div class="label"><ha-icon icon=${i}></ha-icon><span>${this._t(t)}</span></div>
        <div class="meter">
          <div class="bar meter-bar ${function(e){return e>=90?"critical":e>=75?"warning":"normal"}(o)}">
            <div class="bar-fill" style=${`width:${o}%`}></div>
          </div>
          <div class="value">${De(o)}</div>
        </div>
      </div>
    `}_renderFinishTime(){const e=this._config.entities.remaining_time,t=this._entity(e);if(!e||!t||Le(t))return J;const i=function(e,t,i=new Date){const r=Te(e);if(!r)return;const s=new Date(i.getTime()+1e3*r);if(!Number.isFinite(s.getTime()))return;const o=Ce[t],n=new Intl.DateTimeFormat(o,{hour:"2-digit",minute:"2-digit",hour12:!1}).format(s),a=Math.round((Pe(s)-Pe(i))/864e5);return 0===a?n:1===a?Me[t].replace("{time}",n):`${new Intl.DateTimeFormat(o,{day:"numeric",month:"long"}).format(s)}, ${n}`}(t,this._config.language);return i?q`
      <div class="row clickable" @click=${()=>this._fireMoreInfo(e)}>
        <div class="label">
          <ha-icon icon="mdi:clock-end"></ha-icon>
          <span>${this._t("card.finishesAt")}</span>
        </div>
        <div class="value">${i}</div>
      </div>
    `:J}_renderCamera(){const e=this._config.entities.camera,t=this._entity(e);return this._config.show_camera&&e&&t&&!Le(t)?this._cameraError?q`<div class="camera-warning">${this._t("warning.cameraUnavailable")}</div>`:q`<div class="camera-card" data-camera-host></div>`:J}async _syncCameraCard(){if(!this.hass)return;const e=He(this._config,this.hass.states),t=this._config.entities.camera,i=this._entity(t),r=this.renderRoot.querySelector("[data-camera-host]");if("expanded"===e&&this._config.show_camera&&t&&i&&!Le(i)&&r&&this._cameraFailedEntity!==t)try{if(!this._cameraCard||this._cameraEntity!==t){const e={type:"picture-entity",entity:t,camera_view:this._config.camera_view,show_name:!1,show_state:!1,tap_action:{action:"more-info"}};if(window.loadCardHelpers){const t=await window.loadCardHelpers();this._cameraCard=t.createCardElement(e)}else{const t=document.createElement("hui-picture-entity-card");t.setConfig(e),this._cameraCard=t}this._cameraEntity=t}if(!r.isConnected||this._config.entities.camera!==t||"expanded"!==He(this._config,this.hass.states))return;this._cameraCard.hass=this.hass,r.contains(this._cameraCard)||r.replaceChildren(this._cameraCard)}catch(e){this._cameraFailedEntity=t,this._cameraError=!0,this._logError(e)}}_activeSpoolId(){const e=this._entity(this._config.entities.spool_id);if(e&&!Le(e))return e.state.match(/\d+/)?.[0]}_displaySpoolId(){return e=this._activeSpoolId(),(this._pendingSpoolId??e??"")||void 0;var e}_spoolEntityId(e,t=this._displaySpoolId()){return t?e.replaceAll("{id}",t):void 0}_normalizeHexColor(e){if("string"!=typeof e)return;const t=e.trim().startsWith("#")?e.trim():`#${e.trim()}`;return/^#[0-9a-f]{3}([0-9a-f]{3})?$/i.test(t)?t:void 0}_spoolDetails(e=this._displaySpoolId()){if(!e)return;const t=this._spoolEntityId(this._config.spoolman.spool_entity_template,e),i=this._spoolEntityId(this._config.spoolman.filament_name_entity_template,e),r=this._spoolEntityId(this._config.spoolman.color_hex_entity_template,e),s=this._entity(t),o=this._entity(i),n=this._entity(r),a=s?.attributes??{};return{spoolId:e,mainId:t,nameId:i,colorId:r,name:o&&!Le(o)?o.state:String(a.filament_name??a.name??a.material??a.filament_material??a.vendor??"—"),color:this._normalizeHexColor(n&&!Le(n)?n.state:a.color_hex??a.filament_color_hex??a.color??a.filament_color),remaining:s&&!Le(s)?this._formatEntity(t):String(a.remaining_weight??a.remaining_length??a.weight??a.used_weight??"—"),mainEntity:s,nameEntity:o}}_renderSpoolman(){const e=this._config.entities.spool_id,t=this._entity(e),i=this._displaySpoolId();if(!e)return J;if(!i&&(!t||Le(t)))return J;const r=this._spoolDetails(i);if(!r)return q`
        <div class="row clickable" @click=${()=>this._fireMoreInfo(e)}>
          <div class="label"><ha-icon icon="mdi:printer-3d-nozzle-outline"></ha-icon><span>${this._t("card.activeSpool")}</span></div>
          <div class="value">—</div>
        </div>
      `;const s=r.mainId&&r.mainEntity?r.mainId:e;return q`
      <div class="spoolman-block" @click=${()=>this._fireMoreInfo(s)}>
        <div class="spoolman-title">
          <div class="label"><ha-icon icon="mdi:printer-3d-nozzle-outline"></ha-icon><span>${this._t("card.spoolman")}</span></div>
          <div class="value">ID ${r.spoolId}</div>
        </div>
        <div class="spoolman-filament">
          ${r.color?q`<span class="filament-color" style=${`background:${r.color}`}></span>`:J}
          <span>${r.name}</span>
        </div>
        <div class="spoolman-remaining">
          <span>${this._t("card.remaining")}</span>
          <strong>${r.remaining}</strong>
        </div>
        ${r.mainEntity&&r.nameEntity?J:q`
          <div class="spoolman-hint">
            ${this._t("warning.missingEntity")}:
            ${r.mainEntity?r.nameId:r.mainId}
          </div>
        `}
      </div>
    `}_renderSpoolSelect(){if(!Ge(this._config.spoolman.set_active_spool_service))return J;const e=function(e,t,i,r,s,o){if(!i.includes("{id}"))return[];const[n,a]=i.split("{id}",2),c=[];for(const[i,l]of Object.entries(e)){if(!i.startsWith(n)||!i.endsWith(a))continue;if(!l||Be(l))continue;const d=qe(l.state);if(!/^\d+$/.test(d))continue;const m=t.includes("{id}")?e[t.replaceAll("{id}",d)]:void 0;if(!0===l.attributes?.archived||!0===m?.attributes?.archived)continue;const p=m?.attributes??{},h=Ke(e,r,d)??We(p,["filament_name","name"]),u=Ke(e,s,d)??We(p,["filament_material","material"]),_=Ke(e,o,d)??We(p,["filament_vendor_name","vendor_name","vendor"]);c.push({id:d,label:Ve([h,u,_],d)})}return c.sort((e,t)=>Number(e.id)-Number(t.id))}(this.hass.states,this._config.spoolman.spool_entity_template,this._config.spoolman.id_entity_template,this._config.spoolman.filament_name_entity_template,this._config.spoolman.filament_material_entity_template,this._config.spoolman.vendor_name_entity_template);if(0===e.length)return J;const t=this._displaySpoolId()??"";return q`
      <div class="spool-block">
        <div class="label"><ha-icon icon="mdi:printer-3d-nozzle-outline"></ha-icon><span>${this._t("card.spoolSelection")}</span></div>
        <div class="spool-select-shell ${this._spoolSelectionBusy?"busy":""}">
          <select
            class="spool-select"
            .value=${ye(t)}
            ?disabled=${this._spoolSelectionBusy}
            aria-busy=${this._spoolSelectionBusy?"true":"false"}
            @change=${this._selectSpool}
          >
            ${t?J:q`<option value="" disabled .selected=${!0}>—</option>`}
            ${e.map(e=>{return q`
              <option
                .value=${e.id}
                .selected=${i=e.id,r=t||void 0,void 0!==r&&i===r}
              >${e.label}</option>
            `;var i,r})}
          </select>
          ${this._spoolSelectionBusy?q`<span class="spool-select-spinner" aria-hidden="true"></span>`:J}
        </div>
      </div>
    `}_renderEmergencyStop(){const e=this._config.entities.emergency_stop,t=this._entity(e);if(!this._config.show_emergency_stop||!e||!t)return J;if("unavailable"===ze(t))return J;if("idle"===this._emergencyStopStage)return q`
        <button type="button" class="emergency-stop" @click=${this._requestEmergencyStop}>
          <ha-icon icon="mdi:alert-octagon"></ha-icon>
          <span>${this._t("actions.emergencyStop")}</span>
        </button>
      `;const i="ready"===this._emergencyStopStage;return q`
      <div class="emergency-confirm" role="alertdialog" aria-live="assertive">
        <div class="emergency-confirm-text">
          <ha-icon icon="mdi:alert-octagon"></ha-icon>
          <span>${this._t("actions.emergencyStopQuestion")}</span>
        </div>
        <div class="emergency-confirm-actions">
          <button type="button" class="emergency-cancel" @click=${this._resetEmergencyStop}>
            ${this._t("actions.cancel")}
          </button>
          <button
            type="button"
            class="emergency-confirm-button"
            ?disabled=${!i}
            @click=${this._confirmEmergencyStop}
          >${this._t("actions.emergencyStopConfirm")}</button>
        </div>
      </div>
    `}_renderMacros(){return 0===this._config.macros.length?J:q`
      <section class="macros">
        <div class="section-title">${this._t("card.macros")}</div>
        <div class="macro-grid">
          ${this._config.macros.map((e,t)=>q`
            <button class="macro-button" @click=${()=>{this._callMacro(e)}}>
              ${e.name||`Macro ${t+1}`}
            </button>
          `)}
        </div>
      </section>
    `}_fireMoreInfo(e){e&&this.dispatchEvent(new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:e}}))}async _callMacro(e){try{if(e.service){const[t,i]=e.service.split(".",2);if(!t||!i)return;return void await this.hass.callService(t,i,e.service_data??{},e.target??{})}if(!e.entity)return;const t=e.entity.split(".")[0];"button"===t?await this.hass.callService("button","press",{},{entity_id:e.entity}):"script"===t?await this.hass.callService("script","turn_on",{},{entity_id:e.entity}):await this.hass.callService(t,"turn_on",{},{entity_id:e.entity})}catch(e){this._logError(e)}}_logError(e){console.error("[3D printer status card]",e)}}function et(e){return JSON.stringify(e??{},null,2)}function tt(e){return Object.keys(e).length>0}function it(e){return{name:e.name??"",kind:e.service?"service":"entity",entity:e.entity??"",service:e.service??"",service_data_text:et(e.service_data),target_text:et(e.target)}}function rt(e){try{const t=JSON.parse(e.trim()||"{}");if(!t||"object"!=typeof t||Array.isArray(t))return;return t}catch{return}}Xe.styles=Ze,e([me({attribute:!1})],Xe.prototype,"hass",void 0),e([pe()],Xe.prototype,"_config",void 0),e([pe()],Xe.prototype,"_cameraError",void 0),e([pe()],Xe.prototype,"_pendingSpoolId",void 0),e([pe()],Xe.prototype,"_spoolSelectionBusy",void 0),e([pe()],Xe.prototype,"_thumbnailFailedUrl",void 0),e([pe()],Xe.prototype,"_fileMetadata",void 0),e([pe()],Xe.prototype,"_emergencyStopStage",void 0),customElements.get("printer-status-card")||customElements.define("printer-status-card",Xe),window.customCards=window.customCards??[],window.customCards.some(e=>"printer-status-card"===e.type)||window.customCards.push({type:"printer-status-card",name:"3D printer status card",description:Ie("en","common.description"),preview:!0,configurable:!0}),console.info("%c 3D PRINTER STATUS CARD %c v1.1.0 ","color:#111;background:#ff9800;font-weight:700;","color:#ff9800;background:#111;font-weight:700;");const st={language:"fields.language",name:"fields.name",show_camera:"fields.showCamera",camera_view:"fields.cameraView",show_progress:"fields.showProgress",show_system_load:"fields.showSystemLoad",show_memory:"fields.showMemory",show_thumbnail:"fields.showThumbnail",show_emergency_stop:"fields.showEmergencyStop",show_filament_required:"fields.showFilamentRequired",file_metadata_service:"fields.fileMetadataService",filament_required:"fields.filamentRequired",bed_target:"fields.bedTarget",extruder_target:"fields.extruderTarget",thumbnail:"fields.thumbnail",emergency_stop:"fields.emergencyStop",progress:"fields.progress",current_layer:"fields.currentLayer",total_layer:"fields.totalLayer",system_load:"fields.systemLoad",memory_used:"fields.memoryUsed",status:"fields.status",remaining_time:"fields.remainingTime",elapsed_time:"fields.elapsedTime",filament_used:"fields.filamentUsed",bed_temp:"fields.bedTemperature",extruder_temp:"fields.extruderTemperature",total_print_time:"fields.totalPrintTime",filament_present:"fields.filamentPresent",filename:"fields.filename",camera:"fields.camera",power_switch:"fields.powerSwitch",power_now:"fields.powerNow",filament_present_state:"fields.filamentPresentState",filament_missing_state:"fields.filamentMissingState",spool_id:"fields.spoolId",set_active_spool_service:"fields.setActiveSpoolService",get_active_spool_service:"fields.getActiveSpoolService",spool_entity_template:"fields.spoolEntityTemplate",filament_name_entity_template:"fields.filamentNameEntityTemplate",filament_material_entity_template:"fields.filamentMaterialEntityTemplate",vendor_name_entity_template:"fields.vendorNameEntityTemplate",color_hex_entity_template:"fields.colorHexEntityTemplate",id_entity_template:"fields.idEntityTemplate",macroName:"fields.macroName",macroKind:"fields.macroKind",macroEntity:"fields.macroEntity",macroService:"fields.macroService"};class ot extends ae{constructor(){super(...arguments),this._config=$e({type:"custom:printer-status-card"}),this._macroRows=[],this._macroErrors={},this._computeLabel=e=>{if(!e.name)return"";const t=st[e.name];return t?this._t(t):e.name},this._generalChanged=e=>{this._emitConfig({...this._config,...e.detail.value})},this._entitiesChanged=e=>{this._emitConfig({...this._config,entities:{...this._config.entities,...e.detail.value}})},this._spoolmanChanged=e=>{const t=e.detail.value??{},{spool_id:i,...r}=t;this._emitConfig({...this._config,entities:{...this._config.entities,spool_id:i},spoolman:{...this._config.spoolman,...r}})},this._addMacro=()=>{this._macroRows=[...this._macroRows,{name:"",kind:"entity",entity:"",service:"",service_data_text:"{}",target_text:"{}"}]}}setConfig(e){this._config=$e(e),this._macroRows=this._config.macros.map(it),this._macroErrors={}}render(){return this.hass?q`
      ${this._renderSection(this._t("editor.general"),{language:this._config.language,name:this._config.name,show_camera:this._config.show_camera,camera_view:this._config.camera_view,show_progress:this._config.show_progress,show_system_load:this._config.show_system_load,show_memory:this._config.show_memory,show_thumbnail:this._config.show_thumbnail,show_emergency_stop:this._config.show_emergency_stop,show_filament_required:this._config.show_filament_required,file_metadata_service:this._config.file_metadata_service},this._generalSchema(),this._generalChanged)}

      ${this._renderSection(this._t("editor.printerEntities"),this._config.entities,this._printerEntitiesSchema(),this._entitiesChanged)}

      ${this._renderSection(this._t("editor.power"),{power_switch:this._config.entities.power_switch,power_now:this._config.entities.power_now},this._powerSchema(),this._entitiesChanged,this._t("editor.powerHelp"))}

      ${this._renderSection(this._t("editor.filamentStates"),{filament_present_state:this._config.filament_present_state,filament_missing_state:this._config.filament_missing_state},this._filamentSchema(),this._generalChanged)}

      ${this._renderSection(this._t("editor.spoolman"),{spool_id:this._config.entities.spool_id,...this._config.spoolman},this._spoolmanSchema(),this._spoolmanChanged)}

      ${this._renderMacroEditor()}
    `:q``}_t(e){return Ie(this._config.language,e)}_renderSection(e,t,i,r,s){return q`
      <section class="section">
        <div class="section-title">${e}</div>
        <div class="section-body">
          ${s?q`<p class="help">${s}</p>`:J}
          <ha-form
            .hass=${this.hass}
            .data=${t}
            .schema=${i}
            .computeLabel=${this._computeLabel}
            @value-changed=${r}
          ></ha-form>
        </div>
      </section>
    `}_generalSchema(){return[{type:"grid",column_min_width:"180px",schema:[{name:"language",selector:{select:{mode:"dropdown",options:[{value:"en",label:this._t("options.english")},{value:"ru",label:this._t("options.russian")},{value:"uk",label:this._t("options.ukrainian")}]}}},{name:"name",selector:{text:{}}},{name:"show_camera",selector:{boolean:{}}},{name:"camera_view",selector:{select:{options:[{value:"live",label:this._t("options.live")},{value:"auto",label:this._t("options.auto")}]}}},{name:"show_progress",selector:{boolean:{}}},{name:"show_system_load",selector:{boolean:{}}},{name:"show_memory",selector:{boolean:{}}},{name:"show_thumbnail",selector:{boolean:{}}},{name:"show_emergency_stop",selector:{boolean:{}}},{name:"show_filament_required",selector:{boolean:{}}},{name:"file_metadata_service",selector:{text:{}}}]}]}_printerEntitiesSchema(){return[{type:"grid",column_min_width:"210px",schema:[{name:"status",selector:{entity:{}}},{name:"remaining_time",selector:{entity:{}}},{name:"elapsed_time",selector:{entity:{}}},{name:"filament_used",selector:{entity:{}}},{name:"bed_temp",selector:{entity:{}}},{name:"extruder_temp",selector:{entity:{}}},{name:"bed_target",selector:{entity:{domain:["number","sensor"]}}},{name:"extruder_target",selector:{entity:{domain:["number","sensor"]}}},{name:"total_print_time",selector:{entity:{}}},{name:"filament_present",selector:{entity:{}}},{name:"filename",selector:{entity:{}}},{name:"progress",selector:{entity:{domain:"sensor"}}},{name:"current_layer",selector:{entity:{domain:"sensor"}}},{name:"total_layer",selector:{entity:{domain:"sensor"}}},{name:"system_load",selector:{entity:{domain:"sensor"}}},{name:"memory_used",selector:{entity:{domain:"sensor"}}},{name:"camera",selector:{entity:{domain:"camera"}}},{name:"thumbnail",selector:{entity:{domain:"camera"}}},{name:"emergency_stop",selector:{entity:{domain:["button","script"]}}},{name:"filament_required",selector:{entity:{domain:"sensor"}}}]}]}_powerSchema(){return[{type:"grid",column_min_width:"210px",schema:[{name:"power_switch",selector:{entity:{domain:"switch"}}},{name:"power_now",selector:{entity:{domain:"sensor"}}}]}]}_filamentSchema(){return[{type:"grid",column_min_width:"180px",schema:[{name:"filament_present_state",selector:{text:{}}},{name:"filament_missing_state",selector:{text:{}}}]}]}_spoolmanSchema(){return[{type:"grid",column_min_width:"220px",schema:[{name:"spool_id",selector:{entity:{}}},{name:"set_active_spool_service",selector:{text:{}}},{name:"get_active_spool_service",selector:{text:{}}},{name:"spool_entity_template",selector:{text:{}}},{name:"filament_name_entity_template",selector:{text:{}}},{name:"filament_material_entity_template",selector:{text:{}}},{name:"vendor_name_entity_template",selector:{text:{}}},{name:"color_hex_entity_template",selector:{text:{}}},{name:"id_entity_template",selector:{text:{}}}]}]}_emitConfig(e){this._config=$e(e),this.dispatchEvent(new CustomEvent("config-changed",{bubbles:!0,composed:!0,detail:{config:this._config}}))}_renderMacroEditor(){return q`
      <section class="section">
        <div class="section-title">${this._t("editor.macros")}</div>
        <div class="section-body">
          <div class="macro-list">
            ${0===this._macroRows.length?q`<div class="empty">${this._t("editor.noMacros")}</div>`:this._macroRows.map((e,t)=>this._renderMacroRow(e,t))}
          </div>
          <button class="add-button" @click=${this._addMacro}>＋ ${this._t("actions.addMacro")}</button>
        </div>
      </section>
    `}_renderMacroRow(e,t){const i="entity"===e.kind?{macroName:e.name,macroKind:e.kind,macroEntity:e.entity}:{macroName:e.name,macroKind:e.kind,macroService:e.service},r=[{type:"grid",column_min_width:"180px",schema:[{name:"macroName",selector:{text:{}}},{name:"macroKind",selector:{select:{options:[{value:"entity",label:this._t("options.entity")},{value:"service",label:this._t("options.service")}]}}},"entity"===e.kind?{name:"macroEntity",selector:{entity:{}}}:{name:"macroService",selector:{text:{}}}]}];return q`
      <article class="macro-row">
        <div class="macro-header">
          <div class="macro-title">${this._t("editor.macro")} ${t+1}</div>
          <div class="macro-actions">
            <button
              title=${this._t("actions.moveUp")}
              ?disabled=${0===t}
              @click=${()=>this._moveMacro(t,-1)}
            >↑</button>
            <button
              title=${this._t("actions.moveDown")}
              ?disabled=${t===this._macroRows.length-1}
              @click=${()=>this._moveMacro(t,1)}
            >↓</button>
            <button title=${this._t("actions.removeMacro")} @click=${()=>this._removeMacro(t)}>×</button>
          </div>
        </div>

        <ha-form
          .hass=${this.hass}
          .data=${i}
          .schema=${r}
          .computeLabel=${this._computeLabel}
          @value-changed=${e=>this._macroBasicChanged(t,e)}
        ></ha-form>

        ${"service"===e.kind?q`
          <div class="json-grid">
            ${this._renderJsonField(t,"service_data_text","fields.serviceData",e.service_data_text)}
            ${this._renderJsonField(t,"target_text","fields.target",e.target_text)}
          </div>
        `:J}
      </article>
    `}_renderJsonField(e,t,i,r){const s=`${e}.${t}`,o=!0===this._macroErrors[s];return q`
      <div class="json-field">
        <label>${this._t(i)}</label>
        <textarea
          class=${o?"invalid":""}
          .value=${r}
          @input=${i=>this._macroJsonChanged(e,t,i.currentTarget.value)}
        ></textarea>
        ${o?q`<div class="error">${this._t("editor.invalidJson")}</div>`:J}
      </div>
    `}_removeMacro(e){this._macroRows=this._macroRows.filter((t,i)=>i!==e),this._macroErrors={},this._commitMacros()}_moveMacro(e,t){const i=e+t;if(i<0||i>=this._macroRows.length)return;const r=[...this._macroRows];[r[e],r[i]]=[r[i],r[e]],this._macroRows=r,this._macroErrors={},this._commitMacros()}_macroBasicChanged(e,t){const i=t.detail.value??{},r=[...this._macroRows];r[e]={...r[e],name:String(i.macroName??""),kind:"service"===i.macroKind?"service":"entity",entity:String(i.macroEntity??r[e].entity??""),service:String(i.macroService??r[e].service??"")},this._macroRows=r,this._commitMacros()}_macroJsonChanged(e,t,i){const r=[...this._macroRows];r[e]={...r[e],[t]:i},this._macroRows=r,this._commitMacros()}_commitMacros(){const{macros:e,errors:t}=function(e){const t={},i=[];return e.forEach((e,r)=>{if("entity"===e.kind)return void(e.entity&&i.push({name:e.name||void 0,entity:e.entity}));const s=rt(e.service_data_text),o=rt(e.target_text);s||(t[`${r}.service_data_text`]=!0),o||(t[`${r}.target_text`]=!0),s&&o&&e.service&&i.push({name:e.name||void 0,service:e.service,...tt(s)?{service_data:s}:{},...tt(o)?{target:o}:{}})}),Object.keys(t).length>0?{macros:[],errors:t}:{macros:i,errors:t}}(this._macroRows);this._macroErrors=t,Object.keys(t).length>0||this._emitConfig({...this._config,macros:e})}}ot.styles=n`
    :host {
      display: block;
    }

    .section {
      margin: 10px 0;
      border: 1px solid var(--divider-color);
      border-radius: 12px;
      overflow: hidden;
    }

    .section-title {
      padding: 12px 16px;
      color: var(--primary-text-color);
      font-size: 15px;
      font-weight: 600;
      background: var(--secondary-background-color);
    }

    .section-body {
      padding: 14px 16px;
    }

    .help {
      margin: 0 0 12px;
      color: var(--secondary-text-color);
      font-size: 13px;
      line-height: 1.4;
    }

    .macro-list {
      display: grid;
      gap: 12px;
    }

    .macro-row {
      padding: 12px;
      border: 1px solid var(--divider-color);
      border-radius: 10px;
    }

    .macro-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      margin-bottom: 10px;
    }

    .macro-title {
      color: var(--primary-text-color);
      font-weight: 600;
    }

    .macro-actions {
      display: flex;
      gap: 4px;
    }

    button {
      min-height: 34px;
      padding: 6px 10px;
      border: 1px solid var(--divider-color);
      border-radius: 8px;
      color: var(--primary-text-color);
      background: var(--secondary-background-color);
      cursor: pointer;
    }

    button:disabled {
      opacity: .45;
      cursor: default;
    }

    .add-button {
      width: 100%;
      margin-top: 12px;
    }

    .json-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 12px;
      margin-top: 10px;
    }

    .json-field label {
      display: block;
      margin-bottom: 6px;
      color: var(--secondary-text-color);
      font-size: 12px;
    }

    textarea {
      width: 100%;
      min-height: 104px;
      box-sizing: border-box;
      resize: vertical;
      padding: 9px;
      border: 1px solid var(--divider-color);
      border-radius: 8px;
      color: var(--primary-text-color);
      background: var(--card-background-color, var(--ha-card-background));
      font-family: var(--code-font-family, monospace);
      font-size: 12px;
    }

    textarea.invalid {
      border-color: var(--error-color);
    }

    .error {
      margin-top: 4px;
      color: var(--error-color);
      font-size: 12px;
    }

    .empty {
      color: var(--secondary-text-color);
      font-size: 13px;
      text-align: center;
    }

    @media (max-width: 520px) {
      .json-grid { grid-template-columns: 1fr; }
    }
  `,e([me({attribute:!1})],ot.prototype,"hass",void 0),e([me({attribute:!1})],ot.prototype,"lovelace",void 0),e([pe()],ot.prototype,"_config",void 0),e([pe()],ot.prototype,"_macroRows",void 0),e([pe()],ot.prototype,"_macroErrors",void 0),customElements.get("printer-status-card-editor")||customElements.define("printer-status-card-editor",ot);var nt=Object.freeze({__proto__:null,PrinterStatusCardEditor:ot});export{Xe as PrinterStatusCard};
