(this["webpackJsonpinstagram-clone-react-client"]=this["webpackJsonpinstagram-clone-react-client"]||[]).push([[0],{273:function(e,t,n){},275:function(e,t,n){},277:function(e,t,n){},278:function(e,t,n){},279:function(e,t,n){},280:function(e,t,n){},281:function(e,t,n){},282:function(e,t,n){},283:function(e,t,n){},284:function(e,t,n){},285:function(e,t,n){},286:function(e,t,n){},287:function(e,t,n){},288:function(e,t,n){},289:function(e,t,n){},290:function(e,t,n){},291:function(e,t,n){},292:function(e,t,n){},293:function(e,t,n){},294:function(e,t,n){},295:function(e,t,n){},296:function(e,t,n){},297:function(e,t,n){},298:function(e,t,n){},299:function(e,t,n){},300:function(e,t,n){},301:function(e,t,n){},302:function(e,t,n){},303:function(e,t,n){},304:function(e,t,n){},305:function(e,t,n){"use strict";n.r(t);var r=n(1),c=n.n(r),a=n(54),s=n.n(a),i=n(15),o=n(118),u=n(19),l=n(12),d=n(6),j=n(3),f=n.n(j),b=n(4),p=n(5),h=n(8),O=n(43),m=n.n(O),x=m.a.create({baseURL:"https://instagram-clone-spring-boot.herokuapp.com/api/v1/authentication"}),g=function(){var e=Object(b.a)(f.a.mark((function e(t){var n;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x.post(v(),Object(h.a)({},t));case 2:return n=e.sent,e.abrupt("return",n);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),v=function(){return"/register"},w=function(){var e=Object(b.a)(f.a.mark((function e(t){var n;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x.post(_(),t);case 2:return n=e.sent,e.abrupt("return",n);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),_=function(){return"/login"},I=function(){var e=Object(b.a)(f.a.mark((function e(t){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x.post(y(),t);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),y=function(){return"logout"},N=function(){return"/refreshAccessToken"},k=n(126),T={loggedInUserId:void 0,accessToken:"",refreshToken:""},S=Object(k.a)({name:"authentication",initialState:T,reducers:{setState:function(e,t){var n=t.payload,r=n.accessToken,c=n.refreshToken,a=n.loggedInUserId;e.accessToken=r,e.refreshToken=c,e.loggedInUserId=a},setAccessAndRefreshToken:function(e,t){var n=t.payload,r=n.accessToken,c=n.refreshToken;e.accessToken=r,e.refreshToken=c}}}),P=S.actions,C=P.setState,B=P.setAccessAndRefreshToken,F=S.reducer,A=n(11),z=n(77),L=n(81),U=n(119),R={key:"root",storage:n.n(U).a},D=Object(A.combineReducers)({authenticationState:F}),E=Object(L.a)(R,D),M=function(){var e=Object(A.createStore)(E,Object(z.composeWithDevTools)());return{store:e,persistor:Object(L.b)(e)}}(),q=M.store,J=M.persistor,V=m.a.create({baseURL:"https://instagram-clone-spring-boot.herokuapp.com/api/v1"});V.interceptors.request.use((function(e){var t=q.getState().authenticationState.accessToken;return e.headers.Authorization="Bearer ".concat(t),e}));var W=!1,K=[];V.interceptors.response.use((function(e){return e}),(function(e){var t,n=e.config,r=e.response.status,c=n;if(401!==r)return Promise.reject(e);if(!W){W=!0;var a=q.getState().authenticationState.refreshToken;(t={refreshToken:a},x.post(N(),t)).then((function(e){W=!1,q.dispatch(B(e.data)),K.forEach((function(t){return t(e.data.accessToken)})),K=[]}),(function(){W=!1,q.dispatch(C(Object(h.a)({},T))),K=[]}))}return new Promise((function(e){K.push((function(t){c.headers.Authorization="Bearer ".concat(t),e(m()(c))}))}))}));var G,H=V,Q=function(){return"/me"},X=function(){return"/me/feed"},Y=function(){var e=Object(b.a)(f.a.mark((function e(){var t;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,H.get(Z());case 2:return t=e.sent,e.abrupt("return",t);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),Z=function(){return"/me/suggestions"},$=n(36),ee=n.n($),te=(n(273),n(0));!function(e){e[e.square=0]="square",e[e.circle=1]="circle"}(G||(G={}));var ne,re=function(e){var t=e.widthInPx,n=e.shape,c=e.render,a=Object(r.useState)(!1),s=Object(p.a)(a,2),i=s[0],o=s[1];return Object(te.jsxs)("div",{className:"image-placeholder ".concat(i?"":"image-placeholder--image-loading"),children:[c((function(){return o(!0)})),Object(te.jsx)("div",{style:{width:t},className:"image-placeholder__placeholder ".concat(n===G.circle?"image-placeholder__placeholder--circle":""," ").concat(i?"image-placeholder__placeholder--image-loaded":"")})]})},ce=function(e){var t=e.publicProfileImageId,n=e.widthInPx,r=e.username;return Object(te.jsx)(re,{shape:G.circle,widthInPx:n,render:function(e){return Object(te.jsx)(ee.a,{offset:300,children:Object(te.jsx)(u.b,{publicId:t||"instagram-clone/static/blank-profile-image",alt:"".concat(r,"-profile-image"),format:"jpg",onLoad:e,style:{borderRadius:"50%"},children:Object(te.jsx)(u.c,{aspectRatio:"1:1",crop:"fill",width:n,quality:"100"})})})}})},ae=function(e){var t=function(e){var t=new Date((new Date).getTime()+6e4*(new Date).getTimezoneOffset()).getTime(),n=new Date(e).getTime(),r=Math.floor((t-n)/6e4),c=Math.floor(r/60),a=Math.floor(c/24),s=Math.floor(a/7),i=Math.floor(a/30.4167),o=[{diff:Math.floor(a/365),diffType:"years"},{diff:i,diffType:"months"},{diff:s,diffType:"weeks"},{diff:a,diffType:"days"},{diff:c,diffType:"hours"},{diff:r,diffType:"minutes"}].find((function(e){return e.diff>0}));return o||(o={diff:1,diffType:"minutes"}),o}(e);return se(t.diff,t.diffType)},se=function(e,t){var n=new Map;n.set("years",{singular:"Jahr",plural:"Jahren"}),n.set("months",{singular:"Monat",plural:"Monaten"}),n.set("weeks",{singular:"Woche",plural:"Wochen"}),n.set("days",{singular:"Tag",plural:"Tagen"}),n.set("hours",{singular:"Stunde",plural:"Stunden"}),n.set("minutes",{singular:"Minute",plural:"Minuten"});var r=n.get(t);if(!r)throw new Error('No matching unit string could be found for "'.concat(t,'"'));var c=1!==e?r.plural:r.singular;return"".concat(e," ").concat(c)},ie="/register",oe="/login",ue="/suggestions",le="/new-post",de="/profiles/me",je="/profiles/:userId",fe=(n(275),function(e){var t,n=e.user,r=Object(i.c)((function(e){return e.authenticationState.loggedInUserId}))===n.userId?"/profiles/me":(t=n.userId,"/profiles/".concat(t));return Object(te.jsx)(l.b,{to:r,className:"user-profile-link",children:n.username})}),be=(n(277),function(e){var t=e.feedPost;return Object(te.jsxs)("div",{className:"feed-post",children:[Object(te.jsxs)("div",{className:"feed-post__top",children:[Object(te.jsx)(ce,{username:t.creator.username,widthInPx:32,publicProfileImageId:t.creator.publicProfileImageId}),Object(te.jsx)(fe,{user:t.creator})]}),Object(te.jsx)("div",{className:"feed-post__middle",children:Object(te.jsx)(re,{widthInPx:800,shape:G.square,render:function(e){return Object(te.jsx)(ee.a,{offset:500,children:Object(te.jsx)(u.b,{publicId:t.publicImageId,alt:t.publicImageId,onLoad:e,format:"jpg",children:Object(te.jsx)(u.c,{crop:"lfill",width:800,quality:"80"})})})}})}),Object(te.jsxs)("div",{className:"feed-post__bottom",children:[t.text&&Object(te.jsxs)("div",{className:"feed-post__caption",children:[Object(te.jsx)(fe,{user:t.creator})," ",Object(te.jsx)("span",{className:"feed-post__caption-text",children:t.text})]}),Object(te.jsxs)("div",{className:"feed-post__creation-time",children:["vor ",ae(t.creationTime)]})]})]})}),pe=function(e){var t=e.feed;return Object(te.jsx)(te.Fragment,{children:t.map((function(e){return Object(te.jsx)(be,{feedPost:e},e.postId)}))})},he=(n(278),function(e){var t=e.children;return Object(te.jsx)("div",{className:"normal-page-layout",children:Object(te.jsx)("div",{className:"normal-page-layout__content-wrapper",children:t})})}),Oe="black",me=n(317),xe=function(e){var t=e.color,n=e.size;return Object(te.jsx)(me.a,{size:n,style:{color:t}})},ge=(n(279),function(e){var t=e.isLoading,n=void 0===t||t,r=e.children;return Object(te.jsx)(te.Fragment,{children:n?Object(te.jsx)("div",{"data-testid":"page-loader",className:"page-loader",children:Object(te.jsx)(xe,{color:"rgb(219, 219, 219)",size:"3rem"})}):r})}),ve=(n(280),function(e){var t=e.user,n=e.avatarSizeInPx,r=e.renderUserInformation,c=e.renderButton;return Object(te.jsxs)("div",{className:"profile-preview",children:[Object(te.jsx)("div",{style:{minWidth:n},children:Object(te.jsx)(ce,{publicProfileImageId:t.publicProfileImageId,widthInPx:n,username:t.username})}),Object(te.jsx)("div",{className:"profile-preview__user-information",children:r()}),Object(te.jsx)("div",{className:"profile-preview__button",children:c()})]})}),we=function(){var e=Object(i.b)(),t=Object(i.c)((function(e){return e.authenticationState.refreshToken})),n=Object(r.useState)(!1),c=Object(p.a)(n,2),a=c[0],s=c[1];return{isLoggingOut:a,logout:function(){var n=Object(b.a)(f.a.mark((function n(){return f.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return s(!0),n.next=3,I({refreshToken:t});case 3:e(C(T));case 4:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}}()}},_e=n(26);n(281);!function(e){e[e.PrimaryContained=0]="PrimaryContained",e[e.SecondaryContained=1]="SecondaryContained",e[e.PrimaryText=2]="PrimaryText"}(ne||(ne={}));var Ie=function(e){var t=e.isLoading,n=void 0!==t&&t,r=e.buttonType,c=void 0===r?ne.PrimaryContained:r,a=e.loaderDataTestId,s=void 0===a?"button-loader":a,i=e.children,o=Object(_e.a)(e,["isLoading","buttonType","loaderDataTestId","children"]);return Object(te.jsxs)("button",Object(h.a)(Object(h.a)({className:"button ".concat(c===ne.PrimaryContained?"button--primary-contained":""," ").concat(c===ne.SecondaryContained?"button--secondary-contained":""," ").concat(c===ne.PrimaryText?"button--primary-text":" "," ").concat(n?"button--loading":"")},o),{},{children:[n&&Object(te.jsx)("div",{className:"button__spinner","data-testid":s,children:Object(te.jsx)(xe,{size:"15px",color:"\n          ".concat(c===ne.PrimaryContained?"white":"","\n          ").concat(c===ne.SecondaryContained?Oe:"","\n          ").concat(c===ne.PrimaryText?Oe:"")})}),i]}))},ye=(n(282),function(e){var t=e.me,n=e.avatarSizeInPx,r=we(),c=r.logout,a=r.isLoggingOut,s=function(){return c()};return Object(te.jsx)(ve,{user:t,avatarSizeInPx:n,renderUserInformation:function(){return Object(te.jsxs)(te.Fragment,{children:[Object(te.jsx)(fe,{user:t}),Object(te.jsx)("div",{className:"my-profile-preview__full-name",children:t.fullName})]})},renderButton:function(){return Object(te.jsx)(Ie,{isLoading:a,buttonType:ne.PrimaryText,onClick:s,children:"Abmelden"})}})}),Ne=(n(283),function(e){var t=e.children;return Object(te.jsx)("div",{className:"vertical-split-layout",children:t})}),ke=function(e){return H.post(Te(e))},Te=function(e){return"me/followed/".concat(e)},Se=function(){return"me/followed"},Pe=function(e){return"me/followed/".concat(e)},Ce=(n(284),function(e){var t=e.user,n=e.avatarSizeInPx,c=e.buttonType,a=e.handleSuccessfulSubscription,s=Object(r.useState)(!1),i=Object(p.a)(s,2),o=i[0],u=i[1],l=function(){var e=Object(b.a)(f.a.mark((function e(t){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return u(!0),e.next=3,ke(t);case 3:a(),u(!1);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(te.jsx)(ve,{user:t,avatarSizeInPx:n,renderUserInformation:function(){return Object(te.jsxs)(te.Fragment,{children:[Object(te.jsx)(fe,{user:t}),Object(te.jsx)("div",{className:"user-profile-preview__full-name",children:t.fullName})]})},renderButton:function(){return Object(te.jsx)(Ie,{isLoading:o,buttonType:c,onClick:function(){return l(t.userId)},children:"Abonnieren"})}})}),Be=(n(285),function(e){var t=e.suggestions,n=e.loadSuggestions;return Object(te.jsxs)("div",{children:[Object(te.jsxs)("div",{className:"side-bar-suggestions__heading",children:[Object(te.jsx)("span",{className:"side-bar-suggestions__heading-text",children:"Vorschl\xe4ge f\xfcr dich"}),Object(te.jsx)(l.b,{className:"side-bar-suggestions__all-suggestions-link",to:"/suggestions",children:"Alle ansehen"})]}),Object(te.jsx)("div",{className:"side-bar-suggestions__suggestions",children:t.map((function(e){return Object(te.jsx)("div",{className:"side-bar-suggestions__suggestion",children:Object(te.jsx)(Ce,{user:e,avatarSizeInPx:32,buttonType:ne.PrimaryText,handleSuccessfulSubscription:n})},e.userId)}))})]})}),Fe=(n(286),function(){var e=Object(r.useState)(void 0),t=Object(p.a)(e,2),n=t[0],c=t[1],a=Object(r.useState)(void 0),s=Object(p.a)(a,2),i=s[0],o=s[1],u=Object(r.useState)(void 0),l=Object(p.a)(u,2),j=l[0],h=l[1];Object(r.useEffect)((function(){H.get(X()).then((function(e){return c(e.data.feed)})),H.get(Q()).then((function(e){return h(e.data)})),O()}),[]);var O=function(){var e=Object(b.a)(f.a.mark((function e(){var t,n;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Y();case 2:t=e.sent,n=t.data.suggestions.filter((function(e,t){return t<5})),o(n);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(te.jsx)(te.Fragment,{children:n&&i&&j?Object(te.jsx)(te.Fragment,{children:0===n.length?Object(te.jsx)(d.a,{to:"/suggestions"}):Object(te.jsx)(he,{children:Object(te.jsxs)(Ne,{children:[Object(te.jsx)("div",{className:"index-page__feed",children:Object(te.jsx)(pe,{feed:n})}),Object(te.jsxs)("div",{className:"index-page__right",children:[Object(te.jsx)("div",{className:"index-page__my-profile-preview",children:Object(te.jsx)(ye,{me:j,avatarSizeInPx:56})}),Object(te.jsx)(Be,{loadSuggestions:O,suggestions:i})]})]})})}):Object(te.jsx)(ge,{})})}),Ae=n(23),ze=(n(287),function(e){var t=e.errors;return Object(te.jsx)("div",{children:t.map((function(e,n){var r=t.length>=2&&0===n,c=t.length>=2&&n===t.length-1,a=t.length>=3&&0!==n&&n!==t.length-1;return Object(te.jsx)("p",{className:"errors__error ".concat(r?"errors__error--top":""," ").concat(a?"errors__error--middle":""," ").concat(c?"errors__error--bottom":""),children:e},n)}))})}),Le=(n(288),function(e){var t=e.size;return Object(te.jsx)("h1",{className:"logo",style:{fontSize:t},children:"Instagram Klon"})}),Ue=(n(289),function(e){var t=e.handleSubmit,n=e.subTitle,r=e.submitButtonCaption,c=e.redirectText,a=e.redirectButtonText,s=e.redirectTo,i=e.children,o=e.errors,u=e.isLoading;return Object(te.jsxs)("form",{className:"authentication-form",onSubmit:t,children:[Object(te.jsxs)("div",{className:"authentication-form__box",children:[Object(te.jsx)("div",{className:n?"authentication-form__logo":"authentication-form__logo--margin-bottom",children:Object(te.jsx)(Le,{size:"3rem"})}),Object(te.jsxs)("div",{className:"authentication-form__content-wrapper",children:[n&&Object(te.jsx)("p",{className:"authentication-form__sub-title",children:n}),i,Object(te.jsx)("div",{className:"authentication-form__submit-button",children:Object(te.jsx)(Ie,{type:"submit",isLoading:u,children:r})}),o.length>0&&Object(te.jsx)("div",{className:"authentication-form__errors",children:Object(te.jsx)(ze,{errors:o})})]})]}),Object(te.jsx)("div",{className:"authentication-form__box",children:Object(te.jsxs)("div",{className:"authentication-form__redirect-text",children:[c," ",Object(te.jsx)(l.b,{className:"authentication-form__redirect-link",to:s,children:a})]})})]})}),Re=function(e){if(void 0===e.isAxiosError)return[e.message];var t=e;return t.response&&void 0!==t.response.data.errors?t.response.data.errors:[t.message]},De=(n(290),c.a.forwardRef((function(e,t){return Object(te.jsx)("input",Object(h.a)({className:"input",ref:t},e))}))),Ee=n(38),Me=n(124),qe=n(127),Je=n(128),Ve=n(125),We=function(e){Object(Me.a)(n,e);var t=Object(qe.a)(n);function n(e){return Object(Ee.a)(this,n),t.call(this,"Das Access-Token (".concat(e,") konnte nicht verarbeitet werden."))}return n}(Object(Je.a)(Error)),Ke=function(e){var t=e.accessToken,n=e.refreshToken;return{loggedInUserId:function(e){var t=Object(Ve.a)(e).sub;if(!t)throw new We(e);return t}(t),accessToken:t,refreshToken:n}},Ge=function(){var e=Object(i.b)(),t=Object(d.g)(),n=Object(Ae.b)(),c=n.handleSubmit,a=n.control,s=Object(r.useState)([]),o=Object(p.a)(s,2),u=o[0],l=o[1],j=Object(r.useState)(!1),h=Object(p.a)(j,2),O=h[0],m=h[1],x=function(){var n=Object(b.a)(f.a.mark((function n(r){var c,a;return f.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return m(!0),n.prev=1,n.next=4,w(r);case 4:c=n.sent,a=Ke(c.data),e(C(a)),t.push("/"),n.next=13;break;case 10:n.prev=10,n.t0=n.catch(1),l(Re(n.t0));case 13:m(!1);case 14:case"end":return n.stop()}}),n,null,[[1,10]])})));return function(e){return n.apply(this,arguments)}}();return Object(te.jsxs)(Ue,{handleSubmit:c(x),submitButtonCaption:"Anmelden",redirectText:"Du hast kein Konto?",redirectButtonText:"Registrieren",redirectTo:"/register",errors:u,isLoading:O,children:[Object(te.jsx)(Ae.a,{control:a,name:"usernameOrEmail",render:function(e){var t=e.field,n=t.onChange,r=t.onBlur,c=t.value,a=t.ref;return Object(te.jsx)(De,{placeholder:"Benutzername oder E-Mail Adresse",onChange:n,onBlur:r,value:c||"",ref:a})}}),Object(te.jsx)(Ae.a,{control:a,name:"password",render:function(e){var t=e.field,n=t.onChange,r=t.onBlur,c=t.value,a=t.ref;return Object(te.jsx)(De,{placeholder:"Passwort",onChange:n,onBlur:r,value:c||"",type:"password",ref:a})}})]})},He=(n(291),function(e){var t=e.children;return Object(te.jsx)("div",{className:"content-centered-layout",children:t})}),Qe=function(){return Object(te.jsx)(He,{children:Object(te.jsx)(Ge,{})})},Xe=function(){return"me/profile-image"},Ye=c.a.forwardRef((function(e,t){return Object(te.jsx)("input",Object(h.a)(Object(h.a)({type:"file",style:{display:"none"}},e),{},{ref:t}))})),Ze=c.a.forwardRef((function(e,t){return Object(te.jsx)(Ye,Object(h.a)(Object(h.a)({accept:"image/png, image/jpeg, image/webp"},e),{},{ref:t}))})),$e=function(){var e=Object(r.useRef)(null);return{fileInputRef:e,pretendClickOnFileInput:function(){var t;null===(t=e.current)||void 0===t||t.click()}}},et=function(){return{readFileFromEvent:function(e,t){var n=e.target.files?e.target.files[0]:null;if(n){var r=new FileReader;r.readAsDataURL(n),r.onloadend=Object(b.a)(f.a.mark((function n(){return f.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if("string"===typeof r.result){n.next=2;break}return n.abrupt("return");case 2:t(r.result),e.target.value="";case 4:case"end":return n.stop()}}),n)})))}}}},tt=(n(292),function(e){var t=e.children,n=Object(_e.a)(e,["children"]);return Object(te.jsx)("button",Object(h.a)(Object(h.a)({className:"invisible-button"},n),{},{children:t}))}),nt=(n(293),function(e){var t=e.number,n=e.text;return Object(te.jsxs)("div",{className:"stat",children:[Object(te.jsx)("span",{className:"stat__number",children:t})," ",n]})}),rt=(n(294),function(e){var t=e.user,n=e.posts,r=e.followers,c=e.followed,a=e.renderAvatar,s=e.renderButton;return Object(te.jsxs)("div",{className:"profile-information",children:[Object(te.jsx)("div",{className:"profile-information__image",children:a(Object(te.jsx)(ce,{widthInPx:150,publicProfileImageId:t.publicProfileImageId,username:t.username}))}),Object(te.jsxs)("div",{className:"profile-information__details",children:[Object(te.jsxs)("div",{className:"profile-information__username-and-button",children:[Object(te.jsx)("h2",{className:"profile-information__username",children:t.username}),s()]}),Object(te.jsxs)("div",{className:"profile-information__stats",children:[Object(te.jsx)(nt,{number:n.length,text:"Beitr\xe4ge"}),Object(te.jsx)(nt,{number:r.length,text:"Abonennten"}),Object(te.jsx)(nt,{number:c.length,text:"abonniert"})]}),Object(te.jsx)("h1",{className:"profile-information__full-name",children:t.fullName})]})]})}),ct=n(17),at=(n(295),function(e){var t=e.posts;return Object(te.jsxs)("div",{children:[Object(te.jsx)("div",{className:"profile-posts__heading-wrapper",children:Object(te.jsxs)("div",{className:"profile-posts__heading",children:[Object(te.jsx)(ct.a,{size:12}),Object(te.jsx)("span",{className:"profile-posts__heading-text",children:"BEITR\xc4GE"})]})}),0===t.length?Object(te.jsx)("div",{className:"profile-posts__no-posts-placeholder",children:"Noch keine Beitr\xe4ge vorhanden"}):Object(te.jsx)("div",{className:"profile-posts__posts",children:t.map((function(e){return Object(te.jsx)(re,{widthInPx:300,shape:G.square,render:function(t){return Object(te.jsx)(ee.a,{offset:100,children:Object(te.jsx)(u.b,{publicId:e.publicImageId,alt:e.publicImageId,onLoad:t,format:"jpg",children:Object(te.jsx)(u.c,{aspectRatio:"1:1",crop:"fill",width:300,quality:"80"})})})}},e.postId)}))})]})}),st=function(e){return Object(te.jsxs)(te.Fragment,{children:[Object(te.jsx)(rt,Object(h.a)({},e)),Object(te.jsx)(at,{posts:e.posts})]})},it=function(e){var t=e.reloadProfileInformation,n=Object(_e.a)(e,["reloadProfileInformation"]),r=we(),c=r.isLoggingOut,a=r.logout,s=et().readFileFromEvent,i=$e(),o=i.fileInputRef,u=i.pretendClickOnFileInput;return Object(te.jsx)(st,Object(h.a)(Object(h.a)({},n),{},{renderButton:function(){return Object(te.jsx)(Ie,{isLoading:c,buttonType:ne.SecondaryContained,onClick:function(){a()},children:"Abmelden"})},renderAvatar:function(e){return Object(te.jsxs)(tt,{onClick:function(){return u()},children:[Object(te.jsx)(Ze,{ref:o,"data-testid":"change-profile-image-hidden-file-input",onChange:function(e){s(e,function(){var e=Object(b.a)(f.a.mark((function e(n){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,r={imageDataUri:n},H.post(Xe(),r);case 2:t();case 3:case"end":return e.stop()}var r}),e)})));return function(t){return e.apply(this,arguments)}}())}}),e]})}}))},ot=function(){var e=Object(b.a)(f.a.mark((function e(t){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,H.get(ut(t));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),ut=function(e){return"/users/".concat(e)},lt=function(){var e=Object(b.a)(f.a.mark((function e(t){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,H.get(dt(t));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),dt=function(e){return"/users/".concat(e,"/followed")},jt=function(){var e=Object(b.a)(f.a.mark((function e(t){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,H.get(ft(t));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),ft=function(e){return"/users/".concat(e,"/followers")},bt=function(){var e=Object(b.a)(f.a.mark((function e(t){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,H.get(pt(t));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),pt=function(e){return"/users/".concat(e,"/posts")},ht=function(e){var t=Object(r.useState)(void 0),n=Object(p.a)(t,2),c=n[0],a=n[1],s=Object(r.useState)(void 0),i=Object(p.a)(s,2),o=i[0],u=i[1],l=Object(r.useState)(void 0),d=Object(p.a)(l,2),j=d[0],f=d[1],b=Object(r.useState)(void 0),h=Object(p.a)(b,2),O=h[0],m=h[1],x=Object(r.useCallback)((function(){ot(e).then((function(e){return a(e.data)})),bt(e).then((function(e){return u(e.data.posts)})),jt(e).then((function(e){return m(e.data.followers)})),lt(e).then((function(e){return f(e.data.followed)}))}),[e]);return Object(r.useEffect)((function(){x()}),[x]),{user:c,posts:o,followed:j,followers:O,reloadProfileInformation:x}},Ot=function(){var e=Object(i.c)((function(e){return e.authenticationState})).loggedInUserId,t=ht(e),n=t.user,r=t.posts,c=t.followers,a=t.followed,s=t.reloadProfileInformation;return Object(te.jsx)(te.Fragment,{children:n&&r&&c&&a?Object(te.jsx)(he,{children:Object(te.jsx)(it,{user:n,posts:r,followers:c,followed:a,reloadProfileInformation:s})}):Object(te.jsx)(ge,{})})},mt=function(){var e=Object(b.a)(f.a.mark((function e(t){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,H.post(xt(),t);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),xt=function(){return"/me/posts"},gt=(n(296),function(e){return Object(te.jsx)("textarea",Object(h.a)({className:"textarea"},e))}),vt=(n(297),function(e){var t=e.imageDataUri,n=Object(d.g)(),c=Object(r.useState)(""),a=Object(p.a)(c,2),s=a[0],i=a[1],o=Object(r.useState)(!1),u=Object(p.a)(o,2),l=u[0],j=u[1],h=Object(r.useState)([]),O=Object(p.a)(h,2),m=O[0],x=O[1],g=function(){var e=Object(b.a)(f.a.mark((function e(){var r;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return j(!0),r={imageDataUri:t,text:s},e.prev=2,e.next=5,mt(r);case 5:n.push("/"),e.next=12;break;case 8:e.prev=8,e.t0=e.catch(2),x(Re(e.t0)),j(!1);case 12:case"end":return e.stop()}}),e,null,[[2,8]])})));return function(){return e.apply(this,arguments)}}();return Object(te.jsxs)("div",{className:"new-post-form",children:[Object(te.jsx)("div",{className:"new-post-form__caption-input",children:Object(te.jsx)(gt,{placeholder:"Bildunterschrift verfassen ...",value:s,onChange:function(e){return i(e.target.value)}})}),Object(te.jsx)("div",{className:"new-post-form__image-preview-container",children:Object(te.jsx)("div",{className:"new-post-form__image-preview-crop-size",children:Object(te.jsx)("img",{className:"new-post-form__image-preview",src:t,alt:"selectedImagePreview"})})}),Object(te.jsxs)("div",{className:"new-post-form__bottom-section",children:[m.length>0&&Object(te.jsx)("div",{className:"new-post-form__errors",children:Object(te.jsx)(ze,{errors:m})}),Object(te.jsx)("div",{className:"new-post-form__submit-button",children:Object(te.jsx)(Ie,{isLoading:l,onClick:g,children:"Teilen"})})]})]})}),wt=(n(298),function(e){var t=e.children;return Object(te.jsx)("h1",{className:"responsive-heading",children:t})}),_t=(n(299),function(e){var t=e.children;return Object(te.jsx)("div",{className:"slim-page-layout",children:Object(te.jsx)("div",{className:"slim-page-layout__content-wrapper",children:t})})}),It=function(){var e=Object(d.h)();return Object(te.jsxs)(_t,{children:[Object(te.jsx)(wt,{children:"Neuer Beitrag"}),Object(te.jsx)(vt,{imageDataUri:e.state.selectedImageDataUri})]})},yt=function(){var e=Object(i.b)(),t=Object(d.g)(),n=Object(Ae.b)(),c=n.handleSubmit,a=n.control,s=Object(r.useState)([]),o=Object(p.a)(s,2),u=o[0],l=o[1],j=Object(r.useState)(!1),h=Object(p.a)(j,2),O=h[0],m=h[1],x=function(){var n=Object(b.a)(f.a.mark((function n(r){var c,a;return f.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return m(!0),n.prev=1,n.next=4,g(r);case 4:c=n.sent,a=Ke(c.data),e(C(a)),t.push("/"),n.next=13;break;case 10:n.prev=10,n.t0=n.catch(1),l(Re(n.t0));case 13:m(!1);case 14:case"end":return n.stop()}}),n,null,[[1,10]])})));return function(e){return n.apply(this,arguments)}}();return Object(te.jsxs)(Ue,{handleSubmit:c(x),subTitle:"Registriere dich, um die Fotos und Videos deiner Freunde zu sehen.",submitButtonCaption:"Registrieren",redirectText:"Du hast ein Konto?",redirectButtonText:"Melde dich an",redirectTo:"/login",errors:u,isLoading:O,children:[Object(te.jsx)(Ae.a,{control:a,name:"email",render:function(e){var t=e.field,n=t.onChange,r=t.onBlur,c=t.value,a=t.ref;return Object(te.jsx)(De,{placeholder:"E-Mail Adresse",onChange:n,onBlur:r,value:c||"",ref:a})}}),Object(te.jsx)(Ae.a,{control:a,name:"fullName",render:function(e){var t=e.field,n=t.onChange,r=t.onBlur,c=t.value,a=t.ref;return Object(te.jsx)(De,{placeholder:"Vollst\xe4ndiger Name",onChange:n,onBlur:r,value:c||"",ref:a})}}),Object(te.jsx)(Ae.a,{control:a,name:"username",render:function(e){var t=e.field,n=t.onChange,r=t.onBlur,c=t.value,a=t.ref;return Object(te.jsx)(De,{placeholder:"Benutzername",onChange:n,onBlur:r,value:c||"",ref:a})}}),Object(te.jsx)(Ae.a,{control:a,name:"password",render:function(e){var t=e.field,n=t.onChange,r=t.onBlur,c=t.value,a=t.ref;return Object(te.jsx)(De,{type:"password",placeholder:"Passwort",onChange:n,onBlur:r,value:c||"",ref:a})}})]})},Nt=function(){return Object(te.jsx)(He,{children:Object(te.jsx)(yt,{})})},kt=(n(300),function(e){var t=e.suggestions,n=e.loadSuggestions;return Object(te.jsx)("div",{className:"suggestions-list",children:t.map((function(e,t){return Object(te.jsx)("div",{className:"suggestions-list__suggestion",children:Object(te.jsx)(Ce,{user:e,avatarSizeInPx:44,buttonType:ne.PrimaryContained,handleSuccessfulSubscription:function(){return n()}},t)},e.userId)}))})}),Tt=function(){var e=Object(r.useState)(void 0),t=Object(p.a)(e,2),n=t[0],c=t[1],a=Object(r.useCallback)((function(){Y().then((function(e){return c(e.data.suggestions)}))}),[]);return Object(r.useEffect)((function(){a()}),[a]),Object(te.jsx)(te.Fragment,{children:n?Object(te.jsxs)(_t,{children:[Object(te.jsx)(wt,{children:"Vorschl\xe4ge f\xfcr dich"}),Object(te.jsx)(kt,{suggestions:n,loadSuggestions:a})]}):Object(te.jsx)(ge,{})})},St=function(e){var t=e.loggedInUsersFollowed,n=e.user,c=e.posts,a=e.followers,s=e.followed,i=e.reloadUserInformation,o=Object(r.useState)(!1),u=Object(p.a)(o,2),l=u[0],d=u[1],j=Object(r.useState)(!1),h=Object(p.a)(j,2),O=h[0],m=h[1],x=function(){var e=Object(b.a)(f.a.mark((function e(){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return d(!0),m(!1),e.next=4,ke(n.userId);case 4:return e.next=6,i();case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),g=function(){var e=Object(b.a)(f.a.mark((function e(){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return m(!0),d(!1),e.next=4,t=n.userId,H.delete(Pe(t));case 4:return e.next=6,i();case 6:case"end":return e.stop()}var t}),e)})));return function(){return e.apply(this,arguments)}}();return Object(te.jsx)(st,{user:n,posts:c,followers:a,followed:s,renderAvatar:function(e){return Object(te.jsx)(te.Fragment,{children:e})},renderButton:function(){var e=t.filter((function(e){return e.userId===n.userId})).length>0;return Object(te.jsx)(te.Fragment,{children:e?Object(te.jsx)(Ie,{isLoading:O,onClick:g,buttonType:ne.SecondaryContained,children:"Nicht mehr folgen"}):Object(te.jsx)(Ie,{isLoading:l,onClick:x,children:"Abonnieren"})})}})},Pt=function(){var e=Object(d.i)(),t=ht(e.params.userId),n=t.user,c=t.posts,a=t.followers,s=t.followed,i=t.reloadProfileInformation,o=Object(r.useState)(void 0),u=Object(p.a)(o,2),l=u[0],j=u[1],f=Object(r.useCallback)((function(){H.get(Se()).then((function(e){return j(e.data.followed)}))}),[]);return Object(r.useEffect)((function(){f()}),[f]),Object(te.jsx)(te.Fragment,{children:n&&c&&a&&s&&l?Object(te.jsx)(he,{children:Object(te.jsx)(St,{user:n,posts:c,followers:a,followed:s,loggedInUsersFollowed:l,reloadUserInformation:function(){i(),f()}})}):Object(te.jsx)(ge,{})})},Ct=function(e){var t=e.children,n=Object(_e.a)(e,["children"]),r=Object(i.c)((function(e){return e.authenticationState.loggedInUserId}));return Object(te.jsx)(d.b,Object(h.a)(Object(h.a)({},n),{},{children:r?t:Object(te.jsx)(d.a,{to:"/login"})}))},Bt=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Object(te.jsx)(Fe,{});return Object(te.jsx)(Ct,{path:"/",exact:!0,children:e})},Ft=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Object(te.jsx)(Nt,{});return Object(te.jsx)(d.b,{path:ie,children:e})},At=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Object(te.jsx)(Qe,{});return Object(te.jsx)(d.b,{path:oe,children:e})},zt=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Object(te.jsx)(Tt,{});return Object(te.jsx)(Ct,{path:ue,exact:!0,children:e})},Lt=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Object(te.jsx)(It,{});return Object(te.jsx)(Ct,{path:le,children:e})},Ut=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Object(te.jsx)(Ot,{});return Object(te.jsx)(Ct,{path:de,children:e})},Rt=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Object(te.jsx)(Pt,{});return Object(te.jsx)(Ct,{path:je,children:e})},Dt=(n(301),function(e){var t=e.Icon,n=e.ActiveIcon,r=e.to,c=e.dataTestId,a=Object(d.h)().pathname===r;return Object(te.jsx)(l.c,{"data-testid":c,exact:!0,to:r,className:"header-link",children:a?Object(te.jsx)(n,{size:24}):Object(te.jsx)(t,{size:24})})}),Et=(n(302),function(){var e=Object(d.g)(),t=et().readFileFromEvent,n=$e(),r=n.fileInputRef,c=n.pretendClickOnFileInput;return Object(te.jsxs)(tt,{onClick:function(){return c()},children:[Object(te.jsx)(Ze,{ref:r,onChange:function(n){t(n,(function(t){var n={selectedImageDataUri:t};e.push(function(e){return{pathname:"/new-post",state:e}}(n))}))},"data-testid":"hidden-new-post-input"}),Object(te.jsx)("div",{className:"add-new-post-link__prevent-click"}),Object(te.jsx)(Dt,{Icon:ct.h,ActiveIcon:ct.i,to:"/new-post",dataTestId:"new-post-page-link"})]})}),Mt=(n(303),function(){return Object(te.jsx)("div",{className:"header__page-padding",children:Object(te.jsx)("div",{className:"header",children:Object(te.jsxs)("div",{className:"header__content-wrapper",children:[Object(te.jsx)(Le,{size:"2rem"}),Object(te.jsxs)("div",{className:"header__links",children:[Object(te.jsx)(Dt,{Icon:ct.d,ActiveIcon:ct.e,to:"/",dataTestId:"index-page-link"}),Object(te.jsx)(Et,{}),Object(te.jsx)(Dt,{Icon:ct.b,ActiveIcon:ct.c,to:"/suggestions",dataTestId:"suggestions-page-link"}),Object(te.jsx)(Dt,{Icon:ct.f,ActiveIcon:ct.g,to:"/profiles/me",dataTestId:"my-profile-page-link"})]})]})})})}),qt=function(){return Object(te.jsxs)(d.d,{children:[At(),Ft(),Object(te.jsxs)(d.b,{children:[Object(te.jsx)(Mt,{}),Object(te.jsxs)(d.d,{children:[Bt(),zt(),Lt(),Ut(),Rt()]})]})]})},Jt=(n(304),function(){return Object(te.jsx)(u.a,{cloudName:"dikrrvf2t",children:Object(te.jsx)(l.a,{basename:"/",children:Object(te.jsx)(qt,{})})})}),Vt=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,318)).then((function(t){var n=t.getCLS,r=t.getFID,c=t.getFCP,a=t.getLCP,s=t.getTTFB;n(e),r(e),c(e),a(e),s(e)}))};s.a.render(Object(te.jsx)(c.a.StrictMode,{children:Object(te.jsx)(i.a,{store:q,children:Object(te.jsx)(o.a,{loading:null,persistor:J,children:Object(te.jsx)(Jt,{})})})}),document.getElementById("root")),Vt()}},[[305,1,2]]]);
//# sourceMappingURL=main.30253884.chunk.js.map