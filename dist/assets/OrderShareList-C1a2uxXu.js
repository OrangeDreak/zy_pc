import{a as _}from"./orderList-CywECxmE.js";import{_ as A,z as D,c as r,o,d as a,a as n,w as l,e as u,t as s,E as O,x as v,F as k,f as b,i as y,q as P}from"./index-CeCSaknX.js";import"./request-Db42XEdn.js";import"./currency-DoSCd0KH.js";const T=D({name:"OrderShareList",data(){return{isMounted:!1,orders:[],total:0,loading:!1,error:null,status:-1,pagination:{currentPage:1,pageSize:10}}},mounted(){this.isMounted=!0,this.$nextTick(()=>this.loadOrders())},methods:{async loadOrders(){var t,d,h;if(this.isMounted)try{this.loading=!0;const c={pageNo:this.pagination.currentPage,pageSize:this.pagination.pageSize};if((t=this.$route.query)!=null&&t.code){const p=await _.decodeSharingCode({code:(d=this.$route.query)==null?void 0:d.code});if((h=p.data)!=null&&h.userNo){c.userNo=p.data.userNo;const f=await _.sharingListForBusiness(c);this.orders=f.data,this.total=f.total}else throw new Error("UserNo is missing in the response")}else{const p=await _.sharingListForBusiness(c);this.orders=p.data,this.total=p.total}}catch(c){this.error=c.message||"获取订单失败",O.error("获取订单列表失败")}finally{this.loading=!1}},tableRowClassName({row:t}){return t.isMark?"status-mark":""},handleSizeChange(t){this.pagination.pageSize=t,this.loadOrders()},handleCurrentChange(t){this.pagination.currentPage=t,this.loadOrders()}}}),B={class:"order-list"},F={class:"order-list-content"},M={class:"user-info"},U={key:0},E={key:0},V={key:0},q={class:"timeline"},R={class:"image-list"},W={key:1,class:"estimate-info"},j={key:0},G={class:"timeline"},H={class:"pagination"},J={class:"total"};function K(t,d,h,c,p,f){const g=u("el-table-column"),N=u("el-timeline-item"),$=u("el-timeline"),C=u("el-popover"),L=u("el-image"),z=u("el-tag"),S=u("el-table"),I=u("el-pagination");return o(),r("div",B,[a("div",F,[n(S,{data:t.orders,style:{width:"100%"},"row-class-name":t.tableRowClassName},{default:l(()=>[n(g,{prop:"userNo",label:t.$t("package.table.customerCode"),width:"100"},null,8,["label"]),n(g,{prop:"userNo",label:t.$t("package.table.addressInfo"),width:"320"},{default:l(({row:e})=>[a("div",M,[e.status<10?(o(),r("div",U,[a("div",null,s(t.$t("customers.info.name"))+"："+s(e.userAddressInfo.firstName),1),a("div",null,s(t.$t("customers.info.postcode"))+"："+s(e.userAddressInfo.postcode),1),a("div",null,s(t.$t("customers.info.phoneNumber"))+"："+s(e.userAddressInfo.mobile),1),a("div",null,s(t.$t("customers.info.email"))+"："+s(e.userAddressInfo.email),1),a("div",null,s(t.$t("customers.info.address"))+"："+s(e.userAddressInfo.countryName)+" "+s(e.userAddressInfo.provinceName)+" "+s(e.userAddressInfo.cityName)+" "+s(e.userAddressInfo.address),1)])):v("",!0)])]),_:1},8,["label"]),n(g,{prop:"logisticsNumber",label:t.$t("package.table.expressDelivery")},{default:l(({row:e})=>[e.status<10?(o(),r("div",E,[a("div",null,s(t.$t("trackingNumber"))+"："+s(e.logisticsNumber),1),n(C,{width:800},{reference:l(()=>{var i;return[e.trackingList&&e.trackingList.length>0?(o(),r("div",V,s(t.$t("logisticsTrack"))+"："+s(e.trackingList&&((i=e.trackingList[0])==null?void 0:i.logisticsDesc)),1)):v("",!0)]}),default:l(()=>[a("div",q,[n($,null,{default:l(()=>[(o(!0),r(k,null,b(e.trackingList,(i,m)=>(o(),y(N,{key:m,timestamp:i.gmtTime,placement:"top"},{default:l(()=>[a("p",null,s(i.logisticsDesc),1)]),_:2},1032,["timestamp"]))),128))]),_:2},1024)])]),_:2},1024),a("div",R,[(o(!0),r(k,null,b(e.imgUrlList,(i,m)=>(o(),r("div",{key:i,class:"block"},[n(L,{class:"image-list-item",style:{width:"60px",height:"60px"},"close-on-press-escape":"","preview-teleported":"",src:i,"zoom-rate":1.2,"max-scale":7,"min-scale":.2,"preview-src-list":e.imgUrlList,"initial-index":m,"z-index":"8",fit:"cover"},null,8,["src","preview-src-list","initial-index"])]))),128))])])):(o(),r("div",W,[a("div",null,[a("div",null,"国际单号："+s(e.orderNo),1),a("div",null,"物流线路："+s(e.logisticsLine),1),n(C,{width:800},{reference:l(()=>{var i;return[e.trackingList&&e.trackingList.length>0?(o(),r("div",j,s(t.$t("logisticsTrack"))+"："+s(e.trackingList&&((i=e.trackingList[0])==null?void 0:i.logisticsDesc)),1)):v("",!0)]}),default:l(()=>[a("div",G,[n($,null,{default:l(()=>[(o(!0),r(k,null,b(e.trackingList,(i,m)=>(o(),y(N,{key:m,timestamp:i.gmtTime,placement:"top"},{default:l(()=>[a("p",null,s(i.logisticsDesc),1)]),_:2},1032,["timestamp"]))),128))]),_:2},1024)])]),_:2},1024),a("div",null,"包裹运费："+s(e.estimateFreightPrice),1)]),a("div",null,[a("div",null," 长 "+s(e.length)+"，宽"+s(e.width)+"，高"+s(e.height),1),a("div",null,s(e.realWeight)+"kg；内含8件",1),d[2]||(d[2]=a("div",null,"在途 7 天",-1))])]))]),_:1},8,["label"]),n(g,{prop:"gmtCreate",label:t.$t("commont.createTime"),width:"100"},null,8,["label"]),n(g,{prop:"statusDesc",label:t.$t("package.table.latestStatus"),width:"100"},{default:l(({row:e})=>[n(z,null,{default:l(()=>[P(s(e.statusDesc),1)]),_:2},1024)]),_:1},8,["label"])]),_:1},8,["data","row-class-name"])]),a("div",H,[a("div",J,s(t.$t("commont.total"))+" "+s(t.total)+" "+s(t.$t("commont.page")),1),n(I,{"current-page":t.pagination.currentPage,"onUpdate:currentPage":d[0]||(d[0]=e=>t.pagination.currentPage=e),"page-size":t.pagination.pageSize,"onUpdate:pageSize":d[1]||(d[1]=e=>t.pagination.pageSize=e),"page-sizes":[10,20,50],total:t.total,layout:"prev, pager, next, sizes",onSizeChange:t.handleSizeChange,onCurrentChange:t.handleCurrentChange},null,8,["current-page","page-size","total","onSizeChange","onCurrentChange"])])])}const w=A(T,[["render",K],["__scopeId","data-v-e3dd68f0"]]);export{w as default};
