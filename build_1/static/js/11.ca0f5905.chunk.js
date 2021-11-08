(this["webpackJsonpfuse-react-app"]=this["webpackJsonpfuse-react-app"]||[]).push([[11],{1002:function(e,a,t){"use strict";t.r(a);var r=t(8),n=t(12),l=t(122),i=t(315),c=t(185),o=(t(10),t(0)),s=t.n(o),d=t(92),u=t(27),p=t(16),b=t.n(p),m=t(32),f=t(13),g=t(31),v=t.n(g),h=Object(f.b)("dashboardApp/widgets/getWidgets",Object(m.a)(b.a.mark((function e(){var a,t;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v.a.get("/api/project-dashboard-app/widgets");case 2:return a=e.sent,e.next=5,a.data;case 5:return t=e.sent,e.abrupt("return",t);case 7:case"end":return e.stop()}}),e)})))),w=Object(f.c)({}),j=w.getSelectors((function(e){return e.dashboardApp.widgets})),O=(j.selectEntities,j.selectById,Object(f.d)({name:"dashboardApp/widgets",initialState:w.getInitialState(),reducers:{},extraReducers:Object(u.a)({},h.fulfilled,w.setAll)}).reducer),x=t(883),E=t(33),y=t(104),S=Object(f.b)("dashboardApp/files/getFiles",(function(e){return new Promise((function(a,t){var r=E.a.db.ref("files/".concat(e.uid)),n=[],l=e.toDate,i=e.fromDate;r.on("value",(function(e){var t=e.val();t?Object.keys(t).map((function(e){e>=i&&e<=l&&n.push(t[e])})):a(n),a(n)}))}))})),k=Object(f.c)({}),N=k.getSelectors((function(e){return e.dashboardApp.files})),R=N.selectAll,I=(N.selectEntities,N.selectById,Object(f.d)({name:"dashboardApp/files",initialState:k.getInitialState(),reducers:{},extraReducers:Object(u.a)({},S.fulfilled,k.setAll)}));Object(x.a)(I.actions);var C=I.reducer,D=Object(d.c)({widgets:O,files:C}),H=t(947),T=t.n(H),A=t(463),_=t(980),B=t(809),W=t(998),P=t(790),M=t(78),q=t(906),z=t(161);var L=s.a.memo((function(e){return s.a.createElement(z.a,{className:"w-full rounded-8 shadow"},s.a.createElement("div",{className:"flex items-center px-16 h-52 border-b-1"},s.a.createElement(M.a,{className:"text-15 flex w-full",color:"black"},s.a.createElement("span",{className:"truncate"},e.widget.label))),s.a.createElement("div",{className:"text-center pt-12 pb-28"},s.a.createElement(M.a,{className:"leading-none text-blue",style:{fontSize:"3.5rem"}},e.widget.value),s.a.createElement(M.a,{className:"text-15",color:"black"},e.widget.label),s.a.createElement(M.a,{className:"text-12",color:"black"},"(",e.widget.des,")")))})),K=t(105),Q=t.n(K),U=t(58),V=t(6),Y=(t(243),t(314),t(884)),F={T:["Trial","Trial"],M:["Month to Date","Monthly"],Y:["Year to Date","Yearly"]},J={widget1:{currentRange:"requirements",id:"widget1",label:"Roles Processed",value:"0",des:""},widget2:{currentRange:"resumes",id:"widget2",label:"Roles Quota Available",value:"0",des:""},widget3:{currentRange:"requirements",id:"widget3",label:"Resumes Processed",value:"0",des:""},widget4:{currentRange:"resumes",id:"widget4",label:"Resumes Quota Available",value:"0",des:""}},X=Object(P.a)((function(e){return{content:{"& canvas":{maxHeight:"100%"}},selectedProject:{background:e.palette.primary.main,color:e.palette.primary.contrastText,borderRadius:"8px 0 0 0"},projectMenuButton:{background:e.palette.primary.main,color:e.palette.primary.contrastText,borderRadius:"0 8px 0 0",marginLeft:1},paper:{display:"flex",flexWrap:"wrap",justifyContent:"center","& > *":{padding:e.spacing(3)},paddingBottom:12},calendar:{display:"flex",flexWrap:"wrap",justifyContent:"center","& > *":{marginTop:e.spacing(1),padding:e.spacing(2)}}}}));a.default=Object(c.a)("dashboardApp",D)((function(e){var a=Object(V.b)(),t=X(e),c=Object(o.useRef)(null),d=Object(o.useState)(J),u=Object(n.a)(d,2),p=u[0],b=u[1],m=Object(V.c)((function(e){return e.auth.user})),f=Object(V.c)(R),g=Object(o.useState)(Q()().date(1)),h=Object(n.a)(g,2),w=h[0],j=h[1],O=Object(o.useState)(Q()()),x=Object(n.a)(O,2),E=x[0],k=x[1],N=Object(o.useState)(!0),I=Object(n.a)(N,2),C=I[0],D=I[1];Object(o.useEffect)((function(){v.a.put("".concat(y.a,"/dashboard/").concat(m.data.email)).then((function(e){var a=e.data;J=Object(r.a)(Object(r.a)({},J),{},{widget1:Object(r.a)(Object(r.a)({},J.widget1),{},{value:a.roles_processed?a.roles_processed:0,des:F[a.flag][0]})}),J=Object(r.a)(Object(r.a)({},J),{},{widget2:Object(r.a)(Object(r.a)({},p.widget2),{},{value:a.roles_quota_available?a.roles_quota_available:0,des:F[a.flag][1]})}),J=Object(r.a)(Object(r.a)({},J),{},{widget3:Object(r.a)(Object(r.a)({},J.widget3),{},{value:a.resumes_processed?a.resumes_processed:0,des:F[a.flag][0]})}),J=Object(r.a)(Object(r.a)({},J),{},{widget4:Object(r.a)(Object(r.a)({},J.widget4),{},{value:a.resumes_quota_available?a.resumes_quota_available:0,des:F[a.flag][1]})}),D(!1),b(J)}))}),[m]),Object(o.useEffect)((function(){E&&w&&a(S({uid:m.uid,toDate:Q()(E).format("x"),fromDate:Q()(w).format("x")}))}),[E,w]);return C?s.a.createElement(i.a,null):s.a.createElement(q.a,{classes:{toolbar:"min-h-48 h-48",rightSidebar:"w-288",content:t.content},header:s.a.createElement("div",{className:"p-24"},s.a.createElement("h3",null,"Welcome ".concat(m.data.displayName,"!"))),content:s.a.createElement("div",{className:"p-12"},s.a.createElement(l.a,{className:"flex flex-wrap",enter:{animation:"transition.slideUpBigIn"}},s.a.createElement("div",{className:"widget flex w-full sm:w-1/2 md:w-1/4 p-12"},s.a.createElement(L,{widget:p.widget1})),s.a.createElement("div",{className:"widget flex w-full sm:w-1/2 md:w-1/4 p-12"},s.a.createElement(L,{widget:p.widget2})),s.a.createElement("div",{className:"widget flex w-full sm:w-1/2 md:w-1/4 p-12"},s.a.createElement(L,{widget:p.widget3})),s.a.createElement("div",{className:"widget flex w-full sm:w-1/2 md:w-1/4 p-12"},s.a.createElement(L,{widget:p.widget4}))),s.a.createElement(l.a,{className:"flex flex-wrap p-12",style:{display:"flex",flexDirection:"column"},enter:{animation:"transition.slideUpBigIn"}},s.a.createElement("div",{className:t.paper},s.a.createElement(z.a,{elevation:1},s.a.createElement(M.a,null,"Your previous recommendations are available to download here"))),s.a.createElement("div",{className:t.calendar},s.a.createElement(z.a,null,s.a.createElement(B.a,{utils:_.a},s.a.createElement("div",{className:"text-center pt-12 pb-28"},s.a.createElement(W.a,{disableToolbar:!0,variant:"inline",format:"MM/dd/yyyy",margin:"normal",id:"date-picker-inline",label:"Date picker inline",value:w,onChange:function(e){e>E?a(Object(U.c)({message:"Please select correct date.",variant:"warning"})):j(e)},KeyboardButtonProps:{"aria-label":"change date"},style:{padding:5}}),s.a.createElement(W.a,{disableToolbar:!0,variant:"inline",format:"MM/dd/yyyy",margin:"normal",id:"date-picker-inline",label:"To date",value:E,onChange:function(e){e<w||e>Q()()?a(Object(U.c)({message:"Please select correct date.",variant:"warning"})):k(e)},KeyboardButtonProps:{"aria-label":"change date"},style:{padding:5}})))))),s.a.createElement(l.a,null,s.a.createElement("div",{className:"text-center pt-12 pb-28"},s.a.createElement(M.a,{className:"text-15",color:"textSecondary"},s.a.createElement(A.a,{variant:"contained",size:"large",startIcon:s.a.createElement(T.a,null),onClick:function(){var e=[];f.map((function(a){e.push(a.resumeFileDownloadURL),e.push(a.templateFileDownloadURL)})),console.log("===============================",e),Object(Y.b)(e)}},"Download"))))),ref:c})}))},884:function(e,a,t){"use strict";t.d(a,"a",(function(){return o})),t.d(a,"d",(function(){return s})),t.d(a,"c",(function(){return d})),t.d(a,"e",(function(){return u})),t.d(a,"b",(function(){return m}));var r=t(12),n=t(885),l=t(16),i=t.n(l),c=t(32),o=(t(31),t(105),"pk_test_51IpG96JcDAQtRcgIXbz0QpUgrBYVWZCzXy3NgQQKqKwW3KcOxu8AGnTR7VyetN76yZsrxKiz6RXjVBityxnOqaAL00IDnEjonM");function s(e){var a=e.replace(/^.*[\\\/]/,"");return[a.substring(0,a.lastIndexOf(".")),a.split(".").pop()]}function d(e){var a=(""+e).replace(/\D/g,"").match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);return a?[a[1]?"+1 ":"","(",a[2],") ",a[3],"-",a[4]].join(""):null}function u(e){return e.replace(/[^\d]/g,"")}var p=function(e){return new Promise((function(a){return setTimeout(a,e)}))},b=function(){var e=Object(c.a)(i.a.mark((function e(a,t){var r;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(r=document.createElement("a")).download=t,r.href=a,r.style.display="none",document.body.append(r),r.click(),e.next=8,p(100);case 8:r.remove();case 9:case"end":return e.stop()}}),e)})));return function(a,t){return e.apply(this,arguments)}}();function m(e){return f.apply(this,arguments)}function f(){return(f=Object(c.a)(i.a.mark((function e(a){var t,l,c,o,s,d,u,m=arguments;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=m.length>1&&void 0!==m[1]?m[1]:{},a){e.next=3;break}throw new Error("`urls` required");case 3:l=Object(n.a)(a.entries()),e.prev=4,l.s();case 6:if((c=l.n()).done){e.next=14;break}return o=Object(r.a)(c.value,2),s=o[0],d=o[1],u="function"===typeof t.rename?t.rename({url:d,index:s,urls:a}):"",e.next=11,p(1e3*s);case 11:b(d,u);case 12:e.next=6;break;case 14:e.next=19;break;case 16:e.prev=16,e.t0=e.catch(4),l.e(e.t0);case 19:return e.prev=19,l.f(),e.finish(19);case 22:case"end":return e.stop()}}),e,null,[[4,16,19,22]])})))).apply(this,arguments)}},906:function(e,a,t){"use strict";t.d(a,"a",(function(){return x}));var r=t(27),n=t(35),l=t(790),i=t(3),c=t(0),o=t.n(c),s=t(6),d=t(40),u=t(856),p=t(28);var b=function(e){var a=Object(d.a)(),t=Object(s.c)(Object(p.c)(a.palette.primary.main));return o.a.createElement("div",{className:e.classes.header},e.header&&o.a.createElement(u.a,{theme:t},e.header))},m=t(12),f=t(87),g=t(873),v=t(875);var h=function(e){var a=Object(d.a)(),t=Object(s.c)(Object(p.c)(a.palette.primary.main)),r=e.classes;return o.a.createElement(n.a,{enable:e.innerScroll},e.header&&o.a.createElement(u.a,{theme:t},o.a.createElement("div",{className:Object(i.default)(r.sidebarHeader,e.variant,e.sidebarInner&&r.sidebarHeaderInnerSidebar)},e.header)),e.content&&o.a.createElement("div",{className:r.sidebarContent},e.content))};var w=o.a.forwardRef((function(e,a){var t=Object(c.useState)(!1),r=Object(m.a)(t,2),n=r[0],l=r[1],s=e.classes;Object(c.useImperativeHandle)(a,(function(){return{toggleSidebar:d}}));var d=function(){l(!n)};return o.a.createElement(o.a.Fragment,null,o.a.createElement(g.a,{lgUp:"permanent"===e.variant},o.a.createElement(v.a,{variant:"temporary",anchor:e.position,open:n,onOpen:function(e){},onClose:function(e){return d()},disableSwipeToOpen:!0,classes:{root:Object(i.default)(s.sidebarWrapper,e.variant),paper:Object(i.default)(s.sidebar,e.variant,"left"===e.position?s.leftSidebar:s.rightSidebar)},ModalProps:{keepMounted:!0},container:e.rootRef.current,BackdropProps:{classes:{root:s.backdrop}},style:{position:"absolute"}},o.a.createElement(h,e))),"permanent"===e.variant&&o.a.createElement(g.a,{mdDown:!0},o.a.createElement(f.a,{variant:"permanent",className:Object(i.default)(s.sidebarWrapper,e.variant),open:n,classes:{paper:Object(i.default)(s.sidebar,e.variant,"left"===e.position?s.leftSidebar:s.rightSidebar)}},o.a.createElement(h,e))))})),j=Object(l.a)((function(e){return{root:{display:"flex",flexDirection:"column",minHeight:"100%",position:"relative",flex:"1 0 auto",height:"auto",backgroundColor:e.palette.background.default},innerScroll:{flex:"1 1 auto",height:"100%"},wrapper:{display:"flex",flexDirection:"row",flex:"1 1 auto",zIndex:2,maxWidth:"100%",minWidth:0,height:"100%",backgroundColor:e.palette.background.default},header:{height:60,minHeight:60,display:"flex",background:"linear-gradient(to left, ".concat(e.palette.primary.dark," 0%, ").concat(e.palette.primary.main," 100%)"),color:e.palette.primary.contrastText,backgroundSize:"cover",backgroundColor:e.palette.primary.dark},topBg:{position:"absolute",left:0,right:0,top:0,height:60,pointerEvents:"none"},contentWrapper:{display:"flex",flexDirection:"column",flex:"1 1 auto",overflow:"auto","-webkit-overflow-scrolling":"touch",zIndex:9999},toolbar:{height:64,minHeight:64,display:"flex",alignItems:"center"},content:{flex:"1 0 auto"},sidebarWrapper:{overflow:"hidden",backgroundColor:"transparent",position:"absolute","&.permanent":Object(r.a)({},e.breakpoints.up("lg"),{position:"relative"})},sidebar:{position:"absolute","&.permanent":Object(r.a)({},e.breakpoints.up("lg"),{backgroundColor:e.palette.background.default,color:e.palette.text.primary,position:"relative"}),width:240,height:"100%"},leftSidebar:Object(r.a)({},e.breakpoints.up("lg"),{borderRight:"1px solid ".concat(e.palette.divider),borderLeft:0}),rightSidebar:Object(r.a)({},e.breakpoints.up("lg"),{borderLeft:"1px solid ".concat(e.palette.divider),borderRight:0}),sidebarHeader:{height:60,minHeight:60,backgroundColor:e.palette.primary.dark,color:e.palette.primary.contrastText},sidebarHeaderInnerSidebar:{backgroundColor:"transparent",color:"inherit",height:"auto",minHeight:"auto"},sidebarContent:{},backdrop:{position:"absolute"}}})),O=o.a.forwardRef((function(e,a){var t=Object(c.useRef)(null),r=Object(c.useRef)(null),l=Object(c.useRef)(null),s=j(e);return o.a.useImperativeHandle(a,(function(){return{rootRef:l,toggleLeftSidebar:function(){t.current.toggleSidebar()},toggleRightSidebar:function(){r.current.toggleSidebar()}}})),o.a.createElement("div",{className:Object(i.default)(s.root,e.innerScroll&&s.innerScroll),ref:l},o.a.createElement("div",{className:Object(i.default)(s.header,s.topBg)}),o.a.createElement("div",{className:"flex flex-auto flex-col container z-10 h-full"},e.header&&e.sidebarInner&&o.a.createElement(b,{header:e.header,classes:s}),o.a.createElement("div",{className:s.wrapper},(e.leftSidebarHeader||e.leftSidebarContent)&&o.a.createElement(w,{position:"left",header:e.leftSidebarHeader,content:e.leftSidebarContent,variant:e.leftSidebarVariant||"permanent",innerScroll:e.innerScroll,sidebarInner:e.sidebarInner,classes:s,ref:t,rootRef:l}),o.a.createElement(n.a,{className:s.contentWrapper,enable:e.innerScroll&&!e.sidebarInner},e.header&&!e.sidebarInner&&o.a.createElement(b,{header:e.header,classes:s}),e.contentToolbar&&o.a.createElement("div",{className:s.toolbar},e.contentToolbar),e.content&&o.a.createElement("div",{className:s.content},e.content)),(e.rightSidebarHeader||e.rightSidebarContent)&&o.a.createElement(w,{position:"right",header:e.rightSidebarHeader,content:e.rightSidebarContent,variant:e.rightSidebarVariant||"permanent",innerScroll:e.innerScroll,sidebarInner:e.sidebarInner,classes:s,ref:r,rootRef:l}))))}));O.defaultProps={};var x=o.a.memo(O)}}]);