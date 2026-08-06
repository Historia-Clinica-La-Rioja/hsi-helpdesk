import{b as hn,d as un,f as Dt}from"./chunk-SZUTER2R.js";import{a as Pt,b as fn,c as Oe,d as _n,e as gn,f as ci,g as vn,h as bn,i as yn,j as di,k as xn,l as Cn,m as wn,n as kn,o as Sn,q as Mn,r as Tn,s as En}from"./chunk-AICD6TZ5.js";import{c as li,d as It}from"./chunk-7WCBHBC2.js";import{e as ln,f as cn,h as dn,i as pn,m as mn}from"./chunk-7QUOGDLH.js";import{$ as C,$a as ae,B as St,Bb as y,C as Mt,Cb as m,D as Ji,Db as me,E as ti,Eb as te,Fb as $e,Gb as Be,Hb as G,I as Tt,Ib as K,J as be,Jb as ni,K as Fe,Ka as p,L as re,Lb as E,M as de,Mb as pt,Nb as c,Ob as O,P as nt,Pa as Le,Pb as N,Q as I,Qa as at,Qb as Ge,R as W,Ra as pe,Rb as oi,Sa as Ne,Sb as ri,T as F,Tb as ai,Ub as ye,V as h,Va as st,Wa as rn,Y as Te,Yb as he,Za as j,Zb as ue,_ as x,_a as q,a as k,aa as en,b as L,ba as Z,bb as qe,ca as J,cc as H,da as ii,db as an,dc as sn,e as ve,fa as Q,fb as lt,g as De,ga as B,gc as xe,h as D,i as Gi,ib as ct,ic as V,ja as w,jb as ne,jc as si,kb as v,kc as Ot,l as we,lb as b,ma as Se,mb as dt,na as ot,nb as se,oa as Ae,ob as le,p as Pe,pa as Y,pb as T,q as Ki,qa as rt,qb as s,rb as l,s as Qi,sa as tn,sb as U,t as Xi,tb as Ve,ua as nn,ub as ze,v as Zi,va as Et,w as Re,wa as on,x as ke,xb as R,y as ei,yb as Ee}from"./chunk-T7RR2QBB.js";function mt(n){return n.buttons===0||n.detail===0}function ht(n){let o=n.touches&&n.touches[0]||n.changedTouches&&n.changedTouches[0];return!!o&&o.identifier===-1&&(o.radiusX==null||o.radiusX===1)&&(o.radiusY==null||o.radiusY===1)}var pi;function On(){if(pi==null){let n=typeof document<"u"?document.head:null;pi=!!(n&&(n.createShadowRoot||n.attachShadow))}return pi}function mi(n){if(On()){let o=n.getRootNode?n.getRootNode():null;if(typeof ShadowRoot<"u"&&ShadowRoot&&o instanceof ShadowRoot)return o}return null}function hi(){let n=typeof document<"u"&&document?document.activeElement:null;for(;n&&n.shadowRoot;){let o=n.shadowRoot.activeElement;if(o===n)break;n=o}return n}function ie(n){return n.composedPath?n.composedPath()[0]:n.target}var ui;try{ui=typeof Intl<"u"&&Intl.v8BreakIterator}catch(n){ui=!1}var X=(()=>{class n{_platformId=h(nn);isBrowser=this._platformId?mn(this._platformId):typeof document=="object"&&!!document;EDGE=this.isBrowser&&/(edge)/i.test(navigator.userAgent);TRIDENT=this.isBrowser&&/(msie|trident)/i.test(navigator.userAgent);BLINK=this.isBrowser&&!!(window.chrome||ui)&&typeof CSS<"u"&&!this.EDGE&&!this.TRIDENT;WEBKIT=this.isBrowser&&/AppleWebKit/i.test(navigator.userAgent)&&!this.BLINK&&!this.EDGE&&!this.TRIDENT;IOS=this.isBrowser&&/iPad|iPhone|iPod/.test(navigator.userAgent)&&!("MSStream"in window);FIREFOX=this.isBrowser&&/(firefox|minefield)/i.test(navigator.userAgent);ANDROID=this.isBrowser&&/android/i.test(navigator.userAgent)&&!this.TRIDENT;SAFARI=this.isBrowser&&/safari/i.test(navigator.userAgent)&&this.WEBKIT;constructor(){}static \u0275fac=function(t){return new(t||n)};static \u0275prov=I({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var ut;function In(){if(ut==null&&typeof window<"u")try{window.addEventListener("test",null,Object.defineProperty({},"passive",{get:()=>ut=!0}))}finally{ut=ut||!1}return ut}function Ke(n){return In()?n:!!n.capture}function Ce(n){return n instanceof Y?n.nativeElement:n}var Dn=new F("cdk-input-modality-detector-options"),Pn={ignoreKeys:[18,17,224,91,16]},Rn=650,fi={passive:!0,capture:!0},Fn=(()=>{class n{_platform=h(X);_listenerCleanups;modalityDetected;modalityChanged;get mostRecentModality(){return this._modality.value}_mostRecentTarget=null;_modality=new Gi(null);_options;_lastTouchMs=0;_onKeydown=e=>{this._options?.ignoreKeys?.some(t=>t===e.keyCode)||(this._modality.next("keyboard"),this._mostRecentTarget=ie(e))};_onMousedown=e=>{Date.now()-this._lastTouchMs<Rn||(this._modality.next(mt(e)?"keyboard":"mouse"),this._mostRecentTarget=ie(e))};_onTouchstart=e=>{if(ht(e)){this._modality.next("keyboard");return}this._lastTouchMs=Date.now(),this._modality.next("touch"),this._mostRecentTarget=ie(e)};constructor(){let e=h(B),t=h(J),i=h(Dn,{optional:!0});if(this._options=k(k({},Pn),i),this.modalityDetected=this._modality.pipe(Tt(1)),this.modalityChanged=this.modalityDetected.pipe(ti()),this._platform.isBrowser){let r=h(pe).createRenderer(null,null);this._listenerCleanups=e.runOutsideAngular(()=>[r.listen(t,"keydown",this._onKeydown,fi),r.listen(t,"mousedown",this._onMousedown,fi),r.listen(t,"touchstart",this._onTouchstart,fi)])}}ngOnDestroy(){this._modality.complete(),this._listenerCleanups?.forEach(e=>e())}static \u0275fac=function(t){return new(t||n)};static \u0275prov=I({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),ft=(function(n){return n[n.IMMEDIATE=0]="IMMEDIATE",n[n.EVENTUAL=1]="EVENTUAL",n})(ft||{}),An=new F("cdk-focus-monitor-default-options"),Rt=Ke({passive:!0,capture:!0}),_i=(()=>{class n{_ngZone=h(B);_platform=h(X);_inputModalityDetector=h(Fn);_origin=null;_lastFocusOrigin=null;_windowFocused=!1;_windowFocusTimeoutId;_originTimeoutId;_originFromTouchInteraction=!1;_elementInfo=new Map;_monitoredElementCount=0;_rootNodeFocusListenerCount=new Map;_detectionMode;_windowFocusListener=()=>{this._windowFocused=!0,this._windowFocusTimeoutId=setTimeout(()=>this._windowFocused=!1)};_document=h(J);_stopInputModalityDetector=new D;constructor(){let e=h(An,{optional:!0});this._detectionMode=e?.detectionMode||ft.IMMEDIATE}_rootNodeFocusAndBlurListener=e=>{let t=ie(e);for(let i=t;i;i=i.parentElement)e.type==="focus"?this._onFocus(e,i):this._onBlur(e,i)};monitor(e,t=!1){let i=Ce(e);if(!this._platform.isBrowser||i.nodeType!==1)return we();let r=mi(i)||this._document,a=this._elementInfo.get(i);if(a)return t&&(a.checkChildren=!0),a.subject;let d={checkChildren:t,subject:new D,rootNode:r};return this._elementInfo.set(i,d),this._registerGlobalListeners(d),d.subject}stopMonitoring(e){let t=Ce(e),i=this._elementInfo.get(t);i&&(i.subject.complete(),this._setClasses(t),this._elementInfo.delete(t),this._removeGlobalListeners(i))}focusVia(e,t,i){let r=Ce(e),a=this._document.activeElement;r===a?this._getClosestElementsInfo(r).forEach(([d,u])=>this._originChanged(d,t,u)):(this._setOrigin(t),typeof r.focus=="function"&&r.focus(i))}ngOnDestroy(){this._elementInfo.forEach((e,t)=>this.stopMonitoring(t))}_getWindow(){return this._document.defaultView||window}_getFocusOrigin(e){return this._origin?this._originFromTouchInteraction?this._shouldBeAttributedToTouch(e)?"touch":"program":this._origin:this._windowFocused&&this._lastFocusOrigin?this._lastFocusOrigin:e&&this._isLastInteractionFromInputLabel(e)?"mouse":"program"}_shouldBeAttributedToTouch(e){return this._detectionMode===ft.EVENTUAL||!!e?.contains(this._inputModalityDetector._mostRecentTarget)}_setClasses(e,t){e.classList.toggle("cdk-focused",!!t),e.classList.toggle("cdk-touch-focused",t==="touch"),e.classList.toggle("cdk-keyboard-focused",t==="keyboard"),e.classList.toggle("cdk-mouse-focused",t==="mouse"),e.classList.toggle("cdk-program-focused",t==="program")}_setOrigin(e,t=!1){this._ngZone.runOutsideAngular(()=>{if(this._origin=e,this._originFromTouchInteraction=e==="touch"&&t,this._detectionMode===ft.IMMEDIATE){clearTimeout(this._originTimeoutId);let i=this._originFromTouchInteraction?Rn:1;this._originTimeoutId=setTimeout(()=>this._origin=null,i)}})}_onFocus(e,t){let i=this._elementInfo.get(t),r=ie(e);!i||!i.checkChildren&&t!==r||this._originChanged(t,this._getFocusOrigin(r),i)}_onBlur(e,t){let i=this._elementInfo.get(t);!i||i.checkChildren&&e.relatedTarget instanceof Node&&t.contains(e.relatedTarget)||(this._setClasses(t),this._emitOrigin(i,null))}_emitOrigin(e,t){e.subject.observers.length&&this._ngZone.run(()=>e.subject.next(t))}_registerGlobalListeners(e){if(!this._platform.isBrowser)return;let t=e.rootNode,i=this._rootNodeFocusListenerCount.get(t)||0;i||this._ngZone.runOutsideAngular(()=>{t.addEventListener("focus",this._rootNodeFocusAndBlurListener,Rt),t.addEventListener("blur",this._rootNodeFocusAndBlurListener,Rt)}),this._rootNodeFocusListenerCount.set(t,i+1),++this._monitoredElementCount===1&&(this._ngZone.runOutsideAngular(()=>{this._getWindow().addEventListener("focus",this._windowFocusListener)}),this._inputModalityDetector.modalityDetected.pipe(re(this._stopInputModalityDetector)).subscribe(r=>{this._setOrigin(r,!0)}))}_removeGlobalListeners(e){let t=e.rootNode;if(this._rootNodeFocusListenerCount.has(t)){let i=this._rootNodeFocusListenerCount.get(t);i>1?this._rootNodeFocusListenerCount.set(t,i-1):(t.removeEventListener("focus",this._rootNodeFocusAndBlurListener,Rt),t.removeEventListener("blur",this._rootNodeFocusAndBlurListener,Rt),this._rootNodeFocusListenerCount.delete(t))}--this._monitoredElementCount||(this._getWindow().removeEventListener("focus",this._windowFocusListener),this._stopInputModalityDetector.next(),clearTimeout(this._windowFocusTimeoutId),clearTimeout(this._originTimeoutId))}_originChanged(e,t,i){this._setClasses(e,t),this._emitOrigin(i,t),this._lastFocusOrigin=t}_getClosestElementsInfo(e){let t=[];return this._elementInfo.forEach((i,r)=>{(r===e||i.checkChildren&&r.contains(e))&&t.push([r,i])}),t}_isLastInteractionFromInputLabel(e){let{_mostRecentTarget:t,mostRecentModality:i}=this._inputModalityDetector;if(i!=="mouse"||!t||t===e||e.nodeName!=="INPUT"&&e.nodeName!=="TEXTAREA"||e.disabled)return!1;let r=e.labels;if(r){for(let a=0;a<r.length;a++)if(r[a].contains(t))return!0}return!1}static \u0275fac=function(t){return new(t||n)};static \u0275prov=I({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var Ft=new WeakMap,fe=(()=>{class n{_appRef;_injector=h(Z);_environmentInjector=h(Te);load(e){let t=this._appRef=this._appRef||this._injector.get(ct),i=Ft.get(t);i||(i={loaders:new Set,refs:[]},Ft.set(t,i),t.onDestroy(()=>{Ft.get(t)?.refs.forEach(r=>r.destroy()),Ft.delete(t)})),i.loaders.has(e)||(i.loaders.add(e),i.refs.push(Ot(e,{environmentInjector:this._environmentInjector})))}static \u0275fac=function(t){return new(t||n)};static \u0275prov=I({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var At=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275cmp=j({type:n,selectors:[["ng-component"]],exportAs:["cdkVisuallyHidden"],decls:0,vars:0,template:function(t,i){},styles:[`.cdk-visually-hidden {
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
  white-space: nowrap;
  outline: 0;
  -webkit-appearance: none;
  -moz-appearance: none;
  left: 0;
}
[dir=rtl] .cdk-visually-hidden {
  left: auto;
  right: 0;
}
`],encapsulation:2,changeDetection:0})}return n})();function Me(n){return Array.isArray(n)?n:[n]}var Ln=new Set,je,Lt=(()=>{class n{_platform=h(X);_nonce=h(on,{optional:!0});_matchMedia;constructor(){this._matchMedia=this._platform.isBrowser&&window.matchMedia?window.matchMedia.bind(window):Uo}matchMedia(e){return(this._platform.WEBKIT||this._platform.BLINK)&&Ho(e,this._nonce),this._matchMedia(e)}static \u0275fac=function(t){return new(t||n)};static \u0275prov=I({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();function Ho(n,o){if(!Ln.has(n))try{je||(je=document.createElement("style"),o&&je.setAttribute("nonce",o),je.setAttribute("type","text/css"),document.head.appendChild(je)),je.sheet&&(je.sheet.insertRule(`@media ${n} {body{ }}`,0),Ln.add(n))}catch(e){console.error(e)}}function Uo(n){return{matches:n==="all"||n==="",media:n,addListener:()=>{},removeListener:()=>{}}}var gi=(()=>{class n{_mediaMatcher=h(Lt);_zone=h(B);_queries=new Map;_destroySubject=new D;constructor(){}ngOnDestroy(){this._destroySubject.next(),this._destroySubject.complete()}isMatched(e){return Nn(Me(e)).some(i=>this._registerQuery(i).mql.matches)}observe(e){let i=Nn(Me(e)).map(a=>this._registerQuery(a).observable),r=Ki(i);return r=Qi(r.pipe(Mt(1)),r.pipe(Tt(1),St(0))),r.pipe(Pe(a=>{let d={matches:!1,breakpoints:{}};return a.forEach(({matches:u,query:g})=>{d.matches=d.matches||u,d.breakpoints[g]=u}),d}))}_registerQuery(e){if(this._queries.has(e))return this._queries.get(e);let t=this._mediaMatcher.matchMedia(e),r={observable:new De(a=>{let d=u=>this._zone.run(()=>a.next(u));return t.addListener(d),()=>{t.removeListener(d)}}).pipe(be(t),Pe(({matches:a})=>({query:e,matches:a})),re(this._destroySubject)),mql:t};return this._queries.set(e,r),r}static \u0275fac=function(t){return new(t||n)};static \u0275prov=I({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();function Nn(n){return n.map(o=>o.split(",")).reduce((o,e)=>o.concat(e)).map(o=>o.trim())}var Wo=200,Nt=class{_letterKeyStream=new D;_items=[];_selectedItemIndex=-1;_pressedLetters=[];_skipPredicateFn;_selectedItem=new D;selectedItem=this._selectedItem;constructor(o,e){let t=typeof e?.debounceInterval=="number"?e.debounceInterval:Wo;e?.skipPredicate&&(this._skipPredicateFn=e.skipPredicate),this.setItems(o),this._setupKeyHandler(t)}destroy(){this._pressedLetters=[],this._letterKeyStream.complete(),this._selectedItem.complete()}setCurrentSelectedItemIndex(o){this._selectedItemIndex=o}setItems(o){this._items=o}handleKey(o){let e=o.keyCode;o.key&&o.key.length===1?this._letterKeyStream.next(o.key.toLocaleUpperCase()):(e>=65&&e<=90||e>=48&&e<=57)&&this._letterKeyStream.next(String.fromCharCode(e))}isTyping(){return this._pressedLetters.length>0}reset(){this._pressedLetters=[]}_setupKeyHandler(o){this._letterKeyStream.pipe(de(e=>this._pressedLetters.push(e)),St(o),ke(()=>this._pressedLetters.length>0),Pe(()=>this._pressedLetters.join("").toLocaleUpperCase())).subscribe(e=>{for(let t=1;t<this._items.length+1;t++){let i=(this._selectedItemIndex+t)%this._items.length,r=this._items[i];if(!this._skipPredicateFn?.(r)&&r.getLabel?.().toLocaleUpperCase().trim().indexOf(e)===0){this._selectedItem.next(r);break}}this._pressedLetters=[]})}};function Ie(n,...o){return o.length?o.some(e=>n[e]):n.altKey||n.shiftKey||n.ctrlKey||n.metaKey}var Qe=class{_items;_activeItemIndex=w(-1);_activeItem=w(null);_wrap=!1;_typeaheadSubscription=ve.EMPTY;_itemChangesSubscription;_vertical=!0;_horizontal=null;_allowedModifierKeys=[];_homeAndEnd=!1;_pageUpAndDown={enabled:!1,delta:10};_effectRef;_typeahead;_skipPredicateFn=o=>o.disabled;constructor(o,e){this._items=o,o instanceof rt?this._itemChangesSubscription=o.changes.subscribe(t=>this._itemsChanged(t.toArray())):lt(o)&&(this._effectRef=Se(()=>this._itemsChanged(o()),{injector:e}))}tabOut=new D;change=new D;skipPredicate(o){return this._skipPredicateFn=o,this}withWrap(o=!0){return this._wrap=o,this}withVerticalOrientation(o=!0){return this._vertical=o,this}withHorizontalOrientation(o){return this._horizontal=o,this}withAllowedModifierKeys(o){return this._allowedModifierKeys=o,this}withTypeAhead(o=200){this._typeaheadSubscription.unsubscribe();let e=this._getItemsArray();return this._typeahead=new Nt(e,{debounceInterval:typeof o=="number"?o:void 0,skipPredicate:t=>this._skipPredicateFn(t)}),this._typeaheadSubscription=this._typeahead.selectedItem.subscribe(t=>{this.setActiveItem(t)}),this}cancelTypeahead(){return this._typeahead?.reset(),this}withHomeAndEnd(o=!0){return this._homeAndEnd=o,this}withPageUpDown(o=!0,e=10){return this._pageUpAndDown={enabled:o,delta:e},this}setActiveItem(o){let e=this._activeItem();this.updateActiveItem(o),this._activeItem()!==e&&this.change.next(this._activeItemIndex())}onKeydown(o){let e=o.keyCode,i=["altKey","ctrlKey","metaKey","shiftKey"].every(r=>!o[r]||this._allowedModifierKeys.indexOf(r)>-1);switch(e){case 9:this.tabOut.next();return;case 40:if(this._vertical&&i){this.setNextItemActive();break}else return;case 38:if(this._vertical&&i){this.setPreviousItemActive();break}else return;case 39:if(this._horizontal&&i){this._horizontal==="rtl"?this.setPreviousItemActive():this.setNextItemActive();break}else return;case 37:if(this._horizontal&&i){this._horizontal==="rtl"?this.setNextItemActive():this.setPreviousItemActive();break}else return;case 36:if(this._homeAndEnd&&i){this.setFirstItemActive();break}else return;case 35:if(this._homeAndEnd&&i){this.setLastItemActive();break}else return;case 33:if(this._pageUpAndDown.enabled&&i){let r=this._activeItemIndex()-this._pageUpAndDown.delta;this._setActiveItemByIndex(r>0?r:0,1);break}else return;case 34:if(this._pageUpAndDown.enabled&&i){let r=this._activeItemIndex()+this._pageUpAndDown.delta,a=this._getItemsArray().length;this._setActiveItemByIndex(r<a?r:a-1,-1);break}else return;default:(i||Ie(o,"shiftKey"))&&this._typeahead?.handleKey(o);return}this._typeahead?.reset(),o.preventDefault()}get activeItemIndex(){return this._activeItemIndex()}get activeItem(){return this._activeItem()}isTyping(){return!!this._typeahead&&this._typeahead.isTyping()}setFirstItemActive(){this._setActiveItemByIndex(0,1)}setLastItemActive(){this._setActiveItemByIndex(this._getItemsArray().length-1,-1)}setNextItemActive(){this._activeItemIndex()<0?this.setFirstItemActive():this._setActiveItemByDelta(1)}setPreviousItemActive(){this._activeItemIndex()<0&&this._wrap?this.setLastItemActive():this._setActiveItemByDelta(-1)}updateActiveItem(o){let e=this._getItemsArray(),t=typeof o=="number"?o:e.indexOf(o),i=e[t];this._activeItem.set(i??null),this._activeItemIndex.set(t),this._typeahead?.setCurrentSelectedItemIndex(t)}destroy(){this._typeaheadSubscription.unsubscribe(),this._itemChangesSubscription?.unsubscribe(),this._effectRef?.destroy(),this._typeahead?.destroy(),this.tabOut.complete(),this.change.complete()}_setActiveItemByDelta(o){this._wrap?this._setActiveInWrapMode(o):this._setActiveInDefaultMode(o)}_setActiveInWrapMode(o){let e=this._getItemsArray();for(let t=1;t<=e.length;t++){let i=(this._activeItemIndex()+o*t+e.length)%e.length,r=e[i];if(!this._skipPredicateFn(r)){this.setActiveItem(i);return}}}_setActiveInDefaultMode(o){this._setActiveItemByIndex(this._activeItemIndex()+o,o)}_setActiveItemByIndex(o,e){let t=this._getItemsArray();if(t[o]){for(;this._skipPredicateFn(t[o]);)if(o+=e,!t[o])return;this.setActiveItem(o)}}_getItemsArray(){return lt(this._items)?this._items():this._items instanceof rt?this._items.toArray():this._items}_itemsChanged(o){this._typeahead?.setItems(o);let e=this._activeItem();if(e){let t=o.indexOf(e);t>-1&&t!==this._activeItemIndex()&&(this._activeItemIndex.set(t),this._typeahead?.setCurrentSelectedItemIndex(t))}}};var _t=class extends Qe{setActiveItem(o){this.activeItem&&this.activeItem.setInactiveStyles(),super.setActiveItem(o),this.activeItem&&this.activeItem.setActiveStyles()}};var gt=class extends Qe{_origin="program";setFocusOrigin(o){return this._origin=o,this}setActiveItem(o){super.setActiveItem(o),this.activeItem&&this.activeItem.focus(this._origin)}};var yi={},_e=class n{_appId=h(tn);static _infix=`a${Math.floor(Math.random()*1e5).toString()}`;getId(o,e=!1){return this._appId!=="ng"&&(o+=this._appId),yi.hasOwnProperty(o)||(yi[o]=0),`${o}${e?n._infix+"-":""}${yi[o]++}`}static \u0275fac=function(e){return new(e||n)};static \u0275prov=I({token:n,factory:n.\u0275fac,providedIn:"root"})};var zn=" ";function xi(n,o,e){let t=Bn(n,o);e=e.trim(),!t.some(i=>i.trim()===e)&&(t.push(e),n.setAttribute(o,t.join(zn)))}function Vt(n,o,e){let t=Bn(n,o);e=e.trim();let i=t.filter(r=>r!==e);i.length?n.setAttribute(o,i.join(zn)):n.removeAttribute(o)}function Bn(n,o){return n.getAttribute(o)?.match(/\S+/g)??[]}var He;function jn(){if(He==null){if(typeof document!="object"||!document||typeof Element!="function"||!Element)return He=!1,He;if(document.documentElement?.style&&"scrollBehavior"in document.documentElement.style)He=!0;else{let n=Element.prototype.scrollTo;n?He=!/\{\s*\[native code\]\s*\}/.test(n.toString()):He=!1}}return He}function Ci(){return typeof __karma__<"u"&&!!__karma__||typeof jasmine<"u"&&!!jasmine||typeof jest<"u"&&!!jest||typeof Mocha<"u"&&!!Mocha}var Hn={XSmall:"(max-width: 599.98px)",Small:"(min-width: 600px) and (max-width: 959.98px)",Medium:"(min-width: 960px) and (max-width: 1279.98px)",Large:"(min-width: 1280px) and (max-width: 1919.98px)",XLarge:"(min-width: 1920px)",Handset:"(max-width: 599.98px) and (orientation: portrait), (max-width: 959.98px) and (orientation: landscape)",Tablet:"(min-width: 600px) and (max-width: 839.98px) and (orientation: portrait), (min-width: 960px) and (max-width: 1279.98px) and (orientation: landscape)",Web:"(min-width: 840px) and (orientation: portrait), (min-width: 1280px) and (orientation: landscape)",HandsetPortrait:"(max-width: 599.98px) and (orientation: portrait)",TabletPortrait:"(min-width: 600px) and (max-width: 839.98px) and (orientation: portrait)",WebPortrait:"(min-width: 840px) and (orientation: portrait)",HandsetLandscape:"(max-width: 959.98px) and (orientation: landscape)",TabletLandscape:"(min-width: 960px) and (max-width: 1279.98px) and (orientation: landscape)",WebLandscape:"(min-width: 1280px) and (orientation: landscape)"};var Yo=new F("MATERIAL_ANIMATIONS"),Un=null;function qo(){return h(Yo,{optional:!0})?.animationsDisabled||h(Et,{optional:!0})==="NoopAnimations"?"di-disabled":(Un??=h(Lt).matchMedia("(prefers-reduced-motion)").matches,Un?"reduced-motion":"enabled")}function ge(){return qo()!=="enabled"}function $(n){return n==null?"":typeof n=="string"?n:`${n}px`}var ce=(function(n){return n[n.FADING_IN=0]="FADING_IN",n[n.VISIBLE=1]="VISIBLE",n[n.FADING_OUT=2]="FADING_OUT",n[n.HIDDEN=3]="HIDDEN",n})(ce||{}),wi=class{_renderer;element;config;_animationForciblyDisabledThroughCss;state=ce.HIDDEN;constructor(o,e,t,i=!1){this._renderer=o,this.element=e,this.config=t,this._animationForciblyDisabledThroughCss=i}fadeOut(){this._renderer.fadeOutRipple(this)}},Wn=Ke({passive:!0,capture:!0}),ki=class{_events=new Map;addHandler(o,e,t,i){let r=this._events.get(e);if(r){let a=r.get(t);a?a.add(i):r.set(t,new Set([i]))}else this._events.set(e,new Map([[t,new Set([i])]])),o.runOutsideAngular(()=>{document.addEventListener(e,this._delegateEventHandler,Wn)})}removeHandler(o,e,t){let i=this._events.get(o);if(!i)return;let r=i.get(e);r&&(r.delete(t),r.size===0&&i.delete(e),i.size===0&&(this._events.delete(o),document.removeEventListener(o,this._delegateEventHandler,Wn)))}_delegateEventHandler=o=>{let e=ie(o);e&&this._events.get(o.type)?.forEach((t,i)=>{(i===e||i.contains(e))&&t.forEach(r=>r.handleEvent(o))})}},vt={enterDuration:225,exitDuration:150},Go=800,Yn=Ke({passive:!0,capture:!0}),qn=["mousedown","touchstart"],$n=["mouseup","mouseleave","touchend","touchcancel"],Ko=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275cmp=j({type:n,selectors:[["ng-component"]],hostAttrs:["mat-ripple-style-loader",""],decls:0,vars:0,template:function(t,i){},styles:[`.mat-ripple {
  overflow: hidden;
  position: relative;
}
.mat-ripple:not(:empty) {
  transform: translateZ(0);
}

.mat-ripple.mat-ripple-unbounded {
  overflow: visible;
}

.mat-ripple-element {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  transition: opacity, transform 0ms cubic-bezier(0, 0, 0.2, 1);
  transform: scale3d(0, 0, 0);
  background-color: var(--mat-ripple-color, color-mix(in srgb, var(--mat-sys-on-surface) 10%, transparent));
}
@media (forced-colors: active) {
  .mat-ripple-element {
    display: none;
  }
}
.cdk-drag-preview .mat-ripple-element, .cdk-drag-placeholder .mat-ripple-element {
  display: none;
}
`],encapsulation:2,changeDetection:0})}return n})(),bt=class n{_target;_ngZone;_platform;_containerElement;_triggerElement=null;_isPointerDown=!1;_activeRipples=new Map;_mostRecentTransientRipple=null;_lastTouchStartEvent;_pointerUpEventsRegistered=!1;_containerRect=null;static _eventManager=new ki;constructor(o,e,t,i,r){this._target=o,this._ngZone=e,this._platform=i,i.isBrowser&&(this._containerElement=Ce(t)),r&&r.get(fe).load(Ko)}fadeInRipple(o,e,t={}){let i=this._containerRect=this._containerRect||this._containerElement.getBoundingClientRect(),r=k(k({},vt),t.animation);t.centered&&(o=i.left+i.width/2,e=i.top+i.height/2);let a=t.radius||Qo(o,e,i),d=o-i.left,u=e-i.top,g=r.enterDuration,f=document.createElement("div");f.classList.add("mat-ripple-element"),f.style.left=`${d-a}px`,f.style.top=`${u-a}px`,f.style.height=`${a*2}px`,f.style.width=`${a*2}px`,t.color!=null&&(f.style.backgroundColor=t.color),f.style.transitionDuration=`${g}ms`,this._containerElement.appendChild(f);let _=window.getComputedStyle(f),S=_.transitionProperty,M=_.transitionDuration,A=S==="none"||M==="0s"||M==="0s, 0s"||i.width===0&&i.height===0,P=new wi(this,f,t,A);f.style.transform="scale3d(1, 1, 1)",P.state=ce.FADING_IN,t.persistent||(this._mostRecentTransientRipple=P);let oe=null;return!A&&(g||r.exitDuration)&&this._ngZone.runOutsideAngular(()=>{let it=()=>{oe&&(oe.fallbackTimer=null),clearTimeout($i),this._finishRippleTransition(P)},Jt=()=>this._destroyRipple(P),$i=setTimeout(Jt,g+100);f.addEventListener("transitionend",it),f.addEventListener("transitioncancel",Jt),oe={onTransitionEnd:it,onTransitionCancel:Jt,fallbackTimer:$i}}),this._activeRipples.set(P,oe),(A||!g)&&this._finishRippleTransition(P),P}fadeOutRipple(o){if(o.state===ce.FADING_OUT||o.state===ce.HIDDEN)return;let e=o.element,t=k(k({},vt),o.config.animation);e.style.transitionDuration=`${t.exitDuration}ms`,e.style.opacity="0",o.state=ce.FADING_OUT,(o._animationForciblyDisabledThroughCss||!t.exitDuration)&&this._finishRippleTransition(o)}fadeOutAll(){this._getActiveRipples().forEach(o=>o.fadeOut())}fadeOutAllNonPersistent(){this._getActiveRipples().forEach(o=>{o.config.persistent||o.fadeOut()})}setupTriggerEvents(o){let e=Ce(o);!this._platform.isBrowser||!e||e===this._triggerElement||(this._removeTriggerEvents(),this._triggerElement=e,qn.forEach(t=>{n._eventManager.addHandler(this._ngZone,t,e,this)}))}handleEvent(o){o.type==="mousedown"?this._onMousedown(o):o.type==="touchstart"?this._onTouchStart(o):this._onPointerUp(),this._pointerUpEventsRegistered||(this._ngZone.runOutsideAngular(()=>{$n.forEach(e=>{this._triggerElement.addEventListener(e,this,Yn)})}),this._pointerUpEventsRegistered=!0)}_finishRippleTransition(o){o.state===ce.FADING_IN?this._startFadeOutTransition(o):o.state===ce.FADING_OUT&&this._destroyRipple(o)}_startFadeOutTransition(o){let e=o===this._mostRecentTransientRipple,{persistent:t}=o.config;o.state=ce.VISIBLE,!t&&(!e||!this._isPointerDown)&&o.fadeOut()}_destroyRipple(o){let e=this._activeRipples.get(o)??null;this._activeRipples.delete(o),this._activeRipples.size||(this._containerRect=null),o===this._mostRecentTransientRipple&&(this._mostRecentTransientRipple=null),o.state=ce.HIDDEN,e!==null&&(o.element.removeEventListener("transitionend",e.onTransitionEnd),o.element.removeEventListener("transitioncancel",e.onTransitionCancel),e.fallbackTimer!==null&&clearTimeout(e.fallbackTimer)),o.element.remove()}_onMousedown(o){let e=mt(o),t=this._lastTouchStartEvent&&Date.now()<this._lastTouchStartEvent+Go;!this._target.rippleDisabled&&!e&&!t&&(this._isPointerDown=!0,this.fadeInRipple(o.clientX,o.clientY,this._target.rippleConfig))}_onTouchStart(o){if(!this._target.rippleDisabled&&!ht(o)){this._lastTouchStartEvent=Date.now(),this._isPointerDown=!0;let e=o.changedTouches;if(e)for(let t=0;t<e.length;t++)this.fadeInRipple(e[t].clientX,e[t].clientY,this._target.rippleConfig)}}_onPointerUp(){this._isPointerDown&&(this._isPointerDown=!1,this._getActiveRipples().forEach(o=>{let e=o.state===ce.VISIBLE||o.config.terminateOnPointerUp&&o.state===ce.FADING_IN;!o.config.persistent&&e&&o.fadeOut()}))}_getActiveRipples(){return Array.from(this._activeRipples.keys())}_removeTriggerEvents(){let o=this._triggerElement;o&&(qn.forEach(e=>n._eventManager.removeHandler(e,o,this)),this._pointerUpEventsRegistered&&($n.forEach(e=>o.removeEventListener(e,this,Yn)),this._pointerUpEventsRegistered=!1))}};function Qo(n,o,e){let t=Math.max(Math.abs(n-e.left),Math.abs(n-e.right)),i=Math.max(Math.abs(o-e.top),Math.abs(o-e.bottom));return Math.sqrt(t*t+i*i)}var yt=new F("mat-ripple-global-options"),Gn=(()=>{class n{_elementRef=h(Y);_animationsDisabled=ge();color;unbounded=!1;centered=!1;radius=0;animation;get disabled(){return this._disabled}set disabled(e){e&&this.fadeOutAllNonPersistent(),this._disabled=e,this._setupTriggerEventsIfEnabled()}_disabled=!1;get trigger(){return this._trigger||this._elementRef.nativeElement}set trigger(e){this._trigger=e,this._setupTriggerEventsIfEnabled()}_trigger;_rippleRenderer;_globalOptions;_isInitialized=!1;constructor(){let e=h(B),t=h(X),i=h(yt,{optional:!0}),r=h(Z);this._globalOptions=i||{},this._rippleRenderer=new bt(this,e,this._elementRef,t,r)}ngOnInit(){this._isInitialized=!0,this._setupTriggerEventsIfEnabled()}ngOnDestroy(){this._rippleRenderer._removeTriggerEvents()}fadeOutAll(){this._rippleRenderer.fadeOutAll()}fadeOutAllNonPersistent(){this._rippleRenderer.fadeOutAllNonPersistent()}get rippleConfig(){return{centered:this.centered,radius:this.radius,color:this.color,animation:k(k(k({},this._globalOptions.animation),this._animationsDisabled?{enterDuration:0,exitDuration:0}:{}),this.animation),terminateOnPointerUp:this._globalOptions.terminateOnPointerUp}}get rippleDisabled(){return this.disabled||!!this._globalOptions.disabled}_setupTriggerEventsIfEnabled(){!this.disabled&&this._isInitialized&&this._rippleRenderer.setupTriggerEvents(this.trigger)}launch(e,t=0,i){return typeof e=="number"?this._rippleRenderer.fadeInRipple(e,t,k(k({},this.rippleConfig),i)):this._rippleRenderer.fadeInRipple(0,0,k(k({},this.rippleConfig),e))}static \u0275fac=function(t){return new(t||n)};static \u0275dir=ae({type:n,selectors:[["","mat-ripple",""],["","matRipple",""]],hostAttrs:[1,"mat-ripple"],hostVars:2,hostBindings:function(t,i){t&2&&E("mat-ripple-unbounded",i.unbounded)},inputs:{color:[0,"matRippleColor","color"],unbounded:[0,"matRippleUnbounded","unbounded"],centered:[0,"matRippleCentered","centered"],radius:[0,"matRippleRadius","radius"],animation:[0,"matRippleAnimation","animation"],disabled:[0,"matRippleDisabled","disabled"],trigger:[0,"matRippleTrigger","trigger"]},exportAs:["matRipple"]})}return n})();var Kn=(()=>{class n{_animationsDisabled=ge();state="unchecked";disabled=!1;appearance="full";constructor(){}static \u0275fac=function(t){return new(t||n)};static \u0275cmp=j({type:n,selectors:[["mat-pseudo-checkbox"]],hostAttrs:[1,"mat-pseudo-checkbox"],hostVars:12,hostBindings:function(t,i){t&2&&E("mat-pseudo-checkbox-indeterminate",i.state==="indeterminate")("mat-pseudo-checkbox-checked",i.state==="checked")("mat-pseudo-checkbox-disabled",i.disabled)("mat-pseudo-checkbox-minimal",i.appearance==="minimal")("mat-pseudo-checkbox-full",i.appearance==="full")("_mat-animation-noopable",i._animationsDisabled)},inputs:{state:"state",disabled:"disabled",appearance:"appearance"},decls:0,vars:0,template:function(t,i){},styles:[`.mat-pseudo-checkbox {
  border-radius: 2px;
  cursor: pointer;
  display: inline-block;
  vertical-align: middle;
  box-sizing: border-box;
  position: relative;
  flex-shrink: 0;
  transition: border-color 90ms cubic-bezier(0, 0, 0.2, 0.1), background-color 90ms cubic-bezier(0, 0, 0.2, 0.1);
}
.mat-pseudo-checkbox::after {
  position: absolute;
  opacity: 0;
  content: "";
  border-bottom: 2px solid currentColor;
  transition: opacity 90ms cubic-bezier(0, 0, 0.2, 0.1);
}
.mat-pseudo-checkbox._mat-animation-noopable {
  transition: none !important;
  animation: none !important;
}
.mat-pseudo-checkbox._mat-animation-noopable::after {
  transition: none;
}

.mat-pseudo-checkbox-disabled {
  cursor: default;
}

.mat-pseudo-checkbox-indeterminate::after {
  left: 1px;
  opacity: 1;
  border-radius: 2px;
}

.mat-pseudo-checkbox-checked::after {
  left: 1px;
  border-left: 2px solid currentColor;
  transform: rotate(-45deg);
  opacity: 1;
  box-sizing: content-box;
}

.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-checked::after, .mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-indeterminate::after {
  color: var(--mat-pseudo-checkbox-minimal-selected-checkmark-color, var(--mat-sys-primary));
}
.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-checked.mat-pseudo-checkbox-disabled::after, .mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-indeterminate.mat-pseudo-checkbox-disabled::after {
  color: var(--mat-pseudo-checkbox-minimal-disabled-selected-checkmark-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}

.mat-pseudo-checkbox-full {
  border-color: var(--mat-pseudo-checkbox-full-unselected-icon-color, var(--mat-sys-on-surface-variant));
  border-width: 2px;
  border-style: solid;
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-disabled {
  border-color: var(--mat-pseudo-checkbox-full-disabled-unselected-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate {
  background-color: var(--mat-pseudo-checkbox-full-selected-icon-color, var(--mat-sys-primary));
  border-color: transparent;
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked::after, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate::after {
  color: var(--mat-pseudo-checkbox-full-selected-checkmark-color, var(--mat-sys-on-primary));
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked.mat-pseudo-checkbox-disabled, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate.mat-pseudo-checkbox-disabled {
  background-color: var(--mat-pseudo-checkbox-full-disabled-selected-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked.mat-pseudo-checkbox-disabled::after, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate.mat-pseudo-checkbox-disabled::after {
  color: var(--mat-pseudo-checkbox-full-disabled-selected-checkmark-color, var(--mat-sys-surface));
}

.mat-pseudo-checkbox {
  width: 18px;
  height: 18px;
}

.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-checked::after {
  width: 14px;
  height: 6px;
  transform-origin: center;
  top: -4.2426406871px;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}
.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-indeterminate::after {
  top: 8px;
  width: 16px;
}

.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked::after {
  width: 10px;
  height: 4px;
  transform-origin: center;
  top: -2.8284271247px;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate::after {
  top: 6px;
  width: 12px;
}
`],encapsulation:2,changeDetection:0})}return n})();var xt=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275cmp=j({type:n,selectors:[["structural-styles"]],decls:0,vars:0,template:function(t,i){},styles:[`.mat-focus-indicator {
  position: relative;
}
.mat-focus-indicator::before {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  box-sizing: border-box;
  pointer-events: none;
  display: var(--mat-focus-indicator-display, none);
  border-width: var(--mat-focus-indicator-border-width, 3px);
  border-style: var(--mat-focus-indicator-border-style, solid);
  border-color: var(--mat-focus-indicator-border-color, transparent);
  border-radius: var(--mat-focus-indicator-border-radius, 4px);
}
.mat-focus-indicator:focus-visible::before {
  content: "";
}

@media (forced-colors: active) {
  html {
    --mat-focus-indicator-display: block;
  }
}
`],encapsulation:2,changeDetection:0})}return n})();var Xo=["text"],Zo=[[["mat-icon"]],"*"],Jo=["mat-icon","*"];function er(n,o){if(n&1&&U(0,"mat-pseudo-checkbox",1),n&2){let e=m();T("disabled",e.disabled)("state",e.selected?"checked":"unchecked")}}function tr(n,o){if(n&1&&U(0,"mat-pseudo-checkbox",3),n&2){let e=m();T("disabled",e.disabled)}}function ir(n,o){if(n&1&&(s(0,"span",4),c(1),l()),n&2){let e=m();p(),N("(",e.group.label,")")}}var Si=new F("MAT_OPTION_PARENT_COMPONENT"),Mi=new F("MatOptgroup");var Ct=class{source;isUserInput;constructor(o,e=!1){this.source=o,this.isUserInput=e}},Ze=(()=>{class n{_element=h(Y);_changeDetectorRef=h(xe);_parent=h(Si,{optional:!0});group=h(Mi,{optional:!0});_signalDisableRipple=!1;_selected=!1;_active=!1;_mostRecentViewValue="";get multiple(){return this._parent&&this._parent.multiple}get selected(){return this._selected}value;id=h(_e).getId("mat-option-");get disabled(){return this.group&&this.group.disabled||this._disabled()}set disabled(e){this._disabled.set(e)}_disabled=w(!1);get disableRipple(){return this._signalDisableRipple?this._parent.disableRipple():!!this._parent?.disableRipple}get hideSingleSelectionIndicator(){return!!(this._parent&&this._parent.hideSingleSelectionIndicator)}onSelectionChange=new Q;_text;_stateChanges=new D;constructor(){let e=h(fe);e.load(xt),e.load(At),this._signalDisableRipple=!!this._parent&&lt(this._parent.disableRipple)}get active(){return this._active}get viewValue(){return(this._text?.nativeElement.textContent||"").trim()}select(e=!0){this._selected||(this._selected=!0,this._changeDetectorRef.markForCheck(),e&&this._emitSelectionChangeEvent())}deselect(e=!0){this._selected&&(this._selected=!1,this._changeDetectorRef.markForCheck(),e&&this._emitSelectionChangeEvent())}focus(e,t){let i=this._getHostElement();typeof i.focus=="function"&&i.focus(t)}setActiveStyles(){this._active||(this._active=!0,this._changeDetectorRef.markForCheck())}setInactiveStyles(){this._active&&(this._active=!1,this._changeDetectorRef.markForCheck())}getLabel(){return this.viewValue}_handleKeydown(e){(e.keyCode===13||e.keyCode===32)&&!Ie(e)&&(this._selectViaInteraction(),e.preventDefault())}_selectViaInteraction(){this.disabled||(this._selected=this.multiple?!this._selected:!0,this._changeDetectorRef.markForCheck(),this._emitSelectionChangeEvent(!0))}_getTabIndex(){return this.disabled?"-1":"0"}_getHostElement(){return this._element.nativeElement}ngAfterViewChecked(){if(this._selected){let e=this.viewValue;e!==this._mostRecentViewValue&&(this._mostRecentViewValue&&this._stateChanges.next(),this._mostRecentViewValue=e)}}ngOnDestroy(){this._stateChanges.complete()}_emitSelectionChangeEvent(e=!1){this.onSelectionChange.emit(new Ct(this,e))}static \u0275fac=function(t){return new(t||n)};static \u0275cmp=j({type:n,selectors:[["mat-option"]],viewQuery:function(t,i){if(t&1&&Be(Xo,7),t&2){let r;G(r=K())&&(i._text=r.first)}},hostAttrs:["role","option",1,"mat-mdc-option","mdc-list-item"],hostVars:11,hostBindings:function(t,i){t&1&&y("click",function(){return i._selectViaInteraction()})("keydown",function(a){return i._handleKeydown(a)}),t&2&&(Ee("id",i.id),ne("aria-selected",i.selected)("aria-disabled",i.disabled.toString()),E("mdc-list-item--selected",i.selected)("mat-mdc-option-multiple",i.multiple)("mat-mdc-option-active",i.active)("mdc-list-item--disabled",i.disabled))},inputs:{value:"value",id:"id",disabled:[2,"disabled","disabled",V]},outputs:{onSelectionChange:"onSelectionChange"},exportAs:["matOption"],ngContentSelectors:Jo,decls:8,vars:5,consts:[["text",""],["aria-hidden","true",1,"mat-mdc-option-pseudo-checkbox",3,"disabled","state"],[1,"mdc-list-item__primary-text"],["state","checked","aria-hidden","true","appearance","minimal",1,"mat-mdc-option-pseudo-checkbox",3,"disabled"],[1,"cdk-visually-hidden"],["aria-hidden","true","mat-ripple","",1,"mat-mdc-option-ripple","mat-focus-indicator",3,"matRippleTrigger","matRippleDisabled"]],template:function(t,i){t&1&&(me(Zo),v(0,er,1,2,"mat-pseudo-checkbox",1),te(1),s(2,"span",2,0),te(4,1),l(),v(5,tr,1,1,"mat-pseudo-checkbox",3),v(6,ir,2,1,"span",4),U(7,"div",5)),t&2&&(b(i.multiple?0:-1),p(5),b(!i.multiple&&i.selected&&!i.hideSingleSelectionIndicator?5:-1),p(),b(i.group&&i.group._inert?6:-1),p(),T("matRippleTrigger",i._getHostElement())("matRippleDisabled",i.disabled||i.disableRipple))},dependencies:[Kn,Gn],styles:[`.mat-mdc-option {
  -webkit-user-select: none;
  user-select: none;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
  min-height: 48px;
  padding: 0 16px;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  color: var(--mat-option-label-text-color, var(--mat-sys-on-surface));
  font-family: var(--mat-option-label-text-font, var(--mat-sys-label-large-font));
  line-height: var(--mat-option-label-text-line-height, var(--mat-sys-label-large-line-height));
  font-size: var(--mat-option-label-text-size, var(--mat-sys-body-large-size));
  letter-spacing: var(--mat-option-label-text-tracking, var(--mat-sys-label-large-tracking));
  font-weight: var(--mat-option-label-text-weight, var(--mat-sys-body-large-weight));
}
.mat-mdc-option:hover:not(.mdc-list-item--disabled) {
  background-color: var(--mat-option-hover-state-layer-color, color-mix(in srgb, var(--mat-sys-on-surface) calc(var(--mat-sys-hover-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-option:focus.mdc-list-item, .mat-mdc-option.mat-mdc-option-active.mdc-list-item {
  background-color: var(--mat-option-focus-state-layer-color, color-mix(in srgb, var(--mat-sys-on-surface) calc(var(--mat-sys-focus-state-layer-opacity) * 100%), transparent));
  outline: 0;
}
.mat-mdc-option.mdc-list-item--selected:not(.mdc-list-item--disabled):not(.mat-mdc-option-active, .mat-mdc-option-multiple, :focus, :hover) {
  background-color: var(--mat-option-selected-state-layer-color, var(--mat-sys-secondary-container));
}
.mat-mdc-option.mdc-list-item--selected:not(.mdc-list-item--disabled):not(.mat-mdc-option-active, .mat-mdc-option-multiple, :focus, :hover) .mdc-list-item__primary-text {
  color: var(--mat-option-selected-state-label-text-color, var(--mat-sys-on-secondary-container));
}
.mat-mdc-option .mat-pseudo-checkbox {
  --mat-pseudo-checkbox-minimal-selected-checkmark-color: var(--mat-option-selected-state-label-text-color, var(--mat-sys-on-secondary-container));
}
.mat-mdc-option.mdc-list-item {
  align-items: center;
  background: transparent;
}
.mat-mdc-option.mdc-list-item--disabled {
  cursor: default;
  pointer-events: none;
}
.mat-mdc-option.mdc-list-item--disabled .mat-mdc-option-pseudo-checkbox, .mat-mdc-option.mdc-list-item--disabled .mdc-list-item__primary-text, .mat-mdc-option.mdc-list-item--disabled > mat-icon {
  opacity: 0.38;
}
.mat-mdc-optgroup .mat-mdc-option:not(.mat-mdc-option-multiple) {
  padding-left: 32px;
}
[dir=rtl] .mat-mdc-optgroup .mat-mdc-option:not(.mat-mdc-option-multiple) {
  padding-left: 16px;
  padding-right: 32px;
}
.mat-mdc-option .mat-icon,
.mat-mdc-option .mat-pseudo-checkbox-full {
  margin-right: 16px;
  flex-shrink: 0;
}
[dir=rtl] .mat-mdc-option .mat-icon,
[dir=rtl] .mat-mdc-option .mat-pseudo-checkbox-full {
  margin-right: 0;
  margin-left: 16px;
}
.mat-mdc-option .mat-pseudo-checkbox-minimal {
  margin-left: 16px;
  flex-shrink: 0;
}
[dir=rtl] .mat-mdc-option .mat-pseudo-checkbox-minimal {
  margin-right: 16px;
  margin-left: 0;
}
.mat-mdc-option .mat-mdc-option-ripple {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
}
.mat-mdc-option .mdc-list-item__primary-text {
  white-space: normal;
  font-size: inherit;
  font-weight: inherit;
  letter-spacing: inherit;
  line-height: inherit;
  font-family: inherit;
  text-decoration: inherit;
  text-transform: inherit;
  margin-right: auto;
}
[dir=rtl] .mat-mdc-option .mdc-list-item__primary-text {
  margin-right: 0;
  margin-left: auto;
}
@media (forced-colors: active) {
  .mat-mdc-option.mdc-list-item--selected:not(:has(.mat-mdc-option-pseudo-checkbox))::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 16px;
    transform: translateY(-50%);
    width: 10px;
    height: 0;
    border-bottom: solid 10px;
    border-radius: 10px;
  }
  [dir=rtl] .mat-mdc-option.mdc-list-item--selected:not(:has(.mat-mdc-option-pseudo-checkbox))::after {
    right: auto;
    left: 16px;
  }
}

.mat-mdc-option-multiple {
  --mat-list-list-item-selected-container-color: var(--mat-list-list-item-container-color, transparent);
}

.mat-mdc-option-active .mat-focus-indicator::before {
  content: "";
}
`],encapsulation:2,changeDetection:0})}return n})();function Xn(n,o,e){if(e.length){let t=o.toArray(),i=e.toArray(),r=0;for(let a=0;a<n+1;a++)t[a].group&&t[a].group===i[r]&&r++;return r}return 0}function Zn(n,o,e,t){return n<e?n:n+o>e+t?Math.max(0,n-t+o):e}var nr=new F("cdk-dir-doc",{providedIn:"root",factory:()=>h(J)}),or=/^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Adlm|Arab|Hebr|Nkoo|Rohg|Thaa))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)/i;function Jn(n){let o=n?.toLowerCase()||"";return o==="auto"&&typeof navigator<"u"&&navigator?.language?or.test(navigator.language)?"rtl":"ltr":o==="rtl"?"rtl":"ltr"}var Ue=(()=>{class n{get value(){return this.valueSignal()}valueSignal=w("ltr");change=new Q;constructor(){let e=h(nr,{optional:!0});if(e){let t=e.body?e.body.dir:null,i=e.documentElement?e.documentElement.dir:null;this.valueSignal.set(Jn(t||i||"ltr"))}}ngOnDestroy(){this.change.complete()}static \u0275fac=function(t){return new(t||n)};static \u0275prov=I({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var ee=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275mod=q({type:n});static \u0275inj=W({})}return n})();var rr=20,Ti=(()=>{class n{_ngZone=h(B);_platform=h(X);_renderer=h(pe).createRenderer(null,null);_cleanupGlobalListener;constructor(){}_scrolled=new D;_scrolledCount=0;scrollContainers=new Map;register(e){this.scrollContainers.has(e)||this.scrollContainers.set(e,e.elementScrolled().subscribe(()=>this._scrolled.next(e)))}deregister(e){let t=this.scrollContainers.get(e);t&&(t.unsubscribe(),this.scrollContainers.delete(e))}scrolled(e=rr){return this._platform.isBrowser?new De(t=>{this._cleanupGlobalListener||(this._cleanupGlobalListener=this._ngZone.runOutsideAngular(()=>this._renderer.listen("document","scroll",()=>this._scrolled.next())));let i=e>0?this._scrolled.pipe(ei(e)).subscribe(t):this._scrolled.subscribe(t);return this._scrolledCount++,()=>{i.unsubscribe(),this._scrolledCount--,this._scrolledCount||(this._cleanupGlobalListener?.(),this._cleanupGlobalListener=void 0)}}):we()}ngOnDestroy(){this._cleanupGlobalListener?.(),this._cleanupGlobalListener=void 0,this.scrollContainers.forEach((e,t)=>this.deregister(t)),this._scrolled.complete()}ancestorScrolled(e,t){let i=this.getAncestorScrollContainers(e);return this.scrolled(t).pipe(ke(r=>!r||i.indexOf(r)>-1))}getAncestorScrollContainers(e){let t=[];return this.scrollContainers.forEach((i,r)=>{this._scrollableContainsElement(r,e)&&t.push(r)}),t}_scrollableContainsElement(e,t){let i=Ce(t),r=e.getElementRef().nativeElement;do if(i==r)return!0;while(i=i.parentElement);return!1}static \u0275fac=function(t){return new(t||n)};static \u0275prov=I({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var ar=20,We=(()=>{class n{_platform=h(X);_listeners;_viewportSize=null;_change=new D;_document=h(J);constructor(){let e=h(B),t=h(pe).createRenderer(null,null);e.runOutsideAngular(()=>{if(this._platform.isBrowser){let i=r=>this._change.next(r);this._listeners=[t.listen("window","resize",i),t.listen("window","orientationchange",i)]}this.change().subscribe(()=>this._viewportSize=null)})}ngOnDestroy(){this._listeners?.forEach(e=>e()),this._change.complete()}getViewportSize(){this._viewportSize||this._updateViewportSize();let e={width:this._viewportSize.width,height:this._viewportSize.height};return this._platform.isBrowser||(this._viewportSize=null),e}getViewportRect(){let e=this.getViewportScrollPosition(),{width:t,height:i}=this.getViewportSize();return{top:e.top,left:e.left,bottom:e.top+i,right:e.left+t,height:i,width:t}}getViewportScrollPosition(){if(!this._platform.isBrowser)return{top:0,left:0};let e=this._document,t=this._getWindow(),i=e.documentElement,r=i.getBoundingClientRect(),a=-r.top||e.body?.scrollTop||t.scrollY||i.scrollTop||0,d=-r.left||e.body?.scrollLeft||t.scrollX||i.scrollLeft||0;return{top:a,left:d}}change(e=ar){return e>0?this._change.pipe(ei(e)):this._change}_getWindow(){return this._document.defaultView||window}_updateViewportSize(){let e=this._getWindow();this._viewportSize=this._platform.isBrowser?{width:e.innerWidth,height:e.innerHeight}:{width:0,height:0}}static \u0275fac=function(t){return new(t||n)};static \u0275prov=I({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var zt=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275mod=q({type:n});static \u0275inj=W({})}return n})(),Ei=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275mod=q({type:n});static \u0275inj=W({imports:[ee,zt,ee,zt]})}return n})();var wt=class{_attachedHost=null;attach(o){return this._attachedHost=o,o.attach(this)}detach(){let o=this._attachedHost;o!=null&&(this._attachedHost=null,o.detach())}get isAttached(){return this._attachedHost!=null}setAttachedHost(o){this._attachedHost=o}},Oi=class extends wt{component;viewContainerRef;injector;projectableNodes;bindings;constructor(o,e,t,i,r){super(),this.component=o,this.viewContainerRef=e,this.injector=t,this.projectableNodes=i,this.bindings=r||null}},Je=class extends wt{templateRef;viewContainerRef;context;injector;constructor(o,e,t,i){super(),this.templateRef=o,this.viewContainerRef=e,this.context=t,this.injector=i}get origin(){return this.templateRef.elementRef}attach(o,e=this.context){return this.context=e,super.attach(o)}detach(){return this.context=void 0,super.detach()}},Ii=class extends wt{element;constructor(o){super(),this.element=o instanceof Y?o.nativeElement:o}},Di=class{_attachedPortal=null;_disposeFn=null;_isDisposed=!1;hasAttached(){return!!this._attachedPortal}attach(o){if(o instanceof Oi)return this._attachedPortal=o,this.attachComponentPortal(o);if(o instanceof Je)return this._attachedPortal=o,this.attachTemplatePortal(o);if(this.attachDomPortal&&o instanceof Ii)return this._attachedPortal=o,this.attachDomPortal(o)}attachDomPortal=null;detach(){this._attachedPortal&&(this._attachedPortal.setAttachedHost(null),this._attachedPortal=null),this._invokeDisposeFn()}dispose(){this.hasAttached()&&this.detach(),this._invokeDisposeFn(),this._isDisposed=!0}setDisposeFn(o){this._disposeFn=o}_invokeDisposeFn(){this._disposeFn&&(this._disposeFn(),this._disposeFn=null)}},Bt=class extends Di{outletElement;_appRef;_defaultInjector;constructor(o,e,t){super(),this.outletElement=o,this._appRef=e,this._defaultInjector=t}attachComponentPortal(o){let e;if(o.viewContainerRef){let t=o.injector||o.viewContainerRef.injector,i=t.get(rn,null,{optional:!0})||void 0;e=o.viewContainerRef.createComponent(o.component,{index:o.viewContainerRef.length,injector:t,ngModuleRef:i,projectableNodes:o.projectableNodes||void 0,bindings:o.bindings||void 0}),this.setDisposeFn(()=>e.destroy())}else{let t=this._appRef,i=o.injector||this._defaultInjector||Z.NULL,r=i.get(Te,t.injector);e=Ot(o.component,{elementInjector:i,environmentInjector:r,projectableNodes:o.projectableNodes||void 0,bindings:o.bindings||void 0}),t.attachView(e.hostView),this.setDisposeFn(()=>{t.viewCount>0&&t.detachView(e.hostView),e.destroy()})}return this.outletElement.appendChild(this._getComponentRootNode(e)),this._attachedPortal=o,e}attachTemplatePortal(o){let e=o.viewContainerRef,t=e.createEmbeddedView(o.templateRef,o.context,{injector:o.injector});return t.rootNodes.forEach(i=>this.outletElement.appendChild(i)),t.detectChanges(),this.setDisposeFn(()=>{let i=e.indexOf(t);i!==-1&&e.remove(i)}),this._attachedPortal=o,t}attachDomPortal=o=>{let e=o.element;e.parentNode;let t=this.outletElement.ownerDocument.createComment("dom-portal");e.parentNode.insertBefore(t,e),this.outletElement.appendChild(e),this._attachedPortal=o,super.setDisposeFn(()=>{t.parentNode&&t.parentNode.replaceChild(e,t)})};dispose(){super.dispose(),this.outletElement.remove()}_getComponentRootNode(o){return o.hostView.rootNodes[0]}};var eo=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275mod=q({type:n});static \u0275inj=W({})}return n})();var to=jn();function lo(n){return new jt(n.get(We),n.get(J))}var jt=class{_viewportRuler;_previousHTMLStyles={top:"",left:""};_previousScrollPosition;_isEnabled=!1;_document;constructor(o,e){this._viewportRuler=o,this._document=e}attach(){}enable(){if(this._canBeEnabled()){let o=this._document.documentElement;this._previousScrollPosition=this._viewportRuler.getViewportScrollPosition(),this._previousHTMLStyles.left=o.style.left||"",this._previousHTMLStyles.top=o.style.top||"",o.style.left=$(-this._previousScrollPosition.left),o.style.top=$(-this._previousScrollPosition.top),o.classList.add("cdk-global-scrollblock"),this._isEnabled=!0}}disable(){if(this._isEnabled){let o=this._document.documentElement,e=this._document.body,t=o.style,i=e.style,r=t.scrollBehavior||"",a=i.scrollBehavior||"";this._isEnabled=!1,t.left=this._previousHTMLStyles.left,t.top=this._previousHTMLStyles.top,o.classList.remove("cdk-global-scrollblock"),to&&(t.scrollBehavior=i.scrollBehavior="auto"),window.scroll(this._previousScrollPosition.left,this._previousScrollPosition.top),to&&(t.scrollBehavior=r,i.scrollBehavior=a)}}_canBeEnabled(){if(this._document.documentElement.classList.contains("cdk-global-scrollblock")||this._isEnabled)return!1;let e=this._document.documentElement,t=this._viewportRuler.getViewportSize();return e.scrollHeight>t.height||e.scrollWidth>t.width}};function co(n,o){return new Ht(n.get(Ti),n.get(B),n.get(We),o)}var Ht=class{_scrollDispatcher;_ngZone;_viewportRuler;_config;_scrollSubscription=null;_overlayRef;_initialScrollPosition;constructor(o,e,t,i){this._scrollDispatcher=o,this._ngZone=e,this._viewportRuler=t,this._config=i}attach(o){this._overlayRef,this._overlayRef=o}enable(){if(this._scrollSubscription)return;let o=this._scrollDispatcher.scrolled(0).pipe(ke(e=>!e||!this._overlayRef.overlayElement.contains(e.getElementRef().nativeElement)));this._config&&this._config.threshold&&this._config.threshold>1?(this._initialScrollPosition=this._viewportRuler.getViewportScrollPosition().top,this._scrollSubscription=o.subscribe(()=>{let e=this._viewportRuler.getViewportScrollPosition().top;Math.abs(e-this._initialScrollPosition)>this._config.threshold?this._detach():this._overlayRef.updatePosition()})):this._scrollSubscription=o.subscribe(this._detach)}disable(){this._scrollSubscription&&(this._scrollSubscription.unsubscribe(),this._scrollSubscription=null)}detach(){this.disable(),this._overlayRef=null}_detach=()=>{this.disable(),this._overlayRef.hasAttached()&&this._ngZone.run(()=>this._overlayRef.detach())}};var kt=class{enable(){}disable(){}attach(){}};function Pi(n,o){return o.some(e=>{let t=n.bottom<e.top,i=n.top>e.bottom,r=n.right<e.left,a=n.left>e.right;return t||i||r||a})}function io(n,o){return o.some(e=>{let t=n.top<e.top,i=n.bottom>e.bottom,r=n.left<e.left,a=n.right>e.right;return t||i||r||a})}function Gt(n,o){return new Ut(n.get(Ti),n.get(We),n.get(B),o)}var Ut=class{_scrollDispatcher;_viewportRuler;_ngZone;_config;_scrollSubscription=null;_overlayRef;constructor(o,e,t,i){this._scrollDispatcher=o,this._viewportRuler=e,this._ngZone=t,this._config=i}attach(o){this._overlayRef,this._overlayRef=o}enable(){if(!this._scrollSubscription){let o=this._config?this._config.scrollThrottle:0;this._scrollSubscription=this._scrollDispatcher.scrolled(o).subscribe(()=>{if(this._overlayRef.updatePosition(),this._config&&this._config.autoClose){let e=this._overlayRef.overlayElement.getBoundingClientRect(),{width:t,height:i}=this._viewportRuler.getViewportSize();Pi(e,[{width:t,height:i,bottom:i,right:t,top:0,left:0}])&&(this.disable(),this._ngZone.run(()=>this._overlayRef.detach()))}})}}disable(){this._scrollSubscription&&(this._scrollSubscription.unsubscribe(),this._scrollSubscription=null)}detach(){this.disable(),this._overlayRef=null}},po=(()=>{class n{_injector=h(Z);constructor(){}noop=()=>new kt;close=e=>co(this._injector,e);block=()=>lo(this._injector);reposition=e=>Gt(this._injector,e);static \u0275fac=function(t){return new(t||n)};static \u0275prov=I({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),et=class{positionStrategy;scrollStrategy=new kt;panelClass="";hasBackdrop=!1;backdropClass="cdk-overlay-dark-backdrop";disableAnimations;width;height;minWidth;minHeight;maxWidth;maxHeight;direction;disposeOnNavigation=!1;usePopover;eventPredicate;constructor(o){if(o){let e=Object.keys(o);for(let t of e)o[t]!==void 0&&(this[t]=o[t])}}};var Wt=class{connectionPair;scrollableViewProperties;constructor(o,e){this.connectionPair=o,this.scrollableViewProperties=e}};var mo=(()=>{class n{_attachedOverlays=[];_document=h(J);_isAttached=!1;constructor(){}ngOnDestroy(){this.detach()}add(e){this.remove(e),this._attachedOverlays.push(e)}remove(e){let t=this._attachedOverlays.indexOf(e);t>-1&&this._attachedOverlays.splice(t,1),this._attachedOverlays.length===0&&this.detach()}canReceiveEvent(e,t,i){return i.observers.length<1?!1:e.eventPredicate?e.eventPredicate(t):!0}static \u0275fac=function(t){return new(t||n)};static \u0275prov=I({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),ho=(()=>{class n extends mo{_ngZone=h(B);_renderer=h(pe).createRenderer(null,null);_cleanupKeydown;add(e){super.add(e),this._isAttached||(this._ngZone.runOutsideAngular(()=>{this._cleanupKeydown=this._renderer.listen("body","keydown",this._keydownListener)}),this._isAttached=!0)}detach(){this._isAttached&&(this._cleanupKeydown?.(),this._isAttached=!1)}_keydownListener=e=>{let t=this._attachedOverlays;for(let i=t.length-1;i>-1;i--){let r=t[i];if(this.canReceiveEvent(r,e,r._keydownEvents)){this._ngZone.run(()=>r._keydownEvents.next(e));break}}};static \u0275fac=(()=>{let e;return function(i){return(e||(e=Ae(n)))(i||n)}})();static \u0275prov=I({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),uo=(()=>{class n extends mo{_platform=h(X);_ngZone=h(B);_renderer=h(pe).createRenderer(null,null);_cursorOriginalValue;_cursorStyleIsSet=!1;_pointerDownEventTarget=null;_cleanups;add(e){if(super.add(e),!this._isAttached){let t=this._document.body,i={capture:!0},r=this._renderer;this._cleanups=this._ngZone.runOutsideAngular(()=>[r.listen(t,"pointerdown",this._pointerDownListener,i),r.listen(t,"click",this._clickListener,i),r.listen(t,"auxclick",this._clickListener,i),r.listen(t,"contextmenu",this._clickListener,i)]),this._platform.IOS&&!this._cursorStyleIsSet&&(this._cursorOriginalValue=t.style.cursor,t.style.cursor="pointer",this._cursorStyleIsSet=!0),this._isAttached=!0}}detach(){this._isAttached&&(this._cleanups?.forEach(e=>e()),this._cleanups=void 0,this._platform.IOS&&this._cursorStyleIsSet&&(this._document.body.style.cursor=this._cursorOriginalValue,this._cursorStyleIsSet=!1),this._isAttached=!1)}_pointerDownListener=e=>{this._pointerDownEventTarget=ie(e)};_clickListener=e=>{let t=ie(e),i=e.type==="click"&&this._pointerDownEventTarget?this._pointerDownEventTarget:t;this._pointerDownEventTarget=null;let r=this._attachedOverlays.slice();for(let a=r.length-1;a>-1;a--){let d=r[a],u=d._outsidePointerEvents;if(!(!d.hasAttached()||!this.canReceiveEvent(d,e,u))){if(no(d.overlayElement,t)||no(d.overlayElement,i))break;this._ngZone?this._ngZone.run(()=>u.next(e)):u.next(e)}}};static \u0275fac=(()=>{let e;return function(i){return(e||(e=Ae(n)))(i||n)}})();static \u0275prov=I({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();function no(n,o){let e=typeof ShadowRoot<"u"&&ShadowRoot,t=o;for(;t;){if(t===n)return!0;t=e&&t instanceof ShadowRoot?t.host:t.parentNode}return!1}var fo=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275cmp=j({type:n,selectors:[["ng-component"]],hostAttrs:["cdk-overlay-style-loader",""],decls:0,vars:0,template:function(t,i){},styles:[`.cdk-overlay-container, .cdk-global-overlay-wrapper {
  pointer-events: none;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}

.cdk-overlay-container {
  position: fixed;
}
@layer cdk-overlay {
  .cdk-overlay-container {
    z-index: 1000;
  }
}
.cdk-overlay-container:empty {
  display: none;
}

.cdk-global-overlay-wrapper {
  display: flex;
  position: absolute;
}
@layer cdk-overlay {
  .cdk-global-overlay-wrapper {
    z-index: 1000;
  }
}

.cdk-overlay-pane {
  position: absolute;
  pointer-events: auto;
  box-sizing: border-box;
  display: flex;
  max-width: 100%;
  max-height: 100%;
}
@layer cdk-overlay {
  .cdk-overlay-pane {
    z-index: 1000;
  }
}

.cdk-overlay-backdrop {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  pointer-events: auto;
  -webkit-tap-highlight-color: transparent;
  opacity: 0;
  touch-action: manipulation;
}
@layer cdk-overlay {
  .cdk-overlay-backdrop {
    z-index: 1000;
    transition: opacity 400ms cubic-bezier(0.25, 0.8, 0.25, 1);
  }
}
@media (prefers-reduced-motion) {
  .cdk-overlay-backdrop {
    transition-duration: 1ms;
  }
}

.cdk-overlay-backdrop-showing {
  opacity: 1;
}
@media (forced-colors: active) {
  .cdk-overlay-backdrop-showing {
    opacity: 0.6;
  }
}

@layer cdk-overlay {
  .cdk-overlay-dark-backdrop {
    background: rgba(0, 0, 0, 0.32);
  }
}

.cdk-overlay-transparent-backdrop {
  transition: visibility 1ms linear, opacity 1ms linear;
  visibility: hidden;
  opacity: 1;
}
.cdk-overlay-transparent-backdrop.cdk-overlay-backdrop-showing, .cdk-high-contrast-active .cdk-overlay-transparent-backdrop {
  opacity: 0;
  visibility: visible;
}

.cdk-overlay-backdrop-noop-animation {
  transition: none;
}

.cdk-overlay-connected-position-bounding-box {
  position: absolute;
  display: flex;
  flex-direction: column;
  min-width: 1px;
  min-height: 1px;
}
@layer cdk-overlay {
  .cdk-overlay-connected-position-bounding-box {
    z-index: 1000;
  }
}

.cdk-global-scrollblock {
  position: fixed;
  width: 100%;
  overflow-y: scroll;
}

.cdk-overlay-popover {
  background: none;
  border: none;
  padding: 0;
  outline: 0;
  overflow: visible;
  position: fixed;
  pointer-events: none;
  white-space: normal;
  color: inherit;
  text-decoration: none;
  width: 100%;
  height: 100%;
  inset: auto;
  top: 0;
  left: 0;
}
.cdk-overlay-popover::backdrop {
  display: none;
}
.cdk-overlay-popover .cdk-overlay-backdrop {
  position: fixed;
  z-index: auto;
}
`],encapsulation:2,changeDetection:0})}return n})(),_o=(()=>{class n{_platform=h(X);_containerElement;_document=h(J);_styleLoader=h(fe);constructor(){}ngOnDestroy(){this._containerElement?.remove()}getContainerElement(){return this._loadStyles(),this._containerElement||this._createContainer(),this._containerElement}_createContainer(){let e="cdk-overlay-container";if(this._platform.isBrowser||Ci()){let i=this._document.querySelectorAll(`.${e}[platform="server"], .${e}[platform="test"]`);for(let r=0;r<i.length;r++)i[r].remove()}let t=this._document.createElement("div");t.classList.add(e),Ci()?t.setAttribute("platform","test"):this._platform.isBrowser||t.setAttribute("platform","server"),this._document.body.appendChild(t),this._containerElement=t}_loadStyles(){this._styleLoader.load(fo)}static \u0275fac=function(t){return new(t||n)};static \u0275prov=I({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),Ri=class{_renderer;_ngZone;element;_cleanupClick;_cleanupTransitionEnd;_fallbackTimeout;constructor(o,e,t,i){this._renderer=e,this._ngZone=t,this.element=o.createElement("div"),this.element.classList.add("cdk-overlay-backdrop"),this._cleanupClick=e.listen(this.element,"click",i)}detach(){this._ngZone.runOutsideAngular(()=>{let o=this.element;clearTimeout(this._fallbackTimeout),this._cleanupTransitionEnd?.(),this._cleanupTransitionEnd=this._renderer.listen(o,"transitionend",this.dispose),this._fallbackTimeout=setTimeout(this.dispose,500),o.style.pointerEvents="none",o.classList.remove("cdk-overlay-backdrop-showing")})}dispose=()=>{clearTimeout(this._fallbackTimeout),this._cleanupClick?.(),this._cleanupTransitionEnd?.(),this._cleanupClick=this._cleanupTransitionEnd=this._fallbackTimeout=void 0,this.element.remove()}};function Fi(n){return n&&n.nodeType===1}var Yt=class{_portalOutlet;_host;_pane;_config;_ngZone;_keyboardDispatcher;_document;_location;_outsideClickDispatcher;_animationsDisabled;_injector;_renderer;_backdropClick=new D;_attachments=new D;_detachments=new D;_positionStrategy;_scrollStrategy;_locationChanges=ve.EMPTY;_backdropRef=null;_detachContentMutationObserver;_detachContentAfterRenderRef;_disposed=!1;_previousHostParent;_keydownEvents=new D;_outsidePointerEvents=new D;_afterNextRenderRef;constructor(o,e,t,i,r,a,d,u,g,f=!1,_,S){this._portalOutlet=o,this._host=e,this._pane=t,this._config=i,this._ngZone=r,this._keyboardDispatcher=a,this._document=d,this._location=u,this._outsideClickDispatcher=g,this._animationsDisabled=f,this._injector=_,this._renderer=S,i.scrollStrategy&&(this._scrollStrategy=i.scrollStrategy,this._scrollStrategy.attach(this)),this._positionStrategy=i.positionStrategy}get overlayElement(){return this._pane}get backdropElement(){return this._backdropRef?.element||null}get hostElement(){return this._host}get eventPredicate(){return this._config?.eventPredicate||null}attach(o){if(this._disposed)return null;this._attachHost();let e=this._portalOutlet.attach(o);return this._positionStrategy?.attach(this),this._updateStackingOrder(),this._updateElementSize(),this._updateElementDirection(),this._scrollStrategy&&this._scrollStrategy.enable(),this._afterNextRenderRef?.destroy(),this._afterNextRenderRef=Le(()=>{this.hasAttached()&&this.updatePosition()},{injector:this._injector}),this._togglePointerEvents(!0),this._config.hasBackdrop&&this._attachBackdrop(),this._config.panelClass&&this._toggleClasses(this._pane,this._config.panelClass,!0),this._attachments.next(),this._completeDetachContent(),this._keyboardDispatcher.add(this),this._config.disposeOnNavigation&&(this._locationChanges=this._location.subscribe(()=>this.dispose())),this._outsideClickDispatcher.add(this),typeof e?.onDestroy=="function"&&e.onDestroy(()=>{this.hasAttached()&&this._ngZone.runOutsideAngular(()=>Promise.resolve().then(()=>this.detach()))}),e}detach(){if(!this.hasAttached())return;this.detachBackdrop(),this._togglePointerEvents(!1),this._positionStrategy&&this._positionStrategy.detach&&this._positionStrategy.detach(),this._scrollStrategy&&this._scrollStrategy.disable();let o=this._portalOutlet.detach();return this._detachments.next(),this._completeDetachContent(),this._keyboardDispatcher.remove(this),this._detachContentWhenEmpty(),this._locationChanges.unsubscribe(),this._outsideClickDispatcher.remove(this),o}dispose(){if(this._disposed)return;let o=this.hasAttached();this._positionStrategy&&this._positionStrategy.dispose(),this._disposeScrollStrategy(),this._backdropRef?.dispose(),this._locationChanges.unsubscribe(),this._keyboardDispatcher.remove(this),this._portalOutlet.dispose(),this._attachments.complete(),this._backdropClick.complete(),this._keydownEvents.complete(),this._outsidePointerEvents.complete(),this._outsideClickDispatcher.remove(this),this._host?.remove(),this._afterNextRenderRef?.destroy(),this._previousHostParent=this._pane=this._host=this._backdropRef=null,o&&this._detachments.next(),this._detachments.complete(),this._completeDetachContent(),this._disposed=!0}hasAttached(){return this._portalOutlet.hasAttached()}backdropClick(){return this._backdropClick}attachments(){return this._attachments}detachments(){return this._detachments}keydownEvents(){return this._keydownEvents}outsidePointerEvents(){return this._outsidePointerEvents}getConfig(){return this._config}updatePosition(){this._positionStrategy&&this._positionStrategy.apply()}updatePositionStrategy(o){o!==this._positionStrategy&&(this._positionStrategy&&this._positionStrategy.dispose(),this._positionStrategy=o,this.hasAttached()&&(o.attach(this),this.updatePosition()))}updateSize(o){this._config=k(k({},this._config),o),this._updateElementSize()}setDirection(o){this._config=L(k({},this._config),{direction:o}),this._updateElementDirection()}addPanelClass(o){this._pane&&this._toggleClasses(this._pane,o,!0)}removePanelClass(o){this._pane&&this._toggleClasses(this._pane,o,!1)}getDirection(){let o=this._config.direction;return o?typeof o=="string"?o:o.value:"ltr"}updateScrollStrategy(o){o!==this._scrollStrategy&&(this._disposeScrollStrategy(),this._scrollStrategy=o,this.hasAttached()&&(o.attach(this),o.enable()))}_updateElementDirection(){this._host.setAttribute("dir",this.getDirection())}_updateElementSize(){if(!this._pane)return;let o=this._pane.style;o.width=$(this._config.width),o.height=$(this._config.height),o.minWidth=$(this._config.minWidth),o.minHeight=$(this._config.minHeight),o.maxWidth=$(this._config.maxWidth),o.maxHeight=$(this._config.maxHeight)}_togglePointerEvents(o){this._pane.style.pointerEvents=o?"":"none"}_attachHost(){if(!this._host.parentElement){let o=this._config.usePopover?this._positionStrategy?.getPopoverInsertionPoint?.():null;Fi(o)?o.after(this._host):o?.type==="parent"?o.element.appendChild(this._host):this._previousHostParent?.appendChild(this._host)}if(this._config.usePopover)try{this._host.showPopover()}catch(o){}}_attachBackdrop(){let o="cdk-overlay-backdrop-showing";this._backdropRef?.dispose(),this._backdropRef=new Ri(this._document,this._renderer,this._ngZone,e=>{this._backdropClick.next(e)}),this._animationsDisabled&&this._backdropRef.element.classList.add("cdk-overlay-backdrop-noop-animation"),this._config.backdropClass&&this._toggleClasses(this._backdropRef.element,this._config.backdropClass,!0),this._config.usePopover?this._host.prepend(this._backdropRef.element):this._host.parentElement.insertBefore(this._backdropRef.element,this._host),!this._animationsDisabled&&typeof requestAnimationFrame<"u"?this._ngZone.runOutsideAngular(()=>{requestAnimationFrame(()=>this._backdropRef?.element.classList.add(o))}):this._backdropRef.element.classList.add(o)}_updateStackingOrder(){!this._config.usePopover&&this._host.nextSibling&&this._host.parentNode.appendChild(this._host)}detachBackdrop(){this._animationsDisabled?(this._backdropRef?.dispose(),this._backdropRef=null):this._backdropRef?.detach()}_toggleClasses(o,e,t){let i=Me(e||[]).filter(r=>!!r);i.length&&(t?o.classList.add(...i):o.classList.remove(...i))}_detachContentWhenEmpty(){let o=!1;try{this._detachContentAfterRenderRef=Le(()=>{o=!0,this._detachContent()},{injector:this._injector})}catch(e){if(o)throw e;this._detachContent()}globalThis.MutationObserver&&this._pane&&(this._detachContentMutationObserver||=new globalThis.MutationObserver(()=>{this._detachContent()}),this._detachContentMutationObserver.observe(this._pane,{childList:!0}))}_detachContent(){(!this._pane||!this._host||this._pane.children.length===0)&&(this._pane&&this._config.panelClass&&this._toggleClasses(this._pane,this._config.panelClass,!1),this._host&&this._host.parentElement&&(this._previousHostParent=this._host.parentElement,this._host.remove()),this._completeDetachContent())}_completeDetachContent(){this._detachContentAfterRenderRef?.destroy(),this._detachContentAfterRenderRef=void 0,this._detachContentMutationObserver?.disconnect()}_disposeScrollStrategy(){let o=this._scrollStrategy;o?.disable(),o?.detach?.()}},oo="cdk-overlay-connected-position-bounding-box",sr=/([A-Za-z%]+)$/;function Kt(n,o){return new qt(o,n.get(We),n.get(J),n.get(X),n.get(_o))}var qt=class{_viewportRuler;_document;_platform;_overlayContainer;_overlayRef;_isInitialRender=!1;_lastBoundingBoxSize={width:0,height:0};_isPushed=!1;_canPush=!0;_growAfterOpen=!1;_hasFlexibleDimensions=!0;_positionLocked=!1;_originRect;_overlayRect;_viewportRect;_containerRect;_viewportMargin=0;_scrollables=[];_preferredPositions=[];_origin;_pane;_isDisposed=!1;_boundingBox=null;_lastPosition=null;_lastScrollVisibility=null;_positionChanges=new D;_resizeSubscription=ve.EMPTY;_offsetX=0;_offsetY=0;_transformOriginSelector;_appliedPanelClasses=[];_previousPushAmount=null;_popoverLocation="global";positionChanges=this._positionChanges;get positions(){return this._preferredPositions}constructor(o,e,t,i,r){this._viewportRuler=e,this._document=t,this._platform=i,this._overlayContainer=r,this.setOrigin(o)}attach(o){this._overlayRef&&this._overlayRef,this._validatePositions(),o.hostElement.classList.add(oo),this._overlayRef=o,this._boundingBox=o.hostElement,this._pane=o.overlayElement,this._isDisposed=!1,this._isInitialRender=!0,this._lastPosition=null,this._resizeSubscription.unsubscribe(),this._resizeSubscription=this._viewportRuler.change().subscribe(()=>{this._isInitialRender=!0,this.apply()})}apply(){if(this._isDisposed||!this._platform.isBrowser)return;if(!this._isInitialRender&&this._positionLocked&&this._lastPosition){this.reapplyLastPosition();return}this._clearPanelClasses(),this._resetOverlayElementStyles(),this._resetBoundingBoxStyles(),this._viewportRect=this._getNarrowedViewportRect(),this._originRect=this._getOriginRect(),this._overlayRect=this._pane.getBoundingClientRect(),this._containerRect=this._getContainerRect();let o=this._originRect,e=this._overlayRect,t=this._viewportRect,i=this._containerRect,r=[],a;for(let d of this._preferredPositions){let u=this._getOriginPoint(o,i,d),g=this._getOverlayPoint(u,e,d),f=this._getOverlayFit(g,e,t,d);if(f.isCompletelyWithinViewport){this._isPushed=!1,this._applyPosition(d,u);return}if(this._canFitWithFlexibleDimensions(f,g,t)){r.push({position:d,origin:u,overlayRect:e,boundingBoxRect:this._calculateBoundingBoxRect(u,d)});continue}(!a||a.overlayFit.visibleArea<f.visibleArea)&&(a={overlayFit:f,overlayPoint:g,originPoint:u,position:d,overlayRect:e})}if(r.length){let d=null,u=-1;for(let g of r){let f=g.boundingBoxRect.width*g.boundingBoxRect.height*(g.position.weight||1);f>u&&(u=f,d=g)}this._isPushed=!1,this._applyPosition(d.position,d.origin);return}if(this._canPush){this._isPushed=!0,this._applyPosition(a.position,a.originPoint);return}this._applyPosition(a.position,a.originPoint)}detach(){this._clearPanelClasses(),this._lastPosition=null,this._previousPushAmount=null,this._resizeSubscription.unsubscribe()}dispose(){this._isDisposed||(this._boundingBox&&Ye(this._boundingBox.style,{top:"",left:"",right:"",bottom:"",height:"",width:"",alignItems:"",justifyContent:""}),this._pane&&this._resetOverlayElementStyles(),this._overlayRef&&this._overlayRef.hostElement.classList.remove(oo),this.detach(),this._positionChanges.complete(),this._overlayRef=this._boundingBox=null,this._isDisposed=!0)}reapplyLastPosition(){if(this._isDisposed||!this._platform.isBrowser)return;let o=this._lastPosition;o?(this._originRect=this._getOriginRect(),this._overlayRect=this._pane.getBoundingClientRect(),this._viewportRect=this._getNarrowedViewportRect(),this._containerRect=this._getContainerRect(),this._applyPosition(o,this._getOriginPoint(this._originRect,this._containerRect,o))):this.apply()}withScrollableContainers(o){return this._scrollables=o,this}withPositions(o){return this._preferredPositions=o,o.indexOf(this._lastPosition)===-1&&(this._lastPosition=null),this._validatePositions(),this}withViewportMargin(o){return this._viewportMargin=o,this}withFlexibleDimensions(o=!0){return this._hasFlexibleDimensions=o,this}withGrowAfterOpen(o=!0){return this._growAfterOpen=o,this}withPush(o=!0){return this._canPush=o,this}withLockedPosition(o=!0){return this._positionLocked=o,this}setOrigin(o){return this._origin=o,this}withDefaultOffsetX(o){return this._offsetX=o,this}withDefaultOffsetY(o){return this._offsetY=o,this}withTransformOriginOn(o){return this._transformOriginSelector=o,this}withPopoverLocation(o){return this._popoverLocation=o,this}getPopoverInsertionPoint(){return this._popoverLocation==="global"?null:this._popoverLocation!=="inline"?this._popoverLocation:this._origin instanceof Y?this._origin.nativeElement:Fi(this._origin)?this._origin:null}_getOriginPoint(o,e,t){let i;if(t.originX=="center")i=o.left+o.width/2;else{let a=this._isRtl()?o.right:o.left,d=this._isRtl()?o.left:o.right;i=t.originX=="start"?a:d}e.left<0&&(i-=e.left);let r;return t.originY=="center"?r=o.top+o.height/2:r=t.originY=="top"?o.top:o.bottom,e.top<0&&(r-=e.top),{x:i,y:r}}_getOverlayPoint(o,e,t){let i;t.overlayX=="center"?i=-e.width/2:t.overlayX==="start"?i=this._isRtl()?-e.width:0:i=this._isRtl()?0:-e.width;let r;return t.overlayY=="center"?r=-e.height/2:r=t.overlayY=="top"?0:-e.height,{x:o.x+i,y:o.y+r}}_getOverlayFit(o,e,t,i){let r=ao(e),{x:a,y:d}=o,u=this._getOffset(i,"x"),g=this._getOffset(i,"y");u&&(a+=u),g&&(d+=g);let f=0-a,_=a+r.width-t.width,S=0-d,M=d+r.height-t.height,A=this._subtractOverflows(r.width,f,_),P=this._subtractOverflows(r.height,S,M),oe=A*P;return{visibleArea:oe,isCompletelyWithinViewport:r.width*r.height===oe,fitsInViewportVertically:P===r.height,fitsInViewportHorizontally:A==r.width}}_canFitWithFlexibleDimensions(o,e,t){if(this._hasFlexibleDimensions){let i=t.bottom-e.y,r=t.right-e.x,a=ro(this._overlayRef.getConfig().minHeight),d=ro(this._overlayRef.getConfig().minWidth),u=o.fitsInViewportVertically||a!=null&&a<=i,g=o.fitsInViewportHorizontally||d!=null&&d<=r;return u&&g}return!1}_pushOverlayOnScreen(o,e,t){if(this._previousPushAmount&&this._positionLocked)return{x:o.x+this._previousPushAmount.x,y:o.y+this._previousPushAmount.y};let i=ao(e),r=this._viewportRect,a=Math.max(o.x+i.width-r.width,0),d=Math.max(o.y+i.height-r.height,0),u=Math.max(r.top-t.top-o.y,0),g=Math.max(r.left-t.left-o.x,0),f=0,_=0;return i.width<=r.width?f=g||-a:f=o.x<this._getViewportMarginStart()?r.left-t.left-o.x:0,i.height<=r.height?_=u||-d:_=o.y<this._getViewportMarginTop()?r.top-t.top-o.y:0,this._previousPushAmount={x:f,y:_},{x:o.x+f,y:o.y+_}}_applyPosition(o,e){if(this._setTransformOrigin(o),this._setOverlayElementStyles(e,o),this._setBoundingBoxStyles(e,o),o.panelClass&&this._addPanelClasses(o.panelClass),this._positionChanges.observers.length){let t=this._getScrollVisibility();if(o!==this._lastPosition||!this._lastScrollVisibility||!lr(this._lastScrollVisibility,t)){let i=new Wt(o,t);this._positionChanges.next(i)}this._lastScrollVisibility=t}this._lastPosition=o,this._isInitialRender=!1}_setTransformOrigin(o){if(!this._transformOriginSelector)return;let e=this._boundingBox.querySelectorAll(this._transformOriginSelector),t,i=o.overlayY;o.overlayX==="center"?t="center":this._isRtl()?t=o.overlayX==="start"?"right":"left":t=o.overlayX==="start"?"left":"right";for(let r=0;r<e.length;r++)e[r].style.transformOrigin=`${t} ${i}`}_calculateBoundingBoxRect(o,e){let t=this._viewportRect,i=this._isRtl(),r,a,d;if(e.overlayY==="top")a=o.y,r=t.height-a+this._getViewportMarginBottom();else if(e.overlayY==="bottom")d=t.height-o.y+this._getViewportMarginTop()+this._getViewportMarginBottom(),r=t.height-d+this._getViewportMarginTop();else{let M=Math.min(t.bottom-o.y+t.top,o.y),A=this._lastBoundingBoxSize.height;r=M*2,a=o.y-M,r>A&&!this._isInitialRender&&!this._growAfterOpen&&(a=o.y-A/2)}let u=e.overlayX==="start"&&!i||e.overlayX==="end"&&i,g=e.overlayX==="end"&&!i||e.overlayX==="start"&&i,f,_,S;if(g)S=t.width-o.x+this._getViewportMarginStart()+this._getViewportMarginEnd(),f=o.x-this._getViewportMarginStart();else if(u)_=o.x,f=t.right-o.x-this._getViewportMarginEnd();else{let M=Math.min(t.right-o.x+t.left,o.x),A=this._lastBoundingBoxSize.width;f=M*2,_=o.x-M,f>A&&!this._isInitialRender&&!this._growAfterOpen&&(_=o.x-A/2)}return{top:a,left:_,bottom:d,right:S,width:f,height:r}}_setBoundingBoxStyles(o,e){let t=this._calculateBoundingBoxRect(o,e);!this._isInitialRender&&!this._growAfterOpen&&(t.height=Math.min(t.height,this._lastBoundingBoxSize.height),t.width=Math.min(t.width,this._lastBoundingBoxSize.width));let i={};if(this._hasExactPosition())i.top=i.left="0",i.bottom=i.right="auto",i.maxHeight=i.maxWidth="",i.width=i.height="100%";else{let r=this._overlayRef.getConfig().maxHeight,a=this._overlayRef.getConfig().maxWidth;i.width=$(t.width),i.height=$(t.height),i.top=$(t.top)||"auto",i.bottom=$(t.bottom)||"auto",i.left=$(t.left)||"auto",i.right=$(t.right)||"auto",e.overlayX==="center"?i.alignItems="center":i.alignItems=e.overlayX==="end"?"flex-end":"flex-start",e.overlayY==="center"?i.justifyContent="center":i.justifyContent=e.overlayY==="bottom"?"flex-end":"flex-start",r&&(i.maxHeight=$(r)),a&&(i.maxWidth=$(a))}this._lastBoundingBoxSize=t,Ye(this._boundingBox.style,i)}_resetBoundingBoxStyles(){Ye(this._boundingBox.style,{top:"0",left:"0",right:"0",bottom:"0",height:"",width:"",alignItems:"",justifyContent:""})}_resetOverlayElementStyles(){Ye(this._pane.style,{top:"",left:"",bottom:"",right:"",position:"",transform:""})}_setOverlayElementStyles(o,e){let t={},i=this._hasExactPosition(),r=this._hasFlexibleDimensions,a=this._overlayRef.getConfig();if(i){let f=this._viewportRuler.getViewportScrollPosition();Ye(t,this._getExactOverlayY(e,o,f)),Ye(t,this._getExactOverlayX(e,o,f))}else t.position="static";let d="",u=this._getOffset(e,"x"),g=this._getOffset(e,"y");u&&(d+=`translateX(${u}px) `),g&&(d+=`translateY(${g}px)`),t.transform=d.trim(),a.maxHeight&&(i?t.maxHeight=$(a.maxHeight):r&&(t.maxHeight="")),a.maxWidth&&(i?t.maxWidth=$(a.maxWidth):r&&(t.maxWidth="")),Ye(this._pane.style,t)}_getExactOverlayY(o,e,t){let i={top:"",bottom:""},r=this._getOverlayPoint(e,this._overlayRect,o);if(this._isPushed&&(r=this._pushOverlayOnScreen(r,this._overlayRect,t)),o.overlayY==="bottom"){let a=this._document.documentElement.clientHeight;i.bottom=`${a-(r.y+this._overlayRect.height)}px`}else i.top=$(r.y);return i}_getExactOverlayX(o,e,t){let i={left:"",right:""},r=this._getOverlayPoint(e,this._overlayRect,o);this._isPushed&&(r=this._pushOverlayOnScreen(r,this._overlayRect,t));let a;if(this._isRtl()?a=o.overlayX==="end"?"left":"right":a=o.overlayX==="end"?"right":"left",a==="right"){let d=this._document.documentElement.clientWidth;i.right=`${d-(r.x+this._overlayRect.width)}px`}else i.left=$(r.x);return i}_getScrollVisibility(){let o=this._getOriginRect(),e=this._pane.getBoundingClientRect(),t=this._scrollables.map(i=>i.getElementRef().nativeElement.getBoundingClientRect());return{isOriginClipped:io(o,t),isOriginOutsideView:Pi(o,t),isOverlayClipped:io(e,t),isOverlayOutsideView:Pi(e,t)}}_subtractOverflows(o,...e){return e.reduce((t,i)=>t-Math.max(i,0),o)}_getNarrowedViewportRect(){let o=this._document.documentElement.clientWidth,e=this._document.documentElement.clientHeight,t=this._viewportRuler.getViewportScrollPosition();return{top:t.top+this._getViewportMarginTop(),left:t.left+this._getViewportMarginStart(),right:t.left+o-this._getViewportMarginEnd(),bottom:t.top+e-this._getViewportMarginBottom(),width:o-this._getViewportMarginStart()-this._getViewportMarginEnd(),height:e-this._getViewportMarginTop()-this._getViewportMarginBottom()}}_isRtl(){return this._overlayRef.getDirection()==="rtl"}_hasExactPosition(){return!this._hasFlexibleDimensions||this._isPushed}_getOffset(o,e){return e==="x"?o.offsetX==null?this._offsetX:o.offsetX:o.offsetY==null?this._offsetY:o.offsetY}_validatePositions(){}_addPanelClasses(o){this._pane&&Me(o).forEach(e=>{e!==""&&this._appliedPanelClasses.indexOf(e)===-1&&(this._appliedPanelClasses.push(e),this._pane.classList.add(e))})}_clearPanelClasses(){this._pane&&(this._appliedPanelClasses.forEach(o=>{this._pane.classList.remove(o)}),this._appliedPanelClasses=[])}_getViewportMarginStart(){return typeof this._viewportMargin=="number"?this._viewportMargin:this._viewportMargin?.start??0}_getViewportMarginEnd(){return typeof this._viewportMargin=="number"?this._viewportMargin:this._viewportMargin?.end??0}_getViewportMarginTop(){return typeof this._viewportMargin=="number"?this._viewportMargin:this._viewportMargin?.top??0}_getViewportMarginBottom(){return typeof this._viewportMargin=="number"?this._viewportMargin:this._viewportMargin?.bottom??0}_getOriginRect(){let o=this._origin;if(o instanceof Y)return o.nativeElement.getBoundingClientRect();if(o instanceof Element)return o.getBoundingClientRect();let e=o.width||0,t=o.height||0;return{top:o.y,bottom:o.y+t,left:o.x,right:o.x+e,height:t,width:e}}_getContainerRect(){let o=this._overlayRef.getConfig().usePopover&&this._popoverLocation!=="global",e=this._overlayContainer.getContainerElement();o&&(e.style.display="block");let t=e.getBoundingClientRect();return o&&(e.style.display=""),t}};function Ye(n,o){for(let e in o)o.hasOwnProperty(e)&&(n[e]=o[e]);return n}function ro(n){if(typeof n!="number"&&n!=null){let[o,e]=n.split(sr);return!e||e==="px"?parseFloat(o):null}return n||null}function ao(n){return{top:Math.floor(n.top),right:Math.floor(n.right),bottom:Math.floor(n.bottom),left:Math.floor(n.left),width:Math.floor(n.width),height:Math.floor(n.height)}}function lr(n,o){return n===o?!0:n.isOriginClipped===o.isOriginClipped&&n.isOriginOutsideView===o.isOriginOutsideView&&n.isOverlayClipped===o.isOverlayClipped&&n.isOverlayOutsideView===o.isOverlayOutsideView}var so="cdk-global-overlay-wrapper";function go(n){return new $t}var $t=class{_overlayRef;_cssPosition="static";_topOffset="";_bottomOffset="";_alignItems="";_xPosition="";_xOffset="";_width="";_height="";_isDisposed=!1;attach(o){let e=o.getConfig();this._overlayRef=o,this._width&&!e.width&&o.updateSize({width:this._width}),this._height&&!e.height&&o.updateSize({height:this._height}),o.hostElement.classList.add(so),this._isDisposed=!1}top(o=""){return this._bottomOffset="",this._topOffset=o,this._alignItems="flex-start",this}left(o=""){return this._xOffset=o,this._xPosition="left",this}bottom(o=""){return this._topOffset="",this._bottomOffset=o,this._alignItems="flex-end",this}right(o=""){return this._xOffset=o,this._xPosition="right",this}start(o=""){return this._xOffset=o,this._xPosition="start",this}end(o=""){return this._xOffset=o,this._xPosition="end",this}width(o=""){return this._overlayRef?this._overlayRef.updateSize({width:o}):this._width=o,this}height(o=""){return this._overlayRef?this._overlayRef.updateSize({height:o}):this._height=o,this}centerHorizontally(o=""){return this.left(o),this._xPosition="center",this}centerVertically(o=""){return this.top(o),this._alignItems="center",this}apply(){if(!this._overlayRef||!this._overlayRef.hasAttached())return;let o=this._overlayRef.overlayElement.style,e=this._overlayRef.hostElement.style,t=this._overlayRef.getConfig(),{width:i,height:r,maxWidth:a,maxHeight:d}=t,u=(i==="100%"||i==="100vw")&&(!a||a==="100%"||a==="100vw"),g=(r==="100%"||r==="100vh")&&(!d||d==="100%"||d==="100vh"),f=this._xPosition,_=this._xOffset,S=this._overlayRef.getConfig().direction==="rtl",M="",A="",P="";u?P="flex-start":f==="center"?(P="center",S?A=_:M=_):S?f==="left"||f==="end"?(P="flex-end",M=_):(f==="right"||f==="start")&&(P="flex-start",A=_):f==="left"||f==="start"?(P="flex-start",M=_):(f==="right"||f==="end")&&(P="flex-end",A=_),o.position=this._cssPosition,o.marginLeft=u?"0":M,o.marginTop=g?"0":this._topOffset,o.marginBottom=this._bottomOffset,o.marginRight=u?"0":A,e.justifyContent=P,e.alignItems=g?"flex-start":this._alignItems}dispose(){if(this._isDisposed||!this._overlayRef)return;let o=this._overlayRef.overlayElement.style,e=this._overlayRef.hostElement,t=e.style;e.classList.remove(so),t.justifyContent=t.alignItems=o.marginTop=o.marginBottom=o.marginLeft=o.marginRight=o.position="",this._overlayRef=null,this._isDisposed=!0}},vo=(()=>{class n{_injector=h(Z);constructor(){}global(){return go()}flexibleConnectedTo(e){return Kt(this._injector,e)}static \u0275fac=function(t){return new(t||n)};static \u0275prov=I({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),bo=new F("OVERLAY_DEFAULT_CONFIG");function Qt(n,o){n.get(fe).load(fo);let e=n.get(_o),t=n.get(J),i=n.get(_e),r=n.get(ct),a=n.get(Ue),d=n.get(Ne,null,{optional:!0})||n.get(pe).createRenderer(null,null),u=new et(o),g=n.get(bo,null,{optional:!0})?.usePopover??!0;u.direction=u.direction||a.value,"showPopover"in t.body?u.usePopover=o?.usePopover??g:u.usePopover=!1;let f=t.createElement("div"),_=t.createElement("div");f.id=i.getId("cdk-overlay-"),f.classList.add("cdk-overlay-pane"),_.appendChild(f),u.usePopover&&(_.setAttribute("popover","manual"),_.classList.add("cdk-overlay-popover"));let S=u.usePopover?u.positionStrategy?.getPopoverInsertionPoint?.():null;return Fi(S)?S.after(_):S?.type==="parent"?S.element.appendChild(_):e.getContainerElement().appendChild(_),new Yt(new Bt(f,r,n),_,f,u,n.get(B),n.get(ho),t,n.get(ln),n.get(uo),o?.disableAnimations??n.get(Et,null,{optional:!0})==="NoopAnimations",n.get(Te),d)}var yo=(()=>{class n{scrollStrategies=h(po);_positionBuilder=h(vo);_injector=h(Z);constructor(){}create(e){return Qt(this._injector,e)}position(){return this._positionBuilder}static \u0275fac=function(t){return new(t||n)};static \u0275prov=I({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var Ai=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275mod=q({type:n});static \u0275inj=W({providers:[yo],imports:[ee,eo,Ei,Ei]})}return n})();var xo=new F("MatFormField");var Xt=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275mod=q({type:n});static \u0275inj=W({imports:[ee]})}return n})();var Co=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275mod=q({type:n});static \u0275inj=W({imports:[ee]})}return n})();var Li=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275mod=q({type:n});static \u0275inj=W({imports:[Xt,Co,Ze,ee]})}return n})();var cr=["panel"],dr=["*"];function pr(n,o){if(n&1&&(Ve(0,"div",1,0),te(2),ze()),n&2){let e=o.id,t=m();pt(t._classList),E("mat-mdc-autocomplete-visible",t.showPanel)("mat-mdc-autocomplete-hidden",!t.showPanel)("mat-autocomplete-panel-animations-enabled",!t._animationsDisabled)("mat-primary",t._color==="primary")("mat-accent",t._color==="accent")("mat-warn",t._color==="warn"),Ee("id",t.id),ne("aria-label",t.ariaLabel||null)("aria-labelledby",t._getPanelAriaLabelledby(e))}}var Ni=class{source;option;constructor(o,e){this.source=o,this.option=e}},ko=new F("mat-autocomplete-default-options",{providedIn:"root",factory:()=>({autoActiveFirstOption:!1,autoSelectActiveOption:!1,hideSingleSelectionIndicator:!1,requireSelection:!1,hasBackdrop:!1})}),So=(()=>{class n{_changeDetectorRef=h(xe);_elementRef=h(Y);_defaults=h(ko);_animationsDisabled=ge();_activeOptionChanges=ve.EMPTY;_keyManager;showPanel=!1;get isOpen(){return this._isOpen&&this.showPanel}_isOpen=!1;_latestOpeningTrigger;_setColor(e){this._color=e,this._changeDetectorRef.markForCheck()}_color;template;panel;options;optionGroups;ariaLabel;ariaLabelledby;displayWith=null;autoActiveFirstOption;autoSelectActiveOption;requireSelection;panelWidth;disableRipple=!1;optionSelected=new Q;opened=new Q;closed=new Q;optionActivated=new Q;set classList(e){this._classList=e,this._elementRef.nativeElement.className=""}_classList;get hideSingleSelectionIndicator(){return this._hideSingleSelectionIndicator}set hideSingleSelectionIndicator(e){this._hideSingleSelectionIndicator=e,this._syncParentProperties()}_hideSingleSelectionIndicator;_syncParentProperties(){if(this.options)for(let e of this.options)e._changeDetectorRef.markForCheck()}id=h(_e).getId("mat-autocomplete-");inertGroups;constructor(){let e=h(X);this.inertGroups=e?.SAFARI||!1,this.autoActiveFirstOption=!!this._defaults.autoActiveFirstOption,this.autoSelectActiveOption=!!this._defaults.autoSelectActiveOption,this.requireSelection=!!this._defaults.requireSelection,this._hideSingleSelectionIndicator=this._defaults.hideSingleSelectionIndicator??!1}ngAfterContentInit(){this._keyManager=new _t(this.options).withWrap().skipPredicate(this._skipPredicate),this._activeOptionChanges=this._keyManager.change.subscribe(e=>{this.isOpen&&this.optionActivated.emit({source:this,option:this.options.toArray()[e]||null})}),this._setVisibility()}ngOnDestroy(){this._keyManager?.destroy(),this._activeOptionChanges.unsubscribe()}_setScrollTop(e){this.panel&&(this.panel.nativeElement.scrollTop=e)}_getScrollTop(){return this.panel?this.panel.nativeElement.scrollTop:0}_setVisibility(){this.showPanel=!!this.options?.length,this._changeDetectorRef.markForCheck()}_emitSelectEvent(e){let t=new Ni(this,e);this.optionSelected.emit(t)}_getPanelAriaLabelledby(e){if(this.ariaLabel)return null;let t=e?e+" ":"";return this.ariaLabelledby?t+this.ariaLabelledby:e}_skipPredicate(){return!1}static \u0275fac=function(t){return new(t||n)};static \u0275cmp=j({type:n,selectors:[["mat-autocomplete"]],contentQueries:function(t,i,r){if(t&1&&$e(r,Ze,5)(r,Mi,5),t&2){let a;G(a=K())&&(i.options=a),G(a=K())&&(i.optionGroups=a)}},viewQuery:function(t,i){if(t&1&&Be(at,7)(cr,5),t&2){let r;G(r=K())&&(i.template=r.first),G(r=K())&&(i.panel=r.first)}},hostAttrs:[1,"mat-mdc-autocomplete"],inputs:{ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],displayWith:"displayWith",autoActiveFirstOption:[2,"autoActiveFirstOption","autoActiveFirstOption",V],autoSelectActiveOption:[2,"autoSelectActiveOption","autoSelectActiveOption",V],requireSelection:[2,"requireSelection","requireSelection",V],panelWidth:"panelWidth",disableRipple:[2,"disableRipple","disableRipple",V],classList:[0,"class","classList"],hideSingleSelectionIndicator:[2,"hideSingleSelectionIndicator","hideSingleSelectionIndicator",V]},outputs:{optionSelected:"optionSelected",opened:"opened",closed:"closed",optionActivated:"optionActivated"},exportAs:["matAutocomplete"],features:[ye([{provide:Si,useExisting:n}])],ngContentSelectors:dr,decls:1,vars:0,consts:[["panel",""],["role","listbox",1,"mat-mdc-autocomplete-panel","mdc-menu-surface","mdc-menu-surface--open",3,"id"]],template:function(t,i){t&1&&(me(),an(0,pr,3,17,"ng-template"))},styles:[`div.mat-mdc-autocomplete-panel {
  width: 100%;
  max-height: 256px;
  visibility: hidden;
  transform-origin: center top;
  overflow: auto;
  padding: 8px 0;
  box-sizing: border-box;
  position: relative;
  border-radius: var(--mat-autocomplete-container-shape, var(--mat-sys-corner-extra-small));
  box-shadow: var(--mat-autocomplete-container-elevation-shadow, 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12));
  background-color: var(--mat-autocomplete-background-color, var(--mat-sys-surface-container));
}
@media (forced-colors: active) {
  div.mat-mdc-autocomplete-panel {
    outline: solid 1px;
  }
}
.cdk-overlay-pane:not(.mat-mdc-autocomplete-panel-above) div.mat-mdc-autocomplete-panel {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
.mat-mdc-autocomplete-panel-above div.mat-mdc-autocomplete-panel {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  transform-origin: center bottom;
}
div.mat-mdc-autocomplete-panel.mat-mdc-autocomplete-visible {
  visibility: visible;
}

div.mat-mdc-autocomplete-panel.mat-mdc-autocomplete-hidden,
.cdk-overlay-pane:has(> .mat-mdc-autocomplete-hidden) {
  visibility: hidden;
  pointer-events: none;
}

@keyframes _mat-autocomplete-enter {
  from {
    opacity: 0;
    transform: scaleY(0.8);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
.mat-autocomplete-panel-animations-enabled {
  animation: _mat-autocomplete-enter 120ms cubic-bezier(0, 0, 0.2, 1);
}

mat-autocomplete {
  display: none;
}
`],encapsulation:2,changeDetection:0})}return n})();var mr={provide:Pt,useExisting:nt(()=>Vi),multi:!0};var hr=new F("mat-autocomplete-scroll-strategy",{providedIn:"root",factory:()=>{let n=h(Z);return()=>Gt(n)}}),Vi=(()=>{class n{_environmentInjector=h(Te);_element=h(Y);_injector=h(Z);_viewContainerRef=h(st);_zone=h(B);_changeDetectorRef=h(xe);_dir=h(Ue,{optional:!0});_formField=h(xo,{optional:!0,host:!0});_viewportRuler=h(We);_scrollStrategy=h(hr);_renderer=h(Ne);_animationsDisabled=ge();_defaults=h(ko,{optional:!0});_overlayRef=null;_portal;_componentDestroyed=!1;_initialized=new D;_keydownSubscription;_outsideClickSubscription;_cleanupWindowBlur;_previousValue=null;_valueOnAttach=null;_valueOnLastKeydown=null;_positionStrategy;_manuallyFloatingLabel=!1;_closingActionsSubscription;_viewportSubscription=ve.EMPTY;_breakpointObserver=h(gi);_handsetLandscapeSubscription=ve.EMPTY;_canOpenOnNextFocus=!0;_valueBeforeAutoSelection;_pendingAutoselectedOption=null;_closeKeyEventStream=new D;_overlayPanelClass=Me(this._defaults?.overlayPanelClass||[]);_windowBlurHandler=()=>{this._canOpenOnNextFocus=this.panelOpen||!this._hasFocus()};_onChange=()=>{};_onTouched=()=>{};autocomplete;position="auto";connectedTo;autocompleteAttribute="off";autocompleteDisabled=!1;constructor(){}_aboveClass="mat-mdc-autocomplete-panel-above";ngAfterViewInit(){this._initialized.next(),this._initialized.complete(),this._cleanupWindowBlur=this._renderer.listen("window","blur",this._windowBlurHandler)}ngOnChanges(e){e.position&&this._positionStrategy&&(this._setStrategyPositions(this._positionStrategy),this.panelOpen&&this._overlayRef.updatePosition())}ngOnDestroy(){this._cleanupWindowBlur?.(),this._handsetLandscapeSubscription.unsubscribe(),this._viewportSubscription.unsubscribe(),this._componentDestroyed=!0,this._destroyPanel(),this._closeKeyEventStream.complete(),this._clearFromModal()}get panelOpen(){return this._overlayAttached&&this.autocomplete.showPanel}_overlayAttached=!1;openPanel(){this._openPanelInternal()}closePanel(){this._resetLabel(),this._overlayAttached&&(this.panelOpen&&this._zone.run(()=>{this.autocomplete.closed.emit()}),this.autocomplete._latestOpeningTrigger===this&&(this.autocomplete._isOpen=!1,this.autocomplete._latestOpeningTrigger=null),this._overlayAttached=!1,this._pendingAutoselectedOption=null,this._overlayRef&&this._overlayRef.hasAttached()&&(this._overlayRef.detach(),this._closingActionsSubscription.unsubscribe()),this._updatePanelState(),this._componentDestroyed||this._changeDetectorRef.detectChanges(),this._trackedModal&&Vt(this._trackedModal,"aria-owns",this.autocomplete.id))}updatePosition(){this._overlayAttached&&this._overlayRef.updatePosition()}get panelClosingActions(){return Re(this.optionSelections,this.autocomplete._keyManager.tabOut.pipe(ke(()=>this._overlayAttached)),this._closeKeyEventStream,this._getOutsideClickStream(),this._overlayRef?this._overlayRef.detachments().pipe(ke(()=>this._overlayAttached)):we()).pipe(Pe(e=>e instanceof Ct?e:null))}optionSelections=Xi(()=>{let e=this.autocomplete?this.autocomplete.options:null;return e?e.changes.pipe(be(e),Fe(()=>Re(...e.map(t=>t.onSelectionChange)))):this._initialized.pipe(Fe(()=>this.optionSelections))});get activeOption(){return this.autocomplete&&this.autocomplete._keyManager?this.autocomplete._keyManager.activeItem:null}_getOutsideClickStream(){return new De(e=>{let t=r=>{let a=ie(r),d=this._formField?this._formField.getConnectedOverlayOrigin().nativeElement:null,u=this.connectedTo?this.connectedTo.elementRef.nativeElement:null;this._overlayAttached&&a!==this._element.nativeElement&&!this._hasFocus()&&(!d||!d.contains(a))&&(!u||!u.contains(a))&&this._overlayRef&&!this._overlayRef.overlayElement.contains(a)&&e.next(r)},i=[this._renderer.listen("document","click",t),this._renderer.listen("document","auxclick",t),this._renderer.listen("document","touchend",t)];return()=>{i.forEach(r=>r())}})}writeValue(e){Promise.resolve(null).then(()=>this._assignOptionValue(e))}registerOnChange(e){this._onChange=e}registerOnTouched(e){this._onTouched=e}setDisabledState(e){this._element.nativeElement.disabled=e}_handleKeydown(e){let t=e,i=t.keyCode,r=Ie(t);if(i===27&&!r&&t.preventDefault(),this._valueOnLastKeydown=this._element.nativeElement.value,this.activeOption&&i===13&&this.panelOpen&&!r)this.activeOption._selectViaInteraction(),this._resetActiveItem(),t.preventDefault();else if(this.autocomplete){let a=this.autocomplete._keyManager.activeItem,d=i===38||i===40;i===9||d&&!r&&this.panelOpen?this.autocomplete._keyManager.onKeydown(t):d&&this._canOpen()&&this._openPanelInternal(this._valueOnLastKeydown),(d||this.autocomplete._keyManager.activeItem!==a)&&(this._scrollToOption(this.autocomplete._keyManager.activeItemIndex||0),this.autocomplete.autoSelectActiveOption&&this.activeOption&&(this._pendingAutoselectedOption||(this._valueBeforeAutoSelection=this._valueOnLastKeydown),this._pendingAutoselectedOption=this.activeOption,this._assignOptionValue(this.activeOption.value)))}}_handleInput(e){let t=e.target,i=t.value;if(t.type==="number"&&(i=i==""?null:parseFloat(i)),this._previousValue!==i){if(this._previousValue=i,this._pendingAutoselectedOption=null,(!this.autocomplete||!this.autocomplete.requireSelection)&&this._onChange(i),!i)this._clearPreviousSelectedOption(null,!1);else if(this.panelOpen&&!this.autocomplete.requireSelection){let r=this.autocomplete.options?.find(a=>a.selected);if(r){let a=this._getDisplayValue(r.value);i!==a&&r.deselect(!1)}}if(this._canOpen()&&this._hasFocus()){let r=this._valueOnLastKeydown??this._element.nativeElement.value;this._valueOnLastKeydown=null,this._openPanelInternal(r)}}}_handleFocus(){this._canOpenOnNextFocus?this._canOpen()&&(this._previousValue=this._element.nativeElement.value,this._attachOverlay(this._previousValue),this._floatLabel(!0)):this._canOpenOnNextFocus=!0}_handleClick(){this._canOpen()&&!this.panelOpen&&this._openPanelInternal()}_hasFocus(){return hi()===this._element.nativeElement}_floatLabel(e=!1){this._formField&&this._formField.floatLabel==="auto"&&(e?this._formField._animateAndLockLabel():this._formField.floatLabel="always",this._manuallyFloatingLabel=!0)}_resetLabel(){this._manuallyFloatingLabel&&(this._formField&&(this._formField.floatLabel="auto"),this._manuallyFloatingLabel=!1)}_subscribeToClosingActions(){let e=new De(i=>{Le(()=>{i.next()},{injector:this._environmentInjector})}),t=this.autocomplete.options?.changes.pipe(de(()=>this._positionStrategy.reapplyLastPosition()),Ji(0))??we();return Re(e,t).pipe(Fe(()=>this._zone.run(()=>{let i=this.panelOpen;return this._resetActiveItem(),this._updatePanelState(),this._changeDetectorRef.detectChanges(),this.panelOpen&&this._overlayRef.updatePosition(),i!==this.panelOpen&&(this.panelOpen?this._emitOpened():this.autocomplete.closed.emit()),this.panelClosingActions})),Mt(1)).subscribe(i=>this._setValueAndClose(i))}_emitOpened(){this.autocomplete.opened.emit()}_destroyPanel(){this._overlayRef&&(this.closePanel(),this._overlayRef.dispose(),this._overlayRef=null)}_getDisplayValue(e){let t=this.autocomplete;return t&&t.displayWith?t.displayWith(e):e}_assignOptionValue(e){let t=this._getDisplayValue(e);e==null&&this._clearPreviousSelectedOption(null,!1),this._updateNativeInputValue(t??"")}_updateNativeInputValue(e){this._formField?this._formField._control.value=e:this._element.nativeElement.value=e,this._previousValue=e}_setValueAndClose(e){let t=this.autocomplete,i=e?e.source:this._pendingAutoselectedOption;i?(this._clearPreviousSelectedOption(i),this._assignOptionValue(i.value),this._onChange(i.value),t._emitSelectEvent(i),this._element.nativeElement.focus()):t.requireSelection&&this._element.nativeElement.value!==this._valueOnAttach&&(this._clearPreviousSelectedOption(null),this._assignOptionValue(null),this._onChange(null)),this.closePanel()}_clearPreviousSelectedOption(e,t){this.autocomplete?.options?.forEach(i=>{i!==e&&i.selected&&i.deselect(t)})}_openPanelInternal(e=this._element.nativeElement.value){if(this._attachOverlay(e),this._floatLabel(),this._trackedModal){let t=this.autocomplete.id;xi(this._trackedModal,"aria-owns",t)}}_attachOverlay(e){if(!this.autocomplete)return;let t=this._overlayRef;t?(this._positionStrategy.setOrigin(this._getConnectedElement()),t.updateSize({width:this._getPanelWidth()})):(this._portal=new Je(this.autocomplete.template,this._viewContainerRef,{id:this._formField?.getLabelId()}),t=Qt(this._injector,this._getOverlayConfig()),this._overlayRef=t,this._viewportSubscription=this._viewportRuler.change().subscribe(()=>{this.panelOpen&&t&&t.updateSize({width:this._getPanelWidth()})}),this._handsetLandscapeSubscription=this._breakpointObserver.observe(Hn.HandsetLandscape).subscribe(r=>{r.matches?this._positionStrategy.withFlexibleDimensions(!0).withGrowAfterOpen(!0).withViewportMargin(8):this._positionStrategy.withFlexibleDimensions(!1).withGrowAfterOpen(!1).withViewportMargin(0)})),t&&!t.hasAttached()&&(t.attach(this._portal),this._valueOnAttach=e,this._valueOnLastKeydown=null,this._closingActionsSubscription=this._subscribeToClosingActions());let i=this.panelOpen;this.autocomplete._isOpen=this._overlayAttached=!0,this.autocomplete._latestOpeningTrigger=this,this.autocomplete._setColor(this._formField?.color),this._updatePanelState(),this._applyModalPanelOwnership(),this.panelOpen&&i!==this.panelOpen&&this._emitOpened()}_handlePanelKeydown=e=>{(e.keyCode===27&&!Ie(e)||e.keyCode===38&&Ie(e,"altKey"))&&(this._pendingAutoselectedOption&&(this._updateNativeInputValue(this._valueBeforeAutoSelection??""),this._pendingAutoselectedOption=null),this._closeKeyEventStream.next(),this._resetActiveItem(),e.stopPropagation(),e.preventDefault())};_updatePanelState(){if(this.autocomplete._setVisibility(),this.panelOpen){let e=this._overlayRef;this._keydownSubscription||(this._keydownSubscription=e.keydownEvents().subscribe(this._handlePanelKeydown)),this._outsideClickSubscription||(this._outsideClickSubscription=e.outsidePointerEvents().subscribe())}else this._keydownSubscription?.unsubscribe(),this._outsideClickSubscription?.unsubscribe(),this._keydownSubscription=this._outsideClickSubscription=void 0}_getOverlayConfig(){return new et({positionStrategy:this._getOverlayPosition(),scrollStrategy:this._scrollStrategy(),width:this._getPanelWidth(),direction:this._dir??void 0,hasBackdrop:this._defaults?.hasBackdrop,backdropClass:this._defaults?.backdropClass||"cdk-overlay-transparent-backdrop",panelClass:this._overlayPanelClass,disableAnimations:this._animationsDisabled})}_getOverlayPosition(){let e=Kt(this._injector,this._getConnectedElement()).withFlexibleDimensions(!1).withPush(!1).withPopoverLocation("inline");return this._setStrategyPositions(e),this._positionStrategy=e,e}_setStrategyPositions(e){let t=[{originX:"start",originY:"bottom",overlayX:"start",overlayY:"top"},{originX:"end",originY:"bottom",overlayX:"end",overlayY:"top"}],i=this._aboveClass,r=[{originX:"start",originY:"top",overlayX:"start",overlayY:"bottom",panelClass:i},{originX:"end",originY:"top",overlayX:"end",overlayY:"bottom",panelClass:i}],a;this.position==="above"?a=r:this.position==="below"?a=t:a=[...t,...r],e.withPositions(a)}_getConnectedElement(){return this.connectedTo?this.connectedTo.elementRef:this._formField?this._formField.getConnectedOverlayOrigin():this._element}_getPanelWidth(){return this.autocomplete.panelWidth||this._getHostWidth()}_getHostWidth(){return this._getConnectedElement().nativeElement.getBoundingClientRect().width}_resetActiveItem(){let e=this.autocomplete;if(e.autoActiveFirstOption){let t=-1;for(let i=0;i<e.options.length;i++)if(!e.options.get(i).disabled){t=i;break}e._keyManager.setActiveItem(t)}else e._keyManager.setActiveItem(-1)}_canOpen(){let e=this._element.nativeElement;return!e.readOnly&&!e.disabled&&!this.autocompleteDisabled}_scrollToOption(e){let t=this.autocomplete,i=Xn(e,t.options,t.optionGroups);if(e===0&&i===1)t._setScrollTop(0);else if(t.panel){let r=t.options.toArray()[e];if(r){let a=r._getHostElement(),d=Zn(a.offsetTop,a.offsetHeight,t._getScrollTop(),t.panel.nativeElement.offsetHeight);t._setScrollTop(d)}}}_trackedModal=null;_applyModalPanelOwnership(){let e=this._element.nativeElement.closest('body > .cdk-overlay-container [aria-modal="true"]');if(!e)return;let t=this.autocomplete.id;this._trackedModal&&Vt(this._trackedModal,"aria-owns",t),xi(e,"aria-owns",t),this._trackedModal=e}_clearFromModal(){if(this._trackedModal){let e=this.autocomplete.id;Vt(this._trackedModal,"aria-owns",e),this._trackedModal=null}}static \u0275fac=function(t){return new(t||n)};static \u0275dir=ae({type:n,selectors:[["input","matAutocomplete",""],["textarea","matAutocomplete",""]],hostAttrs:[1,"mat-mdc-autocomplete-trigger"],hostVars:7,hostBindings:function(t,i){t&1&&y("focusin",function(){return i._handleFocus()})("blur",function(){return i._onTouched()})("input",function(a){return i._handleInput(a)})("keydown",function(a){return i._handleKeydown(a)})("click",function(){return i._handleClick()}),t&2&&ne("autocomplete",i.autocompleteAttribute)("role",i.autocompleteDisabled?null:"combobox")("aria-autocomplete",i.autocompleteDisabled?null:"list")("aria-activedescendant",i.panelOpen&&i.activeOption?i.activeOption.id:null)("aria-expanded",i.autocompleteDisabled?null:i.panelOpen.toString())("aria-controls",i.autocompleteDisabled||!i.panelOpen||i.autocomplete==null?null:i.autocomplete.id)("aria-haspopup",i.autocompleteDisabled?null:"listbox")},inputs:{autocomplete:[0,"matAutocomplete","autocomplete"],position:[0,"matAutocompletePosition","position"],connectedTo:[0,"matAutocompleteConnectedTo","connectedTo"],autocompleteAttribute:[0,"autocomplete","autocompleteAttribute"],autocompleteDisabled:[2,"matAutocompleteDisabled","autocompleteDisabled",V]},exportAs:["matAutocompleteTrigger"],features:[ye([mr]),ot]})}return n})(),Mo=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275mod=q({type:n});static \u0275inj=W({imports:[Ai,Li,zt,Li,ee]})}return n})();var fr={capture:!0},_r=["focus","mousedown","mouseenter","touchstart"],zi="mat-ripple-loader-uninitialized",Bi="mat-ripple-loader-class-name",To="mat-ripple-loader-centered",Zt="mat-ripple-loader-disabled",Eo=(()=>{class n{_document=h(J);_animationsDisabled=ge();_globalRippleOptions=h(yt,{optional:!0});_platform=h(X);_ngZone=h(B);_injector=h(Z);_eventCleanups;_hosts=new Map;constructor(){let e=h(pe).createRenderer(null,null);this._eventCleanups=this._ngZone.runOutsideAngular(()=>_r.map(t=>e.listen(this._document,t,this._onInteraction,fr)))}ngOnDestroy(){let e=this._hosts.keys();for(let t of e)this.destroyRipple(t);this._eventCleanups.forEach(t=>t())}configureRipple(e,t){e.setAttribute(zi,this._globalRippleOptions?.namespace??""),(t.className||!e.hasAttribute(Bi))&&e.setAttribute(Bi,t.className||""),t.centered&&e.setAttribute(To,""),t.disabled&&e.setAttribute(Zt,"")}setDisabled(e,t){let i=this._hosts.get(e);i?(i.target.rippleDisabled=t,!t&&!i.hasSetUpEvents&&(i.hasSetUpEvents=!0,i.renderer.setupTriggerEvents(e))):t?e.setAttribute(Zt,""):e.removeAttribute(Zt)}_onInteraction=e=>{let t=ie(e);if(t instanceof HTMLElement){let i=t.closest(`[${zi}="${this._globalRippleOptions?.namespace??""}"]`);i&&this._createRipple(i)}};_createRipple(e){if(!this._document||this._hosts.has(e))return;e.querySelector(".mat-ripple")?.remove();let t=this._document.createElement("span");t.classList.add("mat-ripple",e.getAttribute(Bi)),e.append(t);let i=this._globalRippleOptions,r=this._animationsDisabled?0:i?.animation?.enterDuration??vt.enterDuration,a=this._animationsDisabled?0:i?.animation?.exitDuration??vt.exitDuration,d={rippleDisabled:this._animationsDisabled||i?.disabled||e.hasAttribute(Zt),rippleConfig:{centered:e.hasAttribute(To),terminateOnPointerUp:i?.terminateOnPointerUp,animation:{enterDuration:r,exitDuration:a}}},u=new bt(d,this._ngZone,t,this._platform,this._injector),g=!d.rippleDisabled;g&&u.setupTriggerEvents(e),this._hosts.set(e,{target:d,renderer:u,hasSetUpEvents:g}),e.removeAttribute(zi)}destroyRipple(e){let t=this._hosts.get(e);t&&(t.renderer._removeTriggerEvents(),this._hosts.delete(e))}static \u0275fac=function(t){return new(t||n)};static \u0275prov=I({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var Oo=(()=>{class n{isErrorState(e,t){return!!(e&&e.invalid&&(e.touched||t&&t.submitted))}static \u0275fac=function(t){return new(t||n)};static \u0275prov=I({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var Fo=["*",[["mat-chip-avatar"],["","matChipAvatar",""]],[["mat-chip-trailing-icon"],["","matChipRemove",""],["","matChipTrailingIcon",""]]],Ao=["*","mat-chip-avatar, [matChipAvatar]","mat-chip-trailing-icon,[matChipRemove],[matChipTrailingIcon]"];function gr(n,o){n&1&&(s(0,"span",3),te(1,1),l())}function vr(n,o){n&1&&(s(0,"span",6),te(1,2),l())}function br(n,o){n&1&&(s(0,"span",3),te(1,1),s(2,"span",7),en(),s(3,"svg",8),U(4,"path",9),l()()())}function yr(n,o){n&1&&(s(0,"span",6),te(1,2),l())}var xr=`.mdc-evolution-chip,
.mdc-evolution-chip__cell,
.mdc-evolution-chip__action {
  display: inline-flex;
  align-items: center;
}

.mdc-evolution-chip {
  position: relative;
  max-width: 100%;
}

.mdc-evolution-chip__cell,
.mdc-evolution-chip__action {
  height: 100%;
}

.mdc-evolution-chip__cell--primary {
  flex-basis: 100%;
  overflow-x: hidden;
}

.mdc-evolution-chip__cell--trailing {
  flex: 1 0 auto;
}

.mdc-evolution-chip__action {
  align-items: center;
  background: none;
  border: none;
  box-sizing: content-box;
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  outline: none;
  padding: 0;
  text-decoration: none;
  color: inherit;
}

.mdc-evolution-chip__action--presentational {
  cursor: auto;
}

.mdc-evolution-chip--disabled,
.mdc-evolution-chip__action:disabled {
  pointer-events: none;
}
@media (forced-colors: active) {
  .mdc-evolution-chip--disabled,
  .mdc-evolution-chip__action:disabled {
    forced-color-adjust: none;
  }
}

.mdc-evolution-chip__action--primary {
  font: inherit;
  letter-spacing: inherit;
  white-space: inherit;
  overflow-x: hidden;
}
.mat-mdc-standard-chip .mdc-evolution-chip__action--primary::before {
  border-width: var(--mat-chip-outline-width, 1px);
  border-radius: var(--mat-chip-container-shape-radius, 8px);
  box-sizing: border-box;
  content: "";
  height: 100%;
  left: 0;
  position: absolute;
  pointer-events: none;
  top: 0;
  width: 100%;
  z-index: 1;
  border-style: solid;
}
.mat-mdc-standard-chip .mdc-evolution-chip__action--primary {
  padding-left: 12px;
  padding-right: 12px;
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 12px;
}
[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary {
  padding-left: 12px;
  padding-right: 0;
}
.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__action--primary::before {
  border-color: var(--mat-chip-outline-color, var(--mat-sys-outline));
}
.mdc-evolution-chip__action--primary:not(.mdc-evolution-chip__action--presentational):not(.mdc-ripple-upgraded):focus::before {
  border-color: var(--mat-chip-focus-outline-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__action--primary::before {
  border-color: var(--mat-chip-disabled-outline-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mat-mdc-standard-chip.mdc-evolution-chip--selected .mdc-evolution-chip__action--primary::before {
  border-width: var(--mat-chip-flat-selected-outline-width, 0);
}
.mat-mdc-basic-chip .mdc-evolution-chip__action--primary {
  font: inherit;
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-leading-action .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 12px;
}
[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-leading-action .mdc-evolution-chip__action--primary {
  padding-left: 12px;
  padding-right: 0;
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {
  padding-left: 12px;
  padding-right: 0;
}
[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 12px;
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-leading-action.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 0;
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 0;
}
[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 0;
}
.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 12px;
}
[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary {
  padding-left: 12px;
  padding-right: 0;
}
.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 0;
}
[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 0;
}

.mdc-evolution-chip__action--secondary {
  position: relative;
  overflow: visible;
}
.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__action--secondary {
  color: var(--mat-chip-with-trailing-icon-trailing-icon-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__action--secondary {
  color: var(--mat-chip-with-trailing-icon-disabled-trailing-icon-color, var(--mat-sys-on-surface));
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--secondary {
  padding-left: 8px;
  padding-right: 8px;
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--secondary {
  padding-left: 8px;
  padding-right: 8px;
}
.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--secondary {
  padding-left: 8px;
  padding-right: 8px;
}
[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--secondary {
  padding-left: 8px;
  padding-right: 8px;
}

.mdc-evolution-chip__text-label {
  -webkit-user-select: none;
  user-select: none;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.mat-mdc-standard-chip .mdc-evolution-chip__text-label {
  font-family: var(--mat-chip-label-text-font, var(--mat-sys-label-large-font));
  line-height: var(--mat-chip-label-text-line-height, var(--mat-sys-label-large-line-height));
  font-size: var(--mat-chip-label-text-size, var(--mat-sys-label-large-size));
  font-weight: var(--mat-chip-label-text-weight, var(--mat-sys-label-large-weight));
  letter-spacing: var(--mat-chip-label-text-tracking, var(--mat-sys-label-large-tracking));
}
.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__text-label {
  color: var(--mat-chip-label-text-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-standard-chip.mdc-evolution-chip--selected:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__text-label {
  color: var(--mat-chip-selected-label-text-color, var(--mat-sys-on-secondary-container));
}
.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__text-label, .mat-mdc-standard-chip.mdc-evolution-chip--selected.mdc-evolution-chip--disabled .mdc-evolution-chip__text-label {
  color: var(--mat-chip-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}

.mdc-evolution-chip__graphic {
  align-items: center;
  display: inline-flex;
  justify-content: center;
  overflow: hidden;
  pointer-events: none;
  position: relative;
  flex: 1 0 auto;
}
.mat-mdc-standard-chip .mdc-evolution-chip__graphic {
  width: var(--mat-chip-with-avatar-avatar-size, 24px);
  height: var(--mat-chip-with-avatar-avatar-size, 24px);
  font-size: var(--mat-chip-with-avatar-avatar-size, 24px);
}
.mdc-evolution-chip--selecting .mdc-evolution-chip__graphic {
  transition: width 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mdc-evolution-chip--selectable:not(.mdc-evolution-chip--selected):not(.mdc-evolution-chip--with-primary-icon) .mdc-evolution-chip__graphic {
  width: 0;
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic {
  padding-left: 6px;
  padding-right: 6px;
}
.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic {
  padding-left: 4px;
  padding-right: 8px;
}
[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic {
  padding-left: 8px;
  padding-right: 4px;
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic {
  padding-left: 6px;
  padding-right: 6px;
}
.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic {
  padding-left: 4px;
  padding-right: 8px;
}
[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic {
  padding-left: 8px;
  padding-right: 4px;
}
.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-leading-action .mdc-evolution-chip__graphic {
  padding-left: 0;
}

.mdc-evolution-chip__checkmark {
  position: absolute;
  opacity: 0;
  top: 50%;
  left: 50%;
  height: 20px;
  width: 20px;
}
.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__checkmark {
  color: var(--mat-chip-with-icon-selected-icon-color, var(--mat-sys-on-secondary-container));
}
.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__checkmark {
  color: var(--mat-chip-with-icon-disabled-icon-color, var(--mat-sys-on-surface));
}
.mdc-evolution-chip--selecting .mdc-evolution-chip__checkmark {
  transition: transform 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1);
  transform: translate(-75%, -50%);
}
.mdc-evolution-chip--selected .mdc-evolution-chip__checkmark {
  transform: translate(-50%, -50%);
  opacity: 1;
}

.mdc-evolution-chip__checkmark-svg {
  display: block;
}

.mdc-evolution-chip__checkmark-path {
  stroke-width: 2px;
  stroke-dasharray: 29.7833385;
  stroke-dashoffset: 29.7833385;
  stroke: currentColor;
}
.mdc-evolution-chip--selecting .mdc-evolution-chip__checkmark-path {
  transition: stroke-dashoffset 150ms 45ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mdc-evolution-chip--selected .mdc-evolution-chip__checkmark-path {
  stroke-dashoffset: 0;
}
@media (forced-colors: active) {
  .mdc-evolution-chip__checkmark-path {
    stroke: CanvasText !important;
  }
}

.mat-mdc-standard-chip .mdc-evolution-chip__icon--trailing {
  height: 18px;
  width: 18px;
  font-size: 18px;
}
.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing.mat-mdc-chip-remove {
  opacity: calc(var(--mat-chip-trailing-action-opacity, 1) * var(--mat-chip-with-trailing-icon-disabled-trailing-icon-opacity, 0.38));
}
.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing.mat-mdc-chip-remove:focus {
  opacity: calc(var(--mat-chip-trailing-action-focus-opacity, 1) * var(--mat-chip-with-trailing-icon-disabled-trailing-icon-opacity, 0.38));
}

.mat-mdc-standard-chip {
  border-radius: var(--mat-chip-container-shape-radius, 8px);
  height: var(--mat-chip-container-height, 32px);
}
.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) {
  background-color: var(--mat-chip-elevated-container-color, transparent);
}
.mat-mdc-standard-chip.mdc-evolution-chip--disabled {
  background-color: var(--mat-chip-elevated-disabled-container-color);
}
.mat-mdc-standard-chip.mdc-evolution-chip--selected:not(.mdc-evolution-chip--disabled) {
  background-color: var(--mat-chip-elevated-selected-container-color, var(--mat-sys-secondary-container));
}
.mat-mdc-standard-chip.mdc-evolution-chip--selected.mdc-evolution-chip--disabled {
  background-color: var(--mat-chip-flat-disabled-selected-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
@media (forced-colors: active) {
  .mat-mdc-standard-chip {
    outline: solid 1px;
  }
}

.mat-mdc-standard-chip .mdc-evolution-chip__icon--primary {
  border-radius: var(--mat-chip-with-avatar-avatar-shape-radius, 24px);
  width: var(--mat-chip-with-icon-icon-size, 18px);
  height: var(--mat-chip-with-icon-icon-size, 18px);
  font-size: var(--mat-chip-with-icon-icon-size, 18px);
}
.mdc-evolution-chip--selected .mdc-evolution-chip__icon--primary {
  opacity: 0;
}
.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__icon--primary {
  color: var(--mat-chip-with-icon-icon-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--primary {
  color: var(--mat-chip-with-icon-disabled-icon-color, var(--mat-sys-on-surface));
}

.mat-mdc-chip-highlighted {
  --mat-chip-with-icon-icon-color: var(--mat-chip-with-icon-selected-icon-color, var(--mat-sys-on-secondary-container));
  --mat-chip-elevated-container-color: var(--mat-chip-elevated-selected-container-color, var(--mat-sys-secondary-container));
  --mat-chip-label-text-color: var(--mat-chip-selected-label-text-color, var(--mat-sys-on-secondary-container));
  --mat-chip-outline-width: var(--mat-chip-flat-selected-outline-width, 0);
}

.mat-mdc-chip-focus-overlay {
  background: var(--mat-chip-focus-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-chip-selected .mat-mdc-chip-focus-overlay, .mat-mdc-chip-highlighted .mat-mdc-chip-focus-overlay {
  background: var(--mat-chip-selected-focus-state-layer-color, var(--mat-sys-on-secondary-container));
}
.mat-mdc-chip:hover .mat-mdc-chip-focus-overlay {
  background: var(--mat-chip-hover-state-layer-color, var(--mat-sys-on-surface-variant));
  opacity: var(--mat-chip-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-chip-focus-overlay .mat-mdc-chip-selected:hover, .mat-mdc-chip-highlighted:hover .mat-mdc-chip-focus-overlay {
  background: var(--mat-chip-selected-hover-state-layer-color, var(--mat-sys-on-secondary-container));
  opacity: var(--mat-chip-selected-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-chip.cdk-focused .mat-mdc-chip-focus-overlay {
  background: var(--mat-chip-focus-state-layer-color, var(--mat-sys-on-surface-variant));
  opacity: var(--mat-chip-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-mdc-chip-selected.cdk-focused .mat-mdc-chip-focus-overlay, .mat-mdc-chip-highlighted.cdk-focused .mat-mdc-chip-focus-overlay {
  background: var(--mat-chip-selected-focus-state-layer-color, var(--mat-sys-on-secondary-container));
  opacity: var(--mat-chip-selected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}

.mdc-evolution-chip--disabled:not(.mdc-evolution-chip--selected) .mat-mdc-chip-avatar {
  opacity: var(--mat-chip-with-avatar-disabled-avatar-opacity, 0.38);
}

.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing {
  opacity: var(--mat-chip-with-trailing-icon-disabled-trailing-icon-opacity, 0.38);
}

.mdc-evolution-chip--disabled.mdc-evolution-chip--selected .mdc-evolution-chip__checkmark {
  opacity: var(--mat-chip-with-icon-disabled-icon-opacity, 0.38);
}

.mat-mdc-standard-chip.mdc-evolution-chip--disabled {
  opacity: var(--mat-chip-disabled-container-opacity, 1);
}
.mat-mdc-standard-chip.mdc-evolution-chip--selected .mdc-evolution-chip__icon--trailing, .mat-mdc-standard-chip.mat-mdc-chip-highlighted .mdc-evolution-chip__icon--trailing {
  color: var(--mat-chip-selected-trailing-icon-color, var(--mat-sys-on-secondary-container));
}
.mat-mdc-standard-chip.mdc-evolution-chip--selected.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing, .mat-mdc-standard-chip.mat-mdc-chip-highlighted.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing {
  color: var(--mat-chip-selected-disabled-trailing-icon-color, var(--mat-sys-on-surface));
}

.mat-mdc-chip-edit, .mat-mdc-chip-remove {
  opacity: var(--mat-chip-trailing-action-opacity, 1);
}
.mat-mdc-chip-edit:focus, .mat-mdc-chip-remove:focus {
  opacity: var(--mat-chip-trailing-action-focus-opacity, 1);
}
.mat-mdc-chip-edit::after, .mat-mdc-chip-remove::after {
  background-color: var(--mat-chip-trailing-action-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-chip-edit:hover::after, .mat-mdc-chip-remove:hover::after {
  opacity: calc(var(--mat-chip-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity)) + var(--mat-chip-trailing-action-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity)));
}
.mat-mdc-chip-edit:focus::after, .mat-mdc-chip-remove:focus::after {
  opacity: calc(var(--mat-chip-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity)) + var(--mat-chip-trailing-action-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity)));
}

.mat-mdc-chip-selected .mat-mdc-chip-remove::after,
.mat-mdc-chip-highlighted .mat-mdc-chip-remove::after {
  background-color: var(--mat-chip-selected-trailing-action-state-layer-color, var(--mat-sys-on-secondary-container));
}

.mat-mdc-chip.cdk-focused .mat-mdc-chip-edit:focus::after, .mat-mdc-chip.cdk-focused .mat-mdc-chip-remove:focus::after {
  opacity: calc(var(--mat-chip-selected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity)) + var(--mat-chip-trailing-action-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity)));
}
.mat-mdc-chip.cdk-focused .mat-mdc-chip-edit:hover::after, .mat-mdc-chip.cdk-focused .mat-mdc-chip-remove:hover::after {
  opacity: calc(var(--mat-chip-selected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity)) + var(--mat-chip-trailing-action-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity)));
}

.mat-mdc-standard-chip {
  -webkit-tap-highlight-color: transparent;
}
.mat-mdc-standard-chip .mat-mdc-chip-graphic,
.mat-mdc-standard-chip .mat-mdc-chip-trailing-icon {
  box-sizing: content-box;
}
.mat-mdc-standard-chip._mat-animation-noopable,
.mat-mdc-standard-chip._mat-animation-noopable .mdc-evolution-chip__graphic,
.mat-mdc-standard-chip._mat-animation-noopable .mdc-evolution-chip__checkmark,
.mat-mdc-standard-chip._mat-animation-noopable .mdc-evolution-chip__checkmark-path {
  transition-duration: 1ms;
  animation-duration: 1ms;
}

.mat-mdc-chip-focus-overlay {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
  opacity: 0;
  border-radius: inherit;
  transition: opacity 150ms linear;
}
._mat-animation-noopable .mat-mdc-chip-focus-overlay {
  transition: none;
}
.mat-mdc-basic-chip .mat-mdc-chip-focus-overlay {
  display: none;
}

.mat-mdc-chip .mat-ripple.mat-mdc-chip-ripple {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
  border-radius: inherit;
}

.mat-mdc-chip-avatar {
  text-align: center;
  line-height: 1;
  color: var(--mat-chip-with-icon-icon-color, currentColor);
}

.mat-mdc-chip {
  position: relative;
  z-index: 0;
}

.mat-mdc-chip-action-label {
  text-align: left;
  z-index: 1;
}
[dir=rtl] .mat-mdc-chip-action-label {
  text-align: right;
}
.mat-mdc-chip.mdc-evolution-chip--with-trailing-action .mat-mdc-chip-action-label {
  position: relative;
}
.mat-mdc-chip-action-label .mat-mdc-chip-primary-focus-indicator {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  pointer-events: none;
}
.mat-mdc-chip-action-label .mat-focus-indicator::before {
  margin: calc(calc(var(--mat-focus-indicator-border-width, 3px) + 2px) * -1);
}

.mat-mdc-chip-edit::before, .mat-mdc-chip-remove::before {
  margin: calc(var(--mat-focus-indicator-border-width, 3px) * -1);
  left: 8px;
  right: 8px;
}
.mat-mdc-chip-edit::after, .mat-mdc-chip-remove::after {
  content: "";
  display: block;
  opacity: 0;
  position: absolute;
  top: -3px;
  bottom: -3px;
  left: 5px;
  right: 5px;
  border-radius: 50%;
  box-sizing: border-box;
  padding: 12px;
  margin: -12px;
  background-clip: content-box;
}
.mat-mdc-chip-edit .mat-icon, .mat-mdc-chip-remove .mat-icon {
  width: 18px;
  height: 18px;
  font-size: 18px;
  box-sizing: content-box;
}

.mat-chip-edit-input {
  cursor: text;
  display: inline-block;
  color: inherit;
  outline: 0;
}

@media (forced-colors: active) {
  .mat-mdc-chip-selected:not(.mat-mdc-chip-multiple) {
    outline-width: 3px;
  }
}

.mat-mdc-chip-action:focus-visible .mat-focus-indicator::before {
  content: "";
}

.mdc-evolution-chip__icon, .mat-mdc-chip-edit .mat-icon, .mat-mdc-chip-remove .mat-icon {
  min-height: fit-content;
}

img.mdc-evolution-chip__icon {
  min-height: 0;
}
`;var Lo=["*"],Cr=`.mat-mdc-chip-set {
  display: flex;
}
.mat-mdc-chip-set:focus {
  outline: none;
}
.mat-mdc-chip-set .mdc-evolution-chip-set__chips {
  min-width: 100%;
  margin-left: -8px;
  margin-right: 0;
}
.mat-mdc-chip-set .mdc-evolution-chip {
  margin: 4px 0 4px 8px;
}
[dir=rtl] .mat-mdc-chip-set .mdc-evolution-chip-set__chips {
  margin-left: 0;
  margin-right: -8px;
}
[dir=rtl] .mat-mdc-chip-set .mdc-evolution-chip {
  margin-left: 0;
  margin-right: 8px;
}

.mdc-evolution-chip-set__chips {
  display: flex;
  flex-flow: wrap;
  min-width: 0;
}

.mat-mdc-chip-set-stacked {
  flex-direction: column;
  align-items: flex-start;
}
.mat-mdc-chip-set-stacked .mat-mdc-chip {
  width: 100%;
}
.mat-mdc-chip-set-stacked .mdc-evolution-chip__graphic {
  flex-grow: 0;
}
.mat-mdc-chip-set-stacked .mdc-evolution-chip__action--primary {
  flex-basis: 100%;
  justify-content: start;
}

input.mat-mdc-chip-input {
  flex: 1 0 150px;
  margin-left: 8px;
}
[dir=rtl] input.mat-mdc-chip-input {
  margin-left: 0;
  margin-right: 8px;
}
.mat-mdc-form-field:not(.mat-form-field-hide-placeholder) input.mat-mdc-chip-input::placeholder {
  opacity: 1;
}
.mat-mdc-form-field:not(.mat-form-field-hide-placeholder) input.mat-mdc-chip-input::-moz-placeholder {
  opacity: 1;
}
.mat-mdc-form-field:not(.mat-form-field-hide-placeholder) input.mat-mdc-chip-input::-webkit-input-placeholder {
  opacity: 1;
}
.mat-mdc-form-field:not(.mat-form-field-hide-placeholder) input.mat-mdc-chip-input:-ms-input-placeholder {
  opacity: 1;
}
.mat-mdc-chip-set + input.mat-mdc-chip-input {
  margin-left: 0;
  margin-right: 0;
}
`,Ui=new F("mat-chips-default-options",{providedIn:"root",factory:()=>({separatorKeyCodes:[13]})}),Io=new F("MatChipAvatar"),Do=new F("MatChipTrailingIcon"),Po=new F("MatChipEdit"),Ro=new F("MatChipRemove"),Wi=new F("MatChip"),No=(()=>{class n{_elementRef=h(Y);_parentChip=h(Wi);_isPrimary=!0;_isLeading=!1;get disabled(){return this._disabled||this._parentChip?.disabled||!1}set disabled(e){this._disabled=e}_disabled=!1;tabIndex=-1;_allowFocusWhenDisabled=!1;_getDisabledAttribute(){return this.disabled&&!this._allowFocusWhenDisabled?"":null}constructor(){h(fe).load(xt),this._elementRef.nativeElement.nodeName==="BUTTON"&&this._elementRef.nativeElement.setAttribute("type","button")}focus(){this._elementRef.nativeElement.focus()}static \u0275fac=function(t){return new(t||n)};static \u0275dir=ae({type:n,selectors:[["","matChipContent",""]],hostAttrs:[1,"mat-mdc-chip-action","mdc-evolution-chip__action","mdc-evolution-chip__action--presentational"],hostVars:8,hostBindings:function(t,i){t&2&&(ne("disabled",i._getDisabledAttribute())("aria-disabled",i.disabled),E("mdc-evolution-chip__action--primary",i._isPrimary)("mdc-evolution-chip__action--secondary",!i._isPrimary)("mdc-evolution-chip__action--trailing",!i._isPrimary&&!i._isLeading))},inputs:{disabled:[2,"disabled","disabled",V],tabIndex:[2,"tabIndex","tabIndex",e=>e==null?-1:si(e)],_allowFocusWhenDisabled:"_allowFocusWhenDisabled"}})}return n})(),Vo=(()=>{class n extends No{_getTabindex(){return this.disabled&&!this._allowFocusWhenDisabled?null:this.tabIndex.toString()}_handleClick(e){!this.disabled&&this._isPrimary&&(e.preventDefault(),this._parentChip._handlePrimaryActionInteraction())}_handleKeydown(e){(e.keyCode===13||e.keyCode===32)&&!this.disabled&&this._isPrimary&&!this._parentChip._isEditing&&(e.preventDefault(),this._parentChip._handlePrimaryActionInteraction())}static \u0275fac=(()=>{let e;return function(i){return(e||(e=Ae(n)))(i||n)}})();static \u0275dir=ae({type:n,selectors:[["","matChipAction",""]],hostVars:3,hostBindings:function(t,i){t&1&&y("click",function(a){return i._handleClick(a)})("keydown",function(a){return i._handleKeydown(a)}),t&2&&(ne("tabindex",i._getTabindex()),E("mdc-evolution-chip__action--presentational",!1))},features:[qe]})}return n})();var ji=(()=>{class n{_changeDetectorRef=h(xe);_elementRef=h(Y);_tagName=h(sn);_ngZone=h(B);_focusMonitor=h(_i);_globalRippleOptions=h(yt,{optional:!0});_document=h(J);_onFocus=new D;_onBlur=new D;_isBasicChip=!1;role=null;_hasFocusInternal=!1;_pendingFocus=!1;_actionChanges;_animationsDisabled=ge();_allLeadingIcons;_allTrailingIcons;_allEditIcons;_allRemoveIcons;_hasFocus(){return this._hasFocusInternal}id=h(_e).getId("mat-mdc-chip-");ariaLabel=null;ariaDescription=null;_chipListDisabled=!1;_hadFocusOnRemove=!1;_textElement;get value(){return this._value!==void 0?this._value:this._textElement.textContent.trim()}set value(e){this._value=e}_value;color;removable=!0;highlighted=!1;disableRipple=!1;get disabled(){return this._disabled||this._chipListDisabled}set disabled(e){this._disabled=e}_disabled=!1;removed=new Q;destroyed=new Q;basicChipAttrName="mat-basic-chip";leadingIcon;editIcon;trailingIcon;removeIcon;primaryAction;_rippleLoader=h(Eo);_injector=h(Z);constructor(){let e=h(fe);e.load(xt),e.load(At),this._monitorFocus(),this._rippleLoader?.configureRipple(this._elementRef.nativeElement,{className:"mat-mdc-chip-ripple",disabled:this._isRippleDisabled()})}ngOnInit(){this._isBasicChip=this._elementRef.nativeElement.hasAttribute(this.basicChipAttrName)||this._tagName.toLowerCase()===this.basicChipAttrName}ngAfterViewInit(){this._textElement=this._elementRef.nativeElement.querySelector(".mat-mdc-chip-action-label"),this._pendingFocus&&(this._pendingFocus=!1,this.focus())}ngAfterContentInit(){this._actionChanges=Re(this._allLeadingIcons.changes,this._allTrailingIcons.changes,this._allEditIcons.changes,this._allRemoveIcons.changes).subscribe(()=>this._changeDetectorRef.markForCheck())}ngDoCheck(){this._rippleLoader.setDisabled(this._elementRef.nativeElement,this._isRippleDisabled())}ngOnDestroy(){this._focusMonitor.stopMonitoring(this._elementRef),this._rippleLoader?.destroyRipple(this._elementRef.nativeElement),this._actionChanges?.unsubscribe(),this.destroyed.emit({chip:this}),this.destroyed.complete()}remove(){this.removable&&(this._hadFocusOnRemove=this._hasFocus(),this.removed.emit({chip:this}))}_isRippleDisabled(){return this.disabled||this.disableRipple||this._animationsDisabled||this._isBasicChip||!this._hasInteractiveActions()||!!this._globalRippleOptions?.disabled}_hasTrailingIcon(){return!!(this.trailingIcon||this.removeIcon)}_handleKeydown(e){(e.keyCode===8&&!e.repeat||e.keyCode===46)&&(e.preventDefault(),this.remove())}focus(){this.disabled||(this.primaryAction?this.primaryAction.focus():this._pendingFocus=!0)}_getSourceAction(e){return this._getActions().find(t=>{let i=t._elementRef.nativeElement;return i===e||i.contains(e)})}_getActions(){let e=[];return this.editIcon&&e.push(this.editIcon),this.primaryAction&&e.push(this.primaryAction),this.removeIcon&&e.push(this.removeIcon),e}_handlePrimaryActionInteraction(){}_hasInteractiveActions(){return this._getActions().length>0}_edit(e){}_monitorFocus(){this._focusMonitor.monitor(this._elementRef,!0).subscribe(e=>{let t=e!==null;t!==this._hasFocusInternal&&(this._hasFocusInternal=t,t?this._onFocus.next({chip:this}):(this._changeDetectorRef.markForCheck(),setTimeout(()=>this._ngZone.run(()=>this._onBlur.next({chip:this})))))})}static \u0275fac=function(t){return new(t||n)};static \u0275cmp=j({type:n,selectors:[["mat-basic-chip"],["","mat-basic-chip",""],["mat-chip"],["","mat-chip",""]],contentQueries:function(t,i,r){if(t&1&&$e(r,Io,5)(r,Po,5)(r,Do,5)(r,Ro,5)(r,Io,5)(r,Do,5)(r,Po,5)(r,Ro,5),t&2){let a;G(a=K())&&(i.leadingIcon=a.first),G(a=K())&&(i.editIcon=a.first),G(a=K())&&(i.trailingIcon=a.first),G(a=K())&&(i.removeIcon=a.first),G(a=K())&&(i._allLeadingIcons=a),G(a=K())&&(i._allTrailingIcons=a),G(a=K())&&(i._allEditIcons=a),G(a=K())&&(i._allRemoveIcons=a)}},viewQuery:function(t,i){if(t&1&&Be(Vo,5),t&2){let r;G(r=K())&&(i.primaryAction=r.first)}},hostAttrs:[1,"mat-mdc-chip"],hostVars:31,hostBindings:function(t,i){t&1&&y("keydown",function(a){return i._handleKeydown(a)}),t&2&&(Ee("id",i.id),ne("role",i.role)("aria-label",i.ariaLabel),pt("mat-"+(i.color||"primary")),E("mdc-evolution-chip",!i._isBasicChip)("mdc-evolution-chip--disabled",i.disabled)("mdc-evolution-chip--with-trailing-action",i._hasTrailingIcon())("mdc-evolution-chip--with-primary-graphic",i.leadingIcon)("mdc-evolution-chip--with-primary-icon",i.leadingIcon)("mdc-evolution-chip--with-avatar",i.leadingIcon)("mat-mdc-chip-with-avatar",i.leadingIcon)("mat-mdc-chip-highlighted",i.highlighted)("mat-mdc-chip-disabled",i.disabled)("mat-mdc-basic-chip",i._isBasicChip)("mat-mdc-standard-chip",!i._isBasicChip)("mat-mdc-chip-with-trailing-icon",i._hasTrailingIcon())("_mat-animation-noopable",i._animationsDisabled))},inputs:{role:"role",id:"id",ariaLabel:[0,"aria-label","ariaLabel"],ariaDescription:[0,"aria-description","ariaDescription"],value:"value",color:"color",removable:[2,"removable","removable",V],highlighted:[2,"highlighted","highlighted",V],disableRipple:[2,"disableRipple","disableRipple",V],disabled:[2,"disabled","disabled",V]},outputs:{removed:"removed",destroyed:"destroyed"},exportAs:["matChip"],features:[ye([{provide:Wi,useExisting:n}])],ngContentSelectors:Ao,decls:8,vars:2,consts:[[1,"mat-mdc-chip-focus-overlay"],[1,"mdc-evolution-chip__cell","mdc-evolution-chip__cell--primary"],["matChipContent",""],[1,"mdc-evolution-chip__graphic","mat-mdc-chip-graphic"],[1,"mdc-evolution-chip__text-label","mat-mdc-chip-action-label"],[1,"mat-mdc-chip-primary-focus-indicator","mat-focus-indicator"],[1,"mdc-evolution-chip__cell","mdc-evolution-chip__cell--trailing"]],template:function(t,i){t&1&&(me(Fo),U(0,"span",0),s(1,"span",1)(2,"span",2),v(3,gr,2,0,"span",3),s(4,"span",4),te(5),U(6,"span",5),l()()(),v(7,vr,2,0,"span",6)),t&2&&(p(3),b(i.leadingIcon?3:-1),p(4),b(i._hasTrailingIcon()?7:-1))},dependencies:[No],styles:[`.mdc-evolution-chip,
.mdc-evolution-chip__cell,
.mdc-evolution-chip__action {
  display: inline-flex;
  align-items: center;
}

.mdc-evolution-chip {
  position: relative;
  max-width: 100%;
}

.mdc-evolution-chip__cell,
.mdc-evolution-chip__action {
  height: 100%;
}

.mdc-evolution-chip__cell--primary {
  flex-basis: 100%;
  overflow-x: hidden;
}

.mdc-evolution-chip__cell--trailing {
  flex: 1 0 auto;
}

.mdc-evolution-chip__action {
  align-items: center;
  background: none;
  border: none;
  box-sizing: content-box;
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  outline: none;
  padding: 0;
  text-decoration: none;
  color: inherit;
}

.mdc-evolution-chip__action--presentational {
  cursor: auto;
}

.mdc-evolution-chip--disabled,
.mdc-evolution-chip__action:disabled {
  pointer-events: none;
}
@media (forced-colors: active) {
  .mdc-evolution-chip--disabled,
  .mdc-evolution-chip__action:disabled {
    forced-color-adjust: none;
  }
}

.mdc-evolution-chip__action--primary {
  font: inherit;
  letter-spacing: inherit;
  white-space: inherit;
  overflow-x: hidden;
}
.mat-mdc-standard-chip .mdc-evolution-chip__action--primary::before {
  border-width: var(--mat-chip-outline-width, 1px);
  border-radius: var(--mat-chip-container-shape-radius, 8px);
  box-sizing: border-box;
  content: "";
  height: 100%;
  left: 0;
  position: absolute;
  pointer-events: none;
  top: 0;
  width: 100%;
  z-index: 1;
  border-style: solid;
}
.mat-mdc-standard-chip .mdc-evolution-chip__action--primary {
  padding-left: 12px;
  padding-right: 12px;
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 12px;
}
[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary {
  padding-left: 12px;
  padding-right: 0;
}
.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__action--primary::before {
  border-color: var(--mat-chip-outline-color, var(--mat-sys-outline));
}
.mdc-evolution-chip__action--primary:not(.mdc-evolution-chip__action--presentational):not(.mdc-ripple-upgraded):focus::before {
  border-color: var(--mat-chip-focus-outline-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__action--primary::before {
  border-color: var(--mat-chip-disabled-outline-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mat-mdc-standard-chip.mdc-evolution-chip--selected .mdc-evolution-chip__action--primary::before {
  border-width: var(--mat-chip-flat-selected-outline-width, 0);
}
.mat-mdc-basic-chip .mdc-evolution-chip__action--primary {
  font: inherit;
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-leading-action .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 12px;
}
[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-leading-action .mdc-evolution-chip__action--primary {
  padding-left: 12px;
  padding-right: 0;
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {
  padding-left: 12px;
  padding-right: 0;
}
[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 12px;
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-leading-action.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 0;
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 0;
}
[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 0;
}
.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 12px;
}
[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary {
  padding-left: 12px;
  padding-right: 0;
}
.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 0;
}
[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 0;
}

.mdc-evolution-chip__action--secondary {
  position: relative;
  overflow: visible;
}
.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__action--secondary {
  color: var(--mat-chip-with-trailing-icon-trailing-icon-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__action--secondary {
  color: var(--mat-chip-with-trailing-icon-disabled-trailing-icon-color, var(--mat-sys-on-surface));
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--secondary {
  padding-left: 8px;
  padding-right: 8px;
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--secondary {
  padding-left: 8px;
  padding-right: 8px;
}
.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--secondary {
  padding-left: 8px;
  padding-right: 8px;
}
[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--secondary {
  padding-left: 8px;
  padding-right: 8px;
}

.mdc-evolution-chip__text-label {
  -webkit-user-select: none;
  user-select: none;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.mat-mdc-standard-chip .mdc-evolution-chip__text-label {
  font-family: var(--mat-chip-label-text-font, var(--mat-sys-label-large-font));
  line-height: var(--mat-chip-label-text-line-height, var(--mat-sys-label-large-line-height));
  font-size: var(--mat-chip-label-text-size, var(--mat-sys-label-large-size));
  font-weight: var(--mat-chip-label-text-weight, var(--mat-sys-label-large-weight));
  letter-spacing: var(--mat-chip-label-text-tracking, var(--mat-sys-label-large-tracking));
}
.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__text-label {
  color: var(--mat-chip-label-text-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-standard-chip.mdc-evolution-chip--selected:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__text-label {
  color: var(--mat-chip-selected-label-text-color, var(--mat-sys-on-secondary-container));
}
.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__text-label, .mat-mdc-standard-chip.mdc-evolution-chip--selected.mdc-evolution-chip--disabled .mdc-evolution-chip__text-label {
  color: var(--mat-chip-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}

.mdc-evolution-chip__graphic {
  align-items: center;
  display: inline-flex;
  justify-content: center;
  overflow: hidden;
  pointer-events: none;
  position: relative;
  flex: 1 0 auto;
}
.mat-mdc-standard-chip .mdc-evolution-chip__graphic {
  width: var(--mat-chip-with-avatar-avatar-size, 24px);
  height: var(--mat-chip-with-avatar-avatar-size, 24px);
  font-size: var(--mat-chip-with-avatar-avatar-size, 24px);
}
.mdc-evolution-chip--selecting .mdc-evolution-chip__graphic {
  transition: width 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mdc-evolution-chip--selectable:not(.mdc-evolution-chip--selected):not(.mdc-evolution-chip--with-primary-icon) .mdc-evolution-chip__graphic {
  width: 0;
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic {
  padding-left: 6px;
  padding-right: 6px;
}
.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic {
  padding-left: 4px;
  padding-right: 8px;
}
[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic {
  padding-left: 8px;
  padding-right: 4px;
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic {
  padding-left: 6px;
  padding-right: 6px;
}
.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic {
  padding-left: 4px;
  padding-right: 8px;
}
[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic {
  padding-left: 8px;
  padding-right: 4px;
}
.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-leading-action .mdc-evolution-chip__graphic {
  padding-left: 0;
}

.mdc-evolution-chip__checkmark {
  position: absolute;
  opacity: 0;
  top: 50%;
  left: 50%;
  height: 20px;
  width: 20px;
}
.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__checkmark {
  color: var(--mat-chip-with-icon-selected-icon-color, var(--mat-sys-on-secondary-container));
}
.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__checkmark {
  color: var(--mat-chip-with-icon-disabled-icon-color, var(--mat-sys-on-surface));
}
.mdc-evolution-chip--selecting .mdc-evolution-chip__checkmark {
  transition: transform 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1);
  transform: translate(-75%, -50%);
}
.mdc-evolution-chip--selected .mdc-evolution-chip__checkmark {
  transform: translate(-50%, -50%);
  opacity: 1;
}

.mdc-evolution-chip__checkmark-svg {
  display: block;
}

.mdc-evolution-chip__checkmark-path {
  stroke-width: 2px;
  stroke-dasharray: 29.7833385;
  stroke-dashoffset: 29.7833385;
  stroke: currentColor;
}
.mdc-evolution-chip--selecting .mdc-evolution-chip__checkmark-path {
  transition: stroke-dashoffset 150ms 45ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mdc-evolution-chip--selected .mdc-evolution-chip__checkmark-path {
  stroke-dashoffset: 0;
}
@media (forced-colors: active) {
  .mdc-evolution-chip__checkmark-path {
    stroke: CanvasText !important;
  }
}

.mat-mdc-standard-chip .mdc-evolution-chip__icon--trailing {
  height: 18px;
  width: 18px;
  font-size: 18px;
}
.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing.mat-mdc-chip-remove {
  opacity: calc(var(--mat-chip-trailing-action-opacity, 1) * var(--mat-chip-with-trailing-icon-disabled-trailing-icon-opacity, 0.38));
}
.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing.mat-mdc-chip-remove:focus {
  opacity: calc(var(--mat-chip-trailing-action-focus-opacity, 1) * var(--mat-chip-with-trailing-icon-disabled-trailing-icon-opacity, 0.38));
}

.mat-mdc-standard-chip {
  border-radius: var(--mat-chip-container-shape-radius, 8px);
  height: var(--mat-chip-container-height, 32px);
}
.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) {
  background-color: var(--mat-chip-elevated-container-color, transparent);
}
.mat-mdc-standard-chip.mdc-evolution-chip--disabled {
  background-color: var(--mat-chip-elevated-disabled-container-color);
}
.mat-mdc-standard-chip.mdc-evolution-chip--selected:not(.mdc-evolution-chip--disabled) {
  background-color: var(--mat-chip-elevated-selected-container-color, var(--mat-sys-secondary-container));
}
.mat-mdc-standard-chip.mdc-evolution-chip--selected.mdc-evolution-chip--disabled {
  background-color: var(--mat-chip-flat-disabled-selected-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
@media (forced-colors: active) {
  .mat-mdc-standard-chip {
    outline: solid 1px;
  }
}

.mat-mdc-standard-chip .mdc-evolution-chip__icon--primary {
  border-radius: var(--mat-chip-with-avatar-avatar-shape-radius, 24px);
  width: var(--mat-chip-with-icon-icon-size, 18px);
  height: var(--mat-chip-with-icon-icon-size, 18px);
  font-size: var(--mat-chip-with-icon-icon-size, 18px);
}
.mdc-evolution-chip--selected .mdc-evolution-chip__icon--primary {
  opacity: 0;
}
.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__icon--primary {
  color: var(--mat-chip-with-icon-icon-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--primary {
  color: var(--mat-chip-with-icon-disabled-icon-color, var(--mat-sys-on-surface));
}

.mat-mdc-chip-highlighted {
  --mat-chip-with-icon-icon-color: var(--mat-chip-with-icon-selected-icon-color, var(--mat-sys-on-secondary-container));
  --mat-chip-elevated-container-color: var(--mat-chip-elevated-selected-container-color, var(--mat-sys-secondary-container));
  --mat-chip-label-text-color: var(--mat-chip-selected-label-text-color, var(--mat-sys-on-secondary-container));
  --mat-chip-outline-width: var(--mat-chip-flat-selected-outline-width, 0);
}

.mat-mdc-chip-focus-overlay {
  background: var(--mat-chip-focus-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-chip-selected .mat-mdc-chip-focus-overlay, .mat-mdc-chip-highlighted .mat-mdc-chip-focus-overlay {
  background: var(--mat-chip-selected-focus-state-layer-color, var(--mat-sys-on-secondary-container));
}
.mat-mdc-chip:hover .mat-mdc-chip-focus-overlay {
  background: var(--mat-chip-hover-state-layer-color, var(--mat-sys-on-surface-variant));
  opacity: var(--mat-chip-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-chip-focus-overlay .mat-mdc-chip-selected:hover, .mat-mdc-chip-highlighted:hover .mat-mdc-chip-focus-overlay {
  background: var(--mat-chip-selected-hover-state-layer-color, var(--mat-sys-on-secondary-container));
  opacity: var(--mat-chip-selected-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-chip.cdk-focused .mat-mdc-chip-focus-overlay {
  background: var(--mat-chip-focus-state-layer-color, var(--mat-sys-on-surface-variant));
  opacity: var(--mat-chip-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-mdc-chip-selected.cdk-focused .mat-mdc-chip-focus-overlay, .mat-mdc-chip-highlighted.cdk-focused .mat-mdc-chip-focus-overlay {
  background: var(--mat-chip-selected-focus-state-layer-color, var(--mat-sys-on-secondary-container));
  opacity: var(--mat-chip-selected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}

.mdc-evolution-chip--disabled:not(.mdc-evolution-chip--selected) .mat-mdc-chip-avatar {
  opacity: var(--mat-chip-with-avatar-disabled-avatar-opacity, 0.38);
}

.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing {
  opacity: var(--mat-chip-with-trailing-icon-disabled-trailing-icon-opacity, 0.38);
}

.mdc-evolution-chip--disabled.mdc-evolution-chip--selected .mdc-evolution-chip__checkmark {
  opacity: var(--mat-chip-with-icon-disabled-icon-opacity, 0.38);
}

.mat-mdc-standard-chip.mdc-evolution-chip--disabled {
  opacity: var(--mat-chip-disabled-container-opacity, 1);
}
.mat-mdc-standard-chip.mdc-evolution-chip--selected .mdc-evolution-chip__icon--trailing, .mat-mdc-standard-chip.mat-mdc-chip-highlighted .mdc-evolution-chip__icon--trailing {
  color: var(--mat-chip-selected-trailing-icon-color, var(--mat-sys-on-secondary-container));
}
.mat-mdc-standard-chip.mdc-evolution-chip--selected.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing, .mat-mdc-standard-chip.mat-mdc-chip-highlighted.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing {
  color: var(--mat-chip-selected-disabled-trailing-icon-color, var(--mat-sys-on-surface));
}

.mat-mdc-chip-edit, .mat-mdc-chip-remove {
  opacity: var(--mat-chip-trailing-action-opacity, 1);
}
.mat-mdc-chip-edit:focus, .mat-mdc-chip-remove:focus {
  opacity: var(--mat-chip-trailing-action-focus-opacity, 1);
}
.mat-mdc-chip-edit::after, .mat-mdc-chip-remove::after {
  background-color: var(--mat-chip-trailing-action-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-chip-edit:hover::after, .mat-mdc-chip-remove:hover::after {
  opacity: calc(var(--mat-chip-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity)) + var(--mat-chip-trailing-action-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity)));
}
.mat-mdc-chip-edit:focus::after, .mat-mdc-chip-remove:focus::after {
  opacity: calc(var(--mat-chip-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity)) + var(--mat-chip-trailing-action-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity)));
}

.mat-mdc-chip-selected .mat-mdc-chip-remove::after,
.mat-mdc-chip-highlighted .mat-mdc-chip-remove::after {
  background-color: var(--mat-chip-selected-trailing-action-state-layer-color, var(--mat-sys-on-secondary-container));
}

.mat-mdc-chip.cdk-focused .mat-mdc-chip-edit:focus::after, .mat-mdc-chip.cdk-focused .mat-mdc-chip-remove:focus::after {
  opacity: calc(var(--mat-chip-selected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity)) + var(--mat-chip-trailing-action-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity)));
}
.mat-mdc-chip.cdk-focused .mat-mdc-chip-edit:hover::after, .mat-mdc-chip.cdk-focused .mat-mdc-chip-remove:hover::after {
  opacity: calc(var(--mat-chip-selected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity)) + var(--mat-chip-trailing-action-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity)));
}

.mat-mdc-standard-chip {
  -webkit-tap-highlight-color: transparent;
}
.mat-mdc-standard-chip .mat-mdc-chip-graphic,
.mat-mdc-standard-chip .mat-mdc-chip-trailing-icon {
  box-sizing: content-box;
}
.mat-mdc-standard-chip._mat-animation-noopable,
.mat-mdc-standard-chip._mat-animation-noopable .mdc-evolution-chip__graphic,
.mat-mdc-standard-chip._mat-animation-noopable .mdc-evolution-chip__checkmark,
.mat-mdc-standard-chip._mat-animation-noopable .mdc-evolution-chip__checkmark-path {
  transition-duration: 1ms;
  animation-duration: 1ms;
}

.mat-mdc-chip-focus-overlay {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
  opacity: 0;
  border-radius: inherit;
  transition: opacity 150ms linear;
}
._mat-animation-noopable .mat-mdc-chip-focus-overlay {
  transition: none;
}
.mat-mdc-basic-chip .mat-mdc-chip-focus-overlay {
  display: none;
}

.mat-mdc-chip .mat-ripple.mat-mdc-chip-ripple {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
  border-radius: inherit;
}

.mat-mdc-chip-avatar {
  text-align: center;
  line-height: 1;
  color: var(--mat-chip-with-icon-icon-color, currentColor);
}

.mat-mdc-chip {
  position: relative;
  z-index: 0;
}

.mat-mdc-chip-action-label {
  text-align: left;
  z-index: 1;
}
[dir=rtl] .mat-mdc-chip-action-label {
  text-align: right;
}
.mat-mdc-chip.mdc-evolution-chip--with-trailing-action .mat-mdc-chip-action-label {
  position: relative;
}
.mat-mdc-chip-action-label .mat-mdc-chip-primary-focus-indicator {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  pointer-events: none;
}
.mat-mdc-chip-action-label .mat-focus-indicator::before {
  margin: calc(calc(var(--mat-focus-indicator-border-width, 3px) + 2px) * -1);
}

.mat-mdc-chip-edit::before, .mat-mdc-chip-remove::before {
  margin: calc(var(--mat-focus-indicator-border-width, 3px) * -1);
  left: 8px;
  right: 8px;
}
.mat-mdc-chip-edit::after, .mat-mdc-chip-remove::after {
  content: "";
  display: block;
  opacity: 0;
  position: absolute;
  top: -3px;
  bottom: -3px;
  left: 5px;
  right: 5px;
  border-radius: 50%;
  box-sizing: border-box;
  padding: 12px;
  margin: -12px;
  background-clip: content-box;
}
.mat-mdc-chip-edit .mat-icon, .mat-mdc-chip-remove .mat-icon {
  width: 18px;
  height: 18px;
  font-size: 18px;
  box-sizing: content-box;
}

.mat-chip-edit-input {
  cursor: text;
  display: inline-block;
  color: inherit;
  outline: 0;
}

@media (forced-colors: active) {
  .mat-mdc-chip-selected:not(.mat-mdc-chip-multiple) {
    outline-width: 3px;
  }
}

.mat-mdc-chip-action:focus-visible .mat-focus-indicator::before {
  content: "";
}

.mdc-evolution-chip__icon, .mat-mdc-chip-edit .mat-icon, .mat-mdc-chip-remove .mat-icon {
  min-height: fit-content;
}

img.mdc-evolution-chip__icon {
  min-height: 0;
}
`],encapsulation:2,changeDetection:0})}return n})();var Yi=(()=>{class n extends ji{_defaultOptions=h(Ui,{optional:!0});chipListSelectable=!0;_chipListMultiple=!1;_chipListHideSingleSelectionIndicator=this._defaultOptions?.hideSingleSelectionIndicator??!1;get selectable(){return this._selectable&&this.chipListSelectable}set selectable(e){this._selectable=e,this._changeDetectorRef.markForCheck()}_selectable=!0;get selected(){return this._selected}set selected(e){this._setSelectedState(e,!1,!0)}_selected=!1;get ariaSelected(){return this.selectable?this.selected.toString():null}basicChipAttrName="mat-basic-chip-option";selectionChange=new Q;ngOnInit(){super.ngOnInit(),this.role="presentation"}select(){this._setSelectedState(!0,!1,!0)}deselect(){this._setSelectedState(!1,!1,!0)}selectViaInteraction(){this._setSelectedState(!0,!0,!0)}toggleSelected(e=!1){return this._setSelectedState(!this.selected,e,!0),this.selected}_handlePrimaryActionInteraction(){this.disabled||(this.focus(),this.selectable&&this.toggleSelected(!0))}_hasLeadingGraphic(){return this.leadingIcon?!0:!this._chipListHideSingleSelectionIndicator||this._chipListMultiple}_setSelectedState(e,t,i){e!==this.selected&&(this._selected=e,i&&this.selectionChange.emit({source:this,isUserInput:t,selected:this.selected}),this._changeDetectorRef.markForCheck())}static \u0275fac=(()=>{let e;return function(i){return(e||(e=Ae(n)))(i||n)}})();static \u0275cmp=j({type:n,selectors:[["mat-basic-chip-option"],["","mat-basic-chip-option",""],["mat-chip-option"],["","mat-chip-option",""]],hostAttrs:[1,"mat-mdc-chip","mat-mdc-chip-option"],hostVars:37,hostBindings:function(t,i){t&2&&(Ee("id",i.id),ne("tabindex",null)("aria-label",null)("aria-description",null)("role",i.role),E("mdc-evolution-chip",!i._isBasicChip)("mdc-evolution-chip--filter",!i._isBasicChip)("mdc-evolution-chip--selectable",!i._isBasicChip)("mat-mdc-chip-selected",i.selected)("mat-mdc-chip-multiple",i._chipListMultiple)("mat-mdc-chip-disabled",i.disabled)("mat-mdc-chip-with-avatar",i.leadingIcon)("mdc-evolution-chip--disabled",i.disabled)("mdc-evolution-chip--selected",i.selected)("mdc-evolution-chip--selecting",!i._animationsDisabled)("mdc-evolution-chip--with-trailing-action",i._hasTrailingIcon())("mdc-evolution-chip--with-primary-icon",i.leadingIcon)("mdc-evolution-chip--with-primary-graphic",i._hasLeadingGraphic())("mdc-evolution-chip--with-avatar",i.leadingIcon)("mat-mdc-chip-highlighted",i.highlighted)("mat-mdc-chip-with-trailing-icon",i._hasTrailingIcon()))},inputs:{selectable:[2,"selectable","selectable",V],selected:[2,"selected","selected",V]},outputs:{selectionChange:"selectionChange"},features:[ye([{provide:ji,useExisting:n},{provide:Wi,useExisting:n}]),qe],ngContentSelectors:Ao,decls:8,vars:6,consts:[[1,"mat-mdc-chip-focus-overlay"],[1,"mdc-evolution-chip__cell","mdc-evolution-chip__cell--primary"],["matChipAction","","role","option",3,"_allowFocusWhenDisabled"],[1,"mdc-evolution-chip__graphic","mat-mdc-chip-graphic"],[1,"mdc-evolution-chip__text-label","mat-mdc-chip-action-label"],[1,"mat-mdc-chip-primary-focus-indicator","mat-focus-indicator"],[1,"mdc-evolution-chip__cell","mdc-evolution-chip__cell--trailing"],[1,"mdc-evolution-chip__checkmark"],["viewBox","-2 -3 30 30","focusable","false","aria-hidden","true",1,"mdc-evolution-chip__checkmark-svg"],["fill","none","stroke","currentColor","d","M1.73,12.91 8.1,19.28 22.79,4.59",1,"mdc-evolution-chip__checkmark-path"]],template:function(t,i){t&1&&(me(Fo),U(0,"span",0),s(1,"span",1)(2,"button",2),v(3,br,5,0,"span",3),s(4,"span",4),te(5),U(6,"span",5),l()()(),v(7,yr,2,0,"span",6)),t&2&&(p(2),T("_allowFocusWhenDisabled",!0),ne("aria-description",i.ariaDescription)("aria-label",i.ariaLabel)("aria-selected",i.ariaSelected),p(),b(i._hasLeadingGraphic()?3:-1),p(4),b(i._hasTrailingIcon()?7:-1))},dependencies:[Vo],styles:[xr],encapsulation:2,changeDetection:0})}return n})();var wr=(()=>{class n{_elementRef=h(Y);_changeDetectorRef=h(xe);_dir=h(Ue,{optional:!0});_lastDestroyedFocusedChipIndex=null;_keyManager;_destroyed=new D;_defaultRole="presentation";get chipFocusChanges(){return this._getChipStream(e=>e._onFocus)}get chipDestroyedChanges(){return this._getChipStream(e=>e.destroyed)}get chipRemovedChanges(){return this._getChipStream(e=>e.removed)}get disabled(){return this._disabled}set disabled(e){this._disabled=e,this._syncChipsState()}_disabled=!1;get empty(){return!this._chips||this._chips.length===0}get role(){return this._explicitRole?this._explicitRole:this.empty?null:this._defaultRole}tabIndex=0;set role(e){this._explicitRole=e}_explicitRole=null;get focused(){return this._hasFocusedChip()}_chips;_chipActions=new rt;constructor(){}ngAfterViewInit(){this._setUpFocusManagement(),this._trackChipSetChanges(),this._trackDestroyedFocusedChip()}ngOnDestroy(){this._keyManager?.destroy(),this._chipActions.destroy(),this._destroyed.next(),this._destroyed.complete()}_hasFocusedChip(){return this._chips&&this._chips.some(e=>e._hasFocus())}_syncChipsState(){this._chips?.forEach(e=>{e._chipListDisabled=this._disabled,e._changeDetectorRef.markForCheck()})}focus(){}_handleKeydown(e){this._originatesFromChip(e)&&this._keyManager.onKeydown(e)}_isValidIndex(e){return e>=0&&e<this._chips.length}_allowFocusEscape(){let e=this._elementRef.nativeElement.tabIndex;e!==-1&&(this._elementRef.nativeElement.tabIndex=-1,setTimeout(()=>this._elementRef.nativeElement.tabIndex=e))}_getChipStream(e){return this._chips.changes.pipe(be(null),Fe(()=>Re(...this._chips.map(e))))}_originatesFromChip(e){let t=e.target;for(;t&&t!==this._elementRef.nativeElement;){if(t.classList.contains("mat-mdc-chip"))return!0;t=t.parentElement}return!1}_setUpFocusManagement(){this._chips.changes.pipe(be(this._chips)).subscribe(e=>{let t=[];e.forEach(i=>i._getActions().forEach(r=>t.push(r))),this._chipActions.reset(t),this._chipActions.notifyOnChanges()}),this._keyManager=new gt(this._chipActions).withVerticalOrientation().withHorizontalOrientation(this._dir?this._dir.value:"ltr").withHomeAndEnd().skipPredicate(e=>this._skipPredicate(e)),this.chipFocusChanges.pipe(re(this._destroyed)).subscribe(({chip:e})=>{let t=e._getSourceAction(document.activeElement);t&&this._keyManager.updateActiveItem(t)}),this._dir?.change.pipe(re(this._destroyed)).subscribe(e=>this._keyManager.withHorizontalOrientation(e))}_skipPredicate(e){return e.disabled}_trackChipSetChanges(){this._chips.changes.pipe(be(null),re(this._destroyed)).subscribe(()=>{this.disabled&&Promise.resolve().then(()=>this._syncChipsState()),this._redirectDestroyedChipFocus()})}_trackDestroyedFocusedChip(){this.chipDestroyedChanges.pipe(re(this._destroyed)).subscribe(e=>{let i=this._chips.toArray().indexOf(e.chip),r=e.chip._hasFocus(),a=e.chip._hadFocusOnRemove&&this._keyManager.activeItem&&e.chip._getActions().includes(this._keyManager.activeItem),d=r||a;this._isValidIndex(i)&&d&&(this._lastDestroyedFocusedChipIndex=i)})}_redirectDestroyedChipFocus(){if(this._lastDestroyedFocusedChipIndex!=null){if(this._chips.length){let e=Math.min(this._lastDestroyedFocusedChipIndex,this._chips.length-1),t=this._chips.toArray()[e];t.disabled?this._chips.length===1?this.focus():this._keyManager.setPreviousItemActive():t.focus()}else this.focus();this._lastDestroyedFocusedChipIndex=null}}static \u0275fac=function(t){return new(t||n)};static \u0275cmp=j({type:n,selectors:[["mat-chip-set"]],contentQueries:function(t,i,r){if(t&1&&$e(r,ji,5),t&2){let a;G(a=K())&&(i._chips=a)}},hostAttrs:[1,"mat-mdc-chip-set","mdc-evolution-chip-set"],hostVars:1,hostBindings:function(t,i){t&1&&y("keydown",function(a){return i._handleKeydown(a)}),t&2&&ne("role",i.role)},inputs:{disabled:[2,"disabled","disabled",V],role:"role",tabIndex:[2,"tabIndex","tabIndex",e=>e==null?0:si(e)]},ngContentSelectors:Lo,decls:2,vars:0,consts:[["role","presentation",1,"mdc-evolution-chip-set__chips"]],template:function(t,i){t&1&&(me(),Ve(0,"div",0),te(1),ze())},styles:[`.mat-mdc-chip-set {
  display: flex;
}
.mat-mdc-chip-set:focus {
  outline: none;
}
.mat-mdc-chip-set .mdc-evolution-chip-set__chips {
  min-width: 100%;
  margin-left: -8px;
  margin-right: 0;
}
.mat-mdc-chip-set .mdc-evolution-chip {
  margin: 4px 0 4px 8px;
}
[dir=rtl] .mat-mdc-chip-set .mdc-evolution-chip-set__chips {
  margin-left: 0;
  margin-right: -8px;
}
[dir=rtl] .mat-mdc-chip-set .mdc-evolution-chip {
  margin-left: 0;
  margin-right: 8px;
}

.mdc-evolution-chip-set__chips {
  display: flex;
  flex-flow: wrap;
  min-width: 0;
}

.mat-mdc-chip-set-stacked {
  flex-direction: column;
  align-items: flex-start;
}
.mat-mdc-chip-set-stacked .mat-mdc-chip {
  width: 100%;
}
.mat-mdc-chip-set-stacked .mdc-evolution-chip__graphic {
  flex-grow: 0;
}
.mat-mdc-chip-set-stacked .mdc-evolution-chip__action--primary {
  flex-basis: 100%;
  justify-content: start;
}

input.mat-mdc-chip-input {
  flex: 1 0 150px;
  margin-left: 8px;
}
[dir=rtl] input.mat-mdc-chip-input {
  margin-left: 0;
  margin-right: 8px;
}
.mat-mdc-form-field:not(.mat-form-field-hide-placeholder) input.mat-mdc-chip-input::placeholder {
  opacity: 1;
}
.mat-mdc-form-field:not(.mat-form-field-hide-placeholder) input.mat-mdc-chip-input::-moz-placeholder {
  opacity: 1;
}
.mat-mdc-form-field:not(.mat-form-field-hide-placeholder) input.mat-mdc-chip-input::-webkit-input-placeholder {
  opacity: 1;
}
.mat-mdc-form-field:not(.mat-form-field-hide-placeholder) input.mat-mdc-chip-input:-ms-input-placeholder {
  opacity: 1;
}
.mat-mdc-chip-set + input.mat-mdc-chip-input {
  margin-left: 0;
  margin-right: 0;
}
`],encapsulation:2,changeDetection:0})}return n})(),Hi=class{source;value;constructor(o,e){this.source=o,this.value=e}},kr={provide:Pt,useExisting:nt(()=>qi),multi:!0},qi=(()=>{class n extends wr{_onTouched=()=>{};_onChange=()=>{};_defaultRole="listbox";_defaultOptions=h(Ui,{optional:!0});get multiple(){return this._multiple}set multiple(e){this._multiple=e,this._syncListboxProperties()}_multiple=!1;get selected(){let e=this._chips.toArray().filter(t=>t.selected);return this.multiple?e:e[0]}ariaOrientation="horizontal";get selectable(){return this._selectable}set selectable(e){this._selectable=e,this._syncListboxProperties()}_selectable=!0;compareWith=(e,t)=>e===t;required=!1;get hideSingleSelectionIndicator(){return this._hideSingleSelectionIndicator}set hideSingleSelectionIndicator(e){this._hideSingleSelectionIndicator=e,this._syncListboxProperties()}_hideSingleSelectionIndicator=this._defaultOptions?.hideSingleSelectionIndicator??!1;get chipSelectionChanges(){return this._getChipStream(e=>e.selectionChange)}get chipBlurChanges(){return this._getChipStream(e=>e._onBlur)}get value(){return this._value}set value(e){this._chips&&this._chips.length&&this._setSelectionByValue(e,!1),this._value=e}_value;change=new Q;_chips=void 0;ngAfterContentInit(){this._chips.changes.pipe(be(null),re(this._destroyed)).subscribe(()=>{this.value!==void 0&&Promise.resolve().then(()=>{this._setSelectionByValue(this.value,!1)}),this._syncListboxProperties()}),this.chipBlurChanges.pipe(re(this._destroyed)).subscribe(()=>this._blur()),this.chipSelectionChanges.pipe(re(this._destroyed)).subscribe(e=>{this.multiple||this._chips.forEach(t=>{t!==e.source&&t._setSelectedState(!1,!1,!1)}),e.isUserInput&&this._propagateChanges()})}focus(){if(this.disabled)return;let e=this._getFirstSelectedChip();e&&!e.disabled?e.focus():this._chips.length>0?this._keyManager.setFirstItemActive():this._elementRef.nativeElement.focus()}writeValue(e){e!=null?this.value=e:this.value=void 0}registerOnChange(e){this._onChange=e}registerOnTouched(e){this._onTouched=e}setDisabledState(e){this.disabled=e}_setSelectionByValue(e,t=!0){this._clearSelection(),Array.isArray(e)?e.forEach(i=>this._selectValue(i,t)):this._selectValue(e,t)}_blur(){this.disabled||setTimeout(()=>{this.focused||this._markAsTouched()})}_keydown(e){e.keyCode===9&&super._allowFocusEscape()}_markAsTouched(){this._onTouched(),this._changeDetectorRef.markForCheck()}_propagateChanges(){let e=null;Array.isArray(this.selected)?e=this.selected.map(t=>t.value):e=this.selected?this.selected.value:void 0,this._value=e,this.change.emit(new Hi(this,e)),this._onChange(e),this._changeDetectorRef.markForCheck()}_clearSelection(e){this._chips.forEach(t=>{t!==e&&t.deselect()})}_selectValue(e,t){let i=this._chips.find(r=>r.value!=null&&this.compareWith(r.value,e));return i&&(t?i.selectViaInteraction():i.select()),i}_syncListboxProperties(){this._chips&&Promise.resolve().then(()=>{this._chips.forEach(e=>{e._chipListMultiple=this.multiple,e.chipListSelectable=this._selectable,e._chipListHideSingleSelectionIndicator=this.hideSingleSelectionIndicator,e._changeDetectorRef.markForCheck()})})}_getFirstSelectedChip(){return Array.isArray(this.selected)?this.selected.length?this.selected[0]:void 0:this.selected}_skipPredicate(e){return!1}static \u0275fac=(()=>{let e;return function(i){return(e||(e=Ae(n)))(i||n)}})();static \u0275cmp=j({type:n,selectors:[["mat-chip-listbox"]],contentQueries:function(t,i,r){if(t&1&&$e(r,Yi,5),t&2){let a;G(a=K())&&(i._chips=a)}},hostAttrs:[1,"mdc-evolution-chip-set","mat-mdc-chip-listbox"],hostVars:10,hostBindings:function(t,i){t&1&&y("focus",function(){return i.focus()})("blur",function(){return i._blur()})("keydown",function(a){return i._keydown(a)}),t&2&&(Ee("tabIndex",i.disabled||i.empty?-1:i.tabIndex),ne("role",i.role)("aria-required",i.role?i.required:null)("aria-disabled",i.disabled.toString())("aria-multiselectable",i.multiple)("aria-orientation",i.ariaOrientation),E("mat-mdc-chip-list-disabled",i.disabled)("mat-mdc-chip-list-required",i.required))},inputs:{multiple:[2,"multiple","multiple",V],ariaOrientation:[0,"aria-orientation","ariaOrientation"],selectable:[2,"selectable","selectable",V],compareWith:"compareWith",required:[2,"required","required",V],hideSingleSelectionIndicator:[2,"hideSingleSelectionIndicator","hideSingleSelectionIndicator",V],value:"value"},outputs:{change:"change"},features:[ye([kr]),qe],ngContentSelectors:Lo,decls:2,vars:0,consts:[["role","presentation",1,"mdc-evolution-chip-set__chips"]],template:function(t,i){t&1&&(me(),Ve(0,"div",0),te(1),ze())},styles:[Cr],encapsulation:2,changeDetection:0})}return n})();var zo=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275mod=q({type:n});static \u0275inj=W({providers:[Oo,{provide:Ui,useValue:{separatorKeyCodes:[13]}}],imports:[Xt,ee]})}return n})();var Bo=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275mod=q({type:n});static \u0275inj=W({imports:[ee]})}return n})();var jo=(()=>{class n{http=h(It);auth=h(Dt);apiUrl="/api";allTickets=w([]);toastMessage=w(null);toastTicketId=w(null);tickets=H(()=>this.allTickets());hasTickets=H(()=>this.allTickets().length>0);activeCount=H(()=>this.allTickets().filter(e=>e.status==="abierto"||e.status==="en_progreso"||e.status==="reabierto"||e.status==="transferido").length);constructor(){this.auth.currentUser}loadTicketsForUser(e){let t=this.auth.token();if(!t){this.allTickets.set([]);return}this.http.get(`${this.apiUrl}/tickets`,{headers:{Authorization:`Bearer ${t}`}}).subscribe({next:i=>{let r=i.map(a=>L(k({},a),{created_at:new Date(a.created_at),updated_at:new Date(a.updated_at),closed_at:a.closed_at?new Date(a.closed_at):void 0,resolved_at:a.resolved_at?new Date(a.resolved_at):void 0,reopened_at:a.reopened_at?new Date(a.reopened_at):void 0,messages:a.messages?a.messages.map(d=>L(k({},d),{created_at:new Date(d.created_at)})):[]}));this.allTickets.set(r)},error:i=>{console.error("Error loading tickets from backend:",i),this.allTickets.set([])}})}clearTickets(){this.allTickets.set([])}getTicketDetails(e){let t=this.auth.token();return this.http.get(`${this.apiUrl}/tickets/${e}`,{headers:{Authorization:`Bearer ${t}`}}).pipe(de(i=>{let r=L(k({},i),{created_at:new Date(i.created_at),updated_at:new Date(i.updated_at),closed_at:i.closed_at?new Date(i.closed_at):void 0,resolved_at:i.resolved_at?new Date(i.resolved_at):void 0,reopened_at:i.reopened_at?new Date(i.reopened_at):void 0,messages:i.messages?i.messages.map(d=>L(k({},d),{created_at:new Date(d.created_at)})):[]}),a=this.allTickets().map(d=>d.id===e?r:d);this.allTickets.set(a)}))}createTicket(e,t,i,r,a,d,u){let g=this.auth.token();return this.http.post(`${this.apiUrl}/tickets`,{title:r,description:a,institution:t,priority:i,tags:d,attachments:u},{headers:{Authorization:`Bearer ${g}`}}).pipe(de(f=>{let _=f.ticket,M=[{id:_.id,title:_.title,description:_.description,user_id:_.user_id,institution:_.institution,priority:_.priority,status:_.status,tags:_.tags||[],attachments:_.attachments||[],created_at:new Date(_.created_at),updated_at:new Date(_.updated_at),messages:[]},...this.allTickets()];this.allTickets.set(M)}))}updateTicket(e,t,i,r=!1){let a=this.auth.token();return this.http.put(`${this.apiUrl}/tickets/${e}`,{description:t,priority:i},{headers:{Authorization:`Bearer ${a}`}}).pipe(de(d=>{let u=this.allTickets().map(g=>g.id===e?L(k({},g),{description:d.description||t,priority:d.priority||i,editCount:d.editCount??(g.editCount||0)+(r?1:0),updated_at:d.updated_at?new Date(d.updated_at):new Date}):g);this.allTickets.set(u)}))}addComment(e,t){let i=this.auth.token();return this.http.post(`${this.apiUrl}/tickets/${e}/messages`,{content:t},{headers:{Authorization:`Bearer ${i}`}}).pipe(de(r=>{let a={id:r.id,sender_id:r.sender_id,role:r.role,content:r.content,created_at:new Date(r.created_at)},d=this.allTickets().map(u=>u.id===e?L(k({},u),{messages:[...u.messages||[],a]}):u);this.allTickets.set(d)}))}updateTicketStatus(e,t){let i=this.auth.token();return this.http.put(`${this.apiUrl}/tickets/${e}/status`,{status:t},{headers:{Authorization:`Bearer ${i}`}}).pipe(de(r=>{let a=this.allTickets().map(d=>d.id===e?L(k({},d),{status:r.status,updated_at:new Date(r.updated_at),closed_at:r.closed_at?new Date(r.closed_at):void 0,resolved_at:r.resolved_at?new Date(r.resolved_at):void 0,reopened_at:r.reopened_at?new Date(r.reopened_at):void 0}):d);this.allTickets.set(a)}))}assignTicket(e,t,i){let r=this.auth.token();return this.http.put(`${this.apiUrl}/tickets/${e}/assign`,{assigned_to:t,reason:i||""},{headers:{Authorization:`Bearer ${r}`}}).pipe(de(a=>{let d=this.allTickets().map(u=>u.id===e?L(k({},u),{status:a.status,assigned_to:a.assigned_to||t,updated_at:new Date(a.updated_at),closed_at:a.closed_at?new Date(a.closed_at):void 0,resolved_at:a.resolved_at?new Date(a.resolved_at):void 0,reopened_at:a.reopened_at?new Date(a.reopened_at):void 0}):u);this.allTickets.set(d)}))}getAgents(){let e=this.auth.token();return this.http.get(`${this.apiUrl}/agents`,{headers:{Authorization:`Bearer ${e}`}})}getTags(){let e=this.auth.token();return this.http.get(`${this.apiUrl}/tags`,{headers:{Authorization:`Bearer ${e}`}})}deleteTicket(e){return we({success:!0})}static \u0275fac=function(t){return new(t||n)};static \u0275prov=I({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var Mr=(n,o)=>o._id,tt=(n,o)=>o.id;function Tr(n,o){n&1&&c(0," El t\xEDtulo es obligatorio ")}function Er(n,o){n&1&&c(0," El t\xEDtulo no debe superar los 100 caracteres ")}function Or(n,o){if(n&1&&(s(0,"span",21),v(1,Tr,1,0)(2,Er,1,0),l()),n&2){let e,t=m(2);p(),b((e=t.ticketForm.get("title"))!=null&&e.hasError("required")?1:(e=t.ticketForm.get("title"))!=null&&e.hasError("maxlength")?2:-1)}}function Ir(n,o){n&1&&(s(0,"span",21),c(1,"Email inv\xE1lido u obligatorio"),l())}function Dr(n,o){if(n&1&&(s(0,"mat-option",25),c(1),l()),n&2){let e=o.$implicit;T("value",e.name),p(),O(e.name)}}function Pr(n,o){n&1&&(s(0,"span",21),c(1,"Selecciona una instituci\xF3n"),l())}function Rr(n,o){if(n&1){let e=R();s(0,"button",42),y("click",function(){let i=x(e).$implicit,r=m(2);return C(r.setPriority(i.name))}),c(1),l()}if(n&2){let e=o.$implicit,t=m(2);E("active",t.selectedPriority()===e.name),T("ngClass",t.getPriorityChipClass(e.name)),p(),Ge(" ",t.getPriorityEmoji(e.name)," ",e.name," ")}}function Fr(n,o){n&1&&(s(0,"span",21),c(1,"La descripci\xF3n es obligatoria"),l())}function Ar(n,o){if(n&1){let e=R();s(0,"mat-chip-option",43),y("selectionChange",function(i){let r=x(e).$implicit,a=m(2);return C(a.toggleTag(r.id,i.selected))}),c(1),l()}if(n&2){let e=o.$implicit,t=m(2);T("selected",t.selectedTags().includes(e.id))("disabled",!t.selectedTags().includes(e.id)&&t.selectedTags().length>=5),p(),N(" ",e.name," ")}}function Lr(n,o){n&1&&(s(0,"span",33),c(1,"Debes seleccionar al menos 1 etiqueta"),l())}function Nr(n,o){n&1&&(s(0,"span",33),c(1,"M\xE1ximo 5 etiquetas permitidas"),l())}function Vr(n,o){n&1&&(s(0,"p"),c(1,"Arrastr\xE1 archivos o hac\xE9 click para adjuntar"),l())}function zr(n,o){if(n&1&&(s(0,"p",38),c(1),l()),n&2){let e=m(2);p(),Ge(" ",e.attachments().length," archivo(s) seleccionado(s): ",e.attachments().join(", ")," ")}}function Br(n,o){n&1&&c(0," Cargando... ")}function jr(n,o){n&1&&c(0," Enviar ticket \u2192 ")}function Hr(n,o){if(n&1){let e=R();s(0,"div",3)(1,"h2"),c(2,"Nuevo Ticket de Soporte"),l(),s(3,"p",10),c(4,"Los campos marcados con * son obligatorios"),l(),U(5,"div",11),s(6,"form",12),y("submit",function(i){x(e);let r=m();return C(r.onSubmit(i))}),s(7,"div",13)(8,"div",14)(9,"div",15)(10,"div",16)(11,"label"),c(12,"T\xEDtulo del error o solicitud *"),l(),s(13,"span",17),c(14),l()(),s(15,"div",18)(16,"span",19),c(17,"title"),l(),U(18,"input",20),l(),v(19,Or,3,1,"span",21),l(),s(20,"div",15)(21,"label"),c(22,"Email institucional *"),l(),s(23,"div",18)(24,"span",19),c(25,"email"),l(),U(26,"input",22),l(),v(27,Ir,2,0,"span",21),l(),s(28,"div",15)(29,"label"),c(30,"Instituci\xF3n *"),l(),s(31,"div",18)(32,"span",19),c(33,"search"),l(),s(34,"input",23),y("input",function(i){x(e);let r=m();return C(r.onInstitutionInput(i))}),l(),s(35,"mat-autocomplete",24,0),y("optionSelected",function(i){x(e);let r=m();return C(r.onInstitutionSelect(i.option.value))}),se(37,Dr,2,2,"mat-option",25,Mr),l()(),v(39,Pr,2,0,"span",21),l(),s(40,"div",15)(41,"label"),c(42,"Prioridad *"),l(),s(43,"div",26),se(44,Rr,2,5,"button",27,tt),l()()(),s(46,"div",14)(47,"div",15)(48,"label"),c(49,"Descripci\xF3n del error o solicitud *"),l(),U(50,"textarea",28),v(51,Fr,2,0,"span",21),l(),s(52,"div",15)(53,"div",29)(54,"label"),c(55,"Etiquetas"),l(),s(56,"span",30),c(57,"info"),l()(),s(58,"mat-chip-listbox",31),se(59,Ar,2,3,"mat-chip-option",32,tt),l(),v(61,Lr,2,0,"span",33)(62,Nr,2,0,"span",33),l()()(),s(63,"div",34)(64,"label"),c(65,"Adjuntar archivos"),l(),s(66,"div",35),y("dragover",function(i){x(e);let r=m();return C(r.onDragOver(i))})("dragleave",function(){x(e);let i=m();return C(i.onDragLeave())})("drop",function(i){x(e);let r=m();return C(r.onDrop(i))})("click",function(){x(e);let i=ni(68);return C(i.click())}),s(67,"input",36,1),y("change",function(i){x(e);let r=m();return C(r.onFileSelected(i))}),l(),s(69,"span",37),c(70,"attachment"),l(),v(71,Vr,2,0,"p")(72,zr,2,2,"p",38),l()(),U(73,"div",11),s(74,"div",39)(75,"button",40),y("click",function(){x(e);let i=m();return C(i.onCancel())}),c(76," Cancelar "),l(),s(77,"button",41),v(78,Br,1,0)(79,jr,1,0),l()()()()}if(n&2){let e,t=ni(36),i=m();p(6),T("formGroup",i.ticketForm),p(8),N(" ",((e=i.ticketForm.get("title"))==null||e.value==null?null:e.value.length)||0,"/100 "),p(5),b(i.showError("title")?19:-1),p(8),b(i.showError("email")?27:-1),p(7),T("matAutocomplete",t),p(3),le(i.filteredInstitutions()),p(2),b(i.showError("institution")?39:-1),p(5),le(i.priorities()),p(7),b(i.showError("description")?51:-1),p(5),T("title","Las etiquetas son definidas por el administrador del sistema y ayudan a clasificar tu consulta"),p(3),le(i.systemTags()),p(2),b(i.selectedTags().length===0?61:i.selectedTags().length>=5?62:-1),p(5),E("drag-over",i.isDragOver()),p(5),b(i.attachments().length===0?71:72),p(4),T("disabled",i.isSubmitting()),p(2),T("disabled",i.isSubmitting()||i.ticketForm.invalid||i.selectedTags().length<1||i.selectedTags().length>5),p(),b(i.isSubmitting()?78:79)}}function Ur(n,o){if(n&1){let e=R();s(0,"button",49),y("click",function(){x(e);let i=m(2);return C(i.setViewMode("create"))}),c(1," + Nuevo ticket "),l()}}function Wr(n,o){if(n&1){let e=R();s(0,"button",67),y("click",function(){x(e);let i=m(3);return C(i.clearSearch())}),s(1,"span",68),c(2,"close"),l()()}}function Yr(n,o){if(n&1){let e=R();s(0,"div",55)(1,"label",69),c(2,"Estado"),l(),s(3,"div",57)(4,"span",58),c(5,"filter_alt"),l(),s(6,"select",70),y("ngModelChange",function(i){x(e);let r=m(3);return C(r.userStatusFilter.set(i))}),s(7,"option",65),c(8,"Todos los estados"),l(),s(9,"option",71),c(10,"Abiertos"),l(),s(11,"option",72),c(12,"En progreso"),l(),s(13,"option",73),c(14,"Resueltos"),l()()()()}if(n&2){let e=m(3);p(6),T("ngModel",e.userStatusFilter())}}function qr(n,o){if(n&1&&(s(0,"option",25),c(1),l()),n&2){let e=o.$implicit;T("value",e),p(),O(e)}}function $r(n,o){if(n&1){let e=R();s(0,"button",74),y("click",function(){x(e);let i=m(3);return C(i.clearUserFilters())}),s(1,"span",68),c(2,"filter_alt_off"),l(),c(3," Restablecer "),l()}}function Gr(n,o){if(n&1){let e=R();s(0,"div",46)(1,"div",50)(2,"span",51),c(3,"search"),l(),s(4,"input",52),y("input",function(i){x(e);let r=m(2);return C(r.onSearchInput(i))}),l(),v(5,Wr,3,0,"button",53),l(),s(6,"div",54)(7,"div",55)(8,"label",56),c(9,"Ordenar por"),l(),s(10,"div",57)(11,"span",58),c(12,"sort"),l(),s(13,"select",59),y("ngModelChange",function(i){x(e);let r=m(2);return C(r.userSort.set(i))}),s(14,"option",60),c(15,"M\xE1s recientes"),l(),s(16,"option",61),c(17,"M\xE1s antiguos"),l(),s(18,"option",62),c(19,"Mayor prioridad"),l()()()(),v(20,Yr,15,1,"div",55),s(21,"div",55)(22,"label",63),c(23,"Etiqueta"),l(),s(24,"div",57)(25,"span",58),c(26,"label"),l(),s(27,"select",64),y("ngModelChange",function(i){x(e);let r=m(2);return C(r.userTagFilter.set(i))}),s(28,"option",65),c(29,"Todas las etiquetas"),l(),se(30,qr,2,2,"option",25,dt),l()()(),v(32,$r,4,0,"button",66),l()()}if(n&2){let e=m(2);p(4),T("value",e.searchQuery()),p(),b(e.searchQuery()?5:-1),p(8),T("ngModel",e.userSort()),p(7),b(e.innerViewMode()!=="archived"?20:-1),p(7),T("ngModel",e.userTagFilter()),p(3),le(e.userTags()),p(2),b(e.hasActiveUserFilters()?32:-1)}}function Kr(n,o){if(n&1){let e=R();s(0,"div",75)(1,"div",76),y("click",function(){x(e);let i=m(2);return C(i.setStatusFilter("todos"))}),s(2,"span",77),c(3,"Total"),l(),s(4,"span",78),c(5),l()(),s(6,"div",79),y("click",function(){x(e);let i=m(2);return C(i.setStatusFilter("abierto"))}),s(7,"span",77),c(8,"Abiertos"),l(),s(9,"span",78),c(10),l()(),s(11,"div",80),y("click",function(){x(e);let i=m(2);return C(i.setStatusFilter("en_progreso"))}),s(12,"span",77),c(13,"En progreso"),l(),s(14,"span",78),c(15),l()(),s(16,"div",81),y("click",function(){x(e);let i=m(2);return C(i.setStatusFilter("reabierto"))}),s(17,"span",77),c(18,"Reabiertos"),l(),s(19,"span",78),c(20),l()(),s(21,"div",82),y("click",function(){x(e);let i=m(2);return C(i.setStatusFilter("transferido"))}),s(22,"span",77),c(23,"Transferidos"),l(),s(24,"span",78),c(25),l()(),s(26,"div",83),y("click",function(){x(e);let i=m(2);return C(i.setStatusFilter("resuelto"))}),s(27,"span",77),c(28,"Resueltos"),l(),s(29,"span",78),c(30),l()()(),s(31,"div",84)(32,"div",85)(33,"span",51),c(34,"search"),l(),s(35,"input",86),y("input",function(i){x(e);let r=m(2);return C(r.onSearchInput(i))}),l()(),s(36,"span",87),c(37,"filter_alt"),l(),s(38,"div",88)(39,"button",89),y("click",function(){x(e);let i=m(2);return C(i.setStatusFilter("todos"))}),c(40," Todos "),l(),s(41,"button",89),y("click",function(){x(e);let i=m(2);return C(i.setStatusFilter("abierto"))}),c(42," Abierto "),l(),s(43,"button",89),y("click",function(){x(e);let i=m(2);return C(i.setStatusFilter("en_progreso"))}),c(44," En progreso "),l(),s(45,"button",89),y("click",function(){x(e);let i=m(2);return C(i.setStatusFilter("reabierto"))}),c(46," Reabierto "),l(),s(47,"button",89),y("click",function(){x(e);let i=m(2);return C(i.setStatusFilter("transferido"))}),c(48," Transferido "),l(),s(49,"button",89),y("click",function(){x(e);let i=m(2);return C(i.setStatusFilter("resuelto"))}),c(50," Resuelto "),l()()()}if(n&2){let e=m(2);p(5),O(e.statsTotal()),p(5),O(e.statsAbiertos()),p(5),O(e.statsProgreso()),p(5),O(e.statsReabiertos()),p(5),O(e.statsTransferidos()),p(5),O(e.statsResueltos()),p(9),E("active",e.selectedStatusFilter()==="todos"),p(2),E("active",e.selectedStatusFilter()==="abierto"),p(2),E("active",e.selectedStatusFilter()==="en_progreso"),p(2),E("active",e.selectedStatusFilter()==="reabierto"),p(2),E("active",e.selectedStatusFilter()==="transferido"),p(2),E("active",e.selectedStatusFilter()==="resuelto")}}function Qr(n,o){n&1&&c(0," No se encontraron tickets archivados. ")}function Xr(n,o){if(n&1&&c(0),n&2){let e=m(3);N(" ",e.currentUserRole()==="user"?"A\xFAn no ten\xE9s tickets enviados.":"No se encontraron tickets de soporte."," ")}}function Zr(n,o){if(n&1&&(s(0,"div",48)(1,"span",68),c(2),l(),s(3,"p"),v(4,Qr,1,0)(5,Xr,1,1),l()()),n&2){let e=m(2);p(2),O(e.innerViewMode()==="archived"?"archive":"confirmation_number"),p(2),b(e.innerViewMode()==="archived"?4:5)}}function Jr(n,o){n&1&&(s(0,"span",103)(1,"span",116),c(2,"chat"),l()())}function ea(n,o){n&1&&(s(0,"span",105),c(1," En progreso "),l())}function ta(n,o){n&1&&(s(0,"span",106),c(1,"Nuevo"),l())}function ia(n,o){if(n&1){let e=R();s(0,"button",119),y("click",function(i){x(e);let r=m(2).$implicit;return m(3).unarchiveTicket(r.id),C(i.stopPropagation())}),s(1,"span",120),c(2,"unarchive"),l()()}}function na(n,o){if(n&1){let e=R();s(0,"button",121),y("click",function(i){x(e);let r=m(2).$implicit;return m(3).archiveTicket(r.id),C(i.stopPropagation())}),s(1,"span",120),c(2,"archive"),l()()}}function oa(n,o){if(n&1&&v(0,ia,3,0,"button",117)(1,na,3,0,"button",118),n&2){let e=m().$implicit,t=m(3);b(t.isTicketArchived(e.id)?0:1)}}function ra(n,o){if(n&1&&(s(0,"p",108),c(1),l()),n&2){let e=m().$implicit;p(),N(" ",e.description," ")}}function aa(n,o){if(n&1&&(s(0,"p",108)(1,"strong",122),c(2),l(),c(3),l()),n&2){let e=m().$implicit;p(2),O(e.title),p(),N(" - ",e.description," ")}}function sa(n,o){if(n&1&&(s(0,"div",109)(1,"span",123),c(2,"assignment_ind"),l(),s(3,"span"),c(4),l()()),n&2){let e=m().$implicit,t=m(3);p(4),N("Asignado a: ",t.getAgentName(e.assigned_to))}}function la(n,o){if(n&1&&(s(0,"div",124)(1,"span",123),c(2,"history"),l(),s(3,"span"),c(4),he(5,"date"),l()()),n&2){let e=m(2).$implicit;p(4),N("Reabierto el ",ue(5,1,e.reopened_at,"dd/MM/yyyy HH:mm"))}}function ca(n,o){if(n&1&&(s(0,"div",125)(1,"span",123),c(2,"check_circle"),l(),s(3,"span"),c(4),he(5,"date"),l()()),n&2){let e=m(2).$implicit;p(4),N("Resuelto el ",ue(5,1,e.resolved_at,"dd/MM/yyyy HH:mm"))}}function da(n,o){if(n&1&&(s(0,"div",126)(1,"span",123),c(2,"edit_note"),l(),s(3,"span"),c(4),he(5,"date"),l()()),n&2){let e=m(2).$implicit;p(4),N("Modificado el ",ue(5,1,e.updated_at||e.created_at,"dd/MM/yyyy HH:mm"))}}function pa(n,o){if(n&1&&(s(0,"div",110),v(1,la,6,4,"div",124),v(2,ca,6,4,"div",125),v(3,da,6,4,"div",126),l()),n&2){let e=m().$implicit;p(),b(e.status==="reabierto"&&e.reopened_at?1:-1),p(),b(e.status==="resuelto"&&e.resolved_at?2:-1),p(),b(e.editCount&&e.editCount>=1?3:-1)}}function ma(n,o){if(n&1&&(s(0,"span",112),c(1),l()),n&2){let e=o.$implicit;p(),O(e)}}function ha(n,o){n&1&&(s(0,"span",113),c(1," Archivo adjunto "),l())}function ua(n,o){n&1&&(s(0,"div",114)(1,"span",127),c(2,"star"),l(),s(3,"span"),c(4,"Te han reasignado este ticket por ser agente especializado"),l()())}function fa(n,o){if(n&1&&(s(0,"div",115)(1,"span",128),c(2,"support_agent"),l(),s(3,"span"),c(4),l()()),n&2){let e=m().$implicit,t=m(3);p(4),N("Este ticket ha sido reasignado a un agente especializado -> ",t.getAgentName(e.assigned_to))}}function _a(n,o){if(n&1){let e=R();s(0,"div",91),y("click",function(){let i=x(e).$implicit,r=m(3);return C(r.onSelectTicket(i))}),s(1,"div",92),c(2),l(),s(3,"div",93)(4,"div",94)(5,"div",95)(6,"span",96),c(7),l(),s(8,"span",97),c(9),l(),s(10,"span",98),c(11,"\u2022"),l(),s(12,"span",99)(13,"span",100),c(14,"\u2022"),l(),s(15,"span"),c(16),l()(),s(17,"span",98),c(18,"\u2022"),l(),s(19,"span",101),c(20),he(21,"date"),l()(),s(22,"div",102),v(23,Jr,3,0,"span",103),s(24,"span",104),c(25),l(),v(26,ea,2,0,"span",105),v(27,ta,2,0,"span",106),s(28,"span",107),c(29),l(),v(30,oa,2,1),l()(),v(31,ra,2,1,"p",108)(32,aa,4,2,"p",108),v(33,sa,5,1,"div",109),v(34,pa,4,3,"div",110),s(35,"div",111),se(36,ma,2,1,"span",112,dt),v(38,ha,2,0,"span",113),l(),v(39,ua,5,0,"div",114),v(40,fa,5,1,"div",115),l()()}if(n&2){let e=o.$implicit,t=m(3);p(2),N(" ",t.getTicketUserInitials(e.user_id)," "),p(5),N(" ",t.currentUserRole()==="user"?e.title:t.getTicketUserFirstName(e.user_id)," "),p(2),O(e.institution),p(3),T("ngClass",t.getPriorityClass(e.priority)),p(4),O(e.priority),p(4),O(ue(21,19,e.created_at,"dd/MM/yyyy HH:mm")),p(3),b(t.hasUnreadResponse(e)?23:-1),p(),T("ngClass",e.status),p(),N(" ",t.getStatusLabel(e.status)," "),p(),b(e.status==="transferido"||e.status==="reabierto"?26:-1),p(),b(t.currentUserRole()!=="user"&&t.isTicketNew(e)?27:-1),p(2),O(t.getElapsedText(e.created_at)),p(),b(e.status==="resuelto"&&(t.currentUserRole()==="user"||e.assigned_to===t.currentUserId())?30:-1),p(),b(t.currentUserRole()==="user"?31:32),p(2),b(t.currentUserRole()!=="user"&&e.assigned_to?33:-1),p(),b(t.currentUserRole()!=="user"?34:-1),p(2),le(e.tags),p(2),b(e.attachments.length>0?38:-1),p(),b(t.currentUserRole()!=="user"&&e.status==="transferido"&&e.assigned_to===t.currentUserId()?39:-1),p(),b(t.currentUserRole()==="user"&&e.status==="transferido"&&e.assigned_to?40:-1)}}function ga(n,o){if(n&1&&se(0,_a,41,22,"div",90,tt),n&2){let e=m(2);le(e.ticketsList())}}function va(n,o){if(n&1&&(s(0,"div",4)(1,"div",44)(2,"h2"),c(3),l(),v(4,Ur,2,0,"button",45),l(),v(5,Gr,33,6,"div",46),v(6,Kr,51,18),U(7,"div",11),s(8,"div",47),v(9,Zr,6,2,"div",48)(10,ga,2,0),l()()),n&2){let e=m();p(3),O(e.innerViewMode()==="archived"?"Tickets Archivados":e.currentUserRole()==="user"?"Mis tickets":"Panel de Agente"),p(),b(e.currentUserRole()==="user"&&e.innerViewMode()!=="archived"?4:-1),p(),b(e.currentUserRole()==="user"?5:-1),p(),b(e.currentUserRole()!=="user"&&e.innerViewMode()!=="archived"?6:-1),p(2),E("agent-list",e.currentUserRole()!=="user"&&e.innerViewMode()!=="archived"),p(),b(e.ticketsList().length===0?9:10)}}function ba(n,o){if(n&1){let e=R();s(0,"button",134),y("click",function(){x(e);let i=m(4);return C(i.onEditStart())}),s(1,"span",68),c(2,"edit"),l(),c(3," Editar "),l()}}function ya(n,o){n&1&&(s(0,"div",135)(1,"span",136),c(2,"info"),l(),c(3," L\xEDmite de 1 edici\xF3n alcanzado "),l())}function xa(n,o){n&1&&(s(0,"div",135)(1,"span",136),c(2,"info"),l(),c(3," No es posible editar el ticket despu\xE9s de la respuesta de un agente "),l())}function Ca(n,o){if(n&1&&v(0,ya,4,0,"div",135)(1,xa,4,0,"div",135),n&2){let e=m(),t=m(3);b(e.editCount&&e.editCount>=1?0:e.status!=="abierto"||t.hasAgentResponse(e)?1:-1)}}function wa(n,o){if(n&1&&v(0,ba,4,0,"button",133)(1,Ca,2,1),n&2){let e=m(3);b(e.canEditTicket(o)?0:e.currentUserRole()==="user"?1:-1)}}function ka(n,o){if(n&1&&v(0,wa,2,1),n&2){let e,t=m(2);b((e=t.selectedTicket())?0:-1,e)}}function Sa(n,o){n&1&&(s(0,"span",105),c(1," En progreso "),l())}function Ma(n,o){if(n&1&&(s(0,"div",145)(1,"span",146),c(2,"Asignado a"),l(),s(3,"span",156),c(4),l()()),n&2){let e=m(2),t=m(2);p(4),O(t.getAgentName(e.assigned_to))}}function Ta(n,o){if(n&1&&(s(0,"div",145)(1,"span",146),c(2,"Reabierto"),l(),s(3,"span",157),c(4),he(5,"date"),l()()),n&2){let e=m(2);p(4),O(ue(5,1,e.reopened_at,"dd/MM/yyyy HH:mm"))}}function Ea(n,o){if(n&1&&(s(0,"div",145)(1,"span",146),c(2,"Resuelto"),l(),s(3,"span",158),c(4),he(5,"date"),l()()),n&2){let e=m(2);p(4),O(ue(5,1,e.resolved_at,"dd/MM/yyyy HH:mm"))}}function Oa(n,o){if(n&1&&(s(0,"div",145)(1,"span",146),c(2,"\xDAltima Edici\xF3n"),l(),s(3,"span",159),c(4),he(5,"date"),l()()),n&2){let e=m(2);p(4),O(ue(5,1,e.updated_at||e.created_at,"dd/MM/yyyy HH:mm"))}}function Ia(n,o){n&1&&(s(0,"div",150)(1,"span",160),c(2,"star"),l(),s(3,"span"),c(4,"Te han reasignado este ticket por ser agente especializado"),l()())}function Da(n,o){if(n&1&&(s(0,"div",151)(1,"span",161),c(2,"support_agent"),l(),s(3,"span"),c(4),l()()),n&2){let e=m(2),t=m(2);p(4),N("Se ha asignado a un agente especializado para tu consulta -> ",t.getAgentName(e.assigned_to))}}function Pa(n,o){if(n&1&&(s(0,"div",154)(1,"div",162)(2,"span",163),c(3,"swap_horiz"),l(),s(4,"span"),c(5,"Motivo de la transferencia"),l()(),s(6,"p",164),c(7),l()()),n&2){let e=m(2);p(7),N('"',e.transfer_reason,'"')}}function Ra(n,o){if(n&1){let e=R();s(0,"button",174),y("click",function(){x(e);let i=m(4),r=m(2);return C(r.openResolveConfirmation(i.id))}),s(1,"span",173),c(2,"task_alt"),l(),c(3," Resolver Ticket "),l()}}function Fa(n,o){n&1&&(s(0,"div",170)(1,"span",175),c(2,"check_circle"),l(),c(3," Ticket Resuelto "),l())}function Aa(n,o){if(n&1){let e=R();s(0,"div",165)(1,"h4"),c(2,"Acciones de Soporte T\xE9cnico"),l(),s(3,"div",167)(4,"div",168),v(5,Ra,4,0,"button",169)(6,Fa,4,0,"div",170),l(),U(7,"div",171),s(8,"div",168)(9,"button",172),y("click",function(){x(e);let i=m(3),r=m(2);return C(r.openTransferModal(i))}),s(10,"span",173),c(11,"swap_horiz"),l(),c(12," Transferir Ticket "),l()()()()}if(n&2){let e=m(3);p(5),b(e.status!=="resuelto"?5:6)}}function La(n,o){if(n&1&&(s(0,"div",166)(1,"span",68),c(2,"info"),l(),s(3,"span"),c(4,"Este ticket est\xE1 asignado a "),s(5,"strong"),c(6),l(),c(7,". Solo el agente asignado puede responder o resolver este ticket."),l()()),n&2){let e=m(3),t=m(2);p(6),O(t.getAgentName(e.assigned_to))}}function Na(n,o){if(n&1&&v(0,Aa,13,1,"div",165)(1,La,8,1,"div",166),n&2){let e=m(2),t=m(2);b(!e.assigned_to||e.assigned_to===t.currentUserId()?0:1)}}function Va(n,o){if(n&1&&(s(0,"div",177)(1,"span",68),c(2,"insert_drive_file"),l(),s(3,"span",178),c(4),l()()),n&2){let e=o.$implicit;p(3),T("title",e),p(),O(e)}}function za(n,o){if(n&1&&(s(0,"div",155)(1,"h4"),c(2,"Archivos Adjuntos"),l(),s(3,"div",176),se(4,Va,5,2,"div",177,dt),l()()),n&2){let e=m(2);p(4),le(e.attachments)}}function Ba(n,o){if(n&1&&(s(0,"div",144)(1,"div",145)(2,"span",146),c(3,"Instituci\xF3n"),l(),s(4,"span",147),c(5),l()(),s(6,"div",145)(7,"span",146),c(8,"Prioridad"),l(),s(9,"span",148),c(10),l()(),s(11,"div",145)(12,"span",146),c(13,"Estado"),l(),s(14,"div",149)(15,"span",104),c(16),l(),v(17,Sa,2,0,"span",105),l()(),s(18,"div",145)(19,"span",146),c(20,"Creado"),l(),s(21,"span",147),c(22),he(23,"date"),l()(),v(24,Ma,5,1,"div",145),v(25,Ta,6,4,"div",145),v(26,Ea,6,4,"div",145),v(27,Oa,6,4,"div",145),l(),v(28,Ia,5,0,"div",150),v(29,Da,5,1,"div",151),s(30,"div",152)(31,"h4"),c(32,"Descripci\xF3n del incidente"),l(),s(33,"p",153),c(34),l()(),v(35,Pa,8,1,"div",154),v(36,Na,2,1),v(37,za,6,0,"div",155)),n&2){let e=m(),t=m(2);p(5),O(e.institution),p(4),T("ngClass",t.getPriorityClass(e.priority)),p(),N(" ",e.priority," "),p(5),T("ngClass",e.status),p(),N(" ",t.getStatusLabel(e.status)," "),p(),b(e.status==="transferido"||e.status==="reabierto"?17:-1),p(5),O(ue(23,17,e.created_at,"dd/MM/yyyy HH:mm")),p(2),b(e.assigned_to?24:-1),p(),b(e.status==="reabierto"&&e.reopened_at?25:-1),p(),b(e.status==="resuelto"&&e.resolved_at?26:-1),p(),b(e.editCount&&e.editCount>=1?27:-1),p(),b(t.currentUserRole()!=="user"&&e.status==="transferido"&&e.assigned_to===t.currentUserId()?28:-1),p(),b(t.currentUserRole()==="user"&&e.status==="transferido"&&e.assigned_to?29:-1),p(5),O(e.description),p(),b(t.currentUserRole()!=="user"&&e.transfer_reason?35:-1),p(),b(t.currentUserRole()!=="user"?36:-1),p(),b(e.attachments.length>0?37:-1)}}function ja(n,o){if(n&1){let e=R();s(0,"button",42),y("click",function(){let i=x(e).$implicit,r=m(4);return C(r.editPriority=i.name)}),c(1),l()}if(n&2){let e=o.$implicit,t=m(4);E("active",t.editPriority===e.name),T("ngClass",t.getPriorityChipClass(e.name)),p(),Ge(" ",t.getPriorityEmoji(e.name)," ",e.name," ")}}function Ha(n,o){if(n&1){let e=R();s(0,"div",139)(1,"div",15)(2,"label"),c(3,"Prioridad"),l(),s(4,"div",26),se(5,ja,2,5,"button",27,tt),l()(),s(7,"div",15)(8,"label"),c(9,"Descripci\xF3n del error o solicitud"),l(),s(10,"textarea",179),ai("ngModelChange",function(i){x(e);let r=m(3);return ri(r.editDescription,i)||(r.editDescription=i),C(i)}),l()(),s(11,"div",180)(12,"button",181),y("click",function(){x(e);let i=m(3);return C(i.onEditCancel())}),c(13,"Cancelar"),l(),s(14,"button",182),y("click",function(){x(e);let i=m(3);return C(i.onEditSave())}),c(15,"Guardar Cambios"),l()()()}if(n&2){let e=m(3);p(5),le(e.priorities()),p(5),oi("ngModel",e.editDescription),p(4),T("disabled",!e.editDescription.trim())}}function Ua(n,o){if(n&1&&(s(0,"div",183)(1,"span",68),c(2,"info"),l(),s(3,"span"),c(4),l(),s(5,"span",185),c(6),he(7,"date"),l()()),n&2){let e=m().$implicit;p(4),O(e.content),p(2),O(ue(7,2,e.created_at,"dd/MM/yyyy HH:mm"))}}function Wa(n,o){if(n&1&&(s(0,"div",184)(1,"div",186)(2,"span",187),c(3),l(),s(4,"span",188),c(5),he(6,"date"),l()(),s(7,"p",189),c(8),l()()),n&2){let e=m().$implicit,t=m(3);T("ngClass",e.role),p(3),N(" ",t.getCommentSender(e)," "),p(2),O(ue(6,4,e.created_at,"dd/MM/yyyy HH:mm")),p(3),O(e.content)}}function Ya(n,o){if(n&1&&v(0,Ua,8,5,"div",183)(1,Wa,9,7,"div",184),n&2){let e=o.$implicit;b(e.role==="system"?0:1)}}function qa(n,o){if(n&1){let e=R();s(0,"form",190),y("submit",function(i){x(e);let r=m(3);return C(r.onSubmitComment(i))}),s(1,"textarea",191),ai("ngModelChange",function(i){x(e);let r=m(3);return ri(r.newCommentText,i)||(r.newCommentText=i),C(i)}),l(),s(2,"button",192),c(3," Enviar Comentario "),l()()}if(n&2){let e=m(3);p(),oi("ngModel",e.newCommentText),T("placeholder",e.currentUserRole()==="user"?"Escrib\xED un comentario o respuesta para el equipo de soporte...":"Escrib\xED una respuesta o comentario para el usuario..."),p(),T("disabled",!e.newCommentText.trim()||e.isSendingComment())}}function $a(n,o){n&1&&(s(0,"div",143)(1,"span",193),c(2,"lock"),l(),s(3,"span"),c(4,"Solo el agente asignado puede responder a este ticket."),l()())}function Ga(n,o){if(n&1&&(s(0,"div",132)(1,"div",137)(2,"h2",138),c(3),l()(),v(4,Ba,38,20)(5,Ha,16,2,"div",139),s(6,"div",140)(7,"h3"),c(8,"Historial de Mensajes y Respuestas"),l(),s(9,"div",141),se(10,Ya,2,1,null,null,tt),l(),v(12,qa,4,3,"form",142)(13,$a,5,0,"div",143),l()()),n&2){let e=o,t=m(2);p(3),N(" ",e.title," "),p(),b(t.isEditing()?5:4),p(6),le(t.ticketComments()),p(2),b(t.currentUserRole()==="user"||!e.assigned_to||e.assigned_to===t.currentUserId()?12:13)}}function Ka(n,o){if(n&1){let e=R();s(0,"div",5)(1,"div",129)(2,"button",130),y("click",function(){x(e);let i=m();return C(i.setViewMode(i.previousListMode()))}),s(3,"span",68),c(4,"arrow_back"),l(),c(5," Volver "),l(),s(6,"div",131),v(7,ka,1,1),l()(),U(8,"div",11),v(9,Ga,14,3,"div",132),l()}if(n&2){let e,t=m();p(7),b(t.isEditing()?-1:7),p(2),b((e=t.selectedTicket())?9:-1,e)}}function Qa(n,o){if(n&1){let e=R();s(0,"button",201),y("click",function(){let i=x(e).$implicit,r=m(2);return C(r.selectedSpecializationFilter.set(i))}),c(1),l()}if(n&2){let e=o.$implicit,t=m(2);E("active",t.selectedSpecializationFilter()===e),p(),N(" ",e," ")}}function Xa(n,o){if(n&1&&(s(0,"div",225)(1,"span",227),c(2,"chat_bubble_outline"),l(),s(3,"span"),c(4),l()()),n&2){let e=m().$implicit;p(4),Ge("",e.active_chats," ",e.active_chats===1?"chat":"chats")}}function Za(n,o){n&1&&(s(0,"span",226),c(1,"No disponible"),l())}function Ja(n,o){if(n&1){let e=R();s(0,"div",218),y("click",function(){let i=x(e).$implicit,r=m(2);return C(r.selectAgentForTransfer(i))}),s(1,"div",219),c(2),U(3,"span",220),l(),s(4,"div",221)(5,"span",222),c(6),l(),s(7,"span",223),c(8),l()(),s(9,"div",224),v(10,Xa,5,2,"div",225)(11,Za,2,0,"span",226),l()()}if(n&2){let e=o.$implicit,t=m(2);E("selected",t.selectedTransferAgentId()===e.id)("disabled",!e.is_active),p(2),N(" ",t.getAgentInitials(e)," "),p(),E("online",e.is_active),p(3),Ge("",e.first_name," ",e.last_name),p(2),O(e.specialization),p(2),b(e.is_active?10:11)}}function es(n,o){n&1&&(s(0,"div",209),c(1," No se encontraron agentes que coincidan con los filtros. "),l())}function ts(n,o){if(n&1&&(c(0," Transferir a: "),s(1,"strong"),c(2),l()),n&2){let e=m(2);p(2),O(e.getSelectedAgentName())}}function is(n,o){n&1&&c(0," Selecciona un agente disponible ")}function ns(n,o){if(n&1){let e=R();s(0,"div",6)(1,"div",194)(2,"div",195)(3,"h3"),c(4,"Transferir ticket"),l(),s(5,"button",196),y("click",function(){x(e);let i=m();return C(i.closeTransferModal())}),s(6,"span",68),c(7,"close"),l()()(),s(8,"p",197),c(9,"Seleccion\xE1 el agente destino y el motivo"),l(),s(10,"div",198)(11,"span",51),c(12,"search"),l(),s(13,"input",199),y("ngModelChange",function(i){x(e);let r=m();return C(r.transferSearchQuery.set(i))}),l()(),s(14,"div",200)(15,"button",201),y("click",function(){x(e);let i=m();return C(i.selectedSpecializationFilter.set("Todos"))}),c(16," Todos "),l(),se(17,Qa,2,3,"button",202,dt),l(),s(19,"div",203)(20,"button",204),y("click",function(){x(e);let i=m();return C(i.onlineStatusFilter.set("online"))}),U(21,"span",205),c(22," En l\xEDnea "),l(),s(23,"button",204),y("click",function(){x(e);let i=m();return C(i.onlineStatusFilter.set("offline"))}),U(24,"span",206),c(25," Fuera de l\xEDnea "),l()(),s(26,"div",207),se(27,Ja,12,11,"div",208,tt,!1,es,2,0,"div",209),l(),s(30,"div",210)(31,"label",211),c(32,"Motivo de la transferencia (Obligatorio)"),l(),s(33,"textarea",212),y("ngModelChange",function(i){x(e);let r=m();return C(r.transferReason.set(i))}),l()(),s(34,"div",213)(35,"span",214),v(36,ts,3,1)(37,is,1,0),l(),s(38,"div",215)(39,"button",216),y("click",function(){x(e);let i=m();return C(i.closeTransferModal())}),c(40," Cancelar "),l(),s(41,"button",217),y("click",function(){x(e);let i=m();return C(i.confirmTransfer())}),s(42,"span",68),c(43,"trending_flat"),l(),c(44," Transferir "),l()()()()()}if(n&2){let e=m();p(13),T("ngModel",e.transferSearchQuery()),p(2),E("active",e.selectedSpecializationFilter()==="Todos"),p(2),le(e.availableSpecializations()),p(3),E("active",e.onlineStatusFilter()==="online"),p(3),E("active",e.onlineStatusFilter()==="offline"),p(4),le(e.filteredAgentsForTransfer()),p(6),T("ngModel",e.transferReason()),p(3),b(e.selectedTransferAgentId()?36:37),p(5),T("disabled",e.isTransferDisabled())}}function os(n,o){if(n&1){let e=R();s(0,"div",7)(1,"div",228)(2,"div",229)(3,"span",230),c(4,"task_alt"),l(),s(5,"h3"),c(6,"\xBFTodo Listo?"),l(),s(7,"p"),c(8,'Al confirmar, el estado de este ticket cambiar\xE1 a "Resuelto".'),l()(),s(9,"div",231)(10,"button",232),y("click",function(){x(e);let i=m();return C(i.closeResolveConfirmation())}),c(11," Cancelar "),l(),s(12,"button",233),y("click",function(){x(e);let i=m();return C(i.confirmResolve())}),c(13," Confirmar "),l()()()()}}function rs(n,o){if(n&1){let e=R();s(0,"div",8)(1,"div",234)(2,"span",235),c(3,"check_circle"),l(),s(4,"h4"),c(5,"Ticket creado correctamente"),l(),s(6,"p",236),c(7," Es posible editar un ticket solo una vez, antes de que un agente responda. Luego de que se inicie la conversaci\xF3n con el agente, el contenido del mismo no podr\xE1 ser modificado. "),l(),s(8,"div",237)(9,"button",238),y("click",function(){x(e);let i=m();return C(i.showCreateSuccess.set(!1))}),c(10,"Entendido"),l()()()()}}function as(n,o){if(n&1){let e=R();s(0,"div",8)(1,"div",234)(2,"span",239),c(3,"check_circle"),l(),s(4,"h4"),c(5,"Ticket transferido correctamente"),l(),s(6,"p",236),c(7," El ticket ha sido asignado al nuevo agente y se ha registrado el motivo en el historial del ticket. "),l(),s(8,"div",237)(9,"button",238),y("click",function(){x(e);let i=m();return C(i.showTransferSuccess.set(!1))}),c(10,"Entendido"),l()()()()}}function ss(n,o){if(n&1){let e=R();s(0,"div",8)(1,"div",234)(2,"span",240),c(3,"info"),l(),s(4,"h4"),c(5,"Ticket Resuelto"),l(),s(6,"p",236),c(7," Este ticket ha sido marcado como resuelto por el equipo de soporte. Si consider\xE1s que el problema a\xFAn no fue solucionado, pod\xE9s reabrirlo autom\xE1ticamente enviando un nuevo comentario en el historial de mensajes de abajo. "),l(),s(8,"div",237)(9,"button",241),y("click",function(){x(e);let i=m();return C(i.showReopenInfo.set(!1))}),c(10,"Entendido"),l()()()()}}function ls(n,o){if(n&1){let e=R();s(0,"div",242),y("click",function(){x(e);let i=m();return C(i.goToTicketFromToast())}),s(1,"span",243),c(2,"notifications_active"),l(),s(3,"div",244)(4,"span",245),c(5,"Nueva respuesta"),l(),s(6,"span",246),c(7),l()(),s(8,"button",247),y("click",function(i){x(e);let r=m();return C(r.closeToast(i))}),s(9,"span",68),c(10,"close"),l()()()}n&2&&(p(7),O(o))}var Bm=(()=>{class n{ticketService=h(jo);authService=h(Dt);fb=h(Mn);destroyRef=h(ii);http=h(It);pollingSub;route=h(hn);router=h(un);previousListMode=w("list");archivedTicketIds=w([]);showResolveConfirmModal=w(!1);ticketToResolveId=w("");activeTickets=H(()=>{let e=this.ticketService.tickets(),t=this.archivedTicketIds(),i=this.currentUserRole(),r=this.currentUserId();return e.filter(a=>a.status==="resuelto"&&t.includes(a.id)?i!=="user"?a.assigned_to!==r:!1:!0)});readTicketIds=w([]);selectedStatusFilter=w("todos");searchQuery=w("");userSort=w("recent");userStatusFilter=w("all");userTagFilter=w("all");userTags=H(()=>{if(this.currentUserRole()!=="user")return[];let t=this.ticketService.tickets(),i=this.archivedTicketIds(),r=this.innerViewMode()==="archived",a=t.filter(f=>{let _=f.status==="resuelto"&&i.includes(f.id);return r?_:!_}),d=new Set;for(let f of a)if(f.tags)for(let _ of f.tags)d.add(_);let u=[],g=new Set;for(let f of d){let _=this.cleanTagName(f);if(!g.has(_))g.add(_),u.push(f);else{let S=u.findIndex(M=>this.cleanTagName(M)===_);S!==-1&&f.includes("\xF3")&&!u[S].includes("\xF3")&&(u[S]=f)}}return u.sort((f,_)=>f.localeCompare(_))});hasActiveUserFilters=H(()=>{let e=this.innerViewMode()==="archived";return this.searchQuery()!==""||this.userSort()!=="recent"||!e&&this.userStatusFilter()!=="all"||this.userTagFilter()!=="all"});clearUserFilters(){this.searchQuery.set(""),this.userSort.set("recent"),this.userStatusFilter.set("all"),this.userTagFilter.set("all")}clearSearch(){this.searchQuery.set("")}lastSeenMessageTimes=w({});get toastMessage(){return this.ticketService.toastMessage}get toastTicketId(){return this.ticketService.toastTicketId}notifiedMessageIds=new Set;systemTags=w([]);showTransferModal=w(!1);ticketToTransfer=w(null);transferSearchQuery=w("");selectedSpecializationFilter=w("Todos");onlineStatusFilter=w("todos");selectedTransferAgentId=w("");transferReason=w("");availableSpecializations=H(()=>{let e=this.systemTags().map(a=>a.name),t=e.some(a=>a.toLowerCase()==="acceso"),i=e.some(a=>a.toLowerCase()==="autenticaci\xF3n"||a.toLowerCase()==="autenticacion"),r=e.filter(a=>a.toLowerCase()!=="acceso"&&a.toLowerCase()!=="autenticaci\xF3n"&&a.toLowerCase()!=="autenticacion");return(t||i)&&(r=["Acceso y Autenticaci\xF3n",...r]),r});filteredAgentsForTransfer=H(()=>{let e=this.transferSearchQuery().toLowerCase().trim(),t=this.selectedSpecializationFilter(),i=this.onlineStatusFilter();return this.agentsList().filter(r=>{let a=`${r.first_name} ${r.last_name}`.toLowerCase(),d=(r.specialization||"").toLowerCase(),u=!e||a.includes(e)||d.includes(e),g=!0;t!=="Todos"&&(t==="Acceso y Autenticaci\xF3n"?g=r.specialization==="Acceso"||r.specialization==="Autenticaci\xF3n"||r.specialization==="Acceso y Autenticaci\xF3n":g=r.specialization===t);let f=!0;return i==="online"?f=r.is_active===!0:i==="offline"&&(f=r.is_active===!1),u&&g&&f})});isTransferDisabled=H(()=>{let e=this.selectedTransferAgentId(),t=this.transferReason().trim();if(!e||t.length<4)return!0;let i=this.agentsList().find(r=>r.id===e);return!i||!i.is_active});statsTotal=H(()=>this.activeTickets().length);statsAbiertos=H(()=>this.activeTickets().filter(e=>e.status==="abierto"&&!e.assigned_to).length);statsProgreso=H(()=>{let e=this.currentUserId();return this.activeTickets().filter(t=>t.status==="en_progreso"&&t.assigned_to===e).length});statsReabiertos=H(()=>{let e=this.currentUserId();return this.activeTickets().filter(t=>t.status==="reabierto"&&t.assigned_to===e).length});statsTransferidos=H(()=>{let e=this.currentUserId();return this.activeTickets().filter(t=>t.status==="transferido"&&t.assigned_to===e).length});statsResueltos=H(()=>{let e=this.currentUserId();return this.activeTickets().filter(t=>t.status==="resuelto"&&t.assigned_to===e).length});ticketSelected=new Q;innerViewMode=w("create");selectedTicket=w(null);currentUserRole=H(()=>this.authService.currentUser()?.role||"");currentUserId=H(()=>this.authService.currentUser()?.id||"");ticketForm;isSubmitting=w(!1);isDragOver=w(!1);institutions=w([]);institutionQuery=w("");filteredInstitutions=H(()=>{let e=this.institutionQuery().toLowerCase(),t=this.institutions();return e?t.filter(i=>i.name.toLowerCase().includes(e)):t});selectedPriority=w("Media");priorities=w([]);availableTags=["Acceso","Turnos","Historia Cl\xEDnica","Facturaci\xF3n","Otro"];selectedTags=w([]);attachments=w([]);cleanTagName(e){return(e||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").trim()}ticketsList=H(()=>{let e=this.ticketService.tickets(),t=this.currentUserRole(),i=this.searchQuery().toLowerCase().trim(),r=this.selectedStatusFilter(),a=this.authService.currentUser()?.id||"";if(this.innerViewMode()==="archived"){let u=this.archivedTicketIds(),g=e.filter(f=>f.status==="resuelto"&&u.includes(f.id));if(t!=="user"&&(g=g.filter(f=>f.assigned_to===a)),t==="user"){i&&(g=g.filter(S=>S.title.toLowerCase().includes(i)||S.description.toLowerCase().includes(i)));let f=this.userTagFilter();if(f!=="all"){let S=this.cleanTagName(f);g=g.filter(M=>M.tags.some(A=>this.cleanTagName(A)===S))}let _=this.userSort();return[...g].sort((S,M)=>{if(_==="oldest")return new Date(S.created_at).getTime()-new Date(M.created_at).getTime();if(_==="priority"){let A=it=>{switch(it){case"Cr\xEDtica":return 4;case"Alta":return 3;case"Media":return 2;case"Baja":return 1;default:return 0}},P=A(S.priority),oe=A(M.priority);return P!==oe?oe-P:new Date(M.created_at).getTime()-new Date(S.created_at).getTime()}else return new Date(M.created_at).getTime()-new Date(S.created_at).getTime()})}else return i&&(g=g.filter(f=>f.title.toLowerCase().includes(i)||f.description.toLowerCase().includes(i)||f.institution.toLowerCase().includes(i))),[...g].sort((f,_)=>{let S=f.updated_at?new Date(f.updated_at).getTime():new Date(f.created_at).getTime();return(_.updated_at?new Date(_.updated_at).getTime():new Date(_.created_at).getTime())-S})}let d=this.activeTickets();if(t==="user"){i&&(d=d.filter(_=>_.title.toLowerCase().includes(i)||_.description.toLowerCase().includes(i)));let u=this.userStatusFilter();u==="open"?d=d.filter(_=>_.status==="abierto"):u==="in_progress"?d=d.filter(_=>_.status==="en_progreso"||_.status==="transferido"||_.status==="reabierto"):u==="resolved"&&(d=d.filter(_=>_.status==="resuelto"));let g=this.userTagFilter();if(g!=="all"){let _=this.cleanTagName(g);d=d.filter(S=>S.tags.some(M=>this.cleanTagName(M)===_))}let f=this.userSort();return[...d].sort((_,S)=>{if(f==="oldest")return new Date(_.created_at).getTime()-new Date(S.created_at).getTime();if(f==="priority"){let M=oe=>{switch(oe){case"Cr\xEDtica":return 4;case"Alta":return 3;case"Media":return 2;case"Baja":return 1;default:return 0}},A=M(_.priority),P=M(S.priority);return A!==P?P-A:new Date(S.created_at).getTime()-new Date(_.created_at).getTime()}else return new Date(S.created_at).getTime()-new Date(_.created_at).getTime()})}else r==="abierto"?d=d.filter(u=>u.status==="abierto"&&!u.assigned_to):r==="en_progreso"?d=d.filter(u=>u.assigned_to===a&&u.status==="en_progreso"):r==="reabierto"?d=d.filter(u=>u.assigned_to===a&&u.status==="reabierto"):r==="transferido"?d=d.filter(u=>u.assigned_to===a&&u.status==="transferido"):r==="resuelto"&&(d=d.filter(u=>u.assigned_to===a&&u.status==="resuelto")),i&&(d=d.filter(u=>u.title.toLowerCase().includes(i)||u.description.toLowerCase().includes(i)||u.institution.toLowerCase().includes(i)||u.user_id.toLowerCase().includes(i)));return[...d].sort((u,g)=>{let f=P=>{if(t!=="user"&&this.isTicketNew(P))return 1;if(this.hasUnreadResponse(P))return 2;switch(P.status){case"abierto":return 3;case"reabierto":return 4;case"en_progreso":case"transferido":return 5;case"resuelto":return 6;default:return 7}},_=f(u),S=f(g);if(_!==S)return _-S;let M=u.updated_at?new Date(u.updated_at).getTime():new Date(u.created_at).getTime();return(g.updated_at?new Date(g.updated_at).getTime():new Date(g.created_at).getTime())-M})});initReadTickets(e){try{let t=localStorage.getItem(`read_ticket_ids_${e}`);if(t)this.readTicketIds.set(JSON.parse(t));else{let i=localStorage.getItem("read_ticket_ids");i?this.readTicketIds.set(JSON.parse(i)):this.readTicketIds.set([])}}catch(t){console.error("Error reading read_ticket_ids:",t),this.readTicketIds.set([])}}initLastSeenTimes(e){try{let t=localStorage.getItem(`last_seen_message_times_${e}`);t?this.lastSeenMessageTimes.set(JSON.parse(t)):this.lastSeenMessageTimes.set({})}catch(t){console.error("Error reading last_seen_message_times:",t)}}markTicketMessagesAsSeen(e,t){let i=this.authService.currentUser();if(!i)return;let r=this.ticketService.tickets().find(d=>d.id===e);if(r){let d=i.role;if(!(d==="user"&&r.user_id===i.username||d!=="user"&&r.assigned_to===i.id))return}let a=k({},this.lastSeenMessageTimes());a[e]=t.toISOString(),this.lastSeenMessageTimes.set(a);try{localStorage.setItem(`last_seen_message_times_${i.id}`,JSON.stringify(a))}catch(d){console.error("Error saving last_seen_message_times:",d)}this.toastTicketId()===e&&(this.toastMessage.set(null),this.toastTicketId.set(null))}hasUnreadResponse(e){if(e.status==="resuelto"||!e.messages||e.messages.length===0)return!1;let t=e.messages[e.messages.length-1],i=this.currentUserRole(),r=this.authService.currentUser()?.id||"";if(i==="user"){if(!(t.role!=="user"))return!1;let d=this.lastSeenMessageTimes()[e.id];return d?new Date(t.created_at).getTime()>new Date(d).getTime():!0}else{if(e.status==="abierto"||!e.assigned_to||e.assigned_to!==r||!(t.role==="user"))return!1;let d=this.lastSeenMessageTimes()[e.id];return d?new Date(t.created_at).getTime()>new Date(d).getTime():!0}}goToTicketFromToast(){let e=this.toastTicketId();if(e){let t=this.ticketService.tickets().find(i=>i.id===e);t&&this.onSelectTicket(t)}this.toastMessage.set(null),this.toastTicketId.set(null)}closeToast(e){e.stopPropagation(),this.toastMessage.set(null),this.toastTicketId.set(null)}isTicketNew(e){return e.status!=="abierto"||e.assigned_to||this.isTicketRead(e.id)?!1:!(e.messages?.some(i=>i.role==="agent")||!1)}isTicketRead(e){return this.readTicketIds().includes(e)}markTicketAsRead(e){let t=this.authService.currentUser();if(t&&!this.readTicketIds().includes(e)){let i=[...this.readTicketIds(),e];this.readTicketIds.set(i);try{localStorage.setItem(`read_ticket_ids_${t.id}`,JSON.stringify(i))}catch(r){console.error("Error saving read_ticket_ids:",r)}}}isEditing=w(!1);editDescription="";editPriority="Media";showCreateSuccess=w(!1);showReopenInfo=w(!1);showTransferSuccess=w(!1);newCommentText="";isSendingComment=w(!1);ticketComments=H(()=>{let e=this.selectedTicket();return e?e.messages||[]:[]});agentsList=w([]);constructor(){this.initForm(),Se(()=>{let e=this.authService.currentUser();if(e){this.initLastSeenTimes(e.id),this.initReadTickets(e.id);try{let t=localStorage.getItem(`hsi_archived_tickets_${e.id}`);if(t)this.archivedTicketIds.set(JSON.parse(t));else{let i=localStorage.getItem("hsi_archived_tickets");if(i){let r=JSON.parse(i);this.archivedTicketIds.set(r),localStorage.setItem(`hsi_archived_tickets_${e.id}`,i)}else this.archivedTicketIds.set([])}}catch(t){console.error("Error reading archived tickets:",t),this.archivedTicketIds.set([])}}}),Se(()=>{let e=this.ticketService.tickets();if(!this.authService.currentUser()||e.length===0)return;let i=!1,r="",a="";for(let d of e)if(this.hasUnreadResponse(d)){let u=d.messages[d.messages.length-1],g=this.selectedTicket();g&&g.id===d.id&&this.innerViewMode()==="detail"?this.markTicketMessagesAsSeen(d.id,new Date(u.created_at)):this.notifiedMessageIds.has(u.id)||(this.notifiedMessageIds.add(u.id),r=`El ticket "${d.title}" tiene un nuevo mensaje.`,a=d.id,i=!0)}i&&(this.toastMessage.set(r),this.toastTicketId.set(a),setTimeout(()=>{this.toastTicketId()===a&&(this.toastMessage.set(null),this.toastTicketId.set(null))},15e3))}),Se(()=>{let e=this.authService.currentUser();e&&this.ticketForm.patchValue({email:e.username.includes("@")?e.username:`${e.username}@salud.larioja.gob.ar`})}),Se(()=>{this.currentUserRole()&&this.agentsList().length===0&&this.ticketService.getAgents().subscribe({next:t=>this.agentsList.set(t),error:t=>console.error("Error loading agents:",t)})})}ngOnInit(){this.loadInstitutions(),this.loadPriorities(),this.loadTags(),this.route.queryParams.subscribe(t=>{let i=t.view;i==="create"?this.setViewMode("create"):i==="archived"?this.setViewMode("archived"):i==="list"&&this.setViewMode("list")});let e=this.authService.currentUser();e&&(this.ticketService.loadTicketsForUser(e.username),this.route.snapshot.queryParams.view||(e.role!=="user"?this.innerViewMode.set("list"):this.ticketService.tickets().length>0?this.innerViewMode.set("list"):this.innerViewMode.set("create"))),this.pollingSub=Zi(3e3).subscribe(()=>{this.recargarMensajesSilencioso()}),this.destroyRef.onDestroy(()=>{this.pollingSub&&this.pollingSub.unsubscribe()})}recargarMensajesSilencioso(){let e=this.selectedTicket();e&&this.innerViewMode()==="detail"&&!this.isEditing()&&!this.isSendingComment()&&this.ticketService.getTicketDetails(e.id).subscribe({next:i=>{let r=e.messages?.length||0;if((i.messages?.length||0)>r||i.status!==e.status){let d=L(k({},i),{created_at:new Date(i.created_at),updated_at:new Date(i.updated_at),closed_at:i.closed_at?new Date(i.closed_at):void 0,resolved_at:i.resolved_at?new Date(i.resolved_at):void 0,reopened_at:i.reopened_at?new Date(i.reopened_at):void 0,messages:i.messages?i.messages.map(g=>L(k({},g),{created_at:new Date(g.created_at)})):[]});this.selectedTicket.set(d);let u=d.messages&&d.messages.length>0?d.messages[d.messages.length-1].created_at:new Date;this.markTicketMessagesAsSeen(d.id,u)}},error:i=>{console.warn("Error en polling silencioso del chat:",i)}});let t=this.authService.currentUser();t&&this.innerViewMode()==="list"&&this.ticketService.loadTicketsForUser(t.username)}loadInstitutions(){let e=sessionStorage.getItem("hsi_token"),t=new li().set("Authorization",`Bearer ${e}`);this.http.get("/api/institutions",{headers:t}).subscribe({next:i=>{this.institutions.set(i)},error:i=>{console.error("Error al cargar las instituciones desde la BD:",i)}})}loadPriorities(){let e=sessionStorage.getItem("hsi_token"),t=new li().set("Authorization",`Bearer ${e}`);this.http.get("/api/priorities",{headers:t}).subscribe({next:i=>{this.priorities.set(i)},error:i=>{console.error("Error al cargar las prioridades desde la BD:",i)}})}getPriorityClass(e){if(!e)return"media";let t=e.toLowerCase();return t.includes("baja")?"baja":t.includes("media")?"media":t.includes("alta")?"alta":t.includes("crit")||t.includes("cr\xEDt")?"critica":"baja"}getPriorityChipClass(e){if(!e)return"medium";let t=e.toLowerCase();return t.includes("baja")?"low":t.includes("media")?"medium":t.includes("alta")?"high":t.includes("crit")||t.includes("cr\xEDt")?"critica":"low"}getPriorityEmoji(e){if(!e)return"\u{1F7E2}";let t=e.toLowerCase();return t.includes("baja")?"\u{1F7E2}":t.includes("media")?"\u{1F7E1}":t.includes("alta")?"\u{1F7E0}":t.includes("crit")||t.includes("cr\xEDt")?"\u{1F534}":"\u{1F7E2}"}initForm(){this.ticketForm=this.fb.group({title:["",[Oe.required,Oe.maxLength(100)]],email:["",[Oe.required,Oe.email]],institution:["",Oe.required],description:["",Oe.required]})}setViewMode(e){(e==="list"||e==="archived")&&this.previousListMode.set(e),this.innerViewMode.set(e),e!=="detail"&&(this.isEditing.set(!1),this.route.snapshot.queryParams.view!==e&&this.router.navigate([],{relativeTo:this.route,queryParams:{view:e},queryParamsHandling:"merge"}))}archiveTicket(e){let t=this.currentUserId();if(!t)return;let i=this.archivedTicketIds();if(!i.includes(e)){let r=[...i,e];this.archivedTicketIds.set(r);try{localStorage.setItem(`hsi_archived_tickets_${t}`,JSON.stringify(r))}catch(a){console.error("Error saving archived tickets:",a)}}}unarchiveTicket(e){let t=this.currentUserId();if(!t)return;let r=this.archivedTicketIds().filter(a=>a!==e);this.archivedTicketIds.set(r);try{localStorage.setItem(`hsi_archived_tickets_${t}`,JSON.stringify(r))}catch(a){console.error("Error saving archived tickets:",a)}}isTicketArchived(e){return this.archivedTicketIds().includes(e)}showError(e){let t=this.ticketForm.get(e);return!!(t&&t.invalid&&(t.dirty||t.touched))}onInstitutionInput(e){let t=e.target.value;this.institutionQuery.set(t)}onInstitutionSelect(e){this.ticketForm.patchValue({institution:e}),this.institutionQuery.set(e)}setPriority(e){this.selectedPriority.set(e)}toggleTag(e,t){let i=this.selectedTags();if(t){if(i.length>=5)return;this.selectedTags.set([...i,e])}else this.selectedTags.set(i.filter(r=>r!==e))}onFileSelected(e){let t=e.target.files;t&&this.processFiles(t)}onDragOver(e){e.preventDefault(),this.isDragOver.set(!0)}onDragLeave(){this.isDragOver.set(!1)}onDrop(e){e.preventDefault(),this.isDragOver.set(!1);let t=e.dataTransfer?.files;t&&this.processFiles(t)}processFiles(e){let t=[];for(let i=0;i<e.length;i++)t.push(e[i].name);this.attachments.set([...this.attachments(),...t])}resetForm(){this.ticketForm.reset();let e=this.authService.currentUser();e&&this.ticketForm.patchValue({email:e.username.includes("@")?e.username:`${e.username}@salud.larioja.gob.ar`}),this.institutionQuery.set("")}onCancel(){this.resetForm(),this.selectedTags.set([]),this.attachments.set([]),this.selectedPriority.set("Media"),this.setViewMode("list")}onSubmit(e){if(e.preventDefault(),this.ticketForm.invalid||this.selectedTags().length<1||this.selectedTags().length>5)return;this.isSubmitting.set(!0);let t=this.ticketForm.value;this.ticketService.createTicket(t.email,t.institution,this.selectedPriority(),t.title,t.description,this.selectedTags(),this.attachments()).subscribe({next:i=>{this.isSubmitting.set(!1),this.resetForm(),this.selectedTags.set([]),this.attachments.set([]),this.selectedPriority.set("Media"),this.setViewMode("list"),this.showCreateSuccess.set(!0)},error:()=>{this.isSubmitting.set(!1),this.setViewMode("list")}})}onSelectTicket(e){this.currentUserRole()!=="user"&&this.markTicketAsRead(e.id),this.ticketService.getTicketDetails(e.id).subscribe({next:t=>{let i=L(k({},t),{created_at:new Date(t.created_at),updated_at:new Date(t.updated_at),closed_at:t.closed_at?new Date(t.closed_at):void 0,resolved_at:t.resolved_at?new Date(t.resolved_at):void 0,reopened_at:t.reopened_at?new Date(t.reopened_at):void 0,messages:t.messages?t.messages.map(a=>L(k({},a),{created_at:new Date(a.created_at)})):[]});this.selectedTicket.set(i),this.setViewMode("detail"),this.ticketSelected.emit(i);let r=i.messages&&i.messages.length>0?i.messages[i.messages.length-1].created_at:new Date;this.markTicketMessagesAsSeen(i.id,r),this.currentUserRole()==="user"&&i.status==="resuelto"&&this.showReopenInfo.set(!0)},error:t=>{console.error("Error fetching ticket details:",t),this.selectedTicket.set(e),this.setViewMode("detail"),this.ticketSelected.emit(e)}})}onDeleteTicket(e){confirm("\xBFEst\xE1s seguro de que deseas eliminar este ticket de forma permanente?")&&this.ticketService.deleteTicket(e).subscribe(()=>{this.selectedTicket.set(null),this.setViewMode("list")})}canEditTicket(e){let t=this.authService.currentUser();return!t||t.role!=="user"||e.status!=="abierto"||e.editCount&&e.editCount>=1?!1:!this.hasAgentResponse(e)}hasAgentResponse(e){return(e.messages||[]).some(i=>i.role==="agent"||i.role==="admin"||i.role==="owner")}onEditStart(){let e=this.selectedTicket();e&&(this.editDescription=e.description,this.editPriority=e.priority,this.isEditing.set(!0))}onEditCancel(){this.isEditing.set(!1)}onEditSave(){let e=this.selectedTicket();e&&this.ticketService.updateTicket(e.id,this.editDescription,this.editPriority,!0).subscribe(()=>{let t=this.ticketsList().find(i=>i.id===e.id);t?this.selectedTicket.set(t):(e.description=this.editDescription,e.priority=this.editPriority,e.editCount=(e.editCount||0)+1,e.updated_at=new Date),this.isEditing.set(!1)})}onSubmitComment(e){if(e.preventDefault(),this.isSendingComment())return;let t=this.selectedTicket(),i=this.newCommentText.trim();!t||!i||(this.isSendingComment.set(!0),this.ticketService.addComment(t.id,i).subscribe({next:()=>{this.newCommentText="",this.ticketService.getTicketDetails(t.id).subscribe({next:r=>{let a=L(k({},r),{created_at:new Date(r.created_at),updated_at:new Date(r.updated_at),closed_at:r.closed_at?new Date(r.closed_at):void 0,resolved_at:r.resolved_at?new Date(r.resolved_at):void 0,reopened_at:r.reopened_at?new Date(r.reopened_at):void 0,messages:r.messages?r.messages.map(d=>L(k({},d),{created_at:new Date(d.created_at)})):[]});this.selectedTicket.set(a),this.isSendingComment.set(!1)},error:()=>{this.isSendingComment.set(!1)}})},error:r=>{console.error("Error adding comment:",r),this.isSendingComment.set(!1)}}))}getTicketUserInitials(e){return e?e.split("@")[0].substring(0,1).toUpperCase():"U"}formatDisplayName(e){return e?e.split("@")[0].replace(/[._-]/g," ").split(/\s+/).map(r=>r.charAt(0).toUpperCase()+r.slice(1).toLowerCase()).join(" "):""}getTicketUserFirstName(e){return e?this.formatDisplayName(e):"Usuario"}getCommentSender(e){return e.role==="bot"?"Asistente Virtual":e.role==="system"?"Sistema":this.formatDisplayName(e.sender_id)}getUserInitials(){let e=this.authService.currentUser();return e?e.username.split("@")[0].substring(0,2).toUpperCase():"U"}getFirstName(){let e=this.authService.currentUser();return e?e.username.split("@")[0]:"Usuario"}getStatusLabel(e){return e==="en_progreso"?"En progreso":e}getElapsedText(e){let t=Math.floor((Date.now()-e.getTime())/1e3),i=t/31536e3;return i>1?Math.floor(i)+"a":(i=t/2592e3,i>1?Math.floor(i)+"m":(i=t/86400,i>1?Math.floor(i)+"d":(i=t/3600,i>1?Math.floor(i)+"h":(i=t/60,i>1?Math.floor(i)+"min":"1m"))))}onStatusChange(e,t){let r=t.target.value;r&&this.ticketService.updateTicketStatus(e,r).subscribe({next:a=>{let d=L(k({},a),{created_at:new Date(a.created_at),updated_at:new Date(a.updated_at),messages:a.messages?a.messages.map(u=>L(k({},u),{created_at:new Date(u.created_at)})):[]});this.selectedTicket.set(d)},error:a=>{console.error("Error changing ticket status:",a)}})}onAssignChange(e,t){let r=t.target.value;r&&this.ticketService.assignTicket(e,r).subscribe({next:a=>{let d=L(k({},a),{created_at:new Date(a.created_at),updated_at:new Date(a.updated_at),messages:a.messages?a.messages.map(u=>L(k({},u),{created_at:new Date(u.created_at)})):[]});this.selectedTicket.set(d)},error:a=>{console.error("Error reassigning ticket:",a)}})}changeStatusQuick(e,t){this.ticketService.updateTicketStatus(e,t).subscribe({next:i=>{let r=L(k({},i),{created_at:new Date(i.created_at),updated_at:new Date(i.updated_at),closed_at:i.closed_at?new Date(i.closed_at):void 0,resolved_at:i.resolved_at?new Date(i.resolved_at):void 0,reopened_at:i.reopened_at?new Date(i.reopened_at):void 0,messages:i.messages?i.messages.map(a=>L(k({},a),{created_at:new Date(a.created_at)})):[]});this.selectedTicket.set(r)},error:i=>{console.error("Error changing ticket status:",i)}})}getAgentName(e){let t=this.agentsList().find(i=>i.id===e);return t?this.formatDisplayName(`${t.first_name} ${t.last_name}`):this.formatDisplayName(e)}setStatusFilter(e){this.selectedStatusFilter.set(e)}onSearchInput(e){let t=e.target.value;this.searchQuery.set(t)}loadTags(){this.ticketService.getTags().subscribe({next:e=>{if(e&&e.length>0){let t=new Set,i=[];for(let r of e){let a=this.cleanTagName(r.name);if(!t.has(a))t.add(a),i.push(r);else{let d=i.findIndex(u=>this.cleanTagName(u.name)===a);d!==-1&&r.name.includes("\xF3")&&!i[d].name.includes("\xF3")&&(i[d]=r)}}this.systemTags.set(i)}else this.setMockSystemTags()},error:e=>{console.error("Error loading tags from backend:",e),this.setMockSystemTags()}})}setMockSystemTags(){this.systemTags.set([{id:"6a4bb000a9ad10c7c59df8a3",name:"Acceso"},{id:"6a4bb000a9ad10c7c59df8a4",name:"Autenticaci\xF3n"},{id:"6a4bb000a9ad10c7c59df8a5",name:"Historia cl\xEDnica"},{id:"6a4bb000a9ad10c7c59df8a6",name:"Odontolog\xEDa"},{id:"6a4bb000a9ad10c7c59df8a7",name:"Snomed CT"},{id:"6a4bb000a9ad10c7c59df8a8",name:"Administraci\xF3n"},{id:"6a4cfe0a923044c942ffc27b",name:"Facturaci\xF3n"},{id:"6a4bb000a9ad10c7c59df8aa",name:"Turnos"}])}openTransferModal(e){this.ticketToTransfer.set(e),this.selectedTransferAgentId.set(""),this.transferReason.set(""),this.transferSearchQuery.set(""),this.selectedSpecializationFilter.set("Todos"),this.onlineStatusFilter.set("todos"),this.showTransferModal.set(!0)}closeTransferModal(){this.showTransferModal.set(!1),this.ticketToTransfer.set(null)}selectAgentForTransfer(e){e.is_active&&this.selectedTransferAgentId.set(e.id)}getSelectedAgentName(){let e=this.agentsList().find(t=>t.id===this.selectedTransferAgentId());return e?`${e.first_name} ${e.last_name}`:""}getAgentInitials(e){let t=e.first_name||"",i=e.last_name||"";return(t.charAt(0)+i.charAt(0)).toUpperCase()||e.username.charAt(0).toUpperCase()}confirmTransfer(){let e=this.ticketToTransfer()?.id,t=this.selectedTransferAgentId(),i=this.transferReason().trim();!e||!t||i.length<4||this.ticketService.assignTicket(e,t,i).subscribe({next:r=>{let a=L(k({},r),{created_at:new Date(r.created_at),updated_at:new Date(r.updated_at),messages:r.messages?r.messages.map(d=>L(k({},d),{created_at:new Date(d.created_at)})):[]});this.selectedTicket.set(a),this.closeTransferModal(),this.showTransferSuccess.set(!0)},error:r=>{console.error("Error transferring ticket:",r)}})}openResolveConfirmation(e){this.ticketToResolveId.set(e),this.showResolveConfirmModal.set(!0)}closeResolveConfirmation(){this.showResolveConfirmModal.set(!1),this.ticketToResolveId.set("")}confirmResolve(){let e=this.ticketToResolveId();e&&this.changeStatusQuick(e,"resuelto"),this.closeResolveConfirmation()}static \u0275fac=function(t){return new(t||n)};static \u0275cmp=j({type:n,selectors:[["app-tickets-tab"]],outputs:{ticketSelected:"ticketSelected"},decls:10,vars:7,consts:[["auto","matAutocomplete"],["fileInput",""],[1,"tickets-container"],[1,"ticket-form-card"],[1,"ticket-history-card"],[1,"ticket-detail-card"],[1,"transfer-modal-overlay"],[1,"confirm-modal-overlay"],[1,"success-overlay"],[1,"toast-notification"],[1,"subtitle"],[1,"separator"],[3,"submit","formGroup"],[1,"form-columns"],[1,"form-col"],[1,"form-group"],[1,"label-row",2,"display","flex","justify-content","space-between","align-items","center"],[1,"char-counter",2,"font-size","11px","color","#90A4AE"],[1,"input-container"],[1,"material-icons","input-icon"],["type","text","formControlName","title","maxlength","100","placeholder","Ej: Error al firmar documento / cargar Historia Cl\xEDnica"],[1,"error-text"],["type","email","formControlName","email","placeholder","usuario@salud.larioja.gob.ar"],["type","text","formControlName","institution","placeholder","Busc\xE1 tu instituci\xF3n...",3,"input","matAutocomplete"],[3,"optionSelected"],[3,"value"],[1,"priority-chips-row"],["type","button",1,"priority-chip",3,"ngClass","active"],["formControlName","description","placeholder","Describ\xED el error o solicitud con el mayor detalle posible. Pod\xE9s incluir pasos para reproducirlo, mensaje de error exacto, etc."],[1,"label-with-tooltip"],[1,"material-icons","info-icon",3,"title"],["multiple","",1,"tags-chip-list"],[3,"selected","disabled"],[1,"error-text",2,"display","block","margin-top","4px"],[1,"form-group","full-width"],[1,"drag-drop-zone",3,"dragover","dragleave","drop","click"],["type","file","multiple","",2,"display","none",3,"change"],[1,"material-icons","clip-icon"],[1,"attachments-list"],[1,"form-actions"],["type","button",1,"cancel-btn",3,"click","disabled"],["type","submit",1,"send-btn",3,"disabled"],["type","button",1,"priority-chip",3,"click","ngClass"],[3,"selectionChange","selected","disabled"],[1,"history-header"],[1,"new-ticket-btn"],[1,"user-filters-container"],[1,"tickets-list"],[1,"empty-state"],[1,"new-ticket-btn",3,"click"],[1,"user-search-bar"],[1,"material-icons","search-icon"],["type","text","placeholder","Buscar tus tickets por palabra clave en el t\xEDtulo...",3,"input","value"],["title","Limpiar b\xFAsqueda",1,"clear-search-btn"],[1,"user-filter-controls"],[1,"filter-group"],["for","user-sort-select"],[1,"select-wrapper"],[1,"material-icons","select-icon"],["id","user-sort-select",3,"ngModelChange","ngModel"],["value","recent"],["value","oldest"],["value","priority"],["for","user-tag-select"],["id","user-tag-select",3,"ngModelChange","ngModel"],["value","all"],[1,"clear-filters-btn"],["title","Limpiar b\xFAsqueda",1,"clear-search-btn",3,"click"],[1,"material-icons"],["for","user-status-select"],["id","user-status-select",3,"ngModelChange","ngModel"],["value","open"],["value","in_progress"],["value","resolved"],[1,"clear-filters-btn",3,"click"],[1,"agent-stats-row"],[1,"stat-card","total",2,"cursor","pointer",3,"click"],[1,"stat-label"],[1,"stat-value"],[1,"stat-card","abiertos",2,"cursor","pointer",3,"click"],[1,"stat-card","progreso",2,"cursor","pointer",3,"click"],[1,"stat-card","reabiertos",2,"cursor","pointer",3,"click"],[1,"stat-card","transferidos",2,"cursor","pointer",3,"click"],[1,"stat-card","resueltos",2,"cursor","pointer",3,"click"],[1,"agent-tabs-container"],[1,"agent-search-bar"],["type","text","placeholder","Buscar por usuario, instituci\xF3n o ID...",3,"input"],[1,"material-icons",2,"color","#90A4AE","font-size","20px","flex-shrink","0","margin-left","4px"],[1,"agent-tabs"],[1,"agent-tab-btn",3,"click"],[1,"ticket-item"],[1,"ticket-item",3,"click"],[1,"item-avatar"],[1,"item-content"],[1,"item-top-row",2,"display","flex","align-items","center","justify-content","space-between","gap","16px","width","100%"],[1,"top-row-left",2,"display","flex","align-items","center","gap","8px","flex-wrap","wrap","color","var(--color-text-muted)","font-size","12px"],[1,"user-display-name",2,"font-weight","700","font-size","15px","color","var(--color-text-primary)","margin-right","4px"],[1,"institution-name-card",2,"font-weight","500"],[1,"separator-dot",2,"color","var(--color-border)","margin","0 2px"],[1,"card-priority-dot-indicator",3,"ngClass"],[1,"priority-bullet"],[1,"card-date-timestamp",2,"font-weight","500"],[1,"top-row-right",2,"display","flex","align-items","center","gap","8px","flex-shrink","0"],["title","Nueva respuesta",1,"status-badge","unread-response-badge"],[1,"status-badge",3,"ngClass"],[1,"status-badge","en_progreso"],[1,"new-ticket-badge"],[1,"time-elapsed-pill"],[1,"body-preview",2,"margin-top","6px","margin-bottom","6px","line-height","1.4","color","var(--color-text-secondary)","font-size","13px"],[1,"card-timestamp-info-row",2,"color","var(--bot-blue)","font-weight","600","margin-bottom","6px","padding","2px 0","font-size","12px","display","flex","align-items","center","gap","4px"],[1,"agent-card-timestamps",2,"display","flex","flex-direction","column","gap","4px","margin-bottom","6px"],[1,"item-tags-row",2,"display","flex","align-items","center","gap","6px","flex-wrap","wrap","margin-top","6px"],[1,"item-tag-chip"],[1,"attachment-indicator"],[1,"agent-specialist-badge-row",2,"margin-top","8px","display","flex","align-items","center","gap","6px","font-size","11px","font-weight","600","color","#E65100","background-color","#FFF3E0","border","1px solid #FFE0B2","padding","4px 10px","border-radius","8px","width","fit-content"],[1,"user-specialist-badge-row",2,"margin-top","8px","display","flex","align-items","center","gap","6px","font-size","11px","font-weight","600","color","#0288D1","background-color","#E1F5FE","border","1px solid #B3E5FC","padding","4px 10px","border-radius","8px","width","fit-content"],[1,"material-icons",2,"font-size","12px","vertical-align","middle"],["title","Desarchivar ticket","onmouseover","this.style.color='#00796B'","onmouseout","this.style.color='#78909C'",1,"archive-action-btn",2,"background","transparent","border","none","cursor","pointer","color","#78909C","display","inline-flex","align-items","center","justify-content","center","padding","4px","border-radius","4px","transition","color 0.2s"],["title","Archivar ticket","onmouseover","this.style.color='#00796B'","onmouseout","this.style.color='#78909C'",1,"archive-action-btn",2,"background","transparent","border","none","cursor","pointer","color","#78909C","display","inline-flex","align-items","center","justify-content","center","padding","4px","border-radius","4px","transition","color 0.2s"],["title","Desarchivar ticket","onmouseover","this.style.color='#00796B'","onmouseout","this.style.color='#78909C'",1,"archive-action-btn",2,"background","transparent","border","none","cursor","pointer","color","#78909C","display","inline-flex","align-items","center","justify-content","center","padding","4px","border-radius","4px","transition","color 0.2s",3,"click"],[1,"material-icons",2,"font-size","20px"],["title","Archivar ticket","onmouseover","this.style.color='#00796B'","onmouseout","this.style.color='#78909C'",1,"archive-action-btn",2,"background","transparent","border","none","cursor","pointer","color","#78909C","display","inline-flex","align-items","center","justify-content","center","padding","4px","border-radius","4px","transition","color 0.2s",3,"click"],[2,"color","var(--color-text-primary)","font-weight","600"],[1,"material-icons",2,"font-size","14px","vertical-align","middle"],[1,"card-timestamp-info-row","reopened",2,"font-size","12px","display","flex","align-items","center","gap","4px"],[1,"card-timestamp-info-row","closed",2,"font-size","12px","display","flex","align-items","center","gap","4px"],[1,"card-timestamp-info-row","edited",2,"font-size","12px","display","flex","align-items","center","gap","4px"],[1,"material-icons",2,"font-size","14px","color","#E65100","vertical-align","middle"],[1,"material-icons",2,"font-size","14px","color","#0288D1","vertical-align","middle"],[1,"detail-header"],[1,"back-btn",3,"click"],[1,"detail-actions"],[1,"detail-body"],[1,"edit-btn"],[1,"edit-btn",3,"click"],[1,"edit-limit-badge"],[1,"material-icons","info-icon"],[1,"detail-title-section",2,"margin-bottom","12px"],[2,"font-size","22px","font-weight","700","color","var(--color-text-primary)","margin","0","line-height","1.3"],[1,"edit-form"],[1,"comments-section"],[1,"comments-list"],[1,"add-comment-form"],[1,"comment-blocked-message",2,"margin-top","15px","padding","15px","background","#FFF9C4","border-radius","8px","color","#5D4037","font-weight","500","text-align","center","border","1px solid #FFF59D","display","flex","align-items","center","justify-content","center","gap","8px"],[1,"detail-info-row"],[1,"info-block"],[1,"info-label"],[1,"info-value"],[1,"priority-badge",3,"ngClass"],[2,"display","inline-flex","gap","4px","align-items","center"],[1,"detail-specialist-badge",2,"background","#FFF3E0","border","1px solid #FFE0B2","padding","12px 16px","border-radius","8px","color","#E65100","font-family","var(--font-body)","font-size","13px","display","flex","align-items","center","gap","8px","font-weight","600","margin-top","16px","margin-bottom","8px","width","fit-content"],[1,"detail-specialist-badge",2,"background","#E1F5FE","border","1px solid #B3E5FC","padding","12px 16px","border-radius","8px","color","#0288D1","font-family","var(--font-body)","font-size","13px","display","flex","align-items","center","gap","8px","font-weight","600","margin-top","16px","margin-bottom","8px","width","fit-content"],[1,"detail-description-section"],[1,"description-text"],[1,"transfer-reason-card",2,"background","#FFF9C4","border","1px solid #FFF59D","padding","15px","border-radius","8px","color","#5D4037","font-family","var(--font-body)","font-size","13px","display","flex","flex-direction","column","gap","6px","margin-top","16px","margin-bottom","8px"],[1,"detail-attachments-section"],[1,"info-value",2,"color","var(--bot-blue)"],[1,"info-value",2,"color","#C71585","font-weight","600"],[1,"info-value",2,"color","#2E7D32","font-weight","600"],[1,"info-value",2,"color","#455A64","font-weight","600"],[1,"material-icons",2,"font-size","18px","color","#E65100","vertical-align","middle"],[1,"material-icons",2,"font-size","18px","color","#0288D1","vertical-align","middle"],[2,"display","flex","align-items","center","gap","6px","font-weight","700"],[1,"material-icons",2,"font-size","18px","color","#F57F17","vertical-align","middle"],[2,"margin","0","line-height","1.5","font-style","italic"],[1,"admin-controls-card"],[1,"admin-controls-card","info-only",2,"background","#E3F2FD","border","1px solid #BBDEFB","padding","15px","border-radius","8px","color","#0D47A1","font-weight","500","display","flex","align-items","center","gap","8px"],[1,"admin-actions-toolbar"],[1,"status-buttons-group"],["type","button",1,"resolve-action-btn"],[1,"ticket-resolved-badge-large"],[1,"separator-v"],["type","button",1,"transfer-action-btn",3,"click"],[1,"material-icons",2,"font-size","16px","vertical-align","middle"],["type","button",1,"resolve-action-btn",3,"click"],[1,"material-icons",2,"font-size","18px","vertical-align","middle"],[1,"attachments-grid"],[1,"attachment-file-card"],[1,"file-name",3,"title"],[1,"edit-textarea",3,"ngModelChange","ngModel"],[1,"edit-actions"],[1,"cancel-btn-edit",3,"click"],[1,"save-btn",3,"click","disabled"],[1,"system-comment-notice"],[1,"comment-item",3,"ngClass"],[1,"comment-time-system"],[1,"comment-header"],[1,"comment-sender"],[1,"comment-time"],[1,"comment-body"],[1,"add-comment-form",3,"submit"],["name","newCommentText","required","",3,"ngModelChange","ngModel","placeholder"],["type","submit",1,"comment-submit-btn",3,"disabled"],[1,"material-icons",2,"vertical-align","middle"],[1,"transfer-modal-container"],[1,"transfer-modal-header"],["type","button",1,"close-modal-btn",3,"click"],[1,"transfer-modal-subtitle"],[1,"transfer-search-container"],["type","text","placeholder","Buscar agente o especializaci\xF3n...",3,"ngModelChange","ngModel"],[1,"transfer-tags-container"],["type","button",1,"tag-chip-btn",3,"click"],["type","button",1,"tag-chip-btn",3,"active"],[1,"status-filters-container"],["type","button",1,"status-filter-btn",3,"click"],[1,"status-dot","green"],[1,"status-dot","gray"],[1,"transfer-agents-list"],[1,"agent-transfer-row",3,"selected","disabled"],[1,"empty-agents-message"],[1,"transfer-reason-container"],[1,"reason-label"],["placeholder","Escribe el motivo detallado de la transferencia aqu\xED...","rows","3","required","",3,"ngModelChange","ngModel"],[1,"transfer-modal-actions"],[1,"selected-agent-indicator"],[1,"modal-buttons-group"],["type","button",1,"cancel-modal-btn",3,"click"],["type","button",1,"confirm-transfer-btn",3,"click","disabled"],[1,"agent-transfer-row",3,"click"],[1,"agent-avatar-circle"],[1,"avatar-status-dot"],[1,"agent-info-col"],[1,"agent-name-text"],[1,"agent-spec-text"],[1,"agent-chats-col"],[1,"active-chats-badge"],[1,"no-available-text"],[1,"material-icons","chat-icon"],[1,"confirm-modal-container"],[1,"confirm-modal-content"],[1,"material-icons","confirm-modal-icon"],[1,"confirm-modal-actions"],["type","button",1,"cancel-confirm-btn",3,"click"],["type","button",1,"accept-confirm-btn",3,"click"],[1,"success-dialog"],[1,"material-icons","success-icon"],[1,"clarification-text"],[1,"success-actions"],[1,"accept-btn",3,"click"],[1,"material-icons","success-icon",2,"color","var(--color-success)"],[1,"material-icons",2,"font-size","54px","color","var(--bot-blue)"],[1,"accept-btn",2,"background-color","var(--bot-blue)",3,"click"],[1,"toast-notification",3,"click"],[1,"material-icons","toast-icon"],[1,"toast-content"],[1,"toast-title"],[1,"toast-text"],[1,"toast-close",3,"click"]],template:function(t,i){if(t&1&&(s(0,"div",2),v(1,Hr,80,15,"div",3)(2,va,11,7,"div",4)(3,Ka,10,2,"div",5),v(4,ns,45,11,"div",6),v(5,os,14,0,"div",7),v(6,rs,11,0,"div",8),v(7,as,11,0,"div",8),v(8,ss,11,0,"div",8),v(9,ls,11,1,"div",9),l()),t&2){let r;p(),b(i.innerViewMode()==="create"?1:i.innerViewMode()==="list"||i.innerViewMode()==="archived"?2:i.innerViewMode()==="detail"?3:-1),p(3),b(i.showTransferModal()?4:-1),p(),b(i.showResolveConfirmModal()?5:-1),p(),b(i.showCreateSuccess()?6:-1),p(),b(i.showTransferSuccess()?7:-1),p(),b(i.showReopenInfo()?8:-1),p(),b((r=i.toastMessage())?9:-1,r)}},dependencies:[pn,cn,Tn,bn,Cn,wn,fn,xn,_n,gn,kn,Sn,vn,ci,En,di,yn,Mo,So,Ze,Vi,zo,qi,Yi,Bo,dn],styles:['.tickets-container[_ngcontent-%COMP%]{width:100%;height:100%}.ticket-form-card[_ngcontent-%COMP%], .ticket-history-card[_ngcontent-%COMP%], .ticket-detail-card[_ngcontent-%COMP%]{padding:40px}h2[_ngcontent-%COMP%]{font-family:var(--font-heading);font-size:22px;font-weight:700;color:var(--color-text-primary);margin-bottom:4px}.subtitle[_ngcontent-%COMP%]{font-family:var(--font-body);font-size:12px;color:var(--color-text-muted)}.separator[_ngcontent-%COMP%]{height:1px;background-color:var(--color-border);margin:20px 0}.form-columns[_ngcontent-%COMP%]{display:flex;gap:32px}.form-col[_ngcontent-%COMP%]{flex:1;display:flex;flex-direction:column;gap:20px}.form-group[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:8px}.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{font-family:var(--font-body);font-size:12px;font-weight:600;color:var(--color-text-primary)}.label-with-tooltip[_ngcontent-%COMP%]{display:flex;align-items:center;gap:6px}.info-icon[_ngcontent-%COMP%]{font-size:14px;color:var(--color-text-muted);cursor:help}.input-container[_ngcontent-%COMP%]{position:relative;display:flex;align-items:center}.input-icon[_ngcontent-%COMP%]{position:absolute;left:12px;color:var(--color-accent-teal);font-size:18px}.input-container[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{width:100%;height:44px;padding:0 12px 0 40px;border:1.5px solid var(--color-border);border-radius:var(--radius-input);font-family:var(--font-body);font-size:14px;color:var(--color-text-primary);outline:none;transition:border-color .2s ease;background:var(--color-bg-primary)}.input-container[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus{border-color:var(--color-accent-teal)}textarea[_ngcontent-%COMP%]{width:100%;height:160px;padding:12px;border:1.5px solid var(--color-border);border-radius:var(--radius-input);font-family:var(--font-body);font-size:14px;color:var(--color-text-primary);outline:none;resize:vertical;transition:border-color .2s ease;background:var(--color-bg-primary)}textarea[_ngcontent-%COMP%]:focus{border-color:var(--color-accent-teal)}.priority-chips-row[_ngcontent-%COMP%]{display:flex;gap:12px}.priority-chip[_ngcontent-%COMP%]{flex:1;height:38px;border:1px solid var(--color-border);background-color:var(--color-bg-secondary);border-radius:20px;font-family:var(--font-body);font-size:13px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s ease;color:var(--color-text-primary)}.priority-chip.active[_ngcontent-%COMP%]{font-weight:700}.priority-chip.low.active[_ngcontent-%COMP%]{background-color:#edf8f6;border-color:var(--color-success);color:#2e9e7a}.priority-chip.medium.active[_ngcontent-%COMP%]{background-color:#fff8e6;border-color:var(--bot-yellow);color:#9a7a00}.priority-chip.high.active[_ngcontent-%COMP%]{background-color:#fff3e0;border-color:#fb8c00;color:#e65100}.priority-chip.critica.active[_ngcontent-%COMP%]{background-color:#fdf2f2;border-color:var(--color-error);color:var(--color-error)}.tags-chip-list[_ngcontent-%COMP%]{margin-top:4px}  .mdc-evolution-chip-set__chips{gap:8px!important}  .mat-mdc-standard-chip{background-color:var(--color-bg-secondary)!important;border:1px solid var(--color-border)!important;border-radius:16px!important;font-family:var(--font-body)!important;font-size:13px!important;color:var(--color-text-muted)!important;padding:6px 12px!important;min-height:32px!important}  .mat-mdc-standard-chip.mdc-evolution-chip--selected{background-color:var(--color-accent-mint)!important;border-color:var(--color-accent-teal)!important;color:var(--color-text-primary)!important}.drag-drop-zone[_ngcontent-%COMP%]{border:2px dashed var(--color-accent-mint);background-color:var(--color-bg-secondary);border-radius:12px;height:80px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;cursor:pointer;transition:background-color .2s ease,border-color .2s ease;text-align:center;padding:8px}.drag-drop-zone[_ngcontent-%COMP%]:hover, .drag-drop-zone.drag-over[_ngcontent-%COMP%]{background-color:#eefbf9;border-color:var(--color-accent-teal)}.clip-icon[_ngcontent-%COMP%]{color:var(--color-accent-teal);font-size:20px}.drag-drop-zone[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-family:var(--font-body);font-size:13px;color:var(--color-text-muted)}.attachments-list[_ngcontent-%COMP%]{color:var(--color-text-primary)!important;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:90%}.full-width[_ngcontent-%COMP%]{grid-column:span 2;margin-top:16px}.form-actions[_ngcontent-%COMP%]{display:flex;justify-content:flex-end;gap:16px}.cancel-btn[_ngcontent-%COMP%]{height:48px;background:transparent;border:1px solid var(--color-border);border-radius:var(--radius-button);color:var(--color-text-muted);font-family:var(--font-body);font-size:14px;padding:0 24px;cursor:pointer;transition:background-color .2s ease}.cancel-btn[_ngcontent-%COMP%]:hover{background-color:var(--color-bg-secondary)}.send-btn[_ngcontent-%COMP%]{height:48px;background-color:var(--color-accent-teal);color:#fff;border:none;border-radius:var(--radius-button);font-family:var(--font-heading);font-size:15px;font-weight:600;padding:0 32px;cursor:pointer;transition:background-color .2s}.send-btn[_ngcontent-%COMP%]:hover:not(:disabled){background-color:var(--color-accent-teal-hover)}.send-btn[_ngcontent-%COMP%]:disabled{opacity:.6;cursor:not-allowed}.error-text[_ngcontent-%COMP%]{color:var(--color-error);font-size:11px;margin-top:-4px}.history-header[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center}.new-ticket-btn[_ngcontent-%COMP%]{height:38px;background:transparent;border:1.5px solid var(--color-accent-teal);border-radius:var(--radius-button);color:var(--color-accent-teal);font-family:var(--font-heading);font-weight:600;font-size:13px;padding:0 20px;cursor:pointer;transition:all .2s ease}.new-ticket-btn[_ngcontent-%COMP%]:hover{background-color:var(--color-accent-mint);border-color:var(--color-accent-teal);color:var(--color-text-primary)}.tickets-list[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:16px;max-height:calc(100vh - 310px);overflow-y:auto;padding-right:4px}.tickets-list.agent-list[_ngcontent-%COMP%]{max-height:calc(100vh - 380px)}.ticket-item[_ngcontent-%COMP%]{background-color:var(--color-bg-secondary);border-radius:10px;padding:16px;display:flex;gap:16px;cursor:pointer;transition:transform .15s ease,box-shadow .15s ease;border:1px solid transparent}.ticket-item[_ngcontent-%COMP%]:hover{transform:translateY(-2px);box-shadow:0 4px 10px #3331430d;border-color:var(--color-border)}.item-avatar[_ngcontent-%COMP%]{width:36px;height:36px;border-radius:50%;background-color:var(--color-accent-mint);color:var(--color-text-primary);display:flex;align-items:center;justify-content:center;font-family:var(--font-heading);font-weight:700;font-size:15px;flex-shrink:0}.item-content[_ngcontent-%COMP%]{flex:1;display:flex;flex-direction:column;gap:4px}.item-top-row[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center}.user-display-name[_ngcontent-%COMP%]{font-family:var(--font-heading);font-size:14px;font-weight:600;color:var(--color-text-primary)}.status-badge[_ngcontent-%COMP%]{font-family:var(--font-body);font-size:11px;font-weight:700;padding:4px 10px;border-radius:12px;text-transform:capitalize;border:1px solid transparent;display:inline-flex;align-items:center}.status-badge.abierto[_ngcontent-%COMP%]{background-color:#edf8f6;color:#2e9e7a;border-color:#c2ede0}.status-badge.en_progreso[_ngcontent-%COMP%]{background-color:#fff3e0;color:#e07b00;border-color:#ffe0b2}.status-badge.transferido[_ngcontent-%COMP%]{background-color:#e3f2fd;color:#1565c0;border-color:#bbdefb}.status-badge.reabierto[_ngcontent-%COMP%]{background-color:#fce4ec;color:#c2185b;border-color:#f8bbd0}.status-badge.resuelto[_ngcontent-%COMP%]{background-color:#f5f5f5;color:#616161;border-color:#e0e0e0}.status-badge.cerrado[_ngcontent-%COMP%]{background-color:#eceff1;color:#37474f;border-color:#cfd8dc}.card-priority-dot-indicator[_ngcontent-%COMP%]{font-family:var(--font-body);font-size:11px;font-weight:700;padding:2px 8px;border-radius:12px;display:inline-flex;align-items:center;gap:4px}.card-priority-dot-indicator.baja[_ngcontent-%COMP%]{background-color:#f1f8e9;color:#558b2f;border:1px solid #DCEDC8}.card-priority-dot-indicator.baja[_ngcontent-%COMP%]   .priority-bullet[_ngcontent-%COMP%]{color:#7cb342;font-size:14px;line-height:1}.card-priority-dot-indicator.media[_ngcontent-%COMP%]{background-color:#fffde7;color:#f57f17;border:1px solid #FFF9C4}.card-priority-dot-indicator.media[_ngcontent-%COMP%]   .priority-bullet[_ngcontent-%COMP%]{color:#fbc02d;font-size:14px;line-height:1}.card-priority-dot-indicator.alta[_ngcontent-%COMP%]{background-color:#fff3e0;color:#e65100;border:1px solid #FFE0B2}.card-priority-dot-indicator.alta[_ngcontent-%COMP%]   .priority-bullet[_ngcontent-%COMP%]{color:#fb8c00;font-size:14px;line-height:1}.card-priority-dot-indicator.critica[_ngcontent-%COMP%]{background-color:#ffebee;color:#c62828;border:1px solid #FFCDD2}.card-priority-dot-indicator.critica[_ngcontent-%COMP%]   .priority-bullet[_ngcontent-%COMP%]{color:#e53935;font-size:14px;line-height:1}.item-meta-row[_ngcontent-%COMP%]{display:flex;align-items:center;gap:12px;margin-top:-2px}.date-text[_ngcontent-%COMP%]{font-family:var(--font-body);font-size:12px;color:var(--color-text-muted)}.time-elapsed-pill[_ngcontent-%COMP%]{font-family:var(--font-body);font-size:11px;font-weight:600;background-color:var(--color-accent-teal);color:#fff;padding:2px 8px;border-radius:12px}.body-preview[_ngcontent-%COMP%]{font-family:var(--font-body);font-size:13px;line-height:1.5;color:var(--color-text-primary);display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;margin:4px 0}.item-tags-row[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-top:4px}.item-tag-chip[_ngcontent-%COMP%]{background-color:var(--color-bg-primary);border:1px solid var(--color-border);border-radius:12px;padding:2px 8px;font-family:var(--font-body);font-size:11px;color:var(--color-text-muted)}.attachment-indicator[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:4px;font-family:var(--font-body);font-size:11px;font-weight:600;color:#0288d1;background-color:#e1f5fe;border:1px solid #B3E5FC;padding:2px 10px;border-radius:12px}.empty-state[_ngcontent-%COMP%]{padding:48px;text-align:center;color:var(--color-text-muted);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px}.empty-state[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%]{font-size:48px;color:var(--color-border)}.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-family:var(--font-body);font-size:14px}.detail-header[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center}.back-btn[_ngcontent-%COMP%]{display:flex;align-items:center;gap:6px;background:transparent;border:1px solid var(--color-border);border-radius:var(--radius-button);padding:8px 16px;font-family:var(--font-heading);font-weight:600;color:var(--color-text-primary);cursor:pointer;transition:background-color .2s ease;outline:none}.back-btn[_ngcontent-%COMP%]:hover{background-color:var(--color-bg-secondary)}.detail-actions[_ngcontent-%COMP%]{display:flex;gap:12px}.edit-btn[_ngcontent-%COMP%]{background:transparent;border:1px solid var(--color-accent-teal);color:var(--color-accent-teal);border-radius:var(--radius-button);padding:8px 16px;font-family:var(--font-heading);font-weight:600;display:flex;align-items:center;gap:6px;cursor:pointer;transition:background-color .2s;outline:none}.edit-btn[_ngcontent-%COMP%]:hover{background-color:var(--color-accent-mint)}.edit-limit-badge[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:6px;background-color:var(--color-bg-secondary);border:1px solid var(--color-border);color:var(--color-text-muted);padding:8px 16px;border-radius:var(--radius-button);font-family:var(--font-heading);font-weight:600;font-size:13px}.edit-limit-badge[_ngcontent-%COMP%]   .info-icon[_ngcontent-%COMP%]{font-size:18px;color:var(--color-accent-teal)}.detail-body[_ngcontent-%COMP%]{margin-top:24px;display:flex;flex-direction:column;gap:24px}.detail-info-row[_ngcontent-%COMP%]{display:flex;gap:32px;flex-wrap:wrap}.info-block[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:6px}.info-label[_ngcontent-%COMP%]{font-family:var(--font-body);font-size:11px;color:var(--color-text-muted);text-transform:uppercase;font-weight:600}.info-value[_ngcontent-%COMP%]{font-family:var(--font-body);font-size:14px;font-weight:700;color:var(--color-text-primary)}.priority-badge[_ngcontent-%COMP%]{font-family:var(--font-body);font-size:13px;font-weight:700;padding:4px 12px;border-radius:12px;width:fit-content;text-transform:capitalize}.priority-badge.baja[_ngcontent-%COMP%]{background-color:#edf8f6;color:#2e9e7a}.priority-badge.media[_ngcontent-%COMP%]{background-color:#fff8e6;color:#9a7a00}.priority-badge.alta[_ngcontent-%COMP%]{background-color:#fff3e0;color:#e65100}.priority-badge.critica[_ngcontent-%COMP%]{background-color:#fdf2f2;color:var(--color-error)}.detail-description-section[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%], .detail-attachments-section[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{font-family:var(--font-heading);font-size:15px;font-weight:700;color:var(--color-text-primary);margin-bottom:8px}.description-text[_ngcontent-%COMP%]{font-family:var(--font-body);font-size:14px;line-height:1.6;color:var(--color-text-primary);background-color:var(--color-bg-secondary);padding:16px;border-radius:var(--radius-input);border:1px solid var(--color-border);white-space:pre-wrap}.attachments-grid[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:12px}.attachment-file-card[_ngcontent-%COMP%]{background-color:var(--color-bg-primary);border:1.5px solid var(--color-border);border-radius:8px;padding:10px;display:flex;align-items:center;gap:8px}.attachment-file-card[_ngcontent-%COMP%]   span.material-icons[_ngcontent-%COMP%]{color:var(--color-accent-teal)}.attachment-file-card[_ngcontent-%COMP%]   span.file-name[_ngcontent-%COMP%]{font-family:var(--font-body);font-size:12px;color:var(--color-text-primary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.edit-form[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:20px;background-color:var(--color-bg-secondary);padding:24px;border-radius:var(--radius-card);border:1px solid var(--color-border)}.edit-textarea[_ngcontent-%COMP%]{height:140px;background:#fff}.edit-actions[_ngcontent-%COMP%]{display:flex;gap:12px;justify-content:flex-end}.cancel-btn-edit[_ngcontent-%COMP%]{height:40px;background:transparent;border:1px solid var(--color-border);border-radius:var(--radius-button);color:var(--color-text-muted);font-family:var(--font-body);padding:0 20px;cursor:pointer;transition:background-color .2s}.cancel-btn-edit[_ngcontent-%COMP%]:hover{background-color:#00000008}.save-btn[_ngcontent-%COMP%]{height:40px;background-color:var(--color-success);color:#fff;border:none;border-radius:var(--radius-button);font-family:var(--font-heading);font-weight:600;padding:0 24px;cursor:pointer;transition:opacity .2s}.save-btn[_ngcontent-%COMP%]:disabled{opacity:.6;cursor:not-allowed}.comments-section[_ngcontent-%COMP%]{margin-top:32px;border-top:1px solid var(--color-border);padding-top:24px}.comments-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{font-family:var(--font-heading);font-size:16px;color:var(--color-text-primary);margin-bottom:16px}.comments-list[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:16px;max-height:300px;overflow-y:auto;margin-bottom:24px;padding-right:8px}.comment-item[_ngcontent-%COMP%]{background-color:var(--color-bg-secondary);border-radius:var(--radius-input);padding:12px;display:flex;flex-direction:column;gap:6px;border:1px solid var(--color-border);max-width:85%}.comment-item.user[_ngcontent-%COMP%]{align-self:flex-start;border-left:3px solid var(--color-accent-teal)}.comment-item.agent[_ngcontent-%COMP%]{align-self:flex-end;background-color:#ebf4fd;border-color:#b2d4fc;border-right:3px solid var(--bot-blue)}.comment-header[_ngcontent-%COMP%]{display:flex;justify-content:space-between;font-size:11px;color:var(--color-text-muted);gap:16px}.comment-sender[_ngcontent-%COMP%]{font-weight:700;font-family:var(--font-heading)}.comment-body[_ngcontent-%COMP%]{font-family:var(--font-body);font-size:13px;color:var(--color-text-primary);line-height:1.5}.add-comment-form[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:12px}.add-comment-form[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]{height:70px;padding:10px}.comment-submit-btn[_ngcontent-%COMP%]{align-self:flex-end;height:38px;background-color:var(--color-accent-teal);color:#fff;border:none;border-radius:var(--radius-button);padding:0 20px;font-family:var(--font-heading);font-size:13px;font-weight:600;cursor:pointer;transition:background-color .2s}.comment-submit-btn[_ngcontent-%COMP%]:hover:not(:disabled){background-color:var(--color-accent-teal-hover)}.comment-submit-btn[_ngcontent-%COMP%]:disabled{opacity:.6;cursor:not-allowed}.admin-controls-card[_ngcontent-%COMP%]{background-color:var(--color-bg-secondary);border:1.5px solid var(--color-border);border-radius:var(--radius-card);padding:20px;margin-top:10px}.admin-controls-card[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{font-family:var(--font-heading);font-size:15px;font-weight:700;color:var(--color-text-primary);margin-bottom:12px;margin-top:0}.admin-controls-row[_ngcontent-%COMP%]{display:flex;gap:24px;flex-wrap:wrap}.admin-control-group[_ngcontent-%COMP%]{flex:1;min-width:200px;display:flex;flex-direction:column;gap:6px}.admin-control-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{font-family:var(--font-body);font-size:12px;font-weight:600;color:var(--color-text-primary)}.admin-control-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]{height:40px;padding:0 12px;border:1.5px solid var(--color-border);border-radius:var(--radius-input);font-family:var(--font-body);font-size:14px;color:var(--color-text-primary);outline:none;background-color:#fff;cursor:pointer;transition:border-color .2s ease}.admin-control-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus{border-color:var(--color-accent-teal)}.admin-actions-toolbar[_ngcontent-%COMP%]{display:flex;align-items:center;gap:24px;flex-wrap:wrap;margin-top:12px}.status-buttons-group[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:6px}.control-label[_ngcontent-%COMP%]{font-family:var(--font-body);font-size:12px;font-weight:600;color:var(--color-text-primary)}.btn-group[_ngcontent-%COMP%]{display:flex;gap:8px}.status-btn[_ngcontent-%COMP%]{height:36px;padding:0 16px;border:1px solid var(--color-border);border-radius:18px;font-family:var(--font-body);font-size:13px;font-weight:500;cursor:pointer;background-color:#fff;transition:all .2s ease;color:var(--color-text-primary);outline:none}.status-btn[_ngcontent-%COMP%]:hover{background-color:var(--color-bg-secondary);border-color:var(--color-accent-teal)}.status-btn.active[_ngcontent-%COMP%]{color:#fff;border-color:transparent;font-weight:600}.status-btn.btn-abierto.active[_ngcontent-%COMP%]{background-color:#2196f3}.status-btn.btn-progreso.active[_ngcontent-%COMP%]{background-color:#ff9800}.status-btn.btn-resuelto.active[_ngcontent-%COMP%]{background-color:#4caf50}.status-btn.btn-cerrado.active[_ngcontent-%COMP%]{background-color:#9e9e9e}.status-btn.btn-reabierto.active[_ngcontent-%COMP%]{background-color:#e91e63}.separator-v[_ngcontent-%COMP%]{width:1px;height:40px;background-color:var(--color-border);align-self:center}.agent-stats-row[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(6,1fr);gap:16px;margin-bottom:24px;margin-top:12px}.stat-card[_ngcontent-%COMP%]{background:#fff;border:1px solid var(--color-border);border-radius:12px;padding:16px;display:flex;flex-direction:column;gap:8px;box-shadow:0 2px 4px #00000005;transition:transform .2s ease,box-shadow .2s ease}.stat-card[_ngcontent-%COMP%]:hover{transform:translateY(-2px);box-shadow:0 4px 8px #0000000a}.stat-card[_ngcontent-%COMP%]   .stat-label[_ngcontent-%COMP%]{font-family:var(--font-body);font-size:13px;color:var(--color-text-muted);font-weight:500}.stat-card[_ngcontent-%COMP%]   .stat-value[_ngcontent-%COMP%]{font-family:var(--font-heading);font-size:28px;font-weight:700;line-height:1}.stat-card.total[_ngcontent-%COMP%]   .stat-value[_ngcontent-%COMP%]{color:#37474f}.stat-card.abiertos[_ngcontent-%COMP%]   .stat-value[_ngcontent-%COMP%]{color:#2e9e7a}.stat-card.progreso[_ngcontent-%COMP%]   .stat-value[_ngcontent-%COMP%]{color:#e07b00}.stat-card.reabiertos[_ngcontent-%COMP%]   .stat-value[_ngcontent-%COMP%]{color:#c2185b}.stat-card.transferidos[_ngcontent-%COMP%]   .stat-value[_ngcontent-%COMP%]{color:#1565c0}.stat-card.resueltos[_ngcontent-%COMP%]   .stat-value[_ngcontent-%COMP%]{color:#455a64}.agent-tabs-container[_ngcontent-%COMP%]{display:flex;flex-direction:row;align-items:center;gap:16px;margin-bottom:16px;padding:0 4px;width:100%}.agent-tabs[_ngcontent-%COMP%]{display:flex;gap:8px;flex-wrap:wrap;border:none;padding-bottom:0;align-items:center}.agent-tab-btn[_ngcontent-%COMP%]{padding:6px 16px;border:1px solid #E0E0E0;background:#fff;font-family:var(--font-body);font-size:13px;font-weight:500;color:#546e7a;cursor:pointer;border-radius:20px;transition:all .2s ease;outline:none;display:inline-flex;align-items:center;justify-content:center}.agent-tab-btn[_ngcontent-%COMP%]:hover{border-color:#b0bec5;color:#37474f;background-color:#f5f7f8}.agent-tab-btn.active[_ngcontent-%COMP%]{background-color:#2c2a38;color:#fff;border-color:#2c2a38;font-weight:600}.user-filters-container[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;align-items:center;gap:12px;margin-top:16px;margin-bottom:16px;background-color:var(--color-bg-secondary);padding:10px 14px;border-radius:var(--radius-card);border:1px solid var(--color-border);animation:_ngcontent-%COMP%_userFiltersFadeIn .3s ease-out}@keyframes _ngcontent-%COMP%_userFiltersFadeIn{0%{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}.user-search-bar[_ngcontent-%COMP%]{display:flex;align-items:center;background-color:var(--color-bg-primary);border:1.5px solid var(--color-border);border-radius:20px;padding:0 12px;height:34px;gap:6px;transition:all .25s ease;position:relative;flex:2;min-width:250px}.user-search-bar[_ngcontent-%COMP%]:focus-within{border-color:var(--color-accent-teal);box-shadow:0 0 0 3px #77c2d81a}.user-search-bar[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{border:none;background:transparent;outline:none;font-family:var(--font-body);font-size:13px;color:var(--color-text-primary);width:100%}.user-search-bar[_ngcontent-%COMP%]   .search-icon[_ngcontent-%COMP%]{color:var(--color-text-muted);font-size:18px}.user-search-bar[_ngcontent-%COMP%]   .clear-search-btn[_ngcontent-%COMP%]{background:transparent;border:none;color:var(--color-text-muted);cursor:pointer;display:flex;align-items:center;justify-content:center;padding:2px;border-radius:50%;transition:background-color .2s}.user-search-bar[_ngcontent-%COMP%]   .clear-search-btn[_ngcontent-%COMP%]:hover{background-color:#0000000d;color:var(--color-text-primary)}.user-filter-controls[_ngcontent-%COMP%]{display:flex;align-items:center;gap:12px;flex:3;flex-wrap:wrap}.user-filter-controls[_ngcontent-%COMP%]   .filter-group[_ngcontent-%COMP%]{display:flex;flex-direction:row;align-items:center;gap:6px;flex:1;min-width:160px}.user-filter-controls[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{font-size:10px;font-weight:700;color:var(--color-text-muted);text-transform:uppercase;letter-spacing:.5px;white-space:nowrap}.user-filter-controls[_ngcontent-%COMP%]   .select-wrapper[_ngcontent-%COMP%]{position:relative;display:flex;align-items:center;background-color:var(--color-bg-primary);border:1.5px solid var(--color-border);border-radius:6px;height:32px;padding:0 8px;transition:all .2s ease;flex:1}.user-filter-controls[_ngcontent-%COMP%]   .select-wrapper[_ngcontent-%COMP%]:focus-within, .user-filter-controls[_ngcontent-%COMP%]   .select-wrapper[_ngcontent-%COMP%]:hover{border-color:var(--color-accent-teal)}.user-filter-controls[_ngcontent-%COMP%]   .select-icon[_ngcontent-%COMP%]{color:var(--color-text-muted);font-size:16px;margin-right:4px;pointer-events:none}.user-filter-controls[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]{border:none;background:transparent;outline:none;font-family:var(--font-body);font-size:12.5px;color:var(--color-text-primary);width:100%;cursor:pointer;appearance:none;-webkit-appearance:none;-moz-appearance:none;padding-right:20px}.user-filter-controls[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]   option[_ngcontent-%COMP%]{background-color:var(--color-bg-primary);color:var(--color-text-primary);font-family:var(--font-body);font-size:13px;padding:8px}.user-filter-controls[_ngcontent-%COMP%]   .select-wrapper[_ngcontent-%COMP%]:after{content:"expand_more";font-family:Material Icons;position:absolute;right:8px;color:var(--color-text-muted);font-size:16px;pointer-events:none;transition:transform .25s cubic-bezier(.4,0,.2,1),color .25s ease}.user-filter-controls[_ngcontent-%COMP%]   .select-wrapper[_ngcontent-%COMP%]:focus-within:after{transform:rotate(180deg);color:var(--color-accent-teal)}.user-filter-controls[_ngcontent-%COMP%]   .clear-filters-btn[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;gap:4px;background-color:transparent;border:1.5px solid var(--color-error);color:var(--color-error);padding:0 12px;height:32px;border-radius:6px;font-weight:600;font-size:12px;cursor:pointer;transition:all .2s ease;white-space:nowrap}.user-filter-controls[_ngcontent-%COMP%]   .clear-filters-btn[_ngcontent-%COMP%]:hover{background-color:var(--color-error);color:#fff}.agent-search-bar[_ngcontent-%COMP%]{display:flex;align-items:center;background-color:#fafafa;border:1.5px solid var(--color-border);border-radius:20px;padding:0 16px;height:40px;gap:8px;transition:border-color .2s ease;width:320px;flex-shrink:0}.agent-search-bar[_ngcontent-%COMP%]:focus-within{border-color:var(--color-accent-teal)}.agent-search-bar[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{border:none;background:transparent;outline:none;font-family:var(--font-body);font-size:14px;color:var(--color-text-primary);width:100%}.agent-search-bar[_ngcontent-%COMP%]   .search-icon[_ngcontent-%COMP%]{color:var(--color-text-secondary);font-size:20px}.new-ticket-badge[_ngcontent-%COMP%]{background-color:var(--bot-orange);color:#fff;font-size:10px;font-weight:700;padding:2px 8px;border-radius:12px;text-transform:uppercase;letter-spacing:.5px}.card-timestamp-info-row[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:4px;font-size:11px;font-weight:500;padding:2px 8px;border-radius:4px;font-family:var(--font-body)}.card-timestamp-info-row.reopened[_ngcontent-%COMP%]{background-color:#fff0f5;color:#c71585}.card-timestamp-info-row.closed[_ngcontent-%COMP%]{background-color:#e8f5e9;color:#2e7d32}.card-timestamp-info-row.edited[_ngcontent-%COMP%]{background-color:#eceff1;color:#455a64}.resolve-action-btn[_ngcontent-%COMP%]{background-color:var(--color-success);color:#fff;border:none;border-radius:8px;padding:8px 16px;font-family:var(--font-heading);font-size:13px;font-weight:600;cursor:pointer;display:inline-flex;align-items:center;gap:6px;transition:background-color .2s,transform .1s;outline:none}.resolve-action-btn[_ngcontent-%COMP%]:hover{background-color:#2e7d32}.resolve-action-btn[_ngcontent-%COMP%]:active{transform:scale(.97)}.ticket-resolved-badge-large[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:6px;color:var(--color-success);font-family:var(--font-heading);font-size:14px;font-weight:600}.transfer-modal-overlay[_ngcontent-%COMP%]{position:fixed;top:0;left:0;width:100vw;height:100vh;background-color:#0006;display:flex;justify-content:center;align-items:center;z-index:1000;-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px)}.transfer-modal-container[_ngcontent-%COMP%]{background-color:#fff;width:600px;max-width:95%;max-height:95vh;border-radius:16px;box-shadow:0 10px 30px #00000026;padding:20px;display:flex;flex-direction:column;font-family:DM Sans,sans-serif;box-sizing:border-box}.transfer-modal-header[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px}.transfer-modal-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{font-size:20px;font-weight:700;color:#1a202c;margin:0}.close-modal-btn[_ngcontent-%COMP%]{background:none;border:none;cursor:pointer;color:#718096;display:flex;align-items:center;justify-content:center;padding:4px;border-radius:50%;transition:background-color .2s}.close-modal-btn[_ngcontent-%COMP%]:hover{background-color:#f7fafc;color:#2d3748}.transfer-modal-subtitle[_ngcontent-%COMP%]{color:#718096;font-size:14px;margin-top:0;margin-bottom:12px;text-align:left}.transfer-search-container[_ngcontent-%COMP%]{position:relative;margin-bottom:12px}.transfer-search-container[_ngcontent-%COMP%]   .search-icon[_ngcontent-%COMP%]{position:absolute;left:12px;top:50%;transform:translateY(-50%);color:#a0aec0;font-size:18px}.transfer-search-container[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{width:100%;padding:8px 12px 8px 36px;border:1px solid #e2e8f0;border-radius:10px;font-size:14px;outline:none;transition:border-color .2s,box-shadow .2s;box-sizing:border-box}.transfer-search-container[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus{border-color:#3182ce;box-shadow:0 0 0 3px #4299e126}.transfer-tags-container[_ngcontent-%COMP%]{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px}.tag-chip-btn[_ngcontent-%COMP%]{background-color:#f7fafc;border:1px solid #e2e8f0;border-radius:16px;padding:5px 12px;font-size:12px;font-weight:500;color:#4a5568;cursor:pointer;transition:all .2s}.tag-chip-btn[_ngcontent-%COMP%]:hover{background-color:#edf2f7;color:#2d3748}.tag-chip-btn.active[_ngcontent-%COMP%]{background-color:#1a202c;color:#fff;border-color:#1a202c}.status-filters-container[_ngcontent-%COMP%]{display:flex;gap:12px;margin-bottom:12px;font-size:13px}.status-filter-btn[_ngcontent-%COMP%]{background:none;border:none;cursor:pointer;display:flex;align-items:center;gap:4px;padding:4px 8px;border-radius:6px;color:#718096;font-weight:500;transition:background-color .2s}.status-filter-btn[_ngcontent-%COMP%]:hover{background-color:#f7fafc}.status-filter-btn.active[_ngcontent-%COMP%]{background-color:#edf2f7;color:#2d3748}.status-dot[_ngcontent-%COMP%]{width:8px;height:8px;border-radius:50%;display:inline-block}.status-dot.green[_ngcontent-%COMP%]{background-color:#48bb78}.status-dot.gray[_ngcontent-%COMP%]{background-color:#a0aec0}.transfer-agents-list[_ngcontent-%COMP%]{flex:1;overflow-y:auto;border:1px solid #e2e8f0;border-radius:12px;margin-bottom:12px;max-height:120px;min-height:90px}.agent-transfer-row[_ngcontent-%COMP%]{display:flex;align-items:center;padding:8px 16px;cursor:pointer;border-bottom:1px solid #f7fafc;transition:background-color .2s}.agent-transfer-row[_ngcontent-%COMP%]:last-child{border-bottom:none}.agent-transfer-row[_ngcontent-%COMP%]:hover{background-color:#f7fafc}.agent-transfer-row.selected[_ngcontent-%COMP%]{background-color:#ebf8ff}.agent-transfer-row.disabled[_ngcontent-%COMP%]{cursor:not-allowed;opacity:.65}.agent-avatar-circle[_ngcontent-%COMP%]{width:34px;height:34px;border-radius:50%;background-color:#2d3748;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:14px;position:relative;margin-right:12px}.avatar-status-dot[_ngcontent-%COMP%]{width:10px;height:10px;border-radius:50%;border:2px solid #ffffff;position:absolute;bottom:0;right:0;background-color:#a0aec0}.avatar-status-dot.online[_ngcontent-%COMP%]{background-color:#48bb78}.agent-info-col[_ngcontent-%COMP%]{display:flex;flex-direction:column;flex:1;text-align:left}.agent-name-text[_ngcontent-%COMP%]{font-size:15px;font-weight:600;color:#2d3748}.agent-spec-text[_ngcontent-%COMP%]{font-size:13px;color:#718096;margin-top:2px}.agent-chats-col[_ngcontent-%COMP%]{display:flex;align-items:center}.active-chats-badge[_ngcontent-%COMP%]{display:flex;align-items:center;gap:6px;color:#718096;font-size:14px}.active-chats-badge[_ngcontent-%COMP%]   .chat-icon[_ngcontent-%COMP%]{font-size:18px}.no-available-text[_ngcontent-%COMP%]{color:#a0aec0;font-size:14px;font-style:italic}.empty-agents-message[_ngcontent-%COMP%]{padding:30px;text-align:center;color:#718096;font-size:15px}.transfer-reason-container[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:8px;margin-bottom:24px;text-align:left}.reason-label[_ngcontent-%COMP%]{font-size:14px;font-weight:600;color:#4a5568}.transfer-reason-container[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]{padding:10px 12px;border:1px solid #e2e8f0;border-radius:12px;font-family:inherit;font-size:14px;outline:none;resize:none;height:65px;box-sizing:border-box;transition:border-color .2s}.transfer-reason-container[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus{border-color:#3182ce}.transfer-modal-actions[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;margin-top:15px;padding-top:15px;border-top:1px solid #edf2f7}.selected-agent-indicator[_ngcontent-%COMP%]{font-size:14px;color:#718096}.modal-buttons-group[_ngcontent-%COMP%]{display:flex;gap:12px}.cancel-modal-btn[_ngcontent-%COMP%]{background-color:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:10px 20px;font-size:14px;font-weight:600;color:#4a5568;cursor:pointer;transition:background-color .2s}.cancel-modal-btn[_ngcontent-%COMP%]:hover{background-color:#f7fafc}.confirm-transfer-btn[_ngcontent-%COMP%]{background-color:#3182ce;border:none;border-radius:12px;padding:10px 20px;font-size:14px;font-weight:600;color:#fff;cursor:pointer;display:flex;align-items:center;gap:8px;transition:background-color .2s}.confirm-transfer-btn[_ngcontent-%COMP%]:hover{background-color:#2b6cb0}.confirm-transfer-btn[_ngcontent-%COMP%]:disabled{background-color:#cbd5e0;cursor:not-allowed}.transfer-modal-btn[_ngcontent-%COMP%]{display:flex;align-items:center;gap:6px;background-color:#fff;border:1px solid #e2e8f0;border-radius:8px;padding:8px 14px;font-size:14px;font-weight:500;color:#4a5568;cursor:pointer;transition:background-color .2s}.transfer-action-btn[_ngcontent-%COMP%]{background-color:#0288d1;color:#fff;border:none;border-radius:8px;padding:8px 16px;font-family:var(--font-heading);font-size:13px;font-weight:600;cursor:pointer;display:inline-flex;align-items:center;gap:6px;transition:background-color .2s,transform .1s;outline:none}.transfer-action-btn[_ngcontent-%COMP%]:hover{background-color:#0277bd}.transfer-action-btn[_ngcontent-%COMP%]:active{transform:scale(.97)}.transfer-modal-btn[_ngcontent-%COMP%]:hover{background-color:#f7fafc;border-color:#cbd5e0}.transfer-modal-btn[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%]{font-size:18px}.success-overlay[_ngcontent-%COMP%]{position:fixed;top:0;left:0;width:100vw;height:100vh;background-color:#33314399;-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px);z-index:9999;display:flex;align-items:center;justify-content:center;animation:_ngcontent-%COMP%_fadeIn .25s ease-out}.success-dialog[_ngcontent-%COMP%]{background-color:var(--color-bg-primary, #fff);padding:32px;border-radius:16px;width:90%;max-width:450px;text-align:center;box-shadow:0 10px 25px #0003;display:flex;flex-direction:column;align-items:center;gap:16px;animation:_ngcontent-%COMP%_scaleIn .3s cubic-bezier(.34,1.56,.64,1)}.success-icon[_ngcontent-%COMP%]{font-size:54px;color:var(--color-success, #2E9E7A)}.success-dialog[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{margin:0;font-family:var(--font-heading);font-size:20px;font-weight:700;color:var(--color-text-primary)}.clarification-text[_ngcontent-%COMP%]{margin:0;font-family:var(--font-body);font-size:14px;line-height:1.6;color:var(--color-text-secondary)}.success-actions[_ngcontent-%COMP%]{margin-top:8px;width:100%}.success-actions[_ngcontent-%COMP%]   .accept-btn[_ngcontent-%COMP%]{width:100%;height:44px;background-color:var(--color-accent-teal);color:#fff;border:none;border-radius:var(--radius-button, 8px);font-family:var(--font-heading);font-weight:600;font-size:15px;cursor:pointer;transition:background-color .2s ease}.success-actions[_ngcontent-%COMP%]   .accept-btn[_ngcontent-%COMP%]:hover{background-color:var(--color-accent-teal-hover)}.system-comment-notice[_ngcontent-%COMP%]{align-self:center;background-color:#e3f2fd;border:1px solid #BBDEFB;border-radius:8px;padding:10px 16px;color:#0d47a1;font-family:var(--font-body);font-size:13px;font-weight:500;display:flex;align-items:center;gap:8px;width:100%;max-width:90%;box-shadow:0 2px 4px #00000005;box-sizing:border-box}.comment-time-system[_ngcontent-%COMP%]{font-size:10px;color:#1565c0;margin-left:auto;flex-shrink:0}@keyframes _ngcontent-%COMP%_fadeIn{0%{opacity:0}to{opacity:1}}@keyframes _ngcontent-%COMP%_scaleIn{0%{transform:scale(.9);opacity:0}to{transform:scale(1);opacity:1}}.status-badge.unread-response-badge[_ngcontent-%COMP%]{background-color:#408df326!important;color:var(--bot-blue)!important;border:1.5px solid rgba(64,141,243,.3)!important;font-weight:700;display:inline-flex;align-items:center;justify-content:center;padding:0!important;width:22px;height:22px;border-radius:50%!important;animation:_ngcontent-%COMP%_heartbeat 1.5s infinite ease-in-out}@keyframes _ngcontent-%COMP%_heartbeat{0%{transform:scale(1)}14%{transform:scale(1.2)}28%{transform:scale(1)}42%{transform:scale(1.2)}70%{transform:scale(1)}}.toast-notification[_ngcontent-%COMP%]{position:fixed;bottom:24px;right:24px;background-color:var(--color-bg-primary);border:1px solid var(--color-border);border-left:4px solid var(--bot-blue);border-radius:12px;padding:16px;box-shadow:var(--shadow-bot-chat);z-index:10000;display:flex;align-items:center;gap:12px;cursor:pointer;animation:_ngcontent-%COMP%_slideInRight .35s cubic-bezier(.16,1,.3,1);max-width:380px;transition:all .2s ease}.toast-notification[_ngcontent-%COMP%]:hover{transform:translateY(-2px);box-shadow:0 20px 40px #33314340}.toast-icon[_ngcontent-%COMP%]{color:var(--bot-blue);font-size:24px;background-color:#408df31a;padding:8px;border-radius:50%}.toast-content[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:4px;padding-right:8px}.toast-title[_ngcontent-%COMP%]{font-family:var(--font-heading);font-weight:700;font-size:13px;color:var(--color-text-primary)}.toast-text[_ngcontent-%COMP%]{font-family:var(--font-body);font-size:12px;color:var(--color-text-muted);line-height:1.4}.toast-close[_ngcontent-%COMP%]{background:none;border:none;cursor:pointer;color:var(--color-text-muted);padding:4px;display:flex;align-items:center;justify-content:center;border-radius:50%;transition:background-color .2s;margin-left:auto;flex-shrink:0}.toast-close[_ngcontent-%COMP%]:hover{background-color:var(--color-bg-secondary);color:var(--color-text-primary)}@keyframes _ngcontent-%COMP%_slideInRight{0%{transform:translate(100%);opacity:0}to{transform:translate(0);opacity:1}}.confirm-modal-overlay[_ngcontent-%COMP%]{position:fixed;top:0;left:0;width:100vw;height:100vh;background-color:#33314366;display:flex;justify-content:center;align-items:center;z-index:1001;-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px);animation:_ngcontent-%COMP%_modalFadeIn .2s ease-out}@keyframes _ngcontent-%COMP%_modalFadeIn{0%{opacity:0}to{opacity:1}}.confirm-modal-container[_ngcontent-%COMP%]{background-color:#fff;width:380px;max-width:90%;border-radius:16px;box-shadow:0 10px 30px #33314326;padding:24px;display:flex;flex-direction:column;align-items:center;gap:16px;animation:_ngcontent-%COMP%_modalScaleIn .25s cubic-bezier(.16,1,.3,1);border:1px solid var(--color-border)}@keyframes _ngcontent-%COMP%_modalScaleIn{0%{opacity:0;transform:scale(.95) translateY(10px)}to{opacity:1;transform:scale(1) translateY(0)}}.confirm-modal-content[_ngcontent-%COMP%]{text-align:center;display:flex;flex-direction:column;align-items:center;gap:12px}.confirm-modal-icon[_ngcontent-%COMP%]{font-size:48px;color:var(--color-success);background-color:#4caf821a;padding:12px;border-radius:50%}.confirm-modal-content[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{font-size:20px;font-weight:700;color:var(--color-text-primary);margin:0;font-family:var(--font-heading)}.confirm-modal-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:13.5px;color:var(--color-text-muted);line-height:1.5;margin:0;font-family:var(--font-body)}.confirm-modal-actions[_ngcontent-%COMP%]{display:flex;gap:12px;width:100%;margin-top:8px}.confirm-modal-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{flex:1;height:40px;border-radius:20px;font-weight:600;font-size:13.5px;font-family:var(--font-heading);cursor:pointer;transition:all .2s ease;border:none;outline:none}.confirm-modal-actions[_ngcontent-%COMP%]   .cancel-confirm-btn[_ngcontent-%COMP%]{background-color:var(--color-bg-secondary);border:1px solid var(--color-border);color:var(--color-text-primary)}.confirm-modal-actions[_ngcontent-%COMP%]   .cancel-confirm-btn[_ngcontent-%COMP%]:hover{background-color:var(--color-border)}.confirm-modal-actions[_ngcontent-%COMP%]   .accept-confirm-btn[_ngcontent-%COMP%]{background-color:var(--color-success);color:#fff;box-shadow:0 4px 12px #4caf8240}.confirm-modal-actions[_ngcontent-%COMP%]   .accept-confirm-btn[_ngcontent-%COMP%]:hover{background-color:#3e966e;box-shadow:0 6px 16px #4caf8259;transform:translateY(-1px)}.confirm-modal-actions[_ngcontent-%COMP%]   .accept-confirm-btn[_ngcontent-%COMP%]:active{transform:translateY(0)}']})}return n})();export{jo as a,Bm as b};
