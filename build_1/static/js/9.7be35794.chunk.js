(this["webpackJsonpfuse-react-app"]=this["webpackJsonpfuse-react-app"]||[]).push([[9],{1003:function(e,t,n){"use strict";n.r(t);var a=n(74),r=n(803),c=n(804),i=n(790),u=n(66),s=n(925),o=n(923),l=n(924),p=n(3),d=n(0),f=n.n(d),b=n(24),m=n(27),v=n(8),j=n(12),O=n(83),h=n(315),x=n(823),g=n(463),y=n(6),w=(n(948),n(90)),S=(n(10),n(949)),A=n.n(S);function k(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return e.replace(/\D+/g,"")}var E=n(892),P=n(185),C=n(890),I=n(58),X=n(31),N=n.n(X),B=n(104),_=n(887),R=n(884),q={name:"",number:"",expiry:"",cvc:"",saveFlag:"insert"};var T=Object(P.a)("profileApp",C.a)((function(e){var t=Object(y.b)(),n=Object(y.c)((function(e){return e.profileApp.stripeProducts.stripe})),a=Object(y.c)(_.f),r=Object(y.c)(E.d),c=Object(y.c)((function(e){return e.auth.user})),i=Object(O.c)(q),u=i.form,s=(i.handleChange,i.setForm),o=Object(d.useState)(null),l=Object(j.a)(o,2),p=(l[0],l[1]),b=Object(d.useState)(!1),S=Object(j.a)(b,2),P=(S[0],S[1],Object(d.useState)(!0)),C=Object(j.a)(P,2),X=C[0],R=C[1],T=Object(d.useRef)(null),F=Object(d.useState)({number:"",name:"",expiry:"",cvc:"",saveFlag:"insert"}),Y=Object(j.a)(F,2),D=Y[0],J=Y[1];Object(d.useEffect)((function(){t(Object(_.d)({uid:c.uid})),t(Object(E.b)({uid:c.uid})).then(R(!1))}),[t]),Object(d.useEffect)((function(){if(r.length>0&&r[0].number){s(Object(v.a)(Object(v.a)({},u),r[0]));var e=r[0].number.split(" "),t=e[e.length-1];J({name:"XXX",number:"XXXX XXXX XXXX ".concat(t),expiry:"XX/XX",cvc:"XXX",saveFlag:"update"})}else s(q),J(q)}),[r]);var V=function(e){N.a.post("".concat(B.b,"/retrieveInvoice"),{id:e}).then((function(e){e.data;t(Object(E.c)(Object(v.a)(Object(v.a)({},u),{},{uid:c.uid}))).then((function(){w.a.push({pathname:"/pages/profile/business"})})).catch((function(){t(Object(I.c)({message:"Mailing process failed",variant:"warning"})),R(!1)}))}))},K=function(e){var t=e.target;p(t.name)},M=function(e){var t=e.target;"number"===t.name?t.value=function(e){if(!e)return e;var t,n=A.a.fns.cardType(e),a=k(e);switch(n){case"amex":t="".concat(a.slice(0,4)," ").concat(a.slice(4,10)," ").concat(a.slice(10,15));break;case"dinersclub":t="".concat(a.slice(0,4)," ").concat(a.slice(4,10)," ").concat(a.slice(10,14));break;default:t="".concat(a.slice(0,4)," ").concat(a.slice(4,8)," ").concat(a.slice(8,12)," ").concat(a.slice(12,19))}return t.trim()}(t.value):"expiry"===t.name?t.value=function(e){var t=k(e);return t.length>=3?"".concat(t.slice(0,2),"/").concat(t.slice(2,4)):t}(t.value):"cvc"===t.name&&(t.value=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},a=k(e),r=4;if(n.number){var c=A.a.fns.cardType(n.number);r="amex"===c?4:3}return a.slice(0,r)}(t.value)),"name"===t.name?s(Object(v.a)(Object(v.a)({},u),{},Object(m.a)({},t.name,t.value))):t.value.includes("X")||s(Object(v.a)(Object(v.a)({},u),{},Object(m.a)({},t.name,t.value))),J(Object(v.a)(Object(v.a)({},D),{},Object(m.a)({},t.name,t.value)))},Q=function(){u.name?N.a.post("".concat(B.b,"/createCardToken"),{name:u.name,number:u.number,exp_year:u.expiry.split("/")[1],exp_month:u.expiry.split("/")[0],cvc:u.cvc}).then((function(e){var t=e.data.id;z(t)})).catch((function(){t(Object(I.c)({message:"Your Credit Card could not be verified. Please re-enter your credit card or try with another card",variant:"warning"})),R(!1)})):z()},z=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;console.log("createSubscription1  "),t(Object(_.a)({user:c,stripe:n,token:e})).then((function(e){var n=e.payload;t(Object(_.e)({uid:c.uid,data:n.data})),N.a.post("".concat(B.e,"/jobsage-sai-cust-dash-promocode-upd-cors"),{parm_user_mail:"arvind.1983.sai@gmail.com",parm_code:"YLY2022"}).then((function(e){console.log("Rekommender after dashboard update "+e.data)})).catch((function(e){console.log("err "+e)})),console.log("response data "+JSON.stringify(n.data));var a=n.data.response.latest_invoice;V(a)})).catch((function(e){t(Object(I.c)({message:e.message,variant:"warning"})),R(!1)}))},G=function(){a.length>0?((0===r.length||r.length>0&&r[0].number!==u.number)&&N.a.post("".concat(B.b,"/createCardToken"),{name:u.name,number:u.number,exp_year:u.expiry.split("/")[1],exp_month:u.expiry.split("/")[0],cvc:u.cvc}).then((function(e){var t=e.data.id;N.a.post("".concat(B.b,"/updateCustomer"),{id:a[0].customer.id,source:t})})).catch((function(){t(Object(I.c)({message:"Your Billing request could not create. Please re-enter your credit card or try with another card",variant:"warning"})),R(!1)})),c.data.promoCode!==a[0].response.plan.nickname?N.a.post("".concat(B.b,"/cancelSubscription-1"),{id:a[0].id}).then((function(){t(Object(_.c)({uid:c.uid,subId:a[0].id})).then((function(){Q()}))})).catch((function(e){console.log("unable to cancel subscription "+e),R(!1),t(Object(I.c)({message:"There was error processing your request. Please contact Jobsage Support",variant:"warning"}))})):t(Object(_.g)({subscription:a,stripe:n})).then((function(e){var n=e.payload,r=Object(v.a)(Object(v.a)({},a[0]),{},{response:Object(v.a)(Object(v.a)({},a[0].response),{},{items:Object(v.a)(Object(v.a)({},a[0].response.items),{},{data:[n.data]})})});t(Object(_.e)({uid:c.uid,data:r})).then((function(){N.a.post("".concat(B.a,"/afterpayment"),{promo_code:c.data.promoCode,user_email:c.data.email})}));var i=r.response.latest_invoice;V(i)})).catch((function(){t(Object(I.c)({message:"Your Billing request could not update. Please re-enter your credit card or try with another card",variant:"warning"})),R(!1)}))):Q()};return X?f.a.createElement(h.a,null):f.a.createElement("div",{className:"w-full"},f.a.createElement("form",{className:"flex flex-col justify-center w-full",ref:T,autoComplete:"off",onSubmit:function(e){R(!0),e.preventDefault(),G()}},f.a.createElement(x.a,{type:"text",name:"name",className:"my-16",value:D.name,label:"Name of Credit Card Holder",required:!0,onChange:M,onFocus:K,variant:"outlined"}),f.a.createElement(x.a,{type:"tel",name:"number",className:"mb-16",label:"Credit Card",value:D.number,pattern:"[\\d| ]{16,22}",required:!0,onChange:M,onFocus:K,variant:"outlined"}),f.a.createElement(x.a,{type:"tel",name:"expiry",className:"mb-16",label:"Expiration Date(MM/YY)",value:D.expiry,pattern:"\\d\\d/\\d\\d",required:!0,onChange:M,onFocus:K,variant:"outlined"}),f.a.createElement(x.a,{type:"tel",name:"cvc",className:"mb-16",label:"CVV",value:D.cvc,pattern:"\\d{3,4}",required:!0,onChange:M,onFocus:K,variant:"outlined"}),f.a.createElement(g.a,{type:"submit",variant:"contained",color:"primary",className:"w-full mx-auto mt-16 normal-case","aria-label":"REGISTER WITH FIREBASE"},"Upgrade")))})),F=n(953),Y=n(954),D=Object(Y.a)(R.a);var J=function(e){return f.a.createElement("div",{className:"w-full"},f.a.createElement(F.Elements,{stripe:D},f.a.createElement(T,null)))},V=Object(i.a)((function(e){return{root:{background:"linear-gradient(to left, ".concat(e.palette.primary.dark," 0%, ").concat(Object(u.darken)(e.palette.primary.dark,.5)," 100%)"),color:e.palette.primary.contrastText},leftSection:{},rightSection:{background:"linear-gradient(to left, ".concat(e.palette.primary.dark," 0%, ").concat(Object(u.darken)(e.palette.primary.dark,.5)," 100%)"),color:e.palette.primary.contrastText}}}));t.default=Object(P.a)("profileApp",C.a)((function(){var e=V();return Object(y.c)((function(e){return e.auth.user})),f.a.createElement("div",{className:Object(p.default)(e.root,"flex flex-col flex-auto items-center justify-center flex-shrink-0 p-16 md:p-24")},f.a.createElement(a.a,{animation:"transition.expandIn"},f.a.createElement("div",{className:"flex w-full max-w-400 rounded-12 shadow-2xl overflow-hidden"},f.a.createElement(r.a,{className:Object(p.default)(e.leftSection,"flex flex-col w-full max-w-sm items-center justify-center shadow-0"),square:!0},f.a.createElement(c.a,{className:"flex flex-col items-center justify-center w-full py-96 max-w-320"},f.a.createElement(a.a,{delay:300},f.a.createElement("div",{className:"flex w-full items-center justif-center mb-32"},f.a.createElement(s.a,{className:"w-full",activeStep:1,alternativeLabel:!0},f.a.createElement(o.a,{key:"profile"},f.a.createElement(l.a,null,f.a.createElement(b.a,{className:"font-medium",to:"/pages/profile/profile"},"Profile"))),f.a.createElement(o.a,{key:"billing"},f.a.createElement(l.a,null,"Billing Details"))))),f.a.createElement(J,null)),f.a.createElement("div",{className:"flex flex-col items-center justify-center pb-32"})))))}))},884:function(e,t,n){"use strict";n.d(t,"a",(function(){return s})),n.d(t,"d",(function(){return o})),n.d(t,"c",(function(){return l})),n.d(t,"e",(function(){return p})),n.d(t,"b",(function(){return b}));var a=n(12),r=n(885),c=n(16),i=n.n(c),u=n(32),s=(n(31),n(105),"pk_test_51IpG96JcDAQtRcgIXbz0QpUgrBYVWZCzXy3NgQQKqKwW3KcOxu8AGnTR7VyetN76yZsrxKiz6RXjVBityxnOqaAL00IDnEjonM");function o(e){var t=e.replace(/^.*[\\\/]/,"");return[t.substring(0,t.lastIndexOf(".")),t.split(".").pop()]}function l(e){var t=(""+e).replace(/\D/g,"").match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);return t?[t[1]?"+1 ":"","(",t[2],") ",t[3],"-",t[4]].join(""):null}function p(e){return e.replace(/[^\d]/g,"")}var d=function(e){return new Promise((function(t){return setTimeout(t,e)}))},f=function(){var e=Object(u.a)(i.a.mark((function e(t,n){var a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(a=document.createElement("a")).download=n,a.href=t,a.style.display="none",document.body.append(a),a.click(),e.next=8,d(100);case 8:a.remove();case 9:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}();function b(e){return m.apply(this,arguments)}function m(){return(m=Object(u.a)(i.a.mark((function e(t){var n,c,u,s,o,l,p,b=arguments;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=b.length>1&&void 0!==b[1]?b[1]:{},t){e.next=3;break}throw new Error("`urls` required");case 3:c=Object(r.a)(t.entries()),e.prev=4,c.s();case 6:if((u=c.n()).done){e.next=14;break}return s=Object(a.a)(u.value,2),o=s[0],l=s[1],p="function"===typeof n.rename?n.rename({url:l,index:o,urls:t}):"",e.next=11,d(1e3*o);case 11:f(l,p);case 12:e.next=6;break;case 14:e.next=19;break;case 16:e.prev=16,e.t0=e.catch(4),c.e(e.t0);case 19:return e.prev=19,c.f(),e.finish(19);case 22:case"end":return e.stop()}}),e,null,[[4,16,19,22]])})))).apply(this,arguments)}},887:function(e,t,n){"use strict";n.d(t,"d",(function(){return f})),n.d(t,"a",(function(){return b})),n.d(t,"g",(function(){return m})),n.d(t,"e",(function(){return v})),n.d(t,"c",(function(){return j})),n.d(t,"f",(function(){return x}));var a=n(883),r=n(27),c=n(16),i=n.n(c),u=n(32),s=n(13),o=n(31),l=n.n(o),p=n(33),d=n(104),f=Object(s.b)("profileApp/subscription",(function(e){return new Promise((function(t,n){var a=p.a.db.ref("subscriptions/".concat(e.uid,"/")),r=[];a.on("value",(function(e){var n=e.val();n?Object.keys(n).map((function(e){r.push(n[e])})):t(r),t(r)}))}))})),b=Object(s.b)("profileApp/createSubscription",(function(e){return new Promise((function(t,n){var a=e.user,r=e.stripe,c=e.token;l.a.post("".concat(d.b,"/createCustomerAndSubscription"),{name:a.data.displayName,source:c,email:a.data.email,planId:r.planId,trial_end:"1625268687"}).then((function(e){t(e)})).catch((function(e){t(e)}))}))})),m=Object(s.b)("profileApp/updateSubscription",(function(e){return new Promise((function(t,n){var a=e.subscription,r=e.stripe;l.a.post("".concat(d.b,"/updateSubscription1"),{id:a[0].id,priceId:r.planId}).then((function(e){t(e)})).catch((function(e){t(e)}))}))})),v=Object(s.b)("profileApp/subscription/save",function(){var e=Object(u.a)(i.a.mark((function e(t,n){var a,r;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=n.dispatch,n.getState,e.next=3,l.a.post("/api/profile-app/subscription/save",t);case 3:return r=e.sent,e.next=6,r.data;case 6:return e.sent,e.abrupt("return",a(f({uid:t.uid})));case 8:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()),j=Object(s.b)("profileApp/subscription/delete",function(){var e=Object(u.a)(i.a.mark((function e(t,n){var a,r;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=n.dispatch,n.getState,e.next=3,l.a.post("/api/profile-app/subscription/delete",t);case 3:return r=e.sent,e.next=6,r.data;case 6:return e.sent,e.abrupt("return",a(f({uid:t.uid})));case 8:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()),O=Object(s.c)({}),h=O.getSelectors((function(e){return e.profileApp.subscriptions})),x=h.selectAll,g=(h.selectById,Object(s.d)({name:"profileApp/subscriptions",initialState:O.getInitialState({}),reducers:{},extraReducers:Object(r.a)({},f.fulfilled,O.setAll)}));Object(a.a)(g.actions),t.b=g.reducer},888:function(e,t,n){"use strict";n.d(t,"b",(function(){return f}));var a=n(883),r=n(27),c=n(16),i=n.n(c),u=n(32),s=n(13),o=n(31),l=n.n(o),p=n(33),d=Object(s.b)("profileApp/stripePlan",(function(e){return new Promise((function(t,n){var a=p.a.db.ref("stripePlans/".concat(e.uid,"/")),r=[];a.on("value",(function(e){var n=e.val();n?Object.keys(n).map((function(e){r.push(n[e])})):t(r),t(r)}))}))})),f=Object(s.b)("profileApp/stripePlan/save",function(){var e=Object(u.a)(i.a.mark((function e(t,n){var a,r;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=n.dispatch,n.getState,e.next=3,l.a.post("/api/profile-app/stripePlan/save",t);case 3:return r=e.sent,e.next=6,r.data;case 6:return e.sent,e.abrupt("return",a(d(t)));case 8:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()),b=(Object(s.b)("profileApp/stripePlan/delete",function(){var e=Object(u.a)(i.a.mark((function e(t,n){var a,r;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=n.dispatch,n.getState,e.next=3,l.a.post("/api/profile-app/stripePlan/delete",t);case 3:return r=e.sent,e.next=6,r.data;case 6:return e.sent,e.abrupt("return",a(d({uid:t.uid})));case 8:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()),Object(s.c)({})),m=b.getSelectors((function(e){return e.profileApp.stripePlans})),v=(m.selectAll,m.selectById,Object(s.d)({name:"profileApp/stripePlans",initialState:b.getInitialState({}),reducers:{},extraReducers:Object(r.a)({},d.fulfilled,b.setAll)}));Object(a.a)(v.actions),t.a=v.reducer},889:function(e,t,n){"use strict";n.d(t,"b",(function(){return d})),n.d(t,"c",(function(){return v}));var a=n(27),r=n(16),c=n.n(r),i=n(32),u=n(13),s=n(31),o=n.n(s),l=n(33),p=Object(u.b)("profileApp/stripeProduct",(function(e){return new Promise((function(e,t){var n=l.a.db.ref("stripeProducts/"),a=[];n.on("value",(function(t){var n=t.val();n?Object.keys(n).map((function(e){a.push(n[e])})):e(a),e(a)}))}))})),d=Object(u.b)("profileApp/stripeProduct/save",function(){var e=Object(i.a)(c.a.mark((function e(t,n){var a,r;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n.dispatch,n.getState,e.next=3,o.a.post("/api/profile-app/stripeProduct/save",t);case 3:return a=e.sent,e.next=6,a.data;case 6:return r=e.sent,e.abrupt("return",r);case 8:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()),f=(Object(u.b)("profileApp/stripeProduct/delete",function(){var e=Object(i.a)(c.a.mark((function e(t,n){var a,r;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=n.dispatch,n.getState,e.next=3,o.a.post("/api/profile-app/stripeProduct/delete",t);case 3:return r=e.sent,e.next=6,r.data;case 6:return e.sent,e.abrupt("return",a(p({uid:t.uid})));case 8:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()),Object(u.c)({})),b=f.getSelectors((function(e){return e.profileApp.stripeProducts})),m=(b.selectAll,b.selectById,Object(u.d)({name:"profileApp/stripeProducts",initialState:f.getInitialState({stripe:{productId:"",planId:""}}),reducers:{setStripe:{reducer:function(e,t){e.stripe=t.payload}}},extraReducers:Object(a.a)({},p.fulfilled,f.setAll)})),v=m.actions.setStripe;t.a=m.reducer},890:function(e,t,n){"use strict";var a=n(92),r=n(891),c=n(313),i=n(892),u=n(887),s=n(888),o=n(889),l=Object(a.c)({business:r.a,profile:c.a,creditCard:i.a,subscriptions:u.b,stripePlans:s.a,stripeProducts:o.a});t.a=l},891:function(e,t,n){"use strict";n.d(t,"b",(function(){return f})),n.d(t,"c",(function(){return b})),n.d(t,"d",(function(){return j}));var a=n(27),r=n(16),c=n.n(r),i=n(900),u=n(32),s=n(13),o=n(31),l=n.n(o),p=(n(29),n(33)),d=n(58),f=Object(s.b)("profileApp/business/getBusiness",(function(e){return new Promise((function(t,n){var a=p.a.db.ref("business/".concat(e.uid,"/")),r=[];a.on("value",(function(e){var n=e.val();n&&r.push(n),t(r)}))}))})),b=Object(s.b)("profileApp/business/saveBusiness",function(){var e=Object(u.a)(c.a.mark((function e(t,n){var a,r,u;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.form,r=n.dispatch,n.getState,e.next=4,l.a.post("/api/profile-app/business/save",a);case 4:return u=e.sent,e.next=7,u.data;case 7:return e.sent,Object(i.a)("response"),e.next=11,l.a.post("/api/profile-app/business/mysql/save",a);case 11:return u=e.sent,Object(i.a)("data"),e.next=15,u.data;case 15:e.sent,r(Object(d.c)({message:"Your data saved to database"}));case 17:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()),m=(Object(s.b)("profileApp/business/updateBusiness",function(){var e=Object(u.a)(c.a.mark((function e(t,n){var a,r,i,u;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.form,r=t.routeParams,i=n.dispatch,n.getState,e.next=4,l.a.post("/api/profile-app/business/update",a);case 4:return u=e.sent,e.next=7,u.data;case 7:e.sent,i(f(r));case 9:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()),Object(s.c)({})),v=m.getSelectors((function(e){return e.profileApp.business})),j=v.selectAll,O=(v.selectById,Object(s.d)({name:"profileApp/business",initialState:m.getInitialState(),reducers:{},extraReducers:Object(a.a)({},f.fulfilled,m.setAll)}));t.a=O.reducer},892:function(e,t,n){"use strict";n.d(t,"b",(function(){return p})),n.d(t,"c",(function(){return d})),n.d(t,"d",(function(){return m}));var a=n(27),r=n(16),c=n.n(r),i=n(32),u=n(13),s=n(31),o=n.n(s),l=n(33),p=Object(u.b)("profileApp/creditCard",(function(e){return new Promise((function(t,n){var a=l.a.db.ref("credit/".concat(e.uid,"/")),r=[];a.on("value",(function(e){var n=e.val();n&&r.push(n),t(r)}))}))})),d=Object(u.b)("profileApp/creditCard/save",function(){var e=Object(i.a)(c.a.mark((function e(t,n){var a,r;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=n.dispatch,n.getState,e.next=3,o.a.post("/api/profile-app/creditCard/save",t);case 3:return r=e.sent,e.next=6,r.data;case 6:return e.sent,e.abrupt("return",a(p({uid:t.uid})));case 8:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()),f=Object(u.c)({}),b=f.getSelectors((function(e){return e.profileApp.creditCard})),m=b.selectAll,v=(b.selectById,Object(u.d)({name:"profileApp/creditCard",initialState:f.getInitialState({}),reducers:{},extraReducers:Object(a.a)({},p.fulfilled,f.setAll)}));v.actions.setActiveStep;t.a=v.reducer}}]);