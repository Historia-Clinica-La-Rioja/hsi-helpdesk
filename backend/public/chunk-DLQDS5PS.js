import{c as gt,d as Xe,i as Ze}from"./chunk-D3S5IZVM.js";import{a as Bt,b as jt,c as je,d as Ht,e as Ut,f as vt,g as Wt,h as qt,i as wn,j as yi,k as kn,m as Sn,n as Yt,o as Mn}from"./chunk-HPVTU5JO.js";import{e as yn,f as zt,g as xn,h as Ie,l as Cn}from"./chunk-ZJI5RKH2.js";import{$ as pn,$a as y,A as It,Ab as E,B as Rt,Bb as j,C as dn,Ca as ze,Cb as Qe,D as _i,Da as ct,Db as ut,Ea as he,Eb as ft,Fa as Be,Fb as _t,Gb as ye,H as Ft,Hb as vn,I as be,Ia as dt,Ib as xe,J as Ne,Ja as fn,Jb as Ce,K as le,L as me,Ma as D,Na as Y,Nb as F,O as at,Oa as de,Ob as bn,P as O,Q as W,Qa as Ge,Ra as Lt,Rb as we,S as R,Ta as pt,Tb as L,U as m,Ub as bi,Vb as Vt,Wa as mt,X as Pe,Xa as _n,Ya as gn,Z as g,Za as re,_ as v,_a as b,a as k,aa as ee,ab as $e,b as H,ba as te,bb as ae,ca as gi,cb as se,db as M,e as ve,ea as U,eb as a,fa as V,fb as s,g as Fe,gb as T,h as P,hb as G,i as an,ia as w,ib as $,jb as Nt,kb as I,l as Se,la as ce,lb as De,ma as st,na as Ve,oa as q,ob as f,p as Ae,pa as lt,pb as h,q as sn,qb as ue,ra as mn,rb as ne,s as ln,sb as Ke,t as cn,ta as hn,tb as Ee,ua as At,ub as z,v as Le,va as un,vb as B,w as Me,wb as vi,x as fi,xa as d,xb as S,yb as ht,zb as c}from"./chunk-T232GBWW.js";var Gt=(()=>{class n{http=m(Xe);auth=m(Ze);apiUrl="/api";allTickets=w([]);tickets=F(()=>this.allTickets());hasTickets=F(()=>this.allTickets().length>0);activeCount=F(()=>this.allTickets().filter(e=>e.status==="abierto"||e.status==="en_progreso").length);constructor(){this.auth.currentUser}loadTicketsForUser(e){let t=this.auth.token();if(!t){this.allTickets.set([]);return}this.http.get(`${this.apiUrl}/tickets`,{headers:{Authorization:`Bearer ${t}`}}).subscribe({next:i=>{let r=i.map(l=>H(k({},l),{created_at:new Date(l.created_at),updated_at:new Date(l.updated_at),closed_at:l.closed_at?new Date(l.closed_at):void 0,resolved_at:l.resolved_at?new Date(l.resolved_at):void 0,reopened_at:l.reopened_at?new Date(l.reopened_at):void 0,messages:l.messages?l.messages.map(p=>H(k({},p),{created_at:new Date(p.created_at)})):[]}));this.allTickets.set(r)},error:i=>{console.error("Error loading tickets from backend:",i),this.allTickets.set([])}})}clearTickets(){this.allTickets.set([])}getTicketDetails(e){let t=this.auth.token();return this.http.get(`${this.apiUrl}/tickets/${e}`,{headers:{Authorization:`Bearer ${t}`}}).pipe(me(i=>{let r=H(k({},i),{created_at:new Date(i.created_at),updated_at:new Date(i.updated_at),closed_at:i.closed_at?new Date(i.closed_at):void 0,resolved_at:i.resolved_at?new Date(i.resolved_at):void 0,reopened_at:i.reopened_at?new Date(i.reopened_at):void 0,messages:i.messages?i.messages.map(p=>H(k({},p),{created_at:new Date(p.created_at)})):[]}),l=this.allTickets().map(p=>p.id===e?r:p);this.allTickets.set(l)}))}createTicket(e,t,i,r,l,p,u){let x=this.auth.token();return this.http.post(`${this.apiUrl}/tickets`,{title:r,description:l,institution:t,priority:i,tags:p,attachments:u},{headers:{Authorization:`Bearer ${x}`}}).pipe(me(_=>{let C=_.ticket,X=[{id:C.id,title:C.title,description:C.description,user_id:C.user_id,institution:C.institution,priority:C.priority,status:C.status,tags:C.tags||[],attachments:C.attachments||[],created_at:new Date(C.created_at),updated_at:new Date(C.updated_at),messages:[]},...this.allTickets()];this.allTickets.set(X)}))}updateTicket(e,t,i,r=!1){let l=this.auth.token();return this.http.put(`${this.apiUrl}/tickets/${e}`,{description:t,priority:i},{headers:{Authorization:`Bearer ${l}`}}).pipe(me(p=>{let u=this.allTickets().map(x=>x.id===e?H(k({},x),{description:p.description||t,priority:p.priority||i,editCount:p.editCount??(x.editCount||0)+(r?1:0),updated_at:p.updated_at?new Date(p.updated_at):new Date}):x);this.allTickets.set(u)}))}addComment(e,t){let i=this.auth.token();return this.http.post(`${this.apiUrl}/tickets/${e}/messages`,{content:t},{headers:{Authorization:`Bearer ${i}`}}).pipe(me(r=>{let l={id:r.id,sender_id:r.sender_id,role:r.role,content:r.content,created_at:new Date(r.created_at)},p=this.allTickets().map(u=>u.id===e?H(k({},u),{messages:[...u.messages||[],l]}):u);this.allTickets.set(p)}))}updateTicketStatus(e,t){let i=this.auth.token();return this.http.put(`${this.apiUrl}/tickets/${e}/status`,{status:t},{headers:{Authorization:`Bearer ${i}`}}).pipe(me(r=>{let l=this.allTickets().map(p=>p.id===e?H(k({},p),{status:r.status,updated_at:new Date(r.updated_at),closed_at:r.closed_at?new Date(r.closed_at):void 0,resolved_at:r.resolved_at?new Date(r.resolved_at):void 0,reopened_at:r.reopened_at?new Date(r.reopened_at):void 0}):p);this.allTickets.set(l)}))}assignTicket(e,t,i){let r=this.auth.token();return this.http.put(`${this.apiUrl}/tickets/${e}/assign`,{assigned_to:t,reason:i||""},{headers:{Authorization:`Bearer ${r}`}}).pipe(me(l=>{let p=this.allTickets().map(u=>u.id===e?H(k({},u),{status:l.status,assigned_to:l.assigned_to||t,updated_at:new Date(l.updated_at),closed_at:l.closed_at?new Date(l.closed_at):void 0,resolved_at:l.resolved_at?new Date(l.resolved_at):void 0,reopened_at:l.reopened_at?new Date(l.reopened_at):void 0}):u);this.allTickets.set(p)}))}getAgents(){let e=this.auth.token();return this.http.get(`${this.apiUrl}/agents`,{headers:{Authorization:`Bearer ${e}`}})}getTags(){let e=this.auth.token();return this.http.get(`${this.apiUrl}/tags`,{headers:{Authorization:`Bearer ${e}`}})}deleteTicket(e){return Se({success:!0})}static \u0275fac=function(t){return new(t||n)};static \u0275prov=O({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var En=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275cmp=D({type:n,selectors:[["app-about"]],decls:35,vars:0,consts:[[1,"about-card-content"],[1,"intro-text"],[1,"separator"],[1,"chatbot-highlight-box"],[1,"box-header"],[1,"mini-bot-icon"],[1,"bot-face"],[1,"box-description"],[1,"capabilities-list"],[1,"material-icons","check-icon"]],template:function(t,i){t&1&&(G(0,"div",0)(1,"h2"),c(2,"\xBFQu\xE9 es el Sistema de Soporte de HSI?"),$(),G(3,"p",1),c(4," El Sistema de Soporte de HSI es la plataforma oficial para la gesti\xF3n de consultas, reclamos e incidentes relacionados con Historia de Salud Integrada en la Provincia de La Rioja. Permite a los usuarios institucionales reportar errores, solicitar asistencia t\xE9cnica y hacer seguimiento del estado de sus solicitudes de forma trazable y eficiente. "),$(),Nt(5,"div",2),G(6,"div",3)(7,"div",4)(8,"h3"),c(9,"Asistente Virtual 24/7"),$(),G(10,"div",5),Nt(11,"span",6),$()(),G(12,"p",7),c(13," El chatbot est\xE1 disponible las 24 horas para responder preguntas frecuentes sobre el uso de HSI, orientarte en el sistema y guiarte en la carga de tickets. Si tu consulta requiere atenci\xF3n personalizada, el bot escala autom\xE1ticamente tu caso a un agente de soporte. "),$(),G(14,"ul",8)(15,"li")(16,"span",9),c(17,"check"),$(),G(18,"span"),c(19,"Respuestas a preguntas frecuentes"),$()(),G(20,"li")(21,"span",9),c(22,"check"),$(),G(23,"span"),c(24,"Gu\xEDa de carga de tickets"),$()(),G(25,"li")(26,"span",9),c(27,"check"),$(),G(28,"span"),c(29,"Escalamiento a agente humano"),$()(),G(30,"li")(31,"span",9),c(32,"check"),$(),G(33,"span"),c(34,"Disponible sin necesidad de login"),$()()()()())},dependencies:[Ie],styles:['.about-card-content[_ngcontent-%COMP%]{padding:40px}h2[_ngcontent-%COMP%]{font-family:var(--font-heading);font-size:22px;font-weight:700;color:var(--color-text-primary);margin-bottom:16px}.intro-text[_ngcontent-%COMP%]{font-family:var(--font-body);font-size:15px;line-height:1.7;color:var(--color-text-primary)}.separator[_ngcontent-%COMP%]{height:1px;background-color:var(--color-border);margin:24px 0}.chatbot-highlight-box[_ngcontent-%COMP%]{background-color:var(--color-bg-secondary);border-radius:12px;padding:24px;border-left:4px solid var(--bot-blue);position:relative}.box-header[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px}.box-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{font-family:var(--font-heading);font-size:16px;font-weight:600;color:var(--color-text-primary)}.mini-bot-icon[_ngcontent-%COMP%]{width:32px;height:32px;border-radius:var(--radius-bot);background:var(--bot-fab-gradient);position:relative;display:flex;align-items:center;justify-content:center}.bot-face[_ngcontent-%COMP%]{width:14px;height:10px;border:2px solid white;border-radius:3px;position:relative}.bot-face[_ngcontent-%COMP%]:before, .bot-face[_ngcontent-%COMP%]:after{content:"";position:absolute;width:3px;height:3px;background-color:var(--bot-yellow);border-radius:50%;top:2px}.bot-face[_ngcontent-%COMP%]:before{left:2px}.bot-face[_ngcontent-%COMP%]:after{right:2px}.box-description[_ngcontent-%COMP%]{font-family:var(--font-body);font-size:14px;line-height:1.6;color:var(--color-text-muted);margin-bottom:16px;max-width:90%}.capabilities-list[_ngcontent-%COMP%]{list-style:none;display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:12px}.capabilities-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px;font-family:var(--font-body);font-size:13px;color:var(--color-text-primary)}.check-icon[_ngcontent-%COMP%]{color:var(--color-accent-teal);font-size:18px;font-weight:700}']})}return n})();function bt(n){return n.buttons===0||n.detail===0}function yt(n){let o=n.touches&&n.touches[0]||n.changedTouches&&n.changedTouches[0];return!!o&&o.identifier===-1&&(o.radiusX==null||o.radiusX===1)&&(o.radiusY==null||o.radiusY===1)}var xi;function On(){if(xi==null){let n=typeof document<"u"?document.head:null;xi=!!(n&&(n.createShadowRoot||n.attachShadow))}return xi}function Ci(n){if(On()){let o=n.getRootNode?n.getRootNode():null;if(typeof ShadowRoot<"u"&&ShadowRoot&&o instanceof ShadowRoot)return o}return null}function wi(){let n=typeof document<"u"&&document?document.activeElement:null;for(;n&&n.shadowRoot;){let o=n.shadowRoot.activeElement;if(o===n)break;n=o}return n}function oe(n){return n.composedPath?n.composedPath()[0]:n.target}var ki;try{ki=typeof Intl<"u"&&Intl.v8BreakIterator}catch(n){ki=!1}var Z=(()=>{class n{_platformId=m(hn);isBrowser=this._platformId?Cn(this._platformId):typeof document=="object"&&!!document;EDGE=this.isBrowser&&/(edge)/i.test(navigator.userAgent);TRIDENT=this.isBrowser&&/(msie|trident)/i.test(navigator.userAgent);BLINK=this.isBrowser&&!!(window.chrome||ki)&&typeof CSS<"u"&&!this.EDGE&&!this.TRIDENT;WEBKIT=this.isBrowser&&/AppleWebKit/i.test(navigator.userAgent)&&!this.BLINK&&!this.EDGE&&!this.TRIDENT;IOS=this.isBrowser&&/iPad|iPhone|iPod/.test(navigator.userAgent)&&!("MSStream"in window);FIREFOX=this.isBrowser&&/(firefox|minefield)/i.test(navigator.userAgent);ANDROID=this.isBrowser&&/android/i.test(navigator.userAgent)&&!this.TRIDENT;SAFARI=this.isBrowser&&/safari/i.test(navigator.userAgent)&&this.WEBKIT;constructor(){}static \u0275fac=function(t){return new(t||n)};static \u0275prov=O({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var xt;function Tn(){if(xt==null&&typeof window<"u")try{window.addEventListener("test",null,Object.defineProperty({},"passive",{get:()=>xt=!0}))}finally{xt=xt||!1}return xt}function Je(n){return Tn()?n:!!n.capture}function ke(n){return n instanceof q?n.nativeElement:n}var Pn=new R("cdk-input-modality-detector-options"),Dn={ignoreKeys:[18,17,224,91,16]},In=650,Si={passive:!0,capture:!0},Rn=(()=>{class n{_platform=m(Z);_listenerCleanups;modalityDetected;modalityChanged;get mostRecentModality(){return this._modality.value}_mostRecentTarget=null;_modality=new an(null);_options;_lastTouchMs=0;_onKeydown=e=>{this._options?.ignoreKeys?.some(t=>t===e.keyCode)||(this._modality.next("keyboard"),this._mostRecentTarget=oe(e))};_onMousedown=e=>{Date.now()-this._lastTouchMs<In||(this._modality.next(bt(e)?"keyboard":"mouse"),this._mostRecentTarget=oe(e))};_onTouchstart=e=>{if(yt(e)){this._modality.next("keyboard");return}this._lastTouchMs=Date.now(),this._modality.next("touch"),this._mostRecentTarget=oe(e)};constructor(){let e=m(V),t=m(te),i=m(Pn,{optional:!0});if(this._options=k(k({},Dn),i),this.modalityDetected=this._modality.pipe(Ft(1)),this.modalityChanged=this.modalityDetected.pipe(_i()),this._platform.isBrowser){let r=m(he).createRenderer(null,null);this._listenerCleanups=e.runOutsideAngular(()=>[r.listen(t,"keydown",this._onKeydown,Si),r.listen(t,"mousedown",this._onMousedown,Si),r.listen(t,"touchstart",this._onTouchstart,Si)])}}ngOnDestroy(){this._modality.complete(),this._listenerCleanups?.forEach(e=>e())}static \u0275fac=function(t){return new(t||n)};static \u0275prov=O({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),Ct=(function(n){return n[n.IMMEDIATE=0]="IMMEDIATE",n[n.EVENTUAL=1]="EVENTUAL",n})(Ct||{}),Fn=new R("cdk-focus-monitor-default-options"),$t=Je({passive:!0,capture:!0}),Mi=(()=>{class n{_ngZone=m(V);_platform=m(Z);_inputModalityDetector=m(Rn);_origin=null;_lastFocusOrigin=null;_windowFocused=!1;_windowFocusTimeoutId;_originTimeoutId;_originFromTouchInteraction=!1;_elementInfo=new Map;_monitoredElementCount=0;_rootNodeFocusListenerCount=new Map;_detectionMode;_windowFocusListener=()=>{this._windowFocused=!0,this._windowFocusTimeoutId=setTimeout(()=>this._windowFocused=!1)};_document=m(te);_stopInputModalityDetector=new P;constructor(){let e=m(Fn,{optional:!0});this._detectionMode=e?.detectionMode||Ct.IMMEDIATE}_rootNodeFocusAndBlurListener=e=>{let t=oe(e);for(let i=t;i;i=i.parentElement)e.type==="focus"?this._onFocus(e,i):this._onBlur(e,i)};monitor(e,t=!1){let i=ke(e);if(!this._platform.isBrowser||i.nodeType!==1)return Se();let r=Ci(i)||this._document,l=this._elementInfo.get(i);if(l)return t&&(l.checkChildren=!0),l.subject;let p={checkChildren:t,subject:new P,rootNode:r};return this._elementInfo.set(i,p),this._registerGlobalListeners(p),p.subject}stopMonitoring(e){let t=ke(e),i=this._elementInfo.get(t);i&&(i.subject.complete(),this._setClasses(t),this._elementInfo.delete(t),this._removeGlobalListeners(i))}focusVia(e,t,i){let r=ke(e),l=this._document.activeElement;r===l?this._getClosestElementsInfo(r).forEach(([p,u])=>this._originChanged(p,t,u)):(this._setOrigin(t),typeof r.focus=="function"&&r.focus(i))}ngOnDestroy(){this._elementInfo.forEach((e,t)=>this.stopMonitoring(t))}_getWindow(){return this._document.defaultView||window}_getFocusOrigin(e){return this._origin?this._originFromTouchInteraction?this._shouldBeAttributedToTouch(e)?"touch":"program":this._origin:this._windowFocused&&this._lastFocusOrigin?this._lastFocusOrigin:e&&this._isLastInteractionFromInputLabel(e)?"mouse":"program"}_shouldBeAttributedToTouch(e){return this._detectionMode===Ct.EVENTUAL||!!e?.contains(this._inputModalityDetector._mostRecentTarget)}_setClasses(e,t){e.classList.toggle("cdk-focused",!!t),e.classList.toggle("cdk-touch-focused",t==="touch"),e.classList.toggle("cdk-keyboard-focused",t==="keyboard"),e.classList.toggle("cdk-mouse-focused",t==="mouse"),e.classList.toggle("cdk-program-focused",t==="program")}_setOrigin(e,t=!1){this._ngZone.runOutsideAngular(()=>{if(this._origin=e,this._originFromTouchInteraction=e==="touch"&&t,this._detectionMode===Ct.IMMEDIATE){clearTimeout(this._originTimeoutId);let i=this._originFromTouchInteraction?In:1;this._originTimeoutId=setTimeout(()=>this._origin=null,i)}})}_onFocus(e,t){let i=this._elementInfo.get(t),r=oe(e);!i||!i.checkChildren&&t!==r||this._originChanged(t,this._getFocusOrigin(r),i)}_onBlur(e,t){let i=this._elementInfo.get(t);!i||i.checkChildren&&e.relatedTarget instanceof Node&&t.contains(e.relatedTarget)||(this._setClasses(t),this._emitOrigin(i,null))}_emitOrigin(e,t){e.subject.observers.length&&this._ngZone.run(()=>e.subject.next(t))}_registerGlobalListeners(e){if(!this._platform.isBrowser)return;let t=e.rootNode,i=this._rootNodeFocusListenerCount.get(t)||0;i||this._ngZone.runOutsideAngular(()=>{t.addEventListener("focus",this._rootNodeFocusAndBlurListener,$t),t.addEventListener("blur",this._rootNodeFocusAndBlurListener,$t)}),this._rootNodeFocusListenerCount.set(t,i+1),++this._monitoredElementCount===1&&(this._ngZone.runOutsideAngular(()=>{this._getWindow().addEventListener("focus",this._windowFocusListener)}),this._inputModalityDetector.modalityDetected.pipe(le(this._stopInputModalityDetector)).subscribe(r=>{this._setOrigin(r,!0)}))}_removeGlobalListeners(e){let t=e.rootNode;if(this._rootNodeFocusListenerCount.has(t)){let i=this._rootNodeFocusListenerCount.get(t);i>1?this._rootNodeFocusListenerCount.set(t,i-1):(t.removeEventListener("focus",this._rootNodeFocusAndBlurListener,$t),t.removeEventListener("blur",this._rootNodeFocusAndBlurListener,$t),this._rootNodeFocusListenerCount.delete(t))}--this._monitoredElementCount||(this._getWindow().removeEventListener("focus",this._windowFocusListener),this._stopInputModalityDetector.next(),clearTimeout(this._windowFocusTimeoutId),clearTimeout(this._originTimeoutId))}_originChanged(e,t,i){this._setClasses(e,t),this._emitOrigin(i,t),this._lastFocusOrigin=t}_getClosestElementsInfo(e){let t=[];return this._elementInfo.forEach((i,r)=>{(r===e||i.checkChildren&&r.contains(e))&&t.push([r,i])}),t}_isLastInteractionFromInputLabel(e){let{_mostRecentTarget:t,mostRecentModality:i}=this._inputModalityDetector;if(i!=="mouse"||!t||t===e||e.nodeName!=="INPUT"&&e.nodeName!=="TEXTAREA"||e.disabled)return!1;let r=e.labels;if(r){for(let l=0;l<r.length;l++)if(r[l].contains(t))return!0}return!1}static \u0275fac=function(t){return new(t||n)};static \u0275prov=O({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var Kt=new WeakMap,fe=(()=>{class n{_appRef;_injector=m(ee);_environmentInjector=m(Pe);load(e){let t=this._appRef=this._appRef||this._injector.get(mt),i=Kt.get(t);i||(i={loaders:new Set,refs:[]},Kt.set(t,i),t.onDestroy(()=>{Kt.get(t)?.refs.forEach(r=>r.destroy()),Kt.delete(t)})),i.loaders.has(e)||(i.loaders.add(e),i.refs.push(Vt(e,{environmentInjector:this._environmentInjector})))}static \u0275fac=function(t){return new(t||n)};static \u0275prov=O({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var Qt=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275cmp=D({type:n,selectors:[["ng-component"]],exportAs:["cdkVisuallyHidden"],decls:0,vars:0,template:function(t,i){},styles:[`.cdk-visually-hidden {
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
`],encapsulation:2,changeDetection:0})}return n})();function Oe(n){return Array.isArray(n)?n:[n]}var An=new Set,He,Xt=(()=>{class n{_platform=m(Z);_nonce=m(un,{optional:!0});_matchMedia;constructor(){this._matchMedia=this._platform.isBrowser&&window.matchMedia?window.matchMedia.bind(window):Wo}matchMedia(e){return(this._platform.WEBKIT||this._platform.BLINK)&&Uo(e,this._nonce),this._matchMedia(e)}static \u0275fac=function(t){return new(t||n)};static \u0275prov=O({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();function Uo(n,o){if(!An.has(n))try{He||(He=document.createElement("style"),o&&He.setAttribute("nonce",o),He.setAttribute("type","text/css"),document.head.appendChild(He)),He.sheet&&(He.sheet.insertRule(`@media ${n} {body{ }}`,0),An.add(n))}catch(e){console.error(e)}}function Wo(n){return{matches:n==="all"||n==="",media:n,addListener:()=>{},removeListener:()=>{}}}var Ei=(()=>{class n{_mediaMatcher=m(Xt);_zone=m(V);_queries=new Map;_destroySubject=new P;constructor(){}ngOnDestroy(){this._destroySubject.next(),this._destroySubject.complete()}isMatched(e){return Ln(Oe(e)).some(i=>this._registerQuery(i).mql.matches)}observe(e){let i=Ln(Oe(e)).map(l=>this._registerQuery(l).observable),r=sn(i);return r=ln(r.pipe(Rt(1)),r.pipe(Ft(1),It(0))),r.pipe(Ae(l=>{let p={matches:!1,breakpoints:{}};return l.forEach(({matches:u,query:x})=>{p.matches=p.matches||u,p.breakpoints[x]=u}),p}))}_registerQuery(e){if(this._queries.has(e))return this._queries.get(e);let t=this._mediaMatcher.matchMedia(e),r={observable:new Fe(l=>{let p=u=>this._zone.run(()=>l.next(u));return t.addListener(p),()=>{t.removeListener(p)}}).pipe(be(t),Ae(({matches:l})=>({query:e,matches:l})),le(this._destroySubject)),mql:t};return this._queries.set(e,r),r}static \u0275fac=function(t){return new(t||n)};static \u0275prov=O({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();function Ln(n){return n.map(o=>o.split(",")).reduce((o,e)=>o.concat(e)).map(o=>o.trim())}var qo=200,Zt=class{_letterKeyStream=new P;_items=[];_selectedItemIndex=-1;_pressedLetters=[];_skipPredicateFn;_selectedItem=new P;selectedItem=this._selectedItem;constructor(o,e){let t=typeof e?.debounceInterval=="number"?e.debounceInterval:qo;e?.skipPredicate&&(this._skipPredicateFn=e.skipPredicate),this.setItems(o),this._setupKeyHandler(t)}destroy(){this._pressedLetters=[],this._letterKeyStream.complete(),this._selectedItem.complete()}setCurrentSelectedItemIndex(o){this._selectedItemIndex=o}setItems(o){this._items=o}handleKey(o){let e=o.keyCode;o.key&&o.key.length===1?this._letterKeyStream.next(o.key.toLocaleUpperCase()):(e>=65&&e<=90||e>=48&&e<=57)&&this._letterKeyStream.next(String.fromCharCode(e))}isTyping(){return this._pressedLetters.length>0}reset(){this._pressedLetters=[]}_setupKeyHandler(o){this._letterKeyStream.pipe(me(e=>this._pressedLetters.push(e)),It(o),Me(()=>this._pressedLetters.length>0),Ae(()=>this._pressedLetters.join("").toLocaleUpperCase())).subscribe(e=>{for(let t=1;t<this._items.length+1;t++){let i=(this._selectedItemIndex+t)%this._items.length,r=this._items[i];if(!this._skipPredicateFn?.(r)&&r.getLabel?.().toLocaleUpperCase().trim().indexOf(e)===0){this._selectedItem.next(r);break}}this._pressedLetters=[]})}};function Re(n,...o){return o.length?o.some(e=>n[e]):n.altKey||n.shiftKey||n.ctrlKey||n.metaKey}var et=class{_items;_activeItemIndex=w(-1);_activeItem=w(null);_wrap=!1;_typeaheadSubscription=ve.EMPTY;_itemChangesSubscription;_vertical=!0;_horizontal=null;_allowedModifierKeys=[];_homeAndEnd=!1;_pageUpAndDown={enabled:!1,delta:10};_effectRef;_typeahead;_skipPredicateFn=o=>o.disabled;constructor(o,e){this._items=o,o instanceof lt?this._itemChangesSubscription=o.changes.subscribe(t=>this._itemsChanged(t.toArray())):pt(o)&&(this._effectRef=ce(()=>this._itemsChanged(o()),{injector:e}))}tabOut=new P;change=new P;skipPredicate(o){return this._skipPredicateFn=o,this}withWrap(o=!0){return this._wrap=o,this}withVerticalOrientation(o=!0){return this._vertical=o,this}withHorizontalOrientation(o){return this._horizontal=o,this}withAllowedModifierKeys(o){return this._allowedModifierKeys=o,this}withTypeAhead(o=200){this._typeaheadSubscription.unsubscribe();let e=this._getItemsArray();return this._typeahead=new Zt(e,{debounceInterval:typeof o=="number"?o:void 0,skipPredicate:t=>this._skipPredicateFn(t)}),this._typeaheadSubscription=this._typeahead.selectedItem.subscribe(t=>{this.setActiveItem(t)}),this}cancelTypeahead(){return this._typeahead?.reset(),this}withHomeAndEnd(o=!0){return this._homeAndEnd=o,this}withPageUpDown(o=!0,e=10){return this._pageUpAndDown={enabled:o,delta:e},this}setActiveItem(o){let e=this._activeItem();this.updateActiveItem(o),this._activeItem()!==e&&this.change.next(this._activeItemIndex())}onKeydown(o){let e=o.keyCode,i=["altKey","ctrlKey","metaKey","shiftKey"].every(r=>!o[r]||this._allowedModifierKeys.indexOf(r)>-1);switch(e){case 9:this.tabOut.next();return;case 40:if(this._vertical&&i){this.setNextItemActive();break}else return;case 38:if(this._vertical&&i){this.setPreviousItemActive();break}else return;case 39:if(this._horizontal&&i){this._horizontal==="rtl"?this.setPreviousItemActive():this.setNextItemActive();break}else return;case 37:if(this._horizontal&&i){this._horizontal==="rtl"?this.setNextItemActive():this.setPreviousItemActive();break}else return;case 36:if(this._homeAndEnd&&i){this.setFirstItemActive();break}else return;case 35:if(this._homeAndEnd&&i){this.setLastItemActive();break}else return;case 33:if(this._pageUpAndDown.enabled&&i){let r=this._activeItemIndex()-this._pageUpAndDown.delta;this._setActiveItemByIndex(r>0?r:0,1);break}else return;case 34:if(this._pageUpAndDown.enabled&&i){let r=this._activeItemIndex()+this._pageUpAndDown.delta,l=this._getItemsArray().length;this._setActiveItemByIndex(r<l?r:l-1,-1);break}else return;default:(i||Re(o,"shiftKey"))&&this._typeahead?.handleKey(o);return}this._typeahead?.reset(),o.preventDefault()}get activeItemIndex(){return this._activeItemIndex()}get activeItem(){return this._activeItem()}isTyping(){return!!this._typeahead&&this._typeahead.isTyping()}setFirstItemActive(){this._setActiveItemByIndex(0,1)}setLastItemActive(){this._setActiveItemByIndex(this._getItemsArray().length-1,-1)}setNextItemActive(){this._activeItemIndex()<0?this.setFirstItemActive():this._setActiveItemByDelta(1)}setPreviousItemActive(){this._activeItemIndex()<0&&this._wrap?this.setLastItemActive():this._setActiveItemByDelta(-1)}updateActiveItem(o){let e=this._getItemsArray(),t=typeof o=="number"?o:e.indexOf(o),i=e[t];this._activeItem.set(i??null),this._activeItemIndex.set(t),this._typeahead?.setCurrentSelectedItemIndex(t)}destroy(){this._typeaheadSubscription.unsubscribe(),this._itemChangesSubscription?.unsubscribe(),this._effectRef?.destroy(),this._typeahead?.destroy(),this.tabOut.complete(),this.change.complete()}_setActiveItemByDelta(o){this._wrap?this._setActiveInWrapMode(o):this._setActiveInDefaultMode(o)}_setActiveInWrapMode(o){let e=this._getItemsArray();for(let t=1;t<=e.length;t++){let i=(this._activeItemIndex()+o*t+e.length)%e.length,r=e[i];if(!this._skipPredicateFn(r)){this.setActiveItem(i);return}}}_setActiveInDefaultMode(o){this._setActiveItemByIndex(this._activeItemIndex()+o,o)}_setActiveItemByIndex(o,e){let t=this._getItemsArray();if(t[o]){for(;this._skipPredicateFn(t[o]);)if(o+=e,!t[o])return;this.setActiveItem(o)}}_getItemsArray(){return pt(this._items)?this._items():this._items instanceof lt?this._items.toArray():this._items}_itemsChanged(o){this._typeahead?.setItems(o);let e=this._activeItem();if(e){let t=o.indexOf(e);t>-1&&t!==this._activeItemIndex()&&(this._activeItemIndex.set(t),this._typeahead?.setCurrentSelectedItemIndex(t))}}};var wt=class extends et{setActiveItem(o){this.activeItem&&this.activeItem.setInactiveStyles(),super.setActiveItem(o),this.activeItem&&this.activeItem.setActiveStyles()}};var kt=class extends et{_origin="program";setFocusOrigin(o){return this._origin=o,this}setActiveItem(o){super.setActiveItem(o),this.activeItem&&this.activeItem.focus(this._origin)}};var Pi={},_e=class n{_appId=m(mn);static _infix=`a${Math.floor(Math.random()*1e5).toString()}`;getId(o,e=!1){return this._appId!=="ng"&&(o+=this._appId),Pi.hasOwnProperty(o)||(Pi[o]=0),`${o}${e?n._infix+"-":""}${Pi[o]++}`}static \u0275fac=function(e){return new(e||n)};static \u0275prov=O({token:n,factory:n.\u0275fac,providedIn:"root"})};var Vn=" ";function Di(n,o,e){let t=zn(n,o);e=e.trim(),!t.some(i=>i.trim()===e)&&(t.push(e),n.setAttribute(o,t.join(Vn)))}function Jt(n,o,e){let t=zn(n,o);e=e.trim();let i=t.filter(r=>r!==e);i.length?n.setAttribute(o,i.join(Vn)):n.removeAttribute(o)}function zn(n,o){return n.getAttribute(o)?.match(/\S+/g)??[]}var Ue;function Bn(){if(Ue==null){if(typeof document!="object"||!document||typeof Element!="function"||!Element)return Ue=!1,Ue;if(document.documentElement?.style&&"scrollBehavior"in document.documentElement.style)Ue=!0;else{let n=Element.prototype.scrollTo;n?Ue=!/\{\s*\[native code\]\s*\}/.test(n.toString()):Ue=!1}}return Ue}function Ii(){return typeof __karma__<"u"&&!!__karma__||typeof jasmine<"u"&&!!jasmine||typeof jest<"u"&&!!jest||typeof Mocha<"u"&&!!Mocha}var jn={XSmall:"(max-width: 599.98px)",Small:"(min-width: 600px) and (max-width: 959.98px)",Medium:"(min-width: 960px) and (max-width: 1279.98px)",Large:"(min-width: 1280px) and (max-width: 1919.98px)",XLarge:"(min-width: 1920px)",Handset:"(max-width: 599.98px) and (orientation: portrait), (max-width: 959.98px) and (orientation: landscape)",Tablet:"(min-width: 600px) and (max-width: 839.98px) and (orientation: portrait), (min-width: 960px) and (max-width: 1279.98px) and (orientation: landscape)",Web:"(min-width: 840px) and (orientation: portrait), (min-width: 1280px) and (orientation: landscape)",HandsetPortrait:"(max-width: 599.98px) and (orientation: portrait)",TabletPortrait:"(min-width: 600px) and (max-width: 839.98px) and (orientation: portrait)",WebPortrait:"(min-width: 840px) and (orientation: portrait)",HandsetLandscape:"(max-width: 959.98px) and (orientation: landscape)",TabletLandscape:"(min-width: 960px) and (max-width: 1279.98px) and (orientation: landscape)",WebLandscape:"(min-width: 1280px) and (orientation: landscape)"};var Yo=new R("MATERIAL_ANIMATIONS"),Hn=null;function Go(){return m(Yo,{optional:!0})?.animationsDisabled||m(At,{optional:!0})==="NoopAnimations"?"di-disabled":(Hn??=m(Xt).matchMedia("(prefers-reduced-motion)").matches,Hn?"reduced-motion":"enabled")}function ge(){return Go()!=="enabled"}function K(n){return n==null?"":typeof n=="string"?n:`${n}px`}var pe=(function(n){return n[n.FADING_IN=0]="FADING_IN",n[n.VISIBLE=1]="VISIBLE",n[n.FADING_OUT=2]="FADING_OUT",n[n.HIDDEN=3]="HIDDEN",n})(pe||{}),Ri=class{_renderer;element;config;_animationForciblyDisabledThroughCss;state=pe.HIDDEN;constructor(o,e,t,i=!1){this._renderer=o,this.element=e,this.config=t,this._animationForciblyDisabledThroughCss=i}fadeOut(){this._renderer.fadeOutRipple(this)}},Un=Je({passive:!0,capture:!0}),Fi=class{_events=new Map;addHandler(o,e,t,i){let r=this._events.get(e);if(r){let l=r.get(t);l?l.add(i):r.set(t,new Set([i]))}else this._events.set(e,new Map([[t,new Set([i])]])),o.runOutsideAngular(()=>{document.addEventListener(e,this._delegateEventHandler,Un)})}removeHandler(o,e,t){let i=this._events.get(o);if(!i)return;let r=i.get(e);r&&(r.delete(t),r.size===0&&i.delete(e),i.size===0&&(this._events.delete(o),document.removeEventListener(o,this._delegateEventHandler,Un)))}_delegateEventHandler=o=>{let e=oe(o);e&&this._events.get(o.type)?.forEach((t,i)=>{(i===e||i.contains(e))&&t.forEach(r=>r.handleEvent(o))})}},St={enterDuration:225,exitDuration:150},Ko=800,Wn=Je({passive:!0,capture:!0}),qn=["mousedown","touchstart"],Yn=["mouseup","mouseleave","touchend","touchcancel"],Qo=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275cmp=D({type:n,selectors:[["ng-component"]],hostAttrs:["mat-ripple-style-loader",""],decls:0,vars:0,template:function(t,i){},styles:[`.mat-ripple {
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
`],encapsulation:2,changeDetection:0})}return n})(),Mt=class n{_target;_ngZone;_platform;_containerElement;_triggerElement=null;_isPointerDown=!1;_activeRipples=new Map;_mostRecentTransientRipple=null;_lastTouchStartEvent;_pointerUpEventsRegistered=!1;_containerRect=null;static _eventManager=new Fi;constructor(o,e,t,i,r){this._target=o,this._ngZone=e,this._platform=i,i.isBrowser&&(this._containerElement=ke(t)),r&&r.get(fe).load(Qo)}fadeInRipple(o,e,t={}){let i=this._containerRect=this._containerRect||this._containerElement.getBoundingClientRect(),r=k(k({},St),t.animation);t.centered&&(o=i.left+i.width/2,e=i.top+i.height/2);let l=t.radius||Xo(o,e,i),p=o-i.left,u=e-i.top,x=r.enterDuration,_=document.createElement("div");_.classList.add("mat-ripple-element"),_.style.left=`${p-l}px`,_.style.top=`${u-l}px`,_.style.height=`${l*2}px`,_.style.width=`${l*2}px`,t.color!=null&&(_.style.backgroundColor=t.color),_.style.transitionDuration=`${x}ms`,this._containerElement.appendChild(_);let C=window.getComputedStyle(_),Q=C.transitionProperty,X=C.transitionDuration,J=Q==="none"||X==="0s"||X==="0s, 0s"||i.width===0&&i.height===0,N=new Ri(this,_,t,J);_.style.transform="scale3d(1, 1, 1)",N.state=pe.FADING_IN,t.persistent||(this._mostRecentTransientRipple=N);let Te=null;return!J&&(x||r.exitDuration)&&this._ngZone.runOutsideAngular(()=>{let on=()=>{Te&&(Te.fallbackTimer=null),clearTimeout(rn),this._finishRippleTransition(N)},ui=()=>this._destroyRipple(N),rn=setTimeout(ui,x+100);_.addEventListener("transitionend",on),_.addEventListener("transitioncancel",ui),Te={onTransitionEnd:on,onTransitionCancel:ui,fallbackTimer:rn}}),this._activeRipples.set(N,Te),(J||!x)&&this._finishRippleTransition(N),N}fadeOutRipple(o){if(o.state===pe.FADING_OUT||o.state===pe.HIDDEN)return;let e=o.element,t=k(k({},St),o.config.animation);e.style.transitionDuration=`${t.exitDuration}ms`,e.style.opacity="0",o.state=pe.FADING_OUT,(o._animationForciblyDisabledThroughCss||!t.exitDuration)&&this._finishRippleTransition(o)}fadeOutAll(){this._getActiveRipples().forEach(o=>o.fadeOut())}fadeOutAllNonPersistent(){this._getActiveRipples().forEach(o=>{o.config.persistent||o.fadeOut()})}setupTriggerEvents(o){let e=ke(o);!this._platform.isBrowser||!e||e===this._triggerElement||(this._removeTriggerEvents(),this._triggerElement=e,qn.forEach(t=>{n._eventManager.addHandler(this._ngZone,t,e,this)}))}handleEvent(o){o.type==="mousedown"?this._onMousedown(o):o.type==="touchstart"?this._onTouchStart(o):this._onPointerUp(),this._pointerUpEventsRegistered||(this._ngZone.runOutsideAngular(()=>{Yn.forEach(e=>{this._triggerElement.addEventListener(e,this,Wn)})}),this._pointerUpEventsRegistered=!0)}_finishRippleTransition(o){o.state===pe.FADING_IN?this._startFadeOutTransition(o):o.state===pe.FADING_OUT&&this._destroyRipple(o)}_startFadeOutTransition(o){let e=o===this._mostRecentTransientRipple,{persistent:t}=o.config;o.state=pe.VISIBLE,!t&&(!e||!this._isPointerDown)&&o.fadeOut()}_destroyRipple(o){let e=this._activeRipples.get(o)??null;this._activeRipples.delete(o),this._activeRipples.size||(this._containerRect=null),o===this._mostRecentTransientRipple&&(this._mostRecentTransientRipple=null),o.state=pe.HIDDEN,e!==null&&(o.element.removeEventListener("transitionend",e.onTransitionEnd),o.element.removeEventListener("transitioncancel",e.onTransitionCancel),e.fallbackTimer!==null&&clearTimeout(e.fallbackTimer)),o.element.remove()}_onMousedown(o){let e=bt(o),t=this._lastTouchStartEvent&&Date.now()<this._lastTouchStartEvent+Ko;!this._target.rippleDisabled&&!e&&!t&&(this._isPointerDown=!0,this.fadeInRipple(o.clientX,o.clientY,this._target.rippleConfig))}_onTouchStart(o){if(!this._target.rippleDisabled&&!yt(o)){this._lastTouchStartEvent=Date.now(),this._isPointerDown=!0;let e=o.changedTouches;if(e)for(let t=0;t<e.length;t++)this.fadeInRipple(e[t].clientX,e[t].clientY,this._target.rippleConfig)}}_onPointerUp(){this._isPointerDown&&(this._isPointerDown=!1,this._getActiveRipples().forEach(o=>{let e=o.state===pe.VISIBLE||o.config.terminateOnPointerUp&&o.state===pe.FADING_IN;!o.config.persistent&&e&&o.fadeOut()}))}_getActiveRipples(){return Array.from(this._activeRipples.keys())}_removeTriggerEvents(){let o=this._triggerElement;o&&(qn.forEach(e=>n._eventManager.removeHandler(e,o,this)),this._pointerUpEventsRegistered&&(Yn.forEach(e=>o.removeEventListener(e,this,Wn)),this._pointerUpEventsRegistered=!1))}};function Xo(n,o,e){let t=Math.max(Math.abs(n-e.left),Math.abs(n-e.right)),i=Math.max(Math.abs(o-e.top),Math.abs(o-e.bottom));return Math.sqrt(t*t+i*i)}var Et=new R("mat-ripple-global-options"),Gn=(()=>{class n{_elementRef=m(q);_animationsDisabled=ge();color;unbounded=!1;centered=!1;radius=0;animation;get disabled(){return this._disabled}set disabled(e){e&&this.fadeOutAllNonPersistent(),this._disabled=e,this._setupTriggerEventsIfEnabled()}_disabled=!1;get trigger(){return this._trigger||this._elementRef.nativeElement}set trigger(e){this._trigger=e,this._setupTriggerEventsIfEnabled()}_trigger;_rippleRenderer;_globalOptions;_isInitialized=!1;constructor(){let e=m(V),t=m(Z),i=m(Et,{optional:!0}),r=m(ee);this._globalOptions=i||{},this._rippleRenderer=new Mt(this,e,this._elementRef,t,r)}ngOnInit(){this._isInitialized=!0,this._setupTriggerEventsIfEnabled()}ngOnDestroy(){this._rippleRenderer._removeTriggerEvents()}fadeOutAll(){this._rippleRenderer.fadeOutAll()}fadeOutAllNonPersistent(){this._rippleRenderer.fadeOutAllNonPersistent()}get rippleConfig(){return{centered:this.centered,radius:this.radius,color:this.color,animation:k(k(k({},this._globalOptions.animation),this._animationsDisabled?{enterDuration:0,exitDuration:0}:{}),this.animation),terminateOnPointerUp:this._globalOptions.terminateOnPointerUp}}get rippleDisabled(){return this.disabled||!!this._globalOptions.disabled}_setupTriggerEventsIfEnabled(){!this.disabled&&this._isInitialized&&this._rippleRenderer.setupTriggerEvents(this.trigger)}launch(e,t=0,i){return typeof e=="number"?this._rippleRenderer.fadeInRipple(e,t,k(k({},this.rippleConfig),i)):this._rippleRenderer.fadeInRipple(0,0,k(k({},this.rippleConfig),e))}static \u0275fac=function(t){return new(t||n)};static \u0275dir=de({type:n,selectors:[["","mat-ripple",""],["","matRipple",""]],hostAttrs:[1,"mat-ripple"],hostVars:2,hostBindings:function(t,i){t&2&&S("mat-ripple-unbounded",i.unbounded)},inputs:{color:[0,"matRippleColor","color"],unbounded:[0,"matRippleUnbounded","unbounded"],centered:[0,"matRippleCentered","centered"],radius:[0,"matRippleRadius","radius"],animation:[0,"matRippleAnimation","animation"],disabled:[0,"matRippleDisabled","disabled"],trigger:[0,"matRippleTrigger","trigger"]},exportAs:["matRipple"]})}return n})();var $n=(()=>{class n{_animationsDisabled=ge();state="unchecked";disabled=!1;appearance="full";constructor(){}static \u0275fac=function(t){return new(t||n)};static \u0275cmp=D({type:n,selectors:[["mat-pseudo-checkbox"]],hostAttrs:[1,"mat-pseudo-checkbox"],hostVars:12,hostBindings:function(t,i){t&2&&S("mat-pseudo-checkbox-indeterminate",i.state==="indeterminate")("mat-pseudo-checkbox-checked",i.state==="checked")("mat-pseudo-checkbox-disabled",i.disabled)("mat-pseudo-checkbox-minimal",i.appearance==="minimal")("mat-pseudo-checkbox-full",i.appearance==="full")("_mat-animation-noopable",i._animationsDisabled)},inputs:{state:"state",disabled:"disabled",appearance:"appearance"},decls:0,vars:0,template:function(t,i){},styles:[`.mat-pseudo-checkbox {
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
`],encapsulation:2,changeDetection:0})}return n})();var Ot=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275cmp=D({type:n,selectors:[["structural-styles"]],decls:0,vars:0,template:function(t,i){},styles:[`.mat-focus-indicator {
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
`],encapsulation:2,changeDetection:0})}return n})();var Zo=["text"],Jo=[[["mat-icon"]],"*"],er=["mat-icon","*"];function tr(n,o){if(n&1&&T(0,"mat-pseudo-checkbox",1),n&2){let e=h();M("disabled",e.disabled)("state",e.selected?"checked":"unchecked")}}function ir(n,o){if(n&1&&T(0,"mat-pseudo-checkbox",3),n&2){let e=h();M("disabled",e.disabled)}}function nr(n,o){if(n&1&&(a(0,"span",4),c(1),s()),n&2){let e=h();d(),j("(",e.group.label,")")}}var Ai=new R("MAT_OPTION_PARENT_COMPONENT"),Li=new R("MatOptgroup");var Tt=class{source;isUserInput;constructor(o,e=!1){this.source=o,this.isUserInput=e}},it=(()=>{class n{_element=m(q);_changeDetectorRef=m(we);_parent=m(Ai,{optional:!0});group=m(Li,{optional:!0});_signalDisableRipple=!1;_selected=!1;_active=!1;_mostRecentViewValue="";get multiple(){return this._parent&&this._parent.multiple}get selected(){return this._selected}value;id=m(_e).getId("mat-option-");get disabled(){return this.group&&this.group.disabled||this._disabled()}set disabled(e){this._disabled.set(e)}_disabled=w(!1);get disableRipple(){return this._signalDisableRipple?this._parent.disableRipple():!!this._parent?.disableRipple}get hideSingleSelectionIndicator(){return!!(this._parent&&this._parent.hideSingleSelectionIndicator)}onSelectionChange=new U;_text;_stateChanges=new P;constructor(){let e=m(fe);e.load(Ot),e.load(Qt),this._signalDisableRipple=!!this._parent&&pt(this._parent.disableRipple)}get active(){return this._active}get viewValue(){return(this._text?.nativeElement.textContent||"").trim()}select(e=!0){this._selected||(this._selected=!0,this._changeDetectorRef.markForCheck(),e&&this._emitSelectionChangeEvent())}deselect(e=!0){this._selected&&(this._selected=!1,this._changeDetectorRef.markForCheck(),e&&this._emitSelectionChangeEvent())}focus(e,t){let i=this._getHostElement();typeof i.focus=="function"&&i.focus(t)}setActiveStyles(){this._active||(this._active=!0,this._changeDetectorRef.markForCheck())}setInactiveStyles(){this._active&&(this._active=!1,this._changeDetectorRef.markForCheck())}getLabel(){return this.viewValue}_handleKeydown(e){(e.keyCode===13||e.keyCode===32)&&!Re(e)&&(this._selectViaInteraction(),e.preventDefault())}_selectViaInteraction(){this.disabled||(this._selected=this.multiple?!this._selected:!0,this._changeDetectorRef.markForCheck(),this._emitSelectionChangeEvent(!0))}_getTabIndex(){return this.disabled?"-1":"0"}_getHostElement(){return this._element.nativeElement}ngAfterViewChecked(){if(this._selected){let e=this.viewValue;e!==this._mostRecentViewValue&&(this._mostRecentViewValue&&this._stateChanges.next(),this._mostRecentViewValue=e)}}ngOnDestroy(){this._stateChanges.complete()}_emitSelectionChangeEvent(e=!1){this.onSelectionChange.emit(new Tt(this,e))}static \u0275fac=function(t){return new(t||n)};static \u0275cmp=D({type:n,selectors:[["mat-option"]],viewQuery:function(t,i){if(t&1&&Ee(Zo,7),t&2){let r;z(r=B())&&(i._text=r.first)}},hostAttrs:["role","option",1,"mat-mdc-option","mdc-list-item"],hostVars:11,hostBindings:function(t,i){t&1&&f("click",function(){return i._selectViaInteraction()})("keydown",function(l){return i._handleKeydown(l)}),t&2&&(De("id",i.id),re("aria-selected",i.selected)("aria-disabled",i.disabled.toString()),S("mdc-list-item--selected",i.selected)("mat-mdc-option-multiple",i.multiple)("mat-mdc-option-active",i.active)("mdc-list-item--disabled",i.disabled))},inputs:{value:"value",id:"id",disabled:[2,"disabled","disabled",L]},outputs:{onSelectionChange:"onSelectionChange"},exportAs:["matOption"],ngContentSelectors:er,decls:8,vars:5,consts:[["text",""],["aria-hidden","true",1,"mat-mdc-option-pseudo-checkbox",3,"disabled","state"],[1,"mdc-list-item__primary-text"],["state","checked","aria-hidden","true","appearance","minimal",1,"mat-mdc-option-pseudo-checkbox",3,"disabled"],[1,"cdk-visually-hidden"],["aria-hidden","true","mat-ripple","",1,"mat-mdc-option-ripple","mat-focus-indicator",3,"matRippleTrigger","matRippleDisabled"]],template:function(t,i){t&1&&(ue(Jo),b(0,tr,1,2,"mat-pseudo-checkbox",1),ne(1),a(2,"span",2,0),ne(4,1),s(),b(5,ir,1,1,"mat-pseudo-checkbox",3),b(6,nr,2,1,"span",4),T(7,"div",5)),t&2&&(y(i.multiple?0:-1),d(5),y(!i.multiple&&i.selected&&!i.hideSingleSelectionIndicator?5:-1),d(),y(i.group&&i.group._inert?6:-1),d(),M("matRippleTrigger",i._getHostElement())("matRippleDisabled",i.disabled||i.disableRipple))},dependencies:[$n,Gn],styles:[`.mat-mdc-option {
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
`],encapsulation:2,changeDetection:0})}return n})();function Qn(n,o,e){if(e.length){let t=o.toArray(),i=e.toArray(),r=0;for(let l=0;l<n+1;l++)t[l].group&&t[l].group===i[r]&&r++;return r}return 0}function Xn(n,o,e,t){return n<e?n:n+o>e+t?Math.max(0,n-t+o):e}var or=new R("cdk-dir-doc",{providedIn:"root",factory:()=>m(te)}),rr=/^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Adlm|Arab|Hebr|Nkoo|Rohg|Thaa))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)/i;function Zn(n){let o=n?.toLowerCase()||"";return o==="auto"&&typeof navigator<"u"&&navigator?.language?rr.test(navigator.language)?"rtl":"ltr":o==="rtl"?"rtl":"ltr"}var We=(()=>{class n{get value(){return this.valueSignal()}valueSignal=w("ltr");change=new U;constructor(){let e=m(or,{optional:!0});if(e){let t=e.body?e.body.dir:null,i=e.documentElement?e.documentElement.dir:null;this.valueSignal.set(Zn(t||i||"ltr"))}}ngOnDestroy(){this.change.complete()}static \u0275fac=function(t){return new(t||n)};static \u0275prov=O({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var ie=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275mod=Y({type:n});static \u0275inj=W({})}return n})();var ar=20,Ni=(()=>{class n{_ngZone=m(V);_platform=m(Z);_renderer=m(he).createRenderer(null,null);_cleanupGlobalListener;constructor(){}_scrolled=new P;_scrolledCount=0;scrollContainers=new Map;register(e){this.scrollContainers.has(e)||this.scrollContainers.set(e,e.elementScrolled().subscribe(()=>this._scrolled.next(e)))}deregister(e){let t=this.scrollContainers.get(e);t&&(t.unsubscribe(),this.scrollContainers.delete(e))}scrolled(e=ar){return this._platform.isBrowser?new Fe(t=>{this._cleanupGlobalListener||(this._cleanupGlobalListener=this._ngZone.runOutsideAngular(()=>this._renderer.listen("document","scroll",()=>this._scrolled.next())));let i=e>0?this._scrolled.pipe(fi(e)).subscribe(t):this._scrolled.subscribe(t);return this._scrolledCount++,()=>{i.unsubscribe(),this._scrolledCount--,this._scrolledCount||(this._cleanupGlobalListener?.(),this._cleanupGlobalListener=void 0)}}):Se()}ngOnDestroy(){this._cleanupGlobalListener?.(),this._cleanupGlobalListener=void 0,this.scrollContainers.forEach((e,t)=>this.deregister(t)),this._scrolled.complete()}ancestorScrolled(e,t){let i=this.getAncestorScrollContainers(e);return this.scrolled(t).pipe(Me(r=>!r||i.indexOf(r)>-1))}getAncestorScrollContainers(e){let t=[];return this.scrollContainers.forEach((i,r)=>{this._scrollableContainsElement(r,e)&&t.push(r)}),t}_scrollableContainsElement(e,t){let i=ke(t),r=e.getElementRef().nativeElement;do if(i==r)return!0;while(i=i.parentElement);return!1}static \u0275fac=function(t){return new(t||n)};static \u0275prov=O({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var sr=20,qe=(()=>{class n{_platform=m(Z);_listeners;_viewportSize=null;_change=new P;_document=m(te);constructor(){let e=m(V),t=m(he).createRenderer(null,null);e.runOutsideAngular(()=>{if(this._platform.isBrowser){let i=r=>this._change.next(r);this._listeners=[t.listen("window","resize",i),t.listen("window","orientationchange",i)]}this.change().subscribe(()=>this._viewportSize=null)})}ngOnDestroy(){this._listeners?.forEach(e=>e()),this._change.complete()}getViewportSize(){this._viewportSize||this._updateViewportSize();let e={width:this._viewportSize.width,height:this._viewportSize.height};return this._platform.isBrowser||(this._viewportSize=null),e}getViewportRect(){let e=this.getViewportScrollPosition(),{width:t,height:i}=this.getViewportSize();return{top:e.top,left:e.left,bottom:e.top+i,right:e.left+t,height:i,width:t}}getViewportScrollPosition(){if(!this._platform.isBrowser)return{top:0,left:0};let e=this._document,t=this._getWindow(),i=e.documentElement,r=i.getBoundingClientRect(),l=-r.top||e.body?.scrollTop||t.scrollY||i.scrollTop||0,p=-r.left||e.body?.scrollLeft||t.scrollX||i.scrollLeft||0;return{top:l,left:p}}change(e=sr){return e>0?this._change.pipe(fi(e)):this._change}_getWindow(){return this._document.defaultView||window}_updateViewportSize(){let e=this._getWindow();this._viewportSize=this._platform.isBrowser?{width:e.innerWidth,height:e.innerHeight}:{width:0,height:0}}static \u0275fac=function(t){return new(t||n)};static \u0275prov=O({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var ei=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275mod=Y({type:n});static \u0275inj=W({})}return n})(),Vi=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275mod=Y({type:n});static \u0275inj=W({imports:[ie,ei,ie,ei]})}return n})();var Pt=class{_attachedHost=null;attach(o){return this._attachedHost=o,o.attach(this)}detach(){let o=this._attachedHost;o!=null&&(this._attachedHost=null,o.detach())}get isAttached(){return this._attachedHost!=null}setAttachedHost(o){this._attachedHost=o}},zi=class extends Pt{component;viewContainerRef;injector;projectableNodes;bindings;constructor(o,e,t,i,r){super(),this.component=o,this.viewContainerRef=e,this.injector=t,this.projectableNodes=i,this.bindings=r||null}},nt=class extends Pt{templateRef;viewContainerRef;context;injector;constructor(o,e,t,i){super(),this.templateRef=o,this.viewContainerRef=e,this.context=t,this.injector=i}get origin(){return this.templateRef.elementRef}attach(o,e=this.context){return this.context=e,super.attach(o)}detach(){return this.context=void 0,super.detach()}},Bi=class extends Pt{element;constructor(o){super(),this.element=o instanceof q?o.nativeElement:o}},ji=class{_attachedPortal=null;_disposeFn=null;_isDisposed=!1;hasAttached(){return!!this._attachedPortal}attach(o){if(o instanceof zi)return this._attachedPortal=o,this.attachComponentPortal(o);if(o instanceof nt)return this._attachedPortal=o,this.attachTemplatePortal(o);if(this.attachDomPortal&&o instanceof Bi)return this._attachedPortal=o,this.attachDomPortal(o)}attachDomPortal=null;detach(){this._attachedPortal&&(this._attachedPortal.setAttachedHost(null),this._attachedPortal=null),this._invokeDisposeFn()}dispose(){this.hasAttached()&&this.detach(),this._invokeDisposeFn(),this._isDisposed=!0}setDisposeFn(o){this._disposeFn=o}_invokeDisposeFn(){this._disposeFn&&(this._disposeFn(),this._disposeFn=null)}},ti=class extends ji{outletElement;_appRef;_defaultInjector;constructor(o,e,t){super(),this.outletElement=o,this._appRef=e,this._defaultInjector=t}attachComponentPortal(o){let e;if(o.viewContainerRef){let t=o.injector||o.viewContainerRef.injector,i=t.get(fn,null,{optional:!0})||void 0;e=o.viewContainerRef.createComponent(o.component,{index:o.viewContainerRef.length,injector:t,ngModuleRef:i,projectableNodes:o.projectableNodes||void 0,bindings:o.bindings||void 0}),this.setDisposeFn(()=>e.destroy())}else{let t=this._appRef,i=o.injector||this._defaultInjector||ee.NULL,r=i.get(Pe,t.injector);e=Vt(o.component,{elementInjector:i,environmentInjector:r,projectableNodes:o.projectableNodes||void 0,bindings:o.bindings||void 0}),t.attachView(e.hostView),this.setDisposeFn(()=>{t.viewCount>0&&t.detachView(e.hostView),e.destroy()})}return this.outletElement.appendChild(this._getComponentRootNode(e)),this._attachedPortal=o,e}attachTemplatePortal(o){let e=o.viewContainerRef,t=e.createEmbeddedView(o.templateRef,o.context,{injector:o.injector});return t.rootNodes.forEach(i=>this.outletElement.appendChild(i)),t.detectChanges(),this.setDisposeFn(()=>{let i=e.indexOf(t);i!==-1&&e.remove(i)}),this._attachedPortal=o,t}attachDomPortal=o=>{let e=o.element;e.parentNode;let t=this.outletElement.ownerDocument.createComment("dom-portal");e.parentNode.insertBefore(t,e),this.outletElement.appendChild(e),this._attachedPortal=o,super.setDisposeFn(()=>{t.parentNode&&t.parentNode.replaceChild(e,t)})};dispose(){super.dispose(),this.outletElement.remove()}_getComponentRootNode(o){return o.hostView.rootNodes[0]}};var Jn=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275mod=Y({type:n});static \u0275inj=W({})}return n})();var eo=Bn();function so(n){return new ii(n.get(qe),n.get(te))}var ii=class{_viewportRuler;_previousHTMLStyles={top:"",left:""};_previousScrollPosition;_isEnabled=!1;_document;constructor(o,e){this._viewportRuler=o,this._document=e}attach(){}enable(){if(this._canBeEnabled()){let o=this._document.documentElement;this._previousScrollPosition=this._viewportRuler.getViewportScrollPosition(),this._previousHTMLStyles.left=o.style.left||"",this._previousHTMLStyles.top=o.style.top||"",o.style.left=K(-this._previousScrollPosition.left),o.style.top=K(-this._previousScrollPosition.top),o.classList.add("cdk-global-scrollblock"),this._isEnabled=!0}}disable(){if(this._isEnabled){let o=this._document.documentElement,e=this._document.body,t=o.style,i=e.style,r=t.scrollBehavior||"",l=i.scrollBehavior||"";this._isEnabled=!1,t.left=this._previousHTMLStyles.left,t.top=this._previousHTMLStyles.top,o.classList.remove("cdk-global-scrollblock"),eo&&(t.scrollBehavior=i.scrollBehavior="auto"),window.scroll(this._previousScrollPosition.left,this._previousScrollPosition.top),eo&&(t.scrollBehavior=r,i.scrollBehavior=l)}}_canBeEnabled(){if(this._document.documentElement.classList.contains("cdk-global-scrollblock")||this._isEnabled)return!1;let e=this._document.documentElement,t=this._viewportRuler.getViewportSize();return e.scrollHeight>t.height||e.scrollWidth>t.width}};function lo(n,o){return new ni(n.get(Ni),n.get(V),n.get(qe),o)}var ni=class{_scrollDispatcher;_ngZone;_viewportRuler;_config;_scrollSubscription=null;_overlayRef;_initialScrollPosition;constructor(o,e,t,i){this._scrollDispatcher=o,this._ngZone=e,this._viewportRuler=t,this._config=i}attach(o){this._overlayRef,this._overlayRef=o}enable(){if(this._scrollSubscription)return;let o=this._scrollDispatcher.scrolled(0).pipe(Me(e=>!e||!this._overlayRef.overlayElement.contains(e.getElementRef().nativeElement)));this._config&&this._config.threshold&&this._config.threshold>1?(this._initialScrollPosition=this._viewportRuler.getViewportScrollPosition().top,this._scrollSubscription=o.subscribe(()=>{let e=this._viewportRuler.getViewportScrollPosition().top;Math.abs(e-this._initialScrollPosition)>this._config.threshold?this._detach():this._overlayRef.updatePosition()})):this._scrollSubscription=o.subscribe(this._detach)}disable(){this._scrollSubscription&&(this._scrollSubscription.unsubscribe(),this._scrollSubscription=null)}detach(){this.disable(),this._overlayRef=null}_detach=()=>{this.disable(),this._overlayRef.hasAttached()&&this._ngZone.run(()=>this._overlayRef.detach())}};var Dt=class{enable(){}disable(){}attach(){}};function Hi(n,o){return o.some(e=>{let t=n.bottom<e.top,i=n.top>e.bottom,r=n.right<e.left,l=n.left>e.right;return t||i||r||l})}function to(n,o){return o.some(e=>{let t=n.top<e.top,i=n.bottom>e.bottom,r=n.left<e.left,l=n.right>e.right;return t||i||r||l})}function ci(n,o){return new oi(n.get(Ni),n.get(qe),n.get(V),o)}var oi=class{_scrollDispatcher;_viewportRuler;_ngZone;_config;_scrollSubscription=null;_overlayRef;constructor(o,e,t,i){this._scrollDispatcher=o,this._viewportRuler=e,this._ngZone=t,this._config=i}attach(o){this._overlayRef,this._overlayRef=o}enable(){if(!this._scrollSubscription){let o=this._config?this._config.scrollThrottle:0;this._scrollSubscription=this._scrollDispatcher.scrolled(o).subscribe(()=>{if(this._overlayRef.updatePosition(),this._config&&this._config.autoClose){let e=this._overlayRef.overlayElement.getBoundingClientRect(),{width:t,height:i}=this._viewportRuler.getViewportSize();Hi(e,[{width:t,height:i,bottom:i,right:t,top:0,left:0}])&&(this.disable(),this._ngZone.run(()=>this._overlayRef.detach()))}})}}disable(){this._scrollSubscription&&(this._scrollSubscription.unsubscribe(),this._scrollSubscription=null)}detach(){this.disable(),this._overlayRef=null}},co=(()=>{class n{_injector=m(ee);constructor(){}noop=()=>new Dt;close=e=>lo(this._injector,e);block=()=>so(this._injector);reposition=e=>ci(this._injector,e);static \u0275fac=function(t){return new(t||n)};static \u0275prov=O({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),ot=class{positionStrategy;scrollStrategy=new Dt;panelClass="";hasBackdrop=!1;backdropClass="cdk-overlay-dark-backdrop";disableAnimations;width;height;minWidth;minHeight;maxWidth;maxHeight;direction;disposeOnNavigation=!1;usePopover;eventPredicate;constructor(o){if(o){let e=Object.keys(o);for(let t of e)o[t]!==void 0&&(this[t]=o[t])}}};var ri=class{connectionPair;scrollableViewProperties;constructor(o,e){this.connectionPair=o,this.scrollableViewProperties=e}};var po=(()=>{class n{_attachedOverlays=[];_document=m(te);_isAttached=!1;constructor(){}ngOnDestroy(){this.detach()}add(e){this.remove(e),this._attachedOverlays.push(e)}remove(e){let t=this._attachedOverlays.indexOf(e);t>-1&&this._attachedOverlays.splice(t,1),this._attachedOverlays.length===0&&this.detach()}canReceiveEvent(e,t,i){return i.observers.length<1?!1:e.eventPredicate?e.eventPredicate(t):!0}static \u0275fac=function(t){return new(t||n)};static \u0275prov=O({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),mo=(()=>{class n extends po{_ngZone=m(V);_renderer=m(he).createRenderer(null,null);_cleanupKeydown;add(e){super.add(e),this._isAttached||(this._ngZone.runOutsideAngular(()=>{this._cleanupKeydown=this._renderer.listen("body","keydown",this._keydownListener)}),this._isAttached=!0)}detach(){this._isAttached&&(this._cleanupKeydown?.(),this._isAttached=!1)}_keydownListener=e=>{let t=this._attachedOverlays;for(let i=t.length-1;i>-1;i--){let r=t[i];if(this.canReceiveEvent(r,e,r._keydownEvents)){this._ngZone.run(()=>r._keydownEvents.next(e));break}}};static \u0275fac=(()=>{let e;return function(i){return(e||(e=Ve(n)))(i||n)}})();static \u0275prov=O({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),ho=(()=>{class n extends po{_platform=m(Z);_ngZone=m(V);_renderer=m(he).createRenderer(null,null);_cursorOriginalValue;_cursorStyleIsSet=!1;_pointerDownEventTarget=null;_cleanups;add(e){if(super.add(e),!this._isAttached){let t=this._document.body,i={capture:!0},r=this._renderer;this._cleanups=this._ngZone.runOutsideAngular(()=>[r.listen(t,"pointerdown",this._pointerDownListener,i),r.listen(t,"click",this._clickListener,i),r.listen(t,"auxclick",this._clickListener,i),r.listen(t,"contextmenu",this._clickListener,i)]),this._platform.IOS&&!this._cursorStyleIsSet&&(this._cursorOriginalValue=t.style.cursor,t.style.cursor="pointer",this._cursorStyleIsSet=!0),this._isAttached=!0}}detach(){this._isAttached&&(this._cleanups?.forEach(e=>e()),this._cleanups=void 0,this._platform.IOS&&this._cursorStyleIsSet&&(this._document.body.style.cursor=this._cursorOriginalValue,this._cursorStyleIsSet=!1),this._isAttached=!1)}_pointerDownListener=e=>{this._pointerDownEventTarget=oe(e)};_clickListener=e=>{let t=oe(e),i=e.type==="click"&&this._pointerDownEventTarget?this._pointerDownEventTarget:t;this._pointerDownEventTarget=null;let r=this._attachedOverlays.slice();for(let l=r.length-1;l>-1;l--){let p=r[l],u=p._outsidePointerEvents;if(!(!p.hasAttached()||!this.canReceiveEvent(p,e,u))){if(io(p.overlayElement,t)||io(p.overlayElement,i))break;this._ngZone?this._ngZone.run(()=>u.next(e)):u.next(e)}}};static \u0275fac=(()=>{let e;return function(i){return(e||(e=Ve(n)))(i||n)}})();static \u0275prov=O({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();function io(n,o){let e=typeof ShadowRoot<"u"&&ShadowRoot,t=o;for(;t;){if(t===n)return!0;t=e&&t instanceof ShadowRoot?t.host:t.parentNode}return!1}var uo=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275cmp=D({type:n,selectors:[["ng-component"]],hostAttrs:["cdk-overlay-style-loader",""],decls:0,vars:0,template:function(t,i){},styles:[`.cdk-overlay-container, .cdk-global-overlay-wrapper {
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
`],encapsulation:2,changeDetection:0})}return n})(),fo=(()=>{class n{_platform=m(Z);_containerElement;_document=m(te);_styleLoader=m(fe);constructor(){}ngOnDestroy(){this._containerElement?.remove()}getContainerElement(){return this._loadStyles(),this._containerElement||this._createContainer(),this._containerElement}_createContainer(){let e="cdk-overlay-container";if(this._platform.isBrowser||Ii()){let i=this._document.querySelectorAll(`.${e}[platform="server"], .${e}[platform="test"]`);for(let r=0;r<i.length;r++)i[r].remove()}let t=this._document.createElement("div");t.classList.add(e),Ii()?t.setAttribute("platform","test"):this._platform.isBrowser||t.setAttribute("platform","server"),this._document.body.appendChild(t),this._containerElement=t}_loadStyles(){this._styleLoader.load(uo)}static \u0275fac=function(t){return new(t||n)};static \u0275prov=O({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),Ui=class{_renderer;_ngZone;element;_cleanupClick;_cleanupTransitionEnd;_fallbackTimeout;constructor(o,e,t,i){this._renderer=e,this._ngZone=t,this.element=o.createElement("div"),this.element.classList.add("cdk-overlay-backdrop"),this._cleanupClick=e.listen(this.element,"click",i)}detach(){this._ngZone.runOutsideAngular(()=>{let o=this.element;clearTimeout(this._fallbackTimeout),this._cleanupTransitionEnd?.(),this._cleanupTransitionEnd=this._renderer.listen(o,"transitionend",this.dispose),this._fallbackTimeout=setTimeout(this.dispose,500),o.style.pointerEvents="none",o.classList.remove("cdk-overlay-backdrop-showing")})}dispose=()=>{clearTimeout(this._fallbackTimeout),this._cleanupClick?.(),this._cleanupTransitionEnd?.(),this._cleanupClick=this._cleanupTransitionEnd=this._fallbackTimeout=void 0,this.element.remove()}};function Wi(n){return n&&n.nodeType===1}var ai=class{_portalOutlet;_host;_pane;_config;_ngZone;_keyboardDispatcher;_document;_location;_outsideClickDispatcher;_animationsDisabled;_injector;_renderer;_backdropClick=new P;_attachments=new P;_detachments=new P;_positionStrategy;_scrollStrategy;_locationChanges=ve.EMPTY;_backdropRef=null;_detachContentMutationObserver;_detachContentAfterRenderRef;_disposed=!1;_previousHostParent;_keydownEvents=new P;_outsidePointerEvents=new P;_afterNextRenderRef;constructor(o,e,t,i,r,l,p,u,x,_=!1,C,Q){this._portalOutlet=o,this._host=e,this._pane=t,this._config=i,this._ngZone=r,this._keyboardDispatcher=l,this._document=p,this._location=u,this._outsideClickDispatcher=x,this._animationsDisabled=_,this._injector=C,this._renderer=Q,i.scrollStrategy&&(this._scrollStrategy=i.scrollStrategy,this._scrollStrategy.attach(this)),this._positionStrategy=i.positionStrategy}get overlayElement(){return this._pane}get backdropElement(){return this._backdropRef?.element||null}get hostElement(){return this._host}get eventPredicate(){return this._config?.eventPredicate||null}attach(o){if(this._disposed)return null;this._attachHost();let e=this._portalOutlet.attach(o);return this._positionStrategy?.attach(this),this._updateStackingOrder(),this._updateElementSize(),this._updateElementDirection(),this._scrollStrategy&&this._scrollStrategy.enable(),this._afterNextRenderRef?.destroy(),this._afterNextRenderRef=ze(()=>{this.hasAttached()&&this.updatePosition()},{injector:this._injector}),this._togglePointerEvents(!0),this._config.hasBackdrop&&this._attachBackdrop(),this._config.panelClass&&this._toggleClasses(this._pane,this._config.panelClass,!0),this._attachments.next(),this._completeDetachContent(),this._keyboardDispatcher.add(this),this._config.disposeOnNavigation&&(this._locationChanges=this._location.subscribe(()=>this.dispose())),this._outsideClickDispatcher.add(this),typeof e?.onDestroy=="function"&&e.onDestroy(()=>{this.hasAttached()&&this._ngZone.runOutsideAngular(()=>Promise.resolve().then(()=>this.detach()))}),e}detach(){if(!this.hasAttached())return;this.detachBackdrop(),this._togglePointerEvents(!1),this._positionStrategy&&this._positionStrategy.detach&&this._positionStrategy.detach(),this._scrollStrategy&&this._scrollStrategy.disable();let o=this._portalOutlet.detach();return this._detachments.next(),this._completeDetachContent(),this._keyboardDispatcher.remove(this),this._detachContentWhenEmpty(),this._locationChanges.unsubscribe(),this._outsideClickDispatcher.remove(this),o}dispose(){if(this._disposed)return;let o=this.hasAttached();this._positionStrategy&&this._positionStrategy.dispose(),this._disposeScrollStrategy(),this._backdropRef?.dispose(),this._locationChanges.unsubscribe(),this._keyboardDispatcher.remove(this),this._portalOutlet.dispose(),this._attachments.complete(),this._backdropClick.complete(),this._keydownEvents.complete(),this._outsidePointerEvents.complete(),this._outsideClickDispatcher.remove(this),this._host?.remove(),this._afterNextRenderRef?.destroy(),this._previousHostParent=this._pane=this._host=this._backdropRef=null,o&&this._detachments.next(),this._detachments.complete(),this._completeDetachContent(),this._disposed=!0}hasAttached(){return this._portalOutlet.hasAttached()}backdropClick(){return this._backdropClick}attachments(){return this._attachments}detachments(){return this._detachments}keydownEvents(){return this._keydownEvents}outsidePointerEvents(){return this._outsidePointerEvents}getConfig(){return this._config}updatePosition(){this._positionStrategy&&this._positionStrategy.apply()}updatePositionStrategy(o){o!==this._positionStrategy&&(this._positionStrategy&&this._positionStrategy.dispose(),this._positionStrategy=o,this.hasAttached()&&(o.attach(this),this.updatePosition()))}updateSize(o){this._config=k(k({},this._config),o),this._updateElementSize()}setDirection(o){this._config=H(k({},this._config),{direction:o}),this._updateElementDirection()}addPanelClass(o){this._pane&&this._toggleClasses(this._pane,o,!0)}removePanelClass(o){this._pane&&this._toggleClasses(this._pane,o,!1)}getDirection(){let o=this._config.direction;return o?typeof o=="string"?o:o.value:"ltr"}updateScrollStrategy(o){o!==this._scrollStrategy&&(this._disposeScrollStrategy(),this._scrollStrategy=o,this.hasAttached()&&(o.attach(this),o.enable()))}_updateElementDirection(){this._host.setAttribute("dir",this.getDirection())}_updateElementSize(){if(!this._pane)return;let o=this._pane.style;o.width=K(this._config.width),o.height=K(this._config.height),o.minWidth=K(this._config.minWidth),o.minHeight=K(this._config.minHeight),o.maxWidth=K(this._config.maxWidth),o.maxHeight=K(this._config.maxHeight)}_togglePointerEvents(o){this._pane.style.pointerEvents=o?"":"none"}_attachHost(){if(!this._host.parentElement){let o=this._config.usePopover?this._positionStrategy?.getPopoverInsertionPoint?.():null;Wi(o)?o.after(this._host):o?.type==="parent"?o.element.appendChild(this._host):this._previousHostParent?.appendChild(this._host)}if(this._config.usePopover)try{this._host.showPopover()}catch(o){}}_attachBackdrop(){let o="cdk-overlay-backdrop-showing";this._backdropRef?.dispose(),this._backdropRef=new Ui(this._document,this._renderer,this._ngZone,e=>{this._backdropClick.next(e)}),this._animationsDisabled&&this._backdropRef.element.classList.add("cdk-overlay-backdrop-noop-animation"),this._config.backdropClass&&this._toggleClasses(this._backdropRef.element,this._config.backdropClass,!0),this._config.usePopover?this._host.prepend(this._backdropRef.element):this._host.parentElement.insertBefore(this._backdropRef.element,this._host),!this._animationsDisabled&&typeof requestAnimationFrame<"u"?this._ngZone.runOutsideAngular(()=>{requestAnimationFrame(()=>this._backdropRef?.element.classList.add(o))}):this._backdropRef.element.classList.add(o)}_updateStackingOrder(){!this._config.usePopover&&this._host.nextSibling&&this._host.parentNode.appendChild(this._host)}detachBackdrop(){this._animationsDisabled?(this._backdropRef?.dispose(),this._backdropRef=null):this._backdropRef?.detach()}_toggleClasses(o,e,t){let i=Oe(e||[]).filter(r=>!!r);i.length&&(t?o.classList.add(...i):o.classList.remove(...i))}_detachContentWhenEmpty(){let o=!1;try{this._detachContentAfterRenderRef=ze(()=>{o=!0,this._detachContent()},{injector:this._injector})}catch(e){if(o)throw e;this._detachContent()}globalThis.MutationObserver&&this._pane&&(this._detachContentMutationObserver||=new globalThis.MutationObserver(()=>{this._detachContent()}),this._detachContentMutationObserver.observe(this._pane,{childList:!0}))}_detachContent(){(!this._pane||!this._host||this._pane.children.length===0)&&(this._pane&&this._config.panelClass&&this._toggleClasses(this._pane,this._config.panelClass,!1),this._host&&this._host.parentElement&&(this._previousHostParent=this._host.parentElement,this._host.remove()),this._completeDetachContent())}_completeDetachContent(){this._detachContentAfterRenderRef?.destroy(),this._detachContentAfterRenderRef=void 0,this._detachContentMutationObserver?.disconnect()}_disposeScrollStrategy(){let o=this._scrollStrategy;o?.disable(),o?.detach?.()}},no="cdk-overlay-connected-position-bounding-box",lr=/([A-Za-z%]+)$/;function di(n,o){return new si(o,n.get(qe),n.get(te),n.get(Z),n.get(fo))}var si=class{_viewportRuler;_document;_platform;_overlayContainer;_overlayRef;_isInitialRender=!1;_lastBoundingBoxSize={width:0,height:0};_isPushed=!1;_canPush=!0;_growAfterOpen=!1;_hasFlexibleDimensions=!0;_positionLocked=!1;_originRect;_overlayRect;_viewportRect;_containerRect;_viewportMargin=0;_scrollables=[];_preferredPositions=[];_origin;_pane;_isDisposed=!1;_boundingBox=null;_lastPosition=null;_lastScrollVisibility=null;_positionChanges=new P;_resizeSubscription=ve.EMPTY;_offsetX=0;_offsetY=0;_transformOriginSelector;_appliedPanelClasses=[];_previousPushAmount=null;_popoverLocation="global";positionChanges=this._positionChanges;get positions(){return this._preferredPositions}constructor(o,e,t,i,r){this._viewportRuler=e,this._document=t,this._platform=i,this._overlayContainer=r,this.setOrigin(o)}attach(o){this._overlayRef&&this._overlayRef,this._validatePositions(),o.hostElement.classList.add(no),this._overlayRef=o,this._boundingBox=o.hostElement,this._pane=o.overlayElement,this._isDisposed=!1,this._isInitialRender=!0,this._lastPosition=null,this._resizeSubscription.unsubscribe(),this._resizeSubscription=this._viewportRuler.change().subscribe(()=>{this._isInitialRender=!0,this.apply()})}apply(){if(this._isDisposed||!this._platform.isBrowser)return;if(!this._isInitialRender&&this._positionLocked&&this._lastPosition){this.reapplyLastPosition();return}this._clearPanelClasses(),this._resetOverlayElementStyles(),this._resetBoundingBoxStyles(),this._viewportRect=this._getNarrowedViewportRect(),this._originRect=this._getOriginRect(),this._overlayRect=this._pane.getBoundingClientRect(),this._containerRect=this._getContainerRect();let o=this._originRect,e=this._overlayRect,t=this._viewportRect,i=this._containerRect,r=[],l;for(let p of this._preferredPositions){let u=this._getOriginPoint(o,i,p),x=this._getOverlayPoint(u,e,p),_=this._getOverlayFit(x,e,t,p);if(_.isCompletelyWithinViewport){this._isPushed=!1,this._applyPosition(p,u);return}if(this._canFitWithFlexibleDimensions(_,x,t)){r.push({position:p,origin:u,overlayRect:e,boundingBoxRect:this._calculateBoundingBoxRect(u,p)});continue}(!l||l.overlayFit.visibleArea<_.visibleArea)&&(l={overlayFit:_,overlayPoint:x,originPoint:u,position:p,overlayRect:e})}if(r.length){let p=null,u=-1;for(let x of r){let _=x.boundingBoxRect.width*x.boundingBoxRect.height*(x.position.weight||1);_>u&&(u=_,p=x)}this._isPushed=!1,this._applyPosition(p.position,p.origin);return}if(this._canPush){this._isPushed=!0,this._applyPosition(l.position,l.originPoint);return}this._applyPosition(l.position,l.originPoint)}detach(){this._clearPanelClasses(),this._lastPosition=null,this._previousPushAmount=null,this._resizeSubscription.unsubscribe()}dispose(){this._isDisposed||(this._boundingBox&&Ye(this._boundingBox.style,{top:"",left:"",right:"",bottom:"",height:"",width:"",alignItems:"",justifyContent:""}),this._pane&&this._resetOverlayElementStyles(),this._overlayRef&&this._overlayRef.hostElement.classList.remove(no),this.detach(),this._positionChanges.complete(),this._overlayRef=this._boundingBox=null,this._isDisposed=!0)}reapplyLastPosition(){if(this._isDisposed||!this._platform.isBrowser)return;let o=this._lastPosition;o?(this._originRect=this._getOriginRect(),this._overlayRect=this._pane.getBoundingClientRect(),this._viewportRect=this._getNarrowedViewportRect(),this._containerRect=this._getContainerRect(),this._applyPosition(o,this._getOriginPoint(this._originRect,this._containerRect,o))):this.apply()}withScrollableContainers(o){return this._scrollables=o,this}withPositions(o){return this._preferredPositions=o,o.indexOf(this._lastPosition)===-1&&(this._lastPosition=null),this._validatePositions(),this}withViewportMargin(o){return this._viewportMargin=o,this}withFlexibleDimensions(o=!0){return this._hasFlexibleDimensions=o,this}withGrowAfterOpen(o=!0){return this._growAfterOpen=o,this}withPush(o=!0){return this._canPush=o,this}withLockedPosition(o=!0){return this._positionLocked=o,this}setOrigin(o){return this._origin=o,this}withDefaultOffsetX(o){return this._offsetX=o,this}withDefaultOffsetY(o){return this._offsetY=o,this}withTransformOriginOn(o){return this._transformOriginSelector=o,this}withPopoverLocation(o){return this._popoverLocation=o,this}getPopoverInsertionPoint(){return this._popoverLocation==="global"?null:this._popoverLocation!=="inline"?this._popoverLocation:this._origin instanceof q?this._origin.nativeElement:Wi(this._origin)?this._origin:null}_getOriginPoint(o,e,t){let i;if(t.originX=="center")i=o.left+o.width/2;else{let l=this._isRtl()?o.right:o.left,p=this._isRtl()?o.left:o.right;i=t.originX=="start"?l:p}e.left<0&&(i-=e.left);let r;return t.originY=="center"?r=o.top+o.height/2:r=t.originY=="top"?o.top:o.bottom,e.top<0&&(r-=e.top),{x:i,y:r}}_getOverlayPoint(o,e,t){let i;t.overlayX=="center"?i=-e.width/2:t.overlayX==="start"?i=this._isRtl()?-e.width:0:i=this._isRtl()?0:-e.width;let r;return t.overlayY=="center"?r=-e.height/2:r=t.overlayY=="top"?0:-e.height,{x:o.x+i,y:o.y+r}}_getOverlayFit(o,e,t,i){let r=ro(e),{x:l,y:p}=o,u=this._getOffset(i,"x"),x=this._getOffset(i,"y");u&&(l+=u),x&&(p+=x);let _=0-l,C=l+r.width-t.width,Q=0-p,X=p+r.height-t.height,J=this._subtractOverflows(r.width,_,C),N=this._subtractOverflows(r.height,Q,X),Te=J*N;return{visibleArea:Te,isCompletelyWithinViewport:r.width*r.height===Te,fitsInViewportVertically:N===r.height,fitsInViewportHorizontally:J==r.width}}_canFitWithFlexibleDimensions(o,e,t){if(this._hasFlexibleDimensions){let i=t.bottom-e.y,r=t.right-e.x,l=oo(this._overlayRef.getConfig().minHeight),p=oo(this._overlayRef.getConfig().minWidth),u=o.fitsInViewportVertically||l!=null&&l<=i,x=o.fitsInViewportHorizontally||p!=null&&p<=r;return u&&x}return!1}_pushOverlayOnScreen(o,e,t){if(this._previousPushAmount&&this._positionLocked)return{x:o.x+this._previousPushAmount.x,y:o.y+this._previousPushAmount.y};let i=ro(e),r=this._viewportRect,l=Math.max(o.x+i.width-r.width,0),p=Math.max(o.y+i.height-r.height,0),u=Math.max(r.top-t.top-o.y,0),x=Math.max(r.left-t.left-o.x,0),_=0,C=0;return i.width<=r.width?_=x||-l:_=o.x<this._getViewportMarginStart()?r.left-t.left-o.x:0,i.height<=r.height?C=u||-p:C=o.y<this._getViewportMarginTop()?r.top-t.top-o.y:0,this._previousPushAmount={x:_,y:C},{x:o.x+_,y:o.y+C}}_applyPosition(o,e){if(this._setTransformOrigin(o),this._setOverlayElementStyles(e,o),this._setBoundingBoxStyles(e,o),o.panelClass&&this._addPanelClasses(o.panelClass),this._positionChanges.observers.length){let t=this._getScrollVisibility();if(o!==this._lastPosition||!this._lastScrollVisibility||!cr(this._lastScrollVisibility,t)){let i=new ri(o,t);this._positionChanges.next(i)}this._lastScrollVisibility=t}this._lastPosition=o,this._isInitialRender=!1}_setTransformOrigin(o){if(!this._transformOriginSelector)return;let e=this._boundingBox.querySelectorAll(this._transformOriginSelector),t,i=o.overlayY;o.overlayX==="center"?t="center":this._isRtl()?t=o.overlayX==="start"?"right":"left":t=o.overlayX==="start"?"left":"right";for(let r=0;r<e.length;r++)e[r].style.transformOrigin=`${t} ${i}`}_calculateBoundingBoxRect(o,e){let t=this._viewportRect,i=this._isRtl(),r,l,p;if(e.overlayY==="top")l=o.y,r=t.height-l+this._getViewportMarginBottom();else if(e.overlayY==="bottom")p=t.height-o.y+this._getViewportMarginTop()+this._getViewportMarginBottom(),r=t.height-p+this._getViewportMarginTop();else{let X=Math.min(t.bottom-o.y+t.top,o.y),J=this._lastBoundingBoxSize.height;r=X*2,l=o.y-X,r>J&&!this._isInitialRender&&!this._growAfterOpen&&(l=o.y-J/2)}let u=e.overlayX==="start"&&!i||e.overlayX==="end"&&i,x=e.overlayX==="end"&&!i||e.overlayX==="start"&&i,_,C,Q;if(x)Q=t.width-o.x+this._getViewportMarginStart()+this._getViewportMarginEnd(),_=o.x-this._getViewportMarginStart();else if(u)C=o.x,_=t.right-o.x-this._getViewportMarginEnd();else{let X=Math.min(t.right-o.x+t.left,o.x),J=this._lastBoundingBoxSize.width;_=X*2,C=o.x-X,_>J&&!this._isInitialRender&&!this._growAfterOpen&&(C=o.x-J/2)}return{top:l,left:C,bottom:p,right:Q,width:_,height:r}}_setBoundingBoxStyles(o,e){let t=this._calculateBoundingBoxRect(o,e);!this._isInitialRender&&!this._growAfterOpen&&(t.height=Math.min(t.height,this._lastBoundingBoxSize.height),t.width=Math.min(t.width,this._lastBoundingBoxSize.width));let i={};if(this._hasExactPosition())i.top=i.left="0",i.bottom=i.right="auto",i.maxHeight=i.maxWidth="",i.width=i.height="100%";else{let r=this._overlayRef.getConfig().maxHeight,l=this._overlayRef.getConfig().maxWidth;i.width=K(t.width),i.height=K(t.height),i.top=K(t.top)||"auto",i.bottom=K(t.bottom)||"auto",i.left=K(t.left)||"auto",i.right=K(t.right)||"auto",e.overlayX==="center"?i.alignItems="center":i.alignItems=e.overlayX==="end"?"flex-end":"flex-start",e.overlayY==="center"?i.justifyContent="center":i.justifyContent=e.overlayY==="bottom"?"flex-end":"flex-start",r&&(i.maxHeight=K(r)),l&&(i.maxWidth=K(l))}this._lastBoundingBoxSize=t,Ye(this._boundingBox.style,i)}_resetBoundingBoxStyles(){Ye(this._boundingBox.style,{top:"0",left:"0",right:"0",bottom:"0",height:"",width:"",alignItems:"",justifyContent:""})}_resetOverlayElementStyles(){Ye(this._pane.style,{top:"",left:"",bottom:"",right:"",position:"",transform:""})}_setOverlayElementStyles(o,e){let t={},i=this._hasExactPosition(),r=this._hasFlexibleDimensions,l=this._overlayRef.getConfig();if(i){let _=this._viewportRuler.getViewportScrollPosition();Ye(t,this._getExactOverlayY(e,o,_)),Ye(t,this._getExactOverlayX(e,o,_))}else t.position="static";let p="",u=this._getOffset(e,"x"),x=this._getOffset(e,"y");u&&(p+=`translateX(${u}px) `),x&&(p+=`translateY(${x}px)`),t.transform=p.trim(),l.maxHeight&&(i?t.maxHeight=K(l.maxHeight):r&&(t.maxHeight="")),l.maxWidth&&(i?t.maxWidth=K(l.maxWidth):r&&(t.maxWidth="")),Ye(this._pane.style,t)}_getExactOverlayY(o,e,t){let i={top:"",bottom:""},r=this._getOverlayPoint(e,this._overlayRect,o);if(this._isPushed&&(r=this._pushOverlayOnScreen(r,this._overlayRect,t)),o.overlayY==="bottom"){let l=this._document.documentElement.clientHeight;i.bottom=`${l-(r.y+this._overlayRect.height)}px`}else i.top=K(r.y);return i}_getExactOverlayX(o,e,t){let i={left:"",right:""},r=this._getOverlayPoint(e,this._overlayRect,o);this._isPushed&&(r=this._pushOverlayOnScreen(r,this._overlayRect,t));let l;if(this._isRtl()?l=o.overlayX==="end"?"left":"right":l=o.overlayX==="end"?"right":"left",l==="right"){let p=this._document.documentElement.clientWidth;i.right=`${p-(r.x+this._overlayRect.width)}px`}else i.left=K(r.x);return i}_getScrollVisibility(){let o=this._getOriginRect(),e=this._pane.getBoundingClientRect(),t=this._scrollables.map(i=>i.getElementRef().nativeElement.getBoundingClientRect());return{isOriginClipped:to(o,t),isOriginOutsideView:Hi(o,t),isOverlayClipped:to(e,t),isOverlayOutsideView:Hi(e,t)}}_subtractOverflows(o,...e){return e.reduce((t,i)=>t-Math.max(i,0),o)}_getNarrowedViewportRect(){let o=this._document.documentElement.clientWidth,e=this._document.documentElement.clientHeight,t=this._viewportRuler.getViewportScrollPosition();return{top:t.top+this._getViewportMarginTop(),left:t.left+this._getViewportMarginStart(),right:t.left+o-this._getViewportMarginEnd(),bottom:t.top+e-this._getViewportMarginBottom(),width:o-this._getViewportMarginStart()-this._getViewportMarginEnd(),height:e-this._getViewportMarginTop()-this._getViewportMarginBottom()}}_isRtl(){return this._overlayRef.getDirection()==="rtl"}_hasExactPosition(){return!this._hasFlexibleDimensions||this._isPushed}_getOffset(o,e){return e==="x"?o.offsetX==null?this._offsetX:o.offsetX:o.offsetY==null?this._offsetY:o.offsetY}_validatePositions(){}_addPanelClasses(o){this._pane&&Oe(o).forEach(e=>{e!==""&&this._appliedPanelClasses.indexOf(e)===-1&&(this._appliedPanelClasses.push(e),this._pane.classList.add(e))})}_clearPanelClasses(){this._pane&&(this._appliedPanelClasses.forEach(o=>{this._pane.classList.remove(o)}),this._appliedPanelClasses=[])}_getViewportMarginStart(){return typeof this._viewportMargin=="number"?this._viewportMargin:this._viewportMargin?.start??0}_getViewportMarginEnd(){return typeof this._viewportMargin=="number"?this._viewportMargin:this._viewportMargin?.end??0}_getViewportMarginTop(){return typeof this._viewportMargin=="number"?this._viewportMargin:this._viewportMargin?.top??0}_getViewportMarginBottom(){return typeof this._viewportMargin=="number"?this._viewportMargin:this._viewportMargin?.bottom??0}_getOriginRect(){let o=this._origin;if(o instanceof q)return o.nativeElement.getBoundingClientRect();if(o instanceof Element)return o.getBoundingClientRect();let e=o.width||0,t=o.height||0;return{top:o.y,bottom:o.y+t,left:o.x,right:o.x+e,height:t,width:e}}_getContainerRect(){let o=this._overlayRef.getConfig().usePopover&&this._popoverLocation!=="global",e=this._overlayContainer.getContainerElement();o&&(e.style.display="block");let t=e.getBoundingClientRect();return o&&(e.style.display=""),t}};function Ye(n,o){for(let e in o)o.hasOwnProperty(e)&&(n[e]=o[e]);return n}function oo(n){if(typeof n!="number"&&n!=null){let[o,e]=n.split(lr);return!e||e==="px"?parseFloat(o):null}return n||null}function ro(n){return{top:Math.floor(n.top),right:Math.floor(n.right),bottom:Math.floor(n.bottom),left:Math.floor(n.left),width:Math.floor(n.width),height:Math.floor(n.height)}}function cr(n,o){return n===o?!0:n.isOriginClipped===o.isOriginClipped&&n.isOriginOutsideView===o.isOriginOutsideView&&n.isOverlayClipped===o.isOverlayClipped&&n.isOverlayOutsideView===o.isOverlayOutsideView}var ao="cdk-global-overlay-wrapper";function _o(n){return new li}var li=class{_overlayRef;_cssPosition="static";_topOffset="";_bottomOffset="";_alignItems="";_xPosition="";_xOffset="";_width="";_height="";_isDisposed=!1;attach(o){let e=o.getConfig();this._overlayRef=o,this._width&&!e.width&&o.updateSize({width:this._width}),this._height&&!e.height&&o.updateSize({height:this._height}),o.hostElement.classList.add(ao),this._isDisposed=!1}top(o=""){return this._bottomOffset="",this._topOffset=o,this._alignItems="flex-start",this}left(o=""){return this._xOffset=o,this._xPosition="left",this}bottom(o=""){return this._topOffset="",this._bottomOffset=o,this._alignItems="flex-end",this}right(o=""){return this._xOffset=o,this._xPosition="right",this}start(o=""){return this._xOffset=o,this._xPosition="start",this}end(o=""){return this._xOffset=o,this._xPosition="end",this}width(o=""){return this._overlayRef?this._overlayRef.updateSize({width:o}):this._width=o,this}height(o=""){return this._overlayRef?this._overlayRef.updateSize({height:o}):this._height=o,this}centerHorizontally(o=""){return this.left(o),this._xPosition="center",this}centerVertically(o=""){return this.top(o),this._alignItems="center",this}apply(){if(!this._overlayRef||!this._overlayRef.hasAttached())return;let o=this._overlayRef.overlayElement.style,e=this._overlayRef.hostElement.style,t=this._overlayRef.getConfig(),{width:i,height:r,maxWidth:l,maxHeight:p}=t,u=(i==="100%"||i==="100vw")&&(!l||l==="100%"||l==="100vw"),x=(r==="100%"||r==="100vh")&&(!p||p==="100%"||p==="100vh"),_=this._xPosition,C=this._xOffset,Q=this._overlayRef.getConfig().direction==="rtl",X="",J="",N="";u?N="flex-start":_==="center"?(N="center",Q?J=C:X=C):Q?_==="left"||_==="end"?(N="flex-end",X=C):(_==="right"||_==="start")&&(N="flex-start",J=C):_==="left"||_==="start"?(N="flex-start",X=C):(_==="right"||_==="end")&&(N="flex-end",J=C),o.position=this._cssPosition,o.marginLeft=u?"0":X,o.marginTop=x?"0":this._topOffset,o.marginBottom=this._bottomOffset,o.marginRight=u?"0":J,e.justifyContent=N,e.alignItems=x?"flex-start":this._alignItems}dispose(){if(this._isDisposed||!this._overlayRef)return;let o=this._overlayRef.overlayElement.style,e=this._overlayRef.hostElement,t=e.style;e.classList.remove(ao),t.justifyContent=t.alignItems=o.marginTop=o.marginBottom=o.marginLeft=o.marginRight=o.position="",this._overlayRef=null,this._isDisposed=!0}},go=(()=>{class n{_injector=m(ee);constructor(){}global(){return _o()}flexibleConnectedTo(e){return di(this._injector,e)}static \u0275fac=function(t){return new(t||n)};static \u0275prov=O({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),vo=new R("OVERLAY_DEFAULT_CONFIG");function pi(n,o){n.get(fe).load(uo);let e=n.get(fo),t=n.get(te),i=n.get(_e),r=n.get(mt),l=n.get(We),p=n.get(Be,null,{optional:!0})||n.get(he).createRenderer(null,null),u=new ot(o),x=n.get(vo,null,{optional:!0})?.usePopover??!0;u.direction=u.direction||l.value,"showPopover"in t.body?u.usePopover=o?.usePopover??x:u.usePopover=!1;let _=t.createElement("div"),C=t.createElement("div");_.id=i.getId("cdk-overlay-"),_.classList.add("cdk-overlay-pane"),C.appendChild(_),u.usePopover&&(C.setAttribute("popover","manual"),C.classList.add("cdk-overlay-popover"));let Q=u.usePopover?u.positionStrategy?.getPopoverInsertionPoint?.():null;return Wi(Q)?Q.after(C):Q?.type==="parent"?Q.element.appendChild(C):e.getContainerElement().appendChild(C),new ai(new ti(_,r,n),C,_,u,n.get(V),n.get(mo),t,n.get(yn),n.get(ho),o?.disableAnimations??n.get(At,null,{optional:!0})==="NoopAnimations",n.get(Pe),p)}var bo=(()=>{class n{scrollStrategies=m(co);_positionBuilder=m(go);_injector=m(ee);constructor(){}create(e){return pi(this._injector,e)}position(){return this._positionBuilder}static \u0275fac=function(t){return new(t||n)};static \u0275prov=O({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var qi=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275mod=Y({type:n});static \u0275inj=W({providers:[bo],imports:[ie,Jn,Vi,Vi]})}return n})();var yo=new R("MatFormField");var mi=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275mod=Y({type:n});static \u0275inj=W({imports:[ie]})}return n})();var xo=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275mod=Y({type:n});static \u0275inj=W({imports:[ie]})}return n})();var Yi=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275mod=Y({type:n});static \u0275inj=W({imports:[mi,xo,it,ie]})}return n})();var dr=["panel"],pr=["*"];function mr(n,o){if(n&1&&(G(0,"div",1,0),ne(2),$()),n&2){let e=o.id,t=h();ht(t._classList),S("mat-mdc-autocomplete-visible",t.showPanel)("mat-mdc-autocomplete-hidden",!t.showPanel)("mat-autocomplete-panel-animations-enabled",!t._animationsDisabled)("mat-primary",t._color==="primary")("mat-accent",t._color==="accent")("mat-warn",t._color==="warn"),De("id",t.id),re("aria-label",t.ariaLabel||null)("aria-labelledby",t._getPanelAriaLabelledby(e))}}var Gi=class{source;option;constructor(o,e){this.source=o,this.option=e}},wo=new R("mat-autocomplete-default-options",{providedIn:"root",factory:()=>({autoActiveFirstOption:!1,autoSelectActiveOption:!1,hideSingleSelectionIndicator:!1,requireSelection:!1,hasBackdrop:!1})}),ko=(()=>{class n{_changeDetectorRef=m(we);_elementRef=m(q);_defaults=m(wo);_animationsDisabled=ge();_activeOptionChanges=ve.EMPTY;_keyManager;showPanel=!1;get isOpen(){return this._isOpen&&this.showPanel}_isOpen=!1;_latestOpeningTrigger;_setColor(e){this._color=e,this._changeDetectorRef.markForCheck()}_color;template;panel;options;optionGroups;ariaLabel;ariaLabelledby;displayWith=null;autoActiveFirstOption;autoSelectActiveOption;requireSelection;panelWidth;disableRipple=!1;optionSelected=new U;opened=new U;closed=new U;optionActivated=new U;set classList(e){this._classList=e,this._elementRef.nativeElement.className=""}_classList;get hideSingleSelectionIndicator(){return this._hideSingleSelectionIndicator}set hideSingleSelectionIndicator(e){this._hideSingleSelectionIndicator=e,this._syncParentProperties()}_hideSingleSelectionIndicator;_syncParentProperties(){if(this.options)for(let e of this.options)e._changeDetectorRef.markForCheck()}id=m(_e).getId("mat-autocomplete-");inertGroups;constructor(){let e=m(Z);this.inertGroups=e?.SAFARI||!1,this.autoActiveFirstOption=!!this._defaults.autoActiveFirstOption,this.autoSelectActiveOption=!!this._defaults.autoSelectActiveOption,this.requireSelection=!!this._defaults.requireSelection,this._hideSingleSelectionIndicator=this._defaults.hideSingleSelectionIndicator??!1}ngAfterContentInit(){this._keyManager=new wt(this.options).withWrap().skipPredicate(this._skipPredicate),this._activeOptionChanges=this._keyManager.change.subscribe(e=>{this.isOpen&&this.optionActivated.emit({source:this,option:this.options.toArray()[e]||null})}),this._setVisibility()}ngOnDestroy(){this._keyManager?.destroy(),this._activeOptionChanges.unsubscribe()}_setScrollTop(e){this.panel&&(this.panel.nativeElement.scrollTop=e)}_getScrollTop(){return this.panel?this.panel.nativeElement.scrollTop:0}_setVisibility(){this.showPanel=!!this.options?.length,this._changeDetectorRef.markForCheck()}_emitSelectEvent(e){let t=new Gi(this,e);this.optionSelected.emit(t)}_getPanelAriaLabelledby(e){if(this.ariaLabel)return null;let t=e?e+" ":"";return this.ariaLabelledby?t+this.ariaLabelledby:e}_skipPredicate(){return!1}static \u0275fac=function(t){return new(t||n)};static \u0275cmp=D({type:n,selectors:[["mat-autocomplete"]],contentQueries:function(t,i,r){if(t&1&&Ke(r,it,5)(r,Li,5),t&2){let l;z(l=B())&&(i.options=l),z(l=B())&&(i.optionGroups=l)}},viewQuery:function(t,i){if(t&1&&Ee(ct,7)(dr,5),t&2){let r;z(r=B())&&(i.template=r.first),z(r=B())&&(i.panel=r.first)}},hostAttrs:[1,"mat-mdc-autocomplete"],inputs:{ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],displayWith:"displayWith",autoActiveFirstOption:[2,"autoActiveFirstOption","autoActiveFirstOption",L],autoSelectActiveOption:[2,"autoSelectActiveOption","autoSelectActiveOption",L],requireSelection:[2,"requireSelection","requireSelection",L],panelWidth:"panelWidth",disableRipple:[2,"disableRipple","disableRipple",L],classList:[0,"class","classList"],hideSingleSelectionIndicator:[2,"hideSingleSelectionIndicator","hideSingleSelectionIndicator",L]},outputs:{optionSelected:"optionSelected",opened:"opened",closed:"closed",optionActivated:"optionActivated"},exportAs:["matAutocomplete"],features:[ye([{provide:Ai,useExisting:n}])],ngContentSelectors:pr,decls:1,vars:0,consts:[["panel",""],["role","listbox",1,"mat-mdc-autocomplete-panel","mdc-menu-surface","mdc-menu-surface--open",3,"id"]],template:function(t,i){t&1&&(ue(),Lt(0,mr,3,17,"ng-template"))},styles:[`div.mat-mdc-autocomplete-panel {
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
`],encapsulation:2,changeDetection:0})}return n})();var hr={provide:Bt,useExisting:at(()=>$i),multi:!0};var ur=new R("mat-autocomplete-scroll-strategy",{providedIn:"root",factory:()=>{let n=m(ee);return()=>ci(n)}}),$i=(()=>{class n{_environmentInjector=m(Pe);_element=m(q);_injector=m(ee);_viewContainerRef=m(dt);_zone=m(V);_changeDetectorRef=m(we);_dir=m(We,{optional:!0});_formField=m(yo,{optional:!0,host:!0});_viewportRuler=m(qe);_scrollStrategy=m(ur);_renderer=m(Be);_animationsDisabled=ge();_defaults=m(wo,{optional:!0});_overlayRef=null;_portal;_componentDestroyed=!1;_initialized=new P;_keydownSubscription;_outsideClickSubscription;_cleanupWindowBlur;_previousValue=null;_valueOnAttach=null;_valueOnLastKeydown=null;_positionStrategy;_manuallyFloatingLabel=!1;_closingActionsSubscription;_viewportSubscription=ve.EMPTY;_breakpointObserver=m(Ei);_handsetLandscapeSubscription=ve.EMPTY;_canOpenOnNextFocus=!0;_valueBeforeAutoSelection;_pendingAutoselectedOption=null;_closeKeyEventStream=new P;_overlayPanelClass=Oe(this._defaults?.overlayPanelClass||[]);_windowBlurHandler=()=>{this._canOpenOnNextFocus=this.panelOpen||!this._hasFocus()};_onChange=()=>{};_onTouched=()=>{};autocomplete;position="auto";connectedTo;autocompleteAttribute="off";autocompleteDisabled=!1;constructor(){}_aboveClass="mat-mdc-autocomplete-panel-above";ngAfterViewInit(){this._initialized.next(),this._initialized.complete(),this._cleanupWindowBlur=this._renderer.listen("window","blur",this._windowBlurHandler)}ngOnChanges(e){e.position&&this._positionStrategy&&(this._setStrategyPositions(this._positionStrategy),this.panelOpen&&this._overlayRef.updatePosition())}ngOnDestroy(){this._cleanupWindowBlur?.(),this._handsetLandscapeSubscription.unsubscribe(),this._viewportSubscription.unsubscribe(),this._componentDestroyed=!0,this._destroyPanel(),this._closeKeyEventStream.complete(),this._clearFromModal()}get panelOpen(){return this._overlayAttached&&this.autocomplete.showPanel}_overlayAttached=!1;openPanel(){this._openPanelInternal()}closePanel(){this._resetLabel(),this._overlayAttached&&(this.panelOpen&&this._zone.run(()=>{this.autocomplete.closed.emit()}),this.autocomplete._latestOpeningTrigger===this&&(this.autocomplete._isOpen=!1,this.autocomplete._latestOpeningTrigger=null),this._overlayAttached=!1,this._pendingAutoselectedOption=null,this._overlayRef&&this._overlayRef.hasAttached()&&(this._overlayRef.detach(),this._closingActionsSubscription.unsubscribe()),this._updatePanelState(),this._componentDestroyed||this._changeDetectorRef.detectChanges(),this._trackedModal&&Jt(this._trackedModal,"aria-owns",this.autocomplete.id))}updatePosition(){this._overlayAttached&&this._overlayRef.updatePosition()}get panelClosingActions(){return Le(this.optionSelections,this.autocomplete._keyManager.tabOut.pipe(Me(()=>this._overlayAttached)),this._closeKeyEventStream,this._getOutsideClickStream(),this._overlayRef?this._overlayRef.detachments().pipe(Me(()=>this._overlayAttached)):Se()).pipe(Ae(e=>e instanceof Tt?e:null))}optionSelections=cn(()=>{let e=this.autocomplete?this.autocomplete.options:null;return e?e.changes.pipe(be(e),Ne(()=>Le(...e.map(t=>t.onSelectionChange)))):this._initialized.pipe(Ne(()=>this.optionSelections))});get activeOption(){return this.autocomplete&&this.autocomplete._keyManager?this.autocomplete._keyManager.activeItem:null}_getOutsideClickStream(){return new Fe(e=>{let t=r=>{let l=oe(r),p=this._formField?this._formField.getConnectedOverlayOrigin().nativeElement:null,u=this.connectedTo?this.connectedTo.elementRef.nativeElement:null;this._overlayAttached&&l!==this._element.nativeElement&&!this._hasFocus()&&(!p||!p.contains(l))&&(!u||!u.contains(l))&&this._overlayRef&&!this._overlayRef.overlayElement.contains(l)&&e.next(r)},i=[this._renderer.listen("document","click",t),this._renderer.listen("document","auxclick",t),this._renderer.listen("document","touchend",t)];return()=>{i.forEach(r=>r())}})}writeValue(e){Promise.resolve(null).then(()=>this._assignOptionValue(e))}registerOnChange(e){this._onChange=e}registerOnTouched(e){this._onTouched=e}setDisabledState(e){this._element.nativeElement.disabled=e}_handleKeydown(e){let t=e,i=t.keyCode,r=Re(t);if(i===27&&!r&&t.preventDefault(),this._valueOnLastKeydown=this._element.nativeElement.value,this.activeOption&&i===13&&this.panelOpen&&!r)this.activeOption._selectViaInteraction(),this._resetActiveItem(),t.preventDefault();else if(this.autocomplete){let l=this.autocomplete._keyManager.activeItem,p=i===38||i===40;i===9||p&&!r&&this.panelOpen?this.autocomplete._keyManager.onKeydown(t):p&&this._canOpen()&&this._openPanelInternal(this._valueOnLastKeydown),(p||this.autocomplete._keyManager.activeItem!==l)&&(this._scrollToOption(this.autocomplete._keyManager.activeItemIndex||0),this.autocomplete.autoSelectActiveOption&&this.activeOption&&(this._pendingAutoselectedOption||(this._valueBeforeAutoSelection=this._valueOnLastKeydown),this._pendingAutoselectedOption=this.activeOption,this._assignOptionValue(this.activeOption.value)))}}_handleInput(e){let t=e.target,i=t.value;if(t.type==="number"&&(i=i==""?null:parseFloat(i)),this._previousValue!==i){if(this._previousValue=i,this._pendingAutoselectedOption=null,(!this.autocomplete||!this.autocomplete.requireSelection)&&this._onChange(i),!i)this._clearPreviousSelectedOption(null,!1);else if(this.panelOpen&&!this.autocomplete.requireSelection){let r=this.autocomplete.options?.find(l=>l.selected);if(r){let l=this._getDisplayValue(r.value);i!==l&&r.deselect(!1)}}if(this._canOpen()&&this._hasFocus()){let r=this._valueOnLastKeydown??this._element.nativeElement.value;this._valueOnLastKeydown=null,this._openPanelInternal(r)}}}_handleFocus(){this._canOpenOnNextFocus?this._canOpen()&&(this._previousValue=this._element.nativeElement.value,this._attachOverlay(this._previousValue),this._floatLabel(!0)):this._canOpenOnNextFocus=!0}_handleClick(){this._canOpen()&&!this.panelOpen&&this._openPanelInternal()}_hasFocus(){return wi()===this._element.nativeElement}_floatLabel(e=!1){this._formField&&this._formField.floatLabel==="auto"&&(e?this._formField._animateAndLockLabel():this._formField.floatLabel="always",this._manuallyFloatingLabel=!0)}_resetLabel(){this._manuallyFloatingLabel&&(this._formField&&(this._formField.floatLabel="auto"),this._manuallyFloatingLabel=!1)}_subscribeToClosingActions(){let e=new Fe(i=>{ze(()=>{i.next()},{injector:this._environmentInjector})}),t=this.autocomplete.options?.changes.pipe(me(()=>this._positionStrategy.reapplyLastPosition()),dn(0))??Se();return Le(e,t).pipe(Ne(()=>this._zone.run(()=>{let i=this.panelOpen;return this._resetActiveItem(),this._updatePanelState(),this._changeDetectorRef.detectChanges(),this.panelOpen&&this._overlayRef.updatePosition(),i!==this.panelOpen&&(this.panelOpen?this._emitOpened():this.autocomplete.closed.emit()),this.panelClosingActions})),Rt(1)).subscribe(i=>this._setValueAndClose(i))}_emitOpened(){this.autocomplete.opened.emit()}_destroyPanel(){this._overlayRef&&(this.closePanel(),this._overlayRef.dispose(),this._overlayRef=null)}_getDisplayValue(e){let t=this.autocomplete;return t&&t.displayWith?t.displayWith(e):e}_assignOptionValue(e){let t=this._getDisplayValue(e);e==null&&this._clearPreviousSelectedOption(null,!1),this._updateNativeInputValue(t??"")}_updateNativeInputValue(e){this._formField?this._formField._control.value=e:this._element.nativeElement.value=e,this._previousValue=e}_setValueAndClose(e){let t=this.autocomplete,i=e?e.source:this._pendingAutoselectedOption;i?(this._clearPreviousSelectedOption(i),this._assignOptionValue(i.value),this._onChange(i.value),t._emitSelectEvent(i),this._element.nativeElement.focus()):t.requireSelection&&this._element.nativeElement.value!==this._valueOnAttach&&(this._clearPreviousSelectedOption(null),this._assignOptionValue(null),this._onChange(null)),this.closePanel()}_clearPreviousSelectedOption(e,t){this.autocomplete?.options?.forEach(i=>{i!==e&&i.selected&&i.deselect(t)})}_openPanelInternal(e=this._element.nativeElement.value){if(this._attachOverlay(e),this._floatLabel(),this._trackedModal){let t=this.autocomplete.id;Di(this._trackedModal,"aria-owns",t)}}_attachOverlay(e){if(!this.autocomplete)return;let t=this._overlayRef;t?(this._positionStrategy.setOrigin(this._getConnectedElement()),t.updateSize({width:this._getPanelWidth()})):(this._portal=new nt(this.autocomplete.template,this._viewContainerRef,{id:this._formField?.getLabelId()}),t=pi(this._injector,this._getOverlayConfig()),this._overlayRef=t,this._viewportSubscription=this._viewportRuler.change().subscribe(()=>{this.panelOpen&&t&&t.updateSize({width:this._getPanelWidth()})}),this._handsetLandscapeSubscription=this._breakpointObserver.observe(jn.HandsetLandscape).subscribe(r=>{r.matches?this._positionStrategy.withFlexibleDimensions(!0).withGrowAfterOpen(!0).withViewportMargin(8):this._positionStrategy.withFlexibleDimensions(!1).withGrowAfterOpen(!1).withViewportMargin(0)})),t&&!t.hasAttached()&&(t.attach(this._portal),this._valueOnAttach=e,this._valueOnLastKeydown=null,this._closingActionsSubscription=this._subscribeToClosingActions());let i=this.panelOpen;this.autocomplete._isOpen=this._overlayAttached=!0,this.autocomplete._latestOpeningTrigger=this,this.autocomplete._setColor(this._formField?.color),this._updatePanelState(),this._applyModalPanelOwnership(),this.panelOpen&&i!==this.panelOpen&&this._emitOpened()}_handlePanelKeydown=e=>{(e.keyCode===27&&!Re(e)||e.keyCode===38&&Re(e,"altKey"))&&(this._pendingAutoselectedOption&&(this._updateNativeInputValue(this._valueBeforeAutoSelection??""),this._pendingAutoselectedOption=null),this._closeKeyEventStream.next(),this._resetActiveItem(),e.stopPropagation(),e.preventDefault())};_updatePanelState(){if(this.autocomplete._setVisibility(),this.panelOpen){let e=this._overlayRef;this._keydownSubscription||(this._keydownSubscription=e.keydownEvents().subscribe(this._handlePanelKeydown)),this._outsideClickSubscription||(this._outsideClickSubscription=e.outsidePointerEvents().subscribe())}else this._keydownSubscription?.unsubscribe(),this._outsideClickSubscription?.unsubscribe(),this._keydownSubscription=this._outsideClickSubscription=void 0}_getOverlayConfig(){return new ot({positionStrategy:this._getOverlayPosition(),scrollStrategy:this._scrollStrategy(),width:this._getPanelWidth(),direction:this._dir??void 0,hasBackdrop:this._defaults?.hasBackdrop,backdropClass:this._defaults?.backdropClass||"cdk-overlay-transparent-backdrop",panelClass:this._overlayPanelClass,disableAnimations:this._animationsDisabled})}_getOverlayPosition(){let e=di(this._injector,this._getConnectedElement()).withFlexibleDimensions(!1).withPush(!1).withPopoverLocation("inline");return this._setStrategyPositions(e),this._positionStrategy=e,e}_setStrategyPositions(e){let t=[{originX:"start",originY:"bottom",overlayX:"start",overlayY:"top"},{originX:"end",originY:"bottom",overlayX:"end",overlayY:"top"}],i=this._aboveClass,r=[{originX:"start",originY:"top",overlayX:"start",overlayY:"bottom",panelClass:i},{originX:"end",originY:"top",overlayX:"end",overlayY:"bottom",panelClass:i}],l;this.position==="above"?l=r:this.position==="below"?l=t:l=[...t,...r],e.withPositions(l)}_getConnectedElement(){return this.connectedTo?this.connectedTo.elementRef:this._formField?this._formField.getConnectedOverlayOrigin():this._element}_getPanelWidth(){return this.autocomplete.panelWidth||this._getHostWidth()}_getHostWidth(){return this._getConnectedElement().nativeElement.getBoundingClientRect().width}_resetActiveItem(){let e=this.autocomplete;if(e.autoActiveFirstOption){let t=-1;for(let i=0;i<e.options.length;i++)if(!e.options.get(i).disabled){t=i;break}e._keyManager.setActiveItem(t)}else e._keyManager.setActiveItem(-1)}_canOpen(){let e=this._element.nativeElement;return!e.readOnly&&!e.disabled&&!this.autocompleteDisabled}_scrollToOption(e){let t=this.autocomplete,i=Qn(e,t.options,t.optionGroups);if(e===0&&i===1)t._setScrollTop(0);else if(t.panel){let r=t.options.toArray()[e];if(r){let l=r._getHostElement(),p=Xn(l.offsetTop,l.offsetHeight,t._getScrollTop(),t.panel.nativeElement.offsetHeight);t._setScrollTop(p)}}}_trackedModal=null;_applyModalPanelOwnership(){let e=this._element.nativeElement.closest('body > .cdk-overlay-container [aria-modal="true"]');if(!e)return;let t=this.autocomplete.id;this._trackedModal&&Jt(this._trackedModal,"aria-owns",t),Di(e,"aria-owns",t),this._trackedModal=e}_clearFromModal(){if(this._trackedModal){let e=this.autocomplete.id;Jt(this._trackedModal,"aria-owns",e),this._trackedModal=null}}static \u0275fac=function(t){return new(t||n)};static \u0275dir=de({type:n,selectors:[["input","matAutocomplete",""],["textarea","matAutocomplete",""]],hostAttrs:[1,"mat-mdc-autocomplete-trigger"],hostVars:7,hostBindings:function(t,i){t&1&&f("focusin",function(){return i._handleFocus()})("blur",function(){return i._onTouched()})("input",function(l){return i._handleInput(l)})("keydown",function(l){return i._handleKeydown(l)})("click",function(){return i._handleClick()}),t&2&&re("autocomplete",i.autocompleteAttribute)("role",i.autocompleteDisabled?null:"combobox")("aria-autocomplete",i.autocompleteDisabled?null:"list")("aria-activedescendant",i.panelOpen&&i.activeOption?i.activeOption.id:null)("aria-expanded",i.autocompleteDisabled?null:i.panelOpen.toString())("aria-controls",i.autocompleteDisabled||!i.panelOpen||i.autocomplete==null?null:i.autocomplete.id)("aria-haspopup",i.autocompleteDisabled?null:"listbox")},inputs:{autocomplete:[0,"matAutocomplete","autocomplete"],position:[0,"matAutocompletePosition","position"],connectedTo:[0,"matAutocompleteConnectedTo","connectedTo"],autocompleteAttribute:[0,"autocomplete","autocompleteAttribute"],autocompleteDisabled:[2,"matAutocompleteDisabled","autocompleteDisabled",L]},exportAs:["matAutocompleteTrigger"],features:[ye([hr]),st]})}return n})(),So=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275mod=Y({type:n});static \u0275inj=W({imports:[qi,Yi,ei,Yi,ie]})}return n})();var _r={capture:!0},gr=["focus","mousedown","mouseenter","touchstart"],Ki="mat-ripple-loader-uninitialized",Qi="mat-ripple-loader-class-name",Mo="mat-ripple-loader-centered",hi="mat-ripple-loader-disabled",Eo=(()=>{class n{_document=m(te);_animationsDisabled=ge();_globalRippleOptions=m(Et,{optional:!0});_platform=m(Z);_ngZone=m(V);_injector=m(ee);_eventCleanups;_hosts=new Map;constructor(){let e=m(he).createRenderer(null,null);this._eventCleanups=this._ngZone.runOutsideAngular(()=>gr.map(t=>e.listen(this._document,t,this._onInteraction,_r)))}ngOnDestroy(){let e=this._hosts.keys();for(let t of e)this.destroyRipple(t);this._eventCleanups.forEach(t=>t())}configureRipple(e,t){e.setAttribute(Ki,this._globalRippleOptions?.namespace??""),(t.className||!e.hasAttribute(Qi))&&e.setAttribute(Qi,t.className||""),t.centered&&e.setAttribute(Mo,""),t.disabled&&e.setAttribute(hi,"")}setDisabled(e,t){let i=this._hosts.get(e);i?(i.target.rippleDisabled=t,!t&&!i.hasSetUpEvents&&(i.hasSetUpEvents=!0,i.renderer.setupTriggerEvents(e))):t?e.setAttribute(hi,""):e.removeAttribute(hi)}_onInteraction=e=>{let t=oe(e);if(t instanceof HTMLElement){let i=t.closest(`[${Ki}="${this._globalRippleOptions?.namespace??""}"]`);i&&this._createRipple(i)}};_createRipple(e){if(!this._document||this._hosts.has(e))return;e.querySelector(".mat-ripple")?.remove();let t=this._document.createElement("span");t.classList.add("mat-ripple",e.getAttribute(Qi)),e.append(t);let i=this._globalRippleOptions,r=this._animationsDisabled?0:i?.animation?.enterDuration??St.enterDuration,l=this._animationsDisabled?0:i?.animation?.exitDuration??St.exitDuration,p={rippleDisabled:this._animationsDisabled||i?.disabled||e.hasAttribute(hi),rippleConfig:{centered:e.hasAttribute(Mo),terminateOnPointerUp:i?.terminateOnPointerUp,animation:{enterDuration:r,exitDuration:l}}},u=new Mt(p,this._ngZone,t,this._platform,this._injector),x=!p.rippleDisabled;x&&u.setupTriggerEvents(e),this._hosts.set(e,{target:p,renderer:u,hasSetUpEvents:x}),e.removeAttribute(Ki)}destroyRipple(e){let t=this._hosts.get(e);t&&(t.renderer._removeTriggerEvents(),this._hosts.delete(e))}static \u0275fac=function(t){return new(t||n)};static \u0275prov=O({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var Oo=(()=>{class n{isErrorState(e,t){return!!(e&&e.invalid&&(e.touched||t&&t.submitted))}static \u0275fac=function(t){return new(t||n)};static \u0275prov=O({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var Ro=["*",[["mat-chip-avatar"],["","matChipAvatar",""]],[["mat-chip-trailing-icon"],["","matChipRemove",""],["","matChipTrailingIcon",""]]],Fo=["*","mat-chip-avatar, [matChipAvatar]","mat-chip-trailing-icon,[matChipRemove],[matChipTrailingIcon]"];function vr(n,o){n&1&&(a(0,"span",3),ne(1,1),s())}function br(n,o){n&1&&(a(0,"span",6),ne(1,2),s())}function yr(n,o){n&1&&(a(0,"span",3),ne(1,1),a(2,"span",7),pn(),a(3,"svg",8),T(4,"path",9),s()()())}function xr(n,o){n&1&&(a(0,"span",6),ne(1,2),s())}var Cr=`.mdc-evolution-chip,
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
`;var Ao=["*"],wr=`.mat-mdc-chip-set {
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
`,Ji=new R("mat-chips-default-options",{providedIn:"root",factory:()=>({separatorKeyCodes:[13]})}),To=new R("MatChipAvatar"),Po=new R("MatChipTrailingIcon"),Do=new R("MatChipEdit"),Io=new R("MatChipRemove"),en=new R("MatChip"),Lo=(()=>{class n{_elementRef=m(q);_parentChip=m(en);_isPrimary=!0;_isLeading=!1;get disabled(){return this._disabled||this._parentChip?.disabled||!1}set disabled(e){this._disabled=e}_disabled=!1;tabIndex=-1;_allowFocusWhenDisabled=!1;_getDisabledAttribute(){return this.disabled&&!this._allowFocusWhenDisabled?"":null}constructor(){m(fe).load(Ot),this._elementRef.nativeElement.nodeName==="BUTTON"&&this._elementRef.nativeElement.setAttribute("type","button")}focus(){this._elementRef.nativeElement.focus()}static \u0275fac=function(t){return new(t||n)};static \u0275dir=de({type:n,selectors:[["","matChipContent",""]],hostAttrs:[1,"mat-mdc-chip-action","mdc-evolution-chip__action","mdc-evolution-chip__action--presentational"],hostVars:8,hostBindings:function(t,i){t&2&&(re("disabled",i._getDisabledAttribute())("aria-disabled",i.disabled),S("mdc-evolution-chip__action--primary",i._isPrimary)("mdc-evolution-chip__action--secondary",!i._isPrimary)("mdc-evolution-chip__action--trailing",!i._isPrimary&&!i._isLeading))},inputs:{disabled:[2,"disabled","disabled",L],tabIndex:[2,"tabIndex","tabIndex",e=>e==null?-1:bi(e)],_allowFocusWhenDisabled:"_allowFocusWhenDisabled"}})}return n})(),No=(()=>{class n extends Lo{_getTabindex(){return this.disabled&&!this._allowFocusWhenDisabled?null:this.tabIndex.toString()}_handleClick(e){!this.disabled&&this._isPrimary&&(e.preventDefault(),this._parentChip._handlePrimaryActionInteraction())}_handleKeydown(e){(e.keyCode===13||e.keyCode===32)&&!this.disabled&&this._isPrimary&&!this._parentChip._isEditing&&(e.preventDefault(),this._parentChip._handlePrimaryActionInteraction())}static \u0275fac=(()=>{let e;return function(i){return(e||(e=Ve(n)))(i||n)}})();static \u0275dir=de({type:n,selectors:[["","matChipAction",""]],hostVars:3,hostBindings:function(t,i){t&1&&f("click",function(l){return i._handleClick(l)})("keydown",function(l){return i._handleKeydown(l)}),t&2&&(re("tabindex",i._getTabindex()),S("mdc-evolution-chip__action--presentational",!1))},features:[Ge]})}return n})();var Xi=(()=>{class n{_changeDetectorRef=m(we);_elementRef=m(q);_tagName=m(bn);_ngZone=m(V);_focusMonitor=m(Mi);_globalRippleOptions=m(Et,{optional:!0});_document=m(te);_onFocus=new P;_onBlur=new P;_isBasicChip=!1;role=null;_hasFocusInternal=!1;_pendingFocus=!1;_actionChanges;_animationsDisabled=ge();_allLeadingIcons;_allTrailingIcons;_allEditIcons;_allRemoveIcons;_hasFocus(){return this._hasFocusInternal}id=m(_e).getId("mat-mdc-chip-");ariaLabel=null;ariaDescription=null;_chipListDisabled=!1;_hadFocusOnRemove=!1;_textElement;get value(){return this._value!==void 0?this._value:this._textElement.textContent.trim()}set value(e){this._value=e}_value;color;removable=!0;highlighted=!1;disableRipple=!1;get disabled(){return this._disabled||this._chipListDisabled}set disabled(e){this._disabled=e}_disabled=!1;removed=new U;destroyed=new U;basicChipAttrName="mat-basic-chip";leadingIcon;editIcon;trailingIcon;removeIcon;primaryAction;_rippleLoader=m(Eo);_injector=m(ee);constructor(){let e=m(fe);e.load(Ot),e.load(Qt),this._monitorFocus(),this._rippleLoader?.configureRipple(this._elementRef.nativeElement,{className:"mat-mdc-chip-ripple",disabled:this._isRippleDisabled()})}ngOnInit(){this._isBasicChip=this._elementRef.nativeElement.hasAttribute(this.basicChipAttrName)||this._tagName.toLowerCase()===this.basicChipAttrName}ngAfterViewInit(){this._textElement=this._elementRef.nativeElement.querySelector(".mat-mdc-chip-action-label"),this._pendingFocus&&(this._pendingFocus=!1,this.focus())}ngAfterContentInit(){this._actionChanges=Le(this._allLeadingIcons.changes,this._allTrailingIcons.changes,this._allEditIcons.changes,this._allRemoveIcons.changes).subscribe(()=>this._changeDetectorRef.markForCheck())}ngDoCheck(){this._rippleLoader.setDisabled(this._elementRef.nativeElement,this._isRippleDisabled())}ngOnDestroy(){this._focusMonitor.stopMonitoring(this._elementRef),this._rippleLoader?.destroyRipple(this._elementRef.nativeElement),this._actionChanges?.unsubscribe(),this.destroyed.emit({chip:this}),this.destroyed.complete()}remove(){this.removable&&(this._hadFocusOnRemove=this._hasFocus(),this.removed.emit({chip:this}))}_isRippleDisabled(){return this.disabled||this.disableRipple||this._animationsDisabled||this._isBasicChip||!this._hasInteractiveActions()||!!this._globalRippleOptions?.disabled}_hasTrailingIcon(){return!!(this.trailingIcon||this.removeIcon)}_handleKeydown(e){(e.keyCode===8&&!e.repeat||e.keyCode===46)&&(e.preventDefault(),this.remove())}focus(){this.disabled||(this.primaryAction?this.primaryAction.focus():this._pendingFocus=!0)}_getSourceAction(e){return this._getActions().find(t=>{let i=t._elementRef.nativeElement;return i===e||i.contains(e)})}_getActions(){let e=[];return this.editIcon&&e.push(this.editIcon),this.primaryAction&&e.push(this.primaryAction),this.removeIcon&&e.push(this.removeIcon),e}_handlePrimaryActionInteraction(){}_hasInteractiveActions(){return this._getActions().length>0}_edit(e){}_monitorFocus(){this._focusMonitor.monitor(this._elementRef,!0).subscribe(e=>{let t=e!==null;t!==this._hasFocusInternal&&(this._hasFocusInternal=t,t?this._onFocus.next({chip:this}):(this._changeDetectorRef.markForCheck(),setTimeout(()=>this._ngZone.run(()=>this._onBlur.next({chip:this})))))})}static \u0275fac=function(t){return new(t||n)};static \u0275cmp=D({type:n,selectors:[["mat-basic-chip"],["","mat-basic-chip",""],["mat-chip"],["","mat-chip",""]],contentQueries:function(t,i,r){if(t&1&&Ke(r,To,5)(r,Do,5)(r,Po,5)(r,Io,5)(r,To,5)(r,Po,5)(r,Do,5)(r,Io,5),t&2){let l;z(l=B())&&(i.leadingIcon=l.first),z(l=B())&&(i.editIcon=l.first),z(l=B())&&(i.trailingIcon=l.first),z(l=B())&&(i.removeIcon=l.first),z(l=B())&&(i._allLeadingIcons=l),z(l=B())&&(i._allTrailingIcons=l),z(l=B())&&(i._allEditIcons=l),z(l=B())&&(i._allRemoveIcons=l)}},viewQuery:function(t,i){if(t&1&&Ee(No,5),t&2){let r;z(r=B())&&(i.primaryAction=r.first)}},hostAttrs:[1,"mat-mdc-chip"],hostVars:31,hostBindings:function(t,i){t&1&&f("keydown",function(l){return i._handleKeydown(l)}),t&2&&(De("id",i.id),re("role",i.role)("aria-label",i.ariaLabel),ht("mat-"+(i.color||"primary")),S("mdc-evolution-chip",!i._isBasicChip)("mdc-evolution-chip--disabled",i.disabled)("mdc-evolution-chip--with-trailing-action",i._hasTrailingIcon())("mdc-evolution-chip--with-primary-graphic",i.leadingIcon)("mdc-evolution-chip--with-primary-icon",i.leadingIcon)("mdc-evolution-chip--with-avatar",i.leadingIcon)("mat-mdc-chip-with-avatar",i.leadingIcon)("mat-mdc-chip-highlighted",i.highlighted)("mat-mdc-chip-disabled",i.disabled)("mat-mdc-basic-chip",i._isBasicChip)("mat-mdc-standard-chip",!i._isBasicChip)("mat-mdc-chip-with-trailing-icon",i._hasTrailingIcon())("_mat-animation-noopable",i._animationsDisabled))},inputs:{role:"role",id:"id",ariaLabel:[0,"aria-label","ariaLabel"],ariaDescription:[0,"aria-description","ariaDescription"],value:"value",color:"color",removable:[2,"removable","removable",L],highlighted:[2,"highlighted","highlighted",L],disableRipple:[2,"disableRipple","disableRipple",L],disabled:[2,"disabled","disabled",L]},outputs:{removed:"removed",destroyed:"destroyed"},exportAs:["matChip"],features:[ye([{provide:en,useExisting:n}])],ngContentSelectors:Fo,decls:8,vars:2,consts:[[1,"mat-mdc-chip-focus-overlay"],[1,"mdc-evolution-chip__cell","mdc-evolution-chip__cell--primary"],["matChipContent",""],[1,"mdc-evolution-chip__graphic","mat-mdc-chip-graphic"],[1,"mdc-evolution-chip__text-label","mat-mdc-chip-action-label"],[1,"mat-mdc-chip-primary-focus-indicator","mat-focus-indicator"],[1,"mdc-evolution-chip__cell","mdc-evolution-chip__cell--trailing"]],template:function(t,i){t&1&&(ue(Ro),T(0,"span",0),a(1,"span",1)(2,"span",2),b(3,vr,2,0,"span",3),a(4,"span",4),ne(5),T(6,"span",5),s()()(),b(7,br,2,0,"span",6)),t&2&&(d(3),y(i.leadingIcon?3:-1),d(4),y(i._hasTrailingIcon()?7:-1))},dependencies:[Lo],styles:[`.mdc-evolution-chip,
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
`],encapsulation:2,changeDetection:0})}return n})();var tn=(()=>{class n extends Xi{_defaultOptions=m(Ji,{optional:!0});chipListSelectable=!0;_chipListMultiple=!1;_chipListHideSingleSelectionIndicator=this._defaultOptions?.hideSingleSelectionIndicator??!1;get selectable(){return this._selectable&&this.chipListSelectable}set selectable(e){this._selectable=e,this._changeDetectorRef.markForCheck()}_selectable=!0;get selected(){return this._selected}set selected(e){this._setSelectedState(e,!1,!0)}_selected=!1;get ariaSelected(){return this.selectable?this.selected.toString():null}basicChipAttrName="mat-basic-chip-option";selectionChange=new U;ngOnInit(){super.ngOnInit(),this.role="presentation"}select(){this._setSelectedState(!0,!1,!0)}deselect(){this._setSelectedState(!1,!1,!0)}selectViaInteraction(){this._setSelectedState(!0,!0,!0)}toggleSelected(e=!1){return this._setSelectedState(!this.selected,e,!0),this.selected}_handlePrimaryActionInteraction(){this.disabled||(this.focus(),this.selectable&&this.toggleSelected(!0))}_hasLeadingGraphic(){return this.leadingIcon?!0:!this._chipListHideSingleSelectionIndicator||this._chipListMultiple}_setSelectedState(e,t,i){e!==this.selected&&(this._selected=e,i&&this.selectionChange.emit({source:this,isUserInput:t,selected:this.selected}),this._changeDetectorRef.markForCheck())}static \u0275fac=(()=>{let e;return function(i){return(e||(e=Ve(n)))(i||n)}})();static \u0275cmp=D({type:n,selectors:[["mat-basic-chip-option"],["","mat-basic-chip-option",""],["mat-chip-option"],["","mat-chip-option",""]],hostAttrs:[1,"mat-mdc-chip","mat-mdc-chip-option"],hostVars:37,hostBindings:function(t,i){t&2&&(De("id",i.id),re("tabindex",null)("aria-label",null)("aria-description",null)("role",i.role),S("mdc-evolution-chip",!i._isBasicChip)("mdc-evolution-chip--filter",!i._isBasicChip)("mdc-evolution-chip--selectable",!i._isBasicChip)("mat-mdc-chip-selected",i.selected)("mat-mdc-chip-multiple",i._chipListMultiple)("mat-mdc-chip-disabled",i.disabled)("mat-mdc-chip-with-avatar",i.leadingIcon)("mdc-evolution-chip--disabled",i.disabled)("mdc-evolution-chip--selected",i.selected)("mdc-evolution-chip--selecting",!i._animationsDisabled)("mdc-evolution-chip--with-trailing-action",i._hasTrailingIcon())("mdc-evolution-chip--with-primary-icon",i.leadingIcon)("mdc-evolution-chip--with-primary-graphic",i._hasLeadingGraphic())("mdc-evolution-chip--with-avatar",i.leadingIcon)("mat-mdc-chip-highlighted",i.highlighted)("mat-mdc-chip-with-trailing-icon",i._hasTrailingIcon()))},inputs:{selectable:[2,"selectable","selectable",L],selected:[2,"selected","selected",L]},outputs:{selectionChange:"selectionChange"},features:[ye([{provide:Xi,useExisting:n},{provide:en,useExisting:n}]),Ge],ngContentSelectors:Fo,decls:8,vars:6,consts:[[1,"mat-mdc-chip-focus-overlay"],[1,"mdc-evolution-chip__cell","mdc-evolution-chip__cell--primary"],["matChipAction","","role","option",3,"_allowFocusWhenDisabled"],[1,"mdc-evolution-chip__graphic","mat-mdc-chip-graphic"],[1,"mdc-evolution-chip__text-label","mat-mdc-chip-action-label"],[1,"mat-mdc-chip-primary-focus-indicator","mat-focus-indicator"],[1,"mdc-evolution-chip__cell","mdc-evolution-chip__cell--trailing"],[1,"mdc-evolution-chip__checkmark"],["viewBox","-2 -3 30 30","focusable","false","aria-hidden","true",1,"mdc-evolution-chip__checkmark-svg"],["fill","none","stroke","currentColor","d","M1.73,12.91 8.1,19.28 22.79,4.59",1,"mdc-evolution-chip__checkmark-path"]],template:function(t,i){t&1&&(ue(Ro),T(0,"span",0),a(1,"span",1)(2,"button",2),b(3,yr,5,0,"span",3),a(4,"span",4),ne(5),T(6,"span",5),s()()(),b(7,xr,2,0,"span",6)),t&2&&(d(2),M("_allowFocusWhenDisabled",!0),re("aria-description",i.ariaDescription)("aria-label",i.ariaLabel)("aria-selected",i.ariaSelected),d(),y(i._hasLeadingGraphic()?3:-1),d(4),y(i._hasTrailingIcon()?7:-1))},dependencies:[No],styles:[Cr],encapsulation:2,changeDetection:0})}return n})();var kr=(()=>{class n{_elementRef=m(q);_changeDetectorRef=m(we);_dir=m(We,{optional:!0});_lastDestroyedFocusedChipIndex=null;_keyManager;_destroyed=new P;_defaultRole="presentation";get chipFocusChanges(){return this._getChipStream(e=>e._onFocus)}get chipDestroyedChanges(){return this._getChipStream(e=>e.destroyed)}get chipRemovedChanges(){return this._getChipStream(e=>e.removed)}get disabled(){return this._disabled}set disabled(e){this._disabled=e,this._syncChipsState()}_disabled=!1;get empty(){return!this._chips||this._chips.length===0}get role(){return this._explicitRole?this._explicitRole:this.empty?null:this._defaultRole}tabIndex=0;set role(e){this._explicitRole=e}_explicitRole=null;get focused(){return this._hasFocusedChip()}_chips;_chipActions=new lt;constructor(){}ngAfterViewInit(){this._setUpFocusManagement(),this._trackChipSetChanges(),this._trackDestroyedFocusedChip()}ngOnDestroy(){this._keyManager?.destroy(),this._chipActions.destroy(),this._destroyed.next(),this._destroyed.complete()}_hasFocusedChip(){return this._chips&&this._chips.some(e=>e._hasFocus())}_syncChipsState(){this._chips?.forEach(e=>{e._chipListDisabled=this._disabled,e._changeDetectorRef.markForCheck()})}focus(){}_handleKeydown(e){this._originatesFromChip(e)&&this._keyManager.onKeydown(e)}_isValidIndex(e){return e>=0&&e<this._chips.length}_allowFocusEscape(){let e=this._elementRef.nativeElement.tabIndex;e!==-1&&(this._elementRef.nativeElement.tabIndex=-1,setTimeout(()=>this._elementRef.nativeElement.tabIndex=e))}_getChipStream(e){return this._chips.changes.pipe(be(null),Ne(()=>Le(...this._chips.map(e))))}_originatesFromChip(e){let t=e.target;for(;t&&t!==this._elementRef.nativeElement;){if(t.classList.contains("mat-mdc-chip"))return!0;t=t.parentElement}return!1}_setUpFocusManagement(){this._chips.changes.pipe(be(this._chips)).subscribe(e=>{let t=[];e.forEach(i=>i._getActions().forEach(r=>t.push(r))),this._chipActions.reset(t),this._chipActions.notifyOnChanges()}),this._keyManager=new kt(this._chipActions).withVerticalOrientation().withHorizontalOrientation(this._dir?this._dir.value:"ltr").withHomeAndEnd().skipPredicate(e=>this._skipPredicate(e)),this.chipFocusChanges.pipe(le(this._destroyed)).subscribe(({chip:e})=>{let t=e._getSourceAction(document.activeElement);t&&this._keyManager.updateActiveItem(t)}),this._dir?.change.pipe(le(this._destroyed)).subscribe(e=>this._keyManager.withHorizontalOrientation(e))}_skipPredicate(e){return e.disabled}_trackChipSetChanges(){this._chips.changes.pipe(be(null),le(this._destroyed)).subscribe(()=>{this.disabled&&Promise.resolve().then(()=>this._syncChipsState()),this._redirectDestroyedChipFocus()})}_trackDestroyedFocusedChip(){this.chipDestroyedChanges.pipe(le(this._destroyed)).subscribe(e=>{let i=this._chips.toArray().indexOf(e.chip),r=e.chip._hasFocus(),l=e.chip._hadFocusOnRemove&&this._keyManager.activeItem&&e.chip._getActions().includes(this._keyManager.activeItem),p=r||l;this._isValidIndex(i)&&p&&(this._lastDestroyedFocusedChipIndex=i)})}_redirectDestroyedChipFocus(){if(this._lastDestroyedFocusedChipIndex!=null){if(this._chips.length){let e=Math.min(this._lastDestroyedFocusedChipIndex,this._chips.length-1),t=this._chips.toArray()[e];t.disabled?this._chips.length===1?this.focus():this._keyManager.setPreviousItemActive():t.focus()}else this.focus();this._lastDestroyedFocusedChipIndex=null}}static \u0275fac=function(t){return new(t||n)};static \u0275cmp=D({type:n,selectors:[["mat-chip-set"]],contentQueries:function(t,i,r){if(t&1&&Ke(r,Xi,5),t&2){let l;z(l=B())&&(i._chips=l)}},hostAttrs:[1,"mat-mdc-chip-set","mdc-evolution-chip-set"],hostVars:1,hostBindings:function(t,i){t&1&&f("keydown",function(l){return i._handleKeydown(l)}),t&2&&re("role",i.role)},inputs:{disabled:[2,"disabled","disabled",L],role:"role",tabIndex:[2,"tabIndex","tabIndex",e=>e==null?0:bi(e)]},ngContentSelectors:Ao,decls:2,vars:0,consts:[["role","presentation",1,"mdc-evolution-chip-set__chips"]],template:function(t,i){t&1&&(ue(),G(0,"div",0),ne(1),$())},styles:[`.mat-mdc-chip-set {
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
`],encapsulation:2,changeDetection:0})}return n})(),Zi=class{source;value;constructor(o,e){this.source=o,this.value=e}},Sr={provide:Bt,useExisting:at(()=>nn),multi:!0},nn=(()=>{class n extends kr{_onTouched=()=>{};_onChange=()=>{};_defaultRole="listbox";_defaultOptions=m(Ji,{optional:!0});get multiple(){return this._multiple}set multiple(e){this._multiple=e,this._syncListboxProperties()}_multiple=!1;get selected(){let e=this._chips.toArray().filter(t=>t.selected);return this.multiple?e:e[0]}ariaOrientation="horizontal";get selectable(){return this._selectable}set selectable(e){this._selectable=e,this._syncListboxProperties()}_selectable=!0;compareWith=(e,t)=>e===t;required=!1;get hideSingleSelectionIndicator(){return this._hideSingleSelectionIndicator}set hideSingleSelectionIndicator(e){this._hideSingleSelectionIndicator=e,this._syncListboxProperties()}_hideSingleSelectionIndicator=this._defaultOptions?.hideSingleSelectionIndicator??!1;get chipSelectionChanges(){return this._getChipStream(e=>e.selectionChange)}get chipBlurChanges(){return this._getChipStream(e=>e._onBlur)}get value(){return this._value}set value(e){this._chips&&this._chips.length&&this._setSelectionByValue(e,!1),this._value=e}_value;change=new U;_chips=void 0;ngAfterContentInit(){this._chips.changes.pipe(be(null),le(this._destroyed)).subscribe(()=>{this.value!==void 0&&Promise.resolve().then(()=>{this._setSelectionByValue(this.value,!1)}),this._syncListboxProperties()}),this.chipBlurChanges.pipe(le(this._destroyed)).subscribe(()=>this._blur()),this.chipSelectionChanges.pipe(le(this._destroyed)).subscribe(e=>{this.multiple||this._chips.forEach(t=>{t!==e.source&&t._setSelectedState(!1,!1,!1)}),e.isUserInput&&this._propagateChanges()})}focus(){if(this.disabled)return;let e=this._getFirstSelectedChip();e&&!e.disabled?e.focus():this._chips.length>0?this._keyManager.setFirstItemActive():this._elementRef.nativeElement.focus()}writeValue(e){e!=null?this.value=e:this.value=void 0}registerOnChange(e){this._onChange=e}registerOnTouched(e){this._onTouched=e}setDisabledState(e){this.disabled=e}_setSelectionByValue(e,t=!0){this._clearSelection(),Array.isArray(e)?e.forEach(i=>this._selectValue(i,t)):this._selectValue(e,t)}_blur(){this.disabled||setTimeout(()=>{this.focused||this._markAsTouched()})}_keydown(e){e.keyCode===9&&super._allowFocusEscape()}_markAsTouched(){this._onTouched(),this._changeDetectorRef.markForCheck()}_propagateChanges(){let e=null;Array.isArray(this.selected)?e=this.selected.map(t=>t.value):e=this.selected?this.selected.value:void 0,this._value=e,this.change.emit(new Zi(this,e)),this._onChange(e),this._changeDetectorRef.markForCheck()}_clearSelection(e){this._chips.forEach(t=>{t!==e&&t.deselect()})}_selectValue(e,t){let i=this._chips.find(r=>r.value!=null&&this.compareWith(r.value,e));return i&&(t?i.selectViaInteraction():i.select()),i}_syncListboxProperties(){this._chips&&Promise.resolve().then(()=>{this._chips.forEach(e=>{e._chipListMultiple=this.multiple,e.chipListSelectable=this._selectable,e._chipListHideSingleSelectionIndicator=this.hideSingleSelectionIndicator,e._changeDetectorRef.markForCheck()})})}_getFirstSelectedChip(){return Array.isArray(this.selected)?this.selected.length?this.selected[0]:void 0:this.selected}_skipPredicate(e){return!1}static \u0275fac=(()=>{let e;return function(i){return(e||(e=Ve(n)))(i||n)}})();static \u0275cmp=D({type:n,selectors:[["mat-chip-listbox"]],contentQueries:function(t,i,r){if(t&1&&Ke(r,tn,5),t&2){let l;z(l=B())&&(i._chips=l)}},hostAttrs:[1,"mdc-evolution-chip-set","mat-mdc-chip-listbox"],hostVars:10,hostBindings:function(t,i){t&1&&f("focus",function(){return i.focus()})("blur",function(){return i._blur()})("keydown",function(l){return i._keydown(l)}),t&2&&(De("tabIndex",i.disabled||i.empty?-1:i.tabIndex),re("role",i.role)("aria-required",i.role?i.required:null)("aria-disabled",i.disabled.toString())("aria-multiselectable",i.multiple)("aria-orientation",i.ariaOrientation),S("mat-mdc-chip-list-disabled",i.disabled)("mat-mdc-chip-list-required",i.required))},inputs:{multiple:[2,"multiple","multiple",L],ariaOrientation:[0,"aria-orientation","ariaOrientation"],selectable:[2,"selectable","selectable",L],compareWith:"compareWith",required:[2,"required","required",L],hideSingleSelectionIndicator:[2,"hideSingleSelectionIndicator","hideSingleSelectionIndicator",L],value:"value"},outputs:{change:"change"},features:[ye([Sr]),Ge],ngContentSelectors:Ao,decls:2,vars:0,consts:[["role","presentation",1,"mdc-evolution-chip-set__chips"]],template:function(t,i){t&1&&(ue(),G(0,"div",0),ne(1),$())},styles:[wr],encapsulation:2,changeDetection:0})}return n})();var Vo=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275mod=Y({type:n});static \u0275inj=W({providers:[Oo,{provide:Ji,useValue:{separatorKeyCodes:[13]}}],imports:[mi,ie]})}return n})();var zo=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275mod=Y({type:n});static \u0275inj=W({imports:[ie]})}return n})();var Tr=(n,o)=>o._id,rt=(n,o)=>o.id;function Pr(n,o){n&1&&(a(0,"span",16),c(1,"El t\xEDtulo es obligatorio"),s())}function Dr(n,o){n&1&&(a(0,"span",16),c(1,"Email inv\xE1lido u obligatorio"),s())}function Ir(n,o){if(n&1&&(a(0,"mat-option",20),c(1),s()),n&2){let e=o.$implicit;M("value",e.name),d(),E(e.name)}}function Rr(n,o){n&1&&(a(0,"span",16),c(1,"Selecciona una instituci\xF3n"),s())}function Fr(n,o){if(n&1){let e=I();a(0,"button",37),f("click",function(){let i=g(e).$implicit,r=h(2);return v(r.setPriority(i.name))}),c(1),s()}if(n&2){let e=o.$implicit,t=h(2);S("active",t.selectedPriority()===e.name),M("ngClass",t.getPriorityChipClass(e.name)),d(),Qe(" ",t.getPriorityEmoji(e.name)," ",e.name," ")}}function Ar(n,o){n&1&&(a(0,"span",16),c(1,"La descripci\xF3n es obligatoria"),s())}function Lr(n,o){if(n&1){let e=I();a(0,"mat-chip-option",38),f("selectionChange",function(i){let r=g(e).$implicit,l=h(2);return v(l.toggleTag(r.id,i.selected))}),c(1),s()}if(n&2){let e=o.$implicit,t=h(2);M("selected",t.selectedTags().includes(e.id)),d(),j(" ",e.name," ")}}function Nr(n,o){n&1&&(a(0,"span",28),c(1,"Debes seleccionar al menos 1 etiqueta"),s())}function Vr(n,o){n&1&&(a(0,"span",28),c(1,"M\xE1ximo 5 etiquetas permitidas"),s())}function zr(n,o){n&1&&(a(0,"p"),c(1,"Arrastr\xE1 archivos o hac\xE9 click para adjuntar"),s())}function Br(n,o){if(n&1&&(a(0,"p",33),c(1),s()),n&2){let e=h(2);d(),Qe(" ",e.attachments().length," archivo(s) seleccionado(s): ",e.attachments().join(", ")," ")}}function jr(n,o){n&1&&c(0," Cargando... ")}function Hr(n,o){n&1&&c(0," Enviar ticket \u2192 ")}function Ur(n,o){if(n&1){let e=I();a(0,"div",3)(1,"h2"),c(2,"Nuevo Ticket de Soporte"),s(),a(3,"p",7),c(4,"Los campos marcados con * son obligatorios"),s(),T(5,"div",8),a(6,"form",9),f("submit",function(i){g(e);let r=h();return v(r.onSubmit(i))}),a(7,"div",10)(8,"div",11)(9,"div",12)(10,"label"),c(11,"T\xEDtulo del error o solicitud *"),s(),a(12,"div",13)(13,"span",14),c(14,"title"),s(),T(15,"input",15),s(),b(16,Pr,2,0,"span",16),s(),a(17,"div",12)(18,"label"),c(19,"Email institucional *"),s(),a(20,"div",13)(21,"span",14),c(22,"email"),s(),T(23,"input",17),s(),b(24,Dr,2,0,"span",16),s(),a(25,"div",12)(26,"label"),c(27,"Instituci\xF3n *"),s(),a(28,"div",13)(29,"span",14),c(30,"search"),s(),a(31,"input",18),f("input",function(i){g(e);let r=h();return v(r.onInstitutionInput(i))}),s(),a(32,"mat-autocomplete",19,0),f("optionSelected",function(i){g(e);let r=h();return v(r.onInstitutionSelect(i.option.value))}),ae(34,Ir,2,2,"mat-option",20,Tr),s()(),b(36,Rr,2,0,"span",16),s(),a(37,"div",12)(38,"label"),c(39,"Prioridad *"),s(),a(40,"div",21),ae(41,Fr,2,5,"button",22,rt),s()()(),a(43,"div",11)(44,"div",12)(45,"label"),c(46,"Descripci\xF3n del error o solicitud *"),s(),T(47,"textarea",23),b(48,Ar,2,0,"span",16),s(),a(49,"div",12)(50,"div",24)(51,"label"),c(52,"Etiquetas"),s(),a(53,"span",25),c(54,"info"),s()(),a(55,"mat-chip-listbox",26),ae(56,Lr,2,2,"mat-chip-option",27,rt),s(),b(58,Nr,2,0,"span",28)(59,Vr,2,0,"span",28),s()()(),a(60,"div",29)(61,"label"),c(62,"Adjuntar archivos"),s(),a(63,"div",30),f("dragover",function(i){g(e);let r=h();return v(r.onDragOver(i))})("dragleave",function(){g(e);let i=h();return v(i.onDragLeave())})("drop",function(i){g(e);let r=h();return v(r.onDrop(i))})("click",function(){g(e);let i=vi(65);return v(i.click())}),a(64,"input",31,1),f("change",function(i){g(e);let r=h();return v(r.onFileSelected(i))}),s(),a(66,"span",32),c(67,"attachment"),s(),b(68,zr,2,0,"p")(69,Br,2,2,"p",33),s()(),T(70,"div",8),a(71,"div",34)(72,"button",35),f("click",function(){g(e);let i=h();return v(i.onCancel())}),c(73," Cancelar "),s(),a(74,"button",36),b(75,jr,1,0)(76,Hr,1,0),s()()()()}if(n&2){let e=vi(33),t=h();d(6),M("formGroup",t.ticketForm),d(10),y(t.showError("title")?16:-1),d(8),y(t.showError("email")?24:-1),d(7),M("matAutocomplete",e),d(3),se(t.filteredInstitutions()),d(2),y(t.showError("institution")?36:-1),d(5),se(t.priorities()),d(7),y(t.showError("description")?48:-1),d(5),M("title","Las etiquetas son definidas por el administrador del sistema y ayudan a clasificar tu consulta"),d(3),se(t.systemTags()),d(2),y(t.selectedTags().length===0?58:t.selectedTags().length>5?59:-1),d(5),S("drag-over",t.isDragOver()),d(5),y(t.attachments().length===0?68:69),d(4),M("disabled",t.isSubmitting()),d(2),M("disabled",t.isSubmitting()||t.ticketForm.invalid||t.selectedTags().length<1||t.selectedTags().length>5),d(),y(t.isSubmitting()?75:76)}}function Wr(n,o){if(n&1){let e=I();a(0,"button",43),f("click",function(){g(e);let i=h(2);return v(i.setViewMode("create"))}),c(1," + Nuevo ticket "),s()}}function qr(n,o){if(n&1){let e=I();a(0,"div",44)(1,"div",45),f("click",function(){g(e);let i=h(2);return v(i.setStatusFilter("todos"))}),a(2,"span",46),c(3,"Total"),s(),a(4,"span",47),c(5),s()(),a(6,"div",48),f("click",function(){g(e);let i=h(2);return v(i.setStatusFilter("abierto"))}),a(7,"span",46),c(8,"Abiertos"),s(),a(9,"span",47),c(10),s()(),a(11,"div",49),f("click",function(){g(e);let i=h(2);return v(i.setStatusFilter("en_progreso"))}),a(12,"span",46),c(13,"En progreso"),s(),a(14,"span",47),c(15),s()(),a(16,"div",50),f("click",function(){g(e);let i=h(2);return v(i.setStatusFilter("reabierto"))}),a(17,"span",46),c(18,"Reabiertos"),s(),a(19,"span",47),c(20),s()(),a(21,"div",51),f("click",function(){g(e);let i=h(2);return v(i.setStatusFilter("transferido"))}),a(22,"span",46),c(23,"Transferidos"),s(),a(24,"span",47),c(25),s()(),a(26,"div",52),f("click",function(){g(e);let i=h(2);return v(i.setStatusFilter("resuelto"))}),a(27,"span",46),c(28,"Resueltos"),s(),a(29,"span",47),c(30),s()()(),a(31,"div",53)(32,"div",54)(33,"span",55),c(34,"search"),s(),a(35,"input",56),f("input",function(i){g(e);let r=h(2);return v(r.onSearchInput(i))}),s()(),a(36,"span",57),c(37,"filter_alt"),s(),a(38,"div",58)(39,"button",59),f("click",function(){g(e);let i=h(2);return v(i.setStatusFilter("todos"))}),c(40," Todos "),s(),a(41,"button",59),f("click",function(){g(e);let i=h(2);return v(i.setStatusFilter("abierto"))}),c(42," Abierto "),s(),a(43,"button",59),f("click",function(){g(e);let i=h(2);return v(i.setStatusFilter("en_progreso"))}),c(44," En progreso "),s(),a(45,"button",59),f("click",function(){g(e);let i=h(2);return v(i.setStatusFilter("reabierto"))}),c(46," Reabierto "),s(),a(47,"button",59),f("click",function(){g(e);let i=h(2);return v(i.setStatusFilter("transferido"))}),c(48," Transferido "),s(),a(49,"button",59),f("click",function(){g(e);let i=h(2);return v(i.setStatusFilter("resuelto"))}),c(50," Resuelto "),s(),a(51,"button",59),f("click",function(){g(e);let i=h(2);return v(i.setStatusFilter("cerrado"))}),c(52," Cerrado "),s()()()}if(n&2){let e=h(2);d(5),E(e.statsTotal()),d(5),E(e.statsAbiertos()),d(5),E(e.statsProgreso()),d(5),E(e.statsReabiertos()),d(5),E(e.statsTransferidos()),d(5),E(e.statsResueltos()),d(9),S("active",e.selectedStatusFilter()==="todos"),d(2),S("active",e.selectedStatusFilter()==="abierto"),d(2),S("active",e.selectedStatusFilter()==="en_progreso"),d(2),S("active",e.selectedStatusFilter()==="reabierto"),d(2),S("active",e.selectedStatusFilter()==="transferido"),d(2),S("active",e.selectedStatusFilter()==="resuelto"),d(2),S("active",e.selectedStatusFilter()==="cerrado")}}function Yr(n,o){if(n&1&&(a(0,"div",42)(1,"span",60),c(2,"confirmation_number"),s(),a(3,"p"),c(4),s()()),n&2){let e=h(2);d(4),E(e.currentUserRole()==="user"?"A\xFAn no ten\xE9s tickets enviados.":"No se encontraron tickets de soporte.")}}function Gr(n,o){n&1&&(a(0,"span",75),c(1," En progreso "),s())}function $r(n,o){n&1&&(a(0,"span",76),c(1," Cerrado "),s())}function Kr(n,o){n&1&&(a(0,"span",77),c(1,"Nuevo"),s())}function Qr(n,o){if(n&1&&(a(0,"p",79),c(1),s()),n&2){let e=h().$implicit;d(),j(" ",e.description," ")}}function Xr(n,o){if(n&1&&(a(0,"p",79)(1,"strong",85),c(2),s(),c(3),s()),n&2){let e=h().$implicit;d(2),E(e.title),d(),j(" - ",e.description," ")}}function Zr(n,o){if(n&1&&(a(0,"div",80)(1,"span",86),c(2,"assignment_ind"),s(),a(3,"span"),c(4),s()()),n&2){let e=h().$implicit,t=h(3);d(4),j("Asignado a: ",t.getAgentName(e.assigned_to))}}function Jr(n,o){if(n&1&&(a(0,"div",87)(1,"span",86),c(2,"history"),s(),a(3,"span"),c(4),xe(5,"date"),s()()),n&2){let e=h(2).$implicit;d(4),j("Reabierto el ",Ce(5,1,e.reopened_at,"dd/MM/yyyy HH:mm"))}}function ea(n,o){if(n&1&&(a(0,"div",88)(1,"span",86),c(2,"check_circle"),s(),a(3,"span"),c(4),xe(5,"date"),s()()),n&2){let e=h(2).$implicit;d(4),j("Resuelto el ",Ce(5,1,e.resolved_at,"dd/MM/yyyy HH:mm"))}}function ta(n,o){if(n&1&&(a(0,"div",89)(1,"span",86),c(2,"edit_note"),s(),a(3,"span"),c(4),xe(5,"date"),s()()),n&2){let e=h(2).$implicit;d(4),j("Modificado el ",Ce(5,1,e.updated_at||e.created_at,"dd/MM/yyyy HH:mm"))}}function ia(n,o){if(n&1&&(a(0,"div",81),b(1,Jr,6,4,"div",87),b(2,ea,6,4,"div",88),b(3,ta,6,4,"div",89),s()),n&2){let e=h().$implicit;d(),y(e.status==="reabierto"&&e.reopened_at?1:-1),d(),y((e.status==="resuelto"||e.status==="cerrado")&&e.resolved_at?2:-1),d(),y(e.editCount&&e.editCount>=1?3:-1)}}function na(n,o){if(n&1&&(a(0,"span",83),c(1),s()),n&2){let e=o.$implicit;d(),E(e)}}function oa(n,o){n&1&&(a(0,"span",84),c(1," Archivo adjunto "),s())}function ra(n,o){if(n&1){let e=I();a(0,"div",62),f("click",function(){let i=g(e).$implicit,r=h(3);return v(r.onSelectTicket(i))}),a(1,"div",63),c(2),s(),a(3,"div",64)(4,"div",65)(5,"div",66)(6,"span",67),c(7),s(),a(8,"span",68),c(9),s(),a(10,"span",69),c(11,"\u2022"),s(),a(12,"span",70)(13,"span",71),c(14,"\u2022"),s(),a(15,"span"),c(16),s()(),a(17,"span",69),c(18,"\u2022"),s(),a(19,"span",72),c(20),xe(21,"date"),s()(),a(22,"div",73)(23,"span",74),c(24),s(),b(25,Gr,2,0,"span",75),b(26,$r,2,0,"span",76),b(27,Kr,2,0,"span",77),a(28,"span",78),c(29),s()()(),b(30,Qr,2,1,"p",79)(31,Xr,4,2,"p",79),b(32,Zr,5,1,"div",80),b(33,ia,4,3,"div",81),a(34,"div",82),ae(35,na,2,1,"span",83,$e),b(37,oa,2,0,"span",84),s()()()}if(n&2){let e=o.$implicit,t=h(3);d(2),j(" ",t.getTicketUserInitials(e.user_id)," "),d(5),j(" ",t.currentUserRole()==="user"?e.title:t.getTicketUserFirstName(e.user_id)," "),d(2),E(e.institution),d(3),M("ngClass",t.getPriorityClass(e.priority)),d(4),E(e.priority),d(4),E(Ce(21,16,e.created_at,"dd/MM/yyyy HH:mm")),d(3),M("ngClass",e.status),d(),j(" ",t.getStatusLabel(e.status)," "),d(),y(e.status==="transferido"||e.status==="reabierto"?25:-1),d(),y(e.status==="resuelto"||e.status==="cerrado"?26:-1),d(),y(t.currentUserRole()!=="user"&&!t.isTicketRead(e.id)&&e.status!=="resuelto"&&e.status!=="cerrado"?27:-1),d(2),E(t.getElapsedText(e.created_at)),d(),y(t.currentUserRole()==="user"?30:31),d(2),y(t.currentUserRole()!=="user"&&e.assigned_to?32:-1),d(),y(t.currentUserRole()!=="user"?33:-1),d(2),se(e.tags),d(2),y(e.attachments.length>0?37:-1)}}function aa(n,o){if(n&1&&ae(0,ra,38,19,"div",61,rt),n&2){let e=h(2);se(e.ticketsList())}}function sa(n,o){if(n&1&&(a(0,"div",4)(1,"div",39)(2,"h2"),c(3),s(),b(4,Wr,2,0,"button",40),s(),b(5,qr,53,20),T(6,"div",8),a(7,"div",41),b(8,Yr,5,1,"div",42)(9,aa,2,0),s()()),n&2){let e=h();d(3),E(e.currentUserRole()==="user"?"Mis tickets":"Panel de Agente"),d(),y(e.currentUserRole()==="user"?4:-1),d(),y(e.currentUserRole()!=="user"?5:-1),d(3),y(e.ticketsList().length===0?8:9)}}function la(n,o){if(n&1){let e=I();a(0,"button",96),f("click",function(){g(e);let i=h(4);return v(i.onEditStart())}),a(1,"span",60),c(2,"edit"),s(),c(3," Editar "),s()}}function ca(n,o){n&1&&(a(0,"div",95)(1,"span",97),c(2,"info"),s(),c(3," L\xEDmite de 1 edici\xF3n alcanzado "),s())}function da(n,o){if(n&1&&b(0,la,4,0,"button",94)(1,ca,4,0,"div",95),n&2){let e=o,t=h(3);y(t.canEditTicket(e)?0:t.currentUserRole()==="user"&&e.editCount&&e.editCount>=1?1:-1)}}function pa(n,o){if(n&1&&b(0,da,2,1),n&2){let e,t=h(2);y((e=t.selectedTicket())?0:-1,e)}}function ma(n,o){n&1&&(a(0,"span",75),c(1," En progreso "),s())}function ha(n,o){n&1&&(a(0,"span",76),c(1," Cerrado "),s())}function ua(n,o){if(n&1&&(a(0,"div",105)(1,"span",106),c(2,"Asignado a"),s(),a(3,"span",113),c(4),s()()),n&2){let e=h(2),t=h(2);d(4),E(t.getAgentName(e.assigned_to))}}function fa(n,o){if(n&1&&(a(0,"div",105)(1,"span",106),c(2,"Reabierto"),s(),a(3,"span",114),c(4),xe(5,"date"),s()()),n&2){let e=h(2);d(4),E(Ce(5,1,e.reopened_at,"dd/MM/yyyy HH:mm"))}}function _a(n,o){if(n&1&&(a(0,"div",105)(1,"span",106),c(2,"Resuelto/Cerrado"),s(),a(3,"span",115),c(4),xe(5,"date"),s()()),n&2){let e=h(2);d(4),E(Ce(5,1,e.resolved_at,"dd/MM/yyyy HH:mm"))}}function ga(n,o){if(n&1&&(a(0,"div",105)(1,"span",106),c(2,"\xDAltima Edici\xF3n"),s(),a(3,"span",116),c(4),xe(5,"date"),s()()),n&2){let e=h(2);d(4),E(Ce(5,1,e.updated_at||e.created_at,"dd/MM/yyyy HH:mm"))}}function va(n,o){if(n&1){let e=I();a(0,"button",126),f("click",function(){g(e);let i=h(4),r=h(2);return v(r.changeStatusQuick(i.id,"resuelto"))}),a(1,"span",125),c(2,"task_alt"),s(),c(3," Resolver Ticket "),s()}}function ba(n,o){n&1&&(a(0,"div",122)(1,"span",127),c(2,"check_circle"),s(),c(3," Ticket Resuelto y Cerrado "),s())}function ya(n,o){if(n&1){let e=I();a(0,"div",117)(1,"h4"),c(2,"Acciones de Soporte T\xE9cnico"),s(),a(3,"div",119)(4,"div",120),b(5,va,4,0,"button",121)(6,ba,4,0,"div",122),s(),T(7,"div",123),a(8,"div",120)(9,"button",124),f("click",function(){g(e);let i=h(3),r=h(2);return v(r.openTransferModal(i))}),a(10,"span",125),c(11,"swap_horiz"),s(),c(12," Transferir Ticket "),s()()()()}if(n&2){let e=h(3);d(5),y(e.status!=="resuelto"&&e.status!=="cerrado"?5:6)}}function xa(n,o){if(n&1&&(a(0,"div",118)(1,"span",60),c(2,"info"),s(),a(3,"span"),c(4,"Este ticket est\xE1 asignado a "),a(5,"strong"),c(6),s(),c(7,". Solo el agente asignado puede responder o resolver este ticket."),s()()),n&2){let e=h(3),t=h(2);d(6),E(t.getAgentName(e.assigned_to))}}function Ca(n,o){if(n&1&&b(0,ya,13,1,"div",117)(1,xa,8,1,"div",118),n&2){let e=h(2),t=h(2);y(!e.assigned_to||e.assigned_to===t.currentUserId()?0:1)}}function wa(n,o){if(n&1&&(a(0,"div",129)(1,"span",60),c(2,"insert_drive_file"),s(),a(3,"span",130),c(4),s()()),n&2){let e=o.$implicit;d(3),M("title",e),d(),E(e)}}function ka(n,o){if(n&1&&(a(0,"div",112)(1,"h4"),c(2,"Archivos Adjuntos"),s(),a(3,"div",128),ae(4,wa,5,2,"div",129,$e),s()()),n&2){let e=h(2);d(4),se(e.attachments)}}function Sa(n,o){if(n&1&&(a(0,"div",104)(1,"div",105)(2,"span",106),c(3,"Instituci\xF3n"),s(),a(4,"span",107),c(5),s()(),a(6,"div",105)(7,"span",106),c(8,"Prioridad"),s(),a(9,"span",108),c(10),s()(),a(11,"div",105)(12,"span",106),c(13,"Estado"),s(),a(14,"div",109)(15,"span",74),c(16),s(),b(17,ma,2,0,"span",75),b(18,ha,2,0,"span",76),s()(),a(19,"div",105)(20,"span",106),c(21,"Creado"),s(),a(22,"span",107),c(23),xe(24,"date"),s()(),b(25,ua,5,1,"div",105),b(26,fa,6,4,"div",105),b(27,_a,6,4,"div",105),b(28,ga,6,4,"div",105),s(),a(29,"div",110)(30,"h4"),c(31,"Descripci\xF3n del incidente"),s(),a(32,"p",111),c(33),s()(),b(34,Ca,2,1),b(35,ka,6,0,"div",112)),n&2){let e=h(),t=h(2);d(5),E(e.institution),d(4),M("ngClass",t.getPriorityClass(e.priority)),d(),j(" ",e.priority," "),d(5),M("ngClass",e.status),d(),j(" ",t.getStatusLabel(e.status)," "),d(),y(e.status==="transferido"||e.status==="reabierto"?17:-1),d(),y(e.status==="resuelto"||e.status==="cerrado"?18:-1),d(5),E(Ce(24,15,e.created_at,"dd/MM/yyyy HH:mm")),d(2),y(e.assigned_to?25:-1),d(),y(e.status==="reabierto"&&e.reopened_at?26:-1),d(),y((e.status==="resuelto"||e.status==="cerrado")&&e.resolved_at?27:-1),d(),y(e.editCount&&e.editCount>=1?28:-1),d(5),E(e.description),d(),y(t.currentUserRole()!=="user"?34:-1),d(),y(e.attachments.length>0?35:-1)}}function Ma(n,o){if(n&1){let e=I();a(0,"button",37),f("click",function(){let i=g(e).$implicit,r=h(4);return v(r.editPriority=i.name)}),c(1),s()}if(n&2){let e=o.$implicit,t=h(4);S("active",t.editPriority===e.name),M("ngClass",t.getPriorityChipClass(e.name)),d(),Qe(" ",t.getPriorityEmoji(e.name)," ",e.name," ")}}function Ea(n,o){if(n&1){let e=I();a(0,"div",98)(1,"div",12)(2,"label"),c(3,"Prioridad"),s(),a(4,"div",21),ae(5,Ma,2,5,"button",22,rt),s()(),a(7,"div",12)(8,"label"),c(9,"Descripci\xF3n del error o solicitud"),s(),a(10,"textarea",131),_t("ngModelChange",function(i){g(e);let r=h(3);return ft(r.editDescription,i)||(r.editDescription=i),v(i)}),s()(),a(11,"div",132)(12,"button",133),f("click",function(){g(e);let i=h(3);return v(i.onEditCancel())}),c(13,"Cancelar"),s(),a(14,"button",134),f("click",function(){g(e);let i=h(3);return v(i.onEditSave())}),c(15,"Guardar Cambios"),s()()()}if(n&2){let e=h(3);d(5),se(e.priorities()),d(5),ut("ngModel",e.editDescription),d(4),M("disabled",!e.editDescription.trim())}}function Oa(n,o){if(n&1&&(a(0,"div",101)(1,"div",135)(2,"span",136),c(3),s(),a(4,"span",137),c(5),xe(6,"date"),s()(),a(7,"p",138),c(8),s()()),n&2){let e=o.$implicit,t=h(3);M("ngClass",e.role),d(3),j(" ",t.getCommentSender(e)," "),d(2),E(Ce(6,4,e.created_at,"dd/MM/yyyy HH:mm")),d(3),E(e.content)}}function Ta(n,o){if(n&1){let e=I();a(0,"form",139),f("submit",function(i){g(e);let r=h(3);return v(r.onSubmitComment(i))}),a(1,"textarea",140),_t("ngModelChange",function(i){g(e);let r=h(3);return ft(r.newCommentText,i)||(r.newCommentText=i),v(i)}),s(),a(2,"button",141),c(3," Enviar Comentario "),s()()}if(n&2){let e=h(3);d(),ut("ngModel",e.newCommentText),M("placeholder",e.currentUserRole()==="user"?"Escrib\xED un comentario o respuesta para el equipo de soporte...":"Escrib\xED una respuesta o comentario para el usuario..."),d(),M("disabled",!e.newCommentText.trim()||e.isSendingComment())}}function Pa(n,o){n&1&&(a(0,"div",103)(1,"span",142),c(2,"lock"),s(),a(3,"span"),c(4,"Solo el agente asignado puede responder a este ticket."),s()())}function Da(n,o){if(n&1&&(a(0,"div",93),b(1,Sa,36,18)(2,Ea,16,2,"div",98),a(3,"div",99)(4,"h3"),c(5,"Historial de Mensajes y Respuestas"),s(),a(6,"div",100),ae(7,Oa,9,7,"div",101,rt),s(),b(9,Ta,4,3,"form",102)(10,Pa,5,0,"div",103),s()()),n&2){let e=o,t=h(2);d(),y(t.isEditing()?2:1),d(6),se(t.ticketComments()),d(2),y(t.currentUserRole()==="user"||!e.assigned_to||e.assigned_to===t.currentUserId()?9:10)}}function Ia(n,o){if(n&1){let e=I();a(0,"div",5)(1,"div",90)(2,"button",91),f("click",function(){g(e);let i=h();return v(i.setViewMode("list"))}),a(3,"span",60),c(4,"arrow_back"),s(),c(5," Volver "),s(),a(6,"div",92),b(7,pa,1,1),s()(),T(8,"div",8),b(9,Da,11,2,"div",93),s()}if(n&2){let e,t=h();d(7),y(t.isEditing()?-1:7),d(2),y((e=t.selectedTicket())?9:-1,e)}}function Ra(n,o){if(n&1){let e=I();a(0,"button",150),f("click",function(){let i=g(e).$implicit,r=h(2);return v(r.selectedSpecializationFilter.set(i))}),c(1),s()}if(n&2){let e=o.$implicit,t=h(2);S("active",t.selectedSpecializationFilter()===e),d(),j(" ",e," ")}}function Fa(n,o){if(n&1&&(a(0,"div",174)(1,"span",176),c(2,"chat_bubble_outline"),s(),a(3,"span"),c(4),s()()),n&2){let e=h().$implicit;d(4),Qe("",e.active_chats," ",e.active_chats===1?"chat":"chats")}}function Aa(n,o){n&1&&(a(0,"span",175),c(1,"No disponible"),s())}function La(n,o){if(n&1){let e=I();a(0,"div",167),f("click",function(){let i=g(e).$implicit,r=h(2);return v(r.selectAgentForTransfer(i))}),a(1,"div",168),c(2),T(3,"span",169),s(),a(4,"div",170)(5,"span",171),c(6),s(),a(7,"span",172),c(8),s()(),a(9,"div",173),b(10,Fa,5,2,"div",174)(11,Aa,2,0,"span",175),s()()}if(n&2){let e=o.$implicit,t=h(2);S("selected",t.selectedTransferAgentId()===e.id)("disabled",!e.is_active),d(2),j(" ",t.getAgentInitials(e)," "),d(),S("online",e.is_active),d(3),Qe("",e.first_name," ",e.last_name),d(2),E(e.specialization),d(2),y(e.is_active?10:11)}}function Na(n,o){n&1&&(a(0,"div",158),c(1," No se encontraron agentes que coincidan con los filtros. "),s())}function Va(n,o){if(n&1&&(c(0," Transferir a: "),a(1,"strong"),c(2),s()),n&2){let e=h(2);d(2),E(e.getSelectedAgentName())}}function za(n,o){n&1&&c(0," Selecciona un agente disponible ")}function Ba(n,o){if(n&1){let e=I();a(0,"div",6)(1,"div",143)(2,"div",144)(3,"h3"),c(4,"Transferir ticket"),s(),a(5,"button",145),f("click",function(){g(e);let i=h();return v(i.closeTransferModal())}),a(6,"span",60),c(7,"close"),s()()(),a(8,"p",146),c(9,"Seleccion\xE1 el agente destino y el motivo"),s(),a(10,"div",147)(11,"span",55),c(12,"search"),s(),a(13,"input",148),f("ngModelChange",function(i){g(e);let r=h();return v(r.transferSearchQuery.set(i))}),s()(),a(14,"div",149)(15,"button",150),f("click",function(){g(e);let i=h();return v(i.selectedSpecializationFilter.set("Todos"))}),c(16," Todos "),s(),ae(17,Ra,2,3,"button",151,$e),s(),a(19,"div",152)(20,"button",153),f("click",function(){g(e);let i=h();return v(i.onlineStatusFilter.set("online"))}),T(21,"span",154),c(22," En l\xEDnea "),s(),a(23,"button",153),f("click",function(){g(e);let i=h();return v(i.onlineStatusFilter.set("offline"))}),T(24,"span",155),c(25," Fuera de l\xEDnea "),s()(),a(26,"div",156),ae(27,La,12,11,"div",157,rt,!1,Na,2,0,"div",158),s(),a(30,"div",159)(31,"label",160),c(32,"Motivo de la transferencia (Obligatorio)"),s(),a(33,"textarea",161),f("ngModelChange",function(i){g(e);let r=h();return v(r.transferReason.set(i))}),s()(),a(34,"div",162)(35,"span",163),b(36,Va,3,1)(37,za,1,0),s(),a(38,"div",164)(39,"button",165),f("click",function(){g(e);let i=h();return v(i.closeTransferModal())}),c(40," Cancelar "),s(),a(41,"button",166),f("click",function(){g(e);let i=h();return v(i.confirmTransfer())}),a(42,"span",60),c(43,"trending_flat"),s(),c(44," Transferir "),s()()()()()}if(n&2){let e=h();d(13),M("ngModel",e.transferSearchQuery()),d(2),S("active",e.selectedSpecializationFilter()==="Todos"),d(2),se(e.availableSpecializations()),d(3),S("active",e.onlineStatusFilter()==="online"),d(3),S("active",e.onlineStatusFilter()==="offline"),d(4),se(e.filteredAgentsForTransfer()),d(6),M("ngModel",e.transferReason()),d(3),y(e.selectedTransferAgentId()?36:37),d(5),M("disabled",e.isTransferDisabled())}}var Bo=(()=>{class n{ticketService=m(Gt);authService=m(Ze);fb=m(Sn);destroyRef=m(gi);http=m(Xe);readTicketIds=w([]);selectedStatusFilter=w("todos");searchQuery=w("");systemTags=w([]);showTransferModal=w(!1);ticketToTransfer=w(null);transferSearchQuery=w("");selectedSpecializationFilter=w("Todos");onlineStatusFilter=w("todos");selectedTransferAgentId=w("");transferReason=w("");availableSpecializations=F(()=>{let e=this.systemTags().map(l=>l.name),t=e.some(l=>l.toLowerCase()==="acceso"),i=e.some(l=>l.toLowerCase()==="autenticaci\xF3n"||l.toLowerCase()==="autenticacion"),r=e.filter(l=>l.toLowerCase()!=="acceso"&&l.toLowerCase()!=="autenticaci\xF3n"&&l.toLowerCase()!=="autenticacion");return(t||i)&&(r=["Acceso y Autenticaci\xF3n",...r]),r});filteredAgentsForTransfer=F(()=>{let e=this.transferSearchQuery().toLowerCase().trim(),t=this.selectedSpecializationFilter(),i=this.onlineStatusFilter();return this.agentsList().filter(r=>{let l=`${r.first_name} ${r.last_name}`.toLowerCase(),p=(r.specialization||"").toLowerCase(),u=!e||l.includes(e)||p.includes(e),x=!0;t!=="Todos"&&(t==="Acceso y Autenticaci\xF3n"?x=r.specialization==="Acceso"||r.specialization==="Autenticaci\xF3n"||r.specialization==="Acceso y Autenticaci\xF3n":x=r.specialization===t);let _=!0;return i==="online"?_=r.is_active===!0:i==="offline"&&(_=r.is_active===!1),u&&x&&_})});isTransferDisabled=F(()=>{let e=this.selectedTransferAgentId(),t=this.transferReason().trim();if(!e||t.length<4)return!0;let i=this.agentsList().find(r=>r.id===e);return!i||!i.is_active});statsTotal=F(()=>this.ticketService.tickets().length);statsAbiertos=F(()=>this.ticketService.tickets().filter(e=>e.status==="abierto").length);statsProgreso=F(()=>this.ticketService.tickets().filter(e=>e.status==="en_progreso").length);statsReabiertos=F(()=>this.ticketService.tickets().filter(e=>e.status==="reabierto").length);statsTransferidos=F(()=>this.ticketService.tickets().filter(e=>e.status==="transferido").length);statsResueltos=F(()=>this.ticketService.tickets().filter(e=>e.status==="resuelto").length);set viewMode(e){this.innerViewMode.set(e)}viewModeChange=new U;ticketSelected=new U;innerViewMode=w("create");selectedTicket=w(null);currentUserRole=F(()=>this.authService.currentUser()?.role||"");currentUserId=F(()=>this.authService.currentUser()?.id||"");ticketForm;isSubmitting=w(!1);isDragOver=w(!1);institutions=w([]);institutionQuery=w("");filteredInstitutions=F(()=>{let e=this.institutionQuery().toLowerCase(),t=this.institutions();return e?t.filter(i=>i.name.toLowerCase().includes(e)):t});selectedPriority=w("Media");priorities=w([]);availableTags=["Acceso","Turnos","Historia Cl\xEDnica","Facturaci\xF3n","Otro"];selectedTags=w([]);attachments=w([]);ticketsList=F(()=>{let e=this.ticketService.tickets(),t=this.currentUserRole(),i=this.searchQuery().toLowerCase().trim(),r=this.selectedStatusFilter(),l=this.authService.currentUser()?.id||"",p=e;return t==="user"?i&&(p=p.filter(u=>u.title.toLowerCase().includes(i)||u.description.toLowerCase().includes(i)||u.institution.toLowerCase().includes(i))):(r==="abierto"?p=p.filter(u=>u.status==="abierto"&&!u.assigned_to):r==="en_progreso"?p=p.filter(u=>u.assigned_to===l&&u.status==="en_progreso"):r==="reabierto"?p=p.filter(u=>u.assigned_to===l&&u.status==="reabierto"):r==="transferido"?p=p.filter(u=>u.assigned_to===l&&u.status==="transferido"):r==="resuelto"?p=p.filter(u=>u.assigned_to===l&&u.status==="resuelto"):r==="cerrado"&&(p=p.filter(u=>u.assigned_to===l&&u.status==="cerrado")),i&&(p=p.filter(u=>u.title.toLowerCase().includes(i)||u.description.toLowerCase().includes(i)||u.institution.toLowerCase().includes(i)||u.user_id.toLowerCase().includes(i)))),[...p].sort((u,x)=>{let _=N=>{if(t!=="user"&&!this.isTicketRead(N.id)&&N.status!=="resuelto"&&N.status!=="cerrado")return 1;switch(N.status){case"abierto":return 2;case"reabierto":return 3;case"en_progreso":case"transferido":return 4;case"resuelto":case"cerrado":return 5;default:return 6}},C=_(u),Q=_(x);if(C!==Q)return C-Q;let X=u.updated_at?new Date(u.updated_at).getTime():new Date(u.created_at).getTime();return(x.updated_at?new Date(x.updated_at).getTime():new Date(x.created_at).getTime())-X})});initReadTickets(){try{let e=localStorage.getItem("read_ticket_ids");e&&this.readTicketIds.set(JSON.parse(e))}catch(e){console.error("Error reading read_ticket_ids:",e)}}isTicketRead(e){return this.readTicketIds().includes(e)}markTicketAsRead(e){if(!this.readTicketIds().includes(e)){let t=[...this.readTicketIds(),e];this.readTicketIds.set(t);try{localStorage.setItem("read_ticket_ids",JSON.stringify(t))}catch(i){console.error("Error saving read_ticket_ids:",i)}}}isEditing=w(!1);editDescription="";editPriority="Media";newCommentText="";isSendingComment=w(!1);ticketComments=F(()=>{let e=this.selectedTicket();return e?e.messages||[]:[]});agentsList=w([]);constructor(){this.initForm(),this.initReadTickets(),ce(()=>{let e=this.authService.currentUser();e&&this.ticketForm.patchValue({email:e.username.includes("@")?e.username:`${e.username}@salud.larioja.gob.ar`})}),ce(()=>{this.currentUserRole()&&this.agentsList().length===0&&this.ticketService.getAgents().subscribe({next:t=>this.agentsList.set(t),error:t=>console.error("Error loading agents:",t)})})}ngOnInit(){this.loadInstitutions(),this.loadPriorities(),this.loadTags();let e=this.authService.currentUser();e&&this.ticketService.loadTicketsForUser(e.username)}loadInstitutions(){let e=localStorage.getItem("hsi_token"),t=new gt().set("Authorization",`Bearer ${e}`);this.http.get("/api/institutions",{headers:t}).subscribe({next:i=>{this.institutions.set(i)},error:i=>{console.error("Error al cargar las instituciones desde la BD:",i)}})}loadPriorities(){let e=localStorage.getItem("hsi_token"),t=new gt().set("Authorization",`Bearer ${e}`);this.http.get("/api/priorities",{headers:t}).subscribe({next:i=>{this.priorities.set(i)},error:i=>{console.error("Error al cargar las prioridades desde la BD:",i)}})}getPriorityClass(e){if(!e)return"media";let t=e.toLowerCase();return t.includes("baja")?"baja":t.includes("media")?"media":t.includes("alta")?"alta":t.includes("crit")||t.includes("cr\xEDt")?"critica":"baja"}getPriorityChipClass(e){if(!e)return"medium";let t=e.toLowerCase();return t.includes("baja")?"low":t.includes("media")?"medium":t.includes("alta")?"high":t.includes("crit")||t.includes("cr\xEDt")?"critica":"low"}getPriorityEmoji(e){if(!e)return"\u{1F7E2}";let t=e.toLowerCase();return t.includes("baja")?"\u{1F7E2}":t.includes("media")?"\u{1F7E1}":t.includes("alta")?"\u{1F7E0}":t.includes("crit")||t.includes("cr\xEDt")?"\u{1F534}":"\u{1F7E2}"}initForm(){this.ticketForm=this.fb.group({title:["",je.required],email:["",[je.required,je.email]],institution:["",je.required],description:["",je.required]})}setViewMode(e){this.innerViewMode.set(e),this.viewModeChange.emit(e),e!=="detail"&&this.isEditing.set(!1)}showError(e){let t=this.ticketForm.get(e);return!!(t&&t.invalid&&(t.dirty||t.touched))}onInstitutionInput(e){let t=e.target.value;this.institutionQuery.set(t)}onInstitutionSelect(e){this.ticketForm.patchValue({institution:e}),this.institutionQuery.set(e)}setPriority(e){this.selectedPriority.set(e)}toggleTag(e,t){let i=this.selectedTags();t?this.selectedTags.set([...i,e]):this.selectedTags.set(i.filter(r=>r!==e))}onFileSelected(e){let t=e.target.files;t&&this.processFiles(t)}onDragOver(e){e.preventDefault(),this.isDragOver.set(!0)}onDragLeave(){this.isDragOver.set(!1)}onDrop(e){e.preventDefault(),this.isDragOver.set(!1);let t=e.dataTransfer?.files;t&&this.processFiles(t)}processFiles(e){let t=[];for(let i=0;i<e.length;i++)t.push(e[i].name);this.attachments.set([...this.attachments(),...t])}resetForm(){this.ticketForm.reset();let e=this.authService.currentUser();e&&this.ticketForm.patchValue({email:e.username.includes("@")?e.username:`${e.username}@salud.larioja.gob.ar`}),this.institutionQuery.set("")}onCancel(){this.resetForm(),this.selectedTags.set([]),this.attachments.set([]),this.selectedPriority.set("Media"),this.setViewMode("list")}onSubmit(e){if(e.preventDefault(),this.ticketForm.invalid||this.selectedTags().length<1||this.selectedTags().length>5)return;this.isSubmitting.set(!0);let t=this.ticketForm.value;this.ticketService.createTicket(t.email,t.institution,this.selectedPriority(),t.title,t.description,this.selectedTags(),this.attachments()).subscribe({next:i=>{this.isSubmitting.set(!1),this.resetForm(),this.selectedTags.set([]),this.attachments.set([]),this.selectedPriority.set("Media"),this.setViewMode("list")},error:()=>{this.isSubmitting.set(!1),this.setViewMode("list")}})}onSelectTicket(e){this.currentUserRole()!=="user"&&this.markTicketAsRead(e.id),this.ticketService.getTicketDetails(e.id).subscribe({next:t=>{this.selectedTicket.set(t),this.setViewMode("detail"),this.ticketSelected.emit(t)},error:t=>{console.error("Error fetching ticket details:",t),this.selectedTicket.set(e),this.setViewMode("detail"),this.ticketSelected.emit(e)}})}onDeleteTicket(e){confirm("\xBFEst\xE1s seguro de que deseas eliminar este ticket de forma permanente?")&&this.ticketService.deleteTicket(e).subscribe(()=>{this.selectedTicket.set(null),this.setViewMode("list")})}canEditTicket(e){let t=this.authService.currentUser();return!t||t.role!=="user"||e.status!=="abierto"?!1:!e.editCount||e.editCount<1}onEditStart(){let e=this.selectedTicket();e&&(this.editDescription=e.description,this.editPriority=e.priority,this.isEditing.set(!0))}onEditCancel(){this.isEditing.set(!1)}onEditSave(){let e=this.selectedTicket();e&&this.ticketService.updateTicket(e.id,this.editDescription,this.editPriority,!0).subscribe(()=>{let t=this.ticketsList().find(i=>i.id===e.id);t?this.selectedTicket.set(t):(e.description=this.editDescription,e.priority=this.editPriority,e.editCount=(e.editCount||0)+1,e.updated_at=new Date),this.isEditing.set(!1)})}onSubmitComment(e){if(e.preventDefault(),this.isSendingComment())return;let t=this.selectedTicket(),i=this.newCommentText.trim();!t||!i||(this.isSendingComment.set(!0),this.ticketService.addComment(t.id,i).subscribe({next:()=>{this.newCommentText="",this.ticketService.getTicketDetails(t.id).subscribe({next:r=>{let l=H(k({},r),{created_at:new Date(r.created_at),updated_at:new Date(r.updated_at),closed_at:r.closed_at?new Date(r.closed_at):void 0,resolved_at:r.resolved_at?new Date(r.resolved_at):void 0,reopened_at:r.reopened_at?new Date(r.reopened_at):void 0,messages:r.messages?r.messages.map(p=>H(k({},p),{created_at:new Date(p.created_at)})):[]});this.selectedTicket.set(l),this.isSendingComment.set(!1)},error:()=>{this.isSendingComment.set(!1)}})},error:r=>{console.error("Error adding comment:",r),this.isSendingComment.set(!1)}}))}getTicketUserInitials(e){return e?e.split("@")[0].substring(0,1).toUpperCase():"U"}formatDisplayName(e){return e?e.split("@")[0].replace(/[._-]/g," ").split(/\s+/).map(r=>r.charAt(0).toUpperCase()+r.slice(1).toLowerCase()).join(" "):""}getTicketUserFirstName(e){return e?this.formatDisplayName(e):"Usuario"}getCommentSender(e){return e.role==="bot"?"Asistente Virtual":this.formatDisplayName(e.sender_id)}getUserInitials(){let e=this.authService.currentUser();return e?e.username.split("@")[0].substring(0,2).toUpperCase():"U"}getFirstName(){let e=this.authService.currentUser();return e?e.username.split("@")[0]:"Usuario"}getStatusLabel(e){return e==="en_progreso"?"En progreso":e}getElapsedText(e){let t=Math.floor((Date.now()-e.getTime())/1e3),i=t/31536e3;return i>1?Math.floor(i)+"a":(i=t/2592e3,i>1?Math.floor(i)+"m":(i=t/86400,i>1?Math.floor(i)+"d":(i=t/3600,i>1?Math.floor(i)+"h":(i=t/60,i>1?Math.floor(i)+"min":"1m"))))}onStatusChange(e,t){let r=t.target.value;r&&this.ticketService.updateTicketStatus(e,r).subscribe({next:l=>{let p=H(k({},l),{created_at:new Date(l.created_at),updated_at:new Date(l.updated_at),messages:l.messages?l.messages.map(u=>H(k({},u),{created_at:new Date(u.created_at)})):[]});this.selectedTicket.set(p)},error:l=>{console.error("Error changing ticket status:",l)}})}onAssignChange(e,t){let r=t.target.value;r&&this.ticketService.assignTicket(e,r).subscribe({next:l=>{let p=H(k({},l),{created_at:new Date(l.created_at),updated_at:new Date(l.updated_at),messages:l.messages?l.messages.map(u=>H(k({},u),{created_at:new Date(u.created_at)})):[]});this.selectedTicket.set(p)},error:l=>{console.error("Error reassigning ticket:",l)}})}changeStatusQuick(e,t){this.ticketService.updateTicketStatus(e,t).subscribe({next:i=>{let r=H(k({},i),{created_at:new Date(i.created_at),updated_at:new Date(i.updated_at),closed_at:i.closed_at?new Date(i.closed_at):void 0,resolved_at:i.resolved_at?new Date(i.resolved_at):void 0,reopened_at:i.reopened_at?new Date(i.reopened_at):void 0,messages:i.messages?i.messages.map(l=>H(k({},l),{created_at:new Date(l.created_at)})):[]});this.selectedTicket.set(r)},error:i=>{console.error("Error changing ticket status:",i)}})}getAgentName(e){let t=this.agentsList().find(i=>i.id===e);return t?this.formatDisplayName(`${t.first_name} ${t.last_name}`):this.formatDisplayName(e)}setStatusFilter(e){this.selectedStatusFilter.set(e)}onSearchInput(e){let t=e.target.value;this.searchQuery.set(t)}loadTags(){this.ticketService.getTags().subscribe({next:e=>{e&&e.length>0?this.systemTags.set(e):this.setMockSystemTags()},error:e=>{console.error("Error loading tags from backend:",e),this.setMockSystemTags()}})}setMockSystemTags(){this.systemTags.set([{id:"6a4bb000a9ad10c7c59df8a3",name:"Acceso"},{id:"6a4bb000a9ad10c7c59df8a4",name:"Autenticaci\xF3n"},{id:"6a4bb000a9ad10c7c59df8a5",name:"Historia cl\xEDnica"},{id:"6a4bb000a9ad10c7c59df8a6",name:"Odontolog\xEDa"},{id:"6a4bb000a9ad10c7c59df8a7",name:"Snomed CT"},{id:"6a4bb000a9ad10c7c59df8a8",name:"Administraci\xF3n"},{id:"6a4bb000a9ad10c7c59df8a9",name:"Facturacion"},{id:"6a4bb000a9ad10c7c59df8aa",name:"Turnos"}])}openTransferModal(e){this.ticketToTransfer.set(e),this.selectedTransferAgentId.set(""),this.transferReason.set(""),this.transferSearchQuery.set(""),this.selectedSpecializationFilter.set("Todos"),this.onlineStatusFilter.set("todos"),this.showTransferModal.set(!0)}closeTransferModal(){this.showTransferModal.set(!1),this.ticketToTransfer.set(null)}selectAgentForTransfer(e){e.is_active&&this.selectedTransferAgentId.set(e.id)}getSelectedAgentName(){let e=this.agentsList().find(t=>t.id===this.selectedTransferAgentId());return e?`${e.first_name} ${e.last_name}`:""}getAgentInitials(e){let t=e.first_name||"",i=e.last_name||"";return(t.charAt(0)+i.charAt(0)).toUpperCase()||e.username.charAt(0).toUpperCase()}confirmTransfer(){let e=this.ticketToTransfer()?.id,t=this.selectedTransferAgentId(),i=this.transferReason().trim();!e||!t||i.length<4||this.ticketService.assignTicket(e,t,i).subscribe({next:r=>{let l=H(k({},r),{created_at:new Date(r.created_at),updated_at:new Date(r.updated_at),messages:r.messages?r.messages.map(p=>H(k({},p),{created_at:new Date(p.created_at)})):[]});this.selectedTicket.set(l),this.closeTransferModal()},error:r=>{console.error("Error transferring ticket:",r)}})}static \u0275fac=function(t){return new(t||n)};static \u0275cmp=D({type:n,selectors:[["app-tickets-tab"]],inputs:{viewMode:"viewMode"},outputs:{viewModeChange:"viewModeChange",ticketSelected:"ticketSelected"},decls:5,vars:2,consts:[["auto","matAutocomplete"],["fileInput",""],[1,"tickets-container"],[1,"ticket-form-card"],[1,"ticket-history-card"],[1,"ticket-detail-card"],[1,"transfer-modal-overlay"],[1,"subtitle"],[1,"separator"],[3,"submit","formGroup"],[1,"form-columns"],[1,"form-col"],[1,"form-group"],[1,"input-container"],[1,"material-icons","input-icon"],["type","text","formControlName","title","placeholder","Ej: Error al firmar documento / cargar Historia Cl\xEDnica"],[1,"error-text"],["type","email","formControlName","email","placeholder","usuario@salud.larioja.gob.ar"],["type","text","formControlName","institution","placeholder","Busc\xE1 tu instituci\xF3n...",3,"input","matAutocomplete"],[3,"optionSelected"],[3,"value"],[1,"priority-chips-row"],["type","button",1,"priority-chip",3,"ngClass","active"],["formControlName","description","placeholder","Describ\xED el error o solicitud con el mayor detalle posible. Pod\xE9s incluir pasos para reproducirlo, mensaje de error exacto, etc."],[1,"label-with-tooltip"],[1,"material-icons","info-icon",3,"title"],["multiple","",1,"tags-chip-list"],[3,"selected"],[1,"error-text",2,"display","block","margin-top","4px"],[1,"form-group","full-width"],[1,"drag-drop-zone",3,"dragover","dragleave","drop","click"],["type","file","multiple","",2,"display","none",3,"change"],[1,"material-icons","clip-icon"],[1,"attachments-list"],[1,"form-actions"],["type","button",1,"cancel-btn",3,"click","disabled"],["type","submit",1,"send-btn",3,"disabled"],["type","button",1,"priority-chip",3,"click","ngClass"],[3,"selectionChange","selected"],[1,"history-header"],[1,"new-ticket-btn"],[1,"tickets-list"],[1,"empty-state"],[1,"new-ticket-btn",3,"click"],[1,"agent-stats-row"],[1,"stat-card","total",2,"cursor","pointer",3,"click"],[1,"stat-label"],[1,"stat-value"],[1,"stat-card","abiertos",2,"cursor","pointer",3,"click"],[1,"stat-card","progreso",2,"cursor","pointer",3,"click"],[1,"stat-card","reabiertos",2,"cursor","pointer",3,"click"],[1,"stat-card","transferidos",2,"cursor","pointer",3,"click"],[1,"stat-card","resueltos",2,"cursor","pointer",3,"click"],[1,"agent-tabs-container"],[1,"agent-search-bar"],[1,"material-icons","search-icon"],["type","text","placeholder","Buscar por usuario, instituci\xF3n o ID...",3,"input"],[1,"material-icons",2,"color","#90A4AE","font-size","20px","flex-shrink","0","margin-left","4px"],[1,"agent-tabs"],[1,"agent-tab-btn",3,"click"],[1,"material-icons"],[1,"ticket-item"],[1,"ticket-item",3,"click"],[1,"item-avatar"],[1,"item-content"],[1,"item-top-row",2,"display","flex","align-items","center","justify-content","space-between","gap","16px","width","100%"],[1,"top-row-left",2,"display","flex","align-items","center","gap","8px","flex-wrap","wrap","color","var(--color-text-muted)","font-size","12px"],[1,"user-display-name",2,"font-weight","700","font-size","15px","color","var(--color-text-primary)","margin-right","4px"],[1,"institution-name-card",2,"font-weight","500"],[1,"separator-dot",2,"color","var(--color-border)","margin","0 2px"],[1,"card-priority-dot-indicator",3,"ngClass"],[1,"priority-bullet"],[1,"card-date-timestamp",2,"font-weight","500"],[1,"top-row-right",2,"display","flex","align-items","center","gap","8px","flex-shrink","0"],[1,"status-badge",3,"ngClass"],[1,"status-badge","en_progreso"],[1,"status-badge","cerrado"],[1,"new-ticket-badge"],[1,"time-elapsed-pill"],[1,"body-preview",2,"margin-top","6px","margin-bottom","6px","line-height","1.4","color","var(--color-text-secondary)","font-size","13px"],[1,"card-timestamp-info-row",2,"color","var(--bot-blue)","font-weight","600","margin-bottom","6px","padding","2px 0","font-size","12px","display","flex","align-items","center","gap","4px"],[1,"agent-card-timestamps",2,"display","flex","flex-direction","column","gap","4px","margin-bottom","6px"],[1,"item-tags-row",2,"display","flex","align-items","center","gap","6px","flex-wrap","wrap","margin-top","6px"],[1,"item-tag-chip"],[1,"attachment-indicator"],[2,"color","var(--color-text-primary)","font-weight","600"],[1,"material-icons",2,"font-size","14px","vertical-align","middle"],[1,"card-timestamp-info-row","reopened",2,"font-size","12px","display","flex","align-items","center","gap","4px"],[1,"card-timestamp-info-row","closed",2,"font-size","12px","display","flex","align-items","center","gap","4px"],[1,"card-timestamp-info-row","edited",2,"font-size","12px","display","flex","align-items","center","gap","4px"],[1,"detail-header"],[1,"back-btn",3,"click"],[1,"detail-actions"],[1,"detail-body"],[1,"edit-btn"],[1,"edit-limit-badge"],[1,"edit-btn",3,"click"],[1,"material-icons","info-icon"],[1,"edit-form"],[1,"comments-section"],[1,"comments-list"],[1,"comment-item",3,"ngClass"],[1,"add-comment-form"],[1,"comment-blocked-message",2,"margin-top","15px","padding","15px","background","#FFF9C4","border-radius","8px","color","#5D4037","font-weight","500","text-align","center","border","1px solid #FFF59D","display","flex","align-items","center","justify-content","center","gap","8px"],[1,"detail-info-row"],[1,"info-block"],[1,"info-label"],[1,"info-value"],[1,"priority-badge",3,"ngClass"],[2,"display","inline-flex","gap","4px","align-items","center"],[1,"detail-description-section"],[1,"description-text"],[1,"detail-attachments-section"],[1,"info-value",2,"color","var(--bot-blue)"],[1,"info-value",2,"color","#C71585","font-weight","600"],[1,"info-value",2,"color","#2E7D32","font-weight","600"],[1,"info-value",2,"color","#455A64","font-weight","600"],[1,"admin-controls-card"],[1,"admin-controls-card","info-only",2,"background","#E3F2FD","border","1px solid #BBDEFB","padding","15px","border-radius","8px","color","#0D47A1","font-weight","500","display","flex","align-items","center","gap","8px"],[1,"admin-actions-toolbar"],[1,"status-buttons-group"],["type","button",1,"resolve-action-btn"],[1,"ticket-resolved-badge-large"],[1,"separator-v"],["type","button",1,"transfer-action-btn",3,"click"],[1,"material-icons",2,"font-size","16px","vertical-align","middle"],["type","button",1,"resolve-action-btn",3,"click"],[1,"material-icons",2,"font-size","18px","vertical-align","middle"],[1,"attachments-grid"],[1,"attachment-file-card"],[1,"file-name",3,"title"],[1,"edit-textarea",3,"ngModelChange","ngModel"],[1,"edit-actions"],[1,"cancel-btn-edit",3,"click"],[1,"save-btn",3,"click","disabled"],[1,"comment-header"],[1,"comment-sender"],[1,"comment-time"],[1,"comment-body"],[1,"add-comment-form",3,"submit"],["name","newCommentText","required","",3,"ngModelChange","ngModel","placeholder"],["type","submit",1,"comment-submit-btn",3,"disabled"],[1,"material-icons",2,"vertical-align","middle"],[1,"transfer-modal-container"],[1,"transfer-modal-header"],["type","button",1,"close-modal-btn",3,"click"],[1,"transfer-modal-subtitle"],[1,"transfer-search-container"],["type","text","placeholder","Buscar agente o especializaci\xF3n...",3,"ngModelChange","ngModel"],[1,"transfer-tags-container"],["type","button",1,"tag-chip-btn",3,"click"],["type","button",1,"tag-chip-btn",3,"active"],[1,"status-filters-container"],["type","button",1,"status-filter-btn",3,"click"],[1,"status-dot","green"],[1,"status-dot","gray"],[1,"transfer-agents-list"],[1,"agent-transfer-row",3,"selected","disabled"],[1,"empty-agents-message"],[1,"transfer-reason-container"],[1,"reason-label"],["placeholder","Escribe el motivo detallado de la transferencia aqu\xED...","rows","3","required","",3,"ngModelChange","ngModel"],[1,"transfer-modal-actions"],[1,"selected-agent-indicator"],[1,"modal-buttons-group"],["type","button",1,"cancel-modal-btn",3,"click"],["type","button",1,"confirm-transfer-btn",3,"click","disabled"],[1,"agent-transfer-row",3,"click"],[1,"agent-avatar-circle"],[1,"avatar-status-dot"],[1,"agent-info-col"],[1,"agent-name-text"],[1,"agent-spec-text"],[1,"agent-chats-col"],[1,"active-chats-badge"],[1,"no-available-text"],[1,"material-icons","chat-icon"]],template:function(t,i){t&1&&(a(0,"div",2),b(1,Ur,77,14,"div",3)(2,sa,10,4,"div",4)(3,Ia,10,2,"div",5),b(4,Ba,45,11,"div",6),s()),t&2&&(d(),y(i.innerViewMode()==="create"?1:i.innerViewMode()==="list"?2:i.innerViewMode()==="detail"?3:-1),d(3),y(i.showTransferModal()?4:-1))},dependencies:[Ie,zt,Yt,qt,jt,Ht,Ut,kn,Wt,vt,Mn,yi,wn,So,ko,it,$i,Vo,nn,tn,zo,xn],styles:[".tickets-container[_ngcontent-%COMP%]{width:100%;height:100%}.ticket-form-card[_ngcontent-%COMP%], .ticket-history-card[_ngcontent-%COMP%], .ticket-detail-card[_ngcontent-%COMP%]{padding:40px}h2[_ngcontent-%COMP%]{font-family:var(--font-heading);font-size:22px;font-weight:700;color:var(--color-text-primary);margin-bottom:4px}.subtitle[_ngcontent-%COMP%]{font-family:var(--font-body);font-size:12px;color:var(--color-text-muted)}.separator[_ngcontent-%COMP%]{height:1px;background-color:var(--color-border);margin:20px 0}.form-columns[_ngcontent-%COMP%]{display:flex;gap:32px}.form-col[_ngcontent-%COMP%]{flex:1;display:flex;flex-direction:column;gap:20px}.form-group[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:8px}.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{font-family:var(--font-body);font-size:12px;font-weight:600;color:var(--color-text-primary)}.label-with-tooltip[_ngcontent-%COMP%]{display:flex;align-items:center;gap:6px}.info-icon[_ngcontent-%COMP%]{font-size:14px;color:var(--color-text-muted);cursor:help}.input-container[_ngcontent-%COMP%]{position:relative;display:flex;align-items:center}.input-icon[_ngcontent-%COMP%]{position:absolute;left:12px;color:var(--color-accent-teal);font-size:18px}.input-container[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{width:100%;height:44px;padding:0 12px 0 40px;border:1.5px solid var(--color-border);border-radius:var(--radius-input);font-family:var(--font-body);font-size:14px;color:var(--color-text-primary);outline:none;transition:border-color .2s ease;background:var(--color-bg-primary)}.input-container[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus{border-color:var(--color-accent-teal)}textarea[_ngcontent-%COMP%]{width:100%;height:160px;padding:12px;border:1.5px solid var(--color-border);border-radius:var(--radius-input);font-family:var(--font-body);font-size:14px;color:var(--color-text-primary);outline:none;resize:vertical;transition:border-color .2s ease;background:var(--color-bg-primary)}textarea[_ngcontent-%COMP%]:focus{border-color:var(--color-accent-teal)}.priority-chips-row[_ngcontent-%COMP%]{display:flex;gap:12px}.priority-chip[_ngcontent-%COMP%]{flex:1;height:38px;border:1px solid var(--color-border);background-color:var(--color-bg-secondary);border-radius:20px;font-family:var(--font-body);font-size:13px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s ease;color:var(--color-text-primary)}.priority-chip.active[_ngcontent-%COMP%]{font-weight:700}.priority-chip.low.active[_ngcontent-%COMP%]{background-color:#edf8f6;border-color:var(--color-success);color:#2e9e7a}.priority-chip.medium.active[_ngcontent-%COMP%]{background-color:#fff8e6;border-color:var(--bot-yellow);color:#9a7a00}.priority-chip.high.active[_ngcontent-%COMP%]{background-color:#fff3e0;border-color:#fb8c00;color:#e65100}.priority-chip.critica.active[_ngcontent-%COMP%]{background-color:#fdf2f2;border-color:var(--color-error);color:var(--color-error)}.tags-chip-list[_ngcontent-%COMP%]{margin-top:4px}  .mdc-evolution-chip-set__chips{gap:8px!important}  .mat-mdc-standard-chip{background-color:var(--color-bg-secondary)!important;border:1px solid var(--color-border)!important;border-radius:16px!important;font-family:var(--font-body)!important;font-size:13px!important;color:var(--color-text-muted)!important;padding:6px 12px!important;min-height:32px!important}  .mat-mdc-standard-chip.mdc-evolution-chip--selected{background-color:var(--color-accent-mint)!important;border-color:var(--color-accent-teal)!important;color:var(--color-text-primary)!important}.drag-drop-zone[_ngcontent-%COMP%]{border:2px dashed var(--color-accent-mint);background-color:var(--color-bg-secondary);border-radius:12px;height:80px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;cursor:pointer;transition:background-color .2s ease,border-color .2s ease;text-align:center;padding:8px}.drag-drop-zone[_ngcontent-%COMP%]:hover, .drag-drop-zone.drag-over[_ngcontent-%COMP%]{background-color:#eefbf9;border-color:var(--color-accent-teal)}.clip-icon[_ngcontent-%COMP%]{color:var(--color-accent-teal);font-size:20px}.drag-drop-zone[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-family:var(--font-body);font-size:13px;color:var(--color-text-muted)}.attachments-list[_ngcontent-%COMP%]{color:var(--color-text-primary)!important;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:90%}.full-width[_ngcontent-%COMP%]{grid-column:span 2;margin-top:16px}.form-actions[_ngcontent-%COMP%]{display:flex;justify-content:flex-end;gap:16px}.cancel-btn[_ngcontent-%COMP%]{height:48px;background:transparent;border:1px solid var(--color-border);border-radius:var(--radius-button);color:var(--color-text-muted);font-family:var(--font-body);font-size:14px;padding:0 24px;cursor:pointer;transition:background-color .2s ease}.cancel-btn[_ngcontent-%COMP%]:hover{background-color:var(--color-bg-secondary)}.send-btn[_ngcontent-%COMP%]{height:48px;background-color:var(--color-accent-teal);color:#fff;border:none;border-radius:var(--radius-button);font-family:var(--font-heading);font-size:15px;font-weight:600;padding:0 32px;cursor:pointer;transition:background-color .2s}.send-btn[_ngcontent-%COMP%]:hover:not(:disabled){background-color:var(--color-accent-teal-hover)}.send-btn[_ngcontent-%COMP%]:disabled{opacity:.6;cursor:not-allowed}.error-text[_ngcontent-%COMP%]{color:var(--color-error);font-size:11px;margin-top:-4px}.history-header[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center}.new-ticket-btn[_ngcontent-%COMP%]{height:38px;background:transparent;border:1.5px solid var(--color-accent-teal);border-radius:var(--radius-button);color:var(--color-accent-teal);font-family:var(--font-heading);font-weight:600;font-size:13px;padding:0 20px;cursor:pointer;transition:all .2s ease}.new-ticket-btn[_ngcontent-%COMP%]:hover{background-color:var(--color-accent-mint);border-color:var(--color-accent-teal);color:var(--color-text-primary)}.tickets-list[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:16px;max-height:420px;overflow-y:auto;padding-right:4px}.ticket-item[_ngcontent-%COMP%]{background-color:var(--color-bg-secondary);border-radius:10px;padding:16px;display:flex;gap:16px;cursor:pointer;transition:transform .15s ease,box-shadow .15s ease;border:1px solid transparent}.ticket-item[_ngcontent-%COMP%]:hover{transform:translateY(-2px);box-shadow:0 4px 10px #3331430d;border-color:var(--color-border)}.item-avatar[_ngcontent-%COMP%]{width:36px;height:36px;border-radius:50%;background-color:var(--color-accent-mint);color:var(--color-text-primary);display:flex;align-items:center;justify-content:center;font-family:var(--font-heading);font-weight:700;font-size:15px;flex-shrink:0}.item-content[_ngcontent-%COMP%]{flex:1;display:flex;flex-direction:column;gap:4px}.item-top-row[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center}.user-display-name[_ngcontent-%COMP%]{font-family:var(--font-heading);font-size:14px;font-weight:600;color:var(--color-text-primary)}.status-badge[_ngcontent-%COMP%]{font-family:var(--font-body);font-size:11px;font-weight:700;padding:4px 10px;border-radius:12px;text-transform:capitalize;border:1px solid transparent;display:inline-flex;align-items:center}.status-badge.abierto[_ngcontent-%COMP%]{background-color:#edf8f6;color:#2e9e7a;border-color:#c2ede0}.status-badge.en_progreso[_ngcontent-%COMP%]{background-color:#fff3e0;color:#e07b00;border-color:#ffe0b2}.status-badge.transferido[_ngcontent-%COMP%]{background-color:#e3f2fd;color:#1565c0;border-color:#bbdefb}.status-badge.reabierto[_ngcontent-%COMP%]{background-color:#fce4ec;color:#c2185b;border-color:#f8bbd0}.status-badge.resuelto[_ngcontent-%COMP%]{background-color:#f5f5f5;color:#616161;border-color:#e0e0e0}.status-badge.cerrado[_ngcontent-%COMP%]{background-color:#eceff1;color:#37474f;border-color:#cfd8dc}.card-priority-dot-indicator[_ngcontent-%COMP%]{font-family:var(--font-body);font-size:11px;font-weight:700;padding:2px 8px;border-radius:12px;display:inline-flex;align-items:center;gap:4px}.card-priority-dot-indicator.baja[_ngcontent-%COMP%]{background-color:#f1f8e9;color:#558b2f;border:1px solid #DCEDC8}.card-priority-dot-indicator.baja[_ngcontent-%COMP%]   .priority-bullet[_ngcontent-%COMP%]{color:#7cb342;font-size:14px;line-height:1}.card-priority-dot-indicator.media[_ngcontent-%COMP%]{background-color:#fffde7;color:#f57f17;border:1px solid #FFF9C4}.card-priority-dot-indicator.media[_ngcontent-%COMP%]   .priority-bullet[_ngcontent-%COMP%]{color:#fbc02d;font-size:14px;line-height:1}.card-priority-dot-indicator.alta[_ngcontent-%COMP%]{background-color:#fff3e0;color:#e65100;border:1px solid #FFE0B2}.card-priority-dot-indicator.alta[_ngcontent-%COMP%]   .priority-bullet[_ngcontent-%COMP%]{color:#fb8c00;font-size:14px;line-height:1}.card-priority-dot-indicator.critica[_ngcontent-%COMP%]{background-color:#ffebee;color:#c62828;border:1px solid #FFCDD2}.card-priority-dot-indicator.critica[_ngcontent-%COMP%]   .priority-bullet[_ngcontent-%COMP%]{color:#e53935;font-size:14px;line-height:1}.item-meta-row[_ngcontent-%COMP%]{display:flex;align-items:center;gap:12px;margin-top:-2px}.date-text[_ngcontent-%COMP%]{font-family:var(--font-body);font-size:12px;color:var(--color-text-muted)}.time-elapsed-pill[_ngcontent-%COMP%]{font-family:var(--font-body);font-size:11px;font-weight:600;background-color:var(--color-accent-teal);color:#fff;padding:2px 8px;border-radius:12px}.body-preview[_ngcontent-%COMP%]{font-family:var(--font-body);font-size:13px;line-height:1.5;color:var(--color-text-primary);display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;margin:4px 0}.item-tags-row[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-top:4px}.item-tag-chip[_ngcontent-%COMP%]{background-color:var(--color-bg-primary);border:1px solid var(--color-border);border-radius:12px;padding:2px 8px;font-family:var(--font-body);font-size:11px;color:var(--color-text-muted)}.attachment-indicator[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:4px;font-family:var(--font-body);font-size:11px;font-weight:600;color:#0288d1;background-color:#e1f5fe;border:1px solid #B3E5FC;padding:2px 10px;border-radius:12px}.empty-state[_ngcontent-%COMP%]{padding:48px;text-align:center;color:var(--color-text-muted);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px}.empty-state[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%]{font-size:48px;color:var(--color-border)}.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-family:var(--font-body);font-size:14px}.detail-header[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center}.back-btn[_ngcontent-%COMP%]{display:flex;align-items:center;gap:6px;background:transparent;border:1px solid var(--color-border);border-radius:var(--radius-button);padding:8px 16px;font-family:var(--font-heading);font-weight:600;color:var(--color-text-primary);cursor:pointer;transition:background-color .2s ease;outline:none}.back-btn[_ngcontent-%COMP%]:hover{background-color:var(--color-bg-secondary)}.detail-actions[_ngcontent-%COMP%]{display:flex;gap:12px}.edit-btn[_ngcontent-%COMP%]{background:transparent;border:1px solid var(--color-accent-teal);color:var(--color-accent-teal);border-radius:var(--radius-button);padding:8px 16px;font-family:var(--font-heading);font-weight:600;display:flex;align-items:center;gap:6px;cursor:pointer;transition:background-color .2s;outline:none}.edit-btn[_ngcontent-%COMP%]:hover{background-color:var(--color-accent-mint)}.edit-limit-badge[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:6px;background-color:var(--color-bg-secondary);border:1px solid var(--color-border);color:var(--color-text-muted);padding:8px 16px;border-radius:var(--radius-button);font-family:var(--font-heading);font-weight:600;font-size:13px}.edit-limit-badge[_ngcontent-%COMP%]   .info-icon[_ngcontent-%COMP%]{font-size:18px;color:var(--color-accent-teal)}.detail-body[_ngcontent-%COMP%]{margin-top:24px;display:flex;flex-direction:column;gap:24px}.detail-info-row[_ngcontent-%COMP%]{display:flex;gap:32px;flex-wrap:wrap}.info-block[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:6px}.info-label[_ngcontent-%COMP%]{font-family:var(--font-body);font-size:11px;color:var(--color-text-muted);text-transform:uppercase;font-weight:600}.info-value[_ngcontent-%COMP%]{font-family:var(--font-body);font-size:14px;font-weight:700;color:var(--color-text-primary)}.priority-badge[_ngcontent-%COMP%]{font-family:var(--font-body);font-size:13px;font-weight:700;padding:4px 12px;border-radius:12px;width:fit-content;text-transform:capitalize}.priority-badge.baja[_ngcontent-%COMP%]{background-color:#edf8f6;color:#2e9e7a}.priority-badge.media[_ngcontent-%COMP%]{background-color:#fff8e6;color:#9a7a00}.priority-badge.alta[_ngcontent-%COMP%]{background-color:#fff3e0;color:#e65100}.priority-badge.critica[_ngcontent-%COMP%]{background-color:#fdf2f2;color:var(--color-error)}.detail-description-section[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%], .detail-attachments-section[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{font-family:var(--font-heading);font-size:15px;font-weight:700;color:var(--color-text-primary);margin-bottom:8px}.description-text[_ngcontent-%COMP%]{font-family:var(--font-body);font-size:14px;line-height:1.6;color:var(--color-text-primary);background-color:var(--color-bg-secondary);padding:16px;border-radius:var(--radius-input);border:1px solid var(--color-border);white-space:pre-wrap}.attachments-grid[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:12px}.attachment-file-card[_ngcontent-%COMP%]{background-color:var(--color-bg-primary);border:1.5px solid var(--color-border);border-radius:8px;padding:10px;display:flex;align-items:center;gap:8px}.attachment-file-card[_ngcontent-%COMP%]   span.material-icons[_ngcontent-%COMP%]{color:var(--color-accent-teal)}.attachment-file-card[_ngcontent-%COMP%]   span.file-name[_ngcontent-%COMP%]{font-family:var(--font-body);font-size:12px;color:var(--color-text-primary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.edit-form[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:20px;background-color:var(--color-bg-secondary);padding:24px;border-radius:var(--radius-card);border:1px solid var(--color-border)}.edit-textarea[_ngcontent-%COMP%]{height:140px;background:#fff}.edit-actions[_ngcontent-%COMP%]{display:flex;gap:12px;justify-content:flex-end}.cancel-btn-edit[_ngcontent-%COMP%]{height:40px;background:transparent;border:1px solid var(--color-border);border-radius:var(--radius-button);color:var(--color-text-muted);font-family:var(--font-body);padding:0 20px;cursor:pointer;transition:background-color .2s}.cancel-btn-edit[_ngcontent-%COMP%]:hover{background-color:#00000008}.save-btn[_ngcontent-%COMP%]{height:40px;background-color:var(--color-success);color:#fff;border:none;border-radius:var(--radius-button);font-family:var(--font-heading);font-weight:600;padding:0 24px;cursor:pointer;transition:opacity .2s}.save-btn[_ngcontent-%COMP%]:disabled{opacity:.6;cursor:not-allowed}.comments-section[_ngcontent-%COMP%]{margin-top:32px;border-top:1px solid var(--color-border);padding-top:24px}.comments-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{font-family:var(--font-heading);font-size:16px;color:var(--color-text-primary);margin-bottom:16px}.comments-list[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:16px;max-height:300px;overflow-y:auto;margin-bottom:24px;padding-right:8px}.comment-item[_ngcontent-%COMP%]{background-color:var(--color-bg-secondary);border-radius:var(--radius-input);padding:12px;display:flex;flex-direction:column;gap:6px;border:1px solid var(--color-border);max-width:85%}.comment-item.user[_ngcontent-%COMP%]{align-self:flex-start;border-left:3px solid var(--color-accent-teal)}.comment-item.agent[_ngcontent-%COMP%]{align-self:flex-end;background-color:#ebf4fd;border-color:#b2d4fc;border-right:3px solid var(--bot-blue)}.comment-header[_ngcontent-%COMP%]{display:flex;justify-content:space-between;font-size:11px;color:var(--color-text-muted);gap:16px}.comment-sender[_ngcontent-%COMP%]{font-weight:700;font-family:var(--font-heading)}.comment-body[_ngcontent-%COMP%]{font-family:var(--font-body);font-size:13px;color:var(--color-text-primary);line-height:1.5}.add-comment-form[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:12px}.add-comment-form[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]{height:70px;padding:10px}.comment-submit-btn[_ngcontent-%COMP%]{align-self:flex-end;height:38px;background-color:var(--color-accent-teal);color:#fff;border:none;border-radius:var(--radius-button);padding:0 20px;font-family:var(--font-heading);font-size:13px;font-weight:600;cursor:pointer;transition:background-color .2s}.comment-submit-btn[_ngcontent-%COMP%]:hover:not(:disabled){background-color:var(--color-accent-teal-hover)}.comment-submit-btn[_ngcontent-%COMP%]:disabled{opacity:.6;cursor:not-allowed}.admin-controls-card[_ngcontent-%COMP%]{background-color:var(--color-bg-secondary);border:1.5px solid var(--color-border);border-radius:var(--radius-card);padding:20px;margin-top:10px}.admin-controls-card[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{font-family:var(--font-heading);font-size:15px;font-weight:700;color:var(--color-text-primary);margin-bottom:12px;margin-top:0}.admin-controls-row[_ngcontent-%COMP%]{display:flex;gap:24px;flex-wrap:wrap}.admin-control-group[_ngcontent-%COMP%]{flex:1;min-width:200px;display:flex;flex-direction:column;gap:6px}.admin-control-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{font-family:var(--font-body);font-size:12px;font-weight:600;color:var(--color-text-primary)}.admin-control-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]{height:40px;padding:0 12px;border:1.5px solid var(--color-border);border-radius:var(--radius-input);font-family:var(--font-body);font-size:14px;color:var(--color-text-primary);outline:none;background-color:#fff;cursor:pointer;transition:border-color .2s ease}.admin-control-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus{border-color:var(--color-accent-teal)}.admin-actions-toolbar[_ngcontent-%COMP%]{display:flex;align-items:center;gap:24px;flex-wrap:wrap;margin-top:12px}.status-buttons-group[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:6px}.control-label[_ngcontent-%COMP%]{font-family:var(--font-body);font-size:12px;font-weight:600;color:var(--color-text-primary)}.btn-group[_ngcontent-%COMP%]{display:flex;gap:8px}.status-btn[_ngcontent-%COMP%]{height:36px;padding:0 16px;border:1px solid var(--color-border);border-radius:18px;font-family:var(--font-body);font-size:13px;font-weight:500;cursor:pointer;background-color:#fff;transition:all .2s ease;color:var(--color-text-primary);outline:none}.status-btn[_ngcontent-%COMP%]:hover{background-color:var(--color-bg-secondary);border-color:var(--color-accent-teal)}.status-btn.active[_ngcontent-%COMP%]{color:#fff;border-color:transparent;font-weight:600}.status-btn.btn-abierto.active[_ngcontent-%COMP%]{background-color:#2196f3}.status-btn.btn-progreso.active[_ngcontent-%COMP%]{background-color:#ff9800}.status-btn.btn-resuelto.active[_ngcontent-%COMP%]{background-color:#4caf50}.status-btn.btn-cerrado.active[_ngcontent-%COMP%]{background-color:#9e9e9e}.status-btn.btn-reabierto.active[_ngcontent-%COMP%]{background-color:#e91e63}.separator-v[_ngcontent-%COMP%]{width:1px;height:40px;background-color:var(--color-border);align-self:center}.agent-stats-row[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(6,1fr);gap:16px;margin-bottom:24px;margin-top:12px}.stat-card[_ngcontent-%COMP%]{background:#fff;border:1px solid var(--color-border);border-radius:12px;padding:16px;display:flex;flex-direction:column;gap:8px;box-shadow:0 2px 4px #00000005;transition:transform .2s ease,box-shadow .2s ease}.stat-card[_ngcontent-%COMP%]:hover{transform:translateY(-2px);box-shadow:0 4px 8px #0000000a}.stat-card[_ngcontent-%COMP%]   .stat-label[_ngcontent-%COMP%]{font-family:var(--font-body);font-size:13px;color:var(--color-text-muted);font-weight:500}.stat-card[_ngcontent-%COMP%]   .stat-value[_ngcontent-%COMP%]{font-family:var(--font-heading);font-size:28px;font-weight:700;line-height:1}.stat-card.total[_ngcontent-%COMP%]   .stat-value[_ngcontent-%COMP%]{color:#37474f}.stat-card.abiertos[_ngcontent-%COMP%]   .stat-value[_ngcontent-%COMP%]{color:#2e9e7a}.stat-card.progreso[_ngcontent-%COMP%]   .stat-value[_ngcontent-%COMP%]{color:#e07b00}.stat-card.reabiertos[_ngcontent-%COMP%]   .stat-value[_ngcontent-%COMP%]{color:#c2185b}.stat-card.transferidos[_ngcontent-%COMP%]   .stat-value[_ngcontent-%COMP%]{color:#1565c0}.stat-card.resueltos[_ngcontent-%COMP%]   .stat-value[_ngcontent-%COMP%]{color:#455a64}.agent-tabs-container[_ngcontent-%COMP%]{display:flex;flex-direction:row;align-items:center;gap:16px;margin-bottom:16px;padding:0 4px;width:100%}.agent-tabs[_ngcontent-%COMP%]{display:flex;gap:8px;flex-wrap:wrap;border:none;padding-bottom:0;align-items:center}.agent-tab-btn[_ngcontent-%COMP%]{padding:6px 16px;border:1px solid #E0E0E0;background:#fff;font-family:var(--font-body);font-size:13px;font-weight:500;color:#546e7a;cursor:pointer;border-radius:20px;transition:all .2s ease;outline:none;display:inline-flex;align-items:center;justify-content:center}.agent-tab-btn[_ngcontent-%COMP%]:hover{border-color:#b0bec5;color:#37474f;background-color:#f5f7f8}.agent-tab-btn.active[_ngcontent-%COMP%]{background-color:#2c2a38;color:#fff;border-color:#2c2a38;font-weight:600}.agent-search-bar[_ngcontent-%COMP%]{display:flex;align-items:center;background-color:#fafafa;border:1.5px solid var(--color-border);border-radius:20px;padding:0 16px;height:40px;gap:8px;transition:border-color .2s ease;width:320px;flex-shrink:0}.agent-search-bar[_ngcontent-%COMP%]:focus-within{border-color:var(--color-accent-teal)}.agent-search-bar[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{border:none;background:transparent;outline:none;font-family:var(--font-body);font-size:14px;color:var(--color-text-primary);width:100%}.agent-search-bar[_ngcontent-%COMP%]   .search-icon[_ngcontent-%COMP%]{color:var(--color-text-secondary);font-size:20px}.new-ticket-badge[_ngcontent-%COMP%]{background-color:var(--bot-orange);color:#fff;font-size:10px;font-weight:700;padding:2px 8px;border-radius:12px;text-transform:uppercase;letter-spacing:.5px}.card-timestamp-info-row[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:4px;font-size:11px;font-weight:500;padding:2px 8px;border-radius:4px;font-family:var(--font-body)}.card-timestamp-info-row.reopened[_ngcontent-%COMP%]{background-color:#fff0f5;color:#c71585}.card-timestamp-info-row.closed[_ngcontent-%COMP%]{background-color:#e8f5e9;color:#2e7d32}.card-timestamp-info-row.edited[_ngcontent-%COMP%]{background-color:#eceff1;color:#455a64}.resolve-action-btn[_ngcontent-%COMP%]{background-color:var(--color-success);color:#fff;border:none;border-radius:8px;padding:8px 16px;font-family:var(--font-heading);font-size:13px;font-weight:600;cursor:pointer;display:inline-flex;align-items:center;gap:6px;transition:background-color .2s,transform .1s;outline:none}.resolve-action-btn[_ngcontent-%COMP%]:hover{background-color:#2e7d32}.resolve-action-btn[_ngcontent-%COMP%]:active{transform:scale(.97)}.ticket-resolved-badge-large[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:6px;color:var(--color-success);font-family:var(--font-heading);font-size:14px;font-weight:600}.transfer-modal-overlay[_ngcontent-%COMP%]{position:fixed;top:0;left:0;width:100vw;height:100vh;background-color:#0006;display:flex;justify-content:center;align-items:center;z-index:1000;-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px)}.transfer-modal-container[_ngcontent-%COMP%]{background-color:#fff;width:600px;max-width:95%;max-height:95vh;border-radius:16px;box-shadow:0 10px 30px #00000026;padding:20px;display:flex;flex-direction:column;font-family:DM Sans,sans-serif;box-sizing:border-box}.transfer-modal-header[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px}.transfer-modal-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{font-size:20px;font-weight:700;color:#1a202c;margin:0}.close-modal-btn[_ngcontent-%COMP%]{background:none;border:none;cursor:pointer;color:#718096;display:flex;align-items:center;justify-content:center;padding:4px;border-radius:50%;transition:background-color .2s}.close-modal-btn[_ngcontent-%COMP%]:hover{background-color:#f7fafc;color:#2d3748}.transfer-modal-subtitle[_ngcontent-%COMP%]{color:#718096;font-size:14px;margin-top:0;margin-bottom:12px;text-align:left}.transfer-search-container[_ngcontent-%COMP%]{position:relative;margin-bottom:12px}.transfer-search-container[_ngcontent-%COMP%]   .search-icon[_ngcontent-%COMP%]{position:absolute;left:12px;top:50%;transform:translateY(-50%);color:#a0aec0;font-size:18px}.transfer-search-container[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{width:100%;padding:8px 12px 8px 36px;border:1px solid #e2e8f0;border-radius:10px;font-size:14px;outline:none;transition:border-color .2s,box-shadow .2s;box-sizing:border-box}.transfer-search-container[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus{border-color:#3182ce;box-shadow:0 0 0 3px #4299e126}.transfer-tags-container[_ngcontent-%COMP%]{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px}.tag-chip-btn[_ngcontent-%COMP%]{background-color:#f7fafc;border:1px solid #e2e8f0;border-radius:16px;padding:5px 12px;font-size:12px;font-weight:500;color:#4a5568;cursor:pointer;transition:all .2s}.tag-chip-btn[_ngcontent-%COMP%]:hover{background-color:#edf2f7;color:#2d3748}.tag-chip-btn.active[_ngcontent-%COMP%]{background-color:#1a202c;color:#fff;border-color:#1a202c}.status-filters-container[_ngcontent-%COMP%]{display:flex;gap:12px;margin-bottom:12px;font-size:13px}.status-filter-btn[_ngcontent-%COMP%]{background:none;border:none;cursor:pointer;display:flex;align-items:center;gap:4px;padding:4px 8px;border-radius:6px;color:#718096;font-weight:500;transition:background-color .2s}.status-filter-btn[_ngcontent-%COMP%]:hover{background-color:#f7fafc}.status-filter-btn.active[_ngcontent-%COMP%]{background-color:#edf2f7;color:#2d3748}.status-dot[_ngcontent-%COMP%]{width:8px;height:8px;border-radius:50%;display:inline-block}.status-dot.green[_ngcontent-%COMP%]{background-color:#48bb78}.status-dot.gray[_ngcontent-%COMP%]{background-color:#a0aec0}.transfer-agents-list[_ngcontent-%COMP%]{flex:1;overflow-y:auto;border:1px solid #e2e8f0;border-radius:12px;margin-bottom:12px;max-height:120px;min-height:90px}.agent-transfer-row[_ngcontent-%COMP%]{display:flex;align-items:center;padding:8px 16px;cursor:pointer;border-bottom:1px solid #f7fafc;transition:background-color .2s}.agent-transfer-row[_ngcontent-%COMP%]:last-child{border-bottom:none}.agent-transfer-row[_ngcontent-%COMP%]:hover{background-color:#f7fafc}.agent-transfer-row.selected[_ngcontent-%COMP%]{background-color:#ebf8ff}.agent-transfer-row.disabled[_ngcontent-%COMP%]{cursor:not-allowed;opacity:.65}.agent-avatar-circle[_ngcontent-%COMP%]{width:34px;height:34px;border-radius:50%;background-color:#2d3748;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:14px;position:relative;margin-right:12px}.avatar-status-dot[_ngcontent-%COMP%]{width:10px;height:10px;border-radius:50%;border:2px solid #ffffff;position:absolute;bottom:0;right:0;background-color:#a0aec0}.avatar-status-dot.online[_ngcontent-%COMP%]{background-color:#48bb78}.agent-info-col[_ngcontent-%COMP%]{display:flex;flex-direction:column;flex:1;text-align:left}.agent-name-text[_ngcontent-%COMP%]{font-size:15px;font-weight:600;color:#2d3748}.agent-spec-text[_ngcontent-%COMP%]{font-size:13px;color:#718096;margin-top:2px}.agent-chats-col[_ngcontent-%COMP%]{display:flex;align-items:center}.active-chats-badge[_ngcontent-%COMP%]{display:flex;align-items:center;gap:6px;color:#718096;font-size:14px}.active-chats-badge[_ngcontent-%COMP%]   .chat-icon[_ngcontent-%COMP%]{font-size:18px}.no-available-text[_ngcontent-%COMP%]{color:#a0aec0;font-size:14px;font-style:italic}.empty-agents-message[_ngcontent-%COMP%]{padding:30px;text-align:center;color:#718096;font-size:15px}.transfer-reason-container[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:8px;margin-bottom:24px;text-align:left}.reason-label[_ngcontent-%COMP%]{font-size:14px;font-weight:600;color:#4a5568}.transfer-reason-container[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]{padding:10px 12px;border:1px solid #e2e8f0;border-radius:12px;font-family:inherit;font-size:14px;outline:none;resize:none;height:65px;box-sizing:border-box;transition:border-color .2s}.transfer-reason-container[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus{border-color:#3182ce}.transfer-modal-actions[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;margin-top:15px;padding-top:15px;border-top:1px solid #edf2f7}.selected-agent-indicator[_ngcontent-%COMP%]{font-size:14px;color:#718096}.modal-buttons-group[_ngcontent-%COMP%]{display:flex;gap:12px}.cancel-modal-btn[_ngcontent-%COMP%]{background-color:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:10px 20px;font-size:14px;font-weight:600;color:#4a5568;cursor:pointer;transition:background-color .2s}.cancel-modal-btn[_ngcontent-%COMP%]:hover{background-color:#f7fafc}.confirm-transfer-btn[_ngcontent-%COMP%]{background-color:#3182ce;border:none;border-radius:12px;padding:10px 20px;font-size:14px;font-weight:600;color:#fff;cursor:pointer;display:flex;align-items:center;gap:8px;transition:background-color .2s}.confirm-transfer-btn[_ngcontent-%COMP%]:hover{background-color:#2b6cb0}.confirm-transfer-btn[_ngcontent-%COMP%]:disabled{background-color:#cbd5e0;cursor:not-allowed}.transfer-modal-btn[_ngcontent-%COMP%]{display:flex;align-items:center;gap:6px;background-color:#fff;border:1px solid #e2e8f0;border-radius:8px;padding:8px 14px;font-size:14px;font-weight:500;color:#4a5568;cursor:pointer;transition:background-color .2s}.transfer-action-btn[_ngcontent-%COMP%]{background-color:#0288d1;color:#fff;border:none;border-radius:8px;padding:8px 16px;font-family:var(--font-heading);font-size:13px;font-weight:600;cursor:pointer;display:inline-flex;align-items:center;gap:6px;transition:background-color .2s,transform .1s;outline:none}.transfer-action-btn[_ngcontent-%COMP%]:hover{background-color:#0277bd}.transfer-action-btn[_ngcontent-%COMP%]:active{transform:scale(.97)}.transfer-modal-btn[_ngcontent-%COMP%]:hover{background-color:#f7fafc;border-color:#cbd5e0}.transfer-modal-btn[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%]{font-size:18px}"]})}return n})();var ja=["scrollContainer"],Ha=["inputTextarea"],Ua=(n,o,e,t)=>({"bot-bubble":n,"user-bubble":o,"agent-bubble":e,"escalation-bubble":t}),jo=(n,o)=>o.id;function Wa(n,o){if(n&1){let e=I();a(0,"div",10)(1,"div",32)(2,"span",33),c(3,"warning"),s(),a(4,"h4"),c(5,"\xBFEst\xE1s seguro?"),s(),a(6,"p"),c(7),s(),a(8,"div",34)(9,"button",35),f("click",function(){g(e);let i=h(2);return v(i.cancelConfirm())}),c(10,"Cancelar"),s(),a(11,"button",36),f("click",function(){g(e);let i=h(2);return v(i.executeConfirm())}),c(12,"Confirmar"),s()()()()}if(n&2){let e=h(2);d(7),j(" ",e.confirmAction()==="reset"?"Se reiniciar\xE1 la conversaci\xF3n y perder\xE1s el historial actual.":"Se cerrar\xE1 el chat y se borrar\xE1 el progreso de tu consulta."," ")}}function qa(n,o){if(n&1&&(a(0,"div",41)(1,"span",42),c(2),s()()),n&2){let e=h().$implicit;S("agent-avatar",e.sender==="agent"),d(2),j(" ",e.sender==="bot"?"smart_toy":"support_agent"," ")}}function Ya(n,o){if(n&1){let e=I();a(0,"button",43),f("click",function(){g(e);let i=h(3);return v(i.triggerCTA())}),c(1," Ir a Tickets \u2192 "),s()}}function Ga(n,o){if(n&1){let e=I();a(0,"button",44),f("click",function(){g(e);let i=h(3);return v(i.triggerEscalation())}),c(1," \u{1F464} Hablar con un agente "),s()}}function $a(n,o){if(n&1&&(a(0,"div",26),b(1,qa,3,3,"div",37),a(2,"div",38)(3,"p"),c(4),s(),b(5,Ya,2,0,"button",39),b(6,Ga,2,0,"button",40),s()()),n&2){let e=o.$implicit;M("ngClass",e.sender),d(),y(e.sender==="bot"||e.sender==="agent"?1:-1),d(),M("ngClass",vn(6,Ua,e.sender==="bot",e.sender==="user",e.sender==="agent",e.isEscalation)),d(2),E(e.content),d(),y(e.isCTA?5:-1),d(),y(e.isEscalationPrompt?6:-1)}}function Ka(n,o){if(n&1){let e=I();a(0,"button",46),f("click",function(){let i=g(e).$implicit,r=h(4);return v(r.onCategoryClick(i))}),c(1),s()}if(n&2){let e=o.$implicit;d(),j(" ",e," ")}}function Qa(n,o){if(n&1&&ae(0,Ka,2,1,"button",45,$e),n&2){let e=h(3);se(e.uniqueCategories())}}function Xa(n,o){if(n&1){let e=I();a(0,"button",46),f("click",function(){let i=g(e).$implicit,r=h(4);return v(r.onFAQClick(i))}),c(1),s()}if(n&2){let e=o.$implicit;d(),j(" ",e.questions," ")}}function Za(n,o){if(n&1){let e=I();a(0,"button",47),f("click",function(){g(e);let i=h(3);return v(i.onBackToCategories())}),a(1,"span",48),c(2,"arrow_back"),s()(),ae(3,Xa,2,1,"button",45,jo)}if(n&2){let e=h(3);d(3),se(e.faqsForCategory())}}function Ja(n,o){if(n&1&&(a(0,"div",27),b(1,Qa,2,0)(2,Za,5,0),s()),n&2){let e=h(2);d(),y(e.selectedCategory()?2:1)}}function es(n,o){n&1&&(a(0,"div",28)(1,"div",41)(2,"span",42),c(3,"smart_toy"),s()(),a(4,"div",49)(5,"div",50),T(6,"span")(7,"span")(8,"span"),s()()())}function ts(n,o){if(n&1){let e=I();a(0,"div",8)(1,"div",9),f("click",function(i){return i.stopPropagation()}),b(2,Wa,13,1,"div",10),a(3,"div",11)(4,"div",12)(5,"div",13),T(6,"span",14),s(),a(7,"div",15)(8,"span",16),c(9,"Asistente HSI"),s(),a(10,"div",17),T(11,"span",18),a(12,"span",19),c(13,"En l\xEDnea"),s()()()(),a(14,"div",20)(15,"button",21),f("click",function(){g(e);let i=h();return v(i.promptAction("reset"))}),a(16,"span",22),c(17,"refresh"),s()(),a(18,"button",23),f("click",function(){g(e);let i=h();return v(i.minimizeChat())}),a(19,"span",22),c(20,"remove"),s()(),a(21,"button",24),f("click",function(){g(e);let i=h();return v(i.promptAction("close"))}),a(22,"span",22),c(23,"close"),s()()()(),a(24,"div",25,0),ae(26,$a,7,11,"div",26,jo),b(28,Ja,3,1,"div",27),b(29,es,9,0,"div",28),s(),a(30,"form",29),f("submit",function(i){g(e);let r=h();return v(r.onSubmit(i))}),a(31,"textarea",30,1),_t("ngModelChange",function(i){g(e);let r=h();return ft(r.userInput,i)||(r.userInput=i),v(i)}),f("keydown.enter",function(i){g(e);let r=h();return v(r.onEnterKey(i))}),s(),a(33,"button",31)(34,"span",22),c(35,"send"),s()()()()()}if(n&2){let e=h();d(2),y(e.confirmAction()?2:-1),d(24),se(e.messages()),d(2),y(e.showFAQChips()&&e.faqs().length>0?28:-1),d(),y(e.isTyping()?29:-1),d(2),ut("ngModel",e.userInput),d(2),M("disabled",!0)}}var Ho=(()=>{class n{navigateToTickets=new U;scrollContainer;inputTextarea;http=m(Xe);isOpen=w(sessionStorage.getItem("hsi_chat_open")==="true");isTyping=w(!1);showFAQChips=w(!0);confirmAction=w(null);userInput="";faqs=w([]);selectedCategory=w(null);failedAttempts=w(0);uniqueCategories=F(()=>{let e=this.faqs();return[...new Set(e.map(t=>t.label))]});faqsForCategory=F(()=>{let e=this.selectedCategory();return e?this.faqs().filter(t=>t.label===e):[]});messages=w(this.loadSavedMessages());loadSavedMessages(){let e=sessionStorage.getItem("hsi_chat_messages");if(e)try{let t=JSON.parse(e);return t.forEach(i=>i.timestamp=new Date(i.timestamp)),t}catch(t){console.error("Error leyendo historial",t)}return[{id:"msg_1",sender:"bot",content:"\xA1Hola! Soy el asistente virtual de HSI. Pod\xE9s elegir una de las opciones r\xE1pidas para resolver tu duda:",timestamp:new Date}]}constructor(){ce(()=>{sessionStorage.setItem("hsi_chat_messages",JSON.stringify(this.messages()))}),ce(()=>{sessionStorage.setItem("hsi_chat_open",String(this.isOpen()))})}ngOnInit(){this.loadFaqs()}findBestFaqMatch(e){let t=e.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,""),i=["el","la","los","las","un","una","como","mi","de","para","que","en","a","y","o","por","con","tu","su","quiero","necesito"],r=t.split(/\W+/).filter(u=>u.length>2&&!i.includes(u));if(r.length===0)return;let l,p=0;for(let u of this.faqs()){let x=`${u.label} ${u.questions} ${u.answers}`.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,""),_=0;for(let C of r)x.includes(C)&&_++;_>p&&(p=_,l=u)}return p>0?l:void 0}ngAfterViewChecked(){this.scrollToBottom()}loadFaqs(){let e=localStorage.getItem("hsi_token"),t=new gt().set("Authorization",`Bearer ${e}`);this.http.get("/api/faqs",{headers:t}).subscribe({next:i=>{this.faqs.set(i)},error:i=>{console.error("Error al cargar las FAQs:",i)}})}toggleChat(){this.isOpen.set(!this.isOpen()),this.isOpen()&&setTimeout(()=>this.inputTextarea?.nativeElement?.focus(),100)}closeChat(){this.isOpen.set(!1),this.resetChat()}promptAction(e){this.confirmAction.set(e)}cancelConfirm(){this.confirmAction.set(null)}executeConfirm(){let e=this.confirmAction();e==="reset"?this.resetChat():e==="close"&&this.closeChat(),this.confirmAction.set(null)}minimizeChat(){this.isOpen.set(!1)}resetChat(){this.showFAQChips.set(!0),this.selectedCategory.set(null),this.messages.set([{id:"msg_1",sender:"bot",content:"\xA1Hola! Soy el asistente virtual de HSI. Pod\xE9s elegir una de las opciones r\xE1pidas para resolver tu duda:",timestamp:new Date}]),this.isTyping.set(!1)}onCategoryClick(e){this.selectedCategory.set(e)}onBackToCategories(){this.selectedCategory.set(null)}onFAQClick(e){this.showFAQChips.set(!1),this.selectedCategory.set(null),this.addMessage("user",e.questions),this.isTyping.set(!0),setTimeout(()=>{this.isTyping.set(!1),this.messages.set([...this.messages(),{id:"msg_"+Math.random(),sender:"bot",content:e.answers,timestamp:new Date,isCTA:e.label.toLowerCase().includes("ticket")}]),this.showFAQChips.set(!0),setTimeout(()=>this.scrollToBottom(),50)},1200)}onEnterKey(e){e.preventDefault(),this.onSubmit()}onSubmit(e){e&&e.preventDefault();let t=this.userInput.trim();!t||this.isTyping()||(this.userInput="",this.showFAQChips.set(!1),this.selectedCategory.set(null),this.addMessage("user",t),this.isTyping.set(!0),setTimeout(()=>{this.isTyping.set(!1);let i=this.findBestFaqMatch(t);if(i)this.failedAttempts.set(0),this.addMessage("bot",i.answers),(i.label.toLowerCase().includes("ticket")||i.questions.toLowerCase().includes("ticket"))&&this.messages.set([...this.messages(),{id:"msg_"+Math.random(),sender:"bot",content:"Hac\xE9 click abajo para ir directamente al formulario de tickets.",timestamp:new Date,isCTA:!0}]),this.showFAQChips.set(!0),setTimeout(()=>this.scrollToBottom(),50);else{let r=this.failedAttempts()+1;this.failedAttempts.set(r),r>=3?(this.messages.set([...this.messages(),{id:"msg_"+Math.random(),sender:"bot",content:"Parece que no logro encontrar la respuesta exacta a tu consulta. Te sugiero cargar un ticket para que el equipo de soporte t\xE9cnico pueda revisarlo en detalle.",timestamp:new Date,isCTA:!0}]),this.showFAQChips.set(!1),setTimeout(()=>this.scrollToBottom(),50)):(this.addMessage("bot","No logr\xE9 entender tu consulta. \xBFPodr\xEDas usar otras palabras o ser un poco m\xE1s espec\xEDfico?"),this.showFAQChips.set(!0),setTimeout(()=>this.scrollToBottom(),50))}},1200))}triggerEscalation(){this.failedAttempts.set(0),this.addMessage("user","Quiero hablar con un agente humano"),this.isTyping.set(!0),setTimeout(()=>{this.isTyping.set(!1),this.simulateEscalation()},800)}addMessage(e,t,i){let r=k({id:"msg_"+Math.random(),sender:e,content:t,timestamp:new Date},i);this.messages.set([...this.messages(),r])}simulateEscalation(){setTimeout(()=>{this.messages.set([...this.messages(),{id:"msg_"+Math.random(),sender:"bot",content:"Te estoy conectando con un agente de soporte...",timestamp:new Date,isEscalation:!0}]),setTimeout(()=>{this.addMessage("agent","Hola, soy Yanina del equipo de soporte. Decime cu\xE1l es tu consulta y lo resolvemos.")},1500)},1e3)}triggerCTA(){this.closeChat(),this.navigateToTickets.emit()}scrollToBottom(){if(this.scrollContainer)try{let e=this.scrollContainer.nativeElement;e.scrollTop=e.scrollHeight}catch(e){}}static \u0275fac=function(t){return new(t||n)};static \u0275cmp=D({type:n,selectors:[["app-chatbot-widget"]],viewQuery:function(t,i){if(t&1&&Ee(ja,5)(Ha,5),t&2){let r;z(r=B())&&(i.scrollContainer=r.first),z(r=B())&&(i.inputTextarea=r.first)}},outputs:{navigateToTickets:"navigateToTickets"},decls:8,vars:3,consts:[["scrollContainer",""],["inputTextarea",""],[1,"bot-fab-container"],[1,"bot-fab-label"],[1,"bot-fab","animate-pulse-slow",3,"click"],[1,"notification-dot"],[1,"fab-bot-icon"],[1,"bot-eyes"],[1,"chat-overlay"],[1,"chat-window",3,"click"],[1,"confirm-overlay"],[1,"chat-header"],[1,"header-left"],[1,"header-bot-icon"],[1,"bot-eyes-mini"],[1,"header-info"],[1,"bot-name"],[1,"status-indicator"],[1,"status-dot"],[1,"status-text"],[1,"header-actions"],["title","Reiniciar chat",1,"refresh-btn",3,"click"],[1,"material-icons"],["title","Minimizar chat",1,"minimize-btn",3,"click"],["title","Cerrar y borrar chat",1,"close-btn",3,"click"],[1,"chat-history"],[1,"message-row",3,"ngClass"],[1,"faq-chips-row"],[1,"message-row","bot"],[1,"chat-input-bar",3,"submit"],["rows","1","name","userInput","placeholder","Escritura deshabilitada temporalmente. Por favor, us\xE1 los botones...","disabled","",3,"ngModelChange","keydown.enter","ngModel"],["type","submit",1,"send-btn",3,"disabled"],[1,"confirm-dialog"],[1,"material-icons","warning-icon"],[1,"confirm-actions"],[1,"cancel-btn",3,"click"],[1,"accept-btn",3,"click"],[1,"bot-avatar",3,"agent-avatar"],[1,"message-bubble",3,"ngClass"],[1,"cta-btn"],[1,"cta-btn",2,"background-color","var(--color-accent-teal)","color","white","margin-top","8px"],[1,"bot-avatar"],[1,"material-icons","avatar-icon"],[1,"cta-btn",3,"click"],[1,"cta-btn",2,"background-color","var(--color-accent-teal)","color","white","margin-top","8px",3,"click"],[1,"faq-chip"],[1,"faq-chip",3,"click"],[1,"faq-chip","back-chip",2,"background-color","var(--color-bg-secondary)","border-color","var(--color-border)","color","var(--color-text-primary)",3,"click"],[1,"material-icons",2,"font-size","14px","vertical-align","middle"],[1,"message-bubble","bot-bubble","typing-bubble"],[1,"typing-indicator"]],template:function(t,i){t&1&&(a(0,"div",2)(1,"span",3),c(2,"ChatBot"),s(),a(3,"button",4),f("click",function(){return i.toggleChat()}),T(4,"span",5),a(5,"div",6),T(6,"span",7),s()()(),b(7,ts,36,5,"div",8)),t&2&&(S("hidden",i.isOpen()),d(7),y(i.isOpen()?7:-1))},dependencies:[Ie,zt,Yt,qt,jt,Ht,Ut,Wt,vt],styles:['.bot-fab-container[_ngcontent-%COMP%]{position:fixed;bottom:32px;right:32px;display:flex;flex-direction:column;align-items:center;gap:6px;z-index:999;transition:opacity .2s ease,transform .2s ease}.bot-fab-container.hidden[_ngcontent-%COMP%]{opacity:0;transform:scale(.8);pointer-events:none}.bot-fab-label[_ngcontent-%COMP%]{font-family:var(--font-heading);font-size:13px;font-weight:600;color:var(--bot-blue);text-shadow:0 1px 2px rgba(255,255,255,.8)}.bot-fab[_ngcontent-%COMP%]{width:64px;height:64px;border-radius:var(--radius-bot);background:var(--bot-fab-gradient);border:none;cursor:pointer;position:relative;display:flex;align-items:center;justify-content:center;box-shadow:var(--shadow-bot-fab);transition:transform .2s ease,box-shadow .2s ease;outline:none}.bot-fab[_ngcontent-%COMP%]:hover{transform:scale(1.1);box-shadow:0 8px 24px #408df38c}.notification-dot[_ngcontent-%COMP%]{position:absolute;width:10px;height:10px;background-color:var(--bot-yellow);border-radius:50%;top:4px;right:4px;border:1.5px solid white}.fab-bot-icon[_ngcontent-%COMP%]{width:28px;height:20px;border:3px solid white;border-radius:5px;position:relative;display:flex;align-items:center;justify-content:center}.bot-eyes[_ngcontent-%COMP%]{display:flex;gap:4px}.bot-eyes[_ngcontent-%COMP%]:before, .bot-eyes[_ngcontent-%COMP%]:after{content:"";width:4px;height:4px;background-color:var(--bot-yellow);border-radius:50%}.chat-overlay[_ngcontent-%COMP%]{position:fixed;top:0;left:0;width:100vw;height:100vh;background-color:#3331434d;z-index:1000;display:flex;align-items:flex-end;justify-content:flex-end}.chat-window[_ngcontent-%COMP%]{position:relative;width:380px;height:560px;background-color:var(--color-bg-primary);border-radius:var(--radius-chat);box-shadow:var(--shadow-bot-chat);margin-bottom:32px;margin-right:32px;display:flex;flex-direction:column;overflow:hidden;animation:_ngcontent-%COMP%_slideIn .3s cubic-bezier(.16,1,.3,1)}@keyframes _ngcontent-%COMP%_slideIn{0%{opacity:0;transform:translateY(40px) scale(.95)}to{opacity:1;transform:translateY(0) scale(1)}}.chat-header[_ngcontent-%COMP%]{background:var(--bot-blue-gradient);height:64px;padding:0 20px;display:flex;align-items:center;justify-content:space-between;color:#fff}.header-left[_ngcontent-%COMP%]{display:flex;align-items:center;gap:12px}.header-bot-icon[_ngcontent-%COMP%]{width:32px;height:32px;border-radius:var(--radius-bot);background:var(--bot-fab-gradient);border:1.5px solid rgba(255,255,255,.6);display:flex;align-items:center;justify-content:center}.bot-eyes-mini[_ngcontent-%COMP%]{width:16px;height:12px;border:2px solid white;border-radius:3px;position:relative}.bot-eyes-mini[_ngcontent-%COMP%]:before, .bot-eyes-mini[_ngcontent-%COMP%]:after{content:"";position:absolute;width:3px;height:3px;background-color:var(--bot-yellow);border-radius:50%;top:2px}.bot-eyes-mini[_ngcontent-%COMP%]:before{left:2px}.bot-eyes-mini[_ngcontent-%COMP%]:after{right:2px}.header-info[_ngcontent-%COMP%]{display:flex;flex-direction:column}.bot-name[_ngcontent-%COMP%]{font-family:var(--font-heading);font-size:15px;font-weight:600}.status-indicator[_ngcontent-%COMP%]{display:flex;align-items:center;gap:4px}.status-dot[_ngcontent-%COMP%]{width:6px;height:6px;background-color:var(--color-success);border-radius:50%}.status-text[_ngcontent-%COMP%]{font-family:var(--font-body);font-size:11px;opacity:.8}.header-actions[_ngcontent-%COMP%]{display:flex;align-items:center;gap:12px}.refresh-btn[_ngcontent-%COMP%], .minimize-btn[_ngcontent-%COMP%], .close-btn[_ngcontent-%COMP%]{background:transparent;border:none;color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;opacity:.8;transition:opacity .2s;outline:none}.refresh-btn[_ngcontent-%COMP%]:hover, .minimize-btn[_ngcontent-%COMP%]:hover, .close-btn[_ngcontent-%COMP%]:hover{opacity:1}.chat-history[_ngcontent-%COMP%]{flex:1;background-color:var(--color-bg-secondary);padding:16px;overflow-y:auto;display:flex;flex-direction:column;gap:16px}.message-row[_ngcontent-%COMP%]{display:flex;gap:8px;width:100%}.message-row.bot[_ngcontent-%COMP%], .message-row.agent[_ngcontent-%COMP%]{justify-content:flex-start}.message-row.user[_ngcontent-%COMP%]{justify-content:flex-end}.bot-avatar[_ngcontent-%COMP%]{width:24px;height:24px;border-radius:50%;background:var(--bot-fab-gradient);display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:4px}.bot-avatar.agent-avatar[_ngcontent-%COMP%]{background:var(--bot-blue-gradient)}.avatar-icon[_ngcontent-%COMP%]{font-size:14px;color:#fff}.message-bubble[_ngcontent-%COMP%]{max-width:80%;padding:10px 14px;font-family:var(--font-body);font-size:14px;line-height:1.5}.bot-bubble[_ngcontent-%COMP%]{background-color:var(--color-bg-primary);border:1px solid var(--color-border);border-radius:4px 16px 16px;color:var(--color-text-primary)}.user-bubble[_ngcontent-%COMP%]{background-color:var(--bot-blue);border-radius:16px 4px 16px 16px;color:#fff}.agent-bubble[_ngcontent-%COMP%]{background-color:var(--color-bg-primary);border:1px solid var(--color-border);border-radius:4px 16px 16px;color:var(--color-text-primary)}.escalation-bubble[_ngcontent-%COMP%]{border:1.5px solid var(--bot-orange)!important;background-color:#fff9f3!important}.faq-chips-row[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:8px;padding-left:32px;align-items:flex-start;margin-top:-8px}.faq-chip[_ngcontent-%COMP%]{background-color:#ebf4fd;border:1px solid var(--bot-blue);color:var(--bot-blue);padding:6px 14px;border-radius:12px;font-family:var(--font-body);font-size:12px;cursor:pointer;transition:background-color .2s,transform .1s;text-align:left}.faq-chip[_ngcontent-%COMP%]:hover{background-color:#d6e9fc}.faq-chip[_ngcontent-%COMP%]:active{transform:scale(.97)}.cta-btn[_ngcontent-%COMP%]{margin-top:8px;background-color:var(--bot-blue);color:#fff;border:none;border-radius:12px;padding:8px 16px;font-family:var(--font-heading);font-size:12px;font-weight:600;cursor:pointer;display:block;transition:background-color .2s}.cta-btn[_ngcontent-%COMP%]:hover{background-color:#2f7ce5}.chat-input-bar[_ngcontent-%COMP%]{background-color:var(--color-bg-primary);border-top:1px solid var(--color-border);padding:12px 16px;display:flex;align-items:center;gap:12px}.chat-input-bar[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]{flex:1;height:36px;max-height:80px;padding:8px 0;border:none;outline:none;resize:none;font-family:var(--font-body);font-size:14px;color:var(--color-text-primary)}.send-btn[_ngcontent-%COMP%]{width:36px;height:36px;background-color:#ebf4fd;border:none;border-radius:50%;color:var(--bot-blue);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:background-color .2s,transform .1s;flex-shrink:0}.send-btn[_ngcontent-%COMP%]:hover:not(:disabled){background-color:#d6e9fc}.send-btn[_ngcontent-%COMP%]:disabled{opacity:.5;cursor:not-allowed}.typing-bubble[_ngcontent-%COMP%]{padding:12px 16px}.typing-indicator[_ngcontent-%COMP%]{display:flex;align-items:center;gap:4px}.typing-indicator[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{width:6px;height:6px;background-color:var(--color-text-muted);border-radius:50%;animation:_ngcontent-%COMP%_typingBounce 1.4s infinite ease-in-out both}.typing-indicator[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(1){animation-delay:-.32s}.typing-indicator[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(2){animation-delay:-.16s}.confirm-overlay[_ngcontent-%COMP%]{position:absolute;top:0;left:0;width:100%;height:100%;background-color:#333143bf;z-index:100;display:flex;align-items:center;justify-content:center;border-radius:var(--radius-chat);animation:_ngcontent-%COMP%_fadeIn .2s ease-out}@keyframes _ngcontent-%COMP%_fadeIn{0%{opacity:0}to{opacity:1}}.confirm-dialog[_ngcontent-%COMP%]{background-color:var(--color-bg-primary, #fff);padding:24px;border-radius:12px;width:80%;text-align:center;box-shadow:0 4px 16px #00000040;display:flex;flex-direction:column;gap:12px}.warning-icon[_ngcontent-%COMP%]{font-size:32px;color:#e29e21;margin:0 auto}.confirm-dialog[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{margin:0;font-family:var(--font-heading);color:var(--color-text-primary)}.confirm-dialog[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0;font-size:13px;line-height:1.4;color:var(--color-text-primary);opacity:.8}.confirm-actions[_ngcontent-%COMP%]{display:flex;gap:8px;margin-top:12px;justify-content:center}.confirm-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{padding:8px 16px;border-radius:8px;border:none;font-weight:600;cursor:pointer;font-family:var(--font-body);font-size:13px;transition:background-color .2s}.confirm-actions[_ngcontent-%COMP%]   .cancel-btn[_ngcontent-%COMP%]{background-color:#ebf4fd;color:var(--bot-blue)}.confirm-actions[_ngcontent-%COMP%]   .cancel-btn[_ngcontent-%COMP%]:hover{background-color:#d6e9fc}.confirm-actions[_ngcontent-%COMP%]   .accept-btn[_ngcontent-%COMP%]{background-color:var(--bot-blue);color:#fff}.confirm-actions[_ngcontent-%COMP%]   .accept-btn[_ngcontent-%COMP%]:hover{background-color:#2f7ce5}@keyframes _ngcontent-%COMP%_typingBounce{0%,80%,to{transform:scale(0)}40%{transform:scale(1)}}']})}return n})();var is=()=>[import("./chunk-WCPKH5PZ.js").then(n=>n.TrainingComponent)];function ns(n,o){if(n&1&&(a(0,"span",7),c(1),s()),n&2){let e=h();d(),E(e.activeCount())}}function os(n,o){n&1&&T(0,"app-about",17)}function rs(n,o){if(n&1){let e=I();a(0,"app-tickets-tab",19),f("viewModeChange",function(i){g(e);let r=h();return v(r.onTicketsViewModeChange(i))}),s()}if(n&2){let e=h();M("viewMode",e.ticketsViewMode())}}function as(n,o){n&1&&T(0,"app-training",17)}function ss(n,o){n&1&&(a(0,"div",20)(1,"span",21),c(2,"sync"),s(),a(3,"p"),c(4,"Cargando recursos de capacitaci\xF3n..."),s()())}function ls(n,o){n&1&&(Lt(0,as,1,0)(1,ss,5,0),_n(2,0,is,null,1),gn())}function cs(n,o){if(n&1){let e=I();a(0,"app-chatbot-widget",22),f("navigateToTickets",function(){g(e);let i=h();return v(i.onChatbotCTAClick())}),s()}}var oh=(()=>{class n{authService=m(Ze);ticketService=m(Gt);activeTab=w("about");ticketsViewMode=w("create");currentUserRole=F(()=>this.authService.currentUser()?.role||"");hasTickets=F(()=>this.ticketService.hasTickets());activeCount=F(()=>this.ticketService.activeCount());constructor(){ce(()=>{let e=this.authService.currentUser();e&&(this.ticketService.loadTicketsForUser(e.username),e.role!=="user"?this.ticketsViewMode.set("list"):this.ticketService.hasTickets()?this.ticketsViewMode.set("list"):this.ticketsViewMode.set("create"))})}setActiveTab(e){this.activeTab.set(e)}onTicketsViewModeChange(e){this.ticketsViewMode.set(e)}onHistoryIconClick(){(this.currentUserRole()!=="user"||this.hasTickets())&&(this.setActiveTab("tickets"),this.ticketsViewMode.set("list"))}onChatbotCTAClick(){this.setActiveTab("tickets"),this.ticketsViewMode.set("create")}onLogout(){this.ticketService.clearTickets(),this.authService.logout().subscribe()}static \u0275fac=function(t){return new(t||n)};static \u0275cmp=D({type:n,selectors:[["app-home"]],decls:31,vars:14,consts:[[1,"home-layout"],[1,"sidebar"],[1,"sidebar-top"],["title","HSI Soporte",1,"material-icons","ticket-logo"],[1,"sidebar-middle"],[1,"sidebar-item",3,"click","title"],[1,"material-icons"],[1,"notification-badge"],[1,"sidebar-bottom"],["title","Cerrar sesi\xF3n",1,"sidebar-item","profile-btn",3,"click"],[1,"tooltip"],[1,"main-content"],[1,"nav-top"],[1,"pill-nav-container"],[1,"pill-btn",3,"click"],[1,"content-area"],[1,"content-card"],[1,"tab-content-fade"],[1,"tab-content-fade",3,"viewMode"],[1,"tab-content-fade",3,"viewModeChange","viewMode"],[1,"lazy-placeholder"],[1,"material-icons","loading-spin"],[3,"navigateToTickets"]],template:function(t,i){if(t&1&&(a(0,"div",0)(1,"aside",1)(2,"div",2)(3,"span",3),c(4,"confirmation_number"),s()(),a(5,"div",4)(6,"div",5),f("click",function(){return i.onHistoryIconClick()}),a(7,"span",6),c(8,"chat"),s(),b(9,ns,2,1,"span",7),s()(),a(10,"div",8)(11,"div",9),f("click",function(){return i.onLogout()}),a(12,"span",6),c(13,"account_circle"),s(),a(14,"span",10),c(15,"Salir"),s()()()(),a(16,"main",11)(17,"nav",12)(18,"div",13)(19,"button",14),f("click",function(){return i.setActiveTab("about")}),c(20," Acerca del sistema "),s(),a(21,"button",14),f("click",function(){return i.setActiveTab("tickets")}),c(22," Tickets "),s(),a(23,"button",14),f("click",function(){return i.setActiveTab("training")}),c(24," Capacitaci\xF3n "),s()()(),a(25,"div",15)(26,"div",16),b(27,os,1,0,"app-about",17)(28,rs,1,1,"app-tickets-tab",18)(29,ls,4,0),s()(),b(30,cs,1,0,"app-chatbot-widget"),s()()),t&2){let r;d(6),S("active",i.currentUserRole()!=="user"||i.hasTickets())("inactive",i.currentUserRole()==="user"&&!i.hasTickets()),M("title",i.currentUserRole()!=="user"?"Ver tickets de soporte ("+i.activeCount()+" activos)":i.hasTickets()?"Ver mis tickets ("+i.activeCount()+" activos)":"A\xFAn no ten\xE9s tickets enviados"),d(3),y(i.activeCount()>0?9:-1),d(10),S("active",i.activeTab()==="about"),d(2),S("active",i.activeTab()==="tickets"),d(2),S("active",i.activeTab()==="training"),d(4),y((r=i.activeTab())==="about"?27:r==="tickets"?28:r==="training"?29:-1),d(3),y(i.currentUserRole()==="user"?30:-1)}},dependencies:[Ie,En,Bo,Ho],styles:[".home-layout[_ngcontent-%COMP%]{display:flex;min-height:100vh;width:100%;overflow:hidden}.sidebar[_ngcontent-%COMP%]{width:64px;background-color:#333143;display:flex;flex-direction:column;align-items:center;justify-content:space-between;padding:20px 0;flex-shrink:0;z-index:10}.sidebar-top[_ngcontent-%COMP%]{margin-top:8px}.ticket-logo[_ngcontent-%COMP%]{color:#fff;font-size:28px}.sidebar-middle[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:16px;align-items:center}.sidebar-item[_ngcontent-%COMP%]{width:44px;height:44px;border-radius:var(--radius-input);display:flex;align-items:center;justify-content:center;position:relative;cursor:pointer;transition:all .2s ease}.sidebar-item[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%]{font-size:24px}.sidebar-item.active[_ngcontent-%COMP%]{color:var(--color-accent-mint)}.sidebar-item.active[_ngcontent-%COMP%]:hover{background-color:#77c2d826}.sidebar-item.inactive[_ngcontent-%COMP%]{color:var(--color-text-muted);cursor:not-allowed;opacity:.6}.notification-badge[_ngcontent-%COMP%]{position:absolute;top:-4px;right:-4px;background-color:var(--bot-yellow);color:var(--color-text-primary);font-family:var(--font-heading);font-size:10px;font-weight:700;min-width:16px;height:16px;border-radius:8px;display:flex;align-items:center;justify-content:center;border:1.5px solid #333143;padding:0 4px}.profile-btn[_ngcontent-%COMP%]{color:var(--color-text-muted)}.profile-btn[_ngcontent-%COMP%]:hover{color:#fff;background-color:#ffffff14}.profile-btn[_ngcontent-%COMP%]   .tooltip[_ngcontent-%COMP%]{visibility:hidden;position:absolute;left:74px;background-color:#333143;color:#fff;padding:4px 8px;border-radius:4px;font-family:var(--font-body);font-size:11px;white-space:nowrap;border:1px solid var(--color-border);opacity:0;transition:opacity .2s ease}.profile-btn[_ngcontent-%COMP%]:hover   .tooltip[_ngcontent-%COMP%]{visibility:visible;opacity:1}.main-content[_ngcontent-%COMP%]{flex:1;background-color:var(--color-bg-secondary);display:flex;flex-direction:column;overflow-y:auto}.nav-top[_ngcontent-%COMP%]{display:flex;justify-content:center;padding-top:32px;padding-bottom:8px;flex-shrink:0}.pill-nav-container[_ngcontent-%COMP%]{display:flex;gap:24px}.pill-btn[_ngcontent-%COMP%]{font-family:var(--font-heading);font-size:14px;font-weight:500;border-radius:24px;padding:12px 28px;cursor:pointer;transition:all .25s cubic-bezier(.4,0,.2,1);outline:none}.pill-btn[_ngcontent-%COMP%]:not(.active){background-color:var(--color-bg-primary);border:1.5px solid var(--color-border);color:var(--color-text-primary)}.pill-btn[_ngcontent-%COMP%]:not(.active):hover{border-color:var(--color-accent-teal);background-color:var(--color-bg-secondary)}.pill-btn.active[_ngcontent-%COMP%]{background-color:var(--color-accent-teal);color:#fff;border:none;box-shadow:var(--shadow-pill-active)}.content-area[_ngcontent-%COMP%]{flex:1;padding:0 24px 24px;display:flex}.content-card[_ngcontent-%COMP%]{width:100%;background-color:var(--color-bg-primary);border-radius:16px;box-shadow:var(--shadow-card);border:1px solid var(--color-border);overflow:hidden;min-height:520px}.tab-content-fade[_ngcontent-%COMP%]{display:block;animation:_ngcontent-%COMP%_fadeIn .4s ease}@keyframes _ngcontent-%COMP%_fadeIn{0%{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}.lazy-placeholder[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;justify-content:center;height:400px;color:var(--color-text-muted);gap:16px}.loading-spin[_ngcontent-%COMP%]{font-size:32px;animation:_ngcontent-%COMP%_spin 1.2s linear infinite}@keyframes _ngcontent-%COMP%_spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}.lazy-placeholder[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-family:var(--font-body);font-size:14px}"]})}return n})();export{oh as HomeComponent};
