function e(e,t,i,r){var s,o=arguments.length,n=o<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,r);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(n=(o<3?s(n):o>3?s(t,i,n):s(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n}function t(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const i=globalThis,r=i.ShadowRoot&&(void 0===i.ShadyCSS||i.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),o=new WeakMap;let n=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(r&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=o.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&o.set(t,e))}return e}toString(){return this.cssText}};const a=(e,...t)=>{const i=1===e.length?e[0]:t.reduce((t,i,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[r+1],e[0]);return new n(i,e,s)},l=r?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new n("string"==typeof e?e:e+"",void 0,s))(t)})(e):e,{is:c,defineProperty:d,getOwnPropertyDescriptor:h,getOwnPropertyNames:p,getOwnPropertySymbols:u,getPrototypeOf:g}=Object,f=globalThis,v=f.trustedTypes,m=v?v.emptyScript:"",b=f.reactiveElementPolyfillSupport,$=(e,t)=>e,y={toAttribute(e,t){switch(t){case Boolean:e=e?m:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},x=(e,t)=>!c(e,t),_={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:x};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),f.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=_){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(e,i,t);void 0!==r&&d(this.prototype,e,r)}}static getPropertyDescriptor(e,t,i){const{get:r,set:s}=h(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:r,set(t){const o=r?.call(this);s?.call(this,t),this.requestUpdate(e,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??_}static _$Ei(){if(this.hasOwnProperty($("elementProperties")))return;const e=g(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty($("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty($("properties"))){const e=this.properties,t=[...p(e),...u(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(l(e))}else void 0!==e&&t.push(l(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,t)=>{if(r)e.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const r of t){const t=document.createElement("style"),s=i.litNonce;void 0!==s&&t.setAttribute("nonce",s),t.textContent=r.cssText,e.appendChild(t)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,i);if(void 0!==r&&!0===i.reflect){const s=(void 0!==i.converter?.toAttribute?i.converter:y).toAttribute(t,i.type);this._$Em=e,null==s?this.removeAttribute(r):this.setAttribute(r,s),this._$Em=null}}_$AK(e,t){const i=this.constructor,r=i._$Eh.get(e);if(void 0!==r&&this._$Em!==r){const e=i.getPropertyOptions(r),s="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:y;this._$Em=r;const o=s.fromAttribute(t,e.type);this[r]=o??this._$Ej?.get(r)??o,this._$Em=null}}requestUpdate(e,t,i){if(void 0!==e){const r=this.constructor,s=this[e];if(i??=r.getPropertyOptions(e),!((i.hasChanged??x)(s,t)||i.useDefault&&i.reflect&&s===this._$Ej?.get(e)&&!this.hasAttribute(r._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:r,wrapped:s},o){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,o??t??this[e]),!0!==s||void 0!==o)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===r&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,r=this[t];!0!==e||this._$AL.has(t)||void 0===r||this.C(t,void 0,i,r)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[$("elementProperties")]=new Map,w[$("finalized")]=new Map,b?.({ReactiveElement:w}),(f.reactiveElementVersions??=[]).push("2.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const A=globalThis,S=A.trustedTypes,E=S?S.createPolicy("lit-html",{createHTML:e=>e}):void 0,k="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+C,O=`<${P}>`,U=document,R=()=>U.createComment(""),z=e=>null===e||"object"!=typeof e&&"function"!=typeof e,M=Array.isArray,T="[ \t\n\f\r]",j=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,H=/-->/g,N=/>/g,D=RegExp(`>|${T}(?:([^\\s"'>=/]+)(${T}*=${T}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),L=/'/g,I=/"/g,B=/^(?:script|style|textarea|title)$/i,V=(e=>(t,...i)=>({_$litType$:e,strings:t,values:i}))(1),W=Symbol.for("lit-noChange"),K=Symbol.for("lit-nothing"),q=new WeakMap,F=U.createTreeWalker(U,129);function Y(e,t){if(!M(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(t):t}const Z=(e,t)=>{const i=e.length-1,r=[];let s,o=2===t?"<svg>":3===t?"<math>":"",n=j;for(let t=0;t<i;t++){const i=e[t];let a,l,c=-1,d=0;for(;d<i.length&&(n.lastIndex=d,l=n.exec(i),null!==l);)d=n.lastIndex,n===j?"!--"===l[1]?n=H:void 0!==l[1]?n=N:void 0!==l[2]?(B.test(l[2])&&(s=RegExp("</"+l[2],"g")),n=D):void 0!==l[3]&&(n=D):n===D?">"===l[0]?(n=s??j,c=-1):void 0===l[1]?c=-2:(c=n.lastIndex-l[2].length,a=l[1],n=void 0===l[3]?D:'"'===l[3]?I:L):n===I||n===L?n=D:n===H||n===N?n=j:(n=D,s=void 0);const h=n===D&&e[t+1].startsWith("/>")?" ":"";o+=n===j?i+O:c>=0?(r.push(a),i.slice(0,c)+k+i.slice(c)+C+h):i+C+(-2===c?t:h)}return[Y(e,o+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),r]};class J{constructor({strings:e,_$litType$:t},i){let r;this.parts=[];let s=0,o=0;const n=e.length-1,a=this.parts,[l,c]=Z(e,t);if(this.el=J.createElement(l,i),F.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(r=F.nextNode())&&a.length<n;){if(1===r.nodeType){if(r.hasAttributes())for(const e of r.getAttributeNames())if(e.endsWith(k)){const t=c[o++],i=r.getAttribute(e).split(C),n=/([.?@])?(.*)/.exec(t);a.push({type:1,index:s,name:n[2],strings:i,ctor:"."===n[1]?te:"?"===n[1]?ie:"@"===n[1]?re:ee}),r.removeAttribute(e)}else e.startsWith(C)&&(a.push({type:6,index:s}),r.removeAttribute(e));if(B.test(r.tagName)){const e=r.textContent.split(C),t=e.length-1;if(t>0){r.textContent=S?S.emptyScript:"";for(let i=0;i<t;i++)r.append(e[i],R()),F.nextNode(),a.push({type:2,index:++s});r.append(e[t],R())}}}else if(8===r.nodeType)if(r.data===P)a.push({type:2,index:s});else{let e=-1;for(;-1!==(e=r.data.indexOf(C,e+1));)a.push({type:7,index:s}),e+=C.length-1}s++}}static createElement(e,t){const i=U.createElement("template");return i.innerHTML=e,i}}function X(e,t,i=e,r){if(t===W)return t;let s=void 0!==r?i._$Co?.[r]:i._$Cl;const o=z(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),void 0===o?s=void 0:(s=new o(e),s._$AT(e,i,r)),void 0!==r?(i._$Co??=[])[r]=s:i._$Cl=s),void 0!==s&&(t=X(e,s._$AS(e,t.values),s,r)),t}class G{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,r=(e?.creationScope??U).importNode(t,!0);F.currentNode=r;let s=F.nextNode(),o=0,n=0,a=i[0];for(;void 0!==a;){if(o===a.index){let t;2===a.type?t=new Q(s,s.nextSibling,this,e):1===a.type?t=new a.ctor(s,a.name,a.strings,this,e):6===a.type&&(t=new se(s,this,e)),this._$AV.push(t),a=i[++n]}o!==a?.index&&(s=F.nextNode(),o++)}return F.currentNode=U,r}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,r){this.type=2,this._$AH=K,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=X(this,e,t),z(e)?e===K||null==e||""===e?(this._$AH!==K&&this._$AR(),this._$AH=K):e!==this._$AH&&e!==W&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>M(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==K&&z(this._$AH)?this._$AA.nextSibling.data=e:this.T(U.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,r="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=J.createElement(Y(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.p(t);else{const e=new G(r,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=q.get(e.strings);return void 0===t&&q.set(e.strings,t=new J(e)),t}k(e){M(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,r=0;for(const s of e)r===t.length?t.push(i=new Q(this.O(R()),this.O(R()),this,this.options)):i=t[r],i._$AI(s),r++;r<t.length&&(this._$AR(i&&i._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class ee{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,r,s){this.type=1,this._$AH=K,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=K}_$AI(e,t=this,i,r){const s=this.strings;let o=!1;if(void 0===s)e=X(this,e,t,0),o=!z(e)||e!==this._$AH&&e!==W,o&&(this._$AH=e);else{const r=e;let n,a;for(e=s[0],n=0;n<s.length-1;n++)a=X(this,r[i+n],t,n),a===W&&(a=this._$AH[n]),o||=!z(a)||a!==this._$AH[n],a===K?e=K:e!==K&&(e+=(a??"")+s[n+1]),this._$AH[n]=a}o&&!r&&this.j(e)}j(e){e===K?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class te extends ee{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===K?void 0:e}}class ie extends ee{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==K)}}class re extends ee{constructor(e,t,i,r,s){super(e,t,i,r,s),this.type=5}_$AI(e,t=this){if((e=X(this,e,t,0)??K)===W)return;const i=this._$AH,r=e===K&&i!==K||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,s=e!==K&&(i===K||r);r&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class se{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){X(this,e)}}const oe=A.litHtmlPolyfillSupport;oe?.(J,Q),(A.litHtmlVersions??=[]).push("3.3.1");const ne=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class ae extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const r=i?.renderBefore??t;let s=r._$litPart$;if(void 0===s){const e=i?.renderBefore??null;r._$litPart$=s=new Q(t.insertBefore(R(),e),e,void 0,i??{})}return s._$AI(e),s})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}}ae._$litElement$=!0,ae.finalized=!0,ne.litElementHydrateSupport?.({LitElement:ae});const le=ne.litElementPolyfillSupport;le?.({LitElement:ae}),(ne.litElementVersions??=[]).push("4.2.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ce=e=>(t,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},de={attribute:!0,type:String,converter:y,reflect:!1,hasChanged:x},he=(e=de,t,i)=>{const{kind:r,metadata:s}=i;let o=globalThis.litPropertyMetadata.get(s);if(void 0===o&&globalThis.litPropertyMetadata.set(s,o=new Map),"setter"===r&&((e=Object.create(e)).wrapped=!0),o.set(i.name,e),"accessor"===r){const{name:r}=i;return{set(i){const s=t.get.call(this);t.set.call(this,i),this.requestUpdate(r,s,e)},init(t){return void 0!==t&&this.C(r,void 0,e,t),t}}}if("setter"===r){const{name:r}=i;return function(i){const s=this[r];t.call(this,i),this.requestUpdate(r,s,e)}}throw Error("Unsupported decorator location: "+r)};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function pe(e){return(t,i)=>"object"==typeof i?he(e,t,i):((e,t,i)=>{const r=t.hasOwnProperty(i);return t.constructor.createProperty(i,e),r?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ue(e){return pe({...e,state:!0,attribute:!1})}let ge=class extends ae{constructor(){super(...arguments),this.stundenplanData={},this.isLoading=!1,this.error=null,this.modalOpen=!1,this.modalImageSrc="",this.modalTitle="",this.lastUpdated=null,this.refreshInterval=null}setConfig(e){if(!e)throw new Error("Ungültige Konfiguration");if(!e.server)throw new Error("Server-URL ist erforderlich");if(!e.username)throw new Error("Benutzername ist erforderlich");if(!e.password)throw new Error("Passwort ist erforderlich");if("number"!=typeof e.height||e.height<=0)throw new Error("Höhe muss eine positive Zahl sein");this.config=Object.assign(Object.assign({},e),{type:e.type||"custom:ha-stundenplan-card",height:e.height||400,title:e.title||"Stundenplan",refresh_interval:e.refresh_interval||30}),this.startAutoRefresh()}getCardSize(){var e;return Math.ceil(((null===(e=this.config)||void 0===e?void 0:e.height)||400)/50)}static getConfigElement(){return document.createElement("ha-stundenplan-card-editor")}static getStubConfig(){return{type:"custom:ha-stundenplan-card",server:"",username:"",password:"",height:400,title:"Stundenplan",refresh_interval:30}}shouldUpdate(e){return!!this.config&&(e.has("config")&&this.startAutoRefresh(),e.has("hass")&&this.hass&&this.fetchStundenplanData(),!0)}async fetchStundenplanData(){if(this.config){this.isLoading=!0,this.error=null;try{const e=`${this.config.server.replace(/\/+$/,"")}/iserv-timetable/content/rgg-hausach.de/${this.config.username}/${encodeURIComponent(this.config.password)}`;console.log("Fetching stundenplan data from:",e);const t=await fetch(e,{method:"GET",headers:{"Content-Type":"application/json"},mode:"cors"});if(!t.ok)throw new Error(`HTTP ${t.status}: ${t.statusText}`);const i=await t.json();if(!i.success||!i.screenshots)throw new Error("Keine gültigen Stundenplan-Daten erhalten");this.stundenplanData=i.screenshots,this.lastUpdated=new Date}catch(e){let t="Unbekannter Fehler beim Laden der Daten";e instanceof TypeError&&e.message.includes("fetch")?t="Netzwerk-Fehler: Möglicherweise CORS-Problem oder Service nicht erreichbar":e instanceof Error&&(t=e.message),this.error=t,console.error("Fehler beim Laden der Stundenplan-Daten:",e),console.error("API URL war:",`${this.config.server}/iserv-timetable/content/rgg-hausach.de/${this.config.username}/***`)}finally{this.isLoading=!1}}}startAutoRefresh(){if(this.stopAutoRefresh(),this.config.refresh_interval&&this.config.refresh_interval>0){const e=60*this.config.refresh_interval*1e3;this.refreshInterval=window.setInterval(()=>{this.isLoading||this.fetchStundenplanData()},e)}}stopAutoRefresh(){null!==this.refreshInterval&&(clearInterval(this.refreshInterval),this.refreshInterval=null)}handleManualRefresh(){this.fetchStundenplanData()}disconnectedCallback(){super.disconnectedCallback(),this.stopAutoRefresh()}openModal(e,t){this.modalImageSrc=e,this.modalTitle=t,this.modalOpen=!0}closeModal(){this.modalOpen=!1,this.modalImageSrc="",this.modalTitle=""}render(){return this.config&&this.hass?V`
      <ha-card>
        <div class="card-header">
          <div class="header-left">
            <div class="name">${this.config.title}</div>
            <div class="server-info">${this.config.server}</div>
          </div>
          <div class="header-right">
            ${this.renderRefreshButton()}
          </div>
        </div>
        
        <div class="card-content" style="height: ${this.config.height}px;">
          ${this.isLoading?V`
                <div class="loading">
                  <ha-circular-progress active></ha-circular-progress>
                  <div>Lade Stundenplan...</div>
                </div>
              `:this.error?V`
                <div class="error">
                  <ha-icon icon="mdi:alert-circle"></ha-icon>
                  <div>${this.error}</div>
                </div>
              `:V`
                <div class="stundenplan-container">
                  ${this.renderStundenplan()}
                </div>
              `}
        </div>
        
        ${this.modalOpen?V`
          <div class="modal-overlay" @click=${this.closeModal}>
            <div class="modal-content" @click=${e=>e.stopPropagation()}>
              <div class="modal-header">
                <h2>${this.modalTitle}</h2>
                <button class="modal-close" @click=${this.closeModal}>×</button>
              </div>
              <div class="modal-body">
                <img src="${this.modalImageSrc}" alt="${this.modalTitle}" class="modal-image" />
              </div>
            </div>
          </div>
        `:""}
      </ha-card>
    `:V`
        <ha-card>
          <div class="warning">
            Konfiguration fehlt oder ungültig
          </div>
        </ha-card>
      `}renderStundenplan(){return this.stundenplanData&&0!==Object.keys(this.stundenplanData).length?V`
      <div class="icon-container">
        ${Object.entries(this.stundenplanData).map(([e,t])=>V`
          <div class="icon-section" 
               @click=${()=>this.openModal(`data:image/png;base64,${t.data}`,"currentWeek"===e?"Aktuelle Woche":"nextWeek"===e?"Nächste Woche":e)}>
            <div class="icon-wrapper">
              <ha-icon icon="${"currentWeek"===e?"mdi:calendar-today":"mdi:calendar-arrow-right"}"></ha-icon>
            </div>
            <h3 class="icon-title">${"currentWeek"===e?"Aktuelle Woche":"nextWeek"===e?"Nächste Woche":e}</h3>
            <p class="icon-subtitle">Klicken zum Anzeigen</p>
          </div>
        `)}
      </div>
    `:V`
        <div class="no-data">
          <ha-icon icon="mdi:calendar-blank"></ha-icon>
          <div>Keine Stundenplan-Daten verfügbar</div>
        </div>
      `}renderRefreshButton(){const e=this.lastUpdated?`Zuletzt aktualisiert: ${this.lastUpdated.toLocaleTimeString()}`:"Noch nicht geladen",t=this.config.refresh_interval&&this.config.refresh_interval>0?`Auto-Update alle ${this.config.refresh_interval} Min.`:"Kein Auto-Update";return V`
      <div class="refresh-section">
        <button 
          class="refresh-button ${this.isLoading?"loading":""}"
          @click=${this.handleManualRefresh}
          ?disabled=${this.isLoading}
          title="${e} | ${t}"
        >
          <ha-icon icon="${this.isLoading?"mdi:loading":"mdi:refresh"}" 
                   class="${this.isLoading?"rotating":""}"></ha-icon>
        </button>
        <div class="refresh-info">
          <div class="last-update">${e}</div>
          <div class="auto-update">${t}</div>
        </div>
      </div>
    `}static get styles(){return a`
      :host {
        display: block;
        --ha-card-border-radius: var(--ha-card-border-radius, 12px);
      }
      
      ha-card {
        height: 100%;
        display: flex;
        flex-direction: column;
        border-radius: var(--ha-card-border-radius);
        box-shadow: var(--ha-card-box-shadow, var(--shadow-elevation-2dp));
        background: var(--ha-card-background, var(--card-background-color));
        border: var(--ha-card-border-width, 1px) solid var(--ha-card-border-color, var(--divider-color));
      }
      
      .card-header {
        padding: var(--ha-card-header-padding, 16px);
        border-bottom: 1px solid var(--ha-card-border-color, var(--divider-color));
        background: var(--ha-card-header-background, transparent);
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 16px;
      }
      
      .header-left {
        flex: 1;
      }
      
      .header-right {
        flex-shrink: 0;
        border-radius: var(--ha-card-border-radius) var(--ha-card-border-radius) 0 0;
      }
      
      .name {
        font-size: var(--ha-card-header-font-size, 1.2em);
        font-weight: var(--ha-card-header-font-weight, 500);
        color: var(--ha-card-header-color, var(--primary-text-color));
        margin: 0;
        line-height: 1.2;
      }
      
      .server-info {
        font-size: 0.875rem;
        color: var(--secondary-text-color);
        opacity: 0.7;
        margin-top: 4px;
      }
      
      .card-content {
        padding: 16px;
        flex: 1;
        overflow: auto;
      }
      
      .loading,
      .error,
      .no-data {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        text-align: center;
        color: var(--secondary-text-color);
      }
      
      .loading ha-circular-progress {
        margin-bottom: 16px;
      }
      
      .error {
        color: var(--error-color);
      }
      
      .error ha-icon,
      .no-data ha-icon {
        --mdc-icon-size: 48px;
        margin-bottom: 16px;
        opacity: 0.5;
      }
      
      .warning {
        padding: 16px;
        color: var(--warning-color);
        text-align: center;
        font-weight: 500;
      }
      
      .stundenplan-container {
        height: 100%;
        overflow: auto;
      }
      
      .icon-container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
        gap: var(--spacing, 16px);
        padding: 0;
        height: 100%;
        align-content: center;
      }
      
      .icon-section {
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
        padding: var(--spacing, 16px);
        border-radius: var(--border-radius, 8px);
        background: var(--ha-card-background, var(--card-background-color));
        border: 1px solid var(--outline-color, var(--divider-color));
        transition: all var(--transition-duration, 0.2s) var(--transition-easing, ease);
        box-shadow: var(--shadow-elevation-2dp);
        position: relative;
        overflow: hidden;
      }
      
      .icon-section::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: var(--primary-color);
        opacity: 0;
        transition: opacity var(--transition-duration, 0.2s) var(--transition-easing, ease);
      }
      
      .icon-section:hover {
        border-color: var(--primary-color);
        box-shadow: var(--shadow-elevation-4dp);
        transform: translateY(-2px);
      }
      
      .icon-section:hover::before {
        opacity: 0.08;
      }
      
      .icon-section:active {
        transform: translateY(0);
        box-shadow: var(--shadow-elevation-2dp);
      }
      
      .icon-wrapper {
        background: var(--primary-color);
        border-radius: var(--border-radius, 8px);
        width: 56px;
        height: 56px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: var(--spacing, 12px);
        transition: all var(--transition-duration, 0.2s) var(--transition-easing, ease);
        position: relative;
        z-index: 1;
      }
      
      .icon-section:hover .icon-wrapper {
        background: var(--primary-color);
        transform: scale(1.05);
      }
      
      .icon-wrapper ha-icon {
        --mdc-icon-size: 28px;
        color: var(--primary-contrast-color, var(--text-primary-color));
      }
      
      .icon-title {
        font-size: 0.875rem;
        font-weight: var(--font-weight-medium, 500);
        margin: 0 0 4px 0;
        text-align: center;
        color: var(--primary-text-color);
        line-height: 1.2;
        position: relative;
        z-index: 1;
      }
      
      .icon-subtitle {
        font-size: 0.75rem;
        color: var(--secondary-text-color);
        margin: 0;
        text-align: center;
        line-height: 1.2;
        position: relative;
        z-index: 1;
      }
      
      /* Modal Styles - Home Assistant conform */
      .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--overlay-color, rgba(0, 0, 0, 0.6));
        backdrop-filter: blur(4px);
        z-index: var(--z-index-dialog, 1000);
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fade-in 0.2s ease-out;
      }
      
      @keyframes fade-in {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      
      @keyframes slide-up {
        from { 
          opacity: 0;
          transform: translateY(20px) scale(0.95);
        }
        to { 
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }
      
      .modal-content {
        background: var(--ha-card-background, var(--card-background-color));
        border-radius: var(--ha-card-border-radius, 12px);
        max-width: min(95vw, 1200px);
        max-height: 95vh;
        overflow: hidden;
        box-shadow: var(--shadow-elevation-24dp);
        border: var(--ha-card-border-width, 1px) solid var(--ha-card-border-color, var(--outline-color));
        animation: slide-up 0.2s ease-out;
      }
      
      .modal-header {
        padding: var(--spacing, 16px) var(--spacing, 20px);
        border-bottom: 1px solid var(--outline-color, var(--divider-color));
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: var(--ha-card-header-background, transparent);
      }
      
      .modal-header h2 {
        margin: 0;
        font-size: 1.125rem;
        font-weight: var(--font-weight-medium, 500);
        color: var(--primary-text-color);
        line-height: 1.2;
      }
      
      .modal-close {
        background: transparent;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: var(--secondary-text-color);
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: var(--border-radius, 8px);
        transition: all var(--transition-duration, 0.2s) var(--transition-easing, ease);
        line-height: 1;
      }
      
      .modal-close:hover {
        background: var(--state-hover-color, var(--divider-color));
        color: var(--primary-text-color);
      }
      
      .modal-close:active {
        background: var(--state-active-color, var(--outline-color));
      }
      
      .modal-body {
        padding: 0;
        max-height: calc(95vh - 80px);
        overflow: auto;
        scrollbar-width: thin;
        scrollbar-color: var(--scrollbar-thumb-color) transparent;
      }
      
      .modal-body::-webkit-scrollbar {
        width: 8px;
      }
      
      .modal-body::-webkit-scrollbar-track {
        background: transparent;
      }
      
      .modal-body::-webkit-scrollbar-thumb {
        background-color: var(--scrollbar-thumb-color);
        border-radius: 4px;
      }
      
      .modal-image {
        width: 100%;
        height: auto;
        display: block;
        object-fit: contain;
        background: var(--secondary-background-color);
      }
      
      /* Responsive design for mobile */
      @media (max-width: 768px) {
        .icon-container {
          flex-direction: column;
          gap: 16px;
        }
        
        .icon-section {
          min-width: 120px;
          padding: 16px;
        }
        
        .icon-wrapper {
          width: 50px;
          height: 50px;
        }
        
        .icon-wrapper ha-icon {
          --mdc-icon-size: 26px;
        }
        
        .modal-content {
          margin: 10px;
        }
      }

      /* Refresh Button Styles */
      .refresh-section {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .refresh-button {
        background: var(--primary-color);
        color: var(--primary-text-color);
        border: none;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s ease;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }

      .refresh-button:hover:not(:disabled) {
        background: var(--primary-color);
        filter: brightness(1.1);
        transform: scale(1.05);
      }

      .refresh-button:disabled {
        opacity: 0.7;
        cursor: not-allowed;
      }

      .refresh-button ha-icon {
        --mdc-icon-size: 20px;
      }

      .refresh-button .rotating {
        animation: spin 1s linear infinite;
      }

      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }

      .refresh-info {
        display: flex;
        flex-direction: column;
        gap: 2px;
        font-size: 0.75em;
        color: var(--secondary-text-color);
        min-width: 120px;
      }

      .last-update {
        font-weight: 500;
      }

      .auto-update {
        opacity: 0.8;
      }

      @media (max-width: 600px) {
        .refresh-info {
          display: none;
        }
        
        .refresh-section {
          justify-content: center;
        }
      }
    `}};e([pe({attribute:!1}),t("design:type",Object)],ge.prototype,"hass",void 0),e([ue(),t("design:type",Object)],ge.prototype,"config",void 0),e([ue(),t("design:type",Object)],ge.prototype,"stundenplanData",void 0),e([ue(),t("design:type",Object)],ge.prototype,"isLoading",void 0),e([ue(),t("design:type",Object)],ge.prototype,"error",void 0),e([ue(),t("design:type",Object)],ge.prototype,"modalOpen",void 0),e([ue(),t("design:type",Object)],ge.prototype,"modalImageSrc",void 0),e([ue(),t("design:type",Object)],ge.prototype,"modalTitle",void 0),e([ue(),t("design:type",Object)],ge.prototype,"lastUpdated",void 0),ge=e([ce("ha-stundenplan-card")],ge);let fe=class extends ae{setConfig(e){this.config=Object.assign(Object.assign({},e),{type:e.type||"custom:ha-stundenplan-card",server:e.server||"",username:e.username||"",password:e.password||"",height:e.height||400,refresh_interval:e.refresh_interval||30})}render(){return this.hass&&this.config?V`
      <div class="card-config">
        <div class="option">
          <label for="title">Titel der Karte</label>
          <ha-textfield
            id="title"
            .label=${"Titel der Karte"}
            .value=${this.config.title||"Stundenplan"}
            .configValue=${"title"}
            @input=${this.valueChanged}
            placeholder="Stundenplan"
          ></ha-textfield>
          <div class="helper-text">
            Der Titel, der oben in der Karte angezeigt wird
          </div>
        </div>

        <div class="option">
          <label for="server">Server-URL *</label>
          <ha-textfield
            id="server"
            .label=${"Server-URL (z.B. https://stundenplan.example.com)"}
            .value=${this.config.server}
            .configValue=${"server"}
            @input=${this.valueChanged}
            placeholder="https://stundenplan.example.com"
          ></ha-textfield>
          <div class="helper-text">
            Die vollständige URL zu Ihrem Stundenplan-Server
          </div>
        </div>

        <div class="option">
          <label for="username">Benutzername *</label>
          <ha-textfield
            id="username"
            .label=${"Benutzername"}
            .value=${this.config.username}
            .configValue=${"username"}
            @input=${this.valueChanged}
          ></ha-textfield>
          <div class="helper-text">
            Ihr Benutzername für die Anmeldung am Stundenplan-Server
          </div>
        </div>

        <div class="option">
          <label for="password">Passwort *</label>
          <ha-textfield
            id="password"
            type="password"
            .label=${"Passwort"}
            .value=${this.config.password}
            .configValue=${"password"}
            @input=${this.valueChanged}
          ></ha-textfield>
          <div class="helper-text">
            Ihr Passwort für die Anmeldung am Stundenplan-Server
          </div>
        </div>

        <div class="option">
          <label for="height">Höhe (px)</label>
          <ha-textfield
            id="height"
            type="number"
            .label=${"Höhe in Pixel"}
            .value=${this.config.height}
            .configValue=${"height"}
            @input=${this.valueChanged}
            min="100"
            max="1000"
            step="50"
          ></ha-textfield>
          <div class="helper-text">
            Die Höhe der Card in Pixel (Standard: 400px)
          </div>
        </div>

        <div class="option">
          <label for="refresh_interval">Auto-Update Intervall (Minuten)</label>
          <ha-textfield
            id="refresh_interval"
            type="number"
            .label=${"Aktualisierung alle X Minuten"}
            .value=${this.config.refresh_interval}
            .configValue=${"refresh_interval"}
            @input=${this.valueChanged}
            min="0"
            max="1440"
            step="5"
          ></ha-textfield>
          <div class="helper-text">
            Automatische Aktualisierung alle X Minuten (0 = deaktiviert, Standard: 30 Min.)
          </div>
        </div>

        <div class="validation-section">
          ${this.renderValidation()}
        </div>

        <div class="preview-section">
          <div class="preview-header">Vorschau</div>
          <div class="preview-info">
            ${this.renderPreview()}
          </div>
        </div>
      </div>
    `:V``}valueChanged(e){if(!this.config||!this.hass)return;const t=e.target,i=t.configValue;let r=t.value;if(this.config[i]===r)return;const s=Object.assign({},this.config);if("height"===i){const e=parseInt(r,10);!isNaN(e)&&e>=100&&e<=1e3?s[i]=e:s[i]=400}else if("refresh_interval"===i){const e=parseInt(r,10);!isNaN(e)&&e>=0&&e<=1440?s[i]=e:s[i]=30}else r="string"==typeof r?r.trim():r,s[i]=r;this.config=s,this.configChanged()}configChanged(){const e=new CustomEvent("config-changed",{detail:{config:this.config},bubbles:!0,composed:!0});this.dispatchEvent(e)}renderValidation(){const e=[],t=[];return this.config.server?this.config.server.startsWith("http")||e.push("Server-URL muss mit http:// oder https:// beginnen"):e.push("Server-URL ist erforderlich"),this.config.username||e.push("Benutzername ist erforderlich"),this.config.password||e.push("Passwort ist erforderlich"),this.config.height&&(this.config.height<100||this.config.height>1e3)&&t.push("Empfohlene Höhe liegt zwischen 100 und 1000 Pixel"),void 0!==this.config.refresh_interval&&(this.config.refresh_interval<0||this.config.refresh_interval>1440?t.push("Auto-Update Intervall sollte zwischen 0 und 1440 Minuten liegen"):this.config.refresh_interval>0&&this.config.refresh_interval<5&&t.push("Intervalle unter 5 Minuten können die Server-Performance beeinträchtigen")),0===e.length&&0===t.length?V`
        <div class="validation-success">
          <ha-icon icon="mdi:check-circle" style="color: var(--success-color);"></ha-icon>
          <span>Konfiguration ist vollständig</span>
        </div>
      `:V`
      ${e.map(e=>V`
        <div class="validation-error">
          <ha-icon icon="mdi:alert-circle" style="color: var(--error-color);"></ha-icon>
          <span>${e}</span>
        </div>
      `)}
      ${t.map(e=>V`
        <div class="validation-warning">
          <ha-icon icon="mdi:alert" style="color: var(--warning-color);"></ha-icon>
          <span>${e}</span>
        </div>
      `)}
    `}renderPreview(){return this.config.server&&this.config.username?V`
      <div class="preview-config">
        <div class="config-item">
          <strong>Server:</strong> ${this.config.server}
        </div>
        <div class="config-item">
          <strong>Benutzer:</strong> ${this.config.username}
        </div>
        <div class="config-item">
          <strong>Höhe:</strong> ${this.config.height}px
        </div>
        <div class="config-item">
          <strong>Titel:</strong> ${this.config.title||"Stundenplan"}
        </div>
        <div class="config-item">
          <strong>Auto-Update:</strong> ${0===this.config.refresh_interval?"Deaktiviert":`Alle ${this.config.refresh_interval} Min.`}
        </div>
      </div>
      <div class="preview-note">
        💡 Die Card wird nach dem Speichern Stundenplan-Daten vom konfigurierten Server laden.
        ${this.config.refresh_interval&&this.config.refresh_interval>0?`📱 Daten werden automatisch alle ${this.config.refresh_interval} Minuten aktualisiert.`:"⚠️ Auto-Update ist deaktiviert - nur manuelle Aktualisierung möglich."}
      </div>
    `:V`
        <div class="preview-placeholder">
          Konfigurieren Sie Server-URL und Benutzername um eine Vorschau zu sehen.
        </div>
      `}static get styles(){return a`
      .card-config {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .option {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      label {
        font-weight: 500;
        color: var(--primary-text-color);
        margin-bottom: 4px;
      }

      ha-textfield {
        width: 100%;
      }

      .helper-text {
        font-size: 0.875em;
        color: var(--secondary-text-color);
        line-height: 1.4;
      }

      .preview-section {
        margin-top: 16px;
        padding: 16px;
        background: var(--card-background-color);
        border-radius: 8px;
        border: 1px solid var(--divider-color);
      }

      .preview-header {
        font-weight: 500;
        color: var(--primary-text-color);
        margin-bottom: 8px;
        font-size: 1.1em;
      }

      .preview-info {
        color: var(--secondary-text-color);
        line-height: 1.4;
      }

      .preview-info strong {
        color: var(--primary-text-color);
      }

      .validation-section {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .validation-success,
      .validation-error,
      .validation-warning {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 0.9em;
      }

      .validation-success {
        background: var(--success-color, #4caf50);
        background: color-mix(in srgb, var(--success-color, #4caf50) 10%, transparent);
        color: var(--success-color, #4caf50);
      }

      .validation-error {
        background: var(--error-color, #f44336);
        background: color-mix(in srgb, var(--error-color, #f44336) 10%, transparent);
        color: var(--error-color, #f44336);
      }

      .validation-warning {
        background: var(--warning-color, #ff9800);
        background: color-mix(in srgb, var(--warning-color, #ff9800) 10%, transparent);
        color: var(--warning-color, #ff9800);
      }

      .preview-placeholder {
        color: var(--secondary-text-color);
        font-style: italic;
        text-align: center;
        padding: 16px;
      }

      .preview-config {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .config-item {
        display: flex;
        padding: 4px 0;
        border-bottom: 1px solid var(--divider-color);
      }

      .config-item strong {
        min-width: 80px;
        margin-right: 16px;
      }

      .preview-note {
        margin-top: 12px;
        padding: 12px;
        background: var(--info-color, #2196f3);
        background: color-mix(in srgb, var(--info-color, #2196f3) 10%, transparent);
        color: var(--info-color, #2196f3);
        border-radius: 6px;
        font-size: 0.9em;
      }
    `}};e([pe({attribute:!1}),t("design:type",Object)],fe.prototype,"hass",void 0),e([pe({attribute:!1}),t("design:type",Object)],fe.prototype,"lovelace",void 0),e([ue(),t("design:type",Object)],fe.prototype,"config",void 0),fe=e([ce("ha-stundenplan-card-editor")],fe),window.customCards=window.customCards||[],window.customCards.push({type:"ha-stundenplan-card",name:"Stundenplan Card",description:"Eine konfigurierbare Card für Stundenplan-Anzeige",getConfigElement:()=>document.createElement("ha-stundenplan-card-editor"),getStubConfig:()=>({type:"custom:ha-stundenplan-card",server:"",username:"",password:"",height:400,title:"Stundenplan"})}),console.info("%c STUNDENPLAN-CARD %c v1.0.0 ","color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: dimgray");export{ge as StundenplanCard,fe as StundenplanCardEditor};
