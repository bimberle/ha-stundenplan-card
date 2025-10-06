function t(t,e,i,r){var o,s=arguments.length,n=s<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,r);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s<3?o(n):s>3?o(e,i,n):o(e,i))||n);return s>3&&n&&Object.defineProperty(e,i,n),n}function e(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const i=globalThis,r=i.ShadowRoot&&(void 0===i.ShadyCSS||i.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,o=Symbol(),s=new WeakMap;let n=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==o)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(r&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=s.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&s.set(e,t))}return t}toString(){return this.cssText}};const a=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,r)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[r+1],t[0]);return new n(i,t,o)},d=r?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,o))(e)})(t):t,{is:c,defineProperty:l,getOwnPropertyDescriptor:h,getOwnPropertyNames:p,getOwnPropertySymbols:u,getPrototypeOf:g}=Object,v=globalThis,f=v.trustedTypes,m=f?f.emptyScript:"",$=v.reactiveElementPolyfillSupport,b=(t,e)=>t,y={toAttribute(t,e){switch(e){case Boolean:t=t?m:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},_=(t,e)=>!c(t,e),x={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:_};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),v.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=x){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(t,i,e);void 0!==r&&l(this.prototype,t,r)}}static getPropertyDescriptor(t,e,i){const{get:r,set:o}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:r,set(e){const s=r?.call(this);o?.call(this,e),this.requestUpdate(t,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??x}static _$Ei(){if(this.hasOwnProperty(b("elementProperties")))return;const t=g(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(b("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(b("properties"))){const t=this.properties,e=[...p(t),...u(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(d(t))}else void 0!==t&&e.push(d(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,e)=>{if(r)t.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const r of e){const e=document.createElement("style"),o=i.litNonce;void 0!==o&&e.setAttribute("nonce",o),e.textContent=r.cssText,t.appendChild(e)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,i);if(void 0!==r&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:y).toAttribute(e,i.type);this._$Em=t,null==o?this.removeAttribute(r):this.setAttribute(r,o),this._$Em=null}}_$AK(t,e){const i=this.constructor,r=i._$Eh.get(t);if(void 0!==r&&this._$Em!==r){const t=i.getPropertyOptions(r),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:y;this._$Em=r;const s=o.fromAttribute(e,t.type);this[r]=s??this._$Ej?.get(r)??s,this._$Em=null}}requestUpdate(t,e,i){if(void 0!==t){const r=this.constructor,o=this[t];if(i??=r.getPropertyOptions(t),!((i.hasChanged??_)(o,e)||i.useDefault&&i.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:r,wrapped:o},s){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,s??e??this[t]),!0!==o||void 0!==s)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===r&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,r=this[e];!0!==t||this._$AL.has(e)||void 0===r||this.C(e,void 0,i,r)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[b("elementProperties")]=new Map,w[b("finalized")]=new Map,$?.({ReactiveElement:w}),(v.reactiveElementVersions??=[]).push("2.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const A=globalThis,S=A.trustedTypes,E=S?S.createPolicy("lit-html",{createHTML:t=>t}):void 0,C="$lit$",k=`lit$${Math.random().toFixed(9).slice(2)}$`,O="?"+k,P=`<${O}>`,U=document,T=()=>U.createComment(""),j=t=>null===t||"object"!=typeof t&&"function"!=typeof t,z=Array.isArray,R="[ \t\n\f\r]",M=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,H=/-->/g,N=/>/g,D=RegExp(`>|${R}(?:([^\\s"'>=/]+)(${R}*=${R}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),L=/'/g,I=/"/g,B=/^(?:script|style|textarea|title)$/i,W=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),V=Symbol.for("lit-noChange"),K=Symbol.for("lit-nothing"),q=new WeakMap,F=U.createTreeWalker(U,129);function Y(t,e){if(!z(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const Z=(t,e)=>{const i=t.length-1,r=[];let o,s=2===e?"<svg>":3===e?"<math>":"",n=M;for(let e=0;e<i;e++){const i=t[e];let a,d,c=-1,l=0;for(;l<i.length&&(n.lastIndex=l,d=n.exec(i),null!==d);)l=n.lastIndex,n===M?"!--"===d[1]?n=H:void 0!==d[1]?n=N:void 0!==d[2]?(B.test(d[2])&&(o=RegExp("</"+d[2],"g")),n=D):void 0!==d[3]&&(n=D):n===D?">"===d[0]?(n=o??M,c=-1):void 0===d[1]?c=-2:(c=n.lastIndex-d[2].length,a=d[1],n=void 0===d[3]?D:'"'===d[3]?I:L):n===I||n===L?n=D:n===H||n===N?n=M:(n=D,o=void 0);const h=n===D&&t[e+1].startsWith("/>")?" ":"";s+=n===M?i+P:c>=0?(r.push(a),i.slice(0,c)+C+i.slice(c)+k+h):i+k+(-2===c?e:h)}return[Y(t,s+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),r]};class J{constructor({strings:t,_$litType$:e},i){let r;this.parts=[];let o=0,s=0;const n=t.length-1,a=this.parts,[d,c]=Z(t,e);if(this.el=J.createElement(d,i),F.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(r=F.nextNode())&&a.length<n;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(C)){const e=c[s++],i=r.getAttribute(t).split(k),n=/([.?@])?(.*)/.exec(e);a.push({type:1,index:o,name:n[2],strings:i,ctor:"."===n[1]?et:"?"===n[1]?it:"@"===n[1]?rt:tt}),r.removeAttribute(t)}else t.startsWith(k)&&(a.push({type:6,index:o}),r.removeAttribute(t));if(B.test(r.tagName)){const t=r.textContent.split(k),e=t.length-1;if(e>0){r.textContent=S?S.emptyScript:"";for(let i=0;i<e;i++)r.append(t[i],T()),F.nextNode(),a.push({type:2,index:++o});r.append(t[e],T())}}}else if(8===r.nodeType)if(r.data===O)a.push({type:2,index:o});else{let t=-1;for(;-1!==(t=r.data.indexOf(k,t+1));)a.push({type:7,index:o}),t+=k.length-1}o++}}static createElement(t,e){const i=U.createElement("template");return i.innerHTML=t,i}}function G(t,e,i=t,r){if(e===V)return e;let o=void 0!==r?i._$Co?.[r]:i._$Cl;const s=j(e)?void 0:e._$litDirective$;return o?.constructor!==s&&(o?._$AO?.(!1),void 0===s?o=void 0:(o=new s(t),o._$AT(t,i,r)),void 0!==r?(i._$Co??=[])[r]=o:i._$Cl=o),void 0!==o&&(e=G(t,o._$AS(t,e.values),o,r)),e}class Q{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,r=(t?.creationScope??U).importNode(e,!0);F.currentNode=r;let o=F.nextNode(),s=0,n=0,a=i[0];for(;void 0!==a;){if(s===a.index){let e;2===a.type?e=new X(o,o.nextSibling,this,t):1===a.type?e=new a.ctor(o,a.name,a.strings,this,t):6===a.type&&(e=new ot(o,this,t)),this._$AV.push(e),a=i[++n]}s!==a?.index&&(o=F.nextNode(),s++)}return F.currentNode=U,r}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class X{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,r){this.type=2,this._$AH=K,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=G(this,t,e),j(t)?t===K||null==t||""===t?(this._$AH!==K&&this._$AR(),this._$AH=K):t!==this._$AH&&t!==V&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>z(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==K&&j(this._$AH)?this._$AA.nextSibling.data=t:this.T(U.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,r="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=J.createElement(Y(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.p(e);else{const t=new Q(r,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=q.get(t.strings);return void 0===e&&q.set(t.strings,e=new J(t)),e}k(t){z(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,r=0;for(const o of t)r===e.length?e.push(i=new X(this.O(T()),this.O(T()),this,this.options)):i=e[r],i._$AI(o),r++;r<e.length&&(this._$AR(i&&i._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,r,o){this.type=1,this._$AH=K,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=K}_$AI(t,e=this,i,r){const o=this.strings;let s=!1;if(void 0===o)t=G(this,t,e,0),s=!j(t)||t!==this._$AH&&t!==V,s&&(this._$AH=t);else{const r=t;let n,a;for(t=o[0],n=0;n<o.length-1;n++)a=G(this,r[i+n],e,n),a===V&&(a=this._$AH[n]),s||=!j(a)||a!==this._$AH[n],a===K?t=K:t!==K&&(t+=(a??"")+o[n+1]),this._$AH[n]=a}s&&!r&&this.j(t)}j(t){t===K?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===K?void 0:t}}class it extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==K)}}class rt extends tt{constructor(t,e,i,r,o){super(t,e,i,r,o),this.type=5}_$AI(t,e=this){if((t=G(this,t,e,0)??K)===V)return;const i=this._$AH,r=t===K&&i!==K||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==K&&(i===K||r);r&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class ot{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){G(this,t)}}const st=A.litHtmlPolyfillSupport;st?.(J,X),(A.litHtmlVersions??=[]).push("3.3.1");const nt=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class at extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const r=i?.renderBefore??e;let o=r._$litPart$;if(void 0===o){const t=i?.renderBefore??null;r._$litPart$=o=new X(e.insertBefore(T(),t),t,void 0,i??{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return V}}at._$litElement$=!0,at.finalized=!0,nt.litElementHydrateSupport?.({LitElement:at});const dt=nt.litElementPolyfillSupport;dt?.({LitElement:at}),(nt.litElementVersions??=[]).push("4.2.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ct=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},lt={attribute:!0,type:String,converter:y,reflect:!1,hasChanged:_},ht=(t=lt,e,i)=>{const{kind:r,metadata:o}=i;let s=globalThis.litPropertyMetadata.get(o);if(void 0===s&&globalThis.litPropertyMetadata.set(o,s=new Map),"setter"===r&&((t=Object.create(t)).wrapped=!0),s.set(i.name,t),"accessor"===r){const{name:r}=i;return{set(i){const o=e.get.call(this);e.set.call(this,i),this.requestUpdate(r,o,t)},init(e){return void 0!==e&&this.C(r,void 0,t,e),e}}}if("setter"===r){const{name:r}=i;return function(i){const o=this[r];e.call(this,i),this.requestUpdate(r,o,t)}}throw Error("Unsupported decorator location: "+r)};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function pt(t){return(e,i)=>"object"==typeof i?ht(t,e,i):((t,e,i)=>{const r=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),r?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ut(t){return pt({...t,state:!0,attribute:!1})}let gt=class extends at{constructor(){super(...arguments),this.stundenplanData={},this.isLoading=!1,this.error=null,this.modalOpen=!1,this.modalImageSrc="",this.modalTitle=""}setConfig(t){if(!t)throw new Error("Ungültige Konfiguration");if(!t.server)throw new Error("Server-URL ist erforderlich");if(!t.username)throw new Error("Benutzername ist erforderlich");if(!t.password)throw new Error("Passwort ist erforderlich");if("number"!=typeof t.height||t.height<=0)throw new Error("Höhe muss eine positive Zahl sein");this.config=Object.assign(Object.assign({},t),{type:t.type||"custom:ha-stundenplan-card",height:t.height||400,title:t.title||"Stundenplan"})}getCardSize(){var t;return Math.ceil(((null===(t=this.config)||void 0===t?void 0:t.height)||400)/50)}shouldUpdate(t){return!!this.config&&(t.has("hass")&&this.hass&&this.fetchStundenplanData(),!0)}async fetchStundenplanData(){if(this.config){this.isLoading=!0,this.error=null;try{const t=`${this.config.server.replace(/\/+$/,"")}/iserv-timetable/content/rgg-hausach.de/${this.config.username}/${encodeURIComponent(this.config.password)}`;console.log("Fetching stundenplan data from:",t);const e=await fetch(t,{method:"GET",headers:{"Content-Type":"application/json"},mode:"cors"});if(!e.ok)throw new Error(`HTTP ${e.status}: ${e.statusText}`);const i=await e.json();if(!i.success||!i.screenshots)throw new Error("Keine gültigen Stundenplan-Daten erhalten");this.stundenplanData=i.screenshots}catch(t){let e="Unbekannter Fehler beim Laden der Daten";t instanceof TypeError&&t.message.includes("fetch")?e="Netzwerk-Fehler: Möglicherweise CORS-Problem oder Service nicht erreichbar":t instanceof Error&&(e=t.message),this.error=e,console.error("Fehler beim Laden der Stundenplan-Daten:",t),console.error("API URL war:",`${this.config.server}/iserv-timetable/content/rgg-hausach.de/${this.config.username}/***`)}finally{this.isLoading=!1}}}openModal(t,e){this.modalImageSrc=t,this.modalTitle=e,this.modalOpen=!0}closeModal(){this.modalOpen=!1,this.modalImageSrc="",this.modalTitle=""}render(){return this.config&&this.hass?W`
      <ha-card>
        <div class="card-header">
          <div class="name">${this.config.title}</div>
          <div class="server-info">${this.config.server}</div>
        </div>
        
        <div class="card-content" style="height: ${this.config.height}px;">
          ${this.isLoading?W`
                <div class="loading">
                  <ha-circular-progress active></ha-circular-progress>
                  <div>Lade Stundenplan...</div>
                </div>
              `:this.error?W`
                <div class="error">
                  <ha-icon icon="mdi:alert-circle"></ha-icon>
                  <div>${this.error}</div>
                </div>
              `:W`
                <div class="stundenplan-container">
                  ${this.renderStundenplan()}
                </div>
              `}
        </div>
        
        ${this.modalOpen?W`
          <div class="modal-overlay" @click=${this.closeModal}>
            <div class="modal-content" @click=${t=>t.stopPropagation()}>
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
    `:W`
        <ha-card>
          <div class="warning">
            Konfiguration fehlt oder ungültig
          </div>
        </ha-card>
      `}renderStundenplan(){return this.stundenplanData&&0!==Object.keys(this.stundenplanData).length?W`
      <div class="icon-container">
        ${Object.entries(this.stundenplanData).map(([t,e])=>W`
          <div class="icon-section" 
               @click=${()=>this.openModal(`data:image/png;base64,${e.data}`,"currentWeek"===t?"Aktuelle Woche":"nextWeek"===t?"Nächste Woche":t)}>
            <div class="icon-wrapper">
              <ha-icon icon="${"currentWeek"===t?"mdi:calendar-today":"mdi:calendar-arrow-right"}"></ha-icon>
            </div>
            <h3 class="icon-title">${"currentWeek"===t?"Aktuelle Woche":"nextWeek"===t?"Nächste Woche":t}</h3>
            <p class="icon-subtitle">Klicken zum Anzeigen</p>
          </div>
        `)}
      </div>
    `:W`
        <div class="no-data">
          <ha-icon icon="mdi:calendar-blank"></ha-icon>
          <div>Keine Stundenplan-Daten verfügbar</div>
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
    `}};t([pt({attribute:!1}),e("design:type",Object)],gt.prototype,"hass",void 0),t([ut(),e("design:type",Object)],gt.prototype,"config",void 0),t([ut(),e("design:type",Object)],gt.prototype,"stundenplanData",void 0),t([ut(),e("design:type",Object)],gt.prototype,"isLoading",void 0),t([ut(),e("design:type",Object)],gt.prototype,"error",void 0),t([ut(),e("design:type",Object)],gt.prototype,"modalOpen",void 0),t([ut(),e("design:type",Object)],gt.prototype,"modalImageSrc",void 0),t([ut(),e("design:type",Object)],gt.prototype,"modalTitle",void 0),gt=t([ct("ha-stundenplan-card")],gt);let vt=class extends at{setConfig(t){this.config=Object.assign(Object.assign({},t),{type:t.type||"custom:ha-stundenplan-card",server:t.server||"",username:t.username||"",password:t.password||"",height:t.height||400})}render(){return this.hass&&this.config?W`
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

        <div class="preview-section">
          <div class="preview-header">Vorschau</div>
          <div class="preview-info">
            Die Card wird Stundenplan-Daten von <strong>${this.config.server||"Server nicht konfiguriert"}</strong> 
            ${this.config.username?`für Benutzer <strong>${this.config.username}</strong>`:""} laden.
          </div>
        </div>
      </div>
    `:W``}valueChanged(t){if(!this.config||!this.hass)return;const e=t.target,i=e.configValue,r=e.value;if(this.config[i]===r)return;const o=Object.assign({},this.config);if("height"===i){const t=parseInt(r,10);!isNaN(t)&&t>0&&(o[i]=t)}else o[i]=r;this.config=o,this.configChanged()}configChanged(){const t=new CustomEvent("config-changed",{detail:{config:this.config},bubbles:!0,composed:!0});this.dispatchEvent(t)}static get styles(){return a`
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
    `}};if(t([pt({attribute:!1}),e("design:type",Object)],vt.prototype,"hass",void 0),t([pt({attribute:!1}),e("design:type",Object)],vt.prototype,"lovelace",void 0),t([ut(),e("design:type",Object)],vt.prototype,"config",void 0),vt=t([ct("ha-stundenplan-card-editor")],vt),window.customCards){const t=window.customCards.find(t=>"ha-stundenplan-card"===t.type);t&&(t.getConfigElement=()=>new vt)}window.customCards=window.customCards||[],window.customCards.push({type:"ha-stundenplan-card",name:"Stundenplan Card",description:"Eine konfigurierbare Card für Stundenplan-Anzeige"}),console.info("%c STUNDENPLAN-CARD %c v1.0.0 ","color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: dimgray");export{gt as StundenplanCard,vt as StundenplanCardEditor};
